# Hassan Amini — Portfolio

Frontend for hassanamini.dev. Next.js 15 (App Router) on Vercel, with a
headless WordPress backend supplying projects and blog posts.

## Stack

- Next.js 15 · React 19 · TypeScript
- Tailwind CSS v4 (brand tokens in `src/app/globals.css`)
- `motion` for animation, `lucide-react` for icons
- Fonts via `next/font`: Space Grotesk + Manrope (Latin), Vazirmatn (Persian)

## Internationalization

Every page lives under a language segment — `/en/...` and `/fa/...`.
Language is read from the URL, never from client state, so each language
has its own indexable URL, its own `<html lang>`/`dir`, and shareable links.

`src/middleware.ts` redirects unprefixed paths, preferring a stored choice,
then `Accept-Language`, then English.

The header's EN / فارسی switch is currently hidden behind
`SHOW_LANGUAGE_TOGGLE` in `src/lib/site.ts` while the Persian copy is under
review. Both languages are still built, served and listed in the sitemap —
only the control is hidden, so shared `/fa` links keep working. Set the flag
back to `true` to bring the switch back.

## Content layers

Text lives in one of three places, and which one is not a matter of taste:

| Layer | Holds | Changes |
|---|---|---|
| `src/i18n/ui.ts` | Interface copy — labels, buttons, headings, form fields, toasts | With the design |
| `src/content/profile.ts` | Standing profile content — skills, metrics, principles, focus areas | Once or twice a year |
| `src/lib/cms/` | Entities — projects, posts, experience, testimonials, certifications | Continuously, by an editor |

Only the third layer moves to WordPress. Pages never import a content
source directly; they call `cms()` and get an adapter back. Swapping the
mock for WPGraphQL therefore touches `src/lib/cms/index.ts` and nothing
else — which is why every adapter method is already `async`.

Category labels are translated but category *slugs* are not, so filters
and URLs key off the slug and survive a language switch. Project and post
slugs are identical across languages for the same reason.

## Structure

```
src/
├─ app/
│  ├─ globals.css        Tailwind + brand tokens (light/dark/RTL)
│  └─ [lang]/            root layout — owns <html lang dir>
├─ components/
│  ├─ home/              sections only Home renders
│  └─ sections/          sections shared across pages
├─ content/profile.ts    standing profile content
├─ i18n/ui.ts            interface copy (en/fa, fa typed as typeof en)
├─ lib/
│  ├─ fonts.ts
│  ├─ i18n/config.ts
│  └─ cms/
│     ├─ types.ts        the contract the UI consumes
│     ├─ adapter.ts      CmsAdapter interface
│     ├─ mock.ts         content extracted from the Figma export
│     ├─ mock-adapter.ts
│     └─ index.ts        cms() — the one place the source is chosen
└─ middleware.ts
```

## Develop

```bash
npm install
npm run dev
```

Then open http://localhost:3000 — it redirects to `/en` or `/fa`.

## Roadmap

1. ✅ Scaffold: Next.js, Tailwind v4, brand tokens, fonts, `[lang]` routing
2. ✅ Content layer: UI copy, profile content and CMS entities separated
3. ✅ Shared chrome: Header, Footer, theme and language toggles
4. ✅ Home — the seven sections of the Figma home frame
5. ✅ Static pages: About, Experience, Achievements, Testimonials, Certifications
6. ✅ Projects + `projects/[slug]`
7. 🚧 Blog — placeholder page is live and `noindex`; the index and
   `blog/[slug]` are still to build
8. ✅ `sitemap.ts`, `robots.ts`, metadata, hreflang
9. ✅ Contact page — channels plus a form that posts to `/api/contact` and
   sends server-side
10. Deploy to Vercel on mock data
11. Swap mock → WordPress (WPGraphQL) behind an env var, add ISR

## Contact form

`POST /api/contact` sends the message server-side. The visitor needs no mail
client, and the sending credential never reaches the browser — which is the
whole reason this is a route handler rather than a client-side call to an
email service. Any browser-side integration has to ship its key in the
bundle, where anyone can read it and spend the quota.

The endpoint validates, silently accepts and drops anything that fills the
honeypot field, and rate-limits per IP as a best effort — that counter lives
in one server instance's memory, so it is a speed bump rather than a
guarantee.

Everything provider-specific is in `src/lib/email.ts`. There are three
transports, chosen from the environment:

| `CONTACT_TRANSPORT` | Uses | Good for |
|---|---|---|
| `smtp` | Any SMTP server via nodemailer | Your own domain's mailbox, an Iranian host, or Gmail with an App Password. Nothing to sign up for that may be unavailable to you. |
| `resend` | Resend's REST API | One POST, no dependency. Needs a Resend account. |
| `log` | The server console | Local development with no provider and no outbound network. |

Unset, SMTP wins when `SMTP_HOST` is set, otherwise Resend when
`RESEND_API_KEY` is. Adding a provider means one more branch here and nothing
above it.

`from` is always a mailbox you control, never the visitor's address: sending
as somebody else's domain fails SPF and DKIM and lands in spam. The visitor's
address goes in `Reply-To`, so hitting reply answers them directly.

`log` is **refused when `NODE_ENV=production`**, and that refusal is the point
of it. A form that reports "sent" while dropping the message is worse than no
form — the visitor believes they reached you and neither of you finds out
otherwise. In production, an unconfigured transport returns 503 and the page
tells the visitor the send failed and shows the direct address. Every failure
path ends with the address on screen.

### Testing it locally

The outbound connection is made by whatever machine runs the server. Under
`npm run dev` that is your own, so a provider your network cannot reach will
fail locally and work perfectly once deployed. To exercise the form without
that variable:

```bash
echo "CONTACT_TRANSPORT=log" >> .env.local
npm run dev
```

The submitted message is printed to the terminal running the dev server.

## Environment

See `.env.example`. None of these may be prefixed `NEXT_PUBLIC_` — that
inlines them into the browser bundle, where a credential is readable and
spendable by anyone.

`NEXT_PUBLIC_SITE_URL` must be set in the deploy environment: canonical tags,
hreflang and the sitemap are only honoured as absolute URLs, and the
localhost fallback in `lib/site.ts` would be wrong in production.
