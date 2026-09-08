import { defineQuery } from "next-sanity";

const articleSummaryFields = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  coverImage{..., "asset": asset->{_ref, url}},
  "coverAlt": coverImage.alt,
  publishedAt,
  "updatedAt": _updatedAt,
  category->{name, "slug": slug.current},
  author->{name, image{..., "asset": asset->{_ref, url}}}
`;

const articleFields = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  coverImage{..., "asset": asset->{_ref, url}},
  "coverAlt": coverImage.alt,
  socialImage{..., "asset": asset->{_ref, url}},
  body,
  publishedAt,
  "updatedAt": _updatedAt,
  seoTitle,
  seoDescription,
  category->{name, "slug": slug.current, description},
  author->{name, "slug": slug.current, role, bio, image{..., "asset": asset->{_ref, url}}}
`;

export const articlesQuery = defineQuery(
  `*[_type == "article" && defined(slug.current) && publishedAt <= now()] | order(publishedAt desc) {${articleSummaryFields}}`
);

export const articleBySlugQuery = defineQuery(
  `*[_type == "article" && defined(slug.current) && slug.current == $slug && publishedAt <= now()][0] {${articleFields}}`
);
