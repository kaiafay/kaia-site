"use client";

import { useRef } from "react";
import { SectionLabel } from "@/components/ui/section-label";
import { SectionHeading } from "@/components/ui/section-heading";
import { useInView } from "@/hooks/use-in-view";
import { scrollRevealClass, type ScrollRevealDelay } from "@/lib/scroll-reveal";
import usesDataRaw from "@/content/uses.json";

type UseItem = { name: string; description: string; url?: string };
type UseCategory = { label: string; items: UseItem[] };
const usesData = usesDataRaw as UseCategory[];

const cardShadow =
  "shadow-[0_12px_40px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.04)]";
const cardShadowHover =
  "hover:shadow-[0_24px_56px_rgba(0,0,0,0.6)] hover:translate-y-[-4px]";

export default function UsesPage() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref);

  return (
    <main>
      <section ref={ref} className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className={`${scrollRevealClass(isInView)} mb-10`}>
            <SectionLabel as="h2">Uses</SectionLabel>
            <SectionHeading className="mt-2">Tools &amp; stack</SectionHeading>
            <p className="mt-4 text-sm italic text-muted-foreground">
              Everything I actually use — no sponsorships, just genuine
              recommendations.
            </p>
          </div>

          <div className="flex flex-col gap-16">
            {usesData.map((category, categoryIndex) => (
              <div
                key={category.label}
                className={scrollRevealClass(
                  isInView,
                  Math.min(categoryIndex, 6) as ScrollRevealDelay,
                )}
              >
                <SectionLabel as="h4" className="mb-6">
                  {category.label}
                </SectionLabel>
                <div className="grid gap-6 sm:grid-cols-2">
                  {category.items.map((item) => (
                    <div
                      key={item.name}
                      className={`flex flex-col gap-3 rounded-xl border border-border bg-card px-6 py-6 transition-all duration-300 ease-out sm:px-8 sm:py-6 ${cardShadow} ${cardShadowHover}`}
                    >
                      <h5 className="font-heading text-lg font-semibold text-card-foreground">
                        {item.name}
                      </h5>
                      <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                      {item.url && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/90"
                        >
                          Visit →
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
