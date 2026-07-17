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
    "Custom websites and web apps for small businesses and founders, built by a software engineer who cares about the details.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.kaiafay.com",
    siteName: "Kaia Fay",
    title: "Kaia Fay | Web Developer & Engineer",
    description:
      "Custom websites and web apps for small businesses and founders, built by a software engineer who cares about the details.",
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
      "Custom websites and web apps for small businesses and founders, built by a software engineer who cares about the details.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preload" as="image" href="/images/hero-portrait.webp" />
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
