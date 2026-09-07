import { defineQuery } from "next-sanity";

const articleFields = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  coverImage{..., "asset": asset->{_ref, url}},
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
  `*[_type == "article" && defined(slug.current) && publishedAt <= now()] | order(publishedAt desc) {${articleFields}}`
);

export const articleBySlugQuery = defineQuery(
  `*[_type == "article" && slug.current == $slug][0] {${articleFields}}`
);
