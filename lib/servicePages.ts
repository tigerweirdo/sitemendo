/* Hizmet sayfaları: arama niyetine cevap veren üç sayfa (kontrol, onarım, bakım). Metin kuralları
   DOKUMANTASYON.md'dekiyle aynı: sakin, somut; abartı, uydurma referans ve kanıtlanamayan iddia
   yok. Fiyat ve süre burada TEKRARLANMAZ: sayfa bunları content.ts'teki paket kartlarından
   okur, böylece iki yerde farklı değer kalmaz. */

import type { FAQ, Lang } from './content';

export type ServiceKey = 'check' | 'repair' | 'care';

/* services: content.services içindeki sıra numaraları. */
export const SERVICE_PAGES = [
  { key: 'check', path: '/website-check', services: [0] },
  { key: 'repair', path: '/website-repair', services: [1, 2] },
  { key: 'care', path: '/website-care', services: [3] },
] as const satisfies readonly { key: ServiceKey; path: string; services: readonly number[] }[];

export type ServicePath = (typeof SERVICE_PAGES)[number]['path'];

export type ServiceCopy = {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lead: string;
  whoTitle: string;
  who: string[];
  guideTitle?: string;
  guide?: string;
  faq: FAQ[];
  ctaTitle: string;
  ctaText: string;
};

export type ServiceUi = {
  home: string;
  packages: string;
  checks: string;
  more: string;
  /* Sayfalar arası bağlantılarda kullanılan kısa ad (hizmet adı yerine arama diliyle). */
  names: Record<ServiceKey, string>;
};

export const serviceUi: Record<Lang, ServiceUi> = {
  tr: { home: 'Ana sayfa', packages: 'Paketler ve fiyatlar', checks: 'Neleri inceleriz', more: 'Diğer hizmetler', names: { check: 'Ücretsiz kontrol', repair: 'Site onarımı', care: 'Site bakımı' } },
  de: { home: 'Startseite', packages: 'Pakete und Preise', checks: 'Was wir prüfen', more: 'Weitere Leistungen', names: { check: 'Kostenlose Prüfung', repair: 'Website-Reparatur', care: 'Website-Pflege' } },
  en: { home: 'Home', packages: 'Packages and prices', checks: 'What we check', more: 'More services', names: { check: 'Free check', repair: 'Website repair', care: 'Website care' } },
};

