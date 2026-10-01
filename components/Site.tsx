'use client';

import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState, useSyncExternalStore, type ComponentType, type CSSProperties, type FormEvent, type ReactNode, type Ref, type RefObject } from 'react';
import { normalizeWebsite } from '@/lib/auditRequest';
import { content, type CheckKey, type Lang } from '@/lib/content';
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_E164, SAMPLE_DOMAIN, WHATSAPP_HREF } from '@/lib/company';
import { createSendLock, formDoneView, nextEmailStep, nextUrlStep, requestPrecheck, submitAuditRequest } from '@/lib/formFlow';
import type { PrecheckResult } from '@/lib/precheck';
import { clearPersistedForm, readPersistedForm, writePersistedForm, type FormMode, type FormStep } from '@/lib/formPersist';
import { withLangParam } from '@/lib/lang';
import SELF_CHECK from '@/lib/selfCheck.json';
import { useLangDocument } from '@/lib/useLangDocument';
import { useStoredLang } from '@/lib/useStoredLang';
import { useActiveSection } from '@/lib/useActiveSection';
import { LanguageSwitch } from '@/components/LanguageSwitch';
import { HeroKnife, type KnifeTag, type ToolId } from '@/components/HeroKnife';
import { CheckIcon } from '@/components/CheckIcon';
import { RailDots } from '@/components/RailDots';

/* Çakının her aleti kontrol kapsamındaki bir maddeye karşılık gelir; etiket o maddenin kısa adıdır. */
const KNIFE_CHECKS: Record<ToolId, CheckKey> = {
  blade: 'speed', saw: 'links', opener: 'forms', small: 'mobile', driver: 'https', cork: 'index',
};

/* Ön kontrolün durumu, hangi adres için olduğuyla birlikte: adres değişince eski sonuç gösterilmez. */
type PrecheckView = 'loading' | 'unreachable' | PrecheckResult;
type PrecheckState = { target: string; view: PrecheckView } | null;

type SharedForm = {
  precheck: PrecheckState;
  runPrecheck: (target: string) => void;
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
  tryBeginSend: () => boolean;
  endSend: () => void;
};

const AuditFormContext = createContext<SharedForm | null>(null);

const COMPACT_NAV_MQ = '(max-width: 1023px) and (min-width: 768px)';

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
  const [precheck, setPrecheck] = useState<PrecheckState>(null);
  const precheckTarget = useRef<string | null>(null);
  const sendLock = useRef(createSendLock());

  /* Aynı adres için tek istek. Yanıt geldiğinde adres değişmişse sonuç atılır; uç nokta
     yoksa ya da istek sınırı aşıldıysa panel kapanır. */
  const runPrecheck = useCallback((target: string) => {
    if (precheckTarget.current === target) return;
    precheckTarget.current = target;
    setPrecheck({ target, view: 'loading' });
    void requestPrecheck(target).then(res => {
      if (precheckTarget.current !== target) return;
      if (!res) {
        precheckTarget.current = null;
        setPrecheck(null);
        return;
      }
      setPrecheck({ target, view: 'error' in res ? 'unreachable' : res });
    });
  }, []);

  useLayoutEffect(() => {
    const saved = readPersistedForm();
    if (!saved) return;
    /* eslint-disable react-hooks/set-state-in-effect -- tarayıcı deposu sunucuda okunamaz; hidrasyondan sonra bir kez eşitlenir */
    setStep(saved.step);
    setUrl(saved.url);
    setEmail(saved.email);
    setMode(saved.mode);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    writePersistedForm({ step, url, email, mode });
  }, [step, url, email, mode]);

  const resetForm = useCallback(() => {
    sendLock.current.unlock();
    setStep('url');
    setUrl('');
    setEmail('');
    setError('');
    setBusy(false);
    setMode(null);
    precheckTarget.current = null;
    setPrecheck(null);
    clearPersistedForm();
  }, []);
  const editForm = useCallback(() => {
    setStep('url');
    setError('');
  }, []);
  const tryBeginSend = useCallback(() => {
    if (!sendLock.current.tryLock()) return false;
    setBusy(true);
    return true;
  }, []);
  const endSend = useCallback(() => {
    sendLock.current.unlock();
    setBusy(false);
  }, []);

  const value = useMemo(() => ({
    precheck, runPrecheck,
    step, url, email, error, busy, mode,
    setStep, setUrl, setEmail, setError, setBusy, setMode, resetForm, editForm, tryBeginSend, endSend,
  }), [precheck, runPrecheck, step, url, email, error, busy, mode, resetForm, editForm, tryBeginSend, endSend]);

  return <AuditFormContext.Provider value={value}>{children}</AuditFormContext.Provider>;
}

