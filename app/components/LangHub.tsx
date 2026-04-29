import Link from "next/link";
import { getPostsByLang } from "@/lib/posts";
import { PostGrid } from "./PostGrid";

const LANG_LABELS: Record<string, string> = {
  ko: "🇰🇷 한국어",
  en: "🇺🇸 English",
  ja: "🇯🇵 日本語",
  "zh-TW": "🇹🇼 繁體中文",
};

const LANG_HEADLINES: Record<string, string> = {
  ko: "사주·타로·점성술·수비학·자미두수 — 한국어 글 전체",
  en: "Saju, tarot, astrology, numerology, and Zi Wei Dou Shu — all English posts",
  ja: "四柱推命・タロット・占星術・数秘術・紫微斗数 — 日本語記事一覧",
  "zh-TW": "四柱推命・塔羅牌・占星術・數字學・紫微斗數 — 繁體中文文章",
};

export function LangHub({ lang }: { lang: string }) {
  const posts = getPostsByLang(lang);
  const otherLangs = (["ko", "en", "ja", "zh-TW"] as const).filter((l) => l !== lang);

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <nav className="text-sm text-muted mb-4">
        <Link href="/" className="hover:text-gold">Home</Link>
        <span className="mx-2">/</span>
        <span>{LANG_LABELS[lang] ?? lang}</span>
      </nav>

      <header className="mb-10">
        <h1 className="text-4xl font-[family-name:var(--font-cinzel)] font-bold text-gold mb-3">
          {LANG_LABELS[lang] ?? lang}
        </h1>
        <p className="text-lg text-muted-light mb-4">
          {LANG_HEADLINES[lang] ?? ""}
        </p>
        <div className="flex gap-2 flex-wrap text-sm">
          <span className="text-muted">전체 {posts.length}개 글</span>
          <span className="text-muted">·</span>
          <Link href="/archive" className="text-gold-light hover:text-gold">전체 아카이브</Link>
          {otherLangs.map((l) => (
            <span key={l}>
              <span className="text-muted">·</span>{" "}
              <Link href={`/${l}`} className="text-gold-light hover:text-gold ml-1">
                {LANG_LABELS[l]}
              </Link>
            </span>
          ))}
        </div>
      </header>

      <PostGrid posts={posts} />
    </div>
  );
}
