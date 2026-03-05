"use client"

import { useRef } from "react"
import { ExternalLink, Github } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"

// TODO: replace with your real projects (name, description, tech, github URL, live URL or null)
const projects = [
  {
    name: "FitTrack Pro",
    description:
      "A full-stack workout tracking app with progressive overload analytics, rest timers, and workout history visualization.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind"],
    github: "#",
    live: "#",
  },
  {
    name: "NutriSync",
    description:
      "Meal planning and macro tracking platform with AI-powered food recognition and barcode scanning.",
    tech: ["React", "Node.js", "OpenAI", "MongoDB"],
    github: "#",
    live: "#",
  },
  {
    name: "DevBoard",
    description:
      "Real-time collaborative kanban board for dev teams with GitHub integration and automated sprint reports.",
    tech: ["Next.js", "WebSockets", "Redis", "Prisma"],
    github: "#",
    live: null,
  },
  {
    name: "CoachConnect",
    description:
      "Marketplace platform connecting coaches with clients. Includes scheduling, payments, and progress dashboards.",
    tech: ["Next.js", "Stripe", "Supabase", "Tailwind"],
    github: "#",
    live: "#",
  },
  {
    name: "FormCheck AI",
    description:
      "Computer vision tool for analyzing exercise form through video upload. Provides real-time feedback and corrections.",
    tech: ["Python", "TensorFlow", "FastAPI", "React"],
    github: "#",
    live: null,
  },
  {
    name: "Pulse CLI",
    description:
      "Developer productivity CLI that tracks coding time, generates standup summaries, and integrates with Linear and Slack.",
    tech: ["Go", "SQLite", "Cobra", "REST APIs"],
    github: "#",
    live: null,
  },
]

export function Projects() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref)

  return (
    <section ref={ref} id="projects" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div
          className={`mb-16 ${isInView ? "animate-fade-in-up" : "opacity-0"}`}
        >
          <h2 className="text-sm font-medium tracking-widest text-primary uppercase">
            Work
          </h2>
          <h3 className="mt-2 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Selected Projects
          </h3>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <div
              key={project.name}
              className={`group flex flex-col gap-4 rounded-lg border border-border bg-card p-6 transition-all duration-200 ease-out hover:-translate-y-1 hover:bg-[#222] hover:shadow-[0_0_24px_rgba(143,56,72,0.4)] ${
                isInView ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <h4 className="font-heading text-lg font-semibold text-card-foreground">
                {project.name}
              </h4>
              <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-secondary px-2 py-1 text-xs text-secondary-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-3 pt-2">
                <a
                  href={project.github}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={`${project.name} GitHub`}
                >
                  <Github size={18} />
                </a>
                {project.live && (
                  <a
                    href={project.live}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                    aria-label={`${project.name} live site`}
                  >
                    <ExternalLink size={18} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
