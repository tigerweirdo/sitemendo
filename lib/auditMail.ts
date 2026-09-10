import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_E164, SITE_URL, WHATSAPP_HREF } from '@/lib/company';
import { content, type Lang } from '@/lib/content';
import type { AuditPayload } from '@/lib/auditRequest';

/* Sitemendo e-postaları: beyaz sayfa üzerinde mektup düzeni. Krem zemin Gmail'de
   bozulduğu için zemin beyaz; marka rengi yalnızca vurgu (sarı işaret çubuğu, rozet,
   adım işaretleri). Tablo düzeni ve satır içi stil, Gmail / Outlook / Apple Mail'de
   aynı görünsün diye. Pazarlama maili gibi görünmesin: görsel yok, metin önde. */

const INK = '#090909';
const SULFUR = '#E8F000';
const MUTED = '#4A4A46';
const SOFT = '#6B6A64';
const LINE = '#E6E5E0';
const PANEL = '#F7F7F4';
const WHITE = '#FFFFFF';
const SANS = "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

const LOCALE: Record<Lang, string> = { tr: 'tr-TR', en: 'en-GB', de: 'de-DE' };
const TZ = 'Europe/Berlin';
/* Teslim 2 iş günü sonra, aynı saatte. Cumartesi-pazar sayılmaz; hafta sonu gelen
   istek pazartesi 09:00'da başlamış sayılır. Hepsi Berlin saatiyle. */
const REPORT_BUSINESS_DAYS = 2;
const WEEKEND_START_HOUR = 9;

export type RequestMeta = { ref: string; receivedAt: Date };

/* Kısa, okunur bir referans. Aynı saniyede iki istek gelirse ayrışsın diye sonda iki rastgele karakter. */
export function requestMeta(now = new Date()): RequestMeta {
  const stamp = Math.floor(now.getTime() / 1000).toString(36).toUpperCase().slice(-4);
  const salt = Math.random().toString(36).slice(2, 4).toUpperCase();
  return { ref: `SM-${stamp}${salt}`, receivedAt: now };
}

