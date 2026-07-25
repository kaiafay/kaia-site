"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FocusEvent,
  type TouchEvent,
  type TransitionEvent,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { scrollRevealClass } from "@/lib/scroll-reveal";
import { cn } from "@/lib/utils";
import { SectionLabel } from "@/components/ui/section-label";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectBadge, type ProjectKind } from "@/components/ui/project-badge";

type FeaturedProject = {
  name: string;
  kind: ProjectKind;
  description: string;
  url: string;
  desktopImage: string;
  mobileImage?: string;
  presentation: "website" | "phone";
};

const PROJECTS: FeaturedProject[] = [
  {
    name: "RichM Co.",
    kind: "client",
    description:
      "Coaching and consulting website with a guided intake flow for prospective clients",
    url: "https://richm-website.vercel.app/",
    desktopImage: "/images/work/richm.webp",
    mobileImage: "/images/work/richm-mobile.webp",
    presentation: "website",
  },
  {
    name: "Dewy Club",
    kind: "concept",
    description:
      "E-commerce storefront for a skincare brand with Stripe integration",
    url: "https://dewy-club.vercel.app/",
    desktopImage: "/images/work/dewy-club.webp",
    presentation: "website",
  },
  {
    name: "Cairn",
    kind: "product",
    description:
      "Health and performance app for check-ins, biometrics, routines, and AI insights",
    url: "https://cairn-checkin.lovable.app",
    desktopImage: "/images/work/cairn.webp",
    presentation: "phone",
  },
];

const CAROUSEL_SLIDES = [...PROJECTS, PROJECTS[0]];
const ROTATE_MS = 4000;
const RESUME_MS = 5000;
const TRANSITION_MS = 700;
const TRANSITION_FALLBACK_MS = TRANSITION_MS + 100;
const SWIPE_THRESHOLD_PX = 48;

function WebsitePreview({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <div className="relative aspect-[91/50] overflow-hidden rounded-lg border border-border bg-secondary shadow-lg">
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className="object-contain object-top"
        sizes="(max-width: 768px) 100vw, 720px"
      />
    </div>
  );
}

function PhonePreview({
  src,
  alt,
  compact = false,
}: {
  src: string;
  alt: string;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <div className="flex aspect-[91/50] items-center justify-center overflow-hidden rounded-lg border border-border bg-secondary shadow-lg">
        <div className="relative h-[88%] aspect-[9/16] overflow-hidden rounded-[0.8rem] border border-black/30 bg-[#1a1a1a] shadow-[0_8px_24px_rgba(0,0,0,0.28)]">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover object-top"
            sizes="120px"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-[1.25rem] border border-border bg-secondary shadow-lg sm:mx-auto sm:max-w-[8.75rem]">
      <div className="relative aspect-[9/16] overflow-hidden bg-secondary">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-top"
          sizes="224px"
        />
      </div>
    </div>
  );
}

function WorkCaption({
  project,
  headingClass = "text-lg",
}: {
  project: FeaturedProject;
  headingClass?: string;
}) {
  return (
    <div className="mt-5 px-1">
      <div className="flex flex-wrap items-center gap-3">
        <p
          className={`font-heading font-semibold text-foreground ${headingClass}`}
        >
          {project.name}
        </p>
        <ProjectBadge kind={project.kind} />
      </div>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
        {project.description}
      </p>
    </div>
  );
}

function ProjectPreview({
  project,
  compactPhone = false,
  priority = false,
}: {
  project: FeaturedProject;
  compactPhone?: boolean;
  priority?: boolean;
}) {
  return project.presentation === "phone" ? (
    <PhonePreview
      src={project.desktopImage}
      alt={`${project.name} app preview`}
      compact={compactPhone}
    />
  ) : (
    <WebsitePreview
      src={project.desktopImage}
      alt={`${project.name} website preview`}
      priority={priority}
    />
  );
}

