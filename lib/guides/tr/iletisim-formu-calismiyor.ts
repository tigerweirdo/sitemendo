import type { Guide } from '../types';

export const iletisimFormuCalismiyor: Guide = {
  lang: 'tr',
  translationOf: 'kontaktformular-funktioniert-nicht',
  slug: 'iletisim-formu-calismiyor',
  category: 'Formulare',
  check: 'forms',
  short: 'İletişim formu çalışmıyor',
  title: 'İletişim formu çalışmıyor: nedenler ve çözüm',
  h1: 'İletişim formu çalışmıyor: e-postalar neden ulaşmıyor?',
  description: 'İletişim formundan gelen talepler ulaşmıyor mu? PHP mail()’den SPF ve DKIM’e kadar sık nedenler ve sorunu kalıcı olarak nasıl çözeceğiniz.',
  teaser: 'Form “Gönderildi” diyor ama gelen kutusu boş: yedi neden, on dakikalık bir test ve kalıcı çözüm.',
  tldr: [
    'Formdaki başarı mesajı, iletinin ulaştığını kanıtlamaz. Çoğu zaman yalnızca sunucunun e-postayı göndermek üzere kabul ettiğini gösterir.',
    'Sık nedenler, e-postaların basit PHP işlevi `mail()` ile gönderilmesi ve alan adınıza ait olmayan bir gönderen adresidir. E-posta sağlayıcıları bu tür iletileri şüpheli sayar.',
    'Gönderim; alan adınızda ayrı bir gönderen posta kutusu, SMTP ile gönderim ve SPF, DKIM ve DMARC DNS kayıtlarıyla güvenilir hâle gelir.',
    'İletileri ek olarak sitede de saklayın ve formu en az ayda bir kez yabancı bir adresle test edin.',
  ],
  intro: [
    'İleti ulaştırmayan bir iletişim formu, hiç form olmamasından daha kötüdür: Ziyaretçiler size ulaştıklarını sanır, siz ise bundan hiç haberdar olmazsınız. İşin sinsi yanı şu: Hata fark edilmez. Sayfa “Teşekkürler” der, gelen kutusu sessiz kalır.',
    'Bu rehber, formunuzun çalışıp çalışmadığını on dakikada nasıl test edeceğinizi, yedi sık nedeni nasıl tanıyacağınızı ve gönderimi kalıcı olarak nasıl güvenilir hâle getireceğinizi gösterir. Teknik adımları barındırma (hosting) sağlayıcınıza ya da web geliştiricinize devredebilirsiniz.',
  ],
  sections: [
    {
      id: 'test',
      h2: 'Önce test edin: İleti gerçekten ulaşıyor mu?',
      blocks: [
        { t: 'p', x: 'Sayfadaki başarı mesajına güvenmeyin. Yolu gelen kutusuna kadar kontrol edin.' },
        {
          t: 'steps',
          items: [
            { h: 'Yabancı bir adresle doldurun', x: 'Formu başka bir sağlayıcıdan bir adresle doldurun; örneğin özel bir GMX, WEB.DE ya da Gmail hesabıyla. Alıcı adresinin kendisini kullanmayın: Aksi hâlde gönderen adresindeki hata fark edilmez.' },
            { h: 'Gelen kutusunu ve spam klasörünü kontrol edin', x: 'En fazla 15 dakika bekleyin. Gelen kutusuna, spam (istenmeyen e-posta) klasörüne ve varsa karantina ya da filtre klasörlerine bakın.' },
            { h: 'Gönderen doğrulamasına bakın', x: 'İleti ulaşırsa, iletinin üstbilgisindeki (header) doğrulama sonuçlarına bakın. Gmail’de bunun için “Orijinali göster” (Show original) seçeneğini açın; diğer sağlayıcılar üstbilgiyi (“Header”) benzer adlarla gösterir. Orada SPF, DKIM ve DMARC sonuçları (PASS veya FAIL) yer alır.' },
            { h: 'Gönderirken hata olup olmadığına dikkat edin', x: 'Göndermeden önce tarayıcının geliştirici araçlarını (`F12`) ve “Ağ” (Network) sekmesini açın. Gönderim sırasında istek 403, 404 ya da 500 gibi bir durum koduyla başarısız olursa sorun zaten formun kendisindedir.' },
            { h: 'İkinci bir alıcı adresi deneyin', x: 'Deneme amacıyla başka bir sağlayıcıdan ikinci bir alıcı adresi tanımlayın. İleti orada ulaşıyorsa sorun kendi posta kutunuzda, filtrelerinde ya da yönlendirmelerindedir.' },
          ],
        },
        {
          t: 'table',
          caption: 'Gözlem ve olası neden',
          head: ['Gözlem', 'Olası neden', 'Ayrıntı'],
          rows: [
            ['Gönderirken hata mesajı ya da Ağ sekmesinde hata kodu', 'Formun kendisi bozuk: eklenti, betik, güvenlik duvarı veya spam koruması', '5 ila 7. nedenler'],
            ['Başarı mesajı var, ama ne gelen kutusunda ne de spam klasöründe bir şey yok', 'Sunucu göndermiyor ya da ileti yolda reddediliyor', '1 ila 3. nedenler'],
            ['İleti spam klasöründe', 'Gönderen doğrulanmamış ya da gönderen adresi yabancı', '2 ve 3. nedenler'],
            ['A adresiyle yapılan test ulaşıyor, B adresiyle ulaşmıyor', 'Form, ziyaretçinin adresini gönderen olarak kullanıyor; B’nin sağlayıcısı daha katı', '2. neden'],
            ['Bir alıcı adresine ulaşıyor, diğerine ulaşmıyor', 'Posta kutusu, filtre ya da yönlendirme', '4. neden'],
          ],
        },
      ],
    },
    {
      id: 'nedenler',
      h2: 'En sık görülen yedi neden',
      blocks: [
        { t: 'h3', x: '1. Basit PHP işlevi mail() ile gönderim' },
        { t: 'p', x: 'Başka bir kurulum yapılmadıysa birçok form e-postalarını web sunucusunun `mail()` işleviyle gönderir. WordPress de varsayılan olarak böyle yapar. Sorun şu: İşlev, sunucu iletiyi kabul eder etmez “başarılı” bildirir. PHP el kitabı bunun iletinin alıcıya ulaştığı anlamına gelmediğini açıkça belirtir. WordPress belgeleri de `wp_mail()` işlevinin olumlu dönüş değerinin yalnızca isteğin hatasız işlendiği anlamına geldiğini netleştirir.' },
        { t: 'p', x: 'Buna şu da eklenir: Web sunucusu çoğu zaman alan adınız adına yetkili gönderen olarak kayıtlı değildir (bkz. 3. neden) ve bazı barındırma paketleri gönderimi kısıtlar ya da `mail()` işlevini kapatır. Barındırma sağlayıcınıza gönderimin izinli olup olmadığını ve hangi sınırların geçerli olduğunu sorun.' },

        { t: 'h3', x: '2. Gönderen adresi alan adınıza ait değil' },
        { t: 'p', x: 'Birçok form, gönderen (`From`) olarak ziyaretçinin girdiği adresi yazar. Alıcı sunucu için bu, web sunucunuzun `gmx.de` ya da `yahoo.com` adına ileti göndermiş olması gibi görünür. Tam da sahteciliğin kalıbı budur: Sunucunuz bu alan adları için gönderen olarak kayıtlı değildir; bu yüzden doğrulama başarısız olur.' },
        { t: 'p', x: 'Sonrasında ne olacağını, ziyaretçinin sağlayıcısı DMARC politikasıyla belirler. Herkese açık DNS kayıtları şunu gösteriyor (Ekim 2026 itibarıyla): Yahoo `p=reject` ister, yani alıcı sunucular bu iletileri reddetmelidir. GMX ve WEB.DE `p=quarantine` uygular; bu iletiler şüpheli sayılır ve çoğunlukla spam klasörüne düşer. Gmail, Outlook.com ve T-Online şu anda `p=none` kullanıyor. Hatanın çoğu zaman fark edilmemesinin nedeni budur: Yalnızca belirli sağlayıcıların ziyaretçilerini etkiler ve kendi adresinizle yapılan test çalışır.' },
        { t: 'p', x: '**Çözüm:** Gönderen (`From`) olarak her zaman kendi alan adınızdaki bir adresi kullanın ve ziyaretçinin adresini yanıt adresi (`Reply-To`) olarak girin. Böylece “Yanıtla” rahat kalır ve ileti doğrulamayı geçer.' },
        { t: 'code', label: 'Bir form iletisinin üstbilgileri böyle görünmelidir', x: 'From: Web sitesi formu <form@alanadiniz.de>\nTo: info@alanadiniz.de\nReply-To: ziyaretci@ornek.de' },
        { t: 'p', x: 'Gönderen adresi, alan adınızda gerçek bir posta kutusu olmalıdır. Var olmayan bir adres, bazı alıcıların iletiyi reddetmesine yol açar.' },

        { t: 'h3', x: '3. E-posta kimlik doğrulaması eksik ya da hatalı (SPF, DKIM, DMARC)' },
        { t: 'p', x: 'Alan adınızın DNS’inde üç kayıtla iletinin gerçekten sizden geldiğini kanıtlarsınız. Bunlar olmadan alıcılar iletilerinizi daha kolay şüpheli sayar. Google, 1 Şubat 2024’ten beri Gmail adreslerine gönderen herkesten en az SPF veya DKIM ister. Gmail adreslerine günde 5.000 veya daha fazla ileti gönderenlerin SPF ve DKIM’in yanı sıra DMARC de kurması gerekir. Gönderenler bunu karşılamazsa iletileri spam olarak işaretlenebilir veya beklendiği gibi teslim edilmeyebilir.' },
        { t: 'p', x: 'Kayıtların nasıl göründüğünü [SPF, DKIM ve DMARC kurulumu](/rehber/iletisim-formu-calismiyor#dns) bölümü gösterir.' },

        { t: 'h3', x: '4. Alıcı, posta kutusu ya da filtre' },
        {
          t: 'ul',
          items: [
            'Alıcı adresinde yazım hatası; örneğin alan adı değişikliğinden sonra ya da eski bir çalışanın adresinde.',
            'Posta kutusu dolu ya da adres artık yok. İleti o zaman geri döner ya da kaybolur.',
            'Posta kutusundaki kurallar, spam filtreleri ya da yönlendirmeler form iletilerini taşır veya siler.',
            'Web sitesi oluşturucularda alıcı adresi oluşturucunun form ayarlarında yazılıdır. Hesap ya da alan adı değişikliğinden sonra eski kalmış olabilir.',
          ],
        },

        { t: 'h3', x: '5. Eklenti, betik ya da güvenlik duvarı çakışmaları' },
        { t: 'p', x: 'Modern formlar arka planda JavaScript ile, AJAX ya da bir REST arayüzü üzerinden gönderir. Bir güvenlik duvarı, güvenlik eklentisi ya da önbellek eklentisi bu isteği engellerse ya da başka bir betik JavaScript hatası üretirse “Gönder”e tıkladığınızda hiçbir şey olmaz ya da genel bir hata mesajı çıkar. Geliştirici araçlarındaki Ağ sekmesi, hangi isteğin hangi durum koduyla başarısız olduğunu gösterir.' },
        { t: 'p', x: 'Test amacıyla güvenlik, önbellek ve optimizasyon alanlarındaki eklentileri sırayla devre dışı bırakın; mümkünse önce sitenin bir kopyasında. Öncesinde bir yedek alın.' },

        { t: 'h3', x: '6. Spam koruması çok katı ya da yanlış kurulmuş' },
        { t: 'p', x: 'Captcha hizmetleri, gizli tuzak alanları (“honeypot”) ve spam filtreleri botlara karşı korur ancak gerçek talepleri de engelleyebilir: Bir captcha hizmetinin anahtarları (artık) doğru değilse, doğrulama tarayıcı ayarları ya da eklentiler yüzünden yapılamıyorsa ya da bir filtre gerçek iletileri spam sayıyorsa. Eklentinizin spam işaretli iletileri ayrı bir yerde toplayıp toplamadığına bakın ve captcha hizmetinin anahtarlarını kontrol edin.' },

        { t: 'h3', x: '7. Formun kendisinde teknik hatalar' },
        {
          t: 'ul',
          items: [
            'Form hedef olarak `mailto:` kullanır. O zaman kendisi hiçbir şey göndermez: Tarayıcıya göre bir e-posta programı açılır ya da hiçbir şey olmaz.',
            'İletiyi işleyen betik taşıma sonrasında eksiktir ya da daha yeni bir PHP sürümünde artık çalışmaz.',
            'Sayfa HTTPS ile yüklenmesine rağmen form `http://` ile başlayan bir adrese gönderir. Tarayıcılar bu konuda uyarır ya da göndermeyi engeller. Ayrıntılar için Almanca rehberimize bakın: [HTTPS ve SSL hataları (Almanca)](/ratgeber/https-ssl-fehler-beheben).',
            'Zorunlu alanlar ya da bir gizlilik onay kutusu telefonda kullanılamaz; örneğin başka bir öğe üstünü kapattığı için. Formu bu yüzden mobil cihazda da test edin.',
          ],
        },
      ],
    },
    {
      id: 'cozum',
      h2: 'Gönderimi kalıcı olarak güvenilir hâle getirmek',
      blocks: [
        {
          t: 'ol',
          items: [
            '**Gönderen posta kutusu oluşturun:** E-posta sağlayıcınızda alan adınızda ayrı bir posta kutusu açın; örneğin `form@alanadiniz.de`.',
            '**Üstbilgileri doğru ayarlayın:** `From` bu posta kutusudur, `Reply-To` form alanındaki adres, `To` ise sizin alıcı posta kutunuzdur.',
            '**SMTP ile gönderin:** Formun iletiyi `mail()` yerine bu posta kutusu üzerinden SMTP ile göndermesini sağlayın. Sunucuyu, kullanıcı adını ve şifrelemeyi e-posta sağlayıcınız bildirir. WordPress’te bunu bir SMTP eklentisi üstlenir.',
            '**DNS kayıtlarını kontrol edin:** Alan adınız için SPF, DKIM ve DMARC kurulu olmalıdır (aşağıya bakın).',
            '**İletileri ek olarak saklayın:** Contact Form 7’de bunu örneğin [Flamingo](https://wordpress.org/plugins/flamingo/) eklentisi üstlenir; diğer form eklentilerinin kendi kayıt listesi vardır. Böylece gönderim aksadığında hiçbir talep kaybolmaz.',
            '**Ziyaretçiye geri bildirim verin:** Net bir başarı mesajı ya da teşekkür sayfası gösterin; hata olduğunda e-posta adresinizi bir çıkış yolu olarak içeren anlaşılır bir mesaj verin.',
            '**Yeniden test edin:** Testi en az iki yabancı adresle tekrarlayın ve SPF, DKIM ve DMARC’ın “PASS” gösterip göstermediğine bakın.',
            '**Sürekli kontrol edin:** Takviminize, formu her ay ve ayrıca barındırma, alan adı, e-posta sağlayıcısı ya da eklentilerde her değişiklikten sonra test etmek için sabit bir tarih yazın.',
          ],
        },
        { t: 'note', kind: 'tip', title: 'Erişim bilgilerini hazır tutun', x: '1 ila 4. adımlar için e-posta sağlayıcınıza ve alan adınızın DNS yönetimine erişiminiz olmalıdır. DNS yönetimi çoğunlukla alan adı sağlayıcısında ya da barındırma sağlayıcısındadır.' },
      ],
    },
    {
      id: 'dns',
      h2: 'SPF, DKIM ve DMARC kurulumu',
      blocks: [
        { t: 'p', x: 'Kayıtları alan adınızın DNS’inde oluşturursunuz. Tam değerleri e-posta sağlayıcınız bildirir; buradaki örnekler yer tutucudur.' },
        {
          t: 'table',
          caption: 'Üç kayda genel bakış',
          head: ['Kayıt', 'DNS’te nerede', 'Ne için', 'Örnek (yer tutucu)'],
          rows: [
            ['SPF', '`alanadiniz.de` için TXT kaydı', 'Alan adınız adına hangi sunucuların e-posta gönderebileceğini belirler', '`v=spf1 include:spf.eposta-saglayici.example ~all`'],
            ['DKIM', '`secici._domainkey.alanadiniz.de` için TXT kaydı', 'Dijital imza: İletinin alan adınızdan geldiğini ve yolda değiştirilmediğini kanıtlar', 'Seçici ve anahtarı e-posta sağlayıcınız verir'],
            ['DMARC', '`_dmarc.alanadiniz.de` için TXT kaydı', 'SPF ve DKIM’i geçemeyen iletilere ne yapılacağını belirler ve raporları açar', '`v=DMARC1; p=none; rua=mailto:dmarc@alanadiniz.de`'],
          ],
        },
        {
          t: 'ul',
          items: [
            'Alan adı başına yalnızca bir SPF kaydı olabilir. Standarda (RFC 7208) göre birden çok kayıt hataya yol açar. Tüm gönderenleri ortak bir kayda yazın.',
            'SPF en fazla on DNS sorgusuna izin verir (`include`, `a`, `mx` ve diğerleri sayılır). Tek kayıtta çok fazla hizmet, kaydı geçersiz kılar.',
            'DMARC’a `p=none` ile başlayın: Politika yalnızca gözlemler ve rapor üretir. Raporlar temizse `quarantine` ya da `reject` seviyesine sıkılaştırılabilir.',
          ],
        },
        { t: 'note', kind: 'warn', title: 'Önce adınıza kimlerin gönderdiğini kontrol edin', x: 'SPF ve DMARC’ı yalnızca alan adınızla şimdiye kadar hangi hizmetlerin e-posta gönderdiğini biliyorsanız değiştirin; örneğin bülten aracı, fatura programı ya da CRM. Aksi hâlde onların iletileri birdenbire ulaşmayabilir.' },
      ],
    },
    {
      id: 'veri-koruma',
      h2: 'İletişim formunda veri koruma',
      blocks: [
        {
          t: 'ul',
          items: [
            'Formun hemen yanında gizlilik politikanıza (Datenschutzerklärung) bağlantı verin. Bu yaygındır ve veri toplanırken bilgilendirme yükümlülüğünü karşılar (DSGVO madde 13).',
            'Yalnızca yanıtlamak için gereken bilgileri isteyin.',
            'Saklanan iletilerin ne kadar süre tutulacağını belirleyin ve sonrasında silin.',
            'Gönderim, spam koruması ya da saklama için harici hizmetler kullanıyorsanız bunlar gizlilik politikasında yer almalıdır. Sağlayıcıyla genellikle DSGVO madde 28 uyarınca bir veri işleme sözleşmesi (Auftragsverarbeitungsvertrag) gerekir. Bazı captcha hizmetlerinde ayrıca onay gerekebilir.',
          ],
        },
        { t: 'p', x: 'Bu genel bir yönlendirmedir, hukuki danışmanlık değildir. Özel soruları uzman bir kuruluşla netleştirin.' },
      ],
    },
    {
      id: 'yardim',
      h2: 'Ne zaman yardım almalısınız?',
      blocks: [
        { t: 'p', x: 'Testlerden sonra neden belirsiz kalıyorsa, DNS yönetimine ya da posta kutusuna erişiminiz yoksa ya da iletiler yalnızca bazı gönderenlerde eksikse yardım almak mantıklıdır.' },
        { t: 'p', x: 'İletişim formu sorunları [Hızlı düzeltme](/website-repair?lang=tr) hizmetimizin kapsamındadır ({price.quick}, {time.quick}). Birden fazla sorun bir araya geliyorsa Site onarımı ({price.repair}) uygundur. Fiyatlar nettir; %19 KDV eklenir. Hangi paketin uygun olduğunu ücretsiz kontrolden sonra söyleriz.' },
        { t: 'note', kind: 'info', title: 'Ücretsiz kontrolün burada yapabildiği', x: 'Ücretsiz kontrolümüz, sayfadaki bir formun nasıl gönderildiğini dışarıdan görür. İletinin posta kutunuza ulaşıp ulaşmadığı dışarıdan güvenilir biçimde kontrol edilemez; bunun için ek erişime ya da sizin teyidinize ihtiyaç duyarız.' },
      ],
    },
  ],
  faq: [
    { q: 'Formum neden “Mesaj gönderildi” diyor ama hiçbir şey ulaşmıyor?', a: 'Mesaj çoğunlukla yalnızca sunucunun iletiyi göndermek üzere kabul ettiğini gösterir. Teslim edilip edilmeyeceğine alıcı sağlayıcı karar verir; bunu SPF, DKIM, DMARC ve gönderen adresine göre yapar. Spam klasörüne ve iletinin üstbilgisindeki doğrulama sonuçlarına bakın.' },
    { q: '“From” ile “Reply-To” arasındaki fark nedir?', a: '“From” iletinin göndereni demektir ve kendi alan adınızdan bir adres olmalıdır. “Reply-To” yanıtınızın kime gideceğini belirler; burada ziyaretçinin adresi. Böylece yanıtlamak rahat kalır ve ileti sahte görünmez.' },
    { q: 'İletiler neden yalnızca bazı ziyaretçilerde spam klasörüne düşüyor?', a: 'Çoğunlukla form, ziyaretçinin adresini gönderen olarak kullandığı için. Yahoo, GMX ve WEB.DE gibi sağlayıcıların DMARC politikaları katıdır; Gmail, Outlook.com ve T-Online’ınki ise değil (Ekim 2026 itibarıyla). Bu yüzden kendi adresinizle yapılan test çoğu zaman yine de çalışır.' },
    { q: 'SMTP eklentisine ihtiyacım var mı?', a: 'WordPress’te `mail()` ile gönderim güvenilir çalışmıyorsa olağan yol budur: Eklenti iletiyi web sunucusu yerine kimliği doğrulanmış bir posta kutusu üzerinden gönderir. Diğer sistemlerde ve oluşturucularda gönderimi ayarlardan yaparsınız. Erişim bilgilerini e-posta sağlayıcınız verir.' },
    { q: 'Formu ne sıklıkla test etmeliyim?', a: 'En az ayda bir kez ve barındırma, alan adı, e-posta sağlayıcısı, eklentiler ya da temadaki her değişiklikten sonra. Takvimde sabit bir tarih, unutmamanıza yardımcı olur.' },
    { q: 'İletişim formu sunmak zorunda mıyım?', a: 'Hayır. Talepleri iyi görünür bir e-posta adresi ya da telefon numarası üzerinden de alabilirsiniz. Impressum’da hangi iletişim bilgilerinin bulunması gerektiğini [Impressum rehberimiz](/rehber/impressum-zorunlulugu) açıklar.' },
  ],
  service: 'repair',
  related: ['web-sitesi-bakimi', 'impressum-zorunlulugu'],
  sources: [
    { label: 'Google: Gmail e-posta gönderen yönergeleri', url: 'https://support.google.com/mail/answer/81126?hl=tr' },
    { label: 'Google: E-postanın üstbilgisinin tamamını görüntüleme', url: 'https://support.google.com/mail/answer/29436?hl=tr' },
    { label: 'PHP el kitabı (İngilizce): mail()', url: 'https://www.php.net/manual/en/function.mail.php' },
    { label: 'WordPress geliştirici belgeleri (İngilizce): wp_mail()', url: 'https://developer.wordpress.org/reference/functions/wp_mail/' },
    { label: 'IETF (İngilizce): RFC 7208 (SPF)', url: 'https://www.rfc-editor.org/rfc/rfc7208.html' },
    { label: 'IETF (İngilizce): RFC 9989 (DMARC)', url: 'https://www.rfc-editor.org/rfc/rfc9989.html' },
    { label: 'WordPress.org (İngilizce): Flamingo, iletileri saklama', url: 'https://wordpress.org/plugins/flamingo/' },
  ],
  published: '2026-10-01',
  modified: '2026-10-01',
};
