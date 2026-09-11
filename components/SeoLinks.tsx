import { headers } from 'next/headers';
import { LANGS, parseLang } from '@/lib/lang';
import { LANG_HEADER, LANG_PATH_HEADER, SEO_PATHS, absolutePageUrl, type SeoPath } from '@/lib/seo';

function isSeoPath(value: string | null): value is SeoPath {
  return SEO_PATHS.includes(value as SeoPath);
}

export async function SeoLinks() {
  const headerStore = await headers();
  const lang = parseLang(headerStore.get(LANG_HEADER)) ?? 'tr';
  const path = headerStore.get(LANG_PATH_HEADER);
  if (!isSeoPath(path)) return null;
  return (
    <>
      <link rel="canonical" href={absolutePageUrl(path, lang)} />
      {LANGS.map(code => (
        <link key={code} rel="alternate" hrefLang={code} href={absolutePageUrl(path, code)} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={absolutePageUrl(path, 'tr')} />
    </>
  );
}
