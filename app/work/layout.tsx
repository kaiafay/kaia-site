import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work | Kaia",
  description: "Selected projects — full stack and product work.",
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
