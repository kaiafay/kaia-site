import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work With Me",
  description:
    "Custom websites, web apps, and dev support for small businesses and independent pros in the Treasure Valley. Transparent pricing, one project at a time.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.kaiafay.com/work-with-me",
    siteName: "Kaia Fay",
    title: "Work With Me | Kaia Fay",
    description:
      "Custom websites, web apps, and dev support for small businesses and independent pros in the Treasure Valley. Transparent pricing, one project at a time.",
    images: [
      {
        url: "/og-image-work.jpg",
        width: 1200,
        height: 630,
        alt: "Work with Kaia Fay — freelance web development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Work With Me | Kaia Fay",
    description:
      "Custom websites, web apps, and dev support for small businesses and independent pros in the Treasure Valley. Transparent pricing, one project at a time.",
    images: ["/og-image-work.jpg"],
  },
};

export default function WorkWithMeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
