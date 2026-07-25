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
      className="noise-overlay relative flex min-h-screen items-center min-[660px]:overflow-hidden"
    >
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-12 px-6 py-24 min-[660px]:flex-row min-[660px]:justify-between min-[660px]:gap-6 min-[660px]:py-20 min-[700px]:gap-8 md:items-center lg:py-0">
        {/* Left content */}
        <div
          className={`${scrollRevealClass(isInView)} sticky top-24 z-10 flex max-w-xl flex-col gap-6 self-start min-[660px]:static min-[660px]:max-w-[18.5rem] min-[660px]:gap-5 min-[660px]:self-auto min-[700px]:max-w-[20rem] min-[700px]:gap-6 min-[740px]:max-w-[19rem] md:max-w-xl`}
        >
          {/* Role and location live in the About teaser's heading, one section
              down — the hero carries identity, offer, and point of view only. */}
          <h1 className="font-heading text-7xl font-bold leading-none tracking-tighter text-foreground min-[660px]:text-6xl min-[700px]:text-7xl md:text-8xl lg:text-9xl">
            Kaia
          </h1>
          {/* One text object, three parallel fragments: lines are bound by
              line-height, not a flex gap, so the stanza holds together and the
              color steps map one-to-one onto the grammar. */}
          {/* Type steps up only where the row can hold it. Between 660 and
              ~835px the portrait squeezes this column below the 372px the
              24px lines need, so 24px waits until 860. */}
          <p className="max-w-lg text-xl font-medium leading-relaxed text-foreground min-[660px]:text-lg min-[860px]:text-2xl">
            Custom websites and web apps.
            <br />
            <span className="text-muted-foreground">
              Designed around your business.
            </span>
            <br />
            <span className="text-primary">Built with taste and intention.</span>
          </p>
          <div className="flex flex-wrap gap-4 pt-4 min-[660px]:gap-3 min-[700px]:gap-3 md:gap-4">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all duration-200 hover:bg-primary/90 hover:shadow-[0_0_16px_rgba(143,56,72,0.3)] min-[660px]:px-4 min-[700px]:px-5 md:px-6"
            >
              See My Work
            </Link>
            <Link
              href="/work-with-me"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-6 py-3 text-sm font-medium text-secondary-foreground transition-all duration-200 hover:bg-border min-[660px]:px-4 min-[700px]:px-5 md:px-6"
            >
              Work With Me
            </Link>
          </div>
        </div>

        <div
          className={`${scrollRevealClass(isInView, 4)} relative z-20 w-full max-w-sm min-[660px]:z-auto min-[660px]:max-w-[17rem] min-[700px]:max-w-[19rem] min-[740px]:max-w-[22rem] md:max-w-sm lg:max-w-md`}
        >
          <div className="relative isolate h-[500px] w-full overflow-hidden rounded-lg bg-background min-[660px]:h-[390px] min-[700px]:h-[430px] min-[740px]:h-[470px] md:h-[520px] lg:h-[600px]">
            <Image
              src={images.hero}
              alt="Kaia Fay, web developer and software engineer"
              fill
              className="object-cover object-[50%_35%] [mask-image:linear-gradient(to_top,transparent_0%,black_var(--hero-portrait-fade-mid),black_100%)] [mask-size:100%_100%] [-webkit-mask-image:linear-gradient(to_top,transparent_0%,black_var(--hero-portrait-fade-mid),black_100%)] [-webkit-mask-size:100%_100%]"
              priority
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