export function Site({ initialLang, knife }: { initialLang: Lang; knife: ReactNode }) {
  const [lang, setLang] = useStoredLang(initialLang);
  const c = content[lang];
  const [menuOpen, setMenuOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLOListElement>(null);
  const wasOpen = useRef(false);
  const compactNavCta = useSyncExternalStore(subscribeCompactNav, getCompactNav, () => false);
  useLangDocument(lang);
  const [Motion, setMotion] = useState<ComponentType<{
    scope: RefObject<HTMLElement | null>;
    nav: RefObject<HTMLElement | null>;
    footer: RefObject<HTMLElement | null>;
    lang: Lang;
  }> | null>(null);

  /* GSAP kaydırma hareketi hidrasyonla aynı görevde kurulursa ana iş parçacığı
     uzun kalıyor. İlk kaydırmada, yoksa 8 sn sonra ayrı bir paketten gelir.
     Hareket azaltılmışsa hiç inmez. */
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let cancel = false;
    let started = false;
    let timer = 0;
    const arm = () => {
      if (started || cancel) return;
      started = true;
      window.clearTimeout(timer);
      window.removeEventListener('scroll', arm);
      import('@/components/ScrollMotion').then(mod => {
        if (!cancel) setMotion(() => mod.ScrollMotion);
      });
    };
    timer = window.setTimeout(arm, 8000);
    window.addEventListener('scroll', arm, { passive: true });
    return () => {
      cancel = true;
      window.clearTimeout(timer);
      window.removeEventListener('scroll', arm);
    };
  }, []);

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

  /* Çakıdan ya da ücretsiz karttan bir maddeye gidiş: madde ekranın ortasına gelir ve kısa
     süre sülfürle yanar (globals.css, .check[data-flash]). */
  const flashTimer = useRef(0);
  const pickCheck = (key: CheckKey) => {
    const el = document.getElementById(`check-${key}`);
    if (!el) return;
    const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
    el.removeAttribute('data-flash');
    window.clearTimeout(flashTimer.current);
    requestAnimationFrame(() => el.setAttribute('data-flash', ''));
    flashTimer.current = window.setTimeout(() => el.removeAttribute('data-flash'), 2400);
  };
  const knifeTags = Object.fromEntries(Object.entries(KNIFE_CHECKS).map(([tool, key]) => [
    tool,
    { label: c.checks.find(x => x.key === key)?.tag ?? '', href: `#check-${key}` },
  ])) as Record<ToolId, KnifeTag>;

  const closeMenuAndGo = (href: string) => {
    document.body.classList.remove('menu-open');
    setMenuOpen(false);
    if (!href.startsWith('#')) return;
    const go = () => {
      const el = document.getElementById(href.slice(1));
      const root = document.documentElement;
      const prev = root.style.scrollBehavior;
      root.style.scrollBehavior = 'auto';
      el?.scrollIntoView({ block: 'start' });
      root.style.scrollBehavior = prev;
      history.replaceState(null, '', href);
    };
    requestAnimationFrame(() => requestAnimationFrame(go));
  };

  const privacyHref = withLangParam(process.env.NEXT_PUBLIC_PRIVACY_URL || '/privacy', lang);
  const impressumHref = withLangParam(process.env.NEXT_PUBLIC_IMPRESSUM_URL || '/impressum', lang);
  const navItems = [
    { href: '#checks', label: c.nav.checks },
    { href: '#how', label: c.nav.how },
    { href: '#services', label: c.nav.services },
    { href: '#faq', label: c.nav.faq },
  ] as const;
  const activeSection = useActiveSection(navItems.map(item => item.href.slice(1)));
  const current = (href: string) => (activeSection === href.slice(1) ? 'true' : undefined);
  const navCta = compactNavCta ? c.nav.ctaShort : c.nav.cta;

  return (
    <AuditFormProvider>
      {Motion ? <Motion scope={mainRef} nav={navRef} footer={footerRef} lang={lang} /> : null}
      <a className="skip" href="#main">{c.a11y.skip}</a>
      <header className={`nav ${menuOpen ? 'open' : ''}`} ref={navRef}>
        <div className="wrap nav__in">
          <a className="brand" href="#top">SITEMENDO<b>.</b></a>
          <nav className="nav__links" aria-label={c.a11y.mainNav}>
            {navItems.map(item => <a key={item.href} href={item.href} aria-current={current(item.href)}>{item.label}</a>)}
          </nav>
          <div className="nav__right">
            <LanguageSwitch lang={lang} setLang={setLang} label={c.nav.lang}/>
            <button className="btn btn--sm nav-cta nav-cta--main" type="button" onClick={jumpToForm}>
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
            {navItems.map(item => (
              <a
                key={item.href}
                href={item.href}
                aria-current={current(item.href)}
                onClick={event => {
                  event.preventDefault();
                  closeMenuAndGo(item.href);
                }}
              >{item.label}</a>
            ))}
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
              {c.hero.place && <p className="hero__place">{c.hero.place}</p>}
            </div>
            <div className="hero__art">
              <HeroKnife label={c.a11y.knife} tags={knifeTags} onPick={tool => pickCheck(KNIFE_CHECKS[tool])}>{knife}</HeroKnife>
            </div>
            <div className="hero__form">
              <AuditForm lang={lang} idPrefix="hero" privacyHref={privacyHref} intro/>
            </div>
          </div>
        </section>

        <Section id="report" tone="dark">
          <div className="report-layout">
            <div className="report-copy">
              <h2 className="h2">{c.reportTitle}</h2>
              <p className="lead" data-reveal>{c.reportSub}</p>
              <p className="report-note" data-reveal>{c.sampleReport.note}</p>
            </div>
            <SampleReport lang={lang}/>
          </div>
        </Section>

        <section className="sec about" id="about">
          <div className="wrap about__wrap">
            <div className="about__copy">
              <h2 className="h2">{c.about.title}</h2>
              <p className="lead" data-reveal>{c.about.p1}</p>
              <p className="lead" data-reveal>{c.about.p2}</p>
            </div>
            <SelfProof lang={lang}/>
          </div>
        </section>

        <Section id="checks">
          <div className="section-intro">
            <h2 className="h2">{c.checksTitle}</h2>
            <p className="lead" data-reveal>{c.checksSub}</p>
          </div>
          <div className="checks">
            {c.checks.map(x => (
              <div className="check" id={`check-${x.key}`} key={x.key}>
                <CheckIcon name={x.key}/>
                <p className="check__tag">{x.no} · {x.tag}</p>
                <h3 className="check__title">{x.title}</h3>
                <p className="check__desc">{x.desc}</p>
              </div>
            ))}
          </div>
          <p className="checks-note" data-reveal>{c.checksNote}</p>
        </Section>

        <Section id="how" tone="dark">
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
        </Section>

        <Section id="services">
          <div className="section-intro">
            <h2 className="h2">{c.servicesTitle}</h2>
            <p className="lead" data-reveal>{c.servicesLead}</p>
          </div>
          {/* Sıra müşterinin yolu: ücretsiz kontrol → hızlı düzeltme ya da onarım → bakım.
              Ücretli paketlerde satın alma düğmesi yok; her yol ücretsiz kontrolden geçer.
              Her kartın alt öğe sayısı sabit: masaüstünde satırlar kartlar arasında hizalanır (subgrid). */}
          <RailDots rail={servicesRef} labels={c.services.map(s => s.name)}/>
          <ol className="services" aria-label={c.servicesTitle} ref={servicesRef}>
            {c.services.map(s => (
              <li className={`service ${s.featured ? 'featured' : ''}`} key={s.no}>
                <p className="service__stage"><span className="service__node" aria-hidden="true"/>{s.stage}</p>
                <h3 className="service__name">{s.name}</h3>
                <p className="service__price">{s.price}</p>
                <p className="service__time">{s.time}</p>
                <p className="service__note">{s.note}</p>
                <div className="service__body">
                  {s.fromChecks && (
                    <ul className="service__chips">
                      {c.checks.map(x => (
                        <li key={x.key}>
                          <a
                            href={`#check-${x.key}`}
                            onClick={e => { e.preventDefault(); pickCheck(x.key); }}
                          >{x.tag}</a>
                        </li>
                      ))}
                    </ul>
                  )}
                  <ul className="service__items">{s.items.map(i => <li key={i}>{i}</li>)}</ul>
                </div>
                <div className="service__foot">
                  {s.scope && <p className="service__scope">{s.scope}</p>}
                  {s.cta && <button className="btn service__cta" type="button" onClick={jumpToForm}>{s.cta}</button>}
                </div>
              </li>
            ))}
          </ol>
          <p className="services-note" data-reveal>{c.pricesNote}</p>
          <div className="services-cta" data-reveal>
            <button className="btn" type="button" onClick={jumpToForm}>{c.servicesCta}</button>
          </div>
        </Section>

        <Section id="faq">
          <h2 className="h2 faq-heading">{c.faqTitle}</h2>
          <FAQList items={c.faq}/>
        </Section>

        <Section id="start" tone="sulfur">
          <div className="final">
            <div className="final__copy">
              <h2 className="h2 h2--lg">{c.final.title}</h2>
              <p className="lead" data-reveal>{c.final.sub}</p>
            </div>
            <div className="final__form">
              <div className="form-panel">
                <AuditForm lang={lang} idPrefix="final" privacyHref={privacyHref}/>
              </div>
            </div>
          </div>
        </Section>
      </main>

      <Footer ref={footerRef} lang={lang} setLang={setLang} privacyHref={privacyHref} impressumHref={impressumHref} navItems={navItems}/>
      <MobileCta label={c.nav.cta} onGo={jumpToForm}/>
    </AuditFormProvider>
  );
}

