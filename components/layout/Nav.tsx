"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Moon, Sun, X } from "lucide-react";

function isNavLinkActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Blog", href: "/blog" },
  { label: "Uses", href: "/uses" },
  { label: "Work With Me", href: "/work-with-me" },
];

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    setTheme(saved === "light" ? "light" : "dark");
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
  };

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
            ? "bg-background/80 backdrop-blur-md border-b border-border/20"
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
          <div className="hidden items-center gap-8 overflow-visible md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link-flashlight text-sm tracking-wide"
                aria-current={
                  isNavLinkActive(pathname, link.href) ? "page" : undefined
                }
                data-active={
                  isNavLinkActive(pathname, link.href) ? "true" : undefined
                }
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right controls: theme toggle (always visible) + hamburger (mobile only) */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="relative flex h-[30px] w-[30px] items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
              style={{ clipPath: "inset(0 -100px 0 -100px)" }}
              aria-label="Toggle theme"
            >
              {mounted ? (
                <>
                  <span
                    className="absolute flex origin-[9px_30px] items-center justify-center md:origin-[9px_48px] size-[18px] transition-[transform,opacity] duration-500 ease-in-out"
                    style={{
                      transform:
                        theme === "dark" ? "rotate(0deg)" : "rotate(45deg)",
                      opacity: theme === "dark" ? 1 : 0,
                    }}
                  >
                    <Sun size={18} />
                  </span>
                  <span
                    className="absolute flex origin-[9px_30px] items-center justify-center md:origin-[9px_48px] size-[18px] transition-[transform,opacity] duration-500 ease-in-out"
                    style={{
                      transform:
                        theme === "dark" ? "rotate(-45deg)" : "rotate(0deg)",
                      opacity: theme === "dark" ? 0 : 1,
                    }}
                  >
                    <Moon size={18} />
                  </span>
                </>
              ) : (
                <span className="block size-[18px]" />
              )}
            </button>

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
        </div>

        {/* Mobile menu — animated slide down */}
        <div
          className={`absolute top-full left-0 right-0 z-50 md:hidden backdrop-blur-md overflow-hidden transition-all duration-500 ease-in-out ${
            mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
          style={{
            background:
              "linear-gradient(to bottom, var(--nav-mobile-bg) 85%, transparent 100%)",
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