function esc(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* Son iki kelimeyi birbirine bağla: satır sonunda tek başına “mı / mu” gibi bir kelime kalmasın. */
function keepTail(text: string) {
  return esc(text).replace(/ (\S+)$/, '&nbsp;$1');
}

function hostOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

function prettyUrl(url: string) {
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
}

function when(date: Date, lang: Lang) {
  const day = new Intl.DateTimeFormat(LOCALE[lang], { timeZone: TZ, weekday: 'long', day: 'numeric', month: 'long' }).format(date);
  const time = new Intl.DateTimeFormat(LOCALE[lang], { timeZone: TZ, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(date);
  return lang === 'de' ? `${day}, ${time} Uhr` : `${day}, ${time}`;
}

type Wall = { y: number; m: number; d: number; h: number; mi: number };

function berlinWall(date: Date): Wall {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(date);
  const get = (type: string) => Number(parts.find(p => p.type === type)?.value);
  return { y: get('year'), m: get('month'), d: get('day'), h: get('hour'), mi: get('minute') };
}

/* Berlin duvar saatini gerçek ana çevirir (yaz/kış saati farkı dahil). */
function fromBerlinWall(w: Wall) {
  const guess = Date.UTC(w.y, w.m - 1, w.d, w.h, w.mi);
  const seen = berlinWall(new Date(guess));
  const offset = Date.UTC(seen.y, seen.m - 1, seen.d, seen.h, seen.mi) - guess;
  return new Date(guess - offset);
}

function dueOf(received: Date) {
  let { y, m, d, h, mi } = berlinWall(received);
  const weekend = () => [0, 6].includes(new Date(Date.UTC(y, m - 1, d)).getUTCDay());
  const nextDay = () => {
    const t = new Date(Date.UTC(y, m - 1, d + 1));
    y = t.getUTCFullYear(); m = t.getUTCMonth() + 1; d = t.getUTCDate();
  };
  if (weekend()) {
    while (weekend()) nextDay();
    h = WEEKEND_START_HOUR;
    mi = 0;
  }
  for (let left = REPORT_BUSINESS_DAYS; left > 0;) {
    nextDay();
    if (!weekend()) left -= 1;
  }
  return fromBerlinWall({ y, m, d, h, mi });
}

function legalLink(path: 'impressum' | 'privacy', lang: Lang) {
  return `${SITE_URL}/${path}?lang=${lang}`;
}

/* Önizleme satırından sonra gövde metni sızmasın diye görünmez dolgu. */
const PREVIEW_PAD = '&#847;&zwnj;&nbsp;'.repeat(48);

function shell(o: { lang: Lang; title: string; preview: string; meta: string; body: string; foot: string }) {
  return `<!doctype html>
<html lang="${o.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light">
<title>${esc(o.title)}</title>
<!--[if !mso]><!--><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet"><!--<![endif]-->
<style>
  :root { color-scheme: light only; supported-color-schemes: light; }
  body { margin: 0; padding: 0; -webkit-text-size-adjust: 100%; }
  @media (max-width: 620px) {
    .sm-col { width: 100% !important; }
    .sm-px { padding-left: 22px !important; padding-right: 22px !important; }
    .sm-top { padding-top: 28px !important; }
    .sm-h1 { font-size: 24px !important; }
    .sm-stack { display: block !important; width: 100% !important; }
    .sm-k { padding-right: 0 !important; }
    .sm-v { padding-top: 2px !important; }
    .sm-full, .sm-btn-t { width: 100% !important; }
    .sm-btn-a { display: block !important; text-align: center; }
    .sm-sep { display: none !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:${WHITE};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">${esc(o.preview)}${PREVIEW_PAD}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${WHITE}" style="background:${WHITE};">
<tr><td align="center">
<!--[if mso]><table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->
<table role="presentation" class="sm-col" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;">
  <tr><td class="sm-px sm-top" style="padding:44px 40px 0;">${masthead(o.meta)}</td></tr>
  <tr><td class="sm-px" style="padding:0 40px;">${o.body}</td></tr>
  <tr><td class="sm-px" style="padding:40px 40px 48px;">${o.foot}</td></tr>
</table>
<!--[if mso]></td></tr></table><![endif]-->
</td></tr>
</table>
</body>
</html>`;
}

function rule() {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td height="1" bgcolor="${LINE}" style="height:1px;line-height:1px;font-size:0;background:${LINE};">&nbsp;</td></tr></table>`;
}

function masthead(meta: string) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr><td colspan="2" style="padding:0 0 16px;"><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td width="40" height="4" bgcolor="${SULFUR}" style="width:40px;height:4px;line-height:4px;font-size:0;background:${SULFUR};">&nbsp;</td></tr></table></td></tr>
  <tr>
    <td valign="bottom" style="font-family:${SANS};font-size:15px;line-height:1;font-weight:600;letter-spacing:0.12em;color:${INK};">SITEMENDO<span style="color:${SULFUR};">.</span></td>
    <td valign="bottom" align="right" style="font-family:${SANS};font-size:12px;line-height:1;color:${SOFT};">${esc(meta)}</td>
  </tr>
  <tr><td colspan="2" style="padding:18px 0 0;">${rule()}</td></tr>
</table>`;
}

function badge(text: string) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:32px 0 0;"><tr><td bgcolor="${SULFUR}" style="background:${SULFUR};padding:6px 10px;font-family:${SANS};font-size:12px;line-height:1;font-weight:600;letter-spacing:0.02em;color:${INK};">${esc(text)}</td></tr></table>`;
}

function title(text: string) {
  return `<h1 class="sm-h1" style="margin:14px 0 0;font-family:${SANS};font-size:28px;line-height:1.22;font-weight:600;letter-spacing:-0.02em;color:${INK};">${keepTail(text)}</h1>`;
}

function lead(html: string) {
  return `<p style="margin:14px 0 0;font-family:${SANS};font-size:16px;line-height:1.6;color:${MUTED};">${html}</p>`;
}

function heading(text: string) {
  return `<p style="margin:40px 0 16px;font-family:${SANS};font-size:13px;line-height:1.3;font-weight:600;letter-spacing:0.02em;color:${INK};">${esc(text)}</p>`;
}

function para(html: string, top = 12) {
  return `<p style="margin:${top}px 0 0;font-family:${SANS};font-size:15px;line-height:1.6;color:${INK};">${html}</p>`;
}

function link(href: string, text: string, color = INK) {
  return `<a href="${esc(href)}" style="color:${color};text-decoration:underline;">${esc(text)}</a>`;
}

/* Etiket–değer satırları, açık gri panelde. Telefonda etiket değerin üstüne iner. */
function summary(rows: [string, string][], top = 28) {
  const body = rows.map(([k, v], i) => `<tr>
    <td class="sm-stack sm-k" valign="top" width="150" style="padding:${i ? 12 : 0}px 16px 0 0;font-family:${SANS};font-size:13px;line-height:1.5;color:${SOFT};">${esc(k)}</td>
    <td class="sm-stack sm-v" valign="top" style="padding:${i ? 12 : 0}px 0 0;font-family:${SANS};font-size:15px;line-height:1.5;font-weight:500;color:${INK};word-break:break-word;">${v}</td>
  </tr>`).join('');
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${PANEL}" style="margin:${top}px 0 0;background:${PANEL};">
  <tr><td style="padding:20px 22px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${body}</table></td></tr>
</table>`;
}

type Step = { title: string; note: string; state: 'done' | 'now' | 'next' };

function steps(items: Step[]) {
  const rows = items.map((s, i) => {
    const marker = s.state === 'done'
      ? `<td width="22" height="22" align="center" valign="middle" bgcolor="${SULFUR}" style="width:22px;height:22px;background:${SULFUR};font-family:${SANS};font-size:12px;line-height:22px;font-weight:700;color:${INK};">&#10003;</td>`
      : `<td width="20" height="20" align="center" valign="middle" style="width:20px;height:20px;border:1px solid ${s.state === 'now' ? INK : '#C6C5BE'};font-family:${SANS};font-size:12px;line-height:20px;font-weight:600;color:${s.state === 'now' ? INK : SOFT};">${i + 1}</td>`;
    const pad = i ? 18 : 0;
    return `<tr>
      <td width="38" valign="top" style="padding:${pad}px 0 0;"><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>${marker}</tr></table></td>
      <td valign="top" style="padding:${pad}px 0 0;">
        <p style="margin:0;font-family:${SANS};font-size:15px;line-height:22px;font-weight:600;color:${s.state === 'next' ? MUTED : INK};">${esc(s.title)}</p>
        <p style="margin:2px 0 0;font-family:${SANS};font-size:13px;line-height:1.5;color:${SOFT};">${esc(s.note)}</p>
      </td>
    </tr>`;
  }).join('');
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${rows}</table>`;
}

/* Sekiz kontrol başlığı, iki sütun; telefonda tek sütun. */
function checklist(items: string[]) {
  const cell = (t: string) => `<td class="sm-stack" valign="top" width="50%" style="padding:0 14px 10px 0;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
      <td valign="top" width="16" style="width:16px;min-width:16px;padding:7px 0 0;"><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td width="6" height="6" bgcolor="${INK}" style="width:6px;height:6px;line-height:6px;font-size:0;background:${INK};">&nbsp;</td></tr></table></td>
      <td valign="top" style="font-family:${SANS};font-size:14px;line-height:1.45;color:${INK};">${keepTail(t)}</td>
    </tr></table>
  </td>`;
  let rows = '';
  for (let i = 0; i < items.length; i += 2) {
    rows += `<tr>${cell(items[i])}${items[i + 1] ? cell(items[i + 1]) : '<td class="sm-stack" width="50%"></td>'}</tr>`;
  }
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${rows}</table>`;
}

