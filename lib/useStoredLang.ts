'use client';

import { useLayoutEffect, useState } from 'react';
import type { Lang } from './content';
import { persistLang, readClientLang } from './lang';

export function useStoredLang(initialLang: Lang) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  useLayoutEffect(() => {
    const next = readClientLang() ?? initialLang;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- adres ve yerel depo sunucuda okunamaz; hidrasyondan sonra bir kez eşitlenir
    setLangState(next);
    persistLang(next);
  }, [initialLang]);

  const setLang = (next: Lang) => {
    const y = typeof window !== 'undefined' ? window.scrollY : 0;
    setLangState(next);
    persistLang(next);
    requestAnimationFrame(() => {
      if (Math.abs(window.scrollY - y) > 8) window.scrollTo(0, y);
    });
  };

  return [lang, setLang] as const;
}
