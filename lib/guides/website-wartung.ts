import type { Guide } from './types';

export const websiteWartung: Guide = {
  lang: 'de',
  slug: 'website-wartung',
  category: 'Technik und Wartung',
  check: 'stack',
  short: 'Website-Wartung: Was dazugehört',
  title: 'Website-Wartung: Aufgaben, Risiken, Kosten',
  h1: 'Website-Wartung: Aufgaben, Risiken und Kostenfaktoren',
  description: 'Was gehört zur Website-Wartung? Aufgaben, Risiken ohne Updates, Selbstpflege oder Dienstleister, Kostenfaktoren und Checkliste für den Wartungsvertrag.',
  teaser: 'Updates, Sicherungen, Überwachung und Tests: was zur Website-Wartung gehört, welche Risiken ohne sie entstehen und wie Sie entscheiden.',
  tldr: [
    'Eine Website ist kein fertiges Produkt: CMS, Plugins, Server-Software und Zertifikate veralten laufend. Ohne Wartung wachsen die Risiken für Sicherheit, Ausfälle und Datenverlust.',
    'Nach dem Bericht des Sicherheitsanbieters Patchstack entfielen 2025 etwa 91 % der neu gemeldeten WordPress-Schwachstellen auf Plugins und nur 6 auf den WordPress-Kern. Plugin-Updates gehören deshalb zu den wichtigsten Wartungsaufgaben.',
    'Zur Wartung gehören Updates, Sicherungen mit Wiederherstellungstest, Überwachung von Erreichbarkeit und Sicherheit, Link- und Formulartests, die PHP-Version und ein regelmäßiger Gesamtcheck.',
    'Ob Sie selbst warten, den Hoster nutzen oder einen Dienstleister beauftragen, ist eine Frage von Zeit, Wissen und Risiko. Ein Wartungsvertrag sollte Leistungen, Reaktionszeiten und Datenschutz klar regeln.',
  ],
  intro: [
    'Viele Websites laufen jahrelang unbemerkt, bis ein Plugin-Update fehlt, ein Zertifikat abläuft oder nach einem Serverwechsel das Formular nichts mehr sendet. Wartung ist die unspektakuläre Routine, die genau das verhindert.',
    'Dieser Ratgeber zeigt, welche Aufgaben dazugehören, welche Risiken ohne Wartung entstehen, wie Sie zwischen Selbstpflege, Hoster und Dienstleister entscheiden und worauf Sie in einem Wartungsvertrag achten sollten.',
  ],
  sections: [
    {
      id: 'warum',
      h2: 'Warum eine Website Wartung braucht',
      blocks: [
        { t: 'p', x: 'Eine Website besteht aus mehreren Bausteinen, die sich unabhängig voneinander verändern: das Content-Management-System (zum Beispiel WordPress), Themes und Plugins, die Server-Software mit PHP und Datenbank, das HTTPS-Zertifikat, Domain und DNS sowie externe Dienste. Jeder Baustein bekommt Updates oder läuft irgendwann aus.' },
        {
          t: 'table',
          caption: 'Die Bausteine einer Website und ihr Wartungsbedarf',
          head: ['Baustein', 'Was sich ändert', 'Folge ohne Wartung'],
          rows: [
            ['CMS, zum Beispiel WordPress', 'Regelmäßig neue Versionen und Sicherheitsupdates', 'Bekannte Lücken bleiben offen. Laut WordPress ist offiziell nur die jeweils neueste Version unterstützt.'],
            ['Plugins und Themes', 'Häufige Updates, gelegentlich Sicherheitslücken', 'Die meisten bekannten Schwachstellen stecken in Erweiterungen (siehe unten).'],
            ['PHP-Version auf dem Server', 'Versionen laufen aus dem Support', 'Keine Sicherheitsupdates mehr; neuere Plugins verlangen neuere Versionen.'],
            ['HTTPS-Zertifikat', 'Läuft ab, die Laufzeiten werden kürzer', 'Browser-Warnung, Besucher springen ab. Mehr dazu im Ratgeber [HTTPS und SSL-Fehler](/ratgeber/https-ssl-fehler-beheben).'],
            ['Domain und DNS', 'Verlängerung, Änderungen beim Anbieter', 'Website und E-Mail sind nicht erreichbar.'],
            ['Sicherungen', 'Sollten regelmäßig laufen und getestet werden', 'Nach einem Defekt oder Angriff gibt es keinen Weg zurück zum letzten guten Stand.'],
            ['Formulare, Links, Inhalte', 'Ändern sich mit jedem Umbau', 'Anfragen gehen verloren, Links laufen ins Leere, Angaben sind veraltet.'],
          ],
        },
      ],
    },
    {
      id: 'risiken',
      h2: 'Die größten Risiken ohne Wartung',
      blocks: [
        { t: 'h3', x: 'Sicherheitslücken in Plugins' },
        { t: 'p', x: 'Der Sicherheitsanbieter Patchstack zählt in seinem Bericht „State of WordPress Security in 2026“ (Februar 2026) für das Jahr 2025 insgesamt 11.334 neue Schwachstellen im WordPress-Umfeld, 42 % mehr als 2024. Davon entfielen 91 % auf Plugins und 9 % auf Themes; im WordPress-Kern wurden nur 6 gemeldet. Bei 46 % gab es zum Zeitpunkt der Veröffentlichung noch keine Korrektur des Entwicklers. Bei den am stärksten ausgenutzten Lücken lag die mittlere Zeit bis zum ersten Angriff bei etwa fünf Stunden.' },
        { t: 'p', x: 'Das heißt nicht, dass jede Website angegriffen wird. Es heißt, dass die am stärksten ausgenutzten Lücken oft binnen Stunden angegriffen werden und dass „später aktualisieren“ ein Risiko ist. WordPress aktualisiert kleinere Kernversionen mit Sicherheitskorrekturen standardmäßig selbst. Plugins und Themes werden dagegen nur in Ausnahmefällen für kritische Sicherheitslücken automatisch aktualisiert und müssen sonst von Ihnen oder Ihrem Dienstleister betreut werden.' },
        { t: 'h3', x: 'Eine veraltete PHP-Version' },
        { t: 'p', x: 'PHP ist die Programmiersprache, auf der WordPress und viele andere Systeme laufen. Nach der Übersicht der unterstützten Versionen auf php.net (Stand: Oktober 2026) erhält PHP 8.2 noch bis zum 31. Dezember 2026 Sicherheitskorrekturen, PHP 8.3 bis zum 31. Dezember 2027, PHP 8.4 bis zum 31. Dezember 2028 und PHP 8.5 bis zum 31. Dezember 2029. PHP 8.1 und ältere Versionen werden nicht mehr unterstützt.' },
        { t: 'p', x: 'Fragen Sie Ihren Hoster, welche PHP-Version Ihre Website nutzt, und planen Sie den Wechsel auf eine unterstützte Version rechtzeitig. Testen Sie ihn zuerst auf einer Kopie der Website: Ältere Themes und Plugins laufen auf neueren PHP-Versionen nicht immer fehlerfrei.' },
        { t: 'h3', x: 'Ausfälle und abgelaufene Zertifikate' },
        { t: 'p', x: 'Ohne Überwachung erfahren Sie von einem Ausfall oft erst durch einen Kunden. Auch ein abgelaufenes Zertifikat oder eine nicht verlängerte Domain fällt häufig erst auf, wenn Besucher eine Warnung sehen oder die Seite nicht mehr lädt. Wie Sie solche Fälle erkennen, steht im Ratgeber [Website nicht erreichbar](/ratgeber/website-nicht-erreichbar).' },
        { t: 'h3', x: 'Datenverlust ohne brauchbare Sicherung' },
        { t: 'p', x: 'Eine Sicherung, die auf demselben Server liegt wie die Website, hilft nicht, wenn der Server ausfällt oder die Website gehackt wird. Als Faustregel gilt „3-2-1“: drei Kopien Ihrer Daten, auf zwei verschiedenen Speichermedien, davon eine an einem anderen Ort. Entscheidend ist außerdem, dass die Wiederherstellung getestet wurde. Eine Sicherung, die sich nicht einspielen lässt, ist keine.' },
      ],
    },
    {
      id: 'aufgaben',
      h2: 'Diese Aufgaben gehören zur Wartung',
      blocks: [
        {
          t: 'table',
          caption: 'Wartungsaufgaben und empfohlener Rhythmus',
          head: ['Aufgabe', 'Rhythmus', 'Was dabei geprüft wird'],
          rows: [
            ['Updates für CMS, Plugins und Themes', 'Laufend, mindestens monatlich', 'Sicherheitsupdates zeitnah einspielen; vorher sichern, nachher die Funktionen testen'],
            ['Sicherung mit Wiederherstellungstest', 'Automatisch; Test regelmäßig, etwa vierteljährlich', 'Sicherung vorhanden, aktuell und außerhalb des Servers gespeichert'],
            ['Erreichbarkeit überwachen', 'Laufend', 'Meldung bei Ausfall, damit Sie nicht von Kunden davon erfahren'],
            ['Grundlegende Sicherheitsprüfung', 'Monatlich', 'Nicht benötigte Plugins und Benutzerkonten entfernen, starke Passwörter, Warnmeldungen'],
            ['Formulartest', 'Monatlich', 'Testnachricht kommt an, siehe Ratgeber [Kontaktformular funktioniert nicht](/ratgeber/kontaktformular-funktioniert-nicht)'],
            ['Link-Kontrolle', 'Monatlich', 'Defekte Links und Weiterleitungen, siehe Ratgeber [Defekte Links finden und beheben](/ratgeber/defekte-links-finden-beheben)'],
            ['Ladezeit und mobile Ansicht', 'Vierteljährlich', 'Messwerte, Menü und Schaltflächen auf dem Handy, siehe Ratgeber [Website lädt langsam](/ratgeber/website-laedt-langsam)'],
            ['Zertifikat, Domain, PHP-Version', 'Jährlich und bei Ablaufwarnung', 'Ablaufdaten und Support-Ende im Blick behalten'],
            ['Inhalte und Impressum', 'Mindestens jährlich', 'Angaben aktuell? Siehe Ratgeber [Impressum: Pflichtangaben](/ratgeber/impressum-pflichtangaben)'],
          ],
        },
      ],
    },
    {
      id: 'wer',
      h2: 'Selbst machen, Hoster oder Dienstleister?',
      blocks: [
        {
          t: 'table',
          caption: 'Drei Wege zur Wartung',
          head: ['Möglichkeit', 'Passt, wenn', 'Worauf Sie achten sollten'],
          rows: [
            ['Selbst warten', 'Sie das Systemwissen haben und einen festen Termin pro Monat einhalten.', 'Sicherung und Wiederherstellung testen; bei geschäftskritischen Websites Updates zuerst auf einer Kopie prüfen.'],
            ['Leistungen des Hosters', 'Ihr Tarif automatische Updates und Sicherungen enthält.', 'In der Leistungsbeschreibung nachlesen, was genau abgedeckt ist. Manche Angebote umfassen nur Server und CMS, nicht aber Plugins, Formulare oder Funktionstests.'],
            ['Dienstleister mit Wartungsvertrag', 'Sie wenig Zeit oder Wissen haben und eine feste Ansprechperson möchten.', 'Leistungen, Reaktionszeiten, Berichte, Kündigungsfrist und Datenschutz klar im Vertrag regeln.'],
          ],
        },
      ],
    },
    {
      id: 'kosten',
      h2: 'Was Wartung kostet: die Kostenfaktoren',
      blocks: [
        { t: 'p', x: 'Pauschale Marktpreise nennen wir hier nicht, denn sie hängen stark vom Einzelfall ab. Diese Faktoren bestimmen den Aufwand:' },
        {
          t: 'ul',
          items: [
            '**Umfang und Komplexität:** Anzahl der Plugins, individuelle Anpassungen, Shop- oder Buchungsfunktionen.',
            '**Zustand der Website:** Sind CMS, Plugins und PHP-Version veraltet, ist zuerst eine Bereinigung nötig, bevor die laufende Wartung beginnt.',
            '**Reaktionszeit und Erreichbarkeit:** Wie schnell soll bei einem Ausfall jemand handeln?',
            '**Hosting-Umgebung:** Zugang zum Server, Möglichkeit für eine Testkopie, Art der Sicherungen.',
            '**Zusatzleistungen:** kleine Änderungen, Berichte, Sicherheitsüberwachung.',
          ],
        },
        { t: 'p', x: 'Unsere [Website-Pflege](/website-care?lang=de) kostet {price.care}. Sie umfasst die Überwachung der Erreichbarkeit, Updates für CMS und Plugins, die Datensicherung (sofern das Hosting es zulässt), grundlegende Sicherheitsprüfungen, die Kontrolle auf kaputte Links, einen monatlichen Website-Check mit kurzem Bericht und kleine Änderungen im festgelegten Umfang. Sie folgt in der Regel auf die kostenlose Prüfung und nötige Reparaturen. Der Preis versteht sich netto zzgl. 19 % USt.' },
      ],
    },
    {
      id: 'vertrag',
      h2: 'Worauf Sie im Wartungsvertrag achten sollten',
      blocks: [
        {
          t: 'ol',
          items: [
            '**Leistungsumfang schriftlich:** Welche Updates, welche Sicherungen, wie oft, welche Berichte?',
            '**Reaktionszeiten:** Wann meldet sich der Dienstleister bei einem Ausfall, und über welchen Weg?',
            '**Kleine Änderungen:** Wie groß ist das enthaltene Kontingent, und wie wird darüber hinausgehender Aufwand abgerechnet?',
            '**Zugänge:** Wer hat welche Zugangsdaten? Vereinbaren Sie eigene Benutzerkonten statt gemeinsamer Passwörter und die Rückgabe bei Vertragsende.',
            '**Sicherungen:** Wo liegen sie, wie lange werden sie aufbewahrt, und wer testet die Wiederherstellung?',
            '**Datenschutz:** Hat der Dienstleister Zugriff auf personenbezogene Daten, etwa Formular-Einträge oder Kundenkonten, ist in der Regel ein Vertrag zur Auftragsverarbeitung nach Art. 28 DSGVO erforderlich.',
            '**Grenzen der Leistung:** Was ist nicht enthalten, zum Beispiel Redesign, neue Funktionen oder die Bereinigung nach einem Angriff?',
            '**Laufzeit und Kündigung:** Mindestlaufzeit, Kündigungsfrist, Übergabe der Unterlagen.',
            '**Eigentum:** Domain, Hosting-Vertrag und Inhalte bleiben auf Ihren Namen.',
          ],
        },
      ],
    },
    {
      id: 'routine',
      h2: 'Monatliche Routine für die Selbstpflege',
      blocks: [
        {
          t: 'ol',
          items: [
            'Startseite und zwei Unterseiten am Computer und auf dem Handy öffnen.',
            'Das Kontaktformular mit einer fremden Adresse testen.',
            'Im Verwaltungsbereich ausstehende Updates prüfen und nach einer Sicherung einspielen.',
            'Datum und Größe der letzten Sicherung kontrollieren, regelmäßig eine Wiederherstellung testen.',
            'Ablaufdaten von Zertifikat und Domain ansehen.',
            'In der Search Console auf neue Fehlermeldungen achten.',
            'Nicht mehr benötigte Plugins, Themes und Benutzerkonten löschen.',
          ],
        },
      ],
    },
    {
      id: 'hilfe',
      h2: 'Was unsere kostenlose Prüfung zur Technik zeigt',
      blocks: [
        { t: 'p', x: 'Die [kostenlose Website-Prüfung](/website-check?lang=de) notiert Hinweise, die von außen sichtbar sind, zum Beispiel das erkennbare CMS, die jQuery-Version und die PHP-Version, soweit der Server sie preisgibt, und weist auf veraltete Versionen hin. Was hinter dem Login passiert, etwa welche Plugins ausstehende Updates haben oder ob Sicherungen laufen, sehen wir ohne zusätzlichen Zugang nicht.' },
        { t: 'p', x: 'Wenn Sie wissen möchten, in welchem Zustand Ihre Website ist, ist die Prüfung der erste Schritt. Die Wartung folgt danach, wenn Sie sie wünschen.' },
      ],
    },
  ],
  faq: [
    { q: 'Wie oft sollte eine Website gewartet werden?', a: 'Sicherheitsupdates sollten zeitnah eingespielt werden, übrige Updates mindestens monatlich. Eine Sicherung sollte automatisch laufen, die Wiederherstellung regelmäßig getestet werden. Erreichbarkeit und Zertifikate überwachen Sie laufend.' },
    { q: 'Reicht es, WordPress automatisch aktualisieren zu lassen?', a: 'Nur teilweise. WordPress aktualisiert kleinere Kernversionen standardmäßig selbst. Plugins und Themes werden dagegen nur in Ausnahmefällen für kritische Sicherheitslücken automatisch aktualisiert. Zudem prüft die Automatik nicht, ob Formulare, Menü und Inhalte danach noch funktionieren.' },
    { q: 'Brauche ich einen Wartungsvertrag?', a: 'Nicht zwingend. Entscheidend ist, dass jemand die Aufgaben regelmäßig erledigt: Sie selbst, Ihr Hoster oder ein Dienstleister. Ein Vertrag lohnt sich, wenn Sie wenig Zeit oder Wissen haben und feste Zuständigkeiten möchten.' },
    { q: 'Was passiert, wenn ich meine Website nicht warte?', a: 'Oft läuft sie lange unauffällig. Mit der Zeit steigen aber die Risiken: bekannte Sicherheitslücken, nicht mehr unterstützte PHP-Versionen, abgelaufene Zertifikate, defekte Formulare. Probleme fallen dann häufig erst auf, wenn Besucher sie bemerken.' },
    { q: 'Welche PHP-Version sollte meine Website nutzen?', a: 'Eine, die noch Sicherheitsupdates erhält. Laut php.net sind das im Oktober 2026 die Versionen 8.2 (nur noch bis zum 31. Dezember 2026), 8.3, 8.4 und 8.5. Testen Sie den Wechsel zuerst auf einer Kopie.' },
    { q: 'Brauche ich bei einem Dienstleister einen Auftragsverarbeitungsvertrag?', a: 'In der Regel ja, wenn der Dienstleister Zugriff auf personenbezogene Daten Ihrer Website hat, etwa Formular-Einträge oder Kundenkonten (Art. 28 DSGVO). Das ist keine Rechtsberatung; Einzelfragen klären Sie mit einer fachkundigen Stelle.' },
  ],
  service: 'care',
  related: ['wordpress-kritischer-fehler-beheben', 'website-nicht-erreichbar', 'website-selbst-pruefen'],
  sources: [
    { label: 'Patchstack: State of WordPress Security in 2026', url: 'https://patchstack.com/whitepaper/state-of-wordpress-security-in-2026/' },
    { label: 'PHP: Unterstützte Versionen', url: 'https://www.php.net/supported-versions.php' },
    { label: 'WordPress.org: Sicherheit und unterstützte Versionen', url: 'https://wordpress.org/about/security/' },
    { label: 'WordPress: Automatische Hintergrund-Updates', url: 'https://developer.wordpress.org/advanced-administration/upgrade/upgrading/' },
    { label: 'Art. 28 DSGVO: Auftragsverarbeiter', url: 'https://dejure.org/gesetze/DSGVO/28.html' },
  ],
  published: '2026-10-01',
  modified: '2026-10-01',
};
