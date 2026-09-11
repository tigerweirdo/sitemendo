# Sitemendo — Görev Dokümantasyonu

## Proje gereksinimleri

- Next.js / React tabanlı Sitemendo landing page
- Yerel çalıştırma: `npm install`, `.env.example` → `.env.local`, `npm run dev`
- Adres: `http://localhost:3000`
- Canlı: https://sitemendo.com (`www` da açık; eski: https://sitemendo.vercel.app)
- GitHub: https://github.com/tigerweirdo/sitemendo
- Alan adı: Cloudflare Registrar (`gail` / `rajeev` NS). Nameserver’ı Vercel’e taşıma; mail yönlendirme Cloudflare’da kalacak.
- Ortam değişkenleri: `RESEND_API_KEY`, `AUDIT_FROM_EMAIL`, `AUDIT_NOTIFY_EMAIL`, `NEXT_PUBLIC_PRIVACY_URL`, `NEXT_PUBLIC_IMPRESSUM_URL`, `NEXT_PUBLIC_DEMO_MODE`

## Metin ve içerik kuralları (2026-09-11)

Sitemendo metinleri adım adım yenilenirken:

- Sitemendo hizmet markası olarak öne çıkar. Kurucu hikâyesi, kişisel fotoğraf veya bireysel portfolyo yok.
- Marka “biz” diliyle konuşabilir. Ekip büyüklüğü, uzman kadro, müşteri sayısı veya referans uydurulmaz.
- Dil sakin, açık, özenli ve somut olur.
- “Ne bozuk”, “sitelere bakıyoruz”, “satın alma yok” gibi ifadeler kullanılmaz.
- “Dijital çözümler”, “işinizi geleceğe taşıyoruz”, “kusursuz performans” gibi genel veya kanıtlanamayan ifadeler kullanılmaz.
- Ana hizmet: web sitesi kontrolü, düzeltme ve bakım. Ücretsiz kontrol bu hizmete giriş adımıdır.
- Berlin konum bilgisidir, ikinci plandadır. Yalnız Berlin’e hizmet izlenimi yaratılmaz.
- Küçük işletme hedefi her bölümde tekrarlanmaz.
- Görsel kimlik, renkler, logo ve çalışan özellikler korunur.
- TR / DE / EN arasında anlam ve hizmet kapsamı tutarlıdır.
- Fiyat, teslim süresi, garanti veya hizmet koşulu uydurulmaz (mevcut 0 / 250 / 450 / 79 €, 48 saat, 2–5 iş günü korunur).
- Mevcut kullanıcı değişiklikleri ezilmez. Deploy, push veya gerçek form gönderimi yapılmaz.

## Görevler

### 2026-09-11 — Bütüncül kontrol: içerik, SEO, görsel

Doğrulanan hatalar düzeltildi. URL yapısı aynı kaldı (`?lang=`). Deploy / push yok.

İçerik:
- EN hero son cümle ve meta description TR/DE ile aynı hizmeti anlatacak şekilde hizalandı.
- EN CTA metinleri “Request a free check” olarak birleştirildi.
- DE kapsam notu “Verwaltungsmenü” → “Verwaltungsbereich” (SSS ile aynı).
- Kullanılmayan `sec.checks` “bakıyoruz” ifadesi çıkarıldı.
- Onay maili: “satın alma yok”, “tüm site”, “bakıyoruz” kalktı; teslim site ile aynı 48 saat. 2 iş günü yalnız acil düzeltme kartında duruyor.
- OG görseli “Berlin · web kontrolü” yerine “kontrol · düzeltme · bakım”. Alt metin aynı konumlandırma.

SEO (mevcut `?lang=` yapısı, göç yok):
- `app/robots.ts`, `app/sitemap.ts` eklendi. Sitemap: `/`, `/privacy`, `/impressum` ve EN/DE `?lang=` karşılıkları. `/api/` yok. `?lang=tr` yok (kanonik TR parametresiz).
- Canonical + hreflang + x-default gerçek URL’lere bağlandı. Next metadata API kök yolda sorgu dizgisini düşürdüğü için bağlantılar `SeoLinks` ile basılıyor.
- Dil seçici taranabilir `<a href="?lang=…">`; tıklanınca mevcut istemci seçimi duruyor.
- `html lang` istekteki `?lang=` ile uyumlu (middleware başlığı).

Görsel / işlev:
- Mobil menü açıkken bölüm bağlantısı kaydıramıyordu (`body` kilidi). Menü kapanınca anında hedefe gidiyor.
- 375 / 390 / 768 / 1440 taşma, menü, dil, form adımları Brave’de denendi.

Doğrulama: `tsc --noEmit`; `scripts/verify-form-faq.ts`; `scripts/verify-review-pass.mjs` (robots, sitemap, hreflang, tarayıcı); `next build` geçti. `next lint` ESLint config olmadığı için sihirbaz açtı; lint kurulmadı, lint geçti diye sayılmadı. Gerçek e-posta teslimatı yok.

Değişen dosyalar: `lib/content.ts`, `lib/seo.ts`, `lib/auditMail.ts`, `app/layout.tsx`, `app/page.tsx`, `app/privacy/page.tsx`, `app/impressum/page.tsx`, `app/robots.ts`, `app/sitemap.ts`, `app/opengraph-image.png`, `app/opengraph-image.alt.txt`, `app/globals.css`, `middleware.ts`, `components/LanguageSwitch.tsx`, `components/SeoLinks.tsx`, `components/Site.tsx`, `scripts/verify-review-pass.mjs`, `scripts/build-og.mjs`, `DOKUMANTASYON.md`.

### 2026-09-11 — Form mikro metinleri ve SSS

Form ve sık sorulan sorular yeni marka diline çekildi. Üç dil (TR / EN / DE) güncellendi. Fiyat, süre ve kapsam uydurulmadı. Desteklenen altyapı listesi genişletilmedi (yalnız mevcut WordPress ifadesi). Güvenlik garantisi eklenmedi.

Form:
1. Başta site adresi ve e-postanın ikisinin de gerektiği açık (hero ve `#start`).
2. Hata / gönderim / başarı metinleri istenen dilde. Canlı başarı yalnız `mode === 'live'` iken: “Talebiniz alındı.” + 48 saat açıklaması.
3. Demo yanıtı canlı başvuru gibi gösterilmiyor; “canlı başvuru alınmadı / hiçbir bilgi gönderilmedi”.
4. Hata olunca url ve e-posta korunuyor. Gönderim kilidi çift başvuruyu kesiyor.
5. Etiket (`htmlFor` / `id`), `aria-required`, `aria-invalid`, `role="alert"`, gönderimde `aria-live`, başarıda `role="status"` ve odak yönetimi (yalnız gönderilen form örneği).

SSS (7 soru): ücretsiz kontrol içeriği; rapor süresi (48 saat, belirtilen e-posta); düzeltmenin zorunlu olmadığı; ücret (250 € / 450 €’dan / 79 €/ay, mevcut koşullar); erişim (ücretsiz için adres yeter; panel / yedek / e-posta teslimatı ek erişim isteyebilir); desteklenen siteler (dışarıdan erişilebilen işletme siteleri, WordPress dahil); diller (TR / EN / DE).

Doğrulama:
- `tsc --noEmit`
- `scripts/verify-form-faq.ts` — url/e-posta hataları, alanların korunması, demo ≠ canlı başarı, gönderim kilidi, mock `fetch` (demo / live / 502)
- SSR GET TR/EN/DE: 7 SSS ve “iki alan gerekir” metni HTML’de
- Headless Brave: boş url → hata + odak/aria; geçerli url → e-posta adımı; geçersiz e-posta → hata, bilgiler duruyor; mock demo → canlı başarı yok; mock live → “Talebiniz alındı.” + 48 saat; mock 502 → fail + mailto, bilgiler duruyor; çift tık → tek istek; 375 px taşma yok; EN/DE url hatası

Gerçek `/api/audit` çağrısı yok. **Gerçek e-posta teslimat testi yapılmadı.** Deploy / push yok.

Değişen dosyalar: `lib/content.ts`, `lib/formFlow.ts`, `lib/auditRequest.ts`, `components/Site.tsx`, `app/globals.css`, `scripts/verify-form-faq.ts`, `scripts/verify-form-browser.mjs`, `tsconfig.json`, `DOKUMANTASYON.md`.

### 2026-09-11 — Kontrol kapsamı ve hizmet kartları

