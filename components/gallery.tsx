"use client"

import { useRef } from "react"
import Image from "next/image"
import { useInView } from "@/hooks/use-in-view"
import { images } from "@/lib/images"

export function Gallery() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref)

  return (
    <section
      ref={ref}
      id="gallery"
      className="relative py-24 lg:py-32"
      aria-label="Photo gallery"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div
          className={`mb-12 ${isInView ? "animate-fade-in-up" : "opacity-0"}`}
        >
          <h2 className="text-sm font-medium tracking-widest text-primary uppercase">
            Photos
          </h2>
          {/* TODO: optional — replace gallery section title with your own */}
          <h3 className="mt-2 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            A few moments
          </h3>
        </div>

        <div
          className={`grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 ${
            isInView ? "animate-fade-in-up" : "opacity-0"
          }`}
          style={{ animationDelay: "0.1s" }}
        >
          {images.extras.map((src, i) => (
            <div
              key={src}
              className="relative aspect-[3/4] overflow-hidden rounded-lg border border-border bg-secondary"
            >
              <Image
                src={src}
                alt=""
                fill
                className={`object-cover ${src === "/images/extra-5.JPG" ? "object-bottom" : "object-center"}`}
                sizes="(max-width: 640px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
