/* Rapor için ağ işi: ana sayfa, birkaç iç bağlantı, robots.txt, PageSpeed. Cloudflare'a özgü
   bir şey içermez (yalnız fetch), bu yüzden testlerde sahte fetch ile çalıştırılır. Her adres,
   yönlendirmelerde de, safeTarget süzgecinden geçer (yerel/iç adresler açılmaz). Ağ beklemesi
   CPU sayılmaz; CPU'yu yalnız ayrıştırma harcar ve o da sınırlıdır (lib/report/analyze.ts). */

import { safeTarget } from '@/lib/precheck';
import { analyzePage, MAX_LINKS, parsePsi, parseRobots } from '@/lib/report/analyze';
import type { LinkProbe, PageFacts, PsiFacts, RobotsFacts } from '@/lib/report/types';
import { httpRedirect, open, USER_AGENT } from './precheck';

const MAX_HTML = 256 * 1024;
const MAX_ROBOTS = 20 * 1024;
const MAX_PSI = 200 * 1024;
const LINK_TIMEOUT_MS = 6000;
const PSI_TIMEOUT_MS = 100_000;
const PSI_URL = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
/* Yanıtı yalnız gereken alanlara daraltır (aksi halde ~1 MB): ücretsiz plandaki 10 ms CPU için şart. */
const PSI_FIELDS = 'lighthouseResult(categories/performance/score,audits(largest-contentful-paint/numericValue,cumulative-layout-shift/numericValue,total-blocking-time/numericValue))';

/* Gövdeyi en çok max bayt okur; fazlası atılır. */
export async function readText(response: Response, max: number) {
  if (!response.body) return { text: '', truncated: false };
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let text = '';
  let bytes = 0;
  let truncated = false;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    bytes += value.byteLength;
    text += decoder.decode(value, { stream: true });
    if (bytes >= max) {
      truncated = true;
      break;
    }
  }
  await reader.cancel().catch(() => {});
  return { text, truncated };
}

export type PageResult =
  | { ok: true; facts: PageFacts }
  | { ok: false; error: 'BLOCKED' | 'UNREACHABLE' | 'NOT_HTML' };

/* Ana sayfa: yönlendirmeleri izler, HTML'i okur, olguları çıkarır. */
export async function fetchPageFacts(websiteUrl: string): Promise<PageResult> {
  const target = safeTarget(websiteUrl);
  if (!target) return { ok: false, error: 'BLOCKED' };
  try {
    const [hop, redirect] = await Promise.all([open(target), httpRedirect(target.hostname)]);
    if (!hop || hop.response.status >= 400) {
      await hop?.response.body?.cancel();
      return { ok: false, error: 'UNREACHABLE' };
    }
    if (!/html/i.test(hop.response.headers.get('content-type') ?? '')) {
      await hop.response.body?.cancel();
      return { ok: false, error: 'NOT_HTML' };
    }
    const { text, truncated } = await readText(hop.response, MAX_HTML);
    return {
      ok: true,
      facts: analyzePage(text, {
        finalUrl: hop.url.href,
        status: hop.response.status,
        responseMs: hop.ms,
        headers: hop.response.headers,
        httpRedirect: redirect ? redirect.code === 'redirect.ok' : null,
        truncated,
      }),
    };
  } catch {
    return { ok: false, error: 'UNREACHABLE' };
  }
}

async function attempt(url: URL, method: 'HEAD' | 'GET') {
  try {
    return await fetch(url.href, {
      method,
      redirect: 'manual',
      headers: { 'User-Agent': USER_AGENT, Accept: '*/*' },
      signal: AbortSignal.timeout(LINK_TIMEOUT_MS),
    });
  } catch {
    return null;
  }
}

/* Bir adresin son HTTP durumu. En çok 3 yönlendirme; her yeni adres süzgeçten geçer.
   Ağ hatası, zaman aşımı ve yönlendirme döngüsü null döner. HEAD'i reddeden sunucuda GET. */
