export type Lang = 'tr' | 'en' | 'de';
export type Check = { no: string; code: string; title: string; desc: string };
export type Finding = { no: string; severity: string; level: 'crit' | 'med'; title: string; impact: string };
export type Service = { no: string; name: string; price: string; items: string[]; cta?: string; featured?: boolean; note?: string };
export type FAQ = { q: string; a: string };
export type ChecklistCell = { k: string; v: string; s: 'ok' | 'warn' | 'err' };
export type LegalBlock = { h: string; p: string };

export type Copy = {
  nav: { how: string; checks: string; services: string; faq: string; cta: string; ctaShort: string; lang: string };
  a11y: { skip: string; mainNav: string; menu: string };
  hero: { label: string; a: string; b: string; c: string; d: string; e: string; support: string; sample: string; chrome: string };
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
  statementB: string;
  statementSub: string;
  servicesTitle: string;
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
  footer: { services: string; site: string; legal: string; privacy: string; rights: string; contact: string; contactHint: string; mark: string };
  meta: {
    title: string; description: string; ogTitle: string; ogDescription: string;
    privacyTitle: string; privacyDescription: string; impressumTitle: string; impressumDescription: string;
  };
  legal: {
    back: string; updated: string;
    privacyTitle: string; privacyLead: string; privacy: LegalBlock[];
    impressumTitle: string; impressumLead: string;
    provider: string; address: string; country: string; represented: string; representedBy: string; emailLabel: string;
    impressum: LegalBlock[];
  };
};

