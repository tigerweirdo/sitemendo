import { normalizeWebsite, validEmail } from './auditRequest';
import type { FormMode } from './formPersist';

export type FormMessages = {
  urlErr: string;
  emailErr: string;
  fail: string;
  done: string;
  doneText: string;
  demo: string;
  demoNote: string;
};

export function formDoneView(mode: Exclude<FormMode, null>, f: Pick<FormMessages, 'done' | 'doneText' | 'demo' | 'demoNote'>) {
  if (mode === 'demo') {
    return { title: f.demo, text: f.demoNote, live: false as const };
  }
  return { title: f.done, text: f.doneText, live: true as const };
}

export function parseAuditResponse(ok: boolean, data: { mode?: string } | null): 'demo' | 'live' {
  if (!ok) throw new Error('REQUEST_FAILED');
  if (data?.mode === 'demo' || data?.mode === 'live') return data.mode;
  throw new Error('REQUEST_FAILED');
}

export async function submitAuditRequest(payload: { websiteUrl: string; email: string; language: string }) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  try {
    const res = await fetch('/api/audit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    const data = await res.json().catch(() => null) as { mode?: string } | null;
    return parseAuditResponse(res.ok, data);
  } finally {
    clearTimeout(timer);
  }
}

export function createSendLock() {
  let locked = false;
  return {
    tryLock() {
      if (locked) return false;
      locked = true;
      return true;
    },
    unlock() {
      locked = false;
    },
    isLocked() {
      return locked;
    },
  };
}

export function nextUrlStep(url: string, urlErr: string) {
  if (!normalizeWebsite(url)) return { ok: false as const, error: urlErr };
  return { ok: true as const, error: '' };
}

export function nextEmailStep(email: string, emailErr: string) {
  if (!validEmail(email)) return { ok: false as const, error: emailErr };
  return { ok: true as const, error: '' };
}

export function keepFieldsOnFail<T extends { url: string; email: string }>(fields: T, fail: string) {
  return { url: fields.url, email: fields.email, error: fail, step: 'email' as const, mode: null };
}
