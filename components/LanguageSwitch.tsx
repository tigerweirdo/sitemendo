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
      {LANGS.map(code => (
        <a
          key={code}
          href={`?lang=${code}`}
          hrefLang={code}
          aria-current={lang === code ? 'true' : undefined}
          onClick={event => {
            event.preventDefault();
            setLang(code);
            onPick?.();
          }}
        >
          {code.toUpperCase()}
        </a>
      ))}
    </div>
  );
}
