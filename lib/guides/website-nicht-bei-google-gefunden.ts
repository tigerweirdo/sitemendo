import type { Guide } from './types';

export const websiteNichtBeiGoogleGefunden: Guide = {
  lang: 'de',
  slug: 'website-nicht-bei-google-gefunden',
  category: 'Auffindbarkeit',
  check: 'index',
  short: 'Website nicht bei Google gelistet',
  title: 'Website nicht bei Google gelistet? Ursachen',
  h1: 'Website wird bei Google nicht angezeigt: Ursachen und Lösungen',
  description: 'Website bei Google nicht gelistet oder angezeigt? So prüfen Sie die Indexierung, finden häufige Ursachen (noindex, robots.txt, Links) und beheben sie.',
  teaser: 'Nicht gelistet oder nur schlecht platziert? So unterscheiden Sie beides, prüfen mit der Search Console und beheben die häufigsten Ursachen.',
  tldr: [
    'Es gibt zwei verschiedene Probleme: Die Seite ist nicht im Google-Index (Indexierung), oder sie steht dort, aber weit hinten (Ranking). Beides erfordert unterschiedliche Maßnahmen.',
    'Die Search Console beantwortet die Frage verlässlich: Die URL-Prüfung zeigt, ob eine Seite „auf Google“ ist. Die Suche mit `site:` ist laut Google nicht immer vollständig.',
    'Technische Ursachen sind meist schnell behoben: ein vergessenes `noindex`, eine gesperrte `robots.txt`, eine falsche Canonical-Angabe, Serverfehler oder fehlende Links. Bei einer neuen Website kann es laut Google einige Wochen dauern, bis sie bemerkt wird.',
    'Niemand kann einen ersten Platz bei Google garantieren. Seriöse Hilfe sorgt dafür, dass Google Ihre Seiten finden, lesen und einordnen kann, und verspricht keine Platzierung.',
  ],
  intro: [
    'Sie geben Ihren Firmennamen bei Google ein, und Ihre Website taucht nicht auf. Oder sie ist da, aber bei den Suchbegriffen, die Ihre Kunden verwenden, nirgends zu finden. Beides fühlt sich gleich an, hat aber unterschiedliche Ursachen.',
    'Dieser Ratgeber zeigt, wie Sie herausfinden, wo das Problem liegt: Ist die Seite im Index, wird sie nur schlecht platziert, oder blockiert sie sich selbst? Dazu die häufigsten Ursachen und was Sie dagegen tun können. Alle Aussagen zu Google beruhen auf der offiziellen Dokumentation (Stand: Oktober 2026).',
  ],
  sections: [
    {
      id: 'zwei-probleme',
      h2: 'Nicht indexiert oder nur schlecht platziert?',
      blocks: [
        { t: 'p', x: 'Die Google-Suche arbeitet in drei Phasen: Google lädt Seiten herunter (Crawling), analysiert und speichert sie (Indexierung) und zeigt sie bei passenden Suchanfragen an (Bereitstellung der Suchergebnisse). Nach Googles eigener Darstellung durchlaufen nicht alle Seiten alle Phasen, und die Aufnahme in den Index wird nicht garantiert.' },
        { t: 'p', x: 'Für Sie als Betreiber heißt das: „Ich werde nicht gefunden“ kann zwei verschiedene Dinge bedeuten.' },
        {
          t: 'table',
          caption: 'Zwei Probleme mit unterschiedlichen Lösungen',
          head: ['Kriterium', 'Seite nicht im Index', 'Seite im Index, aber schlecht platziert'],
          rows: [
            ['Woran Sie es erkennen', 'Die URL-Prüfung der Search Console meldet „URL ist nicht auf Google“. Auch bei der Suche nach Ihrem Firmennamen erscheint die Seite nicht.', 'Die URL-Prüfung meldet „URL ist auf Google“, aber bei den Suchbegriffen Ihrer Kunden stehen Sie weit hinten.'],
            ['Typische Ursachen', 'Blockaden wie noindex oder robots.txt, Serverfehler, fehlende Links auf die Seite, eine sehr neue Website', 'Starke Konkurrenz, wenig hilfreiche oder austauschbare Inhalte, kaum Verweise von anderen Seiten'],
            ['Was hilft', 'Technische Fehler beheben, die Seite verlinken, Sitemap und Search Console nutzen', 'Bessere Inhalte, klare Seitenstruktur, Verweise von anderen Seiten, Geduld'],
            ['Wie lange es dauert', 'Laut Google kann das Crawling einige Tage oder mehrere Wochen dauern', 'Laut Google können Änderungen zwischen wenigen Stunden und mehreren Monaten brauchen, bis sie wirken'],
          ],
        },
      ],
    },
    {
      id: 'pruefen',
      h2: 'Schritt 1: Prüfen, ob Ihre Seite im Index ist',
      blocks: [
        {
          t: 'steps',
          items: [
            { h: 'Search Console einrichten', x: 'Verifizieren Sie Ihre Website in der [Google Search Console](https://search.google.com/search-console/about). Das Werkzeug ist kostenlos und zeigt am verlässlichsten, was Google über Ihre Seiten weiß.' },
            { h: 'Einzelne Seite mit der URL-Prüfung testen', x: 'Geben Sie die Adresse der Seite oben in das Suchfeld der Search Console ein. Das Werkzeug meldet „URL ist auf Google“ oder „URL ist nicht auf Google“. Der Live-Test ruft die Seite in Echtzeit ab und zeigt, ob Google sie abrufen kann.' },
            { h: 'Bericht zur Seitenindexierung öffnen', x: 'Der Bericht zeigt, welche Seiten Google indexieren konnte und warum andere nicht indexiert sind. Die Meldungen erklärt der nächste Abschnitt.' },
            { h: 'Mit site: gegenprüfen', x: 'Geben Sie bei Google `site:ihre-domain.de` ein. Treffer zeigen, dass Seiten im Index sind. Fehlende Seiten beweisen dagegen nichts: Laut Google ist die Liste nicht immer vollständig. Nutzen Sie in diesem Fall die URL-Prüfung.' },
            { h: 'Nach dem Firmennamen suchen', x: 'Suchen Sie nach Ihrem Firmennamen und nach Firmenname plus Ort. Eine indexierte Website mit eindeutigem Namen ist dabei meist zu finden; garantiert ist das nicht.' },
          ],
        },
        { t: 'note', kind: 'info', title: 'Nicht jede nicht indexierte Seite ist ein Problem', x: 'Google weist selbst darauf hin, dass nicht indexierte URLs nicht notwendigerweise ein Problem sind. Weiterleitungen, Duplikate oder bewusst ausgeschlossene Seiten wie Danke-Seiten sollen gar nicht im Index stehen. Wichtig ist, dass Ihre Startseite und Ihre Leistungsseiten indexiert sind.' },
      ],
    },
    {
      id: 'statusmeldungen',
      h2: 'Die Meldungen der Search Console verstehen',
      blocks: [
        { t: 'p', x: 'Der Bericht zur Seitenindexierung nennt für nicht indexierte Seiten einen Grund. Das sind die häufigsten Meldungen mit den Bezeichnungen laut Google (Stand: Oktober 2026).' },
        {
          t: 'table',
          caption: 'Häufige Meldungen und was Sie tun können',
          head: ['Meldung', 'Bedeutung', 'Was Sie tun können'],
          rows: [
            ['Gefunden – zurzeit nicht indexiert', 'Google kennt die Adresse, hat die Seite aber noch nicht abgerufen.', 'In vielen Fällen genügt Geduld; hilfreich ist eine gute interne Verlinkung. Wiederholte Anfragen beschleunigen das laut Google nicht.'],
            ['Gecrawlt – zurzeit nicht indexiert', 'Google hat die Seite abgerufen, aber nicht aufgenommen.', 'Erneutes Einreichen ist laut Google nicht nötig, die Seite kann später noch aufgenommen werden. Prüfen Sie Inhalt und Verlinkung der Seite.'],
            ['URL als „noindex“ markiert', 'Die Seite enthält die Anweisung noindex, und Google hat sie befolgt.', 'Ist das gewollt, tun Sie nichts. Sonst entfernen Sie die Anweisung.'],
            ['URL wird von der robots.txt-Datei blockiert', 'Die robots.txt verbietet Google den Abruf der Seite.', 'Entfernen Sie die Sperre, wenn die Seite in der Suche erscheinen soll.'],
            ['Seite mit Weiterleitung', 'Die Adresse leitet auf eine andere weiter und wird selbst nicht indexiert.', 'Das ist normal. Wichtig ist, dass die Zielseite indexiert wird.'],
            ['Nicht gefunden (404)', 'Beim Abruf wurde ein 404-Fehler zurückgegeben.', 'Reparieren oder leiten Sie die Adresse weiter, siehe Ratgeber [Defekte Links finden und beheben](/ratgeber/defekte-links-finden-beheben).'],
            ['Serverfehler (5xx)', 'Ihr Server hat beim Abruf einen 5xx-Fehler zurückgegeben.', 'Wenden Sie sich an Ihren Hoster, siehe Ratgeber [Website nicht erreichbar](/ratgeber/website-nicht-erreichbar).'],
          ],
        },
      ],
    },
    {
      id: 'ursachen',
      h2: 'Die häufigsten Ursachen im Detail',
      blocks: [
        { t: 'p', x: 'Sehen Sie zuerst bei den technischen Ursachen nach. Sie lassen sich meist schnell beheben.' },

        { t: 'h3', x: '1. Ein vergessenes noindex' },
        { t: 'p', x: '**So erkennen Sie es:** Im Quelltext der Seite steht `<meta name="robots" content="noindex">`, oder der Server sendet den HTTP-Header `X-Robots-Tag: noindex`. Typisch nach einem Relaunch: Die Anweisung stand auf der Testversion und wurde mitgenommen.' },
        { t: 'p', x: '**Lösung:** Anweisung entfernen. Bei WordPress prüfen Sie unter „Einstellungen → Lesen“, ob „Suchmaschinen davon abhalten, diese Website zu indexieren“ aktiviert ist. Laut WordPress-Dokumentation setzt diese Option seit Version 5.3 ein `noindex,nofollow` in den Kopf jeder Seite. Bis der Googlebot eine Seite erneut besucht, kann es laut Google je nach Bedeutung der Seite mehrere Monate dauern. Mit „Indexierung beantragen“ in der URL-Prüfung bitten Sie Google, früher vorbeizuschauen.' },

        { t: 'h3', x: '2. Eine gesperrte robots.txt' },
        { t: 'p', x: '**So erkennen Sie es:** Rufen Sie `ihre-domain.de/robots.txt` auf. Steht dort unter `User-agent: *` die Zeile `Disallow: /`, ist die ganze Website für Crawler gesperrt. Die Search Console meldet dann „URL wird von der robots.txt-Datei blockiert“.' },
        { t: 'p', x: '**Lösung:** Entfernen Sie die Sperre oder beschränken Sie sie auf wirklich private Bereiche. Beachten Sie: Die `robots.txt` steuert das Crawling, nicht die Indexierung. Laut Google dient sie nicht dazu, Seiten aus der Suche auszuschließen, und eine gesperrte Seite kann trotzdem in den Ergebnissen erscheinen, wenn andere Seiten auf sie verweisen. Wer eine Seite aus der Suche heraushalten will, setzt `noindex`. Die Seite darf dafür nicht in der `robots.txt` gesperrt sein, weil Google die Anweisung sonst nicht sieht.' },

        { t: 'h3', x: '3. Eine falsche Canonical-Angabe' },
        { t: 'p', x: '**So erkennen Sie es:** Im Quelltext verweist `<link rel="canonical" href="…">` auf eine andere Seite, etwa auf die Testdomain, die Startseite oder eine Adresse ohne `www`. Google wertet das als Hinweis, dass die andere Adresse die Hauptversion ist.' },
        { t: 'p', x: '**Lösung:** Jede Seite verweist per Canonical auf ihre eigene bevorzugte Adresse, mit `https` und in einheitlicher Schreibweise.' },

        { t: 'h3', x: '4. Serverfehler oder ausgesperrte Crawler' },
        { t: 'p', x: '**So erkennen Sie es:** Die Search Console meldet „Serverfehler (5xx)“, oder der Live-Test der URL-Prüfung kann die Seite nicht abrufen. Auch eine Firewall, ein Bot-Schutz, ein Passwortschutz oder ein Wartungsmodus kann den Googlebot aussperren.' },
        { t: 'p', x: '**Lösung:** Prüfen Sie Hoster, Sicherheits-Plugins und Wartungsmodus. Bei sporadischen Ausfällen hilft der Ratgeber [Website nicht erreichbar](/ratgeber/website-nicht-erreichbar).' },

        { t: 'h3', x: '5. Keine Links auf die Seite' },
        { t: 'p', x: '**So erkennen Sie es:** Die Seite steht in keinem Menü und wird von keiner anderen Seite verlinkt (verwaiste Seite). Laut Googles SEO-Einsteigerleitfaden findet Google Seiten hauptsächlich über Links von bereits gecrawlten Seiten.' },
        { t: 'p', x: '**Lösung:** Verlinken Sie die Seite aus dem Hauptmenü oder von thematisch passenden Seiten, mit einem Linktext, der beschreibt, was die Seite enthält.' },

        { t: 'h3', x: '6. Die Website ist neu oder wurde gerade geändert' },
        { t: 'p', x: '**So erkennen Sie es:** Die Website ist erst wenige Tage oder Wochen online, oder Sie haben gerade die Adresse geändert. Die Search Console zeigt „Gefunden – zurzeit nicht indexiert“ oder noch gar nichts.' },
        { t: 'p', x: '**Lösung:** Richten Sie Search Console und Sitemap ein (siehe unten) und warten Sie. Laut Google kann es einige Wochen dauern, bis eine neue Website oder Änderungen an einer bestehenden bemerkt werden.' },

        { t: 'h3', x: '7. Gecrawlt, aber nicht aufgenommen' },
        { t: 'p', x: '**So erkennen Sie es:** Status „Gecrawlt – zurzeit nicht indexiert“. Google hat die Seite gelesen und sich vorerst gegen die Aufnahme entschieden. Einen Grund nennt die Search Console nicht.' },
        { t: 'p', x: '**Lösung:** Erneutes Einreichen ist laut Google nicht nötig. Prüfen Sie stattdessen, ob die Seite einen eigenen Zweck und eigenständigen, hilfreichen Inhalt hat, ob sie sich von anderen Seiten Ihrer Website unterscheidet und ob sie gut verlinkt ist. Sehr dünne oder austauschbare Seiten überarbeiten Sie oder führen sie mit anderen zusammen.' },

        { t: 'h3', x: '8. Inhalte, die erst per JavaScript erscheinen' },
        { t: 'p', x: '**So erkennen Sie es:** Der Text, den Sie auf der Seite sehen, fehlt im Quelltext („Seitenquelltext anzeigen“ im Browser). Er wird erst nachgeladen.' },
        { t: 'p', x: '**Lösung:** Google kann JavaScript verarbeiten, die Seite kann aber länger auf das Rendern warten. Google empfiehlt weiterhin serverseitiges Rendering oder Pre-Rendering, weil die Website dadurch für Nutzer und Crawler schneller wird. Wichtige Texte und Links gehören ins HTML.' },

        { t: 'h3', x: '9. Manuelle Maßnahme oder Sicherheitsproblem' },
        { t: 'p', x: '**So erkennen Sie es:** In der Search Console melden die Berichte „Manuelle Maßnahmen“ oder „Sicherheitsprobleme“ einen Eintrag. Eine manuelle Maßnahme wendet Google an, wenn eine Prüferin oder ein Prüfer feststellt, dass Seiten gegen die Spamrichtlinien verstoßen. Dann können die ganze Website oder einzelne Seiten aus den Suchergebnissen verschwinden. Sicherheitsprobleme betreffen etwa gehackte Websites.' },
        { t: 'p', x: '**Lösung:** Lesen Sie die Meldung, beheben Sie die Ursache, zum Beispiel eingeschleusten Spam, und lassen Sie die Website danach in der Search Console erneut überprüfen.' },

        { t: 'h3', x: '10. Relaunch oder Umzug ohne Weiterleitungen' },
        { t: 'p', x: '**So erkennen Sie es:** Nach einem Relaunch oder Domainwechsel liefern die alten Adressen Fehler (404), und die Sichtbarkeit bricht ein.' },
        { t: 'p', x: '**Lösung:** Leiten Sie jede alte Adresse per 301-Weiterleitung auf die passende neue Seite um, aktualisieren Sie interne Links und behalten Sie die Weiterleitungen laut Google möglichst lange bei, generell mindestens ein Jahr. Beispiele finden Sie im Ratgeber [Defekte Links finden und beheben](/ratgeber/defekte-links-finden-beheben).' },
      ],
    },
    {
      id: 'index-schritte',
      h2: 'Schritt 2: So bringen Sie Ihre Seiten in den Index',
      blocks: [
        {
          t: 'steps',
          items: [
            { h: 'Blockaden entfernen', x: 'Prüfen Sie noindex, robots.txt, Canonical, Passwortschutz und Wartungsmodus. Das ist der wirksamste Schritt.' },
            { h: 'Sitemap bereitstellen', x: 'Eine Sitemap listet Ihre wichtigen Seiten auf. Laut Google ist sie nicht zwingend erforderlich, hilft aber beim Entdecken von Seiten. WordPress erzeugt seit Version 5.5 selbst eine unter `/wp-sitemap.xml`; SEO-Plugins legen häufig eine eigene an. Reichen Sie in der Search Console unter „Sitemaps“ die vollständige Adresse einschließlich `https://` ein.' },
            { h: 'Wichtige Seiten prüfen und Indexierung beantragen', x: 'Prüfen Sie Startseite und wichtigste Leistungsseiten mit der URL-Prüfung und beantragen Sie die Indexierung. Laut Google dauert sie normalerweise nur einen Tag, in manchen Fällen länger; eine Garantie gibt es nicht. Für Anfragen gilt ein Tageslimit, und mehrfaches Einreichen derselben Adresse beschleunigt nichts.' },
            { h: 'Interne Links setzen', x: 'Jede wichtige Seite sollte aus dem Menü oder von passenden Seiten erreichbar sein. Verwenden Sie Linktexte, die das Ziel beschreiben, statt „hier klicken“.' },
            { h: 'Verweise von außen gewinnen', x: 'Da Google Seiten hauptsächlich über Links findet, helfen echte Verweise: Ihr Google-Unternehmensprofil, Einträge in Branchen- und Kammerverzeichnissen, Partnerseiten, Vereine und Verbände, regionale Medien. Kaufen Sie keine Links: Gekaufte Links gelten bei Google als Link-Spam.' },
            { h: 'Geduld und Kontrolle', x: 'Warten Sie nach Änderungen einige Wochen, bevor Sie urteilen. Google selbst nennt Zeiträume von wenigen Stunden bis zu mehreren Monaten. Kontrollieren Sie den Bericht zur Seitenindexierung nach ein bis zwei Wochen und danach monatlich.' },
          ],
        },
      ],
    },
    {
      id: 'lokal',
      h2: 'Lokal gefunden werden: Das Google-Unternehmensprofil',
      blocks: [
        { t: 'p', x: 'Für Suchen mit Ortsbezug, etwa „Elektriker Leipzig“, kann neben Websites das Google-Unternehmensprofil in der Suche und in Google Maps erscheinen. Sie können es laut Google kostenlos hinzufügen oder beanspruchen. Es ersetzt die Indexierung Ihrer Website nicht, ergänzt sie aber.' },
        {
          t: 'ul',
          items: [
            'Tragen Sie Name, Adresse, Telefonnummer, Öffnungszeiten und Leistungen vollständig und korrekt ein.',
            'Verwenden Sie Name, Adresse und Telefonnummer so, wie sie auch auf Ihrer Website und im Impressum stehen.',
            'Tragen Sie die Adresse Ihrer Website ein. Sie ist ein weiterer Verweis, über den Besucher Sie finden.',
            'Halten Sie die Angaben aktuell, etwa bei Urlaub oder geänderten Öffnungszeiten.',
          ],
        },
      ],
    },
    {
      id: 'ranking',
      h2: 'Indexiert, aber kaum zu finden: Was beim Ranking zählt',
      blocks: [
        { t: 'p', x: 'Ist die Seite im Index, steht aber bei den Suchbegriffen Ihrer Kunden weit hinten, liegt es selten an einem technischen Fehler. Dann geht es um Inhalt, Relevanz und Vertrauen. Google richtet seine Ranking-Systeme nach eigenen Angaben darauf aus, hilfreiche und vertrauenswürdige Informationen für Nutzer zu bevorzugen.' },
        {
          t: 'ul',
          items: [
            '**Eine Seite pro Leistung:** Jede Leistung bekommt eine eigene Seite mit eigenem Titel und eigenem Text, statt alles auf der Startseite zu bündeln.',
            '**Die Sprache Ihrer Kunden:** Schreiben Sie so, wie Ihre Kunden suchen, und nennen Sie Ort und Einzugsgebiet, wenn Sie lokal arbeiten.',
            '**Aussagekräftiger Titel:** Jede Seite braucht einen eigenen `<title>`, der in wenigen Worten sagt, worum es geht. Er erscheint häufig als Überschrift im Suchergebnis.',
            '**Belege für Vertrauen:** vollständiges Impressum, erreichbare Kontaktdaten, echte Referenzen und Bewertungen. Wer hinter dem Angebot steht, sollte erkennbar sein.',
            '**Technik in Ordnung:** Mobile Ansicht, Ladezeit und funktionierende Links sind Grundlagen. Mehr dazu in den Ratgebern [Website mobil optimieren](/ratgeber/website-mobil-optimieren) und [Website lädt langsam](/ratgeber/website-laedt-langsam).',
          ],
        },
        { t: 'note', kind: 'warn', title: 'Vorsicht bei Garantien', x: 'Niemand kann Ihnen laut Google eine Platzierung an erster Stelle garantieren. Seien Sie skeptisch bei Anbietern, die Rankings garantieren oder einen Sonderzugang zu Google behaupten. Google nimmt kein Geld für die Aufnahme in die organische Suche oder für ein besseres Ranking.' },
      ],
    },
    {
      id: 'vermeiden',
      h2: 'Was Sie vermeiden sollten',
      blocks: [
        {
          t: 'ul',
          items: [
            'Dieselbe Adresse immer wieder zur Indexierung einreichen: Das beschleunigt laut Google nichts und verbraucht das Tageslimit.',
            'Links kaufen oder in Linkpaketen tauschen: Gekaufte Links gelten bei Google als Link-Spam.',
            'Inhalte von anderen Seiten kopieren oder viele Seiten mit nahezu identischem Text anlegen, die sich nur im Ortsnamen unterscheiden. Solche Seiten dienen eher dem Ranking als den Besuchern, und Google führt Scraping und massenhaft erzeugte Inhalte in seinen Spamrichtlinien auf.',
            'Eine Website ohne Weiterleitungen umziehen.',
            'Beim Testen `noindex` setzen und beim Livegang vergessen, es zu entfernen.',
          ],
        },
      ],
    },
    {
      id: 'hilfe',
      h2: 'Wann Sie Hilfe holen sollten',
      blocks: [
        { t: 'p', x: 'Hilfe lohnt sich, wenn Sie nach den Schritten oben keine Ursache finden, wenn die Sichtbarkeit nach einem Relaunch eingebrochen ist oder wenn die Search Console Sicherheitsprobleme oder manuelle Maßnahmen meldet.' },
        { t: 'note', kind: 'info', title: 'Was unsere kostenlose Prüfung dazu zeigt', x: 'Die [kostenlose Website-Prüfung](/website-check?lang=de) sieht von außen, ob die Startseite per noindex ausgeschlossen ist, ob die robots.txt die gesamte Website sperrt, ob Titel und Beschreibung fehlen und ob eine Sitemap auffindbar ist. Ob Google eine Seite tatsächlich indexiert hat und wo sie in der Suche steht, sehen nur Sie in der Search Console.' },
        { t: 'p', x: 'Kleine SEO-Korrekturen gehören zu unserer [Schnellreparatur](/website-repair?lang=de) ({price.quick}, {time.quick}). Kommen mehrere Probleme zusammen, passt die Website-Reparatur ({price.repair}). Beide Preise verstehen sich netto zzgl. 19 % USt. Eine bestimmte Platzierung bei Google versprechen wir nicht, denn niemand kann sie garantieren.' },
      ],
    },
  ],
  faq: [
    { q: 'Wie lange dauert es, bis meine neue Website bei Google erscheint?', a: 'Laut Google kann es einige Wochen dauern, bis eine neue Website oder Änderungen an einer bestehenden bemerkt werden. Mit Search Console, Sitemap und Links von anderen Seiten helfen Sie Google beim Finden. Eine feste Zusage gibt es nicht.' },
    { q: 'Warum wird meine Website bei Google nicht angezeigt, obwohl sie online ist?', a: 'Häufige Gründe: Die Website ist noch neu, ein `noindex` oder eine gesperrte `robots.txt` hält sie aus dem Index, oder keine andere Seite verlinkt darauf. Prüfen Sie es mit der URL-Prüfung der Search Console.' },
    { q: 'Was bedeutet „Gefunden – zurzeit nicht indexiert“?', a: 'Google kennt die Adresse, hat die Seite aber noch nicht abgerufen. In vielen Fällen genügt Geduld; hilfreich ist zudem eine gute interne Verlinkung. Wiederholtes Einreichen beschleunigt es laut Google nicht.' },
    { q: 'Was bedeutet „Gecrawlt – zurzeit nicht indexiert“?', a: 'Google hat die Seite abgerufen, aber nicht in den Index aufgenommen. Laut Google kann sie später noch aufgenommen werden, und ein erneutes Einreichen ist nicht nötig. Prüfen Sie, ob die Seite eigenständigen, hilfreichen Inhalt hat und gut verlinkt ist.' },
    { q: 'Muss ich meine Website bei Google anmelden?', a: 'Nein. Google findet Websites automatisch, vor allem über Links. Search Console und Sitemap sind trotzdem sinnvoll: Sie zeigen Probleme und helfen Google beim Entdecken Ihrer Seiten.' },
    { q: 'Reicht das Google-Unternehmensprofil, damit Kunden mich finden?', a: 'Für lokale Suchen ist es ein sinnvoller, kostenloser Kanal. Es ersetzt aber nicht die Indexierung Ihrer Website. Beides ergänzt sich.' },
    { q: 'Kann jemand garantieren, dass ich auf Platz 1 lande?', a: 'Nein. Laut Google kann niemand eine Platzierung an erster Stelle garantieren. Seien Sie skeptisch bei Anbietern, die das versprechen.' },
  ],
  service: 'check',
  related: ['website-selbst-pruefen', 'website-nicht-erreichbar', 'website-laedt-langsam'],
  sources: [
    { label: 'Google: Die drei Phasen der Google Suche', url: 'https://developers.google.com/search/docs/fundamentals/how-search-works?hl=de' },
    { label: 'Google: Bericht zur Seitenindexierung', url: 'https://support.google.com/webmasters/answer/7440203?hl=de' },
    { label: 'Google: URL-Prüftool', url: 'https://support.google.com/webmasters/answer/9012289?hl=de' },
    { label: 'Google: Erneutes Crawling beantragen', url: 'https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl?hl=de' },
    { label: 'Google: Indexierung mit noindex blockieren', url: 'https://developers.google.com/search/docs/crawling-indexing/block-indexing?hl=de' },
    { label: 'Google: Einführung in robots.txt', url: 'https://developers.google.com/search/docs/crawling-indexing/robots/intro?hl=de' },
    { label: 'Google: Der Suchoperator site:', url: 'https://developers.google.com/search/docs/monitor-debug/search-operators/all-search-site?hl=de' },
    { label: 'Google: Die eigene Website bei Google finden lassen', url: 'https://developers.google.com/search/docs/fundamentals/get-on-google?hl=de' },
    { label: 'Google: SEO-Einsteigerleitfaden', url: 'https://developers.google.com/search/docs/fundamentals/seo-starter-guide?hl=de' },
    { label: 'Google: Website-Umzug mit URL-Änderungen', url: 'https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes?hl=de' },
    { label: 'Google: JavaScript-SEO-Grundlagen', url: 'https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics?hl=de' },
    { label: 'Google: Spamrichtlinien', url: 'https://developers.google.com/search/docs/essentials/spam-policies?hl=de' },
    { label: 'Google: Manuelle Maßnahmen', url: 'https://support.google.com/webmasters/answer/9044175?hl=de' },
    { label: 'Google: Brauche ich einen SEO?', url: 'https://developers.google.com/search/docs/fundamentals/do-i-need-seo?hl=de' },
    { label: 'Google: Hilfreiche, vertrauenswürdige Inhalte erstellen', url: 'https://developers.google.com/search/docs/fundamentals/creating-helpful-content?hl=de' },
    { label: 'Google: Unternehmensprofil hinzufügen oder beanspruchen', url: 'https://support.google.com/business/answer/2911778?hl=de' },
    { label: 'WordPress: Einstellungen › Lesen (Sichtbarkeit für Suchmaschinen)', url: 'https://wordpress.org/documentation/article/settings-reading-screen/' },
    { label: 'WordPress: XML-Sitemaps seit Version 5.5', url: 'https://make.wordpress.org/core/2020/07/22/new-xml-sitemaps-functionality-in-wordpress-5-5/' },
  ],
  published: '2026-10-01',
  modified: '2026-10-02',
};
