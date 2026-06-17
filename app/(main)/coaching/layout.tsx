import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work With Me",
  description:
    "Apply for 1:1 online coaching. Evidence-based programming tailored to your goals.",
  robots: { index: false },
};

export default function CoachingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
