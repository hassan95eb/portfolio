import type { Lang } from "@/lib/i18n/config";

/**
 * Standing profile content: skills, metrics, focus areas, principles.
 *
 * Deliberately NOT in the CMS. These change once or twice a year, and
 * putting them in WordPress would add an editor screen, a GraphQL query
 * and a build-time fetch for content that is effectively static.
 *
 * Everything here is sourced from the CV. The skill groups mirror the CV's
 * own grouping rather than a frontend-only taxonomy, so the two never drift
 * apart when the CV is next revised.
 */

const en = {
  location: "Tehran, Iran",
  focus: [
    {
      title: "Frontend Engineering",
      body: "High-performance interfaces built for data-heavy products.",
    },
    {
      title: "Backend & APIs",
      body: "RESTful services in ASP.NET Core, layered with Onion Architecture and Entity Framework Core.",
    },
    {
      title: "End-to-End Ownership",
      body: "Features owned from the database and API layer through to a polished, fast UI.",
    },
  ],
  skillGroups: [
    {
      title: "Backend & APIs",
      items: [
        "ASP.NET Core",
        "C#",
        "Entity Framework Core",
        "SQL Server",
        "RESTful API Design",
        "Onion Architecture",
        "Python",
      ],
    },
    {
      title: "Frontend Frameworks",
      items: [
        "React.js",
        "Next.js",
        "React Native",
        "Expo",
        "Vue (2 & 3)",
        "Nuxt.js",
        "Angular",
        "Electron",
        "JavaScript (ES6+)",
        "TypeScript",
        "HTML5",
        "CSS3",
      ],
    },
    {
      title: "State & Real-Time",
      items: [
        "Zustand (Persist)",
        "TanStack Query",
        "Redux Toolkit",
        "Pinia",
        "Context API",
        "WebSockets",
        "Socket.IO",
        "Web Workers",
      ],
    },
    {
      title: "UI, Tools & Testing",
      items: [
        "Tailwind CSS",
        "Bootstrap",
        "Shadcn/UI",
        "MUI",
        "Leaflet",
        "Sigma.js",
        "Graphology",
        "D3.js",
        "React Hook Form",
        "Formik",
        "Yup",
        "Git",
      ],
    },
    {
      title: "Soft Skills",
      items: [
        "Sharp problem solving",
        "Team leadership",
        "Technical coordination",
        "Adaptability",
        "Meticulous attention to detail",
      ],
    },
    {
      title: "Languages",
      items: [
        "English",
        "Persian",
      ],
    },
  ],
  metrics: [
    {
      value: "5+",
      label: "Years of Professional Experience",
    },
    {
      value: "2M+",
      label: "Continuous Data Points Rendered",
    },
    {
      value: "60fps",
      label: "Sustained Under Chunk-Loading",
    },
    {
      value: "40%",
      label: "Overall System Performance Gain",
    },
    {
      value: "30%",
      label: "Client Performance Boost",
    },
  ],
  glance: [
    [
      "Role",
      "Senior Full-Stack Developer",
    ],
    [
      "Stack",
      ".NET & React",
    ],
    [
      "Backend",
      "ASP.NET Core, SQL Server",
    ],
    [
      "Location",
      "Tehran, Iran",
    ],
    [
      "Focus",
      "Data-intensive admin panels",
    ],
    [
      "Availability",
      "Open to select projects",
    ],
  ],
  education: {
    degree: "Bachelor of Electrical Engineering",
    field: "Control Systems Orientation",
    institution: "Babol Noshirvani University of Technology (NIT)",
    period: "2013 — 2018",
  },
  principles: [
    {
      title: "Product-minded",
      body: "Every technical decision serves a product outcome. I ask why before how.",
    },
    {
      title: "Performance-first",
      body: "Speed is a feature. I profile, measure, and optimize the paths users actually take.",
    },
    {
      title: "Architecture-led",
      body: "Clean, layered systems — Onion Architecture on the server, modular composition on the client — that let teams move fast without breaking things.",
    },
    {
      title: "End-to-end ownership",
      body: "From the database schema and API contract through to the rendered interface, one person accountable for the whole path.",
    },
  ],
  writingPillars: [
    {
      title: "Architecture",
      body: "How systems are structured for scale, clarity, and long-term maintainability — on both sides of the API.",
    },
    {
      title: "Performance",
      body: "How rendering, caching, workers, and state choices affect real user experience.",
    },
    {
      title: "Leadership",
      body: "How technical decisions connect engineering teams, product goals, and delivery.",
    },
  ],
  projectTypes: [
    "Full-Stack Engineering",
    "Backend / API Development",
    "Real-time Dashboard",
    "Web Application",
    "Product Engineering",
    "Technical Consulting",
    "Other",
  ],
};

