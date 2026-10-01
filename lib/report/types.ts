/* Ücretsiz kontrol raporu: sekiz noktanın dışarıdan ölçülebilen sonuçları. Ağ işi
   worker/report.ts'te; burada ve analyze.ts'te ağ gerektirmeyen kurallar duruyor, testler
   bunları doğrudan çağırır. Ölçülemeyen şey ölçülmüş gibi gösterilmez: 'unknown' ya da 'info'. */

import type { PrecheckItem } from '@/lib/precheck';

export type CheckKey = 'mobile' | 'speed' | 'links' | 'https' | 'forms' | 'stack' | 'index' | 'contact';

/* err = acil, warn = orta, ok = uygun, info = bilgi (sorun değil), unknown = ölçülemedi. */
export type CheckStatus = 'err' | 'warn' | 'ok' | 'info' | 'unknown';

export const CHECK_ORDER: CheckKey[] = ['mobile', 'speed', 'links', 'https', 'forms', 'stack', 'index', 'contact'];

export type Finding = {
  key: CheckKey;
  status: CheckStatus;
  /* '<key>.<durum>' biçiminde, copy.ts'te üç dilde karşılığı var. */
  code: string;
  /* Rapor satırında gösterilen kısa değer (ör. "3,2 sn", "2 bağlantı"). */
  value?: string;
  /* Elle eklenen bulgu: metni copy.ts'ten değil, onay sayfasında yazılandan gelir. */
  text?: { t: string; n?: string };
};

export type PageFacts = {
  finalUrl: string;
  status: number;
  responseMs: number;
  https: boolean;
  /* Şifresiz adres HTTPS'e yönleniyor mu; ölçülemediyse null. */
  httpRedirect: boolean | null;
  server: string;
  poweredBy: string;
  xRobots: string;
  head: PrecheckItem[];
  mixedContent: number;
  forms: { count: number; insecure: number; mailto: number };
  contact: { tel: boolean; mail: boolean; contactLink: boolean; impressumLink: boolean; address: boolean };
  stack: { cms: string; generator: string; jquery: string };
  /* Ana sayfadaki aynı alan adına giden bağlantılar, en çok 12. */
  internalLinks: string[];
  truncated: boolean;
};

export type LinkProbe = { url: string; status: number | null };

export type RobotsFacts = { fetched: boolean; blocksAll: boolean; sitemap: boolean | null };

export type PsiFacts = { score: number; lcpMs: number | null; cls: number | null; tbtMs: number | null };

export type ReportInput = {
  page: PageFacts;
  links: LinkProbe[];
  robots: RobotsFacts;
  psi: PsiFacts | null;
};

export type Report = {
  host: string;
  finalUrl: string;
  measuredAt: string;
  findings: Finding[];
  /* Onay sayfasında yazılan not; raporun başında gösterilir. */
  note?: string;
};