Fiyatlar doğrulandı ve değiştirilmedi: 0 €, 250 €, 450 €’dan, 79 € / ay. Süreler aynı: 48 saat, 2 iş günü, 5 iş günü, ayda 30 dakika.

Yapılanlar:
1. Ücretsiz kontrol sekiz maddesi dışarıdan doğrulanabilir kapsama çekildi. “Her bağlantı”, “altyapı güncel”, “mesaj gelen kutusuna ulaştı” kalktı.
2. Kapsam notu eklendi: dışarıdan erişilen bölümler; panel, yedek, e-posta teslimatı ek erişim isteyebilir.
3. Ücretsiz kart çıktısı: rapor + öncelik listesi + 48 saat.
4. 250 € sabit paket; “fiyat rapordan sonra belli olur” bu karttan çıktı. Not: kapsam işlem öncesinde netleşir. 2–3 sorun sınırı duruyor.
5. Tam onarım: “teklifte belirlenen düzeltmeler”, başlangıç fiyatı 450 €’dan, 5 iş günü. “Bütün sorunlar” kalktı.
6. Bakım: izleme / bildirim / müdahale ayrıldı. Yedek = durum kontrolü, yedekleme hizmeti değil. 30 dakika duruyor.

Doğrulama: `tsc --noEmit`. SSR TR/EN/DE: fiyatlar aynı; “fiyat rapordan sonra” yok; 250 € kartında bir kez “kapsam işlem öncesinde”; 450 € kartında bir kez “başlangıç fiyatı / teklif”. Form gönderilmedi; deploy/push yok.

Değişen dosyalar: `lib/content.ts`, `components/Site.tsx`, `app/globals.css`, `DOKUMANTASYON.md`.

Kaynakta olmayan, bu turda uydurulmayan işletme kararları: KDV / vergi ifadesi; bakım iptal ve ihbar süresi; kesintiye müdahale süresi (yalnız bildirim var); 30 dakikayı aşan işin ücreti; ücretsiz kontrolde sayfa sayısı; yazılım güncellemesinin hangi sistemleri ve hangi erişimi kapsadığı; 250 € paketinin KDV’si ve 2 gün aşılırsa ne olacağı; 450 € tavanı.

### 2026-09-11 — Bölüm sırası, yaklaşım, örnek rapor, süreç

Ana sayfa istenen sıraya çekildi. Yeni bölüm eklenmedi; karar cümlesi ve “nasıl çalışır” altındaki tekrar güvence satırı kaldırıldı (ücretsiz / satın alma her yerde tekrarlanmasın diye). İletişim yaklaşım bloğundan çıktı; footer’da duruyor.

Sıra ve ID’ler: `#top` → `#report` → `#about` → `#checks` → `#how` → `#services` → `#faq` → `#start` → `#contact`. Menü: Kontrol kapsamı, Nasıl çalışır, Hizmetler, Sorular (sayfa sırasıyla).

Metin:
- Yaklaşım (`#about`): “Önce tespit. Sonra net bir plan.” + inceleme / düzeltme / bakım + iş, ücret, süre netleşir.
- Örnek rapor: yeni açıklama; “temsili örnek, gerçek müşteri sonucu değil”; 03 bulgu = 03 sayaç; “iki bağlantı” = 02 hata; 4,8 sn ve 41/100 kalktı.
- Nasıl çalışır: paylaşın → raporu alın → sonraki adımı seçin.
- Footer: “Web sitesi kontrolü, düzeltme ve bakım.”
- Bölüm başlıkları: Kontrol kapsamı, Hizmetler ve fiyatlar, Sık sorulan sorular. TR/EN/DE aynı anlam.

Doğrulama: `tsc --noEmit`. SSR HTML: ID sırası ve menü bağlantıları doğru; Hakkımızda / karar cümlesi yok. EN/DE yaklaşım, örnek not, süreç ve footer doğrulandı. Form gönderilmedi; deploy/push yok. Cursor tarayıcısı yoktu; tıklayarak kaydırma bu turda ölçülmedi (bağlantı hedefleri HTML’de duruyor).

Değişen dosyalar: `components/Site.tsx`, `lib/content.ts`, `app/globals.css`, `lib/useActiveSection.ts`, `DOKUMANTASYON.md`.

Kalan belirsizlik: kontrol maddeleri hâlâ “bakıyoruz” dilinde. SSS ücretsiz/satın alma sorularını tutuyor (o bölümün işi). Onay maili ve 48 saat / 2 iş günü farkı duruyor.

### 2026-09-11 — İlk ekran metinleri (hero + form)

Ana sayfanın ilk ekranı yeni hizmet diline çekildi. Form adımları, palet ve çalışan özellikler aynı.

Yapılanlar:
1. Hero: “Web siteniz için kontrol, düzeltme ve bakım.” + iki cümlelik açıklama. Zorunlu satır sonu yok. Berlin yalnızca küçük konum satırı: “Berlin merkezli” / “Based in Berlin” / “Sitz in Berlin”.
2. Form (yalnız hero): başlık “Ücretsiz site kontrolüyle başlayın.”, açıklama (adres + e-posta, 48 saat). İlk adım düğmesi “Devam et”. E-posta düğmesi “Kontrol talebini gönder”. Güvence: “Ücretsiz rapor. Düzeltme hizmeti isteğe bağlı.” İkincil bağlantı `#report`: “Örnek raporu inceleyin”.
3. Menü CTA: “Ücretsiz kontrol isteyin”. 401–1023 px’te kısa etiket (“Kontrol”) — uzun metin header’ı sıkıştırmasın diye.
4. EN/DE doğal hizmet dili; kelimesi kelimesine değil. Sekme/OG/manifest “ne bozuk” ve Berlin+küçük işletme vaadinden çıktı; ilk ekranla aynı kapsam.
5. Yerleşim: hero metin sütunu biraz genişledi, form başlığı/güvence/bağlantı için küçük bloklar, mobilde alan ve düğme tam genişlik, taşma yok.

Doğrulama: `tsc --noEmit`. Headless Brave: 1440 / 375 / 320, TR/EN/DE. Yatay kaydırma yok; h1’de `<br>` yok. Örnek rapor bağlantısı `#report` (rapor üstü ~134 px). URL → e-posta: “Kontrol talebini gönder”, 375’te taşma yok. Form gönderilmedi, deploy/push yok.

Değişen dosyalar: `lib/content.ts`, `components/Site.tsx`, `app/globals.css`, `app/manifest.ts`, `app/opengraph-image.alt.txt`, `DOKUMANTASYON.md`.

Kalan belirsizlik: hakkımızda / footer / SSS / onay maili hâlâ eski dilde (“bakıyoruz”, “satın alma yok”, Berlin+küçük işletme). Alt form (`#start`) aynı düğme ve güvenceyi kullanır; hero başlığı/örnek linki orada yok. 48 saat (site) ile 2 iş günü (mail hesabı) duruyor.

### 2026-09-11 — Metin iyileştirme: keşif ve plan (kod yok)

Amaç: metin ve içerik yapısını adım adım yenilemek. Bu turda kod değişmedi; dosyalar ve plan çıkarıldı.

#### Mimari (metin nerede)

Tek içerik modeli: `lib/content.ts` (`Record<Lang, Copy>`, `tr` / `en` / `de`). Ayrı JSON/i18n dosyası yok.

Ana sayfa tek bileşende: `components/Site.tsx`

| Bölüm | id | Kaynak |
|---|---|---|
| Menü + CTA | header | `nav`, `a11y` |
| Hero + form | `#top` | `hero`, `form` |
| Hakkımızda | `#about` | `about` + `lib/company.ts` iletişim |
| Kontrol kapsamı | `#checks` | `checksTitle`, `checksSub`, `checks[]` |
| Rapor örneği | `#report` | `reportTitle`, `findings`, `sampleReport`, `checklist` |
| Karar cümlesi | (id yok) | `statementA`, `statementSub` |
| Hizmetler | `#services` | `servicesTitle`, `services[]`, `after`, `servicesCta` |
| Süreç | `#how` | `howTitle`, `steps`, `assure` |
| SSS | `#faq` | `faqTitle`, `faq[]` |
| Son form | `#start` | `final` + aynı `form` |
| Footer | `#contact` | `footer` + sabit `Berlin, {country}` |

Yasal sayfalar: `app/privacy/page.tsx`, `app/impressum/page.tsx` → `components/LegalPage.tsx` → `content.legal` + `content.meta`. Impressum’da kişi adı ve Berlin adresi yasal blokta (`lib/company.ts`); ana sayfada kişi yok.

