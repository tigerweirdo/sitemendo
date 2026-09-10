import { CONTACT_EMAIL } from '@/lib/company';
import type { Lang } from '@/lib/content';
import type { AuditPayload } from '@/lib/auditRequest';

const LANG_LABEL: Record<Lang, string> = {
  tr: 'Türkçe',
  en: 'English',
  de: 'Deutsch',
};

const WHITE = '#FFFFFF';
const INK = '#090909';
const SULFUR = '#E8F000';
const MUTED = '#4A4A46';
const SANS = 'Arial, Helvetica, sans-serif';
const MONO = "Consolas, 'Courier New', monospace";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function hostOf(websiteUrl: string) {
  try {
    return new URL(websiteUrl).hostname.replace(/^www\./, '');
  } catch {
    return websiteUrl;
  }
}

function chip(label: string) {
  return `<span style="display:inline-block;padding:5px 8px;border:1px solid ${INK};background:${SULFUR};color:${INK};font:600 12px/1 ${SANS};letter-spacing:0.04em;text-transform:uppercase;">${escapeHtml(label)}</span>`;
}

function wrapLetter(lang: Lang, preview: string, chipLabel: string, body: string) {
  return `<!doctype html>
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="color-scheme" content="light only">
  <meta name="supported-color-schemes" content="light">
  <title>Sitemendo</title>
  <style>
    :root { color-scheme: light only; }
    body, table, td, p, a, h1 { color-scheme: light only; }
  </style>
</head>
<body bgcolor="${WHITE}" style="margin:0;padding:0;background:${WHITE};background-color:${WHITE};color:${INK};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(preview)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="${WHITE}" style="background:${WHITE};background-color:${WHITE};">
    <tr>
      <td align="center" bgcolor="${WHITE}" style="padding:32px 16px;background:${WHITE};background-color:${WHITE};">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" bgcolor="${WHITE}" style="width:100%;max-width:560px;background:${WHITE};background-color:${WHITE};border:1px solid ${INK};">
          <tr>
            <td bgcolor="${SULFUR}" height="6" style="height:6px;line-height:6px;font-size:0;background:${SULFUR};background-color:${SULFUR};">&nbsp;</td>
          </tr>
          <tr>
            <td bgcolor="${WHITE}" style="padding:28px 32px 32px;background:${WHITE};background-color:${WHITE};color:${INK};">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 20px;">
                <tr>
                  <td valign="middle" style="font:600 16px/1.2 ${SANS};letter-spacing:0.08em;text-transform:uppercase;color:${INK};">SITEMENDO<span style="color:${SULFUR};">.</span></td>
                  <td valign="middle" align="right">${chip(chipLabel)}</td>
                </tr>
              </table>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr><td bgcolor="${INK}" height="1" style="height:1px;line-height:1px;font-size:0;background:${INK};">&nbsp;</td></tr>
              </table>
              ${body}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function h1(text: string) {
  return `<h1 style="margin:22px 0 10px;font:600 26px/1.25 ${SANS};letter-spacing:-0.02em;color:${INK};">${escapeHtml(text)}</h1>`;
}

function p(html: string) {
  return `<p style="margin:0 0 16px;font:400 16px/1.55 ${SANS};color:${INK};">${html}</p>`;
}

function note(text: string) {
  return `<p style="margin:24px 0 0;padding-top:16px;border-top:1px solid ${INK};font:400 12px/1.45 ${SANS};color:${MUTED};">${escapeHtml(text)}</p>`;
}

function fact(label: string, valueHtml: string) {
  return `<tr>
    <td valign="top" width="92" style="padding:12px 0;border-top:1px solid ${INK};font:600 11px/1.4 ${SANS};letter-spacing:0.06em;text-transform:uppercase;color:${INK};">${escapeHtml(label)}</td>
    <td valign="top" style="padding:12px 0 12px 16px;border-top:1px solid ${INK};border-left:3px solid ${SULFUR};font:400 15px/1.45 ${MONO};color:${INK};word-break:break-all;">${valueHtml}</td>
  </tr>`;
}

export function notifyEmail(payload: AuditPayload, receivedAt: string) {
  const host = hostOf(payload.websiteUrl);
  const site = `<a href="${escapeHtml(payload.websiteUrl)}" style="color:${INK};text-decoration:underline;">${escapeHtml(payload.websiteUrl)}</a>`;
  const mail = `<a href="mailto:${escapeHtml(payload.email)}" style="color:${INK};text-decoration:underline;">${escapeHtml(payload.email)}</a>`;
  return {
    subject: `Yeni istek: ${host}`,
    text: [
      'Yeni kontrol isteği',
      '',
      `Site: ${payload.websiteUrl}`,
      `E-posta: ${payload.email}`,
      `Dil: ${LANG_LABEL[payload.language]}`,
      `Saat: ${receivedAt}`,
      '',
      'Yanıtlayınca müşteriye gidersiniz.',
    ].join('\n'),
    html: wrapLetter('tr', `${host} — ${payload.email}`, 'Yeni istek', `
      ${h1('Yeni kontrol isteği')}
      ${p('Formdan bir istek geldi. 48 saat içinde rapor yazılacak. Bu maili yanıtlayınca müşteriye gidersiniz.')}
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0 4px;">
        ${fact('Site', site)}
        ${fact('E-posta', mail)}
        ${fact('Dil', escapeHtml(LANG_LABEL[payload.language]))}
        ${fact('Saat', escapeHtml(receivedAt))}
      </table>
      ${note('Sitemendo · Berlin')}
    `),
  };
}

const CONFIRM: Record<Lang, {
  subject: string;
  chip: string;
  preview: (host: string) => string;
  title: string;
  lead: string;
  siteLabel: string;
  hours: string;
  ask: string;
  footer: string;
  text: (url: string) => string;
}> = {
  tr: {
    subject: 'Kontrol isteğiniz alındı',
    chip: '48 saat',
    preview: host => `${host} için isteğiniz bize ulaştı. Rapor 48 saat içinde.`,
    title: 'Aldık.',
    lead: 'Kontrol isteğiniz bize ulaştı. Raporu 48 saat içinde bu e-postaya gönderiyoruz.',
    siteLabel: 'Site',
    hours: 'Satın alma yok. Raporu okuduktan sonra karar sizin.',
    ask: `Bir şey sormak isterseniz bu maili yanıtlayın veya <a href="mailto:${CONTACT_EMAIL}" style="color:${INK};text-decoration:underline;">${CONTACT_EMAIL}</a> yazın.`,
    footer: 'Sitemendo · Berlin',
    text: url => [
      'Aldık.',
      '',
      `Site: ${url}`,
      'Raporu 48 saat içinde bu e-postaya gönderiyoruz.',
      '',
      `Bir şey sormak isterseniz yanıtlayın veya ${CONTACT_EMAIL} yazın.`,
    ].join('\n'),
  },
  en: {
    subject: 'We received your check request',
    chip: '48 hours',
    preview: host => `We received your request for ${host}. The report comes within 48 hours.`,
    title: 'Got it.',
    lead: 'We received your check request. We will send the report to this email within 48 hours.',
    siteLabel: 'Website',
    hours: 'Nothing to buy. After the report, the decision is yours.',
    ask: `If you have a question, reply to this email or write to <a href="mailto:${CONTACT_EMAIL}" style="color:${INK};text-decoration:underline;">${CONTACT_EMAIL}</a>.`,
    footer: 'Sitemendo · Berlin',
    text: url => [
      'Got it.',
      '',
      `Website: ${url}`,
      'We will send the report to this email within 48 hours.',
      '',
      `If you have a question, reply to this email or write to ${CONTACT_EMAIL}.`,
    ].join('\n'),
  },
  de: {
    subject: 'Ihre Prüfungsanfrage ist angekommen',
    chip: '48 Stunden',
    preview: host => `Ihre Anfrage für ${host} ist da. Der Bericht kommt innerhalb von 48 Stunden.`,
    title: 'Angekommen.',
    lead: 'Ihre Prüfungsanfrage ist bei uns angekommen. Den Bericht senden wir innerhalb von 48 Stunden an diese E-Mail.',
    siteLabel: 'Website',
    hours: 'Nichts zu kaufen. Nach dem Bericht entscheiden Sie.',
    ask: `Bei Fragen antworten Sie auf diese E-Mail oder schreiben Sie an <a href="mailto:${CONTACT_EMAIL}" style="color:${INK};text-decoration:underline;">${CONTACT_EMAIL}</a>.`,
    footer: 'Sitemendo · Berlin',
    text: url => [
      'Angekommen.',
      '',
      `Website: ${url}`,
      'Den Bericht senden wir innerhalb von 48 Stunden an diese E-Mail.',
      '',
      `Bei Fragen antworten Sie auf diese E-Mail oder schreiben Sie an ${CONTACT_EMAIL}.`,
    ].join('\n'),
  },
};

export function confirmEmail(payload: AuditPayload) {
  const copy = CONFIRM[payload.language];
  const host = hostOf(payload.websiteUrl);
  const site = `<a href="${escapeHtml(payload.websiteUrl)}" style="color:${INK};text-decoration:underline;">${escapeHtml(payload.websiteUrl)}</a>`;
  return {
    subject: copy.subject,
    text: copy.text(payload.websiteUrl),
    html: wrapLetter(payload.language, copy.preview(host), copy.chip, `
      ${h1(copy.title)}
      ${p(copy.lead)}
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0 16px;">
        ${fact(copy.siteLabel, site)}
      </table>
      ${p(escapeHtml(copy.hours))}
      ${p(copy.ask)}
      ${note(copy.footer)}
    `),
  };
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
