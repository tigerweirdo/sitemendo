import type { Metadata } from 'next';
import { IBM_Plex_Mono, Inter } from 'next/font/google';
import './globals.css';
import { SITE_URL } from '@/lib/company';
import { content } from '@/lib/content';
import { LANG_BOOTSTRAP } from '@/lib/lang';
import { resolveRequestLang } from '@/lib/requestLang';
import { SeoLinks } from '@/components/SeoLinks';

const inter = Inter({ subsets: ['latin', 'latin-ext'], variable: '--font-sans' });
/* Yalnız fiyat, alan adı gibi veri satırlarında; önden yüklenip ilk açılışı ağırlaştırmasın. */
const ibmPlexMono = IBM_Plex_Mono({ subsets: ['latin', 'latin-ext'], weight: ['400', '500'], variable: '--font-mono', preload: false });

export async function generateMetadata(): Promise<Metadata> {
  const lang = await resolveRequestLang();
  const m = content[lang].meta;
  return {
    metadataBase: new URL(SITE_URL),
    applicationName: 'Sitemendo',
    title: m.title,
    description: m.description,
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const lang = await resolveRequestLang();
  return (
    <html lang={lang} className={`${inter.variable} ${ibmPlexMono.variable}`}>
      <body>
        <SeoLinks />
        <script dangerouslySetInnerHTML={{ __html: LANG_BOOTSTRAP }} />
        {children}
      </body>
    </html>
  );
}
