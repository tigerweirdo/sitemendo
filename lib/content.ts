export type Lang = 'tr' | 'en' | 'de';
export type Check = { no: string; title: string; desc: string };
export type Finding = { no: string; severity: string; level: 'crit' | 'med'; title: string; impact: string };
export type Service = { no: string; name: string; price: string; items: string[]; cta?: string; featured?: boolean; note?: string; showAfter?: boolean };
export type FAQ = { q: string; a: string };
export type ChecklistCell = { k: string; v: string; s: 'ok' | 'warn' | 'err' };
export type LegalBlock = { h: string; p: string };

export type Copy = {
  nav: { how: string; checks: string; services: string; faq: string; cta: string; ctaShort: string; lang: string };
  a11y: { skip: string; mainNav: string; menu: string; knife: string };
  hero: { a: string; support: string; place: string };
  about: {
    title: string; p1: string; p2: string;
    emailLabel: string; phoneLabel: string; whatsapp: string;
  };
  sec: { checks: string; output: string; decision: string; services: string; process: string; start: string };
  checksTitle: string;
  checksSub: string;
  checksNote: string;
  checks: Check[];
  reportTitle: string;
  reportSub: string;
  findings: Finding[];
  sampleReport: { label: string; note: string; issues: string; impact: string; openList: string; closeList: string; listLabel: string };
  checklist: ChecklistCell[];
  statementA: string;
  statementSub: string;
  servicesTitle: string;
  servicesCta: string;
  after: string;
  talk: string;
  services: Service[];
  howTitle: string;
  steps: [string, string][];
  assure: string;
  faqTitle: string;
  faq: FAQ[];
  final: string;
  form: {
    title: string; lead: string; url: string; urlPh: string; submit: string;
    assure: string; sample: string; urlErr: string;
    ask: string; email: string; emailPh: string; emailErr: string; prepare: string;
    back: string; sending: string; done: string; doneText: string; demo: string;
    demoNote: string; edit: string; reset: string; fail: string; privacy: string; privacyLink: string;
  };
  footer: { tag: string; services: string; site: string; legal: string; privacy: string; rights: string; contact: string; contactHint: string; mark: string };
  meta: {
    title: string; description: string; ogTitle: string; ogDescription: string;
    privacyTitle: string; privacyDescription: string; impressumTitle: string; impressumDescription: string;
  };
  legal: {
    back: string; updated: string;
    privacyTitle: string; privacyLead: string; privacy: LegalBlock[];
    impressumTitle: string; impressumLead: string;
    provider: string; country: string; emailLabel: string; phoneLabel: string;
    impressum: LegalBlock[];
  };
};

