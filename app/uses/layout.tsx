import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Uses | Kaia",
  description: "Tools, hardware, gym equipment, and more.",
};

export default function UsesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
