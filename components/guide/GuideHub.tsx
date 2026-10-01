import { GuideFooter, GuideHeader } from '@/components/guide/GuideShell';
import { SITE_URL } from '@/lib/company';
import { content } from '@/lib/content';
import { GUIDES } from '@/lib/guides';
import { LINKS } from '@/lib/guides/links';
import { HUB_DESCRIPTION, HUB_TITLE, breadcrumbSchema, guidePath, guideStats, hubSchema, hubUrl, jsonLd } from '@/lib/guides/seo';
import { CATEGORY_ORDER, type Guide } from '@/lib/guides/types';

const c = content.de;

export function GuideHub() {
  const groups = CATEGORY_ORDER.map(category => ({ category, items: GUIDES.filter(g => g.category === category) })).filter(g => g.items.length);
  const crumbs = [{ name: 'Startseite', url: `${SITE_URL}${LINKS.home}` }, { name: 'Ratgeber', url: hubUrl }];
  return (
    <div className="gd-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(hubSchema(GUIDES)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema(crumbs)) }} />
      <a className="skip" href="#main">{c.a11y.skip}</a>
      <GuideHeader />
      <main id="main" className="gd">
        <div className="wrap">
          <nav className="sp__crumb" aria-label="Brotkrumen">
            <a href={LINKS.home}>Startseite</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Ratgeber</span>
          </nav>
          <header className="gd-head">
            <p className="gd-kicker">Ratgeber</p>
            <h1 className="h1 gd-title">{HUB_TITLE}</h1>
            <p className="lead">{HUB_DESCRIPTION}</p>
            <p className="gd-meta">Von Sitemendo · Kostenlos lesbar, ohne Anmeldung</p>
          </header>

          <section className="gd-section gd-start" aria-labelledby="gd-start">
            <h2 id="gd-start">Wo Sie anfangen sollten</h2>
            <p>
              Die Ratgeber folgen den acht Punkten unserer kostenlosen Website-Prüfung und ergänzen Themen wie Erreichbarkeit und Wartung.
              Wenn Sie nicht wissen, wo das Problem liegt, beginnen Sie mit der Checkliste: Sie führt Sie in ein bis zwei Stunden
              durch alle acht Bereiche und verweist auf den passenden Ratgeber.
            </p>
            {GUIDES.filter(g => g.category === 'Grundlagen').map(g => (
              <a className="gd-card gd-card--wide" key={g.slug} href={guidePath(g.slug)}>
                <span className="gd-card__k">{g.category}</span>
                <span className="gd-card__t">{g.short}</span>
                <span className="gd-card__d">{g.teaser}</span>
              </a>
            ))}
          </section>

          {groups.filter(g => g.category !== 'Grundlagen').map(({ category, items }) => (
            <section className="gd-section" key={category} aria-labelledby={`gd-${category}`}>
              <h2 id={`gd-${category}`}>{category}</h2>
              <div className="gd-cards">
                {items.map((g: Guide) => (
                  <a className="gd-card" key={g.slug} href={guidePath(g.slug)}>
                    <span className="gd-card__k">{guideStats(g).minutes} Min. Lesezeit</span>
                    <span className="gd-card__t">{g.short}</span>
                    <span className="gd-card__d">{g.teaser}</span>
                  </a>
                ))}
              </div>
            </section>
          ))}

          <section className="sp-band gd-cta" aria-labelledby="gd-hub-cta">
            <h2 className="h2" id="gd-hub-cta">{c.final.title}</h2>
            <p>{c.final.sub}</p>
            <div className="gd-cta__row">
              <a className="btn" href={LINKS.start}>{c.nav.cta}</a>
              <a className="btn btn--ghost" href={LINKS.check}>Mehr zur kostenlosen Prüfung</a>
            </div>
          </section>
        </div>
      </main>
      <GuideFooter />
    </div>
  );
}
