import spec from './mark.json';

export const MARK = spec;

export type MarkBackground = 'none' | 'ink' | 'paper';

function rotPt(x: number, y: number, deg: number, cx: number, cy: number): [number, number] {
  const a = (deg * Math.PI) / 180;
  const dx = x - cx;
  const dy = y - cy;
  return [cx + dx * Math.cos(a) - dy * Math.sin(a), cy + dx * Math.sin(a) + dy * Math.cos(a)];
}

function fmt(n: number) {
  return n.toFixed(3);
}

export function markSweep() {
  const circ = 2 * Math.PI * MARK.r;
  return ((circ - MARK.gap) / circ) * 2 * Math.PI;
}

export function markDasharray() {
  const circ = 2 * Math.PI * MARK.r;
  return `${(circ - MARK.gap).toFixed(3)} ${MARK.gap.toFixed(3)}`;
}

/** Filled C (annular sector). Rotation is baked in so OG/Satori needs no transform. */
export function markCPath(stroke = MARK.stroke) {
  const { cx, cy, r, rot } = MARK;
  const rO = r + stroke / 2;
  const rI = Math.max(0.4, r - stroke / 2);
  const sweep = markSweep();
  const large = sweep > Math.PI ? 1 : 0;
  const rp = (radius: number, t: number) => rotPt(cx + radius * Math.cos(t), cy + radius * Math.sin(t), rot, cx, cy);
  const [ox0, oy0] = rp(rO, 0);
  const [ox1, oy1] = rp(rO, sweep);
  const [ix0, iy0] = rp(rI, 0);
  const [ix1, iy1] = rp(rI, sweep);
  return `M ${fmt(ox0)} ${fmt(oy0)} A ${fmt(rO)} ${fmt(rO)} 0 ${large} 1 ${fmt(ox1)} ${fmt(oy1)} L ${fmt(ix1)} ${fmt(iy1)} A ${fmt(rI)} ${fmt(rI)} 0 ${large} 0 ${fmt(ix0)} ${fmt(iy0)} Z`;
}

export function markCapCenters(): [number, number][] {
  const { cx, cy, r, rot } = MARK;
  const sweep = markSweep();
  return [
    rotPt(cx + r, cy, rot, cx, cy),
    rotPt(cx + r * Math.cos(sweep), cy + r * Math.sin(sweep), rot, cx, cy),
  ];
}

function glyphLayers(stroke: number, fill: string) {
  const path = markCPath(stroke);
  const caps = markCapCenters();
  const capR = stroke / 2;
  return `  <path fill="${fill}" d="${path}"/>
  <circle cx="${fmt(caps[0][0])}" cy="${fmt(caps[0][1])}" r="${fmt(capR)}" fill="${fill}"/>
  <circle cx="${fmt(caps[1][0])}" cy="${fmt(caps[1][1])}" r="${fmt(capR)}" fill="${fill}"/>`;
}

/** Tab/Vercel mark: transparent canvas, ink outline, sulfur C. Apple may pass a paper tile. */
export function markIconSvg(background: MarkBackground = 'none') {
  const bgFill = background === 'ink' ? MARK.ink : background === 'paper' ? MARK.paper : null;
  const bg = bgFill
    ? `  <rect width="${MARK.viewBox}" height="${MARK.viewBox}" fill="${bgFill}"/>\n`
    : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${MARK.viewBox} ${MARK.viewBox}" role="img" aria-label="Sitemendo">
${bg}${glyphLayers(MARK.stroke + MARK.outline, MARK.ink)}
${glyphLayers(MARK.stroke, MARK.sulfur)}
</svg>
`;
}
