/**
 * Rapor çekirdeğinin ağ gerektirmeyen kuralları: sayfa çözümlemesi, eşikler, robots.txt,
 * PageSpeed ayrıştırma, üç dilde metin eksiksizliği, e-posta kaçırma ve kötü niyetli
 * girdiye karşı süre. Gerçek siteye istek yok.
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  analyzePage, buildFindings, buildReport, classifyLink, hasEmail, internalLinks, anchors, parsePsi, parseRobots, tagList,
} from '../lib/report/analyze';
import { FINDING_COPY, REPORT_LABELS, localizeValue } from '../lib/report/copy';
import { counts, draftEmail, priorityList, reportEmail } from '../lib/report/render';
import type { Finding, LinkProbe, PageFacts, PsiFacts, RobotsFacts } from '../lib/report/types';
import type { Lang } from '../lib/content';

const LANGS: Lang[] = ['tr', 'de', 'en'];

const GOOD_HTML = `<!doctype html><html lang="de"><head><meta charset="utf-8"><title>Firma Müller</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Kırk ile yüz yetmiş karakter arasında, sayfayı anlatan düzgün bir arama açıklaması burada.">
  <meta name="generator" content="WordPress 6.8">
  <script src="https://cdn.firma.de/wp-content/jquery-3.7.1.min.js"></script></head>
  <body><nav><a href="/">Start</a> <a href="/leistungen">Leistungen</a> <a href="/kontakt">Kontakt</a>
  <a href="/impressum">Impressum</a> <a href="tel:+4930123456">030 123456</a> <a href="/logo.png">Logo</a>
  <a href="https://www.instagram.com/firma">Instagram</a> <a href="mailto:info@firma.de">Mail</a></nav>
  <form action="/send" method="post"><input name="n"></form>
  <p>Musterstraße 1, 10961 Berlin</p><img src="https://firma.de/a.jpg"></body></html>`;

function page(over: Partial<PageFacts> = {}): PageFacts {
  return {
    ...analyzePage(GOOD_HTML, { finalUrl: 'https://www.firma.de/', status: 200, responseMs: 400, headers: new Headers(), httpRedirect: true, truncated: false }),
    ...over,
  };
}

const ROBOTS_OK: RobotsFacts = { fetched: true, blocksAll: false, sitemap: true };
const PSI_OK: PsiFacts = { score: 92, lcpMs: 1800, cls: 0.02, tbtMs: 90 };
const LINKS_OK: LinkProbe[] = [{ url: 'https://www.firma.de/a', status: 200 }, { url: 'https://www.firma.de/b', status: 301 }];

function codes(list: Finding[]) {
  return list.map(f => f.code);
}

test('iyi yapılandırılmış sayfa: acil ve orta bulgu yok', () => {
  const list = buildFindings({ page: page(), links: LINKS_OK, robots: ROBOTS_OK, psi: PSI_OK });
  assert.deepEqual(list.filter(f => f.status === 'err' || f.status === 'warn'), []);
  for (const key of ['mobile', 'speed', 'links', 'https', 'forms', 'stack', 'index', 'contact']) {
    assert.ok(list.some(f => f.key === key), `${key} için bulgu var`);
  }
});

test('sayfa çözümlemesi: bağlantılar, iletişim, form, altyapı', () => {
  const p = page();
  assert.deepEqual(p.internalLinks, ['https://www.firma.de/leistungen', 'https://www.firma.de/kontakt', 'https://www.firma.de/impressum']);
  assert.deepEqual(p.contact, { tel: true, mail: true, contactLink: true, impressumLink: true, address: true });
  assert.deepEqual(p.forms, { count: 1, insecure: 0, mailto: 0 });
  assert.equal(p.stack.cms, 'WordPress');
  assert.equal(p.stack.generator, 'WordPress 6.8');
  assert.equal(p.stack.jquery, '3.7.1');
  assert.equal(p.mixedContent, 0);
  assert.equal(p.https, true);
});

test('sorunlu sayfa: beklenen kodlar', () => {
  const bad = analyzePage(
    `<html><head></head><body><a href="/x">x</a><form action="http://firma.de/send"></form>
     <form action="mailto:a@b.de"></form><img src="http://firma.de/a.jpg"><script src="/js/jquery-1.12.4.min.js"></script></body></html>`,
    { finalUrl: 'https://firma.de/', status: 200, responseMs: 2400, headers: new Headers({ 'x-powered-by': 'PHP/7.4.33', 'x-robots-tag': 'noindex' }), httpRedirect: false, truncated: false },
  );
  const probes: LinkProbe[] = [
    { url: 'a', status: 404 }, { url: 'b', status: 500 }, { url: 'c', status: null }, { url: 'd', status: 200 },
  ];
  const list = buildFindings({ page: bad, links: probes, robots: { fetched: true, blocksAll: true, sitemap: false }, psi: { score: 31, lcpMs: 6200, cls: 0.4, tbtMs: 900 } });
  const got = codes(list);
  for (const code of [
    'mobile.viewport_none', 'mobile.perf_low', 'speed.slow', 'links.broken_many', 'https.no_redirect', 'https.mixed',
    'forms.insecure', 'stack.jquery_old', 'stack.php_old', 'index.noindex', 'index.robots_block', 'index.no_title',
    'index.no_description', 'index.no_sitemap', 'contact.none',
  ]) {
    assert.ok(got.includes(code), `${code} bekleniyordu: ${got.join(', ')}`);
  }
  assert.ok(!got.includes('forms.mailto'), 'insecure varken mailto ayrıca sayılmaz');
});

test('hız eşikleri', () => {
  const base = { page: page(), links: LINKS_OK, robots: ROBOTS_OK };
  const speed = (psi: PsiFacts | null, responseMs = 400) =>
    buildFindings({ ...base, page: page({ responseMs }), psi }).find(f => f.key === 'speed')!;
  assert.equal(speed({ ...PSI_OK, lcpMs: 2400 }).code, 'speed.ok');
  assert.equal(speed({ ...PSI_OK, lcpMs: 2600 }).code, 'speed.mid');
  assert.equal(speed({ ...PSI_OK, lcpMs: 4100 }).code, 'speed.slow');
  assert.equal(speed(null, 900).code, 'speed.mid');
  assert.equal(speed(null, 2000).code, 'speed.slow');
  assert.equal(speed(null, 300).code, 'speed.partial', 'PageSpeed yoksa "uygun" denmez, ölçülemediği söylenir');
  assert.equal(speed(null, 300).status, 'info');
  assert.equal(speed({ ...PSI_OK, lcpMs: 2600 }).value, 'LCP 2.6 s');
});

test('bağlantı sınıfları: bot engeli kırık sayılmaz', () => {
  assert.equal(classifyLink(200), 'ok');
  assert.equal(classifyLink(301), 'ok');
  assert.equal(classifyLink(404), 'broken');
  assert.equal(classifyLink(410), 'broken');
  assert.equal(classifyLink(503), 'broken');
  assert.equal(classifyLink(null), 'broken');
  for (const s of [401, 403, 429, 999]) assert.equal(classifyLink(s), 'blocked');
  const f = (probes: LinkProbe[]) => buildFindings({ page: page(), links: probes, robots: ROBOTS_OK, psi: PSI_OK }).find(x => x.key === 'links')!;
  assert.equal(f([{ url: 'a', status: 403 }, { url: 'b', status: 200 }]).code, 'links.ok');
  assert.equal(f([{ url: 'a', status: 404 }, { url: 'b', status: 200 }]).code, 'links.broken_some');
  assert.equal(f([]).status, 'unknown');
});

test('robots.txt ayrıştırma', () => {
  assert.equal(parseRobots('User-agent: *\nDisallow: /').blocksAll, true);
  assert.equal(parseRobots('User-agent: *\nDisallow: /admin\nSitemap: https://x.de/s.xml').blocksAll, false);
  assert.equal(parseRobots('User-agent: *\nDisallow: /admin\nSitemap: https://x.de/s.xml').listedSitemap, true);
  assert.equal(parseRobots('User-agent: Googlebot\nDisallow: /').blocksAll, false, 'başka bir bot için engel tüm siteyi kapatmaz');
  assert.equal(parseRobots('User-agent: Bingbot\nUser-agent: *\nDisallow: /').blocksAll, true, 'ardışık User-agent satırları aynı grupta');
  assert.equal(parseRobots('# yorum\nUser-agent: *\nDisallow: / # her şey').blocksAll, true);
});

test('PageSpeed yanıtı ayrıştırma', () => {
  const psi = parsePsi({ lighthouseResult: { categories: { performance: { score: 0.874 } }, audits: {
    'largest-contentful-paint': { numericValue: 3120.4 }, 'cumulative-layout-shift': { numericValue: 0.08 }, 'total-blocking-time': { numericValue: 140 } } } });
  assert.deepEqual(psi, { score: 87, lcpMs: 3120.4, cls: 0.08, tbtMs: 140 });
  assert.equal(parsePsi({}), null);
  assert.equal(parsePsi(null), null);
  assert.equal(parsePsi({ lighthouseResult: { categories: { performance: { score: 'x' } } } }), null);
  assert.equal(parsePsi({ lighthouseResult: { categories: { performance: { score: 0.5 } } } })?.lcpMs, null);
});

test('iç bağlantılar: dosyalar, başka alan adları ve tekrarlar elenir', () => {
  const base = new URL('https://www.firma.de/');
  const list = anchors(`<a href="/a">a</a><a href="/a#x">a</a><a href="https://firma.de/b/">b</a><a href="/f.pdf">pdf</a>
    <a href="//cdn.other.com/x">o</a><a href="javascript:void(0)">j</a><a href="mailto:a@b.de">m</a><a href="#top">t</a>
    <a href="/c?utm=1">c</a><a href="/">home</a>`);
  assert.deepEqual(internalLinks(list, base), ['https://www.firma.de/a', 'https://firma.de/b/', 'https://www.firma.de/c?utm=1']);
  const many = anchors(Array.from({ length: 40 }, (_, i) => `<a href="/p${i}">p</a>`).join(''));
  assert.equal(internalLinks(many, base).length, 12);
});

test('e-posta ve etiket yardımcıları', () => {
  assert.equal(hasEmail('Yazın: info@firma.de bizi bulun'), true);
  assert.equal(hasEmail('ad@host'), false);
  assert.equal(hasEmail('@@@ x@ @y.de'), false);
  assert.deepEqual(tagList('<form a=1><meta x><FORM b=2>', ['form'], 5), ['<form a=1>', '<FORM b=2>']);
  assert.equal(tagList('<form' + ' a'.repeat(2000), ['form'], 5).length, 0, 'çok uzun ya da kapanışsız etiket atlanır');
});

test('kötü niyetli girdi hızlı işlenir (kapanışsız etiketler, uzun diziler)', () => {
  const evil = [
    '<meta '.repeat(40_000), '<a href="x'.repeat(30_000), '<form '.repeat(30_000), '<script>'.repeat(20_000),
    'a'.repeat(250_000) + '@', '<'.repeat(250_000), '1'.repeat(250_000),
  ];
  for (const html of evil) {
    const began = performance.now();
    const facts = analyzePage(html.slice(0, 256 * 1024), { finalUrl: 'https://evil.example.org/', status: 200, responseMs: 10, headers: new Headers(), httpRedirect: null, truncated: true });
    const ms = performance.now() - began;
    assert.ok(ms < 400, `${html.slice(0, 12)}… ${Math.round(ms)} ms sürdü`);
    assert.ok(facts.internalLinks.length <= 12);
  }
});

test('metinler: her kod üç dilde, acil ve orta bulgularda önerilen adım var', () => {
  /* analyze.ts'in üretebildiği tüm kodlar. Yeni kod eklenirse buraya ve copy.ts'e eklenmeli. */
  const ALL = [
    'mobile.ok', 'mobile.viewport_none', 'mobile.viewport_partial', 'mobile.perf_low',
    'speed.ok', 'speed.mid', 'speed.slow', 'speed.partial',
    'links.ok', 'links.broken_some', 'links.broken_many', 'links.none_checked',
    'https.ok', 'https.none', 'https.no_redirect', 'https.mixed',
    'forms.ok', 'forms.none', 'forms.insecure', 'forms.mailto',
    'stack.info', 'stack.none', 'stack.jquery_old', 'stack.php_old',
    'index.ok', 'index.noindex', 'index.robots_block', 'index.no_title', 'index.no_description', 'index.no_sitemap',
    'contact.ok', 'contact.none', 'contact.no_phone', 'contact.no_impressum',
    'manual.ok',
  ];
  assert.deepEqual(Object.keys(FINDING_COPY).sort(), [...ALL].sort());
  const problem = /^(?:mobile\.(?:viewport|perf)|speed\.(?:mid|slow)|links\.broken|https\.(?:none|no_|mixed)|forms\.(?:insecure|mailto)|stack\.(?:jquery|php)|index\.(?!ok)|contact\.(?!ok))/;
  for (const code of ALL) {
    for (const lang of LANGS) {
      const entry = FINDING_COPY[code][lang];
      assert.ok(entry.t.length > 8, `${code}/${lang} tespit cümlesi`);
      if (problem.test(code)) assert.ok(entry.n && entry.n.length > 8, `${code}/${lang} önerilen adım`);
    }
  }
  /* Sitenin metin kuralları (DOKUMANTASYON.md): bu ifadeler kullanılmaz. */
  const banned = /ne bozuk|sitelere bakıyoruz|satın alma yok|dijital çözümler|geleceğe taşıyoruz|kusursuz performans|garanti/i;
  const blob = JSON.stringify([FINDING_COPY, REPORT_LABELS.tr, REPORT_LABELS.en, REPORT_LABELS.de.promise]);
  assert.ok(!banned.test(blob), 'yasaklı ifade');
});