export const content: Record<Lang, Copy> = {
  tr: {
    nav: { how: 'Nasıl çalışır', checks: 'Ne kontrol ediyoruz', services: 'Hizmetler', faq: 'SSS', cta: 'Ücretsiz kontrol', ctaShort: 'Kontrol', lang: 'Dil' },
    a11y: { skip: 'İçeriğe geç', mainNav: 'Ana menü', menu: 'Menü' },
    hero: {
      label: 'Web sitenizi kontrol ediyoruz.',
      a: 'Siteniz', b: 'çalışıyor.', c: 'Ama', d: 'iyi', e: 'çalışıyor mu?',
      support: 'Teknik sorunları, mobil hataları ve müşteri kaybettirebilecek problemleri tespit ediyoruz. 48 saat içinde anlaşılır bir rapor gönderiyoruz.',
      sample: 'Örnek veri',
      chrome: 'SITEMENDO / WEB DENETİMİ · SÜR / 04',
    },
    sec: { checks: 'Kontrol kapsamı', output: 'Çıktı', decision: 'Karar', services: 'Hizmetler', process: 'Süreç', start: 'Başlangıç' },
    checksTitle: 'Neye bakıyoruz?',
    checksSub: 'Ücretsiz kontrolde sitenizi teknik ve kullanıcı açısından inceliyoruz.',
    checks: [
      { no: '01', code: 'MOB', title: 'Mobil uyumluluk', desc: 'Telefon ve tablet ekranlarında bozulan düzen, taşan içerik ve açılmayan menüler.' },
      { no: '02', code: 'SPD', title: 'Sayfa hızı', desc: 'Yükleme süresi, ağır görseller ve ilk görünümü geciktiren kaynaklar.' },
      { no: '03', code: 'LNK', title: 'Kırık bağlantılar', desc: "404'e giden iç ve dış bağlantılar ve gereksiz yönlendirme zincirleri." },
      { no: '04', code: 'SSL', title: 'SSL ve güvenlik', desc: 'Sertifika durumu, karışık içerik ve temel güvenlik başlıkları.' },
      { no: '05', code: 'FRM', title: 'İletişim formları', desc: 'Formun gerçekten gönderilip gönderilmediği, hata mesajları ve e-postanın ulaşması.' },
      { no: '06', code: 'CMS', title: 'CMS ve güncellemeler', desc: 'Sürüm durumu, eski eklentiler ve bilinen sorunlar.' },
      { no: '07', code: 'SEO', title: 'Temel SEO sorunları', desc: 'Başlıklar, açıklamalar, dizinleme engelleri ve eksik meta veriler.' },
      { no: '08', code: 'UXP', title: 'Kullanıcı deneyimi', desc: 'Okunabilirlik, tıklama hedefleri ve müşterinin size ulaşma yolu.' },
    ],
    reportTitle: 'Rapor böyle görünüyor.',
    reportSub: 'Teknik jargon değil: neyin bozuk olduğunu, ne kadar önemli olduğunu ve ne yapılması gerektiğini gösterir.',
    findings: [
      { no: '01', severity: 'Kritik', level: 'crit', title: 'Mobil menü bazı ekranlarda açılmıyor.', impact: 'Yüksek' },
      { no: '02', severity: 'Orta', level: 'med', title: 'Ana sayfanın yüklenmesi 4,8 saniye sürüyor.', impact: 'Orta' },
      { no: '03', severity: 'Orta', level: 'med', title: 'İki bağlantı 404 sayfasına gidiyor.', impact: 'Orta' },
    ],
    sampleReport: { label: 'Örnek rapor', issues: 'sorun bulundu', impact: 'Etki', openList: 'Kontrol listesini aç', closeList: 'Kontrol listesini kapat', listLabel: 'Kontrol listesi — örnek veri' },
    checklist: [
      { k: 'Mobil', v: 'Geçti', s: 'ok' },
      { k: 'Hız', v: '41/100', s: 'warn' },
      { k: 'Bağlantılar', v: '03 hata', s: 'err' },
      { k: 'SSL', v: 'Geçti', s: 'ok' },
      { k: 'Formlar', v: 'Kontrol', s: 'warn' },
      { k: 'CMS', v: 'Eski sürüm', s: 'warn' },
      { k: 'SEO', v: 'Kontrol', s: 'warn' },
      { k: 'UX', v: 'Kontrol', s: 'warn' },
    ],
    statementA: 'Sorunu bilmek yetmez.',
    statementB: 'Düzeltmek gerekir.',
    statementSub: 'Raporu aldıktan sonra ne yapacağınıza siz karar verirsiniz. Sorunları kendiniz çözebilir veya bize bırakabilirsiniz.',
    servicesTitle: 'Sorunu buluyoruz. İsterseniz düzeltiyoruz.',
    after: 'Rapordan sonra netleşir',
    talk: 'Rapordan sonra konuşalım',
    services: [
      { no: '01', name: 'Denetim raporu', price: '0 €', items: ['Site kontrolü', 'Sorun listesi', 'Önceliklendirme', '48 saat içinde rapor'], cta: 'Ücretsiz kontrol' },
      { no: '02', name: 'Acil düzeltme', price: '250 €', items: ['2–3 kritik teknik sorun', '2 iş günü'] },
      { no: '03', name: 'Tam onarım', price: "450 €'dan · rapordan sonra netleşir", items: ['Teknik sorunların kapsamlı giderilmesi', 'Mobil uyumluluk', 'Performans ve kullanılabilirlik', '5 iş günü'] },
      { no: '04', name: 'Sürekli bakım', price: '79 € / ay', featured: true, note: 'İsteğe bağlı — siteniz düzeldikten sonra →', items: ['Güncellemeler', 'Erişim sürekliliği', 'SSL kontrolü', 'Kırık bağlantı taraması', 'Yedekleme kontrolü', 'Ayda 30 dk küçük değişiklik', 'Aylık sağlık raporu'] },
    ],
    howTitle: 'Üç adım. Hepsi bu.',
    steps: [
      ['Siteyi gönder', "Sadece URL'nizi bırakın."],
      ['Biz kontrol edelim', 'Teknik ve kullanıcı tarafındaki sorunları inceleyelim.'],
      ['Raporu alın', 'Neyin yanlış olduğunu ve neyin düzeltilmesi gerektiğini görün.'],
    ],
    assure: 'Düzeltmeyi bize yaptırmak zorunda değilsiniz.',
    faqTitle: 'Sık sorulanlar.',
    faq: [
      { q: 'Kontrol gerçekten ücretsiz mi?', a: 'Evet. İlk site kontrolü ve sorun raporu ücretsizdir.' },
      { q: 'Bir şey satın almak zorunda mıyım?', a: 'Hayır. Raporu aldıktan sonra hiçbir hizmet satın almak zorunda değilsiniz.' },
      { q: 'Kontrol ne kadar sürüyor?', a: 'Raporu genellikle 48 saat içinde gönderiyoruz.' },
      { q: 'Hangi siteleri kontrol ediyorsunuz?', a: 'WordPress ve diğer yaygın web altyapıları dahil çoğu işletme sitesini kontrol edebiliriz.' },
      { q: 'Sorunları kendim düzeltebilir miyim?', a: 'Evet. Rapor size aittir. Düzeltmeyi kendiniz veya başka bir geliştiriciyle yapabilirsiniz.' },
      { q: 'Almanca hizmet veriyor musunuz?', a: 'Evet. Raporları Türkçe, İngilizce ve Almanca hazırlıyoruz.' },
    ],
    final: 'Sitenizi kontrol edelim',
    form: {
      url: 'Site adresi',
      urlPh: 'https://siteniz.com',
      submit: 'Ücretsiz kontrol et',
      micro: ['48 saat içinde', 'Ücretsiz', 'Satın alma zorunluluğu yok'],
      urlErr: 'Geçerli bir site adresi girin. Örnek: siteniz.com',
      ask: 'Henüz taramıyoruz — raporu nereye gönderelim?',
      email: 'E-posta',
      emailPh: 'ad@sirketiniz.com',
      emailErr: 'Geçerli bir e-posta adresi girin.',
      prepare: 'Raporumu hazırla',
      back: 'Adresi değiştir',
      sending: 'Gönderiliyor…',
      done: 'Talep alındı.',
      doneText: 'Raporu 48 saat içinde şu adrese gönderiyoruz:',
      demo: 'Demo tamamlandı. Hiçbir veri gönderilmedi.',
      demoNote: 'Demo / veri gönderilmedi',
      edit: 'Adresi/e-postayı düzelt',
      reset: 'Yeni kontrol',
      fail: 'Talep gönderilemedi. Lütfen tekrar deneyin.',
      privacy: 'Göndererek, talebinizi yanıtlamak için URL ve e-posta adresinizi işlememize izin verirsiniz.',
      privacyLink: 'Gizlilik',
    },
    footer: {
      services: 'Hizmetler',
      site: 'Site',
      legal: 'Yasal',
      privacy: 'Gizlilik',
      rights: 'Tüm hakları saklıdır',
      contact: 'İletişim',
      contactHint: 'Site adresi gerekmez — doğrudan yazın.',
      mark: 'SITEMENDO / WEB DENETİMİ',
    },
    meta: {
      title: 'SITEMENDO — Web sitenizi kontrol ediyoruz',
      description: 'Sitemendo, işletme web sitelerindeki teknik sorunları, mobil hataları ve müşteri kaybettiren problemleri tespit eder. 48 saat içinde ücretsiz, anlaşılır bir rapor.',
      ogTitle: 'SITEMENDO — Web sitenizi kontrol ediyoruz',
      ogDescription: 'Teknik sorunları, mobil hataları ve müşteri kaybettirebilecek problemleri tespit ediyoruz. 48 saat içinde ücretsiz rapor.',
      privacyTitle: 'Gizlilik — SITEMENDO',
      privacyDescription: 'Sitemendo gizlilik bilgileri. Site kontrolü talebinizde hangi verilerin işlendiğini açıklar.',
      impressumTitle: 'Impressum — SITEMENDO',
      impressumDescription: 'Sitemendo yasal bilgileri ve iletişim.',
    },
    legal: {
      back: 'Ana sayfa',
      updated: 'Son güncelleme: 30 Ağustos 2026',
      privacyTitle: 'Gizlilik',
      privacyLead: 'Sitemendo, ücretsiz site kontrolü talebinizi yanıtlamak için yalnızca gerekli verileri işler.',
      privacy: [
        { h: 'Hangi verileri topluyoruz', p: 'Formu gönderdiğinizde web sitesi adresinizi ve e-posta adresinizi alırız. Bunlar talebinizi karşılamak ve raporu size iletmek için kullanılır.' },
        { h: 'Neden işliyoruz', p: 'Veriler, denetim talebini yerine getirmek, sizinle iletişim kurmak ve hizmeti iyileştirmek için işlenir. Verilerinizi satmayız ve pazarlama listelerine eklemeyiz.' },
        { h: 'Saklama', p: 'Taleple ilgili veriler, raporun iletilmesi ve olası takip soruları için makul bir süre saklanır; ardından silinir veya anonimleştirilir.' },
        { h: 'Haklarınız', p: 'Verilerinize erişme, düzeltme veya silme talep edebilirsiniz. Bunun için hello@sitemendo.de adresine yazın. Site URL’si gerekmez.' },
      ],
      impressumTitle: 'Impressum',
      impressumLead: 'Yasal bilgiler ve iletişim.',
      provider: 'Hizmet sağlayıcı',
      address: 'Adres',
      country: 'Almanya',
      represented: 'Temsilci',
      representedBy: 'Geschäftsführung (yer tutucu)',
      emailLabel: 'E-posta',
      impressum: [
        { h: 'Sorumluluk', p: 'Bu sitedeki örnek raporlar tanıtım amaçlıdır. Bağlı sitelerin içeriğinden ilgili işletmeciler sorumludur.' },
      ],
    },
  },
  en: {
    nav: { how: 'How it works', checks: 'What we check', services: 'Services', faq: 'FAQ', cta: 'Free check', ctaShort: 'Check', lang: 'Language' },
    a11y: { skip: 'Skip to content', mainNav: 'Main navigation', menu: 'Menu' },
    hero: {
      label: 'We inspect your website.',
      a: 'Your site', b: 'works.', c: 'But does it', d: 'work', e: 'well enough?',
      support: 'We find technical problems, mobile errors and the issues that quietly cost you customers. You get a clear report within 48 hours.',
      sample: 'Sample data',
      chrome: 'SITEMENDO / WEB INSPECTION · REV / 04',
    },
    sec: { checks: 'Scope of inspection', output: 'Output', decision: 'Decision', services: 'Services', process: 'Process', start: 'Start' },
    checksTitle: 'What do we check?',
    checksSub: 'The free check inspects your site technically and from a visitor’s point of view.',
    checks: [
      { no: '01', code: 'MOB', title: 'Mobile compatibility', desc: 'Broken layouts, overflowing content and menus that fail on phones and tablets.' },
      { no: '02', code: 'SPD', title: 'Page speed', desc: 'Load time, oversized images and resources that delay the first view.' },
      { no: '03', code: 'LNK', title: 'Broken links', desc: 'Internal and external links that end in 404s, plus needless redirect chains.' },
      { no: '04', code: 'SSL', title: 'SSL and security', desc: 'Certificate status, mixed content and basic security headers.' },
      { no: '05', code: 'FRM', title: 'Contact forms', desc: 'Whether the form actually submits, its error messages, and whether the email arrives.' },
      { no: '06', code: 'CMS', title: 'CMS and updates', desc: 'Version status, outdated plugins and known issues.' },
      { no: '07', code: 'SEO', title: 'Basic SEO issues', desc: 'Titles, descriptions, indexing blocks and missing metadata.' },
      { no: '08', code: 'UXP', title: 'User experience', desc: 'Readability, tap targets and how a customer actually reaches you.' },
    ],
    reportTitle: 'This is what the report looks like.',
    reportSub: 'No jargon: what is broken, how much it matters, and what should be fixed first.',
    findings: [
      { no: '01', severity: 'Critical', level: 'crit', title: 'The mobile menu does not open on some screens.', impact: 'High' },
      { no: '02', severity: 'Medium', level: 'med', title: 'The homepage takes 4.8 seconds to load.', impact: 'Medium' },
      { no: '03', severity: 'Medium', level: 'med', title: 'Two links lead to a 404 page.', impact: 'Medium' },
    ],
    sampleReport: { label: 'Sample report', issues: 'issues found', impact: 'Impact', openList: 'Open checklist', closeList: 'Close checklist', listLabel: 'Checklist — sample data' },
    checklist: [
      { k: 'Mobile', v: 'Pass', s: 'ok' },
      { k: 'Speed', v: '41/100', s: 'warn' },
      { k: 'Links', v: '03 fail', s: 'err' },
      { k: 'SSL', v: 'Pass', s: 'ok' },
      { k: 'Forms', v: 'Check', s: 'warn' },
      { k: 'CMS', v: 'Outdated', s: 'warn' },
      { k: 'SEO', v: 'Check', s: 'warn' },
      { k: 'UX', v: 'Check', s: 'warn' },
    ],
    statementA: 'Knowing the problem is not enough.',
    statementB: 'It has to be fixed.',
    statementSub: 'Once you have the report, you decide what happens next. Fix the issues yourself, or leave them to us.',
    servicesTitle: 'We find the problem. We fix it if you want.',
    after: 'Confirmed after the report',
    talk: 'Let’s talk after the report',
    services: [
      { no: '01', name: 'Audit report', price: '0 €', items: ['Site check', 'List of issues', 'Prioritisation', 'Report within 48 hours'], cta: 'Free check' },
      { no: '02', name: 'Urgent fix', price: '250 €', items: ['2–3 critical technical issues', '2 working days'] },
      { no: '03', name: 'Full repair', price: 'From 450 € · confirmed after the report', items: ['Comprehensive technical repair', 'Mobile compatibility', 'Performance and usability', '5 working days'] },
      { no: '04', name: 'Ongoing maintenance', price: '79 € / month', featured: true, note: 'Optional — after your site is fixed →', items: ['Updates', 'Uptime monitoring', 'SSL checks', 'Broken-link scans', 'Backup checks', '30 min of small changes per month', 'Monthly health report'] },
    ],
    howTitle: 'Three steps. That’s all.',
    steps: [
      ['Send the site', 'Just leave your URL.'],
      ['We run the check', 'We inspect the technical and user-side problems.'],
      ['Get the report', 'See what is wrong and what needs fixing.'],
    ],
    assure: 'You do not have to hire us for the fix.',
    faqTitle: 'Frequently asked.',
    faq: [
      { q: 'Is the check really free?', a: 'Yes. The first site check and issue report are free.' },
      { q: 'Do I have to buy anything?', a: 'No. There is no obligation to purchase a service after receiving the report.' },
      { q: 'How long does the check take?', a: 'We usually send the report within 48 hours.' },
      { q: 'Which websites do you check?', a: 'Most business websites, including WordPress and other common web platforms.' },
      { q: 'Can I fix the issues myself?', a: 'Yes. The report is yours. You can do the work yourself or with another developer.' },
      { q: 'Do you offer service in German?', a: 'Yes. We prepare reports in Turkish, English and German.' },
    ],
    final: 'Let’s check your site',
    form: {
      url: 'Website address',
      urlPh: 'https://yoursite.com',
      submit: 'Run a free check',
      micro: ['Within 48 hours', 'Free', 'No purchase required'],
      urlErr: 'Enter a valid website address. Example: yoursite.com',
      ask: 'We are not scanning yet — where should we send the report?',
      email: 'Email',
      emailPh: 'name@yourcompany.com',
      emailErr: 'Enter a valid email address.',
      prepare: 'Prepare my report',
      back: 'Change the address',
      sending: 'Sending…',
      done: 'Request received.',
      doneText: 'We will send the report within 48 hours to:',
      demo: 'Demo completed. No data was sent.',
      demoNote: 'Demo / no data sent',
      edit: 'Edit address/email',
      reset: 'New check',
      fail: 'The request could not be sent. Please try again.',
      privacy: 'By submitting, you allow us to process your URL and email address in order to answer this request.',
      privacyLink: 'Privacy',
    },
    footer: {
      services: 'Services',
      site: 'Site',
      legal: 'Legal',
      privacy: 'Privacy',
      rights: 'All rights reserved',
      contact: 'Contact',
      contactHint: 'No website URL needed — just write to us.',
      mark: 'SITEMENDO / WEB INSPECTION',
    },
    meta: {
      title: 'SITEMENDO — We inspect your website',
      description: 'Sitemendo finds technical problems, mobile errors and the issues that cost businesses customers. A clear free report within 48 hours.',
      ogTitle: 'SITEMENDO — We inspect your website',
      ogDescription: 'We find technical problems, mobile errors and issues that quietly cost you customers. Free report within 48 hours.',
      privacyTitle: 'Privacy — SITEMENDO',
      privacyDescription: 'Sitemendo privacy information. What data we process for a site-check request.',
      impressumTitle: 'Impressum — SITEMENDO',
      impressumDescription: 'Sitemendo legal notice and contact.',
    },
    legal: {
      back: 'Home',
      updated: 'Last updated: 30 August 2026',
      privacyTitle: 'Privacy',
      privacyLead: 'Sitemendo processes only the data needed to answer your free site-check request.',
      privacy: [
        { h: 'What we collect', p: 'When you submit the form we receive your website address and email address. We use them to fulfil the request and send you the report.' },
        { h: 'Why we process it', p: 'The data is processed to run the audit request, contact you, and improve the service. We do not sell your data or add it to marketing lists.' },
        { h: 'Retention', p: 'Request data is kept for a reasonable time to deliver the report and handle follow-up questions, then deleted or anonymised.' },
        { h: 'Your rights', p: 'You may ask to access, correct, or delete your data. Write to hello@sitemendo.de. A website URL is not required.' },
      ],
      impressumTitle: 'Impressum',
      impressumLead: 'Legal notice and contact.',
      provider: 'Service provider',
      address: 'Address',
      country: 'Germany',
      represented: 'Represented by',
      representedBy: 'Managing director (placeholder)',
      emailLabel: 'Email',
      impressum: [
        { h: 'Liability', p: 'Sample reports on this site are for illustration. Operators of linked websites are responsible for their own content.' },
      ],
    },
  },
  de: {
    nav: { how: 'So funktioniert’s', checks: 'Was wir prüfen', services: 'Leistungen', faq: 'FAQ', cta: 'Kostenlose Prüfung', ctaShort: 'Prüfen', lang: 'Sprache' },
    a11y: { skip: 'Zum Inhalt', mainNav: 'Hauptnavigation', menu: 'Menü' },
    hero: {
      label: 'Wir prüfen Ihre Website.',
      a: 'Ihre Seite', b: 'läuft.', c: 'Aber läuft', d: 'sie', e: 'wirklich gut?',
      support: 'Wir finden technische Probleme, mobile Fehler und die Punkte, die Ihnen still Kunden kosten. Innerhalb von 48 Stunden erhalten Sie einen klaren Bericht.',
      sample: 'Beispieldaten',
      chrome: 'SITEMENDO / WEBPRÜFUNG · REV / 04',
    },
    sec: { checks: 'Prüfumfang', output: 'Ergebnis', decision: 'Entscheidung', services: 'Leistungen', process: 'Ablauf', start: 'Start' },
    checksTitle: 'Worauf schauen wir?',
    checksSub: 'Bei der kostenlosen Prüfung sehen wir uns Ihre Seite technisch und aus Besuchersicht an.',
    checks: [
      { no: '01', code: 'MOB', title: 'Mobile Darstellung', desc: 'Zerbrochene Layouts, überlaufende Inhalte und Menüs, die auf Handy und Tablet nicht öffnen.' },
      { no: '02', code: 'SPD', title: 'Seitengeschwindigkeit', desc: 'Ladezeit, schwere Bilder und Ressourcen, die den ersten Blick verzögern.' },
      { no: '03', code: 'LNK', title: 'Kaputte Links', desc: 'Interne und externe Links, die auf 404 enden, plus unnötige Weiterleitungsketten.' },
      { no: '04', code: 'SSL', title: 'SSL und Sicherheit', desc: 'Zertifikatsstatus, gemischte Inhalte und grundlegende Sicherheitsheader.' },
      { no: '05', code: 'FRM', title: 'Kontaktformulare', desc: 'Ob das Formular wirklich sendet, Fehlermeldungen und ob die E-Mail ankommt.' },
      { no: '06', code: 'CMS', title: 'CMS und Updates', desc: 'Versionsstand, veraltete Plugins und bekannte Probleme.' },
      { no: '07', code: 'SEO', title: 'Grundlegende SEO-Probleme', desc: 'Titel, Beschreibungen, Indexierungssperren und fehlende Metadaten.' },
      { no: '08', code: 'UXP', title: 'Nutzererlebnis', desc: 'Lesbarkeit, Tippziele und der Weg, auf dem ein Kunde Sie erreicht.' },
    ],
    reportTitle: 'So sieht der Bericht aus.',
    reportSub: 'Kein Jargon: was kaputt ist, wie wichtig es ist und was zuerst behoben werden sollte.',
    findings: [
      { no: '01', severity: 'Kritisch', level: 'crit', title: 'Das mobile Menü öffnet auf manchen Bildschirmen nicht.', impact: 'Hoch' },
      { no: '02', severity: 'Mittel', level: 'med', title: 'Die Startseite braucht 4,8 Sekunden zum Laden.', impact: 'Mittel' },
      { no: '03', severity: 'Mittel', level: 'med', title: 'Zwei Links führen auf eine 404-Seite.', impact: 'Mittel' },
    ],
    sampleReport: { label: 'Beispielbericht', issues: 'Probleme gefunden', impact: 'Wirkung', openList: 'Checkliste öffnen', closeList: 'Checkliste schließen', listLabel: 'Checkliste — Beispieldaten' },
    checklist: [
      { k: 'Mobil', v: 'Bestanden', s: 'ok' },
      { k: 'Tempo', v: '41/100', s: 'warn' },
      { k: 'Links', v: '03 Fehler', s: 'err' },
      { k: 'SSL', v: 'Bestanden', s: 'ok' },
      { k: 'Formulare', v: 'Prüfen', s: 'warn' },
      { k: 'CMS', v: 'Veraltet', s: 'warn' },
      { k: 'SEO', v: 'Prüfen', s: 'warn' },
      { k: 'UX', v: 'Prüfen', s: 'warn' },
    ],
    statementA: 'Das Problem zu kennen reicht nicht.',
    statementB: 'Es muss behoben werden.',
    statementSub: 'Nach dem Bericht entscheiden Sie. Sie können die Punkte selbst lösen oder uns beauftragen.',
    servicesTitle: 'Wir finden das Problem. Wir beheben es, wenn Sie wollen.',
    after: 'Nach dem Bericht konkret',
    talk: 'Nach dem Bericht sprechen',
    services: [
      { no: '01', name: 'Prüfbericht', price: '0 €', items: ['Seitenprüfung', 'Problemliste', 'Priorisierung', 'Bericht innerhalb von 48 Stunden'], cta: 'Kostenlose Prüfung' },
      { no: '02', name: 'Dringende Reparatur', price: '250 €', items: ['2–3 kritische technische Probleme', '2 Werktage'] },
      { no: '03', name: 'Komplettreparatur', price: 'ab 450 € · nach dem Bericht konkret', items: ['Umfassende technische Instandsetzung', 'Mobile Darstellung', 'Leistung und Nutzbarkeit', '5 Werktage'] },
      { no: '04', name: 'Laufende Wartung', price: '79 € / Monat', featured: true, note: 'Optional — nachdem Ihre Seite instand ist →', items: ['Updates', 'Erreichbarkeitsprüfung', 'SSL-Prüfung', 'Suche nach kaputten Links', 'Backup-Prüfung', '30 Min. kleine Änderungen pro Monat', 'Monatlicher Gesundheitsbericht'] },
    ],
    howTitle: 'Drei Schritte. Das ist alles.',
    steps: [
      ['Seite senden', 'Hinterlassen Sie einfach Ihre URL.'],
      ['Wir prüfen', 'Wir schauen uns technische und nutzerseitige Probleme an.'],
      ['Bericht erhalten', 'Sehen Sie, was falsch ist und was behoben werden muss.'],
    ],
    assure: 'Sie müssen uns die Reparatur nicht übergeben.',
    faqTitle: 'Häufige Fragen.',
    faq: [
      { q: 'Ist die Prüfung wirklich kostenlos?', a: 'Ja. Die erste Seitenprüfung und der Problembericht sind kostenlos.' },
      { q: 'Muss ich etwas kaufen?', a: 'Nein. Nach dem Bericht besteht keine Kaufpflicht.' },
      { q: 'Wie lange dauert die Prüfung?', a: 'Den Bericht senden wir in der Regel innerhalb von 48 Stunden.' },
      { q: 'Welche Websites prüfen Sie?', a: 'Die meisten Unternehmensseiten, einschließlich WordPress und anderer gängiger Plattformen.' },
      { q: 'Kann ich die Probleme selbst beheben?', a: 'Ja. Der Bericht gehört Ihnen. Sie können selbst oder mit einem anderen Entwickler arbeiten.' },
      { q: 'Bieten Sie den Service auf Deutsch an?', a: 'Ja. Berichte erstellen wir auf Türkisch, Englisch und Deutsch.' },
    ],
    final: 'Lassen Sie uns Ihre Seite prüfen',
    form: {
      url: 'Website-Adresse',
      urlPh: 'https://ihre-seite.de',
      submit: 'Kostenlos prüfen',
      micro: ['Innerhalb von 48 Stunden', 'Kostenlos', 'Kein Kauf nötig'],
      urlErr: 'Bitte eine gültige Website-Adresse eingeben. Beispiel: ihre-seite.de',
      ask: 'Wir scannen noch nicht — wohin sollen wir den Bericht senden?',
      email: 'E-Mail',
      emailPh: 'name@ihr-unternehmen.de',
      emailErr: 'Bitte eine gültige E-Mail-Adresse eingeben.',
      prepare: 'Bericht vorbereiten',
      back: 'Adresse ändern',
      sending: 'Wird gesendet…',
      done: 'Anfrage erhalten.',
      doneText: 'Den Bericht senden wir innerhalb von 48 Stunden an:',
      demo: 'Demo abgeschlossen. Es wurden keine Daten gesendet.',
      demoNote: 'Demo / keine Daten gesendet',
      edit: 'Adresse/E-Mail korrigieren',
      reset: 'Neue Prüfung',
      fail: 'Die Anfrage konnte nicht gesendet werden. Bitte erneut versuchen.',
      privacy: 'Mit dem Absenden erlauben Sie uns, Ihre URL und E-Mail-Adresse zu verarbeiten, um diese Anfrage zu beantworten.',
      privacyLink: 'Datenschutz',
    },
    footer: {
      services: 'Leistungen',
      site: 'Seite',
      legal: 'Rechtliches',
      privacy: 'Datenschutz',
      rights: 'Alle Rechte vorbehalten',
      contact: 'Kontakt',
      contactHint: 'Keine Website-URL nötig — schreiben Sie uns direkt.',
      mark: 'SITEMENDO / WEBPRÜFUNG',
    },
    meta: {
      title: 'SITEMENDO — Wir prüfen Ihre Website',
      description: 'Sitemendo findet technische Probleme, mobile Fehler und Punkte, die Unternehmen Kunden kosten. Ein klarer kostenloser Bericht innerhalb von 48 Stunden.',
      ogTitle: 'SITEMENDO — Wir prüfen Ihre Website',
      ogDescription: 'Wir finden technische Probleme, mobile Fehler und Punkte, die Ihnen still Kunden kosten. Kostenloser Bericht innerhalb von 48 Stunden.',
      privacyTitle: 'Datenschutz — SITEMENDO',
      privacyDescription: 'Sitemendo Datenschutzhinweise. Welche Daten wir bei einer Prüfungsanfrage verarbeiten.',
      impressumTitle: 'Impressum — SITEMENDO',
      impressumDescription: 'Sitemendo Impressum und Kontakt.',
    },
    legal: {
      back: 'Startseite',
      updated: 'Zuletzt aktualisiert: 30. August 2026',
      privacyTitle: 'Datenschutz',
      privacyLead: 'Sitemendo verarbeitet nur die Daten, die nötig sind, um Ihre kostenlose Prüfungsanfrage zu beantworten.',
      privacy: [
        { h: 'Welche Daten wir erheben', p: 'Wenn Sie das Formular senden, erhalten wir Ihre Website-Adresse und E-Mail-Adresse. Wir nutzen sie, um die Anfrage zu erfüllen und Ihnen den Bericht zu senden.' },
        { h: 'Warum wir verarbeiten', p: 'Die Daten werden verarbeitet, um die Prüfung durchzuführen, Sie zu kontaktieren und den Dienst zu verbessern. Wir verkaufen Ihre Daten nicht und setzen sie nicht auf Marketinglisten.' },
        { h: 'Speicherung', p: 'Anfragedaten werden für eine angemessene Zeit aufbewahrt, um den Bericht zu liefern und Nachfragen zu klären, danach gelöscht oder anonymisiert.' },
        { h: 'Ihre Rechte', p: 'Sie können Auskunft, Berichtigung oder Löschung verlangen. Schreiben Sie an hello@sitemendo.de. Eine Website-URL ist nicht erforderlich.' },
      ],
      impressumTitle: 'Impressum',
      impressumLead: 'Rechtliche Angaben und Kontakt.',
      provider: 'Diensteanbieter',
      address: 'Anschrift',
      country: 'Deutschland',
      represented: 'Vertreten durch',
      representedBy: 'Geschäftsführung (Platzhalter)',
      emailLabel: 'E-Mail',
      impressum: [
        { h: 'Haftung', p: 'Beispielberichte auf dieser Seite dienen der Illustration. Für Inhalte verlinkter Websites sind deren Betreiber verantwortlich.' },
      ],
    },
  },
};
