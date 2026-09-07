"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { navItems, siteConfig } from "@/lib/site";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <button className="menu-trigger" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="mobile-navigation" aria-label="Open navigation">
        <Menu size={24} aria-hidden="true" />
      </button>
      <div className={`menu-panel ${open ? "is-open" : ""}`} id="mobile-navigation" aria-hidden={!open}>
        <div className="menu-panel-top">
          <Logo inverse />
          <button className="menu-close" onClick={() => setOpen(false)} aria-label="Close navigation"><X size={24} /></button>
        </div>
        <nav aria-label="Mobile navigation" className="menu-links">
          {navItems.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>)}
        </nav>
        <Link className="button button-light" href="/contact" onClick={() => setOpen(false)}>Get in Touch <span>→</span></Link>
        <div className="menu-socials">
          <a href={siteConfig.social.x} aria-label="X" target="_blank" rel="noreferrer">X</a>
          <a href={siteConfig.social.linkedin} aria-label="LinkedIn" target="_blank" rel="noreferrer">in</a>
        </div>
      </div>
    </>
  );
}