test('değer biçimi: Türkçe ve Almanca virgül, İngilizce nokta', () => {
  assert.equal(localizeValue('LCP 3.2 s', 'tr'), 'LCP 3,2 s');
  assert.equal(localizeValue('LCP 3.2 s', 'de'), 'LCP 3,2 s');
  assert.equal(localizeValue('LCP 3.2 s', 'en'), 'LCP 3.2 s');
  assert.equal(localizeValue('2 / 12', 'tr'), '2 / 12');
});

test('e-posta: üç dilde üretilir, öncelik sırası ve kaçırma doğru', () => {
  const hostile = '"><script>alert(1)</script>';
  const evilPage = page({ stack: { cms: '', generator: hostile, jquery: '' }, server: '<img src=x onerror=alert(2)>' });
  const report = buildReport({
    page: evilPage,
    links: [{ url: 'a', status: 404 }, { url: 'b', status: 200 }],
    robots: ROBOTS_OK,
    psi: { ...PSI_OK, lcpMs: 5200 },
  });
  const order = priorityList(report).map(f => f.code);
  assert.deepEqual(order, ['speed.slow', 'links.broken_some'], 'acil önce, sonra orta');
  assert.deepEqual(counts(report), { err: 1, warn: 1 });

  const meta = { ref: 'SM-TEST01', receivedAt: new Date('2026-10-01T10:00:00Z') };
  for (const lang of LANGS) {
    const mail = reportEmail(report, lang, meta);
    assert.ok(mail.subject.includes('firma.de'), lang);
    assert.ok(mail.html.includes('SM-TEST01') && mail.text.includes('SM-TEST01'), lang);
    assert.ok(!mail.html.includes('<script>alert') && !mail.html.includes('<img src=x'), `${lang}: sitedeki metin kaçırılmalı`);
    assert.ok(mail.html.includes('&lt;script&gt;alert(1)'), `${lang}: kaçırılmış hali görünür`);
    assert.ok(mail.html.includes(FINDING_COPY['speed.slow'][lang].t.replace(/’/g, '&#39;').replace(/'/g, '&#39;')) || mail.html.includes(FINDING_COPY['speed.slow'][lang].t), lang);
    assert.ok(mail.text.includes(FINDING_COPY['links.broken_some'][lang].n!), lang);
  }
  const trMail = reportEmail(report, 'tr', meta);
  assert.ok(trMail.text.includes('LCP 5,2 s'), 'Türkçede ondalık virgül');
});

test('onay taslağı: bağlantı, müşteri adresi ve raporun kendisi', () => {
  const report = buildReport({ page: page(), links: LINKS_OK, robots: ROBOTS_OK, psi: PSI_OK });
  const meta = { ref: 'SM-TEST02', receivedAt: new Date('2026-10-01T10:00:00Z') };
  const mail = draftEmail(report, 'de', meta, { requester: 'kunde@firma.de', approveUrl: 'https://sitemendo.com/api/report/approve?i=abc&t=def' });
  assert.ok(mail.subject.includes('onay bekliyor'.slice(0, 3)) || /Rapor onay bekliyor/.test(mail.subject));
  assert.ok(mail.html.includes('henüz') && mail.html.includes('kunde@firma.de'));
  assert.ok(mail.html.includes('https://sitemendo.com/api/report/approve?i=abc&amp;t=def'), 'bağlantı HTML içinde kaçırılmış');
  assert.ok(mail.text.includes('https://sitemendo.com/api/report/approve?i=abc&t=def'));
  assert.ok(mail.text.includes(REPORT_LABELS.de.priorityTitle), 'müşterinin alacağı rapor Almancada gömülü');
});
