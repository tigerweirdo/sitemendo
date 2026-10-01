/**
 * Almanca Ratgeber (/ratgeber): veri bütünlüğü, meta uzunlukları, bağlantıların çözülmesi, site metin
 * kuralları (Sie-Form, sabit fiyat yok, abartı yok), yapısal veri, site haritası ve oluşturulan HTML.
 * Ağ yok. Dış bağlantıların canlı denetimi için: scripts/check-guide-links.mjs.
 * Her test tüm bulguları toplar ve birlikte raporlar (ilk hatada durmaz).
 */
import assert from 'node:assert/strict';
import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import sitemap from '../app/sitemap';
import { GuideArticle } from '../components/guide/GuideArticle';
import { GuideHub } from '../components/guide/GuideHub';
import { ServiceRoute } from '../components/ServiceRoute';
import { content } from '../lib/content';
import { GUIDES, getGuide } from '../lib/guides';
import { SAFE_HREF, TOKENS, fill, linksOf, plain } from '../lib/guides/inline';
import { SERVICE_GUIDES, guideCardsFor } from '../lib/guides/related';
import { BRAND_SUFFIX, HUB_PATH, articleSchema, breadcrumbSchema, guideMetadata, guideStats, guideUrl, hubSchema, hubUrl, jsonLd } from '../lib/guides/seo';
import { CATEGORY_ORDER, type Guide } from '../lib/guides/types';

const GUIDE_DIR = join(import.meta.dirname, '..', 'lib', 'guides');
const NOT_GUIDE_FILES = new Set(['index.ts', 'types.ts', 'seo.ts', 'links.ts', 'related.ts']);
const SERVICE_LINKS = ['/website-check?lang=de', '/website-repair?lang=de', '/website-care?lang=de'];
const SITE_LINKS = [...SERVICE_LINKS, '/?lang=de', '/?lang=de#start'];

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
type Piece = { where: string; text: string; inline: boolean };

function pieces(g: Guide): Piece[] {
  const out: Piece[] = [];
  const add = (where: string, text: string, inline: boolean) => out.push({ where: `${g.slug}: ${where}`, text, inline });
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
const prose = (text: string) => plain(text.replace(/`[^`\n]+`/g, ' '));
const around = (text: string, re: RegExp) => text.match(new RegExp(`.{0,28}(?:${re.source}).{0,28}`, re.flags.replace('g', '')))?.[0] ?? '';
const allPieces = GUIDES.flatMap(pieces);
const slugs = GUIDES.map(g => g.slug);

check('Verzeichnis: eindeutige Adressen, jede Datei registriert, alle Kategorien sichtbar', () => {
  ok(GUIDES.length >= 11, `mindestens elf Ratgeber (${GUIDES.length})`);
  eq(new Set(slugs).size, slugs.length, 'Adressen eindeutig');
  for (const g of GUIDES) {
    ok(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(g.slug), `${g.slug}: Adresse nur Kleinbuchstaben, Ziffern, Bindestriche`);
    ok(existsSync(join(GUIDE_DIR, `${g.slug}.ts`)), `${g.slug}: Datei lib/guides/${g.slug}.ts fehlt`);
    ok(CATEGORY_ORDER.includes(g.category), `${g.slug}: Kategorie "${g.category}" fehlt in CATEGORY_ORDER (Übersicht)`);
    ok(['check', 'repair', 'care'].includes(g.service), `${g.slug}: service`);
  }
  const files = readdirSync(GUIDE_DIR).filter(f => f.endsWith('.ts') && !NOT_GUIDE_FILES.has(f)).map(f => f.replace(/\.ts$/, '')).sort();
  eq(files.join(','), [...slugs].sort().join(','), 'jede Ratgeber-Datei ist in lib/guides/index.ts eingetragen und umgekehrt');
  /* Jeder der acht Prüfpunkte hat mindestens einen Ratgeber. */
  const checks: string[] = content.de.checks.map(c => c.key);
  for (const key of checks) ok(GUIDES.some(g => g.check === key), `Prüfpunkt "${key}" ohne Ratgeber`);
  for (const g of GUIDES) if (g.check) ok(checks.includes(g.check), `${g.slug}: check "${g.check}"`);
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
    ok(plain(g.h1).length >= 20 && plain(g.h1).length <= 100, `${g.slug}: H1 ${plain(g.h1).length}`);
    ok(!/[`*[\]{}]/.test(g.title + g.description + g.teaser + g.short), `${g.slug}: Auszeichnung in Meta-Feldern`);
    const meta = guideMetadata(g);
    eq(JSON.stringify(meta.title), JSON.stringify({ absolute: full }), `${g.slug}: Titel`);
    eq(meta.alternates?.canonical, guideUrl(g.slug), `${g.slug}: canonical`);
    ok(guideUrl(g.slug).startsWith('https://') && !guideUrl(g.slug).includes('?'), `${g.slug}: Adresse`);
    eq((meta.openGraph as { type?: string }).type, 'article', `${g.slug}: og:type`);
    eq((meta.robots as { index?: boolean }).index, true, `${g.slug}: indexierbar`);
  }
  unique('Titel', GUIDES.map(g => g.title));
  unique('Beschreibungen', GUIDES.map(g => g.description));
  unique('H1', GUIDES.map(g => g.h1));
  unique('Kurznamen', GUIDES.map(g => g.short));
  unique('Teaser', GUIDES.map(g => g.teaser));
});

