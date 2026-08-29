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
      summary: "A Chrome extension that audits a page against 40+ SEO checks and outlines the offending element on the page itself.",
      description: "Most SEO extensions hand you a list of problems and leave you to go find them. SEO Lens closes that loop: click an issue and the page scrolls to the element and outlines it, or highlight every issue at once. It runs entirely in the browser — nothing about the audited page leaves the machine — and exports a branded PDF report in English or Persian.",
      role: "Creator",
      stack: [
        "JavaScript",
        "Chrome Extension (MV3)",
        "HTML & CSS",
        "Playwright",
      ],
      highlights: [
        "Click an issue to scroll to and outline the element, or highlight all at once",
        "Titles measured in pixels the way Google truncates them, not in characters",
        "Catches noindex sent as an HTTP header, which DOM-only checkers miss",
        "Validates RTL pages against the document's dir attribute",
        "Flags schema requesting rich result types Google has since retired",
        "Bilingual UI and a branded PDF export; client-side only, nothing uploaded",
      ],
      accent: "#B96B4A",
      repoUrl: "https://github.com/hassan95eb/seo-extension",
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
      summary: "افزونه‌ی کروم که یک صفحه را با بیش از ۴۰ بررسی سئو می‌سنجد و همان عنصرِ مشکل‌دار را روی خودِ صفحه دور می‌گیرد.",
      description: "بیشتر افزونه‌های سئو فهرستی از مشکلات به شما می‌دهند و پیدا کردنشان را به خودتان واگذار می‌کنند. SEO Lens این حلقه را می‌بندد: روی یک مشکل کلیک کنید، صفحه تا آن عنصر اسکرول می‌شود و دورش کادر می‌کشد — یا همه‌ی مشکل‌ها را یک‌جا هایلایت کنید. کاملاً داخل مرورگر اجرا می‌شود؛ هیچ چیزی از صفحه‌ی بررسی‌شده از دستگاه بیرون نمی‌رود — و گزارش PDF با برندِ اختصاصی، به فارسی یا انگلیسی، خروجی می‌گیرد.",
      role: "سازنده",
      stack: [
        "JavaScript",
        "Chrome Extension (MV3)",
        "HTML و CSS",
        "Playwright",
      ],
      highlights: [
        "کلیک روی هر مشکل، اسکرول و کادرکشی روی همان عنصر — یا هایلایت همه با یک دکمه",
        "اندازه‌گیری عنوان بر حسب پیکسل، همان‌طور که گوگل کوتاهش می‌کند، نه بر حسب کاراکتر",
        "تشخیص noindex ارسال‌شده در هدر HTTP، که بررسی‌های صرفاً DOM‌محور از دست می‌دهند",
        "اعتبارسنجی صفحات راست‌به‌چپ بر اساس ویژگی dir سند",
        "علامت‌گذاری schema‌هایی که نوع rich result بازنشسته‌شده‌ی گوگل را می‌خواهند",
        "رابط دوزبانه و خروجی PDF برنددار؛ تماماً سمت کلاینت، بدون ارسال داده",
      ],
      accent: "#B96B4A",
      repoUrl: "https://github.com/hassan95eb/seo-extension",
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
