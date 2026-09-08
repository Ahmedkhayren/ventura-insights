"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function ShareButtons({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  async function copyLink() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="share" aria-label="Share article">
      <span>Share</span>
      <a href={`https://x.com/intent/post?url=${encodedUrl}&text=${encodedTitle}`} target="_blank" rel="noopener noreferrer" aria-label="Share on X">X</a>
      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn">in</a>
      <button onClick={copyLink} aria-label={copied ? "Link copied" : "Copy article link"}>{copied ? <Check size={15} /> : <Copy size={15} />}</button>
    </div>
  );
}
