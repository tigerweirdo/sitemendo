import type { Guide } from '../types';

export const webSitesiBakimi: Guide = {
  lang: 'tr',
  translationOf: 'website-wartung',
  slug: 'web-sitesi-bakimi',
  category: 'Technik und Wartung',
  check: 'stack',
  short: 'Web sitesi bakımı: neleri kapsar',
  title: 'Web sitesi bakımı: görevler, riskler, maliyet',
  h1: 'Web sitesi bakımı: görevler, riskler ve maliyeti belirleyen etkenler',
  description: 'Web sitesi bakımı neleri kapsar? Güncellemeler yapılmazsa doğan riskler, bakımı kimin yapacağı, maliyet etkenleri ve sözleşme kontrol listesi.',
  teaser: 'Güncellemeler, yedekler, izleme ve testler: Bakımın neleri kapsadığı, yapılmazsa hangi risklerin doğduğu ve nasıl karar vereceğiniz.',
  tldr: [
    'Bir web sitesi bitmiş bir ürün değildir: CMS, eklentiler, sunucu yazılımı ve sertifikalar sürekli eskir. Bakım yapılmazsa güvenlik, kesinti ve veri kaybı riskleri büyür.',
    'Güvenlik şirketi Patchstack’in raporuna göre 2025’te yeni bildirilen WordPress açıklarının yaklaşık %91’i eklentilerde, yalnızca 6’sı WordPress çekirdeğinde çıktı. Eklenti güncellemeleri bu yüzden en önemli bakım görevleri arasındadır.',
    'Bakıma güncellemeler, geri yükleme testli yedekler, erişilebilirlik ve güvenlik izlemesi, bağlantı ve form testleri, PHP sürümü ve düzenli bir genel kontrol dahildir.',
    'Bakımı kendinizin mi, barındırma sağlayıcınızın mı yoksa bir hizmet sağlayıcının mı yapacağı; zaman, bilgi ve risk meselesidir. Bakım sözleşmesi kapsamı, tepki sürelerini ve veri korumayı net düzenlemelidir.',
  ],
  intro: [
    'Birçok web sitesi, bir eklenti güncellemesi eksik kalana, bir sertifikanın süresi dolana ya da sunucu değişikliğinden sonra form hiçbir şey göndermeyene kadar yıllarca fark edilmeden çalışır. Bakım, tam olarak bunu önleyen sıradan bir rutindir.',
    'Bu rehber, hangi görevlerin bakıma dahil olduğunu, bakım yapılmadığında hangi risklerin doğduğunu, kendi bakımınız, barındırma sağlayıcısı ve hizmet sağlayıcı arasında nasıl karar vereceğinizi ve bir bakım sözleşmesinde nelere dikkat etmeniz gerektiğini gösterir. Rakamlar ve tarihler Ekim 2026 itibarıyladır.',
  ],
  sections: [
    {
      id: 'neden',
      h2: 'Bir web sitesi neden bakıma ihtiyaç duyar?',
      blocks: [
        { t: 'p', x: 'Bir web sitesi, birbirinden bağımsız değişen birkaç yapı taşından oluşur: içerik yönetim sistemi (örneğin WordPress), temalar ve eklentiler, PHP ve veritabanıyla sunucu yazılımı, HTTPS sertifikası, alan adı ve DNS ile harici hizmetler. Her yapı taşı güncelleme alır ya da bir noktada süresi dolar.' },
        {
          t: 'table',
          caption: 'Bir web sitesinin yapı taşları ve bakım ihtiyacı',
          head: ['Yapı taşı', 'Ne değişir', 'Bakım yapılmazsa sonuç'],
          rows: [
            ['CMS, örneğin WordPress', 'Düzenli olarak yeni sürümler ve güvenlik güncellemeleri', 'Bilinen açıklar açık kalır. WordPress’e göre resmi olarak yalnızca en yeni sürüm desteklenir.'],
            ['Eklentiler ve temalar', 'Sık güncellemeler, ara sıra güvenlik açıkları', 'Bilinen açıkların çoğu eklentilerde bulunur (aşağıya bakın).'],
            ['Sunucudaki PHP sürümü', 'Sürümlerin desteği sona erer', 'Artık güvenlik güncellemesi gelmez; yeni eklentiler daha yeni sürümler ister.'],
            ['HTTPS sertifikası', 'Süresi dolar, geçerlilik süreleri kısalıyor', 'Tarayıcı uyarısı çıkar, ziyaretçiler ayrılır. Ayrıntılar için Almanca rehberimize bakın: [HTTPS ve SSL hataları (Almanca)](/ratgeber/https-ssl-fehler-beheben).'],
            ['Alan adı ve DNS', 'Yenileme, sağlayıcıdaki değişiklikler', 'Web sitesi ve e-posta ulaşılamaz olur.'],
            ['Yedekler', 'Düzenli çalışmalı ve test edilmelidir', 'Bir arıza ya da saldırıdan sonra son sağlam duruma dönüş yolu yoktur.'],
            ['Formlar, bağlantılar, içerikler', 'Her yeniden düzenlemeyle değişir', 'Talepler kaybolur, bağlantılar boşa gider, bilgiler eskir.'],
          ],
        },
      ],
    },
    {
      id: 'riskler',
      h2: 'Bakım yapılmadığında en büyük riskler',
      blocks: [
        { t: 'h3', x: 'Eklentilerdeki güvenlik açıkları' },
        { t: 'p', x: 'Güvenlik şirketi Patchstack, “State of WordPress Security in 2026” raporunda (Şubat 2026) 2025 için WordPress ekosisteminde toplam 11.334 yeni güvenlik açığı sayıyor; bu, 2024’e göre %42 artış. Bunların %91’i eklentilerde, %9’u temalarda çıktı; WordPress çekirdeğinde yalnızca 6 açık bildirildi. Açıkların %46’sında yayın sırasında geliştiricinin henüz bir düzeltmesi yoktu. En çok istismar edilen açıklarda ilk saldırıya kadar geçen ortalama süre yaklaşık beş saatti.' },
        { t: 'p', x: 'Bu, her sitenin saldırıya uğrayacağı anlamına gelmez. Ancak en çok istismar edilen açıklar çoğu zaman saatler içinde hedef alınıyor; bu yüzden “sonra güncellerim” demek başlı başına bir risktir. WordPress, güvenlik düzeltmeli küçük çekirdek sürümlerini varsayılan olarak kendiliğinden günceller. Eklentiler ve temalar ise yalnızca istisnai durumlarda, kritik güvenlik açıkları için otomatik güncellenir ve aksi hâlde sizin ya da hizmet sağlayıcınızın takip etmesi gerekir.' },
        { t: 'h3', x: 'Eskimiş bir PHP sürümü' },
        { t: 'p', x: 'PHP, WordPress’in ve birçok başka sistemin üzerinde çalıştığı programlama dilidir. php.net’teki desteklenen sürümler listesine göre (Ekim 2026 itibarıyla) PHP 8.2 güvenlik düzeltmelerini hâlâ 31 Aralık 2026’ya, PHP 8.3 31 Aralık 2027’ye, PHP 8.4 31 Aralık 2028’e ve PHP 8.5 31 Aralık 2029’a kadar alır. PHP 8.1 ve daha eski sürümler artık desteklenmiyor.' },
        { t: 'p', x: 'Barındırma sağlayıcınıza sitenizin hangi PHP sürümünü kullandığını sorun ve desteklenen bir sürüme geçişi zamanında planlayın. Önce sitenin bir kopyasında test edin: Eski temalar ve eklentiler yeni PHP sürümlerinde her zaman hatasız çalışmaz.' },
        { t: 'h3', x: 'Kesintiler ve süresi dolmuş sertifikalar' },
        { t: 'p', x: 'İzleme olmadan bir kesintiyi çoğu zaman bir müşteriden öğrenirsiniz. Süresi dolmuş bir sertifika ya da yenilenmeyen bir alan adı da genellikle ziyaretçiler bir uyarı görene veya sayfa artık yüklenmeyene kadar fark edilmez. Bu tür durumları nasıl tanıyacağınız Almanca rehberimizde anlatılıyor: [Web sitesine erişilemiyor (Almanca)](/ratgeber/website-nicht-erreichbar).' },
        { t: 'h3', x: 'Kullanılabilir bir yedek olmadan veri kaybı' },
        { t: 'p', x: 'Web sitesiyle aynı sunucuda duran bir yedek, sunucu çökerse ya da site ele geçirilirse işe yaramaz. Pratik kural “3-2-1”dir: verilerinizin üç kopyası, iki farklı depolama ortamında, bunlardan biri başka bir yerde. Ayrıca geri yüklemenin test edilmiş olması belirleyicidir. Geri yüklenemeyen bir yedek, yedek değildir.' },
      ],
    },
    {
      id: 'gorevler',
      h2: 'Bakıma bu görevler dahildir',
      blocks: [
        {
          t: 'table',
          caption: 'Bakım görevleri ve önerilen sıklık',
          head: ['Görev', 'Sıklık', 'Neler kontrol edilir'],
          rows: [
            ['CMS, eklenti ve tema güncellemeleri', 'Sürekli, en az ayda bir', 'Güvenlik güncellemelerini vakit kaybetmeden uygulayın; önce yedek alın, sonra işlevleri test edin'],
            ['Geri yükleme testli yedek', 'Otomatik; test düzenli, örneğin üç ayda bir', 'Yedek var, güncel ve sunucunun dışında saklanıyor'],
            ['Erişilebilirliğin izlenmesi', 'Sürekli', 'Kesintide bildirim gelir; böylece bunu müşterilerden öğrenmezsiniz'],
            ['Temel güvenlik kontrolü', 'Aylık', 'Gerekmeyen eklentileri ve kullanıcı hesaplarını kaldırın, güçlü parolalar kullanın, uyarı mesajlarına bakın'],
            ['Form testi', 'Aylık', 'Deneme iletisi ulaşıyor; bkz. rehber [İletişim formu çalışmıyor](/rehber/iletisim-formu-calismiyor)'],
            ['Bağlantı kontrolü', 'Aylık', 'Kırık bağlantılar ve yönlendirmeler; bkz. Almanca rehber [Kırık bağlantıları bulma ve düzeltme (Almanca)](/ratgeber/defekte-links-finden-beheben)'],
            ['Yüklenme süresi ve mobil görünüm', 'Üç ayda bir', 'Ölçüm değerleri, telefonda menü ve düğmeler; bkz. Almanca rehber [Web sitesi yavaş yükleniyor (Almanca)](/ratgeber/website-laedt-langsam)'],
            ['Sertifika, alan adı, PHP sürümü', 'Yılda bir ve süre dolumu uyarısında', 'Bitiş tarihlerini ve destek sonlarını gözden kaçırmayın'],
            ['İçerik ve Impressum', 'En az yılda bir', 'Bilgiler güncel mi? Bkz. rehber [Impressum zorunluluğu](/rehber/impressum-zorunlulugu)'],
          ],
        },
      ],
    },
    {
      id: 'kim',
      h2: 'Kendiniz mi, barındırma sağlayıcısı mı, hizmet sağlayıcı mı?',
      blocks: [
        {
          t: 'table',
          caption: 'Bakım için üç yol',
          head: ['Seçenek', 'Şu durumda uygun', 'Dikkat edilecekler'],
          rows: [
            ['Kendiniz bakım yaparsınız', 'Sistem bilginiz varsa ve ayda bir sabit bir tarihe uyabiliyorsanız.', 'Yedeği ve geri yüklemeyi test edin; işletme açısından kritik sitelerde güncellemeleri önce bir kopyada deneyin.'],
            ['Barındırma sağlayıcısının hizmetleri', 'Paketiniz otomatik güncellemeleri ve yedekleri içeriyorsa.', 'Hizmet tanımında tam olarak neyin kapsandığını okuyun. Bazı paketler yalnızca sunucuyu ve CMS’i kapsar; eklentileri, formları ya da işlev testlerini kapsamaz.'],
            ['Bakım sözleşmesi olan hizmet sağlayıcı', 'Az zamanınız ya da bilginiz varsa ve sabit bir muhatap istiyorsanız.', 'Kapsamı, tepki sürelerini, raporları, fesih süresini ve veri korumayı sözleşmede net düzenleyin.'],
          ],
        },
      ],
    },
    {
      id: 'maliyet',
      h2: 'Bakımın maliyeti: maliyeti belirleyen etkenler',
      blocks: [
        { t: 'p', x: 'Burada genel piyasa fiyatları vermiyoruz, çünkü bunlar somut duruma çok bağlıdır. Emeği şu etkenler belirler:' },
        {
          t: 'ul',
          items: [
            '**Kapsam ve karmaşıklık:** Eklenti sayısı, özel uyarlamalar, mağaza veya rezervasyon işlevleri.',
            '**Sitenin durumu:** CMS, eklentiler ve PHP sürümü eskiyse, sürekli bakım başlamadan önce bir temizlik gerekir.',
            '**Tepki süresi ve erişilebilirlik:** Bir kesintide birinin ne kadar çabuk harekete geçmesini istiyorsunuz?',
            '**Barındırma ortamı:** Sunucuya erişim, test kopyası oluşturma imkânı, yedeklerin türü.',
            '**Ek hizmetler:** küçük değişiklikler, raporlar, güvenlik izlemesi.',
          ],
        },
        { t: 'p', x: '[Site bakımı](/website-care?lang=tr) hizmetimizin ücreti {price.care}. Kesinti takibini (site kapanırsa haber veririz), CMS ve eklenti güncellemelerini, düzenli yedeklemeyi (barındırma izin veriyorsa), temel güvenlik kontrollerini, kırık bağlantı takibini, kısa raporlu aylık site sağlığı kontrolünü ve belirlenen kapsamda küçük site değişikliklerini içerir. Genellikle ücretsiz kontrolün ve gerekli onarımların ardından gelir. Fiyat nettir; %19 KDV eklenir.' },
      ],
    },
    {
      id: 'sozlesme',
      h2: 'Bakım sözleşmesinde nelere dikkat etmelisiniz?',
      blocks: [
        {
          t: 'ol',
          items: [
            '**Kapsam yazılı olsun:** Hangi güncellemeler, hangi yedekler, ne sıklıkta, hangi raporlar?',
            '**Tepki süreleri:** Bir kesintide hizmet sağlayıcı ne zaman ve hangi yoldan geri dönüş yapar?',
            '**Küçük değişiklikler:** Dahil olan kota ne kadar ve bunun ötesindeki emek nasıl faturalandırılır?',
            '**Erişimler:** Hangi erişim bilgileri kimde? Ortak parolalar yerine ayrı kullanıcı hesapları kullanılmasını ve sözleşme bitince erişimlerin iadesini kararlaştırın.',
            '**Yedekler:** Nerede duruyor, ne kadar süre saklanıyor ve geri yüklemeyi kim test ediyor?',
            '**Veri koruma:** Hizmet sağlayıcı kişisel verilere, örneğin form kayıtlarına ya da müşteri hesaplarına erişiyorsa genellikle DSGVO madde 28 uyarınca bir veri işleme sözleşmesi (Auftragsverarbeitungsvertrag) gerekir.',
            '**Hizmetin sınırları:** Neler dahil değil; örneğin yeniden tasarım, yeni işlevler ya da bir saldırıdan sonra temizlik?',
            '**Süre ve fesih:** Asgari süre, fesih süresi, belgelerin teslimi.',
            '**Mülkiyet:** Alan adı, barındırma sözleşmesi ve içerikler sizin adınıza kalır.',
          ],
        },
      ],
    },
    {
      id: 'rutin',
      h2: 'Kendi bakımınız için aylık rutin',
      blocks: [
        {
          t: 'ol',
          items: [
            'Ana sayfayı ve iki alt sayfayı bilgisayarda ve telefonda açın.',
            'İletişim formunu yabancı bir adresle test edin.',
            'Yönetim panelinde bekleyen güncellemelere bakın ve yedek aldıktan sonra uygulayın.',
            'Son yedeğin tarihini ve boyutunu kontrol edin, düzenli aralıklarla bir geri yükleme deneyin.',
            'Sertifikanın ve alan adının bitiş tarihlerine bakın.',
            'Search Console’da yeni hata mesajlarına dikkat edin.',
            'Artık gerekmeyen eklentileri, temaları ve kullanıcı hesaplarını silin.',
          ],
        },
      ],
    },
    {
      id: 'yardim',
      h2: 'Ücretsiz kontrolümüzün teknik konuda gösterdikleri',
      blocks: [
        { t: 'p', x: '[Ücretsiz site kontrolü](/website-check?lang=tr), dışarıdan görülebilen ipuçlarını not eder; örneğin tanınabilen CMS’i, jQuery sürümünü ve sunucunun açıkladığı ölçüde PHP sürümünü ve eskimiş sürümlere dikkat çeker. Giriş ekranının arkasında olanları, örneğin hangi eklentilerde bekleyen güncelleme olduğunu ya da yedeklerin çalışıp çalışmadığını ek erişim olmadan göremeyiz.' },
        { t: 'p', x: 'Sitenizin durumunu bilmek istiyorsanız kontrol ilk adımdır. Bakım, isterseniz bunun ardından gelir.' },
      ],
    },
  ],
  faq: [
    { q: 'Bir web sitesinin bakımı ne sıklıkla yapılmalı?', a: 'Güvenlik güncellemeleri vakit kaybetmeden uygulanmalı, diğer güncellemeler en az ayda bir yapılmalıdır. Yedek otomatik çalışmalı, geri yükleme düzenli olarak test edilmelidir. Erişilebilirliği ve sertifikaları sürekli izlersiniz.' },
    { q: 'WordPress’i otomatik güncellemeye bırakmak yeterli mi?', a: 'Yalnızca kısmen. WordPress küçük çekirdek sürümlerini varsayılan olarak kendiliğinden günceller. Eklentiler ve temalar ise yalnızca istisnai durumlarda, kritik güvenlik açıkları için otomatik güncellenir. Üstelik otomatik süreç, güncellemeden sonra formların, menünün ve içeriklerin hâlâ çalışıp çalışmadığını kontrol etmez.' },
    { q: 'Bakım sözleşmesine ihtiyacım var mı?', a: 'Zorunlu değil. Önemli olan, görevleri birinin düzenli olarak yapmasıdır: Kendiniz, barındırma sağlayıcınız ya da bir hizmet sağlayıcı. Az zamanınız ya da bilginiz varsa ve sabit sorumluluklar istiyorsanız sözleşme yararlıdır.' },
    { q: 'Web sitemin bakımını yapmazsam ne olur?', a: 'Site çoğu zaman uzun süre sorunsuz çalışır. Zamanla riskler artar: bilinen güvenlik açıkları, artık desteklenmeyen PHP sürümleri, süresi dolmuş sertifikalar, bozuk formlar. Sorunlar o zaman genellikle ziyaretçiler fark edince ortaya çıkar.' },
    { q: 'Sitem hangi PHP sürümünü kullanmalı?', a: 'Hâlâ güvenlik güncellemesi alan bir sürümü. php.net’e göre Ekim 2026’da bunlar 8.2 (yalnızca 31 Aralık 2026’ya kadar), 8.3, 8.4 ve 8.5 sürümleridir. Geçişi önce bir kopyada test edin.' },
    { q: 'Hizmet sağlayıcıyla veri işleme sözleşmesi yapmam gerekir mi?', a: 'Genellikle evet; hizmet sağlayıcı sitenizin kişisel verilerine, örneğin form kayıtlarına ya da müşteri hesaplarına erişiyorsa (DSGVO madde 28). Bu hukuki danışmanlık değildir; özel soruları uzman bir kuruluşla netleştirin.' },
  ],
  service: 'care',
  related: ['iletisim-formu-calismiyor', 'web-sitesi-google-da-gorunmuyor', 'impressum-zorunlulugu'],
  sources: [
    { label: 'Patchstack (İngilizce): State of WordPress Security in 2026', url: 'https://patchstack.com/whitepaper/state-of-wordpress-security-in-2026/' },
    { label: 'PHP (İngilizce): Desteklenen sürümler', url: 'https://www.php.net/supported-versions.php' },
    { label: 'WordPress.org (İngilizce): Güvenlik ve desteklenen sürümler', url: 'https://wordpress.org/about/security/' },
    { label: 'WordPress (İngilizce): Otomatik arka plan güncellemeleri', url: 'https://developer.wordpress.org/advanced-administration/upgrade/upgrading/' },
    { label: 'DSGVO madde 28 (Almanca): Auftragsverarbeiter, yani veri işleyen taraf', url: 'https://dejure.org/gesetze/DSGVO/28.html' },
  ],
  published: '2026-10-01',
  modified: '2026-10-01',
};
