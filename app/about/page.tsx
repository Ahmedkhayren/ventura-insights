import type { Metadata } from "next";
import Image from "next/image";
import { CTA } from "@/components/home/CTA";
import { StructuredData } from "@/components/seo/StructuredData";
import { personJsonLd } from "@/lib/seo/structured-data";

export const metadata: Metadata = { title: "About", description: "Meet Maya Bennett and discover Ventura Insights’ independent approach to strategic communications.", alternates: { canonical: "/about" } };

export default function AboutPage() {
  return (
    <><StructuredData data={personJsonLd} />
      <header className="page-hero about-hero"><div className="shell"><p className="eyebrow">About Ventura</p><h1>Independent counsel. Enduring perspective.</h1><p>We help thoughtful organizations communicate with clarity when reputation and trust matter most.</p></div></header>
      <section className="split-section about-profile"><div className="shell split-grid"><div className="split-image"><Image src="/images/maya-bennett.png" alt="Portrait of fictional founder Maya Bennett" fill priority sizes="(max-width: 900px) 100vw, 50vw" /></div><div className="split-copy"><p className="eyebrow">Founder profile</p><h2>Maya Bennett</h2><p>Maya is the fictional founder and principal of Ventura Insights, created for this portfolio demonstration. She brings a strategic, editorial approach to reputation, narrative, and leadership communication.</p><p>Her work begins with careful listening: understanding the business context, the people who need to be reached, and the truth an organization is ready to stand behind.</p><p>Ventura is intentionally senior-led and focused. Clients receive direct counsel, precise thinking, and work built for the situation—not a recycled playbook.</p></div></div></section>
      <section className="principles"><div className="shell"><div className="section-heading"><div><p className="eyebrow">Our philosophy</p><h2>How we work</h2></div></div><div className="principle-grid"><article><h3>Listen closely</h3><p>Strong strategy starts with context. We uncover what audiences need, where trust is fragile, and which truths can carry the work.</p></article><article><h3>Choose clarity</h3><p>We turn complexity into language people can understand without flattening the nuance that makes it credible.</p></article><article><h3>Build for the long term</h3><p>Every recommendation should strengthen the reputation and decision-making muscle an organization will need next.</p></article></div></div></section>
      <CTA />
    </>
  );
}
