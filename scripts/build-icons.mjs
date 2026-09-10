#!/usr/bin/env node
/**
 * Regenerates app/icon.svg, app/favicon.ico, app/apple-icon.png
 * from lib/mark.json. Requires Playwright Chromium (local cache).
 *
 *   node scripts/build-icons.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const MARK = JSON.parse(readFileSync(join(root, 'lib/mark.json'), 'utf8'));

function rotPt(x, y, deg, cx, cy) {
  const a = (deg * Math.PI) / 180;
  const dx = x - cx;
  const dy = y - cy;
  return [cx + dx * Math.cos(a) - dy * Math.sin(a), cy + dx * Math.sin(a) + dy * Math.cos(a)];
}

function fmt(n) {
  return n.toFixed(3);
}

function sweep() {
  const circ = 2 * Math.PI * MARK.r;
  return ((circ - MARK.gap) / circ) * 2 * Math.PI;
}

function cPath(stroke = MARK.stroke) {
  const { cx, cy, r, rot } = MARK;
  const rO = r + stroke / 2;
  const rI = Math.max(0.4, r - stroke / 2);
  const sw = sweep();
  const large = sw > Math.PI ? 1 : 0;
  const rp = (radius, t) => rotPt(cx + radius * Math.cos(t), cy + radius * Math.sin(t), rot, cx, cy);
  const [ox0, oy0] = rp(rO, 0);
  const [ox1, oy1] = rp(rO, sw);
  const [ix0, iy0] = rp(rI, 0);
  const [ix1, iy1] = rp(rI, sw);
  return `M ${fmt(ox0)} ${fmt(oy0)} A ${fmt(rO)} ${fmt(rO)} 0 ${large} 1 ${fmt(ox1)} ${fmt(oy1)} L ${fmt(ix1)} ${fmt(iy1)} A ${fmt(rI)} ${fmt(rI)} 0 ${large} 0 ${fmt(ix0)} ${fmt(iy0)} Z`;
}

function capCenters() {
  const { cx, cy, r, rot } = MARK;
  const sw = sweep();
  return [
    rotPt(cx + r, cy, rot, cx, cy),
    rotPt(cx + r * Math.cos(sw), cy + r * Math.sin(sw), rot, cx, cy),
  ];
}

function glyphLayers(stroke, fill) {
  const path = cPath(stroke);
  const caps = capCenters();
  const capR = stroke / 2;
  return `  <path fill="${fill}" d="${path}"/>
  <circle cx="${fmt(caps[0][0])}" cy="${fmt(caps[0][1])}" r="${fmt(capR)}" fill="${fill}"/>
  <circle cx="${fmt(caps[1][0])}" cy="${fmt(caps[1][1])}" r="${fmt(capR)}" fill="${fill}"/>`;
}

function iconSvg(background = 'none') {
  const bgFill = background === 'ink' ? MARK.ink : background === 'paper' ? MARK.paper : null;
  const bg = bgFill
    ? `  <rect width="${MARK.viewBox}" height="${MARK.viewBox}" fill="${bgFill}"/>\n`
    : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${MARK.viewBox} ${MARK.viewBox}" role="img" aria-label="Sitemendo">
${bg}${glyphLayers(MARK.stroke + MARK.outline, MARK.ink)}
${glyphLayers(MARK.stroke, MARK.sulfur)}
</svg>
`;
}

function icoFromPngs(pngs) {
  const count = pngs.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(count, 4);
  const entries = [];
  let offset = 6 + 16 * count;
  for (const { size, data } of pngs) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size === 256 ? 0 : size, 0);
    e.writeUInt8(size === 256 ? 0 : size, 1);
    e.writeUInt8(0, 2);
    e.writeUInt8(0, 3);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    entries.push(e);
    offset += data.length;
  }
  return Buffer.concat([header, ...entries, ...pngs.map((p) => p.data)]);
}

function loadChromium() {
  const require = createRequire(import.meta.url);
  const candidates = [
    join(root, 'node_modules/playwright-core'),
    join(homedir(), '.npm/_npx/e058441c325e062a/node_modules/playwright-core'),
    join(homedir(), '.npm/_npx/f0a362733743bae2/node_modules/playwright-core'),
  ];
  for (const dir of candidates) {
    try {
      return require(dir);
    } catch {
      /* next */
    }
  }
  throw new Error('playwright-core bulunamadı. npx playwright install chromium');
}

