export default function CoachingPage() {
  return (
    <main>
      <section className="relative flex min-h-[60vh] flex-col items-center justify-center px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-sm font-medium tracking-widest text-primary uppercase">
            Coaching
          </h2>
          <h1 className="mt-2 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Work With Me
          </h1>
          {/* TODO: replace with your coaching offer copy */}
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            One-on-one training and nutrition guidance tailored to your goals.
            Structured, evidence-based, and built around your schedule.
          </p>
          <div className="mt-8">
            <span className="inline-block rounded-full border border-primary bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              Coming Soon
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
