import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans-active",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading-active",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.kaiafay.com"),
  title: {
    default: "Kaia Fay | Web Developer & Engineer",
    template: "%s | Kaia Fay",
  },
  description:
    "Custom websites and web apps for small businesses and independent pros, built by a software engineer in Boise, Idaho who cares about the details.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.kaiafay.com",
    siteName: "Kaia Fay",
    title: "Kaia Fay | Web Developer & Engineer",
    description:
      "Custom websites and web apps for small businesses and independent pros, built by a software engineer in Boise, Idaho who cares about the details.",
    images: [
      {
        url: "/og-image-v2.jpg",
        width: 1200,
        height: 630,
        alt: "Kaia Fay — Web Developer & Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kaia Fay | Web Developer & Engineer",
    description:
      "Custom websites and web apps for small businesses and independent pros, built by a software engineer in Boise, Idaho who cares about the details.",
    images: ["/og-image-v2.jpg"],
  },
  icons: {
    icon: [
      {
        url: "/icon-light-scheme.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-scheme.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: "/apple-icon.png",
  },
};

// Service-area business (no street address) — claims here must stay factual:
// name, contact, service area, and pricing floor only.
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Kaia Fay",
  url: "https://www.kaiafay.com",
  email: "kaia@kaiafay.com",
  telephone: "+1-541-248-1982",
  description:
    "Custom websites and web apps for small businesses and independent professionals.",
  areaServed: [
    { "@type": "City", name: "Boise" },
    { "@type": "Place", name: "Treasure Valley" },
    { "@type": "State", name: "Idaho" },
  ],
  founder: { "@type": "Person", name: "Kaia Fay" },
  sameAs: [
    "https://github.com/kaiafay",
    "https://www.linkedin.com/in/kaia-scheirman/",
    "https://www.instagram.com/kaia.builds",
  ],
  priceRange: "$600+",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preload" as="image" href="/images/hero-portrait.webp" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
        <Script
          id="theme-init"
          strategy="beforeInteractive"
        >
          {`(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.dataset.theme='light';}}catch(e){}})();`}
        </Script>
      </head>
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
