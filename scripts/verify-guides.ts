/**
 * Ratgeber (/ratgeber Almanca, /rehber Türkçe): veri bütünlüğü, meta uzunlukları, bağlantıların çözülmesi,
 * site metin kuralları (Sie / siz, sabit fiyat yok, abartı yok), yapısal veri, hreflang çiftleri, site haritası
 * ve oluşturulan HTML. Dil başına kurallar RULES içinde. Ağ yok. Dış bağlantıların canlı denetimi için:
 * scripts/check-guide-links.ts. Her test tüm bulguları toplar ve birlikte raporlar (ilk hatada durmaz).
 */
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import sitemap from '../app/sitemap';
import { GuideArticle } from '../components/guide/GuideArticle';
import { GuideHub } from '../components/guide/GuideHub';
import { ServiceRoute } from '../components/ServiceRoute';
import { content } from '../lib/content';
import { GUIDES, counterpart, getGuide, guidesIn } from '../lib/guides';
import { Inline, SAFE_HREF, TOKENS_BY_LANG, fill, linksOf, plain } from '../lib/guides/inline';
import { SERVICE_GUIDES, guideCardsFor } from '../lib/guides/related';
import { BRAND_SUFFIX, articleSchema, breadcrumbSchema, guideMetadata, guidePath, guideStats, guideUrl, hubMetadata, hubPath, hubSchema, hubUrl, jsonLd } from '../lib/guides/seo';
import { CATEGORY_ORDER, GUIDE_LANGS, type Guide, type GuideLang } from '../lib/guides/types';
import { UI } from '../lib/guides/ui';

const GUIDE_DIR = join(import.meta.dirname, '..', 'lib', 'guides');
const DIR: Record<GuideLang, string> = { de: GUIDE_DIR, tr: join(GUIDE_DIR, 'tr') };
const NOT_GUIDE_FILES = new Set(['index.ts', 'types.ts', 'seo.ts', 'links.ts', 'related.ts', 'ui.ts', 'cardUi.ts']);
const SITE_LINKS: Record<GuideLang, string[]> = {
  de: ['/website-check?lang=de', '/website-repair?lang=de', '/website-care?lang=de', '/?lang=de', '/?lang=de#start'],
  tr: ['/website-check?lang=tr', '/website-repair?lang=tr', '/website-care?lang=tr', '/?lang=tr', '/?lang=tr#start'],
};
const SERVICE_LINKS = (lang: GuideLang) => SITE_LINKS[lang].slice(0, 3);

