import type { Lang } from "@/lib/i18n/config";

/**
 * Standing profile content: skills, metrics, focus areas, principles.
 *
 * Deliberately NOT in the CMS. These change once or twice a year, and
 * putting them in WordPress would add an editor screen, a GraphQL query
 * and a build-time fetch for content that is effectively static.
 */

const en = {
  location: "Tehran, Iran",
  focus: [
    {
      title: "Frontend Engineering",
      body: "High-performance interfaces shaped around real product needs.",
    },
    {
      title: "Systems Architecture",
      body: "Resilient data flows and frontend systems that scale with confidence.",
    },
    {
      title: "Technical Leadership",
      body: "Clear direction across product, engineering, and delivery decisions.",
    },
  ],
  skillGroups: [
    {
      title: "Frontend Core",
      items: [
        "React.js",
        "Next.js",
        "Vue",
        "Nuxt.js",
        "Angular",
        "JavaScript",
        "TypeScript",
        "HTML5",
        "CSS3",
      ],
    },
    {
      title: "Mobile & Cross-platform",
      items: [
        "React Native",
        "Expo",
        "Electron",
      ],
    },
    {
      title: "State & Real-time",
      items: [
        "Zustand",
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
      title: "UI & Visualization",
      items: [
        "Tailwind CSS",
        "Shadcn/UI",
        "MUI",
        "Bootstrap",
        "D3.js",
        "Sigma.js",
        "Leaflet",
      ],
    },
    {
      title: "Forms & Architecture",
      items: [
        "React Hook Form",
        "Formik",
        "Yup",
        "Modular architecture",
        "Reusable components",
      ],
    },
    {
      title: "Leadership",
      items: [
        "Technical coordination",
        "Team leadership",
        "Architecture planning",
        "Performance strategy",
      ],
    },
  ],
  metrics: [
    {
      value: "3+",
      label: "Years of Professional Experience",
    },
    {
      value: "2M+",
      label: "Data Points Optimized",
    },
    {
      value: "40%",
      label: "Average Performance Improvement",
    },
    {
      value: "30%",
      label: "Client Performance Boost",
    },
    {
      value: "CTO",
      label: "Level Technical Leadership",
    },
  ],
  glance: [
    [
      "Role",
      "Senior Frontend Engineer",
    ],
    [
      "Also",
      "Solutions Architect",
    ],
    [
      "Leadership",
      "Former CTO",
    ],
    [
      "Location",
      "Tehran, Iran",
    ],
    [
      "Focus",
      "Dashboards & Real-time",
    ],
    [
      "Availability",
      "Open to select projects",
    ],
  ],
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
      body: "Clean, modular systems that let teams move fast without breaking things.",
    },
    {
      title: "Leadership",
      body: "CTO-level thinking — I set standards, mentor, and own outcomes end to end.",
    },
  ],
  writingPillars: [
    {
      title: "Architecture",
      body: "How frontend systems are structured for scale, clarity, and long-term maintainability.",
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
    "Frontend Engineering",
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
      body: "رابط‌های پرسرعت که حول نیازهای واقعیِ محصول شکل می‌گیرند.",
    },
    {
      title: "معماری سیستم‌ها",
      body: "جریان‌های داده‌ی مقاوم و سیستم‌های فرانت‌اندی که با اطمینان مقیاس می‌گیرند.",
    },
    {
      title: "رهبری فنی",
      body: "جهت‌دهیِ شفاف در تصمیم‌های محصول، مهندسی و تحویل.",
    },
  ],
  skillGroups: [
    {
      title: "هسته‌ی فرانت‌اند",
      items: [
        "React.js",
        "Next.js",
        "Vue",
        "Nuxt.js",
        "Angular",
        "JavaScript",
        "TypeScript",
        "HTML5",
        "CSS3",
      ],
    },
    {
      title: "موبایل و کراس‌پلتفرم",
      items: [
        "React Native",
        "Expo",
        "Electron",
      ],
    },
    {
      title: "مدیریت State و Real-time",
      items: [
        "Zustand",
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
      title: "رابط کاربری و بصری‌سازی",
      items: [
        "Tailwind CSS",
        "Shadcn/UI",
        "MUI",
        "Bootstrap",
        "D3.js",
        "Sigma.js",
        "Leaflet",
      ],
    },
    {
      title: "فرم‌ها و معماری",
      items: [
        "React Hook Form",
        "Formik",
        "Yup",
        "معماری ماژولار",
        "کامپوننت‌های قابل‌استفاده‌ی مجدد",
      ],
    },
    {
      title: "رهبری",
      items: [
        "هماهنگی فنی",
        "رهبری تیم",
        "برنامه‌ریزی معماری",
        "استراتژی عملکرد",
      ],
    },
  ],
  metrics: [
    {
      value: "3+",
      label: "سال تجربه‌ی حرفه‌ای",
    },
    {
      value: "2M+",
      label: "نقطه‌داده‌ی بهینه‌سازی‌شده",
    },
    {
      value: "40%",
      label: "میانگین بهبود عملکرد",
    },
    {
      value: "30%",
      label: "افزایش عملکرد سمت کلاینت",
    },
    {
      value: "CTO",
      label: "رهبری فنی در سطح",
    },
  ],
  glance: [
    [
      "نقش",
      "مهندس ارشد فرانت‌اند",
    ],
    [
      "همچنین",
      "معمار راهکار",
    ],
    [
      "رهبری",
      "CTOِ سابق",
    ],
    [
      "موقعیت",
      "تهران، ایران",
    ],
    [
      "تمرکز",
      "داشبوردها و Real-time",
    ],
    [
      "در دسترس بودن",
      "آماده‌ی پروژه‌های منتخب",
    ],
  ],
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
      body: "سیستم‌های تمیز و ماژولار که به تیم‌ها اجازه می‌دهند سریع پیش بروند بدون اینکه چیزی بشکند.",
    },
    {
      title: "رهبری",
      body: "تفکر در سطح CTO — استانداردها را تعیین می‌کنم، منتورینگ می‌کنم و مسئولیت نتایج را سرتاسری بر عهده می‌گیرم.",
    },
  ],
  writingPillars: [
    {
      title: "معماری",
      body: "چگونه سیستم‌های فرانت‌اند برای مقیاس، شفافیت و نگهداریِ بلندمدت ساختاردهی می‌شوند.",
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
    "مهندسی فرانت‌اند",
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
