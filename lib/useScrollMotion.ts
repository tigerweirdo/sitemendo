'use client';

import type { RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import type { Lang } from './content';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const OUT = 'power3.out';
const LINE = 'power2.inOut';

/* Yalnız henüz ekrana girmemiş öğeler gizlenir: sunucudan gelen ilk boyamada
   görünen hiçbir şey hidrasyonda kaybolmaz. JS gelmezse ya da hareket
   azaltılmışsa hiçbir şey gizlenmez, sayfa bugünkü gibi durur. */
function unseen<T extends Element>(els: T[], edge: 'top' | 'bottom' = 'top') {
  return els.filter(el => el.getBoundingClientRect()[edge] > window.innerHeight);
}

function kids(els: Element[], selector?: string) {
  return els.flatMap(el => [...(selector ? el.querySelectorAll(selector) : el.children)]);
}

/* Her öğenin hareketi kurulumda duraklatılmış yaratılır ve gizli başlangıcını hemen
   çizer; tetik yalnızca oynatır, aynı anda ekrana girenler gap arayla açılır. Her
   özelliğin tek sahibi bu hareket olduğu için geri alma öğeyi ilk hâline döndürür.
   Önce set, tetikte ayrı bir to kurmak dil değişiminde öğeleri gizli bırakıyordu. */
function reveal(
  targets: Element[],
  start: string,
  build: (el: Element) => gsap.core.Animation,
  gap = 0.1,
  wait = 0,
) {
  if (!targets.length) return;
  const anims = new Map(targets.map(el => [el, build(el)]));
  ScrollTrigger.batch(targets, {
    start,
    once: true,
    onEnter: batch => batch.forEach((el, i) => anims.get(el)?.delay(wait + i * gap).restart(true)),
  });
}

/* Ana sayfanın kaydırma hareketleri. Gizleme opacity ile, visibility ile değil:
   klavyeyle odaklanan gizli öğe ekrana kaydırılır ve orada açılır. Hairline'lar
   globals.css'te --rule (0–1) oranında soldan sağa çizilir. Dil değişince her şey
   geri alınıp yeniden kurulur; karar cümlesinin kelime sayısı dile göre değişiyor. */
export function useScrollMotion(scope: RefObject<HTMLElement | null>, lang: Lang) {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const root = scope.current;
      if (!root) return;
      const q = (selector: string) => gsap.utils.toArray<HTMLElement>(selector, root);

      reveal(unseen(q('.sec')), 'top 92%', el =>
        gsap.fromTo(el, { '--rule': 0 }, { '--rule': 1, duration: 1.1, ease: LINE, paused: true }), 0);

      /* Başlık kendi alt kenarındaki bir maskenin arkasından yükselir: kayma ile alttan
         kırpma aynı oranda ilerlediği için görünen pencere yerinde durur. Metin satırlara
         bölünmüyor; React dil değişince başlığı olduğu gibi günceller. */
      reveal(unseen(q('.h2:not(.statement__title)')), 'top 90%', el => gsap.fromTo(el,
        { yPercent: 100, clipPath: 'inset(0% 0% 100% 0%)' },
        {
          yPercent: 0,
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 0.9,
          ease: 'power4.out',
          clearProps: 'clipPath,transform',
          paused: true,
        }));

      reveal(unseen(q('[data-reveal]')), 'top 92%', el =>
        gsap.fromTo(el, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7, ease: OUT, paused: true }), 0.08, 0.1);

      /* Listeler: satırın üst çizgisi çizilir, içeriği o çizginin altından gelir. */
      reveal(unseen(q('.check, .service, .step, .faq__item')), 'top 88%', row => gsap.timeline({ paused: true })
        .fromTo(row, { '--rule': 0 }, { '--rule': 1, duration: 0.9, ease: LINE })
        .fromTo(row.children, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7, ease: OUT, stagger: 0.06 }, 0.2), 0.12);

      /* Listenin kapanış çizgisi, dibi ekrana girince. */
      reveal(unseen(q('.checks, .findings, .services, .steps, .faq'), 'bottom'), 'bottom 96%', el =>
        gsap.fromTo(el, { '--rule': 0 }, { '--rule': 1, duration: 0.9, ease: LINE, paused: true }), 0);

      /* Örnek rapor basılıyor: belge gelir, başlığın altındaki mürekkep çizgi çizilir,
         sorun sayısı 00'dan sayar. Sayı React'in yazdığı metin; geri alınınca eski
         hâline döner, yarım kalan sayaç sonradan üstüne yazamaz. */
      const doc = root.querySelector<HTMLElement>('.doc');
      const count = doc?.querySelector<HTMLElement>('.doc__count');
      const tally = count?.querySelector('b');
      const total = tally?.textContent ?? '';
      let counting = false;
      if (doc && count && tally && unseen([doc]).length) {
        const n = { v: 0 };
        counting = true;
        tally.textContent = total.replace(/\d/g, '0');
        gsap.timeline({ scrollTrigger: { trigger: doc, start: 'top 82%', once: true } })
          .fromTo(doc, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: OUT })
          .fromTo(kids([doc], '.doc__head > *'), { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: 0.5, ease: OUT, stagger: 0.08 }, 0.2)
          .fromTo(count, { '--rule': 0 }, { '--rule': 1, duration: 0.8, ease: LINE }, 0.3)
          .to(n, {
            v: Number(total),
            duration: 0.6,
            ease: 'power1.out',
            onUpdate: () => {
              if (counting) tally.textContent = String(Math.round(n.v)).padStart(total.length, '0');
            },
          }, 0.5)
          .fromTo(kids([count], 'p'), { opacity: 0 }, { opacity: 1, duration: 0.4, ease: OUT }, 0.7);
      }

      reveal(unseen(q('.finding')), 'top 90%', finding => gsap.timeline({ paused: true })
        .fromTo(finding, { '--rule': 0 }, { '--rule': 1, duration: 0.8, ease: LINE })
        /* Önem etiketi damga gibi iner. */
        .fromTo(kids([finding], '.severity'), { opacity: 0, scale: 1.4 },
          { opacity: 1, scale: 1, duration: 0.3, ease: 'power3.in' }, 0.25)
        .fromTo(kids([finding], '.finding__title, .finding__meta'), { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.6, ease: OUT, stagger: 0.06 }, 0.35), 0.18, 0.15);

      /* Karar cümlesi: kelimeler kaydırdıkça griden mürekkebe dolar, geri kaydırınca boşalır. */
      const statement = root.querySelector<HTMLElement>('.statement__title');
      if (statement && unseen([statement]).length) {
        gsap.fromTo(kids([statement], '.statement__word'), { opacity: 0.2 }, {
          opacity: 1,
          ease: 'none',
          stagger: 0.1,
          scrollTrigger: { trigger: statement, start: 'top 85%', end: 'bottom 45%', scrub: 0.4 },
        });
      }

      /* Form adımı, SSS ve rapor listesi sayfa boyunu değiştiriyor; tetik noktaları
         eski yerlerinde kalmasın. */
      let refresh: gsap.core.Tween | undefined;
      const ro = new ResizeObserver(() => {
        refresh?.kill();
        refresh = gsap.delayedCall(0.2, () => ScrollTrigger.refresh());
      });
      ro.observe(root);

      return () => {
        ro.disconnect();
        refresh?.kill();
        if (counting && tally) {
          counting = false;
          tally.textContent = total;
        }
      };
    }, scope);
    return () => mm.revert();
  }, { scope, dependencies: [lang], revertOnUpdate: true });
}
