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
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              ← Back to home
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
              <SectionLabel as="h2">About</SectionLabel>
              <SectionHeading as="h1">
                I build things. I build people.
              </SectionHeading>
              <div className="flex flex-col gap-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  I&apos;m a full-stack engineer with a passion for building
                  clean, scalable systems and beautiful, intuitive interfaces.
                  By day, I&apos;m shipping code, designing APIs, crafting
                  thoughtful user interfaces, and solving problems that make
                  real products better.
                </p>
                <p>
                  But when the laptop closes, the weights come out. Strength
                  training has been my anchor for years, teaching me discipline,
                  patience, and the power of showing up consistently.
                </p>
                <p>
                  Now I&apos;m merging both worlds. As a coach, I bring the same
                  systems-thinking mindset from engineering into program design:
                  structured, evidence-based, and tailored to each individual.
                  Whether it&apos;s a codebase or a training block, I believe in
                  building with intention.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Gallery />
    </main>
  );
}
