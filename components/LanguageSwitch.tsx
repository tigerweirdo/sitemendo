'use client';

import { LANGS } from '@/lib/lang';
import type { Lang } from '@/lib/content';

export function LanguageSwitch({
  lang,
  setLang,
  onPick,
  label,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
  onPick?: () => void;
  label: string;
}) {
  return (
    <div className="langs" role="group" aria-label={label}>
      {LANGS.map((code, i) => (
        <span key={code} className="langs__item">
          {i > 0 && <i>/</i>}
          <button
            type="button"
            aria-pressed={lang === code}
            onClick={() => {
              setLang(code);
              onPick?.();
            }}
          >
            {code.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}
