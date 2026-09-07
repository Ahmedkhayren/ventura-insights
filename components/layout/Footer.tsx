import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { navItems, siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-grid">
        <div className="footer-intro">
          <Logo inverse />
          <p>Independent perspective. Senior expertise. Measurable results.</p>
        </div>
        <div>
          <p className="footer-label">Explore</p>
          <nav className="footer-nav" aria-label="Footer navigation">
            {navItems.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
          </nav>
        </div>
        <div>
          <p className="footer-label">Connect</p>
          <a className="footer-email" href={`mailto:${siteConfig.email}`}>{siteConfig.email}<ArrowUpRight size={15} /></a>
          <div className="footer-social"><a href={siteConfig.social.linkedin}>LinkedIn</a><a href={siteConfig.social.x}>X / Twitter</a></div>
        </div>
      </div>
      <div className="shell footer-bottom"><span>© {new Date().getFullYear()} Ventura Insights</span><span>Fictional portfolio demonstration</span></div>
    </footer>
  );
}
