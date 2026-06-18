"use client";

import { useEffect, useRef, useState } from "react";
import {
  Github,
  Instagram,
  Linkedin,
  Loader2,
  Mail,
  Phone,
} from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { scrollRevealClass } from "@/lib/scroll-reveal";
import { DropdownSelect } from "@/components/ui/dropdown-select";
import { SectionLabel } from "@/components/ui/section-label";
import { SectionHeading } from "@/components/ui/section-heading";

function inputClass(hasError: boolean, extra = "") {
  return (
    `${extra}rounded-lg border bg-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-200 focus:outline-none disabled:opacity-60 ` +
    (hasError ? "border-primary/60" : "border-border focus:border-primary/50")
  );
}

const INTEREST_OPTIONS = [
  { value: "Landing Page", label: "Landing Page" },
  { value: "Custom Project", label: "Custom Project" },
  { value: "Dev Support", label: "Dev Support" },
  { value: "Other", label: "Other" },
] as const;

const BUDGET_OPTIONS = [
  { value: "Under $1,000", label: "Under $1,000" },
  { value: "$1,000–$3,000", label: "$1,000–$3,000" },
  { value: "$3,000–$7,000", label: "$3,000–$7,000" },
  { value: "$7,000+", label: "$7,000+" },
  { value: "Not sure yet", label: "Not sure yet" },
] as const;

const SOCIAL_LINKS = [
  {
    href: "https://github.com/kaiafay",
    label: "GitHub",
    text: "kaiafay",
    icon: Github,
  },
  {
    href: "https://www.linkedin.com/in/kaia-scheirman/",
    label: "LinkedIn",
    text: "Kaia Fay",
    icon: Linkedin,
  },
  {
    href: "https://www.instagram.com/kaia.builds",
    label: "Instagram",
    text: "kaia.builds",
    icon: Instagram,
  },
] as const;

const DEFAULT_CONTACT_EMAIL = "kaia@kaiafay.com";
const DEFAULT_CONTACT_PHONE = "(541) 248-1982";

