import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { PostList } from "./components/PostList";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://blog.multifortune.xyz/",
    languages: {
      ko: "https://blog.multifortune.xyz/ko",
      en: "https://blog.multifortune.xyz/en",
      ja: "https://blog.multifortune.xyz/ja",
      "zh-TW": "https://blog.multifortune.xyz/zh-TW",
      "x-default": "https://blog.multifortune.xyz/",
    },
  },
};

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-[family-name:var(--font-cinzel)] font-bold text-gold mb-4">
          Fortune Insights
        </h1>
        <p className="text-lg text-muted-light max-w-2xl mx-auto">
          사주 · 타로 · 점성술 · 수비학 · 자미두수 — 5가지 고대 시스템이 수렴하는 지점에서 당신의 운명을 읽습니다.
        </p>
      </section>

      <PostList posts={posts} />
    </div>
  );
}
