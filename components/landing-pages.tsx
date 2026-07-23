"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { scrollRevealClass } from "@/lib/scroll-reveal";
import { cn } from "@/lib/utils";
import { SectionLabel } from "@/components/ui/section-label";
import { SectionHeading } from "@/components/ui/section-heading";

type SiteEntry = {
  name: string;
  description: string;
  url: string;
  desktopImage: string;
  mobileImage: string;
};

// Heights are ~3% shorter than the raw screenshot (1632px / 2052px) to clip the bottom edge.
const DESKTOP_RATIO = "2976 / 1583";
const MOBILE_RATIO = "1206 / 1990";

const SITES: SiteEntry[] = [
  {
    name: "RichM Co.",
    description:
      "Coaching and consulting website with a guided intake flow for prospective clients",
    url: "https://richm-website.vercel.app/",
    desktopImage: "/images/work/richm.webp",
    mobileImage: "/images/work/richm-mobile.webp",
  },
  {
    name: "Dewy Club",
    description: "E-commerce storefront for a skincare brand with Stripe integration",
    url: "https://dewy-club.vercel.app/",
    desktopImage: "/images/work/dewy-club.webp",
    mobileImage: "/images/work/dewy-club-mobile.webp",
  },
  {
    name: "Wedding RSVP",
    description: "Wedding RSVP site with an admin dashboard for guests and responses",
    url: "https://kaiaandrichard.vercel.app/",
    desktopImage: "/images/work/wedding-rsvp.webp",
    mobileImage: "/images/work/wedding-rsvp-mobile.webp",
  },
  {
    name: "Driftwood Coffee",
    description: "Landing page for an independent coffee shop",
    url: "https://driftwood-coffee-nine.vercel.app/",
    desktopImage: "/images/work/driftwood-coffee.webp",
    mobileImage: "/images/work/driftwood-coffee-mobile.webp",
  },
];

// Clone of the first slide appended so we can loop seamlessly.
const SLIDES = [...SITES, SITES[0]];

const ROTATE_MS = 5000;

/** Minimum horizontal travel (px) to count as a swipe vs tap. */
const SWIPE_THRESHOLD_PX = 48;

type LandingPagesProps = {
  headingAs?: "h1" | "h2";
};

export function LandingPages({ headingAs = "h2" }: LandingPagesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef);
  const [active, setActive] = useState(0);
  const [animated, setAnimated] = useState(true);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pauseAutoAdvanceAndScheduleResume = useCallback(() => {
    if (SITES.length <= 1) return;
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (resumeTimeoutRef.current !== null) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
    resumeTimeoutRef.current = setTimeout(() => {
      resumeTimeoutRef.current = null;
      if (intervalRef.current !== null) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setActive((prev) => (prev >= SITES.length ? 0 : prev + 1));
      }, ROTATE_MS);
    }, ROTATE_MS);
  }, []);

  const goNext = useCallback(() => {
    setActive((prev) => (prev >= SITES.length ? 0 : prev + 1));
    pauseAutoAdvanceAndScheduleResume();
  }, [pauseAutoAdvanceAndScheduleResume]);

  const goPrev = useCallback(() => {
    setActive((prev) => {
      if (prev <= 0) return SITES.length - 1;
      if (prev >= SITES.length) return SITES.length - 1;
      return prev - 1;
    });
    pauseAutoAdvanceAndScheduleResume();
  }, [pauseAutoAdvanceAndScheduleResume]);

  const goToSlide = useCallback(
    (index: number) => {
      setAnimated(true);
      setActive(index);
      pauseAutoAdvanceAndScheduleResume();
    },
    [pauseAutoAdvanceAndScheduleResume],
  );

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if (SITES.length <= 1) return;
    const t = e.touches[0];
    touchStartRef.current = { x: t.clientX, y: t.clientY };
  }, []);

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (SITES.length <= 1 || !touchStartRef.current) return;
      const start = touchStartRef.current;
      touchStartRef.current = null;
      const t = e.changedTouches[0];
      const dx = t.clientX - start.x;
      const dy = t.clientY - start.y;
      if (Math.abs(dx) < Math.abs(dy)) return;
      if (Math.abs(dx) < SWIPE_THRESHOLD_PX) return;
      if (dx < 0) goNext();
      else goPrev();
    },
    [goNext, goPrev],
  );

  useEffect(() => {
    if (SITES.length <= 1) return;
    if (intervalRef.current !== null) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev >= SITES.length ? 0 : prev + 1));
    }, ROTATE_MS);
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (resumeTimeoutRef.current !== null) {
        clearTimeout(resumeTimeoutRef.current);
        resumeTimeoutRef.current = null;
      }
    };
  }, []);

  // When we land on the clone at the end, instantly jump back to the real first slide.
  const handleTransitionEnd = (e: React.TransitionEvent) => {
    if (e.target !== e.currentTarget) return;
    if (active >= SITES.length) {
      setAnimated(false);
      setActive(0);
    }
  };

  // Safety net: if browser throttling/background tab causes index drift, recover.
  useEffect(() => {
    if (active > SITES.length) {
      setAnimated(false);
      setActive(0);
    }
  }, [active]);

  // Re-enable the transition after the instant jump has been painted.
  useEffect(() => {
    if (!animated) {
      let innerRaf: number;
      const raf = requestAnimationFrame(() => {
        innerRaf = requestAnimationFrame(() => setAnimated(true));
      });
      return () => {
        cancelAnimationFrame(raf);
        cancelAnimationFrame(innerRaf);
      };
    }
  }, [animated]);

  const dotIndex = active % SITES.length;

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className={`${scrollRevealClass(isInView)} mb-16`}>
          <SectionLabel>Websites</SectionLabel>
          <SectionHeading as={headingAs} className="mt-2">
            Landing Pages
          </SectionHeading>
        </div>

        <div className={scrollRevealClass(isInView, 1)}>
          <div
            className="mx-auto max-w-[19rem] overflow-hidden min-[480px]:max-w-xl min-[640px]:max-w-[85%]"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
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
                      className="relative block min-[480px]:hidden"
                      style={{ aspectRatio: MOBILE_RATIO }}
                    >
                      <Image
                        src={site.mobileImage}
                        alt={`${site.name} screenshot`}
                        fill
                        sizes="304px"
                        className="object-cover object-top"
                      />
                    </div>
                    <div
                      className="relative hidden min-[480px]:block"
                      style={{ aspectRatio: DESKTOP_RATIO }}
                    >
                      <Image
                        src={site.desktopImage}
                        alt={`${site.name} screenshot`}
                        fill
                        sizes="(min-width: 1200px) 939px, (min-width: 640px) 85vw, 576px"
                        className="object-cover object-top"
                      />
                    </div>
                    <span className="absolute bottom-3 right-3 block rounded bg-black/50 p-1.5 min-[480px]:hidden">
                      <ExternalLink
                        size={16}
                        className="text-white"
                        aria-hidden
                      />
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
              {SITES.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Show ${s.name} preview`}
                  aria-current={i === dotIndex ? "true" : undefined}
                  onClick={() => goToSlide(i)}
                  className="inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent p-2 -mx-2 outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                >
                  <span
                    aria-hidden
                    className={cn(
                      "block h-1.5 shrink-0 rounded-full transition-[width,background-color] duration-300 ease-out",
                      i === dotIndex ? "w-5 bg-primary" : "w-1.5 bg-border",
                    )}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
