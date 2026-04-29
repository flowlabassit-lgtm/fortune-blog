import type { Metadata } from "next";
import { LangHub } from "../components/LangHub";

export const metadata: Metadata = {
  title: "한국어 글 — Multi Fortune Insights",
  description:
    "사주·타로·점성술·수비학·자미두수, 다섯 시스템의 수렴점에서 운명을 읽는 한국어 글 전체.",
  alternates: {
    canonical: "https://blog.multifortune.xyz/ko",
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
  return <LangHub lang="ko" />;
}
