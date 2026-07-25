"use client";

import { useRef } from "react";
import Link from "next/link";
import { useInView } from "@/hooks/use-in-view";
import { scrollRevealClass } from "@/lib/scroll-reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function WorkPageCta() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref);

  return (
    <section ref={ref} className="relative py-16 lg:py-24">
      <div
        className={`${scrollRevealClass(isInView)} mx-auto max-w-3xl px-6 text-center`}
      >
        <SectionHeading as="h2">Want something like this?</SectionHeading>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          Let&apos;s talk about your project.
        </p>
        <Link
          href="/work-with-me#contact"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all duration-200 hover:bg-primary/90 btn-primary-glow"
        >
          Start a project
        </Link>
      </div>
    </section>
  );
}
