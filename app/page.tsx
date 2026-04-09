import { getAllPosts } from "@/lib/posts";
import { PostList } from "./components/PostList";

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
