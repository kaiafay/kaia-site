import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coaching | Kaia",
  description: "Work with me — training and nutrition coaching.",
};

export default function CoachingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
