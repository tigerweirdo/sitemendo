'use client';

import { useEffect, useState } from 'react';

/* Menüdeki bölümlerden hangisi şu an ekranın okuma hizasında (üstten %40) duruyor.
   Hiçbiri değilse (hero, yaklaşım, rapor, son form) null. Hareket değil, konum bilgisi:
   hareket azaltılmış olsa da çalışır. */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join(' ');

  useEffect(() => {
    const els = key.split(' ')
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(entries => {
      for (const entry of entries) {
        const id = entry.target.id;
        setActive(current => (entry.isIntersecting ? id : current === id ? null : current));
      }
    }, { rootMargin: '-40% 0px -59% 0px' });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [key]);

  return active;
}
