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
NEXT_PUBLIC_PRIVACY_URL=/privacy
NEXT_PUBLIC_IMPRESSUM_URL=/impressum
NEXT_PUBLIC_DEMO_MODE=false
RESEND_API_KEY=re_xxxxxxxx
AUDIT_FROM_EMAIL=Sitemendo <hello@sitemendo.com>
AUDIT_NOTIFY_EMAIL=you@gmail.com
```

The form posts to `/api/audit`. If `RESEND_API_KEY` is set, two emails are sent: one to `AUDIT_NOTIFY_EMAIL` and a confirmation to the visitor. Do not set the notify address to `hello@sitemendo.com` if that address only forwards — mail from `hello@` to `hello@` is dropped. If the key is missing and demo mode is true, the form reports that nothing was sent. It never fakes a successful live request.

Before going live, verify `sitemendo.com` in [Resend](https://resend.com) and use that domain in `AUDIT_FROM_EMAIL`. The onboarding sender (`beth.t@example.com`) can only reach the Resend account email.

## Structure

- `app/layout.tsx` — metadata, fonts, global shell
- `app/page.tsx` — homepage entry
- `app/api/audit/route.ts` — form intake and Resend mail
- `app/globals.css` — responsive Sitemendo design system
- `components/Site.tsx` — page components and interactions
- `lib/content.ts` — Turkish/English/German content model

## Before launch

Add the Resend key on Vercel, turn demo mode off, finish Privacy and Impressum, and add a canonical URL / OG image once the final domain is known.
