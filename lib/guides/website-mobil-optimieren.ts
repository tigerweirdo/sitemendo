import type { Guide } from './types';

export const websiteMobilOptimieren: Guide = {
  lang: 'de',
  slug: 'website-mobil-optimieren',
  category: 'Mobil',
  check: 'mobile',
  short: 'Website mobil optimieren',
  title: 'Website mobil optimieren: Checkliste und Fehler',
  h1: 'Website mobil optimieren: So prüfen Sie die Handy-Ansicht und beheben typische Fehler',
  description: 'Wie mobilfreundlich ist Ihre Website? Prüfung in zehn Minuten, die neun häufigsten Fehler mit Lösungen und was Googles Mobile-First-Indexierung verlangt.',
  teaser: 'Handy-Ansicht prüfen, typische Fehler finden und beheben: vom fehlenden Viewport bis zu zu kleinen Schaltflächen.',
  tldr: [
    'Google verwendet für Indexierung und Ranking die mobile Version Ihrer Website. Ist sie fehlerhaft oder unvollständig, leidet Ihre Sichtbarkeit.',
    'Die Prüfung dauert zehn Minuten: eigenes Smartphone, Chrome-Entwicklerwerkzeuge und PageSpeed Insights genügen.',
    'Die häufigsten Fehler sind ein fehlendes Viewport-Tag, zu kleine Schaltflächen, zu kleine Schrift, ein defektes Menü und Inhalte, die mobil fehlen.',
    'Die meisten Fehler lassen sich im Theme oder im Seitenbaukasten korrigieren, ohne die Website neu zu bauen.',
  ],
  intro: [
    'Viele Besucher öffnen Ihre Website zuerst auf dem Smartphone: nach einer Suche, über einen Link in einer Nachricht oder aus einer Kartenanwendung heraus. Wirkt die Seite dort schwer bedienbar, wechseln sie zum nächsten Anbieter, bevor sie Ihre Leistungen gelesen haben.',
    'Hinzu kommt die Suchmaschine: Laut Google-Dokumentation verwendet Google die mobile Version der Inhalte einer Website für Indexierung und Ranking. Was mobil fehlt oder nicht funktioniert, fehlt auch Google.',
    'Dieser Ratgeber zeigt, wie Sie die mobile Ansicht prüfen, welche Fehler am häufigsten vorkommen und wie Sie sie beheben, auch ohne Programmierkenntnisse.',
  ],
  sections: [
    {
      id: 'warum-mobil-wichtig',
      h2: 'Warum die mobile Version entscheidend ist',
      blocks: [
        { t: 'p', x: 'Google ruft Websites mit einem Smartphone-Crawler ab und bewertet die mobile Version. In der Dokumentation zur Mobile-First-Indexierung heißt es, Google verwende die mobile Version der Inhalte einer Website, abgerufen mit dem Smartphone-Agenten, für Indexierung und Ranking.' },
        { t: 'p', x: 'Zugleich empfiehlt Google ausdrücklich ein **responsives Design**: Dieselben Inhalte werden unter derselben Adresse ausgeliefert und passen sich der Bildschirmbreite an. Es sei die einfachste Variante zum Umsetzen und Pflegen.' },
        { t: 'note', kind: 'info', title: 'Den „Mobile-Friendly-Test“ gibt es nicht mehr', x: 'Google hat den Test auf Optimierung für Mobilgeräte, den zugehörigen Bericht in der Search Console und die API im Dezember 2023 eingestellt. Als Ersatz dienen Lighthouse (in Chrome und in PageSpeed Insights) und die Berichte zu den Core Web Vitals.' },
      ],
    },
    {
      id: 'pruefen',
      h2: 'So prüfen Sie die mobile Ansicht in zehn Minuten',
      blocks: [
        {
          t: 'steps',
          items: [
            { h: 'Auf dem echten Handy öffnen', x: 'Öffnen Sie Startseite, eine Leistungsseite und die Kontaktseite im mobilen Netz, nicht im WLAN. Drehen Sie das Gerät auch ins Querformat.' },
            { h: 'Eine Aufgabe lösen', x: 'Versuchen Sie wie ein Kunde, Ihre Telefonnummer zu finden und anzurufen, das Menü zu öffnen und das Kontaktformular auszufüllen. Wo stocken Sie?' },
            { h: 'Entwicklerwerkzeuge im Browser nutzen', x: 'In Chrome mit `F12` die Entwicklerwerkzeuge öffnen und das Geräte-Symbol wählen. Dort lässt sich ein gängiges Smartphone-Format einstellen und die Seite in verschiedenen Breiten testen. Das ersetzt keinen Test auf einem echten Gerät.' },
            { h: 'PageSpeed Insights mobil lesen', x: 'Geben Sie Ihre Adresse bei [PageSpeed Insights](https://pagespeed.web.dev/) ein und lesen Sie den Reiter „Mobil“. Lighthouse zeigt dort auch Hinweise zu Barrierefreiheit und Best Practices, die oft mobile Probleme verraten.' },
            { h: 'In der Search Console nachsehen', x: 'Die URL-Prüfung der [Google Search Console](https://search.google.com/search-console/about) zeigt, wie Google eine Seite zuletzt abgerufen hat und ob Probleme beim Abruf aufgetreten sind.' },
          ],
        },
      ],
    },
    {
      id: 'checkliste',
      h2: 'Checkliste: Was auf dem Handy stimmen muss',
      blocks: [
        {
          t: 'table',
          caption: 'Prüfpunkte der mobilen Ansicht',
          head: ['Prüfpunkt', 'Zielwert', 'So prüfen Sie es'],
          rows: [
            ['Viewport-Tag', 'Im `<head>` steht `width=device-width, initial-scale=1`', 'Seitenquelltext anzeigen und nach `viewport` suchen'],
            ['Seitliches Scrollen', 'Keines: Der Inhalt passt in die Bildschirmbreite', 'Seite auf dem Handy nach links und rechts wischen'],
            ['Schriftgröße', 'Fließtext ohne Zoomen lesbar (üblich: mindestens 16 Pixel)', 'Auf dem Handy lesen; im Zweifel größer wählen'],
            ['Tipp-Ziele', 'Etwa 48 × 48 Pixel mit rund 8 Pixel Abstand (Empfehlung von Google)', 'Menü, Buttons und Links mit dem Daumen antippen'],
            ['Menü', 'Öffnet und schließt zuverlässig, alle Unterseiten erreichbar', 'Auf mehreren Geräten und im Querformat testen'],
            ['Inhalte', 'Dieselben Inhalte wie am Computer: Text, Bilder, Links', 'Mobile und Desktop-Ansicht vergleichen'],
            ['Telefon-Link', 'Die Nummer ist antippbar (`tel:`)', 'Nummer antippen: Öffnet sich die Wählfunktion?'],
            ['Formulare', 'Passende Tastatur (Zahlen, E-Mail), große Felder, sichtbarer Senden-Button', 'Formular auf dem Handy ausfüllen'],
            ['Ladezeit mobil', 'LCP bis 2,5 Sekunden, INP bis 200 Millisekunden, CLS bis 0,1', 'PageSpeed Insights, Reiter „Mobil“'],
          ],
        },
      ],
    },
    {
      id: 'fehler',
      h2: 'Die neun häufigsten Fehler und ihre Lösung',
      blocks: [
        { t: 'h3', x: '1. Das Viewport-Tag fehlt oder ist falsch' },
        { t: 'p', x: 'Ohne Viewport-Angabe behandelt ein Smartphone die Seite wie eine Desktop-Seite und verkleinert sie, sodass alles winzig erscheint. Die Angabe gehört in den `<head>` jeder Seite:' },
        { t: 'code', label: 'HTML im <head>', x: '<meta name="viewport" content="width=device-width, initial-scale=1">' },
        { t: 'p', x: 'Bei WordPress und Baukästen ist sie im Theme enthalten. Fehlt sie, liegt es meist an einem veralteten oder fehlerhaft angepassten Theme. Verzichten Sie auf `user-scalable=no`: Es verhindert das Zoomen und erschwert Menschen mit Sehschwäche die Nutzung.' },

        { t: 'h3', x: '2. Feste Breiten erzeugen seitliches Scrollen' },
        { t: 'p', x: 'Elemente mit festen Pixelbreiten, etwa Tabellen, Bilder oder Einbettungen, sind breiter als der Bildschirm. Bilder begrenzen Sie auf die verfügbare Breite, Tabellen legen Sie in einen scrollbaren Bereich, Karten und Videos binden Sie mit festem Seitenverhältnis ein.' },
        { t: 'code', label: 'CSS: Bilder an die Bildschirmbreite anpassen', x: 'img { max-width: 100%; height: auto; }' },

        { t: 'h3', x: '3. Die Schrift ist zu klein' },
        { t: 'p', x: 'Fließtext sollte ohne Zoomen lesbar sein; üblich sind mindestens 16 Pixel. Achten Sie auch auf ausreichenden Kontrast und einen Zeilenabstand, der Zeilen nicht aneinanderklebt.' },

        { t: 'h3', x: '4. Schaltflächen und Links sind zu klein oder zu dicht' },
        { t: 'p', x: 'Google empfiehlt Tipp-Ziele von etwa 48 Pixel Größe mit rund 8 Pixel Abstand. Ein kleines Symbol lässt sich mit Innenabstand (`padding`) vergrößern, ohne dass es optisch wächst. Für Geräte mit Touch-Bedienung lässt sich das gezielt einstellen:' },
        { t: 'code', label: 'CSS: größere Tipp-Ziele nur für Touch-Geräte', x: '@media (any-pointer: coarse) {\n  .container a { padding: .8em; }\n}' },

        { t: 'h3', x: '5. Das Menü funktioniert nicht' },
        { t: 'p', x: 'Häufige Ursachen sind ein JavaScript-Fehler (oft durch ein Plugin), ein Dropdown-Menü, das nur beim Darüberfahren mit der Maus aufklappt, und veraltete zwischengespeicherte Skripte. Testen Sie das Menü in Safari auf dem iPhone und in Chrome auf Android, leeren Sie den Cache Ihrer Website und deaktivieren Sie zur Fehlersuche testweise Plugins (am besten in einer Testumgebung).' },

        { t: 'h3', x: '6. Inhalte fehlen auf dem Handy' },
        { t: 'p', x: 'Weil Google die mobile Version bewertet, muss sie dieselben Inhalte enthalten wie die Desktop-Version. Dasselbe gilt für strukturierte Daten, Titel, Meta-Beschreibungen, Robots-Angaben und Alternativtexte von Bildern. Fehlen Texte oder Links mobil, fehlen sie auch in der Bewertung.' },

        { t: 'h3', x: '7. Bilder sind zu groß für Mobilgeräte' },
        { t: 'p', x: 'Ein Foto in Druckqualität verlangsamt die Seite im Mobilfunknetz. Skalieren Sie Bilder auf die tatsächlich angezeigte Größe, nutzen Sie moderne Formate wie WebP oder AVIF und lassen Sie Bilder unterhalb des sichtbaren Bereichs später laden. Details im Ratgeber [Website lädt langsam](/ratgeber/website-laedt-langsam).' },

        { t: 'h3', x: '8. Aufdringliche Pop-ups und Banner' },
        { t: 'p', x: 'Overlays, die direkt nach dem Aufruf den Inhalt verdecken und sich auf dem Handy schwer schließen lassen, verärgern Besucher. Auch Cookie-Hinweise sollten den Inhalt nicht vollständig verdecken, und alle Auswahlschaltflächen müssen auf dem kleinen Bildschirm erreichbar sein.' },

        { t: 'h3', x: '9. Telefon, Adresse und Formular sind mobil schwer zu erreichen' },
        { t: 'p', x: 'Auf dem Handy wollen viele Besucher anrufen oder den Weg finden. Machen Sie die Telefonnummer antippbar und platzieren Sie sie gut sichtbar im Kopf- oder Fußbereich:' },
        { t: 'code', label: 'HTML: antippbare Telefonnummer', x: '<a href="tel:+491234567890">01234 567890</a>' },
      ],
    },
    {
      id: 'mobile-first',
      h2: 'Mobile-First-Indexierung: Was Google verlangt',
      blocks: [
        { t: 'p', x: 'Die Dokumentation von Google nennt Best Practices, die verhindern, dass Ihnen durch die mobile Bewertung Sichtbarkeit verloren geht:' },
        {
          t: 'ul',
          items: [
            'Die mobile Website enthält **dieselben Inhalte** wie die Desktop-Website.',
            'Die mobile und die Desktop-Website haben **dieselben strukturierten Daten**.',
            'Robots-Meta-Tags, Titel und Meta-Beschreibungen sind auf beiden Versionen gleichwertig, ebenso die Alternativtexte der Bilder.',
            'Primäre Inhalte werden **nicht erst nach einer Nutzerinteraktion** nachgeladen.',
            'Ressourcen, die Google zur Darstellung braucht, sind nicht per `robots.txt` gesperrt.',
            'Mobile Adressen enthalten keine Fragmente (den Teil nach dem `#`).',
          ],
        },
      ],
    },
    {
      id: 'cms-baukasten',
      h2: 'WordPress, Baukästen und Eigenbau: Wo Sie ansetzen',
      blocks: [
        { t: 'p', x: 'Wie Sie die Fehler beheben, hängt davon ab, womit Ihre Website gebaut wurde:' },
        {
          t: 'ul',
          items: [
            '**WordPress:** Prüfen Sie zuerst, ob das aktive Theme aktuell und responsiv ist. Viele Seitenbaukästen bieten eine Vorschau für Tablet und Smartphone; prüfen Sie jede wichtige Seite in allen Breiten und passen Sie Abstände und Spalten an.',
            '**Website-Baukästen** (zum Beispiel Wix, Jimdo oder Squarespace): Es gibt meist eine mobile Vorschau oder einen eigenen Editor. Viele Fehler entstehen durch manuell verschobene Elemente, die mobil anders umbrechen.',
            '**Individuell programmierte Websites:** Die Ursachen liegen meist in festen Breiten und im Viewport-Tag. Ein Entwickler behebt das in der Regel mit gezielten CSS-Anpassungen.',
          ],
        },
        { t: 'p', x: 'Ein komplett neues Design ist selten nötig. Meist genügen gezielte Korrekturen.' },
      ],
    },
    {
      id: 'hilfe',
      h2: 'Wann Sie Hilfe holen sollten',
      blocks: [
        { t: 'p', x: 'Hilfe lohnt sich, wenn Fehler nach mehreren Versuchen bleiben, wenn das Theme veraltet ist oder wenn jede Änderung an einer Stelle das Layout an einer anderen zerstört.' },
        { t: 'p', x: 'Fehler in der mobilen Ansicht gehören zu unserer [Schnellreparatur](/website-repair?lang=de) ({price.quick}, {time.quick}). Kommen mehrere Probleme zusammen, passt die Website-Reparatur ({price.repair}). Beide Preise verstehen sich netto zzgl. 19 % USt. Welches Paket passt, sagen wir Ihnen nach der kostenlosen Prüfung.' },
      ],
    },
  ],
  faq: [
    { q: 'Was bedeutet „responsive“?', a: 'Eine responsive Website passt Layout und Darstellung der Bildschirmbreite an, mit denselben Inhalten und derselben Adresse für alle Geräte. Google empfiehlt dieses Vorgehen als einfachste Variante.' },
    { q: 'Brauche ich eine eigene mobile Website oder eine App?', a: 'Für die meisten Unternehmen nicht. Eine responsive Website genügt. Eine getrennte mobile Version unter eigener Adresse verursacht zusätzlichen Pflegeaufwand, und Google empfiehlt responsives Design.' },
    { q: 'Wo ist der Mobile-Friendly-Test geblieben?', a: 'Google hat ihn zusammen mit dem Mobilgeräte-Bericht der Search Console und der API im Dezember 2023 eingestellt. Nutzen Sie stattdessen Lighthouse, PageSpeed Insights und die Core-Web-Vitals-Berichte.' },
    { q: 'Wie erkenne ich, ob Google meine Website mobil abruft?', a: 'Die URL-Prüfung der Search Console zeigt, wie Google eine Seite zuletzt abgerufen hat. Bei den meisten Websites ist das heute der Smartphone-Crawler.' },
    { q: 'Warum sieht meine Website auf dem iPhone anders aus als auf Android?', a: 'Browser, Schriften und manche CSS-Eigenschaften unterscheiden sich. Testen Sie deshalb mindestens Safari auf dem iPhone und Chrome auf Android.' },
  ],
  service: 'repair',
  related: ['website-laedt-langsam', 'website-selbst-pruefen', 'kontaktformular-funktioniert-nicht'],
  sources: [
    { label: 'Google Search Central: Mobile-First-Indexierung, Best Practices', url: 'https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing?hl=de' },
    { label: 'web.dev: Größe und Abstand von Tipp-Zielen', url: 'https://web.dev/articles/accessible-tap-targets?hl=de' },
    { label: 'web.dev: Grundlagen des Responsive Web Design', url: 'https://web.dev/articles/responsive-web-design-basics?hl=de' },
    { label: 'MDN: Viewport-Meta-Tag', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/viewport' },
    { label: 'Chrome für Entwickler: Lighthouse (Ersatz für den Mobile-Friendly-Test)', url: 'https://developer.chrome.com/docs/lighthouse/overview?hl=de' },
    { label: 'Search Engine Land: Google stellt Mobile-Friendly-Test und Mobilgeräte-Bericht ein', url: 'https://searchengineland.com/google-officially-drops-mobile-usability-report-mobile-friendly-test-tool-and-mobile-friendly-test-api-435377' },
    { label: 'Google PageSpeed Insights', url: 'https://pagespeed.web.dev/' },
  ],
  published: '2026-10-01',
  modified: '2026-10-01',
};
