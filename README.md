# Sitemendo

Production-oriented Next.js/React version of the Sitemendo landing page.

## Run locally

Node 22 (`.nvmrc`).

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. The dev server rewrites `/?lang=de` to the language pages like the Worker does; the form API does not run here.

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

Worker secrets (Cloudflare → Worker → Settings → Variables and Secrets, type Secret):

```env
RESEND_API_KEY=re_xxxxxxxx
AUDIT_FROM_EMAIL=Sitemendo <hello@sitemendo.com>
AUDIT_NOTIFY_EMAIL=you@gmail.com
```

If `RESEND_API_KEY` is set, two emails are sent: one to `AUDIT_NOTIFY_EMAIL` and a confirmation to the visitor. Do not set the notify address to `hello@sitemendo.com` if that address only forwards — mail from `hello@` to `hello@` is dropped. Without the key the form returns an error, unless `AUDIT_DEMO_MODE=true` (local only), which reports that nothing was sent. It never fakes a successful live request.

Deploys run on every push to `main` through Workers Builds (build command `npm run build`, deploy command `npx wrangler deploy`). The Worker name in the dashboard must be `sitemendo`.

## Structure

- `app/[lang]/layout.tsx` — metadata, fonts, global shell (one static copy per language)
- `app/[lang]/page.tsx` — homepage entry
- `app/[lang]/privacy`, `app/[lang]/impressum`, `app/[lang]/not-found` — legal and 404 pages
- `worker/index.ts` — language routing, redirects, headers; `worker/audit.ts` — form intake and Resend mail
- `app/globals.css` — responsive Sitemendo design system
- `app/icon.svg` / `app/favicon.ico` / `app/apple-icon.png` / `app/opengraph-image.png` — mark from `lib/mark.json` (`npm run icons`)
- `components/Site.tsx` — page components and interactions
- `lib/content.ts` — Turkish/English/German content model
