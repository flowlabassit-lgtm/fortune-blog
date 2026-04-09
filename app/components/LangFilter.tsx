"use client";

import { useEffect, useState } from "react";

const SUPPORTED_LANGS = ["ko", "en", "ja", "zh-TW"] as const;
const LANG_LABELS: Record<string, string> = {
  ko: "🇰🇷 한국어",
  en: "🇺🇸 English",
  ja: "🇯🇵 日本語",
  "zh-TW": "🇹🇼 繁體中文",
};

export function useLang() {
  const [lang, setLang] = useState("ko");

  useEffect(() => {
    const saved = localStorage.getItem("fortune-blog-lang");
    if (saved && SUPPORTED_LANGS.includes(saved as any)) {
      setLang(saved);
      return;
    }
    const bl = navigator.language.toLowerCase();
    if (bl.startsWith("ko")) setLang("ko");
    else if (bl.startsWith("ja")) setLang("ja");
    else if (bl.startsWith("zh")) setLang("zh-TW");
    else setLang("en");
  }, []);

  const changeLang = (l: string) => {
    setLang(l);
    localStorage.setItem("fortune-blog-lang", l);
  };

  return { lang, changeLang };
}

export function LangSelector({
  lang,
  onChange,
}: {
  lang: string;
  onChange: (l: string) => void;
}) {
  return (
    <div className="flex gap-1.5">
      {SUPPORTED_LANGS.map((l) => (
        <button
          key={l}
          onClick={() => onChange(l)}
          className={`px-3 py-1.5 text-xs rounded-full transition-all duration-200 ${
            lang === l
              ? "bg-gold/20 text-gold border border-gold/40 shadow-[0_0_12px_rgba(201,165,78,0.2)]"
              : "bg-surface-light text-muted border border-gold/10 hover:border-gold/25 hover:text-muted-light"
          }`}
        >
          {LANG_LABELS[l]}
        </button>
      ))}
    </div>
  );
}
