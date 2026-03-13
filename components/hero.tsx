"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "@/hooks/use-in-view";
import { scrollRevealClass } from "@/lib/scroll-reveal";
import { images } from "@/lib/images";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref);

  return (
    <section
      ref={ref}
      id="hero"
      className="noise-overlay relative flex min-h-screen items-center overflow-hidden"
    >
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-12 px-6 py-32 lg:flex-row lg:items-center lg:justify-between lg:py-0">
        {/* Left content */}
        <div
          className={`${scrollRevealClass(isInView)} flex max-w-xl flex-col gap-6`}
        >
          <h1 className="font-heading text-7xl font-bold leading-none tracking-tighter text-foreground sm:text-8xl lg:text-9xl">
            Kaia
          </h1>
          <p className="text-xl font-medium leading-relaxed text-muted-foreground sm:text-2xl">
            Engineer by day.
            <br />
            <span className="text-primary">Coach by calling.</span>
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all duration-200 hover:bg-primary/90 hover:shadow-[0_0_16px_rgba(143,56,72,0.3)]"
            >
              See My Work
            </Link>
            <Link
              href="/coaching"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-6 py-3 text-sm font-medium text-secondary-foreground transition-all duration-200 hover:bg-border"
            >
              Train With Me
            </Link>
          </div>
        </div>

        {/* Right portrait */}
        <div
          className={`${scrollRevealClass(isInView, 4)} relative h-[500px] w-full max-w-sm lg:h-[600px] lg:max-w-md`}
        >
          <Image
            src={images.hero}
            alt="Kaia - Full Stack Engineer and Coach"
            fill
            className="rounded-lg object-cover object-[50%_35%]"
            priority
            sizes="(max-width: 768px) 100vw, 400px"
          />
          <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
}