Form akışı (kod, metin değil):

1. `AuditFormProvider` — hero ve `#start` aynı state (`url` → `email` → `done`)
2. `sessionStorage` (`lib/formPersist.ts`); yasal sayfadan dönüşte `#start`
3. `POST /api/audit` (`lib/auditRequest.ts` doğrulama, `lib/auditRateLimit.ts`)
4. Canlı: Resend — ziyaretçiye `confirmEmail`, iç bildirim `notifyEmail` (`lib/auditMail.ts`)
5. Demo: `{ mode: "demo" }`, gerçek gönderim yok

Metadata:

- `app/layout.tsx` — çerez diline göre `title` / `description` / OG / Twitter
- `app/page.tsx`, `privacy`, `impressum` — `?lang` + çerez (`lib/lang.ts` `resolveLang`)
- İstemci dil değişince `lib/useLangDocument.ts` `document.title` ve meta günceller
- `middleware.ts` `?lang` → `sitemendo.lang` çerezi
- Dil dışı / tek dil: `app/manifest.ts`, `app/opengraph-image.alt.txt`

`content.sec` ve `content.talk` tanımlı, bileşende kullanılmıyor.

#### Kurala takılan mevcut metinler

Üç dilde aynı sorunlar:

- Hero / sekme / OG: “ne bozuk” / “what’s broken” / “was … kaputt ist”
- Hakkımızda + meta: Berlin + küçük işletme birlikte, hizmet alanı gibi
- Nav / bölüm / adım: “bakıyoruz” / “look after” / “sehen nach”
- Form mikro + SSS + onay maili: “Satın alma yok” / “Nothing to buy” / “Nichts zu kaufen”
- Footer etiketi: küçük işletme tekrarı
- Hizmet başlığı “Kontrol ve düzeltme” — bakım üçüncü ana hizmet olarak görünmüyor
- `manifest.ts` ve OG alt metni yalnız TR ve Berlin merkezli
- Onay maili dipnotu sabit `Sitemendo · Berlin`; konu “bakmaya başlıyoruz”

Korunacaklar: palet, logo, çakı, form mantığı, fiyatlar, mevcut süreler, Impressum yasal kimlik, çalışan özellikler.

#### Uygulama planı (sonraki adımlar)

Her adımda önce TR, sonra aynı anlamda DE/EN. CSS / form gönderimi / deploy / push yok.

1. **Hero, menü, metadata** — marka + ana hizmet; “bozuk/kaputt” kalkar; ücretsiz kontrol giriş adımıdır.
2. **Hakkımızda + footer** — “biz” marka dili; Berlin ikinci planda; küçük işletme her yerde tekrarlanmaz.
3. **Kontrol kapsamı + nasıl çalışır** — “bakıyoruz” kalkar; sekiz madde ve üç adım aynı kapsamda kalır.
4. **Hizmetler + karar + SSS + form mikro** — kontrol / düzeltme / bakım; ücretsiz kontrol giriş; “satın alma yok” kalkar; fiyat ve süre uydurulmaz.
5. **Onay maili + manifest + OG alt** — sitedeki vaatle aynı; Berlin dipnotu konum düzeyinde.
6. **Tutarlılık taraması** — üç dil, kullanılmayan anahtarlar, 48 saat (site) ile 2 iş günü (mail hesabı) belirsizliği.

Bu tur: kod yok. Değişen dosya: `DOKUMANTASYON.md`. Kontrol: kaynak okuma. Form gönderilmedi, deploy/push yok.

Kalan belirsizlik: sitedeki “48 saat” ile maildeki “2 iş günü” hesabı zaten farklı; yeni süre uydurulmayacak, sonraki adımda hangisinin ziyaretçiye söyleneceği netleşmeli. `talk` / `sec` silinsin mi, kalsın mı ayrı karar.

### 2026-09-10 — Hero ve menü hareketleri (ikinci paket)

İlk paketten sonra hareketsiz kalan tek yer hero'ydu; menü de sayfanın neresinde olunduğunu göstermiyordu.

Yapılanlar:
1. Hero açılışı saf CSS (`hero-rise`, `hero-fade-up`, `rule-draw`): başlık bölüm başlıkları gibi maskeden yükseliyor, alt metin ve form kısa kaymayla geliyor, formun üst çizgisi çiziliyor. Sunucudan gelen ilk boyamada oynuyor, JS'i beklemiyor; hareket azaltılmışsa kapalı. Formun çizgisi de artık `--rule` ile çizilen arka plan.
2. Çakı parallax'ı: hero kaydırılırken çakı 80px geride kalıyor ve 4° dönüyor (GSAP scrub). Yalnız ≥1000px, iki sütunlu düzende; tek sütunda altındaki formun üstüne binerdi. Yakın planda dönüşte keskinlik kaybı görülmedi.
3. Okuma çubuğu: menünün alt çizgisi sayfa ilerledikçe 2px sülfürle doluyor (`--progress`, `.nav::after`). Mobil menü açıkken gizli.
4. Aktif bölüm: `lib/useActiveSection.ts` (IntersectionObserver, ekranın üstten %40 hizası). Menüde ve mobil menüde `aria-current="true"`, dil seçicideki gibi sülfür alt çizgi. Hareket değil konum bilgisi; hareket azaltılmışken de çalışır. Hero, hakkımızda, rapor, karar cümlesi ve son formda hiçbir bağlantı işaretli değil.

Doğrulama: `tsc --noEmit`; headless Chromium (CDP): hero açılışı düz yüklemede ilk karede başlıyor (masaüstü ve mobil), karelerde yatay kaydırma yok. Çakı 0 → 34px / -1.7° (300px kaydırma) → 78px / -3.9° (600px); mobilde ve hareket azaltılmışken sabit. Okuma çubuğu 0 → 0.5 → 1, hareket azaltılmışken yok. Aktif bölüm her bölümde doğru, DE'ye geçince de. İlk paketin kontrolü değişmedi.

Değişen dosyalar: `lib/useActiveSection.ts` (yeni), `lib/useScrollMotion.ts`, `components/Site.tsx`, `app/globals.css`, `DOKUMANTASYON.md`.

### 2026-09-10 — Kaydırma hareketleri (ilk paket)

Site düz duruyordu. Önceki revizyonda bilinçli olarak eklenmeyen kaydırma hareketi, tasarım diline uygun ölçüde geldi: çizgiler çiziliyor, başlıklar maskeden yükseliyor, zıplama yok. GSAP + ScrollTrigger (zaten kuruluydu); tek kaynak `lib/useScrollMotion.ts`.

Yapılanlar:
1. Hairline'lar çizilerek geliyor: bölüm üstleri, kontrol / hizmet / adım / SSS satırları, rapor bulguları. Çizgi artık şeffaf border + arka plan; `--rule` (0–1, `@property`, kalıtılmaz) soldan sağa çiziyor. Liste çizgileri satırın üstüne, kapanış çizgisi kapsayıcıya taşındı; ölçüler aynı. Adımlarda ayırıcılar yukarıdan aşağı.
2. h2'ler kendi alt kenarındaki maskeden yükseliyor (`yPercent` + `clip-path` birlikte). SplitText yok: dil değişince React metni DOM'da günceller, bölünmüş satırlar bunu bozardı. Başlığın alt metni kısa kaymayla geliyor (`data-reveal`).
3. Kontrol, hizmet, adım ve SSS satırları: önce üst çizgi, sonra içerik.
4. Örnek rapor: belge gelir, mürekkep çizgi çizilir, sayaç `00 → 03`, bulgular sırayla, önem etiketi damga gibi iner.
5. Karar cümlesi: kelimeler kaydırdıkça griden mürekkebe dolar (scrub).
6. SSS cevabı yumuşak açılıp kapanıyor (`::details-content` + `interpolate-size`; desteklemeyen tarayıcıda bugünkü gibi anında), ok dönerek.

Kurallar: yalnız ilk boyamada ekranda olmayan öğeler gizlenir; JS yoksa ya da hareket azaltılmışsa hiçbir şey gizlenmez. Gizleme `opacity` ile, klavye odağı kesilmez. Her öğenin tek, duraklatılmış bir hareketi var, tetik yalnız oynatır; böylece dil değişiminde geri alma öğeyi temiz bırakır. Form adımı, SSS ve rapor listesi sayfa boyunu değiştirince tetikler `ResizeObserver` ile yenilenir. Hero'ya dokunulmadı.