export const content: Record<Lang, Copy> = {
  tr: {
    nav: { how: 'Nasıl çalışır', checks: 'Kontrol kapsamı', services: 'Hizmetler', faq: 'Sorular', cta: 'Ücretsiz kontrol isteyin', ctaShort: 'Kontrol', lang: 'Dil' },
    a11y: { skip: 'İçeriğe geç', mainNav: 'Ana menü', menu: 'Menü', knife: 'Açılan çok amaçlı çakı çizimi' },
    hero: {
      a: 'Web siteniz için kontrol, düzeltme ve bakım.',
      support: 'Web sitenizdeki teknik ve kullanım sorunlarını belirliyor, öncelik sırasına koyuyor ve onayınızla gideriyoruz. Düzenli bakım ile sitenizi takip ediyoruz.',
      place: 'Berlin merkezli',
    },
    about: {
      title: 'Önce tespit. Sonra net bir plan.',
      p1: 'Sitemendo, işletmelerin web sitelerini inceler, gerekli düzeltmeleri uygular ve düzenli bakım sağlar. Bulguları anlaşılır bir raporda toplarız.',
      p2: 'Düzeltme öncesinde yapılacak işleri, ücreti ve teslim süresini netleştiririz.',
      emailLabel: 'E-posta',
      phoneLabel: 'Telefon',
      whatsapp: 'WhatsApp',
    },
    sec: { checks: 'Kontrol kapsamı', output: 'Rapor', decision: 'Karar', services: 'Hizmetler', process: 'Süreç', start: 'Başlangıç' },
    checksTitle: 'Kontrol kapsamı',
    checksSub: 'Ücretsiz kontrolde şu sekiz noktayı inceleriz.',
    checksNote: 'Ücretsiz kontrol, sitenizin dışarıdan erişilebilen bölümlerini kapsar. Yönetim paneli, yedekleme ve e-posta teslimatı gibi kontroller ek erişim veya teyit gerektirebilir.',
    checks: [
      { no: '01', title: 'Mobil görünüm ve temel kullanım', desc: 'Telefonda düzen, menü ve temel düğmeler gibi dışarıdan görünen kullanımı inceleriz.' },
      { no: '02', title: 'Sayfa yüklenme performansı', desc: 'İncelediğimiz sayfaların açılma süresini ölçeriz.' },
      { no: '03', title: 'İncelenen sayfalardaki bağlantılar', desc: 'Bu sayfalardaki bağlantıları deneriz.' },
      { no: '04', title: 'HTTPS ve tarayıcı güvenlik uyarıları', desc: 'Adres çubuğundaki HTTPS ve güvenlik uyarılarına bakarız.' },
      { no: '05', title: 'Formların görünür gönderim davranışı', desc: 'Formun sitede nasıl gönderildiğini inceleriz.' },
      { no: '06', title: 'Dışarıdan tespit edilebilen altyapı bilgileri', desc: 'Dışarıdan görülebilen altyapı izlerini not ederiz.' },
      { no: '07', title: 'Temel indekslenebilirlik kontrolleri', desc: 'Dışarıdan görülebilen temel indeks ayarlarını ve engelleri kontrol ederiz.' },
      { no: '08', title: 'Telefon, adres ve iletişim yollarına erişim', desc: 'Telefon, adres ve diğer iletişim yollarının sitede bulunup bulunamadığına bakarız.' },
    ],
    reportTitle: 'Rapor örneği',
    reportSub: 'Sorunları, ziyaretçiye etkilerini ve önerilen adımları öncelik sırasıyla görün.',
    findings: [
      { no: '01', severity: 'Acil', level: 'crit', title: 'Telefonda menü açılmıyor.', impact: 'Yüksek' },
      { no: '02', severity: 'Orta', level: 'med', title: 'Ana sayfa yavaş açılıyor.', impact: 'Orta' },
      { no: '03', severity: 'Orta', level: 'med', title: 'İki bağlantı boş sayfaya gidiyor.', impact: 'Orta' },
    ],
    sampleReport: {
      label: 'Örnek rapor',
      note: 'Bu belge temsili bir örnektir; gerçek bir müşteri sonucu değildir.',
      issues: 'örnek sorun',
      impact: 'Etki',
      openList: 'Listeyi aç',
      closeList: 'Listeyi kapat',
      listLabel: 'Kontrol listesi — örnek',
    },
    checklist: [
      { k: 'Mobil', v: 'Sorunlu', s: 'err' },
      { k: 'Hız', v: 'Yavaş', s: 'warn' },
      { k: 'Bağlantılar', v: '02 hata', s: 'err' },
      { k: 'HTTPS', v: 'Geçti', s: 'ok' },
      { k: 'Formlar', v: 'Görünür davranış', s: 'warn' },
      { k: 'Altyapı', v: 'Dışarıdan görülen', s: 'warn' },
      { k: 'İndeks', v: 'Bakılmalı', s: 'warn' },
      { k: 'İletişim', v: 'Bakılmalı', s: 'warn' },
    ],
    statementA: 'Raporu aldıktan sonra karar sizin.',
    statementSub: 'Sorunları kendiniz çözebilir, başka birine yaptırabilir veya bize bırakabilirsiniz.',
    servicesTitle: 'Hizmetler ve fiyatlar',
    servicesCta: 'Ücretsiz kontrol isteyin',
    after: 'Başlangıç fiyatı; kapsam teklifte netleşir',
    talk: 'Rapordan sonra konuşalım',
    services: [
      { no: '01', name: 'Kontrol raporu', price: '0 €', items: ['Kontrol raporu', 'Öncelik listesi', '48 saat içinde elinizde'], cta: 'Ücretsiz kontrol', featured: true },
      { no: '02', name: 'Acil düzeltme', price: '250 €', items: ['En acil 2–3 sorun', '2 iş günü'], note: 'Kapsam işlem öncesinde netleştirilir' },
      { no: '03', name: 'Tam onarım', price: "450 €'dan", items: ['Teklifte belirlenen düzeltmeler', '5 iş günü'], showAfter: true },
      { no: '04', name: 'Sürekli bakım', price: '79 € / ay', note: 'İsteğe bağlı — siteniz düzeldikten sonra', items: ['İzleme: sitenin erişilebilirliği', 'Bildirim: site kapanırsa haber veririz', 'Güvenlik uyarısı ve kırık bağlantı kontrolü', 'Yedekleme durumunu kontrol ederiz; yedekleme hizmeti değildir', 'Yazılım güncellemeleri', 'Ayda 30 dakika küçük değişiklik', 'Ayda bir kısa durum raporu'] },
    ],
    howTitle: 'Nasıl çalışır',
    steps: [
      ['Site adresinizi paylaşın.', 'Site adresinizi ve raporu göndereceğimiz e-postayı iletin.'],
      ['Kontrol raporunuzu alın.', 'Bulguları ve önerilen adımları 48 saat içinde gönderelim.'],
      ['Sonraki adımı seçin.', 'Düzeltmeleri kendiniz yaptırabilir veya bizden teklif isteyebilirsiniz.'],
    ],
    assure: 'Düzeltmeyi bize yaptırmak zorunda değilsiniz.',
    faqTitle: 'Sık sorulan sorular',
    faq: [
      { q: 'Ücretsiz kontrol ne içeriyor?', a: 'Dışarıdan erişilebilen sayfalarda sekiz noktayı inceleriz ve size rapor ile öncelik listesi göndeririz. Yönetim paneli, yedekleme ve e-posta teslimatı bu kapsama girmez.' },
      { q: 'Rapor ne zaman geliyor?', a: '48 saat içinde, belirttiğiniz e-posta adresine.' },
      { q: 'Düzeltme hizmeti almak zorunlu mu?', a: 'Hayır. Raporu aldıktan sonra düzeltmeyi kendiniz yaptırabilir veya bizden teklif isteyebilirsiniz.' },
      { q: 'Düzeltme ücreti nasıl belirleniyor?', a: 'Acil düzeltme 250 € tutarında sabit bir pakettir; en acil 2–3 sorunu kapsar ve kapsam işlem öncesinde netleşir. Tam onarım 450 €’dan başlar; yapılacak iş ve ücret teklifte belirlenir. Sürekli bakım 79 € / aydır.' },
      { q: 'Siteye erişim bilgisi gerekiyor mu?', a: 'Ücretsiz kontrol için site adresi yeterlidir. Yönetim paneli, yedekleme ve e-posta teslimatı gibi kontroller ek erişim veya teyit isteyebilir.' },
      { q: 'Hangi siteler destekleniyor?', a: 'Dışarıdan erişilebilen işletme siteleri. WordPress bu kapsamdadır.' },
      { q: 'Hangi dillerde hizmet veriliyor?', a: 'Raporu Türkçe, İngilizce veya Almanca göndeririz.' },
    ],
    final: 'Ücretsiz kontrol isteyin',
    form: {
      title: 'Ücretsiz site kontrolüyle başlayın.',
      lead: 'Site adresinizi ve e-posta adresinizi paylaşın; ikisi de gerekir. Kontrol sonuçlarını ve önerilen adımları 48 saat içinde gönderelim.',
      url: 'Site adresi',
      urlPh: 'https://siteniz.com',
      submit: 'Devam et',
      assure: 'Ücretsiz rapor. Düzeltme hizmeti isteğe bağlı.',
      sample: 'Örnek raporu inceleyin',
      urlErr: 'Geçerli bir site adresi girin. Örnek: siteadi.com',
      ask: 'Raporu hangi e-postaya gönderelim?',
      email: 'E-posta',
      emailPh: 'ad@sirketiniz.com',
      emailErr: 'Geçerli bir e-posta adresi girin.',
      prepare: 'Kontrol talebini gönder',
      back: 'Adresi değiştir',
      sending: 'Talebiniz gönderiliyor…',
      done: 'Talebiniz alındı.',
      doneText: 'Kontrol raporunuzu 48 saat içinde belirttiğiniz e-posta adresine göndereceğiz.',
      demo: 'Demo bitti. Canlı başvuru alınmadı.',
      demoNote: 'Hiçbir bilgi gönderilmedi.',
      edit: 'Adresi veya e-postayı düzelt',
      reset: 'Yeni istek',
      fail: 'Talebiniz gönderilemedi. Lütfen tekrar deneyin veya e-posta ile bize ulaşın.',
      privacy: 'Bilgilerinizi sadece size cevap yazmak için kullanıyoruz.',
      privacyLink: 'Gizlilik',
    },
    footer: {
      tag: 'Web sitesi kontrolü, düzeltme ve bakım.',
      services: 'Hizmetler',
      site: 'Site',
      legal: 'Yasal',
      privacy: 'Gizlilik',
      rights: 'Tüm hakları saklıdır',
      contact: 'İletişim',
      contactHint: 'Site adresi gerekmez — doğrudan yazın veya arayın.',
      mark: 'Sitemendo',
    },
    meta: {
      title: 'Sitemendo — Web siteniz için kontrol, düzeltme ve bakım',
      description: 'Web sitenizdeki teknik ve kullanım sorunlarını belirliyor, öncelik sırasına koyuyor ve onayınızla gideriyoruz. Ücretsiz kontrolle başlayın.',
      ogTitle: 'Sitemendo — Web siteniz için kontrol, düzeltme ve bakım',
      ogDescription: 'Ücretsiz site kontrolüyle başlayın. Sonuçları ve önerilen adımları 48 saat içinde gönderiyoruz.',
      privacyTitle: 'Gizlilik — Sitemendo',
      privacyDescription: 'Kontrol isteğinizde hangi bilgileri kullandığımızı anlatır.',
      impressumTitle: 'Impressum — Sitemendo',
      impressumDescription: 'Sitemendo yasal bilgileri ve iletişim.',
    },
    legal: {
      back: 'Ana sayfa',
      updated: 'Son güncelleme: 10 Eylül 2026',
      privacyTitle: 'Gizlilik',
      privacyLead: 'Size cevap yazmak için gereken bilgiler dışında hiçbir şey kullanmıyoruz.',
      privacy: [
        { h: 'Neyi alıyoruz', p: 'Formu gönderdiğinizde site adresinizi ve e-posta adresinizi alıyoruz. Bunları sadece raporu hazırlayıp size göndermek için kullanıyoruz.' },
        { h: 'Neden kullanıyoruz', p: 'Kontrolü yapmak ve size ulaşmak için. Bilgilerinizi satmıyoruz ve reklam listelerine eklemiyoruz.' },
        { h: 'Kim görüyor', p: 'İsteği size iletmek için Resend adlı e-posta servisini kullanıyoruz. Reklam için kullanılmaz.' },
        { h: 'Ne kadar saklıyoruz', p: 'Raporu gönderip sorularınızı yanıtlayacak kadar bir süre. Sonra siliyoruz.' },
        { h: 'Haklarınız', p: 'Bilgilerinizi görmek, düzelttirmek veya sildirmek isterseniz hello@sitemendo.com adresine yazmanız yeterli. Site adresi gerekmez.' },
      ],
      impressumTitle: 'Impressum',
      impressumLead: 'Yasal bilgiler ve iletişim.',
      provider: 'Hizmet sağlayıcı',
      country: 'Almanya',
      emailLabel: 'E-posta',
      phoneLabel: 'Telefon',
      impressum: [
        { h: 'Sorumluluk', p: 'Bu sitedeki örnek raporlar tanıtım amaçlıdır. Bağlantı verilen sitelerin içeriğinden o sitelerin sahipleri sorumludur.' },
      ],
    },
  },
  en: {
    nav: { how: 'How it works', checks: 'What we cover', services: 'Services', faq: 'Questions', cta: 'Request a free check', ctaShort: 'Check', lang: 'Language' },
    a11y: { skip: 'Skip to content', mainNav: 'Main navigation', menu: 'Menu', knife: 'Drawing of an unfolding pocket knife' },
    hero: {
      a: 'Checks, repairs and maintenance for your website.',
      support: 'We identify technical and usability issues on your website, rank them by priority and resolve them with your approval. With regular maintenance we keep following the site.',
      place: 'Based in Berlin',
    },
    about: {
      title: 'Find the issues first. Then a clear plan.',
      p1: 'Sitemendo reviews business websites, carries out the necessary repairs and provides regular maintenance. We gather the findings in a clear report.',
      p2: 'Before any repair, we set out the work to be done, the fee and the delivery time.',
      emailLabel: 'Email',
      phoneLabel: 'Phone',
      whatsapp: 'WhatsApp',
    },
    sec: { checks: 'What we check', output: 'The report', decision: 'Your decision', services: 'Services', process: 'Steps', start: 'Start' },
    checksTitle: 'What the check covers',
    checksSub: 'The free check looks at these eight points.',
    checksNote: 'The free check covers the publicly reachable parts of your site. Checks such as the admin panel, backups and email delivery may need extra access or confirmation.',
    checks: [
      { no: '01', title: 'Mobile layout and basic use', desc: 'We review layout, menus and basic controls as they appear on a phone.' },
      { no: '02', title: 'Page-load performance', desc: 'We measure how long the pages we review take to open.' },
      { no: '03', title: 'Links on the pages we review', desc: 'We try the links on those pages.' },
      { no: '04', title: 'HTTPS and browser security warnings', desc: 'We look at HTTPS and any security warning in the address bar.' },
      { no: '05', title: 'Visible form-submit behaviour', desc: 'We review how a form appears to submit on the site.' },
      { no: '06', title: 'Infrastructure details visible from outside', desc: 'We note infrastructure traces that can be seen without admin access.' },
      { no: '07', title: 'Basic indexability checks', desc: 'We check basic index settings and visible blockers.' },
      { no: '08', title: 'Access to phone, address and contact routes', desc: 'We check whether phone, address and other contact routes can be found on the site.' },
    ],
    reportTitle: 'Sample report',
    reportSub: 'See the issues, how they affect visitors and the suggested next steps — in order of priority.',
    findings: [
      { no: '01', severity: 'Urgent', level: 'crit', title: 'The menu doesn’t open on a phone.', impact: 'High' },
      { no: '02', severity: 'Medium', level: 'med', title: 'The homepage is slow to open.', impact: 'Medium' },
      { no: '03', severity: 'Medium', level: 'med', title: 'Two links lead to an empty page.', impact: 'Medium' },
    ],
    sampleReport: {
      label: 'Sample report',
      note: 'This is a representative sample, not a real client result.',
      issues: 'sample issues',
      impact: 'Impact',
      openList: 'Open the list',
      closeList: 'Close the list',
      listLabel: 'Checklist — sample',
    },
    checklist: [
      { k: 'Mobile', v: 'Faulty', s: 'err' },
      { k: 'Speed', v: 'Slow', s: 'warn' },
      { k: 'Links', v: '02 errors', s: 'err' },
      { k: 'HTTPS', v: 'Pass', s: 'ok' },
      { k: 'Forms', v: 'Visible behaviour', s: 'warn' },
      { k: 'Infrastructure', v: 'Seen from outside', s: 'warn' },
      { k: 'Index', v: 'To check', s: 'warn' },
      { k: 'Contact', v: 'To check', s: 'warn' },
    ],
    statementA: 'After the report, you decide.',
    statementSub: 'You can sort the problems out yourself, ask someone else, or leave them to us.',
    servicesTitle: 'Services and prices',
    servicesCta: 'Request a free check',
    after: 'Starting price; the scope is set in the quote',
    talk: 'Let’s talk after the report',
    services: [
      { no: '01', name: 'Check report', price: '0 €', items: ['The check report', 'A priority list', 'In your inbox within 48 hours'], cta: 'Free check', featured: true },
      { no: '02', name: 'Urgent fix', price: '250 €', items: ['The 2–3 most urgent issues', '2 working days'], note: 'The scope is agreed before the work starts' },
      { no: '03', name: 'Full repair', price: 'From 450 €', items: ['The fixes set out in the quote', '5 working days'], showAfter: true },
      { no: '04', name: 'Ongoing care', price: '79 € / month', note: 'Optional — once your site is in good shape', items: ['Monitoring: whether the site is reachable', 'Notification if the site goes down', 'Checks for security warnings and broken links', 'We check whether backups are in place — we do not provide the backups', 'Software updates', '30 minutes of small changes a month', 'A short status note every month'] },
    ],
    howTitle: 'How it works',
    steps: [
      ['Share your website address.', 'Send us the address and the email where we should send the report.'],
      ['Receive your check report.', 'We’ll send the findings and the suggested next steps within 48 hours.'],
      ['Choose the next step.', 'You can have the repairs done yourself or ask us for a quote.'],
    ],
    assure: 'You don’t have to have us do the repair.',
    faqTitle: 'Frequently asked questions',
    faq: [
      { q: 'What does the free check include?', a: 'We review eight points on the publicly reachable pages and send you a report with a priority list. The admin panel, backups and email delivery are not part of this check.' },
      { q: 'When does the report arrive?', a: 'Within 48 hours, to the email address you give us.' },
      { q: 'Is repair work required?', a: 'No. After the report you can have the repairs done yourself or ask us for a quote.' },
      { q: 'How is the repair fee set?', a: 'Urgent fix is a fixed 250 € package for the 2–3 most urgent issues; the scope is agreed before the work starts. Full repair starts from 450 €; the work and the fee are set in the quote. Ongoing care is 79 € / month.' },
      { q: 'Do you need access to the site?', a: 'The free check only needs the website address. Checks such as the admin panel, backups and email delivery may need extra access or confirmation.' },
      { q: 'Which websites do you support?', a: 'Publicly reachable business websites. WordPress is included.' },
      { q: 'Which languages do you work in?', a: 'We send the report in Turkish, English or German.' },
    ],
    final: 'Request a free check',
    form: {
      title: 'Start with a free website check.',
      lead: 'Share your website address and email — both are needed. We’ll send the findings and the suggested next steps within 48 hours.',
      url: 'Website address',
      urlPh: 'https://yoursite.com',
      submit: 'Continue',
      assure: 'The report is free. Repair work is optional.',
      sample: 'See a sample report',
      urlErr: 'Enter a valid website address. Example: yoursite.com',
      ask: 'Which email should we send the report to?',
      email: 'Email',
      emailPh: 'name@yourcompany.com',
      emailErr: 'Enter a valid email address.',
      prepare: 'Send the check request',
      back: 'Change the address',
      sending: 'Your request is being sent…',
      done: 'Your request has been received.',
      doneText: 'We will send your check report within 48 hours to the email address you provided.',
      demo: 'Demo finished. No live request was received.',
      demoNote: 'Nothing was sent.',
      edit: 'Edit the address or email',
      reset: 'New request',
      fail: 'Your request could not be sent. Please try again or contact us by email.',
      privacy: 'We use your details only to write back to you.',
      privacyLink: 'Privacy',
    },
    footer: {
      tag: 'Website checks, repairs and maintenance.',
      services: 'Services',
      site: 'Site',
      legal: 'Legal',
      privacy: 'Privacy',
      rights: 'All rights reserved',
      contact: 'Contact',
      contactHint: 'No website address needed — just write or call.',
      mark: 'Sitemendo',
    },
    meta: {
      title: 'Sitemendo — Checks, repairs and maintenance for your website',
      description: 'We identify technical and usability issues on your website, rank them by priority and resolve them with your approval. Start with a free check.',
      ogTitle: 'Sitemendo — Checks, repairs and maintenance for your website',
      ogDescription: 'Start with a free website check. Findings and next steps within 48 hours.',
      privacyTitle: 'Privacy — Sitemendo',
      privacyDescription: 'What information we use when you ask for a check.',
      impressumTitle: 'Impressum — Sitemendo',
      impressumDescription: 'Sitemendo legal notice and contact.',
    },
    legal: {
      back: 'Home',
      updated: 'Last updated: 10 September 2026',
      privacyTitle: 'Privacy',
      privacyLead: 'We use nothing beyond what we need to write back to you.',
      privacy: [
        { h: 'What we receive', p: 'When you send the form we receive your website address and your email address. We use them only to prepare the report and send it to you.' },
        { h: 'Why we use it', p: 'To run the check and to reach you. We don’t sell your details and we don’t add them to marketing lists.' },
        { h: 'Who sees it', p: 'We use an email service called Resend to pass the request on to us. It is not used for advertising.' },
        { h: 'How long we keep it', p: 'Long enough to send the report and answer your questions. Then we delete it.' },
        { h: 'Your rights', p: 'If you want to see, correct or delete your details, just write to hello@sitemendo.com. No website address needed.' },
      ],
      impressumTitle: 'Impressum',
      impressumLead: 'Legal notice and contact.',
      provider: 'Service provider',
      country: 'Germany',
      emailLabel: 'Email',
      phoneLabel: 'Phone',
      impressum: [
        { h: 'Liability', p: 'The sample reports on this site are for illustration. The owners of linked sites are responsible for their own content.' },
      ],
    },
  },
  de: {
    nav: { how: 'So läuft es', checks: 'Prüfumfang', services: 'Leistungen', faq: 'Fragen', cta: 'Kostenlose Prüfung anfordern', ctaShort: 'Prüfung', lang: 'Sprache' },
    a11y: { skip: 'Zum Inhalt', mainNav: 'Hauptnavigation', menu: 'Menü', knife: 'Zeichnung eines aufklappenden Taschenmessers' },
    hero: {
      a: 'Prüfung, Reparatur und Wartung für Ihre Website.',
      support: 'Wir finden technische Probleme und Hürden in der Bedienung, ordnen sie nach Dringlichkeit und beheben sie nach Ihrer Freigabe. Mit regelmäßiger Wartung bleiben wir an der Website dran.',
      place: 'Sitz in Berlin',
    },
    about: {
      title: 'Zuerst feststellen. Dann ein klarer Plan.',
      p1: 'Sitemendo prüft Websites von Unternehmen, setzt die nötigen Korrekturen um und übernimmt die regelmäßige Wartung. Die Ergebnisse fassen wir in einem verständlichen Bericht zusammen.',
      p2: 'Bevor wir etwas reparieren, klären wir die Arbeiten, den Preis und die Lieferzeit.',
      emailLabel: 'E-Mail',
      phoneLabel: 'Telefon',
      whatsapp: 'WhatsApp',
    },
    sec: { checks: 'Was wir prüfen', output: 'Der Bericht', decision: 'Ihre Entscheidung', services: 'Leistungen', process: 'Ablauf', start: 'Start' },
    checksTitle: 'Was die Prüfung umfasst',
    checksSub: 'Die kostenlose Prüfung umfasst diese acht Punkte.',
    checksNote: 'Die kostenlose Prüfung umfasst die von außen erreichbaren Teile Ihrer Website. Prüfungen wie der Verwaltungsbereich, Sicherungen und die E-Mail-Zustellung können zusätzlichen Zugang oder eine Bestätigung erfordern.',
    checks: [
      { no: '01', title: 'Mobile Ansicht und grundlegende Bedienung', desc: 'Wir prüfen Layout, Menü und grundlegende Schaltflächen, wie sie auf dem Handy erscheinen.' },
      { no: '02', title: 'Ladezeit der Seiten', desc: 'Wir messen, wie lange die von uns geprüften Seiten zum Öffnen brauchen.' },
      { no: '03', title: 'Links auf den geprüften Seiten', desc: 'Wir testen die Links auf diesen Seiten.' },
      { no: '04', title: 'HTTPS und Browser-Sicherheitswarnungen', desc: 'Wir achten auf HTTPS und Warnungen in der Adresszeile.' },
      { no: '05', title: 'Sichtbares Absendeverhalten von Formularen', desc: 'Wir prüfen, wie ein Formular auf der Seite abgeschickt wird.' },
      { no: '06', title: 'Von außen erkennbare Infrastruktur', desc: 'Wir notieren Infrastrukturspuren, die ohne Admin-Zugang sichtbar sind.' },
      { no: '07', title: 'Grundlegende Indexierbarkeit', desc: 'Wir prüfen grundlegende Index-Einstellungen und sichtbare Blockaden.' },
      { no: '08', title: 'Zugang zu Telefon, Adresse und Kontaktwegen', desc: 'Wir prüfen, ob Telefon, Adresse und andere Kontaktwege auf der Seite zu finden sind.' },
    ],
    reportTitle: 'Beispielbericht',
    reportSub: 'Sehen Sie die Probleme, ihre Wirkung auf Besucher und die empfohlenen nächsten Schritte — nach Dringlichkeit.',
    findings: [
      { no: '01', severity: 'Dringend', level: 'crit', title: 'Das Menü öffnet auf dem Handy nicht.', impact: 'Hoch' },
      { no: '02', severity: 'Mittel', level: 'med', title: 'Die Startseite öffnet langsam.', impact: 'Mittel' },
      { no: '03', severity: 'Mittel', level: 'med', title: 'Zwei Links führen auf eine leere Seite.', impact: 'Mittel' },
    ],
    sampleReport: {
      label: 'Beispielbericht',
      note: 'Das ist ein beispielhafter Bericht, kein echtes Kundenergebnis.',
      issues: 'Beispielprobleme',
      impact: 'Wirkung',
      openList: 'Liste öffnen',
      closeList: 'Liste schließen',
      listLabel: 'Checkliste — Beispiel',
    },
    checklist: [
      { k: 'Mobil', v: 'Fehlerhaft', s: 'err' },
      { k: 'Tempo', v: 'Langsam', s: 'warn' },
      { k: 'Links', v: '02 Fehler', s: 'err' },
      { k: 'HTTPS', v: 'Bestanden', s: 'ok' },
      { k: 'Formulare', v: 'Sichtbares Verhalten', s: 'warn' },
      { k: 'Infrastruktur', v: 'Von außen sichtbar', s: 'warn' },
      { k: 'Index', v: 'Zu prüfen', s: 'warn' },
      { k: 'Kontakt', v: 'Zu prüfen', s: 'warn' },
    ],
    statementA: 'Nach dem Bericht entscheiden Sie.',
    statementSub: 'Sie können die Punkte selbst lösen, jemand anderen fragen oder uns beauftragen.',
    servicesTitle: 'Leistungen und Preise',
    servicesCta: 'Kostenlose Prüfung anfordern',
    after: 'Startpreis; der Umfang steht im Angebot fest',
    talk: 'Nach dem Bericht sprechen',
    services: [
      { no: '01', name: 'Prüfbericht', price: '0 €', items: ['Prüfbericht', 'Prioritätenliste', 'Innerhalb von 48 Stunden bei Ihnen'], cta: 'Kostenlose Prüfung', featured: true },
      { no: '02', name: 'Dringende Reparatur', price: '250 €', items: ['Die 2–3 dringendsten Punkte', '2 Werktage'], note: 'Der Umfang wird vor der Arbeit geklärt' },
      { no: '03', name: 'Komplettreparatur', price: 'ab 450 €', items: ['Die im Angebot festgelegten Korrekturen', '5 Werktage'], showAfter: true },
      { no: '04', name: 'Laufende Betreuung', price: '79 € / Monat', note: 'Optional — wenn Ihre Seite in Ordnung ist', items: ['Überwachung: ob die Seite erreichbar ist', 'Meldung, wenn die Seite ausfällt', 'Prüfung auf Sicherheitswarnungen und kaputte Links', 'Wir prüfen, ob Sicherungen laufen — wir stellen keine Sicherung bereit', 'Software-Updates', '30 Minuten kleine Änderungen im Monat', 'Jeden Monat eine kurze Rückmeldung'] },
    ],
    howTitle: 'So läuft es',
    steps: [
      ['Teilen Sie Ihre Website-Adresse.', 'Senden Sie uns die Adresse und die E-Mail, an die der Bericht gehen soll.'],
      ['Erhalten Sie Ihren Prüfbericht.', 'Die Ergebnisse und die empfohlenen nächsten Schritte senden wir innerhalb von 48 Stunden.'],
      ['Wählen Sie den nächsten Schritt.', 'Die Korrekturen können Sie selbst erledigen lassen oder uns um ein Angebot bitten.'],
    ],
    assure: 'Sie müssen die Reparatur nicht bei uns machen lassen.',
    faqTitle: 'Häufige Fragen',
    faq: [
      { q: 'Was umfasst die kostenlose Prüfung?', a: 'Wir prüfen acht Punkte auf den öffentlich erreichbaren Seiten und senden Ihnen einen Bericht mit einer Prioritätenliste. Verwaltungsbereich, Sicherung und E-Mail-Zustellung gehören nicht dazu.' },
      { q: 'Wann kommt der Bericht?', a: 'Innerhalb von 48 Stunden an die angegebene E-Mail-Adresse.' },
      { q: 'Muss ich die Reparatur beauftragen?', a: 'Nein. Nach dem Bericht können Sie die Korrekturen selbst erledigen lassen oder uns um ein Angebot bitten.' },
      { q: 'Wie wird die Reparaturgebühr festgelegt?', a: 'Die dringende Reparatur ist ein festes Paket für 250 € und umfasst die 2–3 dringendsten Punkte; der Umfang wird vor der Arbeit geklärt. Die Komplettreparatur beginnt ab 450 €; Leistung und Preis stehen im Angebot. Die laufende Betreuung kostet 79 € / Monat.' },
      { q: 'Werden Zugangsdaten zur Website benötigt?', a: 'Für die kostenlose Prüfung reicht die Website-Adresse. Prüfungen wie Verwaltungsbereich, Sicherung und E-Mail-Zustellung können zusätzlichen Zugang oder eine Bestätigung erfordern.' },
      { q: 'Welche Websites werden unterstützt?', a: 'Öffentlich erreichbare Unternehmensseiten. WordPress ist eingeschlossen.' },
      { q: 'In welchen Sprachen wird der Service angeboten?', a: 'Den Bericht senden wir auf Türkisch, Englisch oder Deutsch.' },
    ],
    final: 'Kostenlose Prüfung anfordern',
    form: {
      title: 'Beginnen Sie mit einer kostenlosen Prüfung.',
      lead: 'Geben Sie Ihre Website-Adresse und Ihre E-Mail-Adresse an — beides ist erforderlich. Die Ergebnisse und die empfohlenen nächsten Schritte senden wir innerhalb von 48 Stunden.',
      url: 'Website-Adresse',
      urlPh: 'https://ihre-seite.de',
      submit: 'Weiter',
      assure: 'Der Bericht ist kostenlos. Die Reparatur bleibt optional.',
      sample: 'Beispielbericht ansehen',
      urlErr: 'Geben Sie eine gültige Website-Adresse ein. Beispiel: ihre-seite.de',
      ask: 'An welche E-Mail sollen wir den Bericht senden?',
      email: 'E-Mail',
      emailPh: 'name@ihr-unternehmen.de',
      emailErr: 'Geben Sie eine gültige E-Mail-Adresse ein.',
      prepare: 'Prüfungsanfrage senden',
      back: 'Adresse ändern',
      sending: 'Ihre Anfrage wird gesendet…',
      done: 'Ihre Anfrage ist eingegangen.',
      doneText: 'Den Prüfbericht senden wir innerhalb von 48 Stunden an die angegebene E-Mail-Adresse.',
      demo: 'Demo beendet. Es wurde keine Live-Anfrage angenommen.',
      demoNote: 'Es wurde nichts gesendet.',
      edit: 'Adresse oder E-Mail ändern',
      reset: 'Neue Anfrage',
      fail: 'Ihre Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder schreiben Sie uns eine E-Mail.',
      privacy: 'Ihre Angaben nutzen wir nur, um Ihnen zu antworten.',
      privacyLink: 'Datenschutz',
    },
    footer: {
      tag: 'Website-Prüfung, Reparatur und Wartung.',
      services: 'Leistungen',
      site: 'Seite',
      legal: 'Rechtliches',
      privacy: 'Datenschutz',
      rights: 'Alle Rechte vorbehalten',
      contact: 'Kontakt',
      contactHint: 'Keine Website-Adresse nötig — einfach schreiben oder anrufen.',
      mark: 'Sitemendo',
    },
    meta: {
      title: 'Sitemendo — Prüfung, Reparatur und Wartung für Ihre Website',
      description: 'Wir finden technische Probleme und Hürden in der Bedienung, ordnen sie nach Dringlichkeit und beheben sie nach Ihrer Freigabe. Starten Sie mit einer kostenlosen Prüfung.',
      ogTitle: 'Sitemendo — Prüfung, Reparatur und Wartung für Ihre Website',
      ogDescription: 'Beginnen Sie mit einer kostenlosen Prüfung. Ergebnisse und nächste Schritte innerhalb von 48 Stunden.',
      privacyTitle: 'Datenschutz — Sitemendo',
      privacyDescription: 'Welche Angaben wir nutzen, wenn Sie eine Prüfung anfragen.',
      impressumTitle: 'Impressum — Sitemendo',
      impressumDescription: 'Sitemendo Impressum und Kontakt.',
    },
    legal: {
      back: 'Startseite',
      updated: 'Zuletzt aktualisiert: 10. September 2026',
      privacyTitle: 'Datenschutz',
      privacyLead: 'Wir nutzen nichts über das hinaus, was wir brauchen, um Ihnen zu antworten.',
      privacy: [
        { h: 'Was wir bekommen', p: 'Wenn Sie das Formular senden, erhalten wir Ihre Website-Adresse und Ihre E-Mail-Adresse. Wir nutzen sie nur, um den Bericht zu erstellen und Ihnen zu senden.' },
        { h: 'Wofür wir sie nutzen', p: 'Um die Prüfung durchzuführen und Sie zu erreichen. Wir verkaufen Ihre Angaben nicht und setzen sie nicht auf Werbelisten.' },
        { h: 'Wer es sieht', p: 'Um die Anfrage an uns weiterzuleiten, nutzen wir den E-Mail-Dienst Resend. Er wird nicht für Werbung genutzt.' },
        { h: 'Wie lange wir sie behalten', p: 'So lange, wie wir für den Bericht und Ihre Rückfragen brauchen. Danach löschen wir sie.' },
        { h: 'Ihre Rechte', p: 'Wenn Sie Ihre Angaben sehen, ändern oder löschen lassen möchten, schreiben Sie an hello@sitemendo.com. Eine Website-Adresse ist nicht nötig.' },
      ],
      impressumTitle: 'Impressum',
      impressumLead: 'Rechtliche Angaben und Kontakt.',
      provider: 'Diensteanbieter',
      country: 'Deutschland',
      emailLabel: 'E-Mail',
      phoneLabel: 'Telefon',
      impressum: [
        { h: 'Haftung', p: 'Die Beispielberichte auf dieser Seite dienen der Veranschaulichung. Für die Inhalte verlinkter Seiten sind deren Betreiber verantwortlich.' },
      ],
    },
  },
};
