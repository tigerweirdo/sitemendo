import type { NextConfig } from 'next';

/* Canlı güvenlik başlıkları. CSP satır içi betik ve stile izin veriyor: Next.js hidrasyon
   verisi, dil önyükleme betiği ve animasyonların stil öznitelikleri satır içi. Geliştirmede
   CSP yok (hızlı yenileme eval kullanıyor); önizleme dağıtımlarında Vercel araç çubuğuna
   izin var. */
const vercelLive = process.env.VERCEL_ENV === 'preview' ? ' https://vercel.live' : '';
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${vercelLive}`,
  `style-src 'self' 'unsafe-inline'${vercelLive}`,
  `img-src 'self' data: blob:${vercelLive}`,
  `font-src 'self'${vercelLive}`,
  `connect-src 'self'${vercelLive}`,
  `frame-src 'self'${vercelLive}`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join('; ');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    if (process.env.NODE_ENV !== 'production') return [];
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: csp },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
        ],
      },
    ];
  },
};

export default nextConfig;
