'use client';

import { content, type Lang } from '@/lib/content';
import { withLangParam } from '@/lib/lang';
import { SERVICE_PAGES, servicePages, serviceUi, type ServiceKey } from '@/lib/servicePages';
import { useLangDocument } from '@/lib/useLangDocument';
import { useStoredLang } from '@/lib/useStoredLang';
import { LanguageSwitch } from '@/components/LanguageSwitch';

/* Hizmet sayfası (kontrol, onarım, bakım). LegalPage'in sade kabuğu: üst menü, içerik, küçük
   altbilgi. Fiyat ve süre content.ts'teki paket kartlarından gelir; metin servicePages.ts'ten. */
export function ServicePage({ service, initialLang }: { service: ServiceKey; initialLang: Lang }) {
  const [lang, setLang] = useStoredLang(initialLang);
  const c = content[lang];
  const ui = serviceUi[lang];
  const page = servicePages[lang][service];
  const entry = SERVICE_PAGES.find(p => p.key === service)!;
  const cards = entry.services.map(i => c.services[i]);
  useLangDocument(lang, page.metaTitle, page.metaDescription);

  const home = withLangParam('/', lang);
  const start = `${home}#start`;
  const others = SERVICE_PAGES.filter(p => p.key !== service);

  return (
    <div className="legal-page sp-page">
      <a className="skip" href="#main">{c.a11y.skip}</a>
      <header className="nav">
        <div className="wrap nav__in">
          <a className="brand" href={home}>SITEMENDO<b>.</b></a>
          <div className="nav__right">
            <LanguageSwitch lang={lang} setLang={setLang} label={c.nav.lang}/>
            <a className="btn btn--sm nav-cta" href={start}>{c.nav.ctaShort}</a>
          </div>
        </div>
      </header>

      <main id="main" className="sp">
        <div className="wrap">
          <nav className="sp__crumb" aria-label={ui.home}>
            <a href={home}>{ui.home}</a>
            <span aria-hidden="true">/</span>
            <span>{ui.names[service]}</span>
          </nav>
          <h1 className="h1 sp__title">{page.h1}</h1>
          <p className="lead">{page.lead}</p>
          <a className="btn sp__cta" href={start}>{c.nav.cta}</a>

          {service === 'check' ? (
            <section className="sp-section" aria-labelledby="sp-checks">
              <h2 className="h2" id="sp-checks">{c.checksTitle}</h2>
              <p className="sp-note">{c.checksSub}</p>
              <ol className="sp-checks">
                {c.checks.map(check => (
                  <li key={check.key}>
                    <span className="sp-checks__no">{check.no}</span>
                    <h3>{check.title}</h3>
                    <p>{check.desc}</p>
                  </li>
                ))}
              </ol>
              <p className="sp-note">{c.checksNote}</p>
            </section>
          ) : (
            <section className="sp-section" aria-labelledby="sp-packages">
              <h2 className="h2" id="sp-packages">{ui.packages}</h2>
              <div className="sp-cards">
                {cards.map(card => (
                  <article className="sp-card" key={card.name}>
                    <p className="sp-card__stage">{card.stage}</p>
                    <h3 className="sp-card__name">{card.name}</h3>
                    <p className="sp-card__price">{card.price}</p>
                    {card.time && <p className="sp-card__time">{card.time}</p>}
                    <p className="sp-card__note">{card.note}</p>
                    <ul className="sp-list">
                      {card.items.map(item => <li key={item}>{item}</li>)}
                    </ul>
                    {card.scope && <p className="sp-card__scope">{card.scope}</p>}
                  </article>
                ))}
              </div>
              <p className="sp-note">{c.pricesNote}</p>
            </section>
          )}

          <section className="sp-section" aria-labelledby="sp-who">
            <h2 className="h2" id="sp-who">{page.whoTitle}</h2>
            <ul className="sp-list">
              {page.who.map(item => <li key={item}>{item}</li>)}
            </ul>
          </section>

          {page.guide && page.guideTitle && (
            <section className="sp-section" aria-labelledby="sp-guide">
              <h2 className="h2" id="sp-guide">{page.guideTitle}</h2>
              <p className="sp-note sp-note--body">{page.guide}</p>
            </section>
          )}

          <section className="sp-section" aria-labelledby="sp-how">
            <h2 className="h2" id="sp-how">{c.howTitle}</h2>
            <ol className="sp-checks sp-checks--one">
              {c.steps.map(([title, text], i) => (
                <li key={title}>
                  <span className="sp-checks__no">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="sp-section" aria-labelledby="sp-faq">
            <h2 className="h2 faq-heading" id="sp-faq">{c.faqTitle}</h2>
            <div className="faq">
              {page.faq.map((item, i) => {
                const qId = `sp-q-${i}`;
                const aId = `sp-a-${i}`;
                return (
                  <details className="faq__item" key={item.q}>
                    <summary className="faq__q" aria-controls={aId}>
                      <h3 className="faq__title" id={qId}>{item.q}</h3>
                    </summary>
                    <p className="faq__answer" id={aId} role="region" aria-labelledby={qId}>{item.a}</p>
                  </details>
                );
              })}
            </div>
          </section>

          <section className="sp-band" aria-labelledby="sp-cta">
            <h2 className="h2" id="sp-cta">{page.ctaTitle}</h2>
            <p>{page.ctaText}</p>
            <a className="btn" href={start}>{c.nav.cta}</a>
          </section>

          <nav className="sp-more" aria-label={ui.more}>
            <p className="sp-more__h">{ui.more}</p>
            <div className="sp-links">
              {others.map(o => (
                <a className="btn btn--ghost btn--sm" key={o.key} href={withLangParam(o.path, lang)}>{ui.names[o.key]}</a>
              ))}
            </div>
          </nav>
        </div>
      </main>

      <footer className="footer">
        <div className="wrap footer__bottom">
          <p>© {new Date().getFullYear()} Sitemendo · {c.footer.rights}</p>
          <LanguageSwitch lang={lang} setLang={setLang} label={c.nav.lang}/>
        </div>
      </footer>
    </div>
  );
}
