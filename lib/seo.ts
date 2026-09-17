import type { Metadata } from 'next';
import { SITE_URL } from './company';
import { content, type Lang } from './content';

export const SEO_PATHS = ['/', '/privacy', '/impressum'] as const;
export type SeoPath = (typeof SEO_PATHS)[number];
export const OG_ALT = 'Sitemendo — kontrol, düzeltme ve bakım';

export function absolutePageUrl(path: SeoPath, lang: Lang): string {
  const url = new URL(path, `${SITE_URL}/`);
  if (lang !== 'tr') url.searchParams.set('lang', lang);
  return url.href;
}

export function ogLocale(lang: Lang) {
  return lang === 'de' ? 'de_DE' : lang === 'en' ? 'en_US' : 'tr_TR';
}

export function routeMetadata(path: SeoPath, lang: Lang): Metadata {
  const m = content[lang].meta;
  const home = path === '/';
  const title = path === '/privacy' ? m.privacyTitle : path === '/impressum' ? m.impressumTitle : m.title;
  const description = path === '/privacy' ? m.privacyDescription : path === '/impressum' ? m.impressumDescription : m.description;
  const ogTitle = home ? m.ogTitle : title;
  const ogDescription = home ? m.ogDescription : description;
  const url = absolutePageUrl(path, lang);
  /* Paylaşım görseli app/opengraph-image.png; sayfalar [lang] altında olduğundan kendiliğinden eklenmiyor. */
  const image = { url: '/opengraph-image.png', width: 1200, height: 630, type: 'image/png', alt: OG_ALT };
  return {
    title,
    description,
    robots: { index: true, follow: true },
    openGraph: {
      type: 'website',
      url,
      siteName: 'Sitemendo',
      title: ogTitle,
      description: ogDescription,
      locale: ogLocale(lang),
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      images: [image],
    },
  };
}
