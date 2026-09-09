'use client';

import { useLayoutEffect } from 'react';
import { content, type Lang } from './content';

export function useLangDocument(
  lang: Lang,
  title?: string,
  description?: string,
) {
  useLayoutEffect(() => {
    const m = content[lang].meta;
    document.title = title ?? m.title;
    document.documentElement.lang = lang;
    const desc = description ?? m.description;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', desc);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title ?? m.ogTitle);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description ?? m.ogDescription);
  }, [lang, title, description]);
}
