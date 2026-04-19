"use client";

import { useRef } from "react";
import { SectionLabel } from "@/components/ui/section-label";
import { SectionHeading } from "@/components/ui/section-heading";
import { useInView } from "@/hooks/use-in-view";
import { scrollRevealClass, type ScrollRevealDelay } from "@/lib/scroll-reveal";
import usesDataRaw from "@/content/uses.json";

type UseItem = { name: string; description?: string; url?: string };
type UseSubsection = { label: string; items: UseItem[] };
type UseCategory = {
  label: string;
  items?: UseItem[];
  subsections?: UseSubsection[];
};
const usesData = usesDataRaw as UseCategory[];

function ItemRow({ item }: { item: UseItem }) {
  const name = item.url ? (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="font-semibold text-foreground transition-colors duration-150 hover:text-primary"
    >
      {item.name}
    </a>
  ) : (
    <span className="font-semibold text-foreground">{item.name}</span>
  );

  return (
    <li className="text-sm leading-relaxed">
      {name}
      {item.description && (
        <span className="text-muted-foreground"> · {item.description}</span>
      )}
    </li>
  );
}

function ItemList({ items }: { items: UseItem[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((item) => (
        <ItemRow key={item.name} item={item} />
      ))}
    </ul>
  );
}

export default function UsesPage() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref);

  return (
    <main>
      <section ref={ref} className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-6">
          <div className={`${scrollRevealClass(isInView)} mb-16`}>
            <SectionLabel as="h2">Uses</SectionLabel>
            <SectionHeading className="mt-2">Tools &amp; stack</SectionHeading>
            <p className="mt-4 text-sm italic text-muted-foreground">
              Everything I actually use — no sponsorships, just genuine
              recommendations.
            </p>
          </div>

          <div>
            {usesData.map((category, categoryIndex) => (
              <div
                key={category.label}
                className={`${scrollRevealClass(
                  isInView,
                  Math.min(categoryIndex, 6) as ScrollRevealDelay,
                )} py-10`}
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:gap-12">
                  <div className="flex w-full shrink-0 items-center gap-3 sm:block sm:w-[130px]">
                    <span className="font-heading text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      {category.label}
                    </span>
                    <div className="h-px flex-1 bg-border/70 sm:hidden" />
                  </div>

                  <div className="flex-1">
                    {category.subsections ? (
                      <div className="flex flex-col gap-8">
                        {category.subsections.map((sub) => (
                          <div key={sub.label}>
                            <p className="mb-3 font-heading text-xs font-medium uppercase tracking-widest text-muted-foreground/70">
                              {sub.label}
                            </p>
                            <ItemList items={sub.items} />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <ItemList items={category.items ?? []} />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
