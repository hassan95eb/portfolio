import type { CmsData } from "./types";
import type { Lang } from "@/lib/i18n/config";

/**
 * Content extracted verbatim from the Figma export's translations.ts.
 *
 * This is the CMS stand-in: it lets every page, route and type be built
 * and deployed before WordPress exists. Step 10 adds `wordpress.ts`
 * implementing the same adapter, and this file stops being read.
 *
 * Slugs are identical across languages on purpose — that is what lets the
 * language switcher stay on the same project or post.
 */

const en: CmsData = {
  projects: [
    {
      slug: "seo-lens",
      title: "SEO Lens",
      summary: "SEO Lens checks a web page, highlights visible elements linked to SEO findings, and prepares reports in English or Persian for review and follow-up.",
      description: "An issue list is only part of an audit. Finding the image, link, or heading behind each finding takes time too. I built SEO Lens to connect findings with their location on the page and make the results easier to hand over to a developer or client.",
      role: "Designer & Developer",
      stack: [
        "JavaScript",
        "Chrome Extensions (Manifest V3)",
        "HTML & CSS",
        "Shadow DOM",
        "Browser Performance APIs",
        "OffscreenCanvas",
        "Playwright",
      ],
      highlights: [
        "Locate visible issues directly on the page",
        "Inspect structure and settings: titles, headings, images, links, canonical, robots",
        "Review Persian and RTL pages; panel and report in English or Persian",
        "Compare fetched HTML with the rendered page",
        "Export findings as PDF, CSV, or a developer ticket",
        "Inspect LCP and generate a downloadable WebP for eligible images",
      ],
      accent: "#B96B4A",
      repoUrl: "https://github.com/hassan95eb/seo-extension",
      media: {
        thumbnail: {
          src: "/projects/seo-lens/panel-en.webp",
          alt: "SEO Lens panel highlighting an SEO issue on a sample page",
          width: 1280,
          height: 780,
          caption: "Audit of a sample page. Findings and score apply to the page shown.",
        },
      },
      seo: {
        title: "SEO Lens | On-page SEO Chrome Extension",
        description: "Inspect on-page SEO issues, highlight affected elements, and export reports or developer tickets with SEO Lens for Chrome. Available in English and Persian.",
      },
      structuredData: {
        applicationCategory: "BrowserApplication",
        operatingSystem: "Chrome",
        softwareVersion: "2.7.0",
        downloadUrl: "https://github.com/hassan95eb/seo-extension/releases/latest",
        license: "https://github.com/hassan95eb/seo-extension/blob/main/LICENSE",
      },
      caseStudy: {
        tagline: "Inspect a page, locate visible issues, and turn findings into reports or actionable tickets. SEO Lens is an open-source Chrome extension with English and Persian interfaces.",
        version: "2.7.0",
        primaryCta: {
          label: "Get the extension on GitHub",
          href: "https://github.com/hassan95eb/seo-extension/releases/latest",
        },
        secondaryCta: { label: "Installation guide", href: "#install" },
        gallery: [
          {
            src: "/projects/seo-lens/panel-fa.webp",
            alt: "SEO Lens panel in Persian, highlighting an SEO issue on the same sample page",
            width: 1280,
            height: 780,
            caption: "The same audit with the Persian interface.",
          },
          {
            src: "/projects/seo-lens/report-fa.webp",
            alt: "Persian SEO Lens PDF report with findings and a fix guide, for a different sample page",
            width: 800,
            height: 640,
            caption: "A Persian PDF report. The score and findings belong to the sample store page shown, not to this website.",
          },
        ],
        features: [
          {
            title: "Locate visible issues",
            body: "Highlight visible elements associated with a finding. Issues involving HTTP headers or invisible metadata are explained in the panel instead.",
          },
          {
            title: "Inspect page structure and settings",
            body: "Review titles, descriptions, headings, images, links, canonical URLs, robots directives, and selected structured-data checks. Treat findings as a starting point for technical review in the context of the page.",
          },
          {
            title: "Review Persian and RTL pages",
            body: "Check language and text direction, and flag selected mixed-direction text for review. Both the panel and report support English and Persian.",
          },
          {
            title: "Compare fetched HTML with the rendered page",
            body: "Inspect differences in content, headings, titles, canonical URLs, robots metadata, and JSON-LD, including changes made by JavaScript.",
          },
          {
            title: "Export and hand off findings",
            body: "Open a print-ready report to save as PDF, choose a custom logo, export findings and image or link inventories as CSV, or copy a finding as a developer ticket.",
          },
          {
            title: "Inspect LCP and prepare selected images",
            body: "Identify the LCP element when browser data is available. For eligible same-origin images, generate a local WebP copy and download it if it is smaller. Uploading and replacing the file on the website remains a separate step.",
          },
        ],
        howToUse: [
          "Download and extract the extension ZIP from GitHub Releases.",
          "Open chrome://extensions in Chrome, enable Developer mode, choose Load unpacked, and select the folder containing manifest.json.",
          "Open a web page and click the SEO Lens icon. Review findings and highlight associated visible elements.",
          "Apply changes, run the audit again, and share the results through PDF, CSV, or copied tickets.",
        ],
        installNote: "Keep the extension folder in place after installation. This is a manual GitHub installation.",
        privacy: "Analysis runs in your browser. Page content and audit results are not sent to an SEO Lens analysis server. Some checks request the website's HTML, headers, robots.txt, or images. Your language choice and custom logo are stored locally.",
        limitations: [
          "The score reflects this tool's rules. It does not guarantee Google rankings or indexing.",
          "SEO Lens inspects the current page; it is not a full-site crawler or a replacement for Search Console.",
          "The observed LCP belongs to that page visit. It is not field data or a complete INP and CLS assessment.",
          "WebP conversion is limited to eligible same-origin images. Savings are not guaranteed, and the website is not changed automatically.",
          "Pixel-width checks are estimates, not an exact preview of how a search engine will display a result.",
        ],
        roleNote: "Designed and developed the audit engine, findings panel, on-page highlighting, bilingual interface, reporting, and developer hand-off exports.",
        faq: [
          {
            question: "Does SEO Lens fix my website automatically?",
            answer: "No. It reports potential issues and suggests changes. It can generate downloadable WebP files for selected images, but it does not update your website's code or replace server files.",
          },
          {
            question: "Does a score of 100 mean my page will rank well?",
            answer: "No. The score summarizes this tool's checks. Content, competition, links, and other factors also affect search performance.",
          },
          {
            question: "Does it work on every page?",
            answer: "It works on ordinary web pages where Chrome permits extension scripts. Browser-internal and restricted pages are not supported. Some checks also depend on network access and available browser data.",
          },
          {
            question: "Does it support Persian?",
            answer: "Yes. The panel and report support Persian and English, with additional checks for right-to-left content.",
          },
        ],
      },
    },
    {
      slug: "vue-ecosystem",
      title: "Vue Ecosystem",
      summary: "A monorepo of independently versioned Vue 3 libraries built to compose with each other, not merely to share a repository.",
      description: "Most package collections are unrelated libraries that happen to live in one repo. This one is built the other way round: a shared core supplies error handling, debug logging and common types, and every package composes on top of it. Five ship today — core, persian-tools, realtime, virtual-scroll and query-builder — with five more scaffolded for later phases.",
      role: "Creator & Architect",
      stack: [
        "TypeScript",
        "Vue 3",
        "Turborepo",
        "pnpm workspaces",
        "Vitest",
        "tsup & Vite",
      ],
      highlights: [
        "Independent semver per package rather than one lockstep release",
        "TypeScript strict throughout; ships ESM, CJS and declaration files",
        "Vue 3 as a peer dependency, so consumers keep control of their own version",
        "Build tooling split by need: tsup for logic-only packages, Vite for those shipping SFCs",
        "persian-tools covers Jalali dates, Persian formatting and Iranian validators",
        "realtime handles WebSocket and SSE reconnection with pub-sub channels",
      ],
      accent: "#25201C",
      repoUrl: "https://github.com/hassan95eb/vue-ecosystem",
    },
    {
      slug: "sandwich-download-manager",
      title: "Sandwich Download Manager",
      summary: "Frontend contribution to an open-source Tauri download manager — the settings panel that puts bandwidth limiting in the user's hands.",
      description: "Sandwich is a free Windows download manager built on a Rust and Tauri core, with a deliberately framework-free frontend. Bandwidth limiting sat on the project's list of things it did not yet do. I built the settings panel front end for it — the surface where a user sets a cap and sees it take effect — working inside the project's existing plain ES-modules architecture rather than pulling a framework into someone else's codebase.",
      role: "Frontend Contributor",
      stack: [
        "JavaScript (ES modules)",
        "Tauri",
        "HTML & CSS",
        "Rust core",
        "aria2",
      ],
      highlights: [
        "Settings panel built to the project's no-framework constraint",
        "Bandwidth limiting surfaced as a real user-facing control",
        "Held to the project's accessibility bar — full keyboard and screen-reader support",
        "Delivered on a feature branch, against another maintainer's conventions",
      ],
      accent: "#BFAF9F",
      repoUrl: "https://github.com/sepehrbayat/sandwich-download-manager/tree/feat/settings-panel-bandwidth-limit",
    },
    {
      slug: "saferide",
      title: "SafeRide",
      summary: "A web and mobile student transportation product — frontend execution, product flow clarity, and features validated against a live API.",
      description: "A student transportation platform spanning web and mobile. My part sat where product definition meets frontend delivery: turning requirements and UX flows into implementation scopes a developer could pick up, reviewing both surfaces for logic, usability, RTL behaviour and edge cases, and validating API-connected features against real product behaviour rather than against mockups.",
      role: "Frontend & Product Execution",
      stack: [
        "React",
        "Android",
        "REST APIs",
        "RTL",
        "Product QA",
      ],
      highlights: [
        "Translated product requirements and UX flows into clear implementation scopes",
        "Reviewed web and mobile flows for logic, usability, RTL behaviour and edge cases",
        "Supported API-connected frontend features and validated real product behaviour",
        "Prepared implementation prompts, task breakdowns and acceptance criteria for AI-assisted MVP execution",
        "Tested frontend states, data-driven flows and release readiness across product surfaces",
        "Worked with technical teams to align implementation with user needs and business goals",
      ],
      accent: "#1C1815",
      sourcePrivate: true,
    },
  ],
  featuredPost: {
    slug: "designing-frontend-systems-for-high-scale-dashboards",
    title: "Designing Frontend Systems for High-Scale Dashboards",
    description: "How architecture, rendering strategy, state management, and performance decisions shape reliable data-heavy products.",
    category: "frontend-architecture",
    readTime: "8 min read",
    date: "Aug 2026",
    tone: "wide",
    accent: "#25201C",
  },
  posts: [
    {
      slug: "when-frontend-architecture-becomes-product-strategy",
      title: "When Frontend Architecture Becomes Product Strategy",
      description: "Where the line between engineering structure and product direction quietly disappears — and why senior teams treat them as one.",
      category: "technical-leadership",
      readTime: "6 min read",
      date: "Jul 2026",
      tone: "wide",
      accent: "#BFAF9F",
    },
    {
      slug: "rendering-millions-of-data-points-without-breaking-the-ui",
      title: "Rendering Millions of Data Points Without Breaking the UI",
      description: "Virtualization, memoization, Web Workers, and the rendering budget behind interfaces that stay smooth under real load.",
      category: "performance",
      readTime: "9 min read",
      date: "Jul 2026",
      tone: "dark",
      accent: "#B96B4A",
    },
    {
      slug: "a-practical-approach-to-real-time-dashboards",
      title: "A Practical Approach to Real-Time Dashboards",
      description: "Designing resilient WebSocket flows, reconnect states, and update strategies that keep live data trustworthy.",
      category: "real-time-systems",
      readTime: "7 min read",
      date: "Jun 2026",
      tone: "default",
      accent: "#25201C",
    },
    {
      slug: "state-management-decisions-that-actually-matter",
      title: "State Management Decisions That Actually Matter",
      description: "Cutting through the library debate to the choices that genuinely shape maintainability and performance.",
      category: "frontend-architecture",
      readTime: "5 min read",
      date: "Jun 2026",
      tone: "default",
      accent: "#BFAF9F",
    },
    {
      slug: "from-vue-2-to-vue-3-refactoring-without-chaos",
      title: "From Vue 2 to Vue 3: Refactoring Without Chaos",
      description: "A staged migration playbook that keeps a production app shipping while the framework moves underneath it.",
      category: "react-next-js",
      readTime: "6 min read",
      date: "May 2026",
      tone: "default",
      accent: "#B96B4A",
    },
    {
      slug: "what-makes-a-frontend-feel-reliable",
      title: "What Makes a Frontend Feel Reliable?",
      description: "The small, deliberate details — loading, error, and empty states — that make an interface feel trustworthy.",
      category: "ui-engineering",
      readTime: "4 min read",
      date: "May 2026",
      tone: "default",
      accent: "#25201C",
    },
  ],
  categories: [
    {
      slug: "frontend-architecture",
      name: "Frontend Architecture",
    },
    {
      slug: "performance",
      name: "Performance",
    },
    {
      slug: "react-next-js",
      name: "React & Next.js",
    },
    {
      slug: "real-time-systems",
      name: "Real-Time Systems",
    },
    {
      slug: "ui-engineering",
      name: "UI Engineering",
    },
    {
      slug: "technical-leadership",
      name: "Technical Leadership",
    },
  ],
  experience: [
    {
      role: "Senior Frontend Developer",
      company: "Parnian Andish Co",
      period: "July 2024 — Present",
      summary: "Owning frontend architecture for data-intensive management panels, and contributing to the ASP.NET Core services behind them.",
      points: [
        "Optimized a management panel rendering 2,000,000+ continuous data points with Sigma.js and Graphology",
        "Offloaded heavy computation to Web Workers for a stutter-free 60fps experience during chunk-loading",
        "Built RESTful APIs, data models, and server-side logic in ASP.NET Core (C#) with Entity Framework Core and SQL Server",
        "Orchestrated the migration of core products from Vue 2 to Vue 3 using modular composables",
        "Integrated Pinia and batched redundant API requests — 20% fewer client-side bugs, 40% higher overall system performance",
      ],
    },
    {
      role: "Backend Developer (Remote)",
      company: "Nafasland",
      period: "December 2021 — March 2023",
      summary: "Designed and delivered a custom inventory and warehouse management system for an e-commerce supplement store.",
      points: [
        "Independently built the inventory system and integrated it with the storefront's management API",
        "Engineered the solution in ASP.NET Core (C#) following Onion Architecture for clear separation of concerns",
        "Enforced domain-driven layering for testability and long-term maintainability",
        "Delivered advanced product filtering and a best-selling-products reporting module",
        "Optimized the module at both query and code level",
      ],
    },
    {
      role: "Frontend Developer & Technical Support",
      company: "Site Saz Portal",
      period: "October 2021 — December 2022",
      summary: "Shipped widgets and platform features across the site-builder, on both sides of the stack.",
      points: [
        "Developed backend features and RESTful APIs with ASP.NET Core, Entity Framework Core, and SQL Server",
        "Built new widgets and platform capabilities end users could add and configure dynamically",
        "Revamped core modules and interactive widgets with Angular and custom responsive layouts — 30% better client performance",
        "Established real-time communication over WebSockets, and cut initial load times through Next.js code splitting, dynamic imports, and TanStack Query caching",
        "Resolved intricate domain-routing issues and standardized site-wide error handling and lazy-loading states",
      ],
    },
    {
      role: "Frontend Developer Intern",
      company: "Shahan Gold Company",
      period: "April 2021 — September 2021",
      summary: "Built the fundamentals: clean components, solid layouts, and dependable delivery.",
      points: [
        "Developed responsive, customer-facing interfaces for e-commerce and catalog platforms using Vue and Nuxt.js",
        "Collaborated closely with UI/UX designers to implement fluid layouts",
        "Built flexible local state using the Context API",
      ],
    },
  ],
  achievements: [
    {
      title: "Performance Optimization",
      body: "Cut interaction latency on multi-million-row dashboards through virtualization, memoization, and Web Workers.",
    },
    {
      title: "Scalable Dashboard Architecture",
      body: "Designed modular data and component layers that let teams add modules without regressions.",
    },
    {
      title: "Real-time Frontend Systems",
      body: "Built resilient WebSocket and streaming interfaces that stay responsive under load and flaky networks.",
    },
    {
      title: "Complex State Management",
      body: "Modeled intricate application state cleanly with Zustand, TanStack Query, and Redux Toolkit.",
    },
    {
      title: "Backend Architecture",
      body: "Designed and delivered ASP.NET Core services on Onion Architecture — domain-driven layering built for testability and long-term maintenance.",
    },
    {
      title: "Clean, Product-minded Architecture",
      body: "Translated product goals into frontend systems that are precise, maintainable, and fast to iterate on.",
    },
  ],
  achievementsPlaceholder: [
    {
      title: "Bug Bounty Recognition",
      body: "Reserved for future security research and responsible disclosures.",
    },
    {
      title: "Certificates & Licenses",
      body: "Space held for upcoming professional certifications.",
    },
    {
      title: "Notable Recognitions",
      body: "Awards and community acknowledgements will appear here.",
    },
  ],
  testimonials: [
    {
      name: "Product Manager",
      role: "SaaS Platform",
      quote: "Hassan turns ambiguous product goals into precise, reliable interfaces. He thinks about the whole system, not just the screen in front of him.",
    },
    {
      name: "Backend Engineer",
      role: "Engineering Team",
      quote: "One of the few frontend engineers who genuinely understands the data layer. Our APIs and his UI always met cleanly in the middle.",
    },
    {
      name: "Founder / Client",
      role: "Early-stage Startup",
      quote: "He owned the frontend end to end and made calls a founder can trust. The product felt senior from day one.",
    },
    {
      name: "Engineering Teammate",
      role: "Frontend Guild",
      quote: "Sharp, calm, and precise. Hassan raised the bar on architecture and performance for the whole team.",
    },
  ],
  certifications: [
    {
      title: "Building Web APIs with ASP.NET Core 8",
      provider: "LinkedIn Learning",
      date: "Aug 2026",
      url: "https://www.linkedin.com/learning/certificates/2c8f16182e4efa75cb5742d9a0e77e560fe495a836667876ef3b2e1fbc881678",
      image: "/certificates/building-web-apis-aspnet-core-8.png",
    },
    {
      title: "Advanced React Patterns",
      provider: "To be added",
      date: "—",
    },
    {
      title: "Frontend System Design",
      provider: "To be added",
      date: "—",
    },
    {
      title: "TypeScript in Depth",
      provider: "To be added",
      date: "—",
    },
    {
      title: "Web Performance",
      provider: "To be added",
      date: "—",
    },
  ],
};

