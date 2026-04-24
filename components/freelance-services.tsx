"use client";

import { useRef } from "react";
import { Layout, Code2, Wrench } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { scrollRevealClass } from "@/lib/scroll-reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { SectionHeading } from "@/components/ui/section-heading";

const services = [
  {
    icon: Layout,
    title: "Landing Pages",
    description:
      "A clean, fast, one-page website for your business. Fixed scope, flat rate. Live in two weeks.",
    badge: "From $600",
  },
  {
    icon: Code2,
    title: "Custom Web Apps",
    description:
      "Full-stack builds scoped to your project. Next.js, Supabase, and clean code you can actually maintain.",
    badge: "Scoped per project",
  },
  {
    icon: Wrench,
    title: "Dev Support",
    description:
      "Post-launch updates, bug fixes, and ongoing changes. No retainer required.",
    badge: "$100/hr",
  },
];

export function FreelanceServices() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref);

  return (
    <section
      ref={ref}
      id="freelance-services"
      className="relative py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className={`${scrollRevealClass(isInView)} mb-16`}>
          <SectionLabel as="h2">Services</SectionLabel>
          <SectionHeading className="mt-2">What I Build</SectionHeading>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`${scrollRevealClass(isInView, i === 0 ? 0 : i === 1 ? 3 : 6)} group flex flex-col gap-4 rounded-lg border border-border bg-card p-8 transition-all duration-200 ease-out hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(143,56,72,0.25)]`}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-primary/30 bg-primary/10">
                <service.icon size={24} className="text-primary" />
              </div>
              <h4 className="font-heading text-xl font-semibold text-card-foreground">
                {service.title}
              </h4>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
              <span className="mt-auto inline-block self-start rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {service.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
