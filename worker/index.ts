import { SITE_URL } from '@/lib/company';
import { LANG_COOKIE, parseLang, preferredLang } from '@/lib/lang';
import { SEO_PATHS, type SeoPath } from '@/lib/seo';
import { audit } from './audit';
import { precheck } from './precheck';

/* Cloudflare Worker: out/ içindeki statik dil sayfalarını ziyaretçinin diline göre sunar,
   yönlendirmeleri ve güvenlik başlıklarını ekler, formu işler. Next'in hash'li dosyaları
   (/_next/static) Worker'a uğramadan doğrudan gelir (wrangler.jsonc). */

type Env = { ASSETS: { fetch: (request: Request) => Promise<Response> } };

/* Kopya adres ana adrese kalıcı yönlenir; canonical tek başına yetmiyor. */
const ALIAS_HOSTS = ['www.sitemendo.com'];
/* Yerel geliştirme (wrangler dev) düz HTTP ile çalışır; canlıda HTTP isteği HTTPS'e yönlenir. */
const LOCAL_HOSTS = ['localhost', '127.0.0.1'];

/* CSP satır içi betik ve stile izin veriyor: Next.js hidrasyon verisi, dil önyükleme betiği
   ve animasyonların stil öznitelikleri satır içi. */
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join('; ');

const SECURITY_HEADERS: Record<string, string> = {
  'Content-Security-Policy': CSP,
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
};

/* no-transform: Cloudflare sayfaya analiz betiği eklemez, e-posta adreslerini değiştirmez.
   Gizlilik metni analiz aracı kullanmadığımızı söylüyor; değişen HTML hidrasyonu da bozar.
   Aynı adres dile göre farklı dosya döndürdüğü için sayfalar paylaşılan önbelleğe girmez. */
const PAGE_CACHE = 'private, no-cache, no-transform';

/* Derlemenin iç dosyaları (/de.html, /de/privacy.txt, /404.html …) dışarıdan açılmaz;
   /de ya da /de/privacy yazan ziyaretçi herkese açık adrese yönlenir. */
const LANG_PAGE = /^\/(tr|de|en)(\/privacy|\/impressum)?$/;
const BUILD_FILE = /^\/(?:tr|de|en|404|_not-found)(?:[./]|$)/;

function cookieValue(request: Request, name: string) {
  for (const part of (request.headers.get('cookie') ?? '').split(';')) {
    const [key, value] = part.trim().split('=');
    if (key === name) return value ?? null;
  }
  return null;
}

function isSeoPath(path: string): path is SeoPath {
  return SEO_PATHS.includes(path as SeoPath);
}

function secure(response: Response, cache?: string) {
  const res = new Response(response.body, response);
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) res.headers.set(key, value);
  if (cache) res.headers.set('Cache-Control', cache);
  return res;
}

/* Next betikleri sayfada durursa hızlı makinede hero metninden önce iner ve Lighthouse
   onları LCP'nin önüne yazar. defer ilk boyamayı geciktirmişti. Etiketleri çıkarıp
   ilk büyük boyamadan sonra ekliyoruz; aynı anda /fonts/mono.css ve data-mono gelir.
   noModule yedeği yerinde kalır: güncel tarayıcı onu indirmez. */
function postponeScripts(html: string) {
  const scripts: { src: string; id?: string }[] = [];
  const stripped = html.replace(/<link rel="preload" as="script"[^>]*>/g, '').replace(
    /<script\b([^>]*)><\/script>/g,
    (full, attrs: string) => {
      if (/\snoModule\b|\snomodule\b/i.test(attrs)) return full;
      const src = attrs.match(/\ssrc="(\/_next\/static\/[^"]+)"/);
      if (!src) return full;
      const id = attrs.match(/\sid="([^"]*)"/);
      scripts.push(id?.[1] ? { src: src[1], id: id[1] } : { src: src[1] });
      return '';
    },
  );
  if (!scripts.length || !stripped.includes('</body>')) return html;
  const boot = `<script>(function(){var s=${JSON.stringify(scripts)};var ran=false;function run(){if(ran)return;ran=true;var l=document.createElement("link");l.rel="stylesheet";l.href="/fonts/mono.css";document.head.appendChild(l);document.documentElement.setAttribute("data-mono","1");for(var i=0;i<s.length;i++){var e=document.createElement("script");e.async=true;e.src=s[i].src;if(s[i].id)e.id=s[i].id;document.body.appendChild(e);}}function arm(){try{var po=new PerformanceObserver(function(l){if(!l.getEntries().length)return;po.disconnect();run();});po.observe({type:"largest-contentful-paint",buffered:true});}catch(e){run();}setTimeout(run,2500);}requestAnimationFrame(function(){requestAnimationFrame(function(){document.documentElement.setAttribute("data-motion","1");});});if(document.readyState==="loading")addEventListener("DOMContentLoaded",arm);else arm();})()</script>`;
  return stripped.replace('</body>', `${boot}</body>`);
}

async function preparePage(request: Request, res: Response) {
  if (request.method === 'HEAD' || !res.body) return compress(request, res);
  const type = res.headers.get('content-type') ?? '';
  if (!type.includes('text/html')) return compress(request, res);
  const headers = new Headers(res.headers);
  headers.delete('Content-Length');
  return compress(request, new Response(postponeScripts(await res.text()), {
    status: res.status,
    statusText: res.statusText,
    headers,
  }));
}

