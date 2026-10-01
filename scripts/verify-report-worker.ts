/**
 * Rapor Worker katmanı: imzalı onay bağlantısı, ağ yardımcıları (sahte fetch ile) ve onay
 * uç noktası. Gerçek siteye istek yok; Cloudflare çalışma zamanı gerekmez.
 */
import assert from 'node:assert/strict';
import { afterEach, test } from 'node:test';
import { approve } from '../worker/approve';
import { fetchPageFacts, fetchPsi, fetchRobots, probeLinks, statusOf } from '../worker/reportNet';
import { approvalToken, verifyApproval } from '../lib/report/token';

const realFetch = globalThis.fetch;
afterEach(() => {
  globalThis.fetch = realFetch;
});

type Reply = { status?: number; headers?: Record<string, string>; body?: string } | Error;

/* method + url → yanıt. Kayıtlı olmayan istek test hatası sayılır (gerçek ağa çıkılmaz). */
function mockNet(table: Record<string, Reply>) {
  const calls: string[] = [];
  globalThis.fetch = (async (input: string | URL | Request, init?: RequestInit) => {
    const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
    const method = init?.method ?? 'GET';
    calls.push(`${method} ${url}`);
    const reply = table[`${method} ${url}`] ?? table[`* ${url}`];
    if (!reply) throw new Error(`beklenmeyen istek: ${method} ${url}`);
    if (reply instanceof Error) throw reply;
    return new Response(reply.body ?? null, { status: reply.status ?? 200, headers: reply.headers });
  }) as typeof fetch;
  return calls;
}

const HTML = `<!doctype html><html lang="de"><head><title>Firma</title><meta name="viewport" content="width=device-width">
  <meta name="description" content="Kırk ile yüz yetmiş karakter arasında, sayfayı anlatan düzgün bir arama açıklaması burada."></head>
  <body><a href="/kontakt">Kontakt</a><a href="/impressum">Impressum</a><a href="tel:+4930123">Tel</a>
  <a href="/a">a</a><a href="/b">b</a><p>10961 Berlin</p></body></html>`;

test('onay imzası: doğru çift geçer, diğer her şey reddedilir', async () => {
  const id = '3f2c1a9e-7b44-4d2a-9c11-0a5e8d6b7f20';
  const token = await approvalToken('gizli-anahtar', id);
  assert.match(token, /^[A-Za-z0-9_-]{43}$/);
  assert.equal(await verifyApproval('gizli-anahtar', id, token), true);
  assert.equal(await verifyApproval('baska-anahtar', id, token), false);
  assert.equal(await verifyApproval('gizli-anahtar', '3f2c1a9e-7b44-4d2a-9c11-0a5e8d6b7f21', token), false);
  assert.equal(await verifyApproval('gizli-anahtar', id, token.slice(0, -1) + (token.endsWith('A') ? 'B' : 'A')), false);
  assert.equal(await verifyApproval('gizli-anahtar', id, ''), false);
  assert.equal(await verifyApproval('', id, token), false);
  assert.equal(await verifyApproval('gizli-anahtar', 'not-a-uuid', token), false);
  assert.equal(await verifyApproval('gizli-anahtar', id, 'x'.repeat(500)), false);
});

test('ana sayfa: olgular çıkar, http → https yönlenmesi okunur', async () => {
  mockNet({
    'GET https://firma-beispiel.de/': { headers: { 'content-type': 'text/html; charset=utf-8', server: 'nginx' }, body: HTML },
    'GET http://firma-beispiel.de/': { status: 301, headers: { location: 'https://firma-beispiel.de/' } },
  });
  const res = await fetchPageFacts('https://firma-beispiel.de/');
  assert.ok(res.ok);
  if (!res.ok) return;
  assert.equal(res.facts.https, true);
  assert.equal(res.facts.httpRedirect, true);
  assert.equal(res.facts.server, 'nginx');
  assert.deepEqual(res.facts.internalLinks, ['https://firma-beispiel.de/kontakt', 'https://firma-beispiel.de/impressum', 'https://firma-beispiel.de/a', 'https://firma-beispiel.de/b']);
  assert.equal(res.facts.contact.tel, true);
});

test('ana sayfa: iç adres, kendi adımız ve iç adrese yönlendirme açılmaz', async () => {
  let calls = mockNet({});
  assert.deepEqual(await fetchPageFacts('http://127.0.0.1/'), { ok: false, error: 'BLOCKED' });
  assert.deepEqual(await fetchPageFacts('https://sitemendo.com/'), { ok: false, error: 'BLOCKED' });
  assert.equal(calls.length, 0, 'süzgeçten geçemeyen adrese istek atılmaz');

  calls = mockNet({
    'GET https://firma-beispiel.de/': { status: 302, headers: { location: 'http://169.254.169.254/latest/meta-data/' } },
    'GET http://firma-beispiel.de/': { status: 200, body: '' },
  });
  assert.deepEqual(await fetchPageFacts('https://firma-beispiel.de/'), { ok: false, error: 'UNREACHABLE' });
  assert.ok(!calls.some(c => c.includes('169.254')), 'iç adrese gidilmedi');
});