function IconLinks({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={compact ? "flex items-center gap-5" : "flex flex-col gap-3"}
    >
      {SOCIAL_LINKS.map(({ href, label, text, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={
            compact
              ? "text-muted-foreground transition-colors duration-200 hover:text-foreground"
              : "group flex items-center gap-3 rounded-lg border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition-all duration-200 hover:border-primary/50 hover:text-primary"
          }
          aria-label={label}
        >
          <Icon
            size={compact ? 20 : 18}
            className={
              compact
                ? undefined
                : "shrink-0 text-muted-foreground transition-colors duration-200 group-hover:text-primary"
            }
            aria-hidden
          />
          {!compact && <span>{text}</span>}
        </a>
      ))}
    </div>
  );
}

function isValidInterest(
  value: string | null,
): value is (typeof INTEREST_OPTIONS)[number]["value"] {
  return INTEREST_OPTIONS.some((option) => option.value === value);
}

function normalizeWebsiteUrl(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

interface ContactProps {
  label?: string;
  heading?: string;
  description?: string;
  showSocialLinks?: boolean;
  showBudget?: boolean;
  showProjectFields?: boolean;
  showDirectContact?: boolean;
  contactEmail?: string;
  contactPhone?: string;
}

export function Contact({
  label = "Contact",
  heading = "Let's Connect",
  description,
  showSocialLinks = true,
  showBudget = false,
  showProjectFields = false,
  showDirectContact = false,
  contactEmail = DEFAULT_CONTACT_EMAIL,
  contactPhone = DEFAULT_CONTACT_PHONE,
}: ContactProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("");
  const [budget, setBudget] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [directContactOpen, setDirectContactOpen] = useState(false);
  const hasDirectContact = showDirectContact && !showProjectFields;
  const primaryContactLinks = [
    {
      href: `mailto:${contactEmail}`,
      label: "Email",
      text: contactEmail,
      icon: Mail,
    },
    {
      href: `tel:+1${contactPhone.replace(/\D/g, "")}`,
      label: "Phone",
      text: contactPhone,
      icon: Phone,
    },
  ];
  const directContactLinks = showSocialLinks
    ? [...primaryContactLinks, ...SOCIAL_LINKS]
    : primaryContactLinks;
  const renderDirectContactList = (linkTabIndex?: 0 | -1) => (
    <div className="flex flex-col gap-3">
      {directContactLinks.map(({ href, label, text, icon: Icon }) => (
        <a
          key={label}
          href={href}
          tabIndex={linkTabIndex}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          className="group flex items-center gap-3 rounded-lg border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition-all duration-200 hover:border-primary/50 hover:text-primary"
          aria-label={label}
        >
          <Icon
            size={18}
            className="shrink-0 text-muted-foreground transition-colors duration-200 group-hover:text-primary"
            aria-hidden
          />
          <span className="break-all">{text}</span>
        </a>
      ))}
    </div>
  );

  const clearFieldError = (field: string) => {
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get("interest");
    if (!isValidInterest(value)) return;
    setInterest(value);
    clearFieldError("interest");
  }, []);

  const validate = (): boolean => {
    const errors: Record<string, string> = {};
    const trimmedName = name.trim();
    if (!trimmedName) errors.name = "Name is required.";
    if (!email.trim()) errors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors.email = "Please enter a valid email.";
    if (!interest) errors.interest = "Please select an option.";
    const normalizedWebsiteUrl = normalizeWebsiteUrl(websiteUrl);
    if (
      showProjectFields &&
      normalizedWebsiteUrl &&
      !/^https?:\/\/.+\..+/.test(normalizedWebsiteUrl)
    ) {
      errors.websiteUrl = "Please enter a valid website URL.";
    }
    if (showProjectFields) {
      if (projectDescription.trim().length < 20) {
        errors.projectDescription = "Share a little more about the project.";
      }
    } else if (!message.trim()) errors.message = "Message is required.";
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
        body: JSON.stringify({
          name,
          email,
          interest,
          budget: budget || undefined,
          businessName: showProjectFields
            ? businessName.trim() || undefined
            : undefined,
          websiteUrl: showProjectFields
            ? normalizeWebsiteUrl(websiteUrl) || undefined
            : undefined,
          projectDescription: showProjectFields
            ? projectDescription.trim()
            : undefined,
          notes: showProjectFields ? notes.trim() || undefined : undefined,
          message: showProjectFields ? undefined : message,
        }),
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
      setBudget("");
      setBusinessName("");
      setWebsiteUrl("");
      setProjectDescription("");
      setNotes("");
      setMessage("");
      setFieldErrors({});
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <section ref={ref} id="contact" className="relative py-24 lg:py-32">
      <div
        className={`mx-auto px-6 ${
          showProjectFields
            ? "max-w-4xl"
            : hasDirectContact
              ? "max-w-lg lg:max-w-4xl"
              : "max-w-2xl"
        }`}
      >
        <div
          className={`${scrollRevealClass(isInView)} flex flex-col items-center gap-12`}
        >
          <div className="text-center">
            <SectionLabel as="h2">{label}</SectionLabel>
            <SectionHeading className="mt-2">{heading}</SectionHeading>
            {description && (
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {description}
              </p>
            )}
          </div>

          <div
            className={
              hasDirectContact
                ? "grid w-full overflow-hidden rounded-xl border border-border bg-card card-shadow lg:grid-cols-[0.75fr_1.25fr]"
                : "w-full"
            }
          >
            {hasDirectContact && (
              <aside className="relative hidden p-6 sm:p-8 lg:block lg:pt-10 lg:after:absolute lg:after:inset-y-8 lg:after:right-0 lg:after:w-px lg:after:bg-border lg:after:content-['']">
                <div className="flex flex-col gap-5">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Prefer to reach out directly?
                  </p>

                  {renderDirectContactList()}
                </div>
              </aside>
            )}

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
              className={
                showProjectFields
                  ? "flex w-full flex-col gap-5 rounded-xl border border-border bg-card p-6 card-shadow sm:p-8"
                  : hasDirectContact
                    ? "mx-auto flex w-full max-w-md flex-col gap-5 p-6 py-8 sm:p-8 sm:py-10"
                    : "flex w-full flex-col gap-5"
              }
            >
              {status === "error" && (
                <div className="rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-foreground">
                  {errorMessage}
                </div>
              )}

              {showProjectFields ? (
                <div className="mx-auto flex w-full max-w-2xl flex-col gap-5">
                  <div className="grid gap-5 sm:grid-cols-2">
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
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
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

                    {showBudget && (
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="budget"
                          className="text-sm font-medium text-foreground"
                        >
                          Budget range{" "}
                          <span className="text-muted-foreground font-normal">
                            (optional)
                          </span>
                        </label>
                        <DropdownSelect
                          id="budget"
                          value={budget}
                          onValueChange={setBudget}
                          options={[...BUDGET_OPTIONS]}
                          placeholder="Select a range..."
                          disabled={status === "loading"}
                          hasError={false}
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="businessName"
                      className="text-sm font-medium text-foreground"
                    >
                      Business or project name{" "}
                      <span className="font-normal text-muted-foreground">
                        (optional)
                      </span>
                    </label>
                    <input
                      id="businessName"
                      type="text"
                      placeholder="Project name"
                      value={businessName}
                      onChange={(e) => {
                        setBusinessName(e.target.value);
                        clearFieldError("businessName");
                      }}
                      disabled={status === "loading"}
                      className={inputClass(!!fieldErrors.businessName)}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="websiteUrl"
                      className="text-sm font-medium text-foreground"
                    >
                      Website URL{" "}
                      <span className="font-normal text-muted-foreground">
                        (optional)
                      </span>
                    </label>
                    <input
                      id="websiteUrl"
                      type="url"
                      placeholder="example.com"
                      value={websiteUrl}
                      onChange={(e) => {
                        setWebsiteUrl(e.target.value);
                        clearFieldError("websiteUrl");
                      }}
                      disabled={status === "loading"}
                      className={inputClass(!!fieldErrors.websiteUrl)}
                    />
                    {fieldErrors.websiteUrl && (
                      <p className="text-sm text-primary/90" role="alert">
                        {fieldErrors.websiteUrl}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="projectDescription"
                      className="text-sm font-medium text-foreground"
                    >
                      Project description
                    </label>
                    <textarea
                      id="projectDescription"
                      rows={5}
                      placeholder="Tell me what you want to build and what a good outcome looks like."
                      value={projectDescription}
                      onChange={(e) => {
                        setProjectDescription(e.target.value);
                        clearFieldError("projectDescription");
                      }}
                      disabled={status === "loading"}
                      className={inputClass(
                        !!fieldErrors.projectDescription,
                        "resize-none ",
                      )}
                    />
                    {fieldErrors.projectDescription && (
                      <p className="text-sm text-primary/90" role="alert">
                        {fieldErrors.projectDescription}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="notes"
                      className="text-sm font-medium text-foreground"
                    >
                      Notes{" "}
                      <span className="font-normal text-muted-foreground">
                        (optional)
                      </span>
                    </label>
                    <textarea
                      id="notes"
                      rows={3}
                      placeholder="Anything else I should know before I follow up?"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      disabled={status === "loading"}
                      className={inputClass(false, "resize-none ")}
                    />
                  </div>
                </div>
              ) : (
                <>
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

                  {showBudget && (
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="budget"
                        className="text-sm font-medium text-foreground"
                      >
                        Budget range{" "}
                        <span className="text-muted-foreground font-normal">
                          (optional)
                        </span>
                      </label>
                      <DropdownSelect
                        id="budget"
                        value={budget}
                        onValueChange={setBudget}
                        options={[...BUDGET_OPTIONS]}
                        placeholder="Select a range..."
                        disabled={status === "loading"}
                        hasError={false}
                      />
                    </div>
                  )}

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
                      className={inputClass(
                        !!fieldErrors.message,
                        "resize-none ",
                      )}
                    />
                    {fieldErrors.message && (
                      <p className="text-sm text-primary/90" role="alert">
                        {fieldErrors.message}
                      </p>
                    )}
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className={`mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all duration-200 hover:bg-primary/90 btn-primary-glow disabled:opacity-60 disabled:pointer-events-none ${
                  showProjectFields ? "mx-auto max-w-2xl" : ""
                }`}
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending...
                  </>
                ) : showProjectFields ? (
                  "Send Project Inquiry"
                ) : (
                  "Send Message"
                )}
              </button>

              {hasDirectContact && (
                <div className="flex flex-col items-center lg:hidden">
                  <button
                    type="button"
                    aria-expanded={directContactOpen}
                    aria-controls="direct-contact-links"
                    onClick={() => setDirectContactOpen((open) => !open)}
                    className="mt-1 text-center text-sm font-medium text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
                  >
                    Prefer to reach out directly?
                  </button>

                  <div
                    id="direct-contact-links"
                    aria-hidden={!directContactOpen}
                    className={`grid w-full transition-[grid-template-rows,opacity,margin-top] duration-300 ease-out ${
                      directContactOpen
                        ? "mt-5 grid-rows-[1fr] opacity-100"
                        : "mt-0 grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      {renderDirectContactList(
                        directContactOpen ? 0 : -1,
                      )}
                    </div>
                  </div>
                </div>
              )}
            </form>
            )}
          </div>

          {showSocialLinks && !hasDirectContact && <IconLinks compact />}
        </div>
      </div>
    </section>
  );
}
