"use client";

import { useRef } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  DollarSign,
  Coffee,
  Dumbbell,
  ExternalLink,
  Flame,
  Github,
  Loader2,
  MessageCircle,
  Zap,
} from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { scrollRevealClass, type ScrollRevealDelay } from "@/lib/scroll-reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { SectionHeading } from "@/components/ui/section-heading";
import projectsRaw from "@/content/projects.json";

const ICON_MAP: Record<string, LucideIcon> = {
  DollarSign,
  Coffee,
  Dumbbell,
  Flame,
  Loader2,
  MessageCircle,
  Zap,
};

type ProjectItem = {
  name: string;
  description: string;
  tech: string[];
  github: string;
  live: string | null;
  icon: string;
};
const projects = projectsRaw as ProjectItem[];

type ProjectsProps = {
  limit?: number;
};

export function Projects({ limit }: ProjectsProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref);
  const displayProjects = limit != null ? projects.slice(0, limit) : projects;

  return (
    <section ref={ref} id="projects" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className={`${scrollRevealClass(isInView)} mb-16`}>
          <SectionLabel as="h2">Work</SectionLabel>
          <SectionHeading className="mt-2">Selected Projects</SectionHeading>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayProjects.map((project, i) => {
            const Icon = ICON_MAP[project.icon] ?? Loader2;
            return (
              <div
                key={project.name}
                className={`${scrollRevealClass(isInView, Math.min(i, 6) as ScrollRevealDelay)} group flex flex-col gap-4 rounded-lg border border-border bg-card p-6 transition-all duration-200 ease-out hover:-translate-y-1 hover:bg-[#222] hover:shadow-[0_0_24px_rgba(143,56,72,0.4)]`}
              >
                <div className="flex items-center gap-2">
                  <Icon
                    size={20}
                    className="shrink-0 text-primary/80"
                    aria-hidden
                  />
                  <h4 className="font-heading text-lg font-semibold text-card-foreground">
                    {project.name}
                  </h4>
                </div>
                <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tag) => (
                    <span
                      key={tag}
                      className={`rounded-md px-2 py-1 text-xs ${
                        tag === "In progress"
                          ? "bg-primary/20 text-primary border border-primary/30"
                          : "bg-secondary text-secondary-foreground"
                      }`}
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
            );
          })}
        </div>

        {limit != null && (
          <div
            className={`${scrollRevealClass(isInView, 6)} mt-10 text-center`}
          >
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/90"
            >
              View all work →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
