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
  { label: "Services", href: "/work-with-me" },
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
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || mobileOpen
            ? "bg-background/80 backdrop-blur-md border-b border-border/20"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="flex items-center text-foreground transition-colors hover:text-primary"
            aria-label="Kaia home"
          >
            {/* Display master path from public/images/logo-kf.svg (not the favicon optical variant). */}
            <svg
              aria-hidden="true"
              viewBox="0 0 438 352"
              className="h-6 w-[30px] fill-current"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M68 158.949L208.5 0H437.368V60H242.376Q238.876 60 236.5445 62.6105L225 75.5361V147H428.868V207.5H284.868V351.5H216Q212.5 351.5 210.2629 348.8082L68 177.626V351.5H0V0H68V158.949ZM141.409 167.713L225 271.896V75.5361L141.409 167.713Z"
              />
            </svg>
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
          className={`overflow-hidden transition-all duration-500 ease-in-out md:hidden ${
            mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-6 pb-5 pt-2">
            {navLinks.map((link) => {
              const active = isNavLinkActive(pathname, link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`relative rounded-md px-4 py-3 text-base transition-colors ${
                    active
                      ? "bg-primary/10 text-foreground before:absolute before:left-2 before:top-1/2 before:h-5 before:w-0.5 before:-translate-y-1/2 before:rounded-full before:bg-primary before:content-['']"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}
