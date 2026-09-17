import { cookies } from 'next/headers';
import { Site } from '@/components/Site';
import { COMPANY, CONTACT_EMAIL, CONTACT_PHONE_E164 } from '@/lib/company';
import { content } from '@/lib/content';
import { LANG_COOKIE, resolveLang } from '@/lib/lang';
import { absolutePageUrl, routeMetadata } from '@/lib/seo';

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
  /* Arama motorları için işletme bilgisi. Fiyatlar burada yok: content.ts ile ayrı
     kopyası tutulmasın. */
  const business = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Sitemendo',
    url: absolutePageUrl('/', initialLang),
    description: content[initialLang].meta.description,
    email: CONTACT_EMAIL,
    telephone: CONTACT_PHONE_E164,
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY.street,
      postalCode: COMPANY.postalCode,
      addressLocality: COMPANY.city,
      addressCountry: 'DE',
    },
    areaServed: { '@type': 'Country', name: 'Germany' },
    availableLanguage: ['tr', 'de', 'en'],
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(business).replace(/</g, '\\u003c') }}
      />
      <Site initialLang={initialLang} />
    </>
  );
}
