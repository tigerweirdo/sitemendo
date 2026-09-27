'use client';

import type { RefObject } from 'react';
import type { Lang } from '@/lib/content';
import { useScrollMotion } from '@/lib/useScrollMotion';

/* GSAP bu dosyada. Ana sayfa onu statik içe almaz; kaydırma ya da gecikmeden sonra gelir. */
export function ScrollMotion({
  scope, nav, footer, lang,
}: {
  scope: RefObject<HTMLElement | null>;
  nav: RefObject<HTMLElement | null>;
  footer: RefObject<HTMLElement | null>;
  lang: Lang;
}) {
  useScrollMotion(scope, nav, footer, lang);
  return null;
}
