/**
 * Raporu elle düzeltme: düzenlemenin temizlenmesi ve uygulanması, bulguların imzalı bağlantıda
 * taşınması, e-postaya yansıması ve onay sayfasının davranışı. Gerçek ağ yok.
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { approve } from '../worker/approve';
import { FINDING_COPY } from '../lib/report/copy';
import { applyEdits, decodeFindings, encodeFindings, EXTRA_MAX, NOTE_MAX, sanitizeEdits } from '../lib/report/edit';
import { counts, priorityList, reportEmail } from '../lib/report/render';
import { approvalToken } from '../lib/report/token';
import { CHECK_ORDER, type Finding, type Report } from '../lib/report/types';

const BASE: Finding[] = [
  { key: 'mobile', status: 'err', code: 'mobile.viewport_none' },
  { key: 'speed', status: 'err', code: 'speed.slow', value: 'LCP 5.3 s' },
  { key: 'links', status: 'warn', code: 'links.broken_some', value: '2 / 4' },
  { key: 'https', status: 'ok', code: 'https.ok' },
  { key: 'forms', status: 'info', code: 'forms.none' },
  { key: 'stack', status: 'info', code: 'stack.info', value: 'WordPress · jQuery 3.7.1' },
  { key: 'index', status: 'ok', code: 'index.ok' },
  { key: 'contact', status: 'warn', code: 'contact.no_impressum' },
];

const report = (findings: Finding[] = BASE): Report => ({ host: 'firma.de', finalUrl: 'https://firma.de/', measuredAt: '2026-10-01T09:30:00Z', findings });
const meta = { ref: 'SM-EDIT01', receivedAt: new Date('2026-10-01T08:00:00Z') };

test('düzenleme temizliği: geçersiz olan atılır, sınırlar uygulanır', () => {
  const e = sanitizeEdits({
    drop: [1, 1, 2, -1, 99, 1.5, '3', null],
    note: `  Selam\u0000 \n\n dünya  ${'x'.repeat(2000)}`,
    extra: [
      { key: 'mobile', status: 'err', t: ' Menü açılmıyor ', n: 'Menüyü onarın' },
      { key: 'bogus', status: 'err', t: 'geçersiz anahtar' },
      { key: 'speed', status: 'fatal', t: 'geçersiz önem' },
      { key: 'links', status: 'warn', t: '   ' },
      { key: 'https', status: 'warn', t: 'a' }, { key: 'forms', status: 'warn', t: 'b' }, { key: 'index', status: 'warn', t: 'c' },
    ],
  }, BASE.length);
  assert.deepEqual(e.drop, [1, 2]);
  assert.ok(e.note.startsWith('Selam dünya xxx') && e.note.length === NOTE_MAX, 'denetim karakteri ve fazla boşluk gider, uzunluk sınırlı');
  assert.equal(e.extra.length, 1, 'ilk üç girdiden yalnız geçerli olan kalır');
  assert.deepEqual(e.extra[0], { key: 'mobile', status: 'err', t: 'Menü açılmıyor', n: 'Menüyü onarın' });
  const many = sanitizeEdits({ extra: Array.from({ length: 6 }, (_, i) => ({ key: 'speed', status: 'warn', t: `b${i}` })) }, 5);
  assert.equal(many.extra.length, EXTRA_MAX, 'en çok üç ek bulgu');
  assert.ok(many.extra.every(x => x.t && CHECK_ORDER.includes(x.key)));
  assert.deepEqual(sanitizeEdits(null, 5), { drop: [], note: '', extra: [] });
  assert.deepEqual(sanitizeEdits('x', 5), { drop: [], note: '', extra: [] });
});

test('düzenleme uygulanır: çıkarma, ek bulgu, not; boşalan satıra "elle kontrol edildi"', () => {
  const edited = applyEdits(report(), { drop: [0, 1], note: 'Not metni', extra: [{ key: 'mobile', status: 'warn', t: 'Menü zor açılıyor', n: 'Düğmeyi büyütün' }] });
  assert.equal(edited.note, 'Not metni');
  assert.ok(!edited.findings.some(f => f.code === 'speed.slow' || f.code === 'mobile.viewport_none'));
  const manual = edited.findings.filter(f => f.code === 'manual.finding');
  assert.equal(manual.length, 1);
  assert.deepEqual(manual[0].text, { t: 'Menü zor açılıyor', n: 'Düğmeyi büyütün' });
  /* speed'in tek bulgusu çıkarıldı: satır boş kalmaz */
  const speed = edited.findings.filter(f => f.key === 'speed');
  assert.deepEqual(speed.map(f => f.code), ['manual.ok']);
  for (const key of CHECK_ORDER) assert.ok(edited.findings.some(f => f.key === key), `${key} satırı var`);
  assert.equal(applyEdits(report(), { drop: [], note: '', extra: [] }).note, undefined);
  assert.deepEqual(counts(edited), { err: 0, warn: 3 }, 'sayılar düzenlenmiş rapora göre');
});

