import { cache } from "react";
import { demoArticles } from "@/lib/demo-content";
import type { Article, ArticleSummary } from "@/types/content";
import { sanityClient } from "./client";
import { articleBySlugQuery, articlesQuery } from "./queries";

export const getArticles = cache(async (): Promise<ArticleSummary[]> => {
  if (!sanityClient) return demoArticles;
  try {
    return await sanityClient.fetch<ArticleSummary[]>(articlesQuery, {}, { next: { revalidate: 3600, tags: ["articles"] } });
  } catch (error) {
    console.error("Sanity article fetch failed; rendering demo content.", error);
    return demoArticles;
  }
});

export const getArticleBySlug = cache(async (slug: string): Promise<Article | null> => {
  if (!sanityClient) return demoArticles.find((article) => article.slug === slug) || null;
  try {
    return await sanityClient.fetch<Article | null>(articleBySlugQuery, { slug }, { next: { revalidate: 3600, tags: ["articles", `article:${slug}`] } });
  } catch (error) {
    console.error(`Sanity article fetch failed for ${slug}; rendering demo content.`, error);
    return demoArticles.find((article) => article.slug === slug) || null;
  }
});
