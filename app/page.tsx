import { getAllPosts } from "@/lib/posts";
import { PostList } from "./components/PostList";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Multi Fortune Insights</h1>
        <p className="text-lg text-gray-600">
          사주, 타로, 점성술, 수비학, 자미두수 — 5가지 고대 운명 해석 시스템으로 당신의 인생을 읽습니다.
        </p>
      </section>

      <PostList posts={posts} />
    </div>
  );
}
