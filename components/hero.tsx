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
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-12 px-6 py-24 min-[660px]:flex-row min-[660px]:justify-between min-[660px]:gap-6 min-[660px]:py-20 min-[700px]:gap-8 md:items-center lg:py-0">
        {/* Left content */}
        <div
          className={`${scrollRevealClass(isInView)} flex max-w-xl flex-col gap-6 min-[660px]:max-w-[18.5rem] min-[660px]:gap-5 min-[700px]:max-w-[20rem] min-[700px]:gap-6 min-[740px]:max-w-[19rem] md:max-w-xl`}
        >
          <div className="flex flex-col gap-3">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Web Developer · Boise, Idaho
            </p>
            <h1 className="font-heading text-7xl font-bold leading-none tracking-tighter text-foreground min-[660px]:text-6xl min-[700px]:text-7xl md:text-8xl lg:text-9xl">
              Kaia
            </h1>
          </div>
          <div className="flex flex-col gap-3">
            <p className="max-w-lg text-xl font-medium leading-relaxed text-foreground min-[660px]:text-lg min-[700px]:text-xl md:text-2xl">
              Custom websites
              <br />
              <span className="text-muted-foreground">
                designed around your business.
              </span>
            </p>
            <p className="text-xl font-medium leading-relaxed text-primary min-[660px]:text-lg min-[700px]:text-xl md:text-2xl">
              Built with taste and intention.
            </p>
          </div>
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
          className={`${scrollRevealClass(isInView, 4)} w-full max-w-sm min-[660px]:max-w-[17rem] min-[700px]:max-w-[19rem] min-[740px]:max-w-[22rem] md:max-w-sm lg:max-w-md`}
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
