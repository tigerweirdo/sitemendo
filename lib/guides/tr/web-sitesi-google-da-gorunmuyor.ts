import type { Guide } from '../types';

export const webSitesiGoogleDaGorunmuyor: Guide = {
  lang: 'tr',
  translationOf: 'website-nicht-bei-google-gefunden',
  slug: 'web-sitesi-google-da-gorunmuyor',
  category: 'Auffindbarkeit',
  check: 'index',
  short: 'Web sitesi Google’da görünmüyor',
  title: 'Siteniz Google’da görünmüyor mu? Nedenler',
  h1: 'Web siteniz Google’da görünmüyor: nedenler ve çözümler',
  description: 'Siteniz Google’da çıkmıyor mu? Dizine eklenip eklenmediğini nasıl kontrol edeceğinizi, sık nedenleri (noindex, robots.txt, bağlantılar) ve çözümleri öğrenin.',
  teaser: 'Dizine eklenmemiş mi, yoksa yalnızca kötü mü sıralanıyor? İkisini ayırt etmeyi, Search Console ile kontrol etmeyi ve sık nedenleri gidermeyi öğrenin.',
  tldr: [
    'İki ayrı sorun vardır: Sayfa Google dizininde değildir (dizine ekleme) ya da dizindedir ama çok geride çıkar (sıralama). İkisi için de farklı önlemler gerekir.',
    'Bu soruya Search Console güvenilir bir yanıt verir: URL Denetleme aracı bir sayfanın “Google’da” olup olmadığını gösterir. Google’a göre `site:` araması her zaman eksiksiz değildir.',
    'Teknik nedenler çoğunlukla hızlı giderilir: unutulmuş bir `noindex`, engellenmiş bir `robots.txt`, yanlış canonical belirtimi, sunucu hataları ya da eksik bağlantılar. Google’a göre yeni bir sitenin fark edilmesi birkaç hafta sürebilir.',
    'Hiç kimse Google’da ilk sırayı garanti edemez. Güvenilir destek, Google’ın sayfalarınızı bulup okuyabilmesini ve anlamlandırabilmesini sağlar; belirli bir sıralama vaat etmez.',
  ],
  intro: [
    'Google’a şirket adınızı yazıyorsunuz ve siteniz çıkmıyor. Ya da çıkıyor ama müşterilerinizin kullandığı arama terimlerinde hiçbir yerde yok. İkisi aynı hissi verir ama nedenleri farklıdır.',
    'Bu rehber sorunun nerede olduğunu nasıl bulacağınızı gösterir: Sayfa dizinde mi, yalnızca kötü mü sıralanıyor, yoksa kendi kendini mi engelliyor? Ayrıca sık nedenleri ve yapabileceklerinizi anlatır. Google’la ilgili tüm ifadeler resmi belgelere dayanır (Ekim 2026 itibarıyla). Search Console’un arayüz terimlerini hem Türkçe hem İngilizce aslıyla veriyoruz; arayüzünüzün diline göre kullanabilirsiniz.',
  ],
  sections: [
    {
      id: 'iki-sorun',
      h2: 'Dizinde değil mi, yoksa yalnızca kötü sıralanıyor mu?',
      blocks: [
        { t: 'p', x: 'Google araması üç aşamada çalışır: Google sayfaları indirir (tarama, crawling), çözümleyip kaydeder (dizine ekleme, indexing) ve uygun aramalarda gösterir (arama sonuçlarının sunulması). Google’ın kendi anlatımına göre tüm sayfalar tüm aşamalardan geçmez ve dizine alınma garanti edilmez.' },
        {
          t: 'flow',
          label: 'Bir sayfanın Google aramasına giden yolu ve nerede takılabileceği',
          nodes: [
            { h: 'Google adresi tanır', x: 'Sayfa, bağlantılar ya da site haritanız üzerinden bilinir hâle gelir.', stop: 'Search Console “Bulundu: Şu anda dizine eklenmiş değil” der: Google adresi biliyor ama sayfayı henüz çağırmadı.' },
            { h: 'Tarama (crawling)', x: 'Google sayfayı indirir. Google’a göre bu birkaç gün ile birkaç hafta arasında sürebilir.', stop: 'çağrı başarısız olur: robots.txt sayfayı engeller, sayfa 404 hatası verir ya da sunucunuz 5xx hatası döndürür.' },
            { h: 'Dizine ekleme (indexing)', x: 'Google sayfayı çözümler ve dizinde saklar. Google’a göre dizine alınma garanti edilmez.', stop: 'Search Console “Tarandı: Şu anda dizine eklenmiş değil” der ya da sayfada noindex talimatı vardır.' },
            { h: 'Arama sonuçlarında gösterim', x: 'Uygun aramalarda Google sayfayı gösterir. Sayfanın nerede çıkacağı, diğerlerinin yanı sıra içeriğe, rekabete ve başka sitelerden gelen bağlantılara bağlıdır.', stop: 'URL Denetleme “URL Google’da mevcut” der ama müşterilerinizin kullandığı arama terimlerinde çok geridesiniz. O zaman konu teknik değil, içerik ve sıralamadır.' },
          ],
        },
        { t: 'p', x: 'Site sahibi olarak sizin için bu, “Beni bulamıyorlar” cümlesinin iki farklı anlama gelebileceği demektir.' },
        {
          t: 'table',
          caption: 'Farklı çözümleri olan iki sorun',
          head: ['Ölçüt', 'Sayfa dizinde değil', 'Sayfa dizinde ama kötü sıralanıyor'],
          rows: [
            ['Nasıl anlarsınız', 'Search Console’daki URL Denetleme aracı “URL Google’da yok” (URL is not on Google) der. Şirket adınızı aradığınızda da sayfa çıkmaz.', 'URL Denetleme “URL Google’da mevcut” (URL is on Google) der, ama müşterilerinizin kullandığı arama terimlerinde çok geridesiniz.'],
            ['Tipik nedenler', 'noindex veya robots.txt gibi engeller, sunucu hataları, sayfaya giden bağlantıların olmaması, çok yeni bir site', 'Güçlü rekabet, az faydalı veya birbirine benzeyen içerik, diğer sitelerden neredeyse hiç bağlantı gelmemesi'],
            ['Ne yardımcı olur', 'Teknik hataları gidermek, sayfaya bağlantı vermek, site haritası ve Search Console kullanmak', 'Daha iyi içerik, net sayfa yapısı, başka sitelerden bağlantılar, sabır'],
            ['Ne kadar sürer', 'Google’a göre tarama birkaç gün ile birkaç hafta arasında zaman alabilir', 'Google’a göre değişikliklerin etkisini göstermesi birkaç saatten birkaç aya kadar sürebilir'],
          ],
        },
      ],
    },
    {
      id: 'kontrol',
      h2: '1. Adım: Sayfanızın dizinde olup olmadığını kontrol edin',
      blocks: [
        {
          t: 'steps',
          items: [
            { h: 'Search Console’u kurun', x: 'Web sitenizi [Google Search Console](https://search.google.com/search-console/about?hl=tr) üzerinde doğrulayın. Araç ücretsizdir ve Google’ın sayfalarınız hakkında bildiklerini en güvenilir biçimde gösterir.' },
            { h: 'Tek bir sayfayı URL Denetleme ile test edin', x: 'Sayfanın adresini Search Console’un üstündeki arama alanına yazın. Araç “URL Google’da mevcut” (URL is on Google) ya da “URL Google’da yok” (URL is not on Google) sonucunu verir. “Canlı URL’yi test et” (Test live URL) sayfayı gerçek zamanlı olarak çağırır ve Google’ın sayfaya erişip erişemediğini gösterir.' },
            { h: 'Sayfa dizine ekleme raporunu açın', x: 'Rapor (Page indexing), Google’ın hangi sayfaları dizine ekleyebildiğini ve diğerlerinin neden eklenmediğini gösterir. Mesajları bir sonraki bölüm açıklar.' },
            { h: 'site: ile çapraz kontrol yapın', x: 'Google’a `site:alanadiniz.de` yazın. Sonuçlar, sayfaların dizinde olduğunu gösterir. Sayfaların görünmemesi ise bir şey kanıtlamaz: Google’a göre liste her zaman eksiksiz değildir. Bu durumda URL Denetleme aracını kullanın.' },
            { h: 'Şirket adını aratın', x: 'Önce şirket adınızı, ardından şirket adı ile şehir adını birlikte aratın. Benzersiz bir adı olan, dizine eklenmiş bir site genellikle bulunur; bu garanti edilmez.' },
          ],
        },
        { t: 'note', kind: 'info', title: 'Dizine eklenmemiş her sayfa sorun değildir', x: 'Google bile dizine eklenmeyen URL’lerin zorunlu olarak bir sorun olmadığını belirtir. Yönlendirmeler, kopyalar ya da teşekkür sayfaları gibi bilerek hariç tutulan sayfaların dizinde olmaması gerekir. Önemli olan, ana sayfanızın ve hizmet sayfalarınızın dizinde olmasıdır.' },
      ],
    },
    {
      id: 'mesajlar',
      h2: 'Search Console mesajlarını anlamak',
      blocks: [
        { t: 'p', x: 'Sayfa dizine ekleme raporu, dizine eklenmemiş sayfalar için bir neden bildirir. Aşağıda Google’ın Türkçe belgelerindeki adlarıyla en sık görülen mesajlar yer alır; İngilizce arayüz kullanıyorsanız ikinci sütundaki adlara bakın (Ekim 2026 itibarıyla).' },
        {
          t: 'table',
          caption: 'Sık görülen mesajlar ve yapabilecekleriniz',
          head: ['Mesaj (Türkçe arayüz)', 'İngilizce arayüzde', 'Anlamı', 'Yapabilecekleriniz'],
          rows: [
            ['Bulundu: Şu anda dizine eklenmiş değil', 'Discovered – currently not indexed', 'Google adresi biliyor ama sayfayı henüz çağırmadı.', 'Çoğu durumda sabır yeterli olur; iyi bir iç bağlantı yapısı yardımcı olur. Google’a göre tekrarlanan istekler süreci hızlandırmaz.'],
            ['Tarandı: Şu anda dizine eklenmiş değil', 'Crawled – currently not indexed', 'Google sayfayı çağırdı ama dizine almadı.', 'Google’a göre yeniden göndermek gerekmez; sayfa sonradan yine dizine eklenebilir. Sayfanın içeriğini ve bağlantılarını kontrol edin.'],
            ['URL “noindex” olarak işaretlenmiş', 'URL marked “noindex”', 'Sayfada noindex talimatı var ve Google bunu uygulamış.', 'Bu isteğinizse bir şey yapmayın. Değilse talimatı kaldırın.'],
            ['URL, robots.txt tarafından engellendi', 'URL blocked by robots.txt', 'robots.txt Google’ın sayfayı çağırmasını yasaklıyor.', 'Sayfa aramada çıksın istiyorsanız engeli kaldırın.'],
            ['Yönlendirmeli sayfa', 'Page with redirect', 'Adres başka bir adrese yönlendiriyor ve kendisi dizine eklenmiyor.', 'Bu normaldir. Önemli olan hedef sayfanın dizine eklenmesidir.'],
            ['Bulunamadı (404)', 'Not found (404)', 'Çağrı sırasında 404 hatası döndü.', 'Adresi onarın ya da yeni adrese yönlendirin; ayrıntılar için Almanca rehberimize bakın: [Kırık bağlantıları bulma ve düzeltme (Almanca)](/ratgeber/defekte-links-finden-beheben).'],
            ['Sunucu hatası (5xx)', 'Server error (5xx)', 'Sunucunuz çağrı sırasında 5xx hatası döndürdü.', 'Barındırma sağlayıcınıza başvurun; Almanca rehberimize bakın: [Web sitesine erişilemiyor (Almanca)](/ratgeber/website-nicht-erreichbar).'],
          ],
        },
      ],
    },
    {
      id: 'nedenler',
      h2: 'Sık görülen nedenler ayrıntılı olarak',
      blocks: [
        { t: 'p', x: 'Önce teknik nedenlere bakın. Çoğu hızlıca giderilir.' },

        { t: 'h3', x: '1. Unutulmuş bir noindex' },
        { t: 'p', x: '**Nasıl anlarsınız:** Sayfanın kaynak kodunda `<meta name="robots" content="noindex">` yazar ya da sunucu `X-Robots-Tag: noindex` HTTP başlığını gönderir. Yeniden tasarımdan (relaunch) sonra tipiktir: Talimat test sürümündeydi ve canlıya taşındı.' },
        { t: 'p', x: '**Çözüm:** Talimatı kaldırın. WordPress’te “Ayarlar → Okuma” (Settings → Reading) altında “Arama motoru görünürlüğü” (Search engine visibility) bölümündeki “Arama motorlarının bu siteyi dizine eklemesine engel olmaya çalış” (Discourage search engines from indexing this site) seçeneğinin işaretli olup olmadığına bakın. WordPress belgelerine göre bu seçenek 5.3 sürümünden beri her sayfanın başlığına `noindex,nofollow` ekler. Google’a göre Googlebot’un bir sayfayı yeniden ziyaret etmesi, sayfanın önemine bağlı olarak birkaç ay sürebilir. URL Denetleme’deki “Dizine ekleme iste” (Request indexing) seçeneğiyle Google’dan sayfaya daha erken bakmasını isteyebilirsiniz.' },

        { t: 'h3', x: '2. Engellenmiş bir robots.txt' },
        { t: 'p', x: '**Nasıl anlarsınız:** `alanadiniz.de/robots.txt` adresini açın. `User-agent: *` altında `Disallow: /` satırı varsa tüm site tarayıcılara kapalıdır. Search Console bu durumda “URL, robots.txt tarafından engellendi” (URL blocked by robots.txt) mesajını verir.' },
        { t: 'p', x: '**Çözüm:** Engeli kaldırın ya da yalnızca gerçekten özel bölümlerle sınırlayın. Unutmayın: `robots.txt` taramayı yönetir, dizine eklemeyi değil. Google’a göre sayfaları aramadan çıkarmak için kullanılmaz ve engellenmiş bir sayfaya başka sayfalar bağlantı veriyorsa yine de sonuçlarda görünebilir. Bir sayfayı aramadan uzak tutmak istiyorsanız `noindex` kullanın. Bunun için sayfa `robots.txt` ile engellenmemelidir; aksi hâlde Google talimatı göremez.' },

        { t: 'h3', x: '3. Yanlış canonical (standart adres) belirtimi' },
        { t: 'p', x: '**Nasıl anlarsınız:** Kaynak kodda `<link rel="canonical" href="…">` başka bir sayfaya işaret eder; örneğin test alan adına, ana sayfaya ya da `www` olmayan bir adrese. Canonical, bir sayfanın tercih edilen (standart) adresini bildiren etikettir; Google bunu, diğer adresin ana sürüm olduğuna dair bir ipucu olarak değerlendirir.' },
        { t: 'p', x: '**Çözüm:** Her sayfa canonical ile kendi tercih edilen adresini göstermelidir: `https` ile ve tutarlı yazımla.' },

        { t: 'h3', x: '4. Sunucu hataları ya da dışarıda bırakılan tarayıcılar' },
        { t: 'p', x: '**Nasıl anlarsınız:** Search Console “Sunucu hatası (5xx)” (Server error (5xx)) bildirir ya da URL Denetleme’nin canlı testi sayfayı çağıramaz. Güvenlik duvarı, bot koruması, parola koruması ya da bakım modu da Googlebot’u dışarıda bırakabilir.' },
        { t: 'p', x: '**Çözüm:** Barındırma sağlayıcınızı, güvenlik eklentilerini ve bakım modunu kontrol edin. Ara sıra yaşanan kesintilerde Almanca rehberimiz yardımcı olur: [Web sitesine erişilemiyor (Almanca)](/ratgeber/website-nicht-erreichbar).' },

        { t: 'h3', x: '5. Sayfaya bağlantı verilmemiş olması' },
        { t: 'p', x: '**Nasıl anlarsınız:** Sayfa hiçbir menüde yoktur ve başka hiçbir sayfa ona bağlantı vermez (yetim sayfa). Google’ın SEO başlangıç kılavuzuna göre Google sayfaları ağırlıklı olarak daha önce taranmış sayfalardaki bağlantılar üzerinden bulur.' },
        { t: 'p', x: '**Çözüm:** Sayfaya ana menüden veya konuyla ilgili sayfalardan, içeriğini anlatan bir bağlantı metniyle bağlantı verin.' },

        { t: 'h3', x: '6. Site yeni ya da yeni değiştirildi' },
        { t: 'p', x: '**Nasıl anlarsınız:** Site birkaç gündür ya da birkaç haftadır yayındadır ya da adresi yeni değişmiştir. Search Console “Bulundu: Şu anda dizine eklenmiş değil” der ya da henüz hiçbir şey göstermez.' },
        { t: 'p', x: '**Çözüm:** Search Console’u ve site haritasını kurun (aşağıya bakın) ve bekleyin. Google’a göre yeni bir sitenin ya da mevcut bir sitedeki değişikliklerin fark edilmesi birkaç hafta sürebilir.' },

        { t: 'h3', x: '7. Tarandı ama dizine eklenmedi' },
        { t: 'p', x: '**Nasıl anlarsınız:** Durum “Tarandı: Şu anda dizine eklenmiş değil”. Google sayfayı okudu ve şimdilik dizine almamaya karar verdi. Search Console bir neden belirtmez.' },
        { t: 'p', x: '**Çözüm:** Google’a göre yeniden göndermek gerekmez. Bunun yerine sayfanın kendi amacı ve özgün, faydalı bir içeriği olup olmadığına, sitenizdeki diğer sayfalardan ayrışıp ayrışmadığına ve iyi bağlanıp bağlanmadığına bakın. Çok ince ya da birbirine benzeyen sayfaları yeniden yazın veya başka sayfalarla birleştirin.' },

        { t: 'h3', x: '8. Yalnızca JavaScript ile görünen içerik' },
        { t: 'p', x: '**Nasıl anlarsınız:** Sayfada gördüğünüz metin kaynak kodda yoktur (tarayıcıda “Sayfa kaynağını görüntüle”). Metin sonradan yüklenir.' },
        { t: 'p', x: '**Çözüm:** Google JavaScript’i işleyebilir, ancak sayfa işlenmeyi daha uzun bekleyebilir. Google, site hem kullanıcılar hem tarayıcılar için daha hızlı olacağından sunucu tarafı oluşturmayı (server-side rendering) veya önceden oluşturmayı (pre-rendering) önermeye devam eder. Önemli metinler ve bağlantılar HTML’de olmalıdır.' },

        { t: 'h3', x: '9. Manuel işlem ya da güvenlik sorunu' },
        { t: 'p', x: '**Nasıl anlarsınız:** Search Console’da “Manuel işlemler” (Manual actions) veya “Güvenlik sorunları” (Security issues) raporları bir kayıt gösterir. Manuel işlemi Google, bir inceleyici sayfaların spam kurallarını ihlal ettiğini saptadığında uygular. O zaman tüm site ya da tek tek sayfalar arama sonuçlarından kaybolabilir. Güvenlik sorunları örneğin ele geçirilmiş siteleri ilgilendirir.' },
        { t: 'p', x: '**Çözüm:** Mesajı okuyun, nedeni giderin (örneğin siteye yerleştirilmiş spam içeriği) ve ardından siteyi Search Console üzerinden yeniden incelemeye gönderin.' },

        { t: 'h3', x: '10. Yönlendirme olmadan yeniden tasarım ya da taşıma' },
        { t: 'p', x: '**Nasıl anlarsınız:** Yeniden tasarımdan ya da alan adı değişikliğinden sonra eski adresler hata (404) verir ve görünürlük çöker.' },
        { t: 'p', x: '**Çözüm:** Her eski adresi 301 yönlendirmesiyle uygun yeni sayfaya yönlendirin, iç bağlantıları güncelleyin ve yönlendirmeleri Google’a göre mümkün olduğunca uzun, genel olarak en az bir yıl koruyun. Örnekler için Almanca rehberimize bakın: [Kırık bağlantıları bulma ve düzeltme (Almanca)](/ratgeber/defekte-links-finden-beheben).' },
      ],
    },
    {
      id: 'dizine-ekleme',
      h2: '2. Adım: Sayfalarınızı dizine eklettirmek',
      blocks: [
        {
          t: 'steps',
          items: [
            { h: 'Engelleri kaldırın', x: 'noindex, robots.txt, canonical, parola koruması ve bakım modunu kontrol edin. En etkili adım budur.' },
            { h: 'Site haritası hazırlayın', x: 'Site haritası önemli sayfalarınızı listeler. Google’a göre zorunlu değildir ama sayfaların keşfedilmesine yardım eder. WordPress 5.5 sürümünden beri `/wp-sitemap.xml` adresinde kendisi bir tane üretir; SEO eklentileri çoğu zaman kendi haritalarını oluşturur. Search Console’da “Site Haritaları” (Sitemaps) altında `https://` dahil tam adresi gönderin.' },
            { h: 'Önemli sayfaları kontrol edip dizine eklenmesini isteyin', x: 'Ana sayfanızı ve en önemli hizmet sayfalarınızı URL Denetleme ile kontrol edin ve “Dizine ekleme iste” (Request indexing) seçeneğini kullanın. Google’a göre dizine ekleme işlemi genellikle bir gün kadar sürer, bazı durumlarda daha uzun; garanti verilmez. İstekler için günlük bir sınır vardır ve aynı adresi birden çok kez göndermek hiçbir şeyi hızlandırmaz.' },
            { h: 'İç bağlantılar kurun', x: 'Her önemli sayfaya menüden veya ilgili sayfalardan ulaşılabilmelidir. “Buraya tıklayın” yerine hedefi anlatan bağlantı metinleri kullanın.' },
            { h: 'Dışarıdan bağlantılar kazanın', x: 'Google sayfaları ağırlıklı olarak bağlantılar üzerinden bulduğundan gerçek atıflar yardımcı olur: Google İşletme Profiliniz, sektör ve oda dizinlerindeki kayıtlar, ortak siteler, dernekler ve birlikler, bölgesel medya. Bağlantı satın almayın: Satın alınan bağlantılar Google’da bağlantı spam’i sayılır.' },
            { h: 'Sabır ve kontrol', x: 'Değişikliklerden sonra karar vermeden önce birkaç hafta bekleyin. Google kendisi birkaç saatten birkaç aya kadar süreler belirtir. Sayfa dizine ekleme raporunu bir ila iki hafta sonra, ardından aylık kontrol edin.' },
          ],
        },
      ],
    },
    {
      id: 'yerel',
      h2: 'Yerel olarak bulunmak: Google İşletme Profili',
      blocks: [
        { t: 'p', x: 'Şehir adı içeren yerel aramalarda, örneğin “Berlin tesisatçı”, web sitelerinin yanı sıra aramada ve Google Haritalar’da Google İşletme Profili de görünebilir. Google’a göre ücretsiz ekleyebilir veya hak talebinde bulunabilirsiniz. Web sitenizin dizine eklenmesinin yerini tutmaz ama onu tamamlar.' },
        {
          t: 'ul',
          items: [
            'Ad, adres, telefon numarası, çalışma saatleri ve hizmetlerinizi eksiksiz ve doğru girin.',
            'Ad, adres ve telefon numarasını web sitenizde ve Impressum’da yazıldığı gibi kullanın.',
            'Web sitenizin adresini ekleyin. Ziyaretçilerin sizi bulabileceği bir başka bağlantıdır.',
            'Bilgileri güncel tutun; örneğin tatilde ya da çalışma saatleri değiştiğinde.',
          ],
        },
      ],
    },
    {
      id: 'siralama',
      h2: 'Dizinde ama zor bulunuyor: Sıralamada neler önemli?',
      blocks: [
        { t: 'p', x: 'Sayfa dizinde olduğu hâlde müşterilerinizin arama terimlerinde çok geride çıkıyorsa, sorun nadiren teknik bir hatadır. O zaman konu içerik, ilgililik ve güvendir. Google, kendi açıklamasına göre sıralama sistemlerini kullanıcılara faydalı ve güvenilir bilgileri öne çıkaracak şekilde kurar.' },
        {
          t: 'ul',
          items: [
            '**Her hizmet için bir sayfa:** Her hizmetin kendi başlığı ve kendi metni olan ayrı bir sayfası olsun; her şeyi ana sayfada toplamayın.',
            '**Müşterilerinizin dili:** Müşterileriniz nasıl arıyorsa öyle yazın ve yerel çalışıyorsanız şehri ve hizmet bölgesini belirtin.',
            '**Anlamlı başlık:** Her sayfanın, konuyu birkaç kelimeyle anlatan kendi `<title>` etiketi olmalıdır. Arama sonucunda çoğu zaman başlık olarak görünür.',
            '**Güven işaretleri:** eksiksiz Impressum, ulaşılabilir iletişim bilgileri, gerçek referanslar ve değerlendirmeler. Teklifin arkasında kimin durduğu belli olmalıdır.',
            '**Teknik altyapı düzgün:** Mobil görünüm, yüklenme süresi ve çalışan bağlantılar temeldir. Ayrıntılar için Almanca rehberlerimize bakın: [Web sitesini mobil uyumlu yapma (Almanca)](/ratgeber/website-mobil-optimieren) ve [Web sitesi yavaş yükleniyor (Almanca)](/ratgeber/website-laedt-langsam).',
          ],
        },
        { t: 'note', kind: 'warn', title: 'Garantilere karşı dikkatli olun', x: 'Google’a göre hiç kimse size ilk sırada yer almayı garanti edemez. Sıralama garantisi veren ya da Google’a özel erişim iddia eden sağlayıcılara şüpheyle yaklaşın. Google, organik aramaya dahil edilmek veya daha iyi sıralanmak için ücret almaz.' },
      ],
    },
    {
      id: 'kacinin',
      h2: 'Kaçınmanız gerekenler',
      blocks: [
        {
          t: 'ul',
          items: [
            'Aynı adresi dizine eklenmesi için tekrar tekrar göndermek: Google’a göre hiçbir şeyi hızlandırmaz ve günlük sınırı tüketir.',
            'Bağlantı satın almak veya bağlantı paketlerinde takas yapmak: Satın alınan bağlantılar Google’da bağlantı spam’i sayılır.',
            'Başka sitelerden içerik kopyalamak ya da yalnızca şehir adı farklı, neredeyse aynı metinli çok sayıda sayfa oluşturmak. Bu tür sayfalar ziyaretçilerden çok sıralamaya hizmet eder ve Google, kazıma (scraping) ve toplu üretilen içerikleri spam kurallarında sayar.',
            'Bir siteyi yönlendirme olmadan taşımak.',
            'Test sırasında `noindex` koyup canlıya geçerken kaldırmayı unutmak.',
          ],
        },
      ],
    },
    {
      id: 'yardim',
      h2: 'Ne zaman yardım almalısınız?',
      blocks: [
        { t: 'p', x: 'Yukarıdaki adımlardan sonra bir neden bulamıyorsanız, yeniden tasarımdan sonra görünürlük düştüyse ya da Search Console güvenlik sorunları veya manuel işlemler bildiriyorsa yardım almak mantıklıdır.' },
        { t: 'note', kind: 'info', title: 'Ücretsiz kontrolümüz burada neyi gösterir', x: '[Ücretsiz site kontrolü](/website-check?lang=tr), ana sayfanın noindex ile dışarıda bırakılıp bırakılmadığını, robots.txt’in tüm siteyi engelleyip engellemediğini, başlık ve açıklamanın eksik olup olmadığını ve bir site haritasının bulunup bulunmadığını dışarıdan görür. Google’ın bir sayfayı gerçekten dizine ekleyip eklemediğini ve aramada nerede durduğunu yalnızca siz Search Console’da görürsünüz.' },
        { t: 'p', x: 'Küçük SEO düzeltmeleri [Hızlı düzeltme](/website-repair?lang=tr) hizmetimizin kapsamındadır ({price.quick}, {time.quick}). Birden fazla sorun bir araya geliyorsa Site onarımı ({price.repair}) uygundur. Fiyatlar nettir; %19 KDV eklenir. Google’da belirli bir sıralama vaat etmiyoruz, çünkü hiç kimse bunu garanti edemez.' },
      ],
    },
  ],
  faq: [
    { q: 'Yeni web sitem Google’da ne zaman görünür?', a: 'Google’a göre yeni bir sitenin ya da mevcut bir sitedeki değişikliklerin fark edilmesi birkaç hafta sürebilir. Search Console, site haritası ve başka sitelerden gelen bağlantılarla Google’ın sizi bulmasına yardımcı olursunuz. Kesin bir süre taahhüdü yoktur.' },
    { q: 'Sitem yayında ama Google’da bulamıyorum. Neden?', a: 'Sık nedenler: Site hâlâ yeni, bir `noindex` ya da engellenmiş bir `robots.txt` siteyi dizinin dışında tutuyor ya da başka hiçbir sayfa siteye bağlantı vermiyor. Search Console’daki URL Denetleme ile kontrol edin.' },
    { q: '“Bulundu: Şu anda dizine eklenmiş değil” ne demek?', a: 'Google adresi biliyor ama sayfayı henüz çağırmamış. Çoğu durumda sabır yeterlidir; iyi bir iç bağlantı yapısı da yardımcı olur. Google’a göre tekrar göndermek süreci hızlandırmaz.' },
    { q: '“Tarandı: Şu anda dizine eklenmiş değil” ne demek?', a: 'Google sayfayı çağırmış ama dizine eklememiştir. Google’a göre sayfa sonradan yine eklenebilir ve yeniden göndermek gerekmez. Sayfanın özgün, faydalı bir içeriği olup olmadığını ve iyi bağlanıp bağlanmadığını kontrol edin.' },
    { q: 'Web sitemi Google’a kaydettirmem gerekiyor mu?', a: 'Hayır. Google siteleri ağırlıklı olarak bağlantılar üzerinden kendiliğinden bulur. Search Console ve site haritası yine de yararlıdır: Sorunları gösterir ve Google’ın sayfalarınızı keşfetmesine yardım eder.' },
    { q: 'Google İşletme Profili müşterilerin beni bulması için yeterli mi?', a: 'Yerel aramalar için anlamlı ve ücretsiz bir kanaldır; ancak web sitenizin dizine eklenmesinin yerini tutmaz. İkisi birbirini tamamlar.' },
    { q: 'Biri Google’da 1. sırada olacağımı garanti edebilir mi?', a: 'Hayır. Google’a göre hiç kimse ilk sırada yer almayı garanti edemez. Bunu vaat eden sağlayıcılara şüpheyle yaklaşın.' },
  ],
  service: 'check',
  related: ['web-sitesi-bakimi', 'impressum-zorunlulugu'],
  sources: [
    { label: 'Google: Google Arama’nın işleyiş şekli', url: 'https://developers.google.com/search/docs/fundamentals/how-search-works?hl=tr' },
    { label: 'Google: Sayfa dizine ekleme raporu', url: 'https://support.google.com/webmasters/answer/7440203?hl=tr' },
    { label: 'Google: URL Denetleme aracı', url: 'https://support.google.com/webmasters/answer/9012289?hl=tr' },
    { label: 'Google: Sitenizin yeniden taranmasını isteme', url: 'https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl?hl=tr' },
    { label: 'Google: noindex ile dizine eklemeyi engelleme', url: 'https://developers.google.com/search/docs/crawling-indexing/block-indexing?hl=tr' },
    { label: 'Google: robots.txt’e giriş', url: 'https://developers.google.com/search/docs/crawling-indexing/robots/intro?hl=tr' },
    { label: 'Google: site: arama operatörü', url: 'https://developers.google.com/search/docs/monitor-debug/search-operators/all-search-site?hl=tr' },
    { label: 'Google: Sitenizin Google’da yer alması', url: 'https://developers.google.com/search/docs/fundamentals/get-on-google?hl=tr' },
    { label: 'Google: SEO başlangıç kılavuzu', url: 'https://developers.google.com/search/docs/fundamentals/seo-starter-guide?hl=tr' },
    { label: 'Google: URL değişikliği olan site taşıma', url: 'https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes?hl=tr' },
    { label: 'Google: JavaScript SEO temelleri', url: 'https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics?hl=tr' },
    { label: 'Google: Spam politikaları', url: 'https://developers.google.com/search/docs/essentials/spam-policies?hl=tr' },
    { label: 'Google: Manuel işlemler raporu', url: 'https://support.google.com/webmasters/answer/9044175?hl=tr' },
    { label: 'Google: SEO’ya ihtiyacınız var mı?', url: 'https://developers.google.com/search/docs/fundamentals/do-i-need-seo?hl=tr' },
    { label: 'Google: Faydalı ve güvenilir içerik oluşturma', url: 'https://developers.google.com/search/docs/fundamentals/creating-helpful-content?hl=tr' },
    { label: 'Google: İşletme Profili ekleme veya hak talebinde bulunma', url: 'https://support.google.com/business/answer/2911778?hl=tr' },
    { label: 'WordPress (İngilizce): Ayarlar › Okuma, arama motoru görünürlüğü', url: 'https://wordpress.org/documentation/article/settings-reading-screen/' },
    { label: 'WordPress (İngilizce): 5.5 sürümünde XML site haritaları', url: 'https://make.wordpress.org/core/2020/07/22/new-xml-sitemaps-functionality-in-wordpress-5-5/' },
  ],
  published: '2026-10-01',
  modified: '2026-10-02',
};
