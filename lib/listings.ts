/* İşletme kayıtları için kopyala-yapıştır sayfası (docs/isletme-kayitlari.md). Ad, adres, telefon ve e-posta
   Impressum ile AYNI kaynaktan (lib/company.ts) gelir; açıklama metinleri sitenin kendi meta açıklamasıdır
   (lib/content.ts). Böylece kayıtlar Impressum'dan sapmaz. Dosya `npm run listings` ile yazılır; test, dosyanın
   güncel olduğunu denetler (scripts/verify-listings.ts). */

import { COMPANY, CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, SITE_URL } from './company';
import { content } from './content';
import { absolutePageUrl } from './seo';

const row = (label: string, value: string) => `| ${label} | \`${value}\` |`;

export function listingsMarkdown(): string {
  const address = `${COMPANY.street}, ${COMPANY.postalCode} ${COMPANY.city}`;
  const lines = [
    '# İşletme kayıtları: kopyala-yapıştır sayfası',
    '',
    '> Bu dosya `npm run listings` ile üretilir; elle değiştirmeyin. Veriler `lib/company.ts` (Impressum ile aynı kaynak) ve `lib/content.ts` içindendir. Değişirse komutu yeniden çalıştırın; `npm test` dosyanın güncel olduğunu denetler.',
    '',
    '## Kural: her yerde birebir aynı',
    '',
    'Ad, adres ve telefon (NAP) her kayıtta Impressum ile **karakter karakter aynı** olmalıdır: kısaltma, farklı yazım ya da başka telefon biçimi yok. Platform başına tek kayıt açın; toplu dizin gönderimi yapılmaz (`docs/seo-strategie.md`, bölüm 11). Bir kayıt için kimseye soğuk e-posta ya da telefon yok.',
    '',
    '## Temel veriler',
    '',
    '| Alan | Değer (kopyalayın) |',
    '|---|---|',
    row('İşletme adı', COMPANY.legalName),
    row('Sahibi (Impressum: Diensteanbieter)', COMPANY.ownerName),
    row('Sokak', COMPANY.street),
    row('Posta kodu', COMPANY.postalCode),
    row('Şehir', COMPANY.city),
    row('Adres (tek satır)', address),
    row('Ülke', content.de.legal.country),
    row('Telefon', CONTACT_PHONE_DISPLAY),
    row('E-posta', CONTACT_EMAIL),
    row('Web sitesi (Almanca ana sayfa)', absolutePageUrl('/', 'de')),
    row('Web sitesi (Türkçe)', absolutePageUrl('/', 'tr')),
    row('Web sitesi (İngilizce)', absolutePageUrl('/', 'en')),
    row('Alan adı', new URL(SITE_URL).host),
    '',
    'Platform bir tek web sitesi alanı veriyorsa Almanca ana sayfayı girin: SEO artık Almanca öncelikli (`docs/seo-strategie.md`).',
    '',
    '## Açıklama metinleri',
    '',
    'Sitenin kendi meta açıklamasıdır; yeni iddia içermez. Platformun karakter sınırı varsa metni kısaltmak yerine ilk cümleyi kullanın.',
    '',
    '**Deutsch** (Almanya\'daki kayıtlar için ana metin)',
    '',
    '```text',
    content.de.meta.description,
    '```',
    '',
    '**Türkçe**',
    '',
    '```text',
    content.tr.meta.description,
    '```',
    '',
    '**English**',
    '',
    '```text',
    content.en.meta.description,
    '```',
    '',
    '## Hangi kayıtlar (hepsi gerçek ve tutarlı kayıt; toplu gönderim değil)',
    '',
    '- [ ] **Google işletme profili.** Web sitesi alanına Almanca ana sayfa. Adres bir ev adresiyse, platformun adresi gizleyip hizmet bölgesi gösterme seçeneği olup olmadığını kendi yardım sayfasından kontrol edin; bu dosyada platform kuralları doğrulanmadı.',
    '- [ ] **Bing Places for Business** (Search Console\'dan içe aktarım ayrı bir seçenektir; veriler aynı kalır).',
    '- [ ] **Apple Business Connect.**',
    '- [ ] Kendi LinkedIn ve GitHub profilleriniz: web sitesi alanı Almanca ana sayfa; ad Impressum ile aynı.',
    '- [ ] Üyesi olduğunuz IHK ya da Handwerkskammer varsa firma rehberindeki kaydınız (üyelik yoksa bu satırı atlayın).',
    '',
    '## Her kayıttan sonra',
    '',
    '1. Kaydın görünen ad, adres ve telefonunu Impressum ile karşılaştırın (`https://sitemendo.com/impressum?lang=de`).',
    '2. Telefon, adres ya da ad değişirse önce `lib/company.ts`, sonra bu dosya (`npm run listings`), sonra tüm kayıtlar güncellenir.',
    '3. Doğrulama kodu ya da posta kartı isteyen platformlarda kodu yalnızca kendiniz girin; başkasına vermeyin.',
    '',
  ];
  return `${lines.join('\n')}`;
}
