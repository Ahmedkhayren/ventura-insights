import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = { title: "Contact", description: "Start a conversation with Ventura Insights about your communications priorities.", alternates: { canonical: "/contact" } };

export default function ContactPage() {
  return <><header className="page-hero contact-hero"><div className="shell"><p className="eyebrow">Get in touch</p><h1>Let’s make the complex clear.</h1><p>Tell us what you are navigating and where communication needs to make a difference.</p></div></header><section className="shell contact-layout"><aside className="contact-aside"><h2>Start a conversation.</h2><p>We work with a small number of organizations at a time so every engagement receives senior attention.</p><div className="contact-detail"><small>Email</small><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></div><div className="contact-detail"><small>Response time</small><span>Usually within two business days</span></div></aside><ContactForm /></section></>;
}
