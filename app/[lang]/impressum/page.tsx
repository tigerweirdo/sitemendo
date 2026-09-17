import { LegalPage } from '@/components/LegalPage';
import { SeoLinks } from '@/components/SeoLinks';
import { resolveLang } from '@/lib/lang';
import { routeMetadata } from '@/lib/seo';

type PageProps = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageProps) {
  return routeMetadata('/impressum', resolveLang((await params).lang));
}

export default async function ImpressumPage({ params }: PageProps) {
  const initialLang = resolveLang((await params).lang);
  return (
    <>
      <SeoLinks path="/impressum" lang={initialLang} />
      <LegalPage type="impressum" initialLang={initialLang} />
    </>
  );
}