test('ana sayfa: hata, html olmayan yanıt', async () => {
  mockNet({ '* https://firma-beispiel.de/': new Error('ağ hatası'), '* http://firma-beispiel.de/': new Error('ağ hatası') });
  assert.deepEqual(await fetchPageFacts('https://firma-beispiel.de/'), { ok: false, error: 'UNREACHABLE' });
  mockNet({ 'GET https://firma-beispiel.de/': { headers: { 'content-type': 'application/pdf' }, body: '%PDF' }, 'GET http://firma-beispiel.de/': { status: 200 } });
  assert.deepEqual(await fetchPageFacts('https://firma-beispiel.de/'), { ok: false, error: 'NOT_HTML' });
  mockNet({ 'GET https://firma-beispiel.de/': { status: 500 }, 'GET http://firma-beispiel.de/': { status: 500 } });
  assert.deepEqual(await fetchPageFacts('https://firma-beispiel.de/'), { ok: false, error: 'UNREACHABLE' });
});

test('bağlantı denemeleri: HEAD reddedilirse GET, yönlendirme izlenir, döngü kırık sayılır', async () => {
  mockNet({
    'HEAD https://firma-beispiel.de/ok': { status: 200 },
    'HEAD https://firma-beispiel.de/gone': { status: 404 },
    'HEAD https://firma-beispiel.de/nohead': { status: 405 },
    'GET https://firma-beispiel.de/nohead': { status: 200 },
    'HEAD https://firma-beispiel.de/blocked': { status: 403 },
    'HEAD https://firma-beispiel.de/moved': { status: 301, headers: { location: '/ok' } },
    'HEAD https://firma-beispiel.de/loop': { status: 302, headers: { location: '/loop' } },
    'HEAD https://firma-beispiel.de/out': { status: 302, headers: { location: 'http://10.0.0.5/admin' } },
    '* https://firma-beispiel.de/boom': new Error('timeout'),
  });
  const urls = ['ok', 'gone', 'nohead', 'blocked', 'moved', 'loop', 'out', 'boom'].map(p => `https://firma-beispiel.de/${p}`);
  const got = Object.fromEntries((await probeLinks(urls)).map(p => [p.url.split('/').pop(), p.status]));
  assert.deepEqual(got, { ok: 200, gone: 404, nohead: 200, blocked: 403, moved: 200, loop: null, out: null, boom: null });
  assert.equal((await probeLinks(Array.from({ length: 30 }, (_, i) => `https://firma-beispiel.de/p${i}`).slice(0, 0))).length, 0);
});

test('bağlantı denemeleri: en çok 12', async () => {
  const calls = mockNet({ '* https://firma-beispiel.de/x': { status: 200 } });
  const many = Array.from({ length: 30 }, () => 'https://firma-beispiel.de/x');
  assert.equal((await probeLinks(many)).length, 12);
  assert.equal(calls.length, 12);
  assert.equal(await statusOf(new URL('https://firma-beispiel.de/x')), 200);
});

test('robots.txt: tüm siteyi kapatma, site haritası, belirsiz yanıt', async () => {
  mockNet({ 'GET https://firma-beispiel.de/robots.txt': { body: 'User-agent: *\nDisallow: /\n' }, 'HEAD https://firma-beispiel.de/sitemap.xml': { status: 404 } });
  assert.deepEqual(await fetchRobots('https://firma-beispiel.de/'), { fetched: true, blocksAll: true, sitemap: false });

  mockNet({ 'GET https://firma-beispiel.de/robots.txt': { body: 'User-agent: *\nDisallow: /admin\nSitemap: https://firma-beispiel.de/s.xml' } });
  assert.deepEqual(await fetchRobots('https://firma-beispiel.de/'), { fetched: true, blocksAll: false, sitemap: true });

  mockNet({ 'GET https://firma-beispiel.de/robots.txt': { status: 404 }, 'HEAD https://firma-beispiel.de/sitemap.xml': { status: 200 } });
  assert.deepEqual(await fetchRobots('https://firma-beispiel.de/'), { fetched: true, blocksAll: false, sitemap: true });

  mockNet({ 'GET https://firma-beispiel.de/robots.txt': { status: 403 } });
  assert.deepEqual(await fetchRobots('https://firma-beispiel.de/'), { fetched: false, blocksAll: false, sitemap: null }, '403 bot engeli olabilir: söylenmez');

  mockNet({ 'GET https://firma-beispiel.de/robots.txt': { status: 404 }, 'HEAD https://firma-beispiel.de/sitemap.xml': { status: 503 } });
  assert.equal((await fetchRobots('https://firma-beispiel.de/')).sitemap, null, 'belirsizse "yok" denmez');
});

