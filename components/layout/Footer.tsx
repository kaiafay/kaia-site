import { Github, Heart, Instagram, Linkedin, Mail } from "lucide-react";

const footerLinks = [
  {
    href: "mailto:kaia@kaiafay.com",
    label: "Email",
    icon: Mail,
  },
  {
    href: "https://github.com/kaiafay",
    label: "GitHub",
    icon: Github,
  },
  {
    href: "https://www.linkedin.com/in/kaia-scheirman/",
    label: "LinkedIn",
    icon: Linkedin,
  },
  {
    href: "https://www.instagram.com/kaia.builds",
    label: "Instagram",
    icon: Instagram,
  },
];

export function Footer() {
  return (
    <footer className="py-8 footer-separator">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center gap-4 text-center text-sm text-muted-foreground">
          <div className="flex items-center gap-5">
            {footerLinks.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel={
                  href.startsWith("mailto:")
                    ? undefined
                    : "noopener noreferrer"
                }
                className="transition-colors duration-200 hover:text-foreground"
                aria-label={label}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
          <p>© 2026 Kaia. All rights reserved.</p>
          <p>
            Built with love{" "}
            <Heart
              size={12}
              fill="currentColor"
              className="inline-block shrink-0 -translate-y-px align-middle text-muted-foreground"
              aria-hidden
            />
          </p>
        </div>
      </div>
    </footer>
  );
}
