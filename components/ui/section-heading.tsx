import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3";
  className?: string;
}

export function SectionHeading({
  children,
  as: Tag = "h3",
  className,
}: SectionHeadingProps) {
  return (
    <Tag
      className={cn(
        "font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance",
        className
      )}
    >
      {children}
    </Tag>
  );
}
