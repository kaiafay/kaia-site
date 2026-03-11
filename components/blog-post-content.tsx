"use client";

import { useRef } from "react";
import Link from "next/link";
import { useInView } from "@/hooks/use-in-view";
import { scrollRevealClass } from "@/lib/scroll-reveal";
import { SectionHeading } from "@/components/ui/section-heading";

type Props = {
  title: string;
  date: string;
  children: React.ReactNode;
};

export function BlogPostContent({ title, date, children }: Props) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref);

  return (
    <article ref={ref} className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <div className={`${scrollRevealClass(isInView)} mb-10`}>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            ← Back to blog
          </Link>
        </div>

        <header className={`${scrollRevealClass(isInView, 1)} mb-10`}>
          <SectionHeading as="h1">{title}</SectionHeading>
          <p className="mt-2 text-sm text-muted-foreground">{date}</p>
        </header>

        <div className={`${scrollRevealClass(isInView, 2)} blog-post-content text-foreground`}>
          {children}
        </div>
      </div>
    </article>
  );
}
