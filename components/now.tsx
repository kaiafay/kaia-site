"use client";

import { useRef } from "react";
import Image from "next/image";
import { useInView } from "@/hooks/use-in-view";
import { scrollRevealClass } from "@/lib/scroll-reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { SectionHeading } from "@/components/ui/section-heading";
import nowData from "@/content/now.json";
import { images } from "@/lib/images";

function BlockLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-xs font-medium tracking-widest text-primary uppercase">
      {children}
    </p>
  );
}

export function Now() {
  const ref = useRef<HTMLElement>(null);
  const learningRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);
  const progressAnimated = useInView(learningRef);

  return (
    <section ref={ref} id="now" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className={`${scrollRevealClass(isInView)} mb-16`}>
          <SectionLabel as="h2">Now</SectionLabel>
          <SectionHeading className="mt-2">What I&apos;m up to</SectionHeading>
        </div>

        {/* IN DEVELOPMENT — top statement */}
        <div className={scrollRevealClass(isInView, 0)}>
          <BlockLabel>In development</BlockLabel>
          <p className="font-heading text-xl font-semibold leading-snug text-foreground">
            {nowData.development.name}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {nowData.development.description}
          </p>
        </div>

        {/* ON REPEAT + IN THE GYM — two column */}
        <div
          className={`${scrollRevealClass(isInView, 1)} mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2`}
        >
          <div>
            <BlockLabel>On repeat</BlockLabel>
            <iframe
              title="Spotify track"
              src={`${nowData.listening.spotifyEmbedUrl}?utm_source=generator&theme=0`}
              width="100%"
              height="80"
              frameBorder={0}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded-xl max-w-xs"
            />
          </div>

          <div>
            <BlockLabel>In the gym</BlockLabel>
            <div className="flex items-baseline gap-1">
              <span className="font-heading text-5xl font-bold text-primary">
                {nowData.training.prValue}
              </span>
              <span className="text-xl font-medium text-primary">
                {nowData.training.prUnit}
              </span>
            </div>
            <p className="mt-1 text-sm font-medium text-foreground">
              {nowData.training.prLabel}
            </p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {nowData.training.focus}
            </p>
          </div>
        </div>

        {/* CURRENTLY READING + BUILDING KNOWLEDGE — two column */}
        <div
          className={`${scrollRevealClass(isInView, 2)} mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2`}
        >
          <div>
            <BlockLabel>Currently reading</BlockLabel>
            <div className="flex items-end gap-4">
              <Image
                src={images.bookCover}
                alt={nowData.reading.title}
                width={72}
                height={108}
                className="shrink-0 rounded-sm object-cover"
              />
              <div>
                <p className="font-heading text-base font-semibold leading-snug text-foreground">
                  {nowData.reading.title}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {nowData.reading.author}
                </p>
                <p className="mt-2 text-sm italic text-muted-foreground">
                  {nowData.reading.reaction}
                </p>
              </div>
            </div>
          </div>

          <div ref={learningRef}>
            <BlockLabel>Building knowledge</BlockLabel>
            <div className="grid grid-cols-1 gap-5">
            {nowData.learning.items.map((item) => (
              <div key={item.name}>
                <div className="mb-1.5 flex items-center justify-between gap-2">
                  <span className="text-sm text-muted-foreground">
                    {item.name}
                  </span>
                  <span className="shrink-0 text-xs tabular-nums text-muted-foreground/70">
                    {item.percent}%
                  </span>
                </div>
                <div className="h-[3px] w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full w-full origin-left rounded-full bg-primary/70 transition-transform duration-700 ease-out will-change-transform"
                    style={{
                      transform: progressAnimated
                        ? `scaleX(${item.percent / 100}) translateZ(0)`
                        : "scaleX(0) translateZ(0)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
