"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { scrollRevealClass } from "@/lib/scroll-reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { SectionHeading } from "@/components/ui/section-heading";

function ScreenshotPreview({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-border bg-secondary shadow-lg">
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className="object-cover object-top"
        sizes="(max-width: 768px) 100vw, 720px"
      />
    </div>
  );
}

function MobilePreview({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="absolute -bottom-7 right-5 hidden w-[23%] min-w-[105px] overflow-hidden rounded-[1.35rem] border border-black/30 bg-[#1a1a1a] shadow-[0_10px_30px_rgba(0,0,0,0.28),0_0_0_1px_rgba(217,210,203,0.16)] sm:block">
      <div className="relative aspect-[9/16] overflow-hidden bg-[#1a1a1a]">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-top"
          sizes="160px"
        />
      </div>
    </div>
  );
}

function CairnPhoneMockup() {
  return (
    <div className="w-full overflow-hidden rounded-[1.25rem] border border-border bg-secondary shadow-lg sm:mx-auto sm:max-w-[8.75rem]">
      <div className="relative aspect-[9/16] overflow-hidden bg-secondary">
        <Image
          src="/images/work/cairn.webp"
          alt="Cairn health and performance app preview"
          fill
          className="object-cover object-top"
          sizes="224px"
        />
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
          <SectionHeading className="mt-2">
            Websites, apps, and custom builds
          </SectionHeading>
        </div>

        <div className="grid items-start gap-8 md:grid-cols-[1.45fr_0.9fr]">
          <a
            href="https://richm-website.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className={`${scrollRevealClass(isInView, 1)} group mx-auto block w-full max-w-xl transition-transform duration-200 ease-out hover:-translate-y-1 md:max-w-none`}
          >
            <div className="relative transition-shadow duration-200 group-hover:shadow-[var(--glow-card-strong)]">
              <ScreenshotPreview
                src="/images/work/richm.webp"
                alt="RichM Co. website preview"
                priority
              />
              <MobilePreview
                src="/images/work/richm-mobile.webp"
                alt="RichM Co. mobile website preview"
              />
            </div>
            <div className="mt-5 px-1">
              <div>
                <p className="font-heading text-xl font-semibold text-foreground">
                  RichM Co.
                </p>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  Coaching and consulting website with a guided intake flow for
                  prospective clients
                </p>
              </div>
            </div>
          </a>

          <div className="grid gap-6">
            <a
              href="https://dewy-club.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className={`${scrollRevealClass(isInView, 3)} group mx-auto block w-full max-w-xl transition-transform duration-200 ease-out hover:-translate-y-1 md:max-w-none`}
            >
              <ScreenshotPreview
                src="/images/work/dewy-club.webp"
                alt="Dewy Club website preview"
              />
              <div className="mt-5 px-1">
                <div>
                  <p className="font-heading text-lg font-semibold text-foreground">
                    Dewy Club
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    E-commerce storefront for a skincare brand with Stripe
                    integration
                  </p>
                </div>
              </div>
            </a>

            <a
              href="https://cairn-checkin.lovable.app"
              target="_blank"
              rel="noopener noreferrer"
              className={`${scrollRevealClass(isInView, 5)} group mx-auto grid w-full max-w-xl grid-cols-[5.75rem_1fr] items-center gap-4 transition-transform duration-200 ease-out hover:-translate-y-1 min-[375px]:grid-cols-[6.5rem_1fr] sm:grid-cols-[0.45fr_1fr] sm:gap-5 md:max-w-none`}
            >
              <CairnPhoneMockup />
              <div className="px-0">
                <div>
                  <p className="font-heading text-lg font-semibold text-foreground">
                    Cairn
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Health and performance app for check-ins, biometrics,
                    routines, and AI insights
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>

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
