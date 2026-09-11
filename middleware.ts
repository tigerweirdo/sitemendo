import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { LANG_COOKIE, parseLang } from '@/lib/lang';
import { LANG_HEADER, LANG_PATH_HEADER, SEO_PATHS } from '@/lib/seo';

export function middleware(request: NextRequest) {
  const fromQuery = parseLang(request.nextUrl.searchParams.get('lang'));
  const fromCookie = parseLang(request.cookies.get(LANG_COOKIE)?.value);
  const lang = fromQuery ?? fromCookie ?? 'tr';
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(LANG_HEADER, lang);
  const path = request.nextUrl.pathname;
  if (SEO_PATHS.includes(path as (typeof SEO_PATHS)[number])) {
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
