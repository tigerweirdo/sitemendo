import { LegalPage } from '@/components/LegalPage';
import { SeoLinks } from '@/components/SeoLinks';
import { resolveLang } from '@/lib/lang';
import { routeMetadata } from '@/lib/seo';

type PageProps = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageProps) {
  return routeMetadata('/privacy', resolveLang((await params).lang));
}

export default async function PrivacyPage({ params }: PageProps) {
  const initialLang = resolveLang((await params).lang);
  return (
    <>
      <SeoLinks path="/privacy" lang={initialLang} />
      <LegalPage type="privacy" initialLang={initialLang} />
    </>
  );
}
