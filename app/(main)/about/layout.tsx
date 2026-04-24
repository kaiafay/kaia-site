import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Software developer, competitive bodybuilder, and coach. This is my story.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
