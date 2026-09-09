'use client';

import { useRef, type CSSProperties, type ReactNode } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

/* 440×440 birimlik sabit sahne; menteşe (220, 250), sap 66×212 ve 60'tan başlar.
   Konumlar globals.css'te (.knife-*) duruyor; buradaki sayılar yalnızca derinlikle ilgili.
   Her alet 44 birim genişliğinde çizilir, dönme ekseni (22, h - 16); rotation 0 iken
   tamamen sapın içinde kalır, bu yüzden açılış animasyonu aletleri saptan çıkarıyor gibi görünür.
   Kalınlık, aynı siluetin z ekseninde üst üste yığılmasıyla elde ediliyor. */
const TOOL_W = 44;

const HANDLE_DEPTH = 32;
const HANDLE_LAYERS = 12;

/* Altı aletin z bandı sapın 32 birimlik derinliğine sığar ve birbirine değmez. */
const TOOL_LAYERS = 6;
const TOOL_STEP = 0.88;

const bodyStyle: CSSProperties = {
  fill: 'var(--kt-fill)',
  stroke: 'var(--kt-edge)',
  strokeWidth: 1.3,
  strokeLinejoin: 'round',
};
const rivetStyle: CSSProperties = { fill: 'var(--kt-rivet)', stroke: 'none' };
const detailStyle: CSSProperties = {
  fill: 'none',
  stroke: 'var(--kt-detail)',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
};
const bevelStyle: CSSProperties = {
  fill: 'none',
  stroke: 'var(--kt-bevel)',
  strokeWidth: 1.2,
  strokeLinecap: 'round',
};
const rodUnderStyle: CSSProperties = {
  fill: 'none',
  stroke: 'var(--kt-edge)',
  strokeWidth: 8.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};
const rodStyle: CSSProperties = {
  fill: 'none',
  stroke: 'var(--kt-fill)',
  strokeWidth: 6.4,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

/* Menteşe göbeği: (9, y) noktasından alttan dolanıp (35, y) noktasına çıkar. */
function tang(y: number) {
  return `M 9,${y} A 13 13 0 0 0 35,${y}`;
}

/* Tirbuşon sarmalı: gerçek bir helisin yandan izdüşümü. */
function helix(yStart: number, yEnd: number, turns: number, amp: number, cx = 22) {
  const steps = Math.round(turns * 26);
  let d = '';
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = cx + amp * Math.sin(t * turns * Math.PI * 2);
    const y = yStart + (yEnd - yStart) * t;
    d += `${i === 0 ? 'M ' : ' L '}${x.toFixed(1)},${y.toFixed(1)}`;
  }
  return d;
}

/* Testere dişleri: sol kenarda yukarıdan aşağıya zikzak. */
function teeth(from: number, to: number, count: number, inner: number, outer: number) {
  const step = (to - from) / count;
  let d = '';
  for (let i = 0; i < count; i++) {
    const y = from + step * i;
    d += ` L ${outer},${(y + step * 0.55).toFixed(1)} L ${inner},${(y + step).toFixed(1)}`;
  }
  return d;
}

type Tool = {
  id: string;
  h: number;
  open: number;
  z: number;
  shape: ReactNode;
};

const CORK_HELIX = helix(142, 30, 4.5, 12);

const TOOLS: Tool[] = [
  {
    id: 'blade',
    h: 188,
    open: -152,
    z: -11.5,
    shape: (
      <>
        <path style={bodyStyle} d={`${tang(172)} C 36,140 36,80 33,44 C 31,24 29,12 27,6 C 22,26 15,58 11,102 C 9,126 9,150 9,172 Z`}/>
        <path style={detailStyle} d="M 31,42 A 8 8 0 0 0 31,62"/>
        <path style={bevelStyle} d="M 26,14 C 21,36 14,76 12,118 C 11,140 11,157 11,168"/>
        <circle style={rivetStyle} cx="22" cy="172" r="3.4"/>
      </>
    ),
  },
  {
    id: 'saw',
    h: 186,
    open: -114,
    z: -6.9,
    shape: (
      <>
        <path
          style={bodyStyle}
          d={`${tang(170)} L 33,140 L 33,24 Q 33,10 24,9 L 21,9 Q 12,10 12,24${teeth(24, 158, 12, 12, 6)} L 9,170 Z`}
        />
        <circle style={rivetStyle} cx="22" cy="170" r="3.4"/>
      </>
    ),
  },
  {
    id: 'opener',
    h: 146,
    open: -76,
    z: -2.3,
    shape: (
      <>
        <path
          style={bodyStyle}
          d={`${tang(130)} L 33,58 C 33,40 31,26 29,16 C 30,9 34,3 28,2 C 22,2 20,9 20,17 C 20,27 12,27 12,17 L 12,5 L 6,7 C 7,22 10,34 12,52 L 9,130 Z`}
        />
        <circle style={rivetStyle} cx="22" cy="130" r="3.4"/>
      </>
    ),
  },
  {
    id: 'small',
    h: 142,
    open: 76,
    z: 2.3,
    shape: (
      <>
        <path style={bodyStyle} d={`${tang(126)} C 36,104 36,58 33,34 C 31,20 29,11 27,6 C 22,22 15,46 11,76 C 9,94 9,110 9,126 Z`}/>
        <path style={detailStyle} d="M 31,38 A 7 7 0 0 0 31,54"/>
        <path style={bevelStyle} d="M 26,14 C 21,30 14,58 12,88 C 11,104 11,116 11,122"/>
        <circle style={rivetStyle} cx="22" cy="126" r="3.4"/>
      </>
    ),
  },
  {
    id: 'driver',
    h: 172,
    open: 114,
    z: 6.9,
    shape: (
      <>
        <path
          style={bodyStyle}
          d={`${tang(156)} L 30,116 L 28,60 L 29,22 L 31,7 L 13,7 L 15,22 L 16,60 L 14,116 L 9,156 Z`}
        />
        <circle style={rivetStyle} cx="22" cy="156" r="3.4"/>
      </>
    ),
  },
  {
    id: 'cork',
    h: 178,
    open: 152,
    z: 11.5,
    shape: (
      <>
        <path style={bodyStyle} d={`${tang(162)} L 31,146 C 29,137 15,137 13,146 Z`}/>
        <path style={rodUnderStyle} d={CORK_HELIX}/>
        <path style={rodStyle} d={CORK_HELIX}/>
        <circle style={rivetStyle} cx="22" cy="162" r="3.4"/>
      </>
    ),
  },
];

