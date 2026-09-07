import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "@/components/insights/ArticleCard";
import { getArticles } from "@/lib/sanity/fetch";

export const metadata: Metadata = { title: "Insights", description: "Thoughts on communications, strategy, media, and leadership.", alternates: { canonical: "/insights" } };

const topics = [
  { label: "All Topics", value: "" },
  { label: "Communications", value: "communications" },
  { label: "Brand Strategy", value: "brand-strategy" },
  { label: "Leadership", value: "leadership" },
  { label: "Media", value: "media" },
  { label: "Thought Leadership", value: "thought-leadership" },
];

export default async function InsightsPage({ searchParams }: { searchParams: Promise<{ topic?: string }> }) {
  const { topic = "" } = await searchParams;
  const articles = await getArticles();
  const filtered = topic ? articles.filter((article) => article.category.slug === topic) : articles;
  return (
    <>
      <header className="page-hero insights-hero"><div className="shell"><p className="eyebrow">The journal</p><h1>Insights</h1><p>Thoughts on communications, strategy, and leadership.</p></div></header>
      <div className="shell insights-controls">
        <nav className="topic-links" aria-label="Filter insights by topic">{topics.map((item) => <Link className={topic === item.value ? "active" : ""} key={item.label} href={item.value ? `/insights?topic=${item.value}` : "/insights"}>{item.label}</Link>)}</nav>
        <span className="sort-label">Newest First ↓</span>
      </div>
      <section className="shell insights-list" aria-live="polite">
        {filtered.length ? filtered.map((article) => <ArticleCard key={article._id} article={article} variant="row" />) : <div className="empty-state"><h2>No insights in this topic yet.</h2><Link className="arrow-link" href="/insights">View all insights →</Link></div>}
      </section>
    </>
  );
}
