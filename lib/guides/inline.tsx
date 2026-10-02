/* Satır içi biçim: **kalın**, `kod`, [metin](adres) ve {price.care} gibi işaretler. React metni
   kaçırır; bağlantı adresi ise ayrıca doğrulanır (yalnız site içi yollar ve https).
   Fiyat ve süre işaretleri dile göre okunur: Türkçe rehber Türkçe paket kartlarından alır. */

import { Fragment, type ReactNode } from 'react';
import { content } from '../content';
import type { GuideLang } from './types';

/* Fiyat ve süre rehber metinlerinde TEKRARLANMAZ: paket kartlarından (content.ts) gelir. */
function tokensOf(lang: GuideLang): Record<string, string> {
  const services = content[lang].services;
  return {
    'price.check': services[0].price,
    'price.quick': services[1].price,
    'price.repair': services[2].price,
    'price.care': services[3].price,
    'time.check': services[0].time ?? '',
    'time.quick': services[1].time ?? '',
    'time.repair': services[2].time ?? '',
  };
}

export const TOKENS_BY_LANG: Record<GuideLang, Record<string, string>> = { de: tokensOf('de'), tr: tokensOf('tr') };

export function fill(text: string, lang: GuideLang) {
  const tokens = TOKENS_BY_LANG[lang];
  return text.replace(/\{([a-z]+\.[a-z]+)\}/g, (match, key: string) => tokens[key] ?? match);
}

const PATTERN = /(\*\*[^*\n]+\*\*|`[^`\n]+`|\[[^\]\n]+\]\([^)\s]+\))/g;

/* Dar yerlerde (tablo hücreleri, başlıklar) uzun tanımlayıcılara (DNS adları, hata kodları) noktalama sonrası satır sonu fırsatı eklenir.
   Yoksa tanımlayıcının uzunluğu tablo sütununun en küçük genişliği olur (tablo yana kayar) ya da kelime ortasından bölünür.
   <wbr> metin eklemez: kopyalama ve arama aynı kalır. */
const SOFT_MIN = 28;
const SOFT_AT = /[.:=@;/-]+|_/g;
const BEFORE_OK = /[A-Za-z0-9]/;
const AFTER_OK = /[A-Za-z0-9_]/;
/* Yalnız en az 3 harflik bir kelimenin ardından gelen noktalama sonrası (selektor. | _domainkey. | ihre-domain); kelimenin başındakiler (-all, _dmarc, .htaccess) ve kısa öneller (v=) ayrılmaz. */
function softBreaks(code: string): ReactNode {
  if (code.length < SOFT_MIN) return code;
  const parts: string[] = [];
  let from = 0;
  for (const m of code.matchAll(SOFT_AT)) {
    const at = m.index ?? 0;
    const end = at + m[0].length;
    if (at - from >= 3 && BEFORE_OK.test(code[at - 1] ?? '') && AFTER_OK.test(code[end] ?? '')) { parts.push(code.slice(from, end)); from = end; }
  }
  parts.push(code.slice(from));
  return parts.length < 2 ? code : parts.map((p, i) => <Fragment key={i}>{i > 0 && <wbr />}{p}</Fragment>);
}
const LINK = /^\[([^\]]+)\]\(([^)]+)\)$/;
/* Site içi: /yol, ?sorgu ve #çapa; dış: yalnız https. */
export const SAFE_HREF = /^(?:\/[A-Za-z0-9_\-./]*(?:\?[A-Za-z0-9_\-=&%.]*)?(?:#[A-Za-z0-9_-]*)?|https:\/\/[^\s"<>]+)$/;

export function Inline({ text, lang, soft = false }: { text: string; lang: GuideLang; soft?: boolean }): ReactNode {
  return fill(text, lang).split(PATTERN).map((part, i) => {
    if (!part) return null;
    if (part.length > 4 && part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.length > 2 && part.startsWith('`') && part.endsWith('`')) return <code key={i}>{soft ? softBreaks(part.slice(1, -1)) : part.slice(1, -1)}</code>;
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
export function plain(text: string, lang: GuideLang) {
  return fill(text, lang)
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1');
}

/* Metindeki tüm bağlantılar (test ve bağlantı denetimi için). */
export function linksOf(text: string, lang: GuideLang) {
  return [...fill(text, lang).matchAll(/\[([^\]\n]+)\]\(([^)\s]+)\)/g)].map(m => ({ label: m[1], href: m[2] }));
}
