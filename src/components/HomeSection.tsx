import React from "react";

interface HomeData {
  id: string;
  greeting: string;
  name: string;
  role: string;
  shortBio: string;
}

interface HomeSectionProps {
  data: HomeData;
}

export default function HomeSection({ data }: HomeSectionProps) {
  // Generate structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: data.name,
    jobTitle: data.role,
    description: data.shortBio,
  };

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <section
        id={data.id}
        className="flex flex-col items-center justify-center h-full px-4"
        aria-label="Home section"
      >
        <article className="text-center w-full">
          <p className="text-base sm:text-lg text-muted-foreground mb-2">
            {data.greeting}
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-3 md:mb-4 px-2">
            {data.name}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-4 md:mb-6 px-2">
            {data.role}
          </p>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto px-2">
            {data.shortBio}
          </p>
        </article>
      </section>
    </>
  );
}
