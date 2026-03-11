import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { getPostSlugs, getPostBySlug, formatDateDisplay } from "@/lib/blog";
import { BlogPostContent } from "@/components/blog-post-content";

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
      <BlogPostContent title={meta.title} date={formatDateDisplay(meta.date)}>
        {MdxContent}
      </BlogPostContent>
    </main>
  );
}

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}
