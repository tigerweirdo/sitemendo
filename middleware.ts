import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SITE_URL } from '@/lib/company';
import { LANG_COOKIE, parseLang, preferredLang } from '@/lib/lang';
import { LANG_HEADER, LANG_PATH_HEADER, SEO_PATHS } from '@/lib/seo';

/* Kopya adresler ana adrese kalıcı yönlenir; canonical tek başına yetmiyor. */
const ALIAS_HOSTS = ['www.sitemendo.com', 'sitemendo.vercel.app'];

export function middleware(request: NextRequest) {
  const host = request.headers.get('host');
  if (host && ALIAS_HOSTS.includes(host)) {
    return NextResponse.redirect(new URL(`${request.nextUrl.pathname}${request.nextUrl.search}`, SITE_URL), 308);
  }

  const fromQuery = parseLang(request.nextUrl.searchParams.get('lang'));
  const fromCookie = parseLang(request.cookies.get(LANG_COOKIE)?.value);
  const path = request.nextUrl.pathname;
  const seoPath = SEO_PATHS.includes(path as (typeof SEO_PATHS)[number]);

  /* Dil seçimi yoksa ziyaretçi tarayıcı diline yönlenir. Türkçe ya da desteklenmeyen
     dilde, dil bilgisi göndermeyen tarayıcı ve botlarda adres Türkçe kalır; böylece
     arama motorları her dil sürümünü kendi adresinde görmeye devam eder. */
  if (seoPath && !fromQuery && !fromCookie) {
    const preferred = preferredLang(request.headers.get('accept-language'));
    if (preferred && preferred !== 'tr') {
      const url = request.nextUrl.clone();
      url.searchParams.set('lang', preferred);
      return NextResponse.redirect(url, 307);
    }
  }

  const lang = fromQuery ?? fromCookie ?? 'tr';
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(LANG_HEADER, lang);
  if (seoPath) {
    requestHeaders.set(LANG_PATH_HEADER, path);
  }
  const res = NextResponse.next({ request: { headers: requestHeaders } });
  if (fromQuery && fromCookie !== fromQuery) {
    res.cookies.set(LANG_COOKIE, fromQuery, {
      path: '/',
      maxAge: 31536000,
      sameSite: 'lax',
    });
  }
  return res;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|icon.svg|apple-icon|opengraph-image).*)'],
};
