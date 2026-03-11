"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Blog", href: "/blog" },
  { label: "Uses", href: "/uses" },
  { label: "Coaching", href: "/coaching" },
  { label: "Contact", href: "/#contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Invisible overlay — sits above page content but below nav/dropdown */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/80 backdrop-blur-md shadow-[0_1px_0_0_rgba(255,255,255,0.04)]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-foreground transition-colors hover:text-primary font-heading"
          >
            Kaia
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm tracking-wide text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative text-foreground md:hidden w-6 h-6"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <span
              className={`absolute inset-0 transition-all duration-300 ${
                mobileOpen
                  ? "opacity-100 rotate-0 scale-100"
                  : "opacity-0 rotate-90 scale-75"
              }`}
            >
              <X size={24} />
            </span>
            <span
              className={`absolute inset-0 transition-all duration-300 ${
                mobileOpen
                  ? "opacity-0 -rotate-90 scale-75"
                  : "opacity-100 rotate-0 scale-100"
              }`}
            >
              <Menu size={24} />
            </span>
          </button>
        </div>

        {/* Mobile menu — animated slide down */}
        <div
          className={`absolute top-full left-0 right-0 z-50 md:hidden backdrop-blur-md overflow-hidden transition-all duration-500 ease-in-out ${
            mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,10,10,0.8) 85%, rgba(10,10,10,0) 100%)",
            paddingBottom: mobileOpen ? "0.5rem" : "0",
          }}
        >
          <div className="flex flex-col gap-4 px-6 py-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-base text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
