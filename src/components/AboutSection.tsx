import React from "react";
import Terminal from "./Terminal";
import AboutSectionSocial from "./AboutSectionSocial";

interface AboutData {
  id: string;
  title: string;
  subtitle: string;
  paragraphs: string[];
  skills: {
    title: string;
    list: string[];
  };
}

interface AboutSectionProps {
  data: AboutData;
}

export default function AboutSection({ data }: AboutSectionProps) {
  return (
    <section
      id={data.id}
      className="flex flex-col items-center justify-center min-h-screen py-16 px-4"
      aria-label="About section"
    >
      <div className="max-w-4xl w-full">
        <article className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-text">
            {data.title}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            {data.subtitle}
          </p>
        </article>
        <div>
          <Terminal typingSpeed={40}>{data.paragraphs.join("\n\n")}</Terminal>
        </div>

        <AboutSectionSocial skills={data.skills} />
      </div>
    </section>
  );
}
