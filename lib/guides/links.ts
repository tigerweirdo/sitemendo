/* Ratgeber → ana site bağlantıları. Ana site dil seçimini Worker'da yapar (?lang=), bu yüzden bunlar
   tam sayfa gezintisidir; next/link (istemci yönlendirmesi) kullanılmaz. */
export const LINKS = {
  home: '/?lang=de',
  start: '/?lang=de#start',
  tr: '/?lang=tr',
  en: '/?lang=en',
  check: '/website-check?lang=de',
  repair: '/website-repair?lang=de',
  care: '/website-care?lang=de',
  privacy: '/privacy?lang=de',
  impressum: '/impressum?lang=de',
  guides: '/ratgeber',
} as const;
