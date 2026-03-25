"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// ─── Phone mockup ─────────────────────────────────────────────────────────────

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
    <div
      style={{
        width: 248,
        height: 536,
        borderRadius: 40,
        border: "1.5px solid rgba(255,255,255,0.12)",
        boxShadow:
          "inset 0 0 28px rgba(0,0,0,0.45), 0 20px 60px rgba(0,0,0,0.4)",
        overflow: "hidden",
        position: "relative",
        flexShrink: 0,
        backgroundColor: "#100e2e",
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="248px"
        style={{ objectFit: "cover", objectPosition: "top" }}
        priority={priority}
      />
    </div>
  );
}

// ─── Scroll reveal ────────────────────────────────────────────────────────────

function SlideReveal({
  children,
  fromLeft = true,
}: {
  children: React.ReactNode;
  fromLeft?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${fromLeft ? "bb-slide-left" : "bb-slide-right"} ${visible ? "bb-visible" : ""}`}
    >
      {children}
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

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(t);
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
    <div className="bb-page-gradient min-h-screen" style={{ color: "#1E1B4B" }}>

      {/* ─── Hero ─────────────────────────────────────────── */}
      <section
        style={{
          maxWidth: 1080,
          margin: "0 auto",
          padding: "120px 32px 120px",
          display: "flex",
          alignItems: "center",
          gap: 72,
          flexWrap: "wrap",
        }}
      >
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
          className={`bb-hero-text${loaded ? " bb-loaded" : ""}`}
          style={{ flex: 1, minWidth: 260 }}
        >
          <p
            style={{
              fontFamily: "var(--font-heading-active)",
              fontWeight: 600,
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#22C55E",
              marginBottom: 18,
            }}
          >
            Budget Buddy
          </p>
          <h1
            style={{
              fontFamily: "var(--font-heading-active)",
              fontWeight: 600,
              fontSize: "clamp(2.4rem, 5vw, 3.4rem)",
              lineHeight: 1.15,
              color: "#1E1B4B",
              marginBottom: 20,
            }}
          >
            Your balance,
            <br />
            every day.
          </h1>
          <p
            style={{
              fontFamily: "var(--font-sans-active)",
              fontSize: "1.0625rem",
              color: "#4a4a6a",
              lineHeight: 1.65,
              maxWidth: 400,
              marginBottom: 36,
            }}
          >
            Most budgeting apps tell you where your money went. Budget Buddy
            shows you where it&apos;s going — one day at a time.
          </p>
          <a
            href="#get-access"
            style={{
              display: "inline-block",
              backgroundColor: "#22C55E",
              color: "#0d1f0d",
              fontFamily: "var(--font-heading-active)",
              fontWeight: 600,
              fontSize: "0.9375rem",
              padding: "14px 28px",
              borderRadius: 12,
              textDecoration: "none",
            }}
          >
            Request early access
          </a>
        </div>
      </section>

      {/* ─── Problem ──────────────────────────────────────── */}
      <section
        style={{
          maxWidth: 660,
          margin: "0 auto",
          padding: "120px 32px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-heading-active)",
            fontWeight: 600,
            fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)",
            color: "#F5F0EB",
            lineHeight: 1.25,
            marginBottom: 24,
          }}
        >
          Budgeting apps show you the month.
          <br />
          That&apos;s too late.
        </h2>
        <p
          style={{
            fontFamily: "var(--font-sans-active)",
            fontSize: "1.0625rem",
            color: "#9A8F85",
            lineHeight: 1.7,
          }}
        >
          By the time you see a monthly summary, the damage is done. Budget
          Buddy puts your running balance on the calendar so you can see — at a
          glance — what today&apos;s spending means for the rest of the month.
        </p>
      </section>

      {/* ─── Screenshots ──────────────────────────────────── */}
      <section
        style={{
          maxWidth: 960,
          margin: "0 auto",
          padding: "40px 32px 120px",
          display: "flex",
          flexDirection: "column",
          gap: 72,
        }}
      >
        {(
          [
            {
              src: "/images/budget-buddy/transactions.webp",
              alt: "Transactions list",
              caption: "Every expense and income entry, organized by date.",
              fromLeft: true,
            },
            {
              src: "/images/budget-buddy/add-transaction.webp",
              alt: "Add transaction screen",
              caption:
                "Quick entry. Label it, date it, mark it recurring if it repeats.",
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
        ).map(({ src, alt, caption, fromLeft }) => (
          <SlideReveal key={src} fromLeft={fromLeft}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 48,
                flexWrap: "wrap",
                justifyContent: "center",
                flexDirection: fromLeft ? "row" : "row-reverse",
              }}
            >
              <PhoneMockup src={src} alt={alt} />
              <p
                style={{
                  fontFamily: "var(--font-sans-active)",
                  fontSize: "1.0625rem",
                  color: "#4a4a6a",
                  lineHeight: 1.65,
                  maxWidth: 280,
                  textAlign: fromLeft ? "right" : "left",
                  flex: 1,
                  minWidth: 180,
                  alignSelf: "center",
                  margin: 0,
                }}
              >
                {caption}
              </p>
            </div>
          </SlideReveal>
        ))}
      </section>

      {/* ─── Who it's for ─────────────────────────────────── */}
      <section
        style={{
          maxWidth: 620,
          margin: "0 auto",
          padding: "80px 32px 120px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-heading-active)",
            fontWeight: 600,
            fontSize: "clamp(1.7rem, 3vw, 2.1rem)",
            color: "#F5F0EB",
            lineHeight: 1.3,
            marginBottom: 24,
          }}
        >
          Built for people who want to know their number — not analyze it.
        </h2>
        <p
          style={{
            fontFamily: "var(--font-sans-active)",
            fontSize: "1.0625rem",
            color: "#9A8F85",
            lineHeight: 1.7,
          }}
        >
          No charts. No AI insights. No subscription tiers. Just your balance,
          updated every day, exactly when you need it.
        </p>
      </section>

      {/* ─── CTA ──────────────────────────────────────────── */}
      <section
        id="get-access"
        style={{ maxWidth: 540, margin: "0 auto 120px", padding: "0 32px" }}
      >
        <div
          style={{
            backgroundColor: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 20,
            padding: "48px 40px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-heading-active)",
              fontWeight: 600,
              fontSize: "1.75rem",
              color: "#F5F0EB",
              marginBottom: 12,
            }}
          >
            Budget Buddy is in private beta.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-sans-active)",
              fontSize: "1rem",
              color: "#9A8F85",
              lineHeight: 1.65,
              marginBottom: 28,
            }}
          >
            Drop your email and I&apos;ll send you an invite code when a spot
            opens up.
          </p>

          {formStatus === "success" ? (
            <p
              style={{
                color: "#22C55E",
                fontFamily: "var(--font-sans-active)",
                fontSize: "1rem",
                padding: "16px 0",
              }}
            >
              You&apos;re on the list. I&apos;ll be in touch.
            </p>
          ) : (
            <form onSubmit={handleSubmit}>
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  marginBottom: 14,
                  flexWrap: "wrap",
                }}
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="bb-input"
                  style={{
                    flex: 1,
                    minWidth: 180,
                    padding: "11px 14px",
                    borderRadius: 10,
                    border: "1px solid rgba(255,255,255,0.14)",
                    backgroundColor: "rgba(255,255,255,0.06)",
                    color: "#F5F0EB",
                    fontFamily: "var(--font-sans-active)",
                    fontSize: "0.9375rem",
                  }}
                />
                <button
                  type="submit"
                  disabled={formStatus === "loading"}
                  style={{
                    backgroundColor: "#22C55E",
                    color: "#0d1f0d",
                    fontFamily: "var(--font-heading-active)",
                    fontWeight: 600,
                    fontSize: "0.9375rem",
                    padding: "11px 20px",
                    borderRadius: 10,
                    border: "none",
                    cursor: formStatus === "loading" ? "not-allowed" : "pointer",
                    opacity: formStatus === "loading" ? 0.65 : 1,
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                >
                  {formStatus === "loading" ? "Sending…" : "Get access"}
                </button>
              </div>
              {formStatus === "error" && (
                <p
                  style={{
                    color: "#f87171",
                    fontFamily: "var(--font-sans-active)",
                    fontSize: "0.875rem",
                    marginBottom: 8,
                  }}
                >
                  Something went wrong. Please try again.
                </p>
              )}
              <p
                style={{
                  fontFamily: "var(--font-sans-active)",
                  fontSize: "0.8125rem",
                  color: "#5e5a70",
                }}
              >
                No spam. Just the code when it&apos;s ready.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* ─── Footer ───────────────────────────────────────── */}
      <footer
        style={{
          textAlign: "center",
          padding: "28px 32px 40px",
          borderTop: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-sans-active)",
            fontSize: "0.875rem",
            color: "#5e5a70",
          }}
        >
          Built by Kaia ·{" "}
          <a
            href="https://kaiafay.com"
            style={{ color: "#9A8F85", textDecoration: "none" }}
          >
            kaiafay.com
          </a>
        </p>
      </footer>
    </div>
  );
}
