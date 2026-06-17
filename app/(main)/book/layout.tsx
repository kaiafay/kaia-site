import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Discovery Call",
  description:
    "Book a 30-minute discovery call for freelance websites, apps, and project inquiries.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
