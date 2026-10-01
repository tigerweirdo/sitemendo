import { GuideHub } from '@/components/guide/GuideHub';
import { hubMetadata } from '@/lib/guides/seo';

/* Almanca özet sayfasının hreflang karşılığı. */
export const metadata = hubMetadata('tr', 'de');

export default function RehberPage() {
  return <GuideHub lang="tr" />;
}
