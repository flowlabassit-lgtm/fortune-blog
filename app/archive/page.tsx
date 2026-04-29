import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { LangSection } from "../components/PostGrid";

export const metadata: Metadata = {
  title: "Archive — Multi Fortune Insights",
  description:
    "사주·타로·점성술·수비학·자미두수 모든 글의 전체 아카이브. 한국어·English·日本語·繁體中文 4개 언어로 정리되어 있습니다.",
  alternates: {
    canonical: "https://blog.multifortune.xyz/archive",
    languages: {
      ko: "https://blog.multifortune.xyz/ko",
      en: "https://blog.multifortune.xyz/en",
      ja: "https://blog.multifortune.xyz/ja",
      "zh-TW": "https://blog.multifortune.xyz/zh-TW",
      "x-default": "https://blog.multifortune.xyz/archive",
    },
  },
};

const LANG_ORDER = ["ko", "en", "ja", "zh-TW"];

export default function ArchivePage() {
  const all = getAllPosts();
  const byLang = LANG_ORDER.map((lang) => ({
    lang,
    posts: all.filter((p) => p.lang === lang),
  }));
  const total = all.length;

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <nav className="text-sm text-muted mb-4">
        <Link href="/" className="hover:text-gold">Home</Link>
        <span className="mx-2">/</span>
        <span>Archive</span>
      </nav>

      <header className="mb-12">
        <h1 className="text-4xl font-[family-name:var(--font-cinzel)] font-bold text-gold mb-4">
          Archive
        </h1>
        <p className="text-lg text-muted-light">
          전체 {total}개 글 — 4개 언어 통합 아카이브
        </p>
        <div className="flex gap-3 mt-4 flex-wrap">
          <Link href="/ko" className="text-sm text-gold-light hover:text-gold border border-gold/20 rounded-full px-3 py-1">한국어</Link>
          <Link href="/en" className="text-sm text-gold-light hover:text-gold border border-gold/20 rounded-full px-3 py-1">English</Link>
          <Link href="/ja" className="text-sm text-gold-light hover:text-gold border border-gold/20 rounded-full px-3 py-1">日本語</Link>
          <Link href="/zh-TW" className="text-sm text-gold-light hover:text-gold border border-gold/20 rounded-full px-3 py-1">繁體中文</Link>
        </div>
      </header>

      {byLang.map(({ lang, posts }) => (
        <LangSection key={lang} lang={lang} posts={posts} />
      ))}
    </div>
  );
}
