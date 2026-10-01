import type { Guide } from './types';

export const defekteLinksFindenBeheben: Guide = {
  lang: 'de',
  slug: 'defekte-links-finden-beheben',
  category: 'Links',
  check: 'links',
  short: 'Defekte Links finden und beheben',
  title: 'Defekte Links finden und beheben: 404-Fehler',
  h1: 'Defekte Links finden und beheben: So werden Sie 404-Fehler los',
  description: 'Defekte Links und 404-Fehler finden und reparieren: Werkzeuge, Entscheidungshilfe für Weiterleitungen, 301-Beispiele und was Google zu 404-Seiten sagt.',
  teaser: 'Tote Links aufspüren, richtig reparieren und mit 301-Weiterleitungen sauber lösen, ohne Besucher zu verlieren.',
  tldr: [
    'Ein defekter Link führt auf eine Seite, die es nicht gibt (Fehler 404). Besucher stoßen dort auf eine Sackgasse.',
    'Google nimmt Adressen mit 4xx-Status nicht in den Index auf. Für bewusst gelöschte Seiten ist das normal und betrifft den Rest der Website nicht; problematisch sind Links, die Besucher ins Leere führen.',
    'Finden Sie defekte Links mit der Search Console, einem Crawler oder einem Link-Checker. Beheben Sie sie, indem Sie den Link korrigieren, eine 301-Weiterleitung einrichten oder den Link entfernen.',
    'Eine echte 404-Seite muss auch den Statuscode 404 liefern, sonst gilt sie als „Soft 404“.',
  ],
  intro: [
    'Ein defekter Link (englisch: Broken Link) verweist auf eine Adresse, unter der kein Inhalt mehr liegt. Der Server antwortet dann mit dem Statuscode 404 („nicht gefunden“) oder einem anderen Fehler. Besucher sehen eine Fehlerseite statt der erwarteten Information und verlassen die Website oft an dieser Stelle.',
    'Defekte Links entstehen beim Umbau, beim Löschen von Seiten, beim Wechsel der Adressstruktur, durch Tippfehler oder weil eine externe Seite verschwunden ist. Selten sind sie ein Notfall, aufräumen sollten Sie sie dennoch regelmäßig.',
  ],
  sections: [
    {
      id: 'was-google-sagt',
      h2: 'Schaden 404-Fehler dem Ranking? Was Google dazu sagt',
      blocks: [
        { t: 'p', x: 'Laut der Dokumentation von Google werden Adressen, die einen 4xx-Statuscode zurückgeben, nicht indexiert; bereits indexierte Adressen mit 4xx werden wieder aus dem Index entfernt. Die Crawl-Häufigkeit für solche Adressen sinkt nach und nach, und die 4xx-Codes (außer 429) beeinflussen die Crawling-Rate der übrigen Website nicht.' },
        { t: 'p', x: 'Für Sie heißt das: Eine gelöschte Seite, die zu Recht nicht mehr existiert, ist kein Fehler, den Sie beheben müssten. Wichtig sind drei Fälle:' },
        {
          t: 'ul',
          items: [
            'Interne Links führen auf eine Seite, die es nicht mehr gibt: Besucher laufen in eine Sackgasse.',
            'Eine Seite mit Besuchern oder Verweisen von außen wurde gelöscht, ohne auf eine passende neue Seite zu verweisen.',
            'Eine Fehlerseite liefert den Statuscode 200 statt 404 (sogenannter Soft 404).',
          ],
        },
      ],
    },
    {
      id: 'finden',
      h2: 'Defekte Links finden: Methoden im Vergleich',
      blocks: [
        {
          t: 'table',
          caption: 'Werkzeuge zum Finden defekter Links',
          head: ['Methode', 'Geeignet für', 'Aufwand und Hinweise'],
          rows: [
            ['Von Hand durchklicken', 'Kleine Websites mit wenigen Seiten', 'Gering, aber fehleranfällig. Menü, Fußzeile und Schaltflächen nicht vergessen.'],
            ['Google Search Console', 'Alle Websites, die dort eingerichtet sind', 'Gering. Der Seitenindexierungsbericht nennt Adressen mit „Nicht gefunden (404)“ und „Soft 404-Fehler“. Er zeigt, was Google selbst abgerufen hat, nicht jeden Link Ihrer Seiten.'],
            ['Online-Link-Checker, zum Beispiel der W3C Link Checker', 'Einzelne Seiten', 'Gering. Prüft nur die eingegebene Seite. Websites, die Prüfwerkzeuge blockieren, erzeugen Fehlalarme.'],
            ['Desktop-Crawler, zum Beispiel Screaming Frog SEO Spider', 'Komplette Websites', 'Mittel. Durchsucht die Website wie eine Suchmaschine. Die kostenlose Version prüft eine begrenzte Zahl von Adressen.'],
            ['WordPress-Plugins zur Linkprüfung', 'WordPress-Websites', 'Mittel. Manche Plugins belasten den Server; lassen Sie sie nur gelegentlich laufen oder nutzen Sie ein externes Werkzeug.'],
          ],
        },
        { t: 'note', kind: 'warn', title: 'Fehlalarme prüfen', x: 'Antwortet eine externe Seite mit 403 oder 429, blockiert sie oft nur das Prüfwerkzeug. Öffnen Sie solche Links im Browser, bevor Sie etwas ändern.' },
        { t: 'p', x: 'Links zu den Werkzeugen: [W3C Link Checker](https://validator.w3.org/checklink), [Screaming Frog SEO Spider](https://www.screamingfrog.co.uk/seo-spider/) und die [Google Search Console](https://search.google.com/search-console/about).' },
      ],
    },
    {
      id: 'beheben',
      h2: 'Defekte Links beheben: So entscheiden Sie',
      blocks: [
        { t: 'p', x: 'Für jeden defekten Link gibt es eine passende Lösung. Gehen Sie die Fälle der Reihe nach durch:' },
        {
          t: 'table',
          caption: 'Entscheidungshilfe für defekte Links',
          head: ['Situation', 'Lösung'],
          rows: [
            ['Die Seite gibt es noch, aber unter einer neuen Adresse', 'Link korrigieren. Zusätzlich eine 301-Weiterleitung von der alten auf die neue Adresse einrichten, falls die alte Adresse von außen verlinkt oder gespeichert wurde.'],
            ['Die Seite wurde durch eine ähnliche ersetzt', '301-Weiterleitung auf die passendste neue Seite.'],
            ['Die Seite wurde bewusst und endgültig gelöscht, es gibt keinen Ersatz', 'Interne Links entfernen. Die alte Adresse darf 404 (oder 410) liefern.'],
            ['Tippfehler im Link (Groß- und Kleinschreibung, fehlender Buchstabe, `http` statt `https`)', 'Link korrigieren.'],
            ['Eine externe Seite existiert nicht mehr', 'Link entfernen oder durch eine andere Quelle ersetzen.'],
            ['Ein Bild, eine PDF-Datei oder ein Download fehlt', 'Datei wieder hochladen oder den Link auf die richtige Datei umstellen. Auch Mediendateien können 404 liefern.'],
          ],
        },
        { t: 'p', x: 'Leiten Sie nicht pauschal alle alten Adressen auf die Startseite um. Das hilft Besuchern selten, und Google kann solche Weiterleitungen als Soft 404 werten.' },
      ],
    },
    {
      id: 'vorgehen',
      h2: 'Aufräumen in sechs Schritten',
      blocks: [
        {
          t: 'steps',
          items: [
            { h: 'Liste anlegen', x: 'Sammeln Sie alle defekten Adressen aus Search Console, Crawler und Link-Checker in einer Tabelle: defekter Link, Seite, auf der er steht, Statuscode.' },
            { h: 'Nach Wichtigkeit sortieren', x: 'Beginnen Sie mit Links im Menü, in der Fußzeile und auf der Startseite, danach folgen Leistungsseiten und Kontaktwege. Seltene Verweise in alten Beiträgen kommen zuletzt.' },
            { h: 'Ursache bestimmen', x: 'Tippfehler, umgezogene Seite, gelöschte Seite oder verschwundene externe Quelle? Die Entscheidungshilfe oben nennt jeweils die passende Lösung.' },
            { h: 'Reparieren', x: 'Korrigieren Sie Links an der Quelle. Weiterleitungen richten Sie nur dort ein, wo die alte Adresse noch von außen verlinkt oder gespeichert ist.' },
            { h: 'Verweise von außen aktualisieren', x: 'Tragen Sie die neue Adresse in Ihrem Google-Unternehmensprofil, in Branchenverzeichnissen, sozialen Netzwerken und E-Mail-Signaturen ein. Bitten Sie wichtige verlinkende Seiten um eine Korrektur.' },
            { h: 'Ergebnis prüfen', x: 'Lassen Sie den Crawler erneut laufen und kontrollieren Sie nach einigen Wochen den Bericht zur Seitenindexierung in der Search Console.' },
          ],
        },
      ],
    },
    {
      id: 'weiterleitung-301',
      h2: '301-Weiterleitungen einrichten',
      blocks: [
        { t: 'p', x: 'Eine 301-Weiterleitung teilt Browsern und Suchmaschinen mit: Diese Seite ist dauerhaft umgezogen. Besucher landen automatisch am neuen Ziel. Eine 302-Weiterleitung kennzeichnet dagegen eine vorübergehende Umleitung.' },
        { t: 'note', kind: 'warn', title: 'Vorher sichern', x: 'Änderungen an der Datei `.htaccess` oder an der Server-Konfiguration können die gesamte Website lahmlegen. Legen Sie vorher eine Datensicherung an und testen Sie jede Weiterleitung nach dem Einrichten.' },
        { t: 'h3', x: 'Apache: Datei .htaccess' },
        { t: 'code', label: '.htaccess: einzelne Seite dauerhaft weiterleiten', x: 'Redirect 301 /alte-seite/ https://www.ihre-domain.de/neue-seite/' },
        { t: 'h3', x: 'nginx: Server-Konfiguration' },
        { t: 'code', label: 'nginx-Konfiguration: einzelne Seite dauerhaft weiterleiten', x: 'location = /alte-seite/ {\n    return 301 https://www.ihre-domain.de/neue-seite/;\n}' },
        { t: 'h3', x: 'WordPress: Weiterleitungs-Plugin' },
        { t: 'p', x: 'Mit einem Weiterleitungs-Plugin tragen Sie alte und neue Adresse in eine Liste ein; auch manche SEO-Plugins bieten die Funktion. Vorteil: Sie müssen keine Serverdateien bearbeiten.' },
        { t: 'h3', x: 'Regeln für saubere Weiterleitungen' },
        {
          t: 'ul',
          items: [
            'Auf die thematisch passende Zielseite weiterleiten.',
            'Keine Ketten (A leitet auf B, B auf C): direkt auf das endgültige Ziel verweisen.',
            'Keine Schleifen, bei denen zwei Seiten aufeinander verweisen.',
            'Interne Links trotz Weiterleitung auf die neue Adresse umstellen.',
            'Alte und neue Adresse in einer Liste dokumentieren.',
          ],
        },
      ],
    },
    {
      id: 'fehlerseite-404',
      h2: 'Eine hilfreiche 404-Seite einrichten',
      blocks: [
        { t: 'p', x: 'Auch gepflegte Websites haben irgendwann tote Adressen, etwa durch Tippfehler in externen Links. Eine hilfreiche Fehlerseite fängt diese Besucher auf:' },
        {
          t: 'ul',
          items: [
            'Sie liefert den HTTP-Statuscode **404**, nicht 200. Sonst meldet die Search Console einen Soft 404.',
            'Sie erklärt in einem Satz, dass die Seite nicht gefunden wurde.',
            'Sie zeigt Wege weiter: Startseite, wichtigste Leistungen, Kontakt, gegebenenfalls eine Suche.',
            'Sie nutzt dasselbe Design wie die übrige Website.',
          ],
        },
        { t: 'p', x: 'Ob Ihre Fehlerseite den richtigen Statuscode liefert, prüfen Sie so: Rufen Sie eine erfundene Adresse auf (`ihre-domain.de/gibt-es-nicht`) und lesen Sie den Statuscode in den Entwicklerwerkzeugen Ihres Browsers (`F12`, Reiter „Netzwerk“) oder mit einem Online-Werkzeug für HTTP-Header.' },
      ],
    },
    {
      id: 'vorbeugen',
      h2: 'Defekte Links vermeiden',
      blocks: [
        {
          t: 'ul',
          items: [
            'Vor dem Löschen oder Umbenennen einer Seite prüfen, wo sie verlinkt ist.',
            'Bei einem Relaunch eine Liste aller alten Adressen anlegen und jeder eine neue zuordnen (Weiterleitungsplan).',
            'Einmal pro Quartal die Search Console ansehen und einen Crawler laufen lassen.',
            'Bei externen Links nur auf stabile Quellen verweisen und wichtige Verweise gelegentlich testen.',
            'Seitenadressen und Dateinamen nicht ohne Not ändern.',
            'Beim Löschen von Beiträgen und Medien prüfen, ob sie noch in Menüs, Seiten oder Newslettern eingebunden sind.',
          ],
        },
        { t: 'p', x: 'Wer das regelmäßig tun möchte, findet im Ratgeber [Website-Wartung: Aufgaben, Risiken, Kosten](/ratgeber/website-wartung) einen Rhythmus für die Link-Kontrolle und weitere Routineaufgaben.' },
      ],
    },
    {
      id: 'hilfe',
      h2: 'Wann Sie Hilfe holen sollten',
      blocks: [
        { t: 'p', x: 'Einzelne Links korrigieren Sie schnell selbst. Hilfe lohnt sich bei Hunderten defekter Adressen nach einem Relaunch, bei Weiterleitungen, die auf dem Server eingetragen werden müssen, und wenn eine Fehlerseite den falschen Statuscode liefert.' },
        { t: 'p', x: 'Defekte Links beheben wir im Rahmen der [Schnellreparatur](/website-repair?lang=de) ({price.quick}, {time.quick}). Kommen mehrere Probleme zusammen, passt die Website-Reparatur ({price.repair}). Beide Preise verstehen sich netto zzgl. 19 % USt.' },
        { t: 'note', kind: 'info', title: 'Was unsere kostenlose Prüfung dazu zeigt', x: 'Die [kostenlose Website-Prüfung](/website-check?lang=de) testet eine Auswahl der internen Links, die von der Startseite aus erreichbar sind, und meldet, ob sie sich öffnen. Einen vollständigen Durchlauf über alle Seiten und alle externen Links ersetzt das nicht; dafür eignen sich die Werkzeuge oben.' },
      ],
    },
  ],
  faq: [
    { q: 'Wie viele defekte Links sind normal?', a: 'Eine feste Zahl gibt es nicht. Auf größeren Websites kommen mit der Zeit einzelne tote Links vor, vor allem zu externen Seiten. Wichtig ist, dass die wichtigen Wege (Menü, Kontakt, Leistungen) funktionieren und Sie regelmäßig aufräumen.' },
    { q: 'Muss ich jeden 404-Fehler beheben?', a: 'Nein. Eine bewusst gelöschte Seite darf 404 liefern. Beheben sollten Sie Fälle, in denen Besucher durch einen Link ins Leere laufen oder wichtige Adressen ohne Ersatz verschwunden sind.' },
    { q: 'Was ist ein Soft 404?', a: 'So bezeichnet Google Seiten, die wie eine Fehlerseite aussehen oder leer sind, aber nicht den Statuscode 404 liefern. Die Search Console zeigt sie als „Soft 404-Fehler“. Liefern Sie eine echte 404-Seite mit dem passenden Statuscode aus oder ergänzen Sie den Inhalt, falls die Seite existieren soll.' },
    { q: 'Was ist der Unterschied zwischen 301 und 302?', a: 'Der Code 301 bedeutet „dauerhaft umgezogen“, 302 „vorübergehend umgeleitet“. Für gelöschte oder dauerhaft verschobene Seiten ist 301 richtig.' },
    { q: 'Soll ich 404-Seiten auf die Startseite umleiten?', a: 'In der Regel nicht. Besucher erwarten ein bestimmtes Thema. Leiten Sie auf die passendste Seite weiter oder liefern Sie eine echte 404-Seite mit Navigationshilfen aus.' },
    { q: 'Kann ich defekte Links automatisch finden lassen?', a: 'Ja, mit einem Crawler oder einer Überwachung, die Ihre Seiten in festen Abständen prüft. Ein automatischer Bericht ersetzt aber nicht die Entscheidung, ob ein Link repariert, weitergeleitet oder entfernt wird.' },
  ],
  service: 'repair',
  related: ['website-selbst-pruefen', 'https-ssl-fehler-beheben', 'website-nicht-bei-google-gefunden'],
  sources: [
    { label: 'Google Search Central: HTTP-Statuscodes und Netzwerkfehler', url: 'https://developers.google.com/crawling/docs/troubleshooting/http-status-codes?hl=de' },
    { label: 'Google Search Central: Weiterleitungen und die Google-Suche', url: 'https://developers.google.com/search/docs/crawling-indexing/301-redirects?hl=de' },
    { label: 'Search Console-Hilfe: Bericht zur Seitenindexierung', url: 'https://support.google.com/webmasters/answer/7440203?hl=de' },
    { label: 'W3C Link Checker', url: 'https://validator.w3.org/checklink' },
    { label: 'Apache: mod_alias, Direktive Redirect', url: 'https://httpd.apache.org/docs/2.4/mod/mod_alias.html#redirect' },
    { label: 'nginx: Direktive return', url: 'https://nginx.org/en/docs/http/ngx_http_rewrite_module.html#return' },
  ],
  published: '2026-10-01',
  modified: '2026-10-01',
};
