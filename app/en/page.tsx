import type { Metadata } from "next";
import { LangHub } from "../components/LangHub";

export const metadata: Metadata = {
  title: "English posts — Multi Fortune Insights",
  description:
    "Saju (Korean Four Pillars), tarot, Vedic astrology, numerology, and Zi Wei Dou Shu — pattern recognition across five ancient systems.",
  alternates: {
    canonical: "https://blog.multifortune.xyz/en",
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
  return <LangHub lang="en" />;
}
