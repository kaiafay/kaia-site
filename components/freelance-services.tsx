"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { scrollRevealClass } from "@/lib/scroll-reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { SectionHeading } from "@/components/ui/section-heading";

const services = [
  {
    title: "Websites",
    description:
      "A single focused page or a full site, designed around your services and the way clients actually find you.",
    detail: "From $600",
  },
  {
    title: "Custom Builds",
    description:
      "Booking, payments, intake forms, dashboards. For businesses that need their site to do something, not just say something.",
    detail: "From $800",
  },
  {
    title: "Ongoing Support",
    description:
      "Updates, changes, and a developer you can actually reach after launch. Hourly or monthly.",
    detail: "$100/hr · from $200/mo",
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
          <SectionHeading className="mt-2">How I can help</SectionHeading>
        </div>

        <div className="grid gap-10 md:grid-cols-3 md:gap-12">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`${scrollRevealClass(isInView, i === 0 ? 0 : i === 1 ? 3 : 6)} relative flex flex-col pl-5 before:absolute before:top-0 before:bottom-0 before:left-0 before:w-[18px] freelance-border before:content-[''] md:pl-0 md:before:hidden ${i > 0 ? "md:border-l md:border-border md:pl-10" : ""}`}
            >
              <h3 className="font-heading text-2xl font-semibold text-foreground">
                {service.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                {service.description}
              </p>
              <p className="mt-4 text-sm font-medium text-foreground">
                {service.detail}
              </p>
            </div>
          ))}
        </div>

        <div
          className={`${scrollRevealClass(isInView, 6)} mt-12 text-center`}
        >
          <Link
            href="/work-with-me"
            className="group inline-flex items-center gap-2 text-sm font-medium text-primary-soft transition-colors hover:text-primary-soft/80"
          >
            See details, pricing, and process
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-1 group-active:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