export async function statusOf(start: URL): Promise<number | null> {
  let url = start;
  for (let hop = 0; hop <= 3; hop++) {
    let res = await attempt(url, 'HEAD');
    if (res && (res.status === 400 || res.status === 405 || res.status === 501)) {
      await res.body?.cancel();
      res = await attempt(url, 'GET');
    }
    if (!res) return null;
    const location = res.headers.get('location');
    await res.body?.cancel();
    if (res.status >= 300 && res.status < 400 && location) {
      const next = safeTarget(new URL(location, url).href);
      if (!next) return null;
      url = next;
      continue;
    }
    return res.status;
  }
  return null;
}

/* En çok 12 bağlantı, aynı anda 4. */
export async function probeLinks(urls: string[]): Promise<LinkProbe[]> {
  const list = urls.slice(0, MAX_LINKS);
  const out: LinkProbe[] = list.map(url => ({ url, status: null }));
  let next = 0;
  await Promise.all(Array.from({ length: Math.min(4, list.length) }, async () => {
    for (;;) {
      const i = next++;
      if (i >= list.length) return;
      const target = safeTarget(list[i]);
      out[i] = { url: list[i], status: target ? await statusOf(target) : null };
    }
  }));
  return out;
}

/* robots.txt ve site haritası. Yalnız 200 ve 404 kesin yanıt sayılır (403 çoğu zaman bot
   engelidir): belirsizse sitemap null kalır ve rapor "site haritası yok" demez. */
export async function fetchRobots(finalUrl: string): Promise<RobotsFacts> {
  const base = new URL(finalUrl);
  const robotsUrl = safeTarget(new URL('/robots.txt', base).href);
  if (!robotsUrl) return { fetched: false, blocksAll: false, sitemap: null };
  try {
    const hop = await open(robotsUrl);
    if (!hop) return { fetched: false, blocksAll: false, sitemap: null };
    let blocksAll = false;
    let listed = false;
    if (hop.response.status === 200) {
      const { text } = await readText(hop.response, MAX_ROBOTS);
      ({ blocksAll, listedSitemap: listed } = parseRobots(text));
    } else {
      await hop.response.body?.cancel();
      if (hop.response.status !== 404 && hop.response.status !== 410) return { fetched: false, blocksAll: false, sitemap: null };
    }
    if (listed) return { fetched: true, blocksAll, sitemap: true };
    const mapUrl = safeTarget(new URL('/sitemap.xml', base).href);
    const status = mapUrl ? await statusOf(mapUrl) : null;
    const sitemap = status !== null && status >= 200 && status < 300 ? true : status === 404 || status === 410 ? false : null;
    return { fetched: true, blocksAll, sitemap };
  } catch {
    return { fetched: false, blocksAll: false, sitemap: null };
  }
}

/* PageSpeed Insights, mobil. Anahtar yoksa ya da yanıt beklenenden büyükse (fields
   daraltması çalışmadıysa) null: rapor "ölçülemedi" der, değer uydurmaz. Anahtar başlıkta gider. */
export async function fetchPsi(pageUrl: string, key: string | undefined): Promise<PsiFacts | null> {
  if (!key) return null;
  const api = new URL(PSI_URL);
  api.searchParams.set('url', pageUrl);
  api.searchParams.set('strategy', 'mobile');
  api.searchParams.set('category', 'performance');
  api.searchParams.set('fields', PSI_FIELDS);
  try {
    const res = await fetch(api.href, {
      headers: { Accept: 'application/json', 'X-Goog-Api-Key': key },
      signal: AbortSignal.timeout(PSI_TIMEOUT_MS),
    });
    if (!res.ok) {
      await res.body?.cancel();
      console.error('report psi failed:', res.status);
      return null;
    }
    const { text, truncated } = await readText(res, MAX_PSI);
    if (truncated) {
      console.error('report psi: response too large');
      return null;
    }
    return parsePsi(JSON.parse(text));
  } catch {
    console.error('report psi: error');
    return null;
  }
}

