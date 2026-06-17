import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Web developer and software engineer. Self-taught, detail-obsessed, and building things clients are proud to put their name on.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
