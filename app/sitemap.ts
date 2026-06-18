import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.kaiafay.com";
  const lastModified = new Date("2026-06-17");
  const posts = getAllPosts().map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    priority: 0.5,
  }));

  return [
    { url: base, lastModified, priority: 1 },
    { url: `${base}/about`, lastModified, priority: 0.8 },
    { url: `${base}/work`, lastModified, priority: 0.8 },
    { url: `${base}/work-with-me`, lastModified, priority: 0.8 },
    { url: `${base}/blog`, lastModified, priority: 0.6 },
    { url: `${base}/uses`, lastModified, priority: 0.3 },
    ...posts,
  ];
}
