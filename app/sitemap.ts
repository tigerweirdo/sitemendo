import type { MetadataRoute } from 'next';
import { LANGS } from '@/lib/lang';
import { GUIDES } from '@/lib/guides';
import { guideUrl, hubUrl } from '@/lib/guides/seo';
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

/* Almanca Ratgeber: tek dilli, hreflang yok; lastModified rehberin kendi tarihi. */
function guideEntries(): MetadataRoute.Sitemap {
  const latest = GUIDES.map(g => g.modified).sort().at(-1);
  return [
    { url: hubUrl, lastModified: latest, changeFrequency: 'weekly', priority: 0.8 },
    ...GUIDES.map(g => ({ url: guideUrl(g.slug), lastModified: g.modified, changeFrequency: 'monthly' as const, priority: 0.7 })),
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [...pageEntries(), ...guideEntries()];
}
