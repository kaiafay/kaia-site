"use client";

import { useRef } from "react";
import Link from "next/link";
import { useInView } from "@/hooks/use-in-view";

export function AboutTeaser() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref);

  return (
    <section ref={ref} id="about" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div
          className={`flex flex-col gap-6 ${isInView ? "animate-fade-in-up" : "opacity-0"}`}
        >
          <h2 className="text-sm font-medium tracking-widest text-primary uppercase">
            About
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
            I&apos;m a full stack engineer with a deep love for building clean,
            scalable software. By day, I&apos;m shipping code — designing APIs,
            crafting interfaces, and solving problems that make real products
            better. When the laptop closes, the weights come out: strength
            training and bodybuilding have been my anchor for years.
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
