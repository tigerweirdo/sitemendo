/**
 * Impressum: die Angabe der verantwortlichen Person nach § 18 Abs. 2 MStV steht in allen drei Sprachen auf der Seite,
 * mit Name und Anschrift aus COMPANY (eine Quelle), und nur im Impressum, nicht in der Datenschutzerklärung. Ağ yok.
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { LegalPage } from '../components/LegalPage';
import { COMPANY } from '../lib/company';
import { content } from '../lib/content';
import { LANGS } from '../lib/lang';

const count = (haystack: string, needle: string) => haystack.split(needle).length - 1;

test('Impressum: sorumlu kişi satırı (§ 18 Abs. 2 MStV) üç dilde, ad ve adres COMPANY\'den', () => {
  for (const lang of LANGS) {
    const { responsible } = content[lang].legal;
    assert.match(responsible, /§ 18/, `${lang} başlık`);
    assert.match(responsible, /MStV/, `${lang} başlık`);

    const html = renderToStaticMarkup(createElement(LegalPage, { type: 'impressum', initialLang: lang }));
    assert.ok(html.includes(`<h2>${responsible}</h2>`), `${lang}: başlık sayfada`);
    /* Hizmet sağlayıcı bölümü ve sorumlu kişi bölümü: ad ve adres iki kez. */
    assert.equal(count(html, COMPANY.ownerName), 2, `${lang}: ad iki kez`);
    assert.equal(count(html, COMPANY.street), 2, `${lang}: sokak iki kez`);
    assert.equal(count(html, `${COMPANY.postalCode} ${COMPANY.city}`), 2, `${lang}: posta kodu ve şehir iki kez`);

    const privacy = renderToStaticMarkup(createElement(LegalPage, { type: 'privacy', initialLang: lang }));
    assert.ok(!privacy.includes(responsible), `${lang}: gizlilik sayfasında yok`);
  }
});
