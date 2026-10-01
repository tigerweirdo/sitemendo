/* Hizmet sayfalarındaki "ilgili rehberler" bölümünün metinleri. Ayrı küçük dosya: ServicePage istemci
   bileşeni, tüm rehber metinlerini içeren lib/guides/index.ts'i derlemeye çekmesin. */

export const CARD_UI = {
  de: {
    title: 'Passende Ratgeber',
    text: 'Ausführliche Anleitungen zum Selbermachen, kostenlos und ohne Anmeldung.',
    all: 'Alle Ratgeber ansehen',
  },
  tr: {
    title: 'İlgili rehberler',
    text: 'Kendiniz uygulayabileceğiniz ayrıntılı anlatımlar; ücretsiz, kayıt gerektirmez.',
    all: 'Tüm rehberleri görün',
  },
} as const;
