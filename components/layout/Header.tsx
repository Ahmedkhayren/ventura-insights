import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { navItems } from "@/lib/site";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Logo />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        </nav>
        <Link className="button header-cta" href="/contact">Get in Touch</Link>
        <MobileMenu />
      </div>
    </header>
  );
}
