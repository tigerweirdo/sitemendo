/* Ratgeber için SEO: adresler, meta, Article ve BreadcrumbList yapısal verisi. Her rehber tek bir
   Almanca adreste durur (/ratgeber/<slug>, ?lang= yok): canonical kendisidir. */

import type { Metadata } from 'next';
import { COMPANY, CONTACT_EMAIL, CONTACT_PHONE_E164, SITE_URL } from '../company';
import { content } from '../content';
import { plain } from './inline';
import type { Guide } from './types';

export const HUB_PATH = '/ratgeber';
export const BRAND_SUFFIX = ' | Sitemendo';
export const OG_IMAGE = '/og/de.png';

export const guidePath = (slug: string) => `${HUB_PATH}/${slug}`;
export const guideUrl = (slug: string) => `${SITE_URL}${guidePath(slug)}`;
export const hubUrl = `${SITE_URL}${HUB_PATH}`;

export const HUB_TITLE = 'Ratgeber: Website prüfen, reparieren und pflegen';
export const HUB_DESCRIPTION = 'Verständliche Anleitungen für Unternehmen: mobile Ansicht, Ladezeit, defekte Links, HTTPS, Kontaktformular, Auffindbarkeit, Impressum und Wartung.';

const image = { url: OG_IMAGE, width: 1200, height: 630, type: 'image/png', alt: content.de.meta.ogAlt };
const robots = { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' as const, 'max-snippet': -1 } };

export function guideMetadata(g: Guide): Metadata {
  return {
    title: { absolute: `${g.title}${BRAND_SUFFIX}` },
    description: g.description,
    alternates: { canonical: guideUrl(g.slug) },
    robots,
    openGraph: {
      type: 'article',
      url: guideUrl(g.slug),
      siteName: 'Sitemendo',
      title: g.title,
      description: g.description,
      locale: 'de_DE',
      publishedTime: g.published,
      modifiedTime: g.modified,
      authors: ['Sitemendo'],
      section: g.category,
      images: [image],
    },
    twitter: { card: 'summary_large_image', title: g.title, description: g.description, images: [image] },
  };
}

export function hubMetadata(): Metadata {
  return {
    title: { absolute: `${HUB_TITLE}${BRAND_SUFFIX}` },
    description: HUB_DESCRIPTION,
    alternates: { canonical: hubUrl },
    robots,
    openGraph: { type: 'website', url: hubUrl, siteName: 'Sitemendo', title: HUB_TITLE, description: HUB_DESCRIPTION, locale: 'de_DE', images: [image] },
    twitter: { card: 'summary_large_image', title: HUB_TITLE, description: HUB_DESCRIPTION, images: [image] },
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
    headline: plain(g.h1),
    description: g.description,
    inLanguage: 'de-DE',
    url: guideUrl(g.slug),
    mainEntityOfPage: { '@type': 'WebPage', '@id': guideUrl(g.slug) },
    datePublished: g.published,
    dateModified: g.modified,
    image: `${SITE_URL}${OG_IMAGE}`,
    articleSection: g.category,
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

export function hubSchema(guides: Guide[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: HUB_TITLE,
    description: HUB_DESCRIPTION,
    inLanguage: 'de-DE',
    url: hubUrl,
    isPartOf: { '@type': 'WebSite', name: 'Sitemendo', url: SITE_URL },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: guides.map((g, i) => ({ '@type': 'ListItem', position: i + 1, url: guideUrl(g.slug), name: plain(g.h1) })),
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
      else if (b.t === 'table') texts.push(b.caption, ...b.head, ...b.rows.flat());
      else if (b.t === 'note') texts.push(b.title, b.x);
      else texts.push(b.label, b.x);
    }
  }
  g.faq.forEach(f => texts.push(f.q, f.a));
  const words = texts.map(plain).join(' ').split(/\s+/).filter(Boolean).length;
  return { words, minutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)) };
}

const DATE = new Intl.DateTimeFormat('de-DE', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
export const formatDate = (iso: string) => DATE.format(new Date(`${iso}T12:00:00Z`));
