/* Ratgeber için SEO: adresler, meta, Article ve BreadcrumbList yapısal verisi. Her rehber tek bir
   adreste durur (/ratgeber/<slug> Almanca, /rehber/<slug> Türkçe; ?lang= yok): canonical kendisidir.
   Karşılığı olan rehberler hreflang ile birbirine bağlanır; x-default Almanca sürümdür. */

import type { Metadata } from 'next';
import { COMPANY, CONTACT_EMAIL, CONTACT_PHONE_E164, SITE_URL } from '../company';
import { content } from '../content';
import { plain } from './inline';
import type { Guide, GuideLang } from './types';
import { UI } from './ui';

export const BRAND_SUFFIX = ' | Sitemendo';
/* Paylaşım görseli dilin kendi dosyası (public/og/<dil>.png), ana sitedeki gibi. */
export const ogPath = (lang: GuideLang) => `/og/${lang}.png`;

type Addressable = { lang: GuideLang; slug: string };

export const hubPath = (lang: GuideLang) => UI[lang].hubPath;
export const hubUrl = (lang: GuideLang) => `${SITE_URL}${hubPath(lang)}`;
export const guidePath = (g: Addressable) => `${hubPath(g.lang)}/${g.slug}`;
export const guideUrl = (g: Addressable) => `${SITE_URL}${guidePath(g)}`;

const ogImage = (lang: GuideLang) => ({ url: ogPath(lang), width: 1200, height: 630, type: 'image/png', alt: content[lang].meta.ogAlt });
const robots = { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' as const, 'max-snippet': -1 } };

/* Dil karşılıkları: iki sayfa da kendini ve diğerini listeler; x-default Almanca. */
function languageAlternates(a: Addressable, b: Addressable, url: (x: Addressable) => string) {
  const de = a.lang === 'de' ? a : b;
  return { [a.lang]: url(a), [b.lang]: url(b), 'x-default': url(de) };
}

export function guideMetadata(g: Guide, alt?: Guide): Metadata {
  const ui = UI[g.lang];
  const image = ogImage(g.lang);
  return {
    title: { absolute: `${g.title}${BRAND_SUFFIX}` },
    description: g.description,
    alternates: { canonical: guideUrl(g), ...(alt ? { languages: languageAlternates(g, alt, guideUrl) } : {}) },
    robots,
    openGraph: {
      type: 'article',
      url: guideUrl(g),
      siteName: 'Sitemendo',
      title: g.title,
      description: g.description,
      locale: ui.locale,
      ...(alt ? { alternateLocale: [UI[alt.lang].locale] } : {}),
      publishedTime: g.published,
      modifiedTime: g.modified,
      authors: ['Sitemendo'],
      section: ui.categories[g.category],
      images: [image],
    },
    twitter: { card: 'summary_large_image', title: g.title, description: g.description, images: [image] },
  };
}

/* Özet sayfaları: iki dilde de varsa birbirinin karşılığıdır. */
export function hubMetadata(lang: GuideLang, otherLang?: GuideLang): Metadata {
  const ui = UI[lang];
  const image = ogImage(lang);
  const languages = otherLang
    ? languageAlternates({ lang, slug: '' }, { lang: otherLang, slug: '' }, x => hubUrl(x.lang))
    : undefined;
  return {
    title: { absolute: `${ui.hub.title}${BRAND_SUFFIX}` },
    description: ui.hub.description,
    alternates: { canonical: hubUrl(lang), ...(languages ? { languages } : {}) },
    robots,
    openGraph: {
      type: 'website', url: hubUrl(lang), siteName: 'Sitemendo', title: ui.hub.title, description: ui.hub.description,
      locale: ui.locale, ...(otherLang ? { alternateLocale: [UI[otherLang].locale] } : {}), images: [image],
    },
    twitter: { card: 'summary_large_image', title: ui.hub.title, description: ui.hub.description, images: [image] },
  };
}

const organization = {
  '@type': 'Organization',
  name: 'Sitemendo',
  url: SITE_URL,
  email: CONTACT_EMAIL,
  telephone: CONTACT_PHONE_E164,
  address: {
    '@type': 'PostalAddress',
    streetAddress: COMPANY.street,
    postalCode: COMPANY.postalCode,
    addressLocality: COMPANY.city,
    addressCountry: 'DE',
  },
};

export function articleSchema(g: Guide) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: plain(g.h1, g.lang),
    description: g.description,
    inLanguage: UI[g.lang].inLanguage,
    url: guideUrl(g),
    mainEntityOfPage: { '@type': 'WebPage', '@id': guideUrl(g) },
    datePublished: g.published,
    dateModified: g.modified,
    image: `${SITE_URL}${ogPath(g.lang)}`,
    articleSection: UI[g.lang].categories[g.category],
    author: { ...organization },
    publisher: { ...organization },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({ '@type': 'ListItem', position: i + 1, name: item.name, item: item.url })),
  };
}

export function hubSchema(lang: GuideLang, guides: Guide[]) {
  const ui = UI[lang];
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: ui.hub.title,
    description: ui.hub.description,
    inLanguage: ui.inLanguage,
    url: hubUrl(lang),
    isPartOf: { '@type': 'WebSite', name: 'Sitemendo', url: SITE_URL },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: guides.map((g, i) => ({ '@type': 'ListItem', position: i + 1, url: guideUrl(g), name: plain(g.h1, g.lang) })),
    },
  };
}

/* Schema.org-JSON, <script> içine güvenle gömülür. */
export function jsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

const WORDS_PER_MINUTE = 200;

/* Okuma süresi ve kelime sayısı: görünen tüm metinden. */
export function guideStats(g: Guide) {
  const texts: string[] = [g.h1, ...g.tldr, ...g.intro];
  for (const s of g.sections) {
    texts.push(s.h2);
    for (const b of s.blocks) {
      if (b.t === 'p' || b.t === 'h3') texts.push(b.x);
      else if (b.t === 'ul' || b.t === 'ol') texts.push(...b.items);
      else if (b.t === 'steps') b.items.forEach(i => texts.push(i.h, i.x));
      else if (b.t === 'flow') texts.push(b.label, ...b.nodes.flatMap(n => [n.h, n.x, ...(n.stop ? [n.stop] : [])]));
      else if (b.t === 'table') texts.push(b.caption, ...b.head, ...b.rows.flat());
      else if (b.t === 'note') texts.push(b.title, b.x);
      else texts.push(b.label, b.x);
    }
  }
  g.faq.forEach(f => texts.push(f.q, f.a));
  const words = texts.map(t => plain(t, g.lang)).join(' ').split(/\s+/).filter(Boolean).length;
  return { words, minutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)) };
}

const DATE: Record<GuideLang, Intl.DateTimeFormat> = {
  de: new Intl.DateTimeFormat('de-DE', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }),
  tr: new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }),
};
export const formatDate = (iso: string, lang: GuideLang) => DATE[lang].format(new Date(`${iso}T12:00:00Z`));
