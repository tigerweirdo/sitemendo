import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Sitemendo',
    short_name: 'Sitemendo',
    description: 'Web siteniz için kontrol, düzeltme ve bakım.',
    start_url: '/',
    display: 'browser',
    background_color: '#F3F1EA',
    theme_color: '#090909',
    icons: [
      { src: '/favicon.ico', sizes: '48x48', type: 'image/x-icon' },
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  };
}
