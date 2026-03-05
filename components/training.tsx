"use client"

import { useRef } from "react"
import { Dumbbell, ClipboardList, Apple } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"

// TODO: replace with your real coaching services (titles and descriptions)
const services = [
  {
    icon: Dumbbell,
    title: "1:1 Coaching",
    description:
      "Personalized training programs with weekly check-ins, form reviews, and progressive overload tracking. Built around your schedule, your goals, and your life.",
  },
  {
    icon: ClipboardList,
    title: "Program Design",
    description:
      "Custom training blocks designed with periodization principles. Whether you're prepping for a show or building your foundation, every set has a purpose.",
  },
  {
    icon: Apple,
    title: "Nutrition Guidance",
    description:
      "Flexible nutrition strategies that fit your lifestyle. Macro coaching, meal timing, and sustainable approaches to fueling performance and recovery.",
  },
]

export function Training() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref)

  return (
    <section ref={ref} id="training" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div
          className={`mb-16 ${isInView ? "animate-fade-in-up" : "opacity-0"}`}
        >
          <h2 className="text-sm font-medium tracking-widest text-primary uppercase">
            Training
          </h2>
          <h3 className="mt-2 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Coaching Services
          </h3>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`group flex flex-col gap-4 rounded-lg border border-border bg-card p-8 transition-all duration-200 ease-out hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(143,56,72,0.25)] ${
                isInView ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-primary/30 bg-primary/10">
                <service.icon size={24} className="text-primary" />
              </div>
              <h4 className="font-heading text-xl font-semibold text-card-foreground">
                {service.title}
              </h4>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
