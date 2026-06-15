"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  Layout,
  Code2,
  Wrench,
  ClipboardList,
  Hammer,
  Rocket,
  ArrowRight,
} from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { scrollRevealClass, type ScrollRevealDelay } from "@/lib/scroll-reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { SectionHeading } from "@/components/ui/section-heading";
import { Contact } from "@/components/contact";

const services = [
  {
    icon: Layout,
    title: "Landing Pages",
    description:
      "A clean, fast, one-page website for your business. Fixed scope, flat rate. Live in two weeks.",
    price: "From $600",
  },
  {
    icon: Code2,
    title: "Custom Web Apps",
    description:
      "Full-stack builds scoped to your project. Next.js, Supabase, and clean code you can actually maintain.",
    price: "Scoped per project",
  },
  {
    icon: Wrench,
    title: "Dev Support",
    description:
      "Post-launch updates, bug fixes, and ongoing changes. No retainer required.",
    price: "$100/hr",
  },
];

const processSteps = [
  {
    icon: ClipboardList,
    title: "Scope",
    description:
      "We define the goal, deliverables, and timeline upfront so there are no surprises.",
  },
  {
    icon: Hammer,
    title: "Build",
    description:
      "I keep you in the loop with regular updates as your project takes shape.",
  },
  {
    icon: Rocket,
    title: "Launch",
    description:
      "We ship, test, and hand off something you'll be proud to share.",
  },
];

const pricing = [
  {
    title: "Landing Pages",
    price: "From $600",
    detail: "Fixed scope, delivered in two weeks.",
  },
  {
    title: "Dev Support",
    price: "$100/hr",
    detail: "Post-launch updates, bug fixes, and ongoing changes.",
  },
  {
    title: "Custom Web Apps",
    price: "Scoped per project",
    detail: "Reach out and we'll talk through what you're building.",
  },
];

export default function WorkWithMePage() {
  const heroRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const processRef = useRef<HTMLElement>(null);
  const pricingRef = useRef<HTMLElement>(null);
  const proofRef = useRef<HTMLElement>(null);
  const isHeroInView = useInView(heroRef);
  const isServicesInView = useInView(servicesRef);
  const isProcessInView = useInView(processRef);
  const isPricingInView = useInView(pricingRef);
  const isProofInView = useInView(proofRef);

  return (
    <main>
      <section
        ref={heroRef}
        className="relative pt-24 pb-16 lg:pt-32 lg:pb-24"
      >
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div className={`${scrollRevealClass(isHeroInView)}`}>
            <SectionLabel>Work With Me</SectionLabel>
            <SectionHeading as="h1" className="mt-2">
              Websites, apps, and dev support for people who care about the
              details.
            </SectionHeading>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              You need a website that actually represents your business. I build
              clean, fast, and intuitive sites for people who care about the
              details. You&apos;ll know where things stand at every step.
            </p>
            <div className="mt-8">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all duration-200 hover:bg-primary/90 btn-primary-glow"
              >
                Start a project
              </a>
            </div>
          </div>
        </div>
      </section>

      <section ref={servicesRef} className="relative py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className={`${scrollRevealClass(isServicesInView)} mb-12`}>
            <SectionLabel as="h2">Services</SectionLabel>
            <SectionHeading className="mt-2">What I Build</SectionHeading>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {services.map((service, i) => (
              <div
                key={service.title}
                className={`${scrollRevealClass(isServicesInView, Math.min(i * 2, 6) as ScrollRevealDelay)} flex flex-col gap-4 rounded-lg border border-border bg-card p-8 transition-all duration-200 ease-out hover:-translate-y-1 hover:border-primary/50 card-hover-glow`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-primary/30 bg-primary/10">
                  <service.icon size={24} className="text-primary" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-card-foreground">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
                <span className="inline-block self-start rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {service.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={processRef} className="relative py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className={`${scrollRevealClass(isProcessInView)} mb-12 text-center`}>
            <SectionLabel as="h2">Process</SectionLabel>
            <SectionHeading className="mt-2">How It Works</SectionHeading>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {processSteps.map((step, i) => (
              <div
                key={step.title}
                className={`${scrollRevealClass(isProcessInView, Math.min(i * 2, 6) as ScrollRevealDelay)} flex flex-col items-center text-center`}
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl border border-primary/30 bg-primary/10">
                  <step.icon size={24} className="text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={pricingRef} className="relative py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className={`${scrollRevealClass(isPricingInView)} mb-12`}>
            <SectionLabel as="h2">Pricing</SectionLabel>
            <SectionHeading className="mt-2">Clear Starting Points</SectionHeading>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {pricing.map((item, i) => (
              <div
                key={item.title}
                className={`${scrollRevealClass(isPricingInView, Math.min(i * 2, 6) as ScrollRevealDelay)} rounded-lg border border-border bg-card p-8`}
              >
                <h3 className="font-heading text-xl font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 font-heading text-2xl font-bold text-primary">
                  {item.price}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={proofRef} className="relative py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div className={`${scrollRevealClass(isProofInView)}`}>
            <SectionLabel as="h2">Proof</SectionLabel>
            <SectionHeading className="mt-2">See the Work</SectionHeading>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Browse landing page examples and apps I&apos;ve built — real
              projects for real clients and my own products.
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
      />
    </main>
  );
}
