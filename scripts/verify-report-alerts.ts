/**
 * Sana giden uyarılar (hata, hatırlatma, süre doldu) ve önizleme sayfası. Gerçek ağ yok.
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { approve } from '../worker/approve';
import { expiredAlert, failedAlert, reminderAlert } from '../lib/report/alerts';
import { encodeFindings } from '../lib/report/edit';
import { approvalToken } from '../lib/report/token';
import type { Finding } from '../lib/report/types';

const meta = { ref: 'SM-ALERT1', receivedAt: new Date('2026-10-01T08:00:00Z') };
const base = { site: 'https://firma.de/', requester: 'kunde@firma.de', meta };

test('hata uyarısı: müşteri, site, teslim ve elle başlangıç araçları', () => {
  const m = failedAlert(base);
  assert.match(m.subject, /Rapor hazırlanamadı/);
  assert.ok(m.subject.includes('SM-ALERT1'));
  for (const part of ['kunde@firma.de', 'firma.de', 'Söz verilen teslim', 'PageSpeed Insights', 'SSL Labs']) {
    assert.ok(m.html.includes(part) && m.text.includes(part.replace('Söz verilen teslim', 'Söz verilen teslim')), part);
  }
  assert.ok(m.text.includes('pagespeed.web.dev/report?url=https%3A%2F%2Ffirma.de%2F'));
  assert.ok(m.text.includes('Müşteriye bir şey gönderilmedi'));
});

test('hatırlatma: onay bağlantısı ve kalan süre; bağlantı HTML içinde kaçırılır', () => {
  const url = 'https://sitemendo.com/api/report/approve?i=abc&l=de&d=XYZ&t=sig';
  const m = reminderAlert({ ...base, approveUrl: url, hoursLeft: 12 });
  assert.match(m.subject, /Hatırlatma/);
  assert.ok(m.subject.includes('12 saat'));
  assert.ok(m.html.includes('i=abc&amp;l=de&amp;d=XYZ&amp;t=sig'));
  assert.ok(m.text.includes(url));
  assert.ok(m.text.includes('Onaylamazsan rapor gitmez'));
});

test('süre doldu: rapor gönderilmedi, müşteri hâlâ bekliyor olabilir', () => {
  const m = expiredAlert(base);
  assert.match(m.subject, /gönderilmedi/);
  assert.ok(m.text.includes('Onaylanmadığı için rapor müşteriye gönderilmedi'));
  assert.ok(m.html.includes('kunde@firma.de'));
});

test('uyarılar: sitedeki ve formdaki metin kaçırılır', () => {
  const evil = { site: 'https://firma.de/?x="><script>alert(1)</script>', requester: 'a"><img src=x onerror=alert(2)>@b.de', meta };
  for (const m of [failedAlert(evil), expiredAlert(evil), reminderAlert({ ...evil, approveUrl: 'https://sitemendo.com/x', hoursLeft: 12 })]) {
    assert.ok(!m.html.includes('<script>alert(1)') && !m.html.includes('<img src=x'), m.subject);
  }
});

/* ---- Önizleme ---- */

const ID = '3f2c1a9e-7b44-4d2a-9c11-0a5e8d6b7f20';
const FINDINGS: Finding[] = [
  { key: 'mobile', status: 'err', code: 'mobile.viewport_none' },
  { key: 'speed', status: 'warn', code: 'speed.mid', value: 'LCP 3.1 s' },
  { key: 'https', status: 'ok', code: 'https.ok' },
];

async function setup() {
  const events: { type: string; payload: unknown }[] = [];
  const env = {
    REPORT_APPROVAL_SECRET: 's3cret',
    REPORT_WORKFLOW: {
      create: async () => ({ id: ID }),
      get: async () => ({ status: async () => ({ status: 'waiting' }), sendEvent: async (e: { type: string; payload: unknown }) => { events.push(e); } }),
    },
  };
  const d = encodeFindings(FINDINGS);
  const t = await approvalToken('s3cret', ID, `de|${d}`);
  const post = (fields: [string, string][], query = '', headers: Record<string, string> = { origin: 'https://sitemendo.com' }) =>
    approve(new Request(`https://sitemendo.com/api/report/approve${query}`, { method: 'POST', body: new URLSearchParams(fields), headers: { 'content-type': 'application/x-www-form-urlencoded', ...headers } }), env);
  return { events, post, d, t };
}

test('önizleme: düzenlenmiş rapor gösterilir, hiçbir şey gönderilmez, düzenleme gizli alanlarla taşınır', async () => {
  const { events, post, d, t } = await setup();
  const fields: [string, string][] = [
    ['i', ID], ['t', t], ['l', 'de'], ['d', d], ['keep', '1'],
    ['note', 'Hallo <script>alert(1)</script>'], ['c1_key', 'mobile'], ['c1_sev', 'warn'], ['c1_t', 'Menü klein'], ['c1_n', ''],
  ];
  const res = await post(fields, '?preview=1');
  assert.equal(res.status, 200);
  const page = await res.text();
  assert.equal(events.length, 0, 'önizleme hiçbir şey göndermez');
  assert.ok(page.includes('srcdoc="'));
  assert.ok(page.includes('Henüz gönderilmedi'));
  assert.ok(page.includes('siteniz.com'), 'site adı yerine örnek ad');
  assert.ok(page.includes('sandbox'), 'önizleme izole çerçevede');
  assert.ok(!page.includes('<script>alert(1)'), 'ham betik yok (iki kez kaçırılmış)');
  assert.ok(page.includes('Menü klein'), 'ek bulgu önizlemede');
  /* mobile.viewport_none işareti kaldırıldı (keep yalnız 1): önizlemede o bulgu yok */
  assert.ok(!page.includes('Viewport'), 'çıkarılan bulgu önizlemede yok');
  for (const [k, v] of fields) assert.ok(page.includes(`name="${k}" value="${v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')}"`), `gizli alan ${k}`);

  /* önizlemedeki "gönder" aynı düzenlemeyi gönderir */
  const sent = await post(fields);
  assert.equal(sent.status, 200);
  assert.deepEqual(events[0].payload, { drop: [0], note: 'Hallo <script>alert(1)</script>', extra: [{ key: 'mobile', status: 'warn', t: 'Menü klein' }] });
});

test('önizleme: imza yoksa ya da bağlantı bozuksa açılmaz', async () => {
  const { events, post, d, t } = await setup();
  assert.equal((await post([['i', ID], ['t', 'yanlis'], ['l', 'de'], ['d', d]], '?preview=1')).status, 404);
  assert.equal((await post([['i', ID], ['t', t], ['l', 'tr'], ['d', d]], '?preview=1')).status, 404, 'dil değiştirildi');
  assert.equal((await post([['i', ID], ['t', t], ['l', 'de'], ['d', d]], '?preview=1', { origin: 'https://evil.example.org' })).status, 404);
  assert.equal(events.length, 0);
});
