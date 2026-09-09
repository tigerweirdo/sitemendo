'use client';

import { createContext, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { content, type Lang } from '@/lib/content';
import { CONTACT_EMAIL, SAMPLE_DOMAIN } from '@/lib/company';
import { clearPersistedForm, readPersistedForm, writePersistedForm, type FormMode, type FormStep } from '@/lib/formPersist';
import { withLangParam } from '@/lib/lang';
import { useLangDocument } from '@/lib/useLangDocument';
import { useStoredLang } from '@/lib/useStoredLang';
import { LanguageSwitch } from '@/components/LanguageSwitch';

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
  const wasOpen = useRef(false);
  useLangDocument(lang);

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
              <span className="nav-cta__full">{c.nav.cta} →</span>
              <span className="nav-cta__short">{c.nav.ctaShort} →</span>
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
            <button className="btn" type="button" onClick={jumpToForm}>{c.nav.cta} →</button>
            <LanguageSwitch lang={lang} setLang={setLang} onPick={() => setMenuOpen(false)} label={c.nav.lang}/>
          </div>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <Grid/>
          <div className="wrap hero__wrap">
            <div className="hero__top"><p className="mono"><span className="mk"/>{c.hero.label}</p><p className="mono muted">{c.hero.chrome}</p></div>
            <div className="hero__main">
              <h1 className="display d1"><span className="h1-b">{c.hero.a}<br/>{c.hero.b}</span><span className="h1-b h1-b--2">{c.hero.c} <span className="hl">{c.hero.d}</span><br/>{c.hero.e}</span></h1>
              <ReportCard sample={c.hero.sample}/>
            </div>
            <div className="hero__bottom">
              <div className="hero__support"><p className="lead">{c.hero.support}</p></div>
              <div className="hero__form"><AuditForm lang={lang} idPrefix="hero" privacyHref={privacyHref}/></div>
            </div>
          </div>
        </section>

        <Section index="01" label={c.sec.checks} meta="08" id="checks">
          <div className="section-intro"><h2 className="display d2">{c.checksTitle}</h2><p className="lead">{c.checksSub}</p></div>
          <div className="checks">{c.checks.map(x => <div className="check" key={x.no}><p className="check__no">{x.no}</p><h3 className="check__title">{x.title}</h3><p className="check__desc">{x.desc}</p><p className="check__code">{x.code}</p></div>)}</div>
        </Section>

        <Section index="02" label={c.sec.output} meta="REPORT / 0241" dark id="report">
          <div className="report-layout">
            <div className="report-copy"><h2 className="display d2">{c.reportTitle}</h2><p className="lead">{c.reportSub}</p></div>
            <SampleReport lang={lang}/>
          </div>
        </Section>

        <section className="sec statement"><div className="wrap">
          <div className="sec__idx"><p className="mono">03 / {c.sec.decision}</p><span className="sec__rule"/><p className="mono muted">SITEMENDO</p></div>
          <h2 className="display d2">{c.statementA}</h2><p className="display d2 statement__b"><span className="hl">{c.statementB}</span></p><p className="lead statement__sub">{c.statementSub}</p>
        </div></section>

        <Section index="04" label={c.sec.services} meta="EUR" dark id="services">
          <h2 className="display d3 services-heading">{c.servicesTitle}</h2>
          <div className="services">{c.services.map(s => <div className={`service ${s.featured ? 'featured' : ''}`} key={s.no}>
            {s.note && <p className="mono service__note">{s.note}</p>}
            <p className={`mono ${s.featured ? '' : 'muted'}`}>{s.no}</p>
            <div>
              <h3 className="service__name">{s.name}</h3>
              <button className={`btn btn--sm service-cta ${s.cta ? '' : 'btn--ghost'}`} type="button" onClick={jumpToForm}>
                {(s.cta ?? c.talk)} →
              </button>
            </div>
            <ul className="service__items">{s.items.map(i => <li key={i}>{i}</li>)}</ul>
            <div className="service__end"><p className="service__price">{s.price}</p>{!s.cta && <p className="mono muted">{c.after}</p>}</div>
          </div>)}</div>
        </Section>

        <Section index="05" label={c.sec.process} meta="01 → 03" id="how">
          <h2 className="display d2 how-heading">{c.howTitle}</h2>
          <div className="steps">{c.steps.map((s, i) => <div className="step" key={s[0]}><span className="step__no">0{i + 1}</span><h3 className="step__title">{s[0]}</h3><p className="lead">{s[1]}</p></div>)}</div>
          <p className="display d3 assure">{c.assure}</p>
        </Section>

        <Section index="06" label={c.nav.faq} meta="06" id="faq">
          <h2 className="display d3 faq-heading">{c.faqTitle}</h2><FAQList items={c.faq}/>
        </Section>

        <Section index="07" label={c.sec.start} meta="REQUEST / AUDIT" dark id="start">
          <div className="final"><div className="final__copy"><h2 className="display d1">{c.final}<span className="dot">.</span></h2></div><div className="final__form"><AuditForm lang={lang} idPrefix="final" privacyHref={privacyHref}/></div></div>
        </Section>
      </main>

      <Footer lang={lang} setLang={setLang} privacyHref={privacyHref} impressumHref={impressumHref} navItems={navItems}/>
    </AuditFormProvider>
  );
}

