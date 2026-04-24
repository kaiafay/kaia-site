"use client";

import { useRef } from "react";
import Link from "next/link";
import { useInView } from "@/hooks/use-in-view";
import { scrollRevealClass } from "@/lib/scroll-reveal";
import { SectionLabel } from "@/components/ui/section-label";

export function AboutTeaser() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref);

  return (
    <section ref={ref} id="about" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className={`${scrollRevealClass(isInView)} flex flex-col gap-6`}>
          <SectionLabel as="h2">About</SectionLabel>
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
            I didn&apos;t come up through a CS program. I spent years in service
            jobs before I started teaching myself web development out of
            personal interest. Turns out I had a brain for it. I accelerated
            through a full-stack engineering program in 2022, graduated at the
            top of my cohort, and haven&apos;t stopped building since.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/90"
          >
            Read my story →
          </Link>
        </div>
      </div>
    </section>
  );
}
