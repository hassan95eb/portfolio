# Portfolio Website

A modern, luxury-themed personal portfolio website built with Next.js (App Router), React, TypeScript, and Tailwind CSS. The repo provides a clean starting point and a set of reusable components to build a responsive, animated portfolio.

## 🚀 Tech Stack

-  **Next.js**: 15.5.7 (App Router)
-  **React**: 19.1.0
-  **TypeScript**: ^5
-  **Styling**: Tailwind CSS v4
-  **Animations**: Framer Motion
-  **Utilities**: `react-icons`, `canvas-confetti`, `@formspree/react`
-  **Build**: Turbopack (used in dev/build scripts)

## 🎨 Theme

This project uses a luxury-inspired palette (teal / gold / rose gold accents) and custom fonts (Geist Sans & Geist Mono). The visual system is implemented via Tailwind utility classes in `src/app/globals.css`.

## 📁 Project Structure (selected)

```
.
├── package.json
├── public/
└── src/
		└── app/
				├── layout.tsx
				├── page.tsx
				├── loading.tsx
				├── not-found.tsx
				├── globals.css
				└── db.json
		└── components/
				├── AboutSection.tsx
				├── AboutSectionSocial.tsx
				├── AnimatedBackground.tsx
				├── ContactMe.tsx
				├── ContactMeForm.tsx
				├── HomeSection.tsx
				├── MobileNav.tsx
				├── MouseParticles.tsx
				├── ScrollLink.tsx
				├── SidbarLinks.tsx
				├── SideBar.tsx
				├── SocialWidget.tsx
				└── Terminal.tsx
```

## 🛠️ Prerequisites

-  Node.js 18 or newer
-  npm (or yarn)

## 🔧 Installation & Local Development

Clone and install dependencies:

```bash
git clone <your-repo-url>
cd portfolio
npm install
```

Run the development server (Turbopack):

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## 📜 Scripts

```json
{
   "dev": "next dev --turbopack",
   "build": "next build --turbopack",
   "start": "next start",
   "lint": "eslint"
}
```

-  **dev**: Starts the Next.js dev server using Turbopack
-  **build**: Builds the production app
-  **start**: Starts the production server after build
-  **lint**: Run ESLint checks

## 📦 Dependencies (high level)

-  `next` 15.5.7, `react` 19.1.0, `react-dom` 19.1.0
-  `tailwindcss` v4 for styling
-  `framer-motion` for animations
-  `react-icons` for iconography
-  `canvas-confetti`, `@formspree/react` for fun/utility integrations

See `package.json` for the full list and exact versions.

## ✅ Current Status

-  Project scaffolded with Next.js + App Router
-  TypeScript configured
-  Tailwind CSS v4 integrated
-  Several UI components implemented under `src/components`

## 🎯 Planned Features

-  Hero/Home section with animated background
-  About section with social integrations
-  Projects and Experience sections
-  Contact form (Formspree integration)
-  Smooth animations and responsive interactions

## 🧭 Development Notes

-  Global styles and fonts are defined in `src/app/globals.css`.
-  The app entry is `src/app/layout.tsx` and the home page is `src/app/page.tsx`.
-  Component list lives in `src/components/` and is intentionally small and reusable.

## Contributing / Next Steps

-  Work on the remaining page sections (Projects, Experience)
-  Add unit / integration tests if desired
-  Add CI for linting and build checks

If you'd like, I can:

-  Add a detailed component README
-  Wire up a sample project entry page
-  Add basic unit tests and a GitHub Actions CI workflow

## License

Private — personal portfolio.

---

Built with ❤️ using Next.js, React and Tailwind CSS
