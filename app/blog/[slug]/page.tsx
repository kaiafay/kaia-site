import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { getPostSlugs, getPostBySlug, formatDateDisplay } from "@/lib/blog";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const slugs = getPostSlugs();
  if (!slugs.includes(slug)) return { title: "Post | Kaia" };
  const { meta } = getPostBySlug(slug);
  return { title: `${meta.title} | Kaia`, description: meta.excerpt };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const slugs = getPostSlugs();
  if (!slugs.includes(slug)) notFound();

  const { meta, content } = getPostBySlug(slug);
  const { content: MdxContent } = await compileMDX({ source: content });

  return (
    <main>
      <article className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              ← Back to blog
            </Link>
          </div>

          <header className="mb-10">
            <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              {meta.title}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
            {formatDateDisplay(meta.date)}
          </p>
          </header>

          <div className="blog-post-content text-foreground">
            {MdxContent}
          </div>
        </div>
      </article>
    </main>
  );
}

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}
