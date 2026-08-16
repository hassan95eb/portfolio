import Link from "next/link";
import { ArrowUpRight, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { Logo } from "./Logo";
import { Container } from "./primitives";
import { CONTACT, NAV_PATHS } from "@/lib/site";
import { getUi } from "@/i18n/ui";
import { getProfile } from "@/content/profile";
import type { Lang } from "@/lib/i18n/config";

/**
 * Server component — no state, no effects, so none of this reaches the client
 * bundle. `Container` is a client primitive, which is fine: a server component
 * may render one.
 */
export function Footer({ lang }: { lang: Lang }) {
  const ui = getUi(lang);
  const { location } = getProfile(lang);

  const navLinks = [
    ...NAV_PATHS.filter((item) => item.key !== "home").map((item) => ({
      label: ui.nav[item.key],
      href: `/${lang}${item.path}`,
    })),
    { label: ui.footer.testimonials, href: `/${lang}/testimonials` },
    { label: ui.footer.certifications, href: `/${lang}/certifications` },
  ];

  return (
    <footer className="relative overflow-hidden bg-primary text-[#F3EAE0]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
      <Container className="py-10">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="flex flex-col gap-5">
            <Logo height={40} />
            <p className="max-w-sm text-sm text-[#BFAF9F]">
              {ui.footer.description}
            </p>
            <div className="flex items-center gap-3 text-sm text-[#BFAF9F]">
              <MapPin size={16} className="text-accent" />
              {location}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-xs uppercase tracking-[0.2em] text-[#BFAF9F]">
              {ui.footer.navigation}
            </h4>
            <ul className="flex flex-col gap-3">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[#F3EAE0]/90 transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs uppercase tracking-[0.2em] text-[#BFAF9F]">
              {ui.footer.connect}
            </h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="inline-flex items-center gap-2 text-[#F3EAE0]/90 transition-colors hover:text-accent"
                >
                  <Mail size={15} className="text-accent" /> {ui.footer.email}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-[#F3EAE0]/90 transition-colors hover:text-accent"
                >
                  <Github size={15} className="text-accent" /> GitHub
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-[#F3EAE0]/90 transition-colors hover:text-accent"
                >
                  <Linkedin size={15} className="text-accent" /> LinkedIn
                </a>
              </li>
              <li>
                <Link
                  href={`/${lang}/contact`}
                  className="inline-flex items-center gap-1 text-accent transition-colors hover:brightness-110"
                >
                  {ui.footer.startProject} <ArrowUpRight size={14} />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-[#BFAF9F] md:flex-row">
          {/* Evaluated at build time, since these pages are prerendered. That
              is the right trade for a portfolio — rendering it on the client
              instead would cost a client component for four characters — but it
              means the year only updates on the next deploy. */}
          <span>
            © {new Date().getFullYear()} Hassan Amini. {ui.footer.rights}
          </span>
          <span>{ui.footer.tagline}</span>
        </div>
      </Container>
    </footer>
  );
}
