import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

const LANG_LABELS: Record<string, string> = {
  ko: "🇰🇷 한국어",
  en: "🇺🇸 English",
  ja: "🇯🇵 日本語",
  "zh-TW": "🇹🇼 繁體中文",
};

export function PostGrid({ posts }: { posts: PostMeta[] }) {
  if (posts.length === 0) {
    return <p className="text-muted">No posts yet.</p>;
  }
  return (
    <ul className="grid gap-3">
      {posts.map((post) => (
        <li key={post.slug} className="border-b border-gold/8 pb-3">
          <Link
            href={`/posts/${post.slug}`}
            className="block group"
          >
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-base text-lavender group-hover:text-gold transition-colors">
                {post.title || post.slug}
              </h3>
              <time className="text-xs text-muted shrink-0">{post.date}</time>
            </div>
            {post.description && (
              <p className="text-sm text-muted-light line-clamp-2 mt-1">
                {post.description}
              </p>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function LangSection({
  lang,
  posts,
}: {
  lang: string;
  posts: PostMeta[];
}) {
  return (
    <section className="mb-10">
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="text-xl font-semibold text-gold-light">
          {LANG_LABELS[lang] ?? lang}
        </h2>
        <span className="text-xs text-muted">
          {posts.length} post{posts.length !== 1 ? "s" : ""}
        </span>
      </div>
      <PostGrid posts={posts} />
    </section>
  );
}
