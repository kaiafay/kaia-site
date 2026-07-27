"use client";

import { useRef } from "react";
import Link from "next/link";
import { useInView } from "@/hooks/use-in-view";
import { scrollRevealClass } from "@/lib/scroll-reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { SectionHeading } from "@/components/ui/section-heading";

export function AboutTeaser() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref);

  return (
    <section ref={ref} id="about" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className={`${scrollRevealClass(isInView)} flex flex-col gap-6`}>
          <div>
            <SectionLabel as="h2">About</SectionLabel>
            <SectionHeading className="mt-2 max-w-2xl text-2xl font-semibold leading-snug sm:text-3xl">
              A web developer based in Boise, with roots in the service industry.
            </SectionHeading>
          </div>
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
            I didn&apos;t come up through a CS program. I spent years in service
            jobs before teaching myself web development out of personal
            interest. Turns out I had a brain for it. That background still
            shapes how I build: paying attention to the person on the other
            side, and making sure the details feel considered.
          </p>
          <Link
            href="/about"
            className="group inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors"
          >
            Read my story <span className="inline-block transition-transform duration-200 group-hover:translate-x-1 group-active:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
