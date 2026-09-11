import { cookies } from 'next/headers';
import { LegalPage } from '@/components/LegalPage';
import { LANG_COOKIE, resolveLang } from '@/lib/lang';
import { routeMetadata } from '@/lib/seo';

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const params = await searchParams;
  const cookieStore = await cookies();
  const lang = resolveLang(params.lang, cookieStore.get(LANG_COOKIE)?.value);
  return routeMetadata('/privacy', lang);
}

export default async function PrivacyPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const params = await searchParams;
  const cookieStore = await cookies();
  const initialLang = resolveLang(params.lang, cookieStore.get(LANG_COOKIE)?.value);
  return <LegalPage type="privacy" initialLang={initialLang} />;
}
