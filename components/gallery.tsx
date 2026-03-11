"use client"

import { useRef } from "react"
import Image from "next/image"
import { useInView } from "@/hooks/use-in-view"
import { scrollRevealClass } from "@/lib/scroll-reveal"
import { images } from "@/lib/images"
import { SectionLabel } from "@/components/ui/section-label"
import { SectionHeading } from "@/components/ui/section-heading"

const blurDataURLs: Record<string, string> = {
  "/images/extra-1.webp":
    "data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAPAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAMF/8QAHRAAAgIBBQAAAAAAAAAAAAAAAREAAgMSEyFhcf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDNqK6GTzClhhQQLHsbPYgf/9k=",
  "/images/extra-5.webp":
    "data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAPAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAwIE/8QAIBAAAQMDBQEAAAAAAAAAAAAAAQACAwQRURQhIjGRof/EABUBAQEAAAAAAAAAAAAAAAAAAAID/8QAFhEBAQEAAAAAAAAAAAAAAAAAAAER/9oADAMBAAIRAxEAPwDI2nj2sbpNLHlvqoyRvA7GSAmDqew4O+Kkg6//2Q==",
  "/images/extra-3.webp":
    "data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAPAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAwT/xAAeEAABAgICAwAAAAAAAAAAAAAAAgEDBBFIRJBgf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwBOTYGFVBpibGKmzGUUs1EjvINzYSYLIt1GT9OVxxxGNT4DsD1gf//Z",
  "/images/extra-6.webp":
    "data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAPAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAwEF/8QAHBAAAgICAwAAAAAAAAAAAAAAAQIAEQMTIUGB/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDOBuxXskVMLqxNDnu4mhYV/9k=",
}

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
        <div className={`${scrollRevealClass(isInView)} mb-12`}>
          <SectionLabel as="h2">Photos</SectionLabel>
          <SectionHeading className="mt-2">A few moments</SectionHeading>
        </div>

        <div
          className={`${scrollRevealClass(isInView, 2)} grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4`}
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
                placeholder="blur"
                blurDataURL={blurDataURLs[src]}
                className={`object-cover ${src === "/images/extra-5.webp" ? "object-bottom" : "object-center"}`}
                sizes="(max-width: 640px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
