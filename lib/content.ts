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
  hero: { a: string; support: string };
  about: {
    title: string; p1: string; p2: string;
    emailLabel: string; phoneLabel: string; whatsapp: string;
  };
  sec: { checks: string; output: string; decision: string; services: string; process: string; start: string };
  checksTitle: string;
  checksSub: string;
  checks: Check[];
  reportTitle: string;
  reportSub: string;
  findings: Finding[];
  sampleReport: { label: string; issues: string; impact: string; openList: string; closeList: string; listLabel: string };
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
    url: string; urlPh: string; submit: string; micro: string[]; urlErr: string;
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
    nav: { how: 'Nasıl çalışır', checks: 'Neye bakıyoruz', services: 'Hizmetler', faq: 'Sorular', cta: 'Ücretsiz kontrol', ctaShort: 'Kontrol', lang: 'Dil' },
    a11y: { skip: 'İçeriğe geç', mainNav: 'Ana menü', menu: 'Menü', knife: 'Açılan çok amaçlı çakı çizimi' },
    hero: {
      a: 'Web sitenizde ne bozuk, ücretsiz söyleyelim.',
      support: 'Sitenizi baştan sona inceleyip bulduğumuz her şeyi sade bir raporda topluyoruz.',
    },
    about: {
      title: 'Hakkımızda',
      p1: 'Berlin’de küçük işletmelerin web sitelerine bakıyoruz. Sitenizde müşteri kaybettiren ne varsa buluyoruz ve 48 saat içinde anlaşılır bir raporla anlatıyoruz.',
      p2: 'İlk kontrol ücretsiz. Düzeltmek zorunda değilsiniz. Form doldurmak istemezseniz e-posta yazın veya arayın.',
      emailLabel: 'E-posta',
      phoneLabel: 'Telefon',
      whatsapp: 'WhatsApp',
    },
    sec: { checks: 'Neye bakıyoruz', output: 'Rapor', decision: 'Karar', services: 'Hizmetler', process: 'Süreç', start: 'Başlangıç' },
    checksTitle: 'Neye bakıyoruz',
    checksSub: 'Ücretsiz kontrolde sitenizin şu sekiz noktasına bakıyoruz.',
    checks: [
      { no: '01', title: 'Telefonda düzgün görünüyor mu', desc: 'Müşterilerin çoğu siteye telefondan giriyor. Yazılar taşıyor mu, menü açılıyor mu, düğmelere basılıyor mu diye bakıyoruz.' },
      { no: '02', title: 'Sayfalar hızlı açılıyor mu', desc: 'Sayfa geç açılırsa müşteri beklemez, çıkar. Sitenizin açılma süresini ölçüyoruz.' },
      { no: '03', title: 'Tıklayınca boşa giden bağlantı var mı', desc: 'Bazı bağlantılar “sayfa bulunamadı” hatasına götürür. Sitedeki bağlantıları tek tek deniyoruz.' },
      { no: '04', title: 'Tarayıcı “güvenli değil” diyor mu', desc: 'Adres çubuğunda uyarı çıkarsa müşteri siteye güvenmez. Güvenlik sertifikanızı kontrol ediyoruz.' },
      { no: '05', title: 'Formdan gelen mesaj size ulaşıyor mu', desc: 'Form çalışmıyorsa müşteri yazar ama siz göremezsiniz. Formu doldurup mesajın geldiğini kontrol ediyoruz.' },
      { no: '06', title: 'Sitenin altyapısı güncel mi', desc: 'Sitenizi çalıştıran yazılım eskidiyse hem yavaşlar hem risk oluşur. Güncel mi diye bakıyoruz.' },
      { no: '07', title: 'Google sitenizi bulabiliyor mu', desc: 'Bazı ayarlar sitenizin arama sonuçlarında çıkmasını engeller. Böyle bir engel var mı bakıyoruz.' },
      { no: '08', title: 'Müşteri size kolay ulaşabiliyor mu', desc: 'Telefon ve adres görünür yerde mi, yazılar okunuyor mu, düğmeler kolay bulunuyor mu.' },
    ],
    reportTitle: 'Rapor örneği',
    reportSub: 'Raporda teknik terim yok. Ne bulduğumuzu, ne kadar acil olduğunu ve ne yapılması gerektiğini yazıyoruz.',
    findings: [
      { no: '01', severity: 'Acil', level: 'crit', title: 'Telefonda menü açılmıyor.', impact: 'Yüksek' },
      { no: '02', severity: 'Orta', level: 'med', title: 'Ana sayfa 4,8 saniyede açılıyor. Bu çok yavaş.', impact: 'Orta' },
      { no: '03', severity: 'Orta', level: 'med', title: 'İki bağlantı boş sayfaya gidiyor.', impact: 'Orta' },
    ],
    sampleReport: { label: 'Örnek rapor', issues: 'sorun bulundu', impact: 'Etki', openList: 'Listeyi aç', closeList: 'Listeyi kapat', listLabel: 'Kontrol listesi — örnek' },
    checklist: [
      { k: 'Telefon', v: 'Sorunlu', s: 'err' },
      { k: 'Hız', v: '41/100', s: 'warn' },
      { k: 'Bağlantılar', v: '03 hata', s: 'err' },
      { k: 'Güvenlik', v: 'Geçti', s: 'ok' },
      { k: 'Formlar', v: 'Bakılmalı', s: 'warn' },
      { k: 'Altyapı', v: 'Eski', s: 'warn' },
      { k: 'Google', v: 'Bakılmalı', s: 'warn' },
      { k: 'Kullanım', v: 'Bakılmalı', s: 'warn' },
    ],
    statementA: 'Raporu aldıktan sonra karar sizin.',
    statementSub: 'Sorunları kendiniz çözebilir, başka birine yaptırabilir veya bize bırakabilirsiniz.',
    servicesTitle: 'Kontrol ve düzeltme',
    servicesCta: 'Ücretsiz kontrol isteyin',
    after: 'Fiyat rapordan sonra belli olur',
    talk: 'Rapordan sonra konuşalım',
    services: [
      { no: '01', name: 'Kontrol raporu', price: '0 €', items: ['Sitenizi baştan sona kontrol', 'Bulduğumuz sorunların listesi', 'Hangisi önce düzeltilmeli', '48 saat içinde elinizde'], cta: 'Ücretsiz kontrol', featured: true },
      { no: '02', name: 'Acil düzeltme', price: '250 €', items: ['En acil 2–3 sorunu düzeltiyoruz', '2 iş günü'], showAfter: true },
      { no: '03', name: 'Tam onarım', price: "450 €'dan", items: ['Rapordaki sorunların tamamı', 'Telefonda düzgün görünsün', 'Hızlansın ve kullanımı kolaylaşsın', '5 iş günü'], showAfter: true },
      { no: '04', name: 'Sürekli bakım', price: '79 € / ay', note: 'İsteğe bağlı — siteniz düzeldikten sonra', items: ['Yazılım güncellemeleri', 'Siteniz kapanırsa haber veriyoruz', 'Güvenlik uyarısı çıkmasın diye kontrol', 'Kırık bağlantı taraması', 'Yedek alınıyor mu kontrolü', 'Ayda 30 dakika küçük değişiklik', 'Ayda bir kısa durum raporu'] },
    ],
    howTitle: 'Nasıl çalışır',
    steps: [
      ['Site adresinizi yazın', 'Tek yapmanız gereken bu.'],
      ['Biz bakıyoruz', 'Sitenizi sekiz başlıkta kontrol ediyoruz.'],
      ['Raporu alırsınız', '48 saat içinde e-postanıza geliyor.'],
    ],
    assure: 'Düzeltmeyi bize yaptırmak zorunda değilsiniz.',
    faqTitle: 'Sorular',
    faq: [
      { q: 'Kontrol gerçekten ücretsiz mi?', a: 'Evet. İlk kontrol ve rapor ücretsiz.' },
      { q: 'Bir şey satın almam gerekiyor mu?', a: 'Hayır. Raporu alırsınız, sonrası size kalmış.' },
      { q: 'Ne kadar sürüyor?', a: 'Raporu genellikle 48 saat içinde gönderiyoruz.' },
      { q: 'Her siteye bakıyor musunuz?', a: 'Çoğu işletme sitesine bakabiliyoruz, WordPress dahil.' },
      { q: 'Sorunları kendim düzeltebilir miyim?', a: 'Tabii. Rapor sizin. İsterseniz kendiniz, isterseniz tanıdığınız biri düzeltir.' },
      { q: 'Almanca da oluyor mu?', a: 'Evet. Raporu Türkçe, İngilizce veya Almanca gönderiyoruz.' },
    ],
    final: 'Ücretsiz kontrol isteyin',
    form: {
      url: 'Site adresi',
      urlPh: 'https://siteniz.com',
      submit: 'Kontrol isteyin',
      micro: ['48 saat içinde', 'Ücretsiz', 'Satın alma yok'],
      urlErr: 'Site adresini kontrol edin. Örnek: siteniz.com',
      ask: 'Raporu hangi e-postaya gönderelim?',
      email: 'E-posta',
      emailPh: 'ad@sirketiniz.com',
      emailErr: 'E-posta adresini kontrol edin.',
      prepare: 'Gönder',
      back: 'Adresi değiştir',
      sending: 'Gönderiliyor…',
      done: 'Aldık.',
      doneText: 'Raporu 48 saat içinde şu adrese gönderiyoruz:',
      demo: 'Demo bitti. Hiçbir bilgi gönderilmedi.',
      demoNote: 'Demo / bilgi gönderilmedi',
      edit: 'Adresi veya e-postayı düzelt',
      reset: 'Yeni istek',
      fail: 'Gönderilemedi. Lütfen tekrar deneyin.',
      privacy: 'Bilgilerinizi sadece size cevap yazmak için kullanıyoruz.',
      privacyLink: 'Gizlilik',
    },
    footer: {
      tag: 'Küçük işletmelerin web sitelerine bakıyoruz.',
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
      title: 'Sitemendo — Web sitenizde ne bozuk, ücretsiz söyleyelim',
      description: 'Berlin’de küçük işletmeler için ücretsiz web sitesi kontrolü. Müşteri kaybettiren ne varsa buluyor, 48 saat içinde sade bir raporla anlatıyoruz.',
      ogTitle: 'Sitemendo — Web sitenizde ne bozuk, ücretsiz söyleyelim',
      ogDescription: 'Sitenizi ücretsiz kontrol ediyoruz. Ne bozuksa 48 saat içinde sade bir dille yazıyoruz.',
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
    nav: { how: 'How it works', checks: 'What we check', services: 'Services', faq: 'Questions', cta: 'Free check', ctaShort: 'Check', lang: 'Language' },
    a11y: { skip: 'Skip to content', mainNav: 'Main navigation', menu: 'Menu', knife: 'Drawing of an unfolding pocket knife' },
    hero: {
      a: 'We’ll tell you what’s broken on your website. Free.',
      support: 'We go through your whole site and put everything we find into one clear report.',
    },
    about: {
      title: 'About us',
      p1: 'We look after the websites of small businesses in Berlin. We find whatever is costing you customers and explain it in a clear report within 48 hours.',
      p2: 'The first check is free. You don’t have to fix anything. If you’d rather not fill in a form, send an email or call.',
      emailLabel: 'Email',
      phoneLabel: 'Phone',
      whatsapp: 'WhatsApp',
    },
    sec: { checks: 'What we check', output: 'The report', decision: 'Your decision', services: 'Services', process: 'Steps', start: 'Start' },
    checksTitle: 'What we check',
    checksSub: 'The free check looks at these eight things on your site.',
    checks: [
      { no: '01', title: 'Does it look right on a phone', desc: 'Most customers open your site on a phone. We look at whether text spills over, the menu opens and the buttons can be tapped.' },
      { no: '02', title: 'Do pages open quickly', desc: 'If a page is slow, customers don’t wait — they leave. We measure how long your site takes to open.' },
      { no: '03', title: 'Are there links that lead nowhere', desc: 'Some links end in a “page not found” error. We try every link on the site, one by one.' },
      { no: '04', title: 'Does the browser say “not secure”', desc: 'If there’s a warning in the address bar, customers won’t trust the site. We check your security certificate.' },
      { no: '05', title: 'Do messages from the form reach you', desc: 'If the form is broken, a customer writes and you never see it. We fill it in and check the message arrives.' },
      { no: '06', title: 'Is the software behind the site up to date', desc: 'Old software makes a site slower and riskier. We check whether yours is current.' },
      { no: '07', title: 'Can Google find your site', desc: 'Some settings stop your site showing up in search results. We check whether anything is blocking it.' },
      { no: '08', title: 'Can customers reach you easily', desc: 'Are your phone number and address easy to see, is the text readable, are the buttons easy to find.' },
    ],
    reportTitle: 'What the report looks like',
    reportSub: 'No technical terms. We write what we found, how urgent it is and what should be done.',
    findings: [
      { no: '01', severity: 'Urgent', level: 'crit', title: 'The menu doesn’t open on a phone.', impact: 'High' },
      { no: '02', severity: 'Medium', level: 'med', title: 'The homepage takes 4.8 seconds to open. That is very slow.', impact: 'Medium' },
      { no: '03', severity: 'Medium', level: 'med', title: 'Two links lead to an empty page.', impact: 'Medium' },
    ],
    sampleReport: { label: 'Sample report', issues: 'problems found', impact: 'Impact', openList: 'Open the list', closeList: 'Close the list', listLabel: 'Checklist — sample' },
    checklist: [
      { k: 'Phone', v: 'Broken', s: 'err' },
      { k: 'Speed', v: '41/100', s: 'warn' },
      { k: 'Links', v: '03 errors', s: 'err' },
      { k: 'Security', v: 'Pass', s: 'ok' },
      { k: 'Forms', v: 'To check', s: 'warn' },
      { k: 'Software', v: 'Outdated', s: 'warn' },
      { k: 'Google', v: 'To check', s: 'warn' },
      { k: 'Usability', v: 'To check', s: 'warn' },
    ],
    statementA: 'After the report, you decide.',
    statementSub: 'You can sort the problems out yourself, ask someone else, or leave them to us.',
    servicesTitle: 'Check and repair',
    servicesCta: 'Ask for a free check',
    after: 'Price is set after the report',
    talk: 'Let’s talk after the report',
    services: [
      { no: '01', name: 'Check report', price: '0 €', items: ['We go through your whole site', 'A list of what we found', 'What to fix first', 'In your inbox within 48 hours'], cta: 'Free check', featured: true },
      { no: '02', name: 'Urgent fix', price: '250 €', items: ['We fix the 2–3 most urgent things', '2 working days'], showAfter: true },
      { no: '03', name: 'Full repair', price: 'From 450 €', items: ['Everything in the report', 'Looks right on a phone', 'Faster and easier to use', '5 working days'], showAfter: true },
      { no: '04', name: 'Ongoing care', price: '79 € / month', note: 'Optional — once your site is in good shape', items: ['Software updates', 'We tell you if your site goes down', 'We check no security warning appears', 'We look for broken links', 'We check backups are being made', '30 minutes of small changes a month', 'A short status note every month'] },
    ],
    howTitle: 'How it works',
    steps: [
      ['Write your website address', 'That’s all you need to do.'],
      ['We take a look', 'We check your site under eight headings.'],
      ['You get the report', 'It arrives by email within 48 hours.'],
    ],
    assure: 'You don’t have to have us do the repair.',
    faqTitle: 'Questions',
    faq: [
      { q: 'Is the check really free?', a: 'Yes. The first check and the report are free.' },
      { q: 'Do I have to buy anything?', a: 'No. You get the report, and the rest is up to you.' },
      { q: 'How long does it take?', a: 'We usually send the report within 48 hours.' },
      { q: 'Do you look at any website?', a: 'We can look at most business websites, WordPress included.' },
      { q: 'Can I fix the problems myself?', a: 'Of course. The report is yours. You or someone you know can do the work.' },
      { q: 'Do you work in German too?', a: 'Yes. We send the report in Turkish, English or German.' },
    ],
    final: 'Ask for a free check',
    form: {
      url: 'Website address',
      urlPh: 'https://yoursite.com',
      submit: 'Ask for a check',
      micro: ['Within 48 hours', 'Free', 'Nothing to buy'],
      urlErr: 'Please check the website address. Example: yoursite.com',
      ask: 'Which email should we send the report to?',
      email: 'Email',
      emailPh: 'name@yourcompany.com',
      emailErr: 'Please check the email address.',
      prepare: 'Send',
      back: 'Change the address',
      sending: 'Sending…',
      done: 'Got it.',
      doneText: 'We’ll send the report within 48 hours to:',
      demo: 'Demo finished. Nothing was sent.',
      demoNote: 'Demo / nothing sent',
      edit: 'Edit the address or email',
      reset: 'New request',
      fail: 'It couldn’t be sent. Please try again.',
      privacy: 'We use your details only to write back to you.',
      privacyLink: 'Privacy',
    },
    footer: {
      tag: 'We look after small business websites.',
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
      title: 'Sitemendo — We tell you what’s broken on your website',
      description: 'Free website check for small businesses in Berlin. We find whatever is costing you customers and explain it in a clear report within 48 hours.',
      ogTitle: 'Sitemendo — We tell you what’s broken on your website',
      ogDescription: 'We check your site for free and write down, in plain words, what is broken. Within 48 hours.',
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
    nav: { how: 'So läuft es', checks: 'Was wir prüfen', services: 'Leistungen', faq: 'Fragen', cta: 'Kostenlose Prüfung', ctaShort: 'Prüfung', lang: 'Sprache' },
    a11y: { skip: 'Zum Inhalt', mainNav: 'Hauptnavigation', menu: 'Menü', knife: 'Zeichnung eines aufklappenden Taschenmessers' },
    hero: {
      a: 'Wir sagen Ihnen kostenlos, was auf Ihrer Website kaputt ist.',
      support: 'Wir sehen uns Ihre ganze Seite an und fassen alles, was wir finden, in einem verständlichen Bericht zusammen.',
    },
    about: {
      title: 'Über uns',
      p1: 'Wir kümmern uns um die Websites kleiner Betriebe in Berlin. Wir finden, was Sie Kunden kostet, und erklären es innerhalb von 48 Stunden in einem verständlichen Bericht.',
      p2: 'Die erste Prüfung ist kostenlos. Sie müssen nichts reparieren lassen. Wenn Sie kein Formular ausfüllen möchten, schreiben Sie eine E-Mail oder rufen Sie an.',
      emailLabel: 'E-Mail',
      phoneLabel: 'Telefon',
      whatsapp: 'WhatsApp',
    },
    sec: { checks: 'Was wir prüfen', output: 'Der Bericht', decision: 'Ihre Entscheidung', services: 'Leistungen', process: 'Ablauf', start: 'Start' },
    checksTitle: 'Was wir prüfen',
    checksSub: 'Bei der kostenlosen Prüfung sehen wir uns diese acht Punkte an.',
    checks: [
      { no: '01', title: 'Sieht die Seite auf dem Handy richtig aus', desc: 'Die meisten Kunden öffnen Ihre Seite auf dem Handy. Wir schauen, ob Texte überlaufen, das Menü aufgeht und die Schaltflächen anklickbar sind.' },
      { no: '02', title: 'Öffnen die Seiten schnell', desc: 'Wenn eine Seite langsam lädt, warten Kunden nicht — sie gehen. Wir messen, wie lange Ihre Seite braucht.' },
      { no: '03', title: 'Gibt es Links, die ins Leere führen', desc: 'Manche Links enden mit „Seite nicht gefunden“. Wir probieren jeden Link auf der Seite einzeln aus.' },
      { no: '04', title: 'Sagt der Browser „nicht sicher“', desc: 'Steht eine Warnung in der Adresszeile, vertrauen Kunden der Seite nicht. Wir prüfen Ihr Sicherheitszertifikat.' },
      { no: '05', title: 'Kommen Nachrichten aus dem Formular bei Ihnen an', desc: 'Ist das Formular kaputt, schreibt ein Kunde, und Sie sehen es nie. Wir füllen es aus und prüfen, ob die Nachricht ankommt.' },
      { no: '06', title: 'Ist die Software hinter der Seite aktuell', desc: 'Alte Software macht eine Seite langsamer und unsicherer. Wir prüfen, ob Ihre aktuell ist.' },
      { no: '07', title: 'Kann Google Ihre Seite finden', desc: 'Manche Einstellungen verhindern, dass Ihre Seite in den Suchergebnissen auftaucht. Wir prüfen, ob etwas blockiert.' },
      { no: '08', title: 'Erreichen Kunden Sie leicht', desc: 'Sind Telefonnummer und Adresse gut sichtbar, ist der Text lesbar, sind die Schaltflächen leicht zu finden.' },
    ],
    reportTitle: 'So sieht der Bericht aus',
    reportSub: 'Keine Fachbegriffe. Wir schreiben, was wir gefunden haben, wie dringend es ist und was getan werden sollte.',
    findings: [
      { no: '01', severity: 'Dringend', level: 'crit', title: 'Das Menü öffnet auf dem Handy nicht.', impact: 'Hoch' },
      { no: '02', severity: 'Mittel', level: 'med', title: 'Die Startseite öffnet in 4,8 Sekunden. Das ist sehr langsam.', impact: 'Mittel' },
      { no: '03', severity: 'Mittel', level: 'med', title: 'Zwei Links führen auf eine leere Seite.', impact: 'Mittel' },
    ],
    sampleReport: { label: 'Beispielbericht', issues: 'Probleme gefunden', impact: 'Wirkung', openList: 'Liste öffnen', closeList: 'Liste schließen', listLabel: 'Checkliste — Beispiel' },
    checklist: [
      { k: 'Handy', v: 'Fehlerhaft', s: 'err' },
      { k: 'Tempo', v: '41/100', s: 'warn' },
      { k: 'Links', v: '03 Fehler', s: 'err' },
      { k: 'Sicherheit', v: 'Bestanden', s: 'ok' },
      { k: 'Formulare', v: 'Zu prüfen', s: 'warn' },
      { k: 'Software', v: 'Veraltet', s: 'warn' },
      { k: 'Google', v: 'Zu prüfen', s: 'warn' },
      { k: 'Bedienung', v: 'Zu prüfen', s: 'warn' },
    ],
    statementA: 'Nach dem Bericht entscheiden Sie.',
    statementSub: 'Sie können die Punkte selbst lösen, jemand anderen fragen oder uns beauftragen.',
    servicesTitle: 'Prüfung und Reparatur',
    servicesCta: 'Kostenlose Prüfung anfordern',
    after: 'Preis steht nach dem Bericht fest',
    talk: 'Nach dem Bericht sprechen',
    services: [
      { no: '01', name: 'Prüfbericht', price: '0 €', items: ['Wir sehen uns Ihre ganze Seite an', 'Eine Liste dessen, was wir gefunden haben', 'Was zuerst repariert werden sollte', 'Innerhalb von 48 Stunden bei Ihnen'], cta: 'Kostenlose Prüfung', featured: true },
      { no: '02', name: 'Dringende Reparatur', price: '250 €', items: ['Wir beheben die 2–3 dringendsten Punkte', '2 Werktage'], showAfter: true },
      { no: '03', name: 'Komplettreparatur', price: 'ab 450 €', items: ['Alles aus dem Bericht', 'Sieht auf dem Handy richtig aus', 'Schneller und leichter zu bedienen', '5 Werktage'], showAfter: true },
      { no: '04', name: 'Laufende Betreuung', price: '79 € / Monat', note: 'Optional — wenn Ihre Seite in Ordnung ist', items: ['Software-Updates', 'Wir melden uns, wenn Ihre Seite ausfällt', 'Wir achten darauf, dass keine Sicherheitswarnung erscheint', 'Wir suchen nach kaputten Links', 'Wir prüfen, ob Sicherungen laufen', '30 Minuten kleine Änderungen im Monat', 'Jeden Monat eine kurze Rückmeldung'] },
    ],
    howTitle: 'So läuft es',
    steps: [
      ['Website-Adresse eingeben', 'Mehr müssen Sie nicht tun.'],
      ['Wir sehen nach', 'Wir prüfen Ihre Seite in acht Punkten.'],
      ['Sie bekommen den Bericht', 'Er kommt innerhalb von 48 Stunden per E-Mail.'],
    ],
    assure: 'Sie müssen die Reparatur nicht bei uns machen lassen.',
    faqTitle: 'Fragen',
    faq: [
      { q: 'Ist die Prüfung wirklich kostenlos?', a: 'Ja. Die erste Prüfung und der Bericht sind kostenlos.' },
      { q: 'Muss ich etwas kaufen?', a: 'Nein. Sie bekommen den Bericht, alles Weitere liegt bei Ihnen.' },
      { q: 'Wie lange dauert es?', a: 'Den Bericht senden wir meist innerhalb von 48 Stunden.' },
      { q: 'Sehen Sie sich jede Website an?', a: 'Die meisten Unternehmensseiten, WordPress eingeschlossen.' },
      { q: 'Kann ich die Probleme selbst beheben?', a: 'Natürlich. Der Bericht gehört Ihnen. Sie oder jemand, den Sie kennen, kann die Arbeit machen.' },
      { q: 'Geht das auch auf Deutsch?', a: 'Ja. Wir senden den Bericht auf Türkisch, Englisch oder Deutsch.' },
    ],
    final: 'Kostenlose Prüfung anfordern',
    form: {
      url: 'Website-Adresse',
      urlPh: 'https://ihre-seite.de',
      submit: 'Prüfung anfordern',
      micro: ['Innerhalb von 48 Stunden', 'Kostenlos', 'Nichts zu kaufen'],
      urlErr: 'Bitte prüfen Sie die Website-Adresse. Beispiel: ihre-seite.de',
      ask: 'An welche E-Mail sollen wir den Bericht senden?',
      email: 'E-Mail',
      emailPh: 'name@ihr-unternehmen.de',
      emailErr: 'Bitte prüfen Sie die E-Mail-Adresse.',
      prepare: 'Senden',
      back: 'Adresse ändern',
      sending: 'Wird gesendet…',
      done: 'Angekommen.',
      doneText: 'Den Bericht senden wir innerhalb von 48 Stunden an:',
      demo: 'Demo beendet. Es wurde nichts gesendet.',
      demoNote: 'Demo / nichts gesendet',
      edit: 'Adresse oder E-Mail ändern',
      reset: 'Neue Anfrage',
      fail: 'Konnte nicht gesendet werden. Bitte erneut versuchen.',
      privacy: 'Ihre Angaben nutzen wir nur, um Ihnen zu antworten.',
      privacyLink: 'Datenschutz',
    },
    footer: {
      tag: 'Wir kümmern uns um Websites kleiner Betriebe.',
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
      title: 'Sitemendo — Wir sagen Ihnen, was auf Ihrer Website kaputt ist',
      description: 'Kostenlose Website-Prüfung für kleine Betriebe in Berlin. Wir finden, was Sie Kunden kostet, und erklären es innerhalb von 48 Stunden verständlich.',
      ogTitle: 'Sitemendo — Wir sagen Ihnen, was auf Ihrer Website kaputt ist',
      ogDescription: 'Wir prüfen Ihre Seite kostenlos und schreiben in einfachen Worten auf, was kaputt ist. Innerhalb von 48 Stunden.',
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
