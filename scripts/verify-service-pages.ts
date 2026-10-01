/**
 * Hizmet sayfaları: üç dilde eksiksiz içerik, meta uzunlukları, fiyatın metinlerde tekrarlanmaması
 * (fiyat ve süre content.ts'ten gelir), site metin kuralları ve SEO kaydı. Ağ yok.
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { content, type Lang } from '../lib/content';
import { LANGS } from '../lib/lang';
import { absolutePageUrl, routeMetadata, SEO_PATHS } from '../lib/seo';
import { SERVICE_PAGES, servicePages, serviceUi, type ServiceKey } from '../lib/servicePages';

const KEYS: ServiceKey[] = ['check', 'repair', 'care'];

test('her dil ve hizmet için tüm alanlar dolu, diller aynı yapıda', () => {
  for (const lang of LANGS) {
    for (const key of KEYS) {
      const p = servicePages[lang][key];
      for (const field of ['metaTitle', 'metaDescription', 'h1', 'lead', 'whoTitle', 'ctaTitle', 'ctaText'] as const) {
        assert.ok(p[field].trim().length > 5, `${lang}/${key}/${field}`);
      }
      assert.ok(p.who.length >= 3, `${lang}/${key} who`);
      assert.ok(p.faq.length >= 3, `${lang}/${key} faq`);
      for (const f of p.faq) assert.ok(f.q.endsWith('?') && f.a.length > 15, `${lang}/${key}: ${f.q}`);
      /* Yönlendirici metin yalnız onarım sayfasında; üç dilde birlikte var ya da yok. */
      assert.equal(!!p.guide, key === 'repair', `${lang}/${key} guide`);
      assert.equal(!!p.guideTitle, !!p.guide, `${lang}/${key} guideTitle`);
    }
    assert.deepEqual(Object.keys(serviceUi[lang].names), KEYS);
  }
  for (const key of KEYS) {
    const sizes = LANGS.map(l => `${servicePages[l][key].who.length}/${servicePages[l][key].faq.length}`);
    assert.equal(new Set(sizes).size, 1, `${key}: diller aynı madde sayısında (${sizes.join(' ')})`);
  }
});

test('meta başlık ve açıklama arama sonucuna sığar', () => {
  for (const lang of LANGS) {
    for (const key of KEYS) {
      const { metaTitle, metaDescription } = servicePages[lang][key];
      assert.ok(metaTitle.length <= 65, `${lang}/${key} başlık ${metaTitle.length}: ${metaTitle}`);
      assert.ok(metaDescription.length >= 80 && metaDescription.length <= 165, `${lang}/${key} açıklama ${metaDescription.length}`);
    }
  }
  const titles = LANGS.flatMap(l => KEYS.map(k => servicePages[l][k].metaTitle));
  assert.equal(new Set(titles).size, titles.length, 'başlıklar benzersiz');
});

test('fiyat ve süre metinlerde tekrarlanmaz (content.ts paket kartlarından gelir)', () => {
  const blob = JSON.stringify(servicePages);
  assert.ok(!/\d\s*€|€\s*\d/.test(blob), 'metinde sabit fiyat yok');
  for (const lang of LANGS) {
    const services = content[lang].services;
    for (const entry of SERVICE_PAGES) {
      for (const i of entry.services) assert.ok(services[i], `${lang}: services[${i}] var`);
    }
    assert.equal(services[SERVICE_PAGES[0].services[0]].price, '0 €', `${lang}: kontrol sayfası ücretsiz paketi gösterir`);
  }
});

test('site metin kuralları: yasaklı ifadeler yok', () => {
  const banned = /ne bozuk|sitelere bakıyoruz|satın alma yok|dijital çözümler|geleceğe taşıyoruz|kusursuz performans|garanti|garantiert|guarantee|#1|en iyi|\bbeste\b|best in/i;
  assert.ok(!banned.test(JSON.stringify(servicePages)), 'yasaklı ifade');
  /* Yeni site yapmıyoruz: onarım sayfası bunu açıkça söyler. */
  assert.match(servicePages.tr.repair.faq[0].a, /Hayır/);
  assert.match(servicePages.de.repair.faq[0].a, /Nein/);
  assert.match(servicePages.en.repair.faq[0].a, /^No\./);
});

test('SEO kaydı: yollar, meta ve adresler', () => {
  for (const { path, key } of SERVICE_PAGES) {
    assert.ok((SEO_PATHS as readonly string[]).includes(path), `${path} SEO_PATHS içinde`);
    for (const lang of LANGS as Lang[]) {
      const meta = routeMetadata(path, lang);
      assert.equal(meta.title, servicePages[lang][key].metaTitle);
      assert.equal(meta.description, servicePages[lang][key].metaDescription);
      assert.equal(meta.openGraph && 'url' in meta.openGraph ? meta.openGraph.url : '', absolutePageUrl(path, lang));
    }
  }
  assert.equal(absolutePageUrl('/website-check', 'tr'), 'https://sitemendo.com/website-check');
  assert.equal(absolutePageUrl('/website-check', 'de'), 'https://sitemendo.com/website-check?lang=de');
  assert.equal(new Set(SEO_PATHS).size, SEO_PATHS.length, 'yol tekrarı yok');
});
