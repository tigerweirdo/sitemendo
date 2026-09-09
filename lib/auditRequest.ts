import type { Lang } from '@/lib/content';
import { parseLang } from '@/lib/lang';

export type AuditPayload = {
  websiteUrl: string;
  email: string;
  language: Lang;
};

export type AuditMode = 'live' | 'demo';

export function normalizeWebsite(value: string) {
  let s = value.trim();
  if (!s || /\s/.test(s) || s.length > 2048) return null;
  if (!/^[a-z][a-z0-9+.-]*:\/\//i.test(s)) s = 'https://' + s;
  try {
    const u = new URL(s);
    if (!['http:', 'https:'].includes(u.protocol) || u.username || u.password || !u.hostname) return null;
    return u.toString();
  } catch {
    return null;
  }
}

export function validEmail(value: string) {
  const email = value.trim();
  return email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/u.test(email);
}

export function parseAuditPayload(input: unknown): AuditPayload | null {
  if (!input || typeof input !== 'object') return null;
  const body = input as Record<string, unknown>;
  if (typeof body.websiteUrl !== 'string' || typeof body.email !== 'string' || typeof body.language !== 'string') {
    return null;
  }
  const language = parseLang(body.language);
  if (!language) return null;
  const websiteUrl = normalizeWebsite(body.websiteUrl);
  const email = body.email.trim();
  if (!websiteUrl || !validEmail(email)) return null;
  return { websiteUrl, email, language };
}
