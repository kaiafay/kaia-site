"use client";

import { useRef } from "react";
import Link from "next/link";
import { Clock, Pin } from "lucide-react";
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
  pinned?: boolean;
};

export function BlogList({ posts }: { posts: PostDisplay[] }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref);

  return (
    <section ref={ref} className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className={`${scrollRevealClass(isInView)} mb-16`}>
          <SectionLabel>Blog</SectionLabel>
          <SectionHeading as="h1" className="mt-2">Writing</SectionHeading>
        </div>

        <div className="divide-y divide-border">
          {posts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={`${scrollRevealClass(isInView, Math.min(i, 6) as ScrollRevealDelay)} group flex flex-col gap-3 py-8 transition-colors duration-200 active:scale-[0.98]`}
            >
              <p className="flex items-center gap-1 text-xs text-muted-foreground flex-wrap">
                <span>{post.dateDisplay}</span>
                <span>·</span>
                <Clock className="size-3 shrink-0" />
                <span>{post.readTimeMinutes} min</span>
                {post.pinned && <Pin className="size-3 shrink-0 rotate-45 fill-current ml-auto" role="img" aria-label="Pinned post" />}
              </p>
              <h4 className="font-heading text-xl font-semibold text-foreground">
                {post.title}
              </h4>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {post.excerpt}
              </p>
              <span className="text-sm font-medium text-primary transition-colors duration-200 group-hover:brightness-125">
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
