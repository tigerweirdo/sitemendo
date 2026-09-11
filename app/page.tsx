import { cookies } from 'next/headers';
import { Site } from '@/components/Site';
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
  return routeMetadata('/', lang);
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const params = await searchParams;
  const cookieStore = await cookies();
  const initialLang = resolveLang(params.lang, cookieStore.get(LANG_COOKIE)?.value);
  return <Site initialLang={initialLang} />;
}