Doğrulama: `tsc --noEmit`; headless Chromium (CDP), 1440×900 ve 375×812: ilk ekranda gizlenen öğe yok, tam kaydırmadan sonra gizli öğe 0, yatay kaydırma yok. Sayfa ortasında TR → DE: başlıklar Almanca, ekrandaki öğeler görünür, konsolda yeni hata yok. `prefers-reduced-motion: reduce`: gizli öğe yok, sayaç 03. JS kapalı: çizgiler tam. Test sırasında iki hata çıktı ve düzeltildi: `contextSafe` iki GSAP bağlamını birbirine ekleyip dil değişiminde sonsuz döngüye sokuyordu; ayrı `set` + `to` dil değişiminde öğeleri gizli bırakıyordu.

Bu işten önce de vardı: `BrandMark` hydration uyarısı (daire `cx` değeri sunucu ve tarayıcıda son basamakta farklı), autoprefixer `align-items: end` uyarısı.

Değişen dosyalar: `lib/useScrollMotion.ts` (yeni), `components/Site.tsx`, `app/globals.css`, `DOKUMANTASYON.md`.

### 2026-09-10 — Impressum kişi adı

Diensteanbieter: `Mete Han Çetiner`, altında Sitemendo, sonra Baerwaldstraße. Ana sayfada isim yok.

Değişen dosyalar: `lib/company.ts`, `components/LegalPage.tsx`, `DOKUMANTASYON.md`.

### 2026-09-10 — Impressum adresi

Hizmet sağlayıcı bloğuna `Baerwaldstraße 70, 10961 Berlin` (Kreuzberg PLZ). Footer’da yalnızca Berlin kaldı. Kişi adı hâlâ yok.

Değişen dosyalar: `lib/company.ts`, `components/LegalPage.tsx`, `DOKUMANTASYON.md`.

### 2026-09-10 — Gerçek telefon

Yer tutucu `+49 155 12345678` kalktı. Site, Impressum, WhatsApp ve onay maili `lib/company.ts` üzerinden `+49 155 10913380` (`tel:+4915510913380`, `wa.me/4915510913380`).

Değişen dosyalar: `lib/company.ts`, `DOKUMANTASYON.md`.

### 2026-09-10 — Sekme ikonu: siyah kare kalktı

Vercel sarı kutu gösteriyordu: C, siyah kareyi dolduruyordu. Kullanıcı sekmede siyah zemin istemedi. `icon.svg` / `favicon.ico` yine şeffaf; sarı C + mürekkep kontur (açık sekmede okunur). Apple ikonu kâğıt zemin (iOS şeffaf ikon istemez). OG kartı siyah kalır, o sekme değil.

Doğrulama: 16/32 şeffaf PNG; kâğıt / beyaz / koyu zemin; `tsc`.

Değişen dosyalar: `lib/mark.json`, `lib/mark.ts`, `scripts/build-icons.mjs`, `app/icon.svg`, `app/favicon.ico`, `app/apple-icon.png`, `app/opengraph-image.png`, `components/BrandMark.tsx`, `DOKUMANTASYON.md`.

### 2026-09-10 — İkon sistemi (Vercel / sekme / Apple / paylaşım)

Vercel ve koyu zeminlerde şeffaf C’nin içi boş yay gibi duruyordu. Tek kaynak `lib/mark.json`: mürekkep kare, kalın sarı puan halkası (C). `scripts/build-icons.mjs` → `icon.svg`, `favicon.ico` (16/32/48), `apple-icon.png` (180), `opengraph-image.png` (1200×630). Çakı amblemi aynı yoldan (`BrandMark`). `metadataBase` `https://sitemendo.com`.

Doğrulama: 16/32/48/180 PNG; OG kartı; `tsc`; production build; `/favicon.ico` `/icon.svg` `/apple-icon.png` `/opengraph-image`.

Değişen dosyalar: `lib/mark.json`, `lib/mark.ts`, `components/BrandMark.tsx`, `components/HeroKnife.tsx`, `scripts/build-icons.mjs`, `app/icon.svg`, `app/favicon.ico`, `app/apple-icon.png`, `app/opengraph-image.png`, `app/opengraph-image.alt.txt`, `app/manifest.ts`, `app/layout.tsx`, `app/globals.css`, `middleware.ts`, `package.json`, `README.md`, `DOKUMANTASYON.md`.

### 2026-09-10 — Mail tasarımı: onay ve bildirim yeniden

Onay maili fişten mektuba döndü: referans numarası (`SM-…`), kesin teslim tarihi, 3 adımlı “sırada ne var”, raporda bakılacak 8 başlık (`content.ts`’teki başlıklar, tek kaynak), iletişim (e-posta / telefon / WhatsApp), footer’da Impressum ve Gizlilik bağlantıları. Bildirim maili: site adı başlıkta, vurgulu teslim tarihi, müşterinin dilinde açılan “Müşteriye yanıt yaz” taslağı, PageSpeed / SSL Labs / W3C / Google bağlantıları. Beyaz zemin, görselsiz metin ağırlıklı düzen ve tablo tabanlı yerleşim korundu; telefonda tek sütun.

Teslim 2 iş günü: cumartesi-pazar sayılmaz, hafta sonu gelen istek pazartesi 09:00’da başlar (Berlin saati). Perşembe 14:32 → pazartesi 14:32. Sitedeki “48 saat” metni değişmedi.

Doğrulama: `tsc --noEmit`, `npm run build`; WebKit ile 640 / 375 px tam boy render; kötü niyetli e-posta / URL girdisi kaçışlı; HTML 13–19 KB (Gmail 102 KB’ta keser). Gerçek gönderim (Gmail / Outlook) bu oturumda test edilmedi.

Değişen dosyalar: `lib/auditMail.ts`, `app/api/audit/route.ts`, `lib/company.ts`, `DOKUMANTASYON.md`.

### 2026-09-10 — Mail: siyah / beyaz / sarı

Onay ve admin mailleri krem zeminden çıktı. Beyaz sayfa, 1px mürekkep çerçeve, üstte 6px sülfür şerit, `SITEMENDO.`, sarı etiket (48 saat / Yeni istek), veri satırında sarı sol çizgi. Gmail’de krem palet durmuyordu.

Değişen dosyalar: `lib/auditMail.ts`, `DOKUMANTASYON.md`.

### 2026-09-10 — Admin mail hello@ döngüsünde kalıyordu

Resend `from=hello@` `to=hello@` gönderiyordu; Cloudflare yönlendirme bunu bırakıyor (`sent`, Gmail’e düşmez). Bildirim artık doğrudan gelen kutuya. Mail, sitedeki rapor belgesi: kâğıt `#F3F1EA`, mürekkep çerçeve, `SITEMENDO.`; sarı blok yok.

Değişen dosyalar: `lib/auditMail.ts`, `app/api/audit/route.ts`, `.env.example`, `README.md`, `DOKUMANTASYON.md`.

### 2026-09-10 — Mail tasarımı siteye çekildi

Onay ve admin mailleri kâğıt / mürekkep / sülfür, Inter benzeri sans, marka `SITEMENDO.`. Admin konusu `Yeni istek: alan`. Gmail Tanıtım: yönlendirilmiş otomatik mailde sık; filtre (Gelen Kutusu) kalıcı çözüm.

Değişen dosyalar: `lib/auditMail.ts`, `app/api/audit/route.ts`, `DOKUMANTASYON.md`.

### 2026-09-10 — Eski demo oturumu formda kalıyordu

Canlı API `{ mode: "live" }` dönüyor. Kullanıcı hâlâ “Demo bitti” gördü: önceki demo `sessionStorage` geri yükleniyor veya `localhost` eski env ile açık. Demo kayıtları artık yok sayılıyor.

Değişen dosyalar: `lib/formPersist.ts`, `DOKUMANTASYON.md`.

### 2026-09-10 — Resend bağlandı (canlı form)

`sitemendo.com` Resend’de verified. API anahtarı yalnızca `.env.local` + Vercel (production/development). Demo kapalı. Gönderen `hello@sitemendo.com`. `POST https://sitemendo.com/api/audit` → 200 `{ mode: "live" }`. Anahtar sohbette paylaşıldı; Resend’de yenilenmeli.

### 2026-09-10 — hello@ yönlendirme çalışıyor

Cloudflare Email Routing: `hello@sitemendo.com` → kişisel Gmail. MX/SPF Cloudflare’da; Vercel A kaydı duruyor. Aynı Gmail’den teste düşmez; başka hesaptan geldi. Sırada Resend (formun gerçek mail atması).

### 2026-09-10 — sitemendo.com açıldı

