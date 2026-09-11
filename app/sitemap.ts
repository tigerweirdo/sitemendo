import type { MetadataRoute } from 'next';
import { LANGS } from '@/lib/lang';
import { SEO_PATHS, absolutePageUrl, type SeoPath } from '@/lib/seo';

function languageMap(path: SeoPath) {
  return Object.fromEntries(LANGS.map(lang => [lang, absolutePageUrl(path, lang)])) as Record<string, string>;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return SEO_PATHS.flatMap(path => LANGS.map(lang => ({
    url: absolutePageUrl(path, lang),
    changeFrequency: path === '/' ? 'weekly' : 'yearly' as const,
    priority: path === '/' ? 1 : 0.3,
    alternates: { languages: languageMap(path) },
  })));
}