/* Sitedeki düğmeyle aynı: sarı zemin, ince mürekkep çerçeve. İkincil olan beyaz. */
function button(href: string, text: string, primary = true) {
  const bg = primary ? SULFUR : WHITE;
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" class="sm-btn-t"><tr>
    <td bgcolor="${bg}" style="background:${bg};border:1px solid ${INK};">
      <a href="${esc(href)}" class="sm-btn-a" style="display:inline-block;padding:13px 20px;font-family:${SANS};font-size:15px;line-height:1;font-weight:600;color:${INK};text-decoration:none;">${esc(text)}</a>
    </td>
  </tr></table>`;
}

function buttons(a: string, b: string) {
  return `<table role="presentation" class="sm-full" cellpadding="0" cellspacing="0" border="0" style="margin:28px 0 0;"><tr>
    <td class="sm-stack" valign="top" style="padding:0 10px 10px 0;">${a}</td>
    <td class="sm-stack" valign="top" style="padding:0 0 10px;">${b}</td>
  </tr></table>`;
}

function deadline(label: string, valueHtml: string) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:24px 0 0;"><tr>
    <td width="4" bgcolor="${SULFUR}" style="width:4px;background:${SULFUR};font-size:0;line-height:0;">&nbsp;</td>
    <td bgcolor="${PANEL}" style="background:${PANEL};padding:14px 18px;">
      <p style="margin:0;font-family:${SANS};font-size:12px;line-height:1.4;color:${SOFT};">${esc(label)}</p>
      <p style="margin:3px 0 0;font-family:${SANS};font-size:17px;line-height:1.4;font-weight:600;color:${INK};">${valueHtml}</p>
    </td>
  </tr></table>`;
}