export const servicePages: Record<Lang, Record<ServiceKey, ServiceCopy>> = {
  tr: {
    check: {
      metaTitle: 'Ücretsiz web sitesi kontrolü | Sitemendo',
      metaDescription: 'Site adresinizi girin, sekiz noktayı dışarıdan inceleyelim; öncelik listesiyle birlikte raporu 48 saat içinde e-postanıza gönderelim. Ücretsiz.',
      h1: 'Web siteniz için ücretsiz kontrol',
      lead: 'Site adresinizi ve e-postanızı yazın. Sitenizin dışarıdan erişilebilen sayfalarında sekiz noktayı inceler, bulguları öncelik sırasıyla bir raporda 48 saat içinde e-postanıza göndeririz. Kontrol ücretsizdir; düzeltme isteğe bağlıdır.',
      whoTitle: 'Kimler için uygun?',
      who: [
        'Sitenizin telefonda düzgün açılıp açılmadığını bilmiyorsanız.',
        'Sayfaların yavaş yüklendiğini ya da bazı bağlantıların çalışmadığını fark ettiyseniz.',
        'Sitenizin arama motorlarında bulunabilir olup olmadığından emin değilseniz.',
        'Para harcamadan önce neyin gerçekten düzeltilmesi gerektiğini görmek istiyorsanız.',
      ],
      faq: [
        { q: 'Kontrol gerçekten ücretsiz mi?', a: 'Evet. Kontrol ve rapor ücretsizdir. Raporu aldıktan sonra düzeltmeleri kendiniz yapabilir, başka birine yaptırabilir ya da bize yaptırabilirsiniz.' },
        { q: 'Rapor nasıl hazırlanıyor?', a: 'Sitenizin herkese açık ana sayfasını ve ondan verilen birkaç bağlantıyı sekiz başlıkta ölçer, bulguları önem sırasına koyarız.' },
        { q: 'Yönetim paneli ya da şifre gerekir mi?', a: 'Hayır. Ücretsiz kontrol için site adresi yeterli. Yönetim paneli, yedekleme ve e-posta teslimatı gibi kontroller ek erişim gerektirebilir ve ücretsiz kontrolün kapsamında değildir.' },
        { q: 'Raporda neler var?', a: 'Bulgular, ziyaretçiye etkileri ve önerilen adımlar, öncelik sırasıyla. Telefonda menünün kullanımı gibi bazı konular ek inceleme ister.' },
      ],
      ctaTitle: 'Sitenizin neye ihtiyacı olduğunu 48 saat içinde öğrenin.',
      ctaText: 'Ücretsiz kontrol için site adresi ve e-posta yeterli.',
    },
    repair: {
      metaTitle: 'Web sitesi onarımı: hızlı düzeltme ve site onarımı | Sitemendo',
      metaDescription: 'Mevcut sitenizdeki mobil görünüm, yavaş açılış, kırık bağlantı ve form sorunlarını onarıyoruz. Fiyat işe başlamadan önce bellidir. Önce ücretsiz kontrol.',
      h1: 'Web sitenizi onarıyoruz',
      lead: 'Yeni site yapmıyoruz; mevcut sitenizdeki teknik ve kullanım sorunlarını düzeltiyoruz. Ücretsiz kontrolün bulgularına göre iki paketten biri önerilir ve ücreti işe başlamadan önce bilirsiniz.',
      whoTitle: 'Hangi sorunları gideririz?',
      who: [
        'Telefonda bozuk görünen düzen ve çalışmayan menü.',
        'Yavaş açılan sayfalar.',
        'Açılmayan bağlantılar ve size ulaşmayan formlar.',
        'SSL ve yönlendirme sorunları, küçük SEO eksikleri.',
      ],
      guideTitle: 'Hangi paket uygun?',
      guide: 'Hızlı düzeltme, küçük ve net sınırlı sorunlar için uygundur. Site onarımı, birden fazla teknik, kullanım ya da hız sorununun bir arada olduğu siteler için uygundur. Hangisinin uyduğunu ücretsiz kontrolden sonra söyleriz.',
      faq: [
        { q: 'Yeni site yapıyor musunuz?', a: 'Hayır. Mevcut sitenizi onarıyoruz. Yeniden tasarım, yeni site ve çevrimiçi mağaza geliştirme kapsam dışındadır.' },
        { q: 'Ne kadar sürer?', a: 'Süre pakete göre değişir ve yukarıdaki paket kartlarında yazar.' },
        { q: 'Ücret nasıl belirlenir?', a: 'Fiyatlar sabittir ve yukarıda net olarak yazar (+ %19 KDV). Kontrolden sonra hangi paketin uyduğunu söyleriz; kapsamı aşan bir iş çıkarsa işe başlamadan önce bildiririz.' },
        { q: 'Sitemin erişim bilgilerini vermem gerekir mi?', a: 'Ücretsiz kontrol için gerekmez. Onarım için sitenize erişim gerekebilir; hangi erişimin gerektiğini işe başlamadan önce sizinle netleştiririz.' },
      ],
      ctaTitle: 'Önce ücretsiz kontrolle başlayın.',
      ctaText: 'Raporu okuduktan sonra karar sizin.',
    },
    care: {
      metaTitle: 'Web sitesi bakımı ve takibi | Sitemendo',
      metaDescription: 'Sitenizin açık kalıp kalmadığını, güncellemelerini ve bağlantılarını düzenli takip ediyor, her ay kısa bir raporla bildiriyoruz. Önce ücretsiz kontrol.',
      h1: 'Web sitenizi düzenli bakımla sağlıklı tutuyoruz',
      lead: 'Onarılmış bir site de zamanla yeniden sorun çıkarabilir: bir eklenti eskir, bir bağlantı kırılır, site açılmaz. Site bakımı bunları düzenli takip eder ve her ay kısa bir raporla bildirir.',
      whoTitle: 'Kimler için uygun?',
      who: [
        'Sitesi işi için önemli ama güncellemelerle uğraşmak istemeyenler.',
        'Onarılan sitenin yeniden bozulmasını istemeyenler.',
        'Sitesi kapanırsa bunu müşteriden önce öğrenmek isteyenler.',
      ],
      faq: [
        { q: 'Bakıma neler dahil?', a: 'Yukarıdaki listede yazan kalemler: kesinti takibi, CMS ve eklenti güncellemeleri, düzenli yedekleme (barındırma izin veriyorsa), temel güvenlik kontrolleri, kırık bağlantı takibi, aylık kısa rapor ve küçük değişiklikler.' },
        { q: 'Küçük değişiklikler ne kadar?', a: 'Ayda en fazla 30 dakikalık küçük değişiklik dahildir.' },
        { q: 'Yedekleme her sitede yapılır mı?', a: 'Yalnızca barındırma firmanız izin veriyorsa. Mümkün olmayan durumlarda bunu başlamadan önce söyleriz.' },
        { q: 'Bakım ne zaman başlar?', a: 'Genellikle kontrolden ve gerekli onarımlardan sonra. Koşulları işe başlamadan önce sizinle netleştiririz.' },
      ],
      ctaTitle: 'Sitenizin şu anki durumunu öğrenin.',
      ctaText: 'Önce ücretsiz kontrol, bakım onarımdan sonra gelir.',
    },
  },
  de: {
    check: {
      metaTitle: 'Kostenloser Website-Check für Unternehmen | Sitemendo',
      metaDescription: 'Website-Adresse eingeben: Wir prüfen acht Punkte von außen und senden Ihnen innerhalb von 48 Stunden einen Bericht mit Prioritätenliste. Kostenlos.',
      h1: 'Kostenloser Website-Check für Ihre Firmenwebsite',
      lead: 'Nennen Sie uns Ihre Website-Adresse und Ihre E-Mail. Wir prüfen acht Punkte auf den öffentlich erreichbaren Seiten und senden Ihnen die Ergebnisse innerhalb von 48 Stunden als Bericht mit Prioritätenliste. Die Prüfung ist kostenlos, die Reparatur bleibt optional.',
      whoTitle: 'Für wen eignet sich das?',
      who: [
        'Sie wissen nicht, ob Ihre Website auf dem Handy richtig funktioniert.',
        'Sie haben den Eindruck, dass Seiten langsam laden oder Links nicht mehr funktionieren.',
        'Sie sind unsicher, ob Ihre Website bei Suchmaschinen überhaupt gefunden werden kann.',
        'Sie möchten wissen, was wirklich zu tun ist, bevor Sie Geld ausgeben.',
      ],
      faq: [
        { q: 'Ist die Prüfung wirklich kostenlos?', a: 'Ja. Prüfung und Bericht kosten nichts. Nach dem Bericht können Sie die Korrekturen selbst umsetzen, jemand anderen beauftragen oder uns damit beauftragen.' },
        { q: 'Wie entsteht der Bericht?', a: 'Wir messen die öffentlich erreichbare Startseite und einige davon verlinkte Seiten in acht Punkten und ordnen die Ergebnisse nach Dringlichkeit.' },
        { q: 'Brauche ich Zugangsdaten?', a: 'Nein. Für die kostenlose Prüfung genügt die Website-Adresse. Prüfungen wie Verwaltungsbereich, Sicherung und E-Mail-Zustellung können zusätzlichen Zugang erfordern und gehören nicht zur kostenlosen Prüfung.' },
        { q: 'Was steht im Bericht?', a: 'Die Befunde mit Auswirkung und empfohlenem Schritt, nach Priorität sortiert. Manches, etwa die Bedienung des Menüs auf dem Handy, braucht eine zusätzliche Prüfung.' },
      ],
      ctaTitle: 'Erfahren Sie innerhalb von 48 Stunden, was Ihre Website braucht.',
      ctaText: 'Für die kostenlose Prüfung genügen Website-Adresse und E-Mail.',
    },
    repair: {
      metaTitle: 'Website reparieren lassen | Sitemendo',
      metaDescription: 'Wir reparieren Ihre bestehende Website: mobile Ansicht, Ladezeit, kaputte Links, Formulare. Den Preis kennen Sie vor Arbeitsbeginn. Zuerst eine kostenlose Prüfung.',
      h1: 'Website reparieren lassen',
      lead: 'Wir bauen keine neuen Websites, sondern beheben technische und Bedienungsprobleme Ihrer bestehenden. Nach der kostenlosen Prüfung empfehlen wir eines von zwei Paketen; den Preis kennen Sie, bevor wir anfangen.',
      whoTitle: 'Welche Probleme beheben wir?',
      who: [
        'Eine mobile Ansicht, die nicht richtig dargestellt wird, und ein Menü, das nicht funktioniert.',
        'Seiten, die langsam laden.',
        'Links, die ins Leere führen, und Formulare, deren Nachrichten nicht ankommen.',
        'SSL- und Weiterleitungsprobleme sowie kleine SEO-Lücken.',
      ],
      guideTitle: 'Welches Paket passt?',
      guide: 'Die Schnellreparatur passt zu kleinen, klar abgegrenzten Problemen. Die Website-Reparatur passt, wenn mehrere technische, Bedienungs- oder Ladezeitprobleme zusammenkommen. Welches Paket zu Ihnen passt, sagen wir Ihnen nach der kostenlosen Prüfung.',
      faq: [
        { q: 'Bauen Sie auch neue Websites?', a: 'Nein. Wir reparieren bestehende Websites. Redesign, neue Website und Onlineshop-Entwicklung gehören nicht dazu.' },
        { q: 'Wie lange dauert es?', a: 'Das hängt vom Paket ab und steht in den Paketkarten oben.' },
        { q: 'Wie wird der Preis festgelegt?', a: 'Die Preise sind fest und stehen oben, netto zzgl. 19 % USt. Nach der Prüfung sagen wir, welches Paket passt; geht ein Auftrag darüber hinaus, sagen wir es vor Arbeitsbeginn.' },
        { q: 'Brauchen Sie Zugangsdaten zu meiner Website?', a: 'Für die kostenlose Prüfung nicht. Für die Reparatur kann ein Zugang nötig sein; welcher, klären wir vor Arbeitsbeginn mit Ihnen.' },
      ],
      ctaTitle: 'Beginnen Sie mit der kostenlosen Prüfung.',
      ctaText: 'Nach dem Bericht entscheiden Sie.',
    },
    care: {
      metaTitle: 'Website-Wartung und Website-Pflege | Sitemendo',
      metaDescription: 'Wir behalten Ihre Website im Blick: Erreichbarkeit, Updates, kaputte Links und ein kurzer Monatsbericht. Zuerst eine kostenlose Prüfung.',
      h1: 'Website-Pflege und Wartung',
      lead: 'Auch eine reparierte Website kann mit der Zeit wieder Probleme bekommen: Ein Plugin veraltet, ein Link bricht, die Seite ist nicht erreichbar. Die Website-Pflege behält das im Blick und meldet sich einmal im Monat mit einem kurzen Bericht.',
      whoTitle: 'Für wen eignet sich die Pflege?',
      who: [
        'Ihre Website ist wichtig für Ihr Geschäft, aber Sie möchten sich nicht um Updates kümmern.',
        'Sie möchten, dass eine reparierte Website nicht wieder verfällt.',
        'Sie möchten von einem Ausfall vor Ihren Kunden erfahren.',
      ],
      faq: [
        { q: 'Was ist in der Pflege enthalten?', a: 'Die oben aufgeführten Punkte: Erreichbarkeitsüberwachung, CMS- und Plugin-Updates, regelmäßige Datensicherung (sofern das Hosting es zulässt), grundlegende Sicherheitsprüfungen, Überwachung auf kaputte Links, ein kurzer Monatsbericht und kleine Änderungen.' },
        { q: 'Wie viele Änderungen sind enthalten?', a: 'Bis zu 30 Minuten kleine Änderungen pro Monat.' },
        { q: 'Gibt es die Datensicherung bei jeder Website?', a: 'Nur, wenn Ihr Hosting sie zulässt. Wo das nicht möglich ist, sagen wir es vor Beginn.' },
        { q: 'Wann beginnt die Pflege?', a: 'In der Regel nach der Prüfung und den nötigen Reparaturen. Die Bedingungen klären wir vor Beginn mit Ihnen.' },
      ],
      ctaTitle: 'Erfahren Sie, in welchem Zustand Ihre Website ist.',
      ctaText: 'Die kostenlose Prüfung kommt zuerst, die Pflege danach.',
    },
  },
  en: {
    check: {
      metaTitle: 'Free website check for businesses | Sitemendo',
      metaDescription: 'Enter your website address: we check eight points from the outside and email you a report with a priority list within 48 hours. Free.',
      h1: 'Free website check for your business website',
      lead: 'Give us your website address and your email. We check eight points on the publicly reachable pages and send you the results as a report with a priority list within 48 hours. The check is free; repairs are optional.',
      whoTitle: 'Who is it for?',
      who: [
        'You do not know whether your website works properly on a phone.',
        'You have the impression that pages load slowly or that some links no longer work.',
        'You are unsure whether search engines can find your website at all.',
        'You want to know what really needs doing before you spend money.',
      ],
      faq: [
        { q: 'Is the check really free?', a: 'Yes. The check and the report cost nothing. After the report you can make the fixes yourself, have someone else do them, or have us do them.' },
        { q: 'How is the report produced?', a: 'We measure the publicly reachable homepage and a few pages linked from it across eight points and rank the findings by urgency.' },
        { q: 'Do I need to give you access?', a: 'No. The website address is enough for the free check. Checks such as the admin area, backups and email delivery may need extra access and are not part of the free check.' },
        { q: 'What is in the report?', a: 'The findings with their impact and a suggested step, sorted by priority. Some things, such as how the menu works on a phone, need an additional review.' },
      ],
      ctaTitle: 'Find out within 48 hours what your website needs.',
      ctaText: 'A website address and an email are all it takes for the free check.',
    },
    repair: {
      metaTitle: 'Website repair for existing sites | Sitemendo',
      metaDescription: 'We repair your existing website: mobile view, load time, broken links, forms. You know the price before we start. A free check comes first.',
      h1: 'Website repair',
      lead: 'We do not build new websites; we fix the technical and usability problems of your existing one. After the free check we recommend one of two packages, and you know the price before we start.',
      whoTitle: 'Which problems do we fix?',
      who: [
        'A mobile layout that does not display properly, and a menu that does not work.',
        'Pages that load slowly.',
        'Links that lead nowhere, and forms whose messages do not arrive.',
        'SSL and redirect problems, and small SEO gaps.',
      ],
      guideTitle: 'Which package fits?',
      guide: 'The quick fix suits small, clearly defined problems. The website repair suits sites where several technical, usability or speed problems come together. We tell you which one fits after the free check.',
      faq: [
        { q: 'Do you build new websites?', a: 'No. We repair existing websites. Redesign, a new website and online shop development are not included.' },
        { q: 'How long does it take?', a: 'It depends on the package and is shown on the package cards above.' },
        { q: 'How is the price set?', a: 'Prices are fixed and shown above, net plus 19% VAT. After the check we tell you which package fits; if a job goes beyond that, we say so before we start.' },
        { q: 'Do you need access to my website?', a: 'Not for the free check. A repair may need access; we agree with you which access before work begins.' },
      ],
      ctaTitle: 'Start with the free check.',
      ctaText: 'After the report, the decision is yours.',
    },
    care: {
      metaTitle: 'Website care and maintenance | Sitemendo',
      metaDescription: 'We keep an eye on your website: availability, updates, broken links and a short monthly report. A free check comes first.',
      h1: 'Website care and maintenance',
      lead: 'Even a repaired website can run into problems again over time: a plugin goes out of date, a link breaks, the site is not reachable. Website care keeps watch and reports back once a month with a short summary.',
      whoTitle: 'Who is care for?',
      who: [
        'Your website matters to your business but you would rather not deal with updates.',
        'You want a repaired website not to fall apart again.',
        'You want to hear about an outage before your customers do.',
      ],
      faq: [
        { q: 'What does care include?', a: 'The items listed above: uptime monitoring, CMS and plugin updates, regular backups (where the hosting allows it), basic security checks, broken-link monitoring, a short monthly report and small changes.' },
        { q: 'How many changes are included?', a: 'Up to 30 minutes of small changes per month.' },
        { q: 'Are backups possible on every website?', a: 'Only if your hosting allows it. Where that is not possible, we tell you before we begin.' },
        { q: 'When does care start?', a: 'Usually after the check and any repairs that are needed. We agree the terms with you before we begin.' },
      ],
      ctaTitle: 'Find out what state your website is in.',
      ctaText: 'The free check comes first, care comes after.',
    },
  },
};
