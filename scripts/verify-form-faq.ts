/**
 * Form ve SSS metinleri + form durumları.
 * Gerçek /api/audit çağrısı yok; fetch mock’lanır. E-posta gönderilmez.
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { normalizeWebsite, validEmail } from '../lib/auditRequest';
import { content, type Lang } from '../lib/content';
import {
  createSendLock,
  formDoneView,
  keepFieldsOnFail,
  nextEmailStep,
  nextUrlStep,
  parseAuditResponse,
  submitAuditRequest,
} from '../lib/formFlow';

const LANGS: Lang[] = ['tr', 'en', 'de'];

const FORM = {
  tr: {
    urlErr: 'Geçerli bir site adresi girin. Örnek: siteadi.com',
    emailErr: 'Geçerli bir e-posta adresi girin.',
    sending: 'Talebiniz gönderiliyor…',
    done: 'Talebiniz alındı.',
    doneText: 'Kontrol raporunuzu 48 saat içinde belirttiğiniz e-posta adresine göndereceğiz.',
    fail: 'Talebiniz gönderilemedi. Lütfen tekrar deneyin veya e-posta ile bize ulaşın.',
  },
  en: {
    urlErr: 'Enter a valid website address. Example: yoursite.com',
    emailErr: 'Enter a valid email address.',
    sending: 'Your request is being sent…',
    done: 'Your request has been received.',
    doneText: 'We will send your check report within 48 hours to the email address you provided.',
    fail: 'Your request could not be sent. Please try again or contact us by email.',
  },
  de: {
    urlErr: 'Geben Sie eine gültige Website-Adresse ein. Beispiel: ihre-seite.de',
    emailErr: 'Geben Sie eine gültige E-Mail-Adresse ein.',
    sending: 'Ihre Anfrage wird gesendet…',
    done: 'Ihre Anfrage ist eingegangen.',
    doneText: 'Den Prüfbericht senden wir innerhalb von 48 Stunden an die angegebene E-Mail-Adresse.',
    fail: 'Ihre Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder schreiben Sie uns eine E-Mail.',
  },
} as const;

const FAQ_TOPICS = [
  { tr: 'Ücretsiz kontrol ne içeriyor', en: 'What does the free check include', de: 'Was umfasst die kostenlose Prüfung' },
  { tr: 'Rapor ne zaman geliyor', en: 'When does the report arrive', de: 'Wann kommt der Bericht' },
  { tr: 'Düzeltme hizmeti almak zorunlu mu', en: 'Is repair work required', de: 'Muss ich die Reparatur beauftragen' },
  { tr: 'Düzeltme ücreti nasıl belirleniyor', en: 'How is the repair fee set', de: 'Wie wird die Reparaturgebühr festgelegt' },
  { tr: 'Siteye erişim bilgisi gerekiyor mu', en: 'Do you need access to the site', de: 'Werden Zugangsdaten zur Website benötigt' },
  { tr: 'Hangi siteler destekleniyor', en: 'Which websites do you support', de: 'Welche Websites werden unterstützt' },
  { tr: 'Hangi dillerde hizmet veriliyor', en: 'Which languages do you work in', de: 'In welchen Sprachen wird der Service angeboten' },
] as const;

const FORBIDDEN = /shopify|wix|squarespace|joomla|drupal|webflow|prestashop|garanti(?!ert)|guarantee|garantie|sicherheitsgarantie/i;

test('üç dilde form mikro metinleri', () => {
  for (const lang of LANGS) {
    const f = content[lang].form;
    const expected = FORM[lang];
    assert.equal(f.urlErr, expected.urlErr);
    assert.equal(f.emailErr, expected.emailErr);
    assert.equal(f.sending, expected.sending);
    assert.equal(f.done, expected.done);
    assert.equal(f.doneText, expected.doneText);
    assert.equal(f.fail, expected.fail);
    assert.match(f.lead, lang === 'tr' ? /ikisi de gerekir/ : lang === 'en' ? /both are needed/ : /beides ist erforderlich/);
    assert.doesNotMatch(f.demo, /Talebiniz alındı|has been received|ist eingegangen/);
    assert.doesNotMatch(f.demoNote, /48/);
  }
});

test('SSS yedi konu, doğrulanmış koşullar', () => {
  for (const lang of LANGS) {
    const faq = content[lang].faq;
    assert.equal(faq.length, 7);
    FAQ_TOPICS.forEach((topic, i) => {
      assert.match(faq[i].q, new RegExp(topic[lang], 'i'));
    });
    const blob = faq.map(item => `${item.q} ${item.a}`).join('\n');
    assert.match(blob, /48/);
    assert.match(blob, /250/);
    assert.match(blob, /450/);
    assert.match(blob, /79/);
    assert.match(blob, /WordPress/i);
    assert.match(faq[0].a, /sekiz|8|eight|acht/i);
    assert.doesNotMatch(blob, FORBIDDEN);
    assert.doesNotMatch(blob, /Shopify|Wix|Joomla|Drupal|Webflow/);
  }
});

test('geçersiz site ve e-posta alanları bilgileri korur', () => {
  const url = 'not a site';
  const email = 'yanlis@';
  assert.equal(normalizeWebsite(url), null);
  assert.equal(validEmail(email), false);
  const urlNext = nextUrlStep(url, FORM.tr.urlErr);
  assert.equal(urlNext.ok, false);
  assert.equal(urlNext.error, FORM.tr.urlErr);
  const emailNext = nextEmailStep(email, FORM.tr.emailErr);
  assert.equal(emailNext.ok, false);
  assert.equal(emailNext.error, FORM.tr.emailErr);
  assert.ok(nextUrlStep('siteadi.com', FORM.tr.urlErr).ok);
  assert.ok(nextEmailStep('ad@sirketiniz.com', FORM.tr.emailErr).ok);
});

test('demo canlı başarı metni göstermez', () => {
  const f = content.tr.form;
  const demo = formDoneView('demo', f);
  const live = formDoneView('live', f);
  assert.equal(demo.live, false);
  assert.equal(demo.title, f.demo);
  assert.equal(demo.text, f.demoNote);
  assert.notEqual(demo.title, f.done);
  assert.notEqual(demo.text, f.doneText);
  assert.equal(live.live, true);
  assert.equal(live.title, f.done);
  assert.equal(live.text, f.doneText);
});

test('sunucu yanıtları: demo, live, hata', () => {
  assert.equal(parseAuditResponse(true, { mode: 'demo' }), 'demo');
  assert.equal(parseAuditResponse(true, { mode: 'live' }), 'live');
  assert.throws(() => parseAuditResponse(false, { mode: 'live' }));
  assert.throws(() => parseAuditResponse(true, { mode: 'ok' }));
  assert.throws(() => parseAuditResponse(true, null));
});

test('hata durumunda girilmiş bilgiler kalır', () => {
  const kept = keepFieldsOnFail({ url: 'siteadi.com', email: 'ad@sirketiniz.com' }, FORM.tr.fail);
  assert.equal(kept.url, 'siteadi.com');
  assert.equal(kept.email, 'ad@sirketiniz.com');
  assert.equal(kept.step, 'email');
  assert.equal(kept.error, FORM.tr.fail);
  assert.equal(kept.mode, null);
});

test('gönderim kilidi çift başvuruyu engeller', () => {
  const lock = createSendLock();
  assert.equal(lock.tryLock(), true);
  assert.equal(lock.tryLock(), false);
  assert.equal(lock.isLocked(), true);
  lock.unlock();
  assert.equal(lock.tryLock(), true);
});

test('submitAuditRequest mock fetch: demo / live / 502 — gerçek ağ yok', async () => {
  const original = globalThis.fetch;
  let calls = 0;
  const payload = { websiteUrl: 'https://siteadi.com/', email: 'ad@sirketiniz.com', language: 'tr' };

  async function withFetch(impl: typeof fetch, run: () => Promise<void>) {
    globalThis.fetch = impl;
    try {
      await run();
    } finally {
      globalThis.fetch = original;
    }
  }

  await withFetch(async () => {
    calls += 1;
    return new Response(JSON.stringify({ mode: 'demo' }), { status: 200 });
  }, async () => {
    assert.equal(await submitAuditRequest(payload), 'demo');
  });

  await withFetch(async () => {
    calls += 1;
    return new Response(JSON.stringify({ mode: 'live' }), { status: 200 });
  }, async () => {
    assert.equal(await submitAuditRequest(payload), 'live');
  });

  await withFetch(async () => {
    calls += 1;
    return new Response(JSON.stringify({ error: 'fail' }), { status: 502 });
  }, async () => {
    await assert.rejects(() => submitAuditRequest(payload));
  });

  await withFetch(async () => {
    calls += 1;
    throw new Error('network should stay mocked');
  }, async () => {
    const lock = createSendLock();
    assert.equal(lock.tryLock(), true);
    assert.equal(lock.tryLock(), false);
  });

  assert.equal(calls, 3);
  assert.equal(typeof original, 'function');
});
