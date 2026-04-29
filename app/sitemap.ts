import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

const SITE_URL = "https://blog.multifortune.xyz";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const postEntries = posts
    .filter((post) => post.date)
    .map((post) => ({
      url: `${SITE_URL}/posts/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  const hubEntries: MetadataRoute.Sitemap = [
    "/archive",
    "/ko",
    "/en",
    "/ja",
    "/zh-TW",
  ].map((p) => ({
    url: `${SITE_URL}${p}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...hubEntries,
    ...postEntries,
  ];
}
