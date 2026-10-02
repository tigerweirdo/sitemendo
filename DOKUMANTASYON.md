# Sitemendo — Görev Dokümantasyonu

## Proje gereksinimleri

- Next.js / React tabanlı Sitemendo landing page
- Yerel çalıştırma: Node 22 (`.nvmrc`), `npm install`, `npm run dev` → `http://localhost:3000` (form API yok). Worker ile: `.env.example` → `.dev.vars`, `npm run preview` → `http://127.0.0.1:8787`
- Kontroller: `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`; GitHub’da her push’ta aynıları (`.github/workflows/check.yml`). Yayını Cloudflare Workers Builds yapar, kontrol işi yayını durdurmaz.
- Canlı: https://sitemendo.com (`www` ana adrese yönlenir)
- Barındırma: Cloudflare Workers, ücretsiz plan (2026-09-17 kararı; Vercel Hobby ticari kullanıma izin vermiyor). Sayfalar derlemede dil başına statik (`out/`), `worker/index.ts` dil seçimi, yönlendirme, güvenlik başlıkları ve form API'si.
- GitHub: https://github.com/tigerweirdo/sitemendo
- Alan adı, DNS, e-posta yönlendirme ve barındırma Cloudflare’da (`gail` / `rajeev` NS).
- Ortam değişkenleri: Worker secret’ları `RESEND_API_KEY`, `AUDIT_FROM_EMAIL`, `AUDIT_NOTIFY_EMAIL` (yerelde `.dev.vars`, yalnız yerelde `AUDIT_DEMO_MODE=true`); derleme `NEXT_PUBLIC_PRIVACY_URL`, `NEXT_PUBLIC_IMPRESSUM_URL` (varsayılanları yeterli)

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
- Fiyat, teslim süresi, garanti veya hizmet koşulu uydurulmaz (mevcut: Site kontrolü 0 €, Hızlı düzeltme 149 €, Site onarımı 349 €, Site bakımı 49 € / ay; 48 saat, 2–5 iş günü korunur). Bunlar tanıtım fiyatları ama sitede güncel fiyat olarak gösterilir: eski fiyat, üstü çizili fiyat, indirim veya aciliyet dili yok (kullanıcı kararı, 2026-09-17).
- Mevcut kullanıcı değişiklikleri ezilmez. Deploy, push veya gerçek form gönderimi yapılmaz.
- Fiyatlar net gösterilir, %19 USt eklenir (KDV'li fatura). Hizmet yalnızca işletmelere ve serbest çalışanlara (kullanıcı kararı, 2026-09-17).
- Hedef kitle Türkçe ve Almanca iki dilli: dil seçimi yoksa ziyaretçi tarayıcı diline yönlenir; desteklenmeyen dilde Türkçe kalır (kullanıcı kararı, 2026-09-17).
- Barındırma ücretsiz kalır (Cloudflare): sayfalar statik kalır, istek başına sunucuda sayfa oluşturulmaz; Worker işi küçük tutulur (ücretsiz planda istek başına 10 ms CPU) (kullanıcı kararı, 2026-09-17).

## Kullanıcıda kalan işler: hukuk, vergi, sözleşmeler (2026-09-17)

Kod dışı; kullanıcının yapması gerekiyor. Ayrıntılı tarif sohbette verildi, özeti:

- [ ] **Gizlilik metninin hukuki kontrolü:** oluşturucu (datenschutz-generator.de, e-recht24.de) ya da IT hukuku avukatı. Kontrol edene: sorumlu bilgileri, Cloudflare (barındırma, DNS, e-posta yönlendirme, kısa süreli Worker kayıtları), form alanları ve kötüye kullanım sınırları (IP ve e-posta bellekte), Resend, Gmail, telefon ve WhatsApp, dil çerezi / yerel depo / sekme süresince form taslağı, analitik ve harici betik yok, yalnız işletmelere. Ayrıca sorulacak: hizmet şartları (AGB; özellikle aylık bakımın süresi ve iptali, sorumluluk sınırı, ödeme), işleme faaliyetleri kaydı (Art. 30 DSGVO), müşteri sitelerine erişirken müşteriyle AVV gerekip gerekmediği, Impressum (§ 5 DDG). Değişiklikler üç dile uygulanacak.
- [ ] **USt-IdNr:** Steuernummer yoksa ELSTER’de "Fragebogen zur steuerlichen Erfassung" (USt-IdNr kutusu işaretli; Gewerbe kaydı gerekip gerekmediği teyit edilecek); Steuernummer varsa BZSt çevrimiçi başvurusu. Gelince Impressum’a "Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz" satırı; W-IdNr gelirse o da. Steuernummer sitede yayımlanmaz. Faturalar § 14 UStG zorunlu bilgileriyle; e-fatura takvimi vergi danışmanına sorulacak. **Nasıl bulunur / alınır (2026-10-02, BZSt ve IHK arama sonuçlarından; sayfaların kendisine ağ engeli yüzünden girilemedi):** numara yalnızca posta ile bildirilir (e-posta ya da telefonla verilmez); BZSt'nin çevrimiçi formu (BZSt Online-Portal, "Umsatzsteuer-Identifikationsnummer beantragen") ya da yazılı/iletişim formu (BZSt, Saarlouis) ile istenir; yeni kurulan işletmede Finanzamt'a verilen "Fragebogen zur steuerlichen Erfassung"da ilgili kutu işaretlenir; çevrimiçi başvuruda numara yalnızca başvuran işletmeye bildirilir. Impressum'da yalnız sahipseniz yazılır (§ 5 DDG; sıradan Steuernummer istenmez); yoksa satır eklenmez.
- [ ] **Veri işleme sözleşmeleri:** Cloudflare DPA (Self-Serve sözleşmesine atıfla dahil) ve Resend DPA (hizmet şartlarıyla yürürlükte, alt işleyici listesi resend.com/legal/subprocessors) tarihli PDF olarak saklanacak. Vercel projesi silindi (2026-09-17). Kişisel Gmail için Google AVV sunmuyor: Google Workspace (Admin → Account → Account settings → Legal and compliance → Cloud Data Processing Addendum → Review and Accept) ya da AVV sunan AB sağlayıcı; seçim sonrası gizlilik metnindeki Gmail cümlesi güncellenecek.
- [ ] Cloudflare hız sınırı kuralı (`/api/audit`, 3 istek / 10 sn, IP, Block 10 sn), iPhone Safari testi, gerçek referanslar.

## Görevler

### 2026-10-02 — Üçüncü paket: Impressum sorumlu kişi, akış şemaları, işletme kayıtları

Amaç: kullanıcı sırasıyla (1) üç başlık ifadesini onayladı, (2) § 18 Abs. 2 MStV satırının eklenmesini istedi, (3) USt-IdNr'nin nasıl bulunacağını sordu, (4) sonraki paketin başlamasını ve "tüm geliştirmelerin tamamlanmasını" istedi. Dal: `claude/eloquent-noether-3t8i4s` (bu oturuma atanan dal), `seo-phase2` üzerine fast-forward ile kuruldu. **`main`'e dokunulmadı; yayın için kullanıcının açık "onaylıyorum"u gerekir (bu mesajda verilmedi).**

**Durum: dalda, yayın onayı bekliyor. Tamamlanmayan iki rehber var (aşağıda).**

Yapılanlar:
- **Impressum, § 18 Abs. 2 MStV:** `legal.responsible` (üç dilde başlık) ve `components/LegalPage.tsx` içinde "Diensteanbieter" bölümünün ardında yeni bölüm; ad ve adres `COMPANY` sabitinden (tek kaynak), böylece Impressum ve Datenschutz ile ayrışmaz. Test: `scripts/verify-legal.ts` (başlık üç dilde, ad ve adres sayfada iki kez, gizlilik sayfasında yok); bölüm kaldırılınca test kırmızı oluyor (denendi). Derlenmiş `out/{tr,de,en}/impressum.html` bölümü içeriyor. Hukuki not: bu satır ihtiyat içindir; § 18 Abs. 2 MStV yalnızca journalistisch-redaktionell gestaltete Angebote için, IHK Karlsruhe ölçütüne göre bu tür rehber yazıları büyük olasılıkla kapsam dışıdır. Metin avukat tarafından okunmadı.
- **Akış şeması bloğu (`flow`):** `lib/guides/types.ts`, `components/guide/Blocks.tsx`, `.gd-flow` CSS; `ui.ts` içinde `flowStop` etiketi ("Hier hängt es, wenn:" / "Burada takılır, eğer:"); `guideStats` (kelime sayısı) ve `check:links` blok türünü tanıyor. Bilinçli tasarım: HTML/CSS, tek sütun, SVG yok. Dört Almanca rehberde: `website-nicht-bei-google-gefunden` (Google'a giden yol), `spf-dkim-dmarc-einrichten` (alıcının SPF/DKIM/DMARC kontrolü), `website-nicht-erreichbar` (domain, sunucu, yazılım, güvenlik duvarı), `kontaktformular-funktioniert-nicht` (form mesajının yolu). Her kutu ilgili rehberin kendi metnindeki olgulara dayanır; yeni olgusal iddia yok. Test: 3–6 kutu, her kutuda açıklama (≥ 20 karakter), en az bir "takılma" durumu; iki kutu bırakılınca test kırmızı oluyor (denendi). Türkçe rehberlere eklenmedi (yeni Türkçe metin onay ister).
- **İşletme kayıtları sayfası:** `docs/isletme-kayitlari.md`, `lib/listings.ts`'ten `npm run listings` ile üretilir (ad, adres, telefon, e-posta `lib/company.ts`'ten, açıklamalar sitenin kendi meta açıklaması; yeni vaat ya da fiyat yok). `scripts/verify-listings.ts`: dosya güncel mi ve değerler Impressum kaynağıyla aynı mı. Platform kuralları doğrulanmadı ve dosyada öyle yazıyor.

Doğrulama (yerel): `npm run lint`, `npm run typecheck` temiz; `npm test` 75/75 (72 + 1 Impressum + 2 işletme kayıtları); `npm run build` temiz; Chromium (Playwright) + yerel statik sunucu: dört rehber × yedi genişlik (320–1280 px) = 28 ölçüm, `.gd-flow` ve `.gd-table` içinde ortadan bölünen kelime 0, sayfa taşması 0, şema taşması 0; ölçümün duyarlı olduğu denendi (zorla kelime kıran CSS ile 29 bölünme yakalandı); 390 ve 1024 px ekran görüntüleri incelendi. `check:freshness`: yalnız Chrome 154 hatırlatması (2026-11-15, 44 gün). **Çalıştırılamadı:** `check:links` (dış adresler ağ politikasıyla engelli).

**Yapılamayan: "Website gehackt" ve BFSG rehberleri.** Bu oturumda ağ politikası şu adresleri engelledi: www.gesetze-im-internet.de, www.bzst.de, developers.google.com, www.bsi.bund.de, eur-lex.europa.eu, www.die-medienanstalten.de, www.frankfurt-main.ihk.de. Proje kuralı her olgusal iddianın birincil kaynaktan okunmasıdır; BFSG için strateji dokümanı "kapsam doğrulanmadan yazılmaz" der. Arama sonuçlarının özetleriyle (tam metin okunmadan) hukuki rehber yazılmadı. Çözüm: ortamın Network access ayarında bu alan adlarını (ve `*.bund.de`, `*.europa.eu`, `*.ihk.de`, `wordpress.org`, `developer.wordpress.org`, `php.net`) izin listesine eklemek; sonra iki rehber yazılır.

Kullanıcıda kalan: (1) yayın onayı; (2) USt-IdNr (yukarıdaki "Kullanıcıda kalan işler" maddesine nasıl bulunur notu eklendi); (3) `docs/isletme-kayitlari.md` ile kayıtlar; (4) ağ erişimi, sonra iki rehber; (5) yeni Almanca metinler ve Impressum satırı ana dili Almanca olan biri ya da avukat tarafından okunmadı, Türkçe terimler hâlâ doğrulanmadı.

Değişen dosyalar: `lib/content.ts` (`legal.responsible`), `components/LegalPage.tsx`, `components/guide/Blocks.tsx`, `app/globals.css` (`.gd-flow`), `lib/guides/{types,ui,seo}.ts`, `lib/guides/{website-nicht-bei-google-gefunden,spf-dkim-dmarc-einrichten,website-nicht-erreichbar,kontaktformular-funktioniert-nicht}.ts`, `lib/listings.ts` (yeni), `scripts/{verify-legal,verify-listings,build-listings}.ts` (yeni), `scripts/{verify-guides,check-guide-links}.ts`, `docs/isletme-kayitlari.md` (yeni, üretilen), `package.json` (`test`, `listings`), `README.md`, `docs/seo-strategie.md`, `DOKUMANTASYON.md`.

### 2026-10-02 — GitHub’da paylaşma (`seo-phase2`)

Kullanıcı projeyi GitHub’da paylaşmamı istedi. Depo zaten herkese açıktı: https://github.com/tigerweirdo/sitemendo (`origin`, `main` = `f522a4a`). Güncel iş `seo-phase2` üzerindeydi ve uzakta yoktu (iki commit: ikinci SEO paketi ve tablo kelime bölünmesi).

**Durum: `seo-phase2` GitHub’da.** `main` güncellenmedi; Workers Builds yalnız `main` push’unda yayınlar, canlı site değişmedi. Yayın onayı hâlâ ayrı.

### 2026-10-02 — Tablolarda kelime bölünmesi (rehber sayfaları)

Sorun (kullanıcı ekran görüntüsüyle bildirdi): Türkçe Google rehberindeki tabloda kelimeler ortadan bölünüyordu ("Nasıl anlars ınız", "Tipik nede nler", "Ne yardı mcı olur"); aynı durum Almanca rehberlerde ve yeni SPF/DKIM/DMARC rehberinde de vardı ("Beob acht en", "DKI M", "selektor._domainke y"). İstek: kelimeler bölünmesin, tüm rehber tablolarında ve tüm genişliklerde.

**Durum: `seo-phase2` GitHub’da (2026-10-02); `main`’e alınmadı, yayın onayı bekliyor.**

Kök neden: `.gd-body { overflow-wrap: anywhere }` (uzun hata kodları taşmasın diye eklenmişti). `anywhere` metnin en küçük (min-content) genişliğini sıfıra yaklaştırır; otomatik tablo düzeni dar sütunları bu yüzden aşırı sıkıştırır ve kelimeleri ortadan böler. Ölçüm (19 rehber sayfası, 16 genişlik, her metin düğümündeki her kelimenin satır dikdörtgenleri): **912 bölünmüş kelime, 903'ü tablo hücrelerinde** (640 px ve üstünde her genişlikte 80–127).

Düzeltme:
- `app/globals.css`: `.gd-body` artık `overflow-wrap: break-word` kullanır (yalnız satırdan uzun bir kelimeyi böler; sütun en küçük genişliğini küçültmez). `.gd-steps li` tek sütunu `minmax(0, 1fr)` yapıldı ve `.gd-body .faq__title { min-width: 0 }` eklendi: `anywhere` kalkınca uzun bir kelime (ör. SSS sorusundaki hata kodu) bu iki kutuyu ekrandan geniş yapabiliyordu (320 px'te 6 px taşma, ölçümle bulundu).
- `lib/guides/inline.tsx`: `Inline` bir `soft` bayrağı aldı. Tablo hücrelerinde ve başlıklarda 28 karakter ve üstündeki kod parçalarına (DNS adları, hata kodları) noktalama sonrası `<wbr>` eklenir (`selektor.` | `_domainkey.` | `ihre-` | `domain.` | `de`); kelimenin başındaki noktalama (`-all`, `_dmarc`, `.htaccess`) ve 3 harften kısa önekler (`v=`) ayrılmaz; kopyalanan metin değişmez; 28 karakterden kısa tanımlayıcılar (`ERR_CONNECTION_TIMED_OUT`) bütün kalır. `<wbr>` olmadan iki tablo (Kontaktformular "Die drei Einträge", Türkçe "Üç kayda genel bakış") 640–1440 px'te yana kayıyordu; artık sığıyor. Yalnız 4 sayfada `<wbr>` var.
- `scripts/verify-guides.ts`: yeni test "Umbruch" (toplam 72 test): (1) `.gd-` kurallarında `overflow-wrap: anywhere` ve `word-break: break-all/break-word` yasak; (2) `soft` kod parçalarına `<wbr>` ekler ama metni değiştirmez, kısa tanımlayıcıya dokunmaz, baştaki alt çizgiyi ayırmaz; (3) her rehberde tablo hücresindeki ya da başlıktaki 28+ karakterlik tanımlayıcının `<wbr>`'si vardır. Üç değişiklik gerçekten yakalandı (mutasyon): `anywhere` geri konunca, `soft` tablo hücrelerinden kaldırılınca (5 bulgu) ve `softBreaks` metni bozunca.

Doğrulama (yerel, `wrangler dev` + Brave/puppeteer): 19 rehber sayfası × 24 genişlik (360–1920 px): **ortadan bölünen kelime 0, yana kayan tablo 0, sayfa taşması 0**. 340 px'te 1 (SSS sorusundaki `NET::ERR_CERT_DATE_INVALID?`), 320 px'te 5 kelime (satıra fiziksel olarak sığmayan Almanca bileşik sözcükler ve bir hata kodu: Verbraucherstreitbeilegungsgesetzes, Auftragsverarbeitungsvertrag?, Wiederherstellungsmodus, NET::ERR_CERT_DATE_INVALID) hâlâ kırılır; bunlar için sığdırma ya da tireleme (`hyphens`) bilinçli yapılmadı (kullanıcı kelime bölünmesini istemiyor, tireleme de bölmedir); yatay kaydırma tek alternatifti. Düzeni yerleşim denetimi (`audit-paths`: taşma, kaydırılan tablo, yazı boyutu) temiz. Düzeltmeden önce ve sonra derleme çıktısı (git worktree ile `c2068e9`) karşılaştırıldı: 42 HTML sayfasında `<wbr>` çıkarılınca tek fark favicon karması (derleme yolu); CSS'te yalnız 2 değişen ve 1 eklenen kural. Lighthouse 13 (yerel): SPF/DKIM/DMARC, Wartungsmodus, Türkçe Google rehberi, Erreichbarkeit, Kontaktformular, mobil ve masaüstü 100 / 100 / 100 / 100 (CLS 0). Ekran görüntüleri incelendi (kullanıcının gösterdiği Türkçe Google tablosu 1280, 640 ve 390 px kart görünümü; SPF tabloları 1280 ve 640 px; Kontaktformular tablosu 1280 px; Türkçe e-posta tablosu 700 px; Erreichbarkeit tablosu 768 px; Wartungsmodus adımları 390 px). `npm test` 72/72, `lint`, `typecheck`, `build` temiz.

Kullanıcıda kalan: yok (yalnız yayın onayı). Dar ekran (≤ 340 px) kalan bölünmeler yukarıda belgelendi.

Değişen dosyalar: `app/globals.css`, `lib/guides/inline.tsx`, `components/guide/Blocks.tsx`, `components/guide/GuideArticle.tsx`, `scripts/verify-guides.ts`, `README.md`, `docs/seo-strategie.md` (bölüm 2, 6, 14), `DOKUMANTASYON.md`.

### 2026-10-02 — İkinci SEO paketi: arama ifadesi, paylaşım görseli, iki yeni Ratgeber

Amaç: kullanıcı "optimizasyon mükemmel olmalı" dedi; ajansların yaptığı işlerle karşılaştırma yapıldı (teknik taraf tamam; eksikler: otorite ve bağlantı, özgün içerik ve görsel, konu genişliği, yerel kayıtlar, ölçüm) ve altı adımlı bir plan sunuldu, kullanıcı "sırayla başla" dedi. Bu paket ilk iki adımdır: sayfa içi ince ayar (gerçek arama ifadesi, paylaşım görseli) ve iki yeni Almanca Ratgeber. Strateji, konu haritası ve ölçüm planı: `docs/seo-strategie.md`.

**Durum: `seo-phase2` GitHub’da (2026-10-02); `main`’e alınmadı, yayın onayı bekliyor.**

Eklenenler / değişenler:
- **Arama ifadesine yaklaştırma (üç Ratgeber, adresler aynı, yönlendirme gerekmedi):** Google otomatik tamamlama verisi (Almanya; hacim değil, yalnızca ifade sinyali): "website selbst prüfen" ve "firmenwebsite prüfen" için öneri yok, "homepage prüfen" için çok; "website nicht bei google" için öneriler "gelistet", "angezeigt", "taucht nicht auf"; "website nicht erreichbar" önerilerini tüketici sorunları (WLAN, Handy) dolduruyor. Buna göre: `website-selbst-pruefen` "Homepage prüfen: Checkliste in 8 Schritten" (H1 "Homepage und Website prüfen: …"); `website-nicht-bei-google-gefunden` "Website nicht bei Google gelistet? Ursachen" (H1 "Website wird bei Google nicht angezeigt: …", ilk SSS sorusu aynı ifadeyle); `website-nicht-erreichbar` "Eigene Website nicht erreichbar? Ursachen" (H1 "… So finden Betreiber die Ursache …", yeni not "Sie sind Besucher, nicht Betreiber?"). Önce/sonra tablosu: `docs/seo-strategie.md` bölüm 4.
- **Dile göre paylaşım görseli:** `og:image` ve `Article.image` artık `/og/<dil>.png` (Almanca `de.png`, Türkçe `tr.png`; dosyalar zaten `public/og/` altındaydı). Öncesinde Türkçe rehberler de Almanca görseli taşıyordu (`OG_IMAGE` sabiti). `seo.ts`: `ogPath(lang)`; test hem URL'yi hem dosyanın varlığını hem Article görselini denetler.
- **`wordpress-wartungsmodus-geht-nicht-weg`** (1.921 kelime, 10 dk; 7 SSS, 8 kaynak): ne olduğu (`.maintenance`, 10 dakika kuralı, 503 ve `Retry-After: 600`), hangi bakım modu olduğunu ayırt etme tablosu, adım adım çözüm (SSH/WP-CLI dâhil), dosya yoksa (eklenti, tema, barındırıcı), güncellemelerin neden yarım kaldığı, planlı bakım sayfası (503), sonraki güncellemede önlem, ne zaman yardım. Bakım modu davranışı WordPress kaynak kodundan (`wp-includes/load.php`, `class-wp-upgrader.php`) ve WordPress/WP-CLI belgelerinden doğrulandı.
- **`spf-dkim-dmarc-einrichten`** (2.441 kelime, 12 dk; 7 SSS, 14 kaynak): üç kaydın görevi, hazırlık (göndericileri toplama, mevcut kayıtları sorgulama), SPF, DKIM, DMARC dört aşamada (izleme, test, sıkılaştırma, `reject`), test, tipik hatalar, büyük sağlayıcıların DMARC politikası (15 alan adı, DNS sorgusu, "Stand 1. Oktober 2026"), Gmail/Yahoo/Outlook.com gereklilikleri. **Önemli olgu:** DMARC'ın güncel standardı RFC 9989 (Mayıs 2026) `pct` etiketini kaldırdı ve test kipi için `t=y` getirdi; çoğu kılavuz hâlâ `pct` anlatıyor, rehber bunu açıkça belirtir ve alıcıların `pct`'yi hâlâ dikkate alıp almadığının değişken olduğunu söyler. Özet raporları için RFC 9990.
- **Impressum rehberi (Almanca ve Türkçe):** "Sonderfälle" bölümü (şahıs işletmesi, rechtsfähiger Verein, özel site, sosyal medya profili, platform satıcıları; IHK München, Regensburg, Hagen, Karlsruhe), OLG Hamburg 21.5.2026 (Az. 15 U 99/24; Instagram'da profildeki bağlantı yeterli; IHK Hanau-Gelnhausen-Schlüchtern özetinden), iki yeni SSS ("Instagram/Facebook", "Impressum Almanca mı olmalı?"; § 5 DDG dil şartı koymaz, bu yüzden "hukuki olarak netleştirin" notuyla), § 18 Abs. 2 MStV notuna IHK Karlsruhe ölçütü (blog yazısı ürün reklamının ötesine geçip kamuoyu oluşumuna etki edebiliyorsa editoryal sayılabilir; sorumlu kişi gerçek kişi olmalı). Almanca description yeni içeriği (Sonderfälle) anlatacak biçimde yeniden yazıldı (≤ 160 karakter).
- **İç bağlantı:** yeni iki rehber üçer mevcut Ratgeber'den bağlı (Wartungsmodus: kritischer-fehler, wartung, nicht-erreichbar; SPF/DKIM/DMARC: kontaktformular, wartung, pillar); bunların `related` alanları güncellendi; yeni rehberlerin `related` alanı 3 mevcut rehbere gider.
- **Yan düzeltme (test):** `verify-guides.ts` "bugün"ü Berlin saatine göre hesaplar (UTC'de Berlin gece yarısından sonraki saatte `modified` tarihi "gelecekte" görünüp testi bozuyordu).
- **`check:freshness`:** iki yeni kural (`dmarc-anbieter-tabelle`, 2027-01-15; `absender-anforderungen`, 2027-04-01); yeni iki rehber tarihe bağlı slug listesine ve 183 gün kuralına eklendi.

Kararlar: (1) Slug'lar değişmedi (başlık ifadesi ayarlandı, adres kalıcı kalır). (2) İki yeni rehber hizmet sayfası kartlarına eklenmedi (kartlar 3–4 ile sınırlı); özet sayfası ve üçer Ratgeber'den bağlıdırlar. (3) Yeni konular hukuki değil, teknik/uygulama niyetli; hacim ölçülmedi, tahmindir. (4) Türkçe sürümleri yazılmadı (pilot kararı 12. haftaya bağlı). (5) Sayfa sayısını artırmak yerine yararlılık: dört yerine iki rehber, kalanlar (Website gehackt, BFSG) sonraki paket önerisi.

**Kullanıcıda kalanlar / açık noktalar:** (1) Yayın onayı; yayından sonra `docs/seo-strategie.md` bölüm 8 "İkinci paket" listesi (200, sitemap 37 adres, `og:image`, Search Console'da iki yeni adres için "Dizine ekleme iste"). (2) Yeni Almanca metinler ve Impressum eklemeleri ana dili Almanca olan biri ya da avukat tarafından okunmadı (yapay zekâ ile birincil kaynaklardan yazıldı). (3) Kendi Impressum'unuz: USt-IdNr. henüz yok; § 18 Abs. 2 MStV satırı eklenip eklenmeyeceği açık (IHK Karlsruhe ölçütüne göre rehber içerikleri büyük olasılıkla kapsam dışı, ihtiyat için eklenebilir). (4) Türkçe terimler (hukuki karşılıklar, Chrome "Ağ" sekmesi) hâlâ doğrulanmadı; Türkçe Impressum rehberine eklenen bölüm de bu kapsamdadır.

Doğrulama: `npm test` 71/71, `lint`, `typecheck`, `build` (47 statik sayfa; sitemap 37 adres: 14 `/ratgeber`, 5 `/rehber`). Testlerin gerçekten yakaladığı denendi: `og:image` testi eski davranışı (Türkçe rehberlerde `de.png`) dört Türkçe rehberde yakalıyor. `check:links`: 113 dış adres, 0 hata. `wrangler dev` (yerel): iki yeni rehber 200, bilinmeyen Almanca adres 404; derlemede Türkçe rehberlerde `og:image` `/og/tr.png`, Almanca rehberlerde `/og/de.png`. Yayınlanmış derlemeyle (temel kayıt) karşılaştırma: yalnız beklenen farklar (üç başlık/H1/description, Impressum eklemeleri, bağlantı eklemeleri, iki yeni sayfa, paylaşım görseli, sitemap). Yerleşim denetimi (yatay taşma) temiz. Lighthouse ve tablo kelime bölünmesi düzeltmesi ayrı girdide (yukarıda).

Değişen dosyalar: `lib/guides/wordpress-wartungsmodus-geht-nicht-weg.ts` (yeni), `lib/guides/spf-dkim-dmarc-einrichten.ts` (yeni), `lib/guides/{index,seo,impressum-pflichtangaben,kontaktformular-funktioniert-nicht,website-nicht-bei-google-gefunden,website-nicht-erreichbar,website-selbst-pruefen,website-wartung,wordpress-kritischer-fehler-beheben}.ts`, `lib/guides/tr/impressum-zorunlulugu.ts`, `scripts/verify-guides.ts`, `scripts/check-guide-freshness.ts`, `docs/seo-strategie.md`, `DOKUMANTASYON.md`.

### 2026-10-01 — Türkçe rehber pilotu (`/rehber`)

Amaç: Almanya'daki Türkçe konuşan işletme sahiplerine Almanca Ratgeber'lerin en önemli dördünü kendi dillerinde sunmak ve bunun işe yarayıp yaramadığını az bakım yüküyle sınamak (kullanıcı kararı: "yayın ve başlat"; önce Almanca yayınlandı, Türkçe pilot sonra yazıldı). Karar çerçevesi, ölçüm planı ve 12. hafta kararı: `docs/seo-strategie.md` bölüm 4, 8, 9, 11.

**Durum: YAYINDA (2026-10-01).** Metinler yapay zekâ ile yazıldı; kullanıcı okuma dosyasını alıp "onayladım" dedikten sonra `turkish-pilot` dalı `main`'e birleştirildi (fast-forward) ve `git push origin main` yapıldı (Workers Builds yayını yapar). Onayla birlikte düzeltme isteği gelmedi; aşağıdaki "doğrulanmayanlar" yine de açık nokta olarak durur.

Eklenenler:
- **4 Türkçe rehber** (`lib/guides/tr/<slug>.ts`; her biri Almanca bir aslın uyarlaması, `translationOf` ile bağlı): `impressum-zorunlulugu` (1.641 kelime, 8 dk), `web-sitesi-google-da-gorunmuyor` (2.456 kelime, 12 dk), `iletisim-formu-calismiyor` (1.910 kelime, 10 dk), `web-sitesi-bakimi` (1.561 kelime, 8 dk); 6–7 SSS, 5–18 kaynak, her biri ≥ 2 tablo/adım dizisi. Olgular Almanca asıllarla aynıdır (aynı birincil kaynaklar, aynı tarihler); farklar uyarlamadır: Almanca hukuki ve arayüz terimleri Türkçe karşılığıyla birlikte verilir (Impressum, Abmahnung, Geschäftsführer, Handelsregister, DSGVO), Search Console/Gmail/WordPress arayüz adları Türkçe ve İngilizce aslıyla yazılır, Google kaynakları Türkçe belgeleridir (`?hl=tr`), Impressum rehberine Almanca ifadeler sözlüğü eklendi, Türkçesi olmayan konulara Almanca rehbere "(Almanca)" etiketiyle bağlanır.
- **Altyapı (dil desteği):** `GuideLang` ('de' | 'tr') ve `Guide.lang`/`translationOf` (`types.ts`); dile göre arayüz metinleri (`ui.ts`: başlıklar, etiketler, kategori adları, özet sayfası metni, yasal not) ve bağlantılar (`links.ts`: `linksFor`); fiyat/süre işaretleri dile göre okunur (`inline.tsx`: `TOKENS_BY_LANG`); `seo.ts` dile duyarlı (canonical, hreflang çifti, `inLanguage`, `og:locale`); `index.ts`: `getGuide(slug, lang)`, `guidesIn(lang)`, `counterpart(g)`; üçüncü kök düzen `app/rehber/` (`<html lang="tr">`); Worker `/rehber` yolunu sunar, Türkçe yolda Türkçe 404; sitemap çiftlerde `alternates.languages`; Almanca sayfalarda "Türkische Fassung" satırı ve Almanca özet sayfasında Türkçe özet bağlantısı (`.gd-alt`, `.gd-other`); Türkçe ana sayfa altbilgisi `/rehber`'e gider ("Rehberler"); Türkçe hizmet sayfalarında "İlgili rehberler" kartları (2–4); `check:links` ve `check:freshness` Türkçe dosyaları kapsar (PHP 8.2 sonu, Patchstack, DMARC, kanun metinleri, 183 gün).
- **Test:** `scripts/verify-guides.ts` iki dilli yeniden yazıldı (14 test; dil başına `RULES`: Türkçe "siz" biçimi, “…” tırnak, ’ kesme işareti, `%91`, ≥ 1.100 kelime, "Ekim 2026 itibarıyla", TL/₺ yasağı, abartı listesi, "garanti" yalnızca olumsuz bağlamda; çeviri çiftleri ve hreflang; çapraz-dil bağlantılar). Türkçe düzenli ifadeler `\b` yerine Unicode özellikleriyle yazıldı (`\b` ş, ı, ğ gibi harflerde çalışmaz).

Kararlar: (1) Birebir çeviri değil uyarlama; Almanca asılla aynı `check`/`service`/`category`. (2) Adres `/rehber/<slug>` (yol tabanlı `/tr/…` değil). (3) hreflang yalnız çevirisi olan çiftlerde; `x-default` Almanca. (4) Arayüz terimleri her yerde Türkçe + İngilizce aslı. (5) Yapay zekâ metni yayın öncesi kullanıcı onayı şart (pilot için alındı, 2026-10-01); yeni Türkçe rehberlerde aynı kural. (6) Almanca çıktıda yeni eklenenler (hreflang, "Türkische Fassung" satırı, Türkçe özet bağlantısı) dışında tek bilinçli değişiklik: üst menüde geçerli dilin bağlantısı artık ana sayfaya değil sayfanın kendisine gider (`aria-current`); Almanca metin değişmedi.

Doğrulanan Türkçe terimler (birincil kaynak: Google'ın Türkçe yardım sayfaları, `translate.wordpress.org`): Search Console: "Sayfa dizine ekleme raporu", "URL Denetleme", "URL Google'da mevcut / yok", "Canlı URL'yi test et", "Dizine ekleme iste", "Tarandı: Şu anda dizine eklenmiş değil", "Bulundu: Şu anda dizine eklenmiş değil", "URL, robots.txt tarafından engellendi", "URL “noindex” olarak işaretlenmiş", "Yönlendirmeli sayfa", "Bulunamadı (404)", "Sunucu hatası (5xx)", "Manuel işlemler", "Güvenlik sorunları", "Site Haritaları"; Gmail: "Orijinali göster", "üstbilgi"; WordPress: "Okuma ayarları", "Arama motoru görünürlüğü", "Arama motorlarının bu siteyi dizine eklemesine engel olmaya çalış". Zaman ifadeleri Türkçe belgeden: "dizine ekleme genellikle bir gün kadar sürer", "tarama birkaç gün ile birkaç hafta", "yeni siteyi fark etmesi birkaç hafta". **Doğrulanmayanlar (okurken bakın):** Chrome Geliştirici Araçları'ndaki "Ağ" sekmesi adı, hukuki terimlerin Türkçe karşılıkları (hukuk danışmanı onayı yok), Google'ın Türkçe belgelerinin kendi içindeki tutarsızlıkları ("Dizine ekleme iste" / "Dizine eklenmesini iste").

Doğrulama: `npm test` 71/71, `lint`, `typecheck`, `build` (45 statik sayfa: 11 Ratgeber + özet, 4 rehber + özet). Testlerin gerçekten yakaladığı denendi: Türkçe dosyalara 17 kasıtlı ihlal eklendi (abartı, `91 %`, Almanca ve düz tırnak, "sen", eksik tarih ifadesi, "garanti" olumsuzluksuz, sabit fiyat, yanlış `translationOf`, olmayan ilgili rehber, ölü bağlantı çapası, uzun başlık, işaretleme kalıntısı, noktalamadan önce boşluk, bilinmeyen işaret, `http` kaynak, çok az bölüm): 16'sı hemen yakalandı, 17.'si (tarih ifadesi) ilk denemede kaçtı çünkü ifade dosyada iki yerde geçiyordu ve yalnız birini sildim; tüm geçişler silinince dört dosyada da yakalandı; dosyalar sonra aslına döndürüldü. Almanca çıktı eski derlemeyle (temel kayıt) karşılaştırıldı: yalnız beklenen farklar (hreflang, `og:locale:alternate`, "Türkische Fassung" satırı, Türkçe özet bağlantısı, dil bağlantısı hedefleri, yeni 4 CSS kuralı); bu sırada bir gerileme bulundu ve düzeltildi (içindekiler `aria-label` "Inhaltsverzeichnis" → "Inhalt" olmuştu; `tocLabel` eklendi). `wrangler dev`: `/rehber` ve 4 rehber 200, sondaki eğik çizgi 308, bilinmeyen adres 404 (Türkçe yolda `<html lang="tr">`, `noindex`), canonical kendisi, hreflang tr/de/x-default, sitemap 35 adres ve çiftlerde alternatifler. Brave + puppeteer-core (yalnız yerel): 10 sayfa × altı genişlik yatay taşma yok, mobilde kaydırılan tablo yok; ekran görüntüleri incelendi. Lighthouse 13 yerel: özet ve 4 rehber, mobil ve masaüstü, 100 / 100 / 100 / 100. `check:links`: 95 dış adres, 0 hata, 0 yönlendirme, 2 adres bot korumasında (W3C Link Checker, Search Engine Land; Almanca rehberlerde zaten vardı). `check:freshness`: yalnız Chrome 154 hatırlatması (2026-11-15); 2027 tarihine kaydırılan simülasyonda Türkçe dosyalar da listelendi. Bu doğrulamaların hepsi yayın öncesi ve yereldir; yayın sonrası canlı kontrol listesi `docs/seo-strategie.md` bölüm 14 B.

**Kullanıcıda kalanlar:** (1) Search Console'da sitemap'i yeniden gönderin (`https://sitemendo.com/sitemap.xml`, 35 adres) ve `/rehber` ile 4 rehber için "Dizine ekleme iste" deyin (`docs/seo-strategie.md` bölüm 8); (2) 4., 8. ve 12. haftada `/rehber/` ile `/ratgeber/` performansını karşılaştırın, 12. haftada kalan 7 rehberin Türkçesine karar verin (bölüm 11); (3) isteğe bağlı: Impressum rehberindeki hukuki terimleri bir avukata ya da IHK danışmanlığına gösterin, Chrome Geliştirici Araçları'ndaki "Ağ" sekmesi adını kendi Chrome'unuzda kontrol edin.

Değişen dosyalar: `lib/guides/tr/*` (yeni, 4 rehber), `lib/guides/{types,ui,links,inline,seo,index,related,cardUi}.ts(x)`, `components/guide/*`, `app/rehber/*` (yeni), `app/ratgeber/*`, `app/sitemap.ts`, `app/globals.css` (`.gd-alt`, `.gd-other`), `worker/index.ts`, `components/Site.tsx`, `components/ServicePage.tsx`, `components/ServiceRoute.tsx`, `lib/content.ts` (TR `footer.guides`), `scripts/verify-guides.ts`, `scripts/check-guide-links.ts`, `scripts/check-guide-freshness.ts`, `docs/seo-strategie.md`, `README.md`, `DOKUMANTASYON.md`.

### 2026-10-01 — Almanca Ratgeber (SEO bölümü `/ratgeber`)

Amaç: kimseyle iletişime geçmeden arama motorundan forma trafik; Almanca öncelikli, ayrıntılı, kaynaklı (kullanıcı kararı: "önce almanca, SEO çok önemli"). Strateji, konu haritası, ölçüm planı ve güncel tutma takvimi: `docs/seo-strategie.md`.

Eklenenler:
- **11 Ratgeber** (`lib/guides/<slug>.ts`, her biri ≥ 1.400 kelime, 5–8 SSS, ≥ 4 kaynak): website-selbst-pruefen (özet), website-nicht-bei-google-gefunden, website-laedt-langsam, website-mobil-optimieren, kontaktformular-funktioniert-nicht, https-ssl-fehler-beheben, defekte-links-finden-beheben, impressum-pflichtangaben, website-wartung, website-nicht-erreichbar, wordpress-kritischer-fehler-beheben. Özet sayfa `/ratgeber` (gruplu).
- **Altyapı:** tipli blok modeli (`types.ts`), satır içi biçim ve fiyat/süre işaretleri (`inline.tsx`; fiyat metne yazılmaz), SEO yardımcıları (`seo.ts`: başlık ≤ 60, canonical, Article + BreadcrumbList + CollectionPage), bileşenler (`components/guide/*`), ikinci kök düzen (`app/ratgeber/layout.tsx`, `<html lang="de">`), Worker yönlendirmesi (`worker/index.ts`), sitemap (`app/sitemap.ts`, `lastModified` = Ratgeber tarihi), CSS (`.gd-*`).
- **İç bağlantı:** ana sayfa altbilgisi → `/ratgeber` (TR/EN/DE, "Rehberler (Almanca)" / "Guides (in German)" / "Ratgeber"); Almanca hizmet sayfalarında "Passende Ratgeber" (3–4 kart, `lib/guides/related.ts`; TR/EN sayfalarda yok); Ratgeber'ler birbirine ve hizmet sayfalarına bağlı (her Ratgeber ≥ 2 gelen bağlantı).
- **Mobil tablo:** < 640 px'te tablo kartlara dönüşür (satır başlığı kart başlığı, her hücrede sütun başlığı, tablo rolleri korunur); uzun teknik sözcükler kırılır. İlk sürümde metin ağırlıklı tablolarda üçüncü sütun ekran dışında kalıyordu; altı genişlikte (320–1280 px) ölçülüp düzeltildi.
- **Araçlar:** `npm test` içinde `scripts/verify-guides.ts` (13 test); `npm run check:links` (75 dış adres canlı; ağ gerektirir, testte değil); `npm run check:freshness` (tarihe bağlı iddialar: Chrome 154, PHP 8.2 sonu, sertifika ömrü, DMARC politikaları, kanun metinleri; süresi gelince kod 1).

Kararlar: (1) Her Ratgeber tek Almanca adreste, `?lang=` yok, hreflang yok; ana site ve hizmet sayfaları eski şemada. (2) FAQPage/HowTo yapılandırılmış verisi yok: Google FAQ zengin sonuçlarını 7 Mayıs 2026'da kaldırdı. (3) Yazar kurum ("Von Sitemendo"), uydurma kişi yok. (4) Fiyat/süre yalnızca `{price.*}`/`{time.*}` ile; test metinde sabit fiyat bulursa kırılır. (5) "garantiert" ve benzeri yalnızca olumsuz bağlamda; abartı listesi testte. (6) Hukuki konularda (Impressum) kanun metni (§ 5, § 33 DDG, § 36 VSBG, § 18 MStV) ve IHK Merkblatt'ı birincil kaynak; "Rechtsberatung değildir" notu; 20.7.2025'te kapanan OS platformu için eski bağlantının kaldırılması söylenir. (7) Ücretsiz kontrolün ne yapıp ne yapmadığı her Ratgeber'de dürüst yazıldı (ör. Formular: e-posta ulaşımı dışarıdan doğrulanamaz; Index: noindex, robots.txt, başlık, açıklama, sitemap; Link: ana sayfadan seçili iç bağlantılar).

Doğrulanan olgular (birincil kaynaktan okundu): Chrome 154 (Ekim 2026) / Chrome 147 (Nisan 2026) "Always Use Secure Connections" (blog.google); sertifika ömrü 200 / 100 / 47 gün (SC-081v3; 15.3.2026 / 2027 / 2029); PHP 8.2 güvenlik desteği 31.12.2026, 8.3: 2027, 8.4: 2028, 8.5: 2029 (php.net); Gmail gönderici kuralları (Şubat 2024); DMARC politikaları DNS'ten (Yahoo `reject`, GMX ve WEB.DE `quarantine`, Gmail/Outlook/T-Online `none`); RFC 7489 yerine RFC 9989 (Mayıs 2026); § 5 / § 33 DDG, § 36 VSBG, § 18 MStV metni; Patchstack 2026 raporu (11.334 zafiyet, %91 plugin, çekirdekte 6); WordPress otomatik güncelleme ve Recovery Mode belgeleri; Google dizinleme belgeleri (Almanca metin). Google belgelerinden biri taşınmıştı (HTTP durum kodları → `developers.google.com/crawling/...`); adresler güncellendi.

Doğrulama: `npm test` 70/70 (57 önceki + 13 yeni; kasıtlı hata eklenerek testlerin gerçekten yakaladığı denendi: kırık bağlantı, bilinmeyen işaret, sabit fiyat, Du-Form, eksik sütun), `lint`, `typecheck`, `build` (40 statik sayfa; 11 Ratgeber + özet). `wrangler dev` (Node 22): `/ratgeber` ve 11 Ratgeber 200, bilinmeyen adres 404, sondaki eğik çizgi 308, başlıklar ve CSP ana sitedekiyle aynı, sitemap 30 adres. Brave + puppeteer-core ile (yalnız yerel): 12 sayfa × altı genişlik (320, 360, 390, 768, 1024, 1280) yatay taşma yok, mobilde kaydırılan tablo yok; ekran görüntüleri incelendi (özet, Ratgeber başı, "Kurz gesagt", tablolar, adımlar, SSS, çağrı bandı, kartlar, kaynaklar, altbilgi, hizmet sayfası kartları). Dış bağlantılar: 75 adres, 0 hata, 0 yönlendirme, 2 adres bot korumasında (W3C Link Checker, Search Engine Land) tarayıcıda açılır. Lighthouse 13 yerelde (Brave, simüle yavaş 4G; `wrangler dev`): özet, iki Ratgeber, hizmet sayfası ve Almanca ana sayfa için Performans / Erişilebilirlik / En iyi uygulamalar / SEO = 100 / 100 / 100 / 100 (mobil ve masaüstü; tek bir soğuk ilk ölçümde mobil Performans 91 ve 98, tekrarlarda 100); sonuç tablosu ve sınırları `docs/seo-strategie.md` bölüm 14. PageSpeed Insights API anahtarı yok; canlıda tarayıcıdan `pagespeed.web.dev` ile tekrarlanır. Deploy / push yok.

**Yayından sonra kullanıcıda kalanlar** (ayrıntı: `docs/seo-strategie.md`, bölüm 8): `git push origin main`; Search Console'da sitemap'i yeniden gönderin ve `/ratgeber` ile üç Ratgeber için dizine eklemeyi isteyin; işletme profiline Almanca ana sayfa adresini girin; takvim: ayda bir `npm run check:freshness`, üç ayda bir `npm run check:links`; 4. / 8. / 12. haftada Search Console'u okuyun.

**Yaklaşan tarihler:** Chrome 154 yayınlanınca (≈ Kasım 2026) HTTPS Ratgeber'ini "duyurdu"dan "… tarihinden beri"ye çevirin; **1 Ocak 2027'de** PHP 8.2 destek sonu: üç Ratgeber ve `lib/report/analyze.ts` içindeki PHP eşiği (şimdi 8.2'nin altı uyarı verir) güncellenecek.

Değişen dosyalar: `lib/guides/*` (yeni: `types.ts`, `inline.tsx`, `seo.ts`, `links.ts`, `index.ts`, `related.ts` ve 11 içerik dosyası), `components/guide/*` (yeni), `app/ratgeber/*` (yeni), `app/sitemap.ts`, `app/globals.css`, `worker/index.ts`, `components/Site.tsx` (altbilgi bağlantısı), `components/ServicePage.tsx`, `components/ServiceRoute.tsx`, `lib/content.ts` (`footer.guides`), `scripts/verify-guides.ts`, `scripts/check-guide-links.ts`, `scripts/check-guide-freshness.ts` (yeni), `package.json`, `docs/seo-strategie.md` (yeni), `README.md`, `DOKUMANTASYON.md`.

### 2026-10-01 — Hizmet sayfaları (arama niyetine cevap veren üç sayfa)

Amaç: kimseyle iletişime geçmeden forma trafik. Site yalnızca marka adıyla bulunabiliyordu (tek sayfa); insanların gerçekten arayacağı konulara cevap veren sayfa yoktu. Eklenenler (TR/DE/EN):
- `/website-check`: ücretsiz kontrol (sekiz nokta, kimler için, adımlar, SSS).
- `/website-repair`: Hızlı düzeltme ve Site onarımı (paket kartları, hangi paket uygun, yeni site yapmadığımızın açık söylenmesi, SSS).
- `/website-care`: Site bakımı (kapsam, 30 dakikalık küçük değişiklik, SSS).

Tasarım kararları: (1) Aynı URL şeması (`?lang=`); yeni yollar `SEO_PATHS` ve `SERVICE_PAGES` ile kayıtlı, canonical, hreflang, sitemap (öncelik 0,8) ve `Service` yapısal verisi otomatik. (2) Fiyat ve süre sayfa metninde TEKRARLANMAZ; paket kartlarından (`content.ts`) okunur, yapısal veride de fiyat yok (ana sayfadaki aynı karar). Test, metinde sabit fiyat olmadığını denetler. (3) LegalPage'in sade kabuğu ve mevcut tasarım belirteçleri; ana sayfanın hareket ve performans ayarlarına dokunulmadı. (4) Ana sayfa altbilgisindeki hizmet bağlantıları artık bu sayfalara gider (arama motorları ve ziyaretçi için). (5) Metin kuralları: abartı yok, uydurma referans yok; kapsam dışı olanlar açıkça yazılı; AGB henüz yazılmadığı için iptal/süre gibi koşullar hakkında söz verilmedi ("başlamadan önce netleştiririz").
Düzeltme: `next.config.ts` geliştirme yeniden yazmaları yolları elle sayıyordu; yeni yollar eklendi. `worker/index.ts` iç dil adresi yönlendirmesi (`/de/website-check` → `/website-check?lang=de`) artık `SEO_PATHS`'ten üretiliyor.

Doğrulama: `npm test` 57/57 (5 yeni: üç dilde eksiksizlik, meta uzunlukları, fiyat tekrarı yok, metin kuralları, SEO kaydı), `lint`, `typecheck`, `build` (28 sayfa). `wrangler dev`: üç sayfa üç dilde 200; başlık, canonical, hreflang, `Service` yapısal verisi doğru; fiyatlar kartlardan (149 €, 349 €, 49 € / month); iç adres 301; ana sayfa altbilgisi yeni sayfalara bağlı. Tarayıcıda mobil (371 px) ve masaüstü (1280 px): iki paket kartı yan yana, yatay taşma yok, SSS ve çağrı bandı yerinde. Lighthouse bu sayfalarda ölçülmedi (`npm run measure` yalnız ana sayfa); sayfalar statik ve hafif. Deploy / push yok.

**Yayından sonra kullanıcıda kalanlar:** Google Search Console (mülk ekle, sitemap'i gönder; doğrulama etiketi verilirse `layout.tsx` metadata'sına `verification.google` eklenir), Google işletme profili (hizmet bölgesi işletmesi).

Değişen dosyalar: `lib/servicePages.ts`, `components/ServicePage.tsx`, `components/ServiceRoute.tsx`, `app/[lang]/website-{check,repair,care}/page.tsx` (yeni), `lib/seo.ts`, `app/sitemap.ts`, `app/globals.css`, `components/Site.tsx` (altbilgi bağlantıları), `next.config.ts`, `worker/index.ts`, `scripts/verify-service-pages.ts` (yeni), `package.json`, `README.md`, `DOKUMANTASYON.md`.

### 2026-10-01 — Hata uyarısı, onay hatırlatması ve önizleme

Rapor ancak onayla gittiği için sessiz kalan bir Workflow müşteriye verilen 48 saatlik sözü kaçırtabilir. Eklenenler:
- **Hata uyarısı** (`worker/report.ts`, `lib/report/alerts.ts`): Workflow beklenmedik bir hatayla durursa sana müşteri, site, söz verilen teslim ve elle başlangıç araçlarıyla (PageSpeed, SSL Labs, W3C) bir uyarı gelir; sonra hata yeniden fırlatılır (örnek "errored" görünür).
- **Hatırlatma ve süre doldu:** taslaktan 36 saat sonra onay yoksa, söz verilen teslime ~12 saat kala hatırlatma (aynı düzenleme bağlantısıyla); 36 saat daha sonra hâlâ onay yoksa rapor gönderilmez ve sana "süre doldu" bildirimi gelir. Toplam bekleme 72 saat. `REPORT_APPROVAL_WAIT` ("6 seconds" gibi) yalnız yerel denemede süreyi kısaltır; boşsa 36 saat.
- **Önizleme** (`worker/approve.ts`): düzenleme sayfasında "Önizleme" düğmesi, düzenlenmiş raporu müşterinin alacağı haliyle (izole `sandbox` çerçevede) gösterir; gönderilmez. Site adı bağlantıya konmadığı için örnek ad (`siteniz.com`) görünür. Düzenlemeler gizli alanlarla taşınır; "Bu haliyle müşteriye gönder" buradan gönderir.

Doğrulama: `npm test` 52/52 (6 yeni), `lint`, `typecheck`, `wrangler deploy --dry-run`. `wrangler dev` (`REPORT_APPROVAL_WAIT=6 seconds`): taslak → hatırlatma → "onay süresi doldu" bildirimi → tamamlandı. Önizleme tarayıcıda açıldı: düzenlenmiş Almanca rapor örnek adla göründü, "Henüz gönderilmedi" uyarısı var, CSP `srcdoc` çerçevesine izin veriyor. E-posta anahtarı yok, hiçbir mail gitmedi. Hata uyarısının Workflow içindeki `catch` yolu yerelde tetiklenemedi (doğal bir hata üretmek zor); içeriği testli, bağlantısı kod incelemesiyle doğrulandı. Deploy / push yok.

Değişen dosyalar: `lib/report/alerts.ts` (yeni), `worker/report.ts`, `worker/approve.ts`, `scripts/verify-report-alerts.ts` (yeni), `package.json`, `README.md`, `DOKUMANTASYON.md`.

### 2026-10-01 — Raporu elle düzeltme (onay sayfası düzenleyici)

Kullanıcı otomatik raporu göndermeden önce elle düzeltebilmek istedi. Onay sayfası artık bir düzenleyici (`worker/approve.ts`):
- **Bulguyu çıkar:** sorunlu (acil/orta) her bulgu bir işaret kutusu; işareti kaldırılan rapordan çıkar. Bir kontrolün bütün bulguları çıkarılırsa o satırda "Elle kontrol edildi" yazar.
- **Not:** raporun başında görünen, en çok 800 karakterlik not (müşterinin dilinde yazılır).
- **Ek bulgu:** en çok 3; kontrol, önem (acil/orta), bulgu ve önerilen adım. Otomatik ölçülemeyen şeyler için (ör. telefonda menü açılmıyor).
- Hiçbir şeye dokunmadan göndermek, e-postada görülen raporu aynen gönderir.

Tasarım (veritabanı yok): bulgular `l` (dil) ve `d` (kodlanmış bulgular) olarak imzalı bağlantıda taşınır; HMAC örnek kimliği, dil ve bulguları kapsar, bağlantıdaki hiçbir şey değiştirilemez. Düzenleme onay olayının yükünde Workflow'a gider; Workflow yükü yeniden temizler (`sanitizeEdits`) ve gönderilen rapora uygular (`applyEdits`). Eski (bulgusuz) bağlantılar hâlâ çalışır. Sayfadan gelen her metin düz metindir; yazdırılırken kaçırılır. Taslak e-postadaki düğme "Raporu incele ve gönder".

Doğrulama: `npm test` 46/46 (9 yeni: temizleme, uygulama, bağlantıda taşıma ve bozuk girdi reddi, e-postada kaçırma, sayfa davranışı, imzanın değiştirilememesi, tamamlanmış örneğe ikinci onay), `lint`, `typecheck`, `wrangler deploy --dry-run`. `wrangler dev` + gerçek tarayıcı: düzenleme sayfası açıldı, bir bulgu işareti kaldırıldı, not ve ek bulgu yazıldı, gönderildi; Workflow `report approved: { dropped: 1, extra: 1, note: true }` kaydetti ve tamamlandı. E-posta anahtarı yok, hiçbir mail gitmedi. Deploy / push / commit yok.

Henüz yok: gönderilmeden önce **önizleme** (düzenlenmiş raporu görme). Düzenlenmiş raporun metni e-postada aynı şablonla üretiliyor ama sayfada gösterilmiyor; ilk haftalarda kendine bir test raporu göndermek en güvenlisi.

Değişen dosyalar: `lib/report/edit.ts` (yeni), `lib/report/types.ts`, `lib/report/copy.ts` (`manual.ok`, not etiketi), `lib/report/render.ts`, `lib/report/token.ts` (imzaya ek veri), `worker/approve.ts`, `worker/report.ts`, `scripts/verify-report-edit.ts` (yeni), `scripts/verify-report.ts`, `package.json`, `README.md`, `DOKUMANTASYON.md`.

### 2026-10-01 — Ücretsiz kontrol raporu otomatik (Cloudflare Workflow)

Kullanıcı rapor hazırlamayı elle yapmak istemiyor (bildirim e-postasındaki "Hızlı başlangıç" araçlarıyla bakıyordu) ve kimseyle kendiliğinden iletişime geçmek istemiyor. Karar (kullanıcı): motor Cloudflare Workflows'ta çalışsın (ek sunucu yok, "barındırma ücretsiz" kararına uyar); ilk haftalar rapor önce kullanıcıya gelsin, onayla müşteriye gitsin.

Ne değişti:
1. **Rapor motoru** (`lib/report/`): sekiz noktanın dışarıdan ölçülebilen karşılığı. Mobil (viewport, PageSpeed mobil puanı), hız (LCP, sunucu yanıtı), bağlantılar (ana sayfadaki en çok 12 iç bağlantı; 401/403/429 kırık sayılmaz), HTTPS (yönlendirme, karışık içerik), formlar (şifresiz ya da mailto gönderim; form gönderilmez), altyapı (CMS, eski jQuery < 3.5, desteği biten PHP; yalnız kesin eşikler), indeks (noindex, robots.txt, başlık, açıklama, site haritası), iletişim (tel, e-posta, adres, iletişim ve Impressum bağlantısı). Ölçülemeyen şey "ölçülemedi" ya da "bilgi" olarak gösterilir, uydurulmaz. Metinler üç dilde (`copy.ts`), site metin kurallarına uygun.
2. **Workflow** (`worker/report.ts`): ana sayfa → (bağlantılar, robots.txt, PageSpeed paralel) → rapor → mail. Adımlar ayrı kaydedilir, yeniden denenir; Resend idempotency anahtarı iki kez gönderimi engeller. Kayıtlara adres/e-posta/içerik yazılmaz.
3. **Onay** (`worker/approve.ts`): taslak yalnız sana gider; imzalı (HMAC) bağlantı bir onay sayfası açar, gönderim yalnız sayfadaki düğmeyle (POST). GET hiçbir şeyi tetiklemez (e-posta tarayıcıları bağlantıyı önceden açar). Aynı kaynak (Origin) denetimi, tamamlanmış örneğe ikinci onay reddi, IP başına deneme sınırı. `REPORT_APPROVAL_SECRET` yoksa rapor kendiliğinden gitmez.
4. Form (`worker/audit.ts`) başarılı olunca Workflow'u başlatır; başlatılamazsa form yine başarılıdır. Sana ve ziyaretçiye giden mevcut iki mail aynı.
5. **Gizlilik metni** üç dilde "Ücretsiz kontrol raporu" bölümü (Google PageSpeed'e yalnız site adresi gider, Workflow durumu en çok 3 gün); "Son güncelleme" 1 Ekim 2026.
6. **Güvenlik düzeltmesi (mevcut canlı kod):** `analyzeHead` (`lib/precheck.ts`, anında ön kontrol) kapanışsız `<meta>` etiketleriyle dolu 256 KB'lık bir sayfada ~15 sn CPU yakıyordu (kuadratik regex). Sınırlı kalıba çevrildi (1 ms); sonuç normal sayfalarda aynı, mevcut testler geçiyor. Yeni kod aynı hataya karşı testli.

Doğrulama: `lint`, `typecheck`, `build`, `npm test` 37/37 (14'ü eski, 23 yeni). `wrangler deploy --dry-run` (Node 22): `REPORT_WORKFLOW` bağlaması tanındı. `wrangler dev`: form → Workflow → rapor (`example.com`) → taslak adımı; onay akışı uçtan uca (yanlış imza 404, GET durumu değiştirmez, başka kaynaktan POST 404, imzalı POST Workflow'u devam ettirip müşteri adımına getirdi). E-posta anahtarı yok, hiçbir mail gitmedi. Ortak mail stilinde TR/DE/EN ve onay taslağı tarayıcıda görsel olarak kontrol edildi. Deploy / push yok.

**Canlıya almadan önce kullanıcıda kalanlar:**
- [ ] Cloudflare Worker secret'ları: `PSI_API_KEY` (Google PageSpeed anahtarı; anahtarsız kota dolu, hız "ölçülemedi" olur), `REPORT_APPROVAL_SECRET` (uzun rastgele metin). `RESEND_API_KEY`, `AUDIT_NOTIFY_EMAIL` zaten var.
- [ ] PageSpeed `fields` daraltması anahtarsız doğrulanamadı (kota dolu). İlk gerçek raporda "ölçülemedi" çıkarsa Workers kaydında `report psi: response too large` aranır; kod büyük yanıtı ayrıştırmaz, değer uydurmaz.
- [ ] Adım başına 10 ms CPU yerelde ölçülemez (wrangler dev sınırı uygulamaz). Büyük bir sitede adım hata verirse Workers kaydına bakılır; ücretli plan sınırı 30 sn.
- [ ] Gizlilik metni hukuki kontrolü (yukarıdaki madde) yeni bölümü de kapsamalı: Google LLC (ABD) aktarımı ve Workflow durum kaydı.
- [ ] Mevcut onay e-postası "48 saat içinde" diyor: onay modunda rapor ancak onayla gider. Taslaktaki "Söz verilen teslim" saatine dikkat; 2 gün içinde onaylanmazsa rapor hiç gitmez.
- [ ] Güven oluşunca `REPORT_SEND_MODE=customer`.

Değişen dosyalar: `lib/report/*` (yeni), `worker/report.ts`, `worker/reportNet.ts`, `worker/approve.ts`, `worker/cloudflare-workers.d.ts` (yeni), `worker/audit.ts`, `worker/index.ts`, `worker/precheck.ts` (dışa aktarım), `lib/auditMail.ts` (yardımcılar dışa aktarıldı), `lib/precheck.ts` (sınırlı regex, dışa aktarım), `lib/auditRateLimit.ts`, `lib/content.ts` (gizlilik), `wrangler.jsonc`, `package.json`, `.env.example`, `README.md`, `scripts/verify-report.ts`, `scripts/verify-report-worker.ts`, `DOKUMANTASYON.md`.

### 2026-09-27 — Manifest kalktı

Kullanıcı manifest’in gerekli olmadığını söyledi. `app/manifest.ts` silindi; sayfa artık `manifest.webmanifest` üretmiyor ve ona bağlanmıyor. Favicon ve apple ikonu duruyor. Worker’daki gecikmeli manifest ekleme ve uçuş verisinden silme de kalktı. Fiyat ve kapsam aynı. Karttaki 98 elle değişmedi.

Doğrulama: `build` (TypeScript geçti, 19 sayfa, `manifest.webmanifest` rotası yok). `out/en.html` içinde manifest yok; favicon ve apple ikonu duruyor. Yerel sayfa stilli. Boş form "Geçerli bir site adresi girin. Örnek: siteadi.com". E-posta gitmedi. Fiyatlar aynı. Kullanıcı yayın sordu; bu hali `main`'e push edilir.

### 2026-09-27 — İlk gezinti: CSS, mono, manifest

Kullanıcı İngilizce sayfanın ilk gezintisinde şu isteklerin puanı düşürdüğünü söyledi: belge 150 ms, `/fonts/mono.css` 904 ms, iki Plex latin dosyası ~1 sn, `manifest.webmanifest` 252 ms, Next CSS parçası 195 ms / 10 KB. Fiyat ve kapsam aynı. Karttaki 98 elle değiştirilmedi.

1. **CSS.** `experimental.inlineCss` stili HTML'nin içine gömer. Yazı tipi adresi `/_next/static/media/...` olur. Ayrı stil parçası isteği kalktı. Belge büyür (yerelde gzip yaklaşık 34 KB); o istek ilk boyamayı artık bekletmez.
2. **Mono.** Worker ilk büyük boyamada `/fonts/mono.css` eklemiyor. İlk kaydırmada, yoksa 8 sn sonra gelir; o zamana kadar fiyatlar `ui-monospace`. İki woff2 ancak o CSS inince istenir.
3. **Manifest.** `<link rel="manifest">` ilk HTML'den ve uçuş verisinden çıkarılıyor. Hidrasyon bağlantıyı geri koyuyordu. Mono ile aynı anda, 8 sn sonra ekleniyor.

Doğrulama: `typecheck` derlemenin içinde geçti, `build` 20 sayfa. Yerel Worker `/?lang=en`: stil gömülü, ayrı CSS parçası yok, ilk saniyelerde mono ve manifest yok. Taze yüklemede mono.css 8,0 sn'de indi. Lighthouse 12, mobil, tek çalıştırma: istek listesinde belge ve Inter var; `mono.css`, iki Plex dosyası, manifest ve CSS parçası yok. Puan 96–99 arası oynadı (TBT gürültüsü); karttaki 98 elle değişmedi, beş ölçüm yayından sonra. Sayfa stilli. Boş form "Enter a valid website address. Example: yoursite.com". Çakı etiketi Hız bölümüne gidiyor. E-posta gitmedi.

Değişen dosyalar: `next.config.ts`, `worker/index.ts`, `app/globals.css`, `DOKUMANTASYON.md`.

### 2026-09-27 — Performans: hidrasyon görevini kısalt

Kullanıcı canlı puanın düşük kaldığını, yükseltilmesini istedi. Karttaki 82, 26 Eylül ölçümü; elle değiştirilmedi. Fiyat ve kapsam aynı.

Puanı tutan şey tek uzun ana iş parçacığı göreviydi (önceki yerel ölçümde TBT 360 ms, puan 91). GSAP kurulumu hidrasyonla aynı görevde çalışıyordu; çakının katmanları da istemci ağacındaydı.

1. **Çakı gövdesi.** `components/KnifeArt.tsx` sunucu bileşeni. Sayfa onu `Site`'a çocuk olarak veriyor; yüzlerce katman istemci paketine ve hidrasyona girmiyor. Etiketler ve tıklama `HeroKnife`'ta kaldı. İmleç eğimi GSAP'i yalnız `pointerenter`'da indiriyor. Ölçüm sırasında bu paket inmiyor.
2. **Kaydırma hareketi.** `ScrollMotion` ana pakette değil. İlk kaydırmada, yoksa 8 sn sonra geliyor. Hareket azaltılmışsa hiç inmiyor. Örnek rapor listesi açılınca `OpenReveal` aynı yoldan iniyor. Form hidrasyonu bekletilmedi.

Yerel Worker (`127.0.0.1:8787`), Lighthouse 12, mobil, tek çalıştırma: **99**. FCP 1,0 sn, LCP 1,4 sn, TBT 110 ms (0,97), hız endeksi 2,5 sn, CLS 0. Canlı beş ölçümün ortancası (`npm run measure`, 27 Eylül 2026): Performans **98**, Erişilebilirlik 100, En iyi uygulamalar 100, SEO 100. `lib/selfCheck.json` bu ölçümle güncellendi.

Doğrulama: `typecheck`, `lint`, `test` 14/14, `build`. Çakı HTML'de (36 katman), etiketler Hız…SEO. Boş form "Geçerli bir site adresi girin. Örnek: siteadi.com". Çakı etiketi `check-speed` vurgusunu açıyor. Dil DE olunca etiketler Tempo / Formulare. E-posta gitmedi.

Değişen dosyalar: `components/KnifeArt.tsx` (yeni), `components/HeroKnife.tsx`, `components/ScrollMotion.tsx` (yeni), `components/OpenReveal.tsx` (yeni), `components/Site.tsx`, `app/[lang]/page.tsx`, `lib/selfCheck.json`, `DOKUMANTASYON.md`.

### 2026-09-27 — Son hali sitemendo.com'a yayın

Kullanıcı çalışma kopyasındaki son hali sitemendo.com'a almamı istedi. Bu makinede Wrangler oturumu yok (`wrangler whoami` giriş istiyor). Yayın yolu README'deki gibi: `main`'e push, Cloudflare Workers Builds derler (`npm run build`) ve `npx wrangler deploy` ile çıkarır. Secret'lar panelde duruyor; bu turda değişken eklenmedi.

Yayına giren, 26 Eylül'den beri commit edilmemiş iş: kontrol ızgarası ve çakı bağlantısı, mobil hizmet sayacı, anında ön kontrol, kendi ölçüm kartı (karttaki 82), Inter alt kümesi, HTML gzip, mono ve betiklerin ilk boyamadan sonra gelmesi, kısaltılmış açılış. Fiyatlar ve kapsam değişmedi.

Yerel doğrulama (Node 22): `npm test` 14/14, `typecheck`, `lint`, `next build` (20 statik sayfa). Commit `7b78a56`, `main`'e push. GitHub Check işi geçti.

Canlı (https://sitemendo.com): Türkçe sayfada kontrol ızgarası, ölçüm kartı (82) ve fiyatlar duruyor. HTML gzip (yaklaşık 13 KB). Boş form "Geçerli bir site adresi girin. Örnek: siteadi.com" diyor; e-posta gitmedi. `www` 308 ile ana adrese gidiyor. Almanca sayfa açılıyor. `POST /api/precheck` yerel adrese 422 `BLOCKED` (dış site açılmadı, e-posta yok). Karttaki 82 bu yayından sonra yeniden ölçülmedi.

### 2026-09-26 — Performans: mono ve betikler ilk boyamadan sonra

Kullanıcı, 90 puanlık yerel ölçümden sonra kalan iki kolu da istedi: IBM Plex Mono ilk boyamada inmesin, Next betikleri ilk büyük boyamadan sonra gelsin. Fiyatlar ve kapsam aynı. Karttaki 82 elle değiştirilmedi. Yayın yok.

1. **Mono.** Çakı etiketleri `var(--sans)` (Inter). `next/font` IBM Plex kalktı; dört dosya `public/fonts/` altında, `/fonts/mono.css` yalnız ilk büyük boyamadan sonra ekleniyor. `:root` yedeği `ui-monospace`. `html[data-mono]` gelince fiyatlar ve diğer mono metin Plex'e dönüyor. İlk denemede aile adı ana CSS'te kaldığı için tarayıcı dosyaları yine indiriyordu; yüzler `html:not([data-mono])` ile değişse de istek durmuyordu.
2. **Betikler.** Worker, `/_next/static` betik etiketlerini ve `rel=preload as=script` bağlantılarını HTML'den çıkarıyor. `noModule` yedeği duruyor. İlk büyük boyama (yoksa 2,5 sn) sonrası betikler `async` ile ekleniyor; aynı anda mono.css ve `data-mono`. `defer` daha önce ilk boyamayı geciktirdiği için kullanılmadı. `async=false` indirmeyi yaklaşık 1 sn geciktiriyordu.
3. **Çakı.** Betikler gecikince Lighthouse'ta ilk sunulan kare 2,4 sn'ye kaydı: çakının sürekli 3D kareleri yaklaşık bir saniye düşüyordu, hız endeksi 4,2 sn, puan 89. JS varken animasyon ilk karede duraklı (`scripting: enabled`); çift `requestAnimationFrame` sonra `data-motion` ile açılıyor. JS yoksa animasyon eskisi gibi hemen oynuyor.

Yerel Worker (`127.0.0.1:8787`, HTTP/1.1), Lighthouse 12, mobil, yavaş 4G, sakin çalıştırma: **91**. FCP 0,9 sn (1), LCP 1,4 sn (1), TBT 360 ms (0,72), hız endeksi 2,7 sn (0,96), CLS 0. Gözlenen ilk boyama ve LCP 1,25 sn. 95 yok: puanı tutan metrik TBT. Hidrasyonun uzun görevi ilk boyamadan sonraki 5 sn penceresinde kaldığı için sayılıyor. Betiği 5 sn daha ertelemek formu ölü bırakır; yapılmadı. Tek çalıştırma, beşin ortancası değil. Karttaki 82 yayın sonrası `npm run measure` ile güncellenir. `lib/selfCheck.json` elle değişmedi.

Doğrulama: `build` (TypeScript adımı geçti). Tarayıcıda çakı açık, etiketler Inter, fiyat IBM Plex, `data-motion` ve `data-mono` dolu. Boş form "Geçerli bir site adresi girin. Örnek: siteadi.com" diyor; e-posta gitmedi. Deploy / push yok.

Değişen dosyalar: `app/[lang]/layout.tsx`, `app/globals.css`, `worker/index.ts`, `public/fonts/mono.css` (yeni), `public/fonts/plex-mono-400-lat.woff2`, `public/fonts/plex-mono-400-ext.woff2`, `public/fonts/plex-mono-500-lat.woff2`, `public/fonts/plex-mono-500-ext.woff2` (yeni), `DOKUMANTASYON.md`.

### 2026-09-26 — Performans: yazı tipi, HTML sıkıştırma, kısa açılış

Kullanıcı, bir önceki ölçümde sıralanan üç işi istedi: Türkçe harfleri tek yazı tipi dosyasında önden yüklemek, HTML'i gerçekten sıkıştırmak, başlık ve çakı açılışını kısaltmak. Karttaki 82 elle değiştirilmedi. Yayın yok.

1. **Yazı tipi.** Inter 4.1 değişken dosyasından sayfada kullanılan harfler kesildi (`app/fonts/inter-subset.woff2`, 34 KB, yalnız ağırlık ekseni). İçinde temel Latin, Türkçe ğ ş ı İ Ğ Ş, tırnak, tire, ok ve euro var. Lisans `app/fonts/OFL.txt`. `next/font/local` bunu `--font-sans` olarak önden yüklüyor; `font-display: swap`. Ayrı latin-ext dosyası kalktı. Almanca umlautlar zaten temel Latince olduğu için ayrıca dosya gerekmiyor. IBM Plex Mono (etiketler) duruyor: dört küçük dosya, önden yüklenmiyor.
2. **Sıkıştırma.** `worker/index.ts` gövdeyi `CompressionStream` ile gzip'liyor ve `encodeBody: 'manual'` koyuyor. Başlık tek başına yetmiyor; onsuz çalışma zamanı gövdeyi ikinci kez sıkıştırıp tarayıcıya bozuk sayfa veriyor. Kimlik isteği düz HTML kalıyor. Yerelde: 12.557 bayt gzip, açılınca 59.955 bayt, `<!DOCTYPE html` ile başlıyor. `Vary: Accept-Encoding` var.
3. **Açılış.** Başlık `hero-rise` 0,3 sn. Paragraf 0,25 sn, 0,05 sn gecikmeyle, yalnız kayma (görünmez kalmıyor). Çakı yörüngesi 0,25 sn; aletler en geç 0,4 sn'de bitiyor, süreler yola orantılı. Etiketler 0,4 sn sonra beliriyor. Hareket azaltılmışken etiket animasyonu da kapanıyor (kural, animasyondan sonra geldiği için önceki blok onu kapatmıyordu).

Yerel Worker (`127.0.0.1:8787`, HTTP/1.1) üzerinde Lighthouse 12, mobil, yavaş 4G, sakin bir çalıştırma: 90. FCP 1,3 sn, LCP 2,8 sn, TBT 280 ms, hız endeksi 1,3 sn, CLS 0, metin sıkıştırma geçiyor. Gözlenen LCP yaklaşık 0,3 sn; simülasyon onu 2,8 sn'ye çekiyor. Tarayıcı da açıkken bir çalıştırma 80 çıktı, TBT 590 ms'ye sıçradı. 95 yok: hızlı makinede bütün betikler ve dört mono yazı tipi, hero metni boyanmadan önce bittiği için Lighthouse onları LCP'nin önüne yazıyor. Betikleri `defer` yapmak denendi, ilk boyamayı geciktirdiği için geri alındı. `font-display: optional` LCP'yi oynatmadı (o denemede puan 93'tü, LCP yine 2,8 sn) ve geç kalırsa yazı yedekte kalacağı için kullanılmadı.

Doğrulama: `typecheck`, `test` 14/14, `build`. Tarayıcıda Türkçe harfler Inter ile duruyor, çakı açık, başlık 0,3 sn animasyonlu ve sonunda tam görünür. Boş form "Geçerli bir site adresi girin" diyor; e-posta gitmedi. Deploy / push yok. Karttaki sayı yayın sonrası `npm run measure` ile güncellenir.

Değişen dosyalar: `app/fonts/inter-subset.woff2` (yeni), `app/fonts/OFL.txt` (yeni), `app/[lang]/layout.tsx`, `app/globals.css`, `components/HeroKnife.tsx`, `worker/index.ts`, `DOKUMANTASYON.md`.

### 2026-09-26 — Performans 82 → 95 üstü: ölçüm (kod yok)

Kullanıcı karttaki mobil Lighthouse puanını (82) 95'in üstüne nasıl çıkaracağını sordu. Bu turda kod değişmedi. Canlı site ölçüldü (`lighthouse@12`, mobil, yavaş 4G, CPU ×4, `/?lang=tr`). Tek çalıştırma 87 çıktı; karttaki 82 beş çalıştırmanın ortancası, yani hedef tek seferlik 95 değil, ortancada 95'in üstü olmalı.

Puanı tutan iki metrik: LCP 3,4 sn (puan 0,66) ve Hız Endeksi 4,4 sn (0,74). TBT 120 ms (0,97), CLS 0. Sunucu yanıtı 50 ms. LCP öğesi hero alt paragrafı (`p.lead`); sürenin %81'i render gecikmesi (2,8 sn), indirme değil.

Filmstrip: 1,7 sn'ye kadar ekran boş. 2,3 sn'de paragraf ve kapalı çakı var, başlık hâlâ kırpılmış (`hero-rise`). 2,9 sn'de başlık yarı açık, aletler çıkıyor. 3,5 sn'de hero son hâlinde. LCP'nin 3,4 sn'ye kayması, Türkçe harflerin durduğu Inter latin-ext dosyasının (86 KB, önden yüklenmiyor; önden yüklenen 49 KB'lık dosya yalnız temel Latin) geç gelmesiyle örtüşüyor. Ana iş parçacığında 2,6 sn iş ve 2035 görev var; bunun büyüğü çakının katmanlı açılışı. HTML 54 KB ve sıkıştırmasız (`uses-text-compression`, 42 KB). Sıkıştırma Worker'da yazıldı, yayında değil.

95 için üç iş, bu sırayla: Türkçe sayfada latin-ext'i önden yüklemek ya da hero'da kullanılan harflerden tek küçük dosya üretmek (LCP'yi ilk boyamaya çekmek); HTML sıkıştırmasını yayınlamak; başlık kırpmasını ve çakı açılışını kısaltmak ki ekran 3,5 değil yaklaşık 2,5 sn'de son hâline gelsin. Kullanılmayan JS (54 KB) TBT'yi oynatmıyor; puanı 95'e o taşımaz. `lib/selfCheck.json` elle değiştirilmez; yayın sonrası `npm run measure`.

Değişen dosya: `DOKUMANTASYON.md`. Deploy / push yok.

### 2026-09-26 — Kontrol ızgarası, çakı bağlantısı, hizmet sayacı

Kullanıcı seçti: kontrol kapsamını çakı etiketleriyle eşleşen görsel ızgaraya çevirmek ve tek listeye bağlamak; telefonda hizmet kaydırmasına sayaç. "Önce tespit" bölümü, kendi ölçümü ve anında ön kontrol aynı gün başka bir oturumda yapıldı; onlara dokunulmadı. Fiyat, süre ve kapsam değişmedi.

1. **Tek kaynak.** Her kontrol maddesine `key` ve kısa ad (`tag`) eklendi (TR/EN/DE). Çakı etiketleri `hero.tools` listesinden kalktı; kısa adlardan geliyor. Ücretsiz karttaki sekiz ayrı madde kalktı (`fromChecks`): kart, aynı kısa adları etiket olarak gösteriyor, altında yalnız "Rapor ve öncelik listesi" duruyor. Onay e-postası hâlâ maddelerin tam başlığını kullanıyor.
2. **Izgara.** Kontrol kapsamı telefonda ikon solda, 640 px'ten itibaren iki sütun, 1080 px'ten itibaren dört sütun. Her kartta çizgi ikon (`components/CheckIcon.tsx`), numara, kısa ad, başlık ve açıklama. Sütunlar arasında dikey çizgi.
3. **Çakı.** Etiket ve alet tıklanınca ilgili karta gider (`#check-…`). Kartın üstünde gösterge çizgisi açılır, ikon sülfüre döner, 2.4 sn sonra söner. Kart henüz kaydırma animasyonunun başındaysa içerik vurgu süresince hemen okunur. Etiketler sekme sırasında yok (aynı bilgi ızgarada); ücretsiz karttaki etiketler gerçek bağlantı.
4. **Sayaç.** Telefonda kartların üstünde `01 / 04` ve dört nokta (`components/RailDots.tsx`). Nokta ilgili karta kaydırır; kaydırınca sayaç güncellenir. Kartlar uzun olduğu için sayaç menünün altında sabit kalır, menü çekilince ekranın üstüne yaklaşır. Masaüstünde gizli.

Doğrulama: `lint`, `typecheck`, `test` (14/14). Playwright: çakı etiketi HTTPS kartını ortaya getirip vurguyu açıyor, kart başlığı okunur (opacity 1); ücretsiz karttaki etiket de vurgu açıyor; hareket azaltılmışken gidiş anında. TR 1440, DE 820, EN 1280 ızgaralarında taşma yok. Telefonda (390) ikinci noktaya basınca sayaç `02 / 04`, kart "Hızlı düzeltme", sayaç kaydırınca üstte kalıyor; yatay taşma yok, konsol hatası yok. Deploy / push yok.

Değişen dosyalar: `lib/content.ts`, `components/CheckIcon.tsx` (yeni), `components/RailDots.tsx` (yeni), `components/HeroKnife.tsx`, `components/Site.tsx`, `app/globals.css`, `DOKUMANTASYON.md`.

### 2026-09-26 — Görünüm ve etkileyicilik: güncel durum ve öneriler (kod yok)

Kullanıcı görünümü ve etkileyiciliği iyileştirmek için ne yapması gerektiğini sordu. Bu turda kod değişmedi.

Çalışma kopyasında commit edilmemiş, bu belgede kaydı olmayan değişiklikler bulundu (`app/globals.css`, `components/Site.tsx`, `components/HeroKnife.tsx`, `components/LegalPage.tsx`, `lib/content.ts`, `lib/useScrollMotion.ts`). Aynı günkü analizin önerilerinin bir kısmını uyguluyorlar: hero başlığı büyüdü; çakı aletlerinde kontrol etiketleri (`hero.tools`: Mobil, Hız, Bağlantılar, HTTPS, Formlar, SEO); `#report` ve `#how` koyu, `#start` sülfür zemin; hizmetler masaüstünde dört sütun (subgrid), mobilde yana kaydırma; teslim süresi ayrı satır (`time`), aşama etiketlerinden "Adım N" kalktı; son bölümde yeni başlık + alt metin (`final.title` / `final.sub`); telefonda alt sabit CTA (`MobileCta`); footer imza metni (`footer.mark`) kalktı; orta genişlikte kısa menü düğmesi 768 px'ten başlıyor. `npm run lint`, `npm run typecheck`, `npm test` temiz.

Ölçüm: Playwright (headless Chromium), TR, 1440×900 ve 390×844. Sayfa yüksekliği masaüstünde 6946 px, mobilde 8070 px.

Hâlâ zayıf kalanlar:
1. `#about` ("Önce tespit. Sonra net bir plan."): küçük metin, geniş boşluk, hero'yu tekrar ediyor.
2. `#checks`: sekiz satırlık düz metin tablosu, görsel öğe yok; açıklamalar küçük ve gri. "Site kontrolü" kartındaki sekiz maddeyle hâlâ örtüşmüyor. Çakı etiketleri bu maddelere bağlı değil.
3. `#how`: koyu zeminde küçük metin, çok boşluk; numaralar küçük mono.
4. Mobilde hizmet kartlarının yana kaydığı yalnız kesilen ikinci karttan anlaşılıyor; gösterge yok.
5. Kanıt yok: gerçek ölçüm, sonuç ya da referans gösterilmiyor; rapor örneği statik.

Öneriler (kullanıcı seçti; ızgara, çakı bağlantısı ve hizmet sayacı yukarıdaki görevde yapıldı): kontrol kapsamını çakı etiketleriyle eşleşen görsel ızgaraya çevirip tek kaynağa bağlamak (etikete tıklayınca ilgili madde); `#about` bölümünü kaldırmak ya da hero altına tek satır yapmak; bölüm açıklamalarında boyut ve kontrastı artırmak; adımlarda büyük numaralar; mobil hizmet kaydırmasına sayaç / nokta göstergesi; gerçek verilerle anında ön kontrol (Worker, gizlilik metni güncellemesi); sitemendo.com'un kendi ölçüm sonuçlarını kanıt olarak göstermek; rapor örneğinde temsili önce / sonra görünümü.

Değişen dosya: `DOKUMANTASYON.md`. Deploy / push yok.

### 2026-09-26 — Eksik ve dengesizlik analizi (kod yok)

Kullanıcı projeyi başlatıp eksikleri ve görsel dengesizlikleri bulmamı, daha etkileyici bir sürüm için öneri sunmamı istedi. Bu turda kod değişmedi.

Ortam: `npm run dev` → `http://localhost:3000` çalışıyor. Sistemde Node 20.20 var, `.nvmrc` 22 istiyor (`next dev` çalışıyor; `wrangler` / `npm run preview` Node 22 ister). `npm run lint`, `npm run typecheck`, `npm test` (8/8) temiz.

Ölçüm: Playwright (headless Chromium), TR/DE/EN × 1440 / 1024 / 820 / 390 / 360. Yatay taşma ve kırpılan metin yok; tam kaydırmadan sonra gizli öğe 0; konsol hatası yok.

Bulunan dengesizlikler:
1. **Hizalama:** "Önce tespit. Sonra net bir plan." (`#about`) diğer bölümlerle aynı sol kenarda değil: `.about__wrap { max-width: 65ch }` + `.wrap { margin: auto }` bloğu ortalıyor. Başlık sol kenarı 1440'ta 427 px (diğerleri 226), 1024'te 204 (41), 820'de 94 (33).
2. **Tipografi hiyerarşisi zayıf:** h1 masaüstünde 34 px, tablet/mobilde 26 px; h2 23 / 20 px (oran ~1.3). Hero bölüm başlıklarından zor ayrılıyor. Son bölüm başlığı (`h2--lg`) hero h1 ile aynı boyutta.
3. **Hizmet kartları:** liste maddeleri (17 px) paket adından (17 px) ve fiyattan görsel olarak daha baskın; fiyat küçük mono. Teslim süresi ("2 iş günü", "Genellikle 5 iş günü") özellik listesinin maddesi olarak duruyor. Dört paket alt alta; bölüm masaüstünde ~1970 px, mobilde ~2530 px (sayfanın en uzun bölümü).
4. **Öne çıkan kart taşması:** ücretsiz kart negatif kenar boşluğuyla ızgaradan taşıyor (masaüstünde 18 px sola); mobilde kenarlığı ekran kenarına değiyor, diğer içerik 16 px içeride.
5. **İçerik tutarsızlığı:** aynı ücretsiz kontrol iki farklı 8 maddeyle anlatılıyor. `checks` (HTTPS, iletişim yolları, altyapı, indeks…) ile "Site kontrolü" kartı (belirgin teknik hatalar, eski bileşenler, "Rapor 48 saat içinde"…) örtüşmüyor.
6. **İki farklı "Adım" dizisi:** Nasıl çalışır 01–03 ile hizmetlerdeki "Adım 1 / 2 / 3" farklı şeyleri numaralıyor; "Adım 2" iki kartta tekrar.
7. **Son bölüm:** masaüstünde başlık alta hizalı (`align-items: flex-end`), sol sütun büyük ölçüde boş; başlık düğme metniyle aynı ("Ücretsiz kontrol isteyin"); son formun başlığı yok.
8. **Mobil ilk ekran:** ≤400 px'te menü 107 px (CTA ikinci satırda). Çakı metinle form arasında; site adresi alanı 710–771 px'te başlıyor, 360×740'ta ilk ekranın dışında.
9. **Ritim:** tüm bölümler aynı kâğıt zemin ve aynı 72 px aralık; koyu bölüm bileşeni (`Section dark`) hazır ama kullanılmıyor. Görsel vurgu yalnız hero çakısında ve rapor örneğinde.
10. **Metin:** "48 saat içinde gönderelim" (form girişi, adım 2) istek kipi; aynı vaat başka yerde "göndereceğiz / göndeririz".
11. **Küçük:** footer altındaki "Sitemendo" imzası © satırını tekrarlıyor; `#about` metni hero'yu tekrar ediyor.

Öneriler (kullanıcıya sunuldu, karar bekleniyor): tipografi ölçeği ve hizalama düzeltmesi; hizmetleri yan yana dört adımlı yol olarak yeniden düzenleme; kontrol listesini tek kaynağa bağlama; koyu bölümle ritim; son CTA bandı; mobilde form önce + alt sabit CTA; hero'da çakı aletlerini kontrol başlıklarıyla eşleştiren etkileşim; ziyaretçinin girdiği adresi gerçek verilerle (HTTPS, yönlendirme, yanıt süresi, başlık / açıklama, viewport) ölçen anında ön kontrol (Worker, 10 ms CPU sınırı ve gizlilik metni güncellemesiyle); sitemendo.com'un kendi ölçüm sonuçlarını kanıt olarak gösterme (uydurma referans yerine).

Değişen dosya: `DOKUMANTASYON.md`. Deploy / push yok.

### 2026-09-26 — Yeni sürüm: düzen, ritim, çakı etiketleri, kendi ölçümü, anında ön kontrol

Kullanıcı önerilerin hepsini seçti. Fiyatlar, süreler ve hizmet kapsamı değişmedi.

1. **Düzen.** Başlık ölçeği büyüdü (h1 masaüstünde 34 → 58 px, h2 23 → 40 px). `#about` artık diğer bölümlerle aynı sol kenarda; sağında kendi ölçüm kartı var. Hizmetler masaüstünde dört sütunlu yol: her kartta aşama düğümü, büyük fiyat, süre ve onay işaretli liste; satırlar kartlar arasında hizalanır. Telefonda kartlar yana kayar, bir sonrakinin kenarı görünür. "Adım 1/2/3" etiketleri kalktı (Nasıl çalışır zaten 01–03). Teslim süresi listeden çıkıp fiyatın altında. İstek kipi "gönderelim" → "göndeririz". Footer'daki tekrarlayan "Sitemendo" satırı kalktı. Son bölüm başlığı düğme metninden ayrıldı.
2. **Ritim.** Rapor örneği ve Nasıl çalışır koyu zemin; rapor belgesi açık kâğıt olarak duruyor. Son bölüm sülfür bant, başlık ve form yan yana, başlık ortaya hizalı.
3. **Telefon.** Menü her genişlikte tek satır (≤400 px'te 107 px'lik ikinci satır kalktı). Forma götüren düğme altta sabit: hero formu, son form ya da footer görünürken gizlenir. Çakı küçüldü; site adresi alanı 390 px'te ilk ekranda.
4. **Çakı.** Altı aletin ucunda kontrol başlığı (Hız, Bağlantılar, Formlar, Mobil, HTTPS, SEO; EN/DE karşılıkları). Açılış bitince sırayla belirir, kaydırınca çakıyla birlikte solar. Etiketin ya da aletin üstüne gelince alet sülfüre döner. Süs: aynı bilgi Kontrol kapsamı bölümünde.
5. **Kendi ölçümü.** Lighthouse 12.8.2, mobil, 5 çalıştırmanın ortancası (2026-09-26, `/?lang=tr`): Performans 82, Erişilebilirlik 100, En iyi uygulamalar 100, SEO 100. Sayılar `lib/selfCheck.json`; yeniden ölçüm `npm run measure` (elle değiştirilmez). Not: canlıda HTML sıkıştırılmadan gidiyordu (54 KB, `no-transform` Cloudflare'ın sıkıştırmasını kapatıyor). Worker artık `gzip` kabul eden isteğe `Content-Encoding: gzip` koyuyor; çalışma zamanı gövdeyi sıkıştırıyor (yerelde 60 KB → 13 KB doğrulandı). Bu düzeltme yayında değil; yayın sonrası `npm run measure` ile kart güncellenmeli.
6. **Anında ön kontrol.** E-posta adımına geçilince `POST /api/precheck` sitenin ana sayfasını bir kez açar: HTTPS, HTTP→HTTPS yönlendirmesi, sunucu yanıt süresi (≤800 ms uygun, ≤1800 ms dikkat), viewport, başlık, açıklama, noindex. Sonuç formun altında, sonra başarı ekranında. Uç nokta yoksa (next dev) ya da istek reddedilirse panel hiç görünmez. Adres süzgeci: IP, yerel ad, standart dışı port ve sitemendo.com engelli; yönlendirmedeki her adres de aynı süzgeçten geçer. IP başına 10 dk'da 10 istek. Sonuç ve adres kaydedilmez, Worker kaydına yazılmaz. Gizlilik metnine "Otomatik ön kontrol" bölümü üç dilde eklendi (güncelleme 26 Eylül 2026).

Doğrulama: `lint`, `typecheck`, `test` (14/14), `build`. `wrangler dev` (Node 22): gzip başlığı, example.com ön kontrolü (HTTPS uygun, yönlendirme yok, 73 ms, açıklama yok), engelli adresler 422, yabancı origin 403, hız sınırı 429; kayıtlarda adres yok. Playwright: panel ve demo başarı (gerçek e-posta gitmedi), çakı etiketi aleti sülfüre çeviriyor, TR/DE/EN × 1440/820/390/360 sayfa taşması yok, tam kaydırmadan sonra görünür kalması gereken gizli öğe yok (çakı etiketleri katlanınca solar), alt düğme hero'da gizli ve Kontrol kapsamı'nda görünür. Deploy / push yok.

Değişen dosyalar: `app/globals.css`, `components/Site.tsx`, `components/HeroKnife.tsx`, `components/LegalPage.tsx`, `lib/content.ts`, `lib/precheck.ts` (yeni), `lib/selfCheck.json` (yeni), `lib/formFlow.ts`, `lib/auditRateLimit.ts`, `lib/useScrollMotion.ts`, `worker/index.ts`, `worker/precheck.ts` (yeni), `scripts/measure-self.mjs` (yeni), `scripts/verify-precheck.ts` (yeni), `package.json`, `DOKUMANTASYON.md`.

### 2026-09-17 — Tarama raporunun kalan maddeleri

Kullanıcı "tarama raporundaki her şey düzeldi mi" diye sordu; 27 madde canlıda ve kodda tek tek kontrol edildi: 17 tamam, 4 kısmen, 6 yapılmadı. Kullanıcı kalanların hepsini istedi ve kararları bana bıraktı.

1. **Next 16.3.5, React 19.3.0** (madde 22): `npm audit` 0 bulgu (önceden Next içindeki PostCSS: 1 yüksek, 1 orta). `next lint` kalktı → ESLint 9 düz yapılandırma (`eslint.config.mjs`, `eslint-config-next` core-web-vitals + typescript). Next `tsconfig.json`’u (`jsx: react-jsx`, `.next/dev/types`) kendisi güncelledi; `next-env.d.ts` Next belgesi gereği `.gitignore`’a alındı (dev ve build arasında değişiyor, `next typegen` yeniden üretiyor). `next dev` her çalışmada `AGENTS.md` ve `CLAUDE.md` yazıyor; Next önerisiyle depoya eklendi. Derleme artık Turbopack; `out/_not-found.html` da çıkıyor (Worker zaten engelliyor).
2. **Yeni lint kuralları:** tarayıcı deposunu (sessionStorage, localStorage, adres) hidrasyondan sonra okuyan üç efekt bilinçli; gerekçeli `eslint-disable` yorumu aldı. Formun açılış anı artık render’da değil efektte ölçülüyor (`useRef(0)` + `useEffect`). Worker varsayılan dışa aktarımı adlandırıldı.
3. **Paylaşım görseli dil başına** (madde 27): `public/og/tr.png`, `de.png`, `en.png` (Prüfung · Reparatur · Wartung; checks · repairs · maintenance), alt metin `meta.ogAlt`. `scripts/build-og.mjs` üçünü üretiyor; `build-icons.mjs` artık paylaşım görseli yazmıyor. `app/opengraph-image.png` kaldırıldı (derlemedeki metadataBase uyarısı da gitti).
4. **Çakı** (madde 19): boştaki salınım sınırsız değil, 4 yarım tur (~24 sn) sonra duruş pozunda biter; sahne ekran dışındayken durur (`IntersectionObserver` → `data-offscreen`, giriş animasyonu etkilenmez). Tam WCAG 2.2.2 uyumu (durdurma düğmesi ya da ≤5 sn) değil; hareket azaltma tercihi zaten saygı görüyor.
5. **Fontlar** (madde 17): Inter yalnız latin önden yükleniyor; latin-ext CSS’te duruyor ve yalnız Türkçe harfler varsa iniyor. Ölçüm (önbellek kapalı, tam kaydırma): DE ve EN 68 KB (önceden iki Inter dosyası önden yükleniyordu, ~150 KB), TR değişmedi (~160 KB).
6. **İlerleme çizgileri** (madde 18): okuma çubuğu ve adım çizgisi 2 px sülfür + 1 px mürekkep kenar (`--indicator`), düğmelerdeki gibi; kâğıtta ≥3:1.
7. **Otomatik kontrol** (madde 24): `.github/workflows/check.yml` — `npm ci`, lint, typecheck (`next typegen && tsc`), test (`tsx --test`), build, `wrangler deploy --dry-run`. Temiz kopyada aynen çalıştırıldı, geçti.
8. **Form kayıtları** (madde 14’ün hata kısmı): anahtar eksikse, bildirim ya da onay gönderilemezse Worker kaydına yalnız Resend hata türü yazılıyor; başarılı talepte yalnız dil. Adres ve içerik yazılmıyor. Ziyaretçi analitiği eklenmedi: gizlilik metni "analiz aracı yok" diyor ve Cloudflare’ın betiksiz trafik istatistikleri panelde zaten var.
9. **Kalıcı hız sınırı** (madde 3): Workers Rate Limiting bağlamasının ücretsiz planda olup olmadığı belgelerden doğrulanamadı (deploy bozulabilirdi); yerine ücretsiz planda belgelenen WAF hız sınırı kuralı seçildi (1 kural, 10 sn, IP). Kurulum kullanıcıda.

Açık kalanlar: madde 7 (gerçek referans ve yorumlar), iPhone Safari testi, WAF kuralı, hukuki kontrol, USt-IdNr, veri işleme sözleşmeleri ve Gmail (bkz. "Kullanıcıda kalan işler"). Kullanıcı Vercel projesini sildi.

Doğrulama: temiz kopyada `npm ci` → lint → typecheck → test (8/8) → build → wrangler dry-run (259 KiB, gzip 63 KiB); `wrangler dev` + headless Chromium: tam site regresyonu (dil yönlendirme ve değişimi, animasyonlar, 404, demo form, azaltılmış hareket, mobil; gizli öğe 0, CSP ihlali ve konsol hatası yok), fiyat bölümü masaüstü/tablet/mobil üç dilde taşmasız, düğmeler forma gidiyor; paylaşım görseli etiketleri ve dosyaları üç dilde 200, eski yol 404; LCP masaüstü 56–100 ms, 4x yavaş mobil 112–152 ms; çakı ekrandayken oynuyor, aşağıda duruyor, dönünce devam ediyor; `next dev` yeniden yazmaları çalışıyor. Push kullanıcının isteğiyle yapıldı.

### 2026-09-17 — Yeni fiyat yapısı (tanıtım fiyatları)

Kullanıcı yeni fiyat yapısını verdi: Site kontrolü 0 € → Hızlı düzeltme 149 € → Site onarımı 349 € → Site bakımı 49 € / ay. Tasarım dili korunarak uygulandı.

1. `lib/content.ts` (TR/EN/DE): dört paket yeniden yazıldı. Adlar: Site kontrolü / Hızlı düzeltme / Site onarımı / Site bakımı; Website Check / Quick Fix / Website Repair / Website Care; Website-Prüfung / Schnellreparatur / Website-Reparatur / Website-Pflege. Her pakette aşama etiketi (Adım 1 · Önce, Adım 2 · Kontrolden sonra ×2, Adım 3 · Onarımdan sonra), kısa açıklama, kullanıcının verdiği kapsam listesi ve gerektiğinde kapsam sınırı (Hızlı düzeltme: açıkça tanımlı küçük sorunlar; Site onarımı: mevcut site, yeniden tasarım / yeni site / büyük özel geliştirme / e-ticaret yok; Site bakımı: ayda en fazla 30 dakika küçük değişiklik). Teslim süreleri (48 saat, 2 ve 5 iş günü) eski paketlerden korundu. "Başlangıç fiyatı" (`after`, `showAfter`) kaldırıldı; fiyatlar sabit.
2. Bölüm girişi: "Sitenizi ücretsiz kontrol ederiz. Düzeltilmesi gereken bir şey varsa ücreti işe başlamadan önce bilirsiniz." Adım 3 metni, SSS 3–4 ve onay e-postası (`lib/auditMail.ts`) "bizden teklif isteyin" yerine "bize yaptırın; ücreti önceden bilirsiniz" diyor. SSS 4 sabit fiyatları, kapsam aşılırsa önceden söyleneceğini ve dahil olmayanları anlatıyor.
3. `components/Site.tsx`: başlık + giriş mevcut `section-intro` kalıbında; kartta aşama etiketi, kapsam notu (masaüstünde listenin altında) ve yalnız ücretsiz kontrol kartında forma götüren düğme. Ücretli paketlerde satın alma düğmesi yok; bölüm sonundaki düğme duruyor. Alt bilgi paket adlarını içerikten alıyor.
4. `app/globals.css`: `.service__stage` (mono, `--fs-mono`), `.service__scope`, `.service__cta`; kullanılmayan `.services-heading` ve `.service__after` kaldırıldı. Kapsam notu olmayan kartta boş ızgara satırı oluşmaması için `:has()`.
5. `scripts/verify-form-faq.ts` yeni fiyatları bekliyor, eski fiyatların olmadığını denetliyor.

Kullanıcının bana bıraktığı kararlar: bakımda yedekleme hizmet olarak yazıyor ama "barındırma izin veriyorsa" kaydıyla (önceki metin "yedekleme hizmeti değildir" diyordu; hazır platformlarda yedek alınamayabilir); Hızlı düzeltme 2 iş günü, Site onarımı "genellikle 5 iş günü" (kapsam değişken); aylık kısa rapor geri geldi, sağlık kontrolüyle tek maddede ("Aylık site sağlığı kontrolü ve kısa rapor"). JSON-LD’ye fiyat eklenmedi.

Doğrulama: eski fiyat ve paket adları kaynakta, derlenmiş HTML’de ve JS paketlerinde yok; `tsc`, `verify-form-faq` (8/8), `next build`; `wrangler dev` + headless Chromium: masaüstü (TR/DE/EN), tablet (DE), mobil (TR/DE/EN) — sayfa ve kartlarda taşma yok, gizli öğe yok; kontrol kartı ve bölüm sonu düğmeleri forma gidip alana odaklanıyor; tüm site regresyonu (dil yönlendirme, dil değişimi, animasyonlar, 404, demo form, azaltılmış hareket) geçti; CSP ihlali ve konsol hatası yok. Push yapılmadı.

### 2026-09-17 — Vercel’den Cloudflare Workers’a geçiş (dal: `cloudflare-hosting`)

Kullanıcı sordu: Vercel Hobby ticari kullanıma izin vermiyor, ücretsiz yol var mı? Seçenekler (sağlayıcı sayfalarından doğrulandı): Vercel Pro ~20 $/ay; Netlify ücretsiz (ticari yasak yok ama 300 kredi bitince site duruyor, her yayın 15 kredi, fonksiyonlar Ohio’da, Frankfurt yalnız Pro); Cloudflare ücretsiz (ticari yasak yok, ziyaretçiye en yakın veri merkezi, statik dosyalar sınırsız, istek başına 10 ms CPU). Ana sayfa her istekte ~10 ms’de oluşuyordu; bu yüzden sayfalar statik yapıldı. Alan adı, DNS ve e-posta zaten Cloudflare’da olduğundan yeni sağlayıcı eklenmedi. Kullanıcı Cloudflare’ı seçti.

1. Sayfalar `app/[lang]/` altına taşındı; `generateStaticParams` ile tr/de/en için statik HTML (`output: 'export'`, yalnız derlemede). Geliştirmede `next.config.ts` aynı adresleri dil sayfalarına yeniden yazıyor.
2. `middleware.ts`, `lib/requestLang.ts`, `vercel.json` kaldırıldı. `SeoLinks` başlık okumak yerine `path` ve `lang` alıyor. `robots`, `sitemap`, `manifest` `force-static`.
3. `worker/index.ts`: `?lang=` → çerez → tarayıcı dili (307) → Türkçe; çerez yazımı; `www` → 308; `/de`, `/de/privacy` → 301 herkese açık adrese; derleme dosyaları (`/de.html`, `.txt`, `/404`) ve bilinmeyen adresler → dilinde 404 sayfası (404 durumu); sondaki `/` → 308; güvenlik başlıkları (Vercel’deki CSP aynen, `vercel.live` çıkarıldı); sayfalar `private, no-cache`; `workers.dev` adresinde `X-Robots-Tag: noindex`. `/_next/static/*` Worker’a uğramıyor (`run_worker_first`), `public/_headers` ile bir yıllık önbellek.
4. Form API `worker/audit.ts`’e taşındı (aynı korumalar). IP `cf-connecting-ip`’ten. Demo artık yalnız `AUDIT_DEMO_MODE=true` ile (canlıda kapalı; eski `VERCEL_ENV` kontrolü yok).
5. Paylaşım görseli sayfa metadata’sına açıkça eklendi (sayfalar `[lang]` altında olunca `app/opengraph-image.png` kendiliğinden eklenmiyordu).
6. Gizlilik metni (TR/EN/DE): barındırma Cloudflare, sayfalar en yakın veri merkezinden; ABD’ye aktarım listesinden Vercel çıktı.
7. `wrangler` 4.133 (Node 22 ister) dev bağımlılığı, `npm run preview` / `npm run deploy`, `.nvmrc` 22, `.gitignore` `.wrangler` ve `.dev.vars*`. README ve `.env.example` güncellendi.

Test (sırsız kopyada, `wrangler dev`): yönlendirmeler, çerez, 404 dilleri, başlıklar, 304, form korumaları (süre/bal tuzağı/geçersiz/büyük gövde/hız sınırı/demo/anahtar yok 503/geçersiz anahtar 502; gerçek e-posta gönderilmedi), headless Chromium masaüstü + mobil + azaltılmış hareket: gizli öğe 0, dil değişimi ve çerez doğru, CSP ihlali ve konsol hatası yok. Worker paketi 254 KiB (gzip 62 KiB); yerelde sayfa yanıtı ~4 ms.

Kullanıcı Vercel Git bağlantısını kesti, Cloudflare’da depodan `sitemendo` Worker’ını kurdu (build `npm run build`, deploy `npx wrangler deploy`; ilk derleme eski kodu Cloudflare’ın Next uyarlayıcısıyla çalıştırdı) ve push istedi; commit ve push kullanıcının açık isteğiyle yapıldı. Geçiş: Kullanıcı secret’ları Secret türünde ekledi (Text türü değişkenler `wrangler deploy` ile silinir; Secret kalır). Kullanıcının formu hata verdi; kullanıcının isteğiyle workers.dev’e tek API isteği gönderildi (onay `delivered@resend.dev`, bildirim kullanıcıya): `live`. Sonra kullanıcı da hatasız gönderdi. Kullanıcı Vercel A ve `www` CNAME kayıtlarını silip Worker’a `sitemendo.com` ve `www` Custom Domain ekledi; silinen kayıtların negatif DNS önbelleği (SOA 1800 s) yüzünden site yaklaşık 20 dakika açılmadı. Canlıda doğrulandı: dil yönlendirmeleri, `www` → 308, 404’ler, başlıklar, form korumaları, headless Chromium (masaüstü, mobil, azaltılmış hareket, gizli öğe 0), MX/TXT kayıtları yerinde, e-posta adresleri değiştirilmemiş.

Canlıda bulunan ve düzeltilen: HTTP isteği HTTPS’e yönlenmiyordu (Vercel bunu ve HSTS’i kendisi yapıyordu); Cloudflare Web Analytics sayfaya `static.cloudflareinsights.com` betiği ekliyordu (CSP engelledi; gizlilik metni analiz aracı yok diyor). Worker artık HTTP’yi 308 ile HTTPS’e yönlendiriyor, Vercel’deki HSTS değerini (`max-age=63072000; includeSubDomains; preload`) gönderiyor ve sayfa ile 404’te `Cache-Control: private, no-cache, no-transform` kullanıyor (Cloudflare HTML’i değiştirmez; Email Address Obfuscation ayarına gerek kalmadı). Not: `wrangler dev` yönlendirmelerde istek adresini içeren `Location` başlığını yerel `http://` adresine yeniden yazıyor; canlıda `https://` kalır.

Kullanıcıda kalan: sitemendo.com’da gerçek form testi; Resend’de eski (Vercel’in kullandığı) anahtarı silme; birkaç gün sonra Vercel projesini silme; istenirse workers.dev ve önizleme adreslerini kapatma. Veri işleme sözleşmesi listesinde Vercel yerine yalnız Cloudflare (zaten e-posta için vardı).

### 2026-09-17 — Tam tarama ve düzeltmeler

Canlı site (sitemendo.com), kod, başlıklar, bağımlılıklar ve headless Chromium ile tarandı. Kullanıcı yanıtları: KDV'li fatura, yalnızca işletmelere, hedef kitle iki dilli, desteklenmeyen tarayıcı dilinde Türkçe.

Düzeltilenler:
1. Gizlilik metni üç dilde yeniden yazıldı (132 → 451 kelime, DE): veri sorumlusu (adres, e-posta, telefon), Vercel ve sunucu kayıtları, form, Resend, Cloudflare → Gmail yönlendirmesi, telefon ve WhatsApp, ABD'ye aktarım (DPF / standart sözleşme maddeleri), tarayıcı depolaması (dil çerezi, yerel depolama, sekme süresince form taslağı), saklama süresi, haklar (Art. 15–21), şikâyet hakkı (Berlin), otomatik karar yok. **Taslaktır; avukat ya da güvenilir bir oluşturucuyla kontrol ettirilmeli.**
2. Fiyatların altında not: net fiyat + %19 USt, yalnızca işletmelere; SSS ücret cevabına da eklendi.
3. Form kötüye kullanımı: görünmez bot tuzağı alanı (`company`), form açıldıktan sonra geçen süre (`t`, 2.5 sn altı ya da yoksa 429 `RETRY`), aynı alıcıya günde en fazla 2 onay e-postası. Onay e-postasında site adresi artık bağlantı değil düz metin (Sitemendo imzasıyla yabancı bağlantı gitmesin). Sınırlar hâlâ bellekte; kalıcı sınır için Vercel Firewall kuralı önerilir.
4. `vercel.json`: sunucu bölgesi `fra1` (Frankfurt). Önceden `iad1` (ABD) idi; ilk açılış TTFB 1.35 sn ölçülmüştü.
5. `www.sitemendo.com` ve `sitemendo.vercel.app` 308 ile ana adrese yönleniyor (middleware).
6. Dil seçimi (sorgu ya da çerez) yoksa `/`, `/privacy`, `/impressum` tarayıcı diline 307 ile yönleniyor (`Accept-Language`, `preferredLang`). Türkçe, desteklenmeyen dil ya da başlıksız istek (botlar) Türkçe kalıyor.
7. Metin hataları: 3. adım ve SSS "yaptırabilir / have the repairs done yourself / selbst erledigen lassen" çelişkisi üç dilde ve onay e-postalarında düzeltildi; EN ve DE hero cümlesi; DE meta açıklaması 169 → 153 karakter.
8. Dile uygun 404 (`app/not-found.tsx`, noindex, ana sayfa bağlantısı) ve hata sayfası (`app/error.tsx`). İsteğin dili `lib/requestLang.ts`.
9. JSON-LD `ProfessionalService` (ad, adres, e-posta, telefon, diller). Fiyat yok; `content.ts` ile ikinci kopya tutulmasın.
10. Güvenlik başlıkları (canlıda): CSP, `X-Frame-Options: DENY`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`; `x-powered-by` kapalı. Geliştirmede CSP yok, önizlemede `vercel.live` izinli.
11. Demo modu açıkça ayarlanmadıysa canlıda kapalı (`VERCEL_ENV`); anahtar eksik kalırsa ziyaretçi demo değil hata ve e-posta yolu görür.
12. Etkin menü bağlantısı ve etkin dil artık mürekkep alt çizgi; sülfür kâğıt üzerinde 1.1:1 idi (WCAG 1.4.11). Footer'daki dil seçicide sülfür kaldı (koyu zemin).
13. LCP: hero alt metni ve formu görünmez başlıyordu; yalnız kayıyorlar. Yerel üretim ölçümü, masaüstü: ~1070 ms → 44–176 ms (hareket azaltılmış 68–92 ms ile aynı seviye).
14. Dil önyüklemesinde gizlenen gövde JS çalışmazsa 1.5 sn sonra görünür. IBM Plex Mono önden yüklenmiyor (önden yüklenen font dosyası 6 → 2). E-postalardaki Google Fonts bağlantısı kaldırıldı. Kullanılmayan `sec`, `talk`, `assure` metin anahtarları silindi.

Kullanıcıda kalan: push ve canlıda `x-vercel-id` içinde `fra1` kontrolü; USt-IdNr verildiyse Impressum'a eklenmesi; Vercel, Resend, Cloudflare ve Google ile veri işleme sözleşmelerinin (AVV/DPA) kabulü; Resend API anahtarının yenilenmesi (2026-09-10 notu); `_dmarc` kaydının kontrolü (bu ortamdan DNS okunamadı); Safari / gerçek iPhone testi; ölçüm aracı kararı; gerçek referans ve yorumlar; Next 16 yükseltmesi (`npm audit`: Next içindeki PostCSS, build sırasında, düşük risk).

Doğrulama: `tsc --noEmit`; `next build`; yerel `next start` üzerinde curl ve headless Chromium: güvenlik başlıkları geliyor, CSP ihlali yok; `Accept-Language` de → `?lang=de`, en → `?lang=en`, tr / pl / `*` / başlıksız → 200 Türkçe, `pl,en` → en; takma adlar 308; API: süre yok ve hızlı → 429, bot tuzağı → 200 gönderimsiz, normal → demo; arayüzden gönderim çalışıyor; 404 DE ve TR (çerezsiz) doğru; gizlilik 11 bölüm; tam kaydırmada gizli öğe 0, DE geçişi, hareket azaltılmış ve mobil temiz. Push kullanıcının açık isteğiyle yapıldı (2026-09-17); gerçek e-posta gönderilmedi.

Değişen dosyalar: `lib/content.ts`, `lib/auditMail.ts`, `lib/auditRequest.ts`, `lib/auditRateLimit.ts`, `lib/formFlow.ts`, `lib/lang.ts`, `lib/requestLang.ts` (yeni), `app/api/audit/route.ts`, `app/layout.tsx`, `app/page.tsx`, `app/not-found.tsx` (yeni), `app/error.tsx` (yeni), `app/globals.css`, `components/Site.tsx`, `components/LegalPage.tsx`, `middleware.ts`, `next.config.ts`, `vercel.json` (yeni), `DOKUMANTASYON.md`.

### 2026-09-17 — Kullanılmayan CSS ve kontrol listesi ızgarası

1. 11 Eylül metin çalışmasından kalan, kodda hiçbir yerde kullanılmayan kurallar silindi: `.muted`, `.kicker`, `.micro` (ve `li` / mobil kuralları), `.about__contacts`, `.about__k` (ve 720px medya sorgusu), `.demo-note`, `.doc-label`, `.assure`. Kalan tek "kullanılmıyor" görünen sınıflar `severity--crit` / `severity--med`; bunlar `severity--${level}` ile dinamik kullanılıyor.
2. Örnek rapordaki kontrol listesi masaüstünde 8 hücreyi 3 sütuna diziyordu; ızgaranın gri zemini boş kalan yerde blok olarak görünüyordu. Hücre çizgileri artık ızgara zemini değil, her hücrenin 1px gölgesi (`box-shadow: 0 0 0 1px`). Dolu satırlar aynı görünüyor; eksik satırda boş yer kâğıt rengi. Hücre sayısı değişse de çalışır.

Doğrulama: kaynakta kullanılmayan sınıf taraması; `next build` geçti (13 sayfa, uyarı yok); headless Chromium: liste açıkken masaüstünde 3 sütun / 1 boş yer, zemin şeffaf; mobilde tek sütun. Tam kaydırmadan sonra gizli öğe 0, DE geçişi ve hareket azaltılmış temiz, konsolda hata yok.

Değişen dosyalar: `app/globals.css`, `DOKUMANTASYON.md`.

### 2026-09-17 — Son animasyon paketi: menü, adımlar, çerçeveler, kontrol listesi, footer

Öneri listesinin kalan maddeleri eklendi; liste bununla tamamlandı.

Yapılanlar:
1. Menü aşağı kaydırırken yukarı çekiliyor, yukarı kaydırınca geri geliyor (`data-hidden`). Çekilince okuma çubuğu ekranın üst kenarında kalıyor. Menü açıkken, içinde klavye odağı varken ya da sayfanın en üstünde (menü yüksekliğinin iki katı) çekilmiyor.
2. Nasıl çalışır: kaydırdıkça adımların üst çizgisinde sülfür bir çizgi 01'den 03'e ilerliyor (`--fill`); çizgi bir adımı bitirince numarası mürekkebe dönüyor. Masaüstünde üç parça tek çizgi gibi okunuyor, mobilde her satırda sırayla doluyor.
3. Ücretsiz kart ve son form: çerçeve üst → sağ → alt → sol çizilerek kapanıyor (`--frame`; kenarlık yerinde şeffaf, çizgiler arka planda), sonra kartın zemin tonu (`--tone`) ve içerik geliyor. Ücretsiz kart bu yüzden satır hareketinin dışında.
4. Örnek rapordaki "Listeyi aç": etiket ve hücre yazıları sırayla geliyor (`useOpenReveal`). İlk denemede hücrelerin kendisi soluyordu ve ızgaranın gri zemini görünüyordu; yalnız yazılar hareket ediyor. Sayaç fikri düştü: listedeki değerler artık sayı değil.
5. Footer imzası: SITEMENDO maskeden yükseliyor, sülfür nokta en son düşüyor.
6. Menüden aşağıdaki bir bölüme atlanınca üstte kalan satırlar da aynı partide açılıyor, sıra gecikmesini onlar tüketiyordu; hedef bölüm yaklaşık 1 sn bekliyordu. Ekranın üstünde kalanlar artık beklemeden son hâline geçiyor, sıra yalnız ekrandakiler arasında işliyor.

Hareket azaltılmışken bunların hiçbiri çalışmıyor: menü sabit, çerçeveler tam, ilerleme çizgisi yok, liste anında açılıyor.

Doğrulama: `tsc --noEmit`; headless Chromium (CDP), 1440×900 ve 375×812. Menü 900px'e inince çekiliyor (−65px, mobilde −107px), yukarı kaydırınca ve bir bağlantıya odaklanınca dönüyor, mobil menü açılınca görünür. Adımlar bölümün %15 / %50 / %90'ında doğru doluyor, numaralar sırayla mürekkebe dönüyor. Ücretsiz kart çerçevesi 0.17 → 0.71 → 1, son form 0.22 → 1; içerik çerçeveden sonra. Liste açılırken hücreler opak, yazılar sırayla; kapanınca iz kalmıyor. Footer imzası temiz bitiyor. Mobilde adımlara atlayınca yazılar 900ms içinde görünür. Tam kaydırmadan sonra gizli öğe 0, sayfa ortasında DE geçişi temiz. Çakı kontrolü değişmedi. Konsolda hata yok. Deploy / push yok.

Değişen dosyalar: `lib/useScrollMotion.ts`, `components/Site.tsx`, `app/globals.css`, `DOKUMANTASYON.md`.

### 2026-09-17 — Çakı kaydırınca katlanıyor; karar cümlesi metni silindi

Yapılanlar:
1. Hero yukarı çıkarken çakının aletleri sapın içine katlanıyor, yukarı kaydırınca yeniden açılıyor. Tek değişken `.knife` üzerinde `--fold` (0 açık, 1 kapalı). GSAP scrub ilk kaydırmayla başlıyor, çakı yüksekliğinin yarısı kadar kaydırmada bitiyor (masaüstünde ~200px, mobilde ~155px). İlk denemede aralık %80'di; masaüstünde kapanışın son kısmı menünün altında kalıyordu.
2. Açılış animasyonuna dokunulmadı. Her aletin içine `.knife-tool__fold` sarmalayıcısı eklendi; aynı menteşe etrafında `--open × --fold` kadar geri dönüyor. Yelpaze orantılı kapanıyor: aletler birbirinin üstünden geçmiyor, hepsi sapa aynı anda giriyor. Gölge silueti de aynı oranda katlanıyor.
3. Katlanma, açılış animasyonu (`knife-unfold`) bitince kuruluyor. Açılırken kaydıran birinde aletler sapın öbür yanına geçmiyor.
4. Mobilde de çalışıyor, çünkü katlanma çakıyı yerinden oynatmıyor. Parallax hâlâ yalnız ≥1000px. Hareket azaltılmışsa çakı açık kalıyor.
5. `lib/content.ts`: kullanılmayan `statementA` / `statementSub` metinleri (TR / EN / DE) ve tipleri silindi.

Doğrulama: `tsc --noEmit`; headless Chromium (CDP). Masaüstü: `--fold` 0 → 0.29 (60px) → 0.48 (100px) → 0.72 (150px) → 0.96 (200px) → 1; aletler ve gölge aynı oranda; 200px'te kapalı çakı menünün altında görünür; en üste dönünce yeniden açık. Açılış sırasında 400px'e kaydırıldığında 40 ölçümün hiçbirinde alet ters yana geçmedi. Yarı katlıyken DE'ye geçiş: katlanma aynı kaldı. Hareket azaltılmış: katlanma yok. Mobil (375px): 0 → 0.52 (80px) → 1 (160px), kapalı çakı tamamen görünür, yatay kaydırma yok. Konsolda hata yok; önceki paketlerin kontrolü değişmedi. Deploy / push yok.

Değişen dosyalar: `components/HeroKnife.tsx`, `app/globals.css`, `lib/useScrollMotion.ts`, `lib/content.ts`, `DOKUMANTASYON.md`.

### 2026-09-17 — Temizlik: boşta kalan animasyon kodu ve logo hydration uyarısı

11 Eylül metin çalışmasında karar cümlesi bölümü kaldırılmıştı; animasyon kodu ve bir CSS kuralı geride kalmıştı. Çakı sapındaki logo da her yüklemede hydration uyarısı veriyordu.

Yapılanlar:
1. `lib/useScrollMotion.ts`: karar cümlesinin kelime animasyonu ve başlık seçicisindeki istisna silindi. Dil değişiminde yeniden kurulumun gerekçesi güncellendi: adım ve SSS satırlarının anahtarı metin, React onları dil değişince yeni öğelerle değiştiriyor.
2. `app/globals.css`: kullanılmayan `.statement__sub` kuralı silindi.
3. `lib/mark.ts`: `markCapCenters()` uç daire merkezlerini, yol gibi 3 basamağa yuvarlıyor. Node ile tarayıcı `Math.cos` / `Math.sin` sonucunun son basamağında ayrışıyordu; `BrandMark` bu değerleri ham öznitelik olarak bastığı için hydration uyarısı çıkıyordu. İkon üretimi zaten 3 basamak kullanıyor, ikonlar değişmedi.

Dokunulmadı: `lib/content.ts` içindeki `statementA` / `statementSub` metinleri (TR / EN / DE) artık hiçbir yerde kullanılmıyor. Metin çalışmasının parçası oldukları için silinmedi.

Doğrulama: `tsc --noEmit`; headless Chromium (CDP), 1440×900 ve 375×812: konsolda hata ve uyarı yok (hydration uyarısı gitti). Logo uçları `21.087,7.859` / `7.409,11.715`. İlk ekranda gizlenen öğe yok, tam kaydırmadan sonra gizli öğe 0. Sayfa ortasında TR → DE: başlıklar Almanca, ekrandaki öğeler görünür. Hareket azaltılmışken gizli öğe yok. Yatay kaydırma yok. Deploy / push yok.

Değişen dosyalar: `lib/useScrollMotion.ts`, `lib/mark.ts`, `app/globals.css`, `DOKUMANTASYON.md`.

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
