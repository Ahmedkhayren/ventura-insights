import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings", title: "Site Settings", type: "document",
  fields: [
    defineField({ name: "siteName", title: "Site name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({ name: "defaultSeoTitle", title: "Default SEO title", type: "string", validation: (rule) => rule.max(70) }),
    defineField({ name: "defaultSeoDescription", title: "Default SEO description", type: "text", rows: 3, validation: (rule) => rule.max(170) }),
    defineField({ name: "defaultSocialImage", title: "Default social image", type: "image", options: { hotspot: true } }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "linkedin", title: "LinkedIn", type: "url" }),
    defineField({ name: "x", title: "X / Twitter", type: "url" }),
    defineField({ name: "instagram", title: "Instagram", type: "url" }),
  ],
});