function MobileFeaturedCarousel({ isInView }: { isInView: boolean }) {
  const [active, setActive] = useState(0);
  const [animated, setAnimated] = useState(true);
  const [autoEnabled, setAutoEnabled] = useState(true);
  const [focused, setFocused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearResumeTimeout = useCallback(() => {
    if (resumeTimeoutRef.current !== null) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
  }, []);

  const resumeAfterDelay = useCallback(() => {
    clearResumeTimeout();
    resumeTimeoutRef.current = setTimeout(() => {
      setAutoEnabled(true);
      resumeTimeoutRef.current = null;
    }, RESUME_MS);
  }, [clearResumeTimeout]);

  const goNext = useCallback(() => {
    setActive((current) =>
      prefersReducedMotion
        ? (current + 1) % PROJECTS.length
        : current >= PROJECTS.length
          ? 0
          : current + 1,
    );
  }, [prefersReducedMotion]);

  const goPrevious = useCallback(() => {
    setActive((current) => {
      if (current <= 0 || current >= PROJECTS.length) {
        return PROJECTS.length - 1;
      }
      return current - 1;
    });
  }, []);

  useEffect(() => {
    const motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileMedia = window.matchMedia("(max-width: 767px)");
    const updatePreferences = () => {
      setPrefersReducedMotion(motionMedia.matches);
      setIsMobile(mobileMedia.matches);
    };
    updatePreferences();
    motionMedia.addEventListener("change", updatePreferences);
    mobileMedia.addEventListener("change", updatePreferences);
    return () => {
      motionMedia.removeEventListener("change", updatePreferences);
      mobileMedia.removeEventListener("change", updatePreferences);
    };
  }, []);

  useEffect(() => {
    if (
      !autoEnabled ||
      focused ||
      !isMobile ||
      prefersReducedMotion ||
      !isInView
    ) {
      return;
    }

    const interval = window.setInterval(goNext, ROTATE_MS);
    return () => window.clearInterval(interval);
  }, [
    autoEnabled,
    focused,
    goNext,
    isMobile,
    isInView,
    prefersReducedMotion,
  ]);

  useEffect(() => clearResumeTimeout, [clearResumeTimeout]);

  useEffect(() => {
    if (active !== PROJECTS.length || prefersReducedMotion) return;

    const fallbackTimeout = window.setTimeout(() => {
      setAnimated(false);
      setActive(0);
    }, TRANSITION_FALLBACK_MS);

    return () => window.clearTimeout(fallbackTimeout);
  }, [active, prefersReducedMotion]);

  useEffect(() => {
    if (!animated && !prefersReducedMotion) {
      let innerFrame: number;
      const outerFrame = requestAnimationFrame(() => {
        innerFrame = requestAnimationFrame(() => setAnimated(true));
      });
      return () => {
        cancelAnimationFrame(outerFrame);
        cancelAnimationFrame(innerFrame);
      };
    }
  }, [animated, prefersReducedMotion]);

  const handleTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    if (active >= PROJECTS.length) {
      setAnimated(false);
      setActive(0);
    }
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    setAutoEnabled(false);
    clearResumeTimeout();
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchStartRef.current;
    touchStartRef.current = null;
    if (!start) return;

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;

    if (
      Math.abs(deltaX) >= Math.abs(deltaY) &&
      Math.abs(deltaX) >= SWIPE_THRESHOLD_PX
    ) {
      if (deltaX < 0) goNext();
      else goPrevious();
    }

    if (!prefersReducedMotion) resumeAfterDelay();
  };

  const handleDotClick = (index: number) => {
    clearResumeTimeout();
    setAutoEnabled(false);
    setAnimated(!prefersReducedMotion);
    setActive(index);
  };

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setFocused(false);
    }
  };

  const dotIndex = active % PROJECTS.length;

  return (
    <div
      className={`${scrollRevealClass(isInView, 1)} md:hidden`}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={handleBlur}
    >
      <div
        className="overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex"
          style={{
            transform: `translateX(-${active * 100}%)`,
            transition:
              animated && !prefersReducedMotion
                ? `transform ${TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`
                : "none",
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {CAROUSEL_SLIDES.map((project, index) => {
            const isActiveRealSlide =
              index === active && index < PROJECTS.length;

            return (
              <div
                key={`${project.name}-${index}`}
                className="w-full shrink-0"
                aria-hidden={!isActiveRealSlide}
              >
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={isActiveRealSlide ? undefined : -1}
                  className="group block transition-transform duration-200 ease-out"
                >
                  <ProjectPreview
                    project={project}
                    compactPhone
                    priority={index === 0}
                  />
                  <WorkCaption project={project} />
                </a>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {PROJECTS.map((project, index) => (
          <button
            key={project.name}
            type="button"
            aria-label={`Show ${project.name} preview`}
            aria-current={index === dotIndex ? "true" : undefined}
            onClick={() => handleDotClick(index)}
            className="inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent p-2 -mx-2 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            <span
              aria-hidden
              className={cn(
                "block h-1.5 shrink-0 rounded-full transition-[width,background-color] duration-300 ease-out",
                index === dotIndex ? "w-5 bg-primary" : "w-1.5 bg-border",
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

function DesktopFeaturedWork({ isInView }: { isInView: boolean }) {
  const [richM, dewyClub, cairn] = PROJECTS;

  return (
    <div className="hidden items-start gap-8 md:grid md:grid-cols-[1.45fr_0.9fr]">
      <a
        href={richM.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`${scrollRevealClass(isInView, 1)} group block w-full transition-transform duration-200 ease-out hover:-translate-y-1`}
      >
        <div className="relative transition-shadow duration-200 group-hover:shadow-[var(--glow-card-strong)]">
          <ProjectPreview project={richM} priority />
          {richM.mobileImage && (
            <div className="absolute -bottom-7 right-5 hidden w-[23%] min-w-[105px] overflow-hidden rounded-[1.35rem] border border-black/30 bg-[#1a1a1a] shadow-[0_10px_30px_rgba(0,0,0,0.28),0_0_0_1px_rgba(217,210,203,0.16)] sm:block">
              <div className="relative aspect-[9/16] overflow-hidden bg-[#1a1a1a]">
                <Image
                  src={richM.mobileImage}
                  alt="RichM Co. mobile website preview"
                  fill
                  className="object-cover object-top"
                  sizes="160px"
                />
              </div>
            </div>
          )}
        </div>
        <WorkCaption project={richM} headingClass="text-xl" />
      </a>

      <div className="grid gap-6">
        <a
          href={dewyClub.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${scrollRevealClass(isInView, 3)} group block w-full transition-transform duration-200 ease-out hover:-translate-y-1`}
        >
          <ProjectPreview project={dewyClub} />
          <WorkCaption project={dewyClub} />
        </a>

        <a
          href={cairn.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${scrollRevealClass(isInView, 5)} group grid w-full grid-cols-[0.45fr_1fr] items-center gap-5 transition-transform duration-200 ease-out hover:-translate-y-1`}
        >
          <ProjectPreview project={cairn} />
          <WorkCaption project={cairn} />
        </a>
      </div>
    </div>
  );
}

export function FeaturedWork() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref);

  return (
    <section ref={ref} id="featured-work" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className={`${scrollRevealClass(isInView)} mb-16`}>
          <SectionLabel as="h2">Featured Work</SectionLabel>
          <SectionHeading className="mt-2">Websites & apps</SectionHeading>
        </div>

        <MobileFeaturedCarousel isInView={isInView} />
        <DesktopFeaturedWork isInView={isInView} />

        <div className={`${scrollRevealClass(isInView, 6)} mt-10 text-center`}>
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors"
          >
            View all work
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-1 group-active:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
