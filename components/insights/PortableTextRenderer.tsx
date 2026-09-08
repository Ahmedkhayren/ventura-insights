import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "next-sanity";
import { imageUrl } from "@/lib/sanity/image";
import type { SanityImage } from "@/types/content";

const components: PortableTextComponents = {
  marks: {
    link: ({ children, value }) => {
      const href = typeof value?.href === "string" ? value.href.trim() : "";
      const internal = /^\/(?!\/)/.test(href) || href.startsWith("#");
      const external = /^https?:\/\//i.test(href);
      const email = /^mailto:/i.test(href);
      if (!internal && !external && !email) return <>{children}</>;
      return <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>{children}</a>;
    },
  },
  types: {
    image: ({ value }: { value: SanityImage }) => (
      <figure><Image src={imageUrl(value, 1400)} alt={value.alt || "Article image"} width={1400} height={850} sizes="(max-width: 760px) 100vw, 720px" /></figure>
    ),
  },
};

export function PortableTextRenderer({ value }: { value: PortableTextBlock[] }) {
  return <div className="prose"><PortableText value={value} components={components} /></div>;
}