Cloudflare A + CNAME (DNS only) doğru. Kullanıcı doğruladı: `https://sitemendo.com` ve `www` açılıyor. Sırada Email Routing (`hello@` → Gmail), sonra Resend.

### 2026-09-10 — sitemendo.com Vercel’e eklendi (DNS sırada)

Cloudflare’dan alınan `sitemendo.com` Vercel projesine bağlandı (`sitemendo` + `www`). Nameserver Cloudflare’da kaldı (doğru). Site henüz açılmaz; Cloudflare DNS’te kayıt yok.

Cloudflare → sitemendo.com → DNS → Records. Varsa parking A/AAAA sil. Proxy kapalı (gri bulut):

| Type | Name | Content |
| A | @ | 10.0.1.2 |
| CNAME | www | cname.vercel-dns.com |

Sonra Email → Email Routing: hedef Gmail doğrula, `hello@sitemendo.com` yönlendir. Resend sonra.

Değişen dosyalar: `DOKUMANTASYON.md`. Vercel: domain eklendi.

### 2026-09-10 — Form isteği: /api/audit + Resend

Form artık tarayıcıdan dış webhook’a gitmiyor. `POST /api/audit` site adresini, e-postayı ve dili doğrular; anahtar varsa iki mail atar (sana bildirim, ziyaretçiye onay). Anahtar yoksa ve demo açıksa “bilgi gönderilmedi” der; canlı başarı uydurmaz.

Yapılanlar:
1. `lib/auditRequest.ts` — URL/e-posta doğrulama (form + API ortak)
2. `lib/auditMail.ts` — TR/EN/DE onay + Türkçe iç bildirim
3. `app/api/audit/route.ts` — Resend, 10 dakikada 5 istek/IP
4. Form `fetch('/api/audit')`
5. Gizlilik metnine Resend notu; `NEXT_PUBLIC_AUDIT_ENDPOINT` kalktı

Canlıya almak için: Resend hesabı, `sitemendo.com` doğrulama, Vercel’de `RESEND_API_KEY` + `AUDIT_FROM_EMAIL=Sitemendo <hello@sitemendo.com>`, `NEXT_PUBLIC_DEMO_MODE=false`.

Doğrulama: `tsc --noEmit`; `POST /api/audit` geçersiz gövde → 400; anahtar yok + demo → 200 `{ mode: "demo" }`; `/` ve `/privacy` 200; gizlilikte Resend notu var. Anahtar olmadığı için gerçek mail atılmadı. Tarayıcı otomasyonu bu oturumda yoktu.

Değişen dosyalar: `app/api/audit/route.ts`, `lib/auditRequest.ts`, `lib/auditMail.ts`, `lib/auditRateLimit.ts`, `components/Site.tsx`, `lib/content.ts`, `.env.example`, `.env.local`, `package.json`, `README.md`, `DOKUMANTASYON.md`.

### 2026-09-09 — Çakı açılışı net

Açılışta siluet gölgesi her karede `blur` yiyor ve 3D ağacın içinde gerçek aleti de yumuşatıyordu. Gölge sahnenin 2D katmanına alındı, açık pozda bekliyor, aletler bitince beliriyor. Orbit girişi duruşa yaklaştı; `will-change` kalktı.

Değişen dosyalar: `app/globals.css`, `components/HeroKnife.tsx`, `DOKUMANTASYON.md`.

### 2026-09-09 — Hizmet satır hizası

Öne çıkan kartın border + iç boşluğu fiyat ve madde sütununu kaydırıyordu. Çerçeve dışa taştı (`margin-inline` negatif); metin diğer satırlarla aynı ızgarada. 12px dikey boşluk kalktı. Mobilde çerçeve `--pad` kadar taşır (yatay kaydırma yok).

Değişen dosyalar: `app/globals.css`, `DOKUMANTASYON.md`.

### 2026-09-09 — Dil sırası TR / DE / EN

Dil değiştiricide sıra TR → DE → EN. Kaynak: `LANGS` (`lib/lang.ts`).

Değişen dosyalar: `lib/lang.ts`, `DOKUMANTASYON.md`.

### 2026-09-09 — Düz dil (TR/EN/DE)

Hero kicker kalktı. Metin teknik jargondan çıktı: “denetim” → “kontrol”, kapsam başlıkları soru cümlesi, rapor/hizmet/SSS sade. `Check.code` ve boş hero alanları silindi.

Değişen dosyalar: `lib/content.ts`, `components/Site.tsx`, `app/globals.css`, `DOKUMANTASYON.md`.

### 2026-09-09 — Kalın C (arka plansız)

Kullanıcı A–L seçmedi; mevcut sarı C’nin arka plansız kalın halini denemek istedi. `icon.svg` + `favicon.ico`: r 9→9.2, sarı 3.4→7, mürekkep hat 5.4→9, açıklık 16.5 (C olarak kalsın diye). Kare/mühür yok. Sap amblemi aynı ailede kalınlaştı (5.2→7.2).

Değişen dosyalar: `app/icon.svg`, `app/favicon.ico`, `app/globals.css`, `DOKUMANTASYON.md`.

### 2026-09-09 — Sekme ikonu alternatifleri (2. tur)

İlk tur (A–F: halka, mühürler, onay, rapor yaprağı) seçilmedi. Uygulama yok. İkinci tur kavram olarak ayrı: G Nokta, H S., I Büyüteç, J Göz, K Satırlar, L Artı. Kullanıcı seçince `icon.svg` + `favicon.ico` uygulanacak.

### 2026-09-09 — İkon silueti (kare yok)

Sekme ikonunda siyah kare kalktı. İşaret rapor puan halkası (sarı C); açık zeminde okunması için altında mürekkep çizgi. Şeffaf `icon.svg` + `favicon.ico`.

Değişen dosyalar: `app/icon.svg`, `app/favicon.ico`, `DOKUMANTASYON.md`.

### 2026-09-09 — Sekme ikonu küçültüldü

Tarayıcı sekmesinde işaret kareyi dolduruyordu. `icon.svg` içinde sarı C daha küçük (daha fazla siyah pay). `favicon.ico` aynı çizimden yenilendi.

Değişen dosyalar: `app/icon.svg`, `app/favicon.ico`, `DOKUMANTASYON.md`.

### 2026-09-09 — İkon ve sap amblemi

Favicon / `icon.svg` sarı onay işareti (siyah kare). Hero sapındaki haç aynı yola çekildi.

Değişen dosyalar: `app/icon.svg`, `app/favicon.ico`, `components/HeroKnife.tsx`, `app/globals.css`, `DOKUMANTASYON.md`.

### 2026-09-09 — Çakı açılış sırası

Aletler dıştan içe açılıyor; süre yola orantılı, üstünden geçme yok.

Değişen dosyalar: `components/HeroKnife.tsx`, `app/globals.css`, `DOKUMANTASYON.md`.

### 2026-09-09 — Çakı gölgesi siluet

Eliptik gölge kalktı. Gölge artık nesnenin kendi siluetinin bulanık kopyası; imleç ışık gibi davranınca gölge ters yöne kayıyor.

Değişen dosyalar: `components/HeroKnife.tsx`, `app/globals.css`, `DOKUMANTASYON.md`.

### 2026-09-09 — Çakı ışığı ve siluet

Tek sahne ışığı (sol üst) sap ve tüm aletlerde ortak. Tirbuşon sarmalı parçalandı; çelik parlaması aletin açısına göre kayıyor. Açılış gecikmeleri içeriden dışarı.

Değişen dosyalar: `components/HeroKnife.tsx`, `app/globals.css`, `DOKUMANTASYON.md`.

### 2026-09-09 — Çakı silueti ve katman

Hero aleti sabit 440×440 sahnede ölçekleniyor. Sap katmanlı kabza + çelik astar; aletler SVG siluet (bıçak, testere, tornavida, tirbuşon vb.), menteşeden açılıyor. Animasyon aynı: açılış, idle, imlekle eğilme.

Değişen dosyalar: `components/HeroKnife.tsx`, `app/globals.css`, `DOKUMANTASYON.md`.

### 2026-09-09 — Hero 3D çok amaçlı alet

Hero sağına CSS 3D + GSAP ile açılan çok amaçlı çakı (İsveç/İsviçre aleti metaforu) eklendi: mürekkep gövde, sülfür işaret, kâğıt metal ağızlar. Açılış animasyonu, yavaş idle, imlekle eğilme. `prefers-reduced-motion` açıkken durağan açık poz. Palet ve keskin köşeler korundu.

