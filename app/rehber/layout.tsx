import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '../globals.css';
import { SITE_URL } from '@/lib/company';

/* Türkçe Rehber (/rehber): /ratgeber ile aynı yapıda üçüncü kök düzen. Sayfalar tek dillidir (Türkçe);
   dil geçiş betiği ve dil çerezi yok. Aynı yazı tipi dosyası kullanılır (Türkçe harfleri içerir). */
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

export default function GuideLayoutTr({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
