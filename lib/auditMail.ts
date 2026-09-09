import { CONTACT_EMAIL } from '@/lib/company';
import type { Lang } from '@/lib/content';
import type { AuditPayload } from '@/lib/auditRequest';

const LANG_LABEL: Record<Lang, string> = {
  tr: 'Türkçe',
  en: 'English',
  de: 'Deutsch',
};

const PAPER = '#F3F1EA';
const INK = '#090909';
const SULFUR = '#E8F000';
const MUTED = '#4A4A46';
const LINE = '#C6C5BE';
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

function wrapDoc(lang: Lang, preview: string, rows: string) {
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
    body, table, td { color-scheme: light only; }
  </style>
</head>
<body bgcolor="${PAPER}" style="margin:0;padding:0;background:${PAPER};background-color:${PAPER};color:${INK};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(preview)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="${PAPER}" style="background:${PAPER};background-color:${PAPER};">
    <tr>
      <td align="center" bgcolor="${PAPER}" style="padding:28px 16px;background:${PAPER};background-color:${PAPER};">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" bgcolor="${PAPER}" style="width:100%;max-width:560px;background:${PAPER};background-color:${PAPER};border:1px solid ${INK};">
          <tr>
            <td bgcolor="${PAPER}" style="padding:28px 28px 32px;background:${PAPER};background-color:${PAPER};color:${INK};">
              <p style="margin:0 0 18px;padding:0 0 16px;border-bottom:1px solid ${INK};font:600 16px/1.2 ${SANS};letter-spacing:0.06em;text-transform:uppercase;color:${INK};">SITEMENDO<span style="color:${SULFUR};">.</span></p>
              ${rows}
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
  return `<h1 style="margin:0 0 12px;font:600 22px/1.3 ${SANS};letter-spacing:-0.015em;color:${INK};">${escapeHtml(text)}</h1>`;
}

function p(text: string) {
  return `<p style="margin:0 0 16px;font:400 17px/1.55 ${SANS};color:${INK};">${text}</p>`;
}

function muted(text: string) {
  return `<p style="margin:22px 0 0;padding-top:16px;border-top:1px solid ${LINE};font:400 13px/1.45 ${SANS};color:${MUTED};">${escapeHtml(text)}</p>`;
}

function box(label: string, valueHtml: string) {
  return `<p style="margin:0 0 6px;font:500 13px/1.3 ${SANS};color:${MUTED};">${escapeHtml(label)}</p>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="${PAPER}" style="margin:0 0 18px;border:1px solid ${INK};background:${PAPER};background-color:${PAPER};">
    <tr>
      <td bgcolor="${PAPER}" style="padding:12px 14px;font:400 13px/1.45 ${MONO};color:${INK};word-break:break-all;background:${PAPER};background-color:${PAPER};">${valueHtml}</td>
    </tr>
  </table>`;
}

function row(label: string, valueHtml: string) {
  return `<tr>
    <td valign="top" style="padding:10px 12px 10px 0;border-top:1px solid ${LINE};font:500 13px/1.4 ${SANS};color:${MUTED};width:96px;">${escapeHtml(label)}</td>
    <td valign="top" style="padding:10px 0;border-top:1px solid ${LINE};font:400 15px/1.45 ${SANS};color:${INK};">${valueHtml}</td>
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
    html: wrapDoc('tr', `${host} — ${payload.email}`, `
      ${h1('Yeni kontrol isteği')}
      ${p('Formdan bir istek geldi. 48 saat içinde rapor yazılacak.')}
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:4px 0 8px;">
        ${row('Site', site)}
        ${row('E-posta', mail)}
        ${row('Dil', escapeHtml(LANG_LABEL[payload.language]))}
        ${row('Saat', escapeHtml(receivedAt))}
      </table>
      ${muted('Sitemendo · Berlin')}
    `),
  };
}

const CONFIRM: Record<Lang, {
  subject: string;
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
    preview: host => `${host} için isteğiniz bize ulaştı. Rapor 48 saat içinde.`,
    title: 'Aldık.',
    lead: 'Kontrol isteğiniz bize ulaştı. Raporu 48 saat içinde bu e-postaya gönderiyoruz.',
    siteLabel: 'Site',
    hours: '48 saat içinde.',
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
    preview: host => `We received your request for ${host}. The report comes within 48 hours.`,
    title: 'Got it.',
    lead: 'We received your check request. We will send the report to this email within 48 hours.',
    siteLabel: 'Website',
    hours: 'Within 48 hours.',
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
    preview: host => `Ihre Anfrage für ${host} ist da. Der Bericht kommt innerhalb von 48 Stunden.`,
    title: 'Angekommen.',
    lead: 'Ihre Prüfungsanfrage ist bei uns angekommen. Den Bericht senden wir innerhalb von 48 Stunden an diese E-Mail.',
    siteLabel: 'Website',
    hours: 'Innerhalb von 48 Stunden.',
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
    html: wrapDoc(payload.language, copy.preview(host), `
      ${h1(copy.title)}
      ${p(copy.lead)}
      ${box(copy.siteLabel, site)}
      ${p(escapeHtml(copy.hours))}
      ${p(copy.ask)}
      ${muted(copy.footer)}
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