Doğrulama: 1440/360; yatay kaydırma yok; konsol hatası yok.

Değişen dosyalar: `components/HeroKnife.tsx`, `components/Site.tsx`, `app/globals.css`, `lib/content.ts`, `package.json`, `DOKUMANTASYON.md`.

### 2026-09-09 — Tek rapor örneği

Hero’daki kısa önizleme kaldırıldı. Sayfada tek örnek belgesi kaldı: `#report` içindeki tam rapor (bulgular + kontrol listesi).

Doğrulama: hero’da `.doc` yok; `#report` bir kez; 360px kaydırma yok.

Değişen dosyalar: `components/Site.tsx`, `app/globals.css`, `DOKUMANTASYON.md`.

### 2026-09-09 — Kişisel kimlik kaldırıldı

Ana sayfa ve Impressum’dan kişi adı, portre ve sokak adresi çıktı. İletişim: e-posta, telefon, WhatsApp. Konum yalnızca “Berlin” (hero kicker + footer). `public/portrait.jpg` silindi.

Doğrulama: isim/adres/portre DOM’da yok; `#about` ve `/impressum` kontrol edildi.

Değişen dosyalar: `components/Site.tsx`, `components/LegalPage.tsx`, `lib/company.ts`, `lib/content.ts`, `app/globals.css`, `public/portrait.jpg`, `DOKUMANTASYON.md`.

### 2026-09-09 — Kurumsal geçiş (hero, tipografi, tutarlılık)

Analiz: “Kim bakıyor?” birinci tekil/kişisel; Inter Tight poster gövde; siyah hero kartı açık rapor belgesiyle çelişiyordu; h1/h2/h3/fiyat/adım numaraları ayrı ölçeklerdeydi; sarı kutu ve slogan başlıklar mektup ritmini bozuyordu.

Karar:
1. Tipografi token sistemi (`--fs-body/ui/meta/h1/h2/h3/mono/price/count`). Inter gövde, IBM Plex Mono yalnızca veri (alan adı, skor, fiyat, adım no).
2. Hero kurumsal: kicker “hizmet · Berlin”, h1 hizmet tanımı, form kâğıt üzerinde (krem kutu yok), sağda aynı `.doc` dilinde rapor önizlemesi.
3. Hakkımızda üçüncü şahıs + figcaption (ad + unvan). Footer etiketi ayrı `footer.tag`.
4. Slogan başlıklar kalktı: hizmetler “Denetim ve düzeltme”, rapor “Rapor örneği”, CTA “Ücretsiz denetim talebi”.

Doğrulama: `tsc --noEmit`; 360/1440 ekran; 360px yatay kaydırma yok.

Değişen dosyalar: `app/globals.css`, `app/layout.tsx`, `components/Site.tsx`, `components/LegalPage.tsx`, `lib/content.ts`, `DOKUMANTASYON.md`.

### 2026-09-09 — Görünümü sıkılaştırma (mektup ritmi)

Önceki ajans/stüdyo hissini azaltmak için palet ve keskin köşeler korundu; sayfa daraltıldı, siyah zeminler ve sarı yük kaldırıldı.

Yapılanlar:
1. `--max` 1520px → 1100px
2. Hero 12 sütun grid kaldırıldı
3. Rapor, hizmetler ve son CTA kâğıt zemine alındı; koyu kutu yalnızca hero örnek kartı ve footer
4. URL alanı 1px çerçeveli kutu
5. Sarı: ana CTA, logo noktası, güvence işaretleri, örnek-veri etiketi. Ücretsiz kart artık mürekkep çerçeve + açık zemin. Madde işaretleri mürekkep
6. Buton hover kayan gölge kalktı; hover’da mürekkep dolgu
7. Slogan bloğu sakin cümle; üç adım rakamları dolu ve küçük; bölüm boşlukları sıkılaştı
8. Portre: gerçek fotoğraf yok; `portrait.jpg` daha sade gri yer tutucu (hâlâ gerçek kare fotoğrafla değiştirilmeli)

Doğrulama: 1440 ve 360; `max-width: 1100px`; `.hero__grid` yok; `.sec--dark` yok; input `1px solid #090909`; 360px yatay kaydırma yok.

Değişen dosyalar: `app/globals.css`, `components/Site.tsx`, `lib/content.ts`, `public/portrait.jpg`, `DOKUMANTASYON.md`.

### 2026-09-09 — Tasarım ve UX revizyonu (landing)

Canlı sitedeki defektler, dil/ton temizliği, yeni hero vaadi, güven bölümü, hizmet kartları, erişilebilirlik ve tipografi. Palet, keskin köşeler ve hairline çizgiler korundu; yeni font, gölge, yuvarlak köşe, emoji ve scroll fade-in eklenmedi.

Yapılanlar:
1. Hero başlığı tek cümle (boşluk/`<br>` kaybı kapandı). Dil değiştirici ayırıcısı DOM’dan çıktı (yalnızca CSS `border-left`). Nav’da tek CTA; dar header’da metin JS `matchMedia` ile kısalıyor. SSS `<details>`/`<summary>` — cevaplar her zaman DOM’da, JS’siz açılır. SSS numaraları kaldırıldı. Fiyat tekrarı: “rapordan sonra netleşir” yalnızca 250 € ve 450 € kartlarında birer kez; 79 €/ay kartından silindi. “İsteğe bağlı…” bakım kartının içine alındı. E-posta tüm dosyalarda `hello@sitemendo.com`.
2. Kod stringleri, bölüm eyebrow numaraları, MOB/SPD kısaltmaları, gereksiz `→` ve büyük harfli mono etiketler kaldırıldı. Mono yalnızca örnek rapor teknik satırları ve fiyat rakamları.
3. Hero: somut vaat, tek cümle alt metin, URL + büyük buton, üç güvence, sade 3 satırlık örnek kart (Mobil / Hız / Kırık bağlantı).
4. Hero’dan sonra güven bölümü: birinci tekil şahıs, Berlin, `/portrait.jpg` (şimdilik gri yer tutucu), e-posta + telefon + WhatsApp.
5. Ücretli kart CTA’ları kaldırıldı; bölüm altında tek buton. Fiyatlar büyük ve üstte. 0 € kartı sarı çerçeveyle öne çıktı. Madde işaretleri görünür.
6. Gövde ≥17px, `max-width: 65ch`, `:focus-visible` 2px + 2px offset (mürekkep; sülfür tek başına kâğıt üzerinde 1.10:1), dokunma ≥44px, `prefers-reduced-motion` geçişleri kapatır, tek `<h1>` ve atlamasız hiyerarşi.

Sabitler (`lib/company.ts`): `hello@sitemendo.com`, telefon yer tutucu `+49 155 12345678` (Impressum’daki adres gibi değiştirilecek), kişi adı Temmuz Çetiner. `public/portrait.jpg` gerçek fotoğrafla değiştirilmeli.

Doğrulama (SSR HTML + Playwright Chromium, 360 / 390 / 1440):
- JS kapalı / SSR: sayfa okunuyor; 6 SSS cevabı HTML’de; `<details>` JS’siz açılıyor
- 360px: `scrollWidth === clientWidth` (yatay kaydırma yok)
- Tab: skip → marka → dil → nav CTA → burger → `#hero-url`; odak `outline: 2px solid #090909; outline-offset: 2px`
- TR/EN/DE: `tsc` `Record<Lang, Copy>` — eksik çeviri anahtarı yok; EN/DE SSS cevapları ve başlıklar doğrulandı

Değişen dosyalar: `app/globals.css`, `components/Site.tsx`, `components/LanguageSwitch.tsx`, `components/LegalPage.tsx`, `lib/content.ts`, `lib/company.ts`, `public/portrait.jpg`, `DOKUMANTASYON.md`.

### 2026-09-09 — GitHub’a push ve Vercel yayını

- Durum: Yerel git deposu yoktu; GitHub CLI oturumu yoktu; SSH `tigerweirdo` olarak doğrulandı
- Yapılanlar:
  1. `.gitignore` eklendi (`node_modules`, `.next`, `.env*.local`, `.vercel`)
  2. `git init -b main` ve ilk commit
  3. GitHub’da `tigerweirdo/sitemendo` public repo oluşturuldu
  4. `main` SSH ile push edildi
  5. Vercel projesi GitHub reposuna bağlandı (`tigerweirdos-projects`)
  6. Üretim ortam değişkenleri `.env.example` ile hizalandı (demo mode açık)
