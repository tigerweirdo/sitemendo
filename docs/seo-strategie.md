# SEO stratejisi: Almanca Ratgeber (sitemendo.com)

Tarih: 2026-10-01 · Kapsam: `/ratgeber` bölümü, teknik SEO, iç bağlantı, ölçüm planı · Dil: Almanca öncelikli (kullanıcı kararı, 2026-10-01)

## 1. Amaç, sınırlar, başarı ölçütü

**Amaç:** Kimseyle iletişime geçmeden, arama motorundan gelen ziyaretçiyi ücretsiz kontrol formuna getirmek. Hedef kitle: Almanya'daki küçük işletmeler ve serbest çalışanlar; aradıkları şey bir "problem + çözüm" (ör. "Kontaktformular funktioniert nicht", "Website nicht bei Google gefunden").

**Sınırlar (değişmez kurallar):**
- Soğuk e-posta, telefon, ziyaret yok (§ 7 UWG; kullanıcı kararı). Bağlantı toplamak için kimseye yazılmaz.
- Satın alınan bağlantı, bağlantı paketi, toplu üretilmiş sayfa yok. Google bunu spam sayar (Spamrichtlinien: Link-Spam, Missbrauch mit massenhaft generierten Inhalten).
- Sitedeki metin kuralları geçerli: "Sie" biçimi, sakin ve somut dil, uydurma referans/müşteri sayısı yok, abartı yok, fiyat metinde tekrarlanmaz (`{price.*}` işaretleri), "garantiert" yalnızca olumsuz bağlamda ("kimse garanti edemez").
- Her olgusal iddia birincil kaynaktan doğrulandı; tarihe bağlı olanlar "Stand: Oktober 2026" taşır.
- Hukuki konularda (Impressum, Datenschutz) "Rechtsberatung değildir" uyarısı ve kanunun kendi metni.

**Başarı ölçütü (12 hafta):** (1) 11 Ratgeber + özet sayfası Search Console'da dizinli; (2) `/ratgeber/` yolunda gösterim ve tıklama oluşuyor; (3) ücretsiz kontrol isteklerinde arama kaynaklı artış (bkz. bölüm 9). Sıralama veya trafik sayısı vaat edilmez; kimse #1 garanti edemez (Google, "Brauche ich einen SEO?").

## 2. Ne yapıldı (özet)

