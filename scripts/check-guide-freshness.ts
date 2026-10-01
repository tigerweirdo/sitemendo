/**
 * Ratgeber: datumsgebundene Aussagen rechtzeitig erneuern. Kein Teil von `npm test`, damit ein Termin
 * nicht plötzlich den Test rot färbt. Aufruf: npm run check:freshness   (monatlich, Kalendereintrag)
 *  - "FÄLLIG": Frist erreicht und die Formulierung steht noch im Text oder Code.
 *  - "bald":   Frist in den nächsten 60 Tagen.
 * Exit-Code 1, sobald etwas fällig ist. Neue datumsgebundene Aussage? Hier eine Regel ergänzen.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { GUIDES } from '../lib/guides';

const ROOT = join(import.meta.dirname, '..');
const TODAY = new Date().toISOString().slice(0, 10);
const DAY = 86_400_000;
const daysUntil = (iso: string) => Math.round((Date.parse(`${iso}T00:00:00Z`) - Date.parse(`${TODAY}T00:00:00Z`)) / DAY);

type Rule = { id: string; due: string; files: string[]; pattern: RegExp; todo: string };

const guideFile = (slug: string) => `lib/guides/${slug}.ts`;
const RULES: Rule[] = [
  {
    id: 'chrome-154', due: '2026-11-15', pattern: /Chrome 154|Version 154/,
    files: [guideFile('https-ssl-fehler-beheben'), guideFile('website-selbst-pruefen')],
    todo: 'Chrome 154 sollte ausgeliefert sein: Formulierungen von "angekündigt" auf "seit dem …" ändern (Quelle blog.google/security/https-by-defau prüfen), Teaser und H2 anpassen.',
  },
  {
    id: 'php-8.2-ende', due: '2027-01-01', pattern: /31\. Dezember 2026/,
    files: [guideFile('website-wartung'), guideFile('website-laedt-langsam'), guideFile('website-selbst-pruefen')],
    todo: 'PHP 8.2 ist ausgelaufen: Tabelle, Absatz und FAQ aktualisieren (php.net/supported-versions.php), Stand-Angaben erneuern.',
  },
  {
    id: 'php-schwelle-pruefung', due: '2027-01-01', pattern: /Number\(php\[2\]\) < 2/,
    files: ['lib/report/analyze.ts'],
    todo: 'Die Prüfung meldet PHP vor 8.2 als veraltet. Ab 1.1.2027 gilt 8.2 als ausgelaufen: Schwelle auf 8.3 anheben, Kommentar und lib/report/copy.ts (stack.php_old) anpassen, Tests ergänzen.',
  },
  {
    id: 'zertifikat-100-tage', due: '2027-03-15', pattern: /15\. März 2027/,
    files: [guideFile('https-ssl-fehler-beheben')],
    todo: 'Ab dem 15.3.2027 gilt eine Höchstlaufzeit von 100 Tagen (SC-081v3): Zeitform im Hinweis anpassen.',
  },
  {
    id: 'patchstack-bericht', due: '2027-03-01', pattern: /State of WordPress Security in 2026/,
    files: [guideFile('website-wartung')],
    todo: 'Patchstack veröffentlicht den Jahresbericht im Februar: Zahlen für 2026 übernehmen (Gesamtzahl, Anteil Plugins/Themes/Kern, Zeit bis zum ersten Angriff), Quelle und Tldr anpassen.',
  },
  {
    id: 'dmarc-freemail', due: '2027-01-15', pattern: /Yahoo verlangt/,
    files: [guideFile('kontaktformular-funktioniert-nicht')],
    todo: 'DMARC-Richtlinien der Freemail-Anbieter erneut abfragen (dig +short TXT _dmarc.yahoo.com, _dmarc.gmx.de, _dmarc.web.de, _dmarc.gmail.com, _dmarc.outlook.com, _dmarc.t-online.de) und Absatz sowie FAQ anpassen.',
  },
  {
    id: 'gesetze-impressum', due: '2027-04-01', pattern: /Stand: Oktober 2026/,
    files: [guideFile('impressum-pflichtangaben')],
    todo: '§ 5 und § 33 DDG, § 36 VSBG, § 18 MStV und das IHK-Merkblatt auf Änderungen prüfen (gesetze-im-internet.de, Aktualitätendienst), Stand-Angabe erneuern.',
  },
];

let overdue = 0;
const lines: string[] = [];
for (const rule of RULES) {
  const hits = rule.files.filter(file => rule.pattern.test(readFileSync(join(ROOT, file), 'utf8')));
  if (!hits.length) continue;
  const d = daysUntil(rule.due);
  if (d <= 0) { overdue++; lines.push(`FÄLLIG  ${rule.due} (${-d} Tage überfällig)  ${rule.id}\n          ${rule.todo}\n          Dateien: ${hits.join(', ')}`); }
  else if (d <= 60) lines.push(`bald    ${rule.due} (in ${d} Tagen)  ${rule.id}\n          ${rule.todo}\n          Dateien: ${hits.join(', ')}`);
}

/* Allgemein: jeder Ratgeber wird mindestens halbjährlich gegen seine Quellen geprüft (modified anheben). */
for (const g of GUIDES) {
  const age = -daysUntil(g.modified);
  if (age > 183) { overdue++; lines.push(`FÄLLIG  ${g.slug}: zuletzt geändert vor ${age} Tagen (${g.modified}). Quellen prüfen (npm run check:links), Aussagen gegenlesen, modified anheben.`); }
  else if (age > 123) lines.push(`bald    ${g.slug}: zuletzt geändert vor ${age} Tagen, Halbjahresprüfung steht an.`);
}

console.log(lines.length ? lines.join('\n') : `Heute (${TODAY}) ist nichts fällig und in den nächsten 60 Tagen steht nichts an.`);
if (overdue) process.exitCode = 1;
