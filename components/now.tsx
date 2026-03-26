"use client";

import { useRef } from "react";
import { useInView } from "@/hooks/use-in-view";
import { scrollRevealClass } from "@/lib/scroll-reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { SectionHeading } from "@/components/ui/section-heading";
import nowData from "@/content/now.json";

const cardBase =
  "flex min-h-[140px] w-full items-center overflow-hidden rounded-xl px-6 py-6 transition-all duration-300 ease-out sm:px-8 sm:py-8";
// Stronger shadow so it reads on dark; soft maroon edge glow instead of flat border
const edgeGlowLeft =
  "shadow-[0_12px_40px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.04),inset_4px_0_24px_-4px_rgba(143,56,72,0.45)]";
const edgeGlowLeftHover =
  "hover:shadow-[0_24px_56px_rgba(0,0,0,0.6),inset_4px_0_24px_-4px_rgba(143,56,72,0.5)] hover:translate-y-[-4px]";
const edgeGlowRight =
  "shadow-[0_12px_40px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.04),inset_-4px_0_24px_-4px_rgba(143,56,72,0.45)]";
const edgeGlowRightHover =
  "hover:shadow-[0_24px_56px_rgba(0,0,0,0.6),inset_-4px_0_24px_-4px_rgba(143,56,72,0.5)] hover:translate-y-[-4px]";

function CardLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-medium tracking-widest text-primary uppercase">
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
        <div className={`${scrollRevealClass(isInView)} mb-16`}>
          <SectionLabel as="h2">Now</SectionLabel>
          <SectionHeading className="mt-2">What I&apos;m up to</SectionHeading>
        </div>

        <div className="flex flex-col gap-6">
          {/* Card 1 — Reading (left-aligned) */}
          <div
            className={`${scrollRevealClass(isInView, 0)} ${cardBase} ${edgeGlowLeft} ${edgeGlowLeftHover} bg-[#111] md:flex-row`}
          >
            <div className="flex w-full flex-col justify-center text-center md:w-1/2 md:max-w-[50%] md:text-left">
              <CardLabel>Currently reading</CardLabel>
              <div className="mt-3 flex flex-col items-center md:items-start">
                <p className="font-heading text-lg font-semibold text-card-foreground">
                  {nowData.reading.title}
                </p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {nowData.reading.author}
                </p>
                <p className="mt-2 text-sm italic text-muted-foreground">
                  {nowData.reading.reaction}
                </p>
              </div>
            </div>
            <div className="hidden flex-1 md:block" aria-hidden />
          </div>

          {/* Card 2 — Listening (right-aligned) */}
          <div
            className={`${scrollRevealClass(isInView, 2)} ${cardBase} ${edgeGlowRight} ${edgeGlowRightHover} bg-[#141414] md:flex-row`}
          >
            <div className="hidden flex-1 md:block" aria-hidden />
            <div className="flex w-full flex-col justify-center text-center md:ml-auto md:w-1/2 md:max-w-[50%] md:text-right">
              <CardLabel>Currently listening</CardLabel>
              <div className="mt-3 flex justify-center md:justify-end">
                <iframe
                  title="Spotify track"
                  src={nowData.listening.spotifyEmbedUrl}
                  width="100%"
                  height="80"
                  frameBorder={0}
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="max-w-full rounded-md sm:max-w-md"
                />
              </div>
            </div>
          </div>

          {/* Card 3 — Training (left-aligned) */}
          <div
            className={`${scrollRevealClass(isInView, 4)} ${cardBase} ${edgeGlowLeft} ${edgeGlowLeftHover} bg-[#111] md:flex-row`}
          >
            <div className="flex w-full flex-col justify-center text-center md:w-1/2 md:max-w-[50%] md:flex-row md:items-center md:justify-between md:text-left">
              <div>
                <CardLabel>In the gym</CardLabel>
                <p className="mt-3 text-sm text-muted-foreground">
                  Focus: {nowData.training.focus}
                </p>
              </div>
              <div className="mt-4 md:mt-0 md:text-right">
                <span className="font-heading text-3xl font-bold text-primary">
                  {nowData.training.prValue}
                </span>
                <span className="ml-0.5 text-base font-medium text-primary">
                  {nowData.training.prUnit}
                </span>
                <p className="mt-0.5 text-sm font-medium text-card-foreground">
                  {nowData.training.prLabel}
                </p>
              </div>
            </div>
            <div className="hidden flex-1 md:block" aria-hidden />
          </div>

          {/* Card 4 — Learning (right-aligned, two columns) */}
          <div
            ref={learningRef}
            className={`${scrollRevealClass(isInView, 6)} ${cardBase} ${edgeGlowRight} ${edgeGlowRightHover} bg-[#141414] md:flex-row`}
          >
            <div className="hidden flex-1 md:block" aria-hidden />
            <div className="flex w-full flex-col justify-center text-center md:ml-auto md:w-1/2 md:max-w-[50%] md:text-right">
              <CardLabel>Building knowledge</CardLabel>
              <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:justify-items-end">
                {nowData.learning.items.map((item) => (
                  <div key={item.name}>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium text-card-foreground">
                        {item.name}
                      </span>
                      <span className="shrink-0 text-sm tabular-nums text-muted-foreground">
                        {item.percent}%
                      </span>
                    </div>
                    <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-secondary">
                      <div
                        className="progress-fill-animate h-full w-full rounded-full bg-primary origin-left transition-transform duration-700 ease-out will-change-transform"
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
      </div>
    </section>
  );
}
