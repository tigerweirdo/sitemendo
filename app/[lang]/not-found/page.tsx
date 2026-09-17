import type { Metadata } from 'next';
import { content } from '@/lib/content';
import { resolveLang, withLangParam } from '@/lib/lang';

type PageProps = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const lang = resolveLang((await params).lang);
  return { title: `${content[lang].notFound.title} — Sitemendo`, robots: { index: false, follow: true } };
}

/* Bulunamayan adres: Worker bu sayfayı isteğin dilinde, 404 durumuyla döndürür. */
export default async function NotFound({ params }: PageProps) {
  const lang = resolveLang((await params).lang);
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
