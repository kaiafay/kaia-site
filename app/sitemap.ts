import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.kaiafay.com";
  const posts = getAllPosts().map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    priority: 0.5,
  }));

  return [
    { url: base, priority: 1 },
    { url: `${base}/about`, priority: 0.8 },
    { url: `${base}/work`, priority: 0.8 },
    { url: `${base}/work-with-me`, priority: 0.8 },
    { url: `${base}/blog`, priority: 0.6 },
    { url: `${base}/uses`, priority: 0.3 },
    ...posts,
  ];
}