function tools(rows: [string, string, string][]) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${rows.map(([k, t, h], i) => `<tr>
    <td class="sm-stack sm-k" valign="top" width="170" style="padding:${i ? 10 : 0}px 16px 0 0;font-family:${SANS};font-size:14px;line-height:1.5;color:${MUTED};">${esc(k)}</td>
    <td class="sm-stack sm-v" valign="top" style="padding:${i ? 10 : 0}px 0 0;font-family:${SANS};font-size:14px;line-height:1.5;"><a href="${esc(h)}" style="color:${INK};text-decoration:underline;">${esc(t)}</a>&nbsp;<span style="color:${SOFT};">&#8599;</span></td>
  </tr>`).join('')}</table>`;
}

function footer(lines: string[], links: [string, string][]) {
  return `${rule()}
  <p style="margin:20px 0 0;font-family:${SANS};font-size:12px;line-height:1.65;color:${SOFT};">${lines.map(esc).join('<br>')}</p>
  ${links.length ? `<p style="margin:10px 0 0;font-family:${SANS};font-size:12px;line-height:1.65;color:${SOFT};">${links.map(([t, h]) => link(h, t, SOFT)).join(' &nbsp;·&nbsp; ')}</p>` : ''}`;
}

function contactLine() {
  const cells = [
    link(`mailto:${CONTACT_EMAIL}`, CONTACT_EMAIL),
    link(`tel:${CONTACT_PHONE_E164}`, CONTACT_PHONE_DISPLAY),
    link(WHATSAPP_HREF, 'WhatsApp'),
  ].map(x => `<td class="sm-stack" style="padding:0;font-family:${SANS};font-size:15px;line-height:1.9;">${x}</td>`);
  const sep = `<td class="sm-sep" style="padding:0 10px;font-family:${SANS};font-size:15px;line-height:1.9;color:${SOFT};">&middot;</td>`;
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:10px 0 0;"><tr>${cells.join(sep)}</tr></table>`;
}

/* ---------- Müşteriye onay ---------- */

type ConfirmCopy = {
  subject: (host: string) => string;
  preview: (due: string) => string;
  meta: (ref: string) => string;
  badge: string;
  title: string;
  lead: (host: string) => string;
  rows: { site: string; email: string; due: string; ref: string };
  nextTitle: string;
  steps: [string, string, string];
  review: string;
  checksTitle: string;
  promise: [string, string];
  askTitle: string;
  ask: string;
  footer: string;
  links: [string, string];
};