const OPEN = TOOLS.map((t) => t.open);

const handleLayers = Array.from({ length: HANDLE_LAYERS }, (_, i) => {
  const dz = -HANDLE_DEPTH / 2 + (i * HANDLE_DEPTH) / (HANDLE_LAYERS - 1);
  const front = i === HANDLE_LAYERS - 1;
  const back = i === 0;
  return { dz, front, back };
});

const toolLayers = Array.from({ length: TOOL_LAYERS }, (_, i) => ({
  dz: (i - (TOOL_LAYERS - 1) / 2) * TOOL_STEP,
  face: i === TOOL_LAYERS - 1,
  back: i === 0,
}));

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
        const shadow = '.knife__shadow';
        const tools = gsap.utils.toArray<HTMLElement>('.knife-tool');

        if (reduce) {
          gsap.set(tools, { rotation: (i: number) => OPEN[i] });
          gsap.set(orbit, { rotateX: 9, rotateY: -14, rotateZ: -4 });
          return;
        }

        gsap.set(tools, { rotation: 0 });
        gsap.set(orbit, { rotateX: 19, rotateY: -34, rotateZ: -10, y: 16 });
        gsap.set(shadow, { scale: 0.68, autoAlpha: 0.28 });

        const intro = gsap.timeline();
        intro
          .to(orbit, { rotateX: 9, rotateY: -14, rotateZ: -4, y: 0, duration: 1.4, ease: 'power2.out' }, 0)
          .to(shadow, { scale: 1, autoAlpha: 1, duration: 1.4, ease: 'power2.out' }, 0)
          .to(tools, {
            rotation: (i: number) => OPEN[i],
            duration: 1.05,
            stagger: 0.085,
            ease: 'back.out(1.15)',
          }, 0.3);

        const idle = gsap.timeline({ repeat: -1, yoyo: true, delay: 2.4 });
        idle.to(orbit, { rotateY: -3, rotateX: 12.5, duration: 5.2, ease: 'sine.inOut' }, 0);
        idle.to(shadow, { scale: 0.93, autoAlpha: 0.8, duration: 5.2, ease: 'sine.inOut' }, 0);

        const el = root.current;
        if (!el || !contextSafe) return;

        const yTo = gsap.quickTo(tilt, 'rotateY', { duration: 0.6, ease: 'power3' });
        const xTo = gsap.quickTo(tilt, 'rotateX', { duration: 0.6, ease: 'power3' });

        const onMove = contextSafe((e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          yTo(((e.clientX - r.left) / r.width - 0.5) * 20);
          xTo(-((e.clientY - r.top) / r.height - 0.5) * 12);
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
    <figure className="knife" ref={root} role="img" aria-label={label}>
      <svg className="knife-defs" width="0" height="0" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="kt-steel" x1="0" y1="0" x2="1" y2="0.12">
            <stop offset="0" stopColor="#8e8c85"/>
            <stop offset="0.24" stopColor="#f6f4ec"/>
            <stop offset="0.55" stopColor="#cfcdc3"/>
            <stop offset="0.82" stopColor="#e6e4db"/>
            <stop offset="1" stopColor="#8a8881"/>
          </linearGradient>
          {TOOLS.map((t) => (
            <g key={t.id} id={`kt-${t.id}`}>{t.shape}</g>
          ))}
        </defs>
      </svg>

      <div className="knife__fit">
        <div className="knife__shadow" aria-hidden="true"/>
        <div className="knife__stage">
          <div className="knife__tilt">
            <div className="knife__orbit">
              <div className="knife-handle" aria-hidden="true">
                {handleLayers.map((l, i) => (
                  <div
                    key={i}
                    className={
                      'knife-handle__layer'
                      + (l.front ? ' knife-handle__layer--scale knife-handle__layer--front' : '')
                      + (l.back ? ' knife-handle__layer--scale knife-handle__layer--back' : '')
                    }
                    style={{ '--dz': `${l.dz.toFixed(2)}px` } as CSSProperties}
                  >
                    {l.front ? <span className="knife-handle__cross"/> : null}
                  </div>
                ))}
              </div>

              {TOOLS.map((t) => (
                <div
                  key={t.id}
                  className="knife-tool"
                  aria-hidden="true"
                  style={{ '--h': `${t.h}px` } as CSSProperties}
                >
                  <div className="knife-tool__stack" style={{ '--z': `${t.z}px` } as CSSProperties}>
                    {toolLayers.map((l, i) => (
                      <div
                        key={i}
                        className={
                          'knife-tool__layer'
                          + (l.face ? ' knife-tool__layer--face' : '')
                          + (l.back ? ' knife-tool__layer--back' : '')
                        }
                        style={{ '--dz': `${l.dz.toFixed(2)}px` } as CSSProperties}
                      >
                        <svg viewBox={`0 0 ${TOOL_W} ${t.h}`} aria-hidden="true" focusable="false">
                          <use href={`#kt-${t.id}`}/>
                        </svg>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}
