import { defineArrayMember, defineField, defineType } from "sanity";

export const articleType = defineType({
  name: "article",
  title: "Articles",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required().max(100) }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 3, validation: (rule) => rule.required().max(220) }),
    defineField({ name: "coverImage", title: "Cover image", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "Alternative text", type: "string", validation: (rule) => rule.required() })], validation: (rule) => rule.required() }),
    defineField({ name: "publishedAt", title: "Publication date", type: "datetime", initialValue: () => new Date().toISOString(), validation: (rule) => rule.required() }),
    defineField({ name: "category", title: "Category", type: "reference", to: [{ type: "category" }], validation: (rule) => rule.required() }),
    defineField({ name: "author", title: "Author", type: "reference", to: [{ type: "author" }], validation: (rule) => rule.required() }),
    defineField({
      name: "body", title: "Body", type: "array", validation: (rule) => rule.required().min(1), of: [
        defineArrayMember({ type: "block", styles: [{ title: "Normal", value: "normal" }, { title: "Heading 2", value: "h2" }, { title: "Heading 3", value: "h3" }, { title: "Quote", value: "blockquote" }], marks: { annotations: [{ name: "link", type: "object", title: "Link", fields: [defineField({ name: "href", title: "URL", type: "url", validation: (rule) => rule.uri({ allowRelative: true, scheme: ["http", "https", "mailto"] }) })] }] } }),
        defineArrayMember({ type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", type: "string", title: "Alternative text", validation: (rule) => rule.required() })] }),
      ],
    }),
    defineField({ name: "seoTitle", title: "SEO title", type: "string", description: "Aim for 50–60 characters.", validation: (rule) => rule.max(70).warning("Search results may truncate titles longer than 60 characters.") }),
    defineField({ name: "seoDescription", title: "SEO description", type: "text", rows: 3, description: "Aim for 140–160 characters.", validation: (rule) => rule.max(170).warning("Search results may truncate descriptions longer than 160 characters.") }),
    defineField({ name: "socialImage", title: "Social sharing image", type: "image", options: { hotspot: true }, description: "Optional 1.91:1 image. The cover image is used when omitted." }),
  ],
  orderings: [{ title: "Publication date, newest", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: {
    select: { title: "title", media: "coverImage", category: "category.name", date: "publishedAt" },
    prepare({ title, media, category, date }) { return { title, media, subtitle: `${category || "Uncategorized"} · ${date ? new Date(date).toLocaleDateString() : "No date"}` }; },
  },
});