const CONFIRM: Record<Lang, ConfirmCopy> = {
  tr: {
    subject: host => `Kontrol isteğiniz alındı — ${host}`,
    preview: due => `Raporunuz en geç ${due} e-postanızda. Satın alma yok.`,
    meta: ref => `Kontrol isteği · ${ref}`,
    badge: 'Alındı',
    title: 'Aldık. Sitenize bakmaya başlıyoruz.',
    lead: host => `<b style="color:${INK};font-weight:600;">${esc(host)}</b> için isteğiniz bize ulaştı. Sitenizi baştan sona inceleyip bulduğumuz her şeyi sade bir raporda topluyoruz.`,
    rows: { site: 'Site', email: 'Rapor gidecek adres', due: 'En geç', ref: 'Referans' },
    nextTitle: 'Sırada ne var',
    steps: ['İstek alındı', 'Sitenizi inceliyoruz', 'Rapor e-postanızda'],
    review: 'Sekiz başlıkta kontrol ediyoruz',
    checksTitle: 'Raporda neye bakıyoruz',
    promise: ['Satın alma yok.', 'Raporu okuduktan sonra karar sizin. Düzeltmek zorunda değilsiniz.'],
    askTitle: 'Sorunuz mu var?',
    ask: 'Bu e-postayı yanıtlamanız yeterli, doğrudan bize ulaşır. İsterseniz arayın ya da WhatsApp’tan yazın.',
    footer: 'Bu e-postayı sitemendo.com’daki formu doldurduğunuz için aldınız.',
    links: ['Impressum', 'Gizlilik'],
  },
  en: {
    subject: host => `We received your check request — ${host}`,
    preview: due => `Your report will be in your inbox by ${due}. Nothing to buy.`,
    meta: ref => `Check request · ${ref}`,
    badge: 'Received',
    title: 'Got it. We’re starting on your site.',
    lead: host => `We received your request for <b style="color:${INK};font-weight:600;">${esc(host)}</b>. We’ll go through your whole site and put everything we find into one clear report.`,
    rows: { site: 'Website', email: 'Report goes to', due: 'At the latest', ref: 'Reference' },
    nextTitle: 'What happens next',
    steps: ['Request received', 'We check your site', 'Report in your inbox'],
    review: 'We look at eight things',
    checksTitle: 'What the report covers',
    promise: ['Nothing to buy.', 'After reading the report, the decision is yours. You don’t have to fix anything.'],
    askTitle: 'Any questions?',
    ask: 'Just reply to this email — it comes straight to us. You can also call or message us on WhatsApp.',
    footer: 'You’re receiving this email because you filled in the form on sitemendo.com.',
    links: ['Impressum', 'Privacy'],
  },
  de: {
    subject: host => `Ihre Prüfungsanfrage ist angekommen — ${host}`,
    preview: due => `Ihr Bericht kommt bis ${due}. Nichts zu kaufen.`,
    meta: ref => `Prüfungsanfrage · ${ref}`,
    badge: 'Angekommen',
    title: 'Angekommen. Wir sehen uns Ihre Seite an.',
    lead: host => `Ihre Anfrage für <b style="color:${INK};font-weight:600;">${esc(host)}</b> ist bei uns. Wir sehen uns Ihre ganze Seite an und fassen alles, was wir finden, in einem verständlichen Bericht zusammen.`,
    rows: { site: 'Website', email: 'Bericht geht an', due: 'Spätestens', ref: 'Referenz' },
    nextTitle: 'Wie es weitergeht',
    steps: ['Anfrage erhalten', 'Wir prüfen Ihre Seite', 'Bericht im Postfach'],
    review: 'Wir prüfen acht Punkte',
    checksTitle: 'Was der Bericht abdeckt',
    promise: ['Nichts zu kaufen.', 'Nach dem Bericht entscheiden Sie. Sie müssen nichts reparieren lassen.'],
    askTitle: 'Fragen?',
    ask: 'Antworten Sie einfach auf diese E-Mail — sie kommt direkt bei uns an. Sie können uns auch anrufen oder per WhatsApp schreiben.',
    footer: 'Sie erhalten diese E-Mail, weil Sie das Formular auf sitemendo.com ausgefüllt haben.',
    links: ['Impressum', 'Datenschutz'],
  },
};

