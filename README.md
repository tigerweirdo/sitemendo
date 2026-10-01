# Sitemendo

Production-oriented Next.js/React version of the Sitemendo landing page.

## Run locally

Node 22 (`.nvmrc`).

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. The dev server rewrites `/?lang=de` to the language pages like the Worker does; the form API does not run here.

Checks (the same run on GitHub for every push, `.github/workflows/check.yml`):

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

To run the real setup (static pages + Worker + form API) locally:

```bash
cp .env.example .dev.vars
npm run preview
```

Open `http://127.0.0.1:8787`.

## Hosting: Cloudflare Workers

`next build` writes static HTML for every language to `out/` (`/tr`, `/de/privacy`, …). `worker/index.ts` serves them at the public addresses:

- `/`, `/privacy`, `/impressum` pick the language from `?lang=`, then the `sitemendo.lang` cookie; without either, a browser preferring German or English is redirected to `?lang=de` / `?lang=en`, everything else gets Turkish.
- `www.sitemendo.com` redirects to `sitemendo.com`; `/de` style addresses redirect to `/?lang=de`; unknown addresses get the localized 404 page.
- Security headers (CSP etc.) are set here. `/_next/static/*` is served without the Worker (`wrangler.jsonc`, `public/_headers`).
- `POST /api/audit` is the form (`worker/audit.ts`).

Keep per-request work small: the free plan allows 10 ms CPU per request. Pages must stay static.

The form limits (5 requests per IP in 10 minutes, 2 confirmations per address a day) live in Worker memory and reset with the instance. A Cloudflare rate limiting rule on `/api/audit` (Security → Security rules → Create rule → Rate limiting rules; free plan: one rule, 10 s window, counted per IP) adds a limit at the edge. Failed sends are logged by Resend error type only (Worker → Observability).

Worker secrets (Cloudflare → Worker → Settings → Variables and Secrets, type Secret):

```env
RESEND_API_KEY=re_xxxxxxxx
AUDIT_FROM_EMAIL=Sitemendo <hello@sitemendo.com>
AUDIT_NOTIFY_EMAIL=you@gmail.com
```

If `RESEND_API_KEY` is set, two emails are sent: one to `AUDIT_NOTIFY_EMAIL` and a confirmation to the visitor. Do not set the notify address to `hello@sitemendo.com` if that address only forwards — mail from `hello@` to `hello@` is dropped. Without the key the form returns an error, unless `AUDIT_DEMO_MODE=true` (local only), which reports that nothing was sent. It never fakes a successful live request.

Deploys run on every push to `main` through Workers Builds (build command `npm run build`, deploy command `npx wrangler deploy`). The Worker name in the dashboard must be `sitemendo`.

## Free check report (Workflow)

After the form is accepted, `worker/audit.ts` starts a Cloudflare Workflow (`worker/report.ts`, binding `REPORT_WORKFLOW` in `wrangler.jsonc`). It measures what is visible from the outside: the homepage and up to 12 internal links, `robots.txt`/sitemap, and a mobile Google PageSpeed run, then builds the eight-point report (`lib/report/*`, texts in TR/DE/EN in `lib/report/copy.ts`). Nothing is invented: what could not be measured is shown as "not measurable".

Default mode (`REPORT_SEND_MODE` empty): the report is emailed to `AUDIT_NOTIFY_EMAIL` only, with a **review and send** link. The link opens an editor page (GET changes nothing, so email link scanners are harmless). On it you can untick a finding that is wrong, add a note (shown at the top of the report) and write up to three extra findings for things the automatic check cannot see; the button (POST) then sends the edited report to the visitor. Sending without touching anything sends the report as it appears in the email. A **Preview** button shows the edited report as the visitor will get it (with a sample site name, nothing is sent) and sends from there. No click, no send.

Safety nets: if the Workflow stops on an unexpected error you get an alert mail with the customer, the site and the manual tools; if the report is still not approved after 36 hours you get a reminder (about 12 hours before the promised 48); after another 36 hours the report is not sent and you are told. `REPORT_APPROVAL_WAIT` (e.g. `6 seconds`) shortens the 36 hours for local testing only. The findings travel inside the signed link (HMAC over instance, language and findings) and the edits travel with the approval event, so no database is needed (`lib/report/edit.ts`, `worker/approve.ts`). `REPORT_SEND_MODE=customer` sends straight to the visitor with a blind copy to you.

Worker secrets (in addition to the ones above): `PSI_API_KEY` (Google PageSpeed; without it speed is "not measurable"), `REPORT_APPROVAL_SECRET` (signs the approve links; without it nothing is sent automatically).

