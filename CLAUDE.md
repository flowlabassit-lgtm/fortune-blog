@AGENTS.md

# fortune-blog (blog.multifortune.xyz)

Next.js 16 + React 19 + Tailwind static blog. Posts as markdown in `content/posts/`. Daily batch publishing pushes new posts via `@blog/core` `git-publisher` from `/mnt/f/blogautomation/blogs/fortune-astrology`.

## Discovery / SEO Architecture (2026-04-29 added)

**Problem solved**: SSR HTML originally exposed only 33 KO post links via the client-side `PostList` (`useState("ko")` filter applied during SSR). Googlebot couldn't find ~104 non-KO posts via internal links — sitemap-only discovery led to "found, not indexed" stuck state. Combined with a GSC sitemap fetch fail-list (4/11 stuck), 90+ days of publishing yielded 3 SERP impressions / 0 clicks across 4 properties.

**Backbone pages** (server components, all SSR):

| Route | Source | Internal links exposed |
|---|---|---|
| `/archive` | `getAllPosts()` | All 137+ posts (lang × date matrix) |
| `/ko` | `getPostsByLang("ko")` | 33+ KO posts |
| `/en` | `getPostsByLang("en")` | 36+ EN posts |
| `/ja` | `getPostsByLang("ja")` | 34+ JA posts |
| `/zh-TW` | `getPostsByLang("zh-TW")` | 33+ zh-TW posts |

**Auto-update guarantee**: Each new post that lands in `content/posts/` automatically appears in the relevant hub on next deploy — `getAllPosts()` reads filesystem at build time. No additional code needed when batch publish runs.

**Header navigation** (`app/layout.tsx`) links to all 5 hub pages — every page (including dynamic `/posts/[slug]`) gets 5 internal-link signals to the hub backbone.

**Sitemap** (`app/sitemap.ts`) includes the 5 hub URLs at priority 0.9, in addition to all post URLs at 0.8.

## Don't break

- `PostList.tsx` is client-only (intentional — preserves user lang preference via localStorage). Don't make hubs depend on it. Hubs use shared server components (`PostGrid`, `LangSection`, `LangHub`) under `app/components/`.
- The `zh-TW` route is a literal directory name (`app/zh-TW/`). Vercel/Next.js resolves the URL `/zh-TW` correctly. Don't lowercase it — `zh-tw` would break hreflang continuity with `getPostsByLang("zh-TW")`.
- Daily batch (from blogautomation) commits to this repo's `master`. If you push code changes, ensure the next batch can fast-forward — don't introduce conflicting changes to `content/posts/`.

## GSC properties (4 separate)

- `https://www.multifortune.xyz/` — main site (separate fortune-app repo at `/mnt/c/saju/fortune-app`, not this one)
- `https://blog.multifortune.xyz/` — this repo
- `https://aivibecodingclub.blogspot.com/` — Blogger, separate
- `https://blog.gapsense.uk/` — Pokemon TCG, separate

When the multifortune sitemap shows "couldn't fetch" stuck, register a new URL (e.g., `sitemap.xml?v=YYYYMMDD` or `feed.xml`) to bypass GSC's fail-list cache. Same fix used 2026-04-29 to unstick blog.multifortune.xyz after 18 days stuck.
