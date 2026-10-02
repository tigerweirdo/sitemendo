import type { Guide } from '../types';

export const impressumZorunlulugu: Guide = {
  lang: 'tr',
  translationOf: 'impressum-pflichtangaben',
  slug: 'impressum-zorunlulugu',
  category: 'Kontakt und Recht',
  check: 'contact',
  short: 'Impressum: zorunlu bilgiler',
  title: 'Impressum nedir? Zorunlu bilgiler (§ 5 DDG)',
  h1: 'Impressum nedir? § 5 DDG’ye göre zorunlu bilgiler ve sık yapılan hatalar',
  description: 'Web sitenizde Impressum zorunlu mu? § 5 DDG’ye göre zorunlu bilgiler, örnek metin, sık yapılan hatalar ve işletmeler için kontrol listesi.',
  teaser: '§ 5 DDG’nin hangi bilgileri istediği, Impressum’un nerede durması gerektiği ve ihtarnameye yol açan hatalar: örnek ve kontrol listesiyle.',
  tldr: [
    'Dijital hizmetleri iş niteliğinde (geschäftsmäßig) sunan herkesin Impressum’u, yani yasal sağlayıcı bilgisi sayfası olmalıdır; pratikte bu, işletmelerin, serbest çalışanların ve serbest meslek sahiplerinin tüm web siteleri demektir. Yasal dayanak, 14 Mayıs 2024’ten beri Telemedya Yasası’nın (TMG) yerini alan Dijital Hizmetler Yasası’nın (DDG) 5. maddesidir.',
    'Ad, adres ve e-posta adresi zorunludur. Hukuki şekle ve sektöre göre yetkili temsilci, sicil numarası, denetleyici makam, meslek odası ve KDV kimlik numarası da eklenir.',
    'Impressum kolay fark edilir, doğrudan erişilebilir ve sürekli ulaşılabilir olmalıdır. Her sayfanın alt bilgisinde (footer) “Impressum” bağlantısı bulunması olağandır.',
    'Eksik veya yanlış bilgi için 50.000 avroya kadar idari para cezası öngörülür; pratikte rakiplerden gelen ihtarnameler (Abmahnung) daha sık görülür. AB’nin çevrimiçi uyuşmazlık çözüm platformuna verilen bağlantı 20 Temmuz 2025’ten beri geçerliliğini yitirmiştir.',
  ],
  intro: [
    'Impressum, Almanya’daki web sitelerinde bulunması gereken yasal künye sayfasıdır: sitenin kime ait olduğunu ve o kişiye nasıl ulaşılacağını gösterir. Neredeyse her işletme sitesinde bulunması gereken sayfalardan biridir; ihtarnameler de sık sık buraya dayanır: Bilgiler eksiktir, adres bir posta kutusudur ya da bağlantı zor bulunur.',
    'Bu rehber, kimin Impressum’a ihtiyaç duyduğunu, § 5 DDG’nin hangi bilgileri istediğini, Impressum’un nerede durması gerektiğini ve hangi hataların sık yapıldığını anlatır. Yasa metnine ve Sanayi ve Ticaret Odası (IHK) bilgi notlarına dayanır (Ekim 2026 itibarıyla). Impressum Almanya’da genellikle Almanca yazıldığı için örnekler ve terimler Almancadır; karşılıkları rehberde verilmiştir.',
  ],
  sections: [
    {
      id: 'kimler',
      h2: 'Impressum’a kimin ihtiyacı var?',
      blocks: [
        { t: 'note', kind: 'warn', title: 'Hukuki danışmanlık değildir', x: 'Bu rehber genel bir yönlendirmedir. Sizin durumunuzda hangi bilgilerin gerektiği hukuki şekle ve sektöre bağlıdır. Şüphe duyduğunuzda Impressum’unuzu bir avukata ya da meslek odanıza kontrol ettirin.' },
        { t: 'p', x: 'DDG’nin 5. maddesinin 1. fıkrası (§ 5 Abs. 1 DDG), iş niteliğinde ve genellikle karşılığında dijital hizmet sunan sağlayıcılara bazı bilgileri hazır tutma yükümlülüğü getirir. IHK München bunu şöyle özetler: Tamamen özel olmayan her internet sitesi kural olarak zorunlu bilgileri içermelidir. Bundan etkilenenler arasında şirket siteleri, çevrimiçi mağazalar, serbest çalışanların ve serbest meslek sahiplerinin siteleri ve satış platformlarındaki satıcılar yer alır.' },
        { t: 'p', x: 'Tamamen kişisel ya da ailevi amaçlı olmayan siteler de Medya Devlet Sözleşmesi’ne (MStV) göre en azından ad ve adres belirtmelidir (§ 18 Abs. 1 MStV).' },
      ],
    },
    {
      id: 'bilgiler',
      h2: 'Impressum’da neler olmalı? Zorunlu bilgilere genel bakış',
      blocks: [
        {
          t: 'table',
          caption: '§ 5 Abs. 1 DDG’ye göre zorunlu bilgiler',
          head: ['Bilgi', 'Kimler için', 'Not'],
          rows: [
            ['Ad', 'Herkes', 'Ticaret siciline kayıtlı olmayan şahıs işletmesi (Einzelunternehmen): işletme sahibinin adı ve soyadı; sitede kullandığınız ticari adı ayrıca belirtebilirsiniz. Kayıtlı işletmeler: şirket unvanı.'],
            ['Adres', 'Herkes', 'Yerleşik olduğunuz adres. IHK’ya göre posta kutusu yeterli değildir, çünkü yazılı belgelerin ve mahkeme tebligatının size ulaştırılabilmesi gerekir.'],
            ['E-posta adresi ve hızlı iletişim yolu', 'Herkes', 'Hızlı elektronik iletişim ve doğrudan haberleşme için bilgi istenir; e-posta adresi bunun içindedir. IHK’lara göre e-posta adresinin yanında telefon numarası da verilmelidir.'],
            ['Hukuki şekil ve yetkili temsilci', 'Tüzel kişiler', 'Örneğin GmbH veya UG (haftungsbeschränkt); yetkili kişiyle birlikte, örneğin şirket müdürü (Geschäftsführer). IHK München hukuki şekli GbR, OHG ve KG gibi şahıs ve ticaret ortaklıkları için de sayar.'],
            ['Sermaye', 'Yalnızca sermaye bilgisi verenler', 'Esas sermayeyi (GmbH) veya ana sermayeyi (AG) belirtenler, ödenmemiş sermaye payları varsa bunların toplamını da belirtmelidir.'],
            ['Sicil ve sicil numarası', 'Kayıtlı olanlar', 'Ticaret sicili (Handelsregister) veya benzeri bir sicil; örneğin dernek, ortaklık ya da kooperatif sicili; sicil numarasıyla birlikte, örneğin “Amtsgericht …, HRB …”.'],
            ['Denetleyici makam', 'İzne tabi faaliyetler', 'Faaliyetiniz resmi izne bağlıysa yetkili denetleyici makamı (Aufsichtsbehörde) belirtin.'],
            ['Meslek odası, meslek unvanı, meslek hukuku kuralları', 'Düzenlenmiş meslekler', 'Örneğin avukatlar, mali müşavirler, doktorlar veya mimarlar: meslek odası, yasal meslek unvanı ve unvanın verildiği devlet, meslek hukuku düzenlemeleri ve bunlara nereden ulaşılabileceği.'],
            ['KDV kimlik numarası veya ekonomik kimlik numarası', 'Sahip olanlar', 'Yalnızca KDV kimlik numaranız (Umsatzsteuer-ID) ya da ekonomik kimlik numaranız (Wirtschafts-ID) varsa. Olağan vergi numarasını yasa istemez.'],
            ['Tasfiye', 'AG, KGaA ve tasfiye halindeki GmbH', 'Şirketin tasfiye (Abwicklung veya Liquidation) halinde olduğuna dair bir not.'],
          ],
        },
        { t: 'p', x: 'Başka mevzuata dayanan ek bilgilendirme yükümlülükleri saklıdır (§ 5 Abs. 2 DDG). Bu, örneğin çevrimiçi mağazaları ve düzenlenmiş sektörleri ilgilendirir.' },
        { t: 'note', kind: 'info', title: 'Editoryal içerikler', x: 'Gazetecilik ve editoryal nitelikte içerik sunanlar, Medya Devlet Sözleşmesi’ne göre ayrıca ad ve adresiyle sorumlu bir kişi belirtmelidir (§ 18 Abs. 2 MStV). Şirket blogunun bunun kapsamına girip girmediği somut duruma bağlıdır. IHK Karlsruhe’ye göre blog yazıları, ürün reklamının ve salt tanıtımın ötesine geçip kamuoyu oluşumuna etki edebilecek nitelikteyse editoryal sayılabilir. Sorumlu kişi gerçek kişi olmalıdır, şirket olamaz.' },
      ],
    },
    {
      id: 'ozel-durumlar',
      h2: 'Özel durumlar: şahıs işletmesi, dernek, özel siteler ve sosyal medya',
      blocks: [
        { t: 'p', x: 'Zorunlu bilgiler tüm sağlayıcılar için geçerlidir. Bazı durumlar için IHK’lar bilgi notlarında özelliklere işaret eder:' },
        {
          t: 'table',
          caption: 'Sağlayıcıya ve platforma göre özellikler',
          head: ['Durum', 'Ne geçerli', 'Kaynak'],
          rows: [
            ['Şahıs işletmesi ve küçük işletme (Kleingewerbe)', 'İşletme sahibinin adı ve soyadı belirtilir. “Geschäftsführer” gibi unvanlar yalnızca tüzel kişiler içindir. Ticaret siciline kayıtlı değilseniz, ek olarak kullandığınız ticari adı da yazabilirsiniz.', 'IHK München'],
            ['Tüzel kişiliği olan dernek (rechtsfähiger Verein)', 'Dernek sağlayıcı sayılır. Yetkili temsilci olarak yönetim kurulunu (Vorstand) yazarsınız; kayıtlıysa dernek sicilini (Vereinsregister) ve sicil numarasını da.', 'IHK München, IHK Regensburg'],
            ['Tamamen özel web sitesi', 'Yalnızca özel amaçlarla kullanılan bir site için Impressum gerekmez. Ticari bir siteye bağlantı koyarsanız, IHK’ya göre ancak bu bağlantı karşılığında ücret alınıyorsa, örneğin ücretli reklam varsa, bilgilendirme yükümlülüğü gündeme gelir.', 'IHK Hagen'],
            ['Sosyal ağlardaki işletme profili', 'Sosyal medya hesapları da Impressum yükümlülüğüne tabidir; örneğin Facebook veya Instagram işletme sayfaları. Profilde, işletme sitesine giden ve oradan Impressum’a ulaşılan açıkça görünür bir bağlantı yeterlidir (iki tıklama).', 'IHK Hagen, IHK Karlsruhe'],
            ['Satış platformlarındaki satıcılar', 'eBay, Amazon veya Etsy gibi platformlarda ticari satış yapanların da bir Impressum sağlaması gerekir.', 'IHK Hagen, IHK Karlsruhe'],
          ],
        },
        { t: 'p', x: 'Instagram için Hamburg Yüksek Eyalet Mahkemesi (OLG Hamburg) 21 Mayıs 2026’da şu kararı verdi (Az. 15 U 99/24): İşletmeler ve fenomenler, Impressum doğrudan profilde yer almasa da, profil açıklamasındaki açıkça görünür ve erişilebilir bir bağlantı işletme sitesine ve oradan Impressum’a götürüyorsa § 5 Abs. 1 DDG’ye göre yükümlülüklerini yerine getirmiş olur. Bunu IHK Hanau-Gelnhausen-Schlüchtern özetliyor.' },
      ],
    },
    {
      id: 'ornek',
      h2: 'Örnek: Impressum nasıl görünebilir?',
      blocks: [
        { t: 'p', x: 'Aşağıdaki örnekler yapıyı gösterir. Tüm adlar, adresler ve numaralar tamamen kurgusaldır. Olduğu gibi kopyalamayın; hukuki şeklinize ve sektörünüze göre uyarlayın.' },
        { t: 'code', label: 'Örnek: şahıs işletmesi (tamamen kurgusal)', x: 'Angaben gemäß § 5 DDG\n\nMax Mustermann\nBeispiel Elektrotechnik\nMusterstraße 1\n12345 Musterstadt\n\nTelefon: 01234 567890\nE-Mail: info@beispiel-domain.de\n\nUmsatzsteuer-ID: DE123456789 (nur, wenn vorhanden)' },
        { t: 'code', label: 'Örnek: GmbH (tamamen kurgusal)', x: 'Angaben gemäß § 5 DDG\n\nBeispiel Webdesign GmbH\nMusterstraße 1\n12345 Musterstadt\n\nVertreten durch die Geschäftsführerin: Erika Mustermann\n\nTelefon: 01234 567890\nE-Mail: info@beispiel-domain.de\n\nHandelsregister: Amtsgericht Musterstadt, HRB 12345\nUmsatzsteuer-ID: DE123456789 (nur, wenn vorhanden)' },
        {
          t: 'table',
          caption: 'Impressum’da sık geçen Almanca ifadeler',
          head: ['Almanca ifade', 'Anlamı'],
          rows: [
            ['Angaben gemäß § 5 DDG', '§ 5 DDG uyarınca bilgiler (bölümün başlığı)'],
            ['Vertreten durch', 'Temsil eden: şirketi temsile yetkili kişi'],
            ['Geschäftsführer, Geschäftsführerin', 'Şirket müdürü (GmbH ve UG’de şirketi yöneten kişi)'],
            ['Handelsregister, Amtsgericht, HRB', 'Ticaret sicili, sicili tutan yerel mahkeme, sicil numarası (HRB: sermaye şirketleri için)'],
            ['Umsatzsteuer-ID', 'KDV kimlik numarası'],
            ['Aufsichtsbehörde', 'Denetleyici makam'],
            ['nur, wenn vorhanden', 'yalnızca varsa'],
          ],
        },
        { t: 'p', x: 'Impressum’unuzda hâlâ “Angaben gemäß § 5 TMG” yazıyorsa bu eskidir ve DDG’ye göre güncellenmelidir, örneğin “Angaben gemäß § 5 DDG” olarak. IHK München “§§ 5, 6 DDG” ifadesini önerir ve normun anılmasını zorunlu saymaz.' },
      ],
    },
    {
      id: 'yerlesim',
      h2: 'Impressum nerede ve nasıl durmalı?',
      blocks: [
        {
          t: 'ul',
          items: [
            'Bilgiler § 5 DDG’ye göre kolay fark edilir, doğrudan erişilebilir ve sürekli ulaşılabilir olmalıdır.',
            'İçtihada göre ziyaretçilerin art arda iki tıklamayla bilgilere ulaşması yeterlidir (BGH, 20 Temmuz 2006 tarihli karar, I ZR 228/03). Pratikte her sayfanın alt bilgisinde (footer) bir bağlantı yer alır.',
            'Bağlantı metni olarak “Impressum” yerleşmiştir; IHK’ya göre “Kontakt” (iletişim) ve “Anbieterkennzeichnung” (sağlayıcı bilgisi) de kabul edilir.',
            'Yan yana birbirine benzeyen birkaç menü öğesinden kaçının; örneğin “Hakkımızda”, “İletişim” ve “Impressum” hepsi zorunlu bilgilerin orada olduğu izlenimini verirse kafa karıştırır.',
            'Bağlantı kalıcı olarak çalışmalı; yaygın tarayıcıların varsayılan ayarlarında ve akıllı telefonda da.',
          ],
        },
      ],
    },
    {
      id: 'hatalar',
      h2: 'Impressum’da sık yapılan hatalar',
      blocks: [
        {
          t: 'ul',
          items: [
            '**Adres yerine posta kutusu:** IHK’ya göre yeterli değildir.',
            '**Yalnızca e-posta adresi:** IHK’lar ayrıca bir telefon numarası bekler.',
            '**Şirketlerde hukuki şekil, yetkili temsilci veya sicil numarası eksik.**',
            '**Eski bilgiler:** eski adres, görevinden ayrılmış şirket müdürü, geçerliliğini yitirmiş § 5 TMG atfı.',
            '**Impressum zor bulunuyor:** yalnızca bazı sayfalardan bağlanmış, bir menünün içine gizlenmiş ya da yalnızca ikiden fazla tıklamayla ulaşılabiliyor.',
            '**Eski OS platformu notu:** Platform kapatıldı; bu atıf kaldırılmalıdır (aşağıya bakın).',
            '**Vergi numarasının yayımlanması:** Yasa yalnızca KDV kimlik numarasını veya ekonomik kimlik numarasını ister, o da yalnızca sahipseniz.',
          ],
        },
      ],
    },
    {
      id: 'os-platformu',
      h2: 'OS platformu ve tüketici uyuşmazlığı: bugün hâlâ geçerli olan',
      blocks: [
        { t: 'p', x: 'Eskiden tüketicilere çevrimiçi mal veya hizmet satan işletmelerin, sitelerinde AB’nin çevrimiçi uyuşmazlık çözüm platformuna (OS-Plattform) bir bağlantı vermesi gerekiyordu; çoğunlukla Impressum’da. Bu platform 20 Temmuz 2025’te kapatıldı (Yönetmelik (AB) 2024/3228). IHK’ların açıklamalarına göre, artık var olmayan bir platforma verilen atıf yanıltıcı sayılabileceğinden bu atıfların kaldırılması gerekir.' },
        { t: 'p', x: 'Bundan bağımsız olarak Tüketici Uyuşmazlıklarının Çözümü Yasası’nın (VSBG) 36. maddesi geçerlidir: İnternet sitesi işleten veya genel işlem koşulları (AGB) kullanan bir girişimci (Unternehmer), tüketicileri bir tüketici hakem kuruluşu önündeki uyuşmazlık çözüm usullerine katılmaya hazır olup olmadığı ya da bunu yapmakla yükümlü olup olmadığı konusunda bilgilendirmelidir. Önceki yılın 31 Aralık’ında on veya daha az kişi çalıştırmış olanlar bunun dışındadır. Yükümlülük tüketicilerle ilişkiyle ilgilidir.' },
      ],
    },
    {
      id: 'sonuclar',
      h2: 'Hata yapılırsa ne olur?',
      blocks: [
        { t: 'p', x: 'Bilgileri kasten veya ihmal yoluyla hiç, doğru ya da eksiksiz hazır tutmayan kişi, bir kabahat (Ordnungswidrigkeit) işlemiş olur. Yasa bunun için 50.000 avroya kadar idari para cezası öngörür (§ 33 Abs. 2 Nr. 1 ve Abs. 6 Nr. 3 DDG).' },
        { t: 'p', x: 'IHK München’e göre pratikte rakiplerin veya derneklerin rekabet hukuku kapsamındaki ihtarnameleri (Abmahnung) daha yaygındır. Bunlar, bir daha yapmama taahhütnamesi (Unterlassungserklärung) imzalanmasına ve avukatlık masraflarının üstlenilmesine yol açabilir. Bu yüzden özenle güncellenen bir Impressum, en ucuz önlemdir.' },
      ],
    },
    {
      id: 'kontrol-listesi',
      h2: 'Kontrol listesi: Impressum’unuz yolunda mı?',
      blocks: [
        {
          t: 'ol',
          items: [
            '“Impressum” bağlantısı her sayfada, örneğin alt bilgide durur ve doğrudan bilgilere götürür.',
            'Ad ve eksiksiz adres (posta kutusu değil) belirtilmiştir.',
            'E-posta adresi ve telefon numarası belirtilmiştir ve ulaşılabilir.',
            'Şirketlerde: Hukuki şekil, yetkili temsilci ve sicil numarası Impressum’da yer alır.',
            'Geçerliyse: Denetleyici makam, meslek odası, meslek unvanı ve meslek hukuku kuralları belirtilmiştir.',
            'Sahipseniz KDV kimlik numarası ya da ekonomik kimlik numarası belirtilmiştir.',
            'OS platformuna artık atıf yoktur ve “§ 5 TMG” ifadesi kalmamıştır.',
            'Impressum her değişiklikte güncellenir ve en az yılda bir gözden geçirilir.',
          ],
        },
      ],
    },
    {
      id: 'yardim',
      h2: 'Ücretsiz kontrolümüz bu konuda neyi gösterir?',
      blocks: [
        { t: 'p', x: '[Ücretsiz site kontrolü](/website-check?lang=tr), ana sayfada “Impressum” bağlantısının bulunup bulunmadığını ve telefon, e-posta, adres ya da bir iletişim bağlantısına ulaşılıp ulaşılmadığını dışarıdan görür. Impressum’daki bilgilerin eksiksiz ve doğru olup olmadığını denetlemeyiz. Bu hukuki bir sorudur; bunun için hukuki danışmanlık, meslek odanız ya da güvenilir bir sağlayıcının Impressum üreteci doğru adreslerdir.' },
        { t: 'p', x: 'Bağlantı yoksa ya da zor bulunuyorsa bu çoğunlukla küçük bir teknik düzeltmeyle giderilebilir; örneğin [Hızlı düzeltme](/website-repair?lang=tr) kapsamında ({price.quick}, {time.quick}). Hangi işlerin dahil olduğunu işe başlamadan önce netleştiririz. Fiyatlar nettir; %19 KDV eklenir.' },
      ],
    },
  ],
  faq: [
    { q: 'Serbest çalışan olarak Impressum’a ihtiyacım var mı?', a: 'Evet; siteniz tamamen özel değilse. Serbest meslek sahipleri ve şahıs işletmeleri de § 5 DDG’ye göre zorunlu bilgileri hazır tutmalıdır.' },
    { q: 'Adres olarak posta kutusu yeterli mi?', a: 'Hayır. İstenen, yerleşik olduğunuz adrestir. IHK’ya göre posta kutusu yeterli değildir, çünkü yazılı belgelerin ve mahkeme tebligatının ulaştırılabilmesi gerekir. Konut adresiniz yerine bir iş adresi göstermenin sizin durumunuzda mümkün olup olmadığını hukuki olarak netleştirmenizi öneririz.' },
    { q: 'Impressum’da telefon numarası olmalı mı?', a: 'Yasa, e-posta adresi dahil olmak üzere hızlı elektronik iletişim ve doğrudan haberleşme için bilgi ister. IHK’lar bunu, e-posta adresi ve telefon numarasının belirtilmesi gerektiği şeklinde okur. Emin olmak isteyen ikisini de yazar.' },
    { q: 'OS platformuna verilen bağlantıya hâlâ ihtiyacım var mı?', a: 'Hayır. Platform 20 Temmuz 2025’te kapatıldı. IHK’ya göre yanıltıcı olabileceğinden bu atıflar kaldırılmalıdır.' },
    { q: 'Vergi numaramı yazmak zorunda mıyım?', a: 'Hayır. § 5 DDG yalnızca KDV kimlik numarasını (Umsatzsteuer-ID) veya ekonomik kimlik numarasını (Wirtschafts-ID) ister, o da yalnızca sahipseniz.' },
    { q: 'Impressum’un yanında ayrıca gizlilik politikası gerekir mi?', a: 'Evet; siteniz kişisel verileri işliyorsa, örneğin bir iletişim formu, sunucu günlükleri veya analiz hizmetleri üzerinden (Genel Veri Koruma Tüzüğü, DSGVO, madde 13 uyarınca bilgilendirme yükümlülüğü). Gizlilik politikası (Datenschutzerklärung) Impressum’un yanında ayrı bir sayfadır ve her sayfadan bağlanmalıdır.' },
    { q: 'Instagram veya Facebook profilim için Impressum gerekir mi?', a: 'Profili ticari amaçla kullanıyorsanız evet. IHK’ya göre sosyal ağlardaki işletme hesapları da Impressum yükümlülüğüne tabidir. OLG Hamburg’un 21 Mayıs 2026 tarihli kararına göre Instagram’da, profil açıklamasında işletme sitesine ve oradan Impressum’a götüren açıkça görünür bir bağlantı yeterlidir.' },
    { q: 'Impressum Almanca mı olmalı?', a: '§ 5 DDG açık bir dil şartı koymaz; bu rehberin dayandığı IHK bilgi notları da bir dil şartı belirtmez. Aranan, bilgilerin kolay fark edilir ve doğrudan erişilebilir olmasıdır. Uygulamada Impressum sitenin dilinde yazılır; Almanya’daki müşterilere yönelik sitelerde bu yüzden Almanca. Başka bir dilin yeterli olup olmadığını somut durumunuz için hukuki olarak netleştirmenizi öneririz.' },
  ],
  service: 'check',
  related: ['iletisim-formu-calismiyor', 'web-sitesi-bakimi', 'web-sitesi-google-da-gorunmuyor'],
  sources: [
    { label: '§ 5 DDG (Almanca yasa metni): Genel bilgilendirme yükümlülükleri', url: 'https://www.gesetze-im-internet.de/ddg/__5.html' },
    { label: '§ 33 DDG (Almanca): İdari para cezası hükümleri', url: 'https://www.gesetze-im-internet.de/ddg/__33.html' },
    { label: '§ 36 VSBG (Almanca): Genel bilgilendirme yükümlülüğü', url: 'https://www.gesetze-im-internet.de/vsbg/__36.html' },
    { label: 'Medya Devlet Sözleşmesi (Almanca), § 18: Bilgilendirme yükümlülükleri', url: 'https://www.die-medienanstalten.de/fileadmin/user_upload/Rechtsgrundlagen/Gesetze_Staatsvertraege/Medienstaatsvertrag_MStV.pdf' },
    { label: 'IHK München (Almanca): İnternet Impressum’unda zorunlu bilgiler, Mayıs 2024', url: 'https://www.ihk-muenchen.de/ihk/Merkbl%C3%A4tter-WettbewerbsR/Pflichtangaben-Internetimpressum_Stand05_2024.pdf' },
    { label: 'IHK Regensburg (Almanca): İnternet Impressum’unda zorunlu bilgiler', url: 'https://www.ihk.de/regensburg/fachthemen/recht/online-recht-und-datenschutz/online-recht/pflichtangaben-im-internet-impressum-1394836' },
    { label: 'IHK Osnabrück (Almanca): OS platformu 20.07.2025’ten beri kapalı', url: 'https://www.ihk.de/osnabrueck/recht-und-fair-play/recht/internetrecht/einstellung-os-plattform-6474562' },
    { label: 'IHK Karlsruhe (Almanca): Impressum yükümlülükleri', url: 'https://www.ihk.de/karlsruhe/fachthemen/recht/internetrecht/impressumspflichten-6266634' },
    { label: 'IHK Hagen (Almanca): Impressum, nelere dikkat edilmeli?', url: 'https://www.ihk.de/hagen/recht/rechtsthemen/aktuelles/merkblatt-impressum-4269300' },
    { label: 'IHK Hanau-Gelnhausen-Schlüchtern (Almanca): Instagram Impressum’u, profildeki bağlantı yeterli olabilir', url: 'https://www.ihk.de/hanau/recht/aktuelles/neuer-inhalt08-august/instagram-impressum-7145508' },
  ],
  published: '2026-10-01',
  modified: '2026-10-02',
};
