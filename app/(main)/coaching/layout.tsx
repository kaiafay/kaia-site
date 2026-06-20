import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Train With Me",
  description:
    "Apply for 1:1 online coaching. Evidence-based programming tailored to your goals.",
  openGraph: {
    title: "Train With Me | Kaia Fay",
    description:
      "Apply for 1:1 online coaching. Evidence-based programming tailored to your goals.",
    url: "https://www.kaiafay.com/coaching",
  },
  twitter: {
    title: "Train With Me | Kaia Fay",
    description:
      "Apply for 1:1 online coaching. Evidence-based programming tailored to your goals.",
  },
  robots: { index: false },
};

export default function CoachingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
