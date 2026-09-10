'use client';

import { Fragment, createContext, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState, useSyncExternalStore, type FormEvent, type ReactNode } from 'react';
import { normalizeWebsite, validEmail } from '@/lib/auditRequest';
import { content, type Lang } from '@/lib/content';
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_E164, SAMPLE_DOMAIN, WHATSAPP_HREF } from '@/lib/company';
import { clearPersistedForm, readPersistedForm, writePersistedForm, type FormMode, type FormStep } from '@/lib/formPersist';
import { withLangParam } from '@/lib/lang';
import { useLangDocument } from '@/lib/useLangDocument';
import { useStoredLang } from '@/lib/useStoredLang';
import { useScrollMotion } from '@/lib/useScrollMotion';
import { LanguageSwitch } from '@/components/LanguageSwitch';
import { HeroKnife } from '@/components/HeroKnife';

type SharedForm = {
  step: FormStep;
  url: string;
  email: string;
  error: string;
  busy: boolean;
  mode: FormMode;
  setStep: (step: FormStep) => void;
  setUrl: (url: string) => void;
  setEmail: (email: string) => void;
  setError: (error: string) => void;
  setBusy: (busy: boolean) => void;
  setMode: (mode: FormMode) => void;
  resetForm: () => void;
  editForm: () => void;
};

const AuditFormContext = createContext<SharedForm | null>(null);

const COMPACT_NAV_MQ = '(max-width: 767px) and (min-width: 401px)';

function subscribeCompactNav(onChange: () => void) {
  const mq = window.matchMedia(COMPACT_NAV_MQ);
  mq.addEventListener('change', onChange);
  return () => mq.removeEventListener('change', onChange);
}
function getCompactNav() {
  return window.matchMedia(COMPACT_NAV_MQ).matches;
}

function AuditFormProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState<FormStep>('url');
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [mode, setMode] = useState<FormMode>(null);

  useLayoutEffect(() => {
    const saved = readPersistedForm();
    if (!saved) return;
    setStep(saved.step);
    setUrl(saved.url);
    setEmail(saved.email);
    setMode(saved.mode);
  }, []);

  useEffect(() => {
    writePersistedForm({ step, url, email, mode });
  }, [step, url, email, mode]);

  const resetForm = () => {
    setStep('url');
    setUrl('');
    setEmail('');
    setError('');
    setBusy(false);
    setMode(null);
    clearPersistedForm();
  };
  const editForm = () => {
    setStep('url');
    setError('');
  };

  const value = useMemo(() => ({
    step, url, email, error, busy, mode,
    setStep, setUrl, setEmail, setError, setBusy, setMode, resetForm, editForm,
  }), [step, url, email, error, busy, mode]);

  return <AuditFormContext.Provider value={value}>{children}</AuditFormContext.Provider>;
}

