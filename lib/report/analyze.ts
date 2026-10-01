/* Rapor çekirdeği: ağ gerektirmeyen kurallar. Girdi, worker/report.ts'in topladığı ham
   olgulardır (HTML, yanıt başlıkları, bağlantı yanıt kodları, robots.txt, PageSpeed).
   Hepsi doğrusal zamanlı ve sınırlıdır: ücretsiz planda adım başına 10 ms CPU var. */

import { analyzeHead, attributes, type PrecheckItem } from '@/lib/precheck';
import type {
  Finding, LinkProbe, PageFacts, PsiFacts, Report, ReportInput, RobotsFacts,
} from './types';

/* ---------- Eşikler ---------- */

/* Core Web Vitals: LCP iyi ≤ 2,5 sn, zayıf > 4 sn. */
export const LCP_OK_MS = 2500;
export const LCP_BAD_MS = 4000;
/* Sunucu yanıtı: lib/precheck.ts ile aynı. */
export const RESPONSE_OK_MS = 800;
export const RESPONSE_BAD_MS = 1800;
export const MOBILE_SCORE_LOW = 50;
export const MAX_LINKS = 12;

/* ---------- HTML yardımcıları (doğrusal, sınırlı) ---------- */

const ASSET_EXT = /\.(?:jpe?g|png|gif|webp|avif|svg|ico|pdf|zip|rar|docx?|xlsx?|pptx?|mp[34]|mov|avi|css|js|json|xml|txt|woff2?|ttf|eot)(?:[?#]|$)/i;

/* <script> ve <style> gövdelerini atar. Kapanış etiketi yoksa o noktadan sonrası kesilir;
   böylece kapanmamış etiket tüm belgeyi tekrar tekrar taramaz. */
export function stripBlocks(html: string) {
  let out = '';
  let from = 0;
  const lower = html.toLowerCase();
  const open = /<(script|style)\b/g;
  let m: RegExpExecArray | null;
  while ((m = open.exec(lower))) {
    if (m.index < from) continue;
    out += html.slice(from, m.index);
    const close = lower.indexOf(`</${m[1]}`, m.index);
    if (close === -1) return out;
    const end = lower.indexOf('>', close);
    from = end === -1 ? html.length : end + 1;
    open.lastIndex = from;
  }
  return out + html.slice(from);
}

/* Verilen adlardaki açılış etiketleri (tam metin). Etiket gövdesi en çok 2000 karakter ve '<'
   ya da '>' içermez: kapanışsız etiketlerle dolu bir belgede bile her başlangıç hızla elenir.
   (indexOf('>') ya da [^>]* ile arama kuadratik yavaşlardı.) */
export function tagList(html: string, names: string[], limit: number): string[] {
  const out: string[] = [];
  const re = new RegExp(`<(?:${names.join('|')})\\b[^<>]{0,2000}>`, 'gi');
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) && out.length < limit) out.push(m[0]);
  return out;
}

type Anchor = { href: string; text: string };

/* <a> etiketleri: bağlantı adresi ve bir sonraki '<' işaretine kadar en çok 120 karakterlik metin. */
export function anchors(html: string, max = 600): Anchor[] {
  const out: Anchor[] = [];
  const re = /<a\b([^<>]{0,2000})>([^<]{0,120})/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) && out.length < max) {
    out.push({ href: attributes(`<a${m[1]}>`).href ?? '', text: m[2].replace(/\s+/g, ' ').trim() });
  }
  return out;
}

function hostKey(host: string) {
  return host.toLowerCase().replace(/^www\./, '');
}

