import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
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
    default: "Kaia | Developer & Builder",
    template: "%s | Kaia",
  },
  description:
    "Software developer building apps, taking on freelance projects, and shipping in public.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.kaiafay.com",
    siteName: "Kaia",
    title: "Kaia | Developer & Builder",
    description:
      "Software developer building apps, taking on freelance projects, and shipping in public.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kaia — Developer & Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kaia | Developer & Builder",
    description:
      "Software developer building apps, taking on freelance projects, and shipping in public.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
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
        {/* Prevent flash of wrong theme before JS hydrates */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.dataset.theme='light';}}catch(e){}})();` }} />
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
