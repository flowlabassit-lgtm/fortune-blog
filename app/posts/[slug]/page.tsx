import { getPostBySlug, getAllSlugs, getSiblingPosts } from "@/lib/posts";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const SITE_URL = "https://blog.multifortune.xyz";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const siblings = getSiblingPosts(slug);
  const alternates: Record<string, string> = {
    [post.lang]: `${SITE_URL}/posts/${slug}`,
  };
  for (const s of siblings) {
    alternates[s.lang] = `${SITE_URL}/posts/${s.slug}`;
  }

  return {
    title: `${post.title} — Multi Fortune Insights`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : [],
      locale: post.lang,
    },
    alternates: {
      languages: alternates,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const siblings = getSiblingPosts(slug);

  return (
    <article className="mx-auto max-w-3xl px-6 py-12" lang={post.lang}>
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <time className="text-sm text-gray-500">{post.date}</time>
          <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded">
            {post.lang.toUpperCase()}
          </span>
          {siblings.length > 0 && (
            <span className="flex gap-1 ml-auto">
              {siblings.map((s) => (
                <a
                  key={s.lang}
                  href={`/posts/${s.slug}`}
                  className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded hover:bg-purple-100 transition-colors"
                >
                  {s.lang.toUpperCase()}
                </a>
              ))}
            </span>
          )}
        </div>
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <p className="text-lg text-gray-600">{post.description}</p>
      </header>

      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="w-full rounded-lg mb-8"
        />
      )}

      <div
        className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-purple-600"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />

      <div className="mt-12 p-6 bg-gradient-to-r from-purple-50 to-amber-50 border border-purple-200 rounded-lg text-center">
        <p className="text-lg font-semibold mb-2">
          🔮 Get Your Free Multi-Fortune Analysis
        </p>
        <p className="text-sm text-gray-600 mb-4">5 Ancient Systems, 1 Unified Reading</p>
        <a
          href="https://www.multifortune.xyz"
          className="inline-block bg-purple-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
        >
          MultiFortune.xyz →
        </a>
      </div>
    </article>
  );
}
