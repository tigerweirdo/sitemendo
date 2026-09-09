# Sitemendo — Görev Dokümantasyonu

## Proje gereksinimleri

- Next.js / React tabanlı Sitemendo landing page
- Yerel çalıştırma: `npm install`, `.env.example` → `.env.local`, `npm run dev`
- Adres: `http://localhost:3000`
- Canlı: https://sitemendo.vercel.app
- GitHub: https://github.com/tigerweirdo/sitemendo
- Ortam değişkenleri: `NEXT_PUBLIC_AUDIT_ENDPOINT`, `NEXT_PUBLIC_PRIVACY_URL`, `NEXT_PUBLIC_IMPRESSUM_URL`, `NEXT_PUBLIC_DEMO_MODE`

## Görevler

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

Yer tutucu Impressum (tescil kaydı değil — tutarlı uydurma):
- Unvan: Sitemendo
- Adres: Invalidenstraße 117, 10115 Berlin
- E-posta: hello@sitemendo.de
- Temsilci: Geschäftsführung (yer tutucu)
- Sabitler: `lib/company.ts`

Doğrulama: Playwright Chromium, 1440 / 820 / 390 / 320. 76 UX + regresyon (kontrast, başlık çakışması, rozet boşluğu, form senkron, gizlilik turu, DE, menü, SSS, mailto). Commit/push yok.

Değişen dosyalar: `app/globals.css`, `app/layout.tsx`, `app/page.tsx`, `app/privacy/page.tsx`, `app/impressum/page.tsx`, `components/Site.tsx`, `components/LegalPage.tsx`, `components/LanguageSwitch.tsx` (yeni), `lib/content.ts`, `lib/lang.ts`, `lib/useStoredLang.ts`, `lib/useLangDocument.ts` (yeni), `lib/formPersist.ts` (yeni), `lib/company.ts` (yeni), `middleware.ts` (yeni).
