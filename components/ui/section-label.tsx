import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  as?: "p" | "h2" | "h3" | "h4";
  className?: string;
}

export function SectionLabel({
  children,
  as: Tag = "p",
  className,
}: SectionLabelProps) {
  return (
    <Tag
      className={cn(
        "text-sm font-medium tracking-widest text-primary uppercase",
        className
      )}
    >
      {children}
    </Tag>
  );
}
