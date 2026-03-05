"use client";

import { useRef } from "react";
import Image from "next/image";
import { useInView } from "@/hooks/use-in-view";
import { images } from "@/lib/images";
import { SectionLabel } from "@/components/ui/section-label";
import { SectionHeading } from "@/components/ui/section-heading";

export function About() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref);

  return (
    <section ref={ref} id="about" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div
          className={`flex flex-col items-center gap-12 lg:flex-row lg:items-start lg:gap-16 ${
            isInView ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          {/* Left photo */}
          <div className="relative h-[400px] w-full max-w-sm shrink-0 overflow-hidden rounded-lg lg:h-[500px]">
            <Image
              src={images.about}
              alt="Kaia in a maroon workout outfit posing with her arms crossed"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 384px"
            />
          </div>

          {/* Right text */}
          <div className="flex flex-col gap-6">
            <SectionLabel as="h2">About</SectionLabel>
            <SectionHeading>I build things. I build people.</SectionHeading>
            {/* TODO: replace with your own bio paragraphs */}
            <div className="flex flex-col gap-4 text-base leading-relaxed text-muted-foreground">
              <p>
                {
                  "I'm a full stack engineer with a deep love for building clean, scalable software. By day, I'm shipping code \u2014 designing APIs, crafting interfaces, and solving problems that make real products better."
                }
              </p>
              <p>
                {
                  "But when the laptop closes, the weights come out. Strength training and bodybuilding have been my anchor for years \u2014 a practice that taught me discipline, patience, and the power of showing up consistently."
                }
              </p>
              <p>
                {
                  "Now I'm merging both worlds. As a coach, I bring the same systems-thinking mindset from engineering into program design: structured, evidence-based, and tailored to each individual. Whether it's a codebase or a training block, I believe in building with intention."
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
