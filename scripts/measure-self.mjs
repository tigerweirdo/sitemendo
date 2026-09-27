/**
 * sitemendo.com'u Google Lighthouse ile mobil ayarda beş kez ölçer, her kategorinin
 * ortancasını lib/selfCheck.json'a yazar. Ana sayfadaki "Kendi sitemiz" bloğu bu dosyayı
 * gösterir; sayılar elle değiştirilmez. Yayından sonra çalıştırın: npm run measure
 *
 * Chrome ya da Chromium gerekir: CHROME_PATH ortam değişkeniyle verin (yoksa Lighthouse
 * sistemdeki Chrome'u arar). Lighthouse npx ile indirilir, projeye eklenmez.
 */
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const TARGET = process.env.MEASURE_URL || 'https://sitemendo.com/?lang=tr';
const RUNS = 5;
const CATEGORIES = { performance: 'performance', accessibility: 'accessibility', bestPractices: 'best-practices', seo: 'seo' };

const dir = mkdtempSync(join(tmpdir(), 'sitemendo-lh-'));
const reports = [];
for (let i = 0; i < RUNS; i++) {
  const out = join(dir, `run-${i}.json`);
  execFileSync('npx', [
    '-y', 'lighthouse@12', TARGET,
    '--quiet',
    '--chrome-flags=--headless=new',
    `--only-categories=${Object.values(CATEGORIES).join(',')}`,
    '--output=json',
    `--output-path=${out}`,
  ], { stdio: 'inherit' });
  reports.push(JSON.parse(readFileSync(out, 'utf8')));
  console.log(`ölçüm ${i + 1}/${RUNS}`);
}

const median = values => [...values].sort((a, b) => a - b)[Math.floor(values.length / 2)];
const scores = Object.fromEntries(Object.entries(CATEGORIES).map(([key, id]) => [
  key,
  median(reports.map(r => Math.round(r.categories[id].score * 100))),
]));

const result = {
  date: reports[0].fetchTime.slice(0, 10),
  tool: `Lighthouse ${reports[0].lighthouseVersion}`,
  device: reports[0].configSettings.formFactor,
  runs: RUNS,
  url: TARGET,
  scores,
};
writeFileSync(new URL('../lib/selfCheck.json', import.meta.url), `${JSON.stringify(result, null, 2)}\n`);
console.log(result);
