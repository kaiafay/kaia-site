import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Uses",
  description: "The tools, gear, and apps I actually use every day.",
};

export default function UsesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
