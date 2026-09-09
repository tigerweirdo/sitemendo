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
const SANS = "Arial, Helvetica, sans-serif";
const MONO = "ui-monospace, 'IBM Plex Mono', Consolas, monospace";

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

function preheader(text: string) {
  return `<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;mso-hide:all;">${escapeHtml(text)}</div>`;
}

function brandRow() {
  return `<tr>
    <td style="padding:0 0 18px;border-bottom:1px solid ${LINE};">
      <p style="margin:0;font:600 16px/1.2 ${SANS};letter-spacing:0.06em;text-transform:uppercase;color:${INK};">SITEMENDO<span style="color:${SULFUR};">.</span></p>
    </td>
  </tr>`;
}

function footerRow(note: string) {
  return `<tr>
    <td style="padding:20px 0 0;border-top:1px solid ${LINE};">
      <p style="margin:0;font:400 13px/1.45 ${SANS};color:${MUTED};">${escapeHtml(note)}</p>
    </td>
  </tr>`;
}

function wrapLetter(preview: string, innerRows: string) {
  return `<!doctype html>
<html lang="tr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>Sitemendo</title>
</head>
<body style="margin:0;padding:0;background:${PAPER};color:${INK};">
  ${preheader(preview)}
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${PAPER};">
    <tr>
      <td align="center" style="padding:28px 16px;">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="width:100%;max-width:560px;background:${PAPER};">
          ${brandRow()}
          ${innerRows}
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function heading(text: string) {
  return `<tr>
    <td style="padding:22px 0 12px;">
      <h1 style="margin:0;font:600 22px/1.3 ${SANS};letter-spacing:-0.015em;color:${INK};">${escapeHtml(text)}</h1>
    </td>
  </tr>`;
}

function para(text: string) {
  return `<tr>
    <td style="padding:0 0 14px;">
      <p style="margin:0;font:400 17px/1.55 ${SANS};color:${MUTED};">${text}</p>
    </td>
  </tr>`;
}

function dataBox(label: string, valueHtml: string) {
  return `<tr>
    <td style="padding:0 0 14px;">
      <p style="margin:0 0 6px;font:500 13px/1.3 ${SANS};color:${MUTED};">${escapeHtml(label)}</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${INK};">
        <tr>
          <td style="padding:12px 14px;font:400 13px/1.45 ${MONO};color:${INK};word-break:break-all;">${valueHtml}</td>
        </tr>
      </table>
    </td>
  </tr>`;
}

function fieldRow(label: string, valueHtml: string) {
  return `<tr>
    <td style="padding:10px 0;border-top:1px solid ${LINE};font:500 13px/1.4 ${SANS};color:${MUTED};width:28%;">${escapeHtml(label)}</td>
    <td style="padding:10px 0 10px 12px;border-top:1px solid ${LINE};font:400 15px/1.45 ${SANS};color:${INK};">${valueHtml}</td>
  </tr>`;
}

export function notifyEmail(payload: AuditPayload, receivedAt: string) {
  const host = hostOf(payload.websiteUrl);
  const site = `<a href="${escapeHtml(payload.websiteUrl)}" style="color:${INK};">${escapeHtml(payload.websiteUrl)}</a>`;
  const mail = `<a href="mailto:${escapeHtml(payload.email)}" style="color:${INK};">${escapeHtml(payload.email)}</a>`;
  const text = [
    `Yeni kontrol isteği: ${host}`,
    '',
    `Site: ${payload.websiteUrl}`,
    `E-posta: ${payload.email}`,
    `Dil: ${LANG_LABEL[payload.language]}`,
    `Saat: ${receivedAt}`,
    '',
    'Yanıtlayınca müşteriye gidersiniz.',
  ].join('\n');

  return {
    subject: `Yeni istek: ${host}`,
    text,
    html: wrapLetter(`${host} — ${payload.email}`, `
      ${heading('Yeni kontrol isteği')}
      ${para('Formdan bir istek geldi. 48 saat içinde rapor yazılacak.')}
      <tr>
        <td style="padding:4px 0 18px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${fieldRow('Site', site)}
            ${fieldRow('E-posta', mail)}
            ${fieldRow('Dil', escapeHtml(LANG_LABEL[payload.language]))}
            ${fieldRow('Saat', escapeHtml(receivedAt))}
          </table>
        </td>
      </tr>
      ${footerRow('Sitemendo · Berlin')}
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
    hours: '48 saat içinde',
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
    hours: 'Within 48 hours',
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
    hours: 'Innerhalb von 48 Stunden',
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
  const site = `<a href="${escapeHtml(payload.websiteUrl)}" style="color:${INK};">${escapeHtml(payload.websiteUrl)}</a>`;
  return {
    subject: copy.subject,
    text: copy.text(payload.websiteUrl),
    html: wrapLetter(copy.preview(host), `
      ${heading(copy.title)}
      ${para(copy.lead)}
      ${dataBox(copy.siteLabel, site)}
      ${para(`<span style="display:inline-block;padding:4px 8px;background:${SULFUR};color:${INK};font:600 13px/1.2 ${SANS};">${escapeHtml(copy.hours)}</span>`)}
      ${para(copy.ask)}
      ${footerRow(copy.footer)}
    `),
  };
}

export function notifyAddress() {
  return (process.env.AUDIT_NOTIFY_EMAIL || CONTACT_EMAIL).trim();
}

export function fromAddress() {
  const from = process.env.AUDIT_FROM_EMAIL?.trim();
  return from || `Sitemendo <${CONTACT_EMAIL}>`;
}

export function mailHeaders(kind: 'notify' | 'confirm', host: string) {
  return {
    'X-Entity-Ref-ID': `sitemendo-${kind}-${host}-${Date.now()}`,
    'X-Auto-Response-Suppress': 'OOF, AutoReply',
  };
}
