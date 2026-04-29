import type { Metadata } from "next";
import { LangHub } from "../components/LangHub";

export const metadata: Metadata = {
  title: "日本語記事 — Multi Fortune Insights",
  description:
    "四柱推命・タロット・西洋占星術・数秘術・紫微斗数 — 五つの古代システムが交わる地点からあなたのパターンを読み解きます。",
  alternates: {
    canonical: "https://blog.multifortune.xyz/ja",
    languages: {
      ko: "https://blog.multifortune.xyz/ko",
      en: "https://blog.multifortune.xyz/en",
      ja: "https://blog.multifortune.xyz/ja",
      "zh-TW": "https://blog.multifortune.xyz/zh-TW",
      "x-default": "https://blog.multifortune.xyz/ko",
    },
  },
};

export default function Page() {
  return <LangHub lang="ja" />;
}
