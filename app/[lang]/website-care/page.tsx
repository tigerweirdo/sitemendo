import { ServiceRoute } from '@/components/ServiceRoute';
import { resolveLang } from '@/lib/lang';
import { routeMetadata } from '@/lib/seo';

type PageProps = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageProps) {
  return routeMetadata('/website-care', resolveLang((await params).lang));
}

export default async function Page({ params }: PageProps) {
  return <ServiceRoute service="care" lang={resolveLang((await params).lang)} />;
}