export function Site({ initialLang }: { initialLang: Lang }) {
  const [lang, setLang] = useStoredLang(initialLang);
  const c = content[lang];
  const [menuOpen, setMenuOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const wasOpen = useRef(false);
  const compactNavCta = useSyncExternalStore(subscribeCompactNav, getCompactNav, () => false);
  useLangDocument(lang);
  useScrollMotion(mainRef, lang);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) {
      wasOpen.current = true;
      const first = menuRef.current?.querySelector<HTMLElement>('a[href], button:not([disabled])');
      first?.focus();
    } else if (wasOpen.current) {
      burgerRef.current?.focus();
      wasOpen.current = false;
    }
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        return;
      }
      if (e.key !== 'Tab' || !menuRef.current) return;
      const focusable = [...menuRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const jumpToForm = () => {
    setMenuOpen(false);
    const el = document.querySelector('#top .audit-form') as HTMLElement | null;
    const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
    el?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
    window.setTimeout(() => {
      const input = document.querySelector('#top input.audit-form__input') as HTMLInputElement | null;
      input?.focus({ preventScroll: true });
    }, reduce ? 40 : 250);
  };

  const privacyHref = withLangParam(process.env.NEXT_PUBLIC_PRIVACY_URL || '/privacy', lang);
  const impressumHref = withLangParam(process.env.NEXT_PUBLIC_IMPRESSUM_URL || '/impressum', lang);
  const navItems = [
    { href: '#checks', label: c.nav.checks },
    { href: '#services', label: c.nav.services },
    { href: '#how', label: c.nav.how },
    { href: '#faq', label: c.nav.faq },
  ] as const;
  const navCta = compactNavCta ? c.nav.ctaShort : c.nav.cta;

  return (
    <AuditFormProvider>
      <a className="skip" href="#main">{c.a11y.skip}</a>
      <header className={`nav ${menuOpen ? 'open' : ''}`} ref={navRef}>
        <div className="wrap nav__in">
          <a className="brand" href="#top">SITEMENDO<b>.</b></a>
          <nav className="nav__links" aria-label={c.a11y.mainNav}>
            {navItems.map(item => <a key={item.href} href={item.href}>{item.label}</a>)}
          </nav>
          <div className="nav__right">
            <LanguageSwitch lang={lang} setLang={setLang} label={c.nav.lang}/>
            <button className="btn btn--sm nav-cta" type="button" onClick={jumpToForm}>
              {navCta}
            </button>
            <button
              className="burger"
              ref={burgerRef}
              type="button"
              id="nav-burger"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={c.a11y.menu}
              onClick={() => setMenuOpen(v => !v)}
            >
              <span/><span/><span/>
            </button>
          </div>
        </div>
        <div className="menu" id="mobile-menu" ref={menuRef} hidden={!menuOpen} aria-hidden={!menuOpen}>
          <div className="wrap">
            {navItems.map(item => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>)}
            <button className="btn" type="button" onClick={jumpToForm}>{c.nav.cta}</button>
            <LanguageSwitch lang={lang} setLang={setLang} onPick={() => setMenuOpen(false)} label={c.nav.lang}/>
          </div>
        </div>
      </header>

      <main id="main" ref={mainRef}>
        <section className="hero" id="top">
          <div className="wrap hero__wrap">
            <div className="hero__copy">
              <h1 className="h1 hero__title">{c.hero.a}</h1>
              <p className="lead">{c.hero.support}</p>
            </div>
            <div className="hero__art">
              <HeroKnife label={c.a11y.knife}/>
            </div>
            <div className="hero__form">
              <AuditForm lang={lang} idPrefix="hero" privacyHref={privacyHref}/>
            </div>
          </div>
        </section>

        <section className="sec about" id="about">
          <div className="wrap about__wrap">
            <div className="about__copy">
              <h2 className="h2">{c.about.title}</h2>
              <p className="lead" data-reveal>{c.about.p1}</p>
              <p className="lead" data-reveal>{c.about.p2}</p>
              <ul className="about__contacts">
                <li data-reveal>
                  <span className="about__k">{c.about.emailLabel}</span>
                  <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                </li>
                <li data-reveal>
                  <span className="about__k">{c.about.phoneLabel}</span>
                  <a href={`tel:${CONTACT_PHONE_E164}`}>{CONTACT_PHONE_DISPLAY}</a>
                </li>
                <li data-reveal>
                  <span className="about__k">{c.about.whatsapp}</span>
                  <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer">{CONTACT_PHONE_DISPLAY}</a>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <Section id="checks">
          <div className="section-intro">
            <h2 className="h2">{c.checksTitle}</h2>
            <p className="lead" data-reveal>{c.checksSub}</p>
          </div>
          <div className="checks">
            {c.checks.map(x => (
              <div className="check" key={x.no}>
                <h3 className="check__title">{x.title}</h3>
                <p className="check__desc">{x.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="report">
          <div className="report-layout">
            <div className="report-copy">
              <h2 className="h2">{c.reportTitle}</h2>
              <p className="lead" data-reveal>{c.reportSub}</p>
            </div>
            <SampleReport lang={lang}/>
          </div>
        </Section>

        <section className="sec statement">
          <div className="wrap">
            <h2 className="h2 statement__title">
              {c.statementA.split(' ').map((word, i) => (
                <Fragment key={i}>{i > 0 && ' '}<span className="statement__word">{word}</span></Fragment>
              ))}
            </h2>
            <p className="lead statement__sub" data-reveal>{c.statementSub}</p>
          </div>
        </section>

        <Section id="services">
          <h2 className="h2 services-heading">{c.servicesTitle}</h2>
          <div className="services">
            {c.services.map(s => (
              <div className={`service ${s.featured ? 'featured' : ''}`} key={s.no}>
                <div className="service__head">
                  <p className="service__price">{s.price}</p>
                  <h3 className="service__name">{s.name}</h3>
                  {s.note && <p className="service__note">{s.note}</p>}
                  {s.showAfter && <p className="service__after">{c.after}</p>}
                </div>
                <ul className="service__items">{s.items.map(i => <li key={i}>{i}</li>)}</ul>
              </div>
            ))}
          </div>
          <div className="services-cta" data-reveal>
            <button className="btn" type="button" onClick={jumpToForm}>{c.servicesCta}</button>
          </div>
        </Section>

        <Section id="how">
          <h2 className="h2 how-heading">{c.howTitle}</h2>
          <div className="steps">
            {c.steps.map((s, i) => (
              <div className="step" key={s[0]}>
                <span className="step__no" aria-hidden="true">0{i + 1}</span>
                <h3 className="step__title">{s[0]}</h3>
                <p className="lead">{s[1]}</p>
              </div>
            ))}
          </div>
          <p className="lead assure" data-reveal>{c.assure}</p>
        </Section>

        <Section id="faq">
          <h2 className="h2 faq-heading">{c.faqTitle}</h2>
          <FAQList items={c.faq}/>
        </Section>

        <Section id="start">
          <div className="final">
            <div className="final__copy">
              <h2 className="h2 h2--lg">{c.final}</h2>
            </div>
            <div className="final__form">
              <div className="form-panel">
                <AuditForm lang={lang} idPrefix="final" privacyHref={privacyHref}/>
              </div>
            </div>
          </div>
        </Section>
      </main>

      <Footer lang={lang} setLang={setLang} privacyHref={privacyHref} impressumHref={impressumHref} navItems={navItems}/>
    </AuditFormProvider>
  );
}

function Section({ dark, id, children }: { dark?: boolean; id?: string; children: ReactNode }) {
  return (
    <section className={`sec ${dark ? 'sec--dark' : ''}`} id={id}>
      <div className="wrap">{children}</div>
    </section>
  );
}

async function submitAuditRequest(payload: { websiteUrl: string; email: string; language: Lang }) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  try {
    const res = await fetch('/api/audit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    const data = await res.json().catch(() => null) as { mode?: string } | null;
    if (!res.ok) throw new Error('REQUEST_FAILED');
    if (data?.mode === 'demo' || data?.mode === 'live') return { mode: data.mode as 'demo' | 'live' };
    throw new Error('REQUEST_FAILED');
  } finally {
    clearTimeout(timer);
  }
}

function AuditForm({ lang, idPrefix, privacyHref }: { lang: Lang; idPrefix: string; privacyHref: string }) {
  const f = content[lang].form;
  const ctx = useContext(AuditFormContext);
  if (!ctx) throw new Error('AuditForm needs provider');
  const { step, url, email, error, busy, mode, setStep, setUrl, setEmail, setError, setBusy, setMode, resetForm, editForm } = ctx;
  const normalized = useMemo(() => normalizeWebsite(url), [url]);
  const urlId = `${idPrefix}-url`;
  const emailId = `${idPrefix}-email`;
  const errId = `${idPrefix}-error`;

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError('');
    if (step === 'url') {
      if (!normalized) {
        setError(f.urlErr);
        return;
      }
      setStep('email');
      return;
    }
    if (step !== 'email') return;
    if (!validEmail(email)) {
      setError(f.emailErr);
      return;
    }
    setBusy(true);
    try {
      const r = await submitAuditRequest({ websiteUrl: normalized!, email: email.trim(), language: lang });
      setMode(r.mode);
      setStep('done');
    } catch {
      setError(f.fail);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="audit-form" onSubmit={submit} noValidate>
      {step === 'url' && (
        <>
          <label className="audit-form__label" htmlFor={urlId}>{f.url}</label>
          <div className="audit-form__field">
            <input
              className="audit-form__input"
              id={urlId}
              name="websiteUrl"
              type="url"
              inputMode="url"
              autoComplete="url"
              placeholder={f.urlPh}
              value={url}
              aria-invalid={!!error}
              aria-describedby={error ? errId : undefined}
              onChange={e => setUrl(e.target.value)}
            />
            {error && <p className="form-error" id={errId} role="alert">{error}</p>}
            <button className="btn" type="submit">{f.submit}</button>
          </div>
          <ul className="micro">{f.micro.map(x => <li key={x}>{x}</li>)}</ul>
          <p className="privacy-note">{f.privacy} <a href={privacyHref}>{f.privacyLink}</a></p>
        </>
      )}
      {step === 'email' && (
        <>
          <p className="h3 ask">{f.ask}</p>
          <label className="audit-form__label" htmlFor={emailId}>{f.email}</label>
          <div className="audit-form__field">
            <input
              className="audit-form__input"
              id={emailId}
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder={f.emailPh}
              value={email}
              aria-invalid={!!error}
              aria-describedby={error ? errId : undefined}
              onChange={e => setEmail(e.target.value)}
            />
            {error && <p className="form-error" id={errId} role="alert">{error}</p>}
            <button className="btn" disabled={busy} type="submit">{busy ? f.sending : f.prepare}</button>
          </div>
          <p className="privacy-note">{f.privacy} <a href={privacyHref}>{f.privacyLink}</a></p>
          <button className="form-back" type="button" onClick={() => setStep('url')}>{f.back}</button>
        </>
      )}
      {step === 'done' && (
        <div className="done">
          <span className="done__mark"/>
          <div>
            <p className="h3">{mode === 'demo' ? f.demo : f.done}</p>
            <p className="done__text">{f.doneText} <b>{email}</b></p>
            {mode === 'demo' && <p className="demo-note">{f.demoNote}</p>}
            <div className="done__actions">
              <button className="form-back" type="button" onClick={editForm}>{f.edit}</button>
              <button className="btn btn--sm" type="button" onClick={resetForm}>{f.reset}</button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}

function SampleReport({ lang }: { lang: Lang }) {
  const c = content[lang];
  const [open, setOpen] = useState(false);
  return (
    <div className="report-doc">
      <article className="doc">
        <div className="doc__head">
          <div>
            <p className="doc-domain">{SAMPLE_DOMAIN}</p>
          </div>
          <div className="doc-rev">
            <p className="tag tag--sample">{c.sampleReport.label}</p>
          </div>
        </div>
        <div className="doc__count">
          <b>03</b>
          <p>{c.sampleReport.issues}</p>
        </div>
        <div className="findings">
          {c.findings.map(f => (
            <div className="finding" key={f.no}>
              <div className="finding__top">
                <span className={`severity severity--${f.level}`}>{f.severity}</span>
              </div>
              <h3 className="finding__title">{f.title}</h3>
              <div className="finding__meta">
                <span>{c.sampleReport.impact}</span>
                <span>{f.impact}</span>
              </div>
            </div>
          ))}
        </div>
        <button className="btn btn--ghost btn--sm report-toggle" data-reveal type="button" onClick={() => setOpen(v => !v)} aria-expanded={open}>
          {open ? c.sampleReport.closeList : c.sampleReport.openList}
        </button>
        <div className={`report-checklist ${open ? 'is-open' : ''}`} aria-hidden={!open}>
          <p className="checklist-label">{c.sampleReport.listLabel}</p>
          <div className="doc-grid doc-grid--local">
            {c.checklist.map(s => (
              <div className="doc-cell" key={s.k}>
                <p className="doc-cell__k">{s.k}</p>
                <p className={`doc-cell__v ${s.s}`}>{s.v}</p>
              </div>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}

function FAQList({ items }: { items: readonly { q: string; a: string }[] }) {
  return (
    <div className="faq">
      {items.map(f => (
        <details className="faq__item" key={f.q}>
          <summary className="faq__q">
            <h3 className="faq__title">{f.q}</h3>
          </summary>
          <p className="faq__answer">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

function Footer({
  lang, setLang, privacyHref, impressumHref, navItems,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
  privacyHref: string;
  impressumHref: string;
  navItems: readonly { href: string; label: string }[];
}) {
  const c = content[lang];
  return (
    <footer className="footer" id="contact">
      <div className="wrap">
        <div className="footer__top">
          <div>
            <p className="footer__brand">SITEMENDO<span className="dot">.</span></p>
            <p className="footer-tag">{c.footer.tag}</p>
            <p className="footer-city">Berlin, {c.legal.country}</p>
            <a className="footer-mail" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            <a className="footer-mail" href={`tel:${CONTACT_PHONE_E164}`}>{CONTACT_PHONE_DISPLAY}</a>
            <a className="footer-mail" href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer">{c.about.whatsapp}</a>
            <p className="footer-hint">{c.footer.contactHint}</p>
          </div>
          <div>
            <p className="footer__h">{c.footer.services}</p>
            <a href="#services">{c.services[0].name}</a>
            <a href="#services">{c.services[1].name}</a>
            <a href="#services">{c.services[2].name}</a>
            <a href="#services">{c.services[3].name}</a>
          </div>
          <div>
            <p className="footer__h">{c.footer.site}</p>
            {navItems.map(item => <a key={item.href} href={item.href}>{item.label}</a>)}
            <a href={`mailto:${CONTACT_EMAIL}`}>{c.footer.contact}</a>
          </div>
          <div>
            <p className="footer__h">{c.footer.legal}</p>
            <a href={privacyHref}>{c.footer.privacy}</a>
            <a href={impressumHref}>Impressum</a>
          </div>
        </div>
        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} Sitemendo · {c.footer.rights}</p>
          <LanguageSwitch lang={lang} setLang={setLang} label={c.nav.lang}/>
          <p>{c.footer.mark}</p>
        </div>
      </div>
    </footer>
  );
}
