"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
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

const faqs = [
  {
    question: "Who is this for?",
    answer:
      "Small businesses, founders, and independent professionals who want a thoughtful website, app, or web update without a bloated process.",
  },
  {
    question: "What kind of work do you take on?",
    answer:
      "Landing pages, small business websites, custom web apps, and focused dev support for existing sites.",
  },
  {
    question: "Can you help if I only have a rough idea?",
    answer:
      "Yes. We can start by tightening the goal, scope, and first version before anything gets built.",
  },
  {
    question: "When does custom work make sense?",
    answer:
      "When the site needs to fit a specific workflow, connect tools, handle payments, or feel more considered than a template. If a simple no-code setup is the right answer, I'll say that.",
  },
  {
    question: "What happens after launch?",
    answer:
      "I can hand things off cleanly, stay available for post-launch changes, or scope the next round of work if there is more to build.",
  },
];

export default function WorkWithMePage() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const processRef = useRef<HTMLElement>(null);
  const faqRef = useRef<HTMLElement>(null);
  const proofRef = useRef<HTMLElement>(null);
  const isHeroInView = useInView(heroRef);
  const isServicesInView = useInView(servicesRef);
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
              Web work built with care.
            </SectionHeading>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              I build clean, fast, intentional web experiences that help your
              business make a better first impression.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:mt-8 sm:flex-row">
              <Link
                href="#contact"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-all duration-200 hover:bg-primary/90 sm:w-auto sm:min-w-[10.25rem] btn-primary-glow"
              >
                Start a project inquiry
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
            <SectionLabel as="h2">Services</SectionLabel>
            <SectionHeading className="mt-2">How I can help</SectionHeading>
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
            <SectionHeading className="mt-2">See the work</SectionHeading>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Browse websites and apps I&apos;ve built. From polished first
              impressions to custom web experiences.
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
        label="Project Inquiry"
        heading="Tell me what you're building."
        description="Share the project details and I'll follow up with next steps."
        showSocialLinks={false}
        showBudget={true}
        showProjectFields={true}
      />
    </main>
  );
}
