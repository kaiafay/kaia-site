"use client";

import { useRef, useState } from "react";
import { Github, Linkedin, Instagram, Loader2 } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { scrollRevealClass } from "@/lib/scroll-reveal";
import { DropdownSelect } from "@/components/ui/dropdown-select";
import { SectionLabel } from "@/components/ui/section-label";
import { SectionHeading } from "@/components/ui/section-heading";

function inputClass(hasError: boolean, extra = "") {
  return (
    `${extra}rounded-lg border bg-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-200 focus:outline-none focus:shadow-[0_0_20px_rgba(143,56,72,0.25)] disabled:opacity-60 ` +
    (hasError ? "border-primary/60" : "border-border focus:border-primary/50")
  );
}

const INTEREST_OPTIONS = [
  { value: "software", label: "Software" },
  { value: "training", label: "Training" },
  { value: "both", label: "Both" },
] as const;

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const clearFieldError = (field: string) => {
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const validate = (): boolean => {
    const errors: Record<string, string> = {};
    const trimmedName = name.trim();
    if (!trimmedName) errors.name = "Name is required.";
    if (!email.trim()) errors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors.email = "Please enter a valid email.";
    if (!interest) errors.interest = "Please select an option.";
    if (!message.trim()) errors.message = "Message is required.";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    setErrorMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, interest, message }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setErrorMessage(
          data.error ?? "Something went wrong. Please try again.",
        );
        return;
      }
      setStatus("success");
      setName("");
      setEmail("");
      setInterest("");
      setMessage("");
      setFieldErrors({});
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <section ref={ref} id="contact" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-2xl px-6">
        <div
          className={`${scrollRevealClass(isInView)} flex flex-col items-center gap-12`}
        >
          <div className="text-center">
            <SectionLabel as="h2">Contact</SectionLabel>
            <SectionHeading className="mt-2">{"Let's Connect"}</SectionHeading>
          </div>

          {status === "success" ? (
            <div className="w-full rounded-lg border border-primary/30 bg-primary/5 p-8 text-center">
              <p className="text-lg font-medium text-foreground">
                Thanks! I&apos;ll be in touch soon.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex w-full flex-col gap-5"
            >
              {status === "error" && (
                <div className="rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-foreground">
                  {errorMessage}
                </div>
              )}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-foreground"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    clearFieldError("name");
                  }}
                  disabled={status === "loading"}
                  className={inputClass(!!fieldErrors.name)}
                />
                {fieldErrors.name && (
                  <p className="text-sm text-primary/90" role="alert">
                    {fieldErrors.name}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-foreground"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    clearFieldError("email");
                  }}
                  disabled={status === "loading"}
                  className={inputClass(!!fieldErrors.email)}
                />
                {fieldErrors.email && (
                  <p className="text-sm text-primary/90" role="alert">
                    {fieldErrors.email}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="interest"
                  className="text-sm font-medium text-foreground"
                >
                  {"I'm interested in"}
                </label>
                <DropdownSelect
                  id="interest"
                  value={interest}
                  onValueChange={(v) => {
                    setInterest(v);
                    clearFieldError("interest");
                  }}
                  options={[...INTEREST_OPTIONS]}
                  placeholder="Select one..."
                  disabled={status === "loading"}
                  hasError={!!fieldErrors.interest}
                />
                {fieldErrors.interest && (
                  <p className="text-sm text-primary/90" role="alert">
                    {fieldErrors.interest}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-foreground"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Tell me what you're looking for..."
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    clearFieldError("message");
                  }}
                  disabled={status === "loading"}
                  className={inputClass(!!fieldErrors.message, "resize-none ")}
                />
                {fieldErrors.message && (
                  <p className="text-sm text-primary/90" role="alert">
                    {fieldErrors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all duration-200 hover:bg-primary/90 hover:shadow-[0_0_16px_rgba(143,56,72,0.3)] disabled:opacity-60 disabled:pointer-events-none"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          )}

          <div className="flex items-center gap-5">
            <a
              href="https://github.com/kaiafay"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors duration-200 hover:text-foreground"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/kaia-scheirman/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors duration-200 hover:text-foreground"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://www.instagram.com/kaia.builds"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors duration-200 hover:text-foreground"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
