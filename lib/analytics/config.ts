import { SITE_HOSTNAME, SITE_HOST_ALIASES } from '../company';

/** PostHog EU — tek yapılandırma kaynağı (paylaşımlı çoklu-site projesi). */
export const POSTHOG_API_HOST = 'https://eu.i.posthog.com';

/** Yalnız bu ana bilgisayar adlarında PostHog başlatılır (localhost, workers.dev, önizleme hariç). */
export const POSTHOG_ALLOWED_HOSTNAMES = [SITE_HOSTNAME, ...SITE_HOST_ALIASES] as const;
export const POSTHOG_PROJECT_KEY =
  process.env.NEXT_PUBLIC_POSTHOG_KEY ?? 'phc_DfzHtLvcj3uawsACtsrgcFVyXVZYkW9FRpq3f2rYfMK5';
export const POSTHOG_PROJECT_SLUG = 'sitemendo';
