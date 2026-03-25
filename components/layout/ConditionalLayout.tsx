"use client";

import { usePathname } from "next/navigation";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

const STANDALONE_ROUTES = ["/budget-buddy"];

export function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isStandalone = STANDALONE_ROUTES.some((r) => pathname.startsWith(r));

  if (isStandalone) return <>{children}</>;

  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  );
}
