import { ArrowLink } from "@/components/ui/ArrowLink";
import { ArticleCard } from "@/components/insights/ArticleCard";
import type { Article } from "@/types/content";

export function LatestInsights({ articles }: { articles: Article[] }) {
  return (
    <section className="section latest">
      <div className="shell">
        <div className="section-heading"><div><p className="eyebrow">Perspectives</p><h2>Latest Insights</h2></div><ArrowLink href="/insights">View all insights</ArrowLink></div>
        <div className="article-grid">{articles.slice(0, 3).map((article) => <ArticleCard key={article._id} article={article} />)}</div>
      </div>
    </section>
  );
}
