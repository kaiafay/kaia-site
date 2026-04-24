"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { scrollRevealClass } from "@/lib/scroll-reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { SectionHeading } from "@/components/ui/section-heading";

type SiteEntry = {
  name: string;
  description: string;
  url: string;
  desktopImage: string;
  mobileImage: string;
};

// Shared aspect ratios for all entries — change here to affect every card.
// Heights are ~3% shorter than the raw screenshot (1632px / 2052px) to clip the bottom edge.
const DESKTOP_RATIO = "2976 / 1583";
const MOBILE_RATIO = "1206 / 1990";

const SITES: SiteEntry[] = [
  {
    name: "Wedding RSVP",
    description: "Personal project — built for my own wedding",
    url: "https://wedding-website-two-gray.vercel.app/",
    desktopImage: "/images/work/wedding-rsvp.webp",
    mobileImage: "/images/work/wedding-rsvp-mobile.webp",
  },
  {
    name: "Driftwood Coffee",
    description: "Sample project — landing page for an independent coffee shop",
    url: "https://driftwood-coffee-nine.vercel.app/",
    desktopImage: "/images/work/driftwood-coffee.webp",
    mobileImage: "/images/work/driftwood-coffee-mobile.webp",
  },
  {
    name: "Drew Callahan",
    description: "Sample project — landing page for a personal trainer",
    url: "https://drew-callahan.vercel.app/",
    desktopImage: "/images/work/drew-callahan.webp",
    mobileImage: "/images/work/drew-callahan-mobile.webp",
  },
  {
    name: "Dewy Club",
    description: "Sample project — landing page for a skincare brand",
    url: "https://dewy-club.vercel.app/",
    desktopImage: "/images/work/dewy-club.webp",
    mobileImage: "/images/work/dewy-club-mobile.webp",
  },
];

// Clone of the first slide appended so we can loop seamlessly.
const SLIDES = [...SITES, SITES[0]];

const ROTATE_MS = 5000;

export function LandingPages() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef);
  const [active, setActive] = useState(0);
  const [animated, setAnimated] = useState(true);

  useEffect(() => {
    if (SITES.length <= 1) return;
    const id = setInterval(() => {
      setActive((prev) => prev + 1);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, []);

  // When we land on the clone at the end, instantly jump back to the real first slide.
  const handleTransitionEnd = () => {
    if (active === SITES.length) {
      setAnimated(false);
      setActive(0);
    }
  };

  // Re-enable the transition after the instant jump has been painted.
  useEffect(() => {
    if (!animated) {
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimated(true));
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [animated]);

  const dotIndex = active % SITES.length;

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className={`${scrollRevealClass(isInView)} mb-16`}>
          <SectionLabel>Websites</SectionLabel>
          <SectionHeading as="h2" className="mt-2">
            Landing Pages
          </SectionHeading>
        </div>

        <div className={scrollRevealClass(isInView, 1)}>
          <div className="max-w-[85%] mx-auto overflow-hidden">
            <div
              style={{
                display: "flex",
                transform: `translateX(-${active * 100}%)`,
                transition: animated
                  ? "transform 700ms cubic-bezier(0.4, 0, 0.2, 1)"
                  : "none",
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {SLIDES.map((site, i) => (
                <div key={i} className="w-full flex-shrink-0">
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${site.name} live site`}
                    className="landing-preview relative block overflow-hidden"
                  >
                    <div
                      className="relative block sm:hidden"
                      style={{ aspectRatio: MOBILE_RATIO }}
                    >
                      <Image
                        src={site.mobileImage}
                        alt={`${site.name} screenshot`}
                        fill
                        sizes="85vw"
                        className="object-cover object-top"
                      />
                    </div>
                    <div
                      className="relative hidden sm:block"
                      style={{ aspectRatio: DESKTOP_RATIO }}
                    >
                      <Image
                        src={site.desktopImage}
                        alt={`${site.name} screenshot`}
                        fill
                        sizes="(min-width: 1200px) 939px, 85vw"
                        className="object-cover object-top"
                      />
                    </div>
                    <span className="block sm:hidden absolute bottom-3 right-3 rounded bg-black/50 p-1.5">
                      <ExternalLink size={16} className="text-white" aria-hidden />
                    </span>
                  </a>

                  <div className="mt-4">
                    <p className="font-heading text-base font-semibold text-foreground">
                      {site.name}
                    </p>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {site.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {SITES.length > 1 && (
            <div className="mt-6 flex justify-center gap-2">
              {SITES.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                    i === dotIndex ? "bg-primary" : "bg-border"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
