/* Sana giden (Türkçe) uyarılar: beklenmeyen hata, onay hatırlatması, onay süresi doldu.
   Rapor ancak sen onaylayınca gittiği için, sessiz kalan bir Workflow müşteriye verilen
   48 saatlik sözü kaçırtabilir; bu e-postalar bunu önler. Aynı marka şablonu (auditMail). */

import {
  REPORT_HOURS, SOFT, badge, button, buttons, deadline, dueOf, esc, footer, lead, link, para, prettyUrl, shell, summary, title, tools, when, heading,
  type RequestMeta,
} from '@/lib/auditMail';

type Base = { site: string; requester: string; meta: RequestMeta };

function rows(o: Base) {
  return summary([
    ['Site', link(o.site, prettyUrl(o.site))],
    ['Müşteri', link(`mailto:${o.requester}`, o.requester)],
    ['Referans', esc(o.meta.ref)],
  ], 16);
}

function helpers(site: string) {
  const enc = encodeURIComponent;
  const host = (() => { try { return new URL(site).hostname.replace(/^www\./, ''); } catch { return site; } })();
  return [
    ['Hız ve telefon', 'PageSpeed Insights', `https://pagespeed.web.dev/report?url=${enc(site)}`],
    ['Güvenlik sertifikası', 'SSL Labs', `https://www.ssllabs.com/ssltest/analyze.html?d=${enc(host)}&hideResults=on`],
    ['Kırık bağlantılar', 'W3C Link Checker', `https://validator.w3.org/checklink?uri=${enc(site)}`],
  ] as [string, string, string][];
}

const FOOT = footer(['Bu uyarı sitemendo.com rapor akışından otomatik gönderildi.'], []);

/* Workflow beklenmedik bir hatayla durdu: rapor hiç hazırlanmadı. */
export function failedAlert(o: Base) {
  const due = when(dueOf(o.meta.receivedAt), 'tr');
  const subject = `Rapor hazırlanamadı (beklenmeyen hata) · ${o.meta.ref}`;
  const html = shell({
    lang: 'tr', title: subject, preview: `${o.requester} için rapor hazırlanamadı. Teslim ${due}.`, meta: `Uyarı · ${o.meta.ref}`,
    body: `${badge('Hata')}${title('Rapor hazırlanamadı')}
      ${lead('Otomatik rapor sırasında beklenmeyen bir hata oldu. Müşteriye bir şey gönderilmedi. Raporu elle hazırlaman gerekir.')}
      ${deadline('Söz verilen teslim', esc(due))}${rows(o)}
      ${heading('Hızlı başlangıç')}${tools(helpers(o.site))}`,
    foot: FOOT,
  });
  const text = [
    'Rapor hazırlanamadı (beklenmeyen hata). Müşteriye bir şey gönderilmedi; raporu elle hazırlaman gerekir.',
    '', `Söz verilen teslim: ${due}`, `Site: ${o.site}`, `Müşteri: ${o.requester}`, `Referans: ${o.meta.ref}`, '',
    ...helpers(o.site).map(([k, t, h]) => `- ${k} (${t}): ${h}`),
  ].join('\n');
  return { subject, html, text };
}

/* Taslak gönderildi ama hâlâ onaylanmadı: söz verilen teslime az kaldı. */
export function reminderAlert(o: Base & { approveUrl: string; hoursLeft: number }) {
  const due = when(dueOf(o.meta.receivedAt), 'tr');
  const subject = `Hatırlatma: rapor onayını bekliyor (${o.hoursLeft} saat kaldı) · ${o.meta.ref}`;
  const html = shell({
    lang: 'tr', title: subject, preview: `Onaylamazsan ${o.requester} raporunu almayacak. Teslim ${due}.`, meta: `Hatırlatma · ${o.meta.ref}`,
    body: `${badge('Hatırlatma')}${title('Rapor hâlâ onay bekliyor')}
      ${lead(`Müşteriye <b style="font-weight:600;">48 saat</b> söz verildi. Onaylamazsan rapor gitmez; yaklaşık ${o.hoursLeft} saat kaldı.`)}
      ${deadline('Söz verilen teslim', esc(due))}${rows(o)}
      ${buttons(button(o.approveUrl, 'Raporu incele ve gönder'), button(o.site, 'Siteyi aç', false))}
      ${para(`<span style="color:${SOFT};font-size:13px;">Bağlantı önce raporu gösteren bir sayfa açar; gönderim ancak oradaki düğmeyle olur.</span>`, 4)}`,
    foot: FOOT,
  });
  const text = [
    `Rapor hâlâ onay bekliyor; müşteriye ${REPORT_HOURS} saat söz verildi, yaklaşık ${o.hoursLeft} saat kaldı. Onaylamazsan rapor gitmez.`,
    '', `Söz verilen teslim: ${due}`, `Site: ${o.site}`, `Müşteri: ${o.requester}`, `Referans: ${o.meta.ref}`,
    '', `İncele ve gönder: ${o.approveUrl}`,
  ].join('\n');
  return { subject, html, text };
}

/* Onay süresi bitti: rapor gönderilmedi. */
export function expiredAlert(o: Base) {
  const subject = `Rapor gönderilmedi (onay süresi doldu) · ${o.meta.ref}`;
  const html = shell({
    lang: 'tr', title: subject, preview: `${o.requester} raporu almadı.`, meta: `Uyarı · ${o.meta.ref}`,
    body: `${badge('Süre doldu')}${title('Rapor gönderilmedi')}
      ${lead('Onaylanmadığı için rapor müşteriye gönderilmedi ve bu istek kapandı. Müşteri hâlâ bekliyor olabilir: raporu elle hazırlayıp iletmen gerekir.')}
      ${rows(o)}${heading('Hızlı başlangıç')}${tools(helpers(o.site))}`,
    foot: FOOT,
  });
  const text = [
    'Onaylanmadığı için rapor müşteriye gönderilmedi ve bu istek kapandı. Gerekirse raporu elle hazırlayıp ilet.',
    '', `Site: ${o.site}`, `Müşteri: ${o.requester}`, `Referans: ${o.meta.ref}`, '',
    ...helpers(o.site).map(([k, t, h]) => `- ${k} (${t}): ${h}`),
  ].join('\n');
  return { subject, html, text };
}
