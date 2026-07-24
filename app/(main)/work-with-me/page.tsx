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
      "For businesses and personal brands that need a professional web presence without an overbuilt process.",
    offerings: [
      {
        title: "Single-Page Website",
        description:
          "A focused page for a clear offer, service, portfolio, or campaign.",
        detail: "From $600",
        interest: "Landing Page",
      },
      {
        title: "Multi-Page Website",
        description:
          "A fuller site with the core pages your audience needs to understand and trust the business.",
        detail: "From $1,200",
        interest: "Custom Project",
      },
    ],
  },
  {
    category: "Custom Builds",
    description:
      "For businesses whose site has a job to do: bookings, payments, applications, or admin work.",
    offerings: [
      {
        title: "Forms & Intake Flows",
        description:
          "Guided forms, applications, onboarding flows, and lead capture experiences.",
        detail: "From $800",
        interest: "Custom Project",
      },
      {
        title: "Dashboards & Admin Tools",
        description:
          "Private views for managing submissions, customers, content, or internal processes.",
        detail: "From $2,000",
        interest: "Custom Project",
      },
      {
        title: "Payments & Integrations",
        description:
          "Checkout flows, booking tools, database-backed features, and third-party API connections.",
        detail: "From $1,500",
        interest: "Custom Project",
      },
    ],
  },
  {
    category: "Dev Support",
    description:
      "For existing sites that need steady technical attention, iteration, or a developer available after launch.",
    offerings: [
      {
        title: "Hourly Support",
        description:
          "Focused updates, refinements, content changes, and technical improvements as needed.",
        detail: "$100/hr",
        interest: "Dev Support",
      },
      {
        title: "Monthly Support",
        description:
          "A recurring support window for businesses that want ongoing changes and light maintenance.",
        detail: "From $200/mo",
        interest: "Dev Support",
      },
      {
        title: "Post-Launch Iteration",
        description:
          "Continue improving a recently launched project without turning it into a full rebuild.",
        detail: "From $500",
        interest: "Dev Support",
      },
    ],
  },
];

function contactHref(interest: string) {
  return `/work-with-me?interest=${encodeURIComponent(interest)}#contact`;
}

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
    description:
      "Your site goes live once we've reviewed it together. I don't ship anything I'm not proud of.",
  },
];

const afterSteps = [
  {
    title: "I reply personally",
    description:
      "Every inquiry comes straight to me, usually within a business day.",
  },
  {
    title: "We talk it through",
    description:
      "A short call or a few emails, whichever you prefer. No pressure and no jargon.",
  },
  {
    title: "You get a written proposal",
    description:
      "Clear scope, a fixed price, and a timeline, so you know exactly what you're saying yes to.",
  },
];

const faqs = [
  {
    question: "Who is this for?",
    answer:
      "Small businesses and independent pros, mostly people who run the whole thing themselves: lash artists, contractors, photographers, coaches, studios, and small teams. Most of my work is in the Treasure Valley, and I work remotely too.",
  },
  {
    question: "What kind of work do you take on?",
    answer:
      "Single-page websites, multi-page sites, custom web builds, and focused dev support for existing sites.",
  },
  {
    question: "Can you help if I only have a rough idea?",
    answer:
      "Yes. We can start by tightening the goal, scope, and first version before anything gets built.",
  },
  {
    question: "When does custom work make sense?",
    answer:
      "When the site needs to fit a specific workflow, connect tools, handle payments, or look like your business instead of a template. If a simple no-code setup is the right answer, I'll say that.",
  },
  {
    question: "What happens after launch?",
    answer:
      "I can hand things off cleanly, stay available for hourly or monthly support, or scope the next round of work if there is more to build.",
  },
];

