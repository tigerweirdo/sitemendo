/* GET/POST /api/report/approve: raporu gözden geçirip müşteriye göndermek.
   GET yalnız sayfayı gösterir (e-posta tarayıcıları bağlantıları önceden açar, bu yüzden GET
   hiçbir şeyi tetiklemez). Gönderim ancak sayfadaki düğmeyle, POST ile olur. Sayfada yanlış
   çıkan bulgular raporun dışına alınabilir, not ve en çok üç ek bulgu yazılabilir; düzenleme
   onay olayıyla Workflow'a gider ve orada uygulanır. Bağlantı HMAC imzalıdır: Workflow örneği,
   dil ve bulgular imzaya dahildir, bağlantıdaki hiçbir şey değiştirilemez. */

import { clientIp, tooManyApprovals } from '@/lib/auditRateLimit';
import { content, type Lang } from '@/lib/content';
import { parseLang } from '@/lib/lang';
import { FINDING_COPY, REPORT_LABELS, localizeValue } from '@/lib/report/copy';
import { clean, decodeFindings, EXTRA_MAX, NOTE_MAX, sanitizeEdits, STEP_MAX, TITLE_MAX, type Edits } from '@/lib/report/edit';
import { INSTANCE_ID, verifyApproval } from '@/lib/report/token';
import { CHECK_ORDER, type Finding } from '@/lib/report/types';
import type { ReportBinding } from './report';

type ApproveEnv = { REPORT_WORKFLOW?: ReportBinding; REPORT_APPROVAL_SECRET?: string };

const MAX_BODY = 8192;
const LANG_TR: Record<Lang, string> = { tr: 'Türkçe', en: 'İngilizce', de: 'Almanca' };

