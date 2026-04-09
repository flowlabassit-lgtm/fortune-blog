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
          <time className="text-sm text-muted">{post.date}</time>
          <span className="text-xs bg-gold/15 text-gold border border-gold/20 px-2.5 py-0.5 rounded-full">
            {post.lang.toUpperCase()}
          </span>
          {siblings.length > 0 && (
            <span className="flex gap-1 ml-auto">
              {siblings.map((s) => (
                <a
                  key={s.lang}
                  href={`/posts/${s.slug}`}
                  className="text-xs bg-surface-light text-muted border border-gold/10 px-2.5 py-0.5 rounded-full hover:border-gold/25 hover:text-gold transition-all"
                >
                  {s.lang.toUpperCase()}
                </a>
              ))}
            </span>
          )}
        </div>
        <h1 className="text-3xl font-[family-name:var(--font-cinzel)] font-bold text-lavender mb-4">{post.title}</h1>
        <p className="text-lg text-muted-light">{post.description}</p>
      </header>

      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="w-full rounded-2xl mb-8 border border-gold/10"
        />
      )}

      <div
        className="prose prose-lg prose-invert max-w-none prose-headings:text-lavender prose-headings:font-[family-name:var(--font-cinzel)] prose-a:text-gold prose-strong:text-lavender prose-p:text-muted-light"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />

      {/* CTA */}
      <div className="mt-12 p-8 bg-surface border border-gold/15 rounded-2xl text-center shadow-[0_0_30px_rgba(201,165,78,0.08)]">
        <p className="text-xl font-[family-name:var(--font-cinzel)] font-bold text-gold mb-2">
          ✦ 무료 멀티 포춘 분석
        </p>
        <p className="text-sm text-muted mb-5">5가지 고대 시스템 · 1개의 통합 리딩</p>
        <a
          href="https://www.multifortune.xyz"
          className="inline-block bg-gold/15 text-gold font-medium px-8 py-3 rounded-full border border-gold/30 hover:bg-gold/25 hover:border-gold/50 hover:shadow-[0_0_25px_rgba(201,165,78,0.25)] transition-all duration-300"
        >
          MultiFortune.xyz →
        </a>
      </div>
    </article>
  );
}
