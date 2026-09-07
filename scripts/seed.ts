import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!projectId || !token) throw new Error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN before running npm run seed.");

const client = createClient({ projectId, dataset, token, apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-01-01", useCdn: false });

const categories = ["Communications", "Brand Strategy", "Leadership", "Media", "Thought Leadership"];
const slug = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const articleData = [
  ["The New Rules of Earned Media in a Noisy World", "Communications", "Why earned media success now depends on relevance, timing, and credible storytelling.", "architecture.png", "2026-08-28T09:00:00Z", "Lead with relevance", "The strongest stories connect a real audience need with a timely point of view. Start with why the idea matters now, then support it with specific evidence and an expert who can add useful context."],
  ["Building a Brand Narrative That Resonates", "Brand Strategy", "A strong narrative connects your purpose with your audience in meaningful ways.", "leaves.png", "2026-08-24T09:00:00Z", "Find the durable truth", "Resonant narratives are rooted in a clear truth that can withstand changing campaigns and market conditions. They give teams a shared lens for decisions while leaving room for fresh expression."],
  ["Communicating Through Change with Confidence", "Leadership", "Practical guidance for leaders to communicate clearly and build trust during uncertainty.", "meeting.png", "2026-08-21T09:00:00Z", "Name what is known", "Separate confirmed decisions from open questions. Explain the principles guiding the work and make the next communication point clear."],
  ["The Media Landscape in 2026: What Leaders Should Know", "Media", "Key shifts in media behavior and what communicators should focus on now.", "hero-still-life.png", "2026-08-18T09:00:00Z", "Authority is built in public", "The most credible voices show their reasoning and contribute consistently. A thoughtful owned-channel presence supports earned media."],
  ["Why Executive Visibility Matters More Than Ever", "Thought Leadership", "A considered public presence can turn leadership expertise into long-term organizational trust.", "maya-bennett.png", "2026-08-12T09:00:00Z", "Choose substance over ubiquity", "A leader does not need to appear everywhere. A small number of well-chosen themes, expressed with depth and consistency, will do more for reputation than a high volume of commentary."],
];

function textBlock(key: string, text: string, style = "normal") {
  return { _type: "block", _key: key, style, markDefs: [], children: [{ _type: "span", _key: `${key}-span`, text, marks: [] }] };
}

async function upload(filename: string) {
  const file = fs.createReadStream(path.join(process.cwd(), "public", "images", filename));
  return client.assets.upload("image", file, { filename });
}

async function main() {
  for (const name of categories) await client.createOrReplace({ _id: `category-${slug(name)}`, _type: "category", name, slug: { _type: "slug", current: slug(name) }, description: `${name} perspectives from Ventura Insights.` });
  const portrait = await upload("maya-bennett.png");
  await client.createOrReplace({ _id: "author-maya-bennett", _type: "author", name: "Maya Bennett", slug: { _type: "slug", current: "maya-bennett" }, role: "Founder & Principal", bio: "Maya advises leaders on reputation, narrative, and high-stakes communication.", image: { _type: "image", asset: { _type: "reference", _ref: portrait._id }, alt: "Portrait of fictional founder Maya Bennett" } });
  for (const [title, category, excerpt, filename, publishedAt, heading, paragraph] of articleData) {
    const image = await upload(filename);
    const currentSlug = slug(title);
    await client.createOrReplace({ _id: `article-${currentSlug}`, _type: "article", title, slug: { _type: "slug", current: currentSlug }, excerpt, publishedAt, category: { _type: "reference", _ref: `category-${slug(category)}` }, author: { _type: "reference", _ref: "author-maya-bennett" }, coverImage: { _type: "image", asset: { _type: "reference", _ref: image._id }, alt: title }, body: [textBlock("intro", "The communications landscape rewards organizations that are useful, specific, and consistent. That calls for more than visibility; it calls for judgment."), textBlock("heading", heading, "h2"), textBlock("body", paragraph), textBlock("quote", "Clarity earns attention; consistency earns trust.", "blockquote"), textBlock("heading-two", "A practical way forward", "h2"), textBlock("body-two", "Begin with the audience question, identify the proof only your organization can offer, and build a steady rhythm of useful communication. The strongest programs favor relevance and judgment over volume.")], seoTitle: title, seoDescription: excerpt });
  }
  await client.createOrReplace({ _id: "siteSettings", _type: "siteSettings", siteName: "Ventura Insights", tagline: "Independent perspective. Senior expertise.", description: "Independent communications counsel for organizations navigating reputation, change, and growth.", defaultSeoTitle: "Ventura Insights — Strategic Communications Consultancy", defaultSeoDescription: "Independent communications counsel for organizations navigating reputation, change, and growth.", email: "hello@venturainsights.example" });
  console.log("Seeded Ventura Insights content successfully.");
}

main().catch((error) => { console.error(error); process.exit(1); });
