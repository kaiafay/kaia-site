import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description: "Landing pages, web apps, and client work. Built clean, built with care.",
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
