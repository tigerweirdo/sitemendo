import type { ReactNode } from 'react';
import type { CheckKey } from '@/lib/content';

/* Kontrol kapsamının çizgi ikonları: 24 birimlik kare, tek kalınlık, dolgu yok. */
const PATHS: Record<CheckKey, ReactNode> = {
  mobile: (
    <>
      <rect x="7" y="2.5" width="10" height="19" rx="2"/>
      <path d="M10.5 18.5h3"/>
    </>
  ),
  speed: (
    <>
      <path d="M3.5 17a8.5 8.5 0 1 1 17 0"/>
      <path d="M12 17l4.5-5.5"/>
      <path d="M6 17h1.5M16.5 17H18M12 8.5V10"/>
    </>
  ),
  links: (
    <>
      <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/>
      <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>
    </>
  ),
  https: (
    <>
      <rect x="5" y="10.5" width="14" height="10.5" rx="1.5"/>
      <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3M12 14.5v2.5"/>
    </>
  ),
  forms: (
    <>
      <rect x="3.5" y="4" width="17" height="5" rx="1"/>
      <rect x="3.5" y="12" width="17" height="5" rx="1"/>
      <path d="M14 20.5h6.5"/>
    </>
  ),
  stack: (
    <>
      <path d="M12 3l9 5-9 5-9-5z"/>
      <path d="M3 12.5l9 5 9-5"/>
      <path d="M3 16.5l9 5 9-5"/>
    </>
  ),
  index: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5"/>
      <path d="M15.5 15.5L21 21"/>
    </>
  ),
  contact: (
    <>
      <path d="M4 4.5h16v11.5H10l-6 4.5z"/>
      <path d="M8 9h8M8 12h5"/>
    </>
  ),
};

export function CheckIcon({ name }: { name: CheckKey }) {
  return (
    <svg className="check__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {PATHS[name]}
    </svg>
  );
}
