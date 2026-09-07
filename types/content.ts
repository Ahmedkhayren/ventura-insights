import type { PortableTextBlock } from "next-sanity";

export type SanityImage = {
  asset?: { _ref?: string; url?: string };
  alt?: string;
  hotspot?: unknown;
  crop?: unknown;
};

export type Author = {
  name: string;
  slug: string;
  role: string;
  bio?: string;
  image?: SanityImage | string;
};

export type Category = { name: string; slug: string; description?: string };

export type Article = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: SanityImage | string;
  socialImage?: SanityImage | string;
  coverAlt?: string;
  body: PortableTextBlock[];
  publishedAt: string;
  updatedAt?: string;
  category: Category;
  author: Author;
  seoTitle?: string;
  seoDescription?: string;
};
