import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Multi Fortune Insights — Saju, Tarot, Astrology & Numerology",
  description:
    "Explore fortune readings across 5 ancient systems: Saju (Korean Four Pillars), Tarot, Western & Vedic Astrology, Numerology, and Zi Wei Dou Shu. Multilingual insights in Korean, English, Japanese, and Chinese.",
  metadataBase: new URL("https://blog.multifortune.xyz"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-50 text-gray-900">
        <header className="border-b border-purple-900/20 bg-gradient-to-r from-slate-900 to-purple-950">
          <div className="mx-auto max-w-4xl px-6 py-4 flex items-center justify-between">
            <a href="/" className="text-xl font-bold text-amber-400">
              🔮 Multi Fortune Insights
            </a>
            <a
              href="https://www.multifortune.xyz"
              className="text-sm font-medium text-purple-300 hover:text-amber-400 transition-colors"
            >
              MultiFortune.xyz
            </a>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-purple-900/20 bg-gradient-to-r from-slate-900 to-purple-950 mt-16">
          <div className="mx-auto max-w-4xl px-6 py-8 text-center text-sm text-purple-300">
            <p>
              🔮 Get Your Free Multi-Fortune Analysis — 5 Ancient Systems, 1 Unified Reading →{" "}
              <a href="https://www.multifortune.xyz" className="text-amber-400 hover:underline">
                MultiFortune.xyz
              </a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
