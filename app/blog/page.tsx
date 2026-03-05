import Link from "next/link";
import { getAllPosts, formatDateDisplay } from "@/lib/blog";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main>
      <section className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-16">
            <h2 className="text-sm font-medium tracking-widest text-primary uppercase">
              Blog
            </h2>
            <h3 className="mt-2 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              Writing
            </h3>
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
