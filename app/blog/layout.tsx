import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Kaia",
  description: "Writing on engineering, training, and building.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
