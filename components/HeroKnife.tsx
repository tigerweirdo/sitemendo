'use client';

import { useRef, type CSSProperties, type ReactNode } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

/* 440×440 birimlik sabit sahne; menteşe (220, 238), sap 66×212 ve 48'den başlar.
   Konum ve hareket globals.css'te (.knife-*) duruyor; buradaki sayılar derinlik
   ve ışıkla ilgili. Her alet 44 birim genişliğinde çizilir, dönme ekseni (22, h - 16);
   kapalıyken (rotation 0) sapın içinde kaldığı için açılış animasyonu aletleri
   saptan çıkarıyor gibi okunuyor. Kalınlık, aynı siluetin z ekseninde üst üste
   yığılmasıyla elde ediliyor. */
const TOOL_W = 44;

const HANDLE_DEPTH = 32;
const HANDLE_LAYERS = 12;

/* Altı aletin z bandı sapın 32 birimlik derinliğine sığar ve birbirine değmez. */
const TOOL_LAYERS = 6;
const TOOL_STEP = 0.88;

/* Sahnedeki tek ışık kaynağı sol üstte. Hem sapın parlaması hem de her aletin
   çelik degradesi bu yöne göre hesaplanıyor; aksi hâlde her alet kendi yönünden
   aydınlanmış gibi durup nesne tek parça okunmuyor. */
const LIGHT_X = -0.64;
const LIGHT_Y = -0.77;

const bodyStyle: CSSProperties = {
  fill: 'var(--kt-fill)',
  stroke: 'var(--kt-edge)',
  strokeWidth: 1.3,
  strokeLinejoin: 'round',
};
const aoStyle: CSSProperties = { fill: 'var(--kt-ao)', stroke: 'none' };
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
  strokeWidth: 1,
  strokeLinecap: 'round',
};
const rodUnderStyle: CSSProperties = {
  fill: 'none',
  stroke: 'var(--kt-edge)',
  strokeWidth: 8.4,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};
const rodStyle: CSSProperties = {
  fill: 'none',
  stroke: 'var(--kt-fill)',
  strokeWidth: 6.2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};
const rodBackUnderStyle: CSSProperties = {
  fill: 'none',
  stroke: 'var(--kt-edge)',
  strokeWidth: 7.2,
  strokeLinecap: 'round',
};
const rodBackStyle: CSSProperties = {
  fill: 'none',
  stroke: 'var(--kt-rod-back)',
  strokeWidth: 5.8,
  strokeLinecap: 'round',
};

/* Menteşe göbeği: (9, y) noktasından alttan dolanıp (35, y) noktasına çıkar. */
function tang(y: number) {
  return `M 9,${y} A 13 13 0 0 0 35,${y}`;
}

/* Tirbuşon sarmalı: her yarım tur ayrı bir eğri ve dönüş noktalarında bölünmüş.
   Böylece kalın stroke en kıvrık yerde kendi üzerine binmiyor (binince dış kenar
   tırtıklanıyor). Tek numaralı yarımlar arkada kalır; önce onlar, sonra öndekiler
   çizilerek sarmalın derinliği okunur. */
