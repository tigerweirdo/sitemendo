/* Rapor metinleri: her bulgu kodu için üç dilde bir tespit cümlesi (t) ve önerilen adım (n).
   Dil kuralları DOKUMANTASYON.md'dekiyle aynı: sakin, açık, somut; abartı ve kanıtlanamayan
   iddia yok. Ölçülmeyen şey söylenmez; "gerekebilir" yalnız genel bilgi için kullanılır. */

import type { Lang } from '@/lib/content';
import type { CheckStatus } from './types';

type Pair = { t: string; n?: string };
type Entry = Record<Lang, Pair>;

export const FINDING_COPY: Record<string, Entry> = {
  'mobile.ok': {
    tr: { t: 'Sayfa telefon ekranına uyacak şekilde tanımlı.' },
    de: { t: 'Die Seite ist für Smartphone-Bildschirme eingerichtet.' },
    en: { t: 'The page is set up for phone screens.' },
  },
  'mobile.viewport_none': {
    tr: { t: 'Sayfada telefon ekranı için ayar (viewport) yok.', n: 'Bu ayar olmadan sayfa telefonda küçültülmüş masaüstü görünümüyle açılır. Ayar eklenmeli, ardından düzen telefonda denenmeli.' },
    de: { t: 'Auf der Seite fehlt die Einstellung für Smartphone-Bildschirme (Viewport).', n: 'Ohne sie erscheint die Seite auf dem Handy als verkleinerte Desktop-Ansicht. Die Einstellung ergänzen und das Layout auf dem Handy testen.' },
    en: { t: 'The page has no setting for phone screens (viewport).', n: 'Without it the page opens on a phone as a shrunken desktop layout. Add the setting, then try the layout on a phone.' },
  },
  'mobile.viewport_partial': {
    tr: { t: 'Telefon ekranı ayarı (viewport) eksik tanımlı.', n: 'Ayara device-width eklenmeli, ardından düzen telefonda denenmeli.' },
    de: { t: 'Die Einstellung für Smartphone-Bildschirme (Viewport) ist unvollständig.', n: 'device-width ergänzen und das Layout anschließend auf dem Handy testen.' },
    en: { t: 'The phone screen setting (viewport) is incomplete.', n: 'Add device-width, then try the layout on a phone.' },
  },
  'mobile.perf_low': {
    tr: { t: 'Telefonda ölçülen performans puanı düşük.', n: 'Büyük görselleri küçültmek ve gereksiz betikleri azaltmak puanı genellikle en hızlı yükselten adımdır.' },
    de: { t: 'Der auf dem Handy gemessene Performance-Wert ist niedrig.', n: 'Große Bilder verkleinern und unnötige Skripte reduzieren hebt den Wert meist am schnellsten.' },
    en: { t: 'The performance score measured on a phone is low.', n: 'Shrinking large images and cutting unneeded scripts is usually the quickest way to raise it.' },
  },
  'speed.ok': {
    tr: { t: 'Ana sayfanın en büyük içeriği hızlı yükleniyor.' },
    de: { t: 'Der größte Inhalt der Startseite lädt schnell.' },
    en: { t: 'The largest content of the homepage loads quickly.' },
  },
  'speed.mid': {
    tr: { t: 'Ana sayfa orta hızda açılıyor.', n: 'Görsel boyutlarını ve gereksiz betikleri gözden geçirmek süreyi kısaltır.' },
    de: { t: 'Die Startseite öffnet in mittlerer Geschwindigkeit.', n: 'Bildgrößen und unnötige Skripte zu prüfen verkürzt die Ladezeit.' },
    en: { t: 'The homepage opens at a moderate speed.', n: 'Reviewing image sizes and unneeded scripts shortens the load time.' },
  },
  'speed.slow': {
    tr: { t: 'Ana sayfa yavaş açılıyor.', n: 'Yavaş açılış ziyaretçilerin bir kısmının sayfadan ayrılmasına yol açar. Görseller, betikler ve barındırmanın yanıt süresi sırayla incelenmeli.' },
    de: { t: 'Die Startseite öffnet langsam.', n: 'Langes Warten lässt einen Teil der Besucher abspringen. Bilder, Skripte und die Antwortzeit des Hostings sollten der Reihe nach geprüft werden.' },
    en: { t: 'The homepage opens slowly.', n: 'Slow opening makes some visitors leave. Images, scripts and the hosting response time should be reviewed in turn.' },
  },
  'speed.partial': {
    tr: { t: 'Sunucu yanıt süresi uygun; sayfa yüklenme ölçümü bu raporda alınamadı.' },
    de: { t: 'Die Antwortzeit des Servers ist in Ordnung; die Ladezeit der Seite konnte in diesem Bericht nicht gemessen werden.' },
    en: { t: 'The server response time is fine; the page load time could not be measured in this report.' },
  },
  'links.ok': {
    tr: { t: 'İncelenen bağlantıların hepsi açılıyor.' },
    de: { t: 'Alle geprüften Links öffnen sich.' },
    en: { t: 'All the links we tried open.' },
  },
  'links.broken_some': {
    tr: { t: 'Bazı bağlantılar açılmıyor.', n: 'Açılmayan bağlantılar düzeltilmeli ya da kaldırılmalı.' },
    de: { t: 'Einige Links öffnen sich nicht.', n: 'Nicht erreichbare Links korrigieren oder entfernen.' },
    en: { t: 'Some links do not open.', n: 'Fix or remove the links that do not open.' },
  },
  'links.broken_many': {
    tr: { t: 'Birçok bağlantı açılmıyor.', n: 'Önce menüdeki ve ana sayfadaki bağlantılar düzeltilmeli, kalanlar sonra kaldırılmalı ya da güncellenmeli.' },
    de: { t: 'Viele Links öffnen sich nicht.', n: 'Zuerst die Links im Menü und auf der Startseite korrigieren, danach die übrigen entfernen oder aktualisieren.' },
    en: { t: 'Many links do not open.', n: 'Fix the links in the menu and on the homepage first, then remove or update the rest.' },
  },
  'links.none_checked': {
    tr: { t: 'Ana sayfada denenecek bir iç bağlantı bulunamadı.' },
    de: { t: 'Auf der Startseite wurde kein interner Link zum Testen gefunden.' },
    en: { t: 'No internal link to try was found on the homepage.' },
  },
  'https.ok': {
    tr: { t: 'Site güvenli bağlantı (HTTPS) ile açılıyor.' },
    de: { t: 'Die Website öffnet über eine sichere Verbindung (HTTPS).' },
    en: { t: 'The site opens over a secure connection (HTTPS).' },
  },
  'https.none': {
    tr: { t: 'Site güvenli bağlantı (HTTPS) kullanmıyor.', n: 'Tarayıcılar bu siteleri “güvenli değil” diye işaretler. Bir sertifika kurulmalı ve tüm adresler HTTPS’e yönlendirilmeli.' },
    de: { t: 'Die Website nutzt keine sichere Verbindung (HTTPS).', n: 'Browser kennzeichnen solche Seiten als „nicht sicher“. Ein Zertifikat einrichten und alle Adressen auf HTTPS umleiten.' },
    en: { t: 'The site does not use a secure connection (HTTPS).', n: 'Browsers mark such sites as “not secure”. Install a certificate and redirect every address to HTTPS.' },
  },
  'https.no_redirect': {
    tr: { t: 'Şifresiz (http) adres HTTPS’e yönlenmiyor.', n: 'http adresinden HTTPS’e kalıcı bir yönlendirme eklenmeli.' },
    de: { t: 'Die unverschlüsselte (http) Adresse leitet nicht auf HTTPS um.', n: 'Eine dauerhafte Weiterleitung von http auf HTTPS einrichten.' },
    en: { t: 'The unencrypted (http) address does not redirect to HTTPS.', n: 'Add a permanent redirect from http to HTTPS.' },
  },
  'https.mixed': {
    tr: { t: 'HTTPS sayfasında şifresiz (http) yüklenen öğeler var.', n: 'Bu öğelerin adresleri https olarak güncellenmeli; aksi halde tarayıcı uyarı gösterebilir.' },
    de: { t: 'Auf der HTTPS-Seite werden Elemente unverschlüsselt (http) geladen.', n: 'Die Adressen dieser Elemente auf https umstellen; sonst kann der Browser eine Warnung zeigen.' },
    en: { t: 'The HTTPS page loads some items unencrypted (http).', n: 'Update the addresses of those items to https; otherwise the browser may show a warning.' },
  },
  'forms.ok': {
    tr: { t: 'Ana sayfadaki formlarda şifresiz gönderim adresi görünmüyor.' },
    de: { t: 'Bei den Formularen der Startseite ist keine unverschlüsselte Zieladresse zu sehen.' },
    en: { t: 'No unencrypted submission address is visible in the homepage forms.' },
  },
  'forms.none': {
    tr: { t: 'Ana sayfada form bulunmuyor.' },
    de: { t: 'Auf der Startseite gibt es kein Formular.' },
    en: { t: 'There is no form on the homepage.' },
  },
  'forms.insecure': {
    tr: { t: 'Bir form verileri şifresiz (http) bir adrese gönderiyor.', n: 'Form adresi https olarak değiştirilmeli.' },
    de: { t: 'Ein Formular sendet Daten an eine unverschlüsselte (http) Adresse.', n: 'Die Formularadresse auf https umstellen.' },
    en: { t: 'A form sends its data to an unencrypted (http) address.', n: 'Change the form address to https.' },
  },
  'forms.mailto': {
    tr: { t: 'Bir form, e-posta uygulamasını açarak (mailto) gönderiyor.', n: 'Bu yöntem ziyaretçilerin çoğunda sorunsuz çalışmaz; sunucu tarafında çalışan bir form daha güvenilirdir.' },
    de: { t: 'Ein Formular sendet über das E-Mail-Programm (mailto).', n: 'Diese Methode funktioniert bei vielen Besuchern nicht zuverlässig; ein serverseitiges Formular ist verlässlicher.' },
    en: { t: 'A form sends by opening the email app (mailto).', n: 'This does not work reliably for many visitors; a server-side form is more dependable.' },
  },
  'stack.info': {
    tr: { t: 'Dışarıdan görülen altyapı bilgileri.' },
    de: { t: 'Von außen sichtbare Infrastruktur-Hinweise.' },
    en: { t: 'Infrastructure details visible from the outside.' },
  },
  'stack.none': {
    tr: { t: 'Dışarıdan belirgin bir altyapı bilgisi görünmüyor.' },
    de: { t: 'Von außen sind keine eindeutigen Infrastruktur-Hinweise sichtbar.' },
    en: { t: 'No clear infrastructure details are visible from the outside.' },
  },
  'stack.jquery_old': {
    tr: { t: 'Eski bir jQuery sürümü kullanılıyor.', n: 'jQuery 3.5’ten önceki sürümlerde bilinen güvenlik açıkları var; güncel sürüme geçilmeli.' },
    de: { t: 'Es wird eine alte jQuery-Version verwendet.', n: 'Vor jQuery 3.5 sind Sicherheitslücken bekannt; auf eine aktuelle Version wechseln.' },
    en: { t: 'An old jQuery version is in use.', n: 'Versions before jQuery 3.5 have known security issues; move to a current version.' },
  },
  'stack.php_old': {
    tr: { t: 'Sunucuda desteği sona ermiş bir PHP sürümü görünüyor.', n: 'Barındırma panelinden güncel bir PHP sürümüne geçilmeli; önce sitenin uyumu denenmeli.' },
    de: { t: 'Auf dem Server ist eine PHP-Version ohne Support sichtbar.', n: 'Im Hosting-Panel auf eine aktuelle PHP-Version wechseln; vorher die Kompatibilität der Seite testen.' },
    en: { t: 'The server shows a PHP version that is no longer supported.', n: 'Move to a current PHP version in the hosting panel; test the site’s compatibility first.' },
  },
  'index.ok': {
    tr: { t: 'Arama motorlarını engelleyen bir ayar görünmüyor.' },
    de: { t: 'Es ist keine Einstellung zu sehen, die Suchmaschinen aussperrt.' },
    en: { t: 'No setting that blocks search engines is visible.' },
  },
  'index.noindex': {
    tr: { t: 'Sayfa arama motorlarından gizlenmiş (noindex).', n: 'Bu bilinçli değilse noindex ayarı kaldırılmalı; aksi halde sayfa arama sonuçlarında çıkmaz.' },
    de: { t: 'Die Seite ist für Suchmaschinen ausgeblendet (noindex).', n: 'Wenn das nicht gewollt ist, die noindex-Einstellung entfernen; sonst erscheint die Seite nicht in den Suchergebnissen.' },
    en: { t: 'The page is hidden from search engines (noindex).', n: 'If this is not intended, remove the noindex setting; otherwise the page will not appear in search results.' },
  },
  'index.robots_block': {
    tr: { t: 'robots.txt tüm siteyi arama motorlarına kapatıyor.', n: 'Bilinçli değilse “Disallow: /” satırı kaldırılmalı.' },
    de: { t: 'Die robots.txt sperrt die gesamte Website für Suchmaschinen.', n: 'Wenn das nicht gewollt ist, die Zeile „Disallow: /“ entfernen.' },
    en: { t: 'robots.txt closes the whole site to search engines.', n: 'If this is not intended, remove the “Disallow: /” line.' },
  },
  'index.no_title': {
    tr: { t: 'Ana sayfada başlık (title) yok.', n: 'Her sayfada konuyu anlatan kısa bir başlık olmalı; sekmede ve arama sonuçlarında görünür.' },
    de: { t: 'Auf der Startseite fehlt der Titel (title).', n: 'Jede Seite braucht einen kurzen, aussagekräftigen Titel; er erscheint im Tab und in den Suchergebnissen.' },
    en: { t: 'The homepage has no title.', n: 'Every page needs a short title describing it; it shows in the tab and in search results.' },
  },
  'index.no_description': {
    tr: { t: 'Ana sayfada arama açıklaması (meta description) yok.', n: '50–170 karakterlik bir açıklama, arama sonucunda görünecek metni sizin belirlemenizi sağlar.' },
    de: { t: 'Auf der Startseite fehlt die Suchbeschreibung (Meta-Description).', n: 'Eine Beschreibung mit 50–170 Zeichen legt fest, welcher Text in den Suchergebnissen erscheint.' },
    en: { t: 'The homepage has no search description (meta description).', n: 'A description of 50–170 characters lets you decide the text shown in search results.' },
  },
  'index.no_sitemap': {
    tr: { t: 'Site haritası bulunamadı.', n: 'robots.txt içinde ya da /sitemap.xml adresinde bir site haritası, sayfaların bulunmasını kolaylaştırır.' },
    de: { t: 'Es wurde keine Sitemap gefunden.', n: 'Eine Sitemap in der robots.txt oder unter /sitemap.xml erleichtert das Auffinden der Seiten.' },
    en: { t: 'No sitemap was found.', n: 'A sitemap in robots.txt or at /sitemap.xml makes pages easier to find.' },
  },
  'contact.ok': {
    tr: { t: 'Telefon ve Impressum bağlantısı ana sayfadan erişilebiliyor.' },
    de: { t: 'Telefon und Impressum-Link sind von der Startseite aus erreichbar.' },
    en: { t: 'The phone number and the Impressum link are reachable from the homepage.' },
  },
  'contact.none': {
    tr: { t: 'Ana sayfada telefon, e-posta, adres ya da iletişim bağlantısı bulunamadı.', n: 'Ziyaretçilerin ulaşabileceği en az bir iletişim yolu görünür olmalı.' },
    de: { t: 'Auf der Startseite wurden weder Telefon, E-Mail, Adresse noch ein Kontakt-Link gefunden.', n: 'Mindestens ein Kontaktweg sollte sichtbar sein.' },
    en: { t: 'No phone, email, address or contact link was found on the homepage.', n: 'At least one way to get in touch should be visible.' },
  },
  'contact.no_phone': {
    tr: { t: 'Ana sayfada tıklanabilir telefon numarası yok.', n: 'Telefonda tek dokunuşla aranabilen (tel:) bir numara eklenmeli.' },
    de: { t: 'Auf der Startseite gibt es keine anklickbare Telefonnummer.', n: 'Eine Nummer ergänzen, die am Handy mit einem Tipp angerufen werden kann (tel:).' },
    en: { t: 'The homepage has no tappable phone number.', n: 'Add a number that can be called with one tap on a phone (tel:).' },
  },
  'contact.no_impressum': {
    tr: { t: 'Ana sayfada Impressum bağlantısı bulunamadı.', n: 'Almanya’daki ticari sitelerde Impressum bağlantısının her sayfadan erişilebilir olması gerekebilir; kontrol edilmeli.' },
    de: { t: 'Auf der Startseite wurde kein Impressum-Link gefunden.', n: 'Bei geschäftlichen Websites in Deutschland muss das Impressum unter Umständen von jeder Seite erreichbar sein; bitte prüfen.' },
    en: { t: 'No Impressum link was found on the homepage.', n: 'On business websites in Germany the Impressum may need to be reachable from every page; worth checking.' },
  },
};

