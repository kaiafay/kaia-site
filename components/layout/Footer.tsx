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

export function Footer() {
  return (
    <footer className="py-8 footer-separator">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center gap-4 text-center text-sm text-muted-foreground">
          <div className="flex items-center gap-5">
            {FOOTER_CONTACT_LINKS.map(({ href, label, kind }) => {
              const Icon = linkIcons[kind];

              return (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  className="transition-colors duration-200 hover:text-foreground"
                  aria-label={label}
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
          <p>Web developer in Boise, Idaho. Serving the Treasure Valley and beyond.</p>
          <div className="flex items-center gap-4 text-xs">
            <Link
              href="/uses"
              className="transition-colors duration-200 hover:text-foreground"
            >
              Uses
            </Link>
            <Link
              href="/blog"
              className="transition-colors duration-200 hover:text-foreground"
            >
              Blog
            </Link>
          </div>
          <p>© 2026 Kaia Fay. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
