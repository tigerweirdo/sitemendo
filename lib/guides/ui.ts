/* Ratgeber arayüz metinleri (başlıklar, etiketler, uyarılar) dil başına. Rehber metinleri değil, bileşenlerin
   kullandığı sabitler. Almanca değerler ilk sürümdeki metinlerle birebir aynıdır (üretilen HTML'in
   değişmediği derleme çıktısı karşılaştırmasıyla doğrulanır). */

import type { GuideCategory, GuideLang, GuideService } from './types';

export type GuideUi = {
  /* Sayfa ve adres kimlikleri */
  hubPath: string;
  locale: string;
  inLanguage: string;
  intl: string;
  faqId: string;
  /* Genel gezinti */
  home: string;
  hubName: string;
  crumbsLabel: string;
  mainNavLabel: string;
  /* Makale */
  byline: string;
  updated: string;
  minutes: string;
  tldr: string;
  toc: string;
  /* Gezinti öğesinin erişilebilirlik etiketi (başlıktan farklı olabilir). */
  tocLabel: string;
  faq: string;
  related: string;
  sources: string;
  disclaimer: (date: string) => string;
  back: string;
  /* Akış şemasında bir aşamada takılmanın etiketi (Blocks.tsx, 'flow'). */
  flowStop: string;
  altLabel: Record<GuideLang, string>;
  serviceLink: Record<GuideService, string>;
  /* Özet sayfası */
  hub: {
    title: string;
    description: string;
    meta: string;
    startTitle: string;
    startText: string;
    otherHub: string;
    otherHubLink: string;
  };
  /* Altbilgi */
  footerGuides: string;
  footerAll: string;
  categories: Record<GuideCategory, string>;
};

export const UI: Record<GuideLang, GuideUi> = {
  de: {
    hubPath: '/ratgeber',
    locale: 'de_DE',
    inLanguage: 'de-DE',
    intl: 'de-DE',
    faqId: 'haeufige-fragen',
    home: 'Startseite',
    hubName: 'Ratgeber',
    crumbsLabel: 'Brotkrumen',
    mainNavLabel: 'Hauptnavigation',
    byline: 'Von Sitemendo',
    updated: 'Stand',
    minutes: 'Min. Lesezeit',
    tldr: 'Kurz gesagt',
    toc: 'Inhalt',
    tocLabel: 'Inhaltsverzeichnis',
    faq: 'Häufige Fragen',
    related: 'Weiterlesen',
    sources: 'Quellen und weiterführende Links',
    disclaimer: date => `Dieser Ratgeber ist eine allgemeine Information und ersetzt keine Rechts-, Steuer- oder Fachberatung im Einzelfall. Alle Angaben beziehen sich auf den Stand ${date}; Hinweise von Google, Browsern und Gesetzgebern ändern sich.`,
    back: 'Zurück zur Übersicht',
    flowStop: 'Hier hängt es, wenn:',
    altLabel: { de: 'Deutsche Fassung', tr: 'Türkische Fassung' },
    serviceLink: { check: 'Mehr zur kostenlosen Prüfung', repair: 'Mehr zur Website-Reparatur', care: 'Mehr zur Website-Pflege' },
    hub: {
      title: 'Ratgeber: Website prüfen, reparieren und pflegen',
      description: 'Verständliche Anleitungen für Unternehmen: mobile Ansicht, Ladezeit, defekte Links, HTTPS, Kontaktformular, Auffindbarkeit, Impressum und Wartung.',
      meta: 'Von Sitemendo · Kostenlos lesbar, ohne Anmeldung',
      startTitle: 'Wo Sie anfangen sollten',
      startText: 'Die Ratgeber folgen den acht Punkten unserer kostenlosen Website-Prüfung und ergänzen Themen wie Erreichbarkeit und Wartung. Wenn Sie nicht wissen, wo das Problem liegt, beginnen Sie mit der Checkliste: Sie führt Sie in ein bis zwei Stunden durch alle acht Bereiche und verweist auf den passenden Ratgeber.',
      otherHub: 'Ausgewählte Ratgeber gibt es auch auf Türkisch.',
      otherHubLink: 'Türkische Ratgeber',
    },
    footerGuides: 'Ratgeber',
    footerAll: 'Alle Ratgeber',
    categories: {
      Grundlagen: 'Grundlagen', Mobil: 'Mobil', Tempo: 'Tempo', Links: 'Links', HTTPS: 'HTTPS', Formulare: 'Formulare',
      'Technik und Wartung': 'Technik und Wartung', Auffindbarkeit: 'Auffindbarkeit', 'Kontakt und Recht': 'Kontakt und Recht', Erreichbarkeit: 'Erreichbarkeit',
    },
  },
  tr: {
    hubPath: '/rehber',
    locale: 'tr_TR',
    inLanguage: 'tr-TR',
    intl: 'tr-TR',
    faqId: 'sik-sorulan-sorular',
    home: 'Ana sayfa',
    hubName: 'Rehber',
    crumbsLabel: 'Gezinti yolu',
    mainNavLabel: 'Ana menü',
    byline: 'Sitemendo',
    updated: 'Güncelleme',
    minutes: 'dk okuma',
    tldr: 'Kısaca',
    toc: 'İçindekiler',
    tocLabel: 'İçindekiler',
    faq: 'Sık sorulan sorular',
    related: 'Devamını okuyun',
    sources: 'Kaynaklar ve ek bağlantılar',
    disclaimer: date => `Bu rehber genel bilgi niteliğindedir; hukuki, mali veya uzman danışmanlığının yerini tutmaz. Tüm bilgiler ${date} tarihli durumu yansıtır; Google, tarayıcılar ve yasa koyucuların açıklamaları zamanla değişir.`,
    back: 'Rehber listesine dönün',
    flowStop: 'Burada takılır, eğer:',
    altLabel: { de: 'Almanca sürüm', tr: 'Türkçe sürüm' },
    serviceLink: { check: 'Ücretsiz kontrol hakkında', repair: 'Site onarımı hakkında', care: 'Site bakımı hakkında' },
    hub: {
      title: 'Rehber: Web sitesi kontrolü, onarımı ve bakımı',
      description: 'Almanya’daki işletmeler için web sitesi rehberleri: Impressum, Google’da görünürlük, iletişim formu ve bakım. Seçili rehberler Türkçe, diğerleri Almanca.',
      meta: 'Sitemendo · Ücretsiz, kayıt gerektirmez',
      startTitle: 'Nereden başlamalı',
      startText: '',
      otherHub: 'Rehberlerin tamamı Almanca yayımlanıyor; Almanya’daki işletmeler için seçilmiş olanlar Türkçeye uyarlandı.',
      otherHubLink: 'Almanca rehberler',
    },
    footerGuides: 'Rehber',
    footerAll: 'Tüm rehberler',
    categories: {
      Grundlagen: 'Temel bilgiler', Mobil: 'Mobil', Tempo: 'Hız', Links: 'Bağlantılar', HTTPS: 'HTTPS', Formulare: 'Formlar',
      'Technik und Wartung': 'Teknik ve bakım', Auffindbarkeit: 'Bulunabilirlik', 'Kontakt und Recht': 'İletişim ve hukuk', Erreichbarkeit: 'Erişilebilirlik',
    },
  },
};
