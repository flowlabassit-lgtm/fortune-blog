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
        <p className="text-sm text-gray-500">
          {filtered.length} post{filtered.length !== 1 ? "s" : ""}
        </p>
        <LangSelector lang={lang} onChange={changeLang} />
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-500">
          이 언어로 작성된 글이 아직 없습니다. 다른 언어를 선택해보세요.
        </p>
      ) : (
        <div className="grid gap-8">
          {filtered.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-lg shadow-sm border border-purple-100 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-3">
                <time className="text-sm text-gray-500">{post.date}</time>
                {post.tags
                  .filter((t) => !t.startsWith("lang:"))
                  .slice(0, 3)
                  .map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
              </div>
              <Link href={`/posts/${post.slug}`}>
                <h2 className="text-xl font-semibold hover:text-purple-600 transition-colors mb-2">
                  {post.title}
                </h2>
              </Link>
              <p className="text-gray-600">{post.description}</p>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
