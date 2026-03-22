import type { ReactNode } from "react";
import Image from "next/image";

type BlogImageTextBlockProps = {
  image: string;
  imageAlt: string;
  align: "left" | "right";
  heading: string;
  subheading?: string;
  label?: string;
  children?: ReactNode;
  headingLevel?: 2 | 3 | 4;
};

function BlockHeading({
  level,
  className,
  children,
}: {
  level: 2 | 3 | 4;
  className?: string;
  children: ReactNode;
}) {
  switch (level) {
    case 2:
      return <h2 className={className}>{children}</h2>;
    case 3:
      return <h3 className={className}>{children}</h3>;
    case 4:
      return <h4 className={className}>{children}</h4>;
  }
}

export function BlogImageTextBlock({
  image,
  imageAlt,
  align,
  heading,
  subheading,
  label,
  children,
  headingLevel = 3,
}: BlogImageTextBlockProps) {
  const isRight = align === "right";

  return (
    <section
      className={`my-8 flex flex-col gap-6 md:items-start md:gap-8 ${isRight ? "md:flex-row-reverse" : "md:flex-row"}`}
    >
      <div className="relative mx-auto w-full max-w-[176px] shrink-0 md:mx-0">
        <Image
          src={image}
          alt={imageAlt}
          width={176}
          height={264}
          sizes="(min-width: 768px) 176px, 100vw"
          className="h-auto w-full rounded-lg object-contain"
        />
      </div>

      <div className="min-w-0 flex-1 text-center md:text-left">
        {label ? (
          <p className="text-xs italic text-muted-foreground">{label}</p>
        ) : null}
        <BlockHeading
          level={headingLevel}
          className={`font-heading font-semibold text-card-foreground ${label ? "mt-1" : ""}`}
        >
          {heading}
        </BlockHeading>
        {subheading ? (
          <p className="mt-1 text-sm text-muted-foreground">{subheading}</p>
        ) : null}
        {children ? (
          <div className="mt-3 text-sm leading-relaxed">{children}</div>
        ) : null}
      </div>
    </section>
  );
}
