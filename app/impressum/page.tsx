import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { LegalPage } from '@/components/LegalPage';
import { content } from '@/lib/content';
import { LANG_COOKIE, resolveLang } from '@/lib/lang';

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const params = await searchParams;
  const cookieStore = await cookies();
  const lang = resolveLang(params.lang, cookieStore.get(LANG_COOKIE)?.value);
  const m = content[lang].meta;
  return {
    title: m.impressumTitle,
    description: m.impressumDescription,
    robots: { index: true, follow: true },
  };
}

export default async function ImpressumPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const params = await searchParams;
  const cookieStore = await cookies();
  const initialLang = resolveLang(params.lang, cookieStore.get(LANG_COOKIE)?.value);
  return <LegalPage type="impressum" initialLang={initialLang} />;
}
