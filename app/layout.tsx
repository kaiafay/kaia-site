import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
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
    default: "Kaia | Engineer & Coach",
    template: "%s | Kaia",
  },
  description:
    "Full-stack engineer and coach. Building clean software and stronger people.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.kaiafay.com",
    siteName: "Kaia",
    title: "Kaia | Engineer & Coach",
    description:
      "Full-stack engineer and coach. Building clean software and stronger people.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kaia — Engineer & Coach",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kaia | Engineer & Coach",
    description:
      "Full-stack engineer and coach. Building clean software and stronger people.",
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
    <html lang="en">
      <head>
        <link rel="preload" as="image" href="/images/hero-portrait.webp" />
      </head>
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased`}
      >
        <Nav />
        {children}
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
