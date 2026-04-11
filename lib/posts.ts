import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "content/posts");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  image?: string;
  lang: string;
  tags: string[];
}

export interface Post extends PostMeta {
  contentHtml: string;
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) return [];
  const files = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".md"));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title || "",
      date: data.date || "",
      description: data.description || "",
      image: data.image || undefined,
      lang: data.lang || "ko",
      tags: data.tags || [],
    };
  });

  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPostsByLang(lang: string): PostMeta[] {
  return getAllPosts().filter((p) => p.lang === lang);
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs
    .readdirSync(postsDirectory)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

/**
 * Find sibling posts (other language versions of the same topic).
 * Uses frontmatter `lang` field instead of parsing slug — safe for multi-char
 * lang codes like zh-TW where the hyphen makes slug parsing ambiguous.
 * Siblings are identified by sharing the same date prefix (YYYY-MM-DD).
 */
export function getSiblingPosts(slug: string): { lang: string; slug: string }[] {
  const dateMatch = slug.match(/^(\d{4}-\d{2}-\d{2})/);
  if (!dateMatch) return [];
  const date = dateMatch[1];
  const all = getAllPosts();
  return all
    .filter((p) => p.slug.startsWith(date) && p.slug !== slug)
    .map((p) => ({ lang: p.lang, slug: p.slug }));
}

export function getRelatedPosts(slug: string, limit = 3): PostMeta[] {
  const all = getAllPosts();
  const current = all.find((p) => p.slug === slug);
  if (!current || current.tags.length === 0) return [];

  const datePrefix = slug.match(/^(\d{4}-\d{2}-\d{2})/)?.[1];
  const tagSet = new Set(current.tags.map((t) => t.toLowerCase()));

  return all
    .filter((p) => p.slug !== slug && p.lang === current.lang && (!datePrefix || !p.slug.startsWith(datePrefix)))
    .map((p) => {
      const shared = p.tags.filter((t) => tagSet.has(t.toLowerCase())).length;
      return { post: p, shared };
    })
    .filter((x) => x.shared > 0)
    .sort((a, b) => b.shared - a.shared || (b.post.date > a.post.date ? 1 : -1))
    .slice(0, limit)
    .map((x) => x.post);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processed = await remark().use(html, { sanitize: false }).process(content);
  const contentHtml = processed.toString();

  return {
    slug,
    title: data.title || "",
    date: data.date || "",
    description: data.description || "",
    image: data.image || undefined,
    lang: data.lang || "ko",
    tags: data.tags || [],
    contentHtml,
  };
}