/* Dil başına yazım kuralları. Almanca: "Sie", „…“, "91 %". Türkçe: "siz", “…”, "%91", ’ (daktilo tırnağı yok). */
const MONTHS_DE = 'Januar|Februar|März|April|Mai|Juni|Juli|August|September|Oktober|November|Dezember';
const MONTHS_TR = 'Ocak|Şubat|Mart|Nisan|Mayıs|Haziran|Temmuz|Ağustos|Eylül|Ekim|Kasım|Aralık';
type Rules = {
  minWords: number;
  open: string;
  close: string;
  informal: RegExp;
  hype: RegExp;
  guarantee: RegExp;
  negation: RegExp;
  dated: RegExp;
  datedSlugs: string[];
  badPercent: RegExp;
  badPercentMsg: string;
  badAbbrev: RegExp | null;
  wrongQuotes: RegExp | null;
};
const RULES: Record<GuideLang, Rules> = {
  de: {
    minWords: 1400,
    open: '„',
    close: '“',
    informal: /\b(?:du|dein|deine|deinen|deinem|deiner|deines|dich|dir|euch|euer|eure)\b/i,
    hype: /\b(?:beste[rsmn]?\s+(?:Qualität|Preis\w*|Lösung\w*|Service|Anbieter|Agentur|Ergebnis\w*|Website)|Nr\.\s?1\s+(?:bei|in|der|im|auf)|Nummer 1|Platz eins|revolutionär\w*|einzigartig\w*|unschlagbar\w*|perfekt\w*|kinderleicht|mühelos|im Handumdrehen|Marktführer|führende[nmrs]?|100\s?%\s?sicher|absolut sicher|todsicher|Geheimtipp|Wundermittel)\b|#1/i,
    guarantee: /garantier\w*|Garantie\w*|Platz 1\b/gi,
    negation: /\b(?:niemand|nicht|kein|keine|keinen|ohne|skeptisch|misstrauen|Vorsicht)\b/i,
    dated: new RegExp(`Stand: (?:${MONTHS_DE}) 20\\d\\d`),
    datedSlugs: ['https-ssl-fehler-beheben', 'kontaktformular-funktioniert-nicht', 'website-nicht-bei-google-gefunden', 'impressum-pflichtangaben', 'website-wartung', 'wordpress-wartungsmodus-geht-nicht-weg', 'spf-dkim-dmarc-einrichten'],
    badPercent: /\d%/,
    badPercentMsg: 'Prozentzeichen braucht ein Leerzeichen davor ("91 %")',
    badAbbrev: /\b(?:z\.B\.|u\.a\.|d\.h\.|bzw\.\S)/,
    wrongQuotes: null,
  },
  tr: {
    minWords: 1100,
    open: '“',
    close: '”',
    informal: /\b(?:sen|senin|sana|seni|sende|senden|seninle|kendin)\b/i,
    hype: /(?<![\p{L}])(?:en iyi|mükemmel\p{L}*|kusursuz\p{L}*|harika|inanılmaz\p{L}*|rakipsiz|garantili|sihirli|birinci sıra|şaşırtıcı|devrim\p{L}*)(?![\p{L}])/iu,
    guarantee: /garanti\w*/gi,
    /* \b kennt keine türkischen Buchstaben (ş, ı, ğ): Grenzen daher über Unicode-Eigenschaften. */
    negation: /(?<![\p{L}])(?:kimse|hiçbir|değil(?:dir)?|etmez|edemez|edilemez|edilmez|yok(?:tur)?|vermez|veremez|verilmez|verilemez|vermiyoruz|vermiyor|temkinli|dikkatli|dikkat|kuşkuyla|şüpheyle)(?![\p{L}])/iu,
    dated: new RegExp(`(?:${MONTHS_TR}) 20\\d\\d itibarıyla`),
    datedSlugs: ['impressum-zorunlulugu', 'iletisim-formu-calismiyor', 'web-sitesi-google-da-gorunmuyor', 'web-sitesi-bakimi'],
    badPercent: /\d\s?%/,
    badPercentMsg: 'Türkçede yüzde işareti sayıdan önce yazılır ("%91")',
    badAbbrev: null,
    wrongQuotes: /[„"]/,
  },
};

/* Bulgu toplayıcı: test sonunda hepsi birlikte raporlanır. */
let findings: string[] = [];
const ok = (cond: unknown, msg: string) => { if (!cond) findings.push(msg); };
const eq = (a: unknown, b: unknown, msg: string) => { if (a !== b) findings.push(`${msg} (${String(a)} ≠ ${String(b)})`); };
const check = (name: string, fn: () => void) => test(name, () => {
  findings = [];
  fn();
  assert.equal(findings.length, 0, `${findings.length} Befunde:\n- ${findings.join('\n- ')}`);
});

/* Her metin parçası nerede ve nasıl gösterilir: inline = Inline bileşeni (işaret var), değilse düz metin. */
type Piece = { where: string; text: string; inline: boolean; lang: GuideLang };

function pieces(g: Guide): Piece[] {
  const out: Piece[] = [];
  const add = (where: string, text: string, inline: boolean) => out.push({ where: `${g.slug}: ${where}`, text, inline, lang: g.lang });
  add('h1', g.h1, true);
  add('title', g.title, false);
  add('description', g.description, false);
  add('teaser', g.teaser, false);
  add('short', g.short, false);
  g.tldr.forEach((x, i) => add(`tldr[${i}]`, x, true));
  g.intro.forEach((x, i) => add(`intro[${i}]`, x, true));
  for (const s of g.sections) {
    /* h2 Inline ile çizilir, ama içindekiler listesinde düz metin olarak görünür: işaret yasak. */
    add(`${s.id}/h2`, s.h2, false);
    s.blocks.forEach((b, i) => {
      const at = `${s.id}[${i}]`;
      switch (b.t) {
        case 'p': case 'h3': add(at, b.x, true); break;
        case 'ul': case 'ol': b.items.forEach((x, j) => add(`${at}.${j}`, x, true)); break;
        case 'steps': b.items.forEach((x, j) => { add(`${at}.${j}.h`, x.h, true); add(`${at}.${j}.x`, x.x, true); }); break;
        case 'table':
          add(`${at}/caption`, b.caption, false);
          b.head.forEach((x, j) => add(`${at}/head.${j}`, x, false));
          b.rows.forEach((row, r) => row.forEach((x, c) => add(`${at}/row${r}.${c}`, x, true)));
          break;
        case 'note': add(`${at}/title`, b.title, false); add(`${at}/x`, b.x, true); break;
        case 'code': add(`${at}/label`, b.label, false); break;
      }
    });
  }
  g.faq.forEach((f, i) => { add(`faq[${i}].q`, f.q, false); add(`faq[${i}].a`, f.a, true); });
  g.sources.forEach((s, i) => add(`sources[${i}]`, s.label, false));
  return out;
}

/* Gösterilen düz metin: işaretler çözülmüş, kod aralıkları çıkarılmış (kod serbest yazılır). */
const prose = (text: string, lang: GuideLang) => plain(text.replace(/`[^`\n]+`/g, ' '), lang);
const around = (text: string, re: RegExp) => text.match(new RegExp(`.{0,28}(?:${re.source}).{0,28}`, re.flags.replace('g', '')))?.[0] ?? '';
const allPieces = GUIDES.flatMap(pieces);
const slugs = GUIDES.map(g => g.slug);

check('Verzeichnis: eindeutige Adressen, jede Datei registriert, alle Kategorien sichtbar', () => {
  ok(guidesIn('de').length >= 11, `mindestens elf deutsche Ratgeber (${guidesIn('de').length})`);
  eq(new Set(slugs).size, slugs.length, 'Adressen eindeutig (sprachübergreifend)');
  for (const g of GUIDES) {
    ok(GUIDE_LANGS.includes(g.lang), `${g.slug}: lang "${g.lang}"`);
    ok(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(g.slug), `${g.slug}: Adresse nur Kleinbuchstaben, Ziffern, Bindestriche (ASCII)`);
    ok(existsSync(join(DIR[g.lang], `${g.slug}.ts`)), `${g.slug}: Datei ${g.lang === 'tr' ? 'lib/guides/tr/' : 'lib/guides/'}${g.slug}.ts fehlt`);
    ok(CATEGORY_ORDER.includes(g.category), `${g.slug}: Kategorie "${g.category}" fehlt in CATEGORY_ORDER (Übersicht)`);
    ok(['check', 'repair', 'care'].includes(g.service), `${g.slug}: service`);
  }
  for (const lang of GUIDE_LANGS) {
    if (!existsSync(DIR[lang])) continue;
    const files = readdirSync(DIR[lang]).filter(f => f.endsWith('.ts') && !(lang === 'de' && NOT_GUIDE_FILES.has(f))).map(f => f.replace(/\.ts$/, '')).sort();
    eq(files.join(','), guidesIn(lang).map(g => g.slug).sort().join(','), `${lang}: jede Ratgeber-Datei ist in lib/guides/index.ts eingetragen und umgekehrt`);
  }
  /* Jeder der acht Prüfpunkte hat mindestens einen deutschen Ratgeber. */
  const checks: string[] = content.de.checks.map(c => c.key);
  for (const key of checks) ok(guidesIn('de').some(g => g.check === key), `Prüfpunkt "${key}" ohne Ratgeber`);
  for (const g of GUIDES) if (g.check) ok(checks.includes(g.check), `${g.slug}: check "${g.check}"`);
  /* Die Übersicht jeder Sprache zeigt nur Kategorien aus CATEGORY_ORDER; Bezeichnung in jeder Sprache vorhanden. */
  for (const lang of GUIDE_LANGS) for (const cat of CATEGORY_ORDER) ok(UI[lang].categories[cat], `${lang}: Kategoriebezeichnung für ${cat}`);
});

check('Sprachpaare: Bearbeitungen verweisen auf ein deutsches Original und stimmen in den Eckdaten überein', () => {
  for (const g of GUIDES) {
    const alt = counterpart(g);
    if (g.lang === 'de') { ok(!g.translationOf, `${g.slug}: deutsche Ratgeber haben kein translationOf`); continue; }
    ok(g.translationOf, `${g.slug}: translationOf fehlt (Pilot: jeder türkische Ratgeber hat ein deutsches Original)`);
    ok(alt && alt.lang === 'de', `${g.slug}: Original "${g.translationOf}" nicht gefunden oder nicht deutsch`);
    if (!alt) continue;
    eq(counterpart(alt)?.slug, g.slug, `${g.slug}: Original findet seine Bearbeitung nicht (genau eine Bearbeitung pro Original)`);
    eq(g.check, alt.check, `${g.slug}: check weicht vom Original ab`);
    eq(g.service, alt.service, `${g.slug}: service weicht vom Original ab`);
    eq(g.category, alt.category, `${g.slug}: category weicht vom Original ab`);
    /* hreflang: beide Seiten nennen beide Sprachen, x-default ist die deutsche Fassung. */
    for (const page of [g, alt]) {
      const meta = guideMetadata(page, counterpart(page));
      const langs = (meta.alternates?.languages ?? {}) as Record<string, string>;
      eq(langs.de, guideUrl(alt), `${page.slug}: hreflang de`);
      eq(langs.tr, guideUrl(g), `${page.slug}: hreflang tr`);
      eq(langs['x-default'], guideUrl(alt), `${page.slug}: x-default`);
      eq(meta.alternates?.canonical, guideUrl(page), `${page.slug}: canonical ist die eigene Adresse`);
    }
  }
  /* Es gibt nie mehr als eine Bearbeitung pro Original. */
  const origins = GUIDES.filter(g => g.translationOf).map(g => g.translationOf);
  eq(new Set(origins).size, origins.length, 'ein Original wird mehrfach bearbeitet');
});

check('Meta: Längen, Einzigartigkeit und Marke', () => {
  const unique = (name: string, values: string[]) => eq(new Set(values).size, values.length, `${name} eindeutig`);
  for (const g of GUIDES) {
    const full = `${g.title}${BRAND_SUFFIX}`;
    ok(g.short.length >= 8 && g.short.length <= 34, `${g.slug}: short ${g.short.length} Zeichen`);
    ok(!/sitemendo/i.test(g.title), `${g.slug}: Marke gehört nicht in den Titel`);
    ok(full.length <= 60, `${g.slug}: Titel mit Marke ${full.length} > 60`);
    ok(g.title.length >= 20, `${g.slug}: Titel zu kurz`);
    ok(g.description.length >= 110 && g.description.length <= 160, `${g.slug}: Beschreibung ${g.description.length} Zeichen (110 bis 160)`);
    ok(g.teaser.length >= 60 && g.teaser.length <= 200, `${g.slug}: Teaser ${g.teaser.length}`);
    ok(plain(g.h1, g.lang).length >= 20 && plain(g.h1, g.lang).length <= 100, `${g.slug}: H1 ${plain(g.h1, g.lang).length}`);
    ok(!/[`*[\]{}]/.test(g.title + g.description + g.teaser + g.short), `${g.slug}: Auszeichnung in Meta-Feldern`);
    const meta = guideMetadata(g, counterpart(g));
    eq(JSON.stringify(meta.title), JSON.stringify({ absolute: full }), `${g.slug}: Titel`);
    eq(meta.alternates?.canonical, guideUrl(g), `${g.slug}: canonical`);
    ok(guideUrl(g).startsWith('https://') && !guideUrl(g).includes('?'), `${g.slug}: Adresse`);
    eq(guidePath(g), `${hubPath(g.lang)}/${g.slug}`, `${g.slug}: Pfad`);
    eq((meta.openGraph as { type?: string }).type, 'article', `${g.slug}: og:type`);
    eq((meta.openGraph as { locale?: string }).locale, UI[g.lang].locale, `${g.slug}: og:locale`);
    /* Das Teilen-Bild folgt der Sprache der Seite (wie auf der Hauptseite), und die Datei existiert. */
    eq((meta.openGraph as { images?: { url: string }[] }).images?.[0]?.url, `/og/${g.lang}.png`, `${g.slug}: og:image`);
    ok(existsSync(join(import.meta.dirname, '..', 'public', 'og', `${g.lang}.png`)), `${g.slug}: public/og/${g.lang}.png fehlt`);
    eq((meta.robots as { index?: boolean }).index, true, `${g.slug}: indexierbar`);
  }
  unique('Titel', GUIDES.map(g => g.title));
  unique('Beschreibungen', GUIDES.map(g => g.description));
  unique('H1', GUIDES.map(g => g.h1));
  unique('Kurznamen', GUIDES.map(g => g.short));
  unique('Teaser', GUIDES.map(g => g.teaser));
  for (const lang of GUIDE_LANGS) {
    const ui = UI[lang];
    ok(`${ui.hub.title}${BRAND_SUFFIX}`.length <= 60, `${lang}: Übersicht-Titel mit Marke ${ui.hub.title.length + BRAND_SUFFIX.length} > 60`);
    ok(ui.hub.description.length >= 110 && ui.hub.description.length <= 160, `${lang}: Übersicht-Beschreibung ${ui.hub.description.length} Zeichen (110 bis 160)`);
    const meta = hubMetadata(lang, GUIDE_LANGS.find(l => l !== lang && guidesIn(l).length > 0));
    eq(meta.alternates?.canonical, hubUrl(lang), `${lang}: Übersicht canonical`);
  }
});

