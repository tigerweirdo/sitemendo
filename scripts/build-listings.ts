/* docs/isletme-kayitlari.md dosyasını lib/listings.ts'ten yazar: `npm run listings`. */
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { listingsMarkdown } from '../lib/listings';

const file = join(import.meta.dirname, '..', 'docs', 'isletme-kayitlari.md');
writeFileSync(file, listingsMarkdown());
console.log(`yazıldı: ${file}`);
