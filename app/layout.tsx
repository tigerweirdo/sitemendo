import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { IBM_Plex_Mono, Inter } from 'next/font/google';
import './globals.css';
import { content } from '@/lib/content';
import { LANG_BOOTSTRAP, LANG_COOKIE, parseLang } from '@/lib/lang';

const inter = Inter({ subsets: ['latin', 'latin-ext'], variable: '--font-sans' });
const ibmPlexMono = IBM_Plex_Mono({ subsets: ['latin', 'latin-ext'], weight: ['400', '500'], variable: '--font-mono' });

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const lang = parseLang(cookieStore.get(LANG_COOKIE)?.value) ?? 'tr';
  const m = content[lang].meta;
  return {
    title: m.title,
    description: m.description,
    robots: { index: true, follow: true },
    openGraph: {
      type: 'website',
      title: m.ogTitle,
      description: m.ogDescription,
    },
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const lang = parseLang(cookieStore.get(LANG_COOKIE)?.value) ?? 'tr';
  return (
    <html lang={lang} className={`${inter.variable} ${ibmPlexMono.variable}`}>
      <body>
        <script dangerouslySetInnerHTML={{ __html: LANG_BOOTSTRAP }} />
        {children}
      </body>
    </html>
  );
}
