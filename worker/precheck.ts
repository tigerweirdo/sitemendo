import { normalizeWebsite } from '@/lib/auditRequest';
import { clientIp, tooManyPrechecks } from '@/lib/auditRateLimit';
import { analyzeHead, safeTarget, sortItems, speedItem, type PrecheckItem, type PrecheckResponse } from '@/lib/precheck';

const MAX_BODY = 4096;
/* Belgenin başı yeterli: <head> çoğu sitede ilk birkaç on KB'ta biter. Okunan bayt sınırı
   ücretsiz plandaki istek başına 10 ms CPU'yu da korur. */
const MAX_HTML = 256 * 1024;
const MAX_REDIRECTS = 5;
export const TIMEOUT_MS = 8000;
export const USER_AGENT = 'Mozilla/5.0 (compatible; SitemendoPrecheck/1.0; +https://sitemendo.com)';

function json(body: PrecheckResponse, status = 200) {
  return Response.json(body, { status });
}

export type Hop = { response: Response; url: URL; ms: number };

/* Yönlendirmeler elle izlenir: her yeni adres safeTarget süzgecinden geçer. Süre, son
   adresin yanıt başlıklarının gelmesine kadar geçen süre (sunucu yanıtı). */
export async function open(start: URL): Promise<Hop | null> {
  let url = start;
  for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
    const began = Date.now();
    const response = await fetch(url.href, {
      method: 'GET',
      redirect: 'manual',
      headers: { 'User-Agent': USER_AGENT, Accept: 'text/html,application/xhtml+xml;q=0.9,*/*;q=0.5' },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    const ms = Date.now() - began;
    const location = response.headers.get('location');
    if (response.status >= 300 && response.status < 400 && location) {
      await response.body?.cancel();
      const next = safeTarget(new URL(location, url).href);
      if (!next) return null;
      url = next;
      continue;
    }
    return { response, url, ms };
  }
  return null;
}

async function readHead(response: Response) {
  if (!response.body) return '';
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let html = '';
  let bytes = 0;
  while (bytes < MAX_HTML) {
    const { done, value } = await reader.read();
    if (done) break;
    bytes += value.byteLength;
    html += decoder.decode(value, { stream: true });
    if (/<body[\s>]/i.test(html.slice(-4096 - value.byteLength))) break;
  }
  await reader.cancel().catch(() => {});
  return html;
}

/* Şifresiz adres HTTPS'e yönleniyor mu? Yalnız ilk yanıt: 3xx ve https hedef → uygun. */
export async function httpRedirect(host: string): Promise<PrecheckItem | null> {
  try {
    const response = await fetch(`http://${host}/`, {
      method: 'GET',
      redirect: 'manual',
      headers: { 'User-Agent': USER_AGENT },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    await response.body?.cancel();
    const location = response.headers.get('location') ?? '';
    if (response.status >= 300 && response.status < 400 && /^https:/i.test(new URL(location, `http://${host}/`).href)) {
      return { id: 'redirect', status: 'ok', code: 'redirect.ok' };
    }
    return { id: 'redirect', status: 'warn', code: 'redirect.none' };
  } catch {
    return null;
  }
}

/* POST /api/precheck { url }: ana sayfayı bir kez açar, sonuçları döndürür. Hiçbir şey
   saklanmaz; kayıtlara adres yazılmaz. */
export async function precheck(request: Request) {
  const origin = request.headers.get('origin');
  if (origin && new URL(origin).host !== new URL(request.url).host) return json({ error: 'INVALID' }, 403);
  const length = Number(request.headers.get('content-length') || 0);
  if (Number.isFinite(length) && length > MAX_BODY) return json({ error: 'INVALID' }, 413);
  if (tooManyPrechecks(clientIp(request))) return json({ error: 'RATE' }, 429);

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return json({ error: 'INVALID' }, 400);
  }
  const input = raw && typeof raw === 'object' ? (raw as Record<string, unknown>).url : null;
  const normalized = typeof input === 'string' ? normalizeWebsite(input) : null;
  if (!normalized) return json({ error: 'INVALID' }, 400);
  const target = safeTarget(normalized);
  if (!target) return json({ error: 'BLOCKED' }, 422);
  const host = target.hostname.replace(/^www\./, '');

  try {
    const [hop, redirect] = await Promise.all([open(target), httpRedirect(target.hostname)]);
    if (!hop || hop.response.status >= 400) {
      await hop?.response.body?.cancel();
      return json({ error: 'UNREACHABLE' }, 200);
    }
    const items: PrecheckItem[] = [
      hop.url.protocol === 'https:'
        ? { id: 'https', status: 'ok', code: 'https.ok' }
        : { id: 'https', status: 'err', code: 'https.none' },
      speedItem(hop.ms),
    ];
    if (redirect) items.push(redirect);
    if (/html/i.test(hop.response.headers.get('content-type') ?? '')) {
      items.push(...analyzeHead(await readHead(hop.response), hop.response.headers.get('x-robots-tag')));
    } else {
      await hop.response.body?.cancel();
    }
    return json({ host, items: sortItems(items) });
  } catch {
    return json({ error: 'UNREACHABLE' }, 200);
  }
}
