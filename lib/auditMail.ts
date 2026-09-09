import { CONTACT_EMAIL } from '@/lib/company';
import type { Lang } from '@/lib/content';
import type { AuditPayload } from '@/lib/auditRequest';

const LANG_LABEL: Record<Lang, string> = {
  tr: 'Türkçe',
  en: 'English',
  de: 'Deutsch',
};

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

function wrapHtml(body: string) {
  return `<!doctype html>
<html>
<body style="margin:0;background:#efe8d8;color:#090909;">
  <div style="max-width:560px;margin:24px auto;padding:28px 28px 32px;background:#fffdf6;border:1px solid #090909;font-family:Georgia,Times,serif;font-size:16px;line-height:1.5;">
    ${body}
    <p style="margin:28px 0 0;font-size:13px;">Sitemendo</p>
  </div>
</body>
</html>`;
}

export function notifyEmail(payload: AuditPayload, receivedAt: string) {
  const host = hostOf(payload.websiteUrl);
  const text = [
    'Yeni ücretsiz kontrol isteği',
    '',
    `Site: ${payload.websiteUrl}`,
    `E-posta: ${payload.email}`,
    `Dil: ${LANG_LABEL[payload.language]}`,
    `Saat: ${receivedAt}`,
  ].join('\n');

  return {
    subject: `Yeni kontrol isteği — ${host}`,
    text,
    html: wrapHtml(`
      <p style="margin:0 0 16px;font-size:13px;letter-spacing:0.04em;text-transform:uppercase;">Yeni istek</p>
      <h1 style="margin:0 0 20px;font-size:22px;font-weight:normal;">Ücretsiz kontrol</h1>
      <p style="margin:0 0 8px;"><strong>Site</strong><br>${escapeHtml(payload.websiteUrl)}</p>
      <p style="margin:0 0 8px;"><strong>E-posta</strong><br>${escapeHtml(payload.email)}</p>
      <p style="margin:0 0 8px;"><strong>Dil</strong><br>${escapeHtml(LANG_LABEL[payload.language])}</p>
      <p style="margin:0;"><strong>Saat</strong><br>${escapeHtml(receivedAt)}</p>
    `),
  };
}

const CONFIRM: Record<Lang, { subject: string; text: (url: string) => string; html: (url: string) => string }> = {
  tr: {
    subject: 'Kontrol isteğiniz alındı',
    text: url => [
      'Kontrol isteğiniz bize ulaştı.',
      '',
      `Site: ${url}`,
      'Raporu 48 saat içinde bu e-postaya gönderiyoruz.',
      '',
      `Bir şey sormak isterseniz yanıtlayın veya ${CONTACT_EMAIL} yazın.`,
    ].join('\n'),
    html: url => wrapHtml(`
      <p style="margin:0 0 16px;">Kontrol isteğiniz bize ulaştı.</p>
      <p style="margin:0 0 16px;"><strong>Site</strong><br>${escapeHtml(url)}</p>
      <p style="margin:0 0 16px;">Raporu 48 saat içinde bu e-postaya gönderiyoruz.</p>
      <p style="margin:0;">Bir şey sormak isterseniz bu maili yanıtlayın veya <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a> yazın.</p>
    `),
  },
  en: {
    subject: 'We received your check request',
    text: url => [
      'We received your check request.',
      '',
      `Website: ${url}`,
      'We will send the report to this email within 48 hours.',
      '',
      `If you have a question, reply to this email or write to ${CONTACT_EMAIL}.`,
    ].join('\n'),
    html: url => wrapHtml(`
      <p style="margin:0 0 16px;">We received your check request.</p>
      <p style="margin:0 0 16px;"><strong>Website</strong><br>${escapeHtml(url)}</p>
      <p style="margin:0 0 16px;">We will send the report to this email within 48 hours.</p>
      <p style="margin:0;">If you have a question, reply to this email or write to <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>.</p>
    `),
  },
  de: {
    subject: 'Ihre Prüfungsanfrage ist angekommen',
    text: url => [
      'Ihre Prüfungsanfrage ist bei uns angekommen.',
      '',
      `Website: ${url}`,
      'Den Bericht senden wir innerhalb von 48 Stunden an diese E-Mail.',
      '',
      `Bei Fragen antworten Sie auf diese E-Mail oder schreiben Sie an ${CONTACT_EMAIL}.`,
    ].join('\n'),
    html: url => wrapHtml(`
      <p style="margin:0 0 16px;">Ihre Prüfungsanfrage ist bei uns angekommen.</p>
      <p style="margin:0 0 16px;"><strong>Website</strong><br>${escapeHtml(url)}</p>
      <p style="margin:0 0 16px;">Den Bericht senden wir innerhalb von 48 Stunden an diese E-Mail.</p>
      <p style="margin:0;">Bei Fragen antworten Sie auf diese E-Mail oder schreiben Sie an <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>.</p>
    `),
  },
};

export function confirmEmail(payload: AuditPayload) {
  const copy = CONFIRM[payload.language];
  return {
    subject: copy.subject,
    text: copy.text(payload.websiteUrl),
    html: copy.html(payload.websiteUrl),
  };
}

export function notifyAddress() {
  return (process.env.AUDIT_NOTIFY_EMAIL || CONTACT_EMAIL).trim();
}

export function fromAddress() {
  const from = process.env.AUDIT_FROM_EMAIL?.trim();
  return from || `Sitemendo <${CONTACT_EMAIL}>`;
}