function helixSegments(yStart: number, yEnd: number, halfTurns: number, amp: number, cx = 22) {
  const step = (yEnd - yStart) / halfTurns;
  const front: string[] = [];
  const back: string[] = [];
  for (let i = 0; i < halfTurns; i++) {
    const isFront = i % 2 === 0;
    /* Öndeki yarımlar birazcık daha geniş: uçları arkadakilerin bittiği yeri
       örtüyor, böylece dönüş noktalarında ek yeri görünmüyor. */
    const a = isFront ? amp + 0.8 : amp;
    const y0 = yStart + step * i;
    const y1 = y0 + step;
    const from = cx + (isFront ? -a : a);
    const to = cx + (isFront ? a : -a);
    const d = `M ${from.toFixed(1)},${y0.toFixed(1)}`
      + ` C ${from.toFixed(1)},${(y0 + step / 3).toFixed(1)}`
      + ` ${to.toFixed(1)},${(y1 - step / 3).toFixed(1)}`
      + ` ${to.toFixed(1)},${y1.toFixed(1)}`;
    (isFront ? front : back).push(d);
  }
  return { front, back };
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

/* Çelik parlaması aletin eni boyunca uzanır; ışığa dönük yüz hangisiyse parlak
   bant o tarafa kayar. Aletin dünyadaki açısı bu kaymayı belirliyor. */
function steelStops(open: number) {
  const r = (open * Math.PI) / 180;
  const facing = Math.cos(r) * LIGHT_X + Math.sin(r) * LIGHT_Y;
  const shift = 0.22 * facing;
  const at = (v: number) => Math.min(0.93, Math.max(0.07, v + shift));
  return [
    { at: 0, color: '#83817a' },
    { at: at(0.26), color: '#f8f6ee' },
    { at: at(0.56), color: '#c3c1b7' },
    { at: at(0.82), color: '#e8e6dd' },
    { at: 1, color: '#83817a' },
  ];
}

const CORK = helixSegments(142, 16, 7, 11.5);
/* Saptan çıkan çeyrek tur ve uçtaki kıvrım. */
const CORK_FRONT = ['M 22,150 C 15,150 9.7,146 9.7,142', ...CORK.front, 'M 34.3,16 C 36.5,12 35,8 31,7'];

type Tool = {
  id: string;
  h: number;
  open: number;
  z: number;
  /* Açılış içeriden dışarıya sırayla: ortadaki aletler önce, uçtakiler en son. */
  delay: number;
  breath: number;
  shape: ReactNode;
};

const BLADE = `${tang(172)} C 36,140 36,80 33,44 C 31,24 29,12 27,6`
  + ` C 22,26 15,58 11,102 C 10,124 10,142 10,152 L 9,172 Z`;
const SMALL = `${tang(126)} C 36,104 36,58 33,34 C 31,20 29,11 27,6`
  + ` C 22,22 15,46 11,76 C 10,94 10,106 10,112 L 9,126 Z`;
const SAW = `${tang(170)} L 33,140 L 33,24 Q 33,10 24,9 L 21,9 Q 12,10 12,24`
  + `${teeth(24, 158, 12, 12, 6)} L 9,170 Z`;
const OPENER = `${tang(130)} L 33,58 C 33,42 31,30 29,20 L 30,6 L 21,6 L 21,18`
  + ` C 21,28 13,28 13,18 L 13,2 C 8,2 5,7 7,13 C 8,17 11,20 12,30 L 12,52 L 9,130 Z`;
const DRIVER = `${tang(156)} C 31,130 29,96 28,62 C 27,44 28,30 29,20 L 31,6 L 13,6`
  + ` L 15,20 C 16,30 17,44 16,62 C 15,96 13,130 9,156 Z`;
const CORK_TANG = `${tang(162)} C 34,154 32,148 30,144 C 27,140 17,140 14,144 C 12,148 10,154 9,162 Z`;

const TOOLS: Tool[] = [
  {
    id: 'blade',
    h: 188,
    open: -152,
    z: -11.5,
    delay: 0.34,
    breath: 0.8,
    shape: (
      <>
        <path style={bodyStyle} d={BLADE}/>
        <path style={detailStyle} d="M 30,118 A 9 9 0 0 0 30,140"/>
        <path style={bevelStyle} d="M 26,14 C 21,36 14,76 12,118 C 11,140 11,157 11,168"/>
        <circle style={rivetStyle} cx="22" cy="172" r="3.4"/>
        <path style={aoStyle} d={BLADE}/>
      </>
    ),
  },
  {
    id: 'saw',
    h: 186,
    open: -114,
    z: -6.9,
    delay: 0.26,
    breath: -0.8,
    shape: (
      <>
        <path style={bodyStyle} d={SAW}/>
        <circle style={rivetStyle} cx="22" cy="170" r="3.4"/>
        <path style={aoStyle} d={SAW}/>
      </>
    ),
  },
  {
    id: 'opener',
    h: 146,
    open: -76,
    z: -2.3,
    delay: 0.18,
    breath: 0.8,
    shape: (
      <>
        <path style={bodyStyle} d={OPENER}/>
        <circle style={rivetStyle} cx="22" cy="130" r="3.4"/>
        <path style={aoStyle} d={OPENER}/>
      </>
    ),
  },
  {
    id: 'small',
    h: 142,
    open: 76,
    z: 2.3,
    delay: 0.18,
    breath: -0.8,
    shape: (
      <>
        <path style={bodyStyle} d={SMALL}/>
        <path style={detailStyle} d="M 30,84 A 8 8 0 0 0 30,102"/>
        <path style={bevelStyle} d="M 26,14 C 21,30 14,58 12,88 C 11,104 11,116 11,122"/>
        <circle style={rivetStyle} cx="22" cy="126" r="3.4"/>
        <path style={aoStyle} d={SMALL}/>
      </>
    ),
  },
  {
    id: 'driver',
    h: 172,
    open: 114,
    z: 6.9,
    delay: 0.26,
    breath: 0.8,
    shape: (
      <>
        <path style={bodyStyle} d={DRIVER}/>
        <circle style={rivetStyle} cx="22" cy="156" r="3.4"/>
        <path style={aoStyle} d={DRIVER}/>
      </>
    ),
  },
  {
    id: 'cork',
    h: 178,
    open: 152,
    z: 11.5,
    delay: 0.34,
    breath: -0.8,
    shape: (
      <>
        <path style={bodyStyle} d={CORK_TANG}/>
        {CORK.back.map((d, i) => <path key={`bu${i}`} style={rodBackUnderStyle} d={d}/>)}
        {CORK.back.map((d, i) => <path key={`b${i}`} style={rodBackStyle} d={d}/>)}
        {CORK_FRONT.map((d, i) => <path key={`fu${i}`} style={rodUnderStyle} d={d}/>)}
        {CORK_FRONT.map((d, i) => <path key={`f${i}`} style={rodStyle} d={d}/>)}
        <circle style={rivetStyle} cx="22" cy="162" r="3.4"/>
        <path style={aoStyle} d={CORK_TANG}/>
      </>
    ),
  },
];

const handleLayers = Array.from({ length: HANDLE_LAYERS }, (_, i) => ({
  dz: -HANDLE_DEPTH / 2 + (i * HANDLE_DEPTH) / (HANDLE_LAYERS - 1),
  front: i === HANDLE_LAYERS - 1,
  back: i === 0,
}));

const toolLayers = Array.from({ length: TOOL_LAYERS }, (_, i) => ({
  dz: (i - (TOOL_LAYERS - 1) / 2) * TOOL_STEP,
  face: i === TOOL_LAYERS - 1,
  back: i === 0,
}));

export function HeroKnife({ label }: { label: string }) {
  const root = useRef<HTMLDivElement>(null);

  /* Giriş ve boştaki salınım tamamen CSS'te: sunucudan gelen ilk boyama da
     animasyonu oynatır, GSAP yüklenemese bile alet açık kalır ve hidrasyonda
     "açık → kapalı → açık" sıçraması olmaz. GSAP yalnız imleç parallax'ını sürüyor. */
  useGSAP((_, contextSafe) => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference) and (hover: hover)', () => {
      const el = root.current;
      if (!el || !contextSafe) return;

      const yTo = gsap.quickTo('.knife__tilt', 'rotateY', { duration: 0.6, ease: 'power3' });
      const xTo = gsap.quickTo('.knife__tilt', 'rotateX', { duration: 0.6, ease: 'power3' });
      const shadowX = gsap.quickTo('.knife__shadows', 'x', { duration: 0.7, ease: 'power3' });
      const shadowY = gsap.quickTo('.knife__shadows', 'y', { duration: 0.7, ease: 'power3' });

      const onMove = contextSafe((e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        yTo(px * 20);
        xTo(-py * 12);
        shadowX(-px * 14);
        shadowY(-py * 6);
      });
      const onLeave = contextSafe(() => {
        yTo(0);
        xTo(0);
        shadowX(0);
        shadowY(0);
      });

      el.addEventListener('pointermove', onMove);
      el.addEventListener('pointerleave', onLeave);
      return () => {
        el.removeEventListener('pointermove', onMove);
        el.removeEventListener('pointerleave', onLeave);
      };
    }, root);
    return () => mm.revert();
  }, { scope: root });

  return (
    <figure className="knife" ref={root} role="img" aria-label={label}>
      <svg className="knife-defs" width="0" height="0" aria-hidden="true" focusable="false">
        <defs>
          {TOOLS.map((t) => (
            <linearGradient key={`g-${t.id}`} id={`kt-steel-${t.id}`} x1="0" y1="0" x2="1" y2="0.06">
              {steelStops(t.open).map((s, i) => (
                <stop key={i} offset={s.at.toFixed(3)} stopColor={s.color}/>
              ))}
            </linearGradient>
          ))}
          {TOOLS.map((t) => (
            <linearGradient
              key={`ao-${t.id}`}
              id={`kt-ao-${t.id}`}
              gradientUnits="userSpaceOnUse"
              x1="0" y1={t.h - 60} x2="0" y2={t.h - 4}
            >
              <stop offset="0" stopColor="#0a0a09" stopOpacity="0"/>
              <stop offset="0.6" stopColor="#0a0a09" stopOpacity="0.08"/>
              <stop offset="1" stopColor="#0a0a09" stopOpacity="0.22"/>
            </linearGradient>
          ))}
          {TOOLS.map((t) => (
            <g key={t.id} id={`kt-${t.id}`}>{t.shape}</g>
          ))}
        </defs>
      </svg>

      <div className="knife__fit">
        <div className="knife__shadows" aria-hidden="true">
          <div className="knife__shadow knife__shadow--fan"/>
          <div className="knife__shadow knife__shadow--core"/>
        </div>
        <div className="knife__stage">
          <div className="knife__tilt">
            <div className="knife__drift">
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

                {/* Aletlerin sapa gömüldüğü yerdeki temas gölgesi. */}
                <div className="knife-handle__foot" aria-hidden="true"/>

                {TOOLS.map((t) => (
                  <div
                    key={t.id}
                    className="knife-tool"
                    aria-hidden="true"
                    style={{
                      '--h': `${t.h}px`,
                      '--open': `${t.open}deg`,
                      '--delay': `${t.delay}s`,
                      '--breath': `${t.breath}deg`,
                      '--kt-face-fill': `url(#kt-steel-${t.id})`,
                      '--kt-face-ao': `url(#kt-ao-${t.id})`,
                    } as CSSProperties}
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
      </div>
    </figure>
  );
}