check('Datum: gültig, Änderung nicht vor Veröffentlichung, nicht in der Zukunft', () => {
  /* Die Daten sind Berliner Kalendertage: "heute" in Europe/Berlin, nicht in UTC (sonst schlägt der Test in der Stunde nach Mitternacht Berliner Zeit fehl). */
  const today = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Berlin' }).format(new Date());
  for (const g of GUIDES) {
    for (const d of [g.published, g.modified]) {
      ok(/^\d{4}-\d{2}-\d{2}$/.test(d), `${g.slug}: Datumsformat ${d}`);
      ok(new Date(`${d}T00:00:00Z`).toISOString().slice(0, 10) === d, `${g.slug}: gültiges Datum ${d}`);
    }
    ok(g.modified >= g.published, `${g.slug}: modified >= published`);
    ok(g.modified <= today, `${g.slug}: modified liegt in der Zukunft`);
  }
});

check('Umfang und Aufbau: Kurzantwort, Abschnitte, FAQ, Quellen, verwandte Ratgeber', () => {
  for (const g of GUIDES) {
    const ui = UI[g.lang];
    ok(g.tldr.length >= 3 && g.tldr.length <= 5, `${g.slug}: tldr ${g.tldr.length}`);
    for (const x of g.tldr) ok(x.length >= 40 && x.length <= 460, `${g.slug}: tldr-Länge ${x.length}`);
    ok(g.intro.length >= 2 && g.intro.length <= 3, `${g.slug}: intro ${g.intro.length}`);
    ok(g.sections.length >= 4, `${g.slug}: Abschnitte ${g.sections.length}`);
    const ids = g.sections.map(s => s.id);
    eq(new Set(ids).size, ids.length, `${g.slug}: Abschnitts-IDs eindeutig`);
    for (const s of g.sections) {
      ok(/^[a-z][a-z0-9-]*$/.test(s.id), `${g.slug}: ID "${s.id}" (Kleinbuchstaben, mit Buchstabe beginnen)`);
      ok(s.id !== ui.faqId, `${g.slug}: ID reserviert`);
      ok(s.h2.length >= 8 && s.h2.length <= 110, `${g.slug}/${s.id}: H2-Länge ${s.h2.length}`);
      ok(s.blocks.length >= 1, `${g.slug}/${s.id}: leer`);
    }
    ok(g.faq.length >= 5 && g.faq.length <= 8, `${g.slug}: FAQ ${g.faq.length}`);
    const qs = g.faq.map(f => f.q);
    eq(new Set(qs).size, qs.length, `${g.slug}: Fragen eindeutig`);
    for (const f of g.faq) {
      ok(f.q.endsWith('?') && f.q.length >= 15 && f.q.length <= 120, `${g.slug}: Frage "${f.q}" (${f.q.length})`);
      ok(f.a.length >= 60 && f.a.length <= 760, `${g.slug}: Antwort zu "${f.q}" (${f.a.length})`);
    }
    ok(g.sources.length >= 4, `${g.slug}: Quellen ${g.sources.length}`);
    ok(g.related.length >= 2 && g.related.length <= 4, `${g.slug}: verwandte ${g.related.length}`);
    eq(new Set(g.related).size, g.related.length, `${g.slug}: verwandte eindeutig`);
    for (const r of g.related) {
      ok(r !== g.slug, `${g.slug}: verweist auf sich selbst`);
      ok(getGuide(r, g.lang), `${g.slug}: verwandter Ratgeber "${r}" existiert nicht in derselben Sprache`);
    }
    const { words } = guideStats(g);
    ok(words >= RULES[g.lang].minWords, `${g.slug}: nur ${words} Wörter (mindestens ${RULES[g.lang].minWords})`);
  }
});

