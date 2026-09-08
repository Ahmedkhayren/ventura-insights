import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ArticleSummary } from "@/types/content";
import { formatDate } from "@/lib/site";
import { imageUrl } from "@/lib/sanity/image";

export function ArticleCard({ article, variant = "card", preload = false }: { article: ArticleSummary; variant?: "card" | "row"; preload?: boolean }) {
  return (
    <article className={`article-${variant}`}>
      <Link className="article-image" href={`/insights/${article.slug}`} tabIndex={-1} aria-hidden="true">
        <Image src={imageUrl(article.coverImage, 1000, 620)} alt={article.coverAlt || article.title} fill preload={preload} sizes={variant === "row" ? "(max-width: 700px) 100vw, 250px" : "(max-width: 700px) 100vw, (max-width: 900px) 50vw, 380px"} />
      </Link>
      <div className="article-content">
        <div className="article-meta"><span>{article.category.name}</span><i>•</i><time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time></div>
        <h3><Link href={`/insights/${article.slug}`}>{article.title}</Link></h3>
        <p>{article.excerpt}</p>
        {variant === "card" && <div className="article-author">
          <Image src={imageUrl(article.author.image, 80, 80)} width={28} height={28} alt="" />
          <span>{article.author.name}</span>
        </div>}
        {variant === "row" && <Link className="read-more" href={`/insights/${article.slug}`}>Read more <ArrowRight size={14} /></Link>}
      </div>
    </article>
  );
}