type Labels = {
  subject: (host: string) => string;
  preview: (err: number, warn: number) => string;
  meta: (ref: string) => string;
  badge: string;
  lead: (host: string, err: number, warn: number) => string;
  priorityTitle: string;
  nextStep: string;
  impact: string;
  impactHigh: string;
  impactMid: string;
  severity: { err: string; warn: string };
  checklistTitle: string;
  more: (n: number) => string;
  status: Record<CheckStatus, string>;
  rows: { site: string; measured: string; ref: string };
  noIssues: string;
  scope: string;
  promise: [string, string];
  askTitle: string;
  ask: string;
  footer: string;
  links: [string, string];
};

export const REPORT_LABELS: Record<Lang, Labels> = {
  tr: {
    subject: host => `Kontrol raporunuz — ${host}`,
    preview: (err, warn) => (err + warn ? `${err} acil, ${warn} orta öncelikli konu ve önerilen adımlar.` : 'Öne çıkan bir sorun bulunmadı.'),
    meta: ref => `Kontrol raporu · ${ref}`,
    badge: 'Rapor',
    lead: (host, err, warn) => (err + warn
      ? `${host} için sekiz noktayı dışarıdan inceledik. ${err} acil, ${warn} orta öncelikli konu bulduk; aşağıda öncelik sırasıyla.`
      : `${host} için sekiz noktayı dışarıdan inceledik. Öne çıkan bir sorun bulmadık.`),
    priorityTitle: 'Öncelik listesi',
    nextStep: 'Önerilen adım',
    impact: 'Etki',
    impactHigh: 'Yüksek',
    impactMid: 'Orta',
    severity: { err: 'Acil', warn: 'Orta' },
    checklistTitle: 'Kontrol listesi',
    more: n => `+${n} daha`,
    status: { err: 'Sorunlu', warn: 'Dikkat', ok: 'Uygun', info: 'Bilgi', unknown: 'Ölçülemedi' },
    rows: { site: 'Site', measured: 'Ölçüm tarihi', ref: 'Referans' },
    noIssues: 'Bu ölçümlerde müdahale gerektiren bir konu görünmüyor.',
    scope: 'Bu rapor sitenizin dışarıdan erişilebilen ana sayfasındaki otomatik ölçümlere dayanır. Telefonda menünün kullanımı, formların gerçek gönderimi ve yönetim paneli gibi konular ek inceleme ister.',
    promise: ['Düzeltme hizmeti isteğe bağlı.', 'Raporu okuduktan sonra düzeltmeleri kendiniz yapabilir, başka birine yaptırabilir ya da bize yaptırabilirsiniz. Ücreti işe başlamadan önce bilirsiniz.'],
    askTitle: 'Sorunuz mu var?',
    ask: 'Bu e-postayı yanıtlamanız yeterli, doğrudan bize ulaşır. İsterseniz arayın ya da WhatsApp’tan yazın.',
    footer: 'Bu raporu sitemendo.com’daki formu doldurduğunuz için aldınız.',
    links: ['Impressum', 'Gizlilik'],
  },
  de: {
    subject: host => `Ihr Prüfbericht — ${host}`,
    preview: (err, warn) => (err + warn ? `${err} dringende, ${warn} mittlere Punkte mit empfohlenen Schritten.` : 'Es sind keine auffälligen Probleme aufgetaucht.'),
    meta: ref => `Prüfbericht · ${ref}`,
    badge: 'Bericht',
    lead: (host, err, warn) => (err + warn
      ? `Wir haben acht Punkte von ${host} von außen geprüft. ${err} dringende und ${warn} mittlere Punkte gefunden; unten nach Priorität sortiert.`
      : `Wir haben acht Punkte von ${host} von außen geprüft. Es sind keine auffälligen Probleme aufgetaucht.`),
    priorityTitle: 'Prioritätenliste',
    nextStep: 'Empfohlener Schritt',
    impact: 'Auswirkung',
    impactHigh: 'Hoch',
    impactMid: 'Mittel',
    severity: { err: 'Dringend', warn: 'Mittel' },
    checklistTitle: 'Checkliste',
    more: n => `+${n} weitere`,
    status: { err: 'Problem', warn: 'Beachten', ok: 'In Ordnung', info: 'Info', unknown: 'Nicht messbar' },
    rows: { site: 'Website', measured: 'Messung', ref: 'Referenz' },
    noIssues: 'In diesen Messungen ist nichts zu sehen, was Handlungsbedarf erzeugt.',
    scope: 'Dieser Bericht beruht auf automatischen Messungen der von außen erreichbaren Startseite. Themen wie die Bedienung des Menüs auf dem Handy, das tatsächliche Absenden von Formularen und das Admin-Panel brauchen eine zusätzliche Prüfung.',
    promise: ['Die Reparatur bleibt optional.', 'Nach dem Bericht können Sie die Korrekturen selbst umsetzen, jemand anderen beauftragen oder uns damit beauftragen. Den Preis kennen Sie, bevor wir anfangen.'],
    askTitle: 'Fragen?',
    ask: 'Antworten Sie einfach auf diese E-Mail — sie kommt direkt bei uns an. Sie können uns auch anrufen oder per WhatsApp schreiben.',
    footer: 'Sie erhalten diesen Bericht, weil Sie das Formular auf sitemendo.com ausgefüllt haben.',
    links: ['Impressum', 'Datenschutz'],
  },
  en: {
    subject: host => `Your check report — ${host}`,
    preview: (err, warn) => (err + warn ? `${err} urgent and ${warn} medium-priority items with suggested steps.` : 'No notable problems came up.'),
    meta: ref => `Check report · ${ref}`,
    badge: 'Report',
    lead: (host, err, warn) => (err + warn
      ? `We reviewed eight points of ${host} from the outside. We found ${err} urgent and ${warn} medium-priority items; below, in priority order.`
      : `We reviewed eight points of ${host} from the outside. No notable problems came up.`),
    priorityTitle: 'Priority list',
    nextStep: 'Suggested step',
    impact: 'Impact',
    impactHigh: 'High',
    impactMid: 'Medium',
    severity: { err: 'Urgent', warn: 'Medium' },
    checklistTitle: 'Checklist',
    more: n => `+${n} more`,
    status: { err: 'Problem', warn: 'Attention', ok: 'OK', info: 'Info', unknown: 'Not measurable' },
    rows: { site: 'Website', measured: 'Measured', ref: 'Reference' },
    noIssues: 'Nothing in these measurements calls for action.',
    scope: 'This report is based on automatic measurements of the publicly reachable homepage. Topics such as using the menu on a phone, actually submitting forms and the admin panel need an additional review.',
    promise: ['Repair work is optional.', 'After the report you can make the fixes yourself, have someone else do them, or have us do them. You know the price before we start.'],
    askTitle: 'Any questions?',
    ask: 'Just reply to this email — it comes straight to us. You can also call or message us on WhatsApp.',
    footer: 'You’re receiving this report because you filled in the form on sitemendo.com.',
    links: ['Impressum', 'Privacy'],
  },
};

/* Ondalık nokta Türkçe ve Almanca'da virgül olur: "3.2 s" → "3,2 s". */
export function localizeValue(value: string, lang: Lang) {
  return lang === 'en' ? value : value.replace(/(\d)\.(\d)/g, '$1,$2');
}
