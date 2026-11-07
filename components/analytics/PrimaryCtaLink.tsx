'use client';

import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { trackPrimaryCta } from '@/lib/analytics/posthog';

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  cta: string;
  href: string;
  children: ReactNode;
};

export function PrimaryCtaLink({ cta, href, children, onClick, ...rest }: Props) {
  return (
    <a
      href={href}
      {...rest}
      onClick={event => {
        trackPrimaryCta(cta);
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}
