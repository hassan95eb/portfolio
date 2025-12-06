"use client";

import React, { useEffect, useState } from "react";

interface HomeData {
  id: string;
  greeting: string;
  name: string;
  role: string;
  shortBio: string;
  cta: {
    primary: {
      text: string;
      href: string;
    };
    secondary: {
      text: string;
      href: string;
    };
  };
  socialLinks: {
    platform: string;
    url: string;
  }[];
}

interface HomeSectionProps {
  data: HomeData;
}

export default function HomeSection({ data }: HomeSectionProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="text-center">
        <p
          className={`text-lg text-muted-foreground mb-2 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
          style={{ transitionDelay: "0.1s" }}
        >
          {data.greeting}
        </p>
        <h1
          className={`text-4xl md:text-6xl font-bold mb-4 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
          style={{ transitionDelay: "0.3s" }}
        >
          {data.name}
        </h1>
        <p
          className={`text-xl md:text-2xl text-muted-foreground mb-6 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
          style={{ transitionDelay: "0.5s" }}
        >
          {data.role}
        </p>
        <p
          className={`text-base md:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
          style={{ transitionDelay: "0.7s" }}
        >
          {data.shortBio}
        </p>
        <div
          className={`flex gap-4 justify-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "0.9s" }}
        >
          <a
            href={data.cta.primary.href}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors transform hover:scale-105"
          >
            {data.cta.primary.text}
          </a>
          <a
            href={data.cta.secondary.href}
            className="px-6 py-3 border border-border rounded-lg hover:bg-accent transition-colors transform hover:scale-105"
          >
            {data.cta.secondary.text}
          </a>
        </div>
      </div>
    </div>
  );
}
