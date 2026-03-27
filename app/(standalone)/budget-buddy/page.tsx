"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// ─── Phone mockup (assets are 1206×2622; frame matches that aspect ratio) ───

const BB_PHONE_SCREEN_WIDTH = 264;
const BB_PHONE_SIZES = `${BB_PHONE_SCREEN_WIDTH + 28}px`;

function PhoneMockup({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <div className="bb-phone-shell">
      <span className="bb-phone-side-btn bb-phone-side-btn--1" aria-hidden />
      <span className="bb-phone-side-btn bb-phone-side-btn--2" aria-hidden />
      <span className="bb-phone-side-btn bb-phone-side-btn--3" aria-hidden />
      <span
        className="bb-phone-side-btn bb-phone-side-btn--power"
        aria-hidden
      />
      <div className="bb-phone-bezel">
        <div className="bb-phone-screen">
          <Image
            src={src}
            alt={alt}
            fill
            sizes={BB_PHONE_SIZES}
            className="bb-phone-screen-img object-cover object-top"
            priority={priority}
          />
          <span className="bb-phone-home-bar" aria-hidden />
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BudgetBuddyPage() {
  const [loaded, setLoaded] = useState(false);
  const [email, setEmail] = useState("");
  const [formStatus, setFormStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const revealRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Fix iOS Safari overscroll: expose gradient start color instead of site's
    // dark body background when rubber-band scrolling past the page edges.
    document.documentElement.style.backgroundColor = "#e8ecff";
    document.body.style.backgroundColor = "#e8ecff";

    const t = setTimeout(() => setLoaded(true), 50);
    return () => {
      clearTimeout(t);
      document.documentElement.style.backgroundColor = "";
      document.body.style.backgroundColor = "";
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("bb-reveal--visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    revealRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormStatus("loading");
    try {
      const res = await fetch("/api/budget-buddy-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setFormStatus("success");
        setEmail("");
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  }

  return (
    <div className="bb-page-gradient min-h-screen text-[var(--bb-ink)]">
      {/* ─── Hero ─────────────────────────────────────────── */}
      <section className="bb-hero-section mx-auto max-w-[1080px] flex flex-wrap items-center gap-18 px-8 py-[120px]">
        {/* Phone */}
        <div className={`bb-hero-phone${loaded ? " bb-loaded" : ""}`}>
          <PhoneMockup
            src="/images/budget-buddy/calendar.webp"
            alt="Budget Buddy calendar view"
            priority
          />
        </div>

        {/* Text */}
        <div
          className={`bb-hero-text flex-1 min-w-[260px]${loaded ? " bb-loaded" : ""}`}
        >
          <p className="font-heading font-semibold text-[11px] tracking-[0.18em] uppercase text-[var(--bb-indigo)] mb-[18px]">
            Budget Buddy
          </p>
          <h1
            className="font-heading font-semibold leading-[1.15] text-[var(--bb-ink)] mb-5"
            style={{ fontSize: "clamp(2.4rem, 5vw, 3.4rem)" }}
          >
            Your balance,
            <br />
            every day.
          </h1>
          <p className="text-[1.0625rem] text-[var(--bb-ink-muted)] leading-[1.65] max-w-[400px] mb-9">
            Most budgeting apps tell you where your money went. Budget Buddy
            shows you where it&apos;s going.
          </p>
          <a href="#get-access" className="bb-btn-glass bb-btn-glass--hero">
            Request early access
          </a>
          <p className="mt-2 text-[0.8125rem] text-[var(--bb-ink-muted)]">
            <a
              href="https://budget-buddy-theta-three.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-1.5 opacity-70 transition-[color,opacity] hover:opacity-85 hover:text-[var(--bb-indigo)]"
            >
              Already have access? Open the app →
            </a>
          </p>
        </div>
      </section>

      {/* ─── Problem ──────────────────────────────────────── */}
      <section className="mx-auto max-w-[660px] px-8 py-[120px] text-center">
        <h2
          className="font-heading font-semibold leading-[1.25] text-[var(--bb-ink)] mb-6"
          style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)" }}
        >
          Budgeting apps show you the month.
          <br />
          That&apos;s too late.
        </h2>
        <p className="text-[1.0625rem] text-[var(--bb-ink-muted)] leading-[1.7]">
          By the time you see a monthly summary, the damage is done. Budget
          Buddy puts your running balance on the calendar so you can see at a
          glance what today&apos;s spending means for the rest of the month.
        </p>
      </section>

      {/* ─── Screenshots ──────────────────────────────────── */}
      <section className="mx-auto max-w-[960px] flex flex-col gap-18 px-8 pt-10 pb-[120px]">
        {(
          [
            {
              src: "/images/budget-buddy/transactions.webp",
              alt: "Transactions list",
              caption: "Every expense and income entry. Organized by date.",
              fromLeft: true,
            },
            {
              src: "/images/budget-buddy/add-transaction.webp",
              alt: "Add transaction screen",
              caption:
                "Quick entry. Label it. Date it. Mark it as recurring if it repeats.",
              fromLeft: false,
            },
            {
              src: "/images/budget-buddy/settings.webp",
              alt: "Settings screen",
              caption:
                "Set your starting balance once. Budget Buddy handles the math from there.",
              fromLeft: true,
            },
          ] as const
        ).map(({ src, alt, caption, fromLeft }, index) => (
          <div
            key={src}
            ref={(el) => {
              revealRefs.current[index] = el;
            }}
            className="bb-reveal"
          >
            <div
              className={`bb-screenshot-pair flex items-center gap-12 flex-wrap justify-center ${fromLeft ? "flex-row" : "flex-row-reverse"}`}
            >
              <PhoneMockup src={src} alt={alt} />
              <p
                className={`text-[1.0625rem] text-[var(--bb-ink-muted)] leading-[1.65] max-w-[280px] flex-1 min-w-[180px] self-center m-0 ${fromLeft ? "text-right" : "text-left"}`}
              >
                {caption}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* ─── Who it's for ─────────────────────────────────── */}
      <section className="mx-auto max-w-[620px] px-8 pt-20 pb-[120px] text-center">
        <h2
          className="font-heading font-semibold leading-[1.3] text-[var(--bb-ink)] mb-6"
          style={{ fontSize: "clamp(1.7rem, 3vw, 2.1rem)" }}
        >
          Built for people who want to know their number — not analyze it.
        </h2>
        <p className="text-[1.0625rem] text-[var(--bb-ink-muted)] leading-[1.7]">
          Budgeting shouldn't feel like a performance review. Budget Buddy keeps
          it simple. Just your number, every day.
        </p>
      </section>

      {/* ─── CTA ──────────────────────────────────────────── */}
      <section
        id="get-access"
        className="bb-cta-section mx-auto max-w-[540px] px-8 mb-[120px]"
      >
        <div className="bb-cta-glass">
          <h2 className="font-heading font-semibold text-[1.75rem] text-[var(--bb-ink)] mb-3">
            Budget Buddy is in private beta.
          </h2>
          <p className="text-base text-[var(--bb-ink-muted)] leading-[1.65] mb-7">
            Drop your email and I&apos;ll send an invite code when a spot opens
            up.
          </p>

          {formStatus === "success" ? (
            <p className="text-[var(--bb-indigo)] text-base py-4">
              You&apos;re on the list! I&apos;ll be in touch :)
            </p>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="bb-cta-field-row">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="bb-input bb-cta-input bb-input-glass py-[11px] px-[14px] rounded-[10px] text-[var(--bb-ink)] text-[0.9375rem]"
                />
                <button
                  type="submit"
                  disabled={formStatus === "loading"}
                  className="bb-cta-submit bb-btn-glass bb-btn-glass--submit"
                >
                  {formStatus === "loading" ? "Sending…" : "Get access"}
                </button>
              </div>
              {formStatus === "error" && (
                <p className="text-red-400 text-sm mb-2">
                  Something went wrong. Please try again.
                </p>
              )}
              <p className="text-[0.8125rem] text-[var(--bb-ink-muted)]">
                No spam. Just the code when it&apos;s ready.
              </p>
              <p className="mt-2 text-[0.8125rem] text-[var(--bb-ink-muted)]">
                <a
                  href="https://tally.so/r/rjVYM2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center gap-1.5 opacity-70 transition-[color,opacity] hover:opacity-85 hover:text-[var(--bb-indigo)]"
                >
                  Already a beta tester? Share your feedback →
                </a>
              </p>
            </form>
          )}
        </div>
      </section>

      {/* ─── Footer ───────────────────────────────────────── */}
      <footer
        className="text-center pt-7 pb-10 px-8"
        style={{ borderTop: "1px solid var(--bb-ink-a10)" }}
      >
        <p className="text-sm text-[var(--bb-ink-muted)]">
          Built by Kaia ·{" "}
          <a
            href="https://kaiafay.com"
            className="text-[var(--bb-ink)] no-underline"
          >
            kaiafay.com
          </a>
        </p>
      </footer>
    </div>
  );
}
