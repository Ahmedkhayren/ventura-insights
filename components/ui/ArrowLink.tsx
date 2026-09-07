import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

export function ArrowLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link className={`arrow-link ${className}`} href={href}>
      <span>{children}</span><ArrowRight aria-hidden="true" size={15} />
    </Link>
  );
}
