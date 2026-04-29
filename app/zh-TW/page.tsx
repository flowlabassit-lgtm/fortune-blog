import type { Metadata } from "next";
import { LangHub } from "../components/LangHub";

export const metadata: Metadata = {
  title: "繁體中文文章 — Multi Fortune Insights",
  description:
    "四柱推命・塔羅牌・占星術・數字學・紫微斗數 — 從五個古老系統的交會點讀出你的命運模式。",
  alternates: {
    canonical: "https://blog.multifortune.xyz/zh-TW",
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
  return <LangHub lang="zh-TW" />;
}
