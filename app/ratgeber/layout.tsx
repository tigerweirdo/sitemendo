import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '../globals.css';
import { SITE_URL } from '@/lib/company';

/* Almanca Ratgeber (/ratgeber): ana sitenin [lang] düzeninden ayrı, ikinci bir kök düzen. Sayfalar
   tek dillidir (Almanca); dil geçiş betiği ve dil çerezi yok. Aynı yazı tipi dosyası kullanılır. */
const inter = localFont({
  src: '../fonts/inter-subset.woff2',
  variable: '--font-sans',
  weight: '100 900',
  display: 'swap',
  adjustFontFallback: 'Arial',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: 'Sitemendo',
};

export default function GuideLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