/* no-transform yüzünden Cloudflare kenarı HTML'i sıkıştırmıyor (canlıda 54 KB düz gidiyordu).
   Gövdeyi burada sıkıştırıyoruz; başlık tek başına yetmez, tarayıcı düz HTML'i gzip sanır. */
function compress(request: Request, res: Response) {
  if (request.method === 'HEAD' || !res.body || res.headers.has('Content-Encoding')) return res;
  if (!/\bgzip\b/.test(request.headers.get('accept-encoding') ?? '')) return res;
  const headers = new Headers(res.headers);
  headers.set('Content-Encoding', 'gzip');
  headers.delete('Content-Length');
  if (!headers.get('Vary')?.toLowerCase().includes('accept-encoding')) headers.append('Vary', 'Accept-Encoding');
  /* encodeBody manual: çalışma zamanı gövdeyi bir kez daha sıkıştırmasın. */
  return new Response(res.body.pipeThrough(new CompressionStream('gzip')), {
    status: res.status,
    statusText: res.statusText,
    headers,
    encodeBody: 'manual',
  } as ResponseInit & { encodeBody: 'manual' });
}

function redirect(location: string, status: 301 | 307 | 308) {
  return secure(new Response(null, { status, headers: { Location: location } }));
}

function asset(env: Env, request: Request, url: URL, path: string) {
  return env.ASSETS.fetch(new Request(new URL(path, url.origin), { method: request.method, headers: request.headers }));
}

async function page(request: Request, env: Env, url: URL, path: SeoPath) {
  const fromQuery = parseLang(url.searchParams.get('lang'));
  const fromCookie = parseLang(cookieValue(request, LANG_COOKIE));

  /* Dil seçimi yoksa ziyaretçi tarayıcı diline yönlenir. Türkçe ya da desteklenmeyen
     dilde, dil bilgisi göndermeyen tarayıcı ve botlarda adres Türkçe kalır; böylece
     arama motorları her dil sürümünü kendi adresinde görmeye devam eder. */
  if (!fromQuery && !fromCookie) {
    const preferred = preferredLang(request.headers.get('accept-language'));
    if (preferred && preferred !== 'tr') {
      const target = new URL(url);
      target.searchParams.set('lang', preferred);
      return redirect(target.href, 307);
    }
  }

  const lang = fromQuery ?? fromCookie ?? 'tr';
  const res = secure(await asset(env, request, url, `/${lang}${path === '/' ? '' : path}`), PAGE_CACHE);
  if (fromQuery && fromCookie !== fromQuery) {
    res.headers.append('Set-Cookie', `${LANG_COOKIE}=${fromQuery}; Path=/; Max-Age=31536000; SameSite=Lax`);
  }
  return preparePage(request, res);
}

async function notFound(request: Request, env: Env, url: URL) {
  const lang = parseLang(url.searchParams.get('lang'))
    ?? parseLang(cookieValue(request, LANG_COOKIE))
    ?? preferredLang(request.headers.get('accept-language'))
    ?? 'tr';
  const res = await env.ASSETS.fetch(new Request(new URL(`/${lang}/not-found`, url.origin)));
  return preparePage(request, secure(new Response(request.method === 'HEAD' ? null : res.body, { status: 404, headers: res.headers }), PAGE_CACHE));
}

async function route(request: Request, env: Env, url: URL) {
  if (url.pathname === '/api/audit' || url.pathname === '/api/precheck') {
    if (request.method !== 'POST') return secure(new Response(null, { status: 405, headers: { Allow: 'POST' } }));
    return secure(await (url.pathname === '/api/audit' ? audit(request) : precheck(request)), 'no-store');
  }
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return secure(new Response(null, { status: 405, headers: { Allow: 'GET, HEAD' } }));
  }
  if (url.pathname.length > 1 && url.pathname.endsWith('/')) {
    return redirect(`${url.pathname.replace(/\/+$/, '') || '/'}${url.search}`, 308);
  }
  if (isSeoPath(url.pathname)) return page(request, env, url, url.pathname);

  const langPage = url.pathname.match(LANG_PAGE);
  if (langPage) return redirect(`${langPage[2] ?? '/'}?lang=${langPage[1]}`, 301);
  if (BUILD_FILE.test(url.pathname)) return notFound(request, env, url);

  const res = await env.ASSETS.fetch(request);
  if (res.status === 404) return notFound(request, env, url);
  return secure(res);
}

const worker = {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);
    if (ALIAS_HOSTS.includes(url.hostname)) {
      return redirect(`${SITE_URL}${url.pathname}${url.search}`, 308);
    }
    if (url.protocol === 'http:' && !LOCAL_HOSTS.includes(url.hostname)) {
      return redirect(`https://${url.host}${url.pathname}${url.search}`, 308);
    }
    const res = await route(request, env, url);
    /* Önizleme adresi (workers.dev) arama motorlarında görünmesin. */
    if (url.hostname.endsWith('.workers.dev')) res.headers.set('X-Robots-Tag', 'noindex');
    return res;
  },
};

export default worker;
