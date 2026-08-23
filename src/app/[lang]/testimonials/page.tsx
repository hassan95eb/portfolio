import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLang } from "@/lib/i18n/config";
import { getUi } from "@/i18n/ui";
import { cms } from "@/lib/cms";
import { Container, Reveal } from "@/components/primitives";
import { PageHeader } from "@/components/sections/PageHeader";
import { Testimonials } from "@/components/sections/Testimonials";
import { ContactCTA } from "@/components/sections/ContactCTA";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};

  const ui = getUi(lang);
  return {
    title: ui.footer.testimonials,
    description: ui.testimonials.header.description,
    alternates: {
      canonical: `/${lang}/testimonials`,
      languages: {
        en: "/en/testimonials",
        fa: "/fa/testimonials",
        "x-default": "/en/testimonials",
      },
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const ui = getUi(lang);
  const testimonials = await cms().getTestimonials(lang);

  return (
    <>
      <PageHeader
        eyebrow={ui.testimonials.header.eyebrow}
        title={ui.testimonials.header.title}
        description={ui.testimonials.header.description}
      />
      <Testimonials copy={ui.testimonials.section} items={testimonials} />
      <section className="py-16">
        <Container>
          <Reveal>
            <div className="rounded-xl border border-dashed border-border bg-surface p-8 text-center text-sm text-text-muted">
              {ui.testimonials.fitNote}
            </div>
          </Reveal>
        </Container>
      </section>
      <ContactCTA lang={lang} copy={ui.contactCTA} />
    </>
  );
}
