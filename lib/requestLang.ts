import { cookies, headers } from 'next/headers';
import type { Lang } from './content';
import { LANG_COOKIE, parseLang } from './lang';
import { LANG_HEADER } from './seo';

/* İsteğin dili: middleware'in yazdığı başlık, sonra çerez, yoksa Türkçe. */
export async function resolveRequestLang(): Promise<Lang> {
  const headerStore = await headers();
  const cookieStore = await cookies();
  return parseLang(headerStore.get(LANG_HEADER))
    ?? parseLang(cookieStore.get(LANG_COOKIE)?.value)
    ?? 'tr';
}
