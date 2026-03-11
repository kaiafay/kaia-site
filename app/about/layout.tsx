import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Kaia",
  description:
    "Full stack engineer and bodybuilding coach. I build things and build people.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
