import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description: "Projects and work by Kaia, software developer and builder.",
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
