import { Blocks } from '@/components/guide/Blocks';
import { GuideFooter, GuideHeader } from '@/components/guide/GuideShell';
import { content } from '@/lib/content';
import { getGuide } from '@/lib/guides';
import { Inline } from '@/lib/guides/inline';
import { LINKS } from '@/lib/guides/links';
import { HUB_PATH, HUB_TITLE, articleSchema, breadcrumbSchema, formatDate, guidePath, guideStats, guideUrl, hubUrl, jsonLd } from '@/lib/guides/seo';
import type { Guide, GuideService } from '@/lib/guides/types';
import { SITE_URL } from '@/lib/company';

const c = content.de;

const SERVICE_LINK: Record<GuideService, { href: string; label: string }> = {
  check: { href: LINKS.check, label: 'Mehr zur kostenlosen Prüfung' },
  repair: { href: LINKS.repair, label: 'Mehr zur Website-Reparatur' },
  care: { href: LINKS.care, label: 'Mehr zur Website-Pflege' },
};

/* Ein Ratgeber: H1, Kurzantwort, Einleitung, Inhaltsverzeichnis, Abschnitte, FAQ, Handlungsaufruf,
   verwandte Ratgeber, Quellen. Reines HTML ohne Client-JS; FAQ nutzt das native <details>. */
export function GuideArticle({ guide: g }: { guide: Guide }) {
  const stats = guideStats(g);
  const related = g.related.map(getGuide).filter((x): x is Guide => !!x);
  const service = SERVICE_LINK[g.service];
  const crumbs = [
    { name: 'Startseite', url: `${SITE_URL}${LINKS.home}` },
    { name: 'Ratgeber', url: hubUrl },
    { name: g.short, url: guideUrl(g.slug) },
  ];

  return (
    <div className="gd-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(articleSchema(g)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema(crumbs)) }} />
      <a className="skip" href="#main">{c.a11y.skip}</a>
      <GuideHeader />
      <main id="main" className="gd">
        <div className="wrap">
          <nav className="sp__crumb" aria-label="Brotkrumen">
            <a href={LINKS.home}>Startseite</a>
            <span aria-hidden="true">/</span>
            <a href={HUB_PATH}>Ratgeber</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{g.short}</span>
          </nav>

          <header className="gd-head">
            <p className="gd-kicker">{g.category}</p>
            <h1 className="h1 gd-title"><Inline text={g.h1} /></h1>
            <p className="gd-meta">
              Von Sitemendo · Stand: <time dateTime={g.modified}>{formatDate(g.modified)}</time> · {stats.minutes} Min. Lesezeit
            </p>
          </header>

          <section className="gd-tldr" aria-labelledby="gd-tldr">
            <h2 id="gd-tldr">Kurz gesagt</h2>
            <ul>{g.tldr.map((x, i) => <li key={i}><Inline text={x} /></li>)}</ul>
          </section>

          <div className="gd-layout">
            <nav className="gd-toc" aria-label="Inhaltsverzeichnis">
              <p className="gd-toc__h">Inhalt</p>
              <ol>
                {g.sections.map(s => <li key={s.id}><a href={`#${s.id}`}>{s.h2}</a></li>)}
                <li><a href="#haeufige-fragen">Häufige Fragen</a></li>
              </ol>
            </nav>

            <article className="gd-body">
              <div className="gd-intro">{g.intro.map((x, i) => <p key={i}><Inline text={x} /></p>)}</div>
              {g.sections.map(s => (
                <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="gd-section">
                  <h2 id={`${s.id}-h`}><Inline text={s.h2} /></h2>
                  <Blocks blocks={s.blocks} />
                </section>
              ))}

              <section id="haeufige-fragen" aria-labelledby="haeufige-fragen-h" className="gd-section">
                <h2 id="haeufige-fragen-h">Häufige Fragen</h2>
                <div className="faq">
                  {g.faq.map((item, i) => {
                    const qId = `gd-q-${i}`;
                    const aId = `gd-a-${i}`;
                    return (
                      <details className="faq__item" key={item.q}>
                        <summary className="faq__q" aria-controls={aId}>
                          <h3 className="faq__title" id={qId}>{item.q}</h3>
                        </summary>
                        <p className="faq__answer" id={aId} role="region" aria-labelledby={qId}><Inline text={item.a} /></p>
                      </details>
                    );
                  })}
                </div>
              </section>

              <section className="sp-band gd-cta" aria-labelledby="gd-cta">
                <h2 className="h2" id="gd-cta">{c.final.title}</h2>
                <p>{c.final.sub}</p>
                <div className="gd-cta__row">
                  <a className="btn" href={LINKS.start}>{c.nav.cta}</a>
                  <a className="btn btn--ghost" href={service.href}>{service.label}</a>
                </div>
              </section>

              {related.length > 0 && (
                <section className="gd-section" aria-labelledby="gd-related">
                  <h2 id="gd-related">Weiterlesen</h2>
                  <div className="gd-cards">
                    {related.map(r => (
                      <a className="gd-card" key={r.slug} href={guidePath(r.slug)}>
                        <span className="gd-card__k">{r.category}</span>
                        <span className="gd-card__t">{r.short}</span>
                        <span className="gd-card__d">{r.teaser}</span>
                      </a>
                    ))}
                  </div>
                </section>
              )}

              <section className="gd-section gd-sources" aria-labelledby="gd-sources">
                <h2 id="gd-sources">Quellen und weiterführende Links</h2>
                <ul>
                  {g.sources.map(s => <li key={s.url}><a href={s.url} rel="noopener noreferrer">{s.label}</a></li>)}
                </ul>
                <p className="gd-disclaimer">
                  Dieser Ratgeber ist eine allgemeine Information und ersetzt keine Rechts-, Steuer- oder Fachberatung im Einzelfall.
                  Alle Angaben beziehen sich auf den Stand {formatDate(g.modified)}; Hinweise von Google, Browsern und Gesetzgebern ändern sich.
                  Zurück zur Übersicht: <a href={HUB_PATH}>{HUB_TITLE}</a>.
                </p>
              </section>
            </article>
          </div>
        </div>
      </main>
      <GuideFooter />
    </div>
  );
}
