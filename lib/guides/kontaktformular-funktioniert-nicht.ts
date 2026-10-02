import type { Guide } from './types';

export const kontaktformularFunktioniertNicht: Guide = {
  lang: 'de',
  slug: 'kontaktformular-funktioniert-nicht',
  category: 'Formulare',
  check: 'forms',
  short: 'Kontaktformular funktioniert nicht',
  title: 'Kontaktformular funktioniert nicht: Ursachen',
  h1: 'Kontaktformular funktioniert nicht: Warum E-Mails nicht ankommen',
  description: 'Anfragen über das Kontaktformular kommen nicht an? Die häufigsten Ursachen, von PHP mail() bis SPF und DKIM, und wie Sie das Problem dauerhaft beheben.',
  teaser: 'Das Formular meldet „Gesendet“, im Postfach bleibt es leer: sieben Ursachen, ein Test in zehn Minuten und die dauerhafte Lösung.',
  tldr: [
    'Eine Erfolgsmeldung im Formular beweist nicht, dass die Nachricht angekommen ist. Sie bestätigt meist nur, dass der Server die E-Mail zum Versand angenommen hat.',
    'Häufige Ursachen sind der Versand über die einfache PHP-Funktion `mail()` und eine Absenderadresse, die nicht zu Ihrer Domain gehört. E-Mail-Anbieter behandeln solche Nachrichten als verdächtig.',
    'Zuverlässig wird der Versand mit einem eigenen Absenderpostfach auf Ihrer Domain, Versand per SMTP und den DNS-Einträgen SPF, DKIM und DMARC.',
    'Speichern Sie Nachrichten zusätzlich auf der Website und testen Sie das Formular mindestens einmal im Monat mit einer fremden Adresse.',
  ],
  intro: [
    'Ein Kontaktformular, das keine Nachrichten liefert, ist schlimmer als gar keines: Besucher glauben, sie hätten sich gemeldet, und Sie erfahren nie davon. Das Tückische daran: Es fällt nicht auf. Die Seite zeigt „Vielen Dank“, und im Postfach bleibt es still.',
    'Dieser Ratgeber zeigt, wie Sie in zehn Minuten testen, ob Ihr Formular funktioniert, wie Sie die sieben häufigsten Ursachen erkennen und wie Sie den Versand dauerhaft zuverlässig einrichten. Die technischen Schritte können Sie an Ihren Hoster oder Webentwickler weitergeben.',
  ],
  sections: [
    {
      id: 'test',
      h2: 'Erst testen: Kommt die Nachricht wirklich an?',
      blocks: [
        { t: 'p', x: 'Verlassen Sie sich nicht auf die Erfolgsmeldung der Seite. Prüfen Sie den ganzen Weg bis ins Postfach.' },
        {
          t: 'steps',
          items: [
            { h: 'Mit fremder Adresse ausfüllen', x: 'Füllen Sie das Formular mit einer Adresse eines anderen Anbieters aus, zum Beispiel einem privaten GMX-, WEB.DE- oder Gmail-Konto. Nehmen Sie nicht die Empfängeradresse selbst: Dann bleibt ein Fehler bei der Absenderadresse unentdeckt.' },
            { h: 'Postfach und Spam-Ordner prüfen', x: 'Warten Sie bis zu 15 Minuten. Schauen Sie im Posteingang, im Spam-Ordner und in eventuellen Quarantäne- oder Filterordnern nach.' },
            { h: 'Absender-Prüfung ansehen', x: 'Kommt die Nachricht an, sehen Sie sich die Prüfergebnisse im Kopf der Nachricht an. In Gmail öffnen Sie dazu „Original anzeigen“; andere Anbieter zeigen die Kopfzeilen („Header“) unter ähnlichen Namen. Dort stehen unter anderem die Ergebnisse für SPF, DKIM und DMARC (PASS oder FAIL).' },
            { h: 'Auf Fehler beim Absenden achten', x: 'Öffnen Sie vor dem Absenden die Entwicklerwerkzeuge (`F12`) und den Reiter „Netzwerk“. Scheitert die Anfrage beim Absenden mit einem Statuscode wie 403, 404 oder 500, liegt das Problem schon im Formular selbst.' },
            { h: 'Zweite Empfängeradresse testen', x: 'Tragen Sie testweise eine weitere Empfängeradresse bei einem anderen Anbieter ein. Kommt die Nachricht dort an, liegt es an Ihrem eigenen Postfach, seinen Filtern oder Weiterleitungen.' },
          ],
        },
        {
          t: 'table',
          caption: 'Beobachtung und wahrscheinliche Ursache',
          head: ['Beobachtung', 'Wahrscheinliche Ursache', 'Mehr dazu'],
          rows: [
            ['Fehlermeldung beim Absenden oder Fehlercode im Netzwerk-Reiter', 'Das Formular selbst ist gestört: Plugin, Skript, Firewall oder Spam-Schutz', 'Ursachen 5 bis 7'],
            ['Erfolgsmeldung, aber nichts im Postfach und nichts im Spam', 'Der Server versendet nicht, oder die Nachricht wird unterwegs abgewiesen', 'Ursachen 1 bis 3'],
            ['Die Nachricht liegt im Spam-Ordner', 'Absender nicht authentifiziert oder fremde Absenderadresse', 'Ursachen 2 und 3'],
            ['Test mit Adresse A kommt an, mit Adresse B nicht', 'Das Formular nutzt die Adresse des Besuchers als Absender; der Anbieter von B ist strenger', 'Ursache 2'],
            ['Kommt bei einer Empfängeradresse an, bei der anderen nicht', 'Postfach, Filter oder Weiterleitung', 'Ursache 4'],
          ],
        },
      ],
    },
    {
      id: 'ursachen',
      h2: 'Die sieben häufigsten Ursachen',
      blocks: [
        { t: 'h3', x: '1. Versand über die einfache PHP-Funktion mail()' },
        { t: 'p', x: 'Ohne weitere Einrichtung verschicken viele Formulare ihre E-Mails über die Funktion `mail()` des Webservers. WordPress macht das standardmäßig ebenso. Das Problem: Die Funktion meldet „erfolgreich“, sobald der Server die Nachricht annimmt. Das PHP-Handbuch weist ausdrücklich darauf hin, dass dies nicht bedeutet, dass die Nachricht den Empfänger erreicht. Auch die WordPress-Dokumentation stellt klar, dass ein positiver Rückgabewert von `wp_mail()` nur heißt, dass die Anfrage ohne Fehler verarbeitet wurde.' },
        { t: 'p', x: 'Hinzu kommt: Der Webserver ist für Ihre Domain oft nicht als berechtigter Absender eingetragen (siehe Ursache 3), und manche Hosting-Tarife beschränken den Versand oder schalten `mail()` ab. Fragen Sie Ihren Hoster, ob der Versand erlaubt ist und welche Grenzen gelten.' },

        { t: 'h3', x: '2. Die Absenderadresse gehört nicht zu Ihrer Domain' },
        { t: 'p', x: 'Viele Formulare tragen als Absender (`From`) die Adresse ein, die der Besucher angegeben hat. Für den empfangenden Server sieht das so aus, als hätte Ihr Webserver im Namen von `gmx.de` oder `yahoo.com` eine Nachricht verschickt. Das ist genau das Muster von Fälschungen: Ihr Server ist für diese Domains nicht als Absender eingetragen, deshalb schlägt die Prüfung fehl.' },
        { t: 'p', x: 'Was dann passiert, bestimmt der Anbieter des Besuchers mit seiner DMARC-Richtlinie. Die öffentlichen DNS-Einträge zeigen (Stand: Oktober 2026): Yahoo verlangt `p=reject`, empfangende Server sollen solche Nachrichten also ablehnen. GMX und WEB.DE setzen `p=quarantine`, solche Nachrichten gelten als verdächtig und landen oft im Spam. Gmail, Outlook.com und T-Online nutzen derzeit `p=none`. Deshalb bleibt der Fehler oft unbemerkt: Er trifft nur Besucher bestimmter Anbieter, und mit Ihrer eigenen Adresse funktioniert der Test.' },
        { t: 'p', x: 'Die Lösung: Als Absender (`From`) immer eine Adresse auf Ihrer eigenen Domain verwenden und die Adresse des Besuchers als Antwortadresse (`Reply-To`) eintragen. So bleibt „Antworten“ bequem, und die Nachricht besteht die Prüfung.' },
        { t: 'code', label: 'So sollten die Kopfzeilen einer Formular-Nachricht aussehen', x: 'From: Website-Formular <formular@ihre-domain.de>\nTo: info@ihre-domain.de\nReply-To: besucher@beispiel.de' },
        { t: 'p', x: 'Die Absenderadresse sollte ein echtes Postfach Ihrer Domain sein. Eine Adresse, die es nicht gibt, lässt manche Empfänger die Nachricht ablehnen.' },

        { t: 'h3', x: '3. E-Mail-Authentifizierung fehlt oder ist fehlerhaft (SPF, DKIM, DMARC)' },
        { t: 'p', x: 'Mit drei Einträgen im DNS Ihrer Domain weisen Sie nach, dass eine Nachricht wirklich von Ihnen stammt. Ohne sie stufen Empfänger Ihre Nachrichten eher als verdächtig ein. Google verlangt von allen, die an Gmail-Adressen senden, seit dem 1. Februar 2024 mindestens SPF oder DKIM. Wer täglich 5.000 oder mehr Nachrichten an Gmail-Adressen sendet, braucht SPF und DKIM und zusätzlich DMARC. Erfüllen Absender das nicht, werden ihre Nachrichten möglicherweise als Spam markiert oder nicht wie erwartet zugestellt.' },
        { t: 'p', x: 'Wie die Einträge aussehen, zeigt der Abschnitt [SPF, DKIM und DMARC einrichten](/ratgeber/kontaktformular-funktioniert-nicht#dns). Ausführlich, mit Beispielen, Prüfschritten und dem neuen DMARC-Standard von 2026, erklärt es der Ratgeber [SPF, DKIM und DMARC einrichten](/ratgeber/spf-dkim-dmarc-einrichten).' },

        { t: 'h3', x: '4. Empfänger, Postfach oder Filter' },
        {
          t: 'ul',
          items: [
            'Tippfehler in der Empfängeradresse, etwa nach einem Domainwechsel oder bei der Adresse einer ehemaligen Mitarbeiterin oder eines ehemaligen Mitarbeiters.',
            'Das Postfach ist voll oder die Adresse existiert nicht mehr. Die Nachricht kommt dann zurück oder geht verloren.',
            'Regeln, Spam-Filter oder Weiterleitungen im Postfach verschieben oder verwerfen Formularnachrichten.',
            'Bei Homepage-Baukästen steht die Empfängeradresse in den Formulareinstellungen des Baukastens. Nach einem Konto- oder Domainwechsel kann sie veraltet sein.',
          ],
        },

        { t: 'h3', x: '5. Plugin-, Skript- oder Firewall-Konflikte' },
        { t: 'p', x: 'Moderne Formulare senden im Hintergrund per JavaScript, über AJAX oder eine REST-Schnittstelle. Blockiert eine Firewall, ein Sicherheits-Plugin oder ein Caching-Plugin diese Anfrage, oder löst ein anderes Skript einen JavaScript-Fehler aus, passiert beim Klick auf „Senden“ nichts, oder es erscheint eine allgemeine Fehlermeldung. Der Netzwerk-Reiter der Entwicklerwerkzeuge zeigt, welche Anfrage mit welchem Statuscode scheitert.' },
        { t: 'p', x: 'Deaktivieren Sie zum Test nacheinander Plugins aus den Bereichen Sicherheit, Cache und Optimierung, am besten zuerst auf einer Kopie der Website. Legen Sie vorher eine Datensicherung an.' },

        { t: 'h3', x: '6. Spam-Schutz zu streng oder falsch eingerichtet' },
        { t: 'p', x: 'Captcha-Dienste, versteckte Fallenfelder („Honeypot“) und Spam-Filter schützen vor Bots, können aber echte Anfragen blockieren: wenn die Schlüssel eines Captcha-Dienstes nicht (mehr) stimmen, die Prüfung durch Browser-Einstellungen oder Erweiterungen verhindert wird oder ein Filter echte Nachrichten für Spam hält. Prüfen Sie, ob Ihr Plugin als Spam markierte Nachrichten in einer eigenen Ablage sammelt, und kontrollieren Sie die Schlüssel des Captcha-Dienstes.' },

        { t: 'h3', x: '7. Technische Fehler im Formular selbst' },
        {
          t: 'ul',
          items: [
            'Das Formular nutzt `mailto:` als Ziel. Es versendet dann selbst nichts: Je nach Browser öffnet sich ein E-Mail-Programm, oder es passiert nichts.',
            'Das Skript, das die Nachricht verarbeitet, fehlt nach einem Umzug oder läuft mit einer neueren PHP-Version nicht mehr.',
            'Das Formular sendet an eine Adresse mit `http://`, obwohl die Seite per HTTPS geladen wird. Browser warnen davor oder unterbinden das Absenden. Mehr dazu im Ratgeber [HTTPS und SSL-Fehler](/ratgeber/https-ssl-fehler-beheben).',
            'Pflichtfelder oder ein Datenschutz-Häkchen lassen sich auf dem Handy nicht bedienen, etwa weil ein anderes Element darüberliegt. Testen Sie das Formular deshalb auch auf einem Mobilgerät.',
          ],
        },
      ],
    },
    {
      id: 'loesung',
      h2: 'So richten Sie den Versand dauerhaft zuverlässig ein',
      blocks: [
        {
          t: 'ol',
          items: [
            '**Absenderpostfach anlegen:** Richten Sie bei Ihrem Mail-Anbieter ein eigenes Postfach auf Ihrer Domain ein, zum Beispiel `formular@ihre-domain.de`.',
            '**Kopfzeilen richtig setzen:** `From` ist dieses Postfach, `Reply-To` die Adresse aus dem Formularfeld, `To` Ihr Empfangspostfach.',
            '**Per SMTP versenden:** Lassen Sie das Formular die Nachricht über dieses Postfach per SMTP senden statt über `mail()`. Server, Benutzername und Verschlüsselung nennt Ihr Mail-Anbieter. Bei WordPress übernimmt das ein SMTP-Plugin.',
            '**DNS-Einträge prüfen:** SPF, DKIM und DMARC müssen für Ihre Domain eingerichtet sein (siehe unten).',
            '**Nachrichten zusätzlich speichern:** Bei Contact Form 7 übernimmt das etwa das Plugin [Flamingo](https://wordpress.org/plugins/flamingo/); andere Formular-Plugins haben eine eigene Eintragsliste. So geht keine Anfrage verloren, wenn der Versand ausfällt.',
            '**Rückmeldung für Besucher:** Zeigen Sie eine klare Erfolgsmeldung oder eine Dankesseite und bei Fehlern eine verständliche Meldung mit Ihrer E-Mail-Adresse als Ausweg.',
            '**Erneut testen:** Wiederholen Sie den Test mit mindestens zwei fremden Adressen und prüfen Sie, ob SPF, DKIM und DMARC „PASS“ zeigen.',
            '**Dauerhaft kontrollieren:** Tragen Sie sich einen festen Termin ein, das Formular einmal im Monat zu testen, und zusätzlich nach jeder Änderung an Hosting, Domain, Mail-Anbieter oder Plugins.',
          ],
        },
        { t: 'note', kind: 'tip', title: 'Zugänge bereithalten', x: 'Für die Schritte 1 bis 4 brauchen Sie Zugang zu Ihrem Mail-Anbieter und zur DNS-Verwaltung Ihrer Domain. Die DNS-Verwaltung liegt meist beim Domain-Anbieter oder beim Hoster.' },
      ],
    },
    {
      id: 'dns',
      h2: 'SPF, DKIM und DMARC einrichten',
      blocks: [
        { t: 'p', x: 'Die Einträge legen Sie im DNS Ihrer Domain an. Die genauen Werte nennt Ihr Mail-Anbieter; die Beispiele hier sind Platzhalter.' },
        {
          t: 'table',
          caption: 'Die drei Einträge im Überblick',
          head: ['Eintrag', 'Wo im DNS', 'Wofür', 'Beispiel (Platzhalter)'],
          rows: [
            ['SPF', 'TXT-Eintrag bei `ihre-domain.de`', 'Legt fest, welche Server für Ihre Domain E-Mails senden dürfen', '`v=spf1 include:spf.mailanbieter.example ~all`'],
            ['DKIM', 'TXT-Eintrag bei `selektor._domainkey.ihre-domain.de`', 'Digitale Signatur: belegt, dass die Nachricht von Ihrer Domain stammt und unterwegs nicht verändert wurde', 'Selektor und Schlüssel liefert Ihr Mail-Anbieter'],
            ['DMARC', 'TXT-Eintrag bei `_dmarc.ihre-domain.de`', 'Legt fest, was mit Nachrichten geschieht, die SPF und DKIM nicht bestehen, und aktiviert Berichte', '`v=DMARC1; p=none; rua=mailto:dmarc@ihre-domain.de`'],
          ],
        },
        {
          t: 'ul',
          items: [
            'Pro Domain darf es nur einen SPF-Eintrag geben. Mehrere Einträge führen nach dem Standard (RFC 7208) zu einem Fehler. Tragen Sie alle Versender in einen gemeinsamen Eintrag ein.',
            'SPF erlaubt höchstens zehn DNS-Abfragen (`include`, `a`, `mx` und weitere zählen mit). Zu viele Dienste in einem Eintrag machen ihn ungültig.',
            'Beginnen Sie bei DMARC mit `p=none`: Die Richtlinie beobachtet nur und liefert Berichte. Wenn die Berichte sauber sind, lässt sie sich auf `quarantine` oder `reject` verschärfen.',
          ],
        },
        { t: 'note', kind: 'warn', title: 'Erst prüfen, wer in Ihrem Namen sendet', x: 'Ändern Sie SPF und DMARC nur, wenn Sie wissen, welche Dienste bisher E-Mails mit Ihrer Domain versenden, etwa Newsletter-Tool, Rechnungsprogramm oder CRM. Sonst können deren Nachrichten plötzlich nicht mehr ankommen.' },
      ],
    },
    {
      id: 'datenschutz',
      h2: 'Datenschutz am Kontaktformular',
      blocks: [
        {
          t: 'ul',
          items: [
            'Verweisen Sie direkt am Formular auf Ihre Datenschutzerklärung. Das ist üblich und erfüllt die Informationspflicht bei der Erhebung von Daten (Art. 13 DSGVO).',
            'Fragen Sie nur ab, was Sie zur Beantwortung brauchen.',
            'Legen Sie fest, wie lange gespeicherte Nachrichten aufbewahrt werden, und löschen Sie sie danach.',
            'Nutzen Sie externe Dienste für Versand, Spam-Schutz oder Speicherung, gehören sie in die Datenschutzerklärung. Mit dem Anbieter ist in der Regel ein Vertrag zur Auftragsverarbeitung nach Art. 28 DSGVO nötig. Bei manchen Captcha-Diensten kann zusätzlich eine Einwilligung erforderlich sein.',
          ],
        },
        { t: 'p', x: 'Das ist eine allgemeine Orientierung und keine Rechtsberatung. Einzelfragen klären Sie mit einer fachkundigen Stelle.' },
      ],
    },
    {
      id: 'hilfe',
      h2: 'Wann Sie Hilfe holen sollten',
      blocks: [
        { t: 'p', x: 'Hilfe lohnt sich, wenn die Ursache nach den Tests unklar bleibt, wenn Sie keinen Zugang zur DNS-Verwaltung oder zum Postfach haben oder wenn Nachrichten nur bei manchen Absendern fehlen.' },
        { t: 'p', x: 'Probleme mit dem Kontaktformular gehören zu unserer [Schnellreparatur](/website-repair?lang=de) ({price.quick}, {time.quick}). Kommen mehrere Probleme zusammen, passt die Website-Reparatur ({price.repair}). Beide Preise verstehen sich netto zzgl. 19 % USt. Welches Paket passt, sagen wir Ihnen nach der kostenlosen Prüfung.' },
        { t: 'note', kind: 'info', title: 'Was die kostenlose Prüfung hier kann', x: 'Unsere kostenlose Prüfung sieht von außen, wie ein Formular auf der Seite abgeschickt wird. Ob die Nachricht in Ihrem Postfach ankommt, lässt sich von außen nicht zuverlässig prüfen; dafür brauchen wir zusätzlichen Zugang oder Ihre Bestätigung.' },
      ],
    },
  ],
  faq: [
    { q: 'Warum zeigt mein Formular „Nachricht gesendet“, aber es kommt nichts an?', a: 'Die Meldung bestätigt in der Regel nur, dass der Server die Nachricht zum Versand angenommen hat. Ob sie zugestellt wird, entscheidet der empfangende Anbieter, unter anderem anhand von SPF, DKIM, DMARC und der Absenderadresse. Prüfen Sie den Spam-Ordner und die Prüfergebnisse im Kopf der Nachricht.' },
    { q: 'Was ist der Unterschied zwischen „From“ und „Reply-To“?', a: '„From“ nennt den Absender der Nachricht und sollte eine Adresse Ihrer eigenen Domain sein. „Reply-To“ bestimmt, an wen Ihre Antwort geht, hier an die Adresse des Besuchers. So bleibt das Antworten bequem, ohne dass die Nachricht wie eine Fälschung aussieht.' },
    { q: 'Warum landen Nachrichten nur bei manchen Besuchern im Spam?', a: 'Meist, weil das Formular die Adresse des Besuchers als Absender verwendet. Anbieter wie Yahoo, GMX und WEB.DE haben strenge DMARC-Richtlinien, Gmail, Outlook.com und T-Online dagegen nicht (Stand: Oktober 2026). Deshalb funktioniert der Test mit der eigenen Adresse oft trotzdem.' },
    { q: 'Brauche ich ein SMTP-Plugin?', a: 'Bei WordPress ist das der übliche Weg, wenn der Versand über `mail()` nicht zuverlässig funktioniert: Das Plugin schickt die Nachricht über ein authentifiziertes Postfach statt über den Webserver. Bei anderen Systemen und Baukästen stellen Sie den Versand in den Einstellungen ein. Die Zugangsdaten nennt Ihr Mail-Anbieter.' },
    { q: 'Wie oft sollte ich das Formular testen?', a: 'Mindestens einmal im Monat sowie nach jeder Änderung an Hosting, Domain, Mail-Anbieter, Plugins oder Theme. Ein fester Termin im Kalender hilft, es nicht zu vergessen.' },
    { q: 'Muss ich überhaupt ein Kontaktformular anbieten?', a: 'Nein. Sie können Anfragen auch über eine gut sichtbare E-Mail-Adresse oder Telefonnummer erhalten. Welche Kontaktangaben im Impressum stehen müssen, erklärt unser Ratgeber zum [Impressum](/ratgeber/impressum-pflichtangaben).' },
  ],
  service: 'repair',
  related: ['spf-dkim-dmarc-einrichten', 'https-ssl-fehler-beheben', 'website-wartung', 'website-selbst-pruefen'],
  sources: [
    { label: 'Google: Richtlinien für E-Mail-Absender', url: 'https://support.google.com/mail/answer/81126?hl=de' },
    { label: 'Google: E-Mail mit vollständigem Header ansehen', url: 'https://support.google.com/mail/answer/29436?hl=de' },
    { label: 'PHP-Handbuch: mail()', url: 'https://www.php.net/manual/de/function.mail.php' },
    { label: 'WordPress-Entwicklerdokumentation: wp_mail()', url: 'https://developer.wordpress.org/reference/functions/wp_mail/' },
    { label: 'IETF: RFC 7208 (SPF)', url: 'https://www.rfc-editor.org/rfc/rfc7208.html' },
    { label: 'IETF: RFC 9989 (DMARC)', url: 'https://www.rfc-editor.org/rfc/rfc9989.html' },
    { label: 'WordPress.org: Flamingo (Nachrichten speichern)', url: 'https://wordpress.org/plugins/flamingo/' },
  ],
  published: '2026-10-01',
  modified: '2026-10-02',
};
