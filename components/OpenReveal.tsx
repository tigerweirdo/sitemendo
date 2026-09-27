'use client';

import type { RefObject } from 'react';
import { useOpenReveal } from '@/lib/useScrollMotion';

export function OpenReveal({ scope, open }: { scope: RefObject<HTMLElement | null>; open: boolean }) {
  useOpenReveal(scope, open);
  return null;
}