test('PageSpeed: anahtar başlıkta, yanıt küçük, başarısızlıkta null', async () => {
  assert.equal(await fetchPsi('https://firma-beispiel.de/', undefined), null);

  let seen: { url: string; key: string | null } | null = null;
  globalThis.fetch = (async (input: string | URL | Request, init?: RequestInit) => {
    seen = { url: String(input), key: new Headers(init?.headers).get('x-goog-api-key') };
    return Response.json({ lighthouseResult: { categories: { performance: { score: 0.61 } }, audits: { 'largest-contentful-paint': { numericValue: 3300 } } } });
  }) as typeof fetch;
  const psi = await fetchPsi('https://firma-beispiel.de/', 'KEY123');
  assert.deepEqual(psi, { score: 61, lcpMs: 3300, cls: null, tbtMs: null });
  assert.ok(seen, 'istek atıldı');
  const s = seen as unknown as { url: string; key: string | null };
  assert.equal(s.key, 'KEY123');
  assert.ok(!s.url.includes('KEY123'), 'anahtar adreste görünmez');
  assert.ok(s.url.includes('fields=') && s.url.includes('strategy=mobile'));

  globalThis.fetch = (async () => new Response('x'.repeat(300_000))) as typeof fetch;
  assert.equal(await fetchPsi('https://firma-beispiel.de/', 'K'), null, 'daraltma çalışmadıysa büyük yanıt ayrıştırılmaz');
  globalThis.fetch = (async () => new Response('{}', { status: 429 })) as typeof fetch;
  assert.equal(await fetchPsi('https://firma-beispiel.de/', 'K'), null);
  globalThis.fetch = (async () => { throw new Error('x'); }) as typeof fetch;
  assert.equal(await fetchPsi('https://firma-beispiel.de/', 'K'), null);
});

test('onay uç noktası: GET tetiklemez, imzalı POST tek olay gönderir', async () => {
  const id = '3f2c1a9e-7b44-4d2a-9c11-0a5e8d6b7f20';
  const token = await approvalToken('s3cret', id);
  const events: { id: string; type: string }[] = [];
  const state = { status: 'waiting' };
  const env = {
    REPORT_APPROVAL_SECRET: 's3cret',
    REPORT_WORKFLOW: {
      create: async () => ({ id }),
      get: async (got: string) => ({
        status: async () => ({ status: state.status }),
        sendEvent: async (e: { type: string; payload: unknown }) => { events.push({ id: got, type: e.type }); },
      }),
    },
  };
  const base = 'https://sitemendo.com/api/report/approve';
  const get = (qs: string) => approve(new Request(`${base}?${qs}`), env);
  const post = (body: string, headers: Record<string, string> = {}) =>
    approve(new Request(base, { method: 'POST', body, headers: { 'content-type': 'application/x-www-form-urlencoded', ...headers } }), env);

  const page = await get(`i=${id}&t=${token}`);
  assert.equal(page.status, 200);
  const html = await page.text();
  assert.ok(html.includes('method="post"') && html.includes(`value="${id}"`));
  assert.ok(html.includes('noindex'));
  assert.equal(events.length, 0, 'GET (e-posta tarayıcısı) hiçbir şeyi tetiklemez');
  assert.equal((await get(`i=${id}&t=yanlis`)).status, 404);
  assert.equal((await get('i=x&t=y')).status, 404);

  assert.equal((await post(`i=${id}&t=yanlis`)).status, 404);
  assert.equal((await post(`i=${id}&t=${token}`, { origin: 'https://evil.example.org' })).status, 404, 'başka kaynaktan POST reddedilir');
  assert.equal(events.length, 0);

  const ok = await post(`i=${id}&t=${token}`, { origin: 'https://sitemendo.com' });
  assert.equal(ok.status, 200);
  assert.deepEqual(events, [{ id, type: 'approve' }]);

  state.status = 'complete';
  assert.equal((await post(`i=${id}&t=${token}`, { origin: 'https://sitemendo.com' })).status, 409, 'tamamlanmış örneğe ikinci onay');
  assert.equal(events.length, 1, 'ikinci onay olay göndermez');

  const closed = await approve(new Request(`${base}?i=${id}&t=${token}`), { ...env, REPORT_APPROVAL_SECRET: '' });
  assert.equal(closed.status, 503, 'imza anahtarı yoksa onay yolu kapalı');
  const failing = { ...env, REPORT_WORKFLOW: { ...env.REPORT_WORKFLOW, get: async () => { throw new Error('not found'); } } };
  assert.equal((await approve(new Request(base, { method: 'POST', body: `i=${id}&t=${token}`, headers: { 'content-type': 'application/x-www-form-urlencoded' } }), failing)).status, 409);
});
