import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { LANG_COOKIE, parseLang } from '@/lib/lang';

export function middleware(request: NextRequest) {
  const fromQuery = parseLang(request.nextUrl.searchParams.get('lang'));
  if (!fromQuery) return NextResponse.next();
  const current = request.cookies.get(LANG_COOKIE)?.value;
  if (current === fromQuery) return NextResponse.next();
  const res = NextResponse.next();
  res.cookies.set(LANG_COOKIE, fromQuery, {
    path: '/',
    maxAge: 31536000,
    sameSite: 'lax',
  });
  return res;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|icon.svg).*)'],
};
