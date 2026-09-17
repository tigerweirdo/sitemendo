import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(process.env.PUPPETEER_REQUIRE || import.meta.url);
const puppeteer = require('puppeteer-core');
const BRAVE = '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser';
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const mark = readFileSync(join(root, 'app/icon.svg'), 'utf8')
  .replace('<svg', '<svg width="168" height="168"');

/* Paylaşım görselleri: dil başına bir tane, public/og/<dil>.png. Alt metinler content.ts'te (meta.ogAlt). */
const SUBTITLES = {
  tr: 'kontrol · düzeltme · bakım',
  de: 'Prüfung · Reparatur · Wartung',
  en: 'checks · repairs · maintenance',
};

const html = sub => `<!doctype html>
<html><head><meta charset="utf-8">
<style>
@font-face {
  font-family: Inter;
  font-weight: 500;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuI6fMZg.ttf) format("truetype");
}
@font-face {
  font-family: Inter;
  font-weight: 600;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYMZg.ttf) format("truetype");
}
  html, body { margin: 0; width: 1200px; height: 630px; background: #090909; }
  .row {
    width: 1200px; height: 630px;
    display: flex; align-items: center;
    padding: 0 96px; box-sizing: border-box; gap: 36px;
    font-family: Inter, "Helvetica Neue", Arial, sans-serif;
  }
  .copy { display: flex; flex-direction: column; gap: 14px; }
  .name {
    margin: 0; color: #F3F1EA;
    font-size: 64px; font-weight: 600; letter-spacing: 0.06em;
  }
  .name b { color: #E8F000; font-weight: 600; }
  .sub { margin: 0; color: #E8F000; font-size: 28px; font-weight: 500; letter-spacing: 0.02em; }
</style></head>
<body>
  <div class="row">
    ${mark}
    <div class="copy">
      <p class="name">SITEMENDO<b>.</b></p>
      <p class="sub">${sub}</p>
    </div>
  </div>
</body></html>`;

const browser = await puppeteer.launch({
  executablePath: BRAVE,
  headless: 'new',
  args: ['--no-first-run', '--no-default-browser-check'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
mkdirSync(join(root, 'public/og'), { recursive: true });
for (const [lang, sub] of Object.entries(SUBTITLES)) {
  await page.setContent(html(sub), { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  writeFileSync(join(root, `public/og/${lang}.png`), await page.screenshot({ type: 'png' }));
}
await browser.close();
console.log('OG görselleri yenilendi: public/og/tr.png, de.png, en.png');
