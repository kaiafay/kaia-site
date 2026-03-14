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
  pinned?: boolean;
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
    pinned: Boolean(data.pinned),
  };
  return { meta, content };
}

/** Estimated read time in minutes (~200 wpm). */
export function getReadTimeMinutes(content: string): number {
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

export type PostWithReadTime = PostMeta & { readTimeMinutes: number };

export function getAllPosts(): PostWithReadTime[] {
  const slugs = getPostSlugs();
  return slugs
    .map((slug) => {
      const { meta, content } = getPostBySlug(slug);
      return { ...meta, readTimeMinutes: getReadTimeMinutes(content) };
    })
    .sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return b.date > a.date ? 1 : -1;
    });
}

/**
 * Map from request slug (URL) to file slug (filename without .mdx).
 * Includes both frontmatter slugs and file slugs so /blog/introduction and
 * /blog/2026-03-10-introduction resolve to the same post when applicable.
 */
export function getSlugToFileSlugMap(): Map<string, string> {
  const map = new Map<string, string>();
  for (const fileSlug of getPostSlugs()) {
    const { meta } = getPostBySlug(fileSlug);
    map.set(meta.slug, fileSlug);
    if (meta.slug !== fileSlug) map.set(fileSlug, fileSlug);
  }
  return map;
}

/** Resolve a URL slug to the file slug used on disk. Returns null if not found. */
export function resolveRequestSlugToFileSlug(requestSlug: string): string | null {
  return getSlugToFileSlugMap().get(requestSlug) ?? null;
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
