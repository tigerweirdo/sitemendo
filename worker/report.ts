/* Ücretsiz kontrol raporu: form gönderilince Cloudflare Workflow olarak çalışır.
   Her adım ayrı kaydedilir ve hata olursa yeniden denenir; adım başına CPU sınırı 10 ms'dir
   (ağ beklemesi sayılmaz). Sıra: ana sayfa → (bağlantılar, robots.txt, PageSpeed paralel) →
   rapor → mail. Varsayılan "owner" kipinde rapor önce yalnız sana gider; onay bağlantısına
   basılırsa müşteriye gönderilir. "customer" kipi (REPORT_SEND_MODE=customer) doğrudan
   müşteriye gönderir, sana gizli kopya düşer. Kayıtlara adres, e-posta ya da içerik yazılmaz. */

import { Resend } from 'resend';
import { WorkflowEntrypoint, type WorkflowDuration, type WorkflowEvent, type WorkflowStep, type WorkflowStepConfig } from 'cloudflare:workers';
import { esc, fromAddress, notifyAddresses, type RequestMeta } from '@/lib/auditMail';
import { CONTACT_EMAIL, SITE_URL } from '@/lib/company';
import type { Lang } from '@/lib/content';
import { expiredAlert, failedAlert, reminderAlert } from '@/lib/report/alerts';
import { buildReport } from '@/lib/report/analyze';
import { counts, draftEmail, reportEmail } from '@/lib/report/render';
import { applyEdits, encodeFindings, NO_EDITS, sanitizeEdits } from '@/lib/report/edit';
import { approvalToken } from '@/lib/report/token';
import { fetchPageFacts, fetchPsi, fetchRobots, probeLinks } from './reportNet';

export type ReportEnv = {
  RESEND_API_KEY?: string;
  PSI_API_KEY?: string;
  REPORT_SEND_MODE?: string;
  REPORT_APPROVAL_SECRET?: string;
  /* Yalnız deneme için: onay bekleme süresi (ör. "10 seconds"). Boşsa 36 saat. */
  REPORT_APPROVAL_WAIT?: string;
  AUDIT_FROM_EMAIL?: string;
  AUDIT_NOTIFY_EMAIL?: string;
};

export type ReportParams = {
  websiteUrl: string;
  email: string;
  language: Lang;
  ref: string;
  receivedAt: string;
};

/* Worker'ın Workflow bağlaması: yalnız kullandığımız yöntemler. */
export type ReportBinding = {
  create(options: { id?: string; params?: ReportParams }): Promise<{ id: string }>;
  get(id: string): Promise<{ sendEvent(event: { type: string; payload: unknown }): Promise<void>; status(): Promise<{ status: string }> }>;
};

/* Form başarıyla alındıktan sonra çağrılır. Bağlama yoksa (next dev) ya da başlatma
   başarısız olursa form etkilenmez. */
export async function startReport(env: { REPORT_WORKFLOW?: ReportBinding }, params: ReportParams) {
  if (!env.REPORT_WORKFLOW) return;
  try {
    await env.REPORT_WORKFLOW.create({ id: crypto.randomUUID(), params });
  } catch {
    console.error('report workflow start failed');
  }
}

function listOf(env: ReportEnv) {
  const raw = env.AUDIT_NOTIFY_EMAIL?.trim();
  if (!raw) return notifyAddresses();
  const list = raw.split(',').map(s => s.trim()).filter(Boolean);
  return list.length ? list : [CONTACT_EMAIL];
}

type Mail = { to: string | string[]; bcc?: string[]; subject: string; text: string; html: string; replyTo?: string; kind: string; key: string };

/* Anahtar yoksa gönderim atlanır (yerel geliştirme). Hata atılırsa adım yeniden denenir;
   idempotency anahtarı aynı postanın iki kez gitmesini engeller. */
async function send(env: ReportEnv, mail: Mail) {
  const apiKey = env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.log('report mail skipped (no RESEND_API_KEY):', mail.kind);
    return 'skipped';
  }
  const { error } = await new Resend(apiKey).emails.send({
    from: env.AUDIT_FROM_EMAIL?.trim() || fromAddress(),
    to: mail.to,
    bcc: mail.bcc,
    replyTo: mail.replyTo,
    subject: mail.subject,
    text: mail.text,
    html: mail.html,
    tags: [{ name: 'kind', value: mail.kind }],
  }, { idempotencyKey: mail.key });
  if (error) {
    console.error('report mail failed:', mail.kind, error.name);
    throw new Error(error.name);
  }
  return 'sent';
}

const QUICK: WorkflowStepConfig = { retries: { limit: 1, delay: '10 seconds' }, timeout: '60 seconds' };
const MAIL: WorkflowStepConfig = { retries: { limit: 3, delay: '15 seconds', backoff: 'exponential' }, timeout: '60 seconds' };
/* Onay bekleme süresi: 36 saat; deneme için "<sayı> second|minute|hour" ile kısaltılabilir. */
function approvalWait(env: ReportEnv): WorkflowDuration {
  const m = env.REPORT_APPROVAL_WAIT?.trim().match(/^(\d{1,3}) (second|minute|hour)s?$/);
  return m ? (`${m[1]} ${m[2]}s` as WorkflowDuration) : '36 hours';
}

const SLOW: WorkflowStepConfig = { retries: { limit: 1, delay: '20 seconds' }, timeout: '2 minutes' };

