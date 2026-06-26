import { BookingForm } from "@/components/booking/booking-form";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionLabel } from "@/components/ui/section-label";

export default function BookPage() {
  return (
    <main>
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <SectionLabel>Discovery Call</SectionLabel>
          <SectionHeading as="h1" className="mt-2">
            Book a 30-minute discovery call
          </SectionHeading>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Pick a time to talk through your website, app, or project inquiry.
            We&apos;ll focus on fit, scope, timeline, and next steps.
          </p>
        </div>
      </section>

      <section className="relative pb-24 lg:pb-32">
        <div className="mx-auto max-w-6xl px-6">
          <BookingForm />
        </div>
      </section>
    </main>
  );
}
