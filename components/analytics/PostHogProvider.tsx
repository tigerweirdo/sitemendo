'use client';

import { usePathname } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';
import { capturePageview, getPostHog, outboundLabel, track } from '@/lib/analytics/posthog';

function isExternalLink(anchor: HTMLAnchorElement) {
  const href = anchor.getAttribute('href');
  if (!href || href.startsWith('#')) return false;
  if (/^(?:mailto:|tel:|javascript:)/i.test(href)) return false;
  try {
    const u = new URL(href, window.location.origin);
    return u.origin !== window.location.origin;
  } catch {
    return false;
  }
}

export function PostHogProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    void getPostHog();
  }, []);

  useEffect(() => {
    if (!pathname) return;
    void capturePageview(pathname);
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest('a');
      if (!anchor || !isExternalLink(anchor)) return;
      const href = anchor.href;
      void track('outbound_click', { destination: outboundLabel(href) });
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return children;
}
