import { GuideHub } from '@/components/guide/GuideHub';
import { hubMetadata } from '@/lib/guides/seo';

export const metadata = hubMetadata();

export default function RatgeberPage() {
  return <GuideHub />;
}
