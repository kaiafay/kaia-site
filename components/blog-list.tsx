"use client";

import { useRef } from "react";
import Link from "next/link";
import { Clock } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { scrollRevealClass, type ScrollRevealDelay } from "@/lib/scroll-reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { SectionHeading } from "@/components/ui/section-heading";

type PostDisplay = {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  dateDisplay: string;
  readTimeMinutes: number;
};

export function BlogList({ posts }: { posts: PostDisplay[] }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref);

  return (
    <section ref={ref} className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className={`${scrollRevealClass(isInView)} mb-16`}>
          <SectionLabel as="h2">Blog</SectionLabel>
          <SectionHeading className="mt-2">Writing</SectionHeading>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={`${scrollRevealClass(isInView, Math.min(i, 6) as ScrollRevealDelay)} flex flex-col gap-3 rounded-lg border border-border bg-card p-6 transition-all duration-200 ease-out hover:-translate-y-1 hover:bg-[#222] hover:shadow-[0_0_24px_rgba(143,56,72,0.4)] active:scale-[0.99] active:opacity-90`}
            >
              <h4 className="font-heading text-lg font-semibold text-card-foreground">
                {post.title}
              </h4>
              <p className="flex items-center gap-1 text-xs text-muted-foreground flex-wrap">
                <span>{post.dateDisplay}</span>
                <span>·</span>
                <Clock className="size-3 shrink-0" />
                <span>{post.readTimeMinutes} min </span>
              </p>
              <p className="flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                {post.excerpt}
              </p>
              <span className="text-sm font-medium text-primary">
                Read more →
              </span>
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <p className="text-muted-foreground">No posts yet.</p>
        )}
      </div>
    </section>
  );
}