test('bulgular bağlantıda taşınır: gidiş dönüş, bozuk girdi reddi', () => {
  const data = encodeFindings(BASE);
  assert.match(data, /^[A-Za-z0-9_-]+$/);
  assert.ok(data.length < 700, `bağlantı kısa kalır (${data.length})`);
  assert.deepEqual(decodeFindings(data), BASE);
  assert.equal(decodeFindings(''), null);
  assert.equal(decodeFindings('!!!'), null);
  assert.equal(decodeFindings('A'.repeat(9000)), null);
  const enc = (rows: unknown) => btoa(JSON.stringify(rows)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  assert.equal(decodeFindings(enc([['e', 'speed.slow', '']])) !== null, true);
  assert.equal(decodeFindings(enc([['x', 'speed.slow', '']])), null, 'bilinmeyen durum harfi');
  assert.equal(decodeFindings(enc([['e', 'speed.yok', '']])), null, 'bilinmeyen kod');
  assert.equal(decodeFindings(enc([['e', 'manual.ok', '']])), null, 'anahtarı olmayan kod');
  assert.equal(decodeFindings(enc([['e', 'speed.slow', 'v'.repeat(80)]])), null, 'uzun değer');
  assert.equal(decodeFindings(enc([])), null);
  assert.equal(decodeFindings(enc('x')), null);
  const unicode: Finding[] = [{ key: 'stack', status: 'info', code: 'stack.info', value: 'Wix · Çiçek ✓' }];
  assert.deepEqual(decodeFindings(encodeFindings(unicode)), unicode);
});

test('e-posta: not, ek bulgu ve çıkarılan bulgu; sitedeki ve sayfadaki metin kaçırılır', () => {
  const evil = '<script>alert(1)</script> & "tırnak"';
  const edited = applyEdits(report(), {
    drop: [0], note: `Not ${evil}`,
    extra: [{ key: 'mobile', status: 'err', t: `Menü ${evil}`, n: `Adım ${evil}` }],
  });
  for (const lang of ['tr', 'de', 'en'] as const) {
    const mail = reportEmail(edited, lang, meta);
    assert.ok(!mail.html.includes('<script>alert(1)'), `${lang}: ham betik yok`);
    assert.ok(mail.html.includes('&lt;script&gt;alert(1)&lt;/script&gt; &amp; &quot;tırnak&quot;'), `${lang}: kaçırılmış metin var`);
    assert.ok(mail.text.includes('Not <script>alert(1)</script>'), `${lang}: düz metin sürümünde not var`);
    assert.ok(!mail.html.includes(FINDING_COPY['mobile.viewport_none'][lang].t), `${lang}: çıkarılan bulgu rapora girmez`);
  }
  const list = priorityList(edited);
  assert.deepEqual(list.slice(0, 2).map(f => f.code), ['manual.finding', 'speed.slow'], 'acil olanlar önce, kontrol sırasıyla (mobil, hız)');
  assert.ok(list.some(f => f.code === 'manual.finding'));
  const tr = reportEmail(edited, 'tr', meta);
  assert.ok(tr.html.includes('Notumuz') && tr.text.includes('Notumuz: Not'), 'not etiketi');
});

/* ---- Onay sayfası ---- */

const ID = '3f2c1a9e-7b44-4d2a-9c11-0a5e8d6b7f20';
const SECRET = 's3cret';
const APPROVE = 'https://sitemendo.com/api/report/approve';

async function link(lang = 'de', findings: Finding[] = BASE) {
  const d = encodeFindings(findings);
  const t = await approvalToken(SECRET, ID, `${lang}|${d}`);
  return { d, t, lang, qs: `i=${ID}&l=${lang}&d=${d}&t=${t}` };
}

function harness(status = 'waiting') {
  const events: { type: string; payload: unknown }[] = [];
  const env = {
    REPORT_APPROVAL_SECRET: SECRET,
    REPORT_WORKFLOW: {
      create: async () => ({ id: ID }),
      get: async () => ({ status: async () => ({ status }), sendEvent: async (e: { type: string; payload: unknown }) => { events.push(e); } }),
    },
  };
  const post = (fields: [string, string][], headers: Record<string, string> = { origin: 'https://sitemendo.com' }) => {
    const body = new URLSearchParams(fields);
    return approve(new Request(APPROVE, { method: 'POST', body, headers: { 'content-type': 'application/x-www-form-urlencoded', ...headers } }), env);
  };
  return { env, events, post, get: (qs: string) => approve(new Request(`${APPROVE}?${qs}`), env) };
}

test('onay sayfası: yalnız sorunlu bulgular listelenir, GET hiçbir şeyi tetiklemez', async () => {
  const h = harness();
  const l = await link();
  const res = await h.get(l.qs);
  assert.equal(res.status, 200);
  const page = await res.text();
  assert.equal((page.match(/name="keep"/g) ?? []).length, 4, 'acil ve orta bulgular: 0,1,2,7');
  for (const i of [0, 1, 2, 7]) assert.ok(page.includes(`name="keep" value="${i}" checked`), `${i}`);
  for (const i of [3, 4, 5, 6]) assert.ok(!page.includes(`name="keep" value="${i}"`), `${i} listelenmez`);
  assert.ok(page.includes(FINDING_COPY['speed.slow'].de.t.replace(/’/g, '’')));
  assert.ok(page.includes('name="note"') && page.includes('name="c3_t"') && !page.includes('name="c4_t"'));
  assert.equal(h.events.length, 0);
});

test('onay sayfası: işareti kaldırılan bulgu, not ve ek bulgu olaya düşer', async () => {
  const h = harness();
  const l = await link();
  const res = await h.post([
    ['i', ID], ['t', l.t], ['l', l.lang], ['d', l.d],
    ['keep', '0'], ['keep', '7'],                      // 1 ve 2 işareti kaldırıldı
    ['note', '  Merhaba <b>not</b>  '],
    ['c1_key', 'mobile'], ['c1_sev', 'err'], ['c1_t', 'Menü açılmıyor'], ['c1_n', 'Menüyü onarın'],
    ['c2_key', 'bogus'], ['c2_sev', 'warn'], ['c2_t', 'geçersiz'],   // atılır
    ['c3_key', 'speed'], ['c3_sev', 'warn'], ['c3_t', ''],           // boş başlık atılır
  ]);
  assert.equal(res.status, 200);
  assert.deepEqual(h.events, [{
    type: 'approve',
    payload: { drop: [1, 2], note: 'Merhaba <b>not</b>', extra: [{ key: 'mobile', status: 'err', t: 'Menü açılmıyor', n: 'Menüyü onarın' }] },
  }]);
});

test('onay sayfası: hiçbir şeye dokunmadan göndermek düzenleme eklemez', async () => {
  const h = harness();
  const l = await link();
  await h.post([['i', ID], ['t', l.t], ['l', l.lang], ['d', l.d], ...[0, 1, 2, 7].map(i => ['keep', String(i)] as [string, string])]);
  assert.deepEqual(h.events[0].payload, { drop: [], note: '', extra: [] });
});

test('onay sayfası: imzaya bağlı her şey değiştirilemez', async () => {
  const h = harness();
  const l = await link('de');
  const other = encodeFindings([{ key: 'mobile', status: 'err', code: 'mobile.viewport_none' }]);
  assert.equal((await h.get(`i=${ID}&l=de&d=${other}&t=${l.t}`)).status, 404, 'bulgular değiştirildi');
  assert.equal((await h.get(`i=${ID}&l=tr&d=${l.d}&t=${l.t}`)).status, 404, 'dil değiştirildi');
  assert.equal((await h.get(`i=${ID}&l=xx&d=${l.d}&t=${l.t}`)).status, 404, 'geçersiz dil');
  assert.equal((await h.get(`i=${ID}&d=${l.d}&t=${l.t}`)).status, 404, 'dil yok');
  assert.equal((await h.post([['i', ID], ['t', l.t], ['l', 'de'], ['d', other]])).status, 404);
  assert.equal((await h.post([['i', ID], ['t', l.t], ['l', 'de'], ['d', l.d]], { origin: 'https://evil.example.org' })).status, 404);
  assert.equal((await h.post([['i', 'baska-id'], ['t', l.t], ['l', 'de'], ['d', l.d]])).status, 404);
  assert.equal(h.events.length, 0, 'hiçbiri olay göndermedi');
});

test('onay sayfası: eski bağlantı (bulgusuz) hâlâ çalışır; tamamlanmış örneğe düzenleme gitmez', async () => {
  const h = harness();
  const t = await approvalToken(SECRET, ID);
  assert.equal((await h.get(`i=${ID}&t=${t}`)).status, 200);
  assert.equal((await h.post([['i', ID], ['t', t]])).status, 200);
  assert.deepEqual(h.events[0].payload, { drop: [], note: '', extra: [] });

  const done = harness('complete');
  const l = await link();
  assert.equal((await done.post([['i', ID], ['t', l.t], ['l', l.lang], ['d', l.d], ['note', 'geç']])).status, 409);
  assert.equal(done.events.length, 0);
});
