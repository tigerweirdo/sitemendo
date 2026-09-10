import { markCapCenters, markCPath, MARK } from '@/lib/mark';

const C_PATH = markCPath();
const CAPS = markCapCenters();
const CAP_R = MARK.stroke / 2;

type BrandMarkProps = {
  className?: string;
  /** When set, fills the C. Omit to let CSS control fill (knife gradient). */
  fill?: string;
  tiled?: boolean;
};

export function BrandMark({ className, fill, tiled = false }: BrandMarkProps) {
  return (
    <svg className={className} viewBox={`0 0 ${MARK.viewBox} ${MARK.viewBox}`} aria-hidden="true" focusable="false">
      {tiled ? <rect width={MARK.viewBox} height={MARK.viewBox} fill={MARK.ink} /> : null}
      <g fill={fill}>
        <path d={C_PATH} />
        <circle cx={CAPS[0][0]} cy={CAPS[0][1]} r={CAP_R} />
        <circle cx={CAPS[1][0]} cy={CAPS[1][1]} r={CAP_R} />
      </g>
    </svg>
  );
}
