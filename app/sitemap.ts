import type { MetadataRoute } from 'next';
import { LANGS } from '@/lib/lang';
import { counterpart, guidesIn } from '@/lib/guides';
import { guideUrl, hubUrl } from '@/lib/guides/seo';
import { GUIDE_LANGS } from '@/lib/guides/types';
import { SERVICE_PAGES } from '@/lib/servicePages';
import { SEO_PATHS, absolutePageUrl, type SeoPath } from '@/lib/seo';

function languageMap(path: SeoPath) {
  return Object.fromEntries(LANGS.map(lang => [lang, absolutePageUrl(path, lang)])) as Record<string, string>;
}

/* Derlemede dosya olarak yazılır (statik dışa aktarım). */
export const dynamic = 'force-static';

const isService = (path: SeoPath) => SERVICE_PAGES.some(p => p.path === path);

/* Çok dilli sayfalar: her dil kendi adresinde, hreflang ile birbirine bağlı. */
function pageEntries(): MetadataRoute.Sitemap {
  return SEO_PATHS.flatMap(path => LANGS.map(lang => ({
    url: absolutePageUrl(path, lang),
    changeFrequency: (path === '/' || isService(path) ? 'weekly' : 'yearly') as 'weekly' | 'yearly',
    priority: path === '/' ? 1 : isService(path) ? 0.8 : 0.3,
    alternates: { languages: languageMap(path) },
  })));
}

/* Ratgeber ve rehberler: her sayfa kendi adresinde, lastModified rehberin kendi tarihi. Karşılığı olan sayfalar
   (Almanca/Türkçe) hreflang ile birbirine bağlanır; x-default Almanca sürümdür. */
function languages(urlOf: { de: string; tr: string }) {
  return { de: urlOf.de, tr: urlOf.tr, 'x-default': urlOf.de };
}

function guideEntries(): MetadataRoute.Sitemap {
  const both = GUIDE_LANGS.every(l => guidesIn(l).length > 0);
  return GUIDE_LANGS.flatMap(lang => {
    const list = guidesIn(lang);
    if (!list.length) return [];
    const latest = list.map(g => g.modified).sort().at(-1);
    return [
      {
        url: hubUrl(lang), lastModified: latest, changeFrequency: 'weekly' as const, priority: 0.8,
        ...(both ? { alternates: { languages: languages({ de: hubUrl('de'), tr: hubUrl('tr') }) } } : {}),
      },
      ...list.map(g => {
        const alt = counterpart(g);
        const pair = alt ? languages({ de: guideUrl(g.lang === 'de' ? g : alt), tr: guideUrl(g.lang === 'tr' ? g : alt) }) : undefined;
        return {
          url: guideUrl(g), lastModified: g.modified, changeFrequency: 'monthly' as const, priority: 0.7,
          ...(pair ? { alternates: { languages: pair } } : {}),
        };
      }),
    ];
  });
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [...pageEntries(), ...guideEntries()];
}
