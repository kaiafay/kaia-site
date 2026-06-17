"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { scrollRevealClass, type ScrollRevealDelay } from "@/lib/scroll-reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { SectionHeading } from "@/components/ui/section-heading";
import { Contact } from "@/components/contact";

const services = [
  {
    title: "Landing Pages",
    description: "One page. Clear message. Built to convert.",
    price: "From $600, delivered in two weeks.",
  },
  {
    title: "Custom Web Apps",
    description: "Apps, tools, or anything more complex.",
    price: "Scoped per project.",
  },
  {
    title: "Dev Support",
    description: "Post-launch updates, bug fixes, and ongoing changes.",
    price: "$100/hr, no retainer.",
  },
];

const processSteps = [
  {
    title: "Scope",
    description:
      "We define the goal, deliverables, and timeline upfront so there are no surprises.",
  },
  {
    title: "Build",
    description:
      "I keep you in the loop with regular updates as your project takes shape.",
  },
  {
    title: "Launch",
    description: "You get something polished, purposeful, and ready to represent you.",
  },
];

export default function WorkWithMePage() {
  const heroRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const processRef = useRef<HTMLElement>(null);
  const proofRef = useRef<HTMLElement>(null);
  const isHeroInView = useInView(heroRef);
  const isServicesInView = useInView(servicesRef);
  const isProcessInView = useInView(processRef);
  const isProofInView = useInView(proofRef);

  return (
    <main>
      <section ref={heroRef} className="relative pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div className={scrollRevealClass(isHeroInView)}>
            <SectionLabel>Work With Me</SectionLabel>
            <SectionHeading as="h1" className="mt-2">
              Websites, apps, and dev support for people who care about the
              details.
            </SectionHeading>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              I build clean, fast, intentional web experiences with clear scope,
              honest communication, and no mystery around what happens next.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all duration-200 hover:bg-primary/90 btn-primary-glow"
              >
                Start a project inquiry
              </Link>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition-all duration-200 hover:border-primary/50 hover:text-primary"
              >
                Send a message
              </a>
            </div>
          </div>
        </div>
      </section>

      <section ref={servicesRef} className="relative py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div
            className={`${scrollRevealClass(isServicesInView)} mb-12 text-center`}
          >
            <SectionLabel as="h2">Services</SectionLabel>
          </div>
          <div className="grid gap-10 md:grid-cols-3 md:gap-12">
            {services.map((service, i) => (
              <div
                key={service.title}
                className={`${scrollRevealClass(isServicesInView, Math.min(i * 2, 6) as ScrollRevealDelay)} relative flex flex-col pl-5 before:absolute before:top-0 before:bottom-0 before:left-0 before:w-[18px] freelance-border before:content-[''] md:pl-0 md:before:hidden ${i > 0 ? "md:border-l md:border-border md:pl-10" : ""}`}
              >
                <h3 className="font-heading text-2xl font-semibold text-foreground">
                  {service.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
                <p className="mt-auto pt-4 text-sm font-medium text-foreground">
                  {service.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={processRef} className="relative py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <div
            className={`${scrollRevealClass(isProcessInView)} mb-12 text-center`}
          >
            <SectionLabel as="h2">Process</SectionLabel>
            <SectionHeading className="mt-2">How it works</SectionHeading>
          </div>
          <div className="divide-y divide-border">
            {processSteps.map((step, i) => (
              <div
                key={step.title}
                className={`${scrollRevealClass(isProcessInView, Math.min(i * 2, 6) as ScrollRevealDelay)} flex gap-8 py-8`}
              >
                <span className="shrink-0 pt-1 font-heading text-4xl font-bold leading-none tabular-nums text-primary/35">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-heading text-xl font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={proofRef} className="relative py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div className={scrollRevealClass(isProofInView)}>
            <SectionLabel as="h2">Proof</SectionLabel>
            <SectionHeading className="mt-2">See the work</SectionHeading>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Browse landing pages and apps I&apos;ve built.
            </p>
            <Link
              href="/work"
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              View portfolio
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <Contact
        heading="Ready to start?"
        description="Tell me what you're building."
        showSocialLinks={false}
        showBudget={true}
      />
    </main>
  );
}
