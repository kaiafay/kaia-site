import fs from "fs";
import path from "path";
import { format, parseISO } from "date-fns";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content/blog");

export type PostMeta = {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
};

export function getPostSlugs(): string[] {
  if (!fs.existsSync(contentDir)) return [];
  return fs
    .readdirSync(contentDir)
    .filter((f) => path.extname(f) === ".mdx")
    .map((f) => path.basename(f, ".mdx"));
}

function formatDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === "string") return value;
  return "";
}

export function getPostBySlug(slug: string): { meta: PostMeta; content: string } {
  const fullPath = path.join(contentDir, `${slug}.mdx`);
  const raw = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(raw);
  const meta = {
    title: String(data.title ?? ""),
    date: formatDate(data.date),
    excerpt: String(data.excerpt ?? ""),
    slug: String(data.slug ?? slug),
  };
  return { meta, content };
}

export function getAllPosts(): PostMeta[] {
  const slugs = getPostSlugs();
  return slugs
    .map((slug) => getPostBySlug(slug).meta)
    .sort((a, b) => (b.date > a.date ? 1 : -1));
}

/** Format a YYYY-MM-DD date string for display, e.g. "March 4, 2026". */
export function formatDateDisplay(dateStr: string): string {
  if (!dateStr) return "";
  try {
    return format(parseISO(dateStr), "MMMM d, yyyy");
  } catch {
    return dateStr;
  }
}
