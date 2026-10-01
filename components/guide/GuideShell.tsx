import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_E164, WHATSAPP_HREF } from '@/lib/company';
import { content } from '@/lib/content';
import { guidesIn } from '@/lib/guides';
import { linksFor } from '@/lib/guides/links';
import { guidePath, hubPath } from '@/lib/guides/seo';
import type { GuideLang } from '@/lib/guides/types';
import { UI } from '@/lib/guides/ui';
import { SERVICE_PAGES } from '@/lib/servicePages';

/* Üst menü: ana sitenin dil sistemi (?lang=) tek sayfa içindir; rehberler kendi adreslerinde durur.
   Dil bağlantıları karşılığı olan sayfaya, yoksa ana sayfanın ilgili diline gider. Betik yok, sade bağlantılar.
   alternates: dil → bu sayfanın o dildeki karşılığı (rehber ya da özet sayfası). */
export function GuideHeader({ lang, alternates = {} }: { lang: GuideLang; alternates?: Partial<Record<'tr' | 'de' | 'en', string>> }) {
  const L = linksFor(lang);
  const ui = UI[lang];
  const c = content[lang];
  const to = (l: 'tr' | 'de' | 'en') => alternates[l] ?? L[l];
  return (
    <header className="gd-header">
      <div className="wrap gd-header__in">
        <a className="brand" href={L.home}>SITEMENDO<b>.</b></a>
        <nav className="gd-header__links" aria-label={ui.mainNavLabel}>
          <a href={hubPath(lang)}>{ui.hubName}</a>
        </nav>
        <div className="langs gd-header__langs">
          <a href={to('tr')} lang="tr" hrefLang="tr" aria-current={lang === 'tr' ? 'true' : undefined}>TR</a>
          <a href={to('de')} lang="de" hrefLang="de" aria-current={lang === 'de' ? 'true' : undefined}>DE</a>
          <a href={to('en')} lang="en" hrefLang="en">EN</a>
        </div>
        <a className="btn btn--sm nav-cta" href={L.start}>{c.nav.ctaShort}</a>
      </div>
    </header>
  );
}

export function GuideFooter({ lang }: { lang: GuideLang }) {
  const L = linksFor(lang);
  const ui = UI[lang];
  const c = content[lang];
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__top">
          <div>
            <p className="footer__brand">SITEMENDO<span className="dot">.</span></p>
            <p className="footer-tag">{c.footer.tag}</p>
            <p className="footer-city">Berlin, {c.legal.country}</p>
            <a className="footer-mail" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            <a className="footer-mail" href={`tel:${CONTACT_PHONE_E164}`}>{CONTACT_PHONE_DISPLAY}</a>
            <a className="footer-mail" href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer">{c.about.whatsapp}</a>
          </div>
          <div>
            <p className="footer__h">{c.footer.services}</p>
            {SERVICE_PAGES.map(p => (
              <a key={p.key} href={L[p.key]}>{c.services[p.services[0]].name}</a>
            ))}
          </div>
          <div>
            <p className="footer__h">{ui.footerGuides}</p>
            <a href={hubPath(lang)}>{ui.footerAll}</a>
            {guidesIn(lang).slice(0, 5).map(g => <a key={g.slug} href={guidePath(g)}>{g.short}</a>)}
          </div>
          <div>
            <p className="footer__h">{c.footer.legal}</p>
            <a href={L.privacy}>{c.footer.privacy}</a>
            <a href={L.impressum}>Impressum</a>
          </div>
        </div>
        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} Sitemendo · {c.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