/* Telefonda alttaki sabit düğme: iki formdan biri ya da footer ekrandayken gizlenir. Küçük
   ekranda hero formu ilk ekranın altında kalabilir; o zaman düğme ilk ekranda da görünür.
   Alt kenar payı, düğmenin kendi örttüğü şeridi "görünür" saymamak için (globals.css, .mcta). */
function MobileCta({ label, onGo }: { label: string; onGo: () => void }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const targets = [...document.querySelectorAll('#top .audit-form, #start, #contact')];
    if (!targets.length) return;
    const inView = new Set<Element>();
    const io = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) inView.add(entry.target);
        else inView.delete(entry.target);
      }
      setShow(inView.size === 0);
    }, { rootMargin: '0px 0px -90px 0px' });
    targets.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
  return (
    <div className="mcta" data-show={show || undefined} inert={!show}>
      <button className="btn" type="button" onClick={onGo}>{label}</button>
    </div>
  );
}

function Section({ tone, id, children }: { tone?: 'dark' | 'sulfur'; id?: string; children: ReactNode }) {
  return (
    <section className={`sec ${tone ? `sec--${tone}` : ''}`} id={id}>
      <div className="wrap">{children}</div>
    </section>
  );
}

function AuditForm({ lang, idPrefix, privacyHref, intro }: { lang: Lang; idPrefix: string; privacyHref: string; intro?: boolean }) {
  const f = content[lang].form;
  const ctx = useContext(AuditFormContext);
  const urlInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const ownedFocus = useRef<'url' | 'email' | 'status' | null>(null);
  /* Formun ekrana geldiği an: gönderime kadar geçen süre bot kontrolünde kullanılır. */
  const openedAt = useRef(0);
  useEffect(() => { openedAt.current = Date.now(); }, []);
  const url = ctx?.url ?? '';
  const normalized = useMemo(() => normalizeWebsite(url), [url]);

  useLayoutEffect(() => {
    const target = ownedFocus.current;
    if (!target) return;
    ownedFocus.current = null;
    if (target === 'url') urlInputRef.current?.focus();
    else if (target === 'email') emailInputRef.current?.focus();
    else statusRef.current?.focus();
  }, [ctx?.step, ctx?.error, ctx?.mode]);

  if (!ctx) throw new Error('AuditForm needs provider');
  const { precheck, runPrecheck, step, email, error, busy, mode, setStep, setUrl, setEmail, setError, setMode, resetForm, editForm, tryBeginSend, endSend } = ctx;
  const precheckView = precheck && precheck.target === normalized ? precheck.view : null;
  const urlId = `${idPrefix}-url`;
  const emailId = `${idPrefix}-email`;
  const errId = `${idPrefix}-error`;
  const titleId = `${idPrefix}-form-title`;
  const statusId = `${idPrefix}-status`;
  const showTitle = Boolean(intro && step === 'url');
  const showLead = step === 'url';
  const failMail = error === f.fail;

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    if (step === 'url') {
      const next = nextUrlStep(url, f.urlErr);
      if (!next.ok) {
        ownedFocus.current = 'url';
        setError(next.error);
        return;
      }
      setError('');
      ownedFocus.current = 'email';
      setStep('email');
      if (normalized) runPrecheck(normalized);
      return;
    }
    if (step !== 'email') return;
    const next = nextEmailStep(email, f.emailErr);
    if (!next.ok) {
      ownedFocus.current = 'email';
      setError(next.error);
      return;
    }
    if (!normalized) {
      ownedFocus.current = 'url';
      setError(f.urlErr);
      setStep('url');
      return;
    }
    if (!tryBeginSend()) return;
    setError('');
    try {
      const trap = e.currentTarget.elements.namedItem('company');
      const result = await submitAuditRequest({
        websiteUrl: normalized,
        email: email.trim(),
        language: lang,
        company: trap instanceof HTMLInputElement ? trap.value : '',
        t: Date.now() - openedAt.current,
      });
      ownedFocus.current = 'status';
      setMode(result);
      setStep('done');
    } catch {
      ownedFocus.current = 'email';
      setError(f.fail);
    } finally {
      endSend();
    }
  }

  function goBack() {
    if (busy) return;
    ownedFocus.current = 'url';
    setError('');
    setStep('url');
  }

  function onEdit() {
    ownedFocus.current = 'url';
    editForm();
  }

  const done = mode ? formDoneView(mode, f) : null;

  return (
    <form className="audit-form" onSubmit={submit} noValidate aria-busy={busy} aria-labelledby={showTitle ? titleId : undefined}>
      <p className="sr-only" aria-live="polite" aria-atomic="true">{busy ? f.sending : ''}</p>
      {/* Bot tuzağı: görünmez ve klavyeyle ulaşılmaz; dolu gelen istek gönderilmez. */}
      <input className="form-hp" type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" defaultValue=""/>
      {showLead && (
        <div className="audit-form__intro">
          {showTitle && <p className="audit-form__title" id={titleId}>{f.title}</p>}
          <p className="audit-form__lead">{f.lead}</p>
        </div>
      )}
      {step === 'url' && (
        <>
          <label className="audit-form__label" htmlFor={urlId}>{f.url}</label>
          <div className="audit-form__field">
            <input
              ref={urlInputRef}
              className="audit-form__input"
              id={urlId}
              name="websiteUrl"
              type="url"
              inputMode="url"
              autoComplete="url"
              placeholder={f.urlPh}
              value={url}
              required
              aria-required="true"
              aria-invalid={!!error}
              aria-describedby={error ? errId : undefined}
              disabled={busy}
              onChange={e => setUrl(e.target.value)}
            />
            {error && <p className="form-error" id={errId} role="alert">{error}</p>}
            <button className="btn" disabled={busy} type="submit">{f.submit}</button>
          </div>
          <p className="audit-form__assure">{f.assure}</p>
          {intro && <a className="audit-form__sample" href="#report">{f.sample}</a>}
          <p className="privacy-note">{f.privacy} <a href={privacyHref}>{f.privacyLink}</a></p>
        </>
      )}
      {step === 'email' && (
        <>
          <p className="h3 ask" id={`${idPrefix}-ask`}>{f.ask}</p>
          <label className="audit-form__label" htmlFor={emailId}>{f.email}</label>
          <div className="audit-form__field">
            <input
              ref={emailInputRef}
              className="audit-form__input"
              id={emailId}
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder={f.emailPh}
              value={email}
              required
              aria-required="true"
              aria-invalid={!!error}
              aria-describedby={error ? errId : undefined}
              disabled={busy}
              onChange={e => setEmail(e.target.value)}
            />
            {error && (
              <p className="form-error" id={errId} role="alert">
                {error}
                {failMail && <>{' '}<a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></>}
              </p>
            )}
            <button className="btn" disabled={busy} type="submit">{busy ? f.sending : f.prepare}</button>
          </div>
          {precheckView && <PrecheckPanel lang={lang} view={precheckView} after="email"/>}
          <p className="privacy-note">{f.privacy} <a href={privacyHref}>{f.privacyLink}</a></p>
          <button className="form-back" type="button" disabled={busy} onClick={goBack}>{f.back}</button>
        </>
      )}
      {step === 'done' && done && (
        <div className="done" ref={statusRef} id={statusId} tabIndex={-1} role="status" aria-live="polite">
          <span className="done__mark" aria-hidden="true"/>
          <div>
            <p className="h3">{done.title}</p>
            <p className="done__text">{done.text}</p>
            {done.live && email && <p className="done__text"><b>{email}</b></p>}
            {precheckView && <PrecheckPanel lang={lang} view={precheckView} after="done"/>}
            <div className="done__actions">
              <button className="form-back" type="button" onClick={onEdit}>{f.edit}</button>
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
  const listRef = useRef<HTMLDivElement>(null);
  const [Reveal, setReveal] = useState<ComponentType<{ scope: RefObject<HTMLDivElement | null>; open: boolean }> | null>(null);
  useEffect(() => {
    if (!open || Reveal) return;
    let cancel = false;
    import('@/components/OpenReveal').then(mod => {
      if (!cancel) setReveal(() => mod.OpenReveal);
    });
    return () => { cancel = true; };
  }, [open, Reveal]);
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
          <b>{String(c.findings.length).padStart(2, '0')}</b>
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
        {Reveal ? <Reveal scope={listRef} open={open} /> : null}
        <div className={`report-checklist ${open ? 'is-open' : ''}`} ref={listRef} aria-hidden={!open}>
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

function fill(template: string, values: Record<string, string | number | undefined>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ''));
}

/* Anında ön kontrolün sonuçları. Satırlar sırayla gelir (CSS, --i); ekran okuyucuya yalnız
   kısa özet okunur. */
function PrecheckPanel({ lang, view, after }: { lang: Lang; view: PrecheckView; after: 'email' | 'done' }) {
  const p = content[lang].precheck;
  const result = typeof view === 'object' ? view : null;
  const counts = { ok: 0, warn: 0, err: 0 };
  result?.items.forEach(item => { counts[item.status] += 1; });
  return (
    <section className="precheck" aria-label={p.title} aria-busy={view === 'loading'} data-state={result ? 'done' : view}>
      <p className="precheck__head">
        <span>{p.title}</span>
        {result && <b>{result.host}</b>}
      </p>
      {view === 'loading' && <p className="precheck__wait">{p.loading}</p>}
      {view === 'unreachable' && <p className="precheck__wait">{p.unreachable}</p>}
      {result && (
        <>
          <ul className="precheck__list">
            {result.items.map((item, i) => (
              <li className={`precheck__item precheck__item--${item.status}`} key={item.id} style={{ '--i': i } as CSSProperties}>
                <span className="precheck__mark" aria-hidden="true"/>
                <span className="sr-only">{p.status[item.status]}:</span>
                <span className="precheck__label">{p.labels[item.id]}</span>
                <span className="precheck__msg">{fill(p.msg[item.code], { value: item.value })}</span>
              </li>
            ))}
          </ul>
          <p className="precheck__note">{after === 'email' ? p.noteEmail : p.noteDone}</p>
        </>
      )}
      <p className="sr-only" aria-live="polite">{result ? fill(p.summary, counts) : ''}</p>
    </section>
  );
}

const PROOF_KEYS = ['performance', 'accessibility', 'bestPractices', 'seo'] as const;
const LOCALES: Record<Lang, string> = { tr: 'tr-TR', en: 'en-GB', de: 'de-DE' };

/* Sitenin kendi Lighthouse sonuçları: sayılar lib/selfCheck.json'dan (npm run measure).
   Halka markanın puan halkası; kaydırınca 0'dan puana kadar çizilir (--p). */
function SelfProof({ lang }: { lang: Lang }) {
  const p = content[lang].about.proof;
  const date = new Intl.DateTimeFormat(LOCALES[lang], { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
    .format(new Date(`${SELF_CHECK.date}T00:00:00Z`));
  const note = p.note.replace('{tool}', SELF_CHECK.tool).replace('{runs}', String(SELF_CHECK.runs)).replace('{date}', date);
  return (
    <aside className="proof" aria-labelledby="proof-title">
      <p className="proof__label">{p.label}</p>
      <h3 className="proof__title" id="proof-title">{p.title}</h3>
      <ul className="proof__scores">
        {PROOF_KEYS.map(key => {
          const score = SELF_CHECK.scores[key];
          return (
            <li className="proof__score" key={key}>
              <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
                <circle className="proof__track" cx="24" cy="24" r="20" pathLength={100}/>
                <circle className="proof__ring" cx="24" cy="24" r="20" pathLength={100} style={{ '--score': score } as CSSProperties}/>
              </svg>
              <b>{score}<span className="sr-only"> / 100</span></b>
              <span className="proof__name">{p.metrics[key]}</span>
            </li>
          );
        })}
      </ul>
      <p className="proof__note">{note}</p>
    </aside>
  );
}

function FAQList({ items }: { items: readonly { q: string; a: string }[] }) {
  return (
    <div className="faq">
      {items.map((item, i) => {
        const qId = `faq-q-${i}`;
        const aId = `faq-a-${i}`;
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
  );
}

function Footer({
  ref, lang, setLang, privacyHref, impressumHref, navItems,
}: {
  ref?: Ref<HTMLElement>;
  lang: Lang;
  setLang: (l: Lang) => void;
  privacyHref: string;
  impressumHref: string;
  navItems: readonly { href: string; label: string }[];
}) {
  const c = content[lang];
  return (
    <footer className="footer" id="contact" ref={ref}>
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
            <a href={withLangParam('/website-check', lang)}>{c.services[0].name}</a>
            <a href={withLangParam('/website-repair', lang)}>{c.services[1].name}</a>
            <a href={withLangParam('/website-repair', lang)}>{c.services[2].name}</a>
            <a href={withLangParam('/website-care', lang)}>{c.services[3].name}</a>
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
        </div>
      </div>
    </footer>
  );
}
