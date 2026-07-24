import Link from "next/link";
import { Github, Instagram, Linkedin, Mail, Phone } from "lucide-react";
import {
  FOOTER_CONTACT_LINKS,
  type ContactLinkKind,
} from "@/lib/contact-links";

const linkIcons = {
  email: Mail,
  phone: Phone,
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
} satisfies Record<ContactLinkKind, typeof Mail>;

const footerNavLinks = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/work-with-me" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Uses", href: "/uses" },
  { label: "Contact", href: "/#contact" },
];

export function Footer() {
  return (
    <footer className="py-8 footer-separator">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-6 text-sm text-muted-foreground">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <nav
              className="order-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:order-1"
              aria-label="Footer"
            >
              {footerNavLinks.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="rounded-sm transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {label}
                </Link>
              ))}
            </nav>
            <div className="order-1 flex flex-wrap items-center gap-5 sm:order-2">
              {FOOTER_CONTACT_LINKS.map(({ href, label, kind }) => {
                const Icon = linkIcons[kind];

                return (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="inline-flex size-8 items-center justify-center rounded-md transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label={label}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-2 text-xs sm:flex-row sm:items-center sm:justify-between">
            <p className="order-2 sm:order-1">
              © 2026 Kaia Fay. All rights reserved.
            </p>
            <p className="order-1 sm:order-2">Based in Boise, Idaho.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