check('Datum: gültig, Änderung nicht vor Veröffentlichung, nicht in der Zukunft', () => {
  const today = new Date().toISOString().slice(0, 10);
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
    ok(g.tldr.length >= 3 && g.tldr.length <= 5, `${g.slug}: tldr ${g.tldr.length}`);
    for (const x of g.tldr) ok(x.length >= 40 && x.length <= 460, `${g.slug}: tldr-Länge ${x.length}`);
    ok(g.intro.length >= 2 && g.intro.length <= 3, `${g.slug}: intro ${g.intro.length}`);
    ok(g.sections.length >= 4, `${g.slug}: Abschnitte ${g.sections.length}`);
    const ids = g.sections.map(s => s.id);
    eq(new Set(ids).size, ids.length, `${g.slug}: Abschnitts-IDs eindeutig`);
    for (const s of g.sections) {
      ok(/^[a-z][a-z0-9-]*$/.test(s.id), `${g.slug}: ID "${s.id}" (Kleinbuchstaben, mit Buchstabe beginnen)`);
      ok(s.id !== 'haeufige-fragen', `${g.slug}: ID reserviert`);
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
      ok(getGuide(r), `${g.slug}: verwandter Ratgeber "${r}" existiert nicht`);
    }
    const { words } = guideStats(g);
    ok(words >= 1400, `${g.slug}: nur ${words} Wörter (mindestens 1400)`);
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
  for (const { where, text, inline } of allPieces) {
    eq(text, text.trim(), `${where}: Leerraum am Rand`);
    ok(!/ {2,}/.test(text), `${where}: doppeltes Leerzeichen`);
    const flat = plain(text.replace(/`[^`\n]+`/g, 'X'));
    /* " .htaccess" und " .de-Domains" sind Wörter; gemeint ist ein Satzzeichen, dem ein Leerzeichen oder das Ende folgt. */
    ok(!/ [,.;:!?](?=\s|$)/.test(flat), `${where}: Leerzeichen vor Satzzeichen: ${around(flat, / [,.;:!?](?=\s|$)/)}`);
    ok(!/\*\*[^*\n]*`[^*\n]*\*\*/.test(text), `${where}: Code-Auszeichnung innerhalb von Fettdruck wird nicht gerendert`);
    for (const m of text.matchAll(/\{([a-z]+\.[a-z]+)\}/g)) ok(m[1] in TOKENS, `${where}: unbekannter Platzhalter {${m[1]}}`);
    if (!inline) {
      ok(!/[`*[\]{}]/.test(text), `${where}: Auszeichnung in Klartextfeld: ${around(text, /[`*[\]{}]/)}`);
      continue;
    }
    const rest = fill(text)
      .replace(/`[^`\n]+`/g, ' ')
      .replace(/\[[^\]\n]+\]\([^)\s]+\)/g, ' ')
      .replace(/\*\*[^*\n]+\*\*/g, ' ');
    ok(!/[`*[\]{}]/.test(rest), `${where}: loses Zeichen nach Auszeichnung: ${around(rest, /[`*[\]{}]/)}`);
  }
});

check('Typografie und Ton: Sie-Form, deutsche Anführungszeichen, Abkürzungen', () => {
  for (const { where, text } of allPieces) {
    const t = prose(text);
    ok(!/["']/.test(t), `${where}: gerade Anführungszeichen oder Apostroph im Fließtext: ${around(t, /["']/)}`);
    eq((t.match(/„/g) ?? []).length, (t.match(/“/g) ?? []).length, `${where}: „ und “ nicht paarweise`);
    ok(!/\b(?:z\.B\.|u\.a\.|d\.h\.|bzw\.\S)/.test(t), `${where}: Abkürzung ohne Leerzeichen: ${around(t, /\b(?:z\.B\.|u\.a\.|d\.h\.|bzw\.\S)/)}`);
    ok(!/\d%/.test(t), `${where}: Prozentzeichen braucht ein Leerzeichen davor: ${around(t, /\d%/)}`);
    ok(!/ - /.test(t), `${where}: " - " (Bindestrich mit Leerzeichen) umformulieren: ${around(t, / - /)}`);
    /* Direkte Zitate von Meldungen („… deiner Website …“) dürfen die Du-Form enthalten. */
    const outsideQuotes = t.replace(/„[^“]*“/g, ' ');
    const du = /\b(?:du|dein|deine|deinen|deinem|deiner|deines|dich|dir|euch|euer|eure)\b/i;
    ok(!du.test(outsideQuotes), `${where}: Du-Form (Sie verwenden): ${around(outsideQuotes, du)}`);
  }
});

check('Textregeln: keine festen Preise, keine Übertreibung, Garantien nur verneint', () => {
  const blob = JSON.stringify(GUIDES);
  ok(!/\d\s*€|€\s*\d|\bEUR\b/.test(blob), 'feste Preise gehören nicht in Ratgeber, nur {price.*}-Platzhalter');
  const hype = /\b(?:beste[rsmn]?\s+(?:Qualität|Preis\w*|Lösung\w*|Service|Anbieter|Agentur|Ergebnis\w*|Website)|Nr\.\s?1\s+(?:bei|in|der|im|auf)|Nummer 1|Platz eins|revolutionär\w*|einzigartig\w*|unschlagbar\w*|perfekt\w*|kinderleicht|mühelos|im Handumdrehen|Marktführer|führende[nmrs]?|100\s?%\s?sicher|absolut sicher|todsicher|Geheimtipp|Wundermittel)\b|#1/i;
  for (const { where, text } of allPieces) {
    /* "am besten" und "bestenfalls" sind Ratschläge, keine Werbung. */
    const t = prose(text).replace(/\bam besten\b|\bbestenfalls\b/gi, ' ');
    ok(!hype.test(t), `${where}: Übertreibung: ${around(t, hype)}`);
    /* Wörter wie "garantieren" nur im verneinenden oder warnenden Zusammenhang. */
    if (where.endsWith('.q')) continue;
    for (const g of t.matchAll(/garantier\w*|Garantie\w*|Platz 1\b/gi)) {
      const ctx = t.slice(Math.max(0, (g.index ?? 0) - 90), (g.index ?? 0) + 90);
      ok(/\b(?:niemand|nicht|kein|keine|keinen|ohne|skeptisch|misstrauen|Vorsicht)\b/i.test(ctx), `${where}: "${g[0]}" ohne Verneinung: ${ctx}`);
    }
  }
  /* Preise und Zeiten kommen aus content.ts: die Platzhalter müssen dort etwas liefern. */
  for (const [key, value] of Object.entries(TOKENS)) ok(value.length > 0, `Platzhalter ${key} ist leer`);
});

check('Datumsgebundene Aussagen tragen eine Stand-Angabe', () => {
  const dated = ['https-ssl-fehler-beheben', 'kontaktformular-funktioniert-nicht', 'website-nicht-bei-google-gefunden', 'impressum-pflichtangaben', 'website-wartung'];
  for (const slug of dated) {
    const g = getGuide(slug);
    if (!g) { ok(false, `${slug}: fehlt`); continue; }
    const text = pieces(g).map(p => p.text).join(' ');
    ok(/Stand: (?:Januar|Februar|März|April|Mai|Juni|Juli|August|September|Oktober|November|Dezember) 20\d\d/.test(text), `${slug}: Stand-Angabe fehlt`);
  }
});

check('Verweise: interne Links lösen auf, externe nur https, Anker existieren, Linktexte beschreiben', () => {
  const inbound = new Map<string, Set<string>>(slugs.map(s => [s, new Set()]));
  for (const g of GUIDES) for (const r of g.related) inbound.get(r)?.add(g.slug);
  for (const { where, text, inline } of allPieces) {
    if (!inline) continue;
    const owner = where.split(':')[0];
    for (const { label, href } of linksOf(text)) {
      ok(SAFE_HREF.test(href), `${where}: unsicherer Link ${href}`);
      ok(label.length >= 4 && !/^(?:hier|mehr|link|klicken)/i.test(label), `${where}: Linktext "${label}" beschreibt das Ziel nicht`);
      if (href.startsWith('https://')) {
        const url = new URL(href);
        ok(!/utm_|fbclid|gclid/i.test(url.search), `${where}: Tracking-Parameter in ${href}`);
        ok(!/(^|\.)sitemendo\.com$/.test(url.hostname), `${where}: eigene Seite als externer Link ${href}`);
      } else if (href.startsWith(`${HUB_PATH}/`) || href === HUB_PATH) {
        const [path, hash] = href.split('#');
        if (path === HUB_PATH) { ok(hash === undefined, `${where}: Anker auf Übersicht`); continue; }
        const slug = path.slice(HUB_PATH.length + 1);
        const target = getGuide(slug);
        ok(target, `${where}: Ratgeber "${slug}" existiert nicht`);
        if (hash) ok(target?.sections.some(s => s.id === hash) || hash === 'haeufige-fragen', `${where}: Anker #${hash} fehlt in ${slug}`);
        if (slug !== owner) inbound.get(slug)?.add(owner);
      } else {
        ok(SITE_LINKS.includes(href), `${where}: unbekannter interner Link ${href}`);
      }
    }
  }
  for (const [slug, from] of inbound) ok(from.size >= 2, `${slug}: nur ${from.size} eingehende Verweise von anderen Ratgebern (${[...from].join(', ')})`);
  for (const g of GUIDES) {
    const urls = g.sources.map(s => s.url);
    eq(new Set(urls).size, urls.length, `${g.slug}: Quellen doppelt`);
    eq(new Set(g.sources.map(s => s.label)).size, urls.length, `${g.slug}: Quellenbezeichnungen doppelt`);
    for (const s of g.sources) {
      ok(SAFE_HREF.test(s.url) && s.url.startsWith('https://'), `${g.slug}: Quelle ${s.url}`);
      ok(!/utm_|fbclid|gclid/i.test(s.url), `${g.slug}: Tracking in ${s.url}`);
      ok(s.label.trim().length >= 8, `${g.slug}: Quellenbezeichnung "${s.label}"`);
    }
    /* Jeder Ratgeber führt im Text zu einer Leistungsseite; die Schlusszeile ergänzt die passende. */
    const links = pieces(g).filter(p => p.inline).flatMap(p => linksOf(p.text).map(l => l.href));
    ok(links.some(h => SERVICE_LINKS.includes(h)), `${g.slug}: kein Verweis auf eine Leistungsseite im Text`);
  }
});

check('Strukturierte Daten und Sitemap: Article, Breadcrumb, Übersicht, jede Adresse einmal', () => {
  for (const g of GUIDES) {
    const a = articleSchema(g);
    eq(a['@type'], 'Article', `${g.slug}: @type`);
    ok(a.headline.length <= 110, `${g.slug}: headline ${a.headline.length}`);
    eq(a.datePublished, g.published, `${g.slug}: datePublished`);
    eq(a.dateModified, g.modified, `${g.slug}: dateModified`);
    eq(a.url, guideUrl(g.slug), `${g.slug}: url`);
    eq(a.author['@type'], 'Organization', `${g.slug}: author`);
    ok(a.publisher.name && a.publisher.address.addressCountry === 'DE', `${g.slug}: publisher`);
    ok(!jsonLd(a).includes('<'), `${g.slug}: "<" in JSON-LD`);
    eq(JSON.stringify(JSON.parse(jsonLd(a))), JSON.stringify(a), `${g.slug}: JSON-LD-Rundlauf`);
  }
  const crumbs = breadcrumbSchema([{ name: 'A', url: 'https://x.test/a' }, { name: 'B', url: 'https://x.test/b' }]);
  eq(crumbs.itemListElement.map(i => i.position).join(','), '1,2', 'Breadcrumb-Positionen');
  const hub = hubSchema(GUIDES);
  eq(hub.mainEntity.itemListElement.length, GUIDES.length, 'Übersicht: Anzahl in JSON-LD');
  eq(hub.mainEntity.itemListElement.map(i => i.position).join(','), GUIDES.map((_, i) => i + 1).join(','), 'Übersicht: Positionen');

  const entries = sitemap();
  const urls = entries.map(e => e.url);
  eq(new Set(urls).size, urls.length, 'Sitemap: Adressen eindeutig');
  ok(urls.includes(hubUrl), 'Sitemap: Übersicht fehlt');
  for (const g of GUIDES) {
    const entry = entries.find(e => e.url === guideUrl(g.slug));
    ok(entry, `${g.slug}: nicht in der Sitemap`);
    eq(entry?.lastModified, g.modified, `${g.slug}: lastModified`);
  }
  ok(!entries.some(e => e.url.startsWith(hubUrl) && e.url.includes('?')), 'Sitemap: keine Sprachparameter bei Ratgebern');
});

check('Gerendertes HTML: eine H1, Überschriftenfolge, Anker, FAQ, JSON-LD, keine Reste', () => {
  const hubHtml = renderToStaticMarkup(createElement(GuideHub));
  for (const g of GUIDES) ok(hubHtml.includes(`href="${HUB_PATH}/${g.slug}"`), `Übersicht verlinkt ${g.slug} nicht`);
  eq((hubHtml.match(/<h1[ >]/g) ?? []).length, 1, 'Übersicht: Anzahl H1');

  for (const g of GUIDES) {
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

check('Leistungsseiten: passende Ratgeber, nur auf der deutschen Seite sichtbar', () => {
  for (const service of ['check', 'repair', 'care'] as const) {
    const list = SERVICE_GUIDES[service];
    ok(list.length >= 3 && list.length <= 4, `${service}: ${list.length} Ratgeber (3 bis 4)`);
    eq(new Set(list).size, list.length, `${service}: Ratgeber doppelt`);
    for (const slug of list) ok(getGuide(slug), `${service}: Ratgeber "${slug}" existiert nicht`);
    eq(guideCardsFor(service).length, list.length, `${service}: Karten`);
    const de = renderToStaticMarkup(createElement(ServiceRoute, { service, lang: 'de' }));
    for (const slug of list) ok(de.includes(`href="/ratgeber/${slug}"`), `${service}/de: Link auf ${slug} fehlt`);
    ok(de.includes('href="/ratgeber"'), `${service}/de: Link auf die Übersicht fehlt`);
    ok(de.includes('Passende Ratgeber'), `${service}/de: Überschrift`);
    /* Die Ratgeber sind Deutsch: türkische und englische Leistungsseiten verlinken sie nicht. */
    for (const lang of ['tr', 'en'] as const) ok(!renderToStaticMarkup(createElement(ServiceRoute, { service, lang })).includes('/ratgeber'), `${service}/${lang}: Ratgeber-Link auf einer nicht deutschen Seite`);
  }
  /* Jeder Ratgeber ist von mindestens einer Leistungsseite aus erreichbar oder gehört zu einer Gruppe der Übersicht. */
  const linked = new Set(Object.values(SERVICE_GUIDES).flat());
  ok(linked.size >= 8, `nur ${linked.size} Ratgeber sind von Leistungsseiten verlinkt`);
});
