/* Ratgeber (/ratgeber Almanca, /rehber Türkçe): veri modeli. Metinler lib/guides/*.ts (Almanca) ve
   lib/guides/tr/*.ts (Türkçe) içinde, bir rehber bir dosya. Satır içi biçim (inline): **kalın**, `kod`,
   [metin](adres) ve {price.care} gibi fiyat/süre işaretleri (lib/guides/inline.tsx). Fiyat ve süre rehber
   metinlerinde TEKRARLANMAZ; paket kartlarından (content.ts) okunur. */

import type { CheckKey } from '../content';

/* Rehberin yazıldığı dil. Almanca ana dildir; Türkçe, Almanya'daki Türkçe konuşan işletmeler için
   seçilmiş birkaç rehberin pilotudur (docs/seo-strategie.md). İngilizce şimdilik yok. */
export type GuideLang = 'de' | 'tr';
export const GUIDE_LANGS: GuideLang[] = ['de', 'tr'];

export type Block =
  | { t: 'p'; x: string }
  | { t: 'h3'; x: string }
  | { t: 'ul'; items: string[] }
  | { t: 'ol'; items: string[] }
  | { t: 'steps'; items: { h: string; x: string }[] }
  /* Akış şeması: kutular ve oklar, gerçek HTML metni (satır içi SVG yok, böylece metin her genişlikte okunur ve
     kelime bölünmez). `stop` o aşamada takılırsa görülen belirti ya da durum mesajıdır. */
  | { t: 'flow'; label: string; nodes: { h: string; x: string; stop?: string }[] }
  | { t: 'table'; caption: string; head: string[]; rows: string[][] }
  | { t: 'note'; kind: 'tip' | 'warn' | 'info'; title: string; x: string }
  | { t: 'code'; label: string; x: string };

export type GuideSection = { id: string; h2: string; blocks: Block[] };
export type GuideFaq = { q: string; a: string };
export type GuideSource = { label: string; url: string };

export type GuideCategory =
  | 'Grundlagen'
  | 'Mobil'
  | 'Tempo'
  | 'Links'
  | 'HTTPS'
  | 'Formulare'
  | 'Technik und Wartung'
  | 'Auffindbarkeit'
  | 'Kontakt und Recht'
  | 'Erreichbarkeit';

/* Reihenfolge der Gruppen in der Übersicht: erst Grundlagen, dann die acht Prüfpunkte der Website-Prüfung,
   zuletzt Erreichbarkeit. Eine Kategorie, die hier fehlt, erscheint nicht in der Übersicht (Test prüft das). */
export const CATEGORY_ORDER: GuideCategory[] = [
  'Grundlagen', 'Mobil', 'Tempo', 'Links', 'HTTPS', 'Formulare', 'Technik und Wartung', 'Auffindbarkeit', 'Kontakt und Recht', 'Erreichbarkeit',
];

export type GuideService = 'check' | 'repair' | 'care';

export type Guide = {
  lang: GuideLang;
  /* Bu rehber bir çeviri/uyarlamaysa Almanca aslının slug'ı. hreflang çifti buradan çıkar; yalnız Türkçe
     dosyada yazılır, Almanca taraf karşılığı kendiliğinden bulur (lib/guides/index.ts: counterpart). */
  translationOf?: string;
  slug: string;
  category: GuideCategory;
  /* Zu welchem der acht Prüfpunkte (lib/content.ts) der Ratgeber gehört; Grundlagen: keiner. */
  check?: CheckKey;
  /* Kurzer Name für Menüs und Fußzeile (≤ 34 Zeichen). */
  short: string;
  /* <title> ohne Marke; die Marke " | Sitemendo" wird angehängt (Gesamtlänge ≤ 60). */
  title: string;
  h1: string;
  description: string;
  /* Kurzer Anreißer für Kartenlisten. */
  teaser: string;
  /* "Kurz gesagt": drei bis fünf Aussagen, die die Frage sofort beantworten. */
  tldr: string[];
  intro: string[];
  sections: GuideSection[];
  faq: GuideFaq[];
  /* Auf welche Leistungsseite der Ratgeber am Ende verweist. */
  service: GuideService;
  related: string[];
  sources: GuideSource[];
  /* ISO-Datum (JJJJ-MM-TT). dateModified wird bei jeder inhaltlichen Änderung angehoben. */
  published: string;
  modified: string;
};
