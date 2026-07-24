"use client";

import { useRef } from "react";
import { useInView } from "@/hooks/use-in-view";
import { scrollRevealClass } from "@/lib/scroll-reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { SectionHeading } from "@/components/ui/section-heading";

export function WhoIWorkWith() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref);

  return (
    <section ref={ref} id="who-i-work-with" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className={`${scrollRevealClass(isInView)} flex flex-col gap-6`}>
          <div>
            <SectionLabel as="h2">Who I work with</SectionLabel>
            <SectionHeading className="mt-2">
              For people who run the whole thing themselves
            </SectionHeading>
          </div>
          <div className="flex max-w-2xl flex-col gap-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Most of my clients are the business. Lash artists, contractors,
              photographers, coaches, studio owners. People whose work deserves
              a better website than the one they keep putting off.
            </p>
            <p>
              You don&apos;t need to be technical, and you don&apos;t need to
              have it all figured out. You tell me how your business actually
              works. I handle the design, the build, the launch, and the
              technical details after. You work directly with me the whole way,
              and your project never gets handed off to anyone.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
