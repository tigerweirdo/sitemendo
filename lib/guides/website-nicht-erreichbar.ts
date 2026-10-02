import type { Guide } from './types';

export const websiteNichtErreichbar: Guide = {
  lang: 'de',
  slug: 'website-nicht-erreichbar',
  category: 'Erreichbarkeit',
  short: 'Website nicht erreichbar',
  title: 'Eigene Website nicht erreichbar? Ursachen',
  h1: 'Eigene Website nicht erreichbar: So finden Betreiber die Ursache und beheben den Ausfall',
  description: 'Ihre Website ist nicht erreichbar oder zeigt 500, 502 oder 503? So grenzen Sie die Ursache ein und wissen, was Sie Ihrem Hoster melden sollten.',
  teaser: 'Domain, DNS, Server oder Website-Software: Fehlerbilder lesen, Ursache eingrenzen und dem Hoster die richtigen Angaben liefern.',
  tldr: [
    'Eine nicht erreichbare Website hat meist eine von vier Ursachen: Domain oder DNS, Server oder Hoster, die Website-Software (zum Beispiel WordPress) oder eine Sperre durch Firewall oder Sicherheitsfunktion.',
    'Das Fehlerbild verrät viel: „Server nicht gefunden“ weist auf Domain oder DNS hin, eine Zeitüberschreitung auf den Server, ein 5xx-Code auf einen Fehler auf dem Server oder in der Anwendung.',
    'Prüfen Sie zuerst, ob der Ausfall für alle gilt, mit einem anderen Netz und Gerät. Kontrollieren Sie danach Domain und Hosting-Vertrag, bevor Sie an der Website selbst arbeiten.',
    'Laut Google verlangsamen 5xx-Fehler das Crawling vorübergehend, und URLs, die dauerhaft einen Serverfehler liefern, werden aus dem Index entfernt. Beheben Sie anhaltende Ausfälle deshalb zügig.',
  ],
  intro: [
    'Eine Website, die nicht lädt, kostet Anfragen und Vertrauen, oft ohne dass Sie es sofort bemerken. Die erste Frage lautet: Liegt es an Ihnen, am Hoster oder an der Website selbst?',
    'Dieser Ratgeber führt von der Frage „Ist die Seite wirklich nicht erreichbar?“ Schritt für Schritt zur Ursache, erklärt die wichtigsten Fehlercodes und zeigt, was Sie Ihrem Hoster melden sollten.',
  ],
  sections: [
    {
      id: 'schnelltest',
      h2: 'Schnelltest: Ist die Website wirklich nicht erreichbar?',
      blocks: [
        { t: 'note', kind: 'info', title: 'Sie sind Besucher, nicht Betreiber?', x: 'Dieser Ratgeber richtet sich an Betreiber einer eigenen Website. Wenn Sie eine fremde Seite nicht öffnen können, prüfen Sie zuerst, ob andere Seiten laden. Ist das der Fall, liegt der Fehler meist bei der Website und nicht bei Ihrer Verbindung: Sie können dann nur abwarten oder den Betreiber informieren.' },
        {
          t: 'steps',
          items: [
            { h: 'Anderes Netz und anderes Gerät', x: 'Öffnen Sie die Adresse am Handy im Mobilfunknetz, mit ausgeschaltetem WLAN. So schließen Sie Probleme in Ihrem eigenen Netz, im Router oder im Browser-Zwischenspeicher aus.' },
            { h: 'Beide Adressvarianten testen', x: 'Rufen Sie `https://ihre-domain.de` und `https://www.ihre-domain.de` auf. Geht nur eine Variante, ist meist die Weiterleitung oder ein DNS-Eintrag fehlerhaft.' },
            { h: 'Fehlermeldung genau notieren', x: 'Schreiben Sie Fehlercode oder Text, Datum und Uhrzeit auf und machen Sie einen Screenshot. Das spart dem Support später Rückfragen.' },
            { h: 'Unterseiten und Verwaltungsbereich testen', x: 'Läuft die Startseite, aber eine Unterseite nicht, oder umgekehrt, liegt die Ursache in der Regel in der Anwendung und nicht beim Server insgesamt.' },
            { h: 'Meldungen des Hosters prüfen', x: 'Viele Hoster zeigen Störungen auf einer Status-Seite oder per E-Mail an. Schauen Sie dort und im Postfach der beim Hoster hinterlegten Adresse nach.' },
          ],
        },
      ],
    },
    {
      id: 'fehlerbild',
      h2: 'Das Fehlerbild eingrenzen',
      blocks: [
        { t: 'p', x: 'Je nach Browser lauten die Meldungen etwas anders. Die Codes in der Tabelle sind die gängigen.' },
        {
          t: 'table',
          caption: 'Fehlerbild und wahrscheinliche Ursache',
          head: ['Das sehen Sie', 'Was es bedeutet', 'Zuständig'],
          rows: [
            ['„Server nicht gefunden“, `DNS_PROBE_FINISHED_NXDOMAIN` oder `ERR_NAME_NOT_RESOLVED`', 'Der Domainname lässt sich nicht in eine Server-Adresse auflösen: Domain abgelaufen oder gekündigt, falsche Nameserver oder fehlender DNS-Eintrag.', 'Domain-Anbieter'],
            ['Zeitüberschreitung, `ERR_CONNECTION_TIMED_OUT`', 'Der Server antwortet nicht rechtzeitig: überlastet, ausgefallen oder von einer Firewall abgeschirmt.', 'Hoster'],
            ['Verbindung abgelehnt, `ERR_CONNECTION_REFUSED`', 'Der Server ist erreichbar, aber der Webserver-Dienst nimmt keine Verbindungen an.', 'Hoster'],
            ['`500 Internal Server Error`', 'Allgemeiner Serverfehler, häufig durch Skript, PHP, Plugin oder die Konfigurationsdatei `.htaccess`.', 'Website-Betreuung, gegebenenfalls Hoster'],
            ['`502 Bad Gateway` oder `504 Gateway Timeout`', 'Ein vorgeschalteter Server (Proxy, CDN, Load Balancer) erhält eine ungültige oder keine rechtzeitige Antwort vom eigentlichen Server.', 'Hoster oder CDN-Anbieter'],
            ['`503 Service Unavailable`', 'Der Server ist vorübergehend nicht bereit, etwa wegen Wartung oder Überlastung.', 'Hoster, Website-Betreuung'],
            ['`403 Forbidden`', 'Zugriff verweigert: Dateirechte, Firewall, Sicherheits-Plugin oder IP-Sperre.', 'Website-Betreuung, gegebenenfalls Hoster'],
            ['Weiße, leere Seite', 'Meist ein PHP-Fehler, etwa durch ein Plugin oder Theme. Siehe Ratgeber [WordPress: kritischer Fehler](/ratgeber/wordpress-kritischer-fehler-beheben).', 'Website-Betreuung'],
            ['Fehler beim Aufbau einer Datenbankverbindung', 'Die Website erreicht ihre Datenbank nicht: falsche Zugangsdaten oder Datenbank-Server nicht erreichbar.', 'Hoster, Website-Betreuung'],
            ['Wartungsmeldung bleibt stehen („kurzzeitig nicht verfügbar“)', 'Bei WordPress bleibt nach einem unterbrochenen Update die Datei `.maintenance` im Hauptverzeichnis liegen.', 'Website-Betreuung'],
            ['Zertifikatswarnung', 'Das ist ein HTTPS-Problem, kein Ausfall. Siehe Ratgeber [HTTPS und SSL-Fehler](/ratgeber/https-ssl-fehler-beheben).', 'Hoster, Website-Betreuung'],
          ],
        },
      ],
    },
    {
      id: 'diagnose',
      h2: 'Von außen nach innen: Domain, DNS, Server, Anwendung',
      blocks: [
        { t: 'p', x: 'Gehen Sie die Ebenen in dieser Reihenfolge durch. So vermeiden Sie, an der Website zu arbeiten, wenn eigentlich die Domain abgelaufen ist.' },
        { t: 'h3', x: '1. Domain und DNS' },
        { t: 'p', x: 'Prüfen Sie beim Domain-Anbieter, ob die Domain verlängert und die Zahlung durchgelaufen ist und ob die Nameserver noch die richtigen sind. Bei .de-Domains zeigt die [Whois-Abfrage der DENIC](https://www.denic.de/services/whois-service/), ob die Domain registriert ist und welche Nameserver hinterlegt sind. Hat sich die Server-Adresse beim Hoster geändert, muss der DNS-Eintrag dazu passen. Änderungen am DNS brauchen Zeit, bis sie überall sichtbar sind.' },
        { t: 'h3', x: '2. Hosting und Server' },
        { t: 'p', x: 'Prüfen Sie, ob der Hosting-Vertrag aktiv und bezahlt ist, ob der Hoster eine Störung meldet und ob Speicherplatz, Datenbank- oder Traffic-Kontingent Ihres Tarifs erschöpft sind. Eine Überlastung durch viele Zugriffe, etwa durch Bots, einen Angriff oder eine erfolgreiche Werbeaktion, kann die Seite zeitweise lahmlegen. Der Server antwortet dann mit 503 oder gar nicht.' },
        { t: 'h3', x: '3. Website-Software' },
        { t: 'p', x: 'Sind Domain und Server in Ordnung, liegt es an der Anwendung. Typisch sind ein fehlgeschlagenes Update, ein Plugin, das nicht zur PHP-Version passt, eine beschädigte `.htaccess`, erschöpfter PHP-Speicher oder ein Datenbankfehler. Die WordPress-Dokumentation nennt dafür unter anderem: die `.htaccess` umbenennen und neu erzeugen lassen, den Plugin-Ordner umbenennen, um alle Plugins zu deaktivieren, eine hängengebliebene `.maintenance`-Datei löschen und die Datenbank-Zugangsdaten in der `wp-config.php` prüfen. Legen Sie vorher eine Sicherung an, wo das möglich ist.' },
        { t: 'h3', x: '4. Sperren durch Firewall oder Sicherheitsfunktion' },
        { t: 'p', x: 'Eine Firewall, ein Sicherheits-Plugin oder ein Bot-Schutz kann einzelne Besucher, Länder oder IP-Adressen aussperren. Die Folge sind 403-Fehler, Zeitüberschreitungen oder Prüfseiten. Kontrollieren Sie, ob Ihre eigene IP-Adresse gesperrt wurde, etwa nach mehreren fehlgeschlagenen Anmeldungen, und ob Suchmaschinen-Crawler ausgesperrt werden (siehe Ratgeber [Website nicht bei Google gefunden](/ratgeber/website-nicht-bei-google-gefunden)).' },
      ],
    },
    {
      id: 'hoster',
      h2: 'Was Sie Ihrem Hoster melden sollten',
      blocks: [
        {
          t: 'ul',
          items: [
            'Ihre Domain und betroffene Adressen: alle Seiten oder nur einzelne.',
            'Die genaue Fehlermeldung oder den Fehlercode samt Screenshot.',
            'Seit wann der Fehler auftritt, mit Datum und Uhrzeit.',
            'Was zuletzt geändert wurde: Update, Umzug, neues Plugin, DNS-Änderung.',
            'Was Sie bereits geprüft haben, zum Beispiel Mobilfunknetz und anderes Gerät.',
            'Eine Telefonnummer für Rückfragen.',
          ],
        },
        { t: 'code', label: 'Beispiel für eine Störungsmeldung (frei erfunden)', x: 'Betreff: Website ihre-domain.de nicht erreichbar (seit 01.10., ca. 09:30 Uhr)\n\nGuten Tag,\n\nunsere Website ihre-domain.de ist seit heute gegen 09:30 Uhr nicht erreichbar.\nFehlerbild: 503 Service Unavailable (Screenshot anbei)\nBetroffen: alle Seiten, geprüft im Mobilfunknetz\nLetzte Änderung: gestern Abend Plugin-Updates im WordPress-Verwaltungsbereich\n\nBitte prüfen Sie, ob serverseitig eine Störung vorliegt, und senden Sie uns die\nFehlerprotokolle der letzten Stunden.\n\nMit freundlichen Grüßen\nIhr Name, Telefon' },
      ],
    },
    {
      id: 'google',
      h2: 'Ausfälle und Google: Was Sie wissen sollten',
      blocks: [
        { t: 'p', x: 'Laut Google sorgen Serverfehler mit den Codes 5xx und 429 dafür, dass die Crawler das Crawling vorübergehend verlangsamen. URLs, die dauerhaft einen Serverfehler zurückgeben, werden für die Google Suche aus dem Index entfernt. Wie lange Google Fehler toleriert, nennt die Dokumentation nicht. Anhaltende Ausfälle sind deshalb ein Risiko für Ihre Sichtbarkeit.' },
        { t: 'p', x: 'Bei geplanten Wartungsarbeiten sollte die Wartungsseite den Statuscode 503 liefern, möglichst mit einer Angabe, wann der Dienst wieder bereit ist (Header `Retry-After`). MDN beschreibt 503 als Antwort für vorübergehende Zustände. Eine Wartungsseite, die mit dem Statuscode 200 ausgeliefert wird, signalisiert Suchmaschinen dagegen fälschlich, dass alles in Ordnung ist. Bleibt ein WordPress-Wartungsmodus nach einem Update hängen, hilft der Ratgeber [WordPress Wartungsmodus geht nicht weg](/ratgeber/wordpress-wartungsmodus-geht-nicht-weg).' },
      ],
    },
    {
      id: 'vorsorge',
      h2: 'So beugen Sie Ausfällen vor',
      blocks: [
        {
          t: 'ul',
          items: [
            '**Überwachung einrichten:** Ein Überwachungsdienst ruft Ihre Seite in kurzen Abständen ab und meldet Ausfälle per E-Mail oder Nachricht. Viele Dienste bieten einen kostenlosen Tarif für wenige Adressen.',
            '**Automatische Verlängerung aktivieren:** für Domain und Zertifikat, und eine Kontakt-E-Mail hinterlegen, die jemand liest.',
            '**Updates planvoll einspielen:** vorher eine Sicherung, nachher ein Funktionstest.',
            '**Sicherungen außerhalb des Servers:** Nur so helfen sie, wenn der Server selbst ausfällt.',
            '**Notfallkontakte bereithalten:** Support-Weg des Hosters und Zugangsdaten für DNS, Verwaltungsbereich und Dateizugriff an einem sicheren Ort.',
          ],
        },
        { t: 'p', x: 'Mehr zur laufenden Betreuung steht im Ratgeber [Website-Wartung: Aufgaben, Risiken, Kosten](/ratgeber/website-wartung).' },
      ],
    },
    {
      id: 'hilfe',
      h2: 'Wann Sie Hilfe holen sollten',
      blocks: [
        { t: 'p', x: 'Hilfe lohnt sich, wenn die Seite länger als einige Stunden nicht erreichbar ist, wenn Sie einen Angriff vermuten, wenn Hoster und Dienstleister die Verantwortung hin- und herschieben oder wenn Ihnen der Zugang zu Verwaltungsbereich, Domain oder Hosting fehlt.' },
        { t: 'p', x: 'Unsere [Website-Pflege](/website-care?lang=de) ({price.care}) enthält die Überwachung der Erreichbarkeit: Wir melden uns, wenn die Seite ausfällt. Ob die Behebung eines Fehlers unter die [Schnellreparatur](/website-repair?lang=de) fällt, klären wir vor Arbeitsbeginn. Die Preise verstehen sich netto zzgl. 19 % USt.' },
        { t: 'note', kind: 'info', title: 'Grenzen der kostenlosen Prüfung', x: 'Die kostenlose Prüfung kann einen Ausfall erkennen, der zum Zeitpunkt der Prüfung besteht. Einen Ausfall davor oder danach sieht sie nicht. Dafür ist eine laufende Überwachung nötig.' },
      ],
    },
  ],
  faq: [
    { q: 'Meine Website ist nicht erreichbar. Was soll ich als Erstes tun?', a: 'Prüfen Sie mit dem Handy im Mobilfunknetz, ob der Ausfall für alle gilt. Notieren Sie Fehlercode, Datum und Uhrzeit, kontrollieren Sie Domain und Hosting-Vertrag und melden Sie sich bei Ihrem Hoster.' },
    { q: 'Was bedeutet der Fehler 500?', a: 'Ein allgemeiner Serverfehler: Der Server konnte die Anfrage nicht verarbeiten, häufig wegen eines Fehlers in Skript, Plugin oder Konfiguration. Bei WordPress hilft laut Dokumentation oft, die `.htaccess` umzubenennen und neu erzeugen zu lassen oder alle Plugins zu deaktivieren.' },
    { q: 'Was ist der Unterschied zwischen 502, 503 und 504?', a: 'Bei 502 erhält ein Gateway oder Proxy eine ungültige Antwort vom vorgeschalteten Server. 503 bedeutet, dass der Server nicht bereit ist, etwa wegen Wartung oder Überlastung. Bei 504 erhält ein Gateway oder Proxy keine rechtzeitige Antwort.' },
    { q: 'Wie lange dauert es, bis DNS-Änderungen wirken?', a: 'Das hängt von der Gültigkeitsdauer (TTL) der Einträge ab. Bei kurzen Werten sind es Minuten, bei einem Wechsel der Nameserver kann es deutlich länger dauern. In dieser Zeit sehen einzelne Netze noch den alten Stand.' },
    { q: 'Schadet ein Ausfall meinem Google-Ranking?', a: 'Anhaltende Serverfehler sind ein Risiko: Laut Google werden URLs, die dauerhaft einen Serverfehler liefern, aus dem Index entfernt. Wie lange Fehler toleriert werden, nennt die Dokumentation nicht. Beheben Sie Ausfälle deshalb zügig.' },
    { q: 'Wie sollte eine Wartungsseite eingerichtet sein?', a: 'Sie sollte den Statuscode 503 liefern, möglichst mit dem Header `Retry-After`. So erkennen Suchmaschinen und andere Clients, dass der Zustand vorübergehend ist.' },
  ],
  service: 'care',
  related: ['website-wartung', 'wordpress-wartungsmodus-geht-nicht-weg', 'https-ssl-fehler-beheben', 'wordpress-kritischer-fehler-beheben'],
  sources: [
    { label: 'Google: HTTP-Statuscodes sowie Netzwerk- und DNS-Fehler', url: 'https://developers.google.com/crawling/docs/troubleshooting/http-status-codes?hl=de' },
    { label: 'MDN: 502 Bad Gateway', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/502' },
    { label: 'MDN: 503 Service Unavailable', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/503' },
    { label: 'MDN: 504 Gateway Timeout', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/504' },
    { label: 'WordPress: Häufige Fehler und ihre Behebung (Dokumentation)', url: 'https://developer.wordpress.org/advanced-administration/wordpress/common-errors/' },
    { label: 'DENIC: Whois-Abfrage für .de-Domains', url: 'https://www.denic.de/services/whois-service/' },
  ],
  published: '2026-10-01',
  modified: '2026-10-02',
};