function Grid() {
  return <div className="hero__grid" aria-hidden="true">{Array.from({ length: 12 }, (_, i) => <i key={i}/>)}</div>;
}

function Section({ index, label, meta, dark, id, children }: { index: string; label: string; meta: string; dark?: boolean; id?: string; children: ReactNode }) {
  return <section className={`sec ${dark ? 'sec--dark' : ''}`} id={id}><div className="wrap"><div className="sec__idx"><p className="mono">{index} / {label}</p><span className="sec__rule"/><p className="mono muted">{meta}</p></div>{children}</div></section>;
}

function ReportCard({ sample }: { sample: string }) {
  const rows: [string, string, string][] = [['DOMAIN', SAMPLE_DOMAIN.toUpperCase(), ''], ['MOBILE', 'PASS', 'ok'], ['PERFORMANCE', '41/100', 'warn'], ['BROKEN LINKS', '03', 'err'], ['SSL', 'PASS', 'ok']];
  return (
    <aside className="report-card">
      <div className="report-card__head">
        <p className="mono" lang="en">SITE REPORT / 0241</p>
        <p className="mono tag tag--sample">{sample}</p>
      </div>
      {rows.map(([k, v, s]) => (
        <div className="report-row report-row--en" key={k} lang="en">
          <span className="report-row__k">{k}</span>
          <span className="report-row__dots"/>
          <span className={`report-row__v ${s}`}>{v}</span>
        </div>
      ))}
      <div className="risk">
        <div className="report-row report-row--en" lang="en">
          <span className="report-row__k">RISK</span>
          <span className="report-row__dots"/>
          <span className="report-row__v">72/100</span>
        </div>
        <div className="risk__track"><i className="risk__fill"/></div>
      </div>
    </aside>
  );
}

