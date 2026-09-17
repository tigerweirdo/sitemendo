import type { Metadata } from 'next';
import { content } from '@/lib/content';
import { withLangParam } from '@/lib/lang';
import { resolveRequestLang } from '@/lib/requestLang';

export async function generateMetadata(): Promise<Metadata> {
  const lang = await resolveRequestLang();
  return { title: `${content[lang].notFound.title} — Sitemendo`, robots: { index: false, follow: true } };
}

/* Bulunamayan adres: isteğin dilinde, ana sayfaya dönüş bağlantısıyla. */
export default async function NotFound() {
  const lang = await resolveRequestLang();
  const t = content[lang].notFound;
  const home = withLangParam('/', lang);
  return (
    <div className="legal-page">
      <header className="nav">
        <div className="wrap nav__in">
          <a className="brand" href={home}>SITEMENDO<b>.</b></a>
        </div>
      </header>
      <main id="main" className="legal">
        <div className="wrap">
          <p className="legal__updated">404</p>
          <h1 className="h1 legal__title">{t.title}</h1>
          <p className="lead">{t.text}</p>
          <a className="btn legal-back" href={home}>{t.home}</a>
        </div>
      </main>
    </div>
  );
}
