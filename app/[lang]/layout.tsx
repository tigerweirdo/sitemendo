import type { Metadata } from 'next';
import { IBM_Plex_Mono, Inter } from 'next/font/google';
import '../globals.css';
import { SITE_URL } from '@/lib/company';
import { content } from '@/lib/content';
import { LANGS, LANG_BOOTSTRAP, resolveLang } from '@/lib/lang';

/* Yalnız latin önden yüklenir (Almanca ve İngilizce için yeterli). Türkçedeki ğ, ş, İ gibi
   harflerin latin-ext dosyası CSS'te durur; tarayıcı yalnız bu harfler sayfada varsa indirir. */
const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
/* Yalnız fiyat, alan adı gibi veri satırlarında; önden yüklenip ilk açılışı ağırlaştırmasın. */
const ibmPlexMono = IBM_Plex_Mono({ subsets: ['latin', 'latin-ext'], weight: ['400', '500'], variable: '--font-mono', preload: false });

/* Her dil derlemede ayrı statik sayfa olur (/tr, /de, /en). Ziyaretçi bu adresleri görmez:
   Worker isteğin diline göre dosyayı seçer (worker/index.ts). */
export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.map(lang => ({ lang }));
}

type LayoutProps = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const m = content[resolveLang((await params).lang)].meta;
  return {
    metadataBase: new URL(SITE_URL),
    applicationName: 'Sitemendo',
    title: m.title,
    description: m.description,
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({ children, params }: Readonly<LayoutProps & { children: React.ReactNode }>) {
  const lang = resolveLang((await params).lang);
  return (
    <html lang={lang} className={`${inter.variable} ${ibmPlexMono.variable}`}>
      <body>
        <script dangerouslySetInnerHTML={{ __html: LANG_BOOTSTRAP }} />
        {children}
      </body>
    </html>
  );
}
