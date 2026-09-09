import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { CONTACT_EMAIL } from '@/lib/company';
import { confirmEmail, fromAddress, mailHeaders, notifyAddresses, notifyEmail } from '@/lib/auditMail';
import { clientIp, tooManyRequests } from '@/lib/auditRateLimit';
import { parseAuditPayload, type AuditMode } from '@/lib/auditRequest';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_BODY = 8192;

function demoAllowed() {
  const flag = process.env.AUDIT_DEMO_MODE ?? process.env.NEXT_PUBLIC_DEMO_MODE;
  return flag !== 'false';
}

function json(body: { mode?: AuditMode; error?: string }, status = 200) {
  return NextResponse.json(body, { status });
}

export async function POST(request: Request) {
  const length = Number(request.headers.get('content-length') || 0);
  if (Number.isFinite(length) && length > MAX_BODY) {
    return json({ error: 'TOO_LARGE' }, 413);
  }

  const ip = clientIp(request);
  if (tooManyRequests(ip)) {
    return json({ error: 'RATE' }, 429);
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return json({ error: 'INVALID' }, 400);
  }

  const payload = parseAuditPayload(raw);
  if (!payload) return json({ error: 'INVALID' }, 400);

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    if (demoAllowed()) return json({ mode: 'demo' });
    return json({ error: 'NOT_CONFIGURED' }, 503);
  }

  const receivedAt = new Date().toLocaleString('tr-TR', { timeZone: 'Europe/Berlin' });
  const from = fromAddress();
  const notifyTo = notifyAddresses();
  const owner = notifyEmail(payload, receivedAt);
  const customer = confirmEmail(payload);
  const resend = new Resend(apiKey);

  const host = new URL(payload.websiteUrl).hostname.replace(/^www\./, '');
  const notify = await resend.emails.send({
    from,
    to: notifyTo,
    replyTo: payload.email,
    subject: owner.subject,
    text: owner.text,
    html: owner.html,
    headers: mailHeaders('notify', host),
    tags: [{ name: 'kind', value: 'audit-notify' }],
  });

  if (notify.error) {
    return json({ error: 'SEND_FAILED' }, 502);
  }

  const confirm = await resend.emails.send({
    from,
    to: payload.email,
    replyTo: CONTACT_EMAIL,
    subject: customer.subject,
    text: customer.text,
    html: customer.html,
    headers: mailHeaders('confirm', host),
    tags: [{ name: 'kind', value: 'audit-confirm' }],
  });

  if (confirm.error) {
    console.error('audit confirm email failed');
  }

  return json({ mode: 'live' });
}
