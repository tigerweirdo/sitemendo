import type { Guide } from './types';

export const websiteSelbstPruefen: Guide = {
  lang: 'de',
  slug: 'website-selbst-pruefen',
  category: 'Grundlagen',
  short: 'Website selbst prüfen: Checkliste',
  title: 'Website selbst prüfen: Checkliste in 8 Schritten',
  h1: 'Website selbst prüfen: Die Checkliste für Unternehmen',
  description: 'So prüfen Sie Ihre Firmenwebsite selbst: acht Punkte von der Handy-Ansicht bis zum Impressum, mit kostenlosen Werkzeugen, Zielwerten und Prioritäten.',
  teaser: 'Acht Prüfpunkte, kostenlose Werkzeuge und klare Zielwerte: So verschaffen Sie sich in ein bis zwei Stunden einen Überblick.',
  tldr: [
    'Acht Punkte genügen für einen ersten Überblick: mobile Ansicht, Ladezeit, Links, HTTPS, Formulare, Technik, Auffindbarkeit und Kontaktwege.',
    'Alles lässt sich mit kostenlosen Werkzeugen prüfen, vor allem mit dem eigenen Smartphone, PageSpeed Insights und der Google Search Console.',
    'Entscheidend ist die Reihenfolge: Was Kunden am Kontakt hindert (Formular, Telefonnummer, Sicherheitswarnung), kommt vor jedem Feinschliff.',
    'Planen Sie für den ersten Durchgang ein bis zwei Stunden ein und notieren Sie jede Fundstelle mit Adresse und Datum.',
  ],
  intro: [
    'Eine Website bleibt selten so, wie sie veröffentlicht wurde: Plugins veralten, Seiten werden umgezogen, ein Zertifikat läuft ab, ein Formular schickt plötzlich keine Nachrichten mehr. Meist merkt es niemand, bis ein Kunde anruft oder ausbleibt. Eine regelmäßige Prüfung deckt solche Fehler auf, bevor sie Anfragen kosten.',
    'Dieser Ratgeber führt Sie durch acht Bereiche. Zu jedem Bereich finden Sie, was Sie prüfen, womit Sie es kostenlos prüfen und woran Sie einen guten Wert erkennen. Wo es sich lohnt, verweisen wir auf einen eigenen Ratgeber mit der Lösung.',
    'Die Checkliste betrachtet Ihre Website **von außen**, so wie ein Besucher oder Google sie sieht. Was hinter einer Anmeldung liegt (Verwaltungsbereich, Datensicherung, E-Mail-Zustellung), bleibt bewusst außen vor oder wird nur gestreift.',
  ],
  sections: [
    {
      id: 'vorbereitung',
      h2: 'Vorbereitung: Was Sie brauchen',
      blocks: [
        { t: 'p', x: 'Sie brauchen keine Vorkenntnisse und keine Zugangsdaten, nur einen Browser und ein Smartphone. Hilfreich, aber nicht nötig, ist der Zugang zur [Google Search Console](https://search.google.com/search-console/about) für Ihre Website.' },
        {
          t: 'ul',
          items: [
            'Ihre Website-Adresse (mit und ohne `www`) und eine zweite Seite, zum Beispiel eine Leistungs- oder Kontaktseite.',
            'Ein Smartphone mit mobilem Netz (nicht nur WLAN) und einen Computer.',
            'Ein privates Browserfenster, damit gespeicherte Anmeldungen und Cookies das Ergebnis nicht verfälschen.',
            'Eine Notiz mit drei Spalten: Fundstelle (Adresse), Beobachtung, Datum.',
          ],
        },
        { t: 'note', kind: 'tip', title: 'Tipp: Testen Sie wie ein Kunde', x: 'Öffnen Sie Ihre Website so, wie ein Interessent es tun würde: über Google, mit dem Handy, unterwegs. Fehler, die Sie am gewohnten Arbeitsplatz nie sehen, fallen so sofort auf.' },
      ],
    },
    {
      id: 'mobile-ansicht',
      h2: '1. Mobile Ansicht',
      blocks: [
        { t: 'p', x: 'Google verwendet für Indexierung und Ranking die mobile Version einer Website. Auch viele Ihrer Besucher kommen mit dem Smartphone. Prüfen Sie deshalb zuerst, wie Ihre Seite auf dem Handy aussieht.' },
        { t: 'h3', x: 'Was Sie prüfen' },
        {
          t: 'ul',
          items: [
            'Passt die Seite auf den Bildschirm, ohne dass Sie seitlich scrollen müssen?',
            'Ist der Text ohne Zoomen lesbar?',
            'Lässt sich das Menü öffnen, und sind alle Unterseiten erreichbar?',
            'Sind Schaltflächen und Links groß genug für den Daumen? Als Richtwert empfiehlt Google rund 48 Pixel Größe und etwa 8 Pixel Abstand.',
            'Ist die Telefonnummer antippbar?',
          ],
        },
        { t: 'h3', x: 'Womit Sie prüfen' },
        { t: 'p', x: 'Am besten mit Ihrem eigenen Smartphone. Am Computer können Sie in Chrome mit der Taste `F12` die Entwicklerwerkzeuge öffnen und über das Geräte-Symbol eine Handy-Ansicht simulieren. Das ersetzt den Test auf einem echten Gerät nicht, hilft aber bei der Fehlersuche.' },
        { t: 'p', x: 'Details, Beispiele und Lösungen: [Website mobil optimieren](/ratgeber/website-mobil-optimieren).' },
      ],
    },
    {
      id: 'ladezeit',
      h2: '2. Ladezeit',
      blocks: [
        { t: 'p', x: 'Langsame Seiten kosten Besucher, bevor diese etwas gelesen haben. Google misst die Ladeerfahrung mit den Core Web Vitals. Die Zielwerte für „gut“ lauten:' },
        {
          t: 'table',
          caption: 'Core Web Vitals: Zielwerte für „gut“',
          head: ['Kennzahl', 'Was sie misst', 'Gut ist'],
          rows: [
            ['Largest Contentful Paint (LCP)', 'Wie schnell der größte sichtbare Inhalt erscheint', 'bis 2,5 Sekunden'],
            ['Interaction to Next Paint (INP)', 'Wie schnell die Seite auf Eingaben reagiert', 'bis 200 Millisekunden'],
            ['Cumulative Layout Shift (CLS)', 'Wie stark der Inhalt beim Laden verrutscht', 'bis 0,1'],
          ],
        },
        { t: 'p', x: 'Bewertet wird jeweils der Wert, den 75 Prozent der Seitenaufrufe erreichen (das 75. Perzentil).' },
        { t: 'p', x: 'Geben Sie Ihre Adresse bei [PageSpeed Insights](https://pagespeed.web.dev/) ein. Lesen Sie zuerst die Felddaten, sofern vorhanden: Sie zeigen echte Besucherdaten der vergangenen 28 Tage. Darunter stehen Labordaten aus einem simulierten Test, die sich gut zur Ursachensuche eignen.' },
        { t: 'note', kind: 'info', title: 'Wenig Besucher, keine Felddaten', x: 'Für selten besuchte Seiten gibt es oft keine Felddaten. Google nennt für die Aufnahme keine genaue Besucherzahl. Dann bleiben die Labordaten als Orientierung.' },
        { t: 'p', x: 'Anleitung zur Behebung: [Website lädt langsam: Ursachen und Lösungen](/ratgeber/website-laedt-langsam).' },
      ],
    },
    {
      id: 'links',
      h2: '3. Links und Unterseiten',
      blocks: [
        { t: 'p', x: 'Klicken Sie Hauptmenü, Fußzeile und die wichtigsten Schaltflächen durch. Jeder Link muss ein sinnvolles Ziel öffnen. Ein Link, der auf „Seite nicht gefunden“ führt, ist ein defekter Link (Fehler 404).' },
        {
          t: 'ul',
          items: [
            'Hauptmenü und alle Unterseiten durchklicken, auch Telefon-, E-Mail- und Social-Media-Links in der Fußzeile.',
            'Auf Weiterleitungen achten: Führt ein alter Link auf eine unpassende Seite, etwa immer auf die Startseite?',
            'Mit dem kostenlosen [W3C Link Checker](https://validator.w3.org/checklink) lassen sich einzelne Seiten automatisch auf defekte Links prüfen. Manche Websites blockieren solche Werkzeuge; ein gemeldeter Fehler sollte deshalb immer im Browser gegengeprüft werden.',
          ],
        },
        { t: 'p', x: 'Mehr dazu: [Defekte Links finden und beheben](/ratgeber/defekte-links-finden-beheben).' },
      ],
    },
    {
      id: 'https',
      h2: '4. HTTPS und Sicherheitshinweise',
      blocks: [
        { t: 'p', x: 'Die Adresse Ihrer Website sollte mit `https://` beginnen und im Browser ohne Warnung erscheinen. Prüfen Sie vier Varianten: `http://ihre-domain.de`, `http://www.ihre-domain.de`, `https://ihre-domain.de` und `https://www.ihre-domain.de`. Alle vier sollten bei derselben `https`-Adresse landen.' },
        {
          t: 'ul',
          items: [
            'Zeigt der Browser „Nicht sicher“ oder eine Vollbild-Warnung?',
            'Wird ein gültiges Zertifikat ausgeliefert? Der [SSL Server Test](https://www.ssllabs.com/ssltest/) von Qualys SSL Labs prüft das ausführlich.',
            'Werden alle Bilder und Skripte über HTTPS geladen (keine „gemischten Inhalte“)?',
          ],
        },
        { t: 'note', kind: 'warn', title: 'Neu ab Oktober 2026: Chrome fragt vor HTTP-Seiten nach', x: 'Google hat angekündigt, dass Chrome ab Version 154 im Oktober 2026 vor dem ersten Aufruf einer öffentlichen Seite ohne HTTPS um Erlaubnis fragt. Mehr dazu: [HTTPS und SSL-Fehler beheben](/ratgeber/https-ssl-fehler-beheben).' },
      ],
    },
    {
      id: 'formulare',
      h2: '5. Kontaktformular und Anfragen',
      blocks: [
        { t: 'p', x: 'Ein Formular, das keine Nachrichten zustellt, bemerkt niemand. Senden Sie deshalb selbst eine Testanfrage, vom Handy und vom Computer.' },
        {
          t: 'ol',
          items: [
            'Füllen Sie das Formular mit einer erkennbaren Testnachricht aus und senden Sie es ab.',
            'Prüfen Sie, ob eine Bestätigung erscheint (Dankeseite oder Hinweis).',
            'Sehen Sie im Postfach des Empfängers nach, auch im Spam-Ordner, und warten Sie einige Minuten.',
            'Wiederholen Sie den Test mit einer Absenderadresse bei einem anderen Anbieter, zum Beispiel einmal Gmail und einmal Outlook.',
          ],
        },
        { t: 'p', x: 'Mehr dazu: [Kontaktformular funktioniert nicht](/ratgeber/kontaktformular-funktioniert-nicht).' },
      ],
    },
    {
      id: 'technik',
      h2: '6. Technik und Aktualität',
      blocks: [
        { t: 'p', x: 'Hier geht es um die unsichtbare Seite: Wie aktuell ist die Software, auf der Ihre Website läuft?' },
        {
          t: 'ul',
          items: [
            '**CMS, Theme und Plugins:** Bei WordPress zeigt das Dashboard unter „Aktualisierungen“, was veraltet ist.',
            '**PHP-Version:** Sie lässt sich im Hosting-Paket einstellen. Laut der [offiziellen Übersicht von PHP](https://www.php.net/supported-versions.php) werden Versionen vor 8.2 nicht mehr gepflegt; für 8.2 endet die Sicherheitsunterstützung am 31. Dezember 2026 (Stand: Oktober 2026).',
            '**Datensicherung:** Gibt es regelmäßige Backups, und wurde die Wiederherstellung schon einmal getestet?',
            '**Ablaufdaten:** Wann läuft die Domain ab, wann das Zertifikat? Beides sollte sich automatisch verlängern.',
            '**Sichtbare Alterszeichen:** Jahreszahl im Copyright-Hinweis, veraltete Öffnungszeiten, nicht mehr gültige Preise.',
          ],
        },
        { t: 'p', x: 'Mehr dazu: [Website-Wartung: Aufgaben, Risiken, Kosten](/ratgeber/website-wartung).' },
      ],
    },
    {
      id: 'auffindbarkeit',
      h2: '7. Auffindbarkeit bei Google',
      blocks: [
        { t: 'p', x: 'Prüfen Sie zwei Dinge: Kennt Google Ihre Seiten, und blockiert nichts die Aufnahme?' },
        {
          t: 'ul',
          items: [
            'Geben Sie `site:ihre-domain.de` in die Google-Suche ein. Ihre wichtigsten Seiten sollten erscheinen.',
            'Öffnen Sie `ihre-domain.de/robots.txt`. Steht dort unter `User-agent: *` die Zeile `Disallow: /`, ist die gesamte Website für Suchmaschinen gesperrt.',
            'Suchen Sie im Quelltext einer Seite nach `noindex`. Dieses Meta-Tag hält Seiten aus dem Index.',
            'In der [Google Search Console](https://search.google.com/search-console/about) zeigt die URL-Prüfung, ob Google eine Seite kennt und indexiert hat.',
          ],
        },
        { t: 'p', x: 'Mehr dazu: [Website wird bei Google nicht gefunden](/ratgeber/website-nicht-bei-google-gefunden).' },
      ],
    },
    {
      id: 'kontakt-impressum',
      h2: '8. Kontaktwege und Impressum',
      blocks: [
        { t: 'p', x: 'Kunden müssen Sie schnell erreichen können. Prüfen Sie, ob Telefonnummer, E-Mail-Adresse und Anschrift ohne Suchen zu finden sind und ob ein Link zum Impressum auf jeder Seite erreichbar ist, in der Regel in der Fußzeile.' },
        {
          t: 'ul',
          items: [
            'Telefonnummer und E-Mail-Adresse im Kopf- oder Fußbereich sichtbar?',
            'Telefonnummer auf dem Handy antippbar (`tel:`-Link)?',
            'Impressum und Datenschutzerklärung von jeder Seite aus mit einem Klick erreichbar?',
            'Angaben im Impressum aktuell (Anschrift, Rechtsform, Kontakt)?',
          ],
        },
        { t: 'p', x: 'Mehr dazu: [Impressum: Pflichtangaben nach § 5 DDG](/ratgeber/impressum-pflichtangaben).' },
      ],
    },
    {
      id: 'bewerten',
      h2: 'So bewerten Sie Ihre Funde',
      blocks: [
        { t: 'p', x: 'Nicht jeder Fehler ist gleich wichtig. Ordnen Sie Ihre Notizen nach der Auswirkung auf Kunden:' },
        {
          t: 'table',
          caption: 'Priorität nach Auswirkung',
          head: ['Priorität', 'Beispiele', 'Wann beheben?'],
          rows: [
            ['Dringend', 'Sicherheitswarnung im Browser, Kontaktformular sendet nicht, Website nicht erreichbar, Telefonnummer fehlt', 'Sofort'],
            ['Mittel', 'Sehr lange Ladezeit, defekte Links im Menü, fehlerhafte mobile Ansicht, Seite nicht im Google-Index', 'Innerhalb weniger Wochen'],
            ['Niedrig', 'Fehlende Meta-Beschreibung, veraltete Jahreszahl, einzelne defekte externe Links', 'Bei der nächsten Überarbeitung'],
          ],
        },
        { t: 'p', x: 'Wiederholen Sie die Prüfung mindestens einmal pro Quartal und nach jeder größeren Änderung, etwa nach einem neuen Theme, einem Umzug oder einem Relaunch.' },
      ],
    },
    {
      id: 'hilfe',
      h2: 'Wann sich Hilfe lohnt',
      blocks: [
        { t: 'p', x: 'Fast alle Punkte können Sie selbst prüfen. Beim Beheben kommt es auf Ihre Erfahrung an: Ein veraltetes Plugin zu aktualisieren ist schnell erledigt, ein defektes Formular oder ein Zertifikatsproblem erfordert oft Zugriff auf Hosting und DNS.' },
        { t: 'p', x: 'Wenn Sie die Messung nicht selbst vornehmen möchten, übernehmen wir sie: Unsere [kostenlose Website-Prüfung](/website-check?lang=de) misst die acht Punkte dieser Checkliste von außen und sendet Ihnen innerhalb von 48 Stunden einen Bericht mit Prioritätenliste. Danach entscheiden Sie, ob Sie die Korrekturen selbst umsetzen, jemand anderen beauftragen oder uns.' },
        { t: 'note', kind: 'info', title: 'Was die Prüfung nicht abdeckt', x: 'Wie bei dieser Checkliste betrachten wir nur, was von außen sichtbar ist. Verwaltungsbereich, Datensicherung und E-Mail-Zustellung gehören nicht zur kostenlosen Prüfung.' },
      ],
    },
  ],
  faq: [
    { q: 'Wie oft sollte ich meine Website prüfen?', a: 'Ein Durchgang pro Quartal ist für die meisten Firmenwebsites ein vernünftiger Rhythmus. Zusätzlich lohnt sich eine Prüfung nach jeder größeren Änderung, etwa einem Umzug, einem neuen Theme oder einem Relaunch.' },
    { q: 'Welche kostenlosen Werkzeuge brauche ich?', a: 'Ihr Smartphone, PageSpeed Insights, die Google Search Console, den W3C Link Checker und den SSL Server Test von Qualys SSL Labs. Für größere Websites hilft ein Crawler wie der Screaming Frog SEO Spider, dessen kostenlose Version eine begrenzte Zahl von Adressen prüft.' },
    { q: 'Reicht ein guter PageSpeed-Wert?', a: 'Nein. Ein guter Wert sagt nur etwas über die Ladeleistung aus. Ob das Formular funktioniert, das Impressum stimmt oder Google die Seite indexiert, zeigt er nicht. Deshalb umfasst die Checkliste acht Bereiche.' },
    { q: 'Kann ich die Prüfung ohne Vorkenntnisse durchführen?', a: 'Ja. Alle Prüfpunkte lassen sich ohne Programmierkenntnisse durchführen. Für die Behebung brauchen Sie je nach Fehler Zugriff auf Hosting, CMS oder DNS.' },
    { q: 'Was kostet die Prüfung bei Sitemendo?', a: 'Die Website-Prüfung kostet {price.check}. Sie erhalten den Bericht innerhalb von 48 Stunden; Reparatur und Pflege sind optional.' },
  ],
  service: 'check',
  related: ['website-laedt-langsam', 'website-mobil-optimieren', 'kontaktformular-funktioniert-nicht'],
  sources: [
    { label: 'Google Search Central: Mobile-First-Indexierung, Best Practices', url: 'https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing?hl=de' },
    { label: 'web.dev: Core Web Vitals und ihre Zielwerte', url: 'https://web.dev/articles/vitals?hl=de' },
    { label: 'web.dev: Größe und Abstand von Tipp-Zielen', url: 'https://web.dev/articles/accessible-tap-targets?hl=de' },
    { label: 'Google PageSpeed Insights: Dokumentation', url: 'https://developers.google.com/speed/docs/insights/v5/about?hl=de' },
    { label: 'Chrome UX Report: Methodik', url: 'https://developer.chrome.com/docs/crux/methodology?hl=de' },
    { label: 'Google: HTTPS by default in Chrome', url: 'https://blog.google/security/https-by-defau/' },
    { label: 'PHP: Supported Versions', url: 'https://www.php.net/supported-versions.php' },
    { label: 'Google Search Central: Indexierung mit noindex blockieren', url: 'https://developers.google.com/search/docs/crawling-indexing/block-indexing?hl=de' },
  ],
  published: '2026-10-01',
  modified: '2026-10-01',
};
