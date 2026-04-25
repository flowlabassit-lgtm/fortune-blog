"use client";

import Link from "next/link";
import { useLang, LangSelector } from "./LangFilter";
import type { PostMeta } from "@/lib/posts";

export function PostList({ posts }: { posts: PostMeta[] }) {
  const { lang, changeLang } = useLang();

  const filtered = posts.filter((p) => p.lang === lang);

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <p className="text-sm text-muted">
          {filtered.length} post{filtered.length !== 1 ? "s" : ""}
        </p>
        <LangSelector lang={lang} onChange={changeLang} />
      </div>

      {filtered.length === 0 ? (
        <p className="text-muted">
          이 언어로 작성된 글이 아직 없습니다. 다른 언어를 선택해보세요.
        </p>
      ) : (
        <div className="grid gap-6">
          {filtered.map((post) => (
            <article
              key={post.slug}
              className="bg-surface rounded-2xl border border-gold/8 p-6 hover:border-gold/20 hover:shadow-[0_0_25px_rgba(201,165,78,0.08)] transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <time className="text-xs text-muted">{post.date}</time>
                {post.tags
                  .filter((t) => !t.startsWith("lang:"))
                  .slice(0, 3)
                  .map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gold/8 text-gold-light/80 px-2 py-0.5 rounded-full border border-gold/10"
                    >
                      {tag}
                    </span>
                  ))}
              </div>
              <Link href={`/posts/${post.slug}`} className="block">
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-lg mb-4 border border-gold/10"
                    loading="lazy"
                  />
                )}
                <h2 className="text-lg font-semibold text-lavender hover:text-gold transition-colors mb-2">
                  {post.title}
                </h2>
              </Link>
              <p className="text-sm text-muted-light line-clamp-2">{post.description}</p>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
