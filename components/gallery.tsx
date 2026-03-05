"use client"

import { useRef } from "react"
import Image from "next/image"
import { useInView } from "@/hooks/use-in-view"
import { images } from "@/lib/images"
import { SectionLabel } from "@/components/ui/section-label"
import { SectionHeading } from "@/components/ui/section-heading"

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
          <SectionLabel as="h2">Photos</SectionLabel>
          <SectionHeading className="mt-2">A few moments</SectionHeading>
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
