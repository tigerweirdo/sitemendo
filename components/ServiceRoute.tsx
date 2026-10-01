import { ServicePage } from '@/components/ServicePage';
import { SeoLinks } from '@/components/SeoLinks';
import { COMPANY, CONTACT_EMAIL, CONTACT_PHONE_E164 } from '@/lib/company';
import type { Lang } from '@/lib/content';
import { guideCardsFor } from '@/lib/guides/related';
import { SERVICE_PAGES, servicePages, serviceUi, type ServiceKey } from '@/lib/servicePages';
import { absolutePageUrl } from '@/lib/seo';

/* Üç hizmet rotasının ortak gövdesi (sunucu bileşeni): canonical ve hreflang, yapısal veri,
   sayfa. Yapısal veride fiyat yok; ana sayfadaki gibi, content.ts ile ayrı kopya tutulmasın.
   Ratgeber kartları yalnız Almanca sayfada gösterilir (ratgeberler Almanca). */
export function ServiceRoute({ service, lang }: { service: ServiceKey; lang: Lang }) {
  const entry = SERVICE_PAGES.find(p => p.key === service)!;
  const page = servicePages[lang][service];
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: page.h1,
    serviceType: serviceUi[lang].names[service],
    description: page.metaDescription,
    url: absolutePageUrl(entry.path, lang),
    provider: {
      '@type': 'ProfessionalService',
      name: 'Sitemendo',
      url: absolutePageUrl('/', lang),
      email: CONTACT_EMAIL,
      telephone: CONTACT_PHONE_E164,
      address: {
        '@type': 'PostalAddress',
        streetAddress: COMPANY.street,
        postalCode: COMPANY.postalCode,
        addressLocality: COMPANY.city,
        addressCountry: 'DE',
      },
    },
    areaServed: { '@type': 'Country', name: 'Germany' },
    availableLanguage: ['tr', 'de', 'en'],
  };
  return (
    <>
      <SeoLinks path={entry.path} lang={lang} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
      />
      <ServicePage service={service} initialLang={lang} guides={guideCardsFor(service)} />
    </>
  );
}
