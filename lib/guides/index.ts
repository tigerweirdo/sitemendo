/* Ratgeber-Verzeichnis. Neuer Ratgeber: Datei in lib/guides/ (Deutsch) oder lib/guides/tr/ (Türkisch) anlegen,
   hier eintragen. Die Reihenfolge je Sprache bestimmt Fußzeile (die ersten fünf) und Übersicht;
   scripts/verify-guides.ts prüft Vollständigkeit und Verweise. */

import type { Guide, GuideLang } from './types';
import { defekteLinksFindenBeheben } from './defekte-links-finden-beheben';
import { httpsSslFehlerBeheben } from './https-ssl-fehler-beheben';
import { impressumPflichtangaben } from './impressum-pflichtangaben';
import { kontaktformularFunktioniertNicht } from './kontaktformular-funktioniert-nicht';
import { spfDkimDmarcEinrichten } from './spf-dkim-dmarc-einrichten';
import { websiteLaedtLangsam } from './website-laedt-langsam';
import { websiteMobilOptimieren } from './website-mobil-optimieren';
import { websiteNichtBeiGoogleGefunden } from './website-nicht-bei-google-gefunden';
import { websiteNichtErreichbar } from './website-nicht-erreichbar';
import { websiteSelbstPruefen } from './website-selbst-pruefen';
import { websiteWartung } from './website-wartung';
import { wordpressKritischerFehlerBeheben } from './wordpress-kritischer-fehler-beheben';
import { wordpressWartungsmodusGehtNichtWeg } from './wordpress-wartungsmodus-geht-nicht-weg';
import { iletisimFormuCalismiyor } from './tr/iletisim-formu-calismiyor';
import { impressumZorunlulugu } from './tr/impressum-zorunlulugu';
import { webSitesiBakimi } from './tr/web-sitesi-bakimi';
import { webSitesiGoogleDaGorunmuyor } from './tr/web-sitesi-google-da-gorunmuyor';

export const GUIDES: Guide[] = [
  websiteSelbstPruefen,
  websiteNichtBeiGoogleGefunden,
  websiteLaedtLangsam,
  websiteMobilOptimieren,
  kontaktformularFunktioniertNicht,
  httpsSslFehlerBeheben,
  defekteLinksFindenBeheben,
  impressumPflichtangaben,
  websiteWartung,
  websiteNichtErreichbar,
  wordpressKritischerFehlerBeheben,
  wordpressWartungsmodusGehtNichtWeg,
  spfDkimDmarcEinrichten,
  /* Türkçe pilot (/rehber): Almanca aslı olan dört rehber. Sıra altbilgi ve özet sayfasını belirler. */
  webSitesiGoogleDaGorunmuyor,
  impressumZorunlulugu,
  iletisimFormuCalismiyor,
  webSitesiBakimi,
];

/* Mit lang: nur in dieser Sprache suchen (Verweise "related" bleiben in einer Sprache). */
export function getGuide(slug: string, lang?: GuideLang): Guide | undefined {
  return GUIDES.find(g => g.slug === slug && (!lang || g.lang === lang));
}

export function guidesIn(lang: GuideLang): Guide[] {
  return GUIDES.filter(g => g.lang === lang);
}

/* Gegenstück in der anderen Sprache (hreflang-Paar). Die Bearbeitung nennt ihr Original (translationOf);
   das Original findet seine Bearbeitung über dieselbe Angabe. */
export function counterpart(g: Guide): Guide | undefined {
  if (g.translationOf) return GUIDES.find(x => x.slug === g.translationOf);
  return GUIDES.find(x => x.translationOf === g.slug);
}
