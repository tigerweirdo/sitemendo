/**
 * SEO + görsel/işlev kontrolü. Gerçek form POST / e-posta yok.
 */
import { createRequire } from 'node:module';
import { mkdtemp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const require = createRequire(process.env.PUPPETEER_REQUIRE || import.meta.url);
const puppeteer = require('puppeteer-core');

const BRAVE = '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser';
const BASE = 'http://localhost:3000';
const SITE = 'https://sitemendo.com';

function assert(cond, message) {
  if (!cond) throw new Error(message);
}

async function checkSeoHttp() {
  const robots = await (await fetch(`${BASE}/robots.txt`)).text();
  assert(robots.includes('User-Agent: *') || robots.includes('User-agent: *'), `robots ua: ${robots}`);
  assert(/allow:\s*\//i.test(robots), 'robots allow');
  assert(/disallow:\s*\/api\//i.test(robots), 'robots api');
  assert(robots.includes(`${SITE}/sitemap.xml`), `robots sitemap: ${robots}`);
  assert(!robots.includes('sitemendo.vercel.app'), 'robots eski host yok');

  const sitemap = await (await fetch(`${BASE}/sitemap.xml`)).text();
  const must = [
    `${SITE}/`,
    `${SITE}/?lang=en`,
    `${SITE}/?lang=de`,
    `${SITE}/privacy`,
    `${SITE}/privacy?lang=en`,
    `${SITE}/impressum`,
    `${SITE}/impressum?lang=de`,
  ];
  for (const url of must) assert(sitemap.includes(url), `sitemap eksik: ${url}`);
  assert(!sitemap.includes('/api/'), 'sitemap api içermesin');
  assert(!sitemap.includes('?lang=tr'), 'sitemap tr duplicate olmasın');

  const pages = [
    ['/', 'tr', `${SITE}/`, 'Sitemendo — Web siteniz için kontrol, düzeltme ve bakım'],
    ['/?lang=en', 'en', `${SITE}/?lang=en`, 'Sitemendo — Checks, repairs and maintenance for your website'],
    ['/?lang=de', 'de', `${SITE}/?lang=de`, 'Sitemendo — Prüfung, Reparatur und Wartung für Ihre Website'],
    ['/privacy?lang=en', 'en', `${SITE}/privacy?lang=en`, 'Privacy — Sitemendo'],
  ];
  for (const [path, lang, canonical, titlePart] of pages) {
    const html = await (await fetch(`${BASE}${path}`)).text();
    assert(html.includes(`<html`) && html.includes(`lang="${lang}"`), `${path} html lang=${lang}`);
    assert(html.includes(`rel="canonical"`) && html.includes(canonical), `${path} canonical ${canonical}`);
    const hreflang = /hreflang="tr"/i.test(html) && /hreflang="en"/i.test(html) && /hreflang="de"/i.test(html);
    assert(hreflang, `${path} hreflang`);
    assert(/hreflang="x-default"/i.test(html), `${path} x-default`);
    assert(html.includes(titlePart), `${path} title: ${titlePart}`);
    assert(html.includes('href="?lang=en"') && html.includes('href="?lang=de"') && html.includes('href="?lang=tr"'), `${path} dil link`);
    assert(!html.includes('Satın alma yok') && !html.includes('Nothing to buy') && !html.includes('Nichts zu kaufen'), `${path} eski satın alma`);
    assert(!/shopify|wix|squarespace|41\/100/i.test(html), `${path} uydurma sonuç`);
  }
  console.log('SEO HTTP geçti.');
}

async function waitHydrated(page) {
  await page.waitForFunction(() => {
    const el = document.querySelector('#top .audit-form, .legal-page');
    return el && Object.keys(el).some(key => key.startsWith('__react'));
  });
}

async function overflow(page, width, height = 900) {
  await page.setViewport({ width, height });
  await page.waitForFunction(() => document.fonts?.ready ?? true);
  return page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
}

async function checkBrowser() {
  const userDataDir = await mkdtemp(join(tmpdir(), 'sitemendo-review-'));
  const browser = await puppeteer.launch({
    executablePath: BRAVE,
    headless: 'new',
    args: ['--no-first-run', '--no-default-browser-check', `--user-data-dir=${userDataDir}`],
  });
  try {
    const page = await browser.newPage();
    await page.goto(BASE, { waitUntil: 'networkidle0' });
    await waitHydrated(page);

    for (const width of [375, 390, 768, 1440]) {
      const extra = await overflow(page, width);
      assert(extra <= 1, `${width}px yatay taşma ${extra}`);
    }

    await page.setViewport({ width: 390, height: 844 });
    assert(await page.$eval('.burger', el => getComputedStyle(el).display !== 'none'), '390 burger görünür');
    await page.click('.burger');
    await page.waitForSelector('#mobile-menu:not([hidden])');
    const menuHrefs = await page.$$eval('#mobile-menu .wrap > a:not(.btn)', els => els.map(a => a.getAttribute('href')));
    assert(menuHrefs.join() === '#checks,#how,#services,#faq', `menü: ${menuHrefs}`);
    await page.evaluate(() => {
      const link = document.querySelector('#mobile-menu a[href="#faq"]');
      if (!(link instanceof HTMLElement)) throw new Error('faq link yok');
      link.click();
    });
    await page.waitForFunction(() => location.hash === '#faq');
    await page.waitForFunction(() => {
      const el = document.getElementById('faq');
      return el && el.getBoundingClientRect().top < 180 && el.getBoundingClientRect().bottom > 0;
    });

    await page.setViewport({ width: 1440, height: 900 });
    const langHref = await page.$eval('.nav__right .langs a[hrefLang="en"]', el => el.getAttribute('href'));
    assert(langHref === '?lang=en', `dil href ${langHref}`);
    await page.click('.nav__right .langs a[hrefLang="en"]');
    await page.waitForFunction(() => document.documentElement.lang === 'en');
    const h1 = await page.$eval('h1', el => el.textContent || '');
    assert(h1.includes('Checks, repairs and maintenance'), `dil değişimi: ${h1}`);
    assert((await page.url()).includes('lang=en'), 'dil URL güncellendi');

    await page.click('.nav__right .langs a[hrefLang="tr"]');
    await page.waitForFunction(() => document.documentElement.lang === 'tr');
    await page.click('#top .audit-form button[type="submit"]');
    const err = await page.$eval('#hero-error', el => el.textContent);
    assert(err.includes('Geçerli bir site adresi girin'), `form adım: ${err}`);
    await page.type('#hero-url', 'siteadi.com');
    await page.click('#top .audit-form button[type="submit"]');
    await page.waitForSelector('#hero-email');
    assert(await page.$('#hero-email'), 'form e-posta adımı');

    const privacy = await page.goto(`${BASE}/privacy?lang=de`, { waitUntil: 'networkidle0' });
    assert(privacy.ok(), 'privacy de');
    await waitHydrated(page);
    const privacyH1 = await page.$eval('h1', el => el.textContent || '');
    assert(privacyH1.includes('Datenschutz'), `privacy de: ${privacyH1}`);
    const privacyLang = await page.$$eval('.langs a', els => els.map(a => a.getAttribute('href')));
    assert(privacyLang.includes('?lang=en') && privacyLang.includes('?lang=tr'), `privacy dil: ${privacyLang}`);

    console.log('Tarayıcı görsel/işlev geçti.');
  } finally {
    await browser.close();
  }
}

const seoOnly = process.argv.includes('--seo');
await checkSeoHttp();
if (!seoOnly) await checkBrowser();
console.log('İnceleme doğrulaması bitti. Gerçek e-posta yok.');
