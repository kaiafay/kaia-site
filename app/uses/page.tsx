export default function UsesPage() {
  return (
    <main>
      <section className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-16">
            <h2 className="text-sm font-medium tracking-widest text-primary uppercase">
              Uses
            </h2>
            <h3 className="mt-2 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              Tools &amp; stack
            </h3>
          </div>

          <div className="flex flex-col gap-12">
            {/* TODO: replace with your real dev tools */}
            <div>
              <h4 className="mb-4 text-lg font-semibold tracking-tight text-primary font-heading">
                Dev Tools
              </h4>
              <ul className="flex flex-col gap-2 text-muted-foreground">
                <li>
                  <span className="font-medium text-foreground">VS Code</span> — Editor with Cursor for AI-assisted coding
                </li>
                <li>
                  <span className="font-medium text-foreground">iTerm2</span> — Terminal on macOS
                </li>
                <li>
                  <span className="font-medium text-foreground">Chrome</span> — Primary browser for dev and debugging
                </li>
              </ul>
            </div>

            {/* TODO: replace with your real hardware */}
            <div>
              <h4 className="mb-4 text-lg font-semibold tracking-tight text-primary font-heading">
                Hardware
              </h4>
              <ul className="flex flex-col gap-2 text-muted-foreground">
                <li>
                  <span className="font-medium text-foreground">MacBook Pro</span> — Main development machine
                </li>
                <li>
                  <span className="font-medium text-foreground">External monitor</span> — Second screen for layout
                </li>
              </ul>
            </div>

            {/* TODO: replace with your real gym equipment */}
            <div>
              <h4 className="mb-4 text-lg font-semibold tracking-tight text-primary font-heading">
                Gym Equipment
              </h4>
              <ul className="flex flex-col gap-2 text-muted-foreground">
                <li>
                  <span className="font-medium text-foreground">Barbell &amp; plates</span> — Squats, deadlifts, hip thrusts
                </li>
                <li>
                  <span className="font-medium text-foreground">Dumbbells</span> — Accessory work and unilateral movements
                </li>
                <li>
                  <span className="font-medium text-foreground">Resistance bands</span> — Warm-ups and mobility
                </li>
              </ul>
            </div>

            {/* TODO: replace with what you're actually reading/watching */}
            <div>
              <h4 className="mb-4 text-lg font-semibold tracking-tight text-primary font-heading">
                Currently Reading / Watching
              </h4>
              <ul className="flex flex-col gap-2 text-muted-foreground">
                <li>
                  <span className="font-medium text-foreground">The Wedding People</span> — Alison Espach
                </li>
                <li>
                  <span className="font-medium text-foreground">NASM CPT materials</span> — Certification prep
                </li>
              </ul>
            </div>

            {/* TODO: replace with your real supplements if any */}
            <div>
              <h4 className="mb-4 text-lg font-semibold tracking-tight text-primary font-heading">
                Supplements
              </h4>
              <ul className="flex flex-col gap-2 text-muted-foreground">
                <li>
                  <span className="font-medium text-foreground">Whey protein</span> — Post-workout recovery
                </li>
                <li>
                  <span className="font-medium text-foreground">Creatine</span> — Daily, 5g
                </li>
                <li>
                  <span className="font-medium text-foreground">Vitamin D</span> — Especially in winter
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
