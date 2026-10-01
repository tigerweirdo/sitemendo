/* GET/POST /api/report/approve: raporu müşteriye göndermek için onay.
   GET yalnız bir onay sayfası gösterir (e-posta tarayıcıları bağlantıları önceden açar, bu
   yüzden GET hiçbir şeyi tetiklemez). Gönderim ancak sayfadaki düğmeyle, POST ile olur.
   Bağlantı HMAC imzalıdır ve tek bir Workflow örneğine bağlıdır. */

import { clientIp, tooManyApprovals } from '@/lib/auditRateLimit';
import { INSTANCE_ID, verifyApproval } from '@/lib/report/token';
import type { ReportBinding } from './report';

type ApproveEnv = { REPORT_WORKFLOW?: ReportBinding; REPORT_APPROVAL_SECRET?: string };

const MAX_BODY = 1024;

function esc(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function page(heading: string, text: string, form?: { id: string; token: string }, status = 200) {
  const html = `<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex"><title>${esc(heading)} — Sitemendo</title>
<style>body{margin:0;font:16px/1.6 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#090909;background:#fff}
main{max-width:520px;margin:0 auto;padding:56px 22px}h1{font-size:26px;line-height:1.25;margin:0 0 12px}p{margin:0 0 20px;color:#4a4a46}
button{font:inherit;font-weight:600;padding:13px 20px;background:#e8f000;border:1px solid #090909;color:#090909;cursor:pointer}
.bar{width:40px;height:4px;background:#e8f000;margin-bottom:22px}</style></head>
<body><main><div class="bar"></div><h1>${esc(heading)}</h1><p>${esc(text)}</p>${form
    ? `<form method="post" action="/api/report/approve"><input type="hidden" name="i" value="${esc(form.id)}"><input type="hidden" name="t" value="${esc(form.token)}"><button type="submit">Raporu müşteriye gönder</button></form>`
    : ''}</main></body></html>`;
  return new Response(html, { status, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' } });
}

const INVALID = () => page('Bağlantı geçerli değil', 'Bu onay bağlantısı geçersiz ya da bozulmuş. E-postadaki bağlantıyı olduğu gibi açın.', undefined, 404);

export async function approve(request: Request, env: ApproveEnv) {
  const secret = env.REPORT_APPROVAL_SECRET?.trim();
  if (!secret || !env.REPORT_WORKFLOW) return page('Onay kapalı', 'Rapor onayı bu ortamda yapılandırılmamış.', undefined, 503);
  if (tooManyApprovals(clientIp(request))) return page('Çok fazla deneme', 'Biraz bekleyip yeniden deneyin.', undefined, 429);

  if (request.method === 'GET') {
    const url = new URL(request.url);
    const id = url.searchParams.get('i') ?? '';
    const token = url.searchParams.get('t') ?? '';
    if (!(await verifyApproval(secret, id, token))) return INVALID();
    return page('Raporu müşteriye gönder', 'Rapor hazır. Aşağıdaki düğmeye basarsanız e-postada gördüğünüz haliyle müşteriye gönderilir. Basmazsanız gönderilmez.', { id, token });
  }

  /* POST: aynı kaynaktan, küçük gövde, imzalı bağlantı. */
  const origin = request.headers.get('origin');
  if (origin && new URL(origin).host !== new URL(request.url).host) return INVALID();
  const length = Number(request.headers.get('content-length') || 0);
  if (Number.isFinite(length) && length > MAX_BODY) return INVALID();
  let id = '';
  let token = '';
  try {
    const form = await request.formData();
    id = String(form.get('i') ?? '');
    token = String(form.get('t') ?? '');
  } catch {
    return INVALID();
  }
  if (!INSTANCE_ID.test(id) || !(await verifyApproval(secret, id, token))) return INVALID();

  try {
    const instance = await env.REPORT_WORKFLOW.get(id);
    /* Onay yalnız bekleyen örneğe anlamlıdır; tamamlanmış ya da durmuş örneğe "gönderiliyor" denmez. */
    const { status } = await instance.status();
    if (status === 'complete' || status === 'terminated' || status === 'errored') {
      return page('Rapor zaten işlendi', 'Bu rapor daha önce gönderilmiş ya da süresi dolmuş. Tekrar göndermek için raporu elle iletin.', undefined, 409);
    }
    await instance.sendEvent({ type: 'approve', payload: {} });
  } catch {
    return page('Gönderilemedi', 'Bu rapor zaten gönderilmiş ya da süresi dolmuş olabilir. Gerekirse raporu elle iletin.', undefined, 409);
  }
  return page('Rapor gönderiliyor', 'Onay alındı. Rapor birkaç saniye içinde müşteriye gönderilecek.');
}
