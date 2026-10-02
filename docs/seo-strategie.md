# SEO stratejisi: Almanca Ratgeber ve Türkçe pilot (sitemendo.com)

Tarih: 2026-10-01 (güncelleme: 2026-10-02, ikinci paket) · Kapsam: `/ratgeber` bölümü, Türkçe pilot `/rehber`, teknik SEO, iç bağlantı, ölçüm planı · Dil: Almanca öncelikli (kullanıcı kararı, 2026-10-01). Türkçe pilot (4 rehber) **2026-10-01'de yayınlandı** (kullanıcı onayıyla; bkz. bölüm 8 ve 11).

## 1. Amaç, sınırlar, başarı ölçütü

**Amaç:** Kimseyle iletişime geçmeden, arama motorundan gelen ziyaretçiyi ücretsiz kontrol formuna getirmek. Hedef kitle: Almanya'daki küçük işletmeler ve serbest çalışanlar; aradıkları şey bir "problem + çözüm" (ör. "Kontaktformular funktioniert nicht", "Website nicht bei Google gefunden").

**Sınırlar (değişmez kurallar):**
- Soğuk e-posta, telefon, ziyaret yok (§ 7 UWG; kullanıcı kararı). Bağlantı toplamak için kimseye yazılmaz.
- Satın alınan bağlantı, bağlantı paketi, toplu üretilmiş sayfa yok. Google bunu spam sayar (Spamrichtlinien: Link-Spam, Missbrauch mit massenhaft generierten Inhalten).
- Sitedeki metin kuralları geçerli: "Sie" biçimi, sakin ve somut dil, uydurma referans/müşteri sayısı yok, abartı yok, fiyat metinde tekrarlanmaz (`{price.*}` işaretleri), "garantiert" yalnızca olumsuz bağlamda ("kimse garanti edemez").
- Her olgusal iddia birincil kaynaktan doğrulandı; tarihe bağlı olanlar "Stand: Oktober 2026" taşır.
- Hukuki konularda (Impressum, Datenschutz) "Rechtsberatung değildir" uyarısı ve kanunun kendi metni.

**Başarı ölçütü (12 hafta):** (1) 13 Ratgeber + özet sayfası ve Türkçe pilotun 4 rehberi + `/rehber` Search Console'da dizinli; (2) `/ratgeber/` ve `/rehber/` yollarında gösterim ve tıklama oluşuyor; (3) ücretsiz kontrol isteklerinde arama kaynaklı artış (bkz. bölüm 9). Sıralama veya trafik sayısı vaat edilmez; kimse #1 garanti edemez (Google, "Brauche ich einen SEO?").

## 2. Ne yapıldı (özet)

