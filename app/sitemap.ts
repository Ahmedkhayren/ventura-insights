import type { MetadataRoute } from "next";
import { getArticles } from "@/lib/sanity/fetch";
import { siteConfig } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getArticles();
  const pages = ["", "/insights", "/about", "/services", "/contact"].map((path) => ({ url: `${siteConfig.url}${path}`, lastModified: new Date(), changeFrequency: path === "/insights" ? "weekly" as const : "monthly" as const, priority: path === "" ? 1 : .7 }));
  return [...pages, ...articles.map((article) => ({ url: `${siteConfig.url}/insights/${article.slug}`, lastModified: new Date(article.updatedAt || article.publishedAt), changeFrequency: "monthly" as const, priority: .8 }))];
}
