import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Client sites, concept builds, and the apps I run myself. Everything is live and clickable.",
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
