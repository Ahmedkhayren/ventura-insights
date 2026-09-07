import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="hero">
      <div className="shell hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Independent communications counsel</p>
          <h1><span>Strategic communications</span> <span>that build reputation and</span> <span>drive <em>impact.</em></span></h1>
          <p className="hero-deck">Independent perspective. Senior expertise.<br />Measurable results.</p>
          <Link className="button" href="/insights">Explore Insights <ArrowRight size={16} /></Link>
        </div>
        <div className="hero-image">
          <Image src="/images/hero-still-life.png" alt="Green ceramic cup, books, and leafy branches in warm natural light" fill priority sizes="(max-width: 800px) 100vw, 50vw" />
        </div>
      </div>
    </section>
  );
}