function esc(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

const STYLE = `body{margin:0;font:16px/1.6 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#090909;background:#fff}
main{max-width:640px;margin:0 auto;padding:48px 22px}h1{font-size:26px;line-height:1.25;margin:0 0 12px}p{margin:0 0 18px;color:#4a4a46}
button{font:inherit;font-weight:600;padding:13px 20px;background:#e8f000;border:1px solid #090909;color:#090909;cursor:pointer}
.bar{width:40px;height:4px;background:#e8f000;margin-bottom:22px}small{color:#6b6a64}
ul{list-style:none;margin:0 0 24px;padding:0}li{border:1px solid #e6e5e0;margin:0 0 8px}li label{display:flex;gap:12px;padding:12px 14px;cursor:pointer}
li input{margin-top:5px}.chip{display:inline-block;font-size:11px;font-weight:600;padding:2px 7px;margin-right:6px;background:#e8f000}.chip.err{background:#090909;color:#fff}
textarea,input[type=text],select{font:inherit;width:100%;box-sizing:border-box;padding:9px 10px;border:1px solid #c6c5be;margin:4px 0 12px;background:#fff}
label.f{display:block;font-weight:600;margin-top:6px}details{border:1px solid #e6e5e0;padding:10px 14px;margin:0 0 24px}summary{cursor:pointer;font-weight:600}`;

function html(heading: string, inner: string, status = 200) {
  const doc = `<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex"><title>${esc(heading)} — Sitemendo</title><style>${STYLE}</style></head>
<body><main><div class="bar"></div><h1>${esc(heading)}</h1>${inner}</main></body></html>`;
  return new Response(doc, { status, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' } });
}

function message(heading: string, text: string, status = 200) {
  return html(heading, `<p>${esc(text)}</p>`, status);
}

const INVALID = () => message('Bağlantı geçerli değil', 'Bu onay bağlantısı geçersiz ya da bozulmuş. E-postadaki bağlantıyı olduğu gibi açın.', 404);

function hidden(name: string, value: string) {
  return `<input type="hidden" name="${name}" value="${esc(value)}">`;
}

/* Yalnız sorunlu bulgular listelenir (acil, orta); uygun ve bilgi satırları rapora olduğu gibi girer. */
function shownIndexes(findings: Finding[]) {
  return findings.map((f, i) => ({ f, i })).filter(({ f }) => f.status === 'err' || f.status === 'warn');
}

function editor(findings: Finding[], lang: Lang, f: { id: string; token: string; data: string }) {
  const l = REPORT_LABELS[lang];
  const rows = shownIndexes(findings).map(({ f: x, i }) => {
    const c = FINDING_COPY[x.code][lang];
    const chip = x.status === 'err' ? 'err' : 'warn';
    return `<li><label><input type="checkbox" name="keep" value="${i}" checked><span><span class="chip ${chip}">${esc(l.severity[chip])}</span>${esc(c.t)}${x.value ? ` <small>· ${esc(localizeValue(x.value, lang))}</small>` : ''}${c.n ? `<br><small>${esc(c.n)}</small>` : ''}</span></label></li>`;
  }).join('');
  const options = content.tr.checks.map(c => `<option value="${esc(c.key)}">${esc(c.tag)}</option>`).join('');
  const extras = Array.from({ length: EXTRA_MAX }, (_, n) => `<details><summary>Ek bulgu ${n + 1}</summary>
    <label class="f">Hangi kontrol? <select name="c${n + 1}_key">${options}</select></label>
    <label class="f">Önem <select name="c${n + 1}_sev"><option value="warn">Orta</option><option value="err">Acil</option></select></label>
    <label class="f">Bulgu (${esc(LANG_TR[lang])}) <input type="text" name="c${n + 1}_t" maxlength="${TITLE_MAX}"></label>
    <label class="f">Önerilen adım (isteğe bağlı) <input type="text" name="c${n + 1}_n" maxlength="${STEP_MAX}"></label></details>`).join('');
  return html('Raporu gözden geçir', `
    <p>Müşterinin alacağı rapordaki sorunlar aşağıda (rapor dili: <b>${esc(LANG_TR[lang])}</b>). <b>İşaretini kaldırdığın bulgu rapordan çıkar.</b> Hiçbir şeye dokunmadan gönderirsen e-postada gördüğün hali gider.</p>
    <form method="post" action="/api/report/approve">
      ${hidden('i', f.id)}${hidden('t', f.token)}${hidden('l', lang)}${hidden('d', f.data)}
      ${rows ? `<ul>${rows}</ul>` : '<p>Öne çıkan sorun bulunmadı.</p>'}
      <label class="f">Rapora not (isteğe bağlı, ${esc(LANG_TR[lang])} yaz; raporun başında görünür)
        <textarea name="note" rows="3" maxlength="${NOTE_MAX}"></textarea></label>
      <p><small>Ölçülemeyen bir şey için (ör. telefonda menü açılmıyor) en çok ${EXTRA_MAX} ek bulgu yazabilirsin. Bulgu metni ${esc(LANG_TR[lang])} olmalı.</small></p>
      ${extras}
      <button type="submit">Raporu müşteriye gönder</button>
    </form>`);
}

function confirmOnly(f: { id: string; token: string }) {
  return html('Raporu müşteriye gönder', `<p>Rapor hazır. Aşağıdaki düğmeye basarsanız e-postada gördüğünüz haliyle müşteriye gönderilir. Basmazsanız gönderilmez.</p>
    <form method="post" action="/api/report/approve">${hidden('i', f.id)}${hidden('t', f.token)}<button type="submit">Raporu müşteriye gönder</button></form>`);
}

/* Bağlantıdaki dil ve bulgular imzalıysa çözülür; yoksa (eski bağlantı) yalnız onay sayfası. */
async function linkData(secret: string, id: string, token: string, lang: string, data: string) {
  if (!data) return (await verifyApproval(secret, id, token)) ? { findings: null, lang: null } : null;
  const parsed = parseLang(lang);
  if (!parsed || !(await verifyApproval(secret, id, token, `${parsed}|${data}`))) return null;
  const findings = decodeFindings(data);
  return findings ? { findings, lang: parsed } : null;
}

export async function approve(request: Request, env: ApproveEnv) {
  const secret = env.REPORT_APPROVAL_SECRET?.trim();
  if (!secret || !env.REPORT_WORKFLOW) return message('Onay kapalı', 'Rapor onayı bu ortamda yapılandırılmamış.', 503);
  if (tooManyApprovals(clientIp(request))) return message('Çok fazla deneme', 'Biraz bekleyip yeniden deneyin.', 429);

  if (request.method === 'GET') {
    const url = new URL(request.url);
    const id = url.searchParams.get('i') ?? '';
    const token = url.searchParams.get('t') ?? '';
    const link = await linkData(secret, id, token, url.searchParams.get('l') ?? '', url.searchParams.get('d') ?? '');
    if (!link) return INVALID();
    return link.findings && link.lang
      ? editor(link.findings, link.lang, { id, token, data: url.searchParams.get('d') ?? '' })
      : confirmOnly({ id, token });
  }

  /* POST: aynı kaynaktan, sınırlı gövde, imzalı bağlantı. */
  const origin = request.headers.get('origin');
  if (origin && new URL(origin).host !== new URL(request.url).host) return INVALID();
  const length = Number(request.headers.get('content-length') || 0);
  if (Number.isFinite(length) && length > MAX_BODY) return INVALID();
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return INVALID();
  }
  const field = (name: string) => String(form.get(name) ?? '');
  const id = field('i');
  const token = field('t');
  if (!INSTANCE_ID.test(id)) return INVALID();
  const link = await linkData(secret, id, token, field('l'), field('d'));
  if (!link) return INVALID();

  let edits: Edits = { drop: [], note: '', extra: [] };
  if (link.findings) {
    const kept = new Set(form.getAll('keep').map(v => Number(v)));
    const extra = Array.from({ length: EXTRA_MAX }, (_, n) => ({
      key: field(`c${n + 1}_key`), status: field(`c${n + 1}_sev`), t: clean(field(`c${n + 1}_t`), TITLE_MAX), n: clean(field(`c${n + 1}_n`), STEP_MAX),
    })).filter(e => e.t && CHECK_ORDER.some(k => k === e.key));
    edits = sanitizeEdits({ drop: shownIndexes(link.findings).map(x => x.i).filter(i => !kept.has(i)), note: field('note'), extra }, link.findings.length);
  }

  try {
    const instance = await env.REPORT_WORKFLOW.get(id);
    /* Onay yalnız bekleyen örneğe anlamlıdır; tamamlanmış ya da durmuş örneğe "gönderiliyor" denmez. */
    const { status } = await instance.status();
    if (status === 'complete' || status === 'terminated' || status === 'errored') {
      return message('Rapor zaten işlendi', 'Bu rapor daha önce gönderilmiş ya da süresi dolmuş. Tekrar göndermek için raporu elle iletin.', 409);
    }
    await instance.sendEvent({ type: 'approve', payload: edits });
  } catch {
    return message('Gönderilemedi', 'Bu rapor zaten gönderilmiş ya da süresi dolmuş olabilir. Gerekirse raporu elle iletin.', 409);
  }
  const changed = edits.drop.length + edits.extra.length + (edits.note ? 1 : 0);
  return message('Rapor gönderiliyor', changed ? 'Onay ve düzenlemelerin alındı. Rapor birkaç saniye içinde müşteriye gönderilecek.' : 'Onay alındı. Rapor birkaç saniye içinde müşteriye gönderilecek.');
}
