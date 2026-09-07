import type { Metadata } from "next";
import { CTA } from "@/components/home/CTA";
import { services } from "@/components/home/ServicesPreview";

export const metadata: Metadata = { title: "Services", description: "Senior communications strategy, media relations, thought leadership, and crisis counsel.", alternates: { canonical: "/services" } };

const details = [
  { outcomes: ["Clear message architecture", "Aligned leadership narrative", "Practical communications roadmap"], process: "Discovery, audience analysis, narrative development, and an actionable plan." },
  { outcomes: ["Sharper story angles", "Priority media relationships", "Prepared expert spokespeople"], process: "Story mining, targeted outreach, briefing, and thoughtful relationship stewardship." },
  { outcomes: ["Distinctive editorial themes", "Executive point of view", "Sustainable publishing rhythm"], process: "Idea development, editorial planning, writing support, and channel strategy." },
  { outcomes: ["Clear response protocols", "Confident decision-making", "Consistent stakeholder updates"], process: "Scenario planning, message development, simulation, and live senior counsel." },
];

export default function ServicesPage() {
  return <><header className="page-hero services-hero"><div className="shell"><p className="eyebrow">Services</p><h1>Communication built around consequential goals.</h1><p>Focused senior counsel, from strategic direction through the details that make it land.</p></div></header><section className="section services-page-section"><div className="shell service-page-list">{services.map((service, index) => <article className="service-detail" key={service.number}><span>{service.number}</span><h2>{service.title}</h2><p>{service.text}</p><h3>Typical outcomes</h3><ul>{details[index].outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul><h3>Our process</h3><p>{details[index].process}</p></article>)}</div></section><CTA /></>;
}
