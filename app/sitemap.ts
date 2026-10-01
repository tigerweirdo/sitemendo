import type { MetadataRoute } from 'next';
import { LANGS } from '@/lib/lang';
import { SERVICE_PAGES } from '@/lib/servicePages';
import { SEO_PATHS, absolutePageUrl, type SeoPath } from '@/lib/seo';

function languageMap(path: SeoPath) {
  return Object.fromEntries(LANGS.map(lang => [lang, absolutePageUrl(path, lang)])) as Record<string, string>;
}

/* Derlemede dosya olarak yazılır (statik dışa aktarım). */
export const dynamic = 'force-static';

const isService = (path: SeoPath) => SERVICE_PAGES.some(p => p.path === path);

export default function sitemap(): MetadataRoute.Sitemap {
  return SEO_PATHS.flatMap(path => LANGS.map(lang => ({
    url: absolutePageUrl(path, lang),
    changeFrequency: path === '/' || isService(path) ? 'weekly' : 'yearly' as const,
    priority: path === '/' ? 1 : isService(path) ? 0.8 : 0.3,
    alternates: { languages: languageMap(path) },
  })));
}
