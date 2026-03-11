import { getAllPosts, formatDateDisplay } from "@/lib/blog";
import { BlogList } from "@/components/blog-list";

export default function BlogPage() {
  const posts = getAllPosts().map((post) => ({
    ...post,
    dateDisplay: formatDateDisplay(post.date),
  }));

  return (
    <main>
      <BlogList posts={posts} />
    </main>
  );
}
