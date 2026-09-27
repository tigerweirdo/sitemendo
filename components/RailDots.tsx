'use client';

import { useEffect, useState, type RefObject } from 'react';

/* Yana kayan kart dizisinin sayacı ve noktaları. Yalnız dizi gerçekten kaydığında görünür
   (globals.css, .rail-dots; masaüstünde kartlar yan yana durur ve bu gizlenir). Noktalar ilgili
   karta kaydırır; sayaç ekran okuyucuya okunmaz, düğme adları kartın adıdır. */
export function RailDots({ rail, labels }: { rail: RefObject<HTMLElement | null>; labels: readonly string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const cards = [...el.children] as HTMLElement[];
      if (!cards.length) return;
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 4) {
        setIndex(cards.length - 1);
        return;
      }
      const start = el.getBoundingClientRect().left + parseFloat(getComputedStyle(el).scrollPaddingLeft || '0');
      let best = 0;
      cards.forEach((card, i) => {
        const d = Math.abs(card.getBoundingClientRect().left - start);
        if (d < Math.abs(cards[best].getBoundingClientRect().left - start)) best = i;
      });
      setIndex(best);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(measure); };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      el.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [rail]);

  const go = (i: number) => {
    const el = rail.current;
    const card = el?.children[i] as HTMLElement | undefined;
    if (!el || !card) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pad = parseFloat(getComputedStyle(el).scrollPaddingLeft || '0');
    const left = el.scrollLeft + card.getBoundingClientRect().left - el.getBoundingClientRect().left - pad;
    el.scrollTo({ left, behavior: reduce ? 'auto' : 'smooth' });
  };

  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    <div className="rail-dots">
      <span className="rail-dots__count" aria-hidden="true">{pad(index + 1)} / {pad(labels.length)}</span>
      <div className="rail-dots__list">
        {labels.map((label, i) => (
          <button
            key={label}
            type="button"
            className="rail-dots__dot"
            aria-label={label}
            aria-current={i === index || undefined}
            onClick={() => go(i)}
          />
        ))}
      </div>
    </div>
  );
}
