/* Raporu elle düzeltme: yanlış çıkan bulguyu çıkarmak, nota eklemek, ölçülemeyen bir şey için
   ek bulgu yazmak. Veritabanı yok: bulgular imzalı onay bağlantısının içinde taşınır
   (encode/decode), düzenlemeler onay olayıyla Workflow'a gider, orada uygulanır. Bu dosyadaki
   her fonksiyon saf ve testlidir. Sayfadan gelen her metin düz metin sayılır; yazdırılırken
   kaçırılır (render.ts, worker/approve.ts). */

import { FINDING_COPY } from './copy';
import { CHECK_ORDER, type CheckKey, type CheckStatus, type Finding, type Report } from './types';

export const NOTE_MAX = 800;
export const EXTRA_MAX = 3;
export const TITLE_MAX = 160;
export const STEP_MAX = 300;

export type Extra = { key: CheckKey; status: 'err' | 'warn'; t: string; n?: string };
export type Edits = { drop: number[]; note: string; extra: Extra[] };
export const NO_EDITS: Edits = { drop: [], note: '', extra: [] };

/* Denetim karakterlerini atar, boşlukları tek boşluğa indirir, kırpar. */
export function clean(value: unknown, max: number) {
  if (typeof value !== 'string') return '';
  return value.replace(/[\u0000-\u001f\u007f]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max);
}

/* Dışarıdan gelen düzenlemeyi güvenli biçime çevirir: geçersiz olan sessizce atılır. */
export function sanitizeEdits(raw: unknown, count: number): Edits {
  const o = raw && typeof raw === 'object' ? (raw as Record<string, unknown>) : {};
  const drop = Array.isArray(o.drop)
    ? [...new Set(o.drop.filter((n): n is number => Number.isInteger(n) && n >= 0 && n < count))].sort((a, b) => a - b)
    : [];
  const extra: Extra[] = [];
  if (Array.isArray(o.extra)) {
    for (const item of o.extra.slice(0, EXTRA_MAX)) {
      const r = item && typeof item === 'object' ? (item as Record<string, unknown>) : {};
      const key = CHECK_ORDER.find(k => k === r.key);
      const status = r.status === 'err' ? 'err' : r.status === 'warn' ? 'warn' : null;
      const t = clean(r.t, TITLE_MAX);
      const n = clean(r.n, STEP_MAX);
      if (key && status && t) extra.push({ key, status, t, ...(n ? { n } : {}) });
    }
  }
  return { drop, note: clean(o.note, NOTE_MAX), extra };
}

/* Düzenlemeyi rapora uygular. Bir kontrolün bütün bulguları çıkarılırsa o satır boş kalmasın:
   "elle kontrol edildi" notu konur (çıkaran kişi baktığı için). */
export function applyEdits(report: Report, edits: Edits): Report {
  const kept = report.findings.filter((_, i) => !edits.drop.includes(i));
  const added: Finding[] = edits.extra.map(e => ({
    key: e.key,
    status: e.status,
    code: 'manual.finding',
    text: { t: e.t, ...(e.n ? { n: e.n } : {}) },
  }));
  const findings = [...kept, ...added];
  for (const key of CHECK_ORDER) {
    if (!findings.some(f => f.key === key)) findings.push({ key, status: 'ok', code: 'manual.ok' });
  }
  return { ...report, findings, ...(edits.note ? { note: edits.note } : {}) };
}

/* ---------- Bulguların bağlantıda taşınması ---------- */

const LETTER: Record<CheckStatus, string> = { err: 'e', warn: 'w', ok: 'o', info: 'i', unknown: 'u' };
const STATUS = Object.fromEntries(Object.entries(LETTER).map(([s, l]) => [l, s as CheckStatus])) as Record<string, CheckStatus>;
const MAX_FINDINGS = 40;
const MAX_VALUE = 60;

function toBase64Url(bytes: Uint8Array) {
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64Url(text: string) {
  const bin = atob(text.replace(/-/g, '+').replace(/_/g, '/'));
  return Uint8Array.from(bin, c => c.charCodeAt(0));
}

/* [durum harfi, kod, değer] üçlüleri; anahtar koddan türetilir. Kişisel veri içermez. */
export function encodeFindings(list: Finding[]) {
  const rows = list.slice(0, MAX_FINDINGS).map(f => [LETTER[f.status], f.code, (f.value ?? '').slice(0, MAX_VALUE)]);
  return toBase64Url(new TextEncoder().encode(JSON.stringify(rows)));
}

export function decodeFindings(data: string): Finding[] | null {
  if (!data || data.length > 8000 || !/^[A-Za-z0-9_-]+$/.test(data)) return null;
  try {
    const rows: unknown = JSON.parse(new TextDecoder().decode(fromBase64Url(data)));
    if (!Array.isArray(rows) || !rows.length || rows.length > MAX_FINDINGS) return null;
    const out: Finding[] = [];
    for (const row of rows) {
      if (!Array.isArray(row) || row.length !== 3) return null;
      const [letter, code, value] = row as [unknown, unknown, unknown];
      if (typeof letter !== 'string' || typeof code !== 'string' || typeof value !== 'string') return null;
      const key = CHECK_ORDER.find(k => code.startsWith(`${k}.`));
      const status = STATUS[letter];
      if (!key || !status || !(code in FINDING_COPY) || value.length > MAX_VALUE) return null;
      out.push({ key, status, code, ...(value ? { value } : {}) });
    }
    return out;
  } catch {
    return null;
  }
}
