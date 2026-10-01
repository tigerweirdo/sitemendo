/* Satır içi biçim: **kalın**, `kod`, [metin](adres) ve {price.care} gibi işaretler. React metni
   kaçırır; bağlantı adresi ise ayrıca doğrulanır (yalnız site içi yollar ve https). */

import { Fragment, type ReactNode } from 'react';
import { content } from '../content';

const services = content.de.services;

/* Fiyat ve süre rehber metinlerinde TEKRARLANMAZ: paket kartlarından (content.ts) gelir. */
export const TOKENS: Record<string, string> = {
  'price.check': services[0].price,
  'price.quick': services[1].price,
  'price.repair': services[2].price,
  'price.care': services[3].price,
  'time.check': services[0].time ?? '',
  'time.quick': services[1].time ?? '',
  'time.repair': services[2].time ?? '',
};

export function fill(text: string) {
  return text.replace(/\{([a-z]+\.[a-z]+)\}/g, (match, key: string) => TOKENS[key] ?? match);
}

const PATTERN = /(\*\*[^*\n]+\*\*|`[^`\n]+`|\[[^\]\n]+\]\([^)\s]+\))/g;
const LINK = /^\[([^\]]+)\]\(([^)]+)\)$/;
/* Site içi: /yol, ?sorgu ve #çapa; dış: yalnız https. */
export const SAFE_HREF = /^(?:\/[A-Za-z0-9_\-./]*(?:\?[A-Za-z0-9_\-=&%.]*)?(?:#[A-Za-z0-9_-]*)?|https:\/\/[^\s"<>]+)$/;

export function Inline({ text }: { text: string }): ReactNode {
  return fill(text).split(PATTERN).map((part, i) => {
    if (!part) return null;
    if (part.length > 4 && part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.length > 2 && part.startsWith('`') && part.endsWith('`')) return <code key={i}>{part.slice(1, -1)}</code>;
    const link = part.match(LINK);
    if (link) {
      const [, label, href] = link;
      if (!SAFE_HREF.test(href)) return <Fragment key={i}>{label}</Fragment>;
      return href.startsWith('https://')
        ? <a key={i} href={href} rel="noopener noreferrer">{label}</a>
        : <a key={i} href={href}>{label}</a>;
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

/* Biçimsiz düz metin: kelime sayımı, yapısal veri ve testler için. */
export function plain(text: string) {
  return fill(text)
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1');
}

/* Metindeki tüm bağlantılar (test ve bağlantı denetimi için). */
export function linksOf(text: string) {
  return [...fill(text).matchAll(/\[([^\]\n]+)\]\(([^)\s]+)\)/g)].map(m => ({ label: m[1], href: m[2] }));
}
