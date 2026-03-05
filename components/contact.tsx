"use client"

import { useRef, useState } from "react"
import { Github, Linkedin, Instagram } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"
import { DropdownSelect } from "@/components/ui/dropdown-select"

const INTEREST_OPTIONS = [
  { value: "software", label: "Software" },
  { value: "training", label: "Training" },
  { value: "both", label: "Both" },
] as const

export function Contact() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref)
  const [submitted, setSubmitted] = useState(false)
  const [interest, setInterest] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!interest) return
    setSubmitted(true)
  }

  return (
    <section ref={ref} id="contact" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-2xl px-6">
        <div
          className={`flex flex-col items-center gap-12 ${
            isInView ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <div className="text-center">
            <h2 className="text-sm font-medium tracking-widest text-primary uppercase">
              Contact
            </h2>
            {/* TODO: optional — replace contact heading and success message below with your own copy */}
            <h3 className="mt-2 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              {"Let's Connect"}
            </h3>
          </div>

          {submitted ? (
            <div className="w-full rounded-lg border border-primary/30 bg-primary/5 p-8 text-center">
              <p className="text-lg font-medium text-foreground">
                Thanks for reaching out!
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {"I'll get back to you as soon as I can."}
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex w-full flex-col gap-5"
            >
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-foreground"
                >
                  Name
                </label>
                {/* TODO: optional — replace form placeholders below with your own */}
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="Your name"
                  className="rounded-lg border border-border bg-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-200 focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/25"
                />
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
                  required
                  placeholder="you@email.com"
                  className="rounded-lg border border-border bg-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-200 focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/25"
                />
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
                  onValueChange={setInterest}
                  options={[...INTEREST_OPTIONS]}
                  placeholder="Select one..."
                />
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
                  required
                  rows={4}
                  placeholder="Tell me what you're looking for..."
                  className="resize-none rounded-lg border border-border bg-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-200 focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/25"
                />
              </div>

              <button
                type="submit"
                className="mt-2 w-full rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all duration-200 hover:bg-primary/90 hover:shadow-[0_0_16px_rgba(143,56,72,0.3)]"
              >
                Send Message
              </button>
            </form>
          )}

          {/* TODO: replace href="#" with your real social profile URLs */}
          <div className="flex items-center gap-5">
            <a
              href="#"
              className="text-muted-foreground transition-colors duration-200 hover:text-foreground"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="#"
              className="text-muted-foreground transition-colors duration-200 hover:text-foreground"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="#"
              className="text-muted-foreground transition-colors duration-200 hover:text-foreground"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
