import type { Guide } from './types';

export const httpsSslFehlerBeheben: Guide = {
  lang: 'de',
  slug: 'https-ssl-fehler-beheben',
  category: 'HTTPS',
  check: 'https',
  short: 'HTTPS und SSL-Fehler beheben',
  title: 'Website „Nicht sicher“? HTTPS-Probleme beheben',
  h1: 'Website „Nicht sicher“? HTTPS- und SSL-Fehler erkennen und beheben',
  description: 'Der Browser warnt vor Ihrer Website? So erkennen Sie, ob HTTPS, das SSL-Zertifikat oder Mixed Content die Ursache ist, und beheben es Schritt für Schritt.',
  teaser: 'Zertifikat abgelaufen, kein HTTPS oder gemischte Inhalte: Ursachen erkennen, beheben und für Chrome 154 vorbereitet sein.',
  tldr: [
    '„Nicht sicher“ hat drei verschiedene Ursachen: Ihre Website nutzt kein HTTPS, das SSL/TLS-Zertifikat ist ungültig oder abgelaufen, oder eine HTTPS-Seite lädt einzelne Inhalte unverschlüsselt (Mixed Content).',
    'Mit Chrome 154, laut Google im Oktober 2026, fragt der Browser vor dem ersten Aufruf einer öffentlichen Seite ohne HTTPS um Erlaubnis. Seiten, die nur per HTTP erreichbar sind, riskieren dadurch Besucher.',
    'Ein Zertifikat gibt es meist kostenlos beim Hoster, und es erneuert sich automatisch. Läuft es trotzdem ab, ist in der Regel die automatische Erneuerung gestört.',
    'Prüfen Sie alle vier Adressvarianten (http und https, mit und ohne www): Alle müssen bei derselben HTTPS-Adresse landen.',
  ],
  intro: [
    'Wenn der Browser vor Ihrer Website warnt, ist das für Besucher ein klares Signal, die Seite zu verlassen. Für Unternehmen ist es ein Vertrauensverlust genau in dem Moment, in dem jemand Kontakt aufnehmen möchte.',
    '„Nicht sicher“ ist dabei kein einzelner Fehler. Dieser Ratgeber hilft Ihnen, die Ursache zu erkennen, und führt durch die Behebung, vom Zertifikat bis zur Weiterleitung.',
  ],
  sections: [
    {
      id: 'chrome-154',
      h2: 'Aktuell: Chrome fragt ab Oktober 2026 vor HTTP-Seiten nach',
      blocks: [
        { t: 'p', x: 'Google hat angekündigt, die Einstellung „Always Use Secure Connections“ in Chrome mit Version 154 im Oktober 2026 standardmäßig zu aktivieren. Chrome fragt dann vor dem ersten Aufruf einer öffentlichen Seite ohne HTTPS um die Erlaubnis der Nutzer. Für Nutzer des erweiterten Schutzes („Enhanced Safe Browsing“) gilt das bereits seit Chrome 147 im April 2026. Private Adressen wie lokale Netzwerke sind ausgenommen.' },
        { t: 'p', x: 'Für Website-Betreiber heißt das: Wer nur per `http://` erreichbar ist oder wessen Weiterleitung auf HTTPS fehlt, riskiert eine Zwischenseite, bevor Besucher den Inhalt sehen. Die Warnung lässt sich umgehen, doch Besucher müssen aktiv bestätigen, und das kostet Vertrauen. In einem Test mit einem kleinen Teil der Nutzer sah der mittlere Nutzer laut Google weniger als eine solche Warnung pro Woche; rund 95 bis 99 % der Seitenaufrufe in Chrome laufen bereits über HTTPS. Eine Website ohne HTTPS gehört damit zu einer kleinen Minderheit.' },
        { t: 'note', kind: 'info', title: 'Stand: Oktober 2026', x: 'Maßgeblich ist die Ankündigung von Google. Termine und Verhalten der Browser können sich ändern; prüfen Sie im Zweifel die verlinkte Quelle.' },
      ],
    },
    {
      id: 'drei-ursachen',
      h2: 'Drei Ursachen, ein Warnhinweis',
      blocks: [
        {
          t: 'table',
          caption: 'Was Besucher sehen und was dahintersteckt',
          head: ['Das sehen Besucher', 'Ursache', 'Lösung im Überblick'],
          rows: [
            ['„Nicht sicher“ in der Adresszeile oder eine Rückfrage vor dem Aufruf', 'Die Website wird ohne HTTPS ausgeliefert oder Besucher gelangen über `http://` hinein', 'Zertifikat einrichten, Weiterleitung auf HTTPS, Adressen umstellen'],
            ['Vollbild-Warnung („Ihre Verbindung ist nicht privat“) mit Fehlercode, zum Beispiel `NET::ERR_CERT_DATE_INVALID`', 'Zertifikat abgelaufen, falsch ausgestellt oder Zertifikatskette unvollständig', 'Zertifikat erneuern beziehungsweise korrekt installieren'],
            ['Schloss fehlt oder Teile der Seite fehlen (Bilder, Formulare, Skripte)', 'Mixed Content: Eine HTTPS-Seite lädt Inhalte per `http://`', 'Alle Adressen auf HTTPS umstellen'],
          ],
        },
        { t: 'note', kind: 'info', title: 'Auch das Gerät kann schuld sein', x: 'Der Fehlercode `NET::ERR_CERT_DATE_INVALID` erscheint auch, wenn Datum oder Uhrzeit auf dem Gerät des Besuchers nicht stimmen. Tritt die Warnung nur an einem Gerät auf, prüfen Sie zuerst dessen Uhrzeit. Erscheint sie überall, liegt es am Zertifikat.' },
      ],
    },
    {
      id: 'diagnose',
      h2: 'Diagnose in fünf Minuten',
      blocks: [
        {
          t: 'steps',
          items: [
            { h: 'Vier Varianten testen', x: 'Rufen Sie `http://ihre-domain.de`, `http://www.ihre-domain.de`, `https://ihre-domain.de` und `https://www.ihre-domain.de` auf. Alle vier sollten ohne Warnung bei derselben HTTPS-Adresse landen.' },
            { h: 'Zertifikat ansehen', x: 'Klicken Sie in der Adresszeile auf das Symbol neben der Adresse und öffnen Sie die Zertifikatsdetails: Für welche Domains gilt es, und bis wann?' },
            { h: 'SSL Server Test ausführen', x: 'Der [SSL Server Test von Qualys SSL Labs](https://www.ssllabs.com/ssltest/) prüft Zertifikat, Zertifikatskette und Konfiguration und benennt Fehler.' },
            { h: 'Auf gemischte Inhalte prüfen', x: 'Öffnen Sie die Entwicklerwerkzeuge (`F12`) und den Reiter „Konsole“. Meldungen zu „Mixed Content“ nennen die betroffenen Adressen.' },
            { h: 'Weiterleitung prüfen', x: 'Eine `http://`-Adresse sollte per 301-Weiterleitung auf die HTTPS-Adresse führen. Online-Werkzeuge für HTTP-Header zeigen den Statuscode.' },
          ],
        },
      ],
    },
    {
      id: 'zertifikat',
      h2: 'Zertifikat abgelaufen oder ungültig: So beheben Sie es',
      blocks: [
        {
          t: 'ol',
          items: [
            'Zertifikat im Hosting-Panel erneuern oder neu ausstellen. Viele Hoster bieten kostenlose Zertifikate (etwa über [Let’s Encrypt](https://letsencrypt.org/docs/)) mit einem Klick an.',
            'Prüfen, ob die Domain auf den richtigen Server zeigt (DNS). Ein Zertifikat wird nur ausgestellt, wenn die Domain den Server erreicht, der es anfordert.',
            'Sicherstellen, dass das Zertifikat alle genutzten Namen abdeckt, also die Variante mit und ohne `www`.',
            'Die automatische Erneuerung prüfen: Wurde sie nach einem Umzug, einer DNS-Änderung oder einer Firewall-Regel unterbrochen?',
            'Bei kostenpflichtigen Zertifikaten: verlängern und neu installieren, einschließlich der Zwischenzertifikate (Zertifikatskette).',
            'Das Ergebnis mit dem SSL Server Test bestätigen. Wenn Sie nicht weiterkommen, fragen Sie den Support Ihres Hosters.',
          ],
        },
        { t: 'note', kind: 'info', title: 'Zertifikate werden kürzer gültig', x: 'Die Gültigkeit öffentlicher TLS-Zertifikate wird branchenweit schrittweise verkürzt. Nach dem Beschluss SC-081v3 des CA/Browser Forums liegt das Maximum seit dem 15. März 2026 bei 200 Tagen, ab dem 15. März 2027 bei 100 Tagen und ab dem 15. März 2029 bei 47 Tagen. Zertifikate sollten deshalb automatisch erneuert werden; eine manuelle Verlängerung wird zunehmend aufwendig.' },
      ],
    },
    {
      id: 'umstellung',
      h2: 'Von HTTP auf HTTPS umstellen: Checkliste',
      blocks: [
        {
          t: 'ol',
          items: [
            'Zertifikat einrichten (siehe oben) und die Website unter `https://` testen.',
            'Datensicherung anlegen.',
            'Alle internen Links, Bilder und Skripte auf `https://` oder relative Adressen umstellen. Bei WordPress ändern Sie unter „Einstellungen → Allgemein“ die Adressen und tauschen alte `http://`-Adressen in der Datenbank mit einem Such-und-Ersetzen-Werkzeug aus.',
            'Eine 301-Weiterleitung von `http` auf `https` einrichten (Beispiele unten).',
            'Canonical-Angaben, Sitemap und Verweise in der `robots.txt` auf die HTTPS-Adressen umstellen.',
            'In der Search Console die HTTPS-Variante der Website prüfen (oder eine Domain-Property nutzen) und die Sitemap neu einreichen.',
            'Externe Profile (Google-Unternehmensprofil, Verzeichnisse, soziale Netzwerke) auf die HTTPS-Adresse aktualisieren.',
            'Erst wenn alles stabil läuft: optional HSTS aktivieren.',
          ],
        },
        { t: 'code', label: 'Apache (.htaccess): alles auf HTTPS umleiten', x: 'RewriteEngine On\nRewriteCond %{HTTPS} off\nRewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]' },
        { t: 'p', x: 'Hinter einem Proxy oder einem CDN kann diese Regel eine Endlosschleife auslösen, weil der Server die Verschlüsselung dort nicht erkennt. Stellen Sie die Weiterleitung dann beim Proxy oder CDN ein.' },
        { t: 'code', label: 'nginx: Port 80 auf HTTPS umleiten', x: 'server {\n    listen 80;\n    server_name ihre-domain.de www.ihre-domain.de;\n    return 301 https://$host$request_uri;\n}' },
        { t: 'note', kind: 'warn', title: 'HSTS erst am Ende und vorsichtig', x: 'Der Header `Strict-Transport-Security` (HSTS) weist Browser an, eine Domain nur noch per HTTPS aufzurufen. Browser speichern diese Anweisung für die angegebene Dauer. Aktivieren Sie ihn erst, wenn HTTPS überall fehlerfrei läuft, und beginnen Sie mit einer kurzen Dauer, zum Beispiel `max-age=300` (fünf Minuten).' },
      ],
    },
    {
      id: 'mixed-content',
      h2: 'Mixed Content beheben',
      blocks: [
        { t: 'p', x: 'Mixed Content entsteht, wenn eine HTTPS-Seite einzelne Inhalte über `http://` lädt. Moderne Browser gehen laut MDN so damit um: Bilder, Audio und Video werden in der Regel automatisch auf HTTPS hochgestuft, Skripte, Stylesheets, Iframes, Schriften und `fetch()`-Anfragen werden blockiert. Eine HTTPS-Seite kann dadurch unbemerkt Funktionen verlieren, etwa ein Formular, eine Karte oder das Menü.' },
        {
          t: 'ul',
          items: [
            'Alle Adressen auf `https://` oder auf relative Adressen umstellen.',
            'Inhalte fremder Seiten nur in der HTTPS-Version einbinden. Gibt es keine, den Inhalt ersetzen.',
            'Auf fest eingetragene `http://`-Adressen in Theme, Plugins, Seitenbaukästen und in der Fußzeile achten.',
            'Auch Download-Links auf HTTPS umstellen: Browser sollen laut MDN „gemischte Downloads“ blockieren, also Dateien, die eine HTTPS-Seite über HTTP lädt.',
          ],
        },
        { t: 'p', x: 'Jede blockierte oder hochgestufte Adresse zeigt die Konsole der Entwicklerwerkzeuge (`F12`).' },
      ],
    },
    {
      id: 'formulare',
      h2: 'Warum HTTPS bei Formularen besonders wichtig ist',
      blocks: [
        { t: 'p', x: 'Kontaktformulare übertragen Namen, E-Mail-Adressen und Nachrichten. Ohne HTTPS können diese Daten unterwegs mitgelesen werden. Zudem kann ein Formular, dessen Zieladresse (`action`-Attribut) auf `http://` zeigt, trotz HTTPS-Seite unverschlüsselt senden. Prüfen Sie deshalb auch diese Adresse. Mehr zu Formularproblemen: [Kontaktformular funktioniert nicht](/ratgeber/kontaktformular-funktioniert-nicht).' },
      ],
    },
    {
      id: 'hilfe',
      h2: 'Wann Sie Hilfe holen sollten',
      blocks: [
        { t: 'p', x: 'Hilfe lohnt sich, wenn die Zertifikatserneuerung trotz Versuchen scheitert, wenn nach der Umstellung Weiterleitungsschleifen auftreten, oder wenn Mixed Content aus vielen Quellen stammt.' },
        { t: 'p', x: 'SSL- und Weiterleitungsprobleme gehören zu unserer [Schnellreparatur](/website-repair?lang=de) ({price.quick}, {time.quick}). Kommen mehrere Probleme zusammen, passt die Website-Reparatur ({price.repair}). Beide Preise verstehen sich netto zzgl. 19 % USt. Welches Paket passt, sagen wir Ihnen nach der kostenlosen Prüfung.' },
      ],
    },
  ],
  faq: [
    { q: 'Kostet ein SSL-Zertifikat Geld?', a: 'Meist nicht. Viele Hoster stellen kostenlose Zertifikate aus und erneuern sie automatisch. Kostenpflichtige Zertifikate bieten vor allem Zusatzleistungen wie Support oder eine erweiterte Prüfung des Unternehmens.' },
    { q: 'Beeinflusst HTTPS mein Google-Ranking?', a: 'Google hat HTTPS 2014 als Rankingsignal eingeführt und damals als „sehr leichtes“ Signal bezeichnet, das weniger als 1 % der Suchanfragen betreffe und weniger Gewicht habe als hochwertige Inhalte. Wichtiger ist heute der Vertrauens- und Sicherheitsaspekt für Ihre Besucher.' },
    { q: 'Was bedeutet NET::ERR_CERT_DATE_INVALID?', a: 'Das Zertifikat ist nach der Uhrzeit des Geräts abgelaufen oder noch nicht gültig. Erscheint die Meldung bei allen Besuchern, ist Ihr Zertifikat abgelaufen. Erscheint sie nur an einem Gerät, prüfen Sie dessen Datum und Uhrzeit.' },
    { q: 'Warum läuft mein kostenloses Zertifikat immer wieder ab?', a: 'Meist ist die automatische Erneuerung gestört: nach einem Umzug, einer DNS-Änderung, einer Regel, die die Prüfung blockiert, oder weil der Hoster die Funktion nicht aktiviert hat. Fragen Sie den Support nach dem Erneuerungsprotokoll.' },
    { q: 'Was ist der Unterschied zwischen SSL und TLS?', a: 'TLS ist der Nachfolger von SSL. Im Alltag spricht man weiterhin vom „SSL-Zertifikat“, technisch kommt heute TLS zum Einsatz.' },
    { q: 'Brauche ich HSTS?', a: 'Nicht zwingend. HSTS erhöht die Sicherheit, sollte aber erst aktiviert werden, wenn HTTPS überall zuverlässig funktioniert.' },
  ],
  service: 'repair',
  related: ['website-nicht-erreichbar', 'kontaktformular-funktioniert-nicht', 'website-selbst-pruefen'],
  sources: [
    { label: 'Google (Oktober 2025): Chrome nutzt künftig standardmäßig HTTPS', url: 'https://blog.google/security/https-by-defau/' },
    { label: 'Google Search Central Blog (2014): HTTPS als Rankingsignal', url: 'https://developers.google.com/search/blog/2014/08/https-as-ranking-signal?hl=de' },
    { label: 'MDN: Mixed Content', url: 'https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Mixed_content' },
    { label: 'MDN: Strict-Transport-Security', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Strict-Transport-Security' },
    { label: 'Qualys SSL Labs: SSL Server Test', url: 'https://www.ssllabs.com/ssltest/' },
    { label: 'Let’s Encrypt: Dokumentation', url: 'https://letsencrypt.org/docs/' },
    { label: 'CA/Browser Forum: Ballot SC-081v3 (kürzere Zertifikatslaufzeiten)', url: 'https://cabforum.org/2025/04/11/ballot-sc081v3-introduce-schedule-of-reducing-validity-and-data-reuse-periods/' },
    { label: 'Sectigo: Zeitplan der verkürzten Laufzeiten (200, 100, 47 Tage)', url: 'https://www.sectigo.com/blog/200-day-certificate-expiration-begins' },
  ],
  published: '2026-10-01',
  modified: '2026-10-01',
};