function normalizeWebsite(value: string) {
  let s = value.trim();
  if (!s || /\s/.test(s)) return null;
  if (!/^[a-z][a-z0-9+.-]*:\/\//i.test(s)) s = 'https://' + s;
  try {
    const u = new URL(s);
    if (!['http:', 'https:'].includes(u.protocol) || u.username || u.password || !u.hostname) return null;
    return u.toString();
  } catch {
    return null;
  }
}
function validEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/u.test(v.trim());
}
async function submitAuditRequest(payload: { websiteUrl: string; email: string; language: Lang }) {
  const endpoint = process.env.NEXT_PUBLIC_AUDIT_ENDPOINT;
  const demo = process.env.NEXT_PUBLIC_DEMO_MODE !== 'false';
  if (!endpoint) {
    if (demo) return { mode: 'demo' as const };
    throw new Error('NOT_CONFIGURED');
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ ...payload, submittedAt: new Date().toISOString(), source: 'sitemendo.web' }),
      signal: controller.signal,
    });
    if (!res.ok) throw new Error('REQUEST_FAILED');
    return { mode: 'live' as const };
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
          <label className="mono audit-form__label" htmlFor={urlId}>{f.url}</label>
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
            {error && <p className="form-error" id={errId} role="alert">✕ {error}</p>}
            <button className="btn" type="submit">{f.submit} →</button>
          </div>
          <ul className="micro">{f.micro.map(x => <li key={x}>{x}</li>)}</ul>
          <p className="privacy-note">{f.privacy} <a href={privacyHref}>{f.privacyLink}</a></p>
        </>
      )}
      {step === 'email' && (
        <>
          <p className="d4 ask">{f.ask}</p>
          <label className="mono audit-form__label" htmlFor={emailId}>{f.email}</label>
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
            {error && <p className="form-error" id={errId} role="alert">✕ {error}</p>}
            <button className="btn" disabled={busy} type="submit">{busy ? f.sending : `${f.prepare} →`}</button>
          </div>
          <p className="privacy-note">{f.privacy} <a href={privacyHref}>{f.privacyLink}</a></p>
          <button className="form-back" type="button" onClick={() => setStep('url')}>{f.back}</button>
        </>
      )}
      {step === 'done' && (
        <div className="done">
          <span className="done__mark"/>
          <div>
            <p className="d4">{mode === 'demo' ? f.demo : f.done}</p>
            <p className="done__text">{f.doneText} <b>{email}</b></p>
            {mode === 'demo' && <p className="mono demo-note">{f.demoNote}</p>}
            <div className="done__actions">
              <button className="form-back" type="button" onClick={editForm}>{f.edit}</button>
              <button className="btn btn--sm" type="button" onClick={resetForm}>{f.reset} →</button>
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
            <p className="mono">REPORT / 0241</p>
            <p className="mono muted doc-domain">{SAMPLE_DOMAIN}</p>
          </div>
          <div className="doc-rev">
            <p className="mono tag tag--sample">{c.hero.sample}</p>
            <p className="mono muted">{c.sampleReport.label}</p>
          </div>
        </div>
        <div className="doc__count">
          <b>03</b>
          <p className="mono">{c.sampleReport.issues}</p>
        </div>
        {c.findings.map(f => (
          <div className="finding" key={f.no}>
            <div className="finding__top">
              <span className="mono">{f.no} /</span>
              <span className={`severity severity--${f.level}`}>{f.severity}</span>
            </div>
            <p className="finding__title">{f.title}</p>
            <div className="finding__meta">
              <span className="mono muted">{c.sampleReport.impact}</span>
              <span className="mono">{f.impact}</span>
            </div>
          </div>
        ))}
        <button className="btn btn--ghost btn--sm report-toggle" type="button" onClick={() => setOpen(v => !v)} aria-expanded={open}>
          {open ? c.sampleReport.closeList : c.sampleReport.openList} →
        </button>
        {open && (
          <>
            <p className="mono muted checklist-label">{c.sampleReport.listLabel}</p>
            <div className="doc-grid doc-grid--local">
              {c.checklist.map(s => (
                <div className="doc-cell" key={s.k}>
                  <p className="mono muted">{s.k}</p>
                  <p className={`mono ${s.s}`}>{s.v}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </article>
    </div>
  );
}

function FAQList({ items }: { items: readonly { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="faq">
      {items.map((f, i) => {
        const qid = `faq-q-${i}`;
        const pid = `faq-panel-${i}`;
        return (
          <div className="faq__item" key={f.q}>
            <h3>
              <button
                className="faq__q"
                id={qid}
                type="button"
                aria-expanded={open === i}
                aria-controls={pid}
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="faq__n">{String(i + 1).padStart(2, '0')}</span>
                <span className="faq__title">{f.q}</span>
                <span className="faq__icon"/>
              </button>
            </h3>
            <div className="faq__panel" id={pid} role="region" aria-labelledby={qid} hidden={open !== i}>
              <div><p className="faq__answer">{f.a}</p></div>
            </div>
          </div>
        );
      })}
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
            <p className="mono muted footer-tag">{c.hero.label}</p>
            <p className="mono muted footer-city">Berlin, {c.legal.country}</p>
            <a className="footer-mail" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            <p className="mono muted footer-hint">{c.footer.contactHint}</p>
          </div>
          <div>
            <h3 className="mono">{c.footer.services}</h3>
            <a href="#services">{c.services[0].name}</a>
            <a href="#services">{c.services[1].name}</a>
            <a href="#services">{c.services[2].name}</a>
            <a href="#services">{c.services[3].name}</a>
          </div>
          <div>
            <h3 className="mono">{c.footer.site}</h3>
            {navItems.map(item => <a key={item.href} href={item.href}>{item.label}</a>)}
            <a href={`mailto:${CONTACT_EMAIL}`}>{c.footer.contact}</a>
          </div>
          <div>
            <h3 className="mono">{c.footer.legal}</h3>
            <a href={privacyHref}>{c.footer.privacy}</a>
            <a href={impressumHref}>Impressum</a>
          </div>
        </div>
        <div className="footer__bottom">
          <p className="mono muted">© {new Date().getFullYear()} Sitemendo · {c.footer.rights}</p>
          <LanguageSwitch lang={lang} setLang={setLang} label={c.nav.lang}/>
          <p className="mono muted">{c.footer.mark}</p>
        </div>
      </div>
    </footer>
  );
}
