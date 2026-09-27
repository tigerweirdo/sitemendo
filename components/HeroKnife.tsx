'use client';

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';

export type ToolId = 'blade' | 'saw' | 'opener' | 'small' | 'driver' | 'cork';
export type KnifeTag = { label: string; href: string };

/* Uç konumları KnifeArt'taki alet boyu ve açısıyla aynı formülden. Gövde sunucuda
   kaldığı için burada yalnız etiket koordinatları durur. */
const TAGS: { id: ToolId; side: 'left' | 'right'; order: number; x: number; y: number }[] = [
  { id: 'blade', side: 'left', order: 0, x: 142.3487, y: 415.1840 },
  { id: 'saw', side: 'left', order: 1, x: 51.7297, y: 328.0947 },
  { id: 'opener', side: 'left', order: 2, x: 71.5648, y: 211.5616 },
  { id: 'small', side: 'right', order: 3, x: 362.0120, y: 192.2216 },
  { id: 'driver', side: 'right', order: 4, x: 388.5209, y: 298.8357 },
  { id: 'cork', side: 'right', order: 5, x: 318.7608, y: 393.9970 },
];

function paint(root: HTMLElement, id: string | null) {
  root.querySelectorAll<HTMLElement>('[data-tool]').forEach(el => {
    if (id && el.getAttribute('data-tool') === id) el.setAttribute('data-active', '');
    else el.removeAttribute('data-active');
  });
}

export function HeroKnife({ label, tags, onPick, children }: {
  label: string;
  tags?: Record<ToolId, KnifeTag>;
  onPick?: (id: ToolId) => void;
  children: ReactNode;
}) {
  const root = useRef<HTMLElement>(null);

  /* Sahne ekran dışındayken boştaki salınım durur. */
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => el.toggleAttribute('data-offscreen', !entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Vurgu ve tıklama gövdenin üstünden yakalanır; katmanlar React durumunda değil. */
  useEffect(() => {
    const el = root.current;
    if (!el || !tags) return;
    const toolOf = (event: Event) => (event.target as Element | null)?.closest<HTMLElement>('[data-tool]') ?? null;
    const onOver = (event: PointerEvent) => paint(el, toolOf(event)?.getAttribute('data-tool') ?? null);
    const onLeave = () => paint(el, null);
    const onClick = (event: MouseEvent) => {
      const tool = toolOf(event);
      const id = tool?.getAttribute('data-tool') as ToolId | null;
      if (!tool || !id || !onPick) return;
      if (tool.closest('a')) event.preventDefault();
      onPick(id);
    };
    el.addEventListener('pointerover', onOver);
    el.addEventListener('pointerleave', onLeave);
    el.addEventListener('click', onClick);
    return () => {
      el.removeEventListener('pointerover', onOver);
      el.removeEventListener('pointerleave', onLeave);
      el.removeEventListener('click', onClick);
    };
  }, [tags, onPick]);

  /* Eğim ve gölge yalnız imleç gelince iner. Ölçüm sırasında bu paket hiç inmez;
     açılış zaten CSS'te. */
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (!matchMedia('(prefers-reduced-motion: no-preference) and (hover: hover)').matches) return;
    let cleanup = () => {};
    let loading = false;
    const arm = () => {
      if (loading) return;
      loading = true;
      el.removeEventListener('pointerenter', arm);
      import('gsap').then(({ default: gsap }) => {
        const tilt = el.querySelector('.knife__tilt');
        const cast = el.querySelector('.knife__cast');
        if (!tilt || !cast) return;
        const yTo = gsap.quickTo(tilt, 'rotateY', { duration: 0.6, ease: 'power3' });
        const xTo = gsap.quickTo(tilt, 'rotateX', { duration: 0.6, ease: 'power3' });
        gsap.set(cast, { x: 15, y: 22 });
        const castX = gsap.quickTo(cast, 'x', { duration: 0.8, ease: 'power3' });
        const castY = gsap.quickTo(cast, 'y', { duration: 0.8, ease: 'power3' });
        const onMove = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          yTo(px * 20);
          xTo(-py * 12);
          castX(15 - px * 44);
          castY(22 - py * 22);
        };
        const onLeave = () => {
          yTo(0);
          xTo(0);
          castX(15);
          castY(22);
        };
        el.addEventListener('pointermove', onMove);
        el.addEventListener('pointerleave', onLeave);
        cleanup = () => {
          el.removeEventListener('pointermove', onMove);
          el.removeEventListener('pointerleave', onLeave);
        };
      }).catch(() => {});
    };
    el.addEventListener('pointerenter', arm);
    return () => {
      el.removeEventListener('pointerenter', arm);
      cleanup();
    };
  }, []);

  return (
    <figure className="knife" ref={root} role="img" aria-label={label}>
      {children}
      {tags && TAGS.map(tag => (
        <a
          key={tag.id}
          className={`knife-tag knife-tag--${tag.side}`}
          href={tags[tag.id].href}
          tabIndex={-1}
          aria-hidden="true"
          data-tool={tag.id}
          style={{ '--x': tag.x.toFixed(1), '--y': tag.y.toFixed(1), '--i': tag.order } as CSSProperties}
        >{tags[tag.id].label}</a>
      ))}
    </figure>
  );
}
