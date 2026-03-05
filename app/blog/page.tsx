import Link from "next/link";
import { getAllPosts, formatDateDisplay } from "@/lib/blog";
import { SectionLabel } from "@/components/ui/section-label";
import { SectionHeading } from "@/components/ui/section-heading";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main>
      <section className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-16">
            <SectionLabel as="h2">Blog</SectionLabel>
            <SectionHeading className="mt-2">Writing</SectionHeading>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="flex flex-col gap-3 rounded-lg border border-border bg-card p-6 transition-all duration-200 ease-out hover:-translate-y-1 hover:bg-[#222] hover:shadow-[0_0_24px_rgba(143,56,72,0.4)]"
              >
                <h4 className="font-heading text-lg font-semibold text-card-foreground">
                  {post.title}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {formatDateDisplay(post.date)}
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
    </main>
  );
}
