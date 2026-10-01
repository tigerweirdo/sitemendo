/* Ratgeber → ana site bağlantıları. Ana site dil seçimini Worker'da yapar (?lang=), bu yüzden bunlar
   tam sayfa gezintisidir; next/link (istemci yönlendirmesi) kullanılmaz. Bağlantılar sabit metin değil
   nesne özelliğidir: @next/next/no-html-link-for-pages kuralı sabit "/..." adreslerini yakalar.
   Türkçe sayfalar açıkça ?lang=tr ile bağlanır; tarayıcı dili Almanca olan Türkçe okuyucu da Türkçe kalsın. */
const DE = {
  home: '/?lang=de',
  start: '/?lang=de#start',
  de: '/?lang=de',
  tr: '/?lang=tr',
  en: '/?lang=en',
  check: '/website-check?lang=de',
  repair: '/website-repair?lang=de',
  care: '/website-care?lang=de',
  privacy: '/privacy?lang=de',
  impressum: '/impressum?lang=de',
  guides: '/ratgeber',
} as const;

const TR = {
  home: '/?lang=tr',
  start: '/?lang=tr#start',
  de: '/?lang=de',
  tr: '/?lang=tr',
  en: '/?lang=en',
  check: '/website-check?lang=tr',
  repair: '/website-repair?lang=tr',
  care: '/website-care?lang=tr',
  privacy: '/privacy?lang=tr',
  impressum: '/impressum?lang=tr',
  guides: '/rehber',
} as const;

/* Geriye uyumluluk: Almanca bağlantılar. */
export const LINKS = DE;

export type GuideLinks = typeof DE | typeof TR;

export function linksFor(lang: 'de' | 'tr'): GuideLinks {
  return lang === 'tr' ? TR : DE;
}
