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
      slug: "enterprise-management-panel",
      title: "Enterprise Management Panel",
      summary: "Production-ready portal dashboard with custom hooks, automated form validation, and modular network layers.",
      description: "A large-scale administrative platform built to manage operations, users, and data-heavy workflows for an enterprise team. The interface is engineered around reusable primitives and a strict data layer so that new modules ship fast without regressions.",
      role: "Lead Frontend Engineer",
      year: "2024",
      stack: [
        "React",
        "TypeScript",
        "TanStack Query",
        "React Hook Form",
        "Tailwind CSS",
      ],
      highlights: [
        "Custom hook system for data fetching, caching, and optimistic updates",
        "Automated, schema-driven form validation across dozens of forms",
        "Modular network layer with centralized error and auth handling",
        "40% faster interaction times on heavy data tables",
      ],
      accent: "#B96B4A",
    },
    {
      slug: "async-ip-information-suite",
      title: "Asynchronous IP Information Suite",
      summary: "Responsive utility for geo-location, ISP packet analysis, and cross-browser fault tolerance.",
      description: "A real-time diagnostics tool that resolves IP metadata, geo-location, and network characteristics with resilient async flows. Designed to stay responsive and accurate even under flaky connections and inconsistent browser behavior.",
      role: "Frontend Engineer",
      year: "2023",
      stack: [
        "React",
        "WebSockets",
        "Leaflet",
        "Zustand",
        "TypeScript",
      ],
      highlights: [
        "Resilient async pipeline with graceful degradation and retries",
        "Interactive map visualization of geo-location data",
        "Cross-browser fault tolerance and consistent rendering",
        "Streaming ISP packet analysis surfaced in a live view",
      ],
      accent: "#25201C",
    },
    {
      slug: "dynamic-typing-speed-engine",
      title: "Dynamic Typing Speed Engine",
      summary: "Lightweight JavaScript engine for real-time typing speed, accuracy metrics, and input synchronization.",
      description: "A precise, dependency-light engine that measures words-per-minute, accuracy, and consistency in real time. Built with careful input synchronization so metrics stay exact under fast, error-prone typing.",
      role: "Creator",
      year: "2023",
      stack: [
        "JavaScript",
        "Web Workers",
        "Canvas",
        "Vite",
      ],
      highlights: [
        "Real-time WPM and accuracy calculation with sub-frame precision",
        "Input synchronization that survives rapid corrections",
        "Zero heavy dependencies — fast to load and embed",
        "Clean, testable core separated from the UI",
      ],
      accent: "#BFAF9F",
    },
    {
      slug: "realtime-operations-workspace",
      title: "Realtime Operations Workspace",
      summary: "A live operations workspace that brings alerts, queues, and performance signals into one focused view.",
      description: "A responsive monitoring workspace designed for teams that need to read changing operational signals quickly. It combines compact data views, resilient real-time state updates, and clear escalation flows without overwhelming the user.",
      role: "Frontend Architect",
      year: "2024",
      stack: [
        "React",
        "TypeScript",
        "WebSockets",
        "Zustand",
        "Tailwind CSS",
      ],
      highlights: [
        "Live status surfaces with graceful loading and reconnect states",
        "Composable dashboards for queues, alerts, and operational metrics",
        "Performance-oriented rendering for rapidly changing data",
        "Clear visual hierarchy for time-sensitive actions",
      ],
      accent: "#B96B4A",
    },
    {
      slug: "component-system-foundation",
      title: "Component System Foundation",
      summary: "A scalable component foundation for shipping consistent product interfaces across teams.",
      description: "A design-system implementation that turns visual rules into durable frontend primitives. Built to balance product speed, accessibility, and a consistent interaction language across complex interfaces.",
      role: "Design Systems Engineer",
      year: "2022",
      stack: [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Storybook",
        "Figma",
      ],
      highlights: [
        "Token-driven components with documented interaction states",
        "Reusable primitives for forms, navigation, and feedback",
        "Accessible defaults and consistent keyboard behavior",
        "A practical foundation for faster product delivery",
      ],
      accent: "#BFAF9F",
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
      slug: "enterprise-management-panel",
      title: "پنل مدیریت سازمانی",
      summary: "داشبورد پرتالِ آماده‌ی تولید با هوک‌های سفارشی، اعتبارسنجی خودکار فرم‌ها و لایه‌های شبکه‌ی ماژولار.",
      description: "یک پلتفرم مدیریتی در مقیاس بزرگ که برای مدیریت عملیات، کاربران و جریان‌های کاریِ داده‌محورِ یک تیم سازمانی ساخته شده است. رابط کاربری حول primitiveهای قابل‌استفاده‌ی مجدد و یک لایه‌ی داده‌ی منظم مهندسی شده تا ماژول‌های جدید بدون ایجاد اختلال، سریع منتشر شوند.",
      role: "مهندس ارشد فرانت‌اند",
      year: "2024",
      stack: [
        "React",
        "TypeScript",
        "TanStack Query",
        "React Hook Form",
        "Tailwind CSS",
      ],
      highlights: [
        "سیستم هوک سفارشی برای دریافت داده، کشینگ و به‌روزرسانی‌های خوش‌بینانه",
        "اعتبارسنجی خودکار و مبتنی بر schema در ده‌ها فرم",
        "لایه‌ی شبکه‌ی ماژولار با مدیریت متمرکز خطا و احراز هویت",
        "۴۰٪ تعامل سریع‌تر در جدول‌های داده‌ی سنگین",
      ],
      accent: "#B96B4A",
    },
    {
      slug: "async-ip-information-suite",
      title: "مجموعه‌ابزار اطلاعات IP به‌صورت ناهم‌زمان",
      summary: "ابزاری واکنش‌گرا برای موقعیت‌یابی جغرافیایی، تحلیل بسته‌های ISP و تحمل خطا در مرورگرهای مختلف.",
      description: "یک ابزار عیب‌یابیِ Real-time که متادیتای IP، موقعیت جغرافیایی و ویژگی‌های شبکه را با جریان‌های ناهم‌زمانِ مقاوم استخراج می‌کند. به‌گونه‌ای طراحی شده که حتی در اتصال‌های ناپایدار و رفتار ناسازگارِ مرورگرها، واکنش‌گرا و دقیق بماند.",
      role: "مهندس فرانت‌اند",
      year: "2023",
      stack: [
        "React",
        "WebSockets",
        "Leaflet",
        "Zustand",
        "TypeScript",
      ],
      highlights: [
        "خط لوله‌ی ناهم‌زمانِ مقاوم با افت تدریجی و تلاش مجدد",
        "بصری‌سازی تعاملیِ نقشه برای داده‌های موقعیت جغرافیایی",
        "تحمل خطا و رندر یکسان در مرورگرهای مختلف",
        "تحلیل استریمیِ بسته‌های ISP در یک نمای زنده",
      ],
      accent: "#25201C",
    },
    {
      slug: "dynamic-typing-speed-engine",
      title: "موتور پویای سنجش سرعت تایپ",
      summary: "موتور سبک JavaScript برای سنجش Real-time سرعت تایپ، معیارهای دقت و هم‌گام‌سازی ورودی.",
      description: "یک موتور دقیق و کم‌وابستگی که سرعت کلمه در دقیقه، دقت و ثبات را به‌صورت Real-time اندازه می‌گیرد. با هم‌گام‌سازیِ دقیق ورودی ساخته شده تا معیارها حتی در تایپ سریع و پرخطا دقیق بمانند.",
      role: "سازنده",
      year: "2023",
      stack: [
        "JavaScript",
        "Web Workers",
        "Canvas",
        "Vite",
      ],
      highlights: [
        "محاسبه‌ی Real-time سرعت و دقت با دقتی در حد زیرفریم",
        "هم‌گام‌سازیِ ورودی که در برابر اصلاحات سریع پایدار می‌ماند",
        "بدون وابستگی‌های سنگین — بارگذاری و جاسازیِ سریع",
        "هسته‌ی تمیز و تست‌پذیر، جدا از رابط کاربری",
      ],
      accent: "#BFAF9F",
    },
    {
      slug: "realtime-operations-workspace",
      title: "فضای کاری عملیات Real-time",
      summary: "یک فضای کاریِ عملیاتیِ زنده که هشدارها، صف‌ها و سیگنال‌های عملکرد را در یک نمای متمرکز گرد هم می‌آورد.",
      description: "یک فضای کاریِ پایشِ واکنش‌گرا که برای تیم‌هایی طراحی شده که باید سیگنال‌های عملیاتیِ در حال تغییر را سریع بخوانند. نماهای فشرده‌ی داده، به‌روزرسانی‌های مقاومِ وضعیتِ Real-time و جریان‌های شفافِ ارجاع را بدون سردرگم‌کردن کاربر ترکیب می‌کند.",
      role: "معمار فرانت‌اند",
      year: "2024",
      stack: [
        "React",
        "TypeScript",
        "WebSockets",
        "Zustand",
        "Tailwind CSS",
      ],
      highlights: [
        "نمایش وضعیت زنده با حالت‌های بارگذاری و اتصال مجددِ روان",
        "داشبوردهای ترکیب‌پذیر برای صف‌ها، هشدارها و معیارهای عملیاتی",
        "رندرِ عملکردمحور برای داده‌های به‌سرعت در حال تغییر",
        "سلسله‌مراتب بصریِ شفاف برای اقدامات حساس به زمان",
      ],
      accent: "#B96B4A",
    },
    {
      slug: "component-system-foundation",
      title: "زیرساخت سیستم کامپوننت",
      summary: "یک زیرساخت مقیاس‌پذیر برای ارائه‌ی رابط‌های محصولِ یکدست در میان تیم‌ها.",
      description: "پیاده‌سازیِ یک design system که قواعد بصری را به primitiveهای پایدارِ فرانت‌اند تبدیل می‌کند. برای ایجاد توازن میان سرعت محصول، دسترس‌پذیری و یک زبان تعاملیِ یکسان در رابط‌های پیچیده ساخته شده است.",
      role: "مهندس Design System",
      year: "2022",
      stack: [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Storybook",
        "Figma",
      ],
      highlights: [
        "کامپوننت‌های token-driven با حالت‌های تعاملیِ مستند",
        "primitiveهای قابل‌استفاده‌ی مجدد برای فرم‌ها، ناوبری و بازخورد",
        "پیش‌فرض‌های دسترس‌پذیر و رفتار یکسان با کیبورد",
        "زیرساختی کاربردی برای تحویل سریع‌تر محصول",
      ],
      accent: "#BFAF9F",
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
