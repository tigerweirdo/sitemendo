/* Anında ön kontrol: ziyaretçinin girdiği sitenin ana sayfasından dışarıdan okunabilen
   birkaç teknik işaret. Ağ işi worker/precheck.ts'te; burada ağ gerektirmeyen kurallar
   (adres süzgeci, <head> çözümlemesi, eşikler) duruyor, testler bunları doğrudan çağırır. */

export type PrecheckId = 'https' | 'redirect' | 'speed' | 'viewport' | 'title' | 'description' | 'index';
export type PrecheckStatus = 'ok' | 'warn' | 'err';
export type PrecheckCode =
  | 'https.ok' | 'https.none'
  | 'redirect.ok' | 'redirect.none'
  | 'speed.fast' | 'speed.mid' | 'speed.slow'
  | 'viewport.ok' | 'viewport.partial' | 'viewport.none'
  | 'title.ok' | 'title.long' | 'title.none'
  | 'description.ok' | 'description.length' | 'description.none'
  | 'index.ok' | 'index.blocked';

export type PrecheckItem = { id: PrecheckId; status: PrecheckStatus; code: PrecheckCode; value?: string };
export type PrecheckResult = { host: string; items: PrecheckItem[] };
export type PrecheckResponse = PrecheckResult | { error: 'UNREACHABLE' | 'BLOCKED' | 'INVALID' | 'RATE' };

export const PRECHECK_ORDER: PrecheckId[] = ['https', 'redirect', 'speed', 'viewport', 'title', 'description', 'index'];

/* Sunucu yanıt süresi Cloudflare veri merkezinden ölçülür, ziyaretçinin cihazından değil. */
export const SPEED_OK_MS = 800;
export const SPEED_WARN_MS = 1800;

const BLOCKED_SUFFIXES = ['.local', '.localhost', '.internal', '.lan', '.home', '.arpa', '.test', '.invalid', '.example'];
const OWN_HOSTS = ['sitemendo.com'];

/* Yalnız herkese açık alan adları: IP adresi, yerel ad, standart dışı port ve kendi alan
   adımız açılmaz (Worker başka bir iç servise ya da kendine istek atmasın). Yönlendirmedeki
   her adres de aynı süzgeçten geçer. */
export function safeTarget(value: string) {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return null;
  }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;
  if (url.username || url.password) return null;
  if (url.port && url.port !== '80' && url.port !== '443') return null;
  const host = url.hostname.toLowerCase().replace(/\.$/, '');
  if (!host.includes('.') || host.length > 253) return null;
  if (/^[\d.]+$/.test(host) || host.startsWith('[') || host.includes(':')) return null;
  if (host === 'localhost' || BLOCKED_SUFFIXES.some(s => host.endsWith(s))) return null;
  if (OWN_HOSTS.some(own => host === own || host.endsWith(`.${own}`))) return null;
  url.hash = '';
  return url;
}

export function speedItem(ms: number): PrecheckItem {
  const value = `${Math.round(ms)} ms`;
  if (ms <= SPEED_OK_MS) return { id: 'speed', status: 'ok', code: 'speed.fast', value };
  if (ms <= SPEED_WARN_MS) return { id: 'speed', status: 'warn', code: 'speed.mid', value };
  return { id: 'speed', status: 'err', code: 'speed.slow', value };
}

const ATTR = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+))/g;

export function attributes(tag: string) {
  const out: Record<string, string> = {};
  for (const m of tag.matchAll(ATTR)) out[m[1].toLowerCase()] = (m[2] ?? m[3] ?? m[4] ?? '').trim();
  return out;
}

export function decodeEntities(text: string) {
  return text
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([\da-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

/* <head> içindeki başlık, açıklama, viewport ve robots etiketleri. Tam HTML ayrıştırıcı
   değil: yalnız belgenin başını okur, <body> başladıktan sonrasına bakmaz. */
export function analyzeHead(html: string, robotsHeader: string | null): PrecheckItem[] {
  const bodyAt = html.search(/<body[\s>]/i);
  const head = bodyAt >= 0 ? html.slice(0, bodyAt) : html;
  /* Etiket gövdesi en çok 2000 karakter ve '<' / '>' içermez: kapanışsız etiketlerle dolu bir
     sayfa ([^>]* ile) kuadratik yavaşlatır, 256 KB'lık bir girdi ~15 sn CPU yakardı. */
  const metas = [...head.matchAll(/<meta\b[^<>]{0,2000}>/gi)].map(m => attributes(m[0]));
  const meta = (name: string) => metas.find(a => a.name?.toLowerCase() === name)?.content;

  const items: PrecheckItem[] = [];

  const viewport = meta('viewport');
  if (viewport === undefined) items.push({ id: 'viewport', status: 'err', code: 'viewport.none' });
  else if (/width\s*=\s*device-width/i.test(viewport)) items.push({ id: 'viewport', status: 'ok', code: 'viewport.ok' });
  else items.push({ id: 'viewport', status: 'warn', code: 'viewport.partial' });

  const titleMatch = head.match(/<title\b[^<>]{0,2000}>([^<]{0,2000})<\/title>/i);
  const title = titleMatch ? decodeEntities(titleMatch[1]) : '';
  if (!title) items.push({ id: 'title', status: 'err', code: 'title.none' });
  else if ([...title].length > 70) items.push({ id: 'title', status: 'warn', code: 'title.long', value: String([...title].length) });
  else items.push({ id: 'title', status: 'ok', code: 'title.ok' });

  const description = meta('description');
  const descLength = description ? [...decodeEntities(description)].length : 0;
  if (!descLength) items.push({ id: 'description', status: 'warn', code: 'description.none' });
  else if (descLength < 50 || descLength > 170) items.push({ id: 'description', status: 'warn', code: 'description.length', value: String(descLength) });
  else items.push({ id: 'description', status: 'ok', code: 'description.ok' });

  const robots = [meta('robots'), meta('googlebot'), robotsHeader].filter(Boolean).join(',');
  if (/\bnoindex\b|\bnone\b/i.test(robots)) items.push({ id: 'index', status: 'err', code: 'index.blocked' });
  else items.push({ id: 'index', status: 'ok', code: 'index.ok' });

  return items;
}

export function sortItems(items: PrecheckItem[]) {
  return [...items].sort((a, b) => PRECHECK_ORDER.indexOf(a.id) - PRECHECK_ORDER.indexOf(b.id));
}

export function isPrecheckResult(data: unknown): data is PrecheckResult {
  if (!data || typeof data !== 'object') return false;
  const d = data as Record<string, unknown>;
  return typeof d.host === 'string' && Array.isArray(d.items)
    && d.items.every(i => i && typeof i === 'object' && PRECHECK_ORDER.includes((i as PrecheckItem).id)
      && ['ok', 'warn', 'err'].includes((i as PrecheckItem).status) && typeof (i as PrecheckItem).code === 'string');
}
