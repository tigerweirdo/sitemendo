import type { Guide } from './types';

export const impressumPflichtangaben: Guide = {
  slug: 'impressum-pflichtangaben',
  category: 'Kontakt und Recht',
  check: 'contact',
  short: 'Impressum: Pflichtangaben',
  title: 'Impressum: Pflichtangaben nach § 5 DDG',
  h1: 'Impressum: Pflichtangaben nach § 5 DDG und häufige Fehler',
  description: 'Was muss ins Impressum? Pflichtangaben nach § 5 DDG im Überblick, mit Beispiel, häufigen Fehlern und Checkliste für Unternehmen und Selbstständige.',
  teaser: 'Welche Angaben § 5 DDG verlangt, wo das Impressum stehen muss und welche Fehler zu Abmahnungen führen, mit Beispiel und Checkliste.',
  tldr: [
    'Ein Impressum brauchen alle, die geschäftsmäßig digitale Dienste anbieten, in der Praxis also jede Website von Unternehmen, Selbstständigen und Freiberuflern. Rechtsgrundlage ist § 5 des Digitale-Dienste-Gesetzes (DDG), das seit dem 14. Mai 2024 das Telemediengesetz ersetzt.',
    'Pflicht sind Name, Anschrift und E-Mail-Adresse. Je nach Rechtsform und Branche kommen Vertretungsberechtigte, Registernummer, Aufsichtsbehörde, Kammer und Umsatzsteuer-ID hinzu.',
    'Das Impressum muss leicht erkennbar, unmittelbar erreichbar und ständig verfügbar sein. Üblich ist ein Link „Impressum“ in der Fußzeile jeder Seite.',
    'Fehlende oder falsche Angaben können mit einem Bußgeld bis zu 50.000 Euro geahndet werden; häufiger sind Abmahnungen von Mitbewerbern. Der Hinweis auf die EU-Plattform zur Online-Streitbeilegung ist seit dem 20. Juli 2025 überholt.',
  ],
  intro: [
    'Das Impressum ist eine der Pflichtseiten, die fast jede Unternehmenswebsite braucht, und eine, an der sich Abmahnungen oft entzünden: Es fehlen Angaben, die Anschrift ist ein Postfach, oder der Link ist schwer zu finden.',
    'Dieser Ratgeber erklärt, wer ein Impressum braucht, welche Angaben § 5 DDG verlangt, wo es stehen muss und welche Fehler häufig vorkommen. Er stützt sich auf den Gesetzestext und auf Merkblätter der Industrie- und Handelskammern (Stand: Oktober 2026).',
  ],
  sections: [
    {
      id: 'wer',
      h2: 'Wer braucht ein Impressum?',
      blocks: [
        { t: 'note', kind: 'warn', title: 'Keine Rechtsberatung', x: 'Dieser Ratgeber ist eine allgemeine Orientierung. Welche Angaben in Ihrem Einzelfall nötig sind, hängt von Rechtsform und Branche ab. Lassen Sie das Impressum im Zweifel von einer Rechtsberatung oder Ihrer Kammer prüfen.' },
        { t: 'p', x: '§ 5 Abs. 1 DDG verpflichtet Diensteanbieter, die geschäftsmäßige, in der Regel gegen Entgelt angebotene digitale Dienste anbieten, bestimmte Informationen bereitzuhalten. Die IHK München fasst es so zusammen: In der Regel muss jede Homepage, die nicht rein privat ist, die Pflichtangaben enthalten. Betroffen sind zum Beispiel Firmenwebsites, Online-Shops, Websites von Selbstständigen und Freiberuflern sowie Händler auf Verkaufsplattformen.' },
        { t: 'p', x: 'Auch Websites, die nicht ausschließlich persönlichen oder familiären Zwecken dienen, müssen nach dem Medienstaatsvertrag mindestens Name und Anschrift nennen (§ 18 Abs. 1 MStV).' },
      ],
    },
    {
      id: 'angaben',
      h2: 'Das gehört ins Impressum: die Pflichtangaben im Überblick',
      blocks: [
        {
          t: 'table',
          caption: 'Pflichtangaben nach § 5 Abs. 1 DDG',
          head: ['Angabe', 'Für wen', 'Hinweis'],
          rows: [
            ['Name', 'Alle', 'Einzelunternehmen ohne Handelsregistereintrag: Vor- und Zuname der Inhaberin oder des Inhabers; den Namen, unter dem Sie auftreten, können Sie zusätzlich nennen. Eingetragene Unternehmen: der Firmenname.'],
            ['Anschrift', 'Alle', 'Die Anschrift, unter der Sie niedergelassen sind. Ein Postfach genügt laut IHK nicht, weil Schriftstücke und gerichtliche Post zugestellt werden können müssen.'],
            ['E-Mail-Adresse und schnelle Kontaktmöglichkeit', 'Alle', 'Verlangt sind Angaben für eine schnelle elektronische Kontaktaufnahme und unmittelbare Kommunikation, einschließlich der E-Mail-Adresse. Nach Auffassung der IHKs gehören E-Mail-Adresse und Telefonnummer dazu.'],
            ['Rechtsform und Vertretungsberechtigte', 'Juristische Personen', 'Zum Beispiel GmbH oder UG (haftungsbeschränkt) mit der vertretungsberechtigten Person, etwa der Geschäftsführerin. Die IHK München nennt die Rechtsform auch für Personen- und Handelsgesellschaften wie GbR, OHG und KG.'],
            ['Kapital', 'Nur wenn Sie Kapitalangaben machen', 'Wer das Stamm- oder Grundkapital nennt, muss auch den Gesamtbetrag ausstehender Einlagen nennen, falls nicht alle Einlagen eingezahlt sind.'],
            ['Register und Registernummer', 'Wer eingetragen ist', 'Handelsregister oder ähnliches Register, zum Beispiel Vereins-, Partnerschafts- oder Genossenschaftsregister, mit Registernummer, etwa „Amtsgericht …, HRB …“.'],
            ['Aufsichtsbehörde', 'Zulassungspflichtige Tätigkeiten', 'Wenn Ihre Tätigkeit einer behördlichen Zulassung bedarf, nennen Sie die zuständige Aufsichtsbehörde.'],
            ['Kammer, Berufsbezeichnung, berufsrechtliche Regeln', 'Reglementierte Berufe', 'Zum Beispiel Rechtsanwälte, Steuerberater, Ärzte oder Architekten: Kammer, gesetzliche Berufsbezeichnung samt Staat der Verleihung und die berufsrechtlichen Regelungen mit Hinweis, wo sie zugänglich sind.'],
            ['Umsatzsteuer-ID oder Wirtschafts-ID', 'Wer eine besitzt', 'Nur, wenn Sie eine Umsatzsteuer-Identifikationsnummer oder eine Wirtschafts-Identifikationsnummer haben. Die gewöhnliche Steuernummer verlangt das Gesetz nicht.'],
            ['Abwicklung oder Liquidation', 'AG, KGaA und GmbH in Abwicklung', 'Ein Hinweis darauf, dass sich die Gesellschaft in Abwicklung oder Liquidation befindet.'],
          ],
        },
        { t: 'p', x: 'Weitergehende Informationspflichten nach anderen Rechtsvorschriften bleiben unberührt (§ 5 Abs. 2 DDG). Das betrifft zum Beispiel Online-Shops und reglementierte Branchen.' },
        { t: 'note', kind: 'info', title: 'Redaktionelle Angebote', x: 'Wer journalistisch-redaktionell gestaltete Inhalte anbietet, muss nach dem Medienstaatsvertrag zusätzlich eine verantwortliche Person mit Namen und Anschrift benennen (§ 18 Abs. 2 MStV). Ob ein Firmenblog darunter fällt, hängt vom Einzelfall ab.' },
      ],
    },
    {
      id: 'beispiel',
      h2: 'Beispiel: So kann ein Impressum aussehen',
      blocks: [
        { t: 'p', x: 'Die folgenden Beispiele zeigen die Struktur. Alle Namen, Adressen und Nummern sind frei erfunden. Übernehmen Sie sie nicht ungeprüft, sondern passen Sie sie an Ihre Rechtsform und Branche an.' },
        { t: 'code', label: 'Beispiel: Einzelunternehmen (frei erfunden)', x: 'Angaben gemäß § 5 DDG\n\nMax Mustermann\nBeispiel Elektrotechnik\nMusterstraße 1\n12345 Musterstadt\n\nTelefon: 01234 567890\nE-Mail: info@beispiel-domain.de\n\nUmsatzsteuer-ID: DE123456789 (nur, wenn vorhanden)' },
        { t: 'code', label: 'Beispiel: GmbH (frei erfunden)', x: 'Angaben gemäß § 5 DDG\n\nBeispiel Webdesign GmbH\nMusterstraße 1\n12345 Musterstadt\n\nVertreten durch die Geschäftsführerin: Erika Mustermann\n\nTelefon: 01234 567890\nE-Mail: info@beispiel-domain.de\n\nHandelsregister: Amtsgericht Musterstadt, HRB 12345\nUmsatzsteuer-ID: DE123456789 (nur, wenn vorhanden)' },
        { t: 'p', x: 'Steht in Ihrem Impressum noch „Angaben gemäß § 5 TMG“, ist das veraltet und sollte auf das DDG umgestellt werden, zum Beispiel auf „Angaben gemäß § 5 DDG“. Die IHK München schlägt „§§ 5, 6 DDG“ vor und hält die Nennung der Norm nicht für zwingend.' },
      ],
    },
    {
      id: 'platzierung',
      h2: 'Wo und wie das Impressum stehen muss',
      blocks: [
        {
          t: 'ul',
          items: [
            'Die Angaben müssen nach § 5 DDG leicht erkennbar, unmittelbar erreichbar und ständig verfügbar sein.',
            'Nach der Rechtsprechung genügt es, wenn Besucher mit zwei aufeinanderfolgenden Klicks zu den Angaben gelangen (BGH, Urteil vom 20. Juli 2006, I ZR 228/03). Üblich ist ein Link in der Fußzeile jeder Seite.',
            'Als Linktext hat sich „Impressum“ durchgesetzt; „Kontakt“ und „Anbieterkennzeichnung“ gelten laut IHK ebenfalls als zulässig.',
            'Vermeiden Sie mehrere ähnliche Menüpunkte nebeneinander, etwa „Über uns“, „Kontakt“ und „Impressum“, die jeweils den Eindruck erwecken, die Pflichtangaben stünden dort.',
            'Der Link muss dauerhaft funktionieren, auch mit den Standardeinstellungen gängiger Browser und auf dem Smartphone.',
          ],
        },
      ],
    },
    {
      id: 'fehler',
      h2: 'Häufige Fehler im Impressum',
      blocks: [
        {
          t: 'ul',
          items: [
            '**Postfach statt Anschrift:** genügt laut IHK nicht.',
            '**Nur eine E-Mail-Adresse:** Die IHKs erwarten zusätzlich eine Telefonnummer.',
            '**Rechtsform, Vertretungsberechtigte oder Registernummer fehlen** bei Gesellschaften.',
            '**Veraltete Angaben:** alte Anschrift, ausgeschiedene Geschäftsführung, überholter Verweis auf § 5 TMG.',
            '**Impressum schwer zu finden:** nur auf einzelnen Seiten verlinkt, in einem Menü versteckt oder nur nach mehr als zwei Klicks erreichbar.',
            '**Alter Hinweis auf die OS-Plattform:** Die Plattform ist eingestellt, der Verweis sollte entfernt werden (siehe unten).',
            '**Steuernummer veröffentlicht:** Das Gesetz verlangt nur die Umsatzsteuer-ID oder die Wirtschafts-ID, und nur, wenn Sie eine besitzen.',
          ],
        },
      ],
    },
    {
      id: 'os-plattform',
      h2: 'OS-Plattform und Verbraucherschlichtung: Was heute noch gilt',
      blocks: [
        { t: 'p', x: 'Früher mussten Unternehmen, die online Waren oder Dienstleistungen an Verbraucher verkaufen, auf ihrer Website einen Link zur Online-Streitbeilegungsplattform (OS-Plattform) der EU bereitstellen, meist im Impressum. Diese Plattform wurde zum 20. Juli 2025 eingestellt (Verordnung (EU) 2024/3228). Nach Hinweisen der IHKs müssen Verweise darauf entfernt werden, weil ein fortbestehender Verweis auf eine nicht mehr existierende Plattform als irreführend gewertet werden kann.' },
        { t: 'p', x: 'Davon unabhängig gilt § 36 des Verbraucherstreitbeilegungsgesetzes (VSBG): Wer als Unternehmer eine Website unterhält oder Allgemeine Geschäftsbedingungen verwendet, muss Verbraucher darüber informieren, inwieweit er bereit oder verpflichtet ist, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen. Ausgenommen ist, wer am 31. Dezember des Vorjahres zehn oder weniger Personen beschäftigt hat. Die Pflicht betrifft den Umgang mit Verbrauchern.' },
      ],
    },
    {
      id: 'folgen',
      h2: 'Was bei Fehlern droht',
      blocks: [
        { t: 'p', x: 'Wer Angaben vorsätzlich oder fahrlässig nicht, nicht richtig oder nicht vollständig bereithält, handelt ordnungswidrig. Das Gesetz sieht dafür eine Geldbuße bis zu 50.000 Euro vor (§ 33 Abs. 2 Nr. 1 und Abs. 6 Nr. 3 DDG).' },
        { t: 'p', x: 'In der Praxis sind laut IHK München wettbewerbsrechtliche Abmahnungen durch Mitbewerber oder Verbände häufiger. Sie können dazu führen, dass eine Unterlassungserklärung abgegeben und Anwaltskosten übernommen werden müssen. Ein sorgfältig gepflegtes Impressum ist deshalb die günstigste Vorsorge.' },
      ],
    },
    {
      id: 'checkliste',
      h2: 'Checkliste: Ist Ihr Impressum in Ordnung?',
      blocks: [
        {
          t: 'ol',
          items: [
            'Der Link „Impressum“ steht auf jeder Seite, zum Beispiel in der Fußzeile, und führt direkt zu den Angaben.',
            'Name und vollständige Anschrift (kein Postfach) sind angegeben.',
            'E-Mail-Adresse und Telefonnummer sind angegeben und erreichbar.',
            'Bei Gesellschaften: Rechtsform, Vertretungsberechtigte und Registernummer stehen im Impressum.',
            'Falls zutreffend: Aufsichtsbehörde, Kammer, Berufsbezeichnung und berufsrechtliche Regeln sind genannt.',
            'Die Umsatzsteuer-ID oder Wirtschafts-ID ist genannt, sofern Sie eine besitzen.',
            'Es gibt keinen Verweis mehr auf die OS-Plattform und keine Angabe „§ 5 TMG“.',
            'Das Impressum wird bei jeder Änderung angepasst und mindestens einmal im Jahr durchgesehen.',
          ],
        },
      ],
    },
    {
      id: 'hilfe',
      h2: 'Was unsere Prüfung dazu zeigt',
      blocks: [
        { t: 'p', x: 'Die [kostenlose Website-Prüfung](/website-check?lang=de) sieht von außen, ob auf der Startseite ein Link „Impressum“ gefunden wird und ob Telefon, E-Mail, Adresse oder ein Kontaktlink erreichbar sind. Ob die Angaben im Impressum vollständig und richtig sind, prüfen wir nicht. Das ist eine rechtliche Frage; dafür sind Rechtsberatung, Ihre Kammer oder ein Impressum-Generator eines seriösen Anbieters die richtigen Adressen.' },
        { t: 'p', x: 'Fehlt der Link oder ist er schwer zu finden, lässt sich das meist als kleine technische Korrektur beheben, etwa im Rahmen der [Schnellreparatur](/website-repair?lang=de) ({price.quick}, {time.quick}). Welche Punkte dazugehören, klären wir vor Arbeitsbeginn. Die Preise verstehen sich netto zzgl. 19 % USt.' },
      ],
    },
  ],
  faq: [
    { q: 'Brauche ich als Selbstständige oder Selbstständiger ein Impressum?', a: 'Ja, sobald Ihre Website nicht rein privat ist. Auch Freiberufler und Einzelunternehmer müssen die Pflichtangaben nach § 5 DDG bereithalten.' },
    { q: 'Reicht ein Postfach als Anschrift?', a: 'Nein. Verlangt ist die Anschrift, unter der Sie niedergelassen sind. Ein Postfach genügt laut IHK nicht, weil Schriftstücke und gerichtliche Post zugestellt werden können müssen. Ob in Ihrem Fall eine Geschäftsadresse statt der Wohnanschrift möglich ist, sollten Sie rechtlich klären lassen.' },
    { q: 'Muss im Impressum eine Telefonnummer stehen?', a: 'Das Gesetz verlangt Angaben für eine schnelle elektronische Kontaktaufnahme und unmittelbare Kommunikation, einschließlich der E-Mail-Adresse. Die IHKs lesen das so, dass E-Mail-Adresse und Telefonnummer anzugeben sind. Wer sichergehen will, nennt beides.' },
    { q: 'Brauche ich noch den Link zur OS-Plattform?', a: 'Nein. Die Plattform wurde zum 20. Juli 2025 eingestellt. Laut IHK sollten Verweise darauf entfernt werden, weil sie irreführend sein können.' },
    { q: 'Muss ich meine Steuernummer angeben?', a: 'Nein. § 5 DDG verlangt nur die Umsatzsteuer-Identifikationsnummer oder die Wirtschafts-Identifikationsnummer, und nur, wenn Sie eine besitzen.' },
    { q: 'Brauche ich zusätzlich eine Datenschutzerklärung?', a: 'Ja, wenn Ihre Website personenbezogene Daten verarbeitet, etwa über ein Kontaktformular, Server-Protokolle oder Analyse-Dienste (Informationspflicht nach Art. 13 DSGVO). Sie ist eine eigene Seite neben dem Impressum und sollte ebenfalls von jeder Seite aus verlinkt sein.' },
    { q: 'Wie oft sollte ich das Impressum überprüfen?', a: 'Mindestens einmal im Jahr und bei jeder Änderung, etwa bei Umzug, neuer Rechtsform, neuer Geschäftsführung, neuer Telefonnummer oder E-Mail-Adresse und neuer Registernummer.' },
  ],
  service: 'check',
  related: ['website-selbst-pruefen', 'kontaktformular-funktioniert-nicht', 'website-wartung'],
  sources: [
    { label: '§ 5 DDG: Allgemeine Informationspflichten', url: 'https://www.gesetze-im-internet.de/ddg/__5.html' },
    { label: '§ 33 DDG: Bußgeldvorschriften', url: 'https://www.gesetze-im-internet.de/ddg/__33.html' },
    { label: '§ 36 VSBG: Allgemeine Informationspflicht', url: 'https://www.gesetze-im-internet.de/vsbg/__36.html' },
    { label: 'Medienstaatsvertrag (§ 18 Informationspflichten und Auskunftsrechte)', url: 'https://www.die-medienanstalten.de/fileadmin/user_upload/Rechtsgrundlagen/Gesetze_Staatsvertraege/Medienstaatsvertrag_MStV.pdf' },
    { label: 'IHK München: Merkblatt Pflichtangaben im Internet-Impressum (Stand: Mai 2024)', url: 'https://www.ihk-muenchen.de/ihk/Merkbl%C3%A4tter-WettbewerbsR/Pflichtangaben-Internetimpressum_Stand05_2024.pdf' },
    { label: 'IHK Regensburg: Pflichtangaben im Internet-Impressum', url: 'https://www.ihk.de/regensburg/fachthemen/recht/online-recht-und-datenschutz/online-recht/pflichtangaben-im-internet-impressum-1394836' },
    { label: 'IHK Osnabrück: OS-Plattform seit dem 20.07.2025 eingestellt', url: 'https://www.ihk.de/osnabrueck/recht-und-fair-play/recht/internetrecht/einstellung-os-plattform-6474562' },
  ],
  published: '2026-10-01',
  modified: '2026-10-01',
};
