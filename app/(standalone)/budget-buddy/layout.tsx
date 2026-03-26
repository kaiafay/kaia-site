import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Budget Buddy",
  description:
    "A calendar-based budgeting app that shows your running balance every day, not just at month end.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