const fa: typeof en = {
  location: "تهران، ایران",
  focus: [
    {
      title: "مهندسی فرانت‌اند",
      body: "رابط‌های پرسرعت که برای محصولات داده‌محور ساخته می‌شوند.",
    },
    {
      title: "بک‌اند و API",
      body: "سرویس‌های RESTful در ASP.NET Core، لایه‌بندی‌شده با Onion Architecture و Entity Framework Core.",
    },
    {
      title: "مالکیت سرتاسری",
      body: "مالکیت قابلیت از لایه‌ی پایگاه‌داده و API تا یک رابط کاربریِ صیقلی و سریع.",
    },
  ],
  skillGroups: [
    {
      title: "بک‌اند و API",
      items: [
        "ASP.NET Core",
        "C#",
        "Entity Framework Core",
        "SQL Server",
        "طراحی API به سبک REST",
        "Onion Architecture",
        "Python",
      ],
    },
    {
      title: "فریم‌ورک‌های فرانت‌اند",
      items: [
        "React.js",
        "Next.js",
        "React Native",
        "Expo",
        "Vue (۲ و ۳)",
        "Nuxt.js",
        "Angular",
        "Electron",
        "JavaScript (ES6+)",
        "TypeScript",
        "HTML5",
        "CSS3",
      ],
    },
    {
      title: "مدیریت State و Real-time",
      items: [
        "Zustand (Persist)",
        "TanStack Query",
        "Redux Toolkit",
        "Pinia",
        "Context API",
        "WebSockets",
        "Socket.IO",
        "Web Workers",
      ],
    },
    {
      title: "رابط کاربری، ابزارها و تست",
      items: [
        "Tailwind CSS",
        "Bootstrap",
        "Shadcn/UI",
        "MUI",
        "Leaflet",
        "Sigma.js",
        "Graphology",
        "D3.js",
        "React Hook Form",
        "Formik",
        "Yup",
        "Git",
      ],
    },
    {
      title: "مهارت‌های نرم",
      items: [
        "حل مسئله‌ی دقیق",
        "رهبری تیم",
        "هماهنگی فنی",
        "انطباق‌پذیری",
        "توجه موشکافانه به جزئیات",
      ],
    },
    {
      title: "زبان‌ها",
      items: [
        "انگلیسی",
        "فارسی",
      ],
    },
  ],
  metrics: [
    // Latin numerals on purpose: these render as large display figures, and
    // Persian digits beside a Latin unit ("M", "fps") reorder under bidi.
    {
      value: "5+",
      label: "سال تجربه‌ی حرفه‌ای",
    },
    {
      value: "2M+",
      label: "نقطه‌داده‌ی پیوسته‌ی رندرشده",
    },
    {
      value: "60fps",
      label: "پایدار هنگام بارگذاری تکه‌ای",
    },
    {
      value: "40%",
      label: "افزایش عملکرد کلی سیستم",
    },
    {
      value: "30%",
      label: "افزایش عملکرد سمت کلاینت",
    },
  ],
  glance: [
    [
      "نقش",
      "توسعه‌دهنده‌ی ارشد فول‌استک",
    ],
    [
      "استک",
      ".NET و React",
    ],
    [
      "بک‌اند",
      "ASP.NET Core، SQL Server",
    ],
    [
      "موقعیت",
      "تهران، ایران",
    ],
    [
      "تمرکز",
      "پنل‌های مدیریتیِ داده‌محور",
    ],
    [
      "در دسترس بودن",
      "آماده‌ی پروژه‌های منتخب",
    ],
  ],
  education: {
    degree: "کارشناسی مهندسی برق",
    field: "گرایش کنترل",
    institution: "دانشگاه صنعتی نوشیروانی بابل",
    period: "۱۳۹۲ — ۱۳۹۷",
  },
  principles: [
    {
      title: "محصول‌محور",
      body: "هر تصمیم فنی در خدمت یک نتیجه‌ی محصول است. پیش از «چگونه»، «چرا» را می‌پرسم.",
    },
    {
      title: "عملکرد در اولویت",
      body: "سرعت یک قابلیت است. مسیرهایی را که کاربران واقعاً طی می‌کنند پروفایل، اندازه‌گیری و بهینه می‌کنم.",
    },
    {
      title: "معماری‌محور",
      body: "سیستم‌های تمیز و لایه‌بندی‌شده — Onion Architecture در سمت سرور و ترکیب ماژولار در سمت کلاینت — که به تیم‌ها اجازه می‌دهند سریع پیش بروند بدون اینکه چیزی بشکند.",
    },
    {
      title: "مالکیت سرتاسری",
      body: "از ساختار پایگاه‌داده و قرارداد API تا رابطی که رندر می‌شود؛ یک نفر پاسخ‌گوی کل مسیر.",
    },
  ],
  writingPillars: [
    {
      title: "معماری",
      body: "چگونه سیستم‌ها برای مقیاس، شفافیت و نگهداریِ بلندمدت ساختاردهی می‌شوند — در هر دو سوی API.",
    },
    {
      title: "عملکرد",
      body: "چگونه رندر، کشینگ، workerها و انتخاب‌های state بر تجربه‌ی واقعی کاربر اثر می‌گذارند.",
    },
    {
      title: "رهبری",
      body: "چگونه تصمیم‌های فنی، تیم‌های مهندسی، اهداف محصول و تحویل را به هم پیوند می‌دهند.",
    },
  ],
  projectTypes: [
    "مهندسی فول‌استک",
    "توسعه‌ی بک‌اند و API",
    "داشبورد Real-time",
    "اپلیکیشن وب",
    "مهندسی محصول",
    "مشاوره‌ی فنی",
    "سایر",
  ],
};

export type Profile = typeof en;

export function getProfile(lang: Lang): Profile {
  return lang === "fa" ? fa : en;
}
