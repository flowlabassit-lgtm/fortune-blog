import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Multi Fortune Insights — Saju, Tarot, Astrology & Numerology",
  description:
    "반복되는 커리어·관계·타이밍 패턴을 다섯 독립 시스템의 수렴점으로 분석합니다. Saju, Tarot, Numerology, Vedic Astrology & Zi Wei Dou Shu.",
  metadataBase: new URL("https://blog.multifortune.xyz"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${inter.variable} ${cinzel.variable} h-full antialiased dark`}>
      <head>
        <link rel="alternate" type="application/rss+xml" title="Multi Fortune Blog" href="https://blog.multifortune.xyz/feed.xml" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-32YS6TDP60" />
        <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-32YS6TDP60');` }} />
      </head>
      <body className="min-h-full flex flex-col bg-deep text-lavender font-[family-name:var(--font-inter)]">
        {/* Header */}
        <header className="border-b border-gold/10 bg-surface backdrop-blur-xl">
          <div className="mx-auto max-w-4xl px-6 py-4 flex flex-wrap items-center justify-between gap-3">
            <a href="/" className="flex items-center gap-2">
              <span className="text-xl font-[family-name:var(--font-cinzel)] font-bold text-gold">
                ✦ Multi Fortune
              </span>
            </a>
            <nav className="flex items-center gap-3 text-sm text-muted-light flex-wrap">
              <a href="/ko" className="hover:text-gold transition-colors">한국어</a>
              <a href="/en" className="hover:text-gold transition-colors">English</a>
              <a href="/ja" className="hover:text-gold transition-colors">日本語</a>
              <a href="/zh-TW" className="hover:text-gold transition-colors">繁體中文</a>
              <a href="/archive" className="hover:text-gold transition-colors">Archive</a>
              <a
                href="https://www.multifortune.xyz"
                className="font-medium text-gold-light hover:text-gold transition-colors border-l border-gold/15 pl-3 ml-1"
              >
                무료 운세 분석 →
              </a>
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="border-t border-gold/10 bg-surface mt-16">
          <div className="mx-auto max-w-4xl px-6 py-8 text-center">
            <p className="text-muted text-sm mb-3">
              다섯 고대 시스템의 수렴점에서 당신의 패턴을 읽습니다
            </p>
            <a
              href="https://www.multifortune.xyz"
              className="inline-block text-gold hover:text-gold-light transition-colors text-sm font-medium border border-gold/20 rounded-full px-5 py-2 hover:border-gold/40 hover:shadow-[0_0_20px_rgba(201,165,78,0.15)]"
            >
              🔮 무료 운세 분석 받기 — MultiFortune.xyz
            </a>
            <p className="text-muted/50 text-xs mt-4">
              © 2026 Multi Fortune. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
