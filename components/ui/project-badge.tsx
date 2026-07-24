import { cn } from "@/lib/utils";

export type ProjectKind = "client" | "personal" | "concept" | "product";

const KIND_LABELS: Record<ProjectKind, string> = {
  client: "Client site",
  personal: "Personal project",
  concept: "Concept",
  product: "Personal product",
};

/**
 * Honest classification badge for portfolio items. Every rendered entry gets
 * one — unlabeled work reads as an implied client claim.
 */
export function ProjectBadge({
  kind,
  className,
}: {
  kind: ProjectKind;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-border bg-secondary/70 px-2 py-0.5 text-xs font-medium uppercase tracking-wider text-muted-foreground",
        className,
      )}
    >
      {KIND_LABELS[kind]}
    </span>
  );
}
