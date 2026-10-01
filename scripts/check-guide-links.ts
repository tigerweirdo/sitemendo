/**
 * Ratgeber: alle externen Adressen (Quellen und Links im Text) live prüfen.
 * Kein Teil von `npm test` (Netzwerk). Aufruf: npm run check:links [-- --strict]
 *  - 2xx: in Ordnung. Weiterleitung auf andere Adresse: Hinweis, Adresse im Ratgeber aktualisieren.
 *  - 403/429/999 oder Zeitüberschreitung: "prüfen" (Bot-Schutz oder Netzproblem), von Hand im Browser öffnen.
 *  - 404/410/5xx/DNS-Fehler: Fehler, Exit-Code 1.
 */
import { GUIDES } from '../lib/guides';
import { linksOf } from '../lib/guides/inline';

const STRICT = process.argv.includes('--strict');
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36 SitemendoLinkCheck/1.0';
const TIMEOUT_MS = 25_000;

type Result = { url: string; status: number | null; finalUrl: string; error?: string; usedBy: string[] };

function collect() {
  const used = new Map<string, Set<string>>();
  const add = (url: string, slug: string) => {
    if (!url.startsWith('https://')) return;
    if (!used.has(url)) used.set(url, new Set());
    used.get(url)?.add(slug);
  };
  for (const g of GUIDES) {
    g.sources.forEach(s => add(s.url, g.slug));
    const texts: string[] = [...g.tldr, ...g.intro, ...g.faq.map(f => f.a)];
    for (const s of g.sections) for (const b of s.blocks) {
      if (b.t === 'p' || b.t === 'h3' || b.t === 'note') texts.push(b.x);
      else if (b.t === 'ul' || b.t === 'ol') texts.push(...b.items);
      else if (b.t === 'steps') b.items.forEach(i => texts.push(i.x));
      else if (b.t === 'table') texts.push(...b.rows.flat());
    }
    for (const t of texts) linksOf(t).forEach(l => add(l.href, g.slug));
  }
  return used;
}

async function probe(url: string): Promise<{ status: number | null; finalUrl: string; error?: string }> {
  for (const method of ['HEAD', 'GET'] as const) {
    try {
      const res = await fetch(url, { method, redirect: 'follow', headers: { 'user-agent': UA, accept: 'text/html,*/*;q=0.8', 'accept-language': 'de,en;q=0.8' }, signal: AbortSignal.timeout(TIMEOUT_MS) });
      await res.body?.cancel();
      /* Manche Server lehnen HEAD ab: dann mit GET wiederholen. */
      if (method === 'HEAD' && (res.status >= 400 || res.status === 0)) continue;
      return { status: res.status, finalUrl: res.url };
    } catch (err) {
      if (method === 'GET') return { status: null, finalUrl: url, error: err instanceof Error ? `${err.name}: ${err.message}` : String(err) };
    }
  }
  return { status: null, finalUrl: url, error: 'unbekannt' };
}

const normalize = (u: string) => u.replace(/#.*$/, '').replace(/\/$/, '');

async function main() {
  const used = collect();
  const urls = [...used.keys()].sort();
  const results: Result[] = [];
  let next = 0;
  await Promise.all(Array.from({ length: 6 }, async () => {
    while (next < urls.length) {
      const url = urls[next++];
      results.push({ url, ...(await probe(url)), usedBy: [...(used.get(url) ?? [])] });
    }
  }));
  results.sort((a, b) => a.url.localeCompare(b.url));

  let errors = 0;
  let manual = 0;
  let moved = 0;
  for (const r of results) {
    const redirected = normalize(r.finalUrl) !== normalize(r.url);
    let tag = 'OK    ';
    if (r.status === null) { tag = 'PRÜFEN'; manual++; }
    else if ([403, 429, 999].includes(r.status)) { tag = 'PRÜFEN'; manual++; }
    else if (r.status >= 400) { tag = 'FEHLER'; errors++; }
    else if (redirected) { tag = 'UMGELEITET'; moved++; }
    const note = r.error ? ` (${r.error})` : redirected ? ` → ${r.finalUrl}` : '';
    console.log(`${tag} ${r.status ?? '---'} ${r.url}${note}  [${r.usedBy.join(', ')}]`);
  }
  console.log(`\n${results.length} Adressen: ${errors} Fehler, ${manual} von Hand prüfen, ${moved} umgeleitet.`);
  if (errors > 0 || (STRICT && (manual > 0 || moved > 0))) process.exitCode = 1;
}

main().catch(err => { console.error(err); process.exitCode = 1; });
