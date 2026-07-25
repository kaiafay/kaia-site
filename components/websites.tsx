"use client";

import { useRef } from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { scrollRevealClass, type ScrollRevealDelay } from "@/lib/scroll-reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectBadge, type ProjectKind } from "@/components/ui/project-badge";

type SiteEntry = {
  name: string;
  description: string;
  url: string;
  desktopImage: string;
  mobileImage: string;
  kind: ProjectKind;
};

const SITES: SiteEntry[] = [
  {
    name: "RichM Co.",
    description:
      "Coaching and consulting website with a guided intake flow for prospective clients",
    url: "https://richm-website.vercel.app/",
    desktopImage: "/images/work/richm.webp",
    mobileImage: "/images/work/richm-mobile.webp",
    kind: "client",
  },
  {
    name: "Dewy Club",
    description:
      "E-commerce storefront for a skincare brand with Stripe integration",
    url: "https://dewy-club.vercel.app/",
    desktopImage: "/images/work/dewy-club.webp",
    mobileImage: "/images/work/dewy-club-mobile.webp",
    kind: "concept",
  },
  {
    name: "Wedding RSVP",
    description:
      "Wedding RSVP site with an admin dashboard for guests and responses",
    url: "https://kaiaandrichard.vercel.app/",
    desktopImage: "/images/work/wedding-rsvp.webp",
    mobileImage: "/images/work/wedding-rsvp-mobile.webp",
    kind: "personal",
  },
  {
    name: "Driftwood Coffee",
    description: "Landing page for an independent coffee shop",
    url: "https://driftwood-coffee-nine.vercel.app/",
    desktopImage: "/images/work/driftwood-coffee.webp",
    mobileImage: "/images/work/driftwood-coffee-mobile.webp",
    kind: "concept",
  },
  // DRAFT — Lovely Looks by Lexis (client site, shipped June 2026).
  // Excluded until the live URL, screenshots, and portfolio permission are
  // confirmed. When ready: add screenshots to public/images/work/ and move
  // this entry to the top of the list.
  // {
  //   name: "Lovely Looks by Lexis",
  //   description: "Booking-ready site for a Treasure Valley lash studio",
  //   url: "<confirm live URL>",
  //   desktopImage: "/images/work/lovely-looks.webp",
  //   mobileImage: "/images/work/lovely-looks-mobile.webp",
  //   kind: "client",
  // },
];

type WebsitesProps = {
  headingAs?: "h1" | "h2";
};

export function Websites({ headingAs = "h2" }: WebsitesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef);

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className={`${scrollRevealClass(isInView)} mb-16`}>
          <SectionLabel>Websites</SectionLabel>
          <SectionHeading as={headingAs} className="mt-2">
            Custom sites
          </SectionHeading>
        </div>

        <div className="grid gap-10 sm:grid-cols-2">
          {SITES.map((site, i) => (
            <div
              key={site.name}
              className={scrollRevealClass(
                isInView,
                Math.min(i * 2, 6) as ScrollRevealDelay,
              )}
            >
              <a
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit the ${site.name} live site`}
                className="landing-preview group relative block overflow-hidden rounded-lg border border-border bg-secondary"
              >
                <div className="relative aspect-[91/50]">
                  <Image
                    src={site.desktopImage}
                    alt={`${site.name} screenshot`}
                    fill
                    sizes="(min-width: 1200px) 560px, (min-width: 640px) 50vw, 100vw"
                    className="object-contain object-top"
                  />
                </div>
                <span className="absolute bottom-3 right-3 block rounded bg-black/50 p-1.5 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100">
                  <ExternalLink size={16} className="text-white" aria-hidden />
                </span>
              </a>

              <div className="mt-4">
                <div className="flex flex-wrap items-center gap-3">
                  <p className="font-heading text-lg font-semibold text-foreground">
                    {site.name}
                  </p>
                  <ProjectBadge kind={site.kind} />
                </div>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {site.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
