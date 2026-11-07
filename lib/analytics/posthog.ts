import type { PostHog } from 'posthog-js';
import { POSTHOG_API_HOST, POSTHOG_PROJECT_KEY, POSTHOG_PROJECT_SLUG } from './config';
import { isAutomatedBrowser, isPostHogAllowedHostname } from './runtime';

let client: PostHog | null = null;
let loading: Promise<PostHog | null> | null = null;

/** React Strict Mode çift mount ve ardışık aynı pathname için. */
const PAGEVIEW_DEDUPE_MS = 2500;
let lastPageview: { path: string; at: number } | null = null;

export function shouldInitPostHog(opts: {
  hostname: string;
  webdriver?: boolean | null;
  dnt?: boolean;
  projectKey?: string;
}) {
  if (!opts.projectKey) return false;
  if (opts.dnt) return false;
  if (isAutomatedBrowser(opts.webdriver)) return false;
  return isPostHogAllowedHostname(opts.hostname);
}

export function shouldCapturePageview(pathname: string, now = Date.now()) {
  const path = safePagePath(pathname);
  if (lastPageview?.path === path && now - lastPageview.at < PAGEVIEW_DEDUPE_MS) return false;
  lastPageview = { path, at: now };
  return true;
}

/** Node testleri için. */
export function resetPostHogClientState() {
  client = null;
  loading = null;
  lastPageview = null;
}

export function dntEnabled() {
  if (typeof navigator === 'undefined') return false;
  const dnt = navigator.doNotTrack ?? (navigator as Navigator & { msDoNotTrack?: string }).msDoNotTrack;
  return dnt === '1' || dnt === 'yes';
}

function scheduleIdle(run: () => void) {
  if (typeof window === 'undefined') return;
  const ric = window.requestIdleCallback;
  if (ric) ric(() => run(), { timeout: 2500 });
  else window.setTimeout(run, 1);
}

/** Olaylarda yalnızca kök + yol; sorgu parçası ve hash kişisel veri taşımasın. */
export function safePagePath(pathname: string) {
  return pathname.split('?')[0].split('#')[0] || '/';
}

function scrubEventUrl(url: unknown) {
  if (typeof url !== 'string') return url;
  try {
    const u = new URL(url, typeof window !== 'undefined' ? window.location.origin : 'https://sitemendo.com');
    return `${u.origin}${u.pathname}`;
  } catch {
    return undefined;
  }
}

function canInitInBrowser() {
  if (typeof window === 'undefined') return false;
  return shouldInitPostHog({
    hostname: window.location.hostname,
    webdriver: navigator.webdriver,
    dnt: dntEnabled(),
    projectKey: POSTHOG_PROJECT_KEY,
  });
}

export async function getPostHog(): Promise<PostHog | null> {
  if (!canInitInBrowser()) return null;
  if (client) return client;
  if (!loading) {
    loading = new Promise(resolve => {
      scheduleIdle(() => {
        void import('posthog-js').then(({ default: posthog }) => {
          posthog.init(POSTHOG_PROJECT_KEY, {
            api_host: POSTHOG_API_HOST,
            autocapture: false,
            capture_pageview: false,
            capture_pageleave: false,
            disable_session_recording: true,
            respect_dnt: true,
            /* Çerez yok: TTDSG/DSGVO’da çerez onayı gerektirmeden temel ölçüm; oturum bellekte. */
            persistence: 'memory',
            person_profiles: 'identified_only',
            loaded: ph => {
              ph.register({ project_slug: POSTHOG_PROJECT_SLUG });
            },
            before_send: event => {
              if (event?.properties) {
                if ('$current_url' in event.properties) {
                  event.properties.$current_url = scrubEventUrl(event.properties.$current_url);
                }
                if ('$referrer' in event.properties && typeof event.properties.$referrer === 'string') {
                  event.properties.$referrer = scrubEventUrl(event.properties.$referrer);
                }
              }
              return event;
            },
          });
          client = posthog;
          resolve(posthog);
        });
      });
    });
  }
  return loading;
}

export async function track(event: string, properties?: Record<string, unknown>) {
  if (dntEnabled()) return;
  const ph = await getPostHog();
  ph?.capture(event, properties);
}

export function trackPrimaryCta(cta: string) {
  void track('primary_cta_click', { cta });
}

export async function capturePageview(pathname: string) {
  if (!shouldCapturePageview(pathname)) return;
  const ph = await getPostHog();
  if (!ph) return;
  const path = safePagePath(pathname);
  ph.capture('$pageview', {
    $current_url: `${window.location.origin}${path}`,
    $pathname: path,
  });
}

export function outboundLabel(href: string) {
  try {
    const u = new URL(href, window.location.origin);
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return u.protocol.replace(':', '');
    return u.hostname;
  } catch {
    return 'unknown';
  }
}
