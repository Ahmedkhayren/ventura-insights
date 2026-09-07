import { ArrowLink } from "@/components/ui/ArrowLink";

export const services = [
  { number: "01", title: "Communications Strategy", text: "Align messaging, reputation, and business goals around a clear strategic direction." },
  { number: "02", title: "Media Relations", text: "Build durable relationships and relevant stories that earn the right attention." },
  { number: "03", title: "Content & Thought Leadership", text: "Turn expertise into credible ideas and editorial content people choose to engage with." },
  { number: "04", title: "Crisis & Issues Management", text: "Navigate consequential moments with clarity, preparedness, and sound judgment." },
];

export function ServicesPreview() {
  return (
    <section className="section services-preview">
      <div className="shell services-layout">
        <div className="services-intro"><p className="eyebrow">Our expertise</p><h2>Clarity for moments that matter.</h2><p>Senior counsel and focused execution for organizations building trust, shaping understanding, or navigating change.</p><ArrowLink href="/services">Explore our services</ArrowLink></div>
        <div className="service-list">{services.map((service) => <article key={service.number}><span>{service.number}</span><div><h3>{service.title}</h3><p>{service.text}</p></div></article>)}</div>
      </div>
    </section>
  );
}
