import type { Lang } from "@/lib/i18n/config";

/**
 * Interface copy only — labels, headings, button text, form fields,
 * empty states, toasts.
 *
 * The rule for this file: if the words would stay the same when the
 * content behind them changes, they belong here. Anything that is an
 * *entity* (a project, a post, a testimonial) belongs in `lib/cms`;
 * standing profile content (skills, metrics, principles) belongs in
 * `content/profile.ts`.
 *
 * `fa` is typed as `typeof en`, so a key added to one language and
 * forgotten in the other is a compile error rather than a blank string
 * in production.
 */

const en = {
  nav: {
    home: "Home",
    about: "About",
    projects: "Projects",
    experience: "Experience",
    achievements: "Achievements",
    blog: "Blog",
    contact: "Contact",
  },
  common: {
    letsTalk: "Let's Talk",
    viewProjects: "View Projects",
    viewAllProjects: "View All Projects",
    viewProject: "View Project",
    viewCaseStudy: "View Case Study",
    startProject: "Start a Project",
    readArticle: "Read Article",
    moreAboutMe: "More About Me",
    downloadResume: "Download Resume",
    themeToLight: "Switch to light mode",
    themeToDark: "Switch to dark mode",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  languageToggle: {
    en: "EN",
    fa: "فارسی",
    switchToEnglish: "Switch to English",
    switchToPersian: "تغییر به فارسی",
  },
  hero: {
    eyebrow: "Senior Full-Stack Developer · .NET & React",
    titleA: "Building high-performance interfaces for ",
    titleAccent: "complex digital products.",
    description: "I own features end to end — from RESTful APIs and data models in ASP.NET Core through to polished, data-intensive admin panels in React, Next.js, and Vue.",
    available: "Available for select projects",
  },
  heroVisual: {
    chrome: "dashboard / realtime",
    throughput: "Throughput",
    latency: "Latency",
    uptime: "Uptime",
    liveTraffic: "Live traffic",
  },
  whoIAm: {
    eyebrow: "Who I Am",
    titleA: "I build products that feel ",
    titleAccent: "senior.",
    titleB: "",
    paragraph: "A senior-level frontend foundation on top of production-grade backend capability. I design the API and data model, then build the interface that consumes it — so the seam between them is never where things break.",
  },
  skills: {
    eyebrow: "Skills & Expertise",
    title: "A full-stack toolkit, backend included",
    description: "From ASP.NET Core services and SQL Server data models to React, Next.js, and real-time interfaces — both sides of the API, in production.",
  },
  featuredProjects: {
    eyebrow: "Featured Projects",
    viewProject: "View Project",
    viewAll: "View All Projects",
  },
  projects: {
    header: {
      eyebrow: "Projects / Case Studies",
      title: "Systems built for performance and scale.",
      description: "A selection of production work — dashboards, real-time tools, and engines built with a focus on architecture and precision.",
    },
    card: {
      viewCaseStudy: "View Case Study",
    },
    detail: {
      allProjects: "All Projects",
      overview: "Overview",
      keyHighlights: "Key Highlights",
      techStack: "Tech Stack",
      details: "Details",
      role: "Role",
      year: "Year",
      discussSimilar: "Discuss a Similar Project",
      nextProject: "Next Project",
      notFound: "Project not found",
      backToProjects: "Back to Projects",
    },
  },
  experience: {
    header: {
      eyebrow: "Experience",
      title: "A track record of ownership and delivery.",
      description: "From a frontend internship to senior full-stack — years spent building performant, real-time, product-grade systems on both sides of the API.",
    },
    timeline: {
      eyebrow: "Experience",
      title: "A track record of ownership",
      description: "From intern to senior full-stack — a progression built on performance, architecture, and delivery.",
      fullTimeline: "Full Timeline",
    },
  },
  achievements: {
    header: {
      eyebrow: "Achievements",
      title: "Proof of excellence.",
      description: "Not badges for their own sake — evidence of the engineering and leadership that shape reliable products.",
    },
    comingSoon: {
      eyebrow: "Coming Soon",
      title: "Reserved for what's next",
      description: "Placeholder space, kept intentional and easy to update as new recognitions arrive.",
    },
  },
  testimonials: {
    header: {
      eyebrow: "Testimonials / Recommendations",
      title: "What it's like to work with me.",
      description: "Recommendations from teammates, managers, and clients. Real endorsements will be added as they come in.",
    },
    fitNote: "Are we a good fit? A LinkedIn recommendation or client note can live here — the section is ready to receive it.",
    section: {
      eyebrow: "Recommendations",
      title: "Trusted by product teams and founders",
      description: "Real recommendations will land here as they come in. The section is built to receive them.",
    },
  },
  certifications: {
    header: {
      eyebrow: "Certifications / Licenses",
      title: "Credentials & continuous learning.",
      description: "A flexible space for professional certificates and licenses — designed to be updated as new ones are earned.",
    },
    verify: "Verify",
    note: "More certificates and licenses will be added here over time.",
  },
  contact: {
    header: {
      eyebrow: "Contact",
      title: "Let's build something reliable.",
      description: "Available for senior full-stack, backend, dashboard, and real-time engineering projects. Tell me what you're building.",
    },
    getInTouch: "Get in touch",
    getInTouchDesc: "Prefer a direct channel? Reach out any of these ways — I read everything and respond quickly.",
    channels: {
      email: "Email",
      github: "GitHub",
      linkedin: "LinkedIn",
      locationLabel: "Location",
    },
    form: {
      name: "Name",
      namePlaceholder: "Your name",
      email: "Email",
      emailPlaceholder: "you@company.com",
      projectType: "Project Type",
      message: "Message",
      messagePlaceholder: "Tell me about your project, timeline, and goals…",
      send: "Send Message",
    },
    toastError: "Please fill in your name, email, and message.",
    toastSuccess: "Thanks — your message has been sent. I'll be in touch soon.",
  },
  contactCTA: {
    eyebrow: "Contact",
    title: "Let's build something reliable.",
    description: "Available for senior full-stack, backend, dashboard, and real-time engineering work.",
    startProject: "Start a Project",
    viewProjects: "View Projects",
  },
  about: {
    header: {
      eyebrow: "About",
      title: "Senior full-stack developer, .NET and React.",
      description: "I build the interfaces behind complex, data-intensive products — and the APIs and data models underneath them.",
    },
    intro: [
      "I'm Hassan Amini — a Senior Full-Stack Developer based in Tehran, with a strong frontend foundation and solid, production-grade backend capability.",
      "My focus is the demanding end of the stack: management panels rendering millions of continuous data points, real-time interfaces, and applications where performance and correctness genuinely matter. I've kept a heavy panel at a stutter-free 60fps by moving computation into Web Workers, and led a Vue 2 to Vue 3 migration without disrupting delivery.",
      "On the server I design and build RESTful APIs and server-side services in ASP.NET Core (C#) with Entity Framework Core and SQL Server, applying clean, maintainable patterns such as Onion Architecture. Owning a feature from the database and API layer through to the rendered UI is what lets me answer for the whole path rather than half of it.",
      "I work across React, Next.js, Vue, Angular, and React Native, with deep experience in state management, real-time systems, and visualization libraries like Sigma.js, Graphology, and D3.js. Whatever the stack, the goal is the same: reliable, precise, product-ready software.",
    ],
    workWithMe: "Work With Me",
    atAGlance: "At a glance",
    education: "Education",
    howIWork: "How I Work",
    principlesTitle: "Principles behind the work",
  },
  footer: {
    description: "Senior Full-Stack Developer building high-performance interfaces, data-intensive management panels, and the ASP.NET Core services behind them.",
    navigation: "Navigation",
    connect: "Connect",
    email: "Email",
    startProject: "Start a project",
    testimonials: "Testimonials",
    certifications: "Certifications",
    rights: "All rights reserved.",
    tagline: "Designed & engineered with precision.",
  },
  blog: {
    hero: {
      eyebrow: "Blog / Technical Writing",
      title: "Engineering notes for complex digital products.",
      description: "Thoughts on frontend architecture, performance, real-time systems, product engineering, and the decisions behind reliable user interfaces.",
    },
    featured: "Featured",
    readArticle: "Read Article",
    allWriting: "All Writing",
    noArticles: "No articles in this topic yet — new notes are on the way.",
    comingSoon: {
      badge: "In progress",
      title: "The writing is on its way.",
      description: "The blog is being built. The first notes will cover the same ground as the work: frontend architecture, performance under real data volumes, and the API decisions underneath.",
      meanwhile: "In the meantime, the projects page shows the engineering these notes will be about.",
      seeProjects: "See the projects",
    },
    pillars: {
      eyebrow: "What I Write About",
      title: "Writing about the decisions behind better interfaces.",
    },
    cta: {
      eyebrow: "Get in Touch",
      title: "Have a technical challenge worth writing about?",
      description: "Send a project, product, or frontend architecture question. I may turn it into a practical engineering note.",
      startConversation: "Start a Conversation",
      viewProjects: "View Projects",
      preferEmail: "Prefer email?",
      emailPlaceholder: "you@company.com",
      send: "Send",
      sent: "Thanks — I'll be in touch shortly.",
      notSent: "No newsletter. Just a direct line for real questions.",
    },
    allTopics: "All",
  },
};

const fa: typeof en = {
  nav: {
    home: "خانه",
    about: "درباره من",
    projects: "پروژه‌ها",
    experience: "تجربه‌ها",
    achievements: "دستاوردها",
    blog: "بلاگ",
    contact: "تماس",
  },
  common: {
    letsTalk: "بیایید صحبت کنیم",
    viewProjects: "مشاهده پروژه‌ها",
    viewAllProjects: "مشاهده همه پروژه‌ها",
    viewProject: "مشاهده پروژه",
    viewCaseStudy: "مشاهده نمونه‌کار",
    startProject: "شروع یک پروژه",
    readArticle: "خواندن مقاله",
    moreAboutMe: "بیشتر درباره من",
    downloadResume: "دانلود رزومه",
    themeToLight: "تغییر به حالت روشن",
    themeToDark: "تغییر به حالت تاریک",
    openMenu: "باز کردن منو",
    closeMenu: "بستن منو",
  },
  languageToggle: {
    en: "EN",
    fa: "فارسی",
    switchToEnglish: "Switch to English",
    switchToPersian: "تغییر به فارسی",
  },
  hero: {
    eyebrow: "توسعه‌دهنده‌ی ارشد فول‌استک · ‏.NET و React",
    titleA: "ساخت رابط‌های کاربریِ پرسرعت برای ",
    titleAccent: "محصولات دیجیتالِ پیچیده.",
    description: "قابلیت‌ها را سرتاسری تحویل می‌دهم — از APIهای RESTful و مدل‌های داده در ASP.NET Core تا پنل‌های مدیریتیِ داده‌محور و صیقل‌خورده در React، Next.js و Vue.",
    available: "آماده‌ی همکاری در پروژه‌های منتخب",
  },
  heroVisual: {
    chrome: "dashboard / realtime",
    throughput: "توان عبوری",
    latency: "تأخیر",
    uptime: "در دسترس بودن",
    liveTraffic: "ترافیک زنده",
  },
  whoIAm: {
    eyebrow: "من که هستم",
    titleA: "محصولاتی می‌سازم که حسِ ",
    titleAccent: "پختگی",
    titleB: " می‌دهند.",
    paragraph: "یک پایه‌ی قویِ فرانت‌اند در سطح ارشد، روی توانِ بک‌اندی در حد محیط عملیاتی. API و مدل داده را طراحی می‌کنم و سپس رابطی را می‌سازم که آن را مصرف می‌کند — تا درزِ میان این دو، هیچ‌وقت نقطه‌ی شکست نباشد.",
  },
  skills: {
    eyebrow: "مهارت‌ها و تخصص‌ها",
    title: "یک جعبه‌ابزار فول‌استک، با بک‌اند",
    description: "از سرویس‌های ASP.NET Core و مدل‌های داده‌ی SQL Server تا React، Next.js و رابط‌های Real-time — هر دو سوی API، در محیط عملیاتی.",
  },
  featuredProjects: {
    eyebrow: "پروژه‌های منتخب",
    viewProject: "مشاهده پروژه",
    viewAll: "مشاهده همه پروژه‌ها",
  },
  projects: {
    header: {
      eyebrow: "پروژه‌ها / نمونه‌کارها",
      title: "سیستم‌هایی ساخته‌شده برای عملکرد و مقیاس.",
      description: "منتخبی از کارهای واقعی — داشبوردها، ابزارهای Real-time و موتورهایی که با تمرکز بر معماری و دقت ساخته شده‌اند.",
    },
    card: {
      viewCaseStudy: "مشاهده نمونه‌کار",
    },
    detail: {
      allProjects: "همه‌ی پروژه‌ها",
      overview: "مرور کلی",
      keyHighlights: "نکات کلیدی",
      techStack: "پشته‌ی فناوری",
      details: "جزئیات",
      role: "نقش",
      year: "سال",
      discussSimilar: "درباره‌ی پروژه‌ای مشابه صحبت کنیم",
      nextProject: "پروژه‌ی بعدی",
      notFound: "پروژه‌ای یافت نشد",
      backToProjects: "بازگشت به پروژه‌ها",
    },
  },
  experience: {
    header: {
      eyebrow: "تجربه‌ها",
      title: "کارنامه‌ای از مالکیت و تحویل.",
      description: "از یک کارآموزیِ فرانت‌اند تا فول‌استکِ ارشد — سال‌هایی صرفِ ساخت سیستم‌های پرسرعت، Real-time و در سطح محصول، در هر دو سوی API.",
    },
    timeline: {
      eyebrow: "تجربه‌ها",
      title: "کارنامه‌ای از مالکیت",
      description: "از کارآموز تا فول‌استکِ ارشد — مسیری بنا‌شده بر عملکرد، معماری و تحویل.",
      fullTimeline: "خط زمانی کامل",
    },
  },
  achievements: {
    header: {
      eyebrow: "دستاوردها",
      title: "گواهی بر تعالی.",
      description: "نه نشان‌هایی برای خودنمایی — بلکه شواهدی از مهندسی و رهبری‌ای که محصولات قابل‌اعتماد را شکل می‌دهند.",
    },
    comingSoon: {
      eyebrow: "به‌زودی",
      title: "رزرو‌شده برای آینده",
      description: "فضایی نگه‌داشته‌شده، عامدانه و آماده برای به‌روزرسانی با رسیدن دستاوردهای جدید.",
    },
  },
  testimonials: {
    header: {
      eyebrow: "توصیه‌نامه‌ها",
      title: "همکاری با من چگونه است.",
      description: "توصیه‌ها از هم‌تیمی‌ها، مدیران و مشتریان. تأییدیه‌های واقعی به‌مرور اضافه خواهند شد.",
    },
    fitNote: "آیا برای همکاری هم‌خوان هستیم؟ یک توصیه‌ی LinkedIn یا یادداشت مشتری می‌تواند اینجا قرار بگیرد — این بخش آماده‌ی دریافت آن است.",
    section: {
      eyebrow: "توصیه‌ها",
      title: "مورد اعتماد تیم‌های محصول و بنیان‌گذاران",
      description: "توصیه‌های واقعی به‌محض دریافت اینجا قرار می‌گیرند. این بخش برای پذیرش آن‌ها ساخته شده است.",
    },
  },
  certifications: {
    header: {
      eyebrow: "گواهی‌نامه‌ها / مجوزها",
      title: "مدارک و یادگیری مستمر.",
      description: "فضایی منعطف برای گواهی‌نامه‌ها و مجوزهای حرفه‌ای — طراحی‌شده تا با کسب موارد جدید به‌روزرسانی شود.",
    },
    verify: "بررسی",
    note: "گواهی‌نامه‌ها و مجوزهای بیشتری به‌مرور اینجا اضافه خواهند شد.",
  },
  contact: {
    header: {
      eyebrow: "تماس",
      title: "بیایید چیزی قابل‌اعتماد بسازیم.",
      description: "آماده‌ی همکاری در پروژه‌های فول‌استکِ ارشد، بک‌اند، داشبورد و Real-time. بگویید چه می‌سازید.",
    },
    getInTouch: "در تماس باشید",
    getInTouchDesc: "کانال مستقیم را ترجیح می‌دهید؟ از هر یک از این راه‌ها با من در ارتباط باشید — همه را می‌خوانم و سریع پاسخ می‌دهم.",
    channels: {
      email: "ایمیل",
      github: "GitHub",
      linkedin: "LinkedIn",
      locationLabel: "موقعیت",
    },
    form: {
      name: "نام",
      namePlaceholder: "نام شما",
      email: "ایمیل",
      emailPlaceholder: "you@company.com",
      projectType: "نوع پروژه",
      message: "پیام",
      messagePlaceholder: "درباره‌ی پروژه، زمان‌بندی و اهدافتان بگویید…",
      send: "ارسال پیام",
    },
    toastError: "لطفاً نام، ایمیل و پیام خود را وارد کنید.",
    toastSuccess: "ممنون — پیام شما ارسال شد. به‌زودی با شما در تماس خواهم بود.",
  },
  contactCTA: {
    eyebrow: "تماس",
    title: "بیایید چیزی قابل‌اعتماد بسازیم.",
    description: "آماده‌ی همکاری در کارهای فول‌استکِ ارشد، بک‌اند، داشبورد و Real-time.",
    startProject: "شروع یک پروژه",
    viewProjects: "مشاهده پروژه‌ها",
  },
  about: {
    header: {
      eyebrow: "درباره من",
      title: "توسعه‌دهنده‌ی ارشد فول‌استک، ‏.NET و React.",
      description: "من رابط‌های پشتِ محصولات پیچیده و داده‌محور را می‌سازم — و APIها و مدل‌های داده‌ی زیرِ آن‌ها را.",
    },
    intro: [
      "من حسن امینی هستم — توسعه‌دهنده‌ی ارشد فول‌استک، مستقر در تهران؛ با پایه‌ای قوی در فرانت‌اند و توانی بک‌اندی در حد محیط عملیاتی.",
      "تمرکز من روی بخش پرچالشِ استک است: پنل‌های مدیریتی با رندر میلیون‌ها نقطه‌داده‌ی پیوسته، رابط‌های Real-time و اپلیکیشن‌هایی که در آن‌ها عملکرد و درستی واقعاً اهمیت دارد. یک پنل سنگین را با انتقال محاسبات به Web Workers روی ۶۰fps یکنواخت نگه داشته‌ام و مهاجرت Vue 2 به Vue 3 را بدون اختلال در تحویل هدایت کرده‌ام.",
      "در سمت سرور، APIهای RESTful و سرویس‌های سمت سرور را در ASP.NET Core (C#) با Entity Framework Core و SQL Server طراحی و پیاده‌سازی می‌کنم و الگوهای تمیز و قابل‌نگهداری مانند Onion Architecture را به کار می‌گیرم. همین که یک قابلیت را از لایه‌ی پایگاه‌داده و API تا رابطِ رندرشده در اختیار بگیرم، اجازه می‌دهد پاسخ‌گوی کل مسیر باشم، نه نیمی از آن.",
      "با React، Next.js، Vue، Angular و React Native کار می‌کنم و در مدیریت state، سیستم‌های Real-time و کتابخانه‌های بصری‌سازی مانند Sigma.js، Graphology و D3.js تجربه‌ی عمیق دارم. پشته هرچه باشد، هدف یکسان است: نرم‌افزاری قابل‌اعتماد، دقیق و آماده‌ی محصول.",
    ],
    workWithMe: "با من همکاری کنید",
    atAGlance: "در یک نگاه",
    education: "تحصیلات",
    howIWork: "روش کار من",
    principlesTitle: "اصولِ پشتِ کار",
  },
  footer: {
    description: "توسعه‌دهنده‌ی ارشد فول‌استک؛ سازنده‌ی رابط‌های پرسرعت، پنل‌های مدیریتیِ داده‌محور و سرویس‌های ASP.NET Core پشتِ آن‌ها.",
    navigation: "ناوبری",
    connect: "ارتباط",
    email: "ایمیل",
    startProject: "شروع یک پروژه",
    testimonials: "توصیه‌نامه‌ها",
    certifications: "گواهی‌نامه‌ها",
    rights: "تمامی حقوق محفوظ است.",
    tagline: "طراحی و مهندسی‌شده با دقت.",
  },
  blog: {
    hero: {
      eyebrow: "بلاگ / نوشته‌های فنی",
      title: "یادداشت‌های مهندسی برای محصولات دیجیتالِ پیچیده.",
      description: "دیدگاه‌هایی درباره‌ی معماری فرانت‌اند، عملکرد، سیستم‌های Real-time، مهندسی محصول و تصمیم‌های پشتِ رابط‌های کاربریِ قابل‌اعتماد.",
    },
    featured: "منتخب",
    readArticle: "خواندن مقاله",
    allWriting: "همه‌ی نوشته‌ها",
    noArticles: "هنوز مقاله‌ای در این موضوع نیست — یادداشت‌های جدید در راه‌اند.",
    comingSoon: {
      badge: "در دست انجام",
      title: "نوشته‌ها در راه‌اند.",
      description: "بلاگ در حال ساخت است. نخستین یادداشت‌ها همان زمینی را پوشش می‌دهند که کار روی آن انجام می‌شود: معماری فرانت‌اند، عملکرد زیر حجم واقعی داده، و تصمیم‌های API در لایه‌ی زیرین.",
      meanwhile: "تا آن زمان، صفحه‌ی پروژه‌ها همان مهندسی‌ای را نشان می‌دهد که این یادداشت‌ها درباره‌اش خواهند بود.",
      seeProjects: "دیدن پروژه‌ها",
    },
    pillars: {
      eyebrow: "درباره‌ی چه می‌نویسم",
      title: "نوشتن درباره‌ی تصمیم‌های پشتِ رابط‌های بهتر.",
    },
    cta: {
      eyebrow: "در تماس باشید",
      title: "چالشی فنی دارید که ارزش نوشتن داشته باشد؟",
      description: "یک پروژه، محصول یا پرسشِ معماری فرانت‌اند بفرستید. شاید آن را به یک یادداشت مهندسیِ کاربردی تبدیل کنم.",
      startConversation: "شروع گفت‌وگو",
      viewProjects: "مشاهده پروژه‌ها",
      preferEmail: "ایمیل را ترجیح می‌دهید؟",
      emailPlaceholder: "you@company.com",
      send: "ارسال",
      sent: "ممنون — به‌زودی در تماس خواهم بود.",
      notSent: "بدون خبرنامه. فقط یک خط مستقیم برای پرسش‌های واقعی.",
    },
    allTopics: "همه",
  },
};

export type Ui = typeof en;

export function getUi(lang: Lang): Ui {
  return lang === "fa" ? fa : en;
}
