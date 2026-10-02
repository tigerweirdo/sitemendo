import type { Guide } from './types';

export const spfDkimDmarcEinrichten: Guide = {
  lang: 'de',
  slug: 'spf-dkim-dmarc-einrichten',
  category: 'Formulare',
  check: 'forms',
  short: 'SPF, DKIM und DMARC einrichten',
  title: 'SPF, DKIM und DMARC einrichten: einfach erklärt',
  h1: 'SPF, DKIM und DMARC einrichten: einfach erklärt, mit Beispielen und Test',
  description: 'Was SPF, DKIM und DMARC tun, wie die DNS-Einträge aussehen und in welcher Reihenfolge Sie sie einrichten, prüfen und schrittweise verschärfen.',
  teaser: 'Drei DNS-Einträge entscheiden, ob Ihre E-Mails ankommen: was sie bewirken, wie sie aussehen, wie Sie sie testen und was sich 2026 bei DMARC geändert hat.',
  tldr: [
    'SPF, DKIM und DMARC sind drei DNS-Einträge, mit denen Sie nachweisen, dass E-Mails mit Ihrer Domain wirklich von Ihnen stammen. Ohne sie landen Nachrichten, etwa aus dem Kontaktformular, eher im Spam oder werden abgelehnt.',
    'SPF legt fest, welche Server für Ihre Domain senden dürfen. DKIM signiert jede Nachricht. DMARC verlangt, dass SPF oder DKIM bestanden haben und zur sichtbaren Absenderdomain passen, und legt fest, was bei einem Fehlschlag geschehen soll.',
    'Gehen Sie in dieser Reihenfolge vor: Absender erfassen, SPF und DKIM einrichten, mindestens 48 Stunden warten, DMARC mit `p=none` und Berichten starten und die Richtlinie erst nach sauberen Berichten auf `quarantine` und `reject` verschärfen.',
    'Neu seit Mai 2026: Der DMARC-Standard RFC 9989 hat das Tag `pct` entfernt und `t=y` als Testmodus eingeführt. Viele Anleitungen nennen noch `pct`.',
  ],
  intro: [
    'Das Kontaktformular meldet „Gesendet“, die Rechnung ist verschickt, der Newsletter ist raus, und trotzdem fragen Kunden, warum nichts angekommen ist. Häufig liegt es nicht an der Nachricht, sondern an der Domain: Empfänger prüfen, ob ein Server überhaupt in Ihrem Namen senden darf. Dafür gibt es drei Verfahren, die Sie einmal im DNS einrichten.',
    'Dieser Ratgeber erklärt SPF, DKIM und DMARC in einfachen Worten, zeigt Beispiele für die Einträge, beschreibt die richtige Reihenfolge und zeigt, wie Sie das Ergebnis prüfen. Die Aussagen beruhen auf den Standards (RFC 7208, RFC 6376, RFC 9989) und den Anleitungen von Google, Microsoft und Yahoo; die DNS-Abfragen und Anbieterangaben stammen aus dem Oktober 2026 (Stand: Oktober 2026).',
  ],
  sections: [
    {
      id: 'grundlagen',
      h2: 'Was SPF, DKIM und DMARC tun',
      blocks: [
        { t: 'p', x: 'Eine E-Mail hat zwei Absenderangaben: die sichtbare Adresse im Feld `From` und die technische Absenderangabe, mit der der Server die Nachricht einliefert. SPF, DKIM und DMARC prüfen, ob beides zusammenpasst und ob der sendende Server dazu berechtigt ist.' },
        {
          t: 'table',
          caption: 'Die drei Verfahren im Überblick',
          head: ['Verfahren', 'Die Frage dahinter', 'Wo im DNS', 'Typischer Fehler'],
          rows: [
            ['SPF', 'Darf dieser Server für die Domain senden?', 'TXT-Eintrag bei der Domain', 'Mehrere SPF-Einträge, oder ein Absender fehlt'],
            ['DKIM', 'Stammt die Nachricht von der Domain, und wurde sie unterwegs verändert?', 'TXT- oder CNAME-Eintrag unter `selektor._domainkey`', 'Selektor oder Schlüssel falsch eingetragen'],
            ['DMARC', 'Passen SPF oder DKIM zur sichtbaren Absenderdomain, und was soll bei einem Fehlschlag passieren?', 'TXT-Eintrag bei `_dmarc`', 'Die Richtlinie zu früh auf `reject` gesetzt'],
          ],
        },
        {
          t: 'flow',
          label: 'So prüft ein empfangender Server eine Nachricht von Ihrer Domain',
          nodes: [
            { h: 'Nachricht kommt an', x: 'Der Server erhält die Mail mit ihren zwei Absenderangaben: dem sichtbaren `From` und der technischen Absenderangabe der Einlieferung.' },
            { h: 'SPF-Prüfung', x: 'Darf der sendende Server für die Domain senden? Grundlage ist der TXT-Eintrag bei der Domain.', stop: 'mehrere SPF-Einträge stehen, ein Absender fehlt oder die Nachricht weitergeleitet wurde.' },
            { h: 'DKIM-Prüfung', x: 'Stammt die Nachricht von der Domain, und wurde sie unterwegs verändert? Der Schlüssel steht unter `selektor._domainkey`.', stop: 'Selektor oder Schlüssel falsch eingetragen sind oder ein Versanddienst nur mit seiner eigenen Domain signiert.' },
            { h: 'DMARC-Entscheidung', x: 'Passen SPF oder DKIM zur sichtbaren Absenderdomain im `From`? Wenn nicht, gilt die Richtlinie aus dem Eintrag bei `_dmarc`.', stop: 'die Richtlinie zu früh auf `reject` steht, obwohl noch ein berechtigter Absender nicht ausgerichtet ist.' },
          ],
        },
        { t: 'p', x: 'Entscheidend ist die Ausrichtung (englisch Alignment). Nach RFC 9989 setzt ein bestandenes DMARC voraus, dass SPF oder DKIM bestanden haben und die dabei geprüfte Domain zur Absenderdomain im Feld `From` passt. Im Standardmodus „relaxed“ genügt dieselbe Hauptdomain, etwa `mail.ihre-domain.de` und `ihre-domain.de`. Im Modus „strict“ müssen beide identisch sein. Ein Versanddienst, der nur mit seiner eigenen Domain signiert, besteht DMARC für Ihre Domain deshalb nicht.' },
        { t: 'note', kind: 'info', title: 'SPF allein reicht meist nicht', x: 'SPF prüft nur die technische Absenderangabe, nicht das sichtbare `From`. Beim Weiterleiten kann SPF außerdem fehlschlagen, weil der weiterleitende Server nicht im SPF-Eintrag des ursprünglichen Absenders steht; RFC 7208 beschreibt das als bekanntes Problem. Eine DKIM-Signatur bleibt dagegen gültig, solange die signierten Teile der Nachricht unverändert bleiben.' },
      ],
    },
    {
      id: 'bestandsaufnahme',
      h2: 'Vorbereitung: Absender erfassen und vorhandene Einträge prüfen',
      blocks: [
        { t: 'p', x: 'Bevor Sie etwas ändern, brauchen Sie einen Überblick, wer in Ihrem Namen E-Mails verschickt. Ein vergessener Absender wird später wie ein Fälscher behandelt.' },
        {
          t: 'steps',
          items: [
            { h: 'Alle Absender sammeln', x: 'Notieren Sie jeden Dienst, der Nachrichten mit Ihrer Domain verschickt: Postfach-Anbieter, Website und Kontaktformular, Newsletter-Werkzeug, Rechnungsprogramm, CRM, Onlineshop, Terminbuchung. Fragen Sie auch Ihren Hoster und Ihre Webentwicklerin oder Ihren Webentwickler.' },
            { h: 'Vorhandene Einträge abfragen', x: 'Prüfen Sie, was bereits im DNS steht. Das zeigt zugleich, ob jemand schon SPF oder DKIM eingerichtet hat. Die Befehle finden Sie im Kasten unter diesen Schritten.' },
            { h: 'DNS-Zugang klären', x: 'Die DNS-Verwaltung liegt meist beim Domain-Anbieter oder beim Hoster. Sie brauchen dort Zugang und sollten wissen, ob der Anbieter Domainnamen oder Anführungszeichen automatisch ergänzt.' },
            { h: 'Eine Absendeadresse festlegen', x: 'Bestimmen Sie, von welcher Adresse Ihre Formulare und Systeme senden, zum Beispiel `formular@ihre-domain.de`, und verwenden Sie genau diese Adresse als `From`. Warum das wichtig ist, erklärt der Ratgeber [Kontaktformular funktioniert nicht](/ratgeber/kontaktformular-funktioniert-nicht).' },
          ],
        },
        { t: 'code', label: 'Vorhandene Einträge abfragen (Beispiel mit dig; unter Windows nslookup -type=TXT)', x: 'dig +short TXT ihre-domain.de\ndig +short TXT _dmarc.ihre-domain.de\ndig +short TXT selektor._domainkey.ihre-domain.de' },
      ],
    },
    {
      id: 'spf',
      h2: 'SPF einrichten',
      blocks: [
        { t: 'p', x: 'Der SPF-Eintrag ist ein TXT-Eintrag bei Ihrer Domain. Er beginnt mit `v=spf1`, nennt die erlaubten Absender und endet mit einer Regel für alle übrigen. Als Host tragen Sie bei den meisten Anbietern `@` ein, also die Domain selbst.' },
        {
          t: 'ul',
          items: [
            '**Nur ein SPF-Eintrag pro Domain.** Gibt es mehr als einen, liefert die Prüfung nach RFC 7208 einen Fehler („permerror“). Ergänzen Sie neue Absender im bestehenden Eintrag.',
            '**Höchstens zehn DNS-Abfragen.** Die Mechanismen `include`, `a`, `mx`, `ptr` und `exists` sowie der Zusatz `redirect` zählen mit, `ip4`, `ip6` und `all` nicht. Wird die Grenze überschritten, ist der Eintrag ungültig.',
            '**Die Schlussregel:** `~all` (Softfail) markiert fremde Server als verdächtig, `-all` (Fail) weist sie ab. Google empfiehlt `~all`, in den Beispielen von Microsoft steht `-all`. Wer unsicher ist, beginnt mit `~all`.',
            '**Nur echte Absender:** Tragen Sie nur Dienste ein, die Sie wirklich nutzen. Jeder zusätzliche `include` verbraucht eine der zehn Abfragen.',
          ],
        },
        {
          t: 'table',
          caption: 'SPF-Beispiele für typische Fälle (die genauen Werte nennt Ihr Anbieter)',
          head: ['Fall', 'Beispiel', 'Hinweis'],
          rows: [
            ['Google Workspace', '`v=spf1 include:_spf.google.com ~all`', 'Wert aus der Anleitung von Google'],
            ['Microsoft 365', '`v=spf1 include:spf.protection.outlook.com -all`', 'Microsoft nennt in den Beispielen `-all`'],
            ['Zwei Dienste in einem Eintrag', '`v=spf1 include:_spf.google.com include:spf.protection.outlook.com ~all`', 'Ein Eintrag mit mehreren `include`, nicht zwei Einträge'],
            ['Domain ohne E-Mail-Versand', '`v=spf1 -all`', 'Verbietet jeden Versand; Microsoft nennt diesen Eintrag für Domains ohne E-Mail'],
          ],
        },
        { t: 'p', x: 'Prüfen Sie nach dem Speichern mit `dig +short TXT ihre-domain.de`, dass genau ein Eintrag mit `v=spf1` erscheint.' },
      ],
    },
    {
      id: 'dkim',
      h2: 'DKIM einrichten',
      blocks: [
        { t: 'p', x: 'DKIM signiert ausgehende Nachrichten mit einem privaten Schlüssel. Den passenden öffentlichen Schlüssel veröffentlichen Sie im DNS unter `selektor._domainkey.ihre-domain.de`. Der Empfänger liest Selektor und Domain aus der Signatur der Nachricht, holt den Schlüssel und prüft die Signatur.' },
        {
          t: 'ul',
          items: [
            '**Jeder Versanddienst hat eigene Schlüssel.** Google, Microsoft, Ihr Hoster, der Newsletter- und der Rechnungsdienst erzeugen jeweils einen Selektor und nennen Ihnen den Eintrag, den Sie anlegen müssen.',
            '**Schlüssellänge:** Google empfiehlt 2.048 Bit und bietet 1.024 Bit nur an, wenn der Domain-Anbieter keine längeren Einträge zulässt.',
            '**TXT oder CNAME:** Google verwendet einen TXT-Eintrag (`google._domainkey`, der Wert beginnt mit `v=DKIM1`). Microsoft 365 verwendet zwei CNAME-Einträge, `selector1._domainkey` und `selector2._domainkey`.',
            '**Wartezeit:** Bis die Signatur funktioniert, kann es laut Google bis zu 48 Stunden dauern.',
            '**Lange Werte:** Manche Domain-Anbieter beschränken die Länge von TXT-Einträgen oder ergänzen den Domainnamen automatisch. Prüfen Sie den Eintrag nach dem Speichern.',
          ],
        },
        { t: 'code', label: 'Aufbau eines DKIM-Eintrags als TXT (Selektor und Schlüssel liefert Ihr Anbieter)', x: 'Name:  selektor._domainkey.ihre-domain.de\nTyp:   TXT\nWert:  v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0B… (öffentlicher Schlüssel Ihres Anbieters)' },
      ],
    },
    {
      id: 'dmarc',
      h2: 'DMARC einrichten: in vier Stufen',
      blocks: [
        { t: 'p', x: 'DMARC ist ein TXT-Eintrag bei `_dmarc.ihre-domain.de`. Er sagt Empfängern, wie sie mit Nachrichten umgehen sollen, die weder per SPF noch per DKIM zur Absenderdomain passen, und bittet um Berichte. Google empfiehlt, zuerst SPF und DKIM einzurichten und die Nachrichten mindestens 48 Stunden damit zu authentifizieren, bevor Sie DMARC aktivieren. Wer DMARC zum ersten Mal einsetzt, beginnt laut Google mit `p=none`.' },
        {
          t: 'table',
          caption: 'DMARC schrittweise verschärfen',
          head: ['Stufe', 'Wirkung', 'Weiter, wenn'],
          rows: [
            ['Stufe 1: Beobachten', 'Keine Vorgabe bei Fehlschlägen, aber Berichte über alle Absender', 'Die Berichte über längere Zeit, üblich sind einige Wochen, nur gewollte Absender als bestanden zeigen'],
            ['Stufe 2: Testen', 'Im Testmodus (`t=y`) wenden Empfänger die Richtlinie eine Stufe milder an, hier also wie `none`', 'Keine legitimen Absender mehr durchfallen'],
            ['Stufe 3: Verschärfen', 'Fehlgeschlagene Nachrichten gelten als verdächtig und landen oft im Spam', 'Wieder einige Wochen ohne Auffälligkeiten'],
            ['Stufe 4: Ablehnen', 'Empfänger sollen fehlgeschlagene Nachrichten abweisen', 'Dauerhafter Zustand, solange sich Ihre Absender nicht ändern'],
          ],
        },
        { t: 'code', label: 'DMARC-Einträge je Stufe (Platzhalter; Name des TXT-Eintrags: _dmarc.ihre-domain.de)', x: '# Stufe 1: Beobachten\nv=DMARC1; p=none; rua=mailto:dmarc@ihre-domain.de\n\n# Stufe 2: Testen\nv=DMARC1; p=quarantine; t=y; rua=mailto:dmarc@ihre-domain.de\n\n# Stufe 3: Verschärfen\nv=DMARC1; p=quarantine; rua=mailto:dmarc@ihre-domain.de\n\n# Stufe 4: Ablehnen\nv=DMARC1; p=reject; rua=mailto:dmarc@ihre-domain.de' },
        {
          t: 'ul',
          items: [
            '`v`: Version, muss das erste Tag sein und den Wert `DMARC1` haben.',
            '`p`: Richtlinie für die Domain (`none`, `quarantine`, `reject`). Fehlt `p`, behandelt RFC 9989 den Eintrag wie `p=none`.',
            '`sp` und `np`: Richtlinie für Subdomains und für nicht existierende Subdomains. Fehlen sie, gilt `p`.',
            '`rua`: Adresse für Zusammenfassungsberichte. Ohne dieses Tag erhalten Sie keine Berichte.',
            '`adkim` und `aspf`: Ausrichtung `r` (relaxed, Standard) oder `s` (strict).',
            '`t`: Testmodus `y` oder `n` (Standard `n`).',
          ],
        },
        { t: 'note', kind: 'warn', title: 'Was sich bei DMARC geändert hat', x: 'Der aktuelle Standard RFC 9989 (Mai 2026) hat das Tag `pct` entfernt, mit dem sich die Richtlinie auf einen Prozentsatz der Nachrichten beschränken ließ. Stattdessen gibt es `t=y` als Testmodus. Die Anleitungen von Google und Microsoft nennen `pct` noch. Ob ein Empfänger es beachtet, ist unterschiedlich: Setzt er nur den neuen Standard um, ignoriert er das Tag und wendet die Richtlinie auf alle fehlschlagenden Nachrichten an. Verlassen Sie sich nicht auf `pct`.' },
        { t: 'p', x: 'Zusammenfassungsberichte sind XML-Dateien, oft komprimiert, und für Menschen schwer lesbar. Google empfiehlt, sie nicht an Ihre normale Adresse zu schicken, sondern an ein eigenes Postfach, eine Gruppe oder einen Drittanbieter-Dienst. Soll ein Bericht an eine Adresse bei einer anderen Domain gehen, verlangt der Standard einen zusätzlichen TXT-Eintrag bei dieser Domain, der den Empfang erlaubt; Google beschreibt das in seiner DMARC-Anleitung.' },
      ],
    },
    {
      id: 'test',
      h2: 'Einrichtung prüfen',
      blocks: [
        {
          t: 'steps',
          items: [
            { h: 'DNS-Einträge abfragen', x: 'Fragen Sie SPF, DKIM und DMARC mit `dig` oder nslookup ab. Bei SPF muss genau ein Eintrag mit `v=spf1` erscheinen, bei DMARC ein Eintrag, der mit `v=DMARC1` beginnt, bei DKIM ein Eintrag unter dem Selektor Ihres Anbieters.' },
            { h: 'Testnachricht an ein Gmail-Postfach senden', x: 'Senden Sie eine Nachricht aus dem System, das Sie prüfen wollen, zum Beispiel aus dem Kontaktformular, an eine Gmail-Adresse.' },
            { h: 'Original anzeigen', x: 'Öffnen Sie die Nachricht in Gmail, wählen Sie „Original anzeigen“ und suchen Sie die Angaben zu SPF, DKIM und DMARC. Sie sollten „PASS“ zeigen.' },
            { h: 'Auf die geprüfte Domain achten', x: 'Prüfen Sie, bei welcher Domain SPF und DKIM bestanden wurden. Passt sie nicht zur Absenderdomain, besteht DMARC trotz „PASS“ bei SPF oder DKIM unter Umständen nicht.' },
          ],
        },
        { t: 'p', x: 'Zur Kontrolle von MX- und SPF-Einträgen bietet Google außerdem das kostenlose Werkzeug „Check MX“ im Admin Toolbox an.' },
      ],
    },
    {
      id: 'fehler',
      h2: 'Typische Fehler und wie Sie sie vermeiden',
      blocks: [
        {
          t: 'ul',
          items: [
            '**Mehrere SPF-Einträge:** Das ergibt einen Fehler. Schreiben Sie alle Absender in einen gemeinsamen Eintrag.',
            '**Mehr als zehn DNS-Abfragen in SPF:** Streichen Sie Dienste, die Sie nicht nutzen, oder fragen Sie den Anbieter nach einem schlankeren Eintrag.',
            '**Ein Versanddienst fehlt:** Newsletter, Rechnungsprogramm, CRM oder Formulardienst. Seine Nachrichten scheitern dann an SPF und oft auch an DMARC.',
            '**DKIM des Dienstes nicht auf Ihre Domain eingerichtet:** Signiert der Dienst nur mit seiner eigenen Domain, passt weder SPF noch DKIM zu Ihrer Absenderdomain, und DMARC schlägt fehl.',
            '**Eintrag falsch formatiert:** Anführungszeichen, Zeilenumbrüche oder automatisch angehängte Domainnamen beim Domain-Anbieter. Prüfen Sie mit `dig` nach dem Speichern.',
            '**DMARC zu früh auf „reject“:** Legitime Nachrichten gehen verloren. Beobachten Sie zuerst, und verschärfen Sie dann schrittweise.',
            '**Subdomains vergessen:** Senden Subdomains E-Mails, gilt `sp` beziehungsweise `p`. Prüfen Sie diese Absender gesondert.',
            '**Weiterleitungen:** SPF kann beim Weiterleiten scheitern. DKIM ist dafür robuster, solange die Nachricht unverändert bleibt.',
          ],
        },
      ],
    },
    {
      id: 'anbieter',
      h2: 'Wie streng sind große Anbieter? Unsere Abfrage vom Oktober 2026',
      blocks: [
        { t: 'p', x: 'Wir haben am 1. Oktober 2026 die öffentlichen DMARC-Einträge einiger verbreiteter Absenderdomains abgefragt (Stand: Oktober 2026). Das ist die Richtlinie für Nachrichten, die in deren Namen verschickt werden, nicht Ihre eigene Einstellung. Sie erklärt, warum Formulare, die die Adresse des Besuchers als Absender eintragen, bei manchen Anbietern ankommen und bei anderen nicht.' },
        {
          t: 'table',
          caption: 'DMARC-Richtlinien verbreiteter Absenderdomains (öffentliche DNS-Einträge)',
          head: ['Richtlinie der Domain', 'Domains (Stand 1. Oktober 2026)', 'Bedeutung für Fremdversand'],
          rows: [
            ['reject', 'yahoo.com, aol.com, ionos.de, strato.de, mailbox.org', 'Empfänger sollen fehlgeschlagene Nachrichten abweisen'],
            ['quarantine', 'gmx.de, web.de, icloud.com, freenet.de, proton.me', 'Fehlgeschlagene Nachrichten gelten als verdächtig und landen oft im Spam'],
            ['none', 'gmail.com, outlook.com, hotmail.com, t-online.de, posteo.de', 'Keine Vorgabe, die Entscheidung liegt beim Empfänger'],
          ],
        },
        { t: 'p', x: 'Was das für Kontaktformulare bedeutet und wie Sie das Problem beheben, steht im Ratgeber [Kontaktformular funktioniert nicht](/ratgeber/kontaktformular-funktioniert-nicht).' },
      ],
    },
    {
      id: 'anforderungen',
      h2: 'Was Google, Yahoo und Microsoft von Absendern verlangen',
      blocks: [
        {
          t: 'ul',
          items: [
            '**Google (Gmail):** Seit dem 1. Februar 2024 müssen alle, die an Gmail-Adressen senden, mindestens SPF oder DKIM einrichten. Wer täglich 5.000 oder mehr Nachrichten an Gmail-Adressen sendet, braucht SPF, DKIM und DMARC.',
            '**Yahoo:** Seit Februar 2024 gilt für alle Absender mindestens SPF oder DKIM. Massenversender müssen SPF und DKIM einrichten und eine gültige DMARC-Richtlinie mit mindestens `p=none` veröffentlichen, wobei die Absenderdomain an SPF oder DKIM ausgerichtet sein muss.',
            '**Microsoft (Outlook.com):** Für Absender mit mehr als 5.000 Nachrichten pro Tag verlangt Microsoft SPF, DKIM und DMARC, mindestens mit `p=none` und ausgerichtet an SPF oder DKIM. Nicht konforme Nachrichten können im Junk-Ordner landen oder abgelehnt werden.',
          ],
        },
        { t: 'p', x: 'Unterhalb dieser Schwellen gelten die Pflichten nicht in gleicher Weise. Google empfiehlt dennoch, SPF, DKIM und DMARC für jede Domain einzurichten, die E-Mails verschickt.' },
      ],
    },
    {
      id: 'hilfe',
      h2: 'Wann Sie Hilfe holen sollten',
      blocks: [
        { t: 'p', x: 'Hilfe lohnt sich, wenn Sie keinen Zugang zur DNS-Verwaltung haben, mehrere Versanddienste im Spiel sind, SPF die Grenze von zehn Abfragen überschreitet oder Nachrichten nur bei manchen Empfängern verschwinden.' },
        { t: 'p', x: 'Die Einrichtung und Prüfung der Einträge gehört zu unserer [Schnellreparatur](/website-repair?lang=de) ({price.quick}, {time.quick}). Kommen weitere Probleme hinzu, passt die Website-Reparatur ({price.repair}). Beide Preise verstehen sich netto zzgl. 19 % USt. Welches Paket passt, sagen wir Ihnen nach der kostenlosen Prüfung.' },
        { t: 'note', kind: 'info', title: 'Was die kostenlose Prüfung hier kann', x: 'Unsere kostenlose Prüfung sieht von außen, wie ein Formular auf der Seite abgeschickt wird. Ob die Nachricht in Ihrem Postfach ankommt und ob SPF, DKIM und DMARC passen, lässt sich von außen nicht zuverlässig prüfen; dafür brauchen wir zusätzlichen Zugang oder Ihre Bestätigung.' },
      ],
    },
  ],
  faq: [
    { q: 'Brauche ich alle drei: SPF, DKIM und DMARC?', a: 'Für zuverlässige Zustellung ja. Gmail verlangt von allen Absendern mindestens SPF oder DKIM. DMARC legt fest, was bei Fehlschlägen geschieht, und liefert Berichte. Wer täglich 5.000 oder mehr Nachrichten an Gmail sendet, braucht alle drei.' },
    { q: 'Reicht SPF allein?', a: 'Meist nicht. SPF prüft nur die technische Absenderangabe und kann beim Weiterleiten scheitern. DKIM bleibt bei unveränderten Nachrichten gültig. DMARC verlangt zusätzlich, dass das Ergebnis zur sichtbaren Absenderdomain passt.' },
    { q: 'Was bedeutet p=none bei DMARC?', a: 'Der Empfänger erhält keine Vorgabe, wie er mit fehlgeschlagenen Nachrichten umgehen soll. Der Eintrag dient dem Beobachten: Sie erhalten Berichte, ohne dass sich die Zustellung ändert. Fehlt `p`, behandelt der aktuelle Standard den Eintrag wie `p=none`.' },
    { q: 'Kann ich sofort p=reject setzen?', a: 'Das ist riskant. Sobald ein legitimer Absender, etwa ein Newsletter-Dienst, nicht ausgerichtet ist, werden dessen Nachrichten abgewiesen. Beobachten Sie zuerst mit `p=none`, werten Sie die Berichte aus und verschärfen Sie schrittweise, wie es Microsoft in seiner Anleitung empfiehlt.' },
    { q: 'Wie lange dauert es, bis DNS-Änderungen wirken?', a: 'Das hängt von der Gültigkeitsdauer der Einträge und vom Anbieter ab. Google nennt für DKIM bis zu 48 Stunden, bis die Authentifizierung funktioniert, und empfiehlt, nach SPF und DKIM mindestens 48 Stunden bis zur Aktivierung von DMARC zu warten.' },
    { q: 'Was ist aus dem DMARC-Tag pct geworden?', a: 'Der aktuelle Standard RFC 9989 vom Mai 2026 hat es entfernt. Stattdessen gibt es das Tag `t` mit den Werten `y` und `n` als Testmodus. Ob ein Empfänger `pct` noch beachtet, ist unterschiedlich; verlassen Sie sich nicht darauf.' },
    { q: 'Muss ich DMARC-Berichte lesen?', a: 'Sie zeigen, welche Absender nicht ausgerichtet sind, und sind die Grundlage für jede Verschärfung. Die XML-Dateien sind schwer lesbar, Google empfiehlt dafür ein eigenes Postfach, eine Gruppe oder einen Drittanbieter-Dienst. Ohne das Tag `rua` werden keine Berichte erzeugt.' },
  ],
  service: 'repair',
  related: ['kontaktformular-funktioniert-nicht', 'website-wartung', 'website-selbst-pruefen'],
  sources: [
    { label: 'IETF: RFC 7208 (SPF)', url: 'https://www.rfc-editor.org/rfc/rfc7208.html' },
    { label: 'IETF: RFC 6376 (DKIM-Signaturen)', url: 'https://www.rfc-editor.org/rfc/rfc6376.html' },
    { label: 'IETF: RFC 9989 (DMARC)', url: 'https://www.rfc-editor.org/rfc/rfc9989.html' },
    { label: 'IETF: RFC 9990 (DMARC-Zusammenfassungsberichte)', url: 'https://www.rfc-editor.org/rfc/rfc9990.html' },
    { label: 'Google Workspace: SPF einrichten', url: 'https://knowledge.workspace.google.com/admin/security/set-up-spf?hl=de' },
    { label: 'Google Workspace: DKIM einrichten', url: 'https://knowledge.workspace.google.com/admin/security/set-up-dkim?hl=de' },
    { label: 'Google Workspace: DMARC einrichten', url: 'https://knowledge.workspace.google.com/admin/security/set-up-dmarc?hl=de' },
    { label: 'Google: Richtlinien für E-Mail-Absender (Gmail)', url: 'https://support.google.com/mail/answer/81126?hl=de' },
    { label: 'Microsoft: SPF für Microsoft 365 einrichten', url: 'https://learn.microsoft.com/de-de/defender-office-365/email-authentication-spf-configure' },
    { label: 'Microsoft: DKIM für Microsoft 365 einrichten', url: 'https://learn.microsoft.com/de-de/defender-office-365/email-authentication-dkim-configure' },
    { label: 'Microsoft: DMARC für Microsoft 365 einrichten', url: 'https://learn.microsoft.com/de-de/defender-office-365/email-authentication-dmarc-configure' },
    { label: 'Microsoft: Neue Anforderungen von Outlook für Absender mit hohem Volumen (englisch)', url: 'https://techcommunity.microsoft.com/blog/microsoftdefenderforoffice365blog/strengthening-email-ecosystem-outlook%E2%80%99s-new-requirements-for-high%E2%80%90volume-senders/4399730' },
    { label: 'Yahoo: Sender Best Practices (englisch)', url: 'https://senders.yahooinc.com/best-practices/' },
    { label: 'Google: Admin Toolbox, Check MX', url: 'https://toolbox.googleapps.com/apps/checkmx/' },
  ],
  published: '2026-10-02',
  modified: '2026-10-02',
};
