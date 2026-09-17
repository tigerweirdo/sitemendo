import type { Lang } from './content';

export const LANGS: Lang[] = ['tr', 'de', 'en'];
export const LANG_COOKIE = 'sitemendo.lang';
export const LANG_STORAGE = 'sitemendo.lang';

export function parseLang(value?: string | null): Lang | null {
  return value === 'tr' || value === 'en' || value === 'de' ? value : null;
}

export function resolveLang(...candidates: Array<string | null | undefined>): Lang {
  for (const candidate of candidates) {
    const parsed = parseLang(candidate);
    if (parsed) return parsed;
  }
  return 'tr';
}

/* Accept-Language başlığındaki tercih sırasına göre desteklenen ilk dil; yoksa null. */
export function preferredLang(header: string | null): Lang | null {
  if (!header) return null;
  const ranked = header.split(',')
    .map((part, i) => {
      const [tag, ...params] = part.trim().split(';');
      const q = params.map(p => p.trim()).find(p => p.startsWith('q='));
      return { lang: parseLang(tag.trim().slice(0, 2).toLowerCase()), q: q ? Number(q.slice(2)) : 1, i };
    })
    .filter(x => x.lang && x.q > 0)
    .sort((a, b) => b.q - a.q || a.i - b.i);
  return ranked[0]?.lang ?? null;
}

export function syncLangUrl(lang: Lang) {
  const url = new URL(window.location.href);
  if (url.searchParams.get('lang') === lang) return;
  url.searchParams.set('lang', lang);
  window.history.replaceState(window.history.state, '', `${url.pathname}${url.search}${url.hash}`);
}

export function withLangParam(href: string, lang: Lang): string {
  if (!href.startsWith('/')) return href;
  const hashIndex = href.indexOf('#');
  const hash = hashIndex >= 0 ? href.slice(hashIndex) : '';
  const withoutHash = hashIndex >= 0 ? href.slice(0, hashIndex) : href;
  const qIndex = withoutHash.indexOf('?');
  const path = qIndex >= 0 ? withoutHash.slice(0, qIndex) : withoutHash;
  const params = new URLSearchParams(qIndex >= 0 ? withoutHash.slice(qIndex + 1) : '');
  params.set('lang', lang);
  return `${path}?${params.toString()}${hash}`;
}

export function persistLang(lang: Lang) {
  document.documentElement.lang = lang;
  document.documentElement.removeAttribute('data-lang-pending');
  localStorage.setItem(LANG_STORAGE, lang);
  document.cookie = `${LANG_COOKIE}=${lang};path=/;max-age=31536000;samesite=lax`;
  syncLangUrl(lang);
}

export function readClientLang(): Lang | null {
  const query = new URLSearchParams(window.location.search).get('lang');
  const saved = localStorage.getItem(LANG_STORAGE);
  return parseLang(query) ?? parseLang(saved);
}

export const LANG_BOOTSTRAP = `(function(){try{var q=new URLSearchParams(location.search).get("lang");var s=localStorage.getItem("sitemendo.lang");var ok=function(v){return v==="en"||v==="tr"||v==="de"};var l=ok(q)?q:ok(s)?s:null;if(!l)return;document.cookie="sitemendo.lang="+l+";path=/;max-age=31536000;samesite=lax";if(document.documentElement.lang!==l)document.documentElement.setAttribute("data-lang-pending",l);}catch(e){}})();`;
