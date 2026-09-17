import { SeoLinks } from '@/components/SeoLinks';
import { Site } from '@/components/Site';
import { COMPANY, CONTACT_EMAIL, CONTACT_PHONE_E164 } from '@/lib/company';
import { content } from '@/lib/content';
import { resolveLang } from '@/lib/lang';
import { absolutePageUrl, routeMetadata } from '@/lib/seo';

type PageProps = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageProps) {
  return routeMetadata('/', resolveLang((await params).lang));
}

export default async function Page({ params }: PageProps) {
  const initialLang = resolveLang((await params).lang);
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
      <SeoLinks path="/" lang={initialLang} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(business).replace(/</g, '\\u003c') }}
      />
      <Site initialLang={initialLang} />
    </>
  );
}
