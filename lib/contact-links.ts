export type ContactLinkKind =
  | "email"
  | "phone"
  | "github"
  | "linkedin"
  | "instagram";

export interface ContactLink {
  kind: ContactLinkKind;
  href: string;
  label: string;
  text: string;
}

export const CONTACT_EMAIL = "kaia@kaiafay.com";
export const CONTACT_PHONE = {
  href: "tel:+15412481982",
  text: "(541) 248-1982",
};

export const SOCIAL_LINKS = [
  {
    kind: "github",
    href: "https://github.com/kaiafay",
    label: "GitHub",
    text: "kaiafay",
  },
  {
    kind: "linkedin",
    href: "https://www.linkedin.com/in/kaia-scheirman/",
    label: "LinkedIn",
    text: "Kaia Fay",
  },
  {
    kind: "instagram",
    href: "https://www.instagram.com/kaia.builds",
    label: "Instagram",
    text: "kaia.builds",
  },
] satisfies ContactLink[];

export const DIRECT_CONTACT_LINKS = [
  {
    kind: "email",
    href: `mailto:${CONTACT_EMAIL}`,
    label: "Email",
    text: CONTACT_EMAIL,
  },
  {
    kind: "phone",
    href: CONTACT_PHONE.href,
    label: "Phone",
    text: CONTACT_PHONE.text,
  },
  ...SOCIAL_LINKS,
] satisfies ContactLink[];

export const FOOTER_CONTACT_LINKS = [
  DIRECT_CONTACT_LINKS[0],
  ...SOCIAL_LINKS,
] satisfies ContactLink[];
