import { getAllPosts } from '@/lib/posts';

const SITE_URL = 'https://blog.multifortune.xyz';
const MAIN_URL = 'https://www.multifortune.xyz';

export const dynamic = 'force-static';

function escapeCdata(value: string): string {
  return value.replace(/]]>/g, ']]]]><![CDATA[>');
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const posts = getAllPosts().slice(0, 50);

  const items = posts
    .filter((p) => p.date && p.title)
    .map((p) => {
      const url = `${SITE_URL}/posts/${escapeXml(p.slug)}`;
      const pubDate = new Date(p.date).toUTCString();
      const desc = p.description
        ? `<description><![CDATA[${escapeCdata(p.description)}]]></description>`
        : '';
      const lang = p.lang ? `<dc:language>${escapeXml(p.lang)}</dc:language>` : '';
      return `
    <item>
      <title><![CDATA[${escapeCdata(p.title)}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      ${desc}
      ${lang}
    </item>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Multi Fortune Blog</title>
    <link>${SITE_URL}</link>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Fortune analysis insights — Saju, Tarot, Numerology, Vedic Astrology, Zi Wei Dou Shu</description>
    <language>en</language>
    <copyright>© ${new Date().getFullYear()} Multi Fortune</copyright>
    <managingEditor>flowlabassit@gmail.com (Multi Fortune)</managingEditor>
    <webMaster>flowlabassit@gmail.com (Multi Fortune)</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <generator>Multi Fortune Blog — ${MAIN_URL}</generator>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