export default function WorkWithMePage() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const personRef = useRef<HTMLElement>(null);
  const processRef = useRef<HTMLElement>(null);
  const customRef = useRef<HTMLElement>(null);
  const faqRef = useRef<HTMLElement>(null);
  const afterRef = useRef<HTMLElement>(null);
  const isHeroInView = useInView(heroRef);
  const isServicesInView = useInView(servicesRef, {
    threshold: 0.01,
    rootMargin: "0px 0px 80px 0px",
  });
  const isPersonInView = useInView(personRef);
  const isProcessInView = useInView(processRef);
  const isCustomInView = useInView(customRef);
  const isFaqInView = useInView(faqRef);
  const isAfterInView = useInView(afterRef);

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
              I design and build custom websites and web apps for small
              businesses and independent pros in the Treasure Valley and
              beyond. One project at a time, working directly with you from
              first message to launch.
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
                className="inline-flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary-soft sm:min-w-[10.25rem] sm:rounded-lg sm:border sm:border-border sm:bg-background sm:px-5 sm:py-3 sm:text-foreground sm:transition-all sm:duration-200 sm:hover:border-primary/50"
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
            <SectionHeading className="mt-2">Services & Pricing</SectionHeading>
          </div>
          <div className="flex flex-col gap-14">
            {services.map((group, groupIndex) => (
              <div
                key={group.category}
                className={scrollRevealClass(
                  isServicesInView,
                  Math.min(groupIndex * 2, 6) as ScrollRevealDelay,
                )}
              >
                <div className="grid gap-6 border-t border-border pt-8 lg:grid-cols-[0.55fr_1.45fr] lg:gap-12">
                  <div>
                    <h3 className="font-heading text-2xl font-semibold text-foreground">
                      {group.category}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                      {group.description}
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {group.offerings.map((offering) => (
                      <Link
                        key={offering.title}
                        href={contactHref(offering.interest)}
                        onClick={() => {
                          window.dispatchEvent(
                            new CustomEvent("contact-interest-change", {
                              detail: offering.interest,
                            }),
                          );
                        }}
                        className="group flex min-h-[12.75rem] flex-col rounded-lg border border-border/70 bg-card/55 p-6 outline-none transition-all duration-200 ease-out hover:border-primary/35 hover:bg-secondary/70 focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                      >
                        <h4 className="font-heading text-lg font-semibold text-foreground">
                          {offering.title === "Dashboards & Admin Tools" ? (
                            <>
                              Dashboards &<br className="hidden xl:block" />
                              <span className="xl:hidden"> </span>Admin Tools
                            </>
                          ) : (
                            offering.title
                          )}
                        </h4>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                          {offering.description}
                        </p>
                        <p className="mt-auto pt-6 text-sm font-medium text-foreground">
                          {offering.detail}
                        </p>
                      </Link>
                    ))}
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
              className="group inline-flex items-center gap-2 text-sm font-medium text-primary-soft transition-colors hover:text-primary-soft/80"
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
                src={images.about}
                alt="Kaia Fay, web developer in Boise, Idaho"
                fill
                className="object-cover object-top"
                sizes="(max-width: 640px) 176px, 208px"
              />
            </div>
            <div className="flex flex-col gap-4 text-center sm:text-left">
              <div>
                <SectionLabel as="h2">
                  Who you&apos;re working with
                </SectionLabel>
                <SectionHeading className="mt-2">
                  One developer, start to finish
                </SectionHeading>
              </div>
              <p className="text-base leading-relaxed text-muted-foreground">
                I&apos;m Kaia. Software engineer by trade, and the only person
                who touches your project. I spent years in service jobs before
                teaching myself to code, so I know what it&apos;s like to be
                the person doing everything. I build accordingly. Based in
                Boise, working with businesses across the Treasure Valley and
                remotely.
              </p>
              <Link
                href="/work"
                className="group inline-flex items-center justify-center gap-2 text-sm font-medium text-primary-soft transition-colors hover:text-primary-soft/80 sm:justify-start"
              >
                See the work
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

      <section ref={customRef} className="relative py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className={scrollRevealClass(isCustomInView)}>
            <div className="mb-8 text-center">
              <SectionLabel as="h2">An honest note</SectionLabel>
              <SectionHeading className="mt-2">
                Do you actually need custom work?
              </SectionHeading>
            </div>
            <div className="flex flex-col gap-4 text-base leading-relaxed text-muted-foreground">
              <p>
                Sometimes no. If you need one page with your hours, your
                prices, and a phone number, Squarespace or Wix can be enough.
                If that&apos;s your situation, I&apos;ll tell you.
              </p>
              <p>
                Custom work earns its cost when the website has a job to do.
                When clients should be able to book, pay, or fill out an intake
                form without texting you first. When the template look
                doesn&apos;t match work you&apos;ve spent years getting right.
                Or when you&apos;d rather hand the whole thing to one person
                than learn a website builder on your nights off.
              </p>
              <p>
                You own everything I build, code included. Nothing is locked
                inside a platform, and if we part ways after launch, it&apos;s
                still yours.
              </p>
            </div>
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

      <section ref={afterRef} className="relative py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <div
            className={`${scrollRevealClass(isAfterInView)} mb-12 text-center`}
          >
            <SectionLabel as="h2">After you reach out</SectionLabel>
            <SectionHeading className="mt-2">What happens next</SectionHeading>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {afterSteps.map((step, i) => (
              <div
                key={step.title}
                className={`${scrollRevealClass(isAfterInView, Math.min(i * 2, 6) as ScrollRevealDelay)} flex flex-col gap-2 text-center sm:text-left`}
              >
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
          <p
            className={`${scrollRevealClass(isAfterInView, 6)} mt-10 text-center text-sm leading-relaxed text-muted-foreground`}
          >
            And if I&apos;m not the right fit for the project, I&apos;ll say
            so.
          </p>
        </div>
      </section>

      <Contact
        label="Project Inquiry"
        heading="Tell me what you're building"
        description="Share the project details and I'll follow up with next steps."
        showSocialLinks={false}
        showBudget={true}
        showProjectFields={true}
      />
    </main>
  );
}