const fa: CmsData = {
  projects: [
    {
      slug: "seo-lens",
      title: "SEO Lens",
      summary: "SEO Lens صفحهٔ وب را بررسی می‌کند، عناصر مرتبط با مشکلات سئو را روی همان صفحه نشان می‌دهد و گزارش فارسی یا انگلیسی برای پیگیری و اصلاح آماده می‌کند.",
      description: "فهرست خطاها همیشه برای شروع اصلاح کافی نیست؛ پیدا کردن تصویر، لینک یا تیتر مرتبط با هر مشکل هم زمان می‌برد. SEO Lens را ساختم تا فاصلهٔ بین دیدن مشکل و پیدا کردن محل آن کمتر شود. کاربر می‌تواند عناصر مرتبط را روی صفحه ببیند و نتیجه را برای خودش، توسعه‌دهنده یا مشتری خروجی بگیرد.",
      role: "طراح و توسعه‌دهنده",
      stack: [
        "JavaScript",
        "Chrome Extensions (Manifest V3)",
        "HTML و CSS",
        "Shadow DOM",
        "Browser Performance APIs",
        "OffscreenCanvas",
        "Playwright",
      ],
      highlights: [
        "نمایش محل مشکل روی خود صفحه",
        "بررسی ساختار و تنظیمات: عنوان، تیترها، تصاویر، لینک‌ها، canonical، robots",
        "بررسی صفحات فارسی و راست‌به‌چپ؛ پنل و گزارش به فارسی و انگلیسی",
        "مقایسهٔ HTML دریافتی با صفحهٔ نمایش‌داده‌شده",
        "خروجی یافته‌ها به PDF، CSV یا تسک توسعه‌دهنده",
        "بررسی LCP و ساخت WebP قابل دانلود برای تصاویر واجد شرایط",
      ],
      accent: "#B96B4A",
      repoUrl: "https://github.com/hassan95eb/seo-extension",
      media: {
        thumbnail: {
          src: "/projects/seo-lens/panel-fa.webp",
          alt: "پنل SEO Lens و نمایش محل یک مشکل سئو روی صفحهٔ نمونه",
          width: 1280,
          height: 780,
          caption: "بررسی یک صفحهٔ نمونه؛ یافته‌ها و امتیاز مربوط به همین صفحه هستند.",
        },
      },
      seo: {
        title: "SEO Lens | افزونه بررسی سئو برای Chrome",
        description: "با SEO Lens مشکلات سئوی صفحه را بررسی کنید، عناصر مرتبط را ببینید و گزارش فارسی یا انگلیسی در قالب PDF، CSV یا تسک قابل پیگیری تهیه کنید.",
      },
      structuredData: {
        applicationCategory: "BrowserApplication",
        operatingSystem: "Chrome",
        softwareVersion: "2.7.0",
        downloadUrl: "https://github.com/hassan95eb/seo-extension/releases/latest",
        license: "https://github.com/hassan95eb/seo-extension/blob/main/LICENSE",
      },
      caseStudy: {
        tagline: "صفحه را بررسی کنید، محل مشکلات قابل نمایش را ببینید و نتیجه را به گزارش یا تسک قابل پیگیری تبدیل کنید. SEO Lens یک افزونهٔ متن‌باز Chrome با رابط فارسی و انگلیسی است.",
        version: "2.7.0",
        primaryCta: {
          label: "دریافت افزونه از گیت‌هاب",
          href: "https://github.com/hassan95eb/seo-extension/releases/latest",
        },
        secondaryCta: { label: "راهنمای نصب", href: "#install" },
        gallery: [
          {
            src: "/projects/seo-lens/panel-en.webp",
            alt: "پنل انگلیسی SEO Lens روی همان صفحهٔ نمونه",
            width: 1280,
            height: 780,
            caption: "همان ممیزی با رابط انگلیسی.",
          },
          {
            src: "/projects/seo-lens/report-fa.webp",
            alt: "نمونهٔ گزارش فارسی SEO Lens با یافته‌ها و راهنمای اصلاح",
            width: 800,
            height: 640,
            caption: "گزارش PDF فارسی. امتیاز و یافته‌ها مربوط به صفحهٔ فروشگاه نمونه است، نه این وب‌سایت.",
          },
        ],
        features: [
          {
            title: "نمایش محل مشکل",
            body: "عناصر قابل مشاهدهٔ مرتبط با یافته‌ها را روی صفحه مشخص کنید. برای مشکلاتی مثل هدر HTTP یا تنظیمات نامرئی، توضیح و راهنمای اصلاح در پنل نمایش داده می‌شود.",
          },
          {
            title: "بررسی ساختار و تنظیمات صفحه",
            body: "عنوان، توضیحات، تیترها، تصاویر، لینک‌ها، canonical، دستورهای robots و برخی داده‌های ساخت‌یافته بررسی می‌شوند. خروجی، نقطهٔ شروع بررسی فنی است و باید با هدف هر صفحه تفسیر شود.",
          },
          {
            title: "بررسی فارسی و متن‌های راست‌به‌چپ",
            body: "ابزار زبان و جهت صفحه را بررسی می‌کند و برخی موارد متن ترکیبی فارسی و انگلیسی را برای بازبینی مشخص می‌کند. پنل و گزارش نیز به هر دو زبان در دسترس‌اند.",
          },
          {
            title: "مقایسهٔ HTML اولیه و صفحهٔ نمایش‌داده‌شده",
            body: "تفاوت‌های مهم در محتوا، تیترها، عنوان، canonical، robots و JSON-LD را ببینید؛ از جمله مواردی که پس از اجرای JavaScript تغییر می‌کنند.",
          },
          {
            title: "گزارش و تحویل به تیم",
            body: "گزارش را برای چاپ و ذخیره به PDF باز کنید، لوگوی دلخواه انتخاب کنید، از یافته‌ها و فهرست تصاویر و لینک‌ها CSV بگیرید یا مشکل را به شکل یک تسک کپی کنید.",
          },
          {
            title: "بررسی LCP و آماده‌سازی بعضی تصاویر",
            body: "در صورت وجود دادهٔ مرورگر، عنصر LCP مشخص می‌شود. برای برخی تصاویر همان مبدأ، ابزار می‌تواند یک نسخهٔ WebP بسازد و در صورت کاهش حجم، فایل را برای دانلود ارائه کند. جایگزینی فایل در سایت بر عهدهٔ شماست.",
          },
        ],
        howToUse: [
          "فایل افزونه را از بخش Releases گیت‌هاب دریافت و از حالت فشرده خارج کنید.",
          "در Chrome آدرس chrome://extensions را باز کنید، Developer mode را فعال کنید و با Load unpacked پوشهٔ حاوی manifest.json را انتخاب کنید.",
          "یک صفحهٔ وب را باز کنید و روی آیکون SEO Lens بزنید. یافته‌ها را ببینید و موارد قابل نمایش را روی صفحه مشخص کنید.",
          "اصلاحات را انجام دهید و دوباره ممیزی کنید؛ برای تحویل نتیجه از PDF، CSV یا کپی تسک استفاده کنید.",
        ],
        installNote: "پوشهٔ افزونه را پس از نصب جابه‌جا یا حذف نکنید. این روش نصب دستی از گیت‌هاب است.",
        privacy: "تحلیل داخل مرورگر انجام می‌شود و محتوای صفحه و نتایج ممیزی برای تحلیل به سرور SEO Lens ارسال نمی‌شوند. بعضی بررسی‌ها برای خواندن HTML، هدرها، robots.txt یا تصاویر به خود وب‌سایت درخواست می‌فرستند. زبان و لوگوی انتخابی به‌صورت محلی ذخیره می‌شوند.",
        limitations: [
          "امتیاز ابزار یک راهنمای داخلی است و رتبه یا ایندکس‌شدن در گوگل را تضمین نمی‌کند.",
          "ابزار صفحهٔ فعلی را بررسی می‌کند؛ خزندهٔ کامل سایت یا جایگزین Search Console نیست.",
          "LCP مشاهده‌شده به همان بازدید مربوط است؛ اندازه‌گیری میدانی همهٔ کاربران یا ممیزی کامل INP و CLS نیست.",
          "خروجی WebP محدود به تصاویر واجد شرایط همان مبدأ است. کاهش حجم برای همهٔ تصاویر تضمین نمی‌شود و سایت به‌صورت خودکار تغییر نمی‌کند.",
          "اندازه‌گیری عرض عنوان تقریبی است و نمایش نهایی نتیجهٔ جست‌وجو را پیش‌بینی قطعی نمی‌کند.",
        ],
        roleNote: "طراحی و توسعهٔ موتور بررسی، پنل نمایش یافته‌ها، نشانه‌گذاری عناصر صفحه، رابط دوزبانه، گزارش و خروجی‌های قابل تحویل.",
        faq: [
          {
            question: "آیا SEO Lens مشکلات سایت را خودش اصلاح می‌کند؟",
            answer: "خیر. ابزار مشکلات احتمالی و راهنمای اصلاح را نشان می‌دهد. برای برخی تصاویر می‌تواند فایل WebP قابل دانلود بسازد، اما تغییر کد و جایگزینی فایل روی سایت خودکار نیست.",
          },
          {
            question: "آیا امتیاز ۱۰۰ یعنی رتبهٔ خوب در گوگل؟",
            answer: "خیر. این امتیاز فقط جمع‌بندی قواعد همین ابزار است. محتوا، رقابت، لینک‌ها و عوامل دیگری نیز در عملکرد جست‌وجو نقش دارند.",
          },
          {
            question: "آیا روی همهٔ صفحات کار می‌کند؟",
            answer: "روی صفحات معمولی که Chrome اجازهٔ اجرای افزونه را می‌دهد کار می‌کند. صفحات داخلی Chrome و صفحات محدودشدهٔ مرورگر پشتیبانی نمی‌شوند؛ بعضی بررسی‌ها نیز به دسترسی شبکه و دادهٔ قابل مشاهده وابسته‌اند.",
          },
          {
            question: "آیا فارسی پشتیبانی می‌شود؟",
            answer: "بله. پنل و گزارش فارسی و انگلیسی دارند و برای محتوای راست‌به‌چپ نیز بررسی‌هایی در نظر گرفته شده است.",
          },
        ],
      },
    },
    {
      slug: "vue-ecosystem",
      title: "Vue Ecosystem",
      summary: "مونوریپویی از کتابخانه‌های Vue 3 با نسخه‌گذاری مستقل، ساخته‌شده برای ترکیب‌شدن با یکدیگر، نه صرفاً هم‌خانه بودن در یک مخزن.",
      description: "بیشتر مجموعه‌های پکیج، کتابخانه‌هایی بی‌ربط‌اند که تصادفاً در یک مخزن کنار هم نشسته‌اند. این یکی برعکس ساخته شده است: یک هسته‌ی مشترک، مدیریت خطا، لاگ دیباگ و تایپ‌های عمومی را فراهم می‌کند و هر پکیج روی آن سوار می‌شود. پنج پکیج امروز منتشر شده‌اند — core، persian-tools، realtime، virtual-scroll و query-builder — و پنج تای دیگر برای فازهای بعدی اسکلت‌بندی شده‌اند.",
      role: "سازنده و معمار",
      stack: [
        "TypeScript",
        "Vue 3",
        "Turborepo",
        "pnpm workspaces",
        "Vitest",
        "tsup و Vite",
      ],
      highlights: [
        "نسخه‌گذاری معنایی مستقل برای هر پکیج، به‌جای یک انتشار هم‌گام",
        "TypeScript در حالت strict؛ خروجی ESM، CJS و فایل‌های تعریف تایپ",
        "Vue 3 به‌عنوان peer dependency، تا کنترل نسخه دست مصرف‌کننده بماند",
        "ابزار بیلد بر اساس نیاز تفکیک شده: tsup برای پکیج‌های صرفاً منطقی، Vite برای آن‌ها که SFC منتشر می‌کنند",
        "پکیج persian-tools شامل تاریخ جلالی، قالب‌بندی فارسی و اعتبارسنج‌های ایرانی",
        "پکیج realtime، اتصال مجدد WebSocket و SSE را با کانال‌های pub-sub مدیریت می‌کند",
      ],
      accent: "#25201C",
      repoUrl: "https://github.com/hassan95eb/vue-ecosystem",
    },
    {
      slug: "sandwich-download-manager",
      title: "Sandwich Download Manager",
      summary: "مشارکت فرانت‌اند در یک دانلود‌منیجر متن‌باز مبتنی بر Tauri — پنل تنظیماتی که محدودکردن پهنای باند را به دست کاربر می‌دهد.",
      description: "Sandwich یک دانلود‌منیجر رایگان ویندوزی است با هسته‌ی Rust و Tauri و فرانت‌اندی که عامدانه بدون فریم‌ورک نوشته شده. محدودکردن پهنای باند در فهرست کارهایی بود که پروژه هنوز انجام نمی‌داد. من فرانتِ پنل تنظیمات را برایش ساختم — همان جایی که کاربر سقف سرعت را تعیین می‌کند و اثرش را می‌بیند — و این کار را داخل معماری موجودِ ES modules پروژه انجام دادم، نه با وارد کردن یک فریم‌ورک به کدبیسِ دیگری.",
      role: "مشارکت‌کننده‌ی فرانت‌اند",
      stack: [
        "JavaScript (ES modules)",
        "Tauri",
        "HTML و CSS",
        "هسته‌ی Rust",
        "aria2",
      ],
      highlights: [
        "پنل تنظیمات، ساخته‌شده در چارچوب محدودیتِ بدون‌فریم‌ورکِ پروژه",
        "محدودیت پهنای باند به‌شکل یک کنترل واقعیِ در دسترس کاربر",
        "پایبند به سطح دسترس‌پذیری پروژه — پشتیبانی کامل از کیبورد و صفحه‌خوان",
        "تحویل روی یک برنچ فیچر، مطابق قواعدِ نگه‌دارنده‌ی دیگر",
      ],
      accent: "#BFAF9F",
      repoUrl: "https://github.com/sepehrbayat/sandwich-download-manager/tree/feat/settings-panel-bandwidth-limit",
    },
    {
      slug: "saferide",
      title: "SafeRide",
      summary: "محصول حمل‌ونقل دانش‌آموزی در وب و موبایل — اجرای فرانت‌اند، شفافیت جریان محصول، و اعتبارسنجی قابلیت‌ها روی API واقعی.",
      description: "پلتفرم حمل‌ونقل دانش‌آموزی در دو بستر وب و موبایل. سهم من درست همان‌جا بود که تعریف محصول به تحویل فرانت‌اند می‌رسد: تبدیل نیازمندی‌ها و جریان‌های UX به دامنه‌های پیاده‌سازیِ قابل‌برداشت برای توسعه‌دهنده، بازبینی هر دو بستر از نظر منطق، کاربردپذیری، رفتار راست‌به‌چپ و حالت‌های مرزی، و اعتبارسنجی قابلیت‌های متصل به API بر اساس رفتار واقعی محصول، نه روی ماکاپ.",
      role: "اجرای فرانت‌اند و محصول",
      stack: [
        "React",
        "Android",
        "REST APIs",
        "راست‌به‌چپ",
        "تست محصول",
      ],
      highlights: [
        "تبدیل نیازمندی‌های محصول و جریان‌های UX به دامنه‌های پیاده‌سازی شفاف",
        "بازبینی جریان‌های وب و موبایل از نظر منطق، کاربردپذیری، رفتار راست‌به‌چپ و حالت‌های مرزی",
        "پشتیبانی از قابلیت‌های فرانت‌اندِ متصل به API و اعتبارسنجی رفتار واقعی محصول",
        "آماده‌سازی پرامپت‌های پیاده‌سازی، شکست وظایف و معیارهای پذیرش برای اجرای MVP به کمک هوش مصنوعی",
        "تست حالت‌های فرانت‌اند، جریان‌های داده‌محور و آمادگی انتشار در همه‌ی بسترهای محصول",
        "همکاری با تیم‌های فنی برای هم‌راستا کردن پیاده‌سازی با نیاز کاربر و اهداف کسب‌وکار",
      ],
      accent: "#1C1815",
      sourcePrivate: true,
    },
  ],
  featuredPost: {
    slug: "designing-frontend-systems-for-high-scale-dashboards",
    title: "طراحی سیستم‌های فرانت‌اند برای داشبوردهای در مقیاس بالا",
    description: "چگونه معماری، استراتژی رندر، مدیریت state و تصمیم‌های عملکردی، محصولات داده‌محورِ قابل‌اعتماد را شکل می‌دهند.",
    category: "frontend-architecture",
    readTime: "۸ دقیقه مطالعه",
    date: "Aug 2026",
    tone: "wide",
    accent: "#25201C",
  },
  posts: [
    {
      slug: "when-frontend-architecture-becomes-product-strategy",
      title: "وقتی معماری فرانت‌اند به استراتژی محصول تبدیل می‌شود",
      description: "جایی که مرز میان ساختار مهندسی و جهت‌گیری محصول بی‌صدا محو می‌شود — و چرا تیم‌های حرفه‌ای آن‌ها را یکی می‌دانند.",
      category: "technical-leadership",
      readTime: "۶ دقیقه مطالعه",
      date: "Jul 2026",
      tone: "wide",
      accent: "#BFAF9F",
    },
    {
      slug: "rendering-millions-of-data-points-without-breaking-the-ui",
      title: "رندر میلیون‌ها نقطه‌داده بدون شکستنِ رابط کاربری",
      description: "virtualization، memoization، Web Workers و بودجه‌ی رندری که پشتِ رابط‌هایی است که زیر بارِ واقعی روان می‌مانند.",
      category: "performance",
      readTime: "۹ دقیقه مطالعه",
      date: "Jul 2026",
      tone: "dark",
      accent: "#B96B4A",
    },
    {
      slug: "a-practical-approach-to-real-time-dashboards",
      title: "رویکردی کاربردی به داشبوردهای Real-time",
      description: "طراحی جریان‌های مقاومِ WebSocket، حالت‌های اتصال مجدد و استراتژی‌های به‌روزرسانی که داده‌ی زنده را قابل‌اعتماد نگه می‌دارند.",
      category: "real-time-systems",
      readTime: "۷ دقیقه مطالعه",
      date: "Jun 2026",
      tone: "default",
      accent: "#25201C",
    },
    {
      slug: "state-management-decisions-that-actually-matter",
      title: "تصمیم‌های مدیریت state که واقعاً اهمیت دارند",
      description: "عبور از بحثِ کتابخانه‌ها و رسیدن به انتخاب‌هایی که واقعاً قابلیت نگهداری و عملکرد را شکل می‌دهند.",
      category: "frontend-architecture",
      readTime: "۵ دقیقه مطالعه",
      date: "Jun 2026",
      tone: "default",
      accent: "#BFAF9F",
    },
    {
      slug: "from-vue-2-to-vue-3-refactoring-without-chaos",
      title: "از Vue 2 به Vue 3: بازنویسی بدون آشوب",
      description: "یک راهنمای مهاجرت مرحله‌ای که یک اپِ تولیدی را در حال انتشار نگه می‌دارد، در حالی که فریم‌ورک زیر آن جابه‌جا می‌شود.",
      category: "react-next-js",
      readTime: "۶ دقیقه مطالعه",
      date: "May 2026",
      tone: "default",
      accent: "#B96B4A",
    },
    {
      slug: "what-makes-a-frontend-feel-reliable",
      title: "چه چیزی یک فرانت‌اند را قابل‌اعتماد جلوه می‌دهد؟",
      description: "جزئیات کوچک و عامدانه — حالت‌های بارگذاری، خطا و خالی — که یک رابط را قابل‌اعتماد نشان می‌دهند.",
      category: "ui-engineering",
      readTime: "۴ دقیقه مطالعه",
      date: "May 2026",
      tone: "default",
      accent: "#25201C",
    },
  ],
  categories: [
    {
      slug: "frontend-architecture",
      name: "معماری فرانت‌اند",
    },
    {
      slug: "performance",
      name: "عملکرد",
    },
    {
      slug: "react-next-js",
      name: "React و Next.js",
    },
    {
      slug: "real-time-systems",
      name: "سیستم‌های Real-time",
    },
    {
      slug: "ui-engineering",
      name: "مهندسی رابط کاربری",
    },
    {
      slug: "technical-leadership",
      name: "رهبری فنی",
    },
  ],
  experience: [
    {
      role: "توسعه‌دهنده‌ی ارشد فرانت‌اند",
      company: "شرکت پرنیان اندیش",
      period: "تیر ۱۴۰۳ — اکنون",
      summary: "مالکیت معماریِ فرانت‌اند برای پنل‌های مدیریتیِ داده‌محور، و مشارکت در سرویس‌های ASP.NET Core پشت آن‌ها.",
      points: [
        "بهینه‌سازی پنل مدیریتی با رندر بیش از ۲٬۰۰۰٬۰۰۰ نقطه‌داده‌ی پیوسته با Sigma.js و Graphology",
        "انتقال محاسبات سنگین به Web Workers برای تجربه‌ی یکنواخت ۶۰fps هنگام بارگذاریِ تکه‌ای",
        "ساخت APIهای RESTful، مدل‌های داده و منطق سمت سرور در ASP.NET Core (C#) با Entity Framework Core و SQL Server",
        "هدایت مهاجرت محصولات اصلی از Vue 2 به Vue 3 با استفاده از composableهای ماژولار",
        "یکپارچه‌سازی Pinia و دسته‌بندی درخواست‌های تکراری — ۲۰٪ کاهش باگ‌های سمت کلاینت و ۴۰٪ افزایش عملکرد کلی سیستم",
      ],
    },
    {
      role: "توسعه‌دهنده‌ی بک‌اند (دورکار)",
      company: "Nafasland",
      period: "آذر ۱۴۰۰ — اسفند ۱۴۰۱",
      summary: "طراحی و تحویل یک سامانه‌ی اختصاصیِ مدیریت انبار و موجودی برای یک فروشگاه اینترنتیِ مکمل.",
      points: [
        "ساخت مستقل سامانه‌ی موجودی و اتصال مستقیم آن به API مدیریتیِ فروشگاه",
        "پیاده‌سازی راهکار در ASP.NET Core (C#) بر پایه‌ی Onion Architecture برای تفکیک شفاف مسئولیت‌ها",
        "لایه‌بندیِ دامنه‌محور برای تست‌پذیری و نگه‌داشت بلندمدت",
        "ارائه‌ی فیلترینگ پیشرفته‌ی محصولات و ماژول گزارش پرفروش‌ترین‌ها",
        "بهینه‌سازی ماژول در هر دو سطح کوئری و کد",
      ],
    },
    {
      role: "توسعه‌دهنده‌ی فرانت‌اند و پشتیبانی فنی",
      company: "Site Saz Portal",
      period: "مهر ۱۴۰۰ — آذر ۱۴۰۱",
      summary: "ارائه‌ی ویجت‌ها و قابلیت‌های پلتفرم سایت‌ساز، در هر دو سوی استک.",
      points: [
        "توسعه‌ی قابلیت‌های بک‌اند و APIهای RESTful با ASP.NET Core، Entity Framework Core و SQL Server",
        "ساخت ویجت‌ها و قابلیت‌های جدید که کاربر نهایی می‌توانست به‌صورت پویا اضافه و پیکربندی کند",
        "بازسازی ماژول‌های اصلی و ویجت‌های تعاملی با Angular و چیدمان‌های واکنش‌گرای سفارشی — ۳۰٪ بهبود عملکرد سمت کلاینت",
        "برقراری ارتباط Real-time روی WebSockets و کاهش چشمگیر زمان بارگذاری اولیه از طریق code splitting و dynamic import در Next.js و کشِ TanStack Query",
        "رفع مشکلات پیچیده‌ی مسیریابیِ دامنه و یکسان‌سازیِ مدیریت خطا و حالت‌های lazy-loading در کل سایت",
      ],
    },
    {
      role: "کارآموز توسعه‌ی فرانت‌اند",
      company: "Shahan Gold Company",
      period: "فروردین ۱۴۰۰ — شهریور ۱۴۰۰",
      summary: "ساخت پایه‌ها: کامپوننت‌های تمیز، چیدمان محکم و تحویل قابل‌اتکا.",
      points: [
        "توسعه‌ی رابط‌های واکنش‌گرای سمت مشتری برای پلتفرم‌های فروشگاهی و کاتالوگ با Vue و Nuxt.js",
        "همکاری نزدیک با طراحان UI/UX برای پیاده‌سازی چیدمان‌های سیال",
        "ساخت state محلیِ انعطاف‌پذیر با Context API",
      ],
    },
  ],
  achievements: [
    {
      title: "بهینه‌سازی عملکرد",
      body: "کاهش تأخیر تعامل در داشبوردهای چند‌میلیون‌ردیفی از طریق virtualization، memoization و Web Workers.",
    },
    {
      title: "معماری داشبورد مقیاس‌پذیر",
      body: "طراحی لایه‌های ماژولارِ داده و کامپوننت که به تیم‌ها اجازه می‌دهد بدون ایجاد اختلال، ماژول اضافه کنند.",
    },
    {
      title: "سیستم‌های فرانت‌اند Real-time",
      body: "ساخت رابط‌های مقاومِ WebSocket و استریمینگ که تحت بار و شبکه‌های ناپایدار واکنش‌گرا می‌مانند.",
    },
    {
      title: "مدیریت state پیچیده",
      body: "مدل‌سازیِ تمیزِ state پیچیده‌ی برنامه با Zustand، TanStack Query و Redux Toolkit.",
    },
    {
      title: "معماری بک‌اند",
      body: "طراحی و تحویل سرویس‌های ASP.NET Core بر پایه‌ی Onion Architecture — لایه‌بندیِ دامنه‌محور برای تست‌پذیری و نگه‌داشت بلندمدت.",
    },
    {
      title: "معماری تمیز و محصول‌محور",
      body: "ترجمه‌ی اهداف محصول به سیستم‌های فرانت‌اندی که دقیق، قابل‌نگهداری و سریع برای تکرارند.",
    },
  ],
  achievementsPlaceholder: [
    {
      title: "قدردانی Bug Bounty",
      body: "رزرو‌شده برای پژوهش‌های امنیتی و افشای مسئولانه در آینده.",
    },
    {
      title: "گواهی‌نامه‌ها و مجوزها",
      body: "فضایی برای گواهی‌نامه‌های حرفه‌ای پیش‌رو.",
    },
    {
      title: "قدردانی‌های شاخص",
      body: "جوایز و قدردانی‌های جامعه اینجا نمایش داده می‌شوند.",
    },
  ],
  testimonials: [
    {
      name: "مدیر محصول",
      role: "پلتفرم SaaS",
      quote: "حسن اهداف مبهم محصول را به رابط‌هایی دقیق و قابل‌اعتماد تبدیل می‌کند. او به کل سیستم فکر می‌کند، نه فقط صفحه‌ای که پیش رویش است.",
    },
    {
      name: "مهندس بک‌اند",
      role: "تیم مهندسی",
      quote: "یکی از معدود مهندسان فرانت‌اند که واقعاً لایه‌ی داده را می‌فهمد. API‌های ما و UI او همیشه به‌درستی به هم می‌رسیدند.",
    },
    {
      name: "بنیان‌گذار / مشتری",
      role: "استارتاپ نوپا",
      quote: "او فرانت‌اند را به‌صورت سرتاسری در اختیار گرفت و تصمیم‌هایی گرفت که یک بنیان‌گذار می‌تواند به آن‌ها اعتماد کند. محصول از روز اول حرفه‌ای به نظر می‌رسید.",
    },
    {
      name: "هم‌تیمی مهندسی",
      role: "صنف فرانت‌اند",
      quote: "تیزبین، آرام و دقیق. حسن سطح معماری و عملکرد را برای کل تیم بالا برد.",
    },
  ],
  certifications: [
    {
      title: "Building Web APIs with ASP.NET Core 8",
      provider: "LinkedIn Learning",
      date: "اوت ۲۰۲۶",
      url: "https://www.linkedin.com/learning/certificates/2c8f16182e4efa75cb5742d9a0e77e560fe495a836667876ef3b2e1fbc881678",
      image: "/certificates/building-web-apis-aspnet-core-8.png",
    },
    {
      title: "الگوهای پیشرفته React",
      provider: "به‌زودی افزوده می‌شود",
      date: "—",
    },
    {
      title: "طراحی سیستم فرانت‌اند",
      provider: "به‌زودی افزوده می‌شود",
      date: "—",
    },
    {
      title: "TypeScript به‌صورت عمیق",
      provider: "به‌زودی افزوده می‌شود",
      date: "—",
    },
    {
      title: "عملکرد وب",
      provider: "به‌زودی افزوده می‌شود",
      date: "—",
    },
  ],
};

export const mockContent: Record<Lang, CmsData> = { en, fa };