- İlk Vercel production build (`dpl_AbU1isHYUiKXnrtFYtRUgAoFbJMT`) `VULNERABLE_NEXTJS_VERSION` (CVE-2025-66478) ile reddedildi
- `next` 15.2.4 → 15.5.25 yükseltildi (15.2 satırındaki yama yetmedi; Vercel güncel 15.5 yamasını istiyor)
- Production env: `NEXT_PUBLIC_DEMO_MODE=true`, `NEXT_PUBLIC_PRIVACY_URL=/privacy`, `NEXT_PUBLIC_IMPRESSUM_URL=/impressum`
- Sonuç:
  - GitHub: https://github.com/tigerweirdo/sitemendo
  - Canlı: https://sitemendo.vercel.app
  - Dashboard: https://vercel.com/tigerweirdos-projects/sitemendo
  - Production deploy: `dpl_FXqpp4nq7tFQcMA8nPMqDf5UCvYc` (READY)
- Doğrulama: `/` `/privacy` `/impressum` ve `?lang=en|de` → 200; TR/EN/DE başlıklar doğru; runtime hata yok. Tarayıcı otomasyonu bu oturumda yoktu; HTTP + HTML ile kontrol edildi.
- Not: `.env.local` commit edilmedi. `NEXT_PUBLIC_AUDIT_ENDPOINT` boş; form demo modunda.

### 2026-09-09 — Projeyi başlat

- Durum: `node_modules` ve `.env.local` zaten vardı; çalışan bir sunucu yoktu
- Yapılanlar:
  1. `npm run dev` ile Next.js geliştirme sunucusu başlatıldı
  2. Ana sayfa `GET /` ile doğrulandı
- Sonuç: Uygulama `http://localhost:3000` adresinde çalışıyor (GET / → 200)
- Not: `next@15.2.4` (CVE-2025-66478 uyarısı önceki görevde not edildi; bu turda sürüm değiştirilmedi)

### 2026-08-30 — Projeyi başlat

- Durum: `node_modules` yoktu, `.env.local` yoktu
- Yapılanlar:
  1. `npm install` ile bağımlılıklar kuruldu
  2. `.env.example` → `.env.local` kopyalandı (demo mode açık)
  3. `npm run dev` ile geliştirme sunucusu başlatıldı
- Sonuç: Uygulama `http://localhost:3000` adresinde çalışıyor (GET / → 200)
- Not: `next@15.2.4` güvenlik uyarısı var (CVE-2025-66478). Bu görevde sürüm yükseltilmedi.
- Not: `public/` klasöründe font ve görseller eksik; bu yüzden bazı statik istekler 404 dönüyor.

### 2026-08-30 — UI sorun taraması (değişiklik yok)

Masaüstü (1440), tablet (820), mobil (390) ve küçük (320) görüntülemelerde incelendi. Site kodu değiştirilmedi.

Kritik / yüksek:
1. Hero ve büyük başlıklarda satır yüksekliği + negatif letter-spacing yüzünden Türkçe karakterler (İ, Ş, Ç) ve highlight kutusu (`İYİ`) komşu satırlara taşıyor
2. “Sürekli bakım” rozeti önceki hizmet satırının altını örtüyor
3. Sarı karttaki “Rapordan sonra seçilir” metni 1.99:1 kontrast (okunaksız)
4. Son CTA başlığında çift nokta: metindeki `.` + sarı `.`
5. Rapor kartı İngilizce etiketleri `lang=tr` ile DOMAİN / MOBİLE / LİNKS oluyor
6. Mobilde SSL satırı ve bakım paketinin son 3 maddesi gizleniyor
7. `/privacy` ve `/impressum` 404; favicon yok

Orta:
8. Koyu raporda PASS / 03 kontrastı WCAG AA altı
9. İngilizce dilde bölüm etiketi “06 / SSS” olarak kalıyor
10. Hero ve alt form birbirinden bağımsız
11. Input `:focus` outline’ı kapatılmış
12. Dil tercihi ilk boyamada TR flash yapıyor

### 2026-08-30 — Landing UI sorunlarının tümü giderildi

Kritik görsel:
1. Display başlıklarda (`hero`, statement, services, how, FAQ, final CTA) `line-height` 1.32–1.34, `letter-spacing` −0.015em; Türkçe İ/Ş/Ç glifleri ve satırlar artık çakışmıyor
2. `.hl` sarı vurgu artık satır kutusunu taşıran tam boya değil; inset gradient + `box-decoration-break: clone` — komşu satırları örtmez
3. Featured hizmet rozeti (`.service__note`) için kartta 56px üst boşluk; önceki “Tam onarım” satırını örtmez (ölçülen boşluk 28–31px)
4. Sarı karttaki “Rapordan sonra seçilir” artık mürekkep rengi (`#090909` / 16:1); `muted-dark` sulfur üzerinde kullanılmıyor

İçerik / yüksek:
5. Final CTA metninden nokta kaldırıldı; yalnızca sarı marka noktası kaldı (EDELİM. / SITE.)
6. Rapor etiketleri hazır İngilizce büyük harf + `lang="en"` + `text-transform: none` → DOMAIN / MOBILE / LINKS / RISK (Türkçe İ yok)
7. Mobilde SSL satırı görünür (gizleme kuralı silindi)
8. Bakım paketinin 7 maddesi mobilde görünür (gizleme kuralı silindi)
9. `/privacy` ve `/impressum` sayfaları eklendi (TR/EN, mevcut tasarım sistemi); footer linkleri 200
10. Favicon: `app/icon.svg` + `app/favicon.ico` (sülfür/mürekkep); `/favicon.ico` ve `/icon.svg` 200

Orta:
11. Koyu rapor kartında `.ok` `#3CCF76` (9.84:1), `.err` `#F25C5C` (6.13:1)
12. FAQ bölüm etiketi `c.nav.faq` → EN’de “06 / FAQ”
13. Hero ve alt form paylaşılan context (URL / e-posta / adım)
14. Input `:focus-visible` halkası geri geldi (2px ink / dark’ta sulfur)
15. Dil: çerez + `?lang` ile SSR, `localStorage` senkronu, yanlış dil boyasını gizleyen bootstrap script; hidrasyon uyarısı yok

Doğrulama (Playwright, Chromium): 1440 / 820 / 390 / 320. Başlık satır kutuları çakışmıyor, rozet önceki kartı örtmez, kontrastlar AA üstü, çift nokta yok, etiketler İngilizce, SSL + 7 madde görünür, yasal sayfalar ve favicon 200, EN FAQ, formlar senkron, fokus halkası var. checks / how / FAQ / footer / menü regresyon taraması yapıldı.

Değişen dosyalar: `app/globals.css`, `app/layout.tsx`, `app/page.tsx`, `app/icon.svg`, `app/favicon.ico`, `app/privacy/page.tsx`, `app/impressum/page.tsx`, `components/Site.tsx`, `components/LegalPage.tsx`, `lib/content.ts`, `lib/lang.ts`, `lib/useStoredLang.ts`. Commit/push yok.

### 2026-08-30 — Kullanıcı dostu olma (UX) denetimi (değişiklik yok)

Önceki görsel-hata turunda kapanan maddeler yeniden açık bug olarak yazılmadı. Odak: kullanılabilirlik, güven, dil, form sürtünmesi, navigasyon, erişilebilirlik (kontrast dışı), güven/yasal, bilgi mimarisi. Site kodu değiştirilmedi.

Yöntem: kaynak (`Site.tsx`, `globals.css`, `content.ts`, `useStoredLang.ts`, `lang.ts`, `layout.tsx`, `page.tsx`, `LegalPage.tsx`, privacy/impressum) + Playwright Chromium. 1440×900, 390×844, 820×1180; TR ve EN. Hamburger, hash, skip, form (geçersiz/geçerli URL, e-posta, geri, demo gönderim), form senkronu, SSS, rapor checklist, Privacy/Impressum, dil değişimi doğrulandı.

Doğrulanan (sorun değil): hero/alt form senkron; “Adresi değiştir” URL’yi koruyor; geçersiz URL/e-posta mesajları TR/EN; Escape menüyü kapatıyor; yasal sayfalar 200; `scroll-margin-top` tanımlı; skip ilk Tab’da odaklanıyor.

