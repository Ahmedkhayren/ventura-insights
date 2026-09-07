import type { Article } from "@/types/content";
import { imageUrl } from "@/lib/sanity/image";
import { siteConfig } from "@/lib/site";

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  founder: { "@type": "Person", name: "Maya Bennett", jobTitle: "Founder & Principal" },
};

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Maya Bennett",
  jobTitle: "Founder & Principal",
  worksFor: { "@type": "Organization", name: siteConfig.name },
  url: `${siteConfig.url}/about`,
};

export const articleJsonLd = (article: Article) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: article.title,
  description: article.seoDescription || article.excerpt,
  image: new URL(imageUrl(article.socialImage || article.coverImage), siteConfig.url).toString(),
  author: { "@type": "Person", name: article.author.name },
  publisher: { "@type": "Organization", name: siteConfig.name },
  datePublished: article.publishedAt,
  dateModified: article.updatedAt || article.publishedAt,
  mainEntityOfPage: `${siteConfig.url}/insights/${article.slug}`,
});
