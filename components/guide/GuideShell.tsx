import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_E164, WHATSAPP_HREF } from '@/lib/company';
import { content } from '@/lib/content';
import { GUIDES } from '@/lib/guides';
import { LINKS } from '@/lib/guides/links';
import { HUB_PATH, guidePath } from '@/lib/guides/seo';
import { SERVICE_PAGES } from '@/lib/servicePages';

const c = content.de;

/* Üst menü: ana sitenin dil sistemi (?lang=) tek sayfa içindir; rehberler yalnız Almanca olduğu için
   dil bağlantıları ana sayfanın ilgili dilini açar. Betik yok, sade bağlantılar. */
export function GuideHeader() {
  return (
    <header className="gd-header">
      <div className="wrap gd-header__in">
        <a className="brand" href={LINKS.home}>SITEMENDO<b>.</b></a>
        <nav className="gd-header__links" aria-label="Hauptnavigation">
          <a href={HUB_PATH}>Ratgeber</a>
        </nav>
        <div className="langs gd-header__langs">
          <a href={LINKS.tr} lang="tr" hrefLang="tr">TR</a>
          <a href={LINKS.home} lang="de" hrefLang="de" aria-current="true">DE</a>
          <a href={LINKS.en} lang="en" hrefLang="en">EN</a>
        </div>
        <a className="btn btn--sm nav-cta" href={LINKS.start}>{c.nav.ctaShort}</a>
      </div>
    </header>
  );
}

export function GuideFooter() {
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
              <a key={p.key} href={LINKS[p.key]}>{c.services[p.services[0]].name}</a>
            ))}
          </div>
          <div>
            <p className="footer__h">Ratgeber</p>
            <a href={HUB_PATH}>Alle Ratgeber</a>
            {GUIDES.slice(0, 5).map(g => <a key={g.slug} href={guidePath(g.slug)}>{g.short}</a>)}
          </div>
          <div>
            <p className="footer__h">{c.footer.legal}</p>
            <a href={LINKS.privacy}>{c.footer.privacy}</a>
            <a href={LINKS.impressum}>Impressum</a>
          </div>
        </div>
        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} Sitemendo · {c.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
