import Image from "next/image";
import { ClipboardList, Mail, Calendar } from "lucide-react";
import { images } from "@/lib/images";
import { CoachingForm } from "@/components/coaching/coaching-form";

const steps = [
  {
    icon: ClipboardList,
    title: "Step 1: Fill out the form",
    description: "Tell me about your goals, training history, and lifestyle.",
  },
  {
    icon: Mail,
    title: "Step 2: I'll reach out",
    description: "I'll review your application and email you within 48 hours.",
  },
  {
    icon: Calendar,
    title: "Step 3: Book your discovery call",
    description: "We'll hop on a free 30-min call to see if we're a good fit.",
  },
];

export default function CoachingPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative pt-24 pb-12 lg:pt-32 lg:pb-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-sm font-medium tracking-widest text-primary uppercase">
            Coaching
          </h2>
          <h1 className="mt-2 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Work With Me
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Spots are limited. If you&apos;re serious about your goals,
            let&apos;s talk.
          </p>
        </div>
      </section>

      {/* My Approach — split image + text */}
      <section className="relative pt-12 pb-24 lg:pt-16 lg:pb-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="relative min-h-[280px] overflow-hidden rounded-lg sm:min-h-[360px] lg:min-h-0 lg:h-full">
              <Image
                src={images.coaching}
                alt=""
                fill
                className="object-cover object-[50%_65%]"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority={false}
              />
            </div>
            <div className="flex flex-col justify-center py-4 lg:py-0">
              <p className="text-sm font-medium tracking-widest text-primary uppercase">
                My Approach
              </p>
              <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
                No cookie-cutter programs.
              </h2>
              <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  I build plans around your life, your schedule, and your body —
                  not a template.
                </p>
                <p>
                  Whether your goal is building muscle, losing fat, or stepping
                  on stage, I&apos;ll meet you where you are and push you past
                  where you thought you could go.
                </p>
                <p>Evidence-based. Adaptive. Built for real results.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Happens Next */}
      <section className="relative py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h3 className="mb-12 text-center text-sm font-medium tracking-widest text-primary uppercase">
            What Happens Next
          </h3>
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.title}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl border border-primary/30 bg-primary/10">
                  <step.icon size={24} className="text-primary" />
                </div>
                <h4 className="font-heading text-lg font-semibold text-foreground">
                  {step.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intake Form */}
      <section className="relative py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <CoachingForm />
        </div>
      </section>
    </main>
  );
}
