# İşletme kayıtları: kopyala-yapıştır sayfası

> Bu dosya `npm run listings` ile üretilir; elle değiştirmeyin. Veriler `lib/company.ts` (Impressum ile aynı kaynak) ve `lib/content.ts` içindendir. Değişirse komutu yeniden çalıştırın; `npm test` dosyanın güncel olduğunu denetler.

## Kural: her yerde birebir aynı

Ad, adres ve telefon (NAP) her kayıtta Impressum ile **karakter karakter aynı** olmalıdır: kısaltma, farklı yazım ya da başka telefon biçimi yok. Platform başına tek kayıt açın; toplu dizin gönderimi yapılmaz (`docs/seo-strategie.md`, bölüm 11). Bir kayıt için kimseye soğuk e-posta ya da telefon yok.

## Temel veriler

| Alan | Değer (kopyalayın) |
|---|---|
| İşletme adı | `Sitemendo` |
| Sahibi (Impressum: Diensteanbieter) | `Mete Han Çetiner` |
| Sokak | `Baerwaldstraße 70` |
| Posta kodu | `10961` |
| Şehir | `Berlin` |
| Adres (tek satır) | `Baerwaldstraße 70, 10961 Berlin` |
| Ülke | `Deutschland` |
| Telefon | `+49 155 10913380` |
| E-posta | `hello@sitemendo.com` |
| Web sitesi (Almanca ana sayfa) | `https://sitemendo.com/?lang=de` |
| Web sitesi (Türkçe) | `https://sitemendo.com/` |
| Web sitesi (İngilizce) | `https://sitemendo.com/?lang=en` |
| Alan adı | `sitemendo.com` |

Platform bir tek web sitesi alanı veriyorsa Almanca ana sayfayı girin: SEO artık Almanca öncelikli (`docs/seo-strategie.md`).

## Açıklama metinleri

Sitenin kendi meta açıklamasıdır; yeni iddia içermez. Platformun karakter sınırı varsa metni kısaltmak yerine ilk cümleyi kullanın.

**Deutsch** (Almanya'daki kayıtlar için ana metin)

```text
Wir finden technische Probleme auf Ihrer Website, ordnen sie nach Dringlichkeit und beheben sie nach Freigabe. Starten Sie mit einer kostenlosen Prüfung.
```

**Türkçe**

```text
Web sitenizdeki teknik ve kullanım sorunlarını belirliyor, öncelik sırasına koyuyor ve onayınızla gideriyoruz. Ücretsiz kontrolle başlayın.
```

**English**

```text
We identify technical and usability issues on your website, rank them by priority and resolve them with your approval. Start with a free check.
```

## Hangi kayıtlar (hepsi gerçek ve tutarlı kayıt; toplu gönderim değil)

- [ ] **Google işletme profili.** Web sitesi alanına Almanca ana sayfa. Adres bir ev adresiyse, platformun adresi gizleyip hizmet bölgesi gösterme seçeneği olup olmadığını kendi yardım sayfasından kontrol edin; bu dosyada platform kuralları doğrulanmadı.
- [ ] **Bing Places for Business** (Search Console'dan içe aktarım ayrı bir seçenektir; veriler aynı kalır).
- [ ] **Apple Business Connect.**
- [ ] Kendi LinkedIn ve GitHub profilleriniz: web sitesi alanı Almanca ana sayfa; ad Impressum ile aynı.
- [ ] Üyesi olduğunuz IHK ya da Handwerkskammer varsa firma rehberindeki kaydınız (üyelik yoksa bu satırı atlayın).

## Her kayıttan sonra

1. Kaydın görünen ad, adres ve telefonunu Impressum ile karşılaştırın (`https://sitemendo.com/impressum?lang=de`).
2. Telefon, adres ya da ad değişirse önce `lib/company.ts`, sonra bu dosya (`npm run listings`), sonra tüm kayıtlar güncellenir.
3. Doğrulama kodu ya da posta kartı isteyen platformlarda kodu yalnızca kendiniz girin; başkasına vermeyin.
