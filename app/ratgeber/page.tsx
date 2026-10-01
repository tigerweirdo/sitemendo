import { GuideHub } from '@/components/guide/GuideHub';
import { guidesIn } from '@/lib/guides';
import { hubMetadata } from '@/lib/guides/seo';

/* Türkçe karşılığı varsa özet sayfaları birbirinin hreflang karşılığıdır. */
export const metadata = hubMetadata('de', guidesIn('tr').length ? 'tr' : undefined);

export default function RatgeberPage() {
  return <GuideHub lang="de" />;
}