Free plan: 10 ms CPU per step (network waiting does not count). All HTML parsing is linear and bounded (`lib/report/analyze.ts`, tested against hostile input in `scripts/verify-report.ts`). Workflow state is kept up to 3 days. Local run (Node 22): `npx wrangler dev --var REPORT_APPROVAL_SECRET:local` with the demo `.dev.vars`; no mail is sent without `RESEND_API_KEY`.

## Guides (Ratgeber)

German guides at `/ratgeber` (hub) and `/ratgeber/<slug>`, written for search intent: one problem, one answer, sourced and dated. Four of them also exist in Turkish at `/rehber` and `/rehber/<slug>` (a pilot, adapted for Turkish-speaking business owners in Germany; the text is AI-written and must be read by a person before it is released). Strategy, topic map, measurement plan and the freshness calendar: `docs/seo-strategie.md`.

- One file per guide in `lib/guides/<slug>.ts` (German) or `lib/guides/tr/<slug>.ts` (Turkish: `lang: 'tr'` and `translationOf: '<german slug>'`). Typed blocks: paragraph, list, steps, table, note, code; inline `**bold**`, `` `code` ``, `[text](url)`. Registered in `lib/guides/index.ts` (the order per language decides the footer and the hub); labels and headings per language in `lib/guides/ui.ts`. Prices and times are never typed into the copy: use `{price.quick}`, `{time.quick}` and so on (they come from the package cards in `content.ts`, per language).
- Own root layouts (`app/ratgeber/layout.tsx` `<html lang="de">`, `app/rehber/layout.tsx` `<html lang="tr">`), static HTML without client JS, Article + BreadcrumbList JSON-LD, canonical to itself (no `?lang=`). A German guide and its Turkish counterpart point at each other with hreflang (`de`, `tr`, `x-default` = German); guides without a counterpart have none. The Worker serves `/ratgeber`, `/rehber` and their guides; an unknown slug gets the 404 in the language of the path.
- Tables turn into cards below 640 px (each cell shows its column header). German and Turkish service pages show matching guides of their own language (`lib/guides/related.ts`; English pages show none); the homepage footer links to the hub of its language (English: the German hub).
- `npm test` runs `scripts/verify-guides.ts`: unique addresses, translation pairs and hreflang, meta lengths, per-language rules (German "Sie", „…“, "91 %"; Turkish "siz", “…”, "%91"), no fixed prices, no hype, every internal link and anchor resolves, JSON-LD, sitemap, rendered HTML (one H1, heading order, anchors).
- `npm run check:links` checks every external address of the guides live (network, not part of `npm test`); `npm run check:freshness` lists date-bound statements that are due (PHP end of support, Chrome 154, certificate lifetimes, DMARC policies, legal references). Run both now and then; a new date-bound statement needs a rule in `scripts/check-guide-freshness.ts`.

## Structure

- `app/[lang]/layout.tsx` — metadata, fonts, global shell (one static copy per language)
- `app/[lang]/page.tsx` — homepage entry
- `app/[lang]/privacy`, `app/[lang]/impressum`, `app/[lang]/not-found` — legal and 404 pages
- `worker/index.ts` — language routing, redirects, headers; `worker/audit.ts` — form intake and Resend mail
- `app/globals.css` — responsive Sitemendo design system
- `app/icon.svg` / `app/favicon.ico` / `app/apple-icon.png` — mark from `lib/mark.json` (`npm run icons`)
- `public/og/{tr,de,en}.png` — share image per language (`scripts/build-og.mjs`); alt text in `content.ts` (`meta.ogAlt`)
- `components/Site.tsx` — page components and interactions
- `lib/content.ts` — Turkish/English/German content model
- `lib/servicePages.ts`, `components/ServicePage.tsx`, `components/ServiceRoute.tsx`, `app/[lang]/website-{check,repair,care}` — three service pages for search intent (`/website-check`, `/website-repair`, `/website-care`); text is in `servicePages.ts`, prices and times come from the package cards in `content.ts` and are never repeated in the copy
- `lib/guides/`, `lib/guides/tr/`, `components/guide/`, `app/ratgeber/`, `app/rehber/` — German guides and the Turkish pilot (see above); `scripts/verify-guides.ts`, `scripts/check-guide-links.ts`, `scripts/check-guide-freshness.ts`
- `lib/report/` — free check report: page analysis, thresholds, texts, emails, approval token; `worker/report.ts` (Workflow), `worker/reportNet.ts` (network), `worker/approve.ts` (approval page)