- 13 Almanca Ratgeber (`lib/guides/*.ts`, ayrıntılı, kaynaklı, 1.400+ kelime) + özet sayfası `/ratgeber`. İlk 11'i 2026-10-01'de yayınlandı; `wordpress-wartungsmodus-geht-nicht-weg` ve `spf-dkim-dmarc-einrichten` ikinci paketle (2026-10-02) eklendi.
- Teknik altyapı: statik HTML (JS gerektirmez), kendi kök düzeni, canonical, Article + BreadcrumbList + CollectionPage JSON-LD, sitemap (`lastModified` her Ratgeber'in kendi tarihi), Worker yönlendirmesi, mobilde kart biçimine dönen tablolar.
- İç bağlantı: ana sayfa altbilgisi → `/ratgeber` (DE/EN) ve `/rehber` (TR); Almanca hizmet sayfaları → "Passende Ratgeber" (3–4 kart), Türkçe hizmet sayfaları → "İlgili rehberler" (2–4 kart); Ratgeber'ler birbirine ve hizmet sayfalarına bağlı.
- **Türkçe pilot (`/rehber`):** Almanca aslı olan 4 rehberin Türkçe uyarlaması (`lib/guides/tr/*.ts`): `impressum-zorunlulugu`, `web-sitesi-google-da-gorunmuyor`, `iletisim-formu-calismiyor`, `web-sitesi-bakimi` + özet sayfası `/rehber`. Birebir çeviri değil, Almanya'daki Türkçe konuşan işletme sahibine uyarlama: olgular Almanca asıllarla aynı (aynı kaynaklar), hukuki terimler ve arayüz terimleri Almanca/İngilizce aslıyla birlikte verilir, Google kaynakları Türkçe belgeleri (`?hl=tr`). Almanca ve Türkçe eşler hreflang ile bağlıdır (`x-default` = Almanca). Yapay zekâ ile yazıldı; yayından önce kullanıcı onayı alındı (2026-10-01), yeni Türkçe rehberler için aynı kural geçerli.
- **İkinci paket (2026-10-02, dal `seo-phase2`):** (1) *Arama ifadesine yaklaştırma:* Google otomatik tamamlama verisine (Almanya; hacim değil, yalnızca ifade sinyali) göre üç Ratgeber'in başlık, H1, description ve bir SSS sorusu ayarlandı; adresler değişmedi (bölüm 3 ve 4). (2) *Dile göre paylaşım görseli:* `og:image` ve `Article.image` artık sayfanın diline göre `/og/de.png` ya da `/og/tr.png` (öncesinde Türkçe rehberler de Almanca görseli taşıyordu); test dosyanın varlığını da denetler. (3) *İki yeni Almanca Ratgeber:* `wordpress-wartungsmodus-geht-nicht-weg` (1.921 kelime, 10 dk) ve `spf-dkim-dmarc-einrichten` (2.441 kelime, 12 dk); ikisi de birincil kaynaklıdır (bölüm 13). (4) *Impressum rehberi (Almanca ve Türkçe) genişletildi:* "Sonderfälle" bölümü (şahıs işletmesi, dernek, özel site, sosyal medya, platform satıcıları; IHK München, Regensburg, Hagen, Karlsruhe), OLG Hamburg 21.5.2026 kararı (Az. 15 U 99/24; Instagram, IHK Hanau-Gelnhausen-Schlüchtern özetiyle), iki yeni SSS ("Instagram/Facebook", "Impressum Almanca mı olmalı?") ve § 18 Abs. 2 MStV notuna IHK Karlsruhe ölçütü. (5) Beş mevcut Ratgeber'e yeni rehberlere giden bağlantılar eklendi; `check:freshness` iki yeni kural aldı.
- Denetimler: `npm test` (`scripts/verify-guides.ts`, 15 test, iki dil için), `npm run check:links` (113 dış adres canlı), `npm run check:freshness` (tarihe bağlı iddialar; Türkçe dosyalar dâhil).

## 3. Arama sonuçlarından gözlemler (sınırlı, ölçüm değil)

Konu araştırması sırasında kullanılan arama aracı ABD kaynaklıdır; sıralama google.de ile aynı değildir. Aşağıdakiler yalnızca niteliksel gözlemdir; gerçek veri Search Console'dan gelecek.

- Hata mesajı sorguları (ör. "Es gab einen kritischen Fehler auf deiner Website"): ağırlıkla ajans ve serbest çalışan blogları; kalite değişken, çoğu kısa.
- Impressum sorguları: IHK sayfaları, hukuk/araç sağlayıcıları. Birçok şablon hâlâ eski bilgi taşıyor (TMG, OS-Plattform bağlantısı); DDG ve 20 Temmuz 2025'te kapanan OS platformu bizim Ratgeber'de güncel.
- Search Console durum mesajları ("Gefunden – zurzeit nicht indexiert"): Google'ın kendi yardım sayfaları öne çıkıyor. Bizim fark: durumun ne demek olduğunu, ne yapılacağını ve ne yapılmaması gerektiğini küçük işletme diliyle anlatmak.
- Otomatik tamamlama (Google, Almanya, 2026-10-02; yalnızca ifade sinyali, hacim değil): "website nicht bei google" için öneriler "gelistet", "angezeigt" ve "taucht nicht auf" biçimlerini içeriyor (başlıkta "gefunden" vardı); "website selbst prüfen" ve "firmenwebsite prüfen" için hiç öneri çıkmıyor, "homepage prüfen" için çok sayıda çıkıyor; "website nicht erreichbar" önerilerini tüketici sorunları dolduruyor (WLAN, Handy, Chrome, `dns_probe_finished_nxdomain`); "impressum muss" için "auf Deutsch sein" ve "auf Instagram", "impressum pflichtangaben" için "kleingewerbe", "verein", "einzelunternehmen" ve "instagram" çıkıyor. Türkçe sinyal zayıf: "impressum nedir", "impressum zorunluluğu" ve "impressum almanya" için hiç öneri çıkmadı. Türkçe pilotun değeri bu yüzden trafikten çok hedef kitleye güven olabilir; gerçek sonuç Search Console'da görülür.
- Fırsat: kaynaklı, tarihli, kapsamı dürüst (ne yapar, ne yapmaz) bir koleksiyon. Zayıf nokta: yeni alan adı, düşük otorite, kişisel yazar yok (bkz. bölüm 12).

## 4. Konu haritası ve arama niyeti

Hacimler ölçülmedi; sorgular tahmindir. Her Ratgeber'in tek bir ana niyeti var (kendi içinde çakışma olmasın); özet (pillar) sayfa "Checkliste" niyetini, alt sayfalar "problem" niyetini karşılar.

| Ratgeber | Ana sorgu | Yan sorgular | Niyet | Ücretsiz kontrol noktası |
|---|---|---|---|---|
| `website-selbst-pruefen` | homepage prüfen | website selbst prüfen, website checkliste, website analyse kostenlos | bilgi, karşılaştırma | tümü |
| `website-nicht-bei-google-gefunden` | website nicht bei google gelistet | website wird nicht bei google angezeigt, website taucht nicht bei google auf, seite nicht indexiert, gefunden – zurzeit nicht indexiert, site: abfrage | problem | Index (noindex, robots.txt, sitemap) |
| `website-laedt-langsam` | website lädt langsam | ladezeit verbessern, core web vitals, pagespeed | problem | Tempo |
| `website-mobil-optimieren` | website mobil optimieren | nicht mobilfreundlich, mobile-friendly test alternative | problem | Mobil |
| `kontaktformular-funktioniert-nicht` | kontaktformular funktioniert nicht | formular sendet keine e-mails, contact form 7 sendet nicht | problem | Formulare |
| `https-ssl-fehler-beheben` | website nicht sicher | ssl zertifikat abgelaufen, mixed content, http auf https | problem | HTTPS |
| `defekte-links-finden-beheben` | defekte links finden | 404 fehler beheben, 301 weiterleitung einrichten | problem | Links |
| `impressum-pflichtangaben` | impressum pflichtangaben | was muss ins impressum, impressum ddg, os-plattform impressum | bilgi (yasal) | Kontakt |
| `website-wartung` | website wartung | wartungsvertrag, wordpress wartung, website pflege kosten | ticari araştırma | Technik |
| `website-nicht-erreichbar` | eigene website nicht erreichbar (işletme sahibi) | 503 service unavailable, 502 bad gateway | problem (acil) | (yok; Pflege'de izleme) |
| `wordpress-kritischer-fehler-beheben` | wordpress kritischer fehler | es gab einen kritischen fehler auf deiner website | problem (acil) | Technik |
| `wordpress-wartungsmodus-geht-nicht-weg` | wordpress wartungsmodus geht nicht weg | wordpress wartungsmodus deaktivieren, .maintenance datei löschen, wartungsmodus wp-cli | problem (acil) | Technik |
| `spf-dkim-dmarc-einrichten` | spf dkim dmarc einrichten | spf dkim dmarc erklärung, spf dkim dmarc test, dmarc einrichten | bilgi + uygulama (adım adım) | Formulare |

**2026-10-02 başlık ayarı (adresler aynı kaldı, yönlendirme gerekmedi):**

| Ratgeber | Önce | Sonra | Neden |
|---|---|---|---|
| `website-selbst-pruefen` | "Website selbst prüfen: Checkliste in 8 Schritten"; H1 "Website selbst prüfen: Die Checkliste für Unternehmen" | "Homepage prüfen: Checkliste in 8 Schritten"; H1 "Homepage und Website prüfen: Die Checkliste für Unternehmen" | "website selbst prüfen" için öneri yok, "homepage prüfen" için çok |
| `website-nicht-bei-google-gefunden` | "Website nicht bei Google gefunden? Ursachen"; H1 "… nicht gefunden: …" | "Website nicht bei Google gelistet? Ursachen"; H1 "Website wird bei Google nicht angezeigt: Ursachen und Lösungen"; ilk SSS sorusu "… wird … nicht angezeigt" | öneriler "gelistet" ve "angezeigt" biçimlerini içeriyor |
| `website-nicht-erreichbar` | "Website nicht erreichbar? Ursachen und Lösungen" | "Eigene Website nicht erreichbar? Ursachen"; H1 "Eigene Website nicht erreichbar: So finden Betreiber die Ursache und beheben den Ausfall"; "Sie sind Besucher, nicht Betreiber?" notu | aramaları tüketici sorunları domine ediyor; sayfa işletme sahibine yazılı |

Bu tabloyu 4. haftada Search Console'daki gerçek sorgularla karşılaştırın; çakışma (aynı sorgu için iki Ratgeber görünüyor) varsa birini sadeleştirin veya iç bağlantıyla yönlendirin.

**Türkçe pilot (tahmini sorgular, ölçülmedi):** Almanya'daki Türkçe konuşan işletme sahibi bazı aramaları Almanca, bazılarını Türkçe yapabilir; bu yüzden Türkçe sayfalar Almanca eşlerinin yerine değil yanına konur.

| Rehber | Almanca eşi | Ana sorgu (tahmin) | Yan sorgular (tahmin) |
|---|---|---|---|
| `impressum-zorunlulugu` | `impressum-pflichtangaben` | impressum nedir | impressum zorunluluğu, impressum nasıl yazılır, impressum örneği |
| `web-sitesi-google-da-gorunmuyor` | `website-nicht-bei-google-gefunden` | web sitem google'da çıkmıyor | sitem google'da görünmüyor, siteyi google'a ekleme, search console dizine eklenmedi |
| `iletisim-formu-calismiyor` | `kontaktformular-funktioniert-nicht` | iletişim formu çalışmıyor | form mail göndermiyor, wordpress form e-posta gelmiyor |
| `web-sitesi-bakimi` | `website-wartung` | web sitesi bakımı | wordpress bakım, site bakım sözleşmesi |

## 5. Sayfa standartları (on-page)

Test (`scripts/verify-guides.ts`) bunları her `npm test`'te denetler:

- `<title>` + " | Sitemendo" ≤ 60 karakter; description 110–160; tek H1; benzersiz başlık, açıklama, H1.
- Üstte "Kurz gesagt" (3–5 madde), içindekiler, bölümler (H2/H3 sırası bozulmaz), SSS (5–8 soru), dürüst "Was unsere kostenlose Prüfung dazu zeigt" notu, kaynaklar, "Stand" tarihi.
- İç bağlantı: her Ratgeber başka ≥ 2 Ratgeber'den bağlı; her biri bir hizmet sayfasına bağlanır; bağlantı metinleri hedefi anlatır ("hier klicken" yok).
- Biçim: ≥ 1.400 kelime, ≥ 2 tablo/adım dizisi, alıntı ve kısaltma kuralları (Almanca tırnak, "z. B.", "91 %"), sabit fiyat yok.
- FAQ bölümü sayfada görünür; **FAQPage/HowTo yapılandırılmış verisi bilerek eklenmedi:** Google bu zengin sonuçları kısıtladı (Ağustos 2023) ve FAQ zengin sonuçlarını 7 Mayıs 2026'da tamamen kaldırdı; işaretleme zarar vermez ama görünür sonuç üretmez.
- Paylaşım görseli: `og:image` ve `Article.image` sayfanın diline göre (`/og/de.png`, `/og/tr.png`; 1200 × 630, dile göre alt metin); test adresi ve dosyanın varlığını denetler.
- Yazar: "Von Sitemendo" (kurum). `Article.author` Organization; uydurma kişi yok.
- **Türkçe rehberler aynı testlerden geçer, dil kurallarıyla** (`RULES` içinde `scripts/verify-guides.ts`): "siz" biçimi (sen/senin/sana yasak), tırnak “…” (düz tırnak ve Almanca „…“ yasak), kesme işareti ’ (düz `'` yasak), yüzde işareti sayıdan önce (`%91`), ≥ 1.100 kelime (Almancada 1.400), tarihe bağlı iddialarda "Ekim 2026 itibarıyla", fiyat `{price.*}` işaretiyle ve TL/₺ yazılmaz, abartı listesi (en iyi, mükemmel, harika, garantili …), "garanti" yalnızca olumsuz bağlamda. Her Türkçe rehber bir Almanca asla (`translationOf`) ve aynı `check`/`service`/`category` değerine bağlıdır; ilgili rehberler yalnız Türkçe rehberlere gider. Arayüz terimleri (Search Console, Gmail, WordPress) hem Türkçe hem İngilizce aslıyla verilir.

## 6. Teknik kararlar

- **URL şeması:** Almanca `/ratgeber/<slug>`, Türkçe `/rehber/<slug>`; her sayfa tek adreste, `?lang=` yok, canonical sayfanın kendisi. Çevirisi olan sayfa çiftleri (Türkçe dosyadaki `translationOf` alanı) hreflang ile birbirine bağlanır: `de`, `tr` ve `x-default` (= Almanca); iki özet sayfası da çifttir. Çevirisi olmayan Almanca Ratgeber'lerde hreflang yoktur (tek dilli sayfa). Ana site ve hizmet sayfaları `?lang=` şemasında kalır (mevcut düzen; bkz. bölüm 11).
- **Statik çıktı:** `output: 'export'`; Ratgeber'ler `app/ratgeber/` altında ikinci, Türkçe rehberler `app/rehber/` altında üçüncü bir kök düzende (`<html lang="de">` ve `<html lang="tr">`). Worker (`worker/index.ts`) `/ratgeber`, `/ratgeber/<slug>`, `/rehber` ve `/rehber/<slug>` için varlığı sunar; bilinmeyen adres kendi dilinde 404 (Almanca yolda Almanca, `/rehber/…` yolunda Türkçe; kod 404, `noindex`); sondaki eğik çizgi 308 ile kaldırılır; `Cache-Control: public, no-cache, no-transform`. Arayüz metinleri (başlıklar, etiketler) `lib/guides/ui.ts`'te dile göre tutulur.
- **Dil değiştirici:** rehber sayfalarında üst menüdeki TR/DE bağlantısı sayfanın karşılığına gider (çevirisi yoksa ana sayfanın o diline); geçerli dilin bağlantısı sayfanın kendisidir (`aria-current`).
- **Sitemap:** özet haftalık (0,8), Ratgeber'ler aylık (0,7), `lastModified` = Ratgeber'in `modified` alanı; çevirisi olan sayfa çiftlerinde her kayıt `alternates.languages` (de, tr, x-default) taşır. Anlamlı bir değişiklikte `modified` yükseltilir (yalnızca gerçek değişiklikte; sahte "güncellendi" tarihi yok).
- **Yapılandırılmış veri:** Article (headline, dates, image = dile göre paylaşım görseli, publisher/author Organization), BreadcrumbList, özet için CollectionPage. Hizmet sayfalarındaki `Service` verisi değişmedi.
- **Performans/erişilebilirlik:** İstemci JS gerektirmez (SSS yerel `<details>`); tablolar dar ekranda (< 640 px) kartlara dönüşür (satır başlığı kart başlığı, her hücrede sütun başlığı) ve tablo rolleri korunur. **Kelimeler ortadan bölünmez:** gövde metni `overflow-wrap: break-word` kullanır (`anywhere` her tablo sütununun en küçük genişliğini sıfıra yaklaştırıp dar sütunlarda kelimeleri "anlars ınız" gibi bölüyordu); 28 karakterden uzun tanımlayıcılar (DNS adları, hata kodları) tablo hücrelerinde ve başlıklarda noktalama sonrası `<wbr>` ile kırılabilir (kopyalanan metin değişmez); test hem CSS'i hem bunu denetler. 19 sayfada 24 genişlikte (360–1920 px) ölçüldü: ortadan bölünen kelime 0, yana kayan tablo 0, yatay taşma 0 (düzeltmeden önceki ölçümde, 16 genişlikte 912 bölünme vardı; 903'ü tablo hücrelerinde). 320–340 px'te yalnız satıra sığmayan birkaç uzun sözcük ve kod hâlâ kırılır (ör. Verbraucherstreitbeilegungsgesetzes).
- **Güvenlik başlıkları/CSP:** ana sitedekiyle aynı (`script-src 'self' 'unsafe-inline'`); Ratgeber'lerde harici betik, çerez, izleyici yok. Dış bağlantılar `rel="noopener noreferrer"`.

## 7. İç bağlantı yapısı

```
ana sayfa DE/EN (altbilgi "Ratgeber" / "Guides (in German)") ──► /ratgeber ──► 13 Ratgeber
ana sayfa TR (altbilgi "Rehberler") ──► /rehber ──► 4 rehber (Türkçe pilot)
Almanca hizmet sayfaları ("Passende Ratgeber", 3–4 kart) ──► ilgili Ratgeber'ler
Türkçe hizmet sayfaları ("İlgili rehberler", 2–4 kart) ──► ilgili Türkçe rehberler
Ratgeber ──► Ratgeber (related + metin içi) ──► hizmet sayfaları (kontrol / onarım / bakım) ──► form
Türkçe rehber ──► Türkçe rehber (related) + Almanca eşi ("Almanca sürüm") + Türkçe hizmet sayfaları
```

Hizmet sayfası eşlemesi `lib/guides/related.ts` içindedir, dil başına ayrı (Almanca check: pillar, Google, Impressum, Ladezeit; repair: Ladezeit, mobil, Formular, Links; care: Wartung, Erreichbarkeit, WordPress-Fehler, HTTPS. Türkçe check: Google, Impressum; repair: iletişim formu, Google; care: bakım, iletişim formu). İki yeni Ratgeber (Wartungsmodus, SPF/DKIM/DMARC) hizmet sayfası kartlarına eklenmedi (kartlar 3–4 ile sınırlı); özet sayfasından ve üçer mevcut Ratgeber'den bağlıdırlar (Wartungsmodus: WordPress-Fehler, Wartung, Erreichbarkeit; SPF/DKIM/DMARC: Kontaktformular, Wartung, pillar). İngilizce sayfalar Almanca Ratgeber'e yalnız altbilgiden ("Guides (in German)") bağlanır; çünkü İngilizce içerik yok. Türkçe rehberler, Türkçesi olmayan konulara (kırık bağlantılar, HTTPS, hız, mobil, erişilebilirlik) Almanca rehbere "(Almanca)" etiketiyle bağlanır; test bu çapraz-dil bağlantılarını da çözümler.

## 8. Yayından sonra yapılacaklar (kullanıcıda)

**Almanca bölüm 2026-10-01'de yayınlandı** (push yapıldı; canlıda `/ratgeber` ve 11 Ratgeber 200, sitemap 30 adres). Aşağıdaki 1–6 yine geçerli kontrol listesidir.

**Türkçe pilot (2026-10-01'de yayınlandı):**
- Kullanıcı okuma dosyasını alıp onayladı; `turkish-pilot` dalı `main`'e birleştirilip push edildi. Metin değişirse Almanca eşiyle birlikte güncellenir, `modified` yükseltilir ve test yeniden çalıştırılır.
- **Açık kalan doğrulamalar (isteğe bağlı):** (a) Search Console arayüz terimleri (Google'ın Türkçe belgelerinden alındı; kendi Türkçe arayüzünüzde aynı mı?), (b) hukuki terimlerin Türkçe karşılıkları (Impressum, ihtarname/Abmahnung, yetkili temsilci, denetleyici makam, idari para cezası; avukat onayı yok), (c) WordPress Türkçe ayar adı ("Ayarlar → Okuma", "Arama motorlarının bu siteyi dizine eklemesine engel olmaya çalış"), (d) Chrome Geliştirici Araçları'ndaki "Ağ" sekmesi adı.
- Yayından sonra: `/rehber` ve 4 `/rehber/<slug>` 200 dönmeli; `https://sitemendo.com/sitemap.xml` 35 adres içermeli; bir Türkçe rehberin kaynağında `hreflang` `de`, `tr`, `x-default` ve `<html lang="tr">` görülmeli. Search Console'da sitemap'i yeniden gönderin; `/rehber` ve 4 rehber için "Dizine ekleme iste" (günlük kota; aynı adres tekrar gönderilmez).

**İkinci paket (2026-10-02, dal `seo-phase2`; yayın onayı bekliyor):**
- Yayından sonra: `/ratgeber/wordpress-wartungsmodus-geht-nicht-weg` ve `/ratgeber/spf-dkim-dmarc-einrichten` 200 dönmeli; `https://sitemendo.com/sitemap.xml` 37 adres içermeli (14'ü `/ratgeber`, 5'i `/rehber`); bir Türkçe rehberin kaynağında `og:image` `https://sitemendo.com/og/tr.png`, Almanca rehberde `https://sitemendo.com/og/de.png` olmalı.
- Search Console: sitemap'i yeniden gönderin; iki yeni rehber için "Dizine ekleme iste". Başlığı değişen üç sayfa ve genişleyen Impressum rehberi (iki dilde) Google'ın kendi taramasıyla güncellenir; aynı adresi tekrar tekrar göndermeyin. Başlık değişikliğinin etkisini 4. ve 8. haftada Performans → Sayfalar'da bu üç sayfanın tıklama oranından okuyun (değişiklik tarihi: yayın günü).
- **Açık kalan doğrulamalar:** iki yeni Almanca rehber ve Impressum eklemeleri yapay zekâ ile yazıldı; ana dili Almanca olan biri ya da avukat okumadı. DMARC sağlayıcı tablosu bir DNS anlık görüntüsüdür ("Stand 1. Oktober 2026", 15 alan adı). Kendi Impressum'unuz için iki karar açık: USt-IdNr. (henüz yok) ve § 18 Abs. 2 MStV satırı (bu tür rehber sitelerin kapsama girip girmediği IHK ölçütüne göre belirsiz; ihtiyatlı satır eklenebilir, bkz. `DOKUMANTASYON.md`).

**Almanca yayın kontrol listesi:**

1. `git push origin main` (push ve deploy kullanıcıdadır; Workers Builds yayını yapar).
2. Canlıyı kontrol edin: `https://sitemendo.com/ratgeber` ve bir Ratgeber 200 dönmeli; `https://sitemendo.com/sitemap.xml` 30 adres içermeli (12'si `/ratgeber`).
3. **Search Console** (domain mülkü): Sitemaps → `https://sitemendo.com/sitemap.xml` (tam adres) yeniden gönderin. URL denetimi + "Dizine eklemeyi iste": önce `/ratgeber`, `/ratgeber/website-nicht-bei-google-gefunden`, `/ratgeber/website-selbst-pruefen`, `/ratgeber/kontaktformular-funktioniert-nicht`; kalanlar sonraki günlerde (günlük kota var; aynı adresi tekrar tekrar göndermek hızlandırmaz).
4. **Google işletme profili:** web sitesi alanına Almanca ana sayfa (`https://sitemendo.com/?lang=de`).
5. Takvim: ayda bir `npm run check:freshness`; üç ayda bir `npm run check:links`.
6. İsteğe bağlı: Impressum ve Kontaktformular Ratgeber'lerindeki hukuki bölümleri bir IT hukuku avukatı ya da IHK danışmanlığı gözden geçirsin (Ratgeber "Rechtsberatung değildir" der; yine de kullanıcıda duran hukuk işleriyle birlikte yapılabilir, bkz. `DOKUMANTASYON.md`).

## 9. Ölçüm planı (4 / 8 / 12 hafta)

Sitede analitik betiği yok (gizlilik metni böyle der); bu korunur. Kaynaklar: Search Console (gösterim, tıklama, sorgu, sayfa, dizinleme) ve ücretsiz kontrol formunun kendi bildirimleri (her istekte e-posta gelir; haftalık sayın).

| Zaman | Bakılacak | Karar |
|---|---|---|
| Hafta 1–2 | Sayfa dizinleme raporu: kaç Ratgeber dizinli? Durum mesajları | "Gefunden – zurzeit nicht indexiert": bekleyin, iç bağlantıyı kontrol edin. "Gecrawlt – zurzeit nicht indexiert": içerik/bağlantı gözden geçirilir; aynı adresi tekrar göndermeyin. |
| Hafta 4 | Performans → Sayfalar (`/ratgeber/`) ve Sorgular | Sorgu–sayfa eşleşmesi bölüm 4'teki tabloyla uyuşuyor mu? Çakışma var mı? |
| Hafta 8 | Gösterimi olup tıklanmayan sayfalar | Başlık/description'ı gerçek sorguya yaklaştırın (tek seferde bir sayfa, tarihini not edin) |
| Hafta 12 | Tıklama ve form isteği | Hangi Ratgeber değer üretiyor? Faz 2 konularına ve çeviri kararına buna göre karar verin |

Türkçe pilot yayınlanırsa: Performans → Sayfalar'da `/rehber/` filtresini kullanın ve `/ratgeber/` ile karşılaştırın. Almanca ve Türkçe eşler aynı konuyu iki dilde karşıladığı için karar 12. haftada, iki bölümün gösterim ve tıklama farkına ve ücretsiz kontrol isteklerine bakılarak verilir (bkz. bölüm 11).

Okuma kuralları: yeni alanda ilk haftalarda gösterim azdır; Google "birkaç haftaya kadar" sürebileceğini kendisi söyler. Karar vermek için değişiklikten sonra en az birkaç hafta bekleyin (SEO Starter Guide). Tek bir sorgunun sapması değil, sayfa ve sorgu grubu eğilimi okunur.

İsteğe bağlı (kullanıcı onayıyla): Bing Webmaster Tools (Search Console'dan içe aktarılır); IndexNow (adres bildirimi; izinsiz çalıştırılmaz); Cloudflare Workers gözlemlenebilirliği zaten açık: `/ratgeber/*` istek sayıları (botlar dahil) yön gösterir, kesin sayı değildir.

## 10. Güncel tutma: tarihe bağlı bilgiler

`npm run check:freshness` aşağıdakileri tarar (süresi gelen ve metinde duran ifade varsa "FÄLLIG", 60 gün içinde "bald"; kod 1 döner):

| Bilgi | Nerede | Süre | Yapılacak |
|---|---|---|---|
| Chrome 154 "Always Use Secure Connections" (Ekim 2026) | HTTPS Ratgeber'i, pillar | 2026-11-15 | "duyurdu" → "… tarihinden beri"; teaser ve H2 |
| PHP 8.2 güvenlik desteği sonu (31.12.2026) | Wartung, Ladezeit, pillar; Türkçe `web-sitesi-bakimi` | 2027-01-01 | tablo/paragraf/SSS; Stand |
| Ücretsiz kontrolün PHP eşiği (< 8.2 uyarı) | `lib/report/analyze.ts` | 2027-01-01 | eşiği 8.3'e çıkarın, `copy.ts` ve testleri güncelleyin |
| DMARC politikaları (Yahoo, GMX, WEB.DE, Gmail, Outlook, T-Online) | Kontaktformular Ratgeber'i; Türkçe `iletisim-formu-calismiyor` | 2027-01-15 | `dig +short TXT _dmarc.<alan>` ile yeniden sorgulayın |
| Büyük sağlayıcıların DMARC politikası tablosu ("Stand 1. Oktober 2026", 15 alan adı) | SPF/DKIM/DMARC Ratgeber'i (`dmarc-anbieter-tabelle`) | 2027-01-15 | aynı sorgu; tabloyu ve tarihi güncelleyin |
| Gmail, Yahoo ve Outlook.com gönderici gereklilikleri | SPF/DKIM/DMARC Ratgeber'i (`absender-anforderungen`) | 2027-04-01 | kaynakları yeniden okuyun; Microsoft reddetme zamanını açık bırakmıştı |
| Sertifika ömrü 100 gün (15.3.2027) | HTTPS Ratgeber'i | 2027-03-15 | zaman kipini düzeltin |
| Patchstack yıllık raporu (Şubat) | Wartung; Türkçe `web-sitesi-bakimi` | 2027-03-01 | 2026 rakamlarını alın |
| DDG/VSBG/MStV, IHK Merkblatt | Impressum Ratgeber'i; Türkçe `impressum-zorunlulugu` | 2027-04-01 | kanun metni ve Aktualitätendienst; Stand |
| Her Ratgeber ve her Türkçe rehber | hepsi | 183 gün | kaynakları ve iddiaları yeniden okuyun, `modified` yükseltin |

Aynı iddia iki dilde durduğu için bir güncelleme **Almanca ve Türkçe dosyaya birlikte** uygulanır; Türkçe dosyayı unutmak en olası hatadır (`check:freshness` her iki dosyayı da listeler). Tarih ifadesi Almancada "Stand: Oktober 2026", Türkçede "Ekim 2026 itibarıyla" biçimindedir; test ikisini de arar.

Dış bağlantılar için: `npm run check:links`. Google belgeleri taşınabilir (ör. HTTP durum kodları belgesi `developers.google.com/crawling/...` altına taşındı); script yönlendirmeleri raporlar. İki adres bot korumasında "von Hand prüfen" çıkar (W3C Link Checker, Search Engine Land); tarayıcıda açılır.

## 11. Sonraki fazlar ve şimdilik yapılmayanlar

**Faz 2 (12. hafta kararına bağlı; her biri önce birincil kaynakla doğrulanır):**
- Website-Relaunch ohne SEO-Verlust (Weiterleitungsplan; Google "Website-Umzug" belgesi).
- E-Mail-Zustellung / SPF, DKIM, DMARC: **yazıldı (2026-10-02)**, `spf-dkim-dmarc-einrichten`; WordPress Wartungsmodus aynı pakette (`wordpress-wartungsmodus-geht-nicht-weg`).
- Website gehackt (hack şüphesi: ilk adımlar, temizlik, bildirim; otomatik tamamlamada "website gehackt was tun" güçlü) ve BFSG (kimler kapsama giriyor, istisnalar; kapsam doğrulanmadan yazılmaz): sonraki paket önerisi, onay bekliyor.
- Ana rehberlere 1–2 özgün, alt metinli diyagram (Google'ın özgün görseli önermesi); işletme kayıtları (Google, Bing, Apple) için kopyala-yapıştır bilgi sayfası (kayıtlar sizin hesaplarınızla yapılır).
- Google-Unternehmensprofil einrichten (yerel görünürlük; profil kurallarına dikkat).
- WordPress sicher aktualisieren (Testkopie, Sicherung, Rückweg).
- Cookie-Banner / Einwilligung (TDDDG § 25) ve Datenschutzerklärung: hukuki, yalnızca kanun metni ve resmî kurum kaynaklarıyla, avukat gözden geçirmesi önerilir.
- Barrierefreiheit (BFSG): kapsamı ve geçerlilik şartları doğrulanmadan yazılmaz.

**Şimdilik yapılmayanlar (ve neden):**
- Türkçe pilotun dışındaki 7 Ratgeber'in Türkçesi ve tüm İngilizce Ratgeber: yok; hepsini birden çevirmiyoruz (ayrıntı aşağıda, "Türkçe ve İngilizce için karar çerçevesi"). Ana sayfa ve üç hizmet sayfası zaten TR/DE/EN: başlık, açıklama, canonical, hreflang (`x-default` Türkçe kök adres), `ProfessionalService` ve `Service` verisi üç dilde hazır.
- Yol tabanlı dil adresleri (`/de/...`): mevcut `?lang=` şeması hreflang ile çalışıyor; geçiş riskli. 12. haftada, hizmet sayfalarının verisine göre karar.
- Şehir sayfaları (ör. "Webseite reparieren Berlin"): kural gereği Berlin'e özel izlenim yok; ayrıca benzer metinli çok sayıda sayfa spam riski taşır.
- Sıfır-iletişim geri bağlantı fikirleri: yalnızca gerçek ve tutarlı kayıtlar (Google işletme profili, Bing Places, Apple Business Connect, kendi LinkedIn/GitHub profilleri, üyesi olunan IHK/Handwerkskammer'in firma rehberi). Her kayıtta ad, adres, telefon Impressum ile birebir aynı olmalı; toplu dizin gönderimi yapılmaz.
- Üretken yapay zekâyla toplu içerik: yok. Her Ratgeber elle doğrulanmış kaynakla yazıldı.

### Türkçe ve İngilizce için karar çerçevesi

Almanca Ratgeber'ler Almanya hukukuna ve Almanya'daki araçlara dayanır (DDG, IHK, DSGVO, GMX/WEB.DE). Çeviri bu içeriği Almanya'daki Türkçe ve İngilizce konuşan işletme sahiplerine açar; kitle daha küçük, rekabet büyük olasılıkla daha az, ama bunlar ölçülmedi, yalnızca sınanacak varsayımlar.

| Seçenek | Artı | Eksi |
|---|---|---|
| A. Hepsini şimdi (11 × 2) | Tek seferde bitmiş görünür | Almanca'nın işe yaradığı henüz bilinmiyor; her tarihe bağlı bilgi ve hukuki atıf 3 kez bakım ister; hukuki terimlerde çeviri hatası riski |
| **B. Pilot (seçildi, yazıldı ve 2026-10-01'de yayınlandı):** Türkçe 4 rehber, İngilizce 0 | Varsayımı ucuza sınar; bakım yükü küçük | Küçük örnek, sonuç gürültülü olabilir |
| C. 12. haftadan sonra | Karar gerçek veriye dayanır | 3 ay kaybedilir |

Pilot konuları (hukuki ve "problem" niyetli, Almanya'daki küçük işletme sahibini en çok korkutanlar; dördü de yazıldı): Impressum zorunluluğu, "web sitem Google'da çıkmıyor", iletişim formu e-postaları gelmiyor, web sitesi bakımı. Türkçe önce (hedef kitle Türkçe ve Almanca iki dilli, kullanıcı kararı 2026-09-17); İngilizce yalnızca Türkçe pilot veri verirse.

Uygulama (2026-10-01): adres düzeni `/rehber/<slug>` ↔ `/ratgeber/<slug>` (yol tabanlı `/tr/…` değil; mevcut Ratgeber düzeniyle aynı); yalnız çevirisi olan rehberler birbirine hreflang ile bağlanır (`guideMetadata`, sitemap, test genişletildi); yeni bir dil eklemek için `GuideLang`, `UI`, `linksFor` ve `RULES` (test) girdisi, bir kök düzen ve Worker yolu gerekir. Hukuki terimler çeviride Almanca aslıyla birlikte verilir (Impressum, Abmahnung, Anbieterkennzeichnung). Metinler yapay zekâ ile yazıldı; doğrudan yayınlanmaz, yayın öncesi kullanıcı onayı şart (pilot için alındı, 2026-10-01).

**Pilot kararı (12. hafta):** Türkçe sayfalar gösterim ve ücretsiz kontrol isteği üretiyorsa kalan 7 Ratgeber sırayla Türkçeye uyarlanır (her biri aynı testten geçer, aynı okuma kuralıyla). Üretmiyorsa Türkçe bölüm olduğu gibi kalır, yeni çeviri yapılmaz; İngilizce hiç başlamaz.

Açık karar (acil değil): `x-default` ve dil belirtilmeyen istek şu an Türkçe (kullanıcı kararı, 2026-09-17). SEO artık Almanca öncelikli; Almanya hedefliyse kök adresin ve `x-default`'un Almanca olması düşünülebilir. Worker dil seçimini ve hreflang'ı etkilediği için verilerle (Search Console, hangi dilde gösterim) birlikte karar verilir.

## 12. Riskler ve açık noktalar

- **Otorite:** yeni alan adı; ajans ve barındırıcı blogları güçlü. Beklenti: önce uzun kuyruklu sorgular ("durum mesajı", "hata kodu"), genel sorgular geç ve belirsiz.
- **E-E-A-T:** adlandırılmış uzman/yazar yok (proje kuralı: kişisel öykü, fotoğraf, uydurma ekip yok). Dengeleyiciler: kaynaklar, tarih, Impressum, dürüst kapsam notları. Kullanıcı isterse gerçek adıyla yazar satırı eklenebilir; bu kullanıcı kararıdır.
- **Yeni Almanca metinlerin okunması:** Wartungsmodus ve SPF/DKIM/DMARC rehberleri ile Impressum eklemeleri yapay zekâ ile, birincil kaynaklardan yazıldı; ana dili Almanca olan biri okumadı. DMARC sağlayıcı tablosu bir günün DNS anlık görüntüsüdür (sağlayıcılar politikayı değiştirebilir); RFC 9989 (Mayıs 2026) eski RFC 7489'un yerine geçti, `pct` etiketi kalktı, `t` eklendi: rehber bunu anlatıyor, ama yazılım ve sağlayıcı belgeleri eski etiketi bir süre daha gösterebilir.
- **Hukuki içerik:** Impressum/Datenschutz bölümleri kanun metnine ve IHK Merkblatt'ına dayanır, yine de genel bilgidir. Kanun değişirse `check:freshness` hatırlatır.
- **Yapay zekâ özetleri:** bilgi sorgularında tıklama azalabilir; bu yüzden "problem + adım adım çözüm + araç" niyetine odaklandık.
- **Dil kapsamı:** 13 Almanca Ratgeber'in yalnız 4'ünün Türkçesi var; İngilizce yok (bilinçli, bkz. bölüm 11).
- **Türkçe metinlerin kalitesi:** metinler yapay zekâ ile yazıldı; hukuki terimler, Search Console/Gmail/WordPress arayüz adları yerel okumayla doğrulanmalı. Search Console terimleri Google'ın Türkçe yardım sayfalarından alındı; Google'ın Türkçe belgeleri (özellikle `developers.google.com` altındakiler) makine çevirisidir ve kendi içinde tutarsız olabilir (örnek: "Dizine ekleme iste" ve "Dizine eklenmesini iste"), bu yüzden arayüz terimleri İngilizce aslıyla birlikte verilir. WordPress ayar adı `translate.wordpress.org` Türkçe çevirisinden (geliştirme sürümü) alındı; sürüme göre değişebilir.
- **Üçüncü taraf belgeler taşınır/değişir:** `check:links`, `check:freshness`.
- **Ölçüm:** analitik yok; Search Console tek kaynak (ve form bildirimleri). Çerezsiz bir analitik eklemek gizlilik metnini ve Cloudflare ayarını etkiler; ayrı karar.

## 13. Birincil kaynaklar (özet)

Tam liste her Ratgeber'in "Quellen" bölümünde. Başlıcaları: Google Search Central (indexing, noindex, robots.txt, site: operatörü, Seitenindexierung, URL-Prüftool, HTTP-Statuscodes, Spamrichtlinien, SEO-Starter-Guide, "Brauche ich einen SEO?"), blog.google (HTTPS by default), MDN (Mixed Content, HSTS, 5xx), php.net (Supported Versions, mail()), WordPress.org (Sicherheit, Updates, Debugging, Recovery Mode), Gmail Absenderrichtlinien, Yahoo ve Microsoft (Outlook.com) gönderici gereklilikleri, RFC 6376, RFC 7208, RFC 9989 ve RFC 9990, WordPress kaynak kodu (`wp_is_maintenance_mode`, `.maintenance`) ve WP-CLI (`maintenance-mode`), IHK Karlsruhe, Hagen ve Hanau-Gelnhausen-Schlüchtern (Impressum özel durumları) ve OLG Hamburg 21.5.2026, gesetze-im-internet.de (§ 5 ve § 33 DDG, § 36 VSBG), Medienstaatsvertrag § 18, IHK Merkblätter, Patchstack.

## 14. Nasıl test edilir (adım adım)

**A. Kod tarafı (kendi makinen):** `npm test` (72 test: Ratgeber ve Türkçe rehber verisi, uzunluklar, dil kuralları, bağlantılar, işaretleme, hreflang çiftleri, paylaşım görseli, kelime bölünmesi, sitemap, HTML), `npm run lint`, `npm run typecheck`, `npm run build` (47 statik sayfa). İsteğe bağlı: `npm run check:links` (113 dış adres canlı), `npm run check:freshness` (tarihe bağlı iddialar).

**B. Yayından hemen sonra, 5 dakika:**
1. Bu 14 adres açılmalı: `https://sitemendo.com/ratgeber` ve 13 `/ratgeber/<slug>` (liste: `lib/guides/index.ts`). Kontrol: `curl -sI https://sitemendo.com/ratgeber/website-wartung` → `200`.
2. Sayfa kaynağında (görünüm-kaynağı): `<title>`, `<link rel="canonical">` (kendi adresi), `<html lang="de">`, `application/ld+json` (Article + BreadcrumbList) ve **`noindex` olmaması**.
3. `https://sitemendo.com/sitemap.xml` 30 adres içermeli (12'si `/ratgeber`); Türkçe pilot yayınlandıktan sonra 35 (5'i `/rehber`); ikinci paketten sonra 37 (14'ü `/ratgeber`, 5'i `/rehber`).
4. Türkçe pilot yayınlandıktan sonra: `/rehber` ve 4 `/rehber/<slug>` açılmalı; kaynakta `<html lang="tr">`, `hreflang` (`de`, `tr`, `x-default` Almanca) ve canonical (kendi adresi). Almanca eş sayfada (`/ratgeber/impressum-pflichtangaben` gibi) karşı yönde aynı üç `hreflang` ve "Türkische Fassung" bağlantısı bulunmalı.

**C. Google araçları (hepsi ücretsiz):**
- **Search Console → URL denetimi:** adresi yapıştır → "Canlı URL'yi test et": sayfa Google tarafından getirilebilir ve dizine eklenebilir görünmeli → "Dizine eklenmesini iste" (günlük kota var). Birkaç gün sonra aynı ekranda "URL Google'da" yazmalı. Genel görünüm: Dizinleme → Sayfalar.
- **Zengin Sonuçlar Testi** (`search.google.com/test/rich-results`): canlı adresi gir; Breadcrumb (Ekmek kırıntısı) hatasız algılanmalı. Article için Google ayrıca görünür sonuç vaat etmez; sözdizimi için **Schema.org doğrulayıcı** (`validator.schema.org`).
- **PageSpeed Insights** (`pagespeed.web.dev`): önce mobil sekme. Beklenti: dört kategori 90+ (yerel Lighthouse sonuçları aşağıda). "Gerçek kullanıcı verisi" bölümü trafik gelene kadar boş kalır; bu normal.
- **Chrome DevTools → Lighthouse** (mobil, Performans + Erişilebilirlik + En iyi uygulamalar + SEO): benim yaptığım ölçümle aynı.
- **Mobil görünüm:** DevTools cihaz modu (390 px) ve gerçek telefon: tablolar kart olmalı, yatay kayma olmamalı.

**D. Dizinleme ve görünürlük (haftalar içinde):** `site:sitemendo.com/ratgeber` aramasını yalnızca kaba işaret say (Google da listenin tam olmadığını söyler); asıl kaynak Search Console → Sayfalar ve Performans (bölüm 9). Google, yeni sitenin fark edilmesinin "birkaç haftayı" bulabileceğini söyler.

**E. Yerel Lighthouse sonuçları (2026-10-01, `wrangler dev`, Lighthouse 13, simüle yavaş 4G):**

| Sayfa | Mobil (Perf / Erişilebilirlik / En iyi uyg. / SEO) | Masaüstü |
|---|---|---|
| `/ratgeber` | 100 / 100 / 100 / 100 (tekrarlı ölçüm; ilk soğuk ölçüm 91) | 100 / 100 / 100 / 100 |
| `/ratgeber/website-nicht-bei-google-gefunden` (en uzun) | 100 / 100 / 100 / 100 (ilk soğuk ölçüm 98) | 100 / 100 / 100 / 100 |
| `/ratgeber/impressum-pflichtangaben` | 100 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| `/website-repair?lang=de` (kartlı hizmet sayfası) | 100 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| `/?lang=de` (ana sayfa) | 100 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |

Türkçe pilot (aynı koşullar, 2026-10-01): `/rehber` ve 4 `/rehber/<slug>` mobil ve masaüstünde 100 / 100 / 100 / 100 (mobil LCP 1,2–1,4 s, CLS 0, TBT 10–40 ms; sayfa başına 195–215 KiB).

İkinci paket (aynı koşullar, 2026-10-02, tablo düzeltmesinden sonra): `/ratgeber/spf-dkim-dmarc-einrichten`, `/ratgeber/wordpress-wartungsmodus-geht-nicht-weg`, `/rehber/web-sitesi-google-da-gorunmuyor`, `/ratgeber/website-nicht-erreichbar`, `/ratgeber/kontaktformular-funktioniert-nicht`: mobil ve masaüstünde 100 / 100 / 100 / 100 (mobil LCP 1,1–1,4 s, CLS 0, TBT 20–60 ms; sayfa başına 208–215 KiB).

Mobil LCP ≈ 1,2 s, CLS 0, TBT 50–80 ms; sayfa başına ≈ 200–215 KiB aktarım (çoğu Next çalışma zamanı). Kalan uyarılar ("kullanılmayan JavaScript", "eski JavaScript") Next çerçevesinden gelir, puanı düşürmez; kovalanmaz.

**F. Sınırlar:** Lighthouse "SEO 100" yalnızca temel teknik hijyeni ölçer (başlık, açıklama, taranabilirlik, hreflang, bağlantı metni, mobil uyum); sıralama, otorite veya içeriğin sorguyla eşleşmesi hakkında bir şey söylemez. Ölçüm yerel ve ağ gecikmesiz sunucudan; canlıda PageSpeed Insights ile tekrarlayın. Sıralama ancak Search Console verisiyle (bölüm 9) görülür.

