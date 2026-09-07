import Link from "next/link";

export default function NotFound() {
  return <section className="not-found"><div className="shell"><p className="eyebrow">404 — Page not found</p><h1>This page has moved beyond view.</h1><p>The address may be incorrect, or the page may no longer be available.</p><div className="not-found-actions"><Link className="button" href="/">Return home</Link><Link className="arrow-link" href="/insights">View insights →</Link></div></div></section>;
}