export class ReportWorkflow extends WorkflowEntrypoint<ReportEnv, ReportParams> {
  /* Beklenmedik bir hata Workflow'u sessizce durdurmasın: rapor ancak onayla gittiği için
     müşteriye verilen 48 saatlik söz kaçabilir. Hata sana bildirilir, sonra yeniden fırlatılır. */
  async run(event: Readonly<WorkflowEvent<ReportParams>>, step: WorkflowStep) {
    try {
      await this.execute(event, step);
    } catch (error) {
      console.error('report failed:', error instanceof Error ? error.name : 'unknown');
      const p = event.payload;
      const meta: RequestMeta = { ref: p.ref, receivedAt: new Date(p.receivedAt) };
      try {
        await step.do('notify owner: failed', MAIL, () => send(this.env, {
          to: listOf(this.env), ...failedAlert({ site: p.websiteUrl, requester: p.email, meta }), kind: 'report-error', key: `${event.instanceId}-error`,
        }));
      } catch {
        console.error('report failure alert could not be sent');
      }
      throw error;
    }
  }

  private async execute(event: Readonly<WorkflowEvent<ReportParams>>, step: WorkflowStep) {
    const p = event.payload;
    const id = event.instanceId;
    const meta: RequestMeta = { ref: p.ref, receivedAt: new Date(p.receivedAt) };
    const owner = listOf(this.env);

    const page = await step.do('fetch homepage', QUICK, () => fetchPageFacts(p.websiteUrl));
    if (!page.ok) {
      console.log('report not built:', page.error);
      await step.do('notify owner: not built', MAIL, () => send(this.env, {
        to: owner,
        subject: `Rapor üretilemedi (${page.error}) · ${meta.ref}`,
        text: `Otomatik rapor üretilemedi: ${page.error === 'BLOCKED' ? 'adres güvenlik süzgecine takıldı' : page.error === 'NOT_HTML' ? 'adres bir web sayfası döndürmedi' : 'site açılmadı ya da hata verdi'}.\n\nSite: ${p.websiteUrl}\nMüşteri: ${p.email}\nReferans: ${meta.ref}\n\nRaporu elle hazırlayıp 48 saat içinde göndermen gerekir.`,
        html: `<p>Otomatik rapor üretilemedi (${page.error}).</p><p>Site: ${esc(p.websiteUrl)}<br>Müşteri: ${esc(p.email)}<br>Referans: ${esc(meta.ref)}</p><p>Raporu elle hazırlayıp 48 saat içinde göndermen gerekir.</p>`,
        kind: 'report-failed',
        key: `${id}-failed`,
      }));
      return;
    }

    const [links, robots, psi] = await Promise.all([
      step.do('check links', QUICK, () => probeLinks(page.facts.internalLinks)),
      step.do('read robots.txt', QUICK, () => fetchRobots(page.facts.finalUrl)),
      step.do('measure pagespeed', SLOW, () => fetchPsi(page.facts.finalUrl, this.env.PSI_API_KEY)),
    ]);

    const report = await step.do('build report', () => Promise.resolve(buildReport({ page: page.facts, links, robots, psi })));
    const { err, warn } = counts(report);
    console.log('report built:', { err, warn, psi: psi !== null });

    const customer = reportEmail(report, p.language, meta);
    const secret = this.env.REPORT_APPROVAL_SECRET?.trim();

    if (this.env.REPORT_SEND_MODE === 'customer') {
      await step.do('send report to customer', MAIL, () => send(this.env, {
        to: p.email, bcc: owner, replyTo: CONTACT_EMAIL, ...customer, kind: 'report', key: `${id}-report`,
      }));
      return;
    }

    /* Bulgular ve dil bağlantıda imzalı taşınır: onay sayfası veritabanı olmadan düzenlenebilir. */
    const data = encodeFindings(report.findings);
    const approveUrl = secret
      ? `${SITE_URL}/api/report/approve?i=${encodeURIComponent(id)}&l=${p.language}&d=${data}&t=${await approvalToken(secret, id, `${p.language}|${data}`)}`
      : null;
    const draft = draftEmail(report, p.language, meta, { requester: p.email, approveUrl });
    await step.do('send draft to owner', MAIL, () => send(this.env, { to: owner, ...draft, kind: 'report-draft', key: `${id}-draft` }));
    if (!secret) return;

    /* 36 saat bekler; onay yoksa söz verilen teslime ~12 saat kala hatırlatır, 36 saat daha bekler.
       Hâlâ onay yoksa rapor gönderilmez ve sana bildirilir. */
    const base = { site: p.websiteUrl, requester: p.email, meta };
    let edits = NO_EDITS;
    try {
      const approval = await step.waitForEvent<unknown>('wait for approval', { type: 'approve', timeout: approvalWait(this.env) });
      edits = sanitizeEdits(approval.payload, report.findings.length);
    } catch {
      await step.do('send reminder', MAIL, () => send(this.env, {
        to: owner, ...reminderAlert({ ...base, approveUrl: approveUrl ?? p.websiteUrl, hoursLeft: 12 }), kind: 'report-reminder', key: `${id}-reminder`,
      }));
      try {
        const approval = await step.waitForEvent<unknown>('wait for approval (last)', { type: 'approve', timeout: approvalWait(this.env) });
        edits = sanitizeEdits(approval.payload, report.findings.length);
      } catch {
        console.log('report approval expired');
        await step.do('notify owner: expired', MAIL, () => send(this.env, {
          to: owner, ...expiredAlert(base), kind: 'report-expired', key: `${id}-expired`,
        }));
        return;
      }
    }
    /* Elle düzeltmeler (çıkarılan bulgu, not, ek bulgu) gönderilen rapora yansır. */
    const edited = applyEdits(report, edits);
    const final = reportEmail(edited, p.language, meta);
    console.log('report approved:', { dropped: edits.drop.length, extra: edits.extra.length, note: edits.note !== '' });
    await step.do('send report to customer', MAIL, () => send(this.env, {
      to: p.email, bcc: owner, replyTo: CONTACT_EMAIL, ...final, kind: 'report', key: `${id}-report`,
    }));
  }
}