check('Blöcke: Tabellen vollständig, Schritte, Hinweise und Code gefüllt', () => {
  const kinds = ['tip', 'warn', 'info'];
  for (const g of GUIDES) {
    let structured = 0;
    for (const s of g.sections) {
      for (const [i, b] of s.blocks.entries()) {
        const at = `${g.slug}/${s.id}[${i}]`;
        if (b.t === 'table') {
          structured++;
          ok(b.head.length >= 2 && b.head.length <= 4, `${at}: Spalten ${b.head.length}`);
          ok(b.rows.length >= 2, `${at}: Zeilen`);
          ok(b.caption.length >= 10, `${at}: Tabellenüberschrift`);
          for (const [r, row] of b.rows.entries()) {
            eq(row.length, b.head.length, `${at}: Zeile ${r} Zellenzahl`);
            for (const cell of row) ok(cell.trim().length > 0, `${at}: leere Zelle in Zeile ${r}`);
          }
          for (const h of b.head) ok(h.trim().length > 0, `${at}: leere Spaltenüberschrift`);
        } else if (b.t === 'steps') {
          structured++;
          ok(b.items.length >= 3, `${at}: mindestens drei Schritte`);
          for (const item of b.items) ok(item.h.trim().length > 3 && item.x.trim().length > 20, `${at}: Schritt "${item.h}" unvollständig`);
        } else if (b.t === 'ol') {
          structured++;
          ok(b.items.length >= 3, `${at}: mindestens drei Punkte`);
          for (const item of b.items) ok(item.trim().length > 10, `${at}: Eintrag zu kurz`);
        } else if (b.t === 'ul') {
          ok(b.items.length >= 2, `${at}: Liste mit einem Eintrag`);
          for (const item of b.items) ok(item.trim().length > 5, `${at}: Eintrag zu kurz`);
        } else if (b.t === 'note') {
          ok(kinds.includes(b.kind), `${at}: kind`);
          ok(b.title.trim().length > 3 && b.x.trim().length > 30, `${at}: Hinweis unvollständig`);
        } else if (b.t === 'code') {
          ok(b.label.trim().length > 5 && b.x.trim().length > 5, `${at}: Code unvollständig`);
          ok(!/\{[a-z]+\.[a-z]+\}/.test(b.x) && !b.x.includes('\t'), `${at}: Platzhalter oder Tab im Code`);
        } else if (b.t === 'p') {
          ok(b.x.trim().length >= 30, `${at}: Absatz zu kurz ("${b.x}")`);
        } else if (b.t === 'h3') {
          ok(b.x.trim().length >= 8 && b.x.trim().length <= 90, `${at}: Zwischenüberschrift "${b.x}" (8 bis 90 Zeichen)`);
        }
      }
    }
    ok(structured >= 2, `${g.slug}: mindestens zwei Tabellen oder Schrittfolgen (${structured})`);
  }
});

