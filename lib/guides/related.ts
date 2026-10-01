/* Hangi Almanca Ratgeber hangi hizmet sayfasından önerilir. Yalnız sunucuda (ServiceRoute) kullanılır;
   istemciye yalnızca bu kısa kartlar gider, ratgeber metinlerinin tamamı değil. */

import { getGuide } from './index';
import type { GuideService } from './types';

export type GuideCard = { slug: string; title: string; teaser: string };

/* Sıra önemli: sayfada bu sırayla görünür. 3 ile 4 arası ratgeber; slug'lar testte doğrulanır. */
export const SERVICE_GUIDES: Record<GuideService, string[]> = {
  check: ['website-selbst-pruefen', 'website-nicht-bei-google-gefunden', 'impressum-pflichtangaben', 'website-laedt-langsam'],
  repair: ['website-laedt-langsam', 'website-mobil-optimieren', 'kontaktformular-funktioniert-nicht', 'defekte-links-finden-beheben'],
  care: ['website-wartung', 'website-nicht-erreichbar', 'wordpress-kritischer-fehler-beheben', 'https-ssl-fehler-beheben'],
};

export function guideCardsFor(service: GuideService): GuideCard[] {
  return SERVICE_GUIDES[service].flatMap(slug => {
    const g = getGuide(slug);
    return g ? [{ slug: g.slug, title: g.short, teaser: g.teaser }] : [];
  });
}
