import type { NextConfig } from 'next';

/* Sayfalar derlemede her dil için statik HTML olur (out/). Dil seçimi, yönlendirmeler,
   güvenlik başlıkları ve form API'si canlıda Cloudflare Worker'da: worker/index.ts.
   Geliştirmede Worker yok; aynı adresler (/?lang=de) burada dil sayfasına yeniden yazılır. */
function devRewrites() {
  return ['/', '/privacy', '/impressum'].flatMap(path => {
    const suffix = path === '/' ? '' : path;
    return [
      ...['tr', 'de', 'en'].map(lang => ({ source: path, has: [{ type: 'query' as const, key: 'lang', value: lang }], destination: `/${lang}${suffix}` })),
      ...['tr', 'de', 'en'].map(lang => ({ source: path, has: [{ type: 'cookie' as const, key: 'sitemendo.lang', value: lang }], destination: `/${lang}${suffix}` })),
      { source: path, destination: `/tr${suffix}` },
    ];
  });
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  /* Dışa aktarım kipi geliştirmede yeniden yazmaları engelliyor; yalnız derlemede açık. */
  ...(process.env.NODE_ENV === 'development'
    ? { rewrites: async () => ({ beforeFiles: devRewrites(), afterFiles: [], fallback: [] }) }
    : { output: 'export' as const }),
};

export default nextConfig;
