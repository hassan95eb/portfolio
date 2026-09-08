import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BadgeCheck, ExternalLink } from "lucide-react";
import { isLang } from "@/lib/i18n/config";
import { getUi } from "@/i18n/ui";
import { cms } from "@/lib/cms";
import { Container, Reveal } from "@/components/primitives";
import { PageHeader } from "@/components/sections/PageHeader";
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
    title: ui.footer.certifications,
    description: ui.certifications.header.description,
    alternates: {
      canonical: `/${lang}/certifications`,
      languages: {
        en: "/en/certifications",
        fa: "/fa/certifications",
        "x-default": "/en/certifications",
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
  const certifications = await cms().getCertifications(lang);

  return (
    <>
      <PageHeader
        eyebrow={ui.certifications.header.eyebrow}
        title={ui.certifications.header.title}
        description={ui.certifications.header.description}
      />

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-5 md:grid-cols-2">
            {certifications.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05}>
                <div className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface">
                  {item.image && (
                    <a
                      href={item.url ?? item.image}
                      target="_blank"
                      rel="noreferrer"
                      className="block border-b border-border bg-white"
                    >
                      <Image
                        src={item.image}
                        alt={`${item.title} — certificate`}
                        width={1650}
                        height={1275}
                        className="h-52 w-full object-contain"
                      />
                    </a>
                  )}
                  <div className="flex flex-1 items-center justify-between gap-4 p-6">
                    <div className="flex items-center gap-4">
                      <span className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-lg bg-accent/10 text-accent">
                        <BadgeCheck size={22} />
                      </span>
                      <div>
                        <h3
                          className="text-text-main"
                          style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                        >
                          {item.title}
                        </h3>
                        <p className="text-sm text-text-muted">
                          {item.provider} · {item.date}
                        </p>
                      </div>
                    </div>
                    {item.url ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex flex-shrink-0 items-center gap-1 text-xs text-accent transition-colors hover:brightness-110"
                      >
                        {ui.certifications.verify} <ExternalLink size={13} />
                      </a>
                    ) : (
                      /* Inert until the CMS entry carries a verification URL. */
                      <span className="inline-flex flex-shrink-0 items-center gap-1 text-xs text-text-muted">
                        {ui.certifications.verify} <ExternalLink size={13} />
                      </span>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <p className="mt-8 text-center text-sm text-text-muted">
              {ui.certifications.note}
            </p>
          </Reveal>
        </Container>
      </section>

      <ContactCTA lang={lang} copy={ui.contactCTA} />
    </>
  );
}