/* Ana sayfadan aynı alan adına giden, dosya olmayan bağlantılar; en çok MAX_LINKS. */
export function internalLinks(list: Anchor[], base: URL): string[] {
  const seen = new Set<string>([base.href.replace(/\/$/, '')]);
  const out: string[] = [];
  for (const { href } of list) {
    if (!href || /^(?:#|mailto:|tel:|javascript:|data:|sms:|whatsapp:)/i.test(href)) continue;
    let url: URL;
    try {
      url = new URL(href, base);
    } catch {
      continue;
    }
    if (url.protocol !== 'http:' && url.protocol !== 'https:') continue;
    if (hostKey(url.hostname) !== hostKey(base.hostname)) continue;
    if (ASSET_EXT.test(url.pathname + url.search)) continue;
    url.hash = '';
    const key = url.href.replace(/\/$/, '');
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(url.href);
    if (out.length >= MAX_LINKS) break;
  }
  return out;
}

const CMS_SIGNS: [string, RegExp][] = [
  ['WordPress', /wp-content|wp-includes|\/wp-json\//],
  ['Wix', /wixstatic\.com|static\.parastorage\.com|wix\.com\/|x-wix-/],
  ['Squarespace', /squarespace\.com|static1\.squarespace/],
  ['Shopify', /cdn\.shopify\.com|shopify\.theme/],
  ['Webflow', /webflow\.com|data-wf-page|w-nav/],
  ['Jimdo', /jimdo(?:cdn|site)\.com|jimdo\.com/],
  ['Joomla', /\/media\/jui\/|\/components\/com_|joomla!?/],
  ['TYPO3', /typo3(?:conf|temp)|\/typo3\//],
  ['Drupal', /\/sites\/default\/files|drupal-settings-json|drupal\.js/],
];

export function detectStack(html: string) {
  const lower = html.toLowerCase();
  const cms = CMS_SIGNS.find(([, re]) => re.test(lower))?.[0] ?? '';
  let generator = '';
  for (const tag of tagList(html, ['meta'], 80)) {
    const a = attributes(tag);
    if (a.name?.toLowerCase() === 'generator' && a.content) {
      generator = a.content.slice(0, 80);
      break;
    }
  }
  const jq = lower.match(/jquery[-.\/@]v?(\d+\.\d+(?:\.\d+)?)(?:\.min)?\.js/);
  return { cms, generator, jquery: jq?.[1] ?? '' };
}

/* Bu etiketler sayfanın https adresinde şifresiz yükleniyorsa tarayıcı uyarısı çıkar. */
export function countMixedContent(html: string) {
  let n = 0;
  for (const tag of tagList(html, ['img', 'script', 'iframe', 'source', 'video', 'audio'], 600)) {
    if (/^http:\/\//i.test(attributes(tag).src ?? '')) n++;
  }
  return Math.min(n, 99);
}

export function analyzeForms(html: string, pageIsHttps: boolean) {
  let count = 0;
  let insecure = 0;
  let mailto = 0;
  for (const tag of tagList(html, ['form'], 40)) {
    count++;
    const action = (attributes(tag).action ?? '').trim();
    if (/^mailto:/i.test(action)) mailto++;
    else if (pageIsHttps && /^http:\/\//i.test(action)) insecure++;
  }
  return { count, insecure, mailto };
}

const CONTACT_WORDS = /kontakt|contact|iletişim|iletisim|ulaşım|ulasim|anfahrt/i;
const IMPRESSUM_WORDS = /impressum|imprint|yasal bilgi/i;
/* Alman posta kodu + şehir: "10961 Berlin". */
const ADDRESS = /\b\d{5}\s+\p{Lu}[\p{L}-]{2,}/u;

/* "ad@alan.uzantı" biçimi: her '@' çevresinde bakılır, geri izlemeli regex yok. */
export function hasEmail(text: string) {
  let at = text.indexOf('@');
  for (let i = 0; at !== -1 && i < 60; i++) {
    const before = text.charAt(at - 1);
    if (/[\w.+-]/.test(before) && /^[\w-]+(?:\.[\w-]+)*\.[a-z]{2,}/i.test(text.slice(at + 1, at + 80))) return true;
    at = text.indexOf('@', at + 1);
  }
  return false;
}

/* Etiketleri atılmış görünen metin (betik ve stil gövdeleri önce atılır). */
export function visibleText(html: string, max = 200_000) {
  return stripBlocks(html).slice(0, max).replace(/<[^<>]{0,2000}>/g, ' ');
}

export function analyzeContact(html: string, list: Anchor[]) {
  const text = visibleText(html);
  const tel = list.some(a => /^tel:/i.test(a.href.trim()));
  const mail = list.some(a => /^mailto:/i.test(a.href.trim())) || hasEmail(text);
  const contactLink = list.some(a => CONTACT_WORDS.test(a.href) || CONTACT_WORDS.test(a.text));
  const impressumLink = list.some(a => IMPRESSUM_WORDS.test(a.href) || IMPRESSUM_WORDS.test(a.text));
  const address = ADDRESS.test(text);
  return { tel, mail, contactLink, impressumLink, address };
}

/* HTML ve başlıklardan sayfa olguları. Ağ yok. */
export function analyzePage(
  html: string,
  meta: { finalUrl: string; status: number; responseMs: number; headers: Headers; httpRedirect: boolean | null; truncated: boolean },
): PageFacts {
  const base = new URL(meta.finalUrl);
  const https = base.protocol === 'https:';
  const list = anchors(html);
  const stack = detectStack(html);
  const head: PrecheckItem[] = analyzeHead(html, meta.headers.get('x-robots-tag'));
  return {
    finalUrl: meta.finalUrl,
    status: meta.status,
    responseMs: Math.round(meta.responseMs),
    https,
    httpRedirect: meta.httpRedirect,
    server: (meta.headers.get('server') ?? '').slice(0, 60),
    poweredBy: (meta.headers.get('x-powered-by') ?? '').slice(0, 60),
    xRobots: (meta.headers.get('x-robots-tag') ?? '').slice(0, 60),
    head,
    mixedContent: https ? countMixedContent(html) : 0,
    forms: analyzeForms(html, https),
    contact: analyzeContact(html, list),
    stack,
    internalLinks: internalLinks(list, base),
    truncated: meta.truncated,
  };
}

/* ---------- robots.txt ve PageSpeed ---------- */

/* "User-agent: *" bloğunda "Disallow: /" varsa tüm site arama motorlarına kapalıdır. */
export function parseRobots(text: string): { blocksAll: boolean; listedSitemap: boolean } {
  let applies = false;
  let blocksAll = false;
  let listedSitemap = false;
  let groupHasAgent = false;
  for (const raw of text.slice(0, 20_000).split(/\r?\n/)) {
    const line = raw.replace(/#.*/, '').trim();
    const idx = line.indexOf(':');
    if (idx < 1) continue;
    const field = line.slice(0, idx).trim().toLowerCase();
    const value = line.slice(idx + 1).trim();
    if (field === 'sitemap' && value) listedSitemap = true;
    else if (field === 'user-agent') {
      if (!groupHasAgent) applies = false;
      groupHasAgent = true;
      if (value === '*') applies = true;
    } else {
      groupHasAgent = false;
      if (applies && field === 'disallow' && value === '/') blocksAll = true;
    }
  }
  return { blocksAll, listedSitemap };
}

function num(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

function dig(value: unknown, ...keys: string[]): unknown {
  let cur = value;
  for (const key of keys) {
    if (!cur || typeof cur !== 'object') return undefined;
    cur = (cur as Record<string, unknown>)[key];
  }
  return cur;
}

/* PageSpeed Insights v5 yanıtından (fields ile daraltılmış) mobil ölçümler. */
export function parsePsi(json: unknown): PsiFacts | null {
  const score = num(dig(json, 'lighthouseResult', 'categories', 'performance', 'score'));
  if (score === null) return null;
  const audit = (id: string) => num(dig(json, 'lighthouseResult', 'audits', id, 'numericValue'));
  return {
    score: Math.round(score * 100),
    lcpMs: audit('largest-contentful-paint'),
    cls: audit('cumulative-layout-shift'),
    tbtMs: audit('total-blocking-time'),
  };
}

/* ---------- Bağlantı yanıtları ---------- */

export type LinkClass = 'ok' | 'broken' | 'blocked';

/* 401/403/429 çoğu sitede bot engelidir; kırık sayılmaz. Zaman aşımı ve ağ hatası kırık. */
export function classifyLink(status: number | null): LinkClass {
  if (status === null) return 'broken';
  if (status === 401 || status === 403 || status === 429 || status === 999) return 'blocked';
  if (status >= 400) return 'broken';
  return 'ok';
}

/* ---------- Rapor ---------- */

const seconds = (ms: number) => `${(ms / 1000).toFixed(1)} s`;

function speedFindings(page: PageFacts, psi: PsiFacts | null): Finding[] {
  const lcpBad = psi?.lcpMs != null && psi.lcpMs > LCP_BAD_MS;
  const lcpMid = psi?.lcpMs != null && psi.lcpMs > LCP_OK_MS;
  const respBad = page.responseMs > RESPONSE_BAD_MS;
  const respMid = page.responseMs > RESPONSE_OK_MS;
  if (lcpBad || respBad) {
    const value = lcpBad && psi?.lcpMs != null ? `LCP ${seconds(psi.lcpMs)}` : `${page.responseMs} ms`;
    return [{ key: 'speed', status: 'err', code: 'speed.slow', value }];
  }
  if (lcpMid || respMid) {
    const value = lcpMid && psi?.lcpMs != null ? `LCP ${seconds(psi.lcpMs)}` : `${page.responseMs} ms`;
    return [{ key: 'speed', status: 'warn', code: 'speed.mid', value }];
  }
  if (!psi || psi.lcpMs == null) {
    return [{ key: 'speed', status: 'info', code: 'speed.partial', value: `${page.responseMs} ms` }];
  }
  return [{ key: 'speed', status: 'ok', code: 'speed.ok', value: `LCP ${seconds(psi.lcpMs)}` }];
}

function linkFindings(probes: LinkProbe[]): Finding[] {
  if (!probes.length) return [{ key: 'links', status: 'unknown', code: 'links.none_checked' }];
  const broken = probes.filter(p => classifyLink(p.status) === 'broken').length;
  const value = `${broken} / ${probes.length}`;
  if (broken >= 3) return [{ key: 'links', status: 'err', code: 'links.broken_many', value }];
  if (broken >= 1) return [{ key: 'links', status: 'warn', code: 'links.broken_some', value }];
  return [{ key: 'links', status: 'ok', code: 'links.ok', value: `${probes.length}` }];
}

const PHP = /php\/(\d+)\.(\d+)/i;

function stackFindings(page: PageFacts): Finding[] {
  const out: Finding[] = [];
  const jq = page.stack.jquery.match(/^(\d+)\.(\d+)/);
  /* jQuery 3.5'ten önceki sürümlerde bilinen XSS açıkları var. */
  if (jq && (Number(jq[1]) < 3 || (Number(jq[1]) === 3 && Number(jq[2]) < 5))) {
    out.push({ key: 'stack', status: 'warn', code: 'stack.jquery_old', value: `jQuery ${page.stack.jquery}` });
  }
  const php = page.poweredBy.match(PHP);
  /* PHP 8.1 ve öncesi güvenlik desteğini kaybetmiştir (8.1: 31 Aralık 2025). Yalnız kesin olan eşik. */
  if (php && (Number(php[1]) < 8 || (Number(php[1]) === 8 && Number(php[2]) < 2))) {
    out.push({ key: 'stack', status: 'warn', code: 'stack.php_old', value: `PHP ${php[1]}.${php[2]}` });
  }
  const facts = [page.stack.cms, page.stack.generator && page.stack.generator !== page.stack.cms ? page.stack.generator : '',
    page.stack.jquery ? `jQuery ${page.stack.jquery}` : '', page.server].filter(Boolean);
  if (!out.length) {
    out.push(facts.length
      ? { key: 'stack', status: 'info', code: 'stack.info', value: facts.slice(0, 3).join(' · ') }
      : { key: 'stack', status: 'info', code: 'stack.none' });
  }
  return out;
}

function indexFindings(page: PageFacts, robots: RobotsFacts): Finding[] {
  const out: Finding[] = [];
  const head = Object.fromEntries(page.head.map(i => [i.id, i]));
  if (head.index?.status === 'err') out.push({ key: 'index', status: 'err', code: 'index.noindex' });
  if (robots.fetched && robots.blocksAll) out.push({ key: 'index', status: 'err', code: 'index.robots_block' });
  if (head.title?.code === 'title.none') out.push({ key: 'index', status: 'warn', code: 'index.no_title' });
  if (head.description?.code === 'description.none') out.push({ key: 'index', status: 'warn', code: 'index.no_description' });
  if (robots.fetched && robots.sitemap === false) out.push({ key: 'index', status: 'warn', code: 'index.no_sitemap' });
  if (!out.length) out.push({ key: 'index', status: 'ok', code: 'index.ok' });
  return out;
}

function contactFindings(page: PageFacts): Finding[] {
  const c = page.contact;
  const reachable = c.tel || c.mail || c.contactLink || c.address;
  if (!reachable) return [{ key: 'contact', status: 'err', code: 'contact.none' }];
  const out: Finding[] = [];
  if (!c.tel) out.push({ key: 'contact', status: 'warn', code: 'contact.no_phone' });
  if (!c.impressumLink) out.push({ key: 'contact', status: 'warn', code: 'contact.no_impressum' });
  if (!out.length) out.push({ key: 'contact', status: 'ok', code: 'contact.ok' });
  return out;
}

export function buildFindings(input: ReportInput): Finding[] {
  const { page, links, robots, psi } = input;
  const head = Object.fromEntries(page.head.map(i => [i.id, i]));
  const out: Finding[] = [];

  /* 01 Mobil: viewport etiketi ve PageSpeed mobil puanı. */
  if (head.viewport?.code === 'viewport.none') out.push({ key: 'mobile', status: 'err', code: 'mobile.viewport_none' });
  else if (head.viewport?.code === 'viewport.partial') out.push({ key: 'mobile', status: 'warn', code: 'mobile.viewport_partial' });
  if (psi && psi.score < MOBILE_SCORE_LOW) out.push({ key: 'mobile', status: 'warn', code: 'mobile.perf_low', value: `${psi.score}/100` });
  if (!out.some(f => f.key === 'mobile')) {
    out.push({ key: 'mobile', status: 'ok', code: 'mobile.ok', value: psi ? `${psi.score}/100` : undefined });
  }

  out.push(...speedFindings(page, psi));
  out.push(...linkFindings(links));

  /* 04 HTTPS */
  if (!page.https) out.push({ key: 'https', status: 'err', code: 'https.none' });
  else {
    if (page.httpRedirect === false) out.push({ key: 'https', status: 'warn', code: 'https.no_redirect' });
    if (page.mixedContent > 0) out.push({ key: 'https', status: 'warn', code: 'https.mixed', value: `${page.mixedContent}` });
    if (!out.some(f => f.key === 'https')) out.push({ key: 'https', status: 'ok', code: 'https.ok' });
  }

  /* 05 Formlar: gönderim denenmez; yalnız görünen biçim. */
  if (page.forms.insecure > 0) out.push({ key: 'forms', status: 'err', code: 'forms.insecure' });
  else if (page.forms.mailto > 0) out.push({ key: 'forms', status: 'warn', code: 'forms.mailto' });
  else if (page.forms.count === 0) out.push({ key: 'forms', status: 'info', code: 'forms.none' });
  else out.push({ key: 'forms', status: 'ok', code: 'forms.ok', value: `${page.forms.count}` });

  out.push(...stackFindings(page));
  out.push(...indexFindings(page, robots));
  out.push(...contactFindings(page));
  return out;
}

export function buildReport(input: ReportInput, now = new Date()): Report {
  const url = new URL(input.page.finalUrl);
  return {
    host: hostKey(url.hostname),
    finalUrl: input.page.finalUrl,
    measuredAt: now.toISOString(),
    findings: buildFindings(input),
  };
}
