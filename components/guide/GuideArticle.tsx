import { Blocks } from '@/components/guide/Blocks';
import { GuideFooter, GuideHeader } from '@/components/guide/GuideShell';
import { SITE_URL } from '@/lib/company';
import { content } from '@/lib/content';
import { counterpart, getGuide } from '@/lib/guides';
import { Inline } from '@/lib/guides/inline';
import { linksFor } from '@/lib/guides/links';
import { articleSchema, breadcrumbSchema, formatDate, guidePath, guideStats, guideUrl, hubPath, hubUrl, jsonLd } from '@/lib/guides/seo';
import type { Guide } from '@/lib/guides/types';
import { UI } from '@/lib/guides/ui';

/* Bir rehber: H1, kısa cevap, giriş, içindekiler, bölümler, SSS, çağrı, ilgili rehberler, kaynaklar.
   Saf HTML, istemci JS yok; SSS yerel <details>. Dil rehberin kendi alanından gelir (g.lang). */
export function GuideArticle({ guide: g }: { guide: Guide }) {
  const lang = g.lang;
  const ui = UI[lang];
  const c = content[lang];
  const L = linksFor(lang);
  const stats = guideStats(g);
  const related = g.related.map(slug => getGuide(slug, lang)).filter((x): x is Guide => !!x);
  const alt = counterpart(g);
  const serviceHref = L[g.service];
  const crumbs = [
    { name: ui.home, url: `${SITE_URL}${L.home}` },
    { name: ui.hubName, url: hubUrl(lang) },
    { name: g.short, url: guideUrl(g) },
  ];

  return (
    <div className="gd-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(articleSchema(g)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema(crumbs)) }} />
      <a className="skip" href="#main">{c.a11y.skip}</a>
      <GuideHeader lang={lang} alternates={{ [lang]: guidePath(g), ...(alt ? { [alt.lang]: guidePath(alt) } : {}) }} />
      <main id="main" className="gd">
        <div className="wrap">
          <nav className="sp__crumb" aria-label={ui.crumbsLabel}>
            <a href={L.home}>{ui.home}</a>
            <span aria-hidden="true">/</span>
            <a href={hubPath(lang)}>{ui.hubName}</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{g.short}</span>
          </nav>

          <header className="gd-head">
            <p className="gd-kicker">{ui.categories[g.category]}</p>
            <h1 className="h1 gd-title"><Inline text={g.h1} lang={lang} /></h1>
            <p className="gd-meta">
              {ui.byline} · {ui.updated}: <time dateTime={g.modified}>{formatDate(g.modified, lang)}</time> · {stats.minutes} {ui.minutes}
            </p>
            {alt && (
              <p className="gd-alt">
                {ui.altLabel[alt.lang]}: <a href={guidePath(alt)} hrefLang={alt.lang} lang={alt.lang}>{alt.short}</a>
              </p>
            )}
          </header>

          <section className="gd-tldr" aria-labelledby="gd-tldr">
            <h2 id="gd-tldr">{ui.tldr}</h2>
            <ul>{g.tldr.map((x, i) => <li key={i}><Inline text={x} lang={lang} /></li>)}</ul>
          </section>

          <div className="gd-layout">
            <nav className="gd-toc" aria-label={ui.tocLabel}>
              <p className="gd-toc__h">{ui.toc}</p>
              <ol>
                {g.sections.map(s => <li key={s.id}><a href={`#${s.id}`}>{s.h2}</a></li>)}
                <li><a href={`#${ui.faqId}`}>{ui.faq}</a></li>
              </ol>
            </nav>

            <article className="gd-body">
              <div className="gd-intro">{g.intro.map((x, i) => <p key={i}><Inline text={x} lang={lang} /></p>)}</div>
              {g.sections.map(s => (
                <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="gd-section">
                  <h2 id={`${s.id}-h`}><Inline text={s.h2} lang={lang} /></h2>
                  <Blocks blocks={s.blocks} lang={lang} />
                </section>
              ))}

              <section id={ui.faqId} aria-labelledby={`${ui.faqId}-h`} className="gd-section">
                <h2 id={`${ui.faqId}-h`}>{ui.faq}</h2>
                <div className="faq">
                  {g.faq.map((item, i) => {
                    const qId = `gd-q-${i}`;
                    const aId = `gd-a-${i}`;
                    return (
                      <details className="faq__item" key={item.q}>
                        <summary className="faq__q" aria-controls={aId}>
                          <h3 className="faq__title" id={qId}>{item.q}</h3>
                        </summary>
                        <p className="faq__answer" id={aId} role="region" aria-labelledby={qId}><Inline text={item.a} lang={lang} /></p>
                      </details>
                    );
                  })}
                </div>
              </section>

              <section className="sp-band gd-cta" aria-labelledby="gd-cta">
                <h2 className="h2" id="gd-cta">{c.final.title}</h2>
                <p>{c.final.sub}</p>
                <div className="gd-cta__row">
                  <a className="btn" href={L.start}>{c.nav.cta}</a>
                  <a className="btn btn--ghost" href={serviceHref}>{ui.serviceLink[g.service]}</a>
                </div>
              </section>

              {related.length > 0 && (
                <section className="gd-section" aria-labelledby="gd-related">
                  <h2 id="gd-related">{ui.related}</h2>
                  <div className="gd-cards">
                    {related.map(r => (
                      <a className="gd-card" key={r.slug} href={guidePath(r)}>
                        <span className="gd-card__k">{ui.categories[r.category]}</span>
                        <span className="gd-card__t">{r.short}</span>
                        <span className="gd-card__d">{r.teaser}</span>
                      </a>
                    ))}
                  </div>
                </section>
              )}

              <section className="gd-section gd-sources" aria-labelledby="gd-sources">
                <h2 id="gd-sources">{ui.sources}</h2>
                <ul>
                  {g.sources.map(s => <li key={s.url}><a href={s.url} rel="noopener noreferrer">{s.label}</a></li>)}
                </ul>
                <p className="gd-disclaimer">
                  {ui.disclaimer(formatDate(g.modified, lang))} {ui.back}: <a href={hubPath(lang)}>{ui.hub.title}</a>.
                </p>
              </section>
            </article>
          </div>
        </div>
      </main>
      <GuideFooter lang={lang} />
    </div>
  );
}
