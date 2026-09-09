# Sitemendo

Production-oriented Next.js/React version of the Sitemendo landing page.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Production configuration

Set these in `.env.local` or your hosting provider:

```env
NEXT_PUBLIC_AUDIT_ENDPOINT=https://your-n8n-webhook.example
NEXT_PUBLIC_PRIVACY_URL=/privacy
NEXT_PUBLIC_IMPRESSUM_URL=/impressum
NEXT_PUBLIC_DEMO_MODE=false
```

When `NEXT_PUBLIC_AUDIT_ENDPOINT` is empty and demo mode is true, the form explicitly reports that no data was sent. It never fakes a successful live request.

## Structure

- `app/layout.tsx` — metadata, fonts, global shell
- `app/page.tsx` — homepage entry
- `app/globals.css` — responsive Sitemendo design system
- `components/Site.tsx` — page components and interactions
- `lib/content.ts` — Turkish/English content model

## Before launch

Add real Privacy and Impressum pages/URLs, configure the n8n webhook, test CORS from the deployed domain, and add canonical URL / OG image once the final domain is known.
