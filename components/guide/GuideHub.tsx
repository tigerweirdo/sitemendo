import { GuideFooter, GuideHeader } from '@/components/guide/GuideShell';
import { SITE_URL } from '@/lib/company';
import { content } from '@/lib/content';
import { guidesIn } from '@/lib/guides';
import { linksFor } from '@/lib/guides/links';
import { breadcrumbSchema, guidePath, guideStats, hubPath, hubSchema, hubUrl, jsonLd } from '@/lib/guides/seo';
import { CATEGORY_ORDER, GUIDE_LANGS, type Guide, type GuideLang } from '@/lib/guides/types';
import { UI } from '@/lib/guides/ui';

/* Özet sayfası. Diğer dilde de rehber varsa dil bağlantısı o dilin özet sayfasına gider ve
   sayfada diğer dilin rehberlerine bir yönlendirme satırı çıkar. */
export function GuideHub({ lang }: { lang: GuideLang }) {
  const ui = UI[lang];
  const c = content[lang];
  const L = linksFor(lang);
  const guides = guidesIn(lang);
  const other = GUIDE_LANGS.find(l => l !== lang && guidesIn(l).length > 0);
  const groups = CATEGORY_ORDER.map(category => ({ category, items: guides.filter(g => g.category === category) })).filter(g => g.items.length);
  const crumbs = [{ name: ui.home, url: `${SITE_URL}${L.home}` }, { name: ui.hubName, url: hubUrl(lang) }];
  const start = guides.filter(g => g.category === 'Grundlagen');
  return (
    <div className="gd-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(hubSchema(lang, guides)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema(crumbs)) }} />
      <a className="skip" href="#main">{c.a11y.skip}</a>
      <GuideHeader lang={lang} alternates={{ [lang]: hubPath(lang), ...(other ? { [other]: hubPath(other) } : {}) }} />
      <main id="main" className="gd">
        <div className="wrap">
          <nav className="sp__crumb" aria-label={ui.crumbsLabel}>
            <a href={L.home}>{ui.home}</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{ui.hubName}</span>
          </nav>
          <header className="gd-head">
            <p className="gd-kicker">{ui.hubName}</p>
            <h1 className="h1 gd-title">{ui.hub.title}</h1>
            <p className="lead">{ui.hub.description}</p>
            <p className="gd-meta">{ui.hub.meta}</p>
          </header>

          {start.length > 0 && (
            <section className="gd-section gd-start" aria-labelledby="gd-start">
              <h2 id="gd-start">{ui.hub.startTitle}</h2>
              <p>{ui.hub.startText}</p>
              {start.map(g => (
                <a className="gd-card gd-card--wide" key={g.slug} href={guidePath(g)}>
                  <span className="gd-card__k">{ui.categories[g.category]}</span>
                  <span className="gd-card__t">{g.short}</span>
                  <span className="gd-card__d">{g.teaser}</span>
                </a>
              ))}
            </section>
          )}

          {groups.filter(g => g.category !== 'Grundlagen').map(({ category, items }) => (
            <section className="gd-section" key={category} aria-labelledby={`gd-${category}`}>
              <h2 id={`gd-${category}`}>{ui.categories[category]}</h2>
              <div className="gd-cards">
                {items.map((g: Guide) => (
                  <a className="gd-card" key={g.slug} href={guidePath(g)}>
                    <span className="gd-card__k">{guideStats(g).minutes} {ui.minutes}</span>
                    <span className="gd-card__t">{g.short}</span>
                    <span className="gd-card__d">{g.teaser}</span>
                  </a>
                ))}
              </div>
            </section>
          ))}

          {other && (
            <p className="gd-other">
              {ui.hub.otherHub} <a href={hubPath(other)} hrefLang={other} lang={other}>{ui.hub.otherHubLink}</a>
            </p>
          )}

          <section className="sp-band gd-cta" aria-labelledby="gd-hub-cta">
            <h2 className="h2" id="gd-hub-cta">{c.final.title}</h2>
            <p>{c.final.sub}</p>
            <div className="gd-cta__row">
              <a className="btn" href={L.start}>{c.nav.cta}</a>
              <a className="btn btn--ghost" href={L.check}>{ui.serviceLink.check}</a>
            </div>
          </section>
        </div>
      </main>
      <GuideFooter lang={lang} />
    </div>
  );
}
