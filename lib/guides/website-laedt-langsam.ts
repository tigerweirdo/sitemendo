import type { Guide } from './types';

export const websiteLaedtLangsam: Guide = {
  lang: 'de',
  slug: 'website-laedt-langsam',
  category: 'Tempo',
  check: 'speed',
  short: 'Website lädt langsam',
  title: 'Website lädt langsam: Ursachen und Lösungen',
  h1: 'Website lädt langsam? So finden und beheben Sie die Ursachen',
  description: 'Warum Ihre Website langsam lädt und was wirklich hilft: Messung mit PageSpeed Insights, Zielwerte, die häufigsten Ursachen und die Reihenfolge der Maßnahmen.',
  teaser: 'Messen statt raten: Zielwerte, die sieben häufigsten Ursachen und die Maßnahmen, die am meisten bringen.',
  tldr: [
    'Nach Googles Zielwerten ist eine Seite gut, wenn der größte Inhalt innerhalb von 2,5 Sekunden erscheint (LCP), sie in höchstens 200 Millisekunden auf Eingaben reagiert (INP) und der Inhalt kaum verrutscht (CLS bis 0,1).',
    'Messen Sie zuerst mit PageSpeed Insights: Die Diagnose zeigt, ob Server, Bilder, Skripte oder Layoutsprünge die Ursache sind.',
    'Am meisten bringen meist: Bilder richtig einbinden, Caching aktivieren, unnötige Plugins und externe Skripte entfernen und eine unterstützte PHP-Version nutzen.',
    'Ein guter Wert ersetzt keine guten Inhalte: Google zeigt immer die relevantesten Ergebnisse, auch wenn deren Seitenerfahrung schwächer ist.',
  ],
  intro: [
    'Wer auf eine Seite wartet, die sich nicht aufbaut, verlässt sie. Für Unternehmen bedeutet das verlorene Anfragen, bevor ein Besucher Ihr Angebot gesehen hat. Eine langsame Website ist meist kein einzelner Fehler, sondern das Ergebnis mehrerer Dinge: zu große Bilder, zu viele Plugins, schwaches Hosting, fehlendes Caching.',
    'Dieser Ratgeber zeigt in zwei Schritten, wie Sie vorgehen: erst messen und die Ursache eingrenzen, dann in sinnvoller Reihenfolge beheben. Er richtet sich an Inhaber und Verantwortliche kleiner Websites. Die technischen Hinweise sind so beschrieben, dass Sie sie auch Ihrem Dienstleister oder Hoster weitergeben können.',
  ],
  sections: [
    {
      id: 'zielwerte',
      h2: 'Wann ist eine Website „zu langsam“? Die Zielwerte',
      blocks: [
        { t: 'p', x: 'Google bewertet die Ladeerfahrung mit drei Kennzahlen, den Core Web Vitals. Sie beschreiben, wie schnell Inhalt erscheint, wie schnell die Seite reagiert und wie stabil das Layout bleibt:' },
        {
          t: 'table',
          caption: 'Core Web Vitals und ihre Zielwerte',
          head: ['Kennzahl', 'Misst', 'Gut ist', 'Typische Ursache bei schlechtem Wert'],
          rows: [
            ['LCP (Largest Contentful Paint)', 'Wann der größte sichtbare Inhalt erscheint, meist ein Bild oder eine Überschrift', 'bis 2,5 Sekunden', 'Langsamer Server, großes Titelbild, blockierende Skripte'],
            ['INP (Interaction to Next Paint)', 'Wie schnell die Seite auf Klicks, Tipps und Eingaben reagiert', 'bis 200 Millisekunden', 'Schweres JavaScript, Skripte von Drittanbietern'],
            ['CLS (Cumulative Layout Shift)', 'Wie stark sich sichtbare Inhalte beim Laden verschieben', 'bis 0,1', 'Bilder ohne Größenangabe, nachladende Banner und Schriften'],
          ],
        },
        { t: 'p', x: 'Maßgeblich ist der Wert, den 75 Prozent der Seitenaufrufe erreichen (das 75. Perzentil), getrennt nach Mobil und Desktop. INP hat den früheren Wert FID (First Input Delay) abgelöst und ist seit 2024 ein stabiler Core Web Vital.' },
        { t: 'note', kind: 'info', title: 'Ranking: wichtig, aber nicht allein entscheidend', x: 'Google schreibt, die Core Web Vitals entsprächen dem, was die Ranking-Systeme belohnen wollen, und empfiehlt gute Werte. Zugleich hält Google fest, dass die Suche immer die relevantesten Inhalte zeigen will, auch wenn die Seitenerfahrung schwächer ist. Gute Inhalte bleiben entscheidend; eine langsame Seite kostet trotzdem Besucher.' },
      ],
    },
    {
      id: 'messen',
      h2: 'Schritt 1: Messen statt raten',
      blocks: [
        {
          t: 'steps',
          items: [
            { h: 'PageSpeed Insights öffnen', x: 'Rufen Sie [pagespeed.web.dev](https://pagespeed.web.dev/) auf, geben Sie die Adresse einer wichtigen Seite ein und lesen Sie zuerst den Reiter „Mobil“. Testen Sie mindestens die Startseite und eine Unterseite, denn die Ursachen unterscheiden sich je nach Seite.' },
            { h: 'Felddaten und Labordaten unterscheiden', x: 'Felddaten zeigen, wie echte Besucher die Seite erlebt haben, zusammengefasst über die vergangenen 28 Tage. Labordaten stammen aus einem simulierten Test: mobil ein Mittelklasse-Smartphone im Mobilfunknetz, am Desktop ein Computer mit kabelgebundener Verbindung. Google rät, bei vorhandenen Felddaten diese zur Priorisierung zu nutzen; die Labordaten helfen bei der Suche nach der Ursache.' },
            { h: 'Die Diagnose lesen', x: 'Im Abschnitt mit den Diagnosen und Optimierungsmöglichkeiten zeigt Lighthouse, was am meisten Zeit kostet. Schreiben Sie die drei größten Punkte auf.' },
            { h: 'Ausgangswert festhalten', x: 'Notieren Sie Datum, Seite und die drei Kennzahlen. Nur so erkennen Sie später, ob eine Maßnahme etwas gebracht hat.' },
          ],
        },
        { t: 'p', x: 'Der Gesamtwert von 0 bis 100 gilt ab 90 als gut, von 50 bis 89 als verbesserungswürdig und darunter als schwach. Wichtiger als die Gesamtzahl sind die einzelnen Kennzahlen.' },
        { t: 'note', kind: 'tip', title: 'Ergebnisse schwanken', x: 'Labordaten ändern sich je nach Auslastung und Netz. Messen Sie mehrmals und vergleichen Sie Durchschnittswerte, nicht den besten oder schlechtesten Lauf.' },
      ],
    },
    {
      id: 'ursache-eingrenzen',
      h2: 'Schritt 2: Die Ursache eingrenzen',
      blocks: [
        { t: 'p', x: 'Die Symptome in PageSpeed Insights verraten, wo Sie suchen müssen:' },
        {
          t: 'table',
          caption: 'Vom Symptom zur Ursache',
          head: ['Das sehen Sie', 'Wahrscheinliche Ursache', 'Erste Maßnahme'],
          rows: [
            ['Hohe Serverantwortzeit (TTFB)', 'Langsames Hosting, fehlendes Caching, langsame Datenbank oder veraltete PHP-Version', 'Caching aktivieren, PHP-Version und Hosting-Tarif prüfen'],
            ['LCP zu hoch, großes Titelbild', 'Bild zu groß, ungünstiges Format oder zu spät geladen', 'Bild skalieren und komprimieren, nicht verzögert laden, früh laden lassen'],
            ['„Renderblockierende Ressourcen“', 'Viele oder große CSS- und JavaScript-Dateien aus Theme und Plugins', 'Unnötige Plugins entfernen, Dateien bündeln und verzögert laden'],
            ['INP zu hoch', 'Schweres JavaScript, Chat-Widgets, Tracking, Einbettungen sozialer Netzwerke', 'Skripte entfernen oder erst bei Bedarf laden'],
            ['CLS zu hoch', 'Bilder ohne Größenangabe, nachladende Banner, Schriftwechsel', 'Breite und Höhe angeben, Platz reservieren'],
          ],
        },
      ],
    },
    {
      id: 'ursachen',
      h2: 'Die sieben häufigsten Ursachen und ihre Lösung',
      blocks: [
        { t: 'h3', x: '1. Zu große oder falsch eingebundene Bilder' },
        { t: 'p', x: 'Bilder sind oft die größten Dateien einer Seite. Skalieren Sie sie auf die tatsächlich angezeigte Größe, komprimieren Sie sie und nutzen Sie moderne Formate wie WebP oder AVIF. Moderne Formate verkürzen die Ladedauer der Bilddatei, helfen aber nicht, wenn der Engpass woanders liegt.' },
        {
          t: 'ul',
          items: [
            'Bilder **unterhalb** des sichtbaren Bereichs mit `loading="lazy"` später laden lassen.',
            'Das größte Bild im sichtbaren Bereich (das LCP-Bild) **nie** verzögert laden. Nach web.dev führt das immer zu unnötiger Verzögerung. Setzen Sie stattdessen `fetchpriority="high"`.',
            'Breite und Höhe immer angeben, damit das Layout nicht springt.',
          ],
        },
        { t: 'code', label: 'HTML: Titelbild früh, Bild weiter unten später laden', x: '<!-- Titelbild im sichtbaren Bereich: mit hoher Priorität laden -->\n<img src="titelbild.webp" width="1200" height="600" fetchpriority="high" alt="Beschreibung">\n\n<!-- Bild weiter unten: erst bei Bedarf laden -->\n<img src="referenz.webp" width="600" height="400" loading="lazy" alt="Beschreibung">' },

        { t: 'h3', x: '2. Langsames Hosting und fehlendes Caching' },
        { t: 'p', x: 'Antwortet der Server langsam, hilft keine Bildoptimierung. Als Faustregel nennt web.dev, dass die Wartezeit auf das HTML-Dokument (TTFB) etwa 40 Prozent der LCP-Zeit ausmachen sollte. Liegt sie deutlich darüber, ist der Server der Engpass.' },
        { t: 'p', x: '**Caching** speichert fertig erzeugte Seiten, damit der Server sie nicht bei jedem Aufruf neu berechnen muss. Viele Hoster bieten es als Funktion an; bei WordPress übernehmen es Cache-Plugins. Leeren Sie den Cache nach inhaltlichen Änderungen und prüfen Sie die Seite anschließend im privaten Browserfenster.' },

        { t: 'h3', x: '3. Zu viele oder schwere Plugins und Themes' },
        { t: 'p', x: 'Jedes Plugin kann zusätzliche CSS- und JavaScript-Dateien laden, auch auf Seiten, die es nicht braucht. Gehen Sie Ihre Plugin-Liste durch: Was wird nicht mehr genutzt? Was lässt sich über eine Einstellung im Theme erledigen? Entfernen Sie Überflüssiges vollständig (deaktivieren **und** löschen) und messen Sie nach jeder Änderung neu. Legen Sie vorher eine Datensicherung an.' },

        { t: 'h3', x: '4. Externe Skripte, Einbettungen und Schriften' },
        { t: 'p', x: 'Tracking, Chat-Widgets, Karten, Social-Media-Feeds, Video-Einbettungen und Schriften von Drittservern laden Code von fremden Servern nach, auf den Sie keinen Einfluss haben. Prüfen Sie jedes Element: Wird es gebraucht? Kann es erst nach einem Klick laden, etwa ein Vorschaubild statt eines sofort startenden Videoplayers?' },
        { t: 'note', kind: 'info', title: 'Google Fonts lokal einbinden', x: 'Schriften von Google Fonts werden häufig von Google-Servern geladen. Das kostet eine zusätzliche Verbindung und ist datenschutzrechtlich heikel: Das Landgericht München I sprach 2022 (Az. 3 O 17493/20) einem Besucher 100 Euro Schadensersatz zu, weil beim dynamischen Einbinden die IP-Adresse an Google übertragen wurde. Wer die Schriftdateien von der eigenen Domain ausliefert, spart beides. Das ist keine Rechtsberatung.' },

        { t: 'h3', x: '5. Eine veraltete PHP-Version' },
        { t: 'p', x: 'WordPress, viele Shops und Baukästen laufen auf PHP. Neuere Versionen bringen häufig Geschwindigkeitsvorteile; der wichtigere Grund für ein Update ist jedoch die Sicherheit, denn ältere Versionen erhalten keine Korrekturen mehr. Stand Oktober 2026 gilt laut php.net:' },
        {
          t: 'table',
          caption: 'PHP-Versionen und Ende der Sicherheitsunterstützung (Stand: Oktober 2026)',
          head: ['PHP-Version', 'Sicherheitsunterstützung bis'],
          rows: [
            ['Vor 8.2', 'Nicht mehr gepflegt'],
            ['8.2', '31. Dezember 2026'],
            ['8.3', '31. Dezember 2027'],
            ['8.4', '31. Dezember 2028'],
            ['8.5', '31. Dezember 2029'],
          ],
        },
        { t: 'p', x: 'Die Version stellen Sie im Hosting-Paket ein, oft unter „PHP-Version“ oder „PHP-Einstellungen“. Legen Sie vorher eine Datensicherung an und testen Sie die Website danach gründlich: Alte Plugins oder Themes laufen unter neuen PHP-Versionen manchmal nicht und lösen dann einen „kritischen Fehler“ aus (siehe [WordPress: kritischer Fehler beheben](/ratgeber/wordpress-kritischer-fehler-beheben)).' },

        { t: 'h3', x: '6. Blockierende CSS- und JavaScript-Dateien' },
        { t: 'p', x: 'Muss der Browser zuerst viele Stil- und Skriptdateien laden, bevor er etwas anzeigt, entsteht eine Verzögerung. Gegenmittel sind weniger Dateien, Skripte mit `defer` und der Verzicht auf Unnötiges. Viele Cache- und Optimierungs-Plugins bieten dafür Schalter. Ändern Sie jeweils nur eine Einstellung und prüfen Sie die Seite danach auf Darstellungsfehler.' },

        { t: 'h3', x: '7. Layoutverschiebungen (CLS)' },
        {
          t: 'ul',
          items: [
            'Bei Bildern und Videos immer `width` und `height` angeben oder das Seitenverhältnis per CSS (`aspect-ratio`) festlegen.',
            'Für spät ladende Inhalte wie Werbung oder Einbettungen Platz reservieren, etwa mit `min-height`.',
            'Keine neuen Inhalte oberhalb bereits sichtbarer Inhalte einblenden, außer als Reaktion auf eine Nutzeraktion.',
            'Animationen mit `transform` statt mit Eigenschaften wie `top` oder `left` umsetzen; sie lösen kein neues Layout aus.',
            'Webschriften so laden, dass der Text nicht sichtbar umspringt (`font-display`), und passende Ersatzschriften angeben.',
          ],
        },
      ],
    },
    {
      id: 'reihenfolge',
      h2: 'Was bringt am meisten? Die sinnvolle Reihenfolge',
      blocks: [
        {
          t: 'ol',
          items: [
            'Datensicherung anlegen und die Ausgangswerte messen.',
            'Bilder verkleinern und richtig einbinden: oft der größte Hebel.',
            'Caching aktivieren (Hosting-Funktion oder Plugin).',
            'Unnötige Plugins, Skripte und Einbettungen entfernen.',
            'PHP-Version auf eine unterstützte Version anheben, nach einem Test.',
            'Schriften lokal ausliefern und Layoutverschiebungen beseitigen.',
            'Hosting prüfen, wenn die Serverantwortzeit trotz Caching hoch bleibt.',
          ],
        },
        { t: 'p', x: 'Messen Sie nach jeder Änderung neu. Beachten Sie: Felddaten fassen 28 Tage zusammen, Verbesserungen zeigen sich dort daher erst nach und nach. Die Labordaten reagieren sofort.' },
      ],
    },
    {
      id: 'hilfe',
      h2: 'Wann Sie Hilfe holen sollten',
      blocks: [
        { t: 'p', x: 'Bilder und Plugins können Sie meist selbst in den Griff bekommen. Hilfe lohnt sich bei hohen Serverantwortzeiten, bei Konflikten zwischen Plugins, bei Änderungen an Theme-Dateien oder wenn Sie einen Umzug auf besseres Hosting erwägen.' },
        { t: 'p', x: 'Grundlegende Ladezeit-Verbesserungen gehören zu unserer [Schnellreparatur](/website-repair?lang=de) ({price.quick}, {time.quick}); bei mehreren Problemen zugleich, etwa Ladezeit, mobile Ansicht und Links, passt die Website-Reparatur ({price.repair}). Beide Preise verstehen sich netto zzgl. 19 % USt. Welches Paket zu Ihnen passt, sagen wir Ihnen nach der kostenlosen Prüfung.' },
      ],
    },
  ],
  faq: [
    { q: 'Wie schnell sollte eine Website laden?', a: 'Als Ziel nennt Google einen LCP von höchstens 2,5 Sekunden, einen INP von höchstens 200 Millisekunden und einen CLS von höchstens 0,1, gemessen am 75. Perzentil der Seitenaufrufe.' },
    { q: 'Warum ist der mobile Wert schlechter als der Desktop-Wert?', a: 'PageSpeed Insights simuliert mobil ein Mittelklasse-Smartphone im Mobilfunknetz, am Desktop einen Computer mit kabelgebundener Verbindung. Dieselbe Seite schneidet mobil deshalb meist schlechter ab.' },
    { q: 'Beeinflusst die Ladezeit mein Ranking bei Google?', a: 'Die Core Web Vitals entsprechen laut Google dem, was die Ranking-Systeme belohnen wollen. Google betont aber auch, dass die Suche immer die relevantesten Inhalte zeigen will, selbst bei schwächerer Seitenerfahrung. Eine schnelle Seite kann helfen, ersetzt aber keine relevanten Inhalte.' },
    { q: 'Reicht ein Caching-Plugin?', a: 'Es hilft bei langsamer Serverantwort, löst aber keine zu großen Bilder, überladene Themes oder schwere Skripte von Drittanbietern. Betrachten Sie es als einen Baustein unter mehreren.' },
    { q: 'Brauche ich ein CDN?', a: 'Ein Content Delivery Network liefert Dateien von Servern in der Nähe der Besucher aus. Bei überwiegend deutschem Publikum und solidem Hosting bringt es oft weniger als Bildoptimierung und Caching. Mit Besuchern aus vielen Ländern kann es sinnvoll sein.' },
    { q: 'Wann zeigen sich Verbesserungen in den Felddaten?', a: 'Nicht sofort: PageSpeed Insights fasst die Felddaten der vergangenen 28 Tage zusammen. Die Labordaten zeigen eine Änderung dagegen direkt nach einem neuen Test.' },
  ],
  service: 'repair',
  related: ['website-mobil-optimieren', 'wordpress-kritischer-fehler-beheben', 'website-wartung'],
  sources: [
    { label: 'web.dev: Core Web Vitals und ihre Zielwerte', url: 'https://web.dev/articles/vitals?hl=de' },
    { label: 'Google Search Central: Core Web Vitals und die Google-Suche', url: 'https://developers.google.com/search/docs/appearance/core-web-vitals?hl=de' },
    { label: 'Google Search Central: Seitenerfahrung in den Suchergebnissen', url: 'https://developers.google.com/search/docs/appearance/page-experience?hl=de' },
    { label: 'Google PageSpeed Insights: Dokumentation', url: 'https://developers.google.com/speed/docs/insights/v5/about?hl=de' },
    { label: 'web.dev: Labor- und Felddaten im Vergleich', url: 'https://web.dev/articles/lab-and-field-data-differences?hl=de' },
    { label: 'web.dev: Largest Contentful Paint optimieren', url: 'https://web.dev/articles/optimize-lcp?hl=de' },
    { label: 'web.dev: Cumulative Layout Shift optimieren', url: 'https://web.dev/articles/optimize-cls?hl=de' },
    { label: 'PHP: Supported Versions', url: 'https://www.php.net/supported-versions.php' },
    { label: 'Kanzlei Dr. Bahr: LG München I zu Google Fonts (Az. 3 O 17493/20)', url: 'https://www.dr-bahr.com/news/nutzung-von-google-fonts-auf-webseite-datenschutzwidrig-berechtigtes-interesse-nicht-ausreichend.html' },
  ],
  published: '2026-10-01',
  modified: '2026-10-01',
};
