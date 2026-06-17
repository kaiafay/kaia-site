"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "@/hooks/use-in-view";
import { scrollRevealClass } from "@/lib/scroll-reveal";
import { images } from "@/lib/images";
import { SectionLabel } from "@/components/ui/section-label";
import { SectionHeading } from "@/components/ui/section-heading";
import { Gallery } from "@/components/gallery";
import { PersonalStats } from "@/components/stats";

export default function AboutPage() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref);

  return (
    <main>
      <section ref={ref} className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors"
            >
              <span className="inline-block transition-transform duration-200 group-hover:-translate-x-1 group-active:-translate-x-1">←</span>Back to home
            </Link>
          </div>

          <div
            className={`${scrollRevealClass(isInView)} flex flex-col items-center gap-12 lg:flex-row lg:items-start lg:gap-16`}
          >
            {/* Left photo */}
            <div className="relative h-[400px] w-full max-w-sm shrink-0 overflow-hidden rounded-lg lg:h-[500px]">
              <Image
                src={images.about}
                alt="Kaia in a maroon workout outfit posing with her arms crossed"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 384px"
                priority
              />
            </div>

            {/* Right text */}
            <div className="flex flex-1 flex-col gap-6">
              <div>
                <SectionLabel>About</SectionLabel>
                <SectionHeading as="h1" className="mt-2">
                  Engineer. Athlete. Builder.
                </SectionHeading>
              </div>
              <div className="flex flex-col gap-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  I didn&apos;t come up through a CS program. I spent years in
                  service jobs &mdash; waiting tables, working as a CNA &mdash;
                  before I started teaching myself web development out of
                  personal interest. Turns out I had a brain for it. I
                  accelerated through a full-stack engineering program in 2022,
                  graduated at the top of my cohort, and haven&apos;t stopped
                  building since.
                </p>
                <p>
                  A few years later I started competing in NPC bikini, stepping
                  on stage for the first time in September 2025. Bodybuilding
                  and software development look nothing alike on the surface,
                  but they run on the same engine: obsessive attention to
                  detail, showing up on days you don&apos;t feel like it, and
                  trusting the process even when the results aren&apos;t visible
                  yet.
                </p>
                <p>
                  I&apos;m a perfectionist who notices the small things. When I
                  build something, I care about how it feels to use, not just
                  that it works. Whether I&apos;m shipping my own product or
                  building for a client, that level of care is the standard.
                </p>
                <p className="text-sm text-muted-foreground">
                  You&apos;ve read enough about me.{" "}
                  <Link href="/work" className="group block sm:inline text-primary transition-colors">
                    See what I actually build <span className="inline-block transition-transform duration-200 group-hover:translate-x-1 group-active:translate-x-1">→</span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <PersonalStats />
      <Gallery />
    </main>
  );
}
