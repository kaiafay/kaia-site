import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Writing about engineering, identity, and everything in between.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
