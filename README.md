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

## Structure

```
src/
├─ app/
│  ├─ globals.css        Tailwind + brand tokens (light/dark/RTL)
│  └─ [lang]/            root layout — owns <html lang dir>
├─ components/
├─ lib/
│  ├─ fonts.ts
│  └─ i18n/config.ts
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
2. Content layer: split UI copy from CMS entities behind `lib/cms/`
3. Shared chrome: Header, Footer, theme toggle
4. Static pages: About, Experience, Achievements, Testimonials, Certifications
5. Home
6. Projects + `projects/[slug]`
7. Blog + `blog/[slug]`
8. `sitemap.ts`, `robots.ts`, metadata, hreflang
9. Deploy to Vercel on mock data
10. Swap mock → WordPress (WPGraphQL) behind an env var, add ISR