export function confirmEmail(payload: AuditPayload, meta: RequestMeta) {
  const lang = payload.language;
  const c = CONFIRM[lang];
  const host = hostOf(payload.websiteUrl);
  const received = when(meta.receivedAt, lang);
  const due = when(dueOf(meta.receivedAt), lang);
  const checks = content[lang].checks.map(x => x.title);

  const html = shell({
    lang,
    title: c.subject(host),
    preview: c.preview(due),
    meta: c.meta(meta.ref),
    body: `
      ${badge(c.badge)}
      ${title(c.title)}
      ${lead(c.lead(host))}
      ${summary([
        [c.rows.site, link(payload.websiteUrl, prettyUrl(payload.websiteUrl))],
        [c.rows.email, esc(payload.email)],
        [c.rows.due, esc(due)],
        [c.rows.ref, esc(meta.ref)],
      ])}
      ${heading(c.nextTitle)}
      ${steps([
        { title: c.steps[0], note: received, state: 'done' },
        { title: c.steps[1], note: c.review, state: 'now' },
        { title: c.steps[2], note: due, state: 'next' },
      ])}
      ${heading(c.checksTitle)}
      ${checklist(checks)}
      <div style="margin:30px 0 0;">${rule()}</div>
      ${para(`<b style="font-weight:600;">${esc(c.promise[0])}</b> ${esc(c.promise[1])}`, 24)}
      ${heading(c.askTitle)}
      ${para(esc(c.ask), 0)}
      ${contactLine()}
    `,
    foot: footer([c.footer, 'Sitemendo · Berlin'], [
      [c.links[0], legalLink('impressum', lang)],
      [c.links[1], legalLink('privacy', lang)],
    ]),
  });

  const text = [
    c.title,
    '',
    c.lead(host).replace(/<[^>]+>/g, ''),
    '',
    `${c.rows.site}: ${payload.websiteUrl}`,
    `${c.rows.email}: ${payload.email}`,
    `${c.rows.due}: ${due}`,
    `${c.rows.ref}: ${meta.ref}`,
    '',
    c.nextTitle,
    `1. ${c.steps[0]} — ${received}`,
    `2. ${c.steps[1]} — ${c.review}`,
    `3. ${c.steps[2]} — ${due}`,
    '',
    c.checksTitle,
    ...checks.map(t => `- ${t}`),
    '',
    `${c.promise[0]} ${c.promise[1]}`,
    '',
    c.askTitle,
    c.ask,
    `${CONTACT_EMAIL} · ${CONTACT_PHONE_DISPLAY} · WhatsApp: ${WHATSAPP_HREF}`,
    '',
    '—',
    c.footer,
    'Sitemendo · Berlin',
    `${c.links[0]}: ${legalLink('impressum', lang)}`,
    `${c.links[1]}: ${legalLink('privacy', lang)}`,
  ].join('\n');

  return { subject: c.subject(host), text, html };
}

/* ---------- Sana bildirim (Türkçe) ---------- */

const LANG_TR: Record<Lang, string> = { tr: 'Türkçe', en: 'İngilizce', de: 'Almanca' };
const GREETING: Record<Lang, string> = { tr: 'Merhaba,', en: 'Hello,', de: 'Guten Tag,' };
const REPLY_SUBJECT: Record<Lang, (host: string, ref: string) => string> = {
  tr: (host, ref) => `Kontrol isteğiniz — ${host} (${ref})`,
  en: (host, ref) => `Your check request — ${host} (${ref})`,
  de: (host, ref) => `Ihre Prüfungsanfrage — ${host} (${ref})`,
};

