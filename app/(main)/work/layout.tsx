import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description: "Client work and web apps built by Kaia Fay.",
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
