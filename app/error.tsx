'use client';

import { CONTACT_EMAIL } from '@/lib/company';
import { content } from '@/lib/content';
import { parseLang, withLangParam } from '@/lib/lang';

/* Beklenmeyen hata: sayfanın dilinde, yeniden deneme ve e-posta yoluyla. */
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const lang = (typeof document !== 'undefined' && parseLang(document.documentElement.lang)) || 'tr';
  const t = content[lang].errorPage;
  return (
    <main id="main" className="legal">
      <div className="wrap">
        <h1 className="h1 legal__title">{t.title}</h1>
        <p className="lead">{t.text} <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
        <button className="btn legal-back" type="button" onClick={reset}>{t.retry}</button>
        <p className="lead"><a href={withLangParam('/', lang)}>{content[lang].legal.back}</a></p>
      </div>
    </main>
  );
}