export function notifyEmail(payload: AuditPayload, meta: RequestMeta) {
  const host = hostOf(payload.websiteUrl);
  const received = when(meta.receivedAt, 'tr');
  const due = when(dueOf(meta.receivedAt), 'tr');
  const langName = LANG_TR[payload.language];
  const enc = encodeURIComponent;
  /* Yanıt taslağı müşterinin dilinde açılır. */
  const reply = `mailto:${payload.email}?subject=${enc(REPLY_SUBJECT[payload.language](host, meta.ref))}&body=${enc(`${GREETING[payload.language]}\n\n`)}`;
  const subject = `Yeni istek: ${host} · ${langName} · ${meta.ref}`;

  const html = shell({
    lang: 'tr',
    title: subject,
    preview: `${payload.email} · teslim ${due}`,
    meta: `Kontrol isteği · ${meta.ref}`,
    body: `
      ${badge('Yeni istek')}
      ${title(host)}
      ${lead(`Formdan yeni kontrol isteği geldi · ${esc(received)}`)}
      ${deadline('Rapor teslimi', `${esc(due)} <span style="font-weight:400;color:${SOFT};">· ${REPORT_BUSINESS_DAYS} iş günü</span>`)}
      ${summary([
        ['Site', link(payload.websiteUrl, prettyUrl(payload.websiteUrl))],
        ['Müşteri', link(`mailto:${payload.email}`, payload.email)],
        ['Rapor dili', esc(langName)],
        ['Referans', esc(meta.ref)],
      ], 16)}
      ${buttons(button(reply, 'Müşteriye yanıt yaz'), button(payload.websiteUrl, 'Siteyi aç', false))}
      ${heading('Hızlı başlangıç')}
      ${tools([
        ['Hız ve telefon', 'PageSpeed Insights', `https://pagespeed.web.dev/report?url=${enc(payload.websiteUrl)}`],
        ['Güvenlik sertifikası', 'SSL Labs', `https://www.ssllabs.com/ssltest/analyze.html?d=${enc(host)}&hideResults=on`],
        ['Kırık bağlantılar', 'W3C Link Checker', `https://validator.w3.org/checklink?uri=${enc(payload.websiteUrl)}`],
        ['Google’da görünürlük', `site:${host} araması`, `https://www.google.com/search?q=${enc(`site:${host}`)}`],
      ])}
    `,
    foot: footer(['Bu bildirim sitemendo.com formundan otomatik gönderildi.', '“Yanıtla” derseniz doğrudan müşteriye gider.'], []),
  });

  const text = [
    `Yeni kontrol isteği — ${host}`,
    '',
    `Geldi: ${received}`,
    `Teslim: ${due} (${REPORT_BUSINESS_DAYS} iş günü)`,
    '',
    `Site: ${payload.websiteUrl}`,
    `Müşteri: ${payload.email}`,
    `Rapor dili: ${langName}`,
    `Referans: ${meta.ref}`,
    '',
    'Hızlı başlangıç',
    `- PageSpeed Insights: https://pagespeed.web.dev/report?url=${enc(payload.websiteUrl)}`,
    `- SSL Labs: https://www.ssllabs.com/ssltest/analyze.html?d=${enc(host)}&hideResults=on`,
    `- W3C Link Checker: https://validator.w3.org/checklink?uri=${enc(payload.websiteUrl)}`,
    `- Google: https://www.google.com/search?q=${enc(`site:${host}`)}`,
    '',
    '“Yanıtla” derseniz doğrudan müşteriye gider.',
  ].join('\n');

  return { subject, text, html };
}

export function notifyAddresses() {
  const raw = process.env.AUDIT_NOTIFY_EMAIL || CONTACT_EMAIL;
  const list = raw.split(',').map(s => s.trim()).filter(Boolean);
  return list.length ? list : [CONTACT_EMAIL];
}

export function fromAddress() {
  const from = process.env.AUDIT_FROM_EMAIL?.trim();
  return from || `Sitemendo <${CONTACT_EMAIL}>`;
}

export function mailHeaders(kind: 'notify' | 'confirm', host: string) {
  return {
    'X-Entity-Ref-ID': `sitemendo-${kind}-${host}-${Date.now()}`,
  };
}
