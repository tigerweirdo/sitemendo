/* Hangi Ratgeber / rehber hangi hizmet sayfasından önerilir. Yalnızca sunucuda (ServiceRoute) kullanılır;
   istemciye yalnızca bu kısa kartlar gider, rehber metinlerinin tamamı değil. */

import { getGuide } from './index';
import type { GuideLang, GuideService } from './types';

export type GuideCard = { slug: string; title: string; teaser: string };

/* Sıra önemli: sayfada bu sırayla görünür. Almanca 3 ile 4, Türkçe (pilot) 2 ile 4 rehber; slug'lar testte doğrulanır. */
export const SERVICE_GUIDES: Record<GuideLang, Record<GuideService, string[]>> = {
  de: {
    check: ['website-selbst-pruefen', 'website-nicht-bei-google-gefunden', 'impressum-pflichtangaben', 'website-laedt-langsam'],
    repair: ['website-laedt-langsam', 'website-mobil-optimieren', 'kontaktformular-funktioniert-nicht', 'defekte-links-finden-beheben'],
    care: ['website-wartung', 'website-nicht-erreichbar', 'wordpress-kritischer-fehler-beheben', 'https-ssl-fehler-beheben'],
  },
  tr: {
    check: ['web-sitesi-google-da-gorunmuyor', 'impressum-zorunlulugu'],
    repair: ['iletisim-formu-calismiyor', 'web-sitesi-google-da-gorunmuyor'],
    care: ['web-sitesi-bakimi', 'iletisim-formu-calismiyor'],
  },
};

export function guideCardsFor(service: GuideService, lang: GuideLang): GuideCard[] {
  return SERVICE_GUIDES[lang][service].flatMap(slug => {
    const g = getGuide(slug, lang);
    return g ? [{ slug: g.slug, title: g.short, teaser: g.teaser }] : [];
  });
}
