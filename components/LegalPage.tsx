'use client';

import { useEffect, useState } from 'react';
import { content, type Lang } from '@/lib/content';
import { COMPANY, CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_E164 } from '@/lib/company';
import { readPersistedForm } from '@/lib/formPersist';
import { withLangParam } from '@/lib/lang';
import { useLangDocument } from '@/lib/useLangDocument';
import { useStoredLang } from '@/lib/useStoredLang';
import { LanguageSwitch } from '@/components/LanguageSwitch';

function linkifyEmail(text: string) {
  const parts = text.split(CONTACT_EMAIL);
  if (parts.length === 1) return text;
  return parts.map((part, i) => (
    <span key={i}>
      {i > 0 && <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>}
      {part}
    </span>
  ));
}

export function LegalPage({ type, initialLang }: { type: 'privacy' | 'impressum'; initialLang: Lang }) {
  const [lang, setLang] = useStoredLang(initialLang);
  const c = content[lang];
  const legal = c.legal;
  const title = type === 'privacy' ? legal.privacyTitle : legal.impressumTitle;
  const lead = type === 'privacy' ? legal.privacyLead : legal.impressumLead;
  const sections = type === 'privacy' ? legal.privacy : legal.impressum;
  const metaTitle = type === 'privacy' ? c.meta.privacyTitle : c.meta.impressumTitle;
  const metaDesc = type === 'privacy' ? c.meta.privacyDescription : c.meta.impressumDescription;
  useLangDocument(lang, metaTitle, metaDesc);

  const [homeHref, setHomeHref] = useState(withLangParam('/', lang));
  useEffect(() => {
    const saved = readPersistedForm();
    const hash = saved && saved.step !== 'url' ? '#start' : '';
    setHomeHref(`${withLangParam('/', lang)}${hash}`);
  }, [lang]);

  return (
    <div className="legal-page">
      <a className="skip" href="#main">{c.a11y.skip}</a>
      <header className="nav">
        <div className="wrap nav__in">
          <a className="brand" href={homeHref}>SITEMENDO<b>.</b></a>
          <div className="nav__right">
            <LanguageSwitch lang={lang} setLang={setLang} label={c.nav.lang}/>
            <a className="btn btn--sm nav-cta" href={homeHref}>{legal.back}</a>
          </div>
        </div>
      </header>
      <main id="main" className="legal">
        <div className="wrap">
          <p className="legal__updated">{legal.updated}</p>
          <h1 className="h1 legal__title">{title}</h1>
          <p className="lead">{lead}</p>
          <div className="legal__body">
            {type === 'impressum' && (
              <>
                <section>
                  <h2>{legal.provider}</h2>
                  <p>{COMPANY.ownerName}</p>
                  <p>{COMPANY.legalName}</p>
                  <p>
                    {COMPANY.street}<br />
                    {`${COMPANY.postalCode} ${COMPANY.city}`}
                  </p>
                </section>
                <section>
                  <h2>{legal.emailLabel}</h2>
                  <p><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
                </section>
                <section>
                  <h2>{legal.phoneLabel}</h2>
                  <p><a href={`tel:${CONTACT_PHONE_E164}`}>{CONTACT_PHONE_DISPLAY}</a></p>
                </section>
              </>
            )}
            {sections.map(section => (
              <section key={section.h}>
                <h2>{section.h}</h2>
                <p>{linkifyEmail(section.p)}</p>
              </section>
            ))}
          </div>
          <a className="btn legal-back" href={homeHref}>{legal.back}</a>
        </div>
      </main>
      <footer className="footer">
        <div className="wrap footer__bottom">
          <p>© {new Date().getFullYear()} Sitemendo · {c.footer.rights}</p>
          <LanguageSwitch lang={lang} setLang={setLang} label={c.nav.lang}/>
          <p>{c.footer.mark}</p>
        </div>
      </footer>
    </div>
  );
}
