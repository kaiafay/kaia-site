"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { scrollRevealClass, type ScrollRevealDelay } from "@/lib/scroll-reveal";
import { images } from "@/lib/images";
import { SectionLabel } from "@/components/ui/section-label";
import { SectionHeading } from "@/components/ui/section-heading";
import { Contact } from "@/components/contact";

const services = [
  {
    category: "Websites",
    description:
      "For businesses and personal brands that need a polished web presence without an overbuilt process.",
    summary: "Single-page and multi-page sites",
    summaryDetail: "From $600",
    offerings: [
      {
        title: "Single-Page Website",
        description:
          "A focused page for a clear offer, service, portfolio, or campaign.",
        detail: "From $600",
      },
      {
        title: "Multi-Page Website",
        description:
          "A fuller site with the core pages your audience needs to understand and trust the business.",
        detail: "From $1,200",
      },
    ],
  },
  {
    category: "Custom Builds",
    description:
      "For businesses that need bookings, payments, applications, or other functionality beyond a standard website.",
    summary: "Bookings, payments, forms, dashboards, and tailored functionality",
    summaryDetail: "Scoped per project",
    offerings: [
      {
        title: "Forms & Intake Flows",
        description:
          "Collect inquiries, applications, onboarding details, or leads through a guided process.",
        detail: "From $800",
      },
      {
        title: "Dashboards",
        description:
          "Keep submissions, customers, content, or internal tasks organized in one private place.",
        detail: "From $2,000",
      },
      {
        title: "Payments & Integrations",
        description:
          "Let customers book or pay online, and connect the tools your business already uses.",
        detail: "From $1,500",
      },
    ],
  },
  {
    category: "Ongoing Support",
    description:
      "For existing sites that need steady technical attention, iteration, or a developer available after launch.",
    summary: "Updates, maintenance, and continued improvements",
    summaryDetail: "Hourly or monthly",
    offerings: [
      {
        title: "Hourly Support",
        description:
          "Focused updates, refinements, content changes, and technical improvements as needed.",
        detail: "$100/hr",
      },
      {
        title: "Monthly Support",
        description:
          "A recurring support window for businesses that want ongoing changes and light maintenance.",
        detail: "From $200/mo",
      },
      {
        title: "Post-Launch Iteration",
        description:
          "Continue improving a recently launched project without turning it into a full rebuild.",
        detail: "From $500",
      },
    ],
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

const faqs = [
  {
    question: "Can you help if I only have a rough idea?",
    answer:
      "Yes. We can start by clarifying what the site needs to do and what belongs in the first version.",
  },
  {
    question: "When does custom work make sense?",
    answer:
      "When your site needs to support bookings, payments, intake, or a process that off-the-shelf tools don't fit—or when you want something shaped around your business without having to piece it together yourself. If a simpler option would serve you better, I'll say so.",
  },
  {
    question: "What happens after launch?",
    answer:
      "I can hand the project off cleanly or stay available for hourly or monthly support, depending on what you need.",
  },
];

export default function WorkWithMePage() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [openService, setOpenService] = useState<string | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const personRef = useRef<HTMLElement>(null);
  const processRef = useRef<HTMLElement>(null);
  const faqRef = useRef<HTMLElement>(null);
  const proofRef = useRef<HTMLElement>(null);
  const isHeroInView = useInView(heroRef);
  const isServicesInView = useInView(servicesRef, {
    threshold: 0.01,
    rootMargin: "0px 0px 80px 0px",
  });
  const isPersonInView = useInView(personRef);
  const isProcessInView = useInView(processRef);
  const isFaqInView = useInView(faqRef);
  const isProofInView = useInView(proofRef);

  function toggleFaq(question: string) {
    setOpenFaq((current) => (current === question ? null : question));
  }

  return (
    <main>
      <section ref={heroRef} className="relative pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div className={scrollRevealClass(isHeroInView)}>
            <SectionLabel>Work With Me</SectionLabel>
            <SectionHeading as="h1" className="mt-2">
              A website built around your business
            </SectionHeading>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              I build custom websites and web apps that help small businesses
              make a better first impression.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:mt-8 sm:flex-row">
              <Link
                href="#contact"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-all duration-200 hover:bg-primary/90 sm:w-auto sm:min-w-[10.25rem] btn-primary-glow"
              >
                Start a project
              </Link>
              <a
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary sm:min-w-[10.25rem] sm:rounded-lg sm:border sm:border-border sm:bg-background sm:px-5 sm:py-3 sm:text-foreground sm:transition-all sm:duration-200 sm:hover:border-primary/50"
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
            <SectionLabel as="h2">What I Build</SectionLabel>
            <SectionHeading className="mt-2">Services & pricing</SectionHeading>
          </div>
          <div className="flex flex-col">
            {services.map((group, groupIndex) => (
              <div
                key={group.category}
                className={`${scrollRevealClass(
                  isServicesInView,
                  Math.min(groupIndex * 2, 6) as ScrollRevealDelay,
                )} border-t border-border`}
              >
                <h3 className="md:hidden">
                  <button
                    type="button"
                    aria-expanded={openService === group.category}
                    aria-controls={`service-panel-${groupIndex}`}
                    onClick={() =>
                      setOpenService((current) =>
                        current === group.category ? null : group.category,
                      )
                    }
                    className="flex w-full items-start justify-between gap-6 rounded-sm py-7 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                  >
                    <span>
                      <span className="block font-heading text-2xl font-semibold text-foreground">
                        {group.category}
                      </span>
                      <span
                        aria-hidden={openService === group.category}
                        className={`grid transition-[grid-template-rows,opacity,margin-top] duration-300 ease-out ${
                          openService === group.category
                            ? "mt-0 grid-rows-[0fr] opacity-0"
                            : "mt-2 grid-rows-[1fr] opacity-100"
                        }`}
                      >
                        <span className="overflow-hidden">
                          <span className="block text-sm font-normal leading-relaxed text-muted-foreground">
                            {group.summary}
                          </span>
                          <span className="mt-2 block text-sm font-medium text-foreground">
                            {group.summaryDetail}
                          </span>
                        </span>
                      </span>
                    </span>
                    <ChevronDown
                      size={19}
                      className={`mt-1 shrink-0 text-muted-foreground transition-transform duration-200 ${
                        openService === group.category ? "rotate-180" : ""
                      }`}
                      aria-hidden
                    />
                  </button>
                </h3>

                <div
                  id={`service-panel-${groupIndex}`}
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out md:grid-rows-[1fr] md:opacity-100 ${
                    openService === group.category
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div
                    className={`overflow-hidden transition-[visibility] md:visible md:delay-0 ${
                      openService === group.category
                        ? "visible"
                        : "invisible delay-300"
                    }`}
                  >
                    <div className="grid gap-8 pb-8 md:grid-cols-[0.55fr_1.45fr] md:gap-12 md:py-8">
                      <div className="hidden md:block">
                        <h3 className="font-heading text-2xl font-semibold text-foreground">
                          {group.category}
                        </h3>
                        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                          {group.description}
                        </p>
                      </div>

                      <div>
                        <p className="mb-5 text-sm leading-relaxed text-muted-foreground md:hidden">
                          {group.description}
                        </p>
                        <div
                          className={`grid gap-4 ${
                            group.offerings.length === 2
                              ? "md:grid-cols-2"
                              : "sm:grid-cols-2 lg:grid-cols-3"
                          }`}
                        >
                          {group.offerings.map((offering) => (
                            <div
                              key={offering.title}
                              className="flex flex-col rounded-lg border border-border/70 bg-card/55 p-5"
                            >
                              <h4 className="font-heading text-lg font-semibold text-foreground">
                                {offering.title}
                              </h4>
                              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                {offering.description}
                              </p>
                              <p className="mt-auto pt-5 text-sm font-medium text-foreground">
                                {offering.detail}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div
            className={`${scrollRevealClass(isServicesInView, 6)} mt-12 border-t border-border pt-8 text-center`}
          >
            <Link
              href="#contact"
              className="group inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              Start a project
              <ArrowRight
                size={15}
                className="transition-transform duration-200 group-hover:translate-x-1 group-active:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>

      <section ref={personRef} className="relative py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div
            className={`${scrollRevealClass(isPersonInView)} flex flex-col items-center gap-10 sm:flex-row sm:items-start sm:gap-12`}
          >
            <div className="relative h-56 w-44 shrink-0 overflow-hidden rounded-lg sm:h-64 sm:w-52">
              <Image
                src={images.workWithMe}
                alt="Kaia Fay"
                fill
                className="object-cover object-[52.5%_top]"
                sizes="(max-width: 640px) 176px, 208px"
              />
            </div>
            <div className="flex flex-col gap-4 text-center sm:text-left">
              <div>
                <SectionLabel as="h2">
                  Who you&apos;re working with
                </SectionLabel>
                <SectionHeading className="mt-2">
                  Hi, I&apos;m Kaia.
                </SectionHeading>
              </div>
              <p className="text-base leading-relaxed text-muted-foreground">
                I&apos;m a software engineer and web developer. Before I
                learned to code, I spent years in service jobs, so I know what
                it&apos;s like to be the person handling everything. When we
                work together, you&apos;ll work directly with me from the first
                conversation through launch. I&apos;m based in Boise and work
                with businesses locally and remotely.
              </p>
              <Link
                href="/about"
                className="group inline-flex items-center justify-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80 sm:justify-start"
              >
                More about me
                <ArrowRight
                  size={15}
                  className="transition-transform duration-200 group-hover:translate-x-1 group-active:translate-x-1"
                />
              </Link>
            </div>
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

      <section ref={faqRef} className="relative py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <div
            className={`${scrollRevealClass(isFaqInView)} mb-12 text-center`}
          >
            <SectionLabel as="h2">FAQ</SectionLabel>
            <SectionHeading className="mt-2">What to expect</SectionHeading>
          </div>
          <div className="divide-y divide-border">
            {faqs.map((item, i) => (
              <div
                key={item.question}
                className={`${scrollRevealClass(isFaqInView, Math.min(i * 2, 6) as ScrollRevealDelay)} group py-7`}
              >
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  <button
                    type="button"
                    id={`faq-trigger-${i}`}
                    aria-expanded={openFaq === item.question}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => toggleFaq(item.question)}
                    className="flex w-full cursor-pointer items-center justify-between gap-6 text-left"
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-muted-foreground transition-transform duration-200 ${
                        openFaq === item.question ? "rotate-180" : ""
                      }`}
                      aria-hidden
                    />
                  </button>
                </h3>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${i}`}
                  aria-hidden={openFaq !== item.question}
                  className={`grid transition-[grid-template-rows,opacity,margin-top] duration-300 ease-out ${
                    openFaq === item.question
                      ? "mt-3 grid-rows-[1fr] opacity-100"
                      : "mt-0 grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-base leading-relaxed text-muted-foreground">
                      {item.answer}
                    </p>
                  </div>
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
            <SectionHeading className="mt-2">
              See what I&apos;ve built
            </SectionHeading>
            <Link
              href="/work"
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              Browse my work
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <Contact
        label="Project Inquiry"
        heading="Tell me what you're building"
        description="Share what you have in mind. I'll get back to you within one to two business days with any questions and the next step."
        showSocialLinks={false}
        showBudget={true}
        showProjectFields={true}
      />
    </main>
  );
}
