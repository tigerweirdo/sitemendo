/**
 * Anında ön kontrolün ağ gerektirmeyen kuralları: adres süzgeci, <head> çözümlemesi,
 * eşikler, yanıt biçimi ve üç dilde metinler. Gerçek siteye istek yok.
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { content, type Lang } from '../lib/content';
import { analyzeHead, isPrecheckResult, safeTarget, sortItems, speedItem, type PrecheckCode } from '../lib/precheck';

test('adres süzgeci yalnız herkese açık alan adlarını geçirir', () => {
  for (const ok of ['https://example.com/', 'http://www.firma.de/', 'https://shop.firma.com.tr:443/a?b=1']) {
    assert.ok(safeTarget(ok), ok);
  }
  for (const bad of [
    'https://127.0.0.1/', 'http://10.0.0.1/', 'http://[::1]/', 'https://localhost/', 'https://printer.local/',
    'https://intranet/', 'https://api.internal/', 'https://example.com:8080/', 'ftp://example.com/',
    'https://user:pass@example.com/', 'https://sitemendo.com/', 'https://www.sitemendo.com/', 'bozuk adres',
  ]) {
    assert.equal(safeTarget(bad), null, bad);
  }
});

test('head çözümlemesi: iyi yapılandırılmış sayfa', () => {
  const html = `<!doctype html><html lang="tr"><head>
    <meta charset="utf-8"><title>Firma &amp; Ortakları — İstanbul</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta content="Kırk ile yüz yetmiş karakter arasında, sayfayı anlatan düzgün bir arama açıklaması." name="description">
    </head><body><meta name="robots" content="noindex"></body></html>`;
  const items = analyzeHead(html, null);
  const byId = Object.fromEntries(items.map(i => [i.id, i]));
  assert.equal(byId.viewport.code, 'viewport.ok');
  assert.equal(byId.title.code, 'title.ok');
  assert.equal(byId.description.code, 'description.ok');
  assert.equal(byId.index.code, 'index.ok', '<body> içindeki etiket sayılmaz');
});

test('head çözümlemesi: eksik ve sorunlu etiketler', () => {
  const items = analyzeHead(`<head><meta name='viewport' content='initial-scale=1'><meta name="description" content="Kısa">
    <meta name="robots" content="noindex, follow"><title>${'Çok uzun başlık '.repeat(6)}</title></head>`, null);
  const byId = Object.fromEntries(items.map(i => [i.id, i]));
  assert.equal(byId.viewport.code, 'viewport.partial');
  assert.equal(byId.title.code, 'title.long');
  assert.equal(byId.description.code, 'description.length');
  assert.equal(byId.index.status, 'err');

  const bare = Object.fromEntries(analyzeHead('<html><body>merhaba</body></html>', 'noindex').map(i => [i.id, i]));
  assert.equal(bare.viewport.code, 'viewport.none');
  assert.equal(bare.title.code, 'title.none');
  assert.equal(bare.description.code, 'description.none');
  assert.equal(bare.index.code, 'index.blocked', 'X-Robots-Tag başlığı da sayılır');
});

test('sunucu yanıtı eşikleri', () => {
  assert.equal(speedItem(420).code, 'speed.fast');
  assert.equal(speedItem(420).value, '420 ms');
  assert.equal(speedItem(1200).code, 'speed.mid');
  assert.equal(speedItem(2400).code, 'speed.slow');
});

test('sonuç sırası ve biçim denetimi', () => {
  const items = sortItems([
    { id: 'index', status: 'ok', code: 'index.ok' },
    { id: 'https', status: 'ok', code: 'https.ok' },
    { id: 'speed', status: 'warn', code: 'speed.mid', value: '1200 ms' },
  ]);
  assert.deepEqual(items.map(i => i.id), ['https', 'speed', 'index']);
  assert.ok(isPrecheckResult({ host: 'example.com', items }));
  assert.equal(isPrecheckResult({ host: 'example.com', items: [{ id: 'nope', status: 'ok', code: 'x' }] }), false);
  assert.equal(isPrecheckResult({ error: 'UNREACHABLE' }), false);
});

test('üç dilde her sonuç kodunun metni var', () => {
  const codes: PrecheckCode[] = [
    'https.ok', 'https.none', 'redirect.ok', 'redirect.none', 'speed.fast', 'speed.mid', 'speed.slow',
    'viewport.ok', 'viewport.partial', 'viewport.none', 'title.ok', 'title.long', 'title.none',
    'description.ok', 'description.length', 'description.none', 'index.ok', 'index.blocked',
  ];
  for (const lang of ['tr', 'en', 'de'] as Lang[]) {
    const p = content[lang].precheck;
    for (const code of codes) assert.ok(p.msg[code]?.trim(), `${lang} ${code}`);
    assert.match(p.noteDone, /48/);
    assert.ok(content[lang].legal.privacy.some(s => /ön kontrol|pre-check|Vorprüfung/i.test(s.h)), `${lang} gizlilik bölümü`);
  }
});
