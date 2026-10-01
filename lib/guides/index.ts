/* Ratgeber-Verzeichnis. Neuer Ratgeber: Datei in lib/guides/ anlegen, hier eintragen. Die Reihenfolge
   bestimmt Fußzeile (die ersten fünf) und Übersicht; scripts/verify-guides.ts prüft Vollständigkeit und Verweise. */

import type { Guide } from './types';
import { defekteLinksFindenBeheben } from './defekte-links-finden-beheben';
import { httpsSslFehlerBeheben } from './https-ssl-fehler-beheben';
import { impressumPflichtangaben } from './impressum-pflichtangaben';
import { kontaktformularFunktioniertNicht } from './kontaktformular-funktioniert-nicht';
import { websiteLaedtLangsam } from './website-laedt-langsam';
import { websiteMobilOptimieren } from './website-mobil-optimieren';
import { websiteNichtBeiGoogleGefunden } from './website-nicht-bei-google-gefunden';
import { websiteNichtErreichbar } from './website-nicht-erreichbar';
import { websiteSelbstPruefen } from './website-selbst-pruefen';
import { websiteWartung } from './website-wartung';
import { wordpressKritischerFehlerBeheben } from './wordpress-kritischer-fehler-beheben';

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
];

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find(g => g.slug === slug);
}
