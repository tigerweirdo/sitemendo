import type { Guide } from './types';

export const wordpressKritischerFehlerBeheben: Guide = {
  slug: 'wordpress-kritischer-fehler-beheben',
  category: 'Technik und Wartung',
  check: 'stack',
  short: 'WordPress: kritischer Fehler',
  title: 'WordPress: Kritischer Fehler beheben',
  h1: 'WordPress „Es gab einen kritischen Fehler“: Ursachen und Lösung',
  description: 'WordPress meldet „Es gab einen kritischen Fehler“? So nutzen Sie den Wiederherstellungsmodus, deaktivieren Plugins und lesen das Fehlerprotokoll.',
  teaser: 'Wiederherstellungsmodus nutzen, Plugins per Dateizugriff deaktivieren und das Fehlerprotokoll lesen, ohne dabei Daten zu riskieren.',
  tldr: [
    'Die Meldung bedeutet, dass WordPress auf einen schwerwiegenden PHP-Fehler gestoßen ist, meist ausgelöst durch ein Plugin, ein Theme, eine neue PHP-Version oder zu wenig Speicher.',
    'Seit Version 5.2 schickt WordPress eine E-Mail an die Administrator-Adresse der Website mit einem geheimen Link zum Wiederherstellungsmodus. Darüber lässt sich die verursachende Erweiterung deaktivieren.',
    'Ohne diese E-Mail hilft der Dateizugriff: Den Ordner `plugins` umzubenennen, deaktiviert alle Plugins. Danach aktivieren Sie sie einzeln wieder oder lesen das Fehlerprotokoll.',
    'Legen Sie vor Eingriffen eine Sicherung an. Das Fehlerprotokoll aktivieren Sie auf einer Live-Website nur kurz und ohne Anzeige der Fehler im Browser und entfernen es danach wieder.',
  ],
  intro: [
    'Eben lief die Website noch. Nach einem Update oder einer Änderung zeigt sie nur noch eine Meldung: „Es gab einen kritischen Fehler auf deiner Website.“ Das wirkt dramatisch, lässt sich aber meist gut eingrenzen, weil WordPress selbst Hinweise liefert.',
    'Dieser Ratgeber erklärt, was die Meldung bedeutet, wie Sie den Wiederherstellungsmodus nutzen, wie Sie ohne ihn die Ursache finden und worauf Sie dabei achten sollten.',
  ],
  sections: [
    {
      id: 'bedeutung',
      h2: 'Was die Meldung bedeutet',
      blocks: [
        { t: 'p', x: 'Seit WordPress 5.2 fängt ein Fehlerschutz schwere PHP-Fehler ab. Statt einer weißen Seite zeigt WordPress eine Fehlermeldung und benachrichtigt die Administratoren. Die Meldung nennt die Ursache nicht selbst. Typische Auslöser sind:' },
        {
          t: 'ul',
          items: [
            'ein Update von Plugin oder Theme, das einen Fehler enthält oder nicht zur PHP-Version passt,',
            'eine geänderte PHP-Version beim Hoster,',
            'ein Konflikt zwischen zwei Plugins,',
            'ein unterbrochenes Update,',
            'eine fehlerhafte Änderung am Code, zum Beispiel in der `functions.php` des Themes,',
            'zu wenig PHP-Speicher,',
            'beschädigte oder fehlende Dateien.',
          ],
        },
      ],
    },
    {
      id: 'vorbereitung',
      h2: 'Bevor Sie etwas ändern',
      blocks: [
        {
          t: 'ul',
          items: [
            '**Sicherung anlegen:** Dateien und Datenbank, auch wenn die Website nicht läuft. Die meisten Hosting-Panels bieten eine Sicherungsfunktion. Überschreiben Sie eine vorhandene Sicherung nicht.',
            '**Zugänge bereithalten:** Hosting-Panel, FTP- oder SFTP-Zugang beziehungsweise Dateimanager, bei Bedarf der Datenbank-Zugang.',
            '**Letzte Änderung notieren:** Update, neues Plugin, Wechsel der PHP-Version. Oft ist das bereits die Lösung: Die letzte Änderung rückgängig zu machen, genügt.',
            '**Auf einer Kopie arbeiten,** wenn die Website geschäftskritisch ist und Ihr Hoster eine Testumgebung anbietet.',
          ],
        },
      ],
    },
    {
      id: 'wiederherstellung',
      h2: 'Schritt 1: Den Wiederherstellungsmodus nutzen',
      blocks: [
        {
          t: 'steps',
          items: [
            { h: 'E-Mail suchen', x: 'WordPress sendet eine E-Mail an die Administrator-E-Mail-Adresse der Website, die Sie unter „Einstellungen → Allgemein“ finden. Sie enthält einen geheimen Link zum Wiederherstellungsmodus. Das ist nicht zwingend die Adresse Ihres Benutzerkontos. Schauen Sie auch im Spam-Ordner nach.' },
            { h: 'Link öffnen und anmelden', x: 'Über den Link melden Sie sich im Wiederherstellungsmodus an. In dieser Sitzung bleibt die fehlerhafte Erweiterung pausiert, sodass Sie in den Verwaltungsbereich gelangen.' },
            { h: 'Erweiterung deaktivieren oder aktualisieren', x: 'Deaktivieren Sie die betroffene Erweiterung, oder prüfen Sie, ob ein Update vorliegt. Laut WordPress können Administratoren die Erweiterung vollständig deaktivieren, den Fehler selbst beheben oder den Autor der Erweiterung um Hilfe bitten.' },
            { h: 'Wiederherstellungsmodus beenden', x: 'Beenden Sie ihn über die Schaltfläche in der Verwaltung. Danach laufen alle Erweiterungen wieder wie gewohnt. Prüfen Sie jetzt Startseite, Formular und Verwaltungsbereich.' },
          ],
        },
      ],
    },
    {
      id: 'dateizugriff',
      h2: 'Schritt 2: Ohne E-Mail die Plugins per Dateizugriff deaktivieren',
      blocks: [
        {
          t: 'steps',
          items: [
            { h: 'Mit dem Server verbinden', x: 'Nutzen Sie FTP, SFTP oder den Dateimanager Ihres Hosting-Panels und öffnen Sie das WordPress-Verzeichnis.' },
            { h: 'Plugin-Ordner umbenennen', x: 'Benennen Sie `wp-content/plugins` in `plugins_old` um. Laut WordPress-Dokumentation werden dadurch alle Plugins deaktiviert.' },
            { h: 'Website testen', x: 'Lädt die Website oder zumindest die Anmeldung wieder, war ein Plugin die Ursache. Lädt sie weiterhin nicht, fahren Sie mit dem Theme fort.' },
            { h: 'Ordner zurückbenennen und einzeln aktivieren', x: 'Benennen Sie den Ordner zurück in `plugins` und melden Sie sich an. Aktivieren Sie die Plugins nacheinander, bis der Fehler wieder auftritt. Das zuletzt aktivierte Plugin ist der Verursacher.' },
            { h: 'Gezielt ein einzelnes Plugin abschalten', x: 'Alternativ benennen Sie nur den Ordner des verdächtigen Plugins unterhalb von `wp-content/plugins` um, etwa `plugin-name` in `plugin-name_aus`.' },
            { h: 'Theme prüfen', x: 'Bleibt der Fehler, liegt es womöglich am Theme. Benennen Sie den Ordner des aktiven Themes unter `wp-content/themes` um. WordPress weicht dann auf ein Standard-Theme aus, sofern eines installiert ist.' },
          ],
        },
      ],
    },
    {
      id: 'protokoll',
      h2: 'Schritt 3: Das Fehlerprotokoll lesen',
      blocks: [
        { t: 'p', x: 'Das Fehlerprotokoll nennt meist Datei und Zeile, in der der Fehler auftritt. Der Pfad zeigt den Verursacher: Steht dort `wp-content/plugins/plugin-name/…`, ist es dieses Plugin, bei `wp-content/themes/theme-name/…` das Theme.' },
        { t: 'p', x: 'Zum Aktivieren des Protokolls tragen Sie in der Datei `wp-config.php` oberhalb der Zeile „That’s all, stop editing!“ Folgendes ein:' },
        { t: 'code', label: 'wp-config.php: Fehlerprotokoll aktivieren (Beispiel aus der WordPress-Dokumentation)', x: "define( 'WP_DEBUG', true );\ndefine( 'WP_DEBUG_LOG', true );\ndefine( 'WP_DEBUG_DISPLAY', false );\n@ini_set( 'display_errors', 0 );" },
        { t: 'p', x: 'Das Protokoll liegt danach unter `wp-content/debug.log`. Die WordPress-Dokumentation empfiehlt die Debug-Werkzeuge nur für lokale Tests und Staging-Kopien. Aktivieren Sie sie auf einer Live-Website deshalb nur kurz, lassen Sie Fehler nicht im Browser anzeigen (`WP_DEBUG_DISPLAY` auf `false`) und entfernen Sie die Zeilen und die Datei `debug.log` nach der Analyse wieder. Die Datei kann Pfade und Fehlerdetails enthalten und je nach Serverkonfiguration über das Internet abrufbar sein.' },
        {
          t: 'table',
          caption: 'Typische Zeilen im Fehlerprotokoll',
          head: ['Meldung', 'Bedeutung', 'Lösung'],
          rows: [
            ['Allowed memory size of … bytes exhausted', 'Das PHP-Speicherlimit wurde erreicht.', 'Limit in der `wp-config.php` oder `php.ini` erhöhen (siehe WordPress-Dokumentation) oder beim Hoster nachfragen; den Verursacher des hohen Verbrauchs suchen.'],
            ['Parse error: syntax error …', 'Syntaxfehler im Code, oft nach einer manuellen Änderung.', 'Änderung rückgängig machen oder den Fehler in der genannten Zeile korrigieren.'],
            ['Call to undefined function …', 'Eine Funktion fehlt: Das Plugin oder Theme verlangt eine andere PHP- oder Plugin-Version, oder eine Datei fehlt.', 'Versionen prüfen, aktualisieren oder das Plugin neu installieren.'],
            ['Uncaught Error … in …/wp-content/plugins/…', 'Der Fehler tritt in dem im Pfad genannten Plugin auf.', 'Plugin deaktivieren, aktualisieren oder ersetzen; dem Entwickler den Fehlertext melden.'],
            ['Cannot redeclare …', 'Eine Funktion oder Klasse wird doppelt definiert, oft durch zwei Plugins oder doppelte Dateien.', 'Eines der beteiligten Plugins deaktivieren.'],
          ],
        },
        { t: 'code', label: 'wp-config.php: PHP-Speicherlimit anheben (Beispiel; der erlaubte Wert hängt von Ihrem Tarif ab)', x: "define( 'WP_MEMORY_LIMIT', '256M' );" },
      ],
    },
    {
      id: 'weitere-ursachen',
      h2: 'Weitere Ursachen und Fehlerbilder',
      blocks: [
        {
          t: 'ul',
          items: [
            '**Neue PHP-Version:** Hat der Hoster die PHP-Version geändert oder haben Sie sie umgestellt, laufen ältere Plugins und Themes manchmal nicht mehr. Stellen Sie testweise auf die vorherige Version zurück und aktualisieren Sie dann die Erweiterungen. Wie lange welche PHP-Version unterstützt wird, steht im Ratgeber [Website-Wartung](/ratgeber/website-wartung).',
            '**Unterbrochenes Update:** Bleibt die Meldung zur kurzzeitigen Nichtverfügbarkeit stehen, löschen Sie laut WordPress-Dokumentation die Datei `.maintenance` im Hauptverzeichnis.',
            '**Beschädigte Konfigurationsdatei:** Bei einem Internal Server Error nennt die Dokumentation als wahrscheinlichste Ursache eine beschädigte `.htaccess`. Benennen Sie sie um und lassen Sie sie unter „Einstellungen → Permalinks“ neu erzeugen.',
            '**Datenbankfehler:** Bei der Meldung zum Aufbau der Datenbankverbindung prüfen Sie Name, Benutzer, Passwort und Host in der `wp-config.php` und fragen den Hoster, ob die Datenbank erreichbar ist und ihr Kontingent nicht erschöpft ist.',
          ],
        },
        { t: 'p', x: 'Zu allgemeinen Ausfällen und Fehlercodes wie 500, 502 oder 503 lesen Sie den Ratgeber [Website nicht erreichbar](/ratgeber/website-nicht-erreichbar).' },
      ],
    },
    {
      id: 'danach',
      h2: 'Nach der Behebung',
      blocks: [
        {
          t: 'ol',
          items: [
            'Debug-Einstellungen aus der `wp-config.php` entfernen und die Datei `debug.log` löschen.',
            'Das verursachende Plugin oder Theme aktualisieren, ersetzen oder löschen.',
            'Alle nicht benötigten Plugins und Themes löschen, nicht nur deaktivieren.',
            'Startseite, Formular und wichtige Unterseiten am Computer und auf dem Handy testen. Das Formular prüfen Sie mit dem Ratgeber [Kontaktformular funktioniert nicht](/ratgeber/kontaktformular-funktioniert-nicht).',
            'Eine frische Sicherung anlegen.',
            'Künftig Updates erst nach einer Sicherung einspielen und danach die Funktionen testen.',
          ],
        },
      ],
    },
    {
      id: 'hilfe',
      h2: 'Wann Sie Hilfe holen sollten',
      blocks: [
        { t: 'p', x: 'Hilfe lohnt sich, wenn Sie keinen Zugang zu Dateien oder Hosting haben, die Ursache nicht eingrenzen können, Daten verloren scheinen oder Sie einen Angriff vermuten.' },
        { t: 'p', x: 'Ob die Behebung eines solchen Fehlers unter unsere [Schnellreparatur](/website-repair?lang=de) ({price.quick}, {time.quick}) fällt, klären wir vor Arbeitsbeginn. Die [Website-Pflege](/website-care?lang=de) ({price.care}) vermeidet viele dieser Fälle durch geordnete Updates und Sicherungen. Die Preise verstehen sich netto zzgl. 19 % USt.' },
        { t: 'note', kind: 'info', title: 'Was von außen sichtbar ist', x: 'Die kostenlose Prüfung sieht nur, was ohne Anmeldung erreichbar ist. Plugins, Sicherungen und den Verwaltungsbereich sehen wir ohne zusätzlichen Zugang nicht.' },
      ],
    },
  ],
  faq: [
    { q: 'Was bedeutet „Es gab einen kritischen Fehler auf deiner Website“?', a: 'WordPress hat einen schwerwiegenden PHP-Fehler abgefangen und zeigt statt der Seite eine Meldung. Die Ursache liegt meist in einem Plugin, einem Theme, einer neuen PHP-Version oder zu wenig Speicher.' },
    { q: 'Ich habe keine E-Mail von WordPress erhalten. Was nun?', a: 'Die E-Mail geht an die Administrator-E-Mail-Adresse der Website, nicht zwingend an Ihre Benutzer-Adresse. Prüfen Sie auch den Spam-Ordner. Kommt keine E-Mail an, etwa weil der E-Mail-Versand der Website selbst gestört ist, deaktivieren Sie die Plugins per Dateizugriff.' },
    { q: 'Gehen beim Umbenennen des Plugin-Ordners Daten verloren?', a: 'In der Regel nicht: Das Umbenennen löscht keine Dateien, es deaktiviert die Plugins, und deren Einstellungen liegen meist in der Datenbank. Nach dem Zurückbenennen müssen Sie die Plugins aber einzeln wieder aktivieren. Legen Sie vorher eine Sicherung an.' },
    { q: 'Kann ein PHP-Update den Fehler auslösen?', a: 'Ja. Nicht alle Plugins und Themes laufen mit jeder PHP-Version. Fragen Sie Ihren Hoster, ob die PHP-Version kürzlich geändert wurde, und stellen Sie sie testweise zurück.' },
    { q: 'Soll ich WP_DEBUG dauerhaft aktiviert lassen?', a: 'Nein. Laut WordPress-Dokumentation sind die Debug-Werkzeuge für lokale Tests und Staging-Kopien gedacht. Auf einer Live-Website aktivieren Sie sie nur kurz und entfernen sie danach wieder.' },
    { q: 'Wie vermeide ich den Fehler in Zukunft?', a: 'Spielen Sie Updates erst nach einer Sicherung ein, testen Sie danach die Funktionen, nutzen Sie nur Plugins, die Sie wirklich brauchen, und behalten Sie die PHP-Version im Blick. Mehr dazu im Ratgeber [Website-Wartung](/ratgeber/website-wartung).' },
  ],
  service: 'repair',
  related: ['website-wartung', 'website-nicht-erreichbar', 'kontaktformular-funktioniert-nicht'],
  sources: [
    { label: 'WordPress: Fatal Error Recovery Mode in 5.2', url: 'https://make.wordpress.org/core/2019/04/16/fatal-error-recovery-mode-in-5-2/' },
    { label: 'WordPress: Debugging in WordPress', url: 'https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/' },
    { label: 'WordPress: Häufige Fehler und ihre Behebung', url: 'https://developer.wordpress.org/advanced-administration/wordpress/common-errors/' },
    { label: 'PHP: Unterstützte Versionen', url: 'https://www.php.net/supported-versions.php' },
  ],
  published: '2026-10-01',
  modified: '2026-10-01',
};
