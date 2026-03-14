import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import {
  getPostBySlug,
  formatDateDisplay,
  getReadTimeMinutes,
  resolveRequestSlugToFileSlug,
  getAllPosts,
} from "@/lib/blog";
import { BlogPostContent } from "@/components/blog-post-content";
import { Divider } from "@/components/divider";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const fileSlug = resolveRequestSlugToFileSlug(slug);
  if (!fileSlug) return { title: "Post" };
  const { meta } = getPostBySlug(fileSlug);
  return {
    title: meta.title,
    description: meta.excerpt,
    openGraph: {
      title: meta.title,
      description: meta.excerpt,
      type: "article",
      publishedTime: meta.date,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const fileSlug = resolveRequestSlugToFileSlug(slug);
  if (!fileSlug) notFound();

  const { meta, content } = getPostBySlug(fileSlug);
  const readTimeMinutes = getReadTimeMinutes(content);

  const { content: MdxContent } = await compileMDX({
    source: content,
    components: { Divider },
  });

  return (
    <main>
      <BlogPostContent
        title={meta.title}
        date={formatDateDisplay(meta.date)}
        readTimeMinutes={readTimeMinutes}
      >
        {MdxContent}
      </BlogPostContent>
    </main>
  );
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}
