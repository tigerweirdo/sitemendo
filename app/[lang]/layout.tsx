import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '../globals.css';
import { SITE_URL } from '@/lib/company';
import { content } from '@/lib/content';
import { LANGS, LANG_BOOTSTRAP, resolveLang } from '@/lib/lang';

/* Inter, sayfada kullanılan harflere indirgenmiş tek değişken dosya (34 KB, yalnız ağırlık
   ekseni). Türkçe ğ, ş, ı, İ de içinde; önden yüklenir. Ayrı latin-ext dosyası geç gelip
   hero paragrafının LCP anını geciktiriyordu. Lisans: app/fonts/OFL.txt. */
const inter = localFont({
  src: '../fonts/inter-subset.woff2',
  variable: '--font-sans',
  weight: '100 900',
  display: 'swap',
  adjustFontFallback: 'Arial',
});

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
    <html lang={lang} className={inter.variable}>
      <body>
        <script dangerouslySetInnerHTML={{ __html: LANG_BOOTSTRAP }} />
        {children}
      </body>
    </html>
  );
}
