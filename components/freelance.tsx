"use client";

import { useRef } from "react";
import Link from "next/link";
import { useInView } from "@/hooks/use-in-view";
import { scrollRevealClass } from "@/lib/scroll-reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { SectionHeading } from "@/components/ui/section-heading";

export function Freelance() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref);

  return (
    <section ref={ref} id="hire" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className={`${scrollRevealClass(isInView)} max-w-3xl`}>
          <SectionLabel>Work With Me</SectionLabel>
          <SectionHeading as="h2" className="mt-2">
            Let&apos;s build something.
          </SectionHeading>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
            You need a website that actually represents your business. I build
            clean, fast, and intuitive sites for people who care about the
            details. You&apos;ll know where things stand at every step.
          </p>
        </div>

        <div
          className={`${scrollRevealClass(isInView, 1)} mt-12 grid gap-10 md:grid-cols-2 md:gap-12`}
        >
          <div className="relative pl-4 before:absolute before:top-0 before:bottom-0 before:left-0 before:w-[18px] freelance-border before:content-[''] md:pl-0 md:before:hidden">
            <h3 className="font-heading text-2xl font-semibold text-foreground">
              Landing Page
            </h3>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              One page. Clear message. Built to convert.
            </p>
            <p className="mt-4 text-sm font-medium text-foreground">
              From $600, delivered in two weeks.
            </p>
          </div>

          <div className="relative pl-4 before:absolute before:top-0 before:bottom-0 before:left-0 before:w-[18px] freelance-border before:content-[''] md:border-l md:border-border md:pl-12 md:before:hidden">
            <h3 className="font-heading text-2xl font-semibold text-foreground">
              Custom Project
            </h3>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Apps, tools, or anything more involved.
            </p>
            <p className="mt-4 text-sm font-medium text-foreground">
              Scoped per project. Reach out and let&apos;s talk through it.
            </p>
          </div>
        </div>

        <p
          className={`${scrollRevealClass(isInView, 3)} mt-10 text-sm text-muted-foreground`}
        >
          * Post-launch support available at $100/hr.
        </p>

        <p
          className={`${scrollRevealClass(isInView, 4)} mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg`}
        >
          I ask the right questions upfront, keep you in the loop throughout,
          and don&apos;t ship anything I&apos;m not proud of. You get a
          developer who treats your project like it&apos;s her own.
        </p>

        <div className={`${scrollRevealClass(isInView, 6)} mt-10`}>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all duration-200 hover:bg-primary/90 btn-primary-glow"
          >
            Start a project
          </Link>
        </div>
      </div>
    </section>
  );
}