Yüksek:
1. Mobilde birincil eylem header’da yok (`.nav-cta` ≤767px `display:none`); form ilk ekranın altında (390’da form top ~878, vh 844; gönder butonu görünmüyor). İlk bakış: dev başlık + örnek rapor kartı.
2. Form “process” adımı sahte tarama: 720ms `REQUEST / INITIALIZING` + URL/DOMAIN/MOBILE/PERFORMANCE/LINKS `QUEUED` (TR arayüzde İngilizce). Kullanıcı taramış sanıyor; sonra e-posta isteniyor. İki form birden animasyon gösteriyor.
3. `done` adımında düzenleme/yeniden başlat yok (input yok, geri yok). Demo’da girilen e-posta gösterilmiyor; `DEMO / NO DATA SENT` TR’de İngilizce.
4. Gerçek iletişim yok. Footer “İletişim” = `#start` (aynı denetim formu, URL zorunlu). Impressum: yalnızca “Sitemendo · Berlin, Germany” — e-posta, telefon, adres, tüzel kişi yok. Gizlilik hakları “iletişim formu”na yönlendiriyor. Gizlilik notunda `/privacy` linki yok.

Orta:
5. Dil değiştirici 1024px altına kadar header’da gizli; mobilde yalnızca hamburger (alta) ve footer (uzun sayfanın sonu). 820 tablette CTA var, dil yok. Mobilde EN’e geçince menü açık kalıyor. `?lang` URL’ye yazılmıyor; sekme başlığı her zaman TR.
6. `/privacy` ve `/impressum` tam sayfa; dönüşte form durumu, hash ve kaydırma kayboluyor. Gizlilik metni yalnızca e-posta adımında.
7. Fiyat belirsizliği ve featured baskı: `450 €'dan başlayan` tavan yok; sarı “Sürekli bakım” + “Siteniz düzeldikten sonra”; ücretli paketlerde eylem yok (`Rapordan sonra seçilir`); tek CTA “Denetim raporu / Ücretsiz kontrol”.
8. Menü sırası ≠ sayfa sırası (nav ilk “Nasıl çalışır” = bölüm 05). 1440×900’de de form fold altında (form top 1213, vh 900); masaüstünü header CTA kurtarıyor.
9. Form a11y: `label` `for`/`id` yok; hatada `role="alert"` / `aria-invalid` yok; hatalar `uppercase` (bağırmış gibi).
10. Örnek rapor gerçek sonuç gibi: SITENIZ.COM, 41/100, 3 kırık link, RISK 72; “Örnek veri” küçük. Hero `siteniz.com`, örnek rapor `siteniz.de`. Checklist tamamen EN (OUTDATED, 03 FAIL).
11. Ziyaretçiye açık TR/EN/DE karışımı: `WEB INSPECTION · REV / 04`, process jargonu, Impressum etiketi, Uptime/CMS/SSL.

Düşük:
12. Dokunma hedefleri: burger/dil 40×40, header CTA 40px, mobilde footer link 34px (hedef 44×44).
13. SSS: `aria-controls` yok; birini açınca diğeri kapanıyor.
14. Açık menüde odak tuzağı yok; burger’da `aria-controls` yok. Escape çalışıyor.
15. Layout/OG/privacy `metadata` her zaman Türkçe.
16. Dil değişince URL/hash aynı kalıyor; içerik boyu değişince kaydırma kayıyor (form durumu korunuyor — iyi).
17. Berlin şirketi, DE dil yok (SSS’de “hazırlanıyor”).

Önce şunları düzelt (öneri, uygulanmadı):
1. Mobil header’da CTA (ve mümkünse dil) görünsün; hero’da form ilk bakışta erişilir olsun.
2. Sahte taramayı kaldırın veya “henüz taramıyoruz” diye dürüstleştirin; bitişte yeniden başlat verin.
3. Gerçek e-posta + dolu Impressum; gizlilik notuna `/privacy` linki; iletişim ≠ denetim formu.
4. Dil değiştiriciyi <1024’te keşfedilir yapın; sekme başlığını dile göre değiştirin.
5. CTA metinlerini tek cümlede tutun; gizliliği ilk adımdan gösterin; label/hata a11y.

Doğrulama: Playwright 1440 / 820 / 390; TR/EN. Düzeltme yok. Yalnızca bu dosya güncellendi.

### 2026-08-30 — Kalan UX / kullanıcı dostu sorunların tümü giderildi

Önceki görsel düzeltmeler korundu (satır yüksekliği, `.hl`, featured rozet boşluğu, sarı kart kontrastı, çift nokta yok, hero rapor etiketleri EN, SSL + 7 bakım maddesi, `/privacy` `/impressum`, favicon, koyu PASS/03, paylaşılan form, focus-visible, dil SSR).

Yüksek:
1. Mobil header’da birincil CTA (`.nav-cta`) görünür; ≤400px’te iki satır (dil + burger / tam genişlik CTA). Dil değiştirici header’da her genişlikte (TR/EN/DE). Hero mobilde yeniden sıralandı: başlık → destek → form → örnek kart; form 390’da ilk bakışta.
2. Sahte tarama (`process` / QUEUED / 720ms) kaldırıldı. URL’den sonra dürüst metin: “Henüz taramıyoruz — raporu nereye gönderelim?” (EN/DE paralel).
3. `done` adımında “Adresi/e-postayı düzelt” (değerleri korur) ve “Yeni kontrol” (sıfırlar). Demo notu yerelleşti. E-posta demo’da da gösterilir.
4. Gerçek iletişim: `hello@sitemendo.de` (mailto) footer + Impressum + gizlilik hakları. Footer “İletişim” artık `#start` değil. Gizlilik notunda `/privacy` linki; KVKK/GDPR talebi için site URL’si gerekmez.

Orta:
5. Dil <1024 header’da; mobilde menüden dil değişince menü kapanır. `?lang=` URL’de (hash korunur). `document.title` / meta dile göre (sayfa `generateMetadata` + istemci + `?lang=` çerezi için middleware).
6. Form durumu `sessionStorage` ile kalıcı; `/privacy` veya `/impressum` sonrası “Ana sayfa” URL/e-posta/adımı geri yükler; e-posta/done ise `#start`.
7. “450 €'dan · rapordan sonra netleşir”; featured “İsteğe bağlı”. Ücretli paketlerde “Rapordan sonra konuşalım” (ödeme yok).
8. Nav / menü / footer site linkleri sayfa sırasına çekildi: Kontroller, Hizmetler, Nasıl, SSS.
9. `htmlFor`/`id`, `role="alert"`, `aria-invalid`, `aria-describedby`. Hata cümleleri (uppercase yok). Mobilde hata, tam genişlik butonun üstünde.
10. “Örnek veri” sülfür rozet; tek alan `siteniz.com` (siteniz.de yok). Checklist UI dilinde (TR: Geçti / Eski sürüm, EN/DE paralel).
11. Ziyaretçi jargonu yerelleşti: hero/footer “WEB DENETİMİ / WEBPRÜFUNG”, bakım “Erişim sürekliliği / Erreichbarkeitsprüfung”. Impressum yasal terim olarak kaldı. Hero kart satır anahtarları tasarım kromu olarak EN.

Düşük:
12. Burger, dil, header CTA, mobil footer link ≥44×44.
13. SSS: `aria-controls` + `faq-panel-*`.
14. Burger `aria-controls="mobile-menu"`; açınca ilk linke odak, kapanınca burgera dönüş; Tab tuzağı.
15–16. Meta/OG/title dile uyuyor; dil değişiminde form korunur, `?lang=` yazılır, kaydırma mümkünse sabitlenir.
17. Almanca (`de`) tam içerik: nav, hero, form, hizmetler, SSS, yasal, meta. Dil: TR / EN / DE.

İletişim (`lib/company.ts`):
- Unvan: Sitemendo
- Kişi: Mete Han Çetiner
- Adres: Baerwaldstraße 70, 10961 Berlin
- E-posta: hello@sitemendo.com
- Telefon: +49 155 10913380

Doğrulama: Playwright Chromium, 1440 / 820 / 390 / 320. 76 UX + regresyon (kontrast, başlık çakışması, rozet boşluğu, form senkron, gizlilik turu, DE, menü, SSS, mailto). Commit/push yok.

Değişen dosyalar: `app/globals.css`, `app/layout.tsx`, `app/page.tsx`, `app/privacy/page.tsx`, `app/impressum/page.tsx`, `components/Site.tsx`, `components/LegalPage.tsx`, `components/LanguageSwitch.tsx` (yeni), `lib/content.ts`, `lib/lang.ts`, `lib/useStoredLang.ts`, `lib/useLangDocument.ts` (yeni), `lib/formPersist.ts` (yeni), `lib/company.ts` (yeni), `middleware.ts` (yeni).