const CHROME =
  process.env.CHROME
  || join(
    homedir(),
    'Library/Caches/ms-playwright/chromium-1234/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing',
  );

async function rasterSvg(browser, svg, size, { transparent = false, pageBg = '#ffffff' } = {}) {
  const page = await browser.newPage({
    viewport: { width: size, height: size },
    deviceScaleFactor: 1,
  });
  const b64 = Buffer.from(svg).toString('base64');
  const bg = transparent ? 'transparent' : pageBg;
  await page.setContent(`<!doctype html><html><head><style>
    *{margin:0;padding:0}
    html,body{width:${size}px;height:${size}px;background:${bg}}
    img{width:${size}px;height:${size}px;display:block}
  </style></head><body><img src="data:image/svg+xml;base64,${b64}" alt=""></body></html>`);
  await page.waitForTimeout(40);
  const buf = await page.screenshot({ type: 'png', omitBackground: transparent });
  await page.close();
  return buf;
}

async function rasterOg(browser, svg) {
  const w = 1200;
  const h = 630;
  const page = await browser.newPage({
    viewport: { width: w, height: h },
    deviceScaleFactor: 1,
  });
  const b64 = Buffer.from(svg).toString('base64');
  await page.setContent(`<!doctype html><html><head><style>
    *{margin:0;padding:0;box-sizing:border-box}
    html,body{width:${w}px;height:${h}px;background:${MARK.ink};font-family:ui-sans-serif,system-ui,-apple-system,Arial,sans-serif}
    .row{display:flex;align-items:center;width:${w}px;height:${h}px;padding:0 96px;gap:56px}
    img{width:248px;height:248px;flex:none}
    .copy{display:flex;flex-direction:column;gap:18px}
    .word{color:#fff;font-size:72px;font-weight:600;letter-spacing:0.12em;line-height:1}
    .word b{color:${MARK.sulfur};font-weight:600}
    .sub{color:${MARK.sulfur};font-size:28px;font-weight:500;letter-spacing:0.02em}
  </style></head><body>
    <div class="row">
      <img src="data:image/svg+xml;base64,${b64}" alt="">
      <div class="copy">
        <div class="word">SITEMENDO<b>.</b></div>
        <div class="sub">Berlin · web kontrolü</div>
      </div>
    </div>
  </body></html>`);
  await page.waitForTimeout(60);
  const buf = await page.screenshot({ type: 'png' });
  await page.close();
  return buf;
}

const tabSvg = iconSvg('none');
const appleSvg = iconSvg('paper');
writeFileSync(join(root, 'app/icon.svg'), tabSvg);

const { chromium } = loadChromium();
const browser = await chromium.launch({ executablePath: CHROME, headless: true });

const png16 = await rasterSvg(browser, tabSvg, 16, { transparent: true });
const png32 = await rasterSvg(browser, tabSvg, 32, { transparent: true });
const png48 = await rasterSvg(browser, tabSvg, 48, { transparent: true });
const png180 = await rasterSvg(browser, appleSvg, 180, { pageBg: MARK.paper });
const og = await rasterOg(browser, tabSvg);

const onPaper32 = await rasterSvg(browser, tabSvg, 64, { pageBg: MARK.paper });
const onDark32 = await rasterSvg(browser, tabSvg, 64, { pageBg: '#111111' });
const onWhite32 = await rasterSvg(browser, tabSvg, 64, { pageBg: '#ffffff' });

await browser.close();

writeFileSync(join(root, 'app/apple-icon.png'), png180);
writeFileSync(join(root, 'app/opengraph-image.png'), og);
writeFileSync(
  join(root, 'app/favicon.ico'),
  icoFromPngs([
    { size: 16, data: png16 },
    { size: 32, data: png32 },
    { size: 48, data: png48 },
  ]),
);

writeFileSync('/tmp/sitemendo-icon-16.png', png16);
writeFileSync('/tmp/sitemendo-icon-32.png', png32);
writeFileSync('/tmp/sitemendo-icon-48.png', png48);
writeFileSync('/tmp/sitemendo-icon-180.png', png180);
writeFileSync('/tmp/sitemendo-og.png', og);
writeFileSync('/tmp/sitemendo-icon-paper.png', onPaper32);
writeFileSync('/tmp/sitemendo-icon-dark.png', onDark32);
writeFileSync('/tmp/sitemendo-icon-white.png', onWhite32);

console.log('Wrote app/icon.svg, app/favicon.ico, app/apple-icon.png, app/opengraph-image.png');
