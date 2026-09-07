import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

export function CTA() {
  return (
    <section className="cta-band">
      <div className="shell cta-inner">
        <MessageCircle size={27} aria-hidden="true" />
        <div><h2>Ready to elevate your communications?</h2><p>Let&apos;s discuss how we can help your organization communicate with confidence.</p></div>
        <Link className="button button-light" href="/contact">Get in Touch <ArrowRight size={16} /></Link>
      </div>
    </section>
  );
}
