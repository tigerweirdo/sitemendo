import type { Lang } from '@/lib/content';
import { LANGS } from '@/lib/lang';
import { absolutePageUrl, type SeoPath } from '@/lib/seo';

/* React bu bağlantıları <head> içine taşır. */
export function SeoLinks({ path, lang }: { path: SeoPath; lang: Lang }) {
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
