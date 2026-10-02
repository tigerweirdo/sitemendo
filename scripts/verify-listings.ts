/**
 * İşletme kayıtları sayfası: dosya lib/company.ts ve lib/content.ts ile uyumlu (güncel), ad, adres ve telefon
 * Impressum'daki değerlerle aynı, açıklamalar sitenin meta açıklamasıdır. Ağ yok.
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';
import { COMPANY, CONTACT_EMAIL, CONTACT_PHONE_DISPLAY } from '../lib/company';
import { content } from '../lib/content';
import { listingsMarkdown } from '../lib/listings';

const FILE = join(import.meta.dirname, '..', 'docs', 'isletme-kayitlari.md');

test('İşletme kayıtları: dosya güncel (npm run listings)', () => {
  assert.equal(readFileSync(FILE, 'utf8'), listingsMarkdown(), 'docs/isletme-kayitlari.md eski: `npm run listings` çalıştırın');
});

test('İşletme kayıtları: ad, adres, telefon ve e-posta Impressum kaynağıyla aynı, açıklamalar meta açıklaması', () => {
  const md = listingsMarkdown();
  for (const value of [COMPANY.legalName, COMPANY.ownerName, COMPANY.street, COMPANY.postalCode, COMPANY.city, CONTACT_PHONE_DISPLAY, CONTACT_EMAIL]) {
    assert.ok(md.includes(`\`${value}\``), `değer yok: ${value}`);
  }
  for (const lang of ['de', 'tr', 'en'] as const) assert.ok(md.includes(content[lang].meta.description), `${lang} açıklaması`);
  /* Fiyat ya da vaat içeren yeni metin eklenmesin: yalnız sitenin kendi metni. */
  assert.ok(!/€|\bEUR\b|garanti/i.test(md), 'fiyat ya da vaat');
});
