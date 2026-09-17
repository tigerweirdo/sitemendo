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
   Önce set, tetikte ayrı bir to kurmak dil değişiminde öğeleri gizli bırakıyordu.
   Menüden aşağıdaki bir bölüme atlanınca üstte kalanlar da aynı partide gelir; onlar
   beklemeden son hâline geçer, sıra yalnız ekrandakiler arasında işler. */
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
    onEnter: batch => {
      let order = 0;
      batch.forEach(el => {
        const anim = anims.get(el);
        if (!anim) return;
        if (el.getBoundingClientRect().bottom < 0) anim.progress(1);
        else anim.delay(wait + order++ * gap).restart(true);
      });
    },
  });
}

/* Ana sayfanın kaydırma hareketleri. Gizleme opacity ile, visibility ile değil:
   klavyeyle odaklanan gizli öğe ekrana kaydırılır ve orada açılır. Hairline'lar
   globals.css'te --rule (0–1) oranında soldan sağa çizilir. Dil değişince her şey
   geri alınıp yeniden kurulur: adım ve SSS satırlarının anahtarı metin olduğu için
   React onları yeni öğelerle değiştiriyor. */
export function useScrollMotion(
  scope: RefObject<HTMLElement | null>,
  nav: RefObject<HTMLElement | null>,
  footer: RefObject<HTMLElement | null>,
  lang: Lang,
) {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const root = scope.current;
      if (!root) return;
      const q = (selector: string) => gsap.utils.toArray<HTMLElement>(selector, root);

      /* Okuma çubuğu: menünün alt çizgisi sayfa ilerledikçe sülfürle dolar. */
      if (nav.current) {
        gsap.fromTo(nav.current, { '--progress': 0 }, {
          '--progress': 1,
          ease: 'none',
          scrollTrigger: { start: 0, end: 'max', scrub: true },
        });
      }

      /* Menü aşağı kaydırırken çekilir, yukarı kaydırınca döner; okuma çubuğu ekranın
         üstünde kalır. Menü açıkken ya da içinde odak varken çekilmez. */
      const header = nav.current;
      const showHeader = () => header?.removeAttribute('data-hidden');
      if (header) {
        let lastY = window.scrollY;
        ScrollTrigger.create({
          start: 0,
          end: 'max',
          onUpdate: self => {
            const y = self.scroll();
            if (Math.abs(y - lastY) < 8) return;
            const down = y > lastY;
            lastY = y;
            header.toggleAttribute('data-hidden', down && y > header.offsetHeight * 2
              && !header.classList.contains('open') && !header.matches(':focus-within'));
          },
        });
        header.addEventListener('focusin', showHeader);
      }

      reveal(unseen(q('.sec')), 'top 92%', el =>
        gsap.fromTo(el, { '--rule': 0 }, { '--rule': 1, duration: 1.1, ease: LINE, paused: true }), 0);

      /* Başlık kendi alt kenarındaki bir maskenin arkasından yükselir: kayma ile alttan
         kırpma aynı oranda ilerlediği için görünen pencere yerinde durur. Metin satırlara
         bölünmüyor; React dil değişince başlığı olduğu gibi günceller. */
      reveal(unseen(q('.h2')), 'top 90%', el => gsap.fromTo(el,
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
      reveal(unseen(q('.check, .service:not(.featured), .step, .faq__item')), 'top 88%', row => gsap.timeline({ paused: true })
        .fromTo(row, { '--rule': 0 }, { '--rule': 1, duration: 0.9, ease: LINE })
        .fromTo(row.children, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7, ease: OUT, stagger: 0.06 }, 0.2), 0.12);

      /* Öne çıkan kart ve son form: çerçeve kenar kenar çizilerek kapanır, sonra zemin
         tonu ve içerik gelir. */
      reveal(unseen(q('.service.featured, .final .form-panel')), 'top 85%', box => gsap.timeline({ paused: true })
        .fromTo(box, { '--frame': 0 }, { '--frame': 1, duration: 1.2, ease: 'power1.inOut' })
        .fromTo(box, { '--tone': 0 }, { '--tone': 1, duration: 0.5, ease: OUT }, 0.8)
        .fromTo(box.children, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7, ease: OUT, stagger: 0.08 }, 0.7), 0.15);

      /* Adımlar: sülfür çizgi kaydırdıkça 01'den 03'e ilerler; çizgi bir adımı bitirince
         numarası mürekkebe döner. */
      const steps = q('.step');
      const stepsBox = root.querySelector<HTMLElement>('.steps');
      if (steps.length && stepsBox) {
        const ink = getComputedStyle(root).getPropertyValue('--ink').trim();
        const progress = gsap.timeline({
          scrollTrigger: { trigger: stepsBox, start: 'top 75%', end: 'bottom 55%', scrub: 0.4 },
        });
        steps.forEach((step, i) => {
          progress
            .fromTo(step, { '--fill': 0 }, { '--fill': 1, ease: 'none', duration: 1 }, i)
            .to(kids([step], '.step__no'), { color: ink, ease: 'none', duration: 0.15 }, i + 0.85);
        });
      }

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

      /* Footer imzası: SITEMENDO maskeden yükselir, sülfür nokta en son düşer. */
      const brand = footer.current?.querySelector<HTMLElement>('.footer__brand');
      const dot = brand?.querySelector('.dot');
      if (brand && dot) {
        reveal(unseen([brand]), 'top 95%', el => gsap.timeline({ paused: true })
          .fromTo(el, { yPercent: 100, clipPath: 'inset(0% 0% 100% 0%)' }, {
            yPercent: 0,
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 0.8,
            ease: 'power4.out',
            clearProps: 'clipPath,transform',
          })
          .fromTo(dot, { y: -18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: 'power2.in' }));
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
        header?.removeEventListener('focusin', showHeader);
        showHeader();
        if (counting && tally) {
          counting = false;
          tally.textContent = total;
        }
      };
    }, scope);

    /* Çakı, hero kaydırılırken biraz geride kalır ve hafifçe döner. Yalnız iki sütunlu
       düzende: tek sütunda altındaki formun üstüne binerdi. */
    mm.add('(prefers-reduced-motion: no-preference) and (min-width: 1000px)', () => {
      gsap.to('.knife', {
        y: 80,
        rotation: -4,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.6 },
      });
    }, scope);

    /* Çakı kaydırınca katlanır: ilk kaydırmayla aletler sapın içine döner, en üste
       dönünce yeniden açılır. Çakı yüksekliğinin yarısı kadar kaydırmada kapanmış olur;
       daha geç bitince masaüstünde son kısmı menünün altında kalıyordu. Açılış animasyonu
       bitmeden kurulmaz; yoksa açılırken kaydıran birinde aletler sapın öbür yanına
       geçerdi. Tek sütunda da çalışır, katlanma çakıyı yerinden oynatmaz. */
    mm.add('(prefers-reduced-motion: no-preference)', (_, contextSafe) => {
      const knife = scope.current?.querySelector<HTMLElement>('.knife');
      if (!knife || !contextSafe) return;
      let alive = true;
      const unfolding = kids([knife], '.knife__orbit > .knife-tool')
        .flatMap(tool => tool.getAnimations())
        .filter(a => (a as CSSAnimation).animationName === 'knife-unfold');
      const fold = contextSafe(() => {
        if (!alive) return;
        gsap.fromTo(knife, { '--fold': 0 }, {
          '--fold': 1,
          ease: 'none',
          scrollTrigger: {
            start: 0,
            end: () => `+=${knife.offsetHeight * 0.5}`,
            scrub: 0.4,
            invalidateOnRefresh: true,
          },
        });
      });
      Promise.allSettled(unfolding.map(a => a.finished)).then(() => fold());
      return () => { alive = false; };
    }, scope);
    return () => mm.revert();
  }, { scope, dependencies: [lang], revertOnUpdate: true });
}

/* Örnek rapordaki kontrol listesi açılınca etiket ve hücre yazıları sırayla gelir.
   Hücrelerin kendisi değil içi: şeffaf hücreler ızgaranın gri zeminini gösteriyordu.
   Kapanınca geri alınır; hareket azaltılmışsa liste anında açılır. */
export function useOpenReveal(scope: RefObject<HTMLElement | null>, open: boolean) {
  useGSAP(() => {
    if (!open) return;
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const root = scope.current;
      if (!root) return;
      gsap.fromTo(kids([root], '.checklist-label, .doc-cell > *'), { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.5, ease: OUT, stagger: 0.03 });
    }, scope);
    return () => mm.revert();
  }, { scope, dependencies: [open], revertOnUpdate: true });
}
