import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Writing about life, fitness, engineering, and building both at once.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
