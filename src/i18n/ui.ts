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
  },
  languageToggle: {
    en: "EN",
    fa: "فارسی",
    switchToEnglish: "Switch to English",
    switchToPersian: "تغییر به فارسی",
  },
  hero: {
    eyebrow: "Senior Frontend Engineer · Solutions Architect",
    titleA: "Building high-performance interfaces for ",
    titleAccent: "complex digital products.",
    description: "I design and engineer scalable frontend systems, real-time dashboards, and polished web experiences with a focus on performance, architecture, and product clarity.",
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
    paragraph: "I combine frontend engineering, systems architecture, and technical leadership to ship products that are fast, reliable, and precise. As a former CTO, I bring product-level thinking to every decision.",
  },
  skills: {
    eyebrow: "Skills & Expertise",
    title: "A complete frontend engineering toolkit",
    description: "From core frameworks to real-time systems and technical leadership — the full stack of a senior frontend engineer.",
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
      description: "From a frontend internship to a CTO role — years spent building performant, real-time, product-grade frontend systems.",
    },
    timeline: {
      eyebrow: "Experience",
      title: "A track record of ownership",
      description: "From intern to CTO — a progression built on performance, architecture, and delivery.",
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
      description: "Available for senior frontend, dashboard, real-time, and product engineering projects. Tell me what you're building.",
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
    description: "Available for senior frontend, dashboard, real-time, and product engineering work.",
    startProject: "Start a Project",
    viewProjects: "View Projects",
  },
  about: {
    header: {
      eyebrow: "About",
      title: "Senior frontend engineer with C-level thinking.",
      description: "I build the interfaces behind complex, data-intensive products — and I bring architecture and leadership experience to every engagement.",
    },
    intro: [
      "I'm Hassan Amini — a Senior Frontend Engineer and Solutions Architect based in Tehran.",
      "My focus is the demanding end of frontend: real-time dashboards, data visualization, and applications where performance and correctness genuinely matter. I've optimized interfaces handling millions of data points, implemented Web Workers to keep experiences smooth, and led framework migrations without disrupting delivery.",
      "As a former CTO, I think beyond the component. I care about how systems scale, how teams stay productive, and how a product feels to the person using it. That combination — hands-on engineering plus architectural and leadership experience — is what lets me own complex frontend work with confidence.",
      "I work across React, Next.js, Vue, and React Native, with deep experience in state management, real-time systems, and visualization libraries like D3.js and Sigma.js. Whatever the stack, the goal is the same: reliable, precise, product-ready frontend.",
    ],
    workWithMe: "Work With Me",
    atAGlance: "At a glance",
    howIWork: "How I Work",
    principlesTitle: "Principles behind the work",
  },
  footer: {
    description: "Senior Frontend Engineer & Solutions Architect building high-performance interfaces, real-time dashboards, and product-minded frontend systems.",
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
  },
  languageToggle: {
    en: "EN",
    fa: "فارسی",
    switchToEnglish: "Switch to English",
    switchToPersian: "تغییر به فارسی",
  },
  hero: {
    eyebrow: "مهندس ارشد فرانت‌اند · معمار راهکار",
    titleA: "ساخت رابط‌های کاربریِ پرسرعت برای ",
    titleAccent: "محصولات دیجیتالِ پیچیده.",
    description: "من سیستم‌های فرانت‌اندِ مقیاس‌پذیر، داشبوردهای Real-time و تجربه‌های وبِ صیقل‌خورده را با تمرکز بر عملکرد، معماری و شفافیت محصول طراحی و مهندسی می‌کنم.",
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
    paragraph: "من مهندسیِ فرانت‌اند، معماریِ سیستم و رهبریِ فنی را کنار هم به کار می‌گیرم تا محصولاتی سریع، قابل‌اعتماد و دقیق ارائه دهم. به‌عنوان یک CTOِ سابق، نگاه محصولی را به هر تصمیم می‌آورم.",
  },
  skills: {
    eyebrow: "مهارت‌ها و تخصص‌ها",
    title: "یک جعبه‌ابزار کامل برای مهندسی فرانت‌اند",
    description: "از فریم‌ورک‌های اصلی تا سیستم‌های Real-time و رهبری فنی — مجموعه‌ی کامل مهارت‌های یک مهندس ارشد فرانت‌اند.",
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
      description: "از یک کارآموزیِ فرانت‌اند تا نقش CTO — سال‌هایی صرفِ ساخت سیستم‌های فرانت‌اندِ پرسرعت، Real-time و در سطح محصول.",
    },
    timeline: {
      eyebrow: "تجربه‌ها",
      title: "کارنامه‌ای از مالکیت",
      description: "از کارآموز تا CTO — مسیری بنا‌شده بر عملکرد، معماری و تحویل.",
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
      description: "آماده‌ی همکاری در پروژه‌های فرانت‌اندِ ارشد، داشبورد، Real-time و مهندسی محصول. بگویید چه می‌سازید.",
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
    description: "آماده‌ی همکاری در کارهای فرانت‌اندِ ارشد، داشبورد، Real-time و مهندسی محصول.",
    startProject: "شروع یک پروژه",
    viewProjects: "مشاهده پروژه‌ها",
  },
  about: {
    header: {
      eyebrow: "درباره من",
      title: "مهندس ارشد فرانت‌اند با نگاهی در سطح مدیریت ارشد.",
      description: "من رابط‌های پشتِ محصولات پیچیده و داده‌محور را می‌سازم — و تجربه‌ی معماری و رهبری را به هر همکاری می‌آورم.",
    },
    intro: [
      "من حسن امینی هستم — مهندس ارشد فرانت‌اند و معمار راهکار، مستقر در تهران.",
      "تمرکز من روی بخش پرچالشِ فرانت‌اند است: داشبوردهای Real-time، بصری‌سازی داده و اپلیکیشن‌هایی که در آن‌ها عملکرد و درستی واقعاً اهمیت دارد. رابط‌هایی با میلیون‌ها نقطه‌داده را بهینه کرده‌ام، Web Workers را برای روان‌ماندنِ تجربه به کار گرفته‌ام و مهاجرت‌های فریم‌ورک را بدون اختلال در تحویل هدایت کرده‌ام.",
      "به‌عنوان یک CTOِ سابق، فراتر از کامپوننت فکر می‌کنم. برایم مهم است که سیستم‌ها چگونه مقیاس می‌گیرند، تیم‌ها چگونه بهره‌ور می‌مانند و محصول برای کاربر چه حسی دارد. همین ترکیب — مهندسیِ عملی به‌همراه تجربه‌ی معماری و رهبری — است که به من اجازه می‌دهد کارهای پیچیده‌ی فرانت‌اند را با اطمینان در اختیار بگیرم.",
      "با React، Next.js، Vue و React Native کار می‌کنم و در مدیریت state، سیستم‌های Real-time و کتابخانه‌های بصری‌سازی مانند D3.js و Sigma.js تجربه‌ی عمیق دارم. پشته هرچه باشد، هدف یکسان است: فرانت‌اندی قابل‌اعتماد، دقیق و آماده‌ی محصول.",
    ],
    workWithMe: "با من همکاری کنید",
    atAGlance: "در یک نگاه",
    howIWork: "روش کار من",
    principlesTitle: "اصولِ پشتِ کار",
  },
  footer: {
    description: "مهندس ارشد فرانت‌اند و معمار راهکار؛ سازنده‌ی رابط‌های پرسرعت، داشبوردهای Real-time و سیستم‌های فرانت‌اندِ محصول‌محور.",
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
