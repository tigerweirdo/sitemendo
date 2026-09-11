/**
 * Form durumlarını tarayıcıda dener. window.fetch mock’lanır.
 * Gerçek /api/audit ve e-posta yok.
 */
import { createRequire } from 'node:module';
import { mkdtemp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const require = createRequire(process.env.PUPPETEER_REQUIRE || import.meta.url);
const puppeteer = require('puppeteer-core');

const BRAVE = '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser';
const BASE = 'http://localhost:3000';

function assert(cond, message) {
  if (!cond) throw new Error(message);
}

async function waitHydrated(page, sel = '#top .audit-form') {
  await page.waitForFunction(selector => {
    const el = document.querySelector(selector);
    return el && Object.keys(el).some(key => key.startsWith('__react'));
  }, {}, sel);
}

async function open(page, url) {
  await page.goto(url, { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    try { sessionStorage.removeItem('sitemendo.auditForm'); } catch {}
  });
  await page.reload({ waitUntil: 'networkidle0' });
  await waitHydrated(page);
}

async function mockFetch(page, mode, delayMs = 0) {
  await page.evaluate((nextMode, wait) => {
    window.__auditMode = nextMode;
    window.__auditCalls = 0;
    window.fetch = (input, init) => {
      window.__auditCalls += 1;
      const url = typeof input === 'string' ? input : input.url;
      if (!String(url).includes('/api/audit')) {
        return Promise.reject(new Error('unexpected fetch: ' + url));
      }
      return new Promise(resolve => {
        setTimeout(() => {
          if (window.__auditMode === 'fail') {
            resolve(new Response('{}', { status: 502, headers: { 'Content-Type': 'application/json' } }));
            return;
          }
          resolve(new Response(JSON.stringify({ mode: window.__auditMode }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          }));
        }, wait);
      });
    };
  }, mode, delayMs);
}

async function run() {
  const userDataDir = await mkdtemp(join(tmpdir(), 'sitemendo-form-'));
  const browser = await puppeteer.launch({
    executablePath: BRAVE,
    headless: 'new',
    args: ['--no-first-run', '--no-default-browser-check', `--user-data-dir=${userDataDir}`],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    const hero = '#top .audit-form';
    await open(page, BASE);
    assert(await page.$eval(`${hero} label[for="hero-url"]`, el => el.textContent?.trim() === 'Site adresi'), 'url etiketi');
    assert(await page.$eval(`${hero} #hero-url`, el => el.getAttribute('aria-required') === 'true'), 'url aria-required');
    assert((await page.$eval(`${hero} .audit-form__lead`, el => el.textContent || '')).includes('ikisi de gerekir'), 'başta iki alan');

    await page.click(`${hero} button[type="submit"]`);
    const urlErr = await page.$eval(`${hero} #hero-error`, el => el.textContent);
    assert(urlErr === 'Geçerli bir site adresi girin. Örnek: siteadi.com', `url hata: ${urlErr}`);
    assert(await page.$eval(`${hero} #hero-url`, el => el.getAttribute('aria-invalid') === 'true'), 'url aria-invalid');

    await page.type(`${hero} #hero-url`, 'siteadi.com');
    const typedUrl = await page.$eval(`${hero} #hero-url`, el => el.value);
    await page.click(`${hero} button[type="submit"]`);
    await page.waitForSelector(`${hero} #hero-email`);
    assert(await page.$eval(`${hero} label[for="hero-email"]`, el => el.textContent?.trim() === 'E-posta'), 'e-posta etiketi');
    assert(await page.$eval(`${hero} #hero-email`, el => el.getAttribute('aria-required') === 'true'), 'email aria-required');

    await page.type(`${hero} #hero-email`, 'yanlis');
    await page.click(`${hero} button[type="submit"]`);
    const emailErr = await page.$eval(`${hero} #hero-error`, el => el.textContent);
    assert(emailErr === 'Geçerli bir e-posta adresi girin.', `email hata: ${emailErr}`);
    const keptEmail = await page.$eval(`${hero} #hero-email`, el => el.value);
    assert(keptEmail === 'yanlis', `email korundu: ${keptEmail}`);
    await page.click(`${hero} .form-back`);
    await page.waitForSelector(`${hero} #hero-url`);
    const keptUrl = await page.$eval(`${hero} #hero-url`, el => el.value);
    assert(keptUrl === typedUrl, `url korundu: ${keptUrl}`);
    await page.click(`${hero} button[type="submit"]`);
    await page.waitForSelector(`${hero} #hero-email`);

    await page.click(`${hero} #hero-email`, { clickCount: 3 });
    await page.type(`${hero} #hero-email`, 'ad@sirketiniz.com');

    await mockFetch(page, 'demo');
    await page.click(`${hero} button[type="submit"]`);
    await page.waitForSelector(`${hero} .done`);
    const demoText = await page.$eval(`${hero} .done`, el => el.innerText);
    assert(demoText.includes('Demo bitti. Canlı başvuru alınmadı.'), `demo başlık: ${demoText}`);
    assert(demoText.includes('Hiçbir bilgi gönderilmedi.'), 'demo not');
    assert(!demoText.includes('Talebiniz alındı.'), 'demo canlı başarı göstermesin');
    assert(!demoText.includes('48 saat'), 'demo 48 saat vaadi göstermesin');
    const demoCalls = await page.evaluate(() => window.__auditCalls);
    assert(demoCalls === 1, `demo çağrı ${demoCalls}`);

    await page.click(`${hero} .form-back`);
    await page.waitForSelector(`${hero} #hero-url`);
    await page.click(`${hero} button[type="submit"]`);
    await page.waitForSelector(`${hero} #hero-email`);
    await mockFetch(page, 'live');
    await page.click(`${hero} button[type="submit"]`);
    await page.waitForSelector(`${hero} .done`);
    const liveText = await page.$eval(`${hero} .done`, el => el.innerText);
    assert(liveText.includes('Talebiniz alındı.'), `live başlık: ${liveText}`);
    assert(liveText.includes('Kontrol raporunuzu 48 saat içinde belirttiğiniz e-posta adresine göndereceğiz.'), 'live açıklama');
    assert(!liveText.includes('Canlı başvuru alınmadı'), 'live demo metni olmasın');

    await page.click(`${hero} .form-back`);
    await page.waitForSelector(`${hero} #hero-url`);
    await page.click(`${hero} button[type="submit"]`);
    await page.waitForSelector(`${hero} #hero-email`);
    await mockFetch(page, 'fail');
    await page.click(`${hero} button[type="submit"]`);
    await page.waitForSelector(`${hero} #hero-error`);
    const failText = await page.$eval(`${hero} #hero-error`, el => el.textContent);
    assert(failText.includes('Talebiniz gönderilemedi. Lütfen tekrar deneyin veya e-posta ile bize ulaşın.'), `fail: ${failText}`);
    assert(failText.includes('hello@sitemendo.com'), 'fail mailto');
    const afterFailEmail = await page.$eval(`${hero} #hero-email`, el => el.value);
    assert(afterFailEmail === 'ad@sirketiniz.com', 'hata sonrası e-posta korundu');
    await page.click(`${hero} .form-back`);
    const afterFailUrl = await page.$eval(`${hero} #hero-url`, el => el.value);
    assert(afterFailUrl === typedUrl, 'hata sonrası site adresi korundu');

    await page.click(`${hero} button[type="submit"]`);
    await page.waitForSelector(`${hero} #hero-email`);
    await mockFetch(page, 'live', 400);
    await page.evaluate(sel => {
      const btn = document.querySelector(sel);
      btn.click();
      btn.click();
    }, `${hero} button[type="submit"]`);
    const sending = await page.$eval(`${hero} button[type="submit"]`, el => el.textContent);
    assert(sending.includes('Talebiniz gönderiliyor'), `gönderim metni: ${sending}`);
    const backDisabled = await page.$eval(`${hero} .form-back`, el => el.disabled);
    assert(backDisabled, 'gönderimde geri kapalı');
    await page.waitForSelector(`${hero} .done`);
    const lockCalls = await page.evaluate(() => window.__auditCalls);
    assert(lockCalls === 1, `çift tık çağrı ${lockCalls}`);

    const faqQs = await page.$$eval('.faq__q', els => els.map(el => el.textContent.trim()));
    assert(faqQs.length === 7, `SSS sayısı ${faqQs.length}`);
    assert(faqQs[0].includes('Ücretsiz kontrol ne içeriyor'), faqQs[0]);

    await page.setViewport({ width: 375, height: 812 });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    assert(overflow <= 1, `375 taşma ${overflow}`);

    for (const [lang, needle] of [['en', 'both are needed'], ['de', 'beides ist erforderlich']]) {
      await page.setViewport({ width: 1440, height: 900 });
      await open(page, `${BASE}/?lang=${lang}`);
      const lead = await page.$eval(`${hero} .audit-form__lead`, el => el.textContent || '');
      assert(lead.includes(needle), `${lang} lead: ${lead}`);
      await page.click(`${hero} button[type="submit"]`);
      const err = await page.$eval(`${hero} #hero-error`, el => el.textContent || '');
      if (lang === 'en') assert(err.includes('Enter a valid website address'), err);
      if (lang === 'de') assert(err.includes('Geben Sie eine gültige Website-Adresse ein'), err);
    }

    await open(page, `${BASE}/?lang=tr`);
    const startLead = await page.$eval('#start .audit-form__lead', el => el.textContent || '');
    assert(startLead.includes('ikisi de gerekir'), `start lead: ${startLead}`);

    console.log('Tarayıcı form/SSS doğrulaması geçti. Gerçek e-posta yok.');
  } finally {
    await browser.close();
  }
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
