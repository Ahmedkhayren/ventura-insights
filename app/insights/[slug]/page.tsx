import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { PortableTextRenderer } from "@/components/insights/PortableTextRenderer";
import { ShareButtons } from "@/components/insights/ShareButtons";
import { StructuredData } from "@/components/seo/StructuredData";
import { getArticleBySlug, getArticles } from "@/lib/sanity/fetch";
import { imageUrl } from "@/lib/sanity/image";
import { articleJsonLd } from "@/lib/seo/structured-data";
import { formatDate, siteConfig } from "@/lib/site";

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Insight not found" };
  const canonical = `/insights/${article.slug}`;
  const title = article.seoTitle || article.title;
  const description = article.seoDescription || article.excerpt;
  const image = imageUrl(article.socialImage || article.coverImage);
  return {
    title,
    description,
    authors: [{ name: article.author.name }],
    alternates: { canonical },
    openGraph: { type: "article", url: canonical, title, description, images: [image], publishedTime: article.publishedAt, modifiedTime: article.updatedAt, authors: [article.author.name] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();
  const canonical = `${siteConfig.url}/insights/${article.slug}`;
  return (
    <article className="article-page">
      <StructuredData data={articleJsonLd(article)} />
      <div className="shell">
        <header className="article-header">
          <Link className="back-link" href="/insights"><ArrowLeft size={14} /> Back to insights</Link>
          <div className="article-meta"><span>{article.category.name}</span><i>•</i><time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time></div>
          <h1>{article.title}</h1>
          <p className="article-deck">{article.excerpt}</p>
          <div className="article-byline">
            <div className="author-lockup"><Image src={imageUrl(article.author.image, 100, 100)} width={42} height={42} alt={`Portrait of ${article.author.name}`} /><div><strong>{article.author.name}</strong><span>{article.author.role}</span></div></div>
            <ShareButtons title={article.title} url={canonical} />
          </div>
        </header>
        <div className="article-hero-image"><Image src={imageUrl(article.coverImage, 1800, 990)} alt={article.coverAlt || article.title} fill preload sizes="(max-width: 1160px) 100vw, 1080px" /></div>
        <PortableTextRenderer value={article.body} />
      </div>
    </article>
  );
}