check('Auszeichnung: Platzhalter aufgelöst, keine losen Zeichen, Klartextfelder ohne Auszeichnung', () => {
  for (const { where, text, inline, lang } of allPieces) {
    eq(text, text.trim(), `${where}: Leerraum am Rand`);
    ok(!/ {2,}/.test(text), `${where}: doppeltes Leerzeichen`);
    const flat = plain(text.replace(/`[^`\n]+`/g, 'X'), lang);
    /* " .htaccess" und " .de-Domains" sind Wörter; gemeint ist ein Satzzeichen, dem ein Leerzeichen oder das Ende folgt. */
    ok(!/ [,.;:!?](?=\s|$)/.test(flat), `${where}: Leerzeichen vor Satzzeichen: ${around(flat, / [,.;:!?](?=\s|$)/)}`);
    ok(!/\*\*[^*\n]*`[^*\n]*\*\*/.test(text), `${where}: Code-Auszeichnung innerhalb von Fettdruck wird nicht gerendert`);
    for (const m of text.matchAll(/\{([a-z]+\.[a-z]+)\}/g)) ok(m[1] in TOKENS_BY_LANG[lang], `${where}: unbekannter Platzhalter {${m[1]}}`);
    if (!inline) {
      ok(!/[`*[\]{}]/.test(text), `${where}: Auszeichnung in Klartextfeld: ${around(text, /[`*[\]{}]/)}`);
      continue;
    }
    const rest = fill(text, lang)
      .replace(/`[^`\n]+`/g, ' ')
      .replace(/\[[^\]\n]+\]\([^)\s]+\)/g, ' ')
      .replace(/\*\*[^*\n]+\*\*/g, ' ');
    ok(!/[`*[\]{}]/.test(rest), `${where}: loses Zeichen nach Auszeichnung: ${around(rest, /[`*[\]{}]/)}`);
  }
});

check('Typografie und Ton: Anrede, Anführungszeichen, Abkürzungen, Prozentzeichen', () => {
  for (const { where, text, lang } of allPieces) {
    const r = RULES[lang];
    const t = prose(text, lang);
    ok(!/["']/.test(t), `${where}: gerade Anführungszeichen oder Apostroph im Fließtext: ${around(t, /["']/)}`);
    eq((t.match(new RegExp(r.open, 'g')) ?? []).length, (t.match(new RegExp(r.close, 'g')) ?? []).length, `${where}: ${r.open} und ${r.close} nicht paarweise`);
    if (r.wrongQuotes) ok(!r.wrongQuotes.test(t), `${where}: falsche Anführungszeichen für ${lang}: ${around(t, r.wrongQuotes)}`);
    if (r.badAbbrev) ok(!r.badAbbrev.test(t), `${where}: Abkürzung ohne Leerzeichen: ${around(t, r.badAbbrev)}`);
    ok(!r.badPercent.test(t), `${where}: ${r.badPercentMsg}: ${around(t, r.badPercent)}`);
    ok(!/ - /.test(t), `${where}: " - " (Bindestrich mit Leerzeichen) umformulieren: ${around(t, / - /)}`);
    /* Direkte Zitate von Meldungen dürfen die Du-/Sen-Form enthalten. */
    const outsideQuotes = t.replace(new RegExp(`${r.open}[^${r.close}]*${r.close}`, 'g'), ' ');
    ok(!r.informal.test(outsideQuotes), `${where}: informelle Anrede (Sie/siz verwenden): ${around(outsideQuotes, r.informal)}`);
  }
});

check('Textregeln: keine festen Preise, keine Übertreibung, Garantien nur verneint', () => {
  const blob = JSON.stringify(GUIDES);
  ok(!/\d\s*€|€\s*\d|\bEUR\b|\bTL\b|₺/.test(blob), 'feste Preise gehören nicht in Ratgeber, nur {price.*}-Platzhalter');
  for (const { where, text, lang } of allPieces) {
    const r = RULES[lang];
    /* "am besten" und "bestenfalls" sind Ratschläge, keine Werbung. */
    const t = prose(text, lang).replace(/\bam besten\b|\bbestenfalls\b/gi, ' ');
    ok(!r.hype.test(t), `${where}: Übertreibung: ${around(t, r.hype)}`);
    /* Wörter wie "garantieren"/"garanti" nur im verneinenden oder warnenden Zusammenhang. */
    if (where.endsWith('.q')) continue;
    for (const g of t.matchAll(r.guarantee)) {
      const ctx = t.slice(Math.max(0, (g.index ?? 0) - 90), (g.index ?? 0) + 90);
      ok(r.negation.test(ctx), `${where}: "${g[0]}" ohne Verneinung: ${ctx}`);
    }
  }
  /* Preise und Zeiten kommen aus content.ts: die Platzhalter müssen dort etwas liefern. */
  for (const lang of GUIDE_LANGS) for (const [key, value] of Object.entries(TOKENS_BY_LANG[lang])) ok(value.length > 0, `${lang}: Platzhalter ${key} ist leer`);
});

check('Datumsgebundene Aussagen tragen eine Stand-Angabe', () => {
  for (const lang of GUIDE_LANGS) {
    for (const slug of RULES[lang].datedSlugs) {
      const g = getGuide(slug, lang);
      if (!g) { if (lang === 'de') ok(false, `${slug}: fehlt`); continue; }
      const text = pieces(g).map(p => p.text).join(' ');
      ok(RULES[lang].dated.test(text), `${slug}: Stand-Angabe fehlt (${lang})`);
    }
  }
});

check('Verweise: interne Links lösen auf, externe nur https, Anker existieren, Linktexte beschreiben', () => {
  const inbound = new Map<string, Set<string>>(slugs.map(s => [s, new Set()]));
  for (const g of GUIDES) for (const r of g.related) inbound.get(r)?.add(g.slug);
  for (const { where, text, inline, lang } of allPieces) {
    if (!inline) continue;
    const owner = where.split(':')[0];
    for (const { label, href } of linksOf(text, lang)) {
      ok(SAFE_HREF.test(href), `${where}: unsicherer Link ${href}`);
      ok(label.length >= 4 && !/^(?:hier|mehr|link|klicken|buraya|tıklayın)/i.test(label), `${where}: Linktext "${label}" beschreibt das Ziel nicht`);
      if (href.startsWith('https://')) {
        const url = new URL(href);
        ok(!/utm_|fbclid|gclid/i.test(url.search), `${where}: Tracking-Parameter in ${href}`);
        ok(!/(^|\.)sitemendo\.com$/.test(url.hostname), `${where}: eigene Seite als externer Link ${href}`);
      } else if (GUIDE_LANGS.some(l => href === hubPath(l) || href.startsWith(`${hubPath(l)}/`))) {
        const hubLang = GUIDE_LANGS.find(l => href === hubPath(l) || href.startsWith(`${hubPath(l)}/`)) as GuideLang;
        const [path, hash] = href.split('#');
        if (path === hubPath(hubLang)) { ok(hash === undefined, `${where}: Anker auf Übersicht`); continue; }
        const slug = path.slice(hubPath(hubLang).length + 1);
        const target = getGuide(slug, hubLang);
        ok(target, `${where}: Ratgeber "${slug}" (${hubLang}) existiert nicht`);
        if (hash) ok(target?.sections.some(s => s.id === hash) || hash === UI[hubLang].faqId, `${where}: Anker #${hash} fehlt in ${slug}`);
        /* Nur gleichsprachige Verweise zählen als eingehende Verweise (jede Sprache soll in sich verknüpft sein). */
        if (slug !== owner && hubLang === lang) inbound.get(slug)?.add(owner);
      } else {
        ok(SITE_LINKS[lang].includes(href), `${where}: unbekannter interner Link ${href}`);
      }
    }
  }
  for (const [slug, from] of inbound) ok(from.size >= 2, `${slug}: nur ${from.size} eingehende Verweise von anderen Ratgebern derselben Sprache (${[...from].join(', ')})`);
  for (const g of GUIDES) {
    const urls = g.sources.map(s => s.url);
    eq(new Set(urls).size, urls.length, `${g.slug}: Quellen doppelt`);
    eq(new Set(g.sources.map(s => s.label)).size, urls.length, `${g.slug}: Quellenbezeichnungen doppelt`);
    for (const s of g.sources) {
      ok(SAFE_HREF.test(s.url) && s.url.startsWith('https://'), `${g.slug}: Quelle ${s.url}`);
      ok(!/utm_|fbclid|gclid/i.test(s.url), `${g.slug}: Tracking in ${s.url}`);
      ok(s.label.trim().length >= 8, `${g.slug}: Quellenbezeichnung "${s.label}"`);
    }
    /* Jeder Ratgeber führt im Text zu einer Leistungsseite in seiner Sprache; die Schlusszeile ergänzt die passende. */
    const links = pieces(g).filter(p => p.inline).flatMap(p => linksOf(p.text, g.lang).map(l => l.href));
    ok(links.some(h => SERVICE_LINKS(g.lang).includes(h)), `${g.slug}: kein Verweis auf eine Leistungsseite im Text`);
  }
});

check('Strukturierte Daten und Sitemap: Article, Breadcrumb, Übersicht, hreflang, jede Adresse einmal', () => {
  for (const g of GUIDES) {
    const a = articleSchema(g);
    eq(a['@type'], 'Article', `${g.slug}: @type`);
    ok(a.headline.length <= 110, `${g.slug}: headline ${a.headline.length}`);
    eq(a.datePublished, g.published, `${g.slug}: datePublished`);
    eq(a.dateModified, g.modified, `${g.slug}: dateModified`);
    eq(a.url, guideUrl(g), `${g.slug}: url`);
    eq(a.inLanguage, UI[g.lang].inLanguage, `${g.slug}: inLanguage`);
    ok(a.image.endsWith(`/og/${g.lang}.png`), `${g.slug}: Article-Bild folgt der Sprache (${a.image})`);
    eq(a.author['@type'], 'Organization', `${g.slug}: author`);
    ok(a.publisher.name && a.publisher.address.addressCountry === 'DE', `${g.slug}: publisher`);
    ok(!jsonLd(a).includes('<'), `${g.slug}: "<" in JSON-LD`);
    eq(JSON.stringify(JSON.parse(jsonLd(a))), JSON.stringify(a), `${g.slug}: JSON-LD-Rundlauf`);
  }
  const crumbs = breadcrumbSchema([{ name: 'A', url: 'https://x.test/a' }, { name: 'B', url: 'https://x.test/b' }]);
  eq(crumbs.itemListElement.map(i => i.position).join(','), '1,2', 'Breadcrumb-Positionen');
  for (const lang of GUIDE_LANGS) {
    const list = guidesIn(lang);
    if (!list.length) continue;
    const hub = hubSchema(lang, list);
    eq(hub.mainEntity.itemListElement.length, list.length, `${lang}: Übersicht: Anzahl in JSON-LD`);
    eq(hub.mainEntity.itemListElement.map(i => i.position).join(','), list.map((_, i) => i + 1).join(','), `${lang}: Übersicht: Positionen`);
    eq(hub.inLanguage, UI[lang].inLanguage, `${lang}: Übersicht inLanguage`);
  }

  const entries = sitemap();
  const urls = entries.map(e => e.url);
  eq(new Set(urls).size, urls.length, 'Sitemap: Adressen eindeutig');
  for (const lang of GUIDE_LANGS) if (guidesIn(lang).length) ok(urls.includes(hubUrl(lang)), `Sitemap: Übersicht ${lang} fehlt`);
  for (const g of GUIDES) {
    const entry = entries.find(e => e.url === guideUrl(g));
    ok(entry, `${g.slug}: nicht in der Sitemap`);
    eq(entry?.lastModified, g.modified, `${g.slug}: lastModified`);
    const alt = counterpart(g);
    const langs = (entry?.alternates?.languages ?? {}) as Record<string, string>;
    if (alt) {
      eq(langs.de, guideUrl(g.lang === 'de' ? g : alt), `${g.slug}: Sitemap hreflang de`);
      eq(langs.tr, guideUrl(g.lang === 'tr' ? g : alt), `${g.slug}: Sitemap hreflang tr`);
    } else {
      ok(Object.keys(langs).length === 0, `${g.slug}: hreflang ohne Gegenstück`);
    }
  }
  ok(!entries.some(e => (e.url.startsWith(hubUrl('de')) || e.url.startsWith(hubUrl('tr'))) && e.url.includes('?')), 'Sitemap: keine Sprachparameter bei Ratgebern');
});

check('Gerendertes HTML: eine H1, Überschriftenfolge, Anker, FAQ, JSON-LD, keine Reste', () => {
  for (const lang of GUIDE_LANGS) {
    if (!guidesIn(lang).length) continue;
    const hubHtml = renderToStaticMarkup(createElement(GuideHub, { lang }));
    for (const g of guidesIn(lang)) ok(hubHtml.includes(`href="${guidePath(g)}"`), `${lang}: Übersicht verlinkt ${g.slug} nicht`);
    eq((hubHtml.match(/<h1[ >]/g) ?? []).length, 1, `${lang}: Übersicht: Anzahl H1`);
    const other = GUIDE_LANGS.find(l => l !== lang && guidesIn(l).length > 0);
    if (other) ok(hubHtml.includes(`href="${hubPath(other)}"`), `${lang}: Übersicht verweist nicht auf die Übersicht der anderen Sprache`);
    ok(hubHtml.includes(`href="${hubPath(lang)}"`), `${lang}: Übersicht: eigener Link`);
  }

  for (const g of GUIDES) {
    const ui = UI[g.lang];
    const html = renderToStaticMarkup(createElement(GuideArticle, { guide: g }));
    eq((html.match(/<h1[ >]/g) ?? []).length, 1, `${g.slug}: Anzahl H1`);
    ok(!/<h[456][ >]/.test(html), `${g.slug}: Überschriftenebene tiefer als H3`);
    const heads = [...html.matchAll(/<h([1-3])[ >]/g)].map(m => Number(m[1]));
    for (let i = 1; i < heads.length; i++) ok(heads[i] - heads[i - 1] <= 1, `${g.slug}: Überschriftensprung H${heads[i - 1]} → H${heads[i]}`);

    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]);
    ok(new Set(ids).size === ids.length, `${g.slug}: doppelte id: ${ids.find((x, i) => ids.indexOf(x) !== i)}`);
    for (const m of html.matchAll(/href="#([^"]+)"/g)) if (m[1] !== 'main') ok(ids.includes(m[1]), `${g.slug}: Anker #${m[1]} ohne Ziel`);
    eq((html.match(/<details /g) ?? []).length, g.faq.length, `${g.slug}: FAQ-Einträge`);
    ok(!/href="#"|href=""/.test(html), `${g.slug}: leerer Link`);
    ok(!/\{(?:price|time)\.[a-z]+\}/.test(html), `${g.slug}: Platzhalter im HTML`);
    ok(!/\*\*|`/.test(html.replace(/<pre[\s\S]*?<\/pre>/g, '')), `${g.slug}: Markdown-Reste im HTML`);
    for (const a of html.matchAll(/<a [^>]*href="(https:\/\/[^"]+)"[^>]*>/g)) ok(/rel="noopener noreferrer"/.test(a[0]), `${g.slug}: externer Link ohne rel: ${a[1]}`);
    eq((html.match(/<a [^>]*href="http:\/\//g) ?? []).length, 0, `${g.slug}: http-Link`);
    const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1].replace(/\\u003c/g, '<')));
    eq(ld.map(x => x['@type']).join(','), 'Article,BreadcrumbList', `${g.slug}: JSON-LD`);
    ok(html.includes(`<time dateTime="${g.modified}">`), `${g.slug}: Änderungsdatum sichtbar`);
    ok(html.includes(`id="${ui.faqId}"`), `${g.slug}: FAQ-Abschnitt mit id ${ui.faqId}`);
    /* Oberflächentexte der anderen Sprache dürfen nicht durchrutschen. */
    const otherUi = UI[g.lang === 'de' ? 'tr' : 'de'];
    ok(!html.includes(`>${otherUi.tldr}<`) && !html.includes(`>${otherUi.sources}<`), `${g.slug}: Oberflächentext der anderen Sprache`);
    /* Gegenstück: sichtbarer Verweis mit Sprachangabe. */
    const alt = counterpart(g);
    if (alt) ok(html.includes(`href="${guidePath(alt)}" hrefLang="${alt.lang}"`), `${g.slug}: Verweis auf die Fassung in der anderen Sprache`);
    /* Tabellen sind per Tastatur erreichbar und beschriftet. */
    const containers = [...html.matchAll(/<div class="gd-table"([^>]*)>/g)];
    eq(containers.length, (html.match(/<table[ >]/g) ?? []).length, `${g.slug}: Tabellen ohne Container`);
    for (const t of containers) ok(/tabindex="0"/.test(t[1]) && /aria-label="/.test(t[1]), `${g.slug}: Tabellencontainer ohne tabindex oder aria-label`);
    /* Auf dem Handy werden Tabellen zu Karten: jede Zelle trägt ihre Spaltenüberschrift, Rollen halten die Tabellensemantik. */
    for (const m of html.matchAll(/<table role="table">([\s\S]*?)<\/table>/g)) {
      const cells = (m[1].match(/<td[ >]/g) ?? []).length;
      eq((m[1].match(/<td [^>]*data-label="[^"]+"/g) ?? []).length, cells, `${g.slug}: Zellen ohne data-label`);
      ok(/role="row"/.test(m[1]) && /role="columnheader"/.test(m[1]) && /role="rowheader"/.test(m[1]) && /role="cell"/.test(m[1]), `${g.slug}: Tabellenrollen fehlen`);
    }
    eq((html.match(/<table role="table">/g) ?? []).length, (html.match(/<table[ >]/g) ?? []).length, `${g.slug}: Tabelle ohne role`);
  }
});

check('Umbruch: Wörter brechen nicht mitten im Wort; lange Kennungen in Tabellen und Überschriften haben Umbruchstellen', () => {
  /* Frühere Ursache der Wortbrüche in Tabellen: overflow-wrap: anywhere senkt die Mindestbreite jeder Spalte auf nahezu null,
     die Tabelle quetscht dann schmale Spalten. In den Ratgeber-Regeln gilt break-word (bricht nur, was länger als die Zeile ist). */
  const css = readFileSync(join(import.meta.dirname, '..', 'app', 'globals.css'), 'utf8');
  for (const m of css.matchAll(/([^{}]*\.gd-[^{}]*)\{([^}]*)\}/g)) {
    ok(!/overflow-wrap:\s*anywhere|word-break:\s*break-(?:all|word)/.test(m[2]), `CSS ${m[1].trim()}: bricht Wörter mitten im Wort`);
  }
  /* Kennungen ab 28 Zeichen bekommen <wbr> nach Satzzeichen, ohne den Text zu verändern; kürzere und Fließtext bleiben unberührt. */
  const render = (text: string, soft: boolean) => renderToStaticMarkup(createElement(Inline, { text, lang: 'de', soft }));
  const noWbr = (html: string) => html.replace(/<wbr\/?>/g, '');
  for (const t of ['`selektor._domainkey.ihre-domain.de`', '`_domainkey.mail.ihre-domain.de`', '`ERR_SSL_VERSION_OR_CIPHER_MISMATCH`', '`rua=mailto:dmarc@ihre-domain.de`']) {
    const soft = render(t, true);
    ok(/<wbr\/?>/.test(soft), `${t}: keine Umbruchstelle`);
    eq(noWbr(soft), render(t, false), `${t}: Text durch Umbruchstellen verändert`);
    ok(!/<wbr/.test(render(t, false)), `${t}: Umbruchstelle ohne soft`);
    ok(!/[>.]_<wbr/.test(soft), `${t}: Unterstrich am Namensanfang vom Namen getrennt`);
  }
  for (const t of ['`kurz.de`', '`NET::ERR_CERT_DATE_INVALID`']) ok(!/<wbr/.test(render(t, true)), `${t}: Kennung unter 28 Zeichen bleibt ungeteilt`);
  /* Jede lange Kennung in einer Tabellenzelle oder Überschrift ist umbrechbar (sonst bestimmt ihre Länge die Spaltenbreite). */
  for (const g of GUIDES) {
    const html = renderToStaticMarkup(createElement(GuideArticle, { guide: g }));
    const cells = [...html.matchAll(/<(?:td|th|h2|h3)[ >][\s\S]*?<\/(?:td|th|h2|h3)>/g)].map(m => m[0]);
    for (const cell of cells) for (const m of cell.matchAll(/<code>([^<\s]{28,})<\/code>/g)) ok(false, `${g.slug}: Kennung ohne Umbruchstelle in Zelle oder Überschrift: ${m[1]}`);
  }
});

check('Leistungsseiten: passende Ratgeber, je Sprache nur die eigenen, keine auf der englischen Seite', () => {
  for (const lang of GUIDE_LANGS) {
    for (const service of ['check', 'repair', 'care'] as const) {
      const list = SERVICE_GUIDES[lang][service];
      const [min, max] = lang === 'de' ? [3, 4] : [2, 4];
      ok(list.length >= min && list.length <= max, `${lang}/${service}: ${list.length} Ratgeber (${min} bis ${max})`);
      eq(new Set(list).size, list.length, `${lang}/${service}: Ratgeber doppelt`);
      for (const slug of list) ok(getGuide(slug, lang), `${lang}/${service}: Ratgeber "${slug}" existiert nicht`);
      eq(guideCardsFor(service, lang).length, list.length, `${lang}/${service}: Karten`);
      const html = renderToStaticMarkup(createElement(ServiceRoute, { service, lang }));
      for (const slug of list) ok(html.includes(`href="${hubPath(lang)}/${slug}"`), `${service}/${lang}: Link auf ${slug} fehlt`);
      ok(html.includes(`href="${hubPath(lang)}"`), `${service}/${lang}: Link auf die Übersicht fehlt`);
      const other = GUIDE_LANGS.find(l => l !== lang) as GuideLang;
      ok(!html.includes(`href="${hubPath(other)}`), `${service}/${lang}: Link auf die Ratgeber der anderen Sprache`);
    }
  }
  for (const service of ['check', 'repair', 'care'] as const) {
    const en = renderToStaticMarkup(createElement(ServiceRoute, { service, lang: 'en' }));
    ok(!en.includes('href="/ratgeber') && !en.includes('href="/rehber'), `${service}/en: Ratgeber-Link auf der englischen Seite`);
  }
  /* Jeder deutsche Ratgeber ist von mindestens einer Leistungsseite aus erreichbar oder gehört zu einer Gruppe der Übersicht. */
  const linked = new Set(Object.values(SERVICE_GUIDES.de).flat());
  ok(linked.size >= 8, `nur ${linked.size} Ratgeber sind von deutschen Leistungsseiten verlinkt`);
});
