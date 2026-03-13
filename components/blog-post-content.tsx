"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useInView } from "@/hooks/use-in-view";
import { scrollRevealClass } from "@/lib/scroll-reveal";
import { SectionHeading } from "@/components/ui/section-heading";

type Props = {
  title: string;
  date: string;
  readTimeMinutes?: number;
  children: React.ReactNode;
};

function getScrollProgress(): number {
  const scrollY = window.scrollY;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (scrollHeight <= 0) return 0;
  return Math.min(100, (scrollY / scrollHeight) * 100);
}

export function BlogPostContent({ title, date, readTimeMinutes, children }: Props) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => setProgress(getScrollProgress());
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <>
      <div
        className="fixed left-0 right-0 top-0 z-50 h-[2px] bg-muted/30"
        aria-hidden
      >
        <div
          className="h-full bg-primary transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
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
            <p className="mt-2 text-sm text-muted-foreground">
              {date}
              {readTimeMinutes != null ? ` · ${readTimeMinutes} min read` : ""}
            </p>
          </header>

          <div className={`${scrollRevealClass(isInView, 2)} blog-post-content text-foreground`}>
            {children}
          </div>
        </div>
      </article>
    </>
  );
}
