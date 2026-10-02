import type { Guide } from './types';

export const wordpressWartungsmodusGehtNichtWeg: Guide = {
  lang: 'de',
  slug: 'wordpress-wartungsmodus-geht-nicht-weg',
  category: 'Technik und Wartung',
  check: 'stack',
  short: 'WordPress Wartungsmodus hängt',
  title: 'WordPress Wartungsmodus geht nicht weg: Lösung',
  h1: 'WordPress Wartungsmodus geht nicht weg: So beenden Sie ihn Schritt für Schritt',
  description: 'Ihre WordPress-Website zeigt nur eine Wartungsmeldung? So erkennen Sie die Ursache, löschen die Datei .maintenance und beenden den Wartungsmodus.',
  teaser: 'Die Seite zeigt „Wartungsarbeiten“, obwohl das Update längst durch sein sollte: Ursachen, die Lösung in wenigen Minuten und wie Sie es künftig vermeiden.',
  tldr: [
    'WordPress schaltet beim Aktualisieren des Kerns, beim gleichzeitigen Aktualisieren mehrerer Plugins und bei automatischen Hintergrund-Updates in den Wartungsmodus. Dafür legt es im Hauptverzeichnis die versteckte Datei `.maintenance` an und löscht sie nach dem Update wieder.',
    'Bricht das Update ab, bleibt die Datei liegen. Laut WordPress-Quellcode gilt sie nach zehn Minuten als veraltet und wird ignoriert, die Website kommt daher meist von selbst zurück. Bleibt die Meldung länger, löschen Sie `.maintenance` per FTP, Dateimanager oder mit `wp maintenance-mode deactivate`.',
    'Erscheint die Wartungsseite trotzdem weiter, stammt sie oft gar nicht von WordPress, sondern von einem Wartungsmodus-Plugin, vom Theme oder vom Hoster. Dann hilft nicht das Löschen der Datei, sondern das Abschalten der jeweiligen Funktion.',
    'Prüfen Sie danach, ob das Update vollständig durchgelaufen ist, und legen Sie vor einem neuen Versuch eine Sicherung an. Lassen Sie die Website nicht über längere Zeit im Wartungsmodus: Google entfernt Seiten, die dauerhaft Serverfehler liefern, irgendwann aus dem Index.',
  ],
  intro: [
    'Sie haben ein Update angestoßen, und seitdem zeigt die Website nur noch eine Wartungsmeldung. Besucher sehen eine leere Seite mit einem Satz Text, und auch das Dashboard lässt sich nicht mehr öffnen. Meist ist das Problem in wenigen Minuten behoben, weil es nur um eine einzige Datei geht.',
    'Dieser Ratgeber erklärt, was im Hintergrund passiert, wie Sie erkennen, welcher Wartungsmodus aktiv ist, wie Sie ihn Schritt für Schritt beenden und wie Sie das nächste Update sicherer einspielen. Die Aussagen zum Verhalten von WordPress beruhen auf dem Quellcode und der Dokumentation von WordPress (Stand: Oktober 2026).',
  ],
  sections: [
    {
      id: 'hintergrund',
      h2: 'Was im Hintergrund passiert',
      blocks: [
        { t: 'p', x: 'Bevor WordPress den Kern, ein aktives Plugin oder ein aktives Theme aktualisiert, legt es im Hauptverzeichnis der Installation die Datei `.maintenance` an. Sie enthält nur einen Zeitstempel. Solange der Zeitstempel frisch ist, beendet WordPress jede Anfrage früh mit einer Wartungsmeldung und dem Statuscode 503. Nach dem Update löscht es die Datei wieder.' },
        { t: 'p', x: 'Das zeigt der Quellcode von WordPress (Stand: Oktober 2026):' },
        {
          t: 'ul',
          items: [
            '**Wann der Wartungsmodus startet:** bei Updates des Kerns, beim gleichzeitigen Aktualisieren mehrerer Plugins oder Themes, sofern ein aktives darunter ist, und bei automatischen Hintergrund-Updates eines aktiven Plugins oder Themes. Ein einzelnes, von Hand angestoßenes Plugin-Update löst ihn nicht aus.',
            '**Wie er endet:** WordPress löscht die Datei nach dem Update. Ist der Zeitstempel älter als zehn Minuten, betrachtet WordPress den Wartungsmodus als beendet und ignoriert die Datei.',
            '**Was Besucher sehen:** im englischen Original „Briefly unavailable for scheduled maintenance. Check back in a minute.“, in der deutschen Übersetzung (Sie-Form) „Diese Website ist aufgrund planmäßiger Wartungsarbeiten vorübergehend nicht verfügbar. Bitte versuchen Sie es in wenigen Minuten erneut.“ Dazu sendet WordPress den Statuscode 503 und den Header `Retry-After: 600`.',
            '**Wer die Meldung sieht:** alle, auch angemeldete Administratoren. Die Prüfung läuft sehr früh, noch bevor Plugins geladen werden. Deshalb ist auch der Verwaltungsbereich gesperrt.',
            '**Eigene Wartungsseite:** Liegt die Datei `wp-content/maintenance.php` vor, zeigt WordPress deren Inhalt statt des Standardtextes.',
          ],
        },
        { t: 'note', kind: 'info', title: 'Das Löschen der Datei ist ungefährlich', x: 'Die Datei `.maintenance` enthält nur einen Zeitstempel. Sie zu löschen, verändert weder Inhalte noch Einstellungen. Ob das Update davor vollständig durchgelaufen ist, prüfen Sie anschließend (siehe unten).' },
      ],
    },
    {
      id: 'erkennen',
      h2: 'Erst erkennen: Welcher Wartungsmodus ist es?',
      blocks: [
        { t: 'p', x: 'Nicht jede Wartungsseite stammt von WordPress selbst. Die Beobachtung zeigt meist, wo Sie ansetzen müssen:' },
        {
          t: 'table',
          caption: 'Beobachtung, wahrscheinliche Ursache und weiteres Vorgehen',
          head: ['Beobachtung', 'Wahrscheinliche Ursache', 'Weiter bei'],
          rows: [
            ['Standardtext von WordPress („… planmäßiger Wartungsarbeiten …“), und kurz zuvor lief ein Update', 'Ein Update des Kerns, ein Sammel-Update oder ein Hintergrund-Update wurde unterbrochen', 'Schritt für Schritt: Wartungsmodus beenden'],
            ['Eigene Gestaltung mit Logo und Text wie „Bald verfügbar“ oder „Coming soon“', 'Wartungsmodus-Plugin, Theme-Funktion oder Page Builder', 'Wenn die Datei fehlt: Plugin, Theme oder Hoster'],
            ['Besucher sehen die Wartungsseite, Sie als angemeldeter Administrator die normale Website', 'Wartungsmodus-Plugin mit Ausnahme für angemeldete Nutzer', 'Wenn die Datei fehlt: Plugin, Theme oder Hoster'],
            ['Die Seite sieht aus wie eine Vorlage Ihres Hosters', 'Wartung oder Platzhalter im Hosting-Paket, etwa nach einem Umzug oder bei gesperrtem Konto', 'Kundenbereich und Support des Hosters'],
            ['Weißer Bildschirm oder „Es gab einen kritischen Fehler“', 'Kein Wartungsmodus, sondern ein PHP-Fehler', 'Ratgeber [WordPress: kritischer Fehler](/ratgeber/wordpress-kritischer-fehler-beheben)'],
            ['Die Meldung verschwindet und kommt nach einigen Minuten wieder', 'Ein fehlgeschlagenes automatisches Update wird immer wieder neu gestartet', 'Warum Updates abbrechen'],
          ],
        },
        { t: 'p', x: 'Prüfen Sie außerdem in einem privaten Browserfenster, auf einem anderen Gerät oder im Mobilfunknetz, ob die Meldung wirklich vom Server kommt. Browser, Caching-Plugins und CDN können eine Wartungsseite zwischenspeichern.' },
      ],
    },
    {
      id: 'loesung',
      h2: 'Schritt für Schritt: Wartungsmodus beenden',
      blocks: [
        {
          t: 'steps',
          items: [
            { h: 'Zehn Minuten warten und neu laden', x: 'Läuft das Update noch, greifen Sie nicht ein. Warten Sie zehn Minuten ab dem Start des Updates. Danach ignoriert WordPress eine liegen gebliebene Datei. Laden Sie die Seite anschließend in einem privaten Fenster neu.' },
            { h: 'Zugang zu den Dateien herstellen', x: 'Öffnen Sie den Dateimanager Ihres Hosting-Panels oder verbinden Sie sich per FTP oder SFTP. Wechseln Sie in das Verzeichnis, in dem `wp-config.php`, `wp-admin` und `wp-includes` liegen. Der Ordner `wp-content` ist nicht gemeint.' },
            { h: 'Versteckte Dateien einblenden', x: 'Dateien, deren Name mit einem Punkt beginnt, blenden viele Programme aus. Schalten Sie die Anzeige versteckter Dateien ein, bei FileZilla zum Beispiel im Menü „Server“.' },
            { h: 'Die Datei „.maintenance“ löschen', x: 'Löschen Sie die Datei oder benennen Sie sie zur Sicherheit in `.maintenance-alt` um. Per SSH genügt `rm .maintenance`, mit WP-CLI der Befehl `wp maintenance-mode deactivate`.' },
            { h: 'Zwischenspeicher leeren und testen', x: 'Laden Sie Startseite und Verwaltungsbereich neu. Leeren Sie bei Bedarf Browser-Cache, Caching-Plugin und CDN. Kommt die Wartungsseite nicht zurück, ist der Wartungsmodus beendet.' },
            { h: 'Das Ergebnis des Updates prüfen', x: 'Öffnen Sie „Dashboard → Aktualisierungen“. Sind dort weiterhin Updates offen, spielen Sie sie nach einer Sicherung erneut ein. Nach einem unterbrochenen Update des Kerns bietet WordPress an gleicher Stelle an, die Version neu zu installieren, und verlangt gegebenenfalls ein Datenbank-Update.' },
          ],
        },
        { t: 'code', label: 'Per SSH und WP-CLI (Beispiel; Pfad und Zugang hängen von Ihrem Hoster ab)', x: 'cd /pfad/zur/wordpress-installation\nls -la | grep maintenance\nwp maintenance-mode status\nwp maintenance-mode deactivate\n\n# ohne WP-CLI:\nrm .maintenance' },
        { t: 'note', kind: 'tip', title: 'Erst sichern, dann erneut aktualisieren', x: 'Legen Sie vor dem nächsten Update-Versuch eine Sicherung von Dateien und Datenbank an und prüfen Sie, dass sie sich wiederherstellen lässt. Die WordPress-Dokumentation nennt eine geprüfte Sicherung als ersten Schritt jedes Updates.' },
      ],
    },
    {
      id: 'andere-ursachen',
      h2: 'Wenn die Datei fehlt: Plugin, Theme oder Hoster',
      blocks: [
        { t: 'p', x: 'Gibt es keine Datei `.maintenance`, oder kommt die Meldung nach dem Löschen sofort zurück, stammt die Wartungsseite meist nicht vom Update-Mechanismus.' },
        {
          t: 'ul',
          items: [
            '**Wartungsmodus-Plugin oder Page Builder:** Melden Sie sich an und schalten Sie den Modus in den Einstellungen des Plugins aus, oder deaktivieren Sie das Plugin unter „Plugins → Installierte Plugins“.',
            '**Kein Zugang zum Verwaltungsbereich:** Benennen Sie den Ordner des Plugins unter `wp-content/plugins` um, zum Beispiel `wartungsmodus-plugin` in `wartungsmodus-plugin_aus`. WordPress deaktiviert es dann. Mit WP-CLI geht es über `wp plugin deactivate plugin-name`.',
            '**Theme-Funktion:** Manche Themes bringen einen eigenen Wartungs- oder „Coming soon“-Schalter mit. Suchen Sie ihn in den Theme-Einstellungen oder im Customizer.',
            '**Hoster:** Zeigt die Seite die Gestaltung Ihres Hosters, prüfen Sie Vertrag und Zahlungsstatus, Störungsmeldungen und den Kundenbereich.',
            '**Eigene Wartungsseite:** Liegt `wp-content/maintenance.php` vor, bestimmt diese Datei das Aussehen der WordPress-Wartungsseite. Sie erscheint nur, solange der Wartungsmodus des Kerns aktiv ist.',
          ],
        },
      ],
    },
    {
      id: 'ursachen',
      h2: 'Warum Updates abbrechen',
      blocks: [
        { t: 'p', x: 'Ein Update bricht ab, wenn der Prozess endet, bevor WordPress die Datei löschen kann. Häufige Gründe:' },
        {
          t: 'table',
          caption: 'Häufige Gründe für abgebrochene Updates',
          head: ['Grund', 'So erkennen Sie ihn', 'Abhilfe'],
          rows: [
            ['Zu kurze PHP-Laufzeit (`max_execution_time`)', 'Das Update bricht bei großen Paketen oder langsamen Servern nach einer festen Zeit ab', 'Beim Hoster ein höheres Limit erfragen; Updates einzeln einspielen'],
            ['Zu wenig Arbeitsspeicher (`memory_limit`)', 'Das Fehlerprotokoll nennt „Allowed memory size … exhausted“', 'Limit erhöhen oder den Hoster fragen, siehe Ratgeber [WordPress: kritischer Fehler](/ratgeber/wordpress-kritischer-fehler-beheben)'],
            ['Speicherplatz oder Dateikontingent erschöpft', 'Das Hosting-Panel zeigt eine volle Festplatte oder ein volles Kontingent', 'Platz schaffen, etwa durch alte Sicherungen und Caches; Tarif prüfen'],
            ['Dateirechte oder Eigentümer falsch', 'WordPress verlangt FTP-Zugangsdaten oder meldet, dass es Dateien nicht ersetzen kann', 'Rechte vom Hoster korrigieren lassen'],
            ['Mehrere Updates gleichzeitig oder Browser-Tab geschlossen', 'Ein Sammel-Update wurde mittendrin unterbrochen', 'Updates einzeln einspielen und den Tab offen lassen'],
            ['Fehlerhafte Erweiterung', 'Das Update schlägt immer bei derselben Erweiterung fehl, die Datei erscheint wieder', 'Die Erweiterung vorübergehend vom automatischen Update ausnehmen und den Entwickler informieren'],
          ],
        },
        { t: 'p', x: 'Taucht die Datei nach dem Löschen nach einigen Minuten wieder auf, kann ein fehlgeschlagenes automatisches Update immer wieder neu gestartet werden. Prüfen Sie dann unter „Dashboard → Aktualisierungen“ und „Werkzeuge → Website-Zustand“, welche Erweiterung betroffen ist, und schalten Sie deren automatische Updates ab, bis die Ursache geklärt ist.' },
      ],
    },
    {
      id: 'wartungsseite',
      h2: 'Geplante Wartung: Wartungsseite richtig anzeigen',
      blocks: [
        { t: 'p', x: 'Wollen Sie die Website bewusst kurz offline nehmen, etwa für einen Umbau, sollte die Wartungsseite wie bei WordPress selbst den Statuscode 503 liefern, möglichst mit dem Header `Retry-After`. Mehr dazu steht im Ratgeber [Website nicht erreichbar](/ratgeber/website-nicht-erreichbar).' },
        { t: 'p', x: 'Google verlangsamt bei Serverfehlern das Crawling vorübergehend. Bereits indexierte URLs bleiben zunächst im Index, werden bei anhaltenden Fehlern aber irgendwann entfernt. Halten Sie Wartungsfenster deshalb kurz und lassen Sie keine Wartungsseite über längere Zeit stehen.' },
      ],
    },
    {
      id: 'vorbeugen',
      h2: 'So vermeiden Sie den Fehler beim nächsten Update',
      blocks: [
        {
          t: 'ol',
          items: [
            'Vor jedem Update eine Sicherung von Dateien und Datenbank anlegen und prüfen, dass sie sich wiederherstellen lässt.',
            'Updates nacheinander statt alle auf einmal einspielen und nach jedem Schritt kurz die Funktionen testen.',
            'Den Browser-Tab während des Updates offen lassen und währenddessen keine weiteren Änderungen vornehmen.',
            'Größere Updates in ruhigen Zeiten durchführen, nicht kurz vor einer Kampagne.',
            'Bei geschäftskritischen Websites zuerst eine Testkopie aktualisieren, sofern der Hoster eine anbietet.',
            'Freien Speicherplatz, PHP-Limits und die PHP-Version regelmäßig prüfen, siehe Ratgeber [Website-Wartung](/ratgeber/website-wartung).',
            'Die Erreichbarkeit überwachen lassen, damit Sie von einem Ausfall nicht erst durch Kunden erfahren.',
          ],
        },
      ],
    },
    {
      id: 'hilfe',
      h2: 'Wann Sie Hilfe holen sollten',
      blocks: [
        { t: 'p', x: 'Hilfe lohnt sich, wenn Sie keinen Zugang zu Dateien oder Hosting haben, die Meldung nach dem Löschen der Datei wiederkehrt, das Update erkennbar nur zur Hälfte durchgelaufen ist oder Sie nach dem Eingriff Daten vermissen.' },
        { t: 'p', x: 'Das Beenden eines hängenden Wartungsmodus und die Kontrolle des Updates gehören zu unserer [Schnellreparatur](/website-repair?lang=de) ({price.quick}, {time.quick}). Regelmäßige, geordnete Updates mit Sicherung übernimmt die [Website-Pflege](/website-care?lang=de) ({price.care}). Die Preise verstehen sich netto zzgl. 19 % USt.' },
        { t: 'note', kind: 'info', title: 'Was die kostenlose Prüfung hier zeigt', x: 'Die [kostenlose Website-Prüfung](/website-check?lang=de) sieht von außen, ob die Startseite erreichbar ist oder einen Serverfehler wie 503 liefert. Welche Datei auf dem Server liegt und welches Update hängt, sehen wir ohne zusätzlichen Zugang nicht.' },
      ],
    },
  ],
  faq: [
    { q: 'Wie lange dauert der Wartungsmodus von WordPress normalerweise?', a: 'Meist nur Sekunden bis wenige Minuten. WordPress betrachtet den Wartungsmodus nach zehn Minuten als beendet und ignoriert eine liegen gebliebene Datei `.maintenance`.' },
    { q: 'Wo liegt die Datei .maintenance?', a: 'Im Hauptverzeichnis der WordPress-Installation, in dem auch `wp-config.php`, `wp-admin` und `wp-includes` liegen. Sie ist versteckt, weil ihr Name mit einem Punkt beginnt. Schalten Sie in Ihrem FTP-Programm oder Dateimanager die Anzeige versteckter Dateien ein.' },
    { q: 'Kann ich mich im Wartungsmodus noch im Dashboard anmelden?', a: 'Beim Wartungsmodus des WordPress-Kerns nicht: Die Prüfung läuft, bevor Plugins und Anmeldung geladen werden, und gilt für alle. Wartungsmodus-Plugins lassen angemeldete Nutzer dagegen häufig durch, daher sehen Sie dort selbst die normale Website.' },
    { q: 'Schadet ein hängender Wartungsmodus meinem Google-Ranking?', a: 'Bei Serverfehlern wie 503 verlangsamt Google das Crawling vorübergehend. Bereits indexierte URLs bleiben zunächst im Index, werden bei anhaltenden Fehlern aber entfernt. Eine Unterbrechung von wenigen Minuten ist daher kein Anlass zur Sorge, über längere Zeit sollte sie nicht bestehen.' },
    { q: 'Muss ich die Datei löschen, oder reicht Warten?', a: 'Nach zehn Minuten ignoriert WordPress eine veraltete Datei, die Website kommt dann in der Regel von selbst zurück. Löschen Sie sie trotzdem, sobald sicher ist, dass kein Update mehr läuft, damit sie keine Verwirrung stiftet.' },
    { q: 'Ist die Datei .maintenance gefährlich oder ein Zeichen für einen Hack?', a: 'Nein. Sie gehört zum normalen Update-Ablauf und enthält nur einen Zeitstempel. Verdächtig sind dagegen unbekannte PHP-Dateien, die Sie nicht selbst angelegt haben.' },
    { q: 'Wie schalte ich den Wartungsmodus mit WP-CLI aus?', a: 'Mit `wp maintenance-mode deactivate`. Vorher zeigt `wp maintenance-mode status`, ob er aktiv ist. WP-CLI läuft auf der Kommandozeile Ihres Servers und setzt einen Zugang per SSH voraus.' },
  ],
  service: 'repair',
  related: ['wordpress-kritischer-fehler-beheben', 'website-wartung', 'website-nicht-erreichbar'],
  sources: [
    { label: 'WordPress-Quellcode: wp-includes/load.php (wp_is_maintenance_mode, wp_maintenance)', url: 'https://github.com/WordPress/WordPress/blob/master/wp-includes/load.php' },
    { label: 'WordPress-Quellcode: class-wp-upgrader.php (maintenance_mode)', url: 'https://github.com/WordPress/WordPress/blob/master/wp-admin/includes/class-wp-upgrader.php' },
    { label: 'WordPress: Häufige Fehler und ihre Behebung (Abschnitt Maintenance Mode Following Upgrade)', url: 'https://developer.wordpress.org/advanced-administration/wordpress/common-errors/' },
    { label: 'WP-CLI: wp maintenance-mode', url: 'https://developer.wordpress.org/cli/commands/maintenance-mode/' },
    { label: 'WP-CLI: wp plugin deactivate', url: 'https://developer.wordpress.org/cli/commands/plugin/deactivate/' },
    { label: 'WordPress: Upgrading WordPress (Sicherung, automatische Updates)', url: 'https://developer.wordpress.org/advanced-administration/upgrade/upgrading/' },
    { label: 'Google: HTTP-Statuscodes sowie Netzwerk- und DNS-Fehler', url: 'https://developers.google.com/crawling/docs/troubleshooting/http-status-codes?hl=de' },
    { label: 'MDN: 503 Service Unavailable', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/503' },
  ],
  published: '2026-10-02',
  modified: '2026-10-02',
};
