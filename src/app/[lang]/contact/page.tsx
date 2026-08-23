import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { isLang } from "@/lib/i18n/config";
import { getUi } from "@/i18n/ui";
import { getProfile } from "@/content/profile";
import { CONTACT } from "@/lib/site";
import { Container, Reveal } from "@/components/primitives";
import { PageHeader } from "@/components/sections/PageHeader";
import { ContactForm } from "@/components/sections/ContactForm";

/**
 * Contact.
 *
 * The one page every CTA on the site points at, so it stays a server
 * component: only the form itself needs state, and only the form crosses
 * into the client bundle.
 */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};

  const ui = getUi(lang);
  return {
    title: ui.contact.header.eyebrow,
    description: ui.contact.header.description,
    alternates: {
      canonical: `/${lang}/contact`,
      languages: {
        en: "/en/contact",
        fa: "/fa/contact",
        "x-default": "/en/contact",
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
  const profile = getProfile(lang);

  /**
   * `dir="ltr"` on the values: an email address, a URL host and a handle are
   * Latin script whatever the page language, and under an RTL paragraph bidi
   * would otherwise move the trailing punctuation to the wrong end.
   */
  const channels = [
    {
      icon: Mail,
      label: ui.contact.channels.email,
      value: CONTACT.email,
      href: `mailto:${CONTACT.email}`,
      external: false,
    },
    {
      icon: Github,
      label: ui.contact.channels.github,
      value: CONTACT.github.replace(/^https?:\/\//, ""),
      href: CONTACT.github,
      external: true,
    },
    {
      icon: Linkedin,
      label: ui.contact.channels.linkedin,
      value: CONTACT.linkedin.replace(/^https?:\/\//, ""),
      href: CONTACT.linkedin,
      external: true,
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow={ui.contact.header.eyebrow}
        title={ui.contact.header.title}
        description={ui.contact.header.description}
      />

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <Reveal>
              <ContactForm
                copy={ui.contact}
                projectTypes={profile.projectTypes}
              />
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-xl border border-border bg-surface p-7">
                <h2
                  className="text-text-main"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                >
                  {ui.contact.getInTouch}
                </h2>
                <p className="mt-3 text-sm text-text-muted">
                  {ui.contact.getInTouchDesc}
                </p>

                <ul className="mt-7 flex flex-col divide-y divide-border">
                  {channels.map(({ icon: Icon, label, value, href, external }) => (
                    <li key={label} className="py-4 first:pt-0 last:pb-0">
                      <a
                        href={href}
                        {...(external
                          ? { target: "_blank", rel: "noreferrer" }
                          : {})}
                        className="group flex items-start gap-3"
                      >
                        <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent">
                          <Icon size={17} />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-xs uppercase tracking-[0.16em] text-text-muted">
                            {label}
                          </span>
                          <span
                            dir="ltr"
                            className="mt-1 block truncate text-start text-sm text-text-main transition-colors group-hover:text-accent"
                          >
                            {value}
                          </span>
                        </span>
                      </a>
                    </li>
                  ))}

                  <li className="py-4 last:pb-0">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent">
                        <MapPin size={17} />
                      </span>
                      <span>
                        <span className="block text-xs uppercase tracking-[0.16em] text-text-muted">
                          {ui.contact.channels.locationLabel}
                        </span>
                        <span className="mt-1 block text-sm text-text-main">
                          {profile.location}
                        </span>
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
