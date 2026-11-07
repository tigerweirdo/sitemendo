import { POSTHOG_ALLOWED_HOSTNAMES } from './config';

export function isPostHogAllowedHostname(hostname: string) {
  const h = hostname.trim().toLowerCase();
  return POSTHOG_ALLOWED_HOSTNAMES.some(allowed => h === allowed);
}

/** Lighthouse, CI headless ve otomasyon tarayıcılarında istatistik kapalı. */
export function isAutomatedBrowser(webdriver?: boolean | null) {
  return webdriver === true;
}
