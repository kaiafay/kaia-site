"use client";

import { useRef } from "react";
import { SectionLabel } from "@/components/ui/section-label";
import { SectionHeading } from "@/components/ui/section-heading";
import { useInView } from "@/hooks/use-in-view";
import { scrollRevealClass, type ScrollRevealDelay } from "@/lib/scroll-reveal";

type UseItem = {
  name: string;
  description: string;
  url?: string;
};

type UseCategory = {
  label: string;
  items: UseItem[];
};

const usesData: UseCategory[] = [
  {
    label: "Dev Tools",
    items: [
      {
        name: "Cursor",
        description:
          "My primary editor. AI-assisted coding changed how I work.",
      },
      {
        name: "Claude Code",
        description:
          "For agentic coding, refactoring, and scaffolding. Pairs perfectly with Cursor.",
      },
      {
        name: "VS Code",
        description: "Backup editor and for quick edits.",
      },
      {
        name: "React / JavaScript",
        description: "Most comfortable here. Where I do my best thinking.",
      },
      {
        name: "TypeScript",
        description: "Learning to love it.",
      },
      {
        name: "Next.js",
        description: "Currently learning. This site is built with it.",
      },
      {
        name: "Node.js",
        description: "Backend of choice.",
      },
      {
        name: "PostgreSQL",
        description: "Go-to database.",
      },
    ],
  },
  {
    label: "Hardware",
    items: [
      {
        name: "MacBook Pro M3 Pro",
        description: "Fast, quiet, runs everything. Daily driver.",
      },
      {
        name: "Dual monitor setup",
        description: "Can't go back to one screen.",
      },
    ],
  },
  {
    label: "Gym Gear",
    items: [
      {
        name: "Versa Grips Pro",
        description: "Essential for pulling days. My hands thank me.",
        url: "https://www.versagripps.com/products/pro?variant=37837553729685",
      },
      {
        name: "Nike Metcon 10",
        description: "Best lifting shoe I've tried. Stable and grippy.",
        url: "https://www.nike.com/t/metcon-10-womens-workout-shoes-EGL2tQMt/HQ2620-100",
      },
      {
        name: "Uppper Lifting Belt",
        description: "Functional and cute. Non-negotiable on heavy days.",
        url: "https://uppper.com/products/lifting-belt-lavender",
      },
      {
        name: "Gymreapers Ankle Straps",
        description: "Solid for cable work. Holds up well.",
        url: "https://www.gymreapers.com/products/ankle-straps",
      },
    ],
  },
  {
    label: "Supplements",
    items: [
      {
        name: "Vitamin D3 + K2",
        description: "Year-round staple.",
        url: "https://www.sportsresearch.com/products/vitamin-d3-k2",
      },
      {
        name: "Eminent Bile Boost",
        description: "Supports fat digestion. Underrated.",
        url: "https://www.eminentnutrition.com/products/eminent-bile-boost",
      },
      {
        name: "Calm Magnesium",
        description:
          "Sleep and recovery. Raspberry lemon flavor is actually good.",
        url: "https://www.naturalvitality.com/products/maxcalm-powder-raspberry-lemon-flavor-nv2739",
      },
      {
        name: "Creatine Monohydrate",
        description: "The one supplement with endless research behind it.",
        url: "https://nutricost.com/products/nutricost-creatine-monohydrate-powder-500-grams",
      },
      {
        name: "L-Glutamine",
        description: "Post-workout recovery staple.",
        url: "https://nutricost.com/products/nutricost-l-glutamine-powder",
      },
    ],
  },
  {
    label: "Apps",
    items: [
      {
        name: "Strong",
        description: "Workout tracker I actually stick with. Clean and simple.",
        url: "https://apps.apple.com/us/app/strong-workout-tracker-gym-log/id464254577",
      },
      {
        name: "MacroFactor",
        description:
          "Best food tracking app I've used. Dynamic calorie adjustment is a game changer.",
        url: "https://apps.apple.com/us/app/macrofactor-macro-tracker/id1553503471",
      },
      {
        name: "Happier Meditation",
        description: "Daily meditation. Non-negotiable for my mental health.",
        url: "https://apps.apple.com/us/app/happier-meditation/id992210239",
      },
    ],
  },
];

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
