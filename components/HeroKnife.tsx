'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const OPEN = [154, -138, 116, -96] as const;

export function HeroKnife({ label }: { label: string }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP((_, contextSafe) => {
    const mm = gsap.matchMedia();
    mm.add(
      {
        reduce: '(prefers-reduced-motion: reduce)',
        motion: '(prefers-reduced-motion: no-preference)',
      },
      (mctx) => {
        const reduce = Boolean(mctx.conditions?.reduce);
        const orbit = '.knife__orbit';
        const tilt = '.knife__tilt';
        const tools = gsap.utils.toArray<HTMLElement>('.knife-tool');
        const shadow = '.knife__shadow';

        if (reduce) {
          gsap.set(tools, { rotation: (i: number) => OPEN[i] });
          gsap.set(orbit, { rotateX: 28, rotateY: -36 });
          return;
        }

        gsap.set(tools, { rotation: 6 });
        gsap.set(orbit, { rotateX: 38, rotateY: -58, rotateZ: -8, y: 20 });
        gsap.set(shadow, { scale: 0.72, autoAlpha: 0.45 });

        const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
        intro
          .to(orbit, { rotateX: 28, rotateY: -36, rotateZ: 0, y: 0, duration: 1.25, ease: 'power2.out' }, 0)
          .to(shadow, { scale: 1, autoAlpha: 1, duration: 1.25, ease: 'power2.out' }, 0)
          .to(tools, {
            rotation: (i: number) => OPEN[i],
            duration: 0.95,
            stagger: 0.12,
            ease: 'back.out(1.4)',
          }, 0.18);

        const idle = gsap.timeline({ repeat: -1, yoyo: true, delay: 1.8 });
        idle.to(orbit, { rotateY: -18, rotateX: 22, y: -8, duration: 3.8, ease: 'sine.inOut' }, 0);
        idle.to(shadow, { scale: 0.92, autoAlpha: 0.85, duration: 3.6, ease: 'sine.inOut' }, 0);

        const yTo = gsap.quickTo(tilt, 'rotateY', { duration: 0.55, ease: 'power3' });
        const xTo = gsap.quickTo(tilt, 'rotateX', { duration: 0.55, ease: 'power3' });
        const el = root.current;
        if (!el || !contextSafe) return;

        const onMove = contextSafe((e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          yTo(px * 16);
          xTo(-py * 10);
        });
        const onLeave = contextSafe(() => {
          yTo(0);
          xTo(0);
        });

        el.addEventListener('pointermove', onMove);
        el.addEventListener('pointerleave', onLeave);
        return () => {
          el.removeEventListener('pointermove', onMove);
          el.removeEventListener('pointerleave', onLeave);
        };
      },
      root,
    );
    return () => mm.revert();
  }, { scope: root });

  return (
    <figure className="knife" ref={root} aria-label={label}>
      <div className="knife__shadow" aria-hidden="true"/>
      <div className="knife__stage">
        <div className="knife__tilt">
          <div className="knife__orbit">
            <div className="knife-tool" aria-hidden="true">
              <div className="knife-slab knife-slab--blade knife-tool__z--front">
                <span className="knife-slab__face knife-slab__face--front"/>
                <span className="knife-slab__face knife-slab__face--back"/>
                <span className="knife-slab__face knife-slab__face--east"/>
                <span className="knife-slab__face knife-slab__face--west"/>
              </div>
            </div>
            <div className="knife-tool" aria-hidden="true">
              <div className="knife-slab knife-slab--short knife-tool__z--back">
                <span className="knife-slab__face knife-slab__face--front"/>
                <span className="knife-slab__face knife-slab__face--back"/>
                <span className="knife-slab__face knife-slab__face--east"/>
                <span className="knife-slab__face knife-slab__face--west"/>
              </div>
            </div>
            <div className="knife-tool" aria-hidden="true">
              <div className="knife-slab knife-slab--saw knife-tool__z--mid">
                <span className="knife-slab__face knife-slab__face--front"/>
                <span className="knife-slab__face knife-slab__face--back"/>
                <span className="knife-slab__face knife-slab__face--east"/>
                <span className="knife-slab__face knife-slab__face--west"/>
              </div>
            </div>
            <div className="knife-tool" aria-hidden="true">
              <div className="knife-slab knife-slab--driver knife-tool__z--back">
                <span className="knife-slab__face knife-slab__face--front"/>
                <span className="knife-slab__face knife-slab__face--back"/>
                <span className="knife-slab__face knife-slab__face--east"/>
                <span className="knife-slab__face knife-slab__face--west"/>
              </div>
            </div>
            <div className="knife-handle" aria-hidden="true">
              <span className="knife-handle__face knife-handle__face--west"/>
              <span className="knife-handle__face knife-handle__face--east"/>
              <span className="knife-handle__face knife-handle__face--north"/>
              <span className="knife-handle__face knife-handle__face--south"/>
              <span className="knife-handle__face knife-handle__face--back"/>
              <span className="knife-handle__face knife-handle__face--front">
                <i className="knife-handle__mark"/>
              </span>
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}