- 11 Almanca Ratgeber (`lib/guides/*.ts`, ayrıntılı, kaynaklı, 1.400+ kelime) + özet sayfası `/ratgeber`.
- Teknik altyapı: statik HTML (JS gerektirmez), kendi kök düzeni, canonical, Article + BreadcrumbList + CollectionPage JSON-LD, sitemap (`lastModified` her Ratgeber'in kendi tarihi), Worker yönlendirmesi, mobilde kart biçimine dönen tablolar.
- İç bağlantı: ana sayfa altbilgisi → `/ratgeber` (üç dilde); Almanca hizmet sayfaları → "Passende Ratgeber" (3–4 kart); Ratgeber'ler birbirine ve hizmet sayfalarına bağlı.
- Denetimler: `npm test` (13 yeni test), `npm run check:links` (75 dış adres canlı), `npm run check:freshness` (tarihe bağlı iddialar).

## 3. Arama sonuçlarından gözlemler (sınırlı, ölçüm değil)

Konu araştırması sırasında kullanılan arama aracı ABD kaynaklıdır; sıralama google.de ile aynı değildir. Aşağıdakiler yalnızca niteliksel gözlemdir; gerçek veri Search Console'dan gelecek.

- Hata mesajı sorguları (ör. "Es gab einen kritischen Fehler auf deiner Website"): ağırlıkla ajans ve serbest çalışan blogları; kalite değişken, çoğu kısa.
- Impressum sorguları: IHK sayfaları, hukuk/araç sağlayıcıları. Birçok şablon hâlâ eski bilgi taşıyor (TMG, OS-Plattform bağlantısı); DDG ve 20 Temmuz 2025'te kapanan OS platformu bizim Ratgeber'de güncel.
- Search Console durum mesajları ("Gefunden – zurzeit nicht indexiert"): Google'ın kendi yardım sayfaları öne çıkıyor. Bizim fark: durumun ne demek olduğunu, ne yapılacağını ve ne yapılmaması gerektiğini küçük işletme diliyle anlatmak.
- Fırsat: kaynaklı, tarihli, kapsamı dürüst (ne yapar, ne yapmaz) bir koleksiyon. Zayıf nokta: yeni alan adı, düşük otorite, kişisel yazar yok (bkz. bölüm 12).

## 4. Konu haritası ve arama niyeti

Hacimler ölçülmedi; sorgular tahmindir. Her Ratgeber'in tek bir ana niyeti var (kendi içinde çakışma olmasın); özet (pillar) sayfa "Checkliste" niyetini, alt sayfalar "problem" niyetini karşılar.

| Ratgeber | Ana sorgu | Yan sorgular | Niyet | Ücretsiz kontrol noktası |
|---|---|---|---|---|
| `website-selbst-pruefen` | website selbst prüfen | website checkliste, website analyse kostenlos | bilgi, karşılaştırma | tümü |
| `website-nicht-bei-google-gefunden` | website nicht bei google gefunden | seite nicht indexiert, gefunden – zurzeit nicht indexiert, site: abfrage | problem | Index (noindex, robots.txt, sitemap) |
| `website-laedt-langsam` | website lädt langsam | ladezeit verbessern, core web vitals, pagespeed | problem | Tempo |
| `website-mobil-optimieren` | website mobil optimieren | nicht mobilfreundlich, mobile-friendly test alternative | problem | Mobil |
| `kontaktformular-funktioniert-nicht` | kontaktformular funktioniert nicht | formular sendet keine e-mails, contact form 7 sendet nicht | problem | Formulare |
| `https-ssl-fehler-beheben` | website nicht sicher | ssl zertifikat abgelaufen, mixed content, http auf https | problem | HTTPS |
| `defekte-links-finden-beheben` | defekte links finden | 404 fehler beheben, 301 weiterleitung einrichten | problem | Links |
| `impressum-pflichtangaben` | impressum pflichtangaben | was muss ins impressum, impressum ddg, os-plattform impressum | bilgi (yasal) | Kontakt |
| `website-wartung` | website wartung | wartungsvertrag, wordpress wartung, website pflege kosten | ticari araştırma | Technik |
| `website-nicht-erreichbar` | website nicht erreichbar | 503 service unavailable, 502 bad gateway | problem (acil) | (yok; Pflege'de izleme) |
| `wordpress-kritischer-fehler-beheben` | wordpress kritischer fehler | es gab einen kritischen fehler auf deiner website | problem (acil) | Technik |

Bu tabloyu 4. haftada Search Console'daki gerçek sorgularla karşılaştırın; çakışma (aynı sorgu için iki Ratgeber görünüyor) varsa birini sadeleştirin veya iç bağlantıyla yönlendirin.

## 5. Sayfa standartları (on-page)

Test (`scripts/verify-guides.ts`) bunları her `npm test`'te denetler:

- `<title>` + " | Sitemendo" ≤ 60 karakter; description 110–160; tek H1; benzersiz başlık, açıklama, H1.
- Üstte "Kurz gesagt" (3–5 madde), içindekiler, bölümler (H2/H3 sırası bozulmaz), SSS (5–8 soru), dürüst "Was unsere kostenlose Prüfung dazu zeigt" notu, kaynaklar, "Stand" tarihi.
- İç bağlantı: her Ratgeber başka ≥ 2 Ratgeber'den bağlı; her biri bir hizmet sayfasına bağlanır; bağlantı metinleri hedefi anlatır ("hier klicken" yok).
- Biçim: ≥ 1.400 kelime, ≥ 2 tablo/adım dizisi, alıntı ve kısaltma kuralları (Almanca tırnak, "z. B.", "91 %"), sabit fiyat yok.
- FAQ bölümü sayfada görünür; **FAQPage/HowTo yapılandırılmış verisi bilerek eklenmedi:** Google bu zengin sonuçları kısıtladı (Ağustos 2023) ve FAQ zengin sonuçlarını 7 Mayıs 2026'da tamamen kaldırdı; işaretleme zarar vermez ama görünür sonuç üretmez.
- Yazar: "Von Sitemendo" (kurum). `Article.author` Organization; uydurma kişi yok.

## 6. Teknik kararlar

- **URL şeması:** Her Ratgeber tek Almanca adreste (`/ratgeber/<slug>`), `?lang=` yok, canonical kendisi, hreflang yok (tek dilli sayfa). Ana site ve hizmet sayfaları `?lang=` şemasında kalır (mevcut düzen; bkz. bölüm 11).
- **Statik çıktı:** `output: 'export'`; Ratgeber'ler `app/ratgeber/` altında ikinci bir kök düzende (`<html lang="de">`). Worker (`worker/index.ts`) `/ratgeber` ve `/ratgeber/<slug>` için varlığı sunar; bilinmeyen adres Almanca 404 (kod 404); sondaki eğik çizgi 308 ile kaldırılır; `Cache-Control: public, no-cache, no-transform`.
- **Sitemap:** özet haftalık (0,8), Ratgeber'ler aylık (0,7), `lastModified` = Ratgeber'in `modified` alanı. Anlamlı bir değişiklikte `modified` yükseltilir (yalnızca gerçek değişiklikte; sahte "güncellendi" tarihi yok).
- **Yapılandırılmış veri:** Article (headline, dates, publisher/author Organization), BreadcrumbList, özet için CollectionPage. Hizmet sayfalarındaki `Service` verisi değişmedi.
- **Performans/erişilebilirlik:** İstemci JS gerektirmez (SSS yerel `<details>`); tablolar dar ekranda (< 640 px) kartlara dönüşür (satır başlığı kart başlığı, her hücrede sütun başlığı) ve tablo rolleri korunur; uzun teknik sözcükler (hata kodları, alan adları) kırılır; 320–1280 px arasında yatay taşma yok (altı genişlikte ölçüldü).
- **Güvenlik başlıkları/CSP:** ana sitedekiyle aynı (`script-src 'self' 'unsafe-inline'`); Ratgeber'lerde harici betik, çerez, izleyici yok. Dış bağlantılar `rel="noopener noreferrer"`.

## 7. İç bağlantı yapısı

```
ana sayfa (altbilgi "Ratgeber") ──► /ratgeber ──► 11 Ratgeber
Almanca hizmet sayfaları ("Passende Ratgeber", 3–4 kart) ──► ilgili Ratgeber'ler
Ratgeber ──► Ratgeber (related + metin içi) ──► hizmet sayfaları (kontrol / onarım / bakım) ──► form
```

Hizmet sayfası eşlemesi `lib/guides/related.ts` içindedir (check: pillar, Google, Impressum, Ladezeit; repair: Ladezeit, mobil, Formular, Links; care: Wartung, Erreichbarkeit, WordPress-Fehler, HTTPS). Türkçe/İngilizce sayfalar Almanca Ratgeber'e yalnız altbilgiden ("Rehberler (Almanca)", "Guides (in German)") bağlanır; çünkü içerik Almanca.

## 8. Yayından sonra yapılacaklar (kullanıcıda)

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

Okuma kuralları: yeni alanda ilk haftalarda gösterim azdır; Google "birkaç haftaya kadar" sürebileceğini kendisi söyler. Karar vermek için değişiklikten sonra en az birkaç hafta bekleyin (SEO Starter Guide). Tek bir sorgunun sapması değil, sayfa ve sorgu grubu eğilimi okunur.

İsteğe bağlı (kullanıcı onayıyla): Bing Webmaster Tools (Search Console'dan içe aktarılır); IndexNow (adres bildirimi; izinsiz çalıştırılmaz); Cloudflare Workers gözlemlenebilirliği zaten açık: `/ratgeber/*` istek sayıları (botlar dahil) yön gösterir, kesin sayı değildir.

## 10. Güncel tutma: tarihe bağlı bilgiler

`npm run check:freshness` aşağıdakileri tarar (süresi gelen ve metinde duran ifade varsa "FÄLLIG", 60 gün içinde "bald"; kod 1 döner):

| Bilgi | Nerede | Süre | Yapılacak |
|---|---|---|---|
| Chrome 154 "Always Use Secure Connections" (Ekim 2026) | HTTPS Ratgeber'i, pillar | 2026-11-15 | "duyurdu" → "… tarihinden beri"; teaser ve H2 |
| PHP 8.2 güvenlik desteği sonu (31.12.2026) | Wartung, Ladezeit, pillar | 2027-01-01 | tablo/paragraf/SSS; Stand |
| Ücretsiz kontrolün PHP eşiği (< 8.2 uyarı) | `lib/report/analyze.ts` | 2027-01-01 | eşiği 8.3'e çıkarın, `copy.ts` ve testleri güncelleyin |
| DMARC politikaları (Yahoo, GMX, WEB.DE, Gmail, Outlook, T-Online) | Kontaktformular Ratgeber'i | 2027-01-15 | `dig +short TXT _dmarc.<alan>` ile yeniden sorgulayın |
| Sertifika ömrü 100 gün (15.3.2027) | HTTPS Ratgeber'i | 2027-03-15 | zaman kipini düzeltin |
| Patchstack yıllık raporu (Şubat) | Wartung | 2027-03-01 | 2026 rakamlarını alın |
| DDG/VSBG/MStV, IHK Merkblatt | Impressum Ratgeber'i | 2027-04-01 | kanun metni ve Aktualitätendienst; Stand |
| Her Ratgeber | hepsi | 183 gün | kaynakları ve iddiaları yeniden okuyun, `modified` yükseltin |

Dış bağlantılar için: `npm run check:links`. Google belgeleri taşınabilir (ör. HTTP durum kodları belgesi `developers.google.com/crawling/...` altına taşındı); script yönlendirmeleri raporlar. İki adres bot korumasında "von Hand prüfen" çıkar (W3C Link Checker, Search Engine Land); tarayıcıda açılır.

## 11. Sonraki fazlar ve şimdilik yapılmayanlar

**Faz 2 (12. hafta kararına bağlı; her biri önce birincil kaynakla doğrulanır):**
- Website-Relaunch ohne SEO-Verlust (Weiterleitungsplan; Google "Website-Umzug" belgesi).
- E-Mail-Zustellung einfach erklärt (SPF/DKIM/DMARC ayrı rehber olarak; Kontaktformular'dan ayrıştırılabilir).
- Google-Unternehmensprofil einrichten (yerel görünürlük; profil kurallarına dikkat).
- WordPress sicher aktualisieren (Testkopie, Sicherung, Rückweg).
- Cookie-Banner / Einwilligung (TDDDG § 25) ve Datenschutzerklärung: hukuki, yalnızca kanun metni ve resmî kurum kaynaklarıyla, avukat gözden geçirmesi önerilir.
- Barrierefreiheit (BFSG): kapsamı ve geçerlilik şartları doğrulanmadan yazılmaz.

**Şimdilik yapılmayanlar (ve neden):**
- Türkçe/İngilizce Ratgeber: hepsini birden çevirmiyoruz (ayrıntı aşağıda, "Türkçe ve İngilizce için karar çerçevesi"). Ana sayfa ve üç hizmet sayfası zaten TR/DE/EN: başlık, açıklama, canonical, hreflang (`x-default` Türkçe kök adres), `ProfessionalService` ve `Service` verisi üç dilde hazır.
- Yol tabanlı dil adresleri (`/de/...`): mevcut `?lang=` şeması hreflang ile çalışıyor; geçiş riskli. 12. haftada, hizmet sayfalarının verisine göre karar.
- Şehir sayfaları (ör. "Webseite reparieren Berlin"): kural gereği Berlin'e özel izlenim yok; ayrıca benzer metinli çok sayıda sayfa spam riski taşır.
- Sıfır-iletişim geri bağlantı fikirleri: yalnızca gerçek ve tutarlı kayıtlar (Google işletme profili, Bing Places, Apple Business Connect, kendi LinkedIn/GitHub profilleri, üyesi olunan IHK/Handwerkskammer'in firma rehberi). Her kayıtta ad, adres, telefon Impressum ile birebir aynı olmalı; toplu dizin gönderimi yapılmaz.
- Üretken yapay zekâyla toplu içerik: yok. Her Ratgeber elle doğrulanmış kaynakla yazıldı.

### Türkçe ve İngilizce için karar çerçevesi

Almanca Ratgeber'ler Almanya hukukuna ve Almanya'daki araçlara dayanır (DDG, IHK, DSGVO, GMX/WEB.DE). Çeviri bu içeriği Almanya'daki Türkçe ve İngilizce konuşan işletme sahiplerine açar; kitle daha küçük, rekabet büyük olasılıkla daha az, ama bunlar ölçülmedi, yalnızca sınanacak varsayımlar.

| Seçenek | Artı | Eksi |
|---|---|---|
| A. Hepsini şimdi (11 × 2) | Tek seferde bitmiş görünür | Almanca'nın işe yaradığı henüz bilinmiyor; her tarihe bağlı bilgi ve hukuki atıf 3 kez bakım ister; hukuki terimlerde çeviri hatası riski |
| **B. Pilot (önerilen):** Türkçe 3–4, İngilizce 0–3 rehber | Varsayımı ucuza sınar; bakım yükü küçük | Küçük örnek, sonuç gürültülü olabilir |
| C. 12. haftadan sonra | Karar gerçek veriye dayanır | 3 ay kaybedilir |

Önerilen pilot konuları (hukuki ve "problem" niyetli, Almanya'daki küçük işletme sahibini en çok korkutanlar): Impressum zorunluluğu, "web sitem Google'da çıkmıyor", iletişim formu e-postaları gelmiyor, web sitesi bakımı. Türkçe önce (hedef kitle Türkçe ve Almanca iki dilli, kullanıcı kararı 2026-09-17; içeriği sen gözden geçirebilirsin); İngilizce yalnızca Türkçe pilot veri verirse.

Teknik not: yeni dillerin adres düzeni ve hreflang bağı gerekir (ör. `/tr/rehber/<slug>` ↔ `/ratgeber/<slug>`; yalnız çevirisi olan rehberler birbirine bağlanır, `guideMetadata`, sitemap ve test genişletilir). Hukuki terimler çeviride Almanca aslıyla birlikte verilir (Impressum, Anbieterkennzeichnung). Makine çevirisi doğrudan yayınlanmaz; yerel okuma şart.

Açık karar (acil değil): `x-default` ve dil belirtilmeyen istek şu an Türkçe (kullanıcı kararı, 2026-09-17). SEO artık Almanca öncelikli; Almanya hedefliyse kök adresin ve `x-default`'un Almanca olması düşünülebilir. Worker dil seçimini ve hreflang'ı etkilediği için verilerle (Search Console, hangi dilde gösterim) birlikte karar verilir.

## 12. Riskler ve açık noktalar

- **Otorite:** yeni alan adı; ajans ve barındırıcı blogları güçlü. Beklenti: önce uzun kuyruklu sorgular ("durum mesajı", "hata kodu"), genel sorgular geç ve belirsiz.
- **E-E-A-T:** adlandırılmış uzman/yazar yok (proje kuralı: kişisel öykü, fotoğraf, uydurma ekip yok). Dengeleyiciler: kaynaklar, tarih, Impressum, dürüst kapsam notları. Kullanıcı isterse gerçek adıyla yazar satırı eklenebilir; bu kullanıcı kararıdır.
- **Hukuki içerik:** Impressum/Datenschutz bölümleri kanun metnine ve IHK Merkblatt'ına dayanır, yine de genel bilgidir. Kanun değişirse `check:freshness` hatırlatır.
- **Yapay zekâ özetleri:** bilgi sorgularında tıklama azalabilir; bu yüzden "problem + adım adım çözüm + araç" niyetine odaklandık.
- **Tek dil:** Türkçe/İngilizce ziyaretçi bu içerikten yararlanmaz (bilinçli, bkz. bölüm 11).
- **Üçüncü taraf belgeler taşınır/değişir:** `check:links`, `check:freshness`.
- **Ölçüm:** analitik yok; Search Console tek kaynak (ve form bildirimleri). Çerezsiz bir analitik eklemek gizlilik metnini ve Cloudflare ayarını etkiler; ayrı karar.

## 13. Birincil kaynaklar (özet)

Tam liste her Ratgeber'in "Quellen" bölümünde. Başlıcaları: Google Search Central (indexing, noindex, robots.txt, site: operatörü, Seitenindexierung, URL-Prüftool, HTTP-Statuscodes, Spamrichtlinien, SEO-Starter-Guide, "Brauche ich einen SEO?"), blog.google (HTTPS by default), MDN (Mixed Content, HSTS, 5xx), php.net (Supported Versions, mail()), WordPress.org (Sicherheit, Updates, Debugging, Recovery Mode), Gmail Absenderrichtlinien, RFC 7208 ve RFC 9989, gesetze-im-internet.de (§ 5 ve § 33 DDG, § 36 VSBG), Medienstaatsvertrag § 18, IHK Merkblätter, Patchstack.

## 14. Nasıl test edilir (adım adım)

**A. Kod tarafı (kendi makinen):** `npm test` (70 test: ratgeber verisi, uzunluklar, bağlantılar, işaretleme, sitemap, HTML), `npm run lint`, `npm run typecheck`, `npm run build`. İsteğe bağlı: `npm run check:links` (dış adresler canlı), `npm run check:freshness` (tarihe bağlı iddialar).

**B. Yayından hemen sonra, 5 dakika:**
1. Bu 12 adres açılmalı: `https://sitemendo.com/ratgeber` ve 11 `/ratgeber/<slug>` (liste: `lib/guides/index.ts`). Kontrol: `curl -sI https://sitemendo.com/ratgeber/website-wartung` → `200`.
2. Sayfa kaynağında (görünüm-kaynağı): `<title>`, `<link rel="canonical">` (kendi adresi), `<html lang="de">`, `application/ld+json` (Article + BreadcrumbList) ve **`noindex` olmaması**.
3. `https://sitemendo.com/sitemap.xml` 30 adres içermeli (12'si `/ratgeber`).

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

Mobil LCP ≈ 1,2 s, CLS 0, TBT 50–80 ms; sayfa başına ≈ 200–215 KiB aktarım (çoğu Next çalışma zamanı). Kalan uyarılar ("kullanılmayan JavaScript", "eski JavaScript") Next çerçevesinden gelir, puanı düşürmez; kovalanmaz.

**F. Sınırlar:** Lighthouse "SEO 100" yalnızca temel teknik hijyeni ölçer (başlık, açıklama, taranabilirlik, hreflang, bağlantı metni, mobil uyum); sıralama, otorite veya içeriğin sorguyla eşleşmesi hakkında bir şey söylemez. Ölçüm yerel ve ağ gecikmesiz sunucudan; canlıda PageSpeed Insights ile tekrarlayın. Sıralama ancak Search Console verisiyle (bölüm 9) görülür.

