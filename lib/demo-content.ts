import type { Article } from "@/types/content";

const maya = {
  name: "Maya Bennett",
  slug: "maya-bennett",
  role: "Founder & Principal",
  bio: "Maya advises leaders on reputation, narrative, and high-stakes communication.",
  image: "/images/maya-bennett.png",
};

const blocks = (intro: string, heading: string, body: string) => [
  {
    _type: "block" as const,
    _key: "intro",
    style: "normal",
    markDefs: [],
    children: [{ _type: "span" as const, _key: "a", text: intro, marks: [] }],
  },
  {
    _type: "block" as const,
    _key: "heading",
    style: "h2",
    markDefs: [],
    children: [{ _type: "span" as const, _key: "b", text: heading, marks: [] }],
  },
  {
    _type: "block" as const,
    _key: "body",
    style: "normal",
    markDefs: [],
    children: [{ _type: "span" as const, _key: "c", text: body, marks: [] }],
  },
  {
    _type: "block" as const,
    _key: "quote",
    style: "blockquote",
    markDefs: [],
    children: [
      {
        _type: "span" as const,
        _key: "d",
        text: "Clarity earns attention; consistency earns trust.",
        marks: [],
      },
    ],
  },
  {
    _type: "block" as const,
    _key: "heading2",
    style: "h2",
    markDefs: [],
    children: [{ _type: "span" as const, _key: "e", text: "A practical way forward", marks: [] }],
  },
  {
    _type: "block" as const,
    _key: "body2",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span" as const,
        _key: "f",
        text: "Begin with the audience question, identify the proof only your organization can offer, and build a steady rhythm of useful communication. The strongest programs favor relevance and judgment over volume.",
        marks: [],
      },
    ],
  },
];

export const demoArticles: Article[] = [
  {
    _id: "demo-earned-media",
    title: "The New Rules of Earned Media in a Noisy World",
    slug: "the-new-rules-of-earned-media-in-a-noisy-world",
    excerpt: "Why earned media success now depends on relevance, timing, and credible storytelling.",
    coverImage: "/images/architecture.png",
    coverAlt: "Contemporary stone and glass building surrounded by woodland",
    publishedAt: "2026-08-28T09:00:00Z",
    category: { name: "Communications", slug: "communications" },
    author: maya,
    body: blocks(
      "The media landscape has changed dramatically. Audiences are more selective, journalists are inundated, and traditional approaches no longer guarantee results. Earned attention now comes from value, relevance, and relationship building.",
      "Lead with relevance",
      "The strongest stories connect a real audience need with a timely point of view. Start with why the idea matters now, then support it with specific evidence and an expert who can add useful context."
    ),
  },
  {
    _id: "demo-brand-narrative",
    title: "Building a Brand Narrative That Resonates",
    slug: "building-a-brand-narrative-that-resonates",
    excerpt: "A strong narrative connects your purpose with your audience in meaningful ways.",
    coverImage: "/images/leaves.png",
    coverAlt: "Overlapping dark green leaves with detailed natural texture",
    publishedAt: "2026-08-24T09:00:00Z",
    category: { name: "Brand Strategy", slug: "brand-strategy" },
    author: maya,
    body: blocks(
      "A brand narrative is more than a polished origin story. It is the connective tissue between what an organization believes, what it does, and why those choices matter to the people it serves.",
      "Find the durable truth",
      "Resonant narratives are rooted in a clear truth that can withstand changing campaigns and market conditions. They give teams a shared lens for decisions while leaving room for fresh expression."
    ),
  },
  {
    _id: "demo-change",
    title: "Communicating Through Change with Confidence",
    slug: "communicating-through-change-with-confidence",
    excerpt: "Practical guidance for leaders to communicate clearly and build trust during uncertainty.",
    coverImage: "/images/meeting.png",
    coverAlt: "Senior advisers in a focused meeting around a light wood table",
    publishedAt: "2026-08-21T09:00:00Z",
    category: { name: "Leadership", slug: "leadership" },
    author: maya,
    body: blocks(
      "Change creates an information vacuum. When leaders wait for every answer before communicating, uncertainty is quickly filled by assumption. Confidence begins with honest, useful updates delivered at a dependable cadence.",
      "Name what is known",
      "Separate confirmed decisions from open questions. Explain the principles guiding the work and make the next communication point clear. This approach respects uncertainty without surrendering direction."
    ),
  },
  {
    _id: "demo-landscape",
    title: "The Media Landscape in 2026: What Leaders Should Know",
    slug: "the-media-landscape-in-2026-what-leaders-should-know",
    excerpt: "Key shifts in media behavior and what communicators should focus on now.",
    coverImage: "/images/hero-still-life.png",
    coverAlt: "Green ceramic cup and branches in soft morning light",
    publishedAt: "2026-08-18T09:00:00Z",
    category: { name: "Media", slug: "media" },
    author: maya,
    body: blocks(
      "Fragmented attention has made trusted interpretation more valuable. Leaders who understand how audiences discover, verify, and share information can communicate with greater precision.",
      "Authority is built in public",
      "The most credible voices show their reasoning and contribute consistently. A thoughtful owned-channel presence supports earned media because journalists and audiences can see the depth behind a point of view."
    ),
  },
  {
    _id: "demo-visibility",
    title: "Why Executive Visibility Matters More Than Ever",
    slug: "why-executive-visibility-matters-more-than-ever",
    excerpt: "A considered public presence can turn leadership expertise into long-term organizational trust.",
    coverImage: "/images/maya-bennett.png",
    coverAlt: "Portrait of fictional Ventura Insights founder Maya Bennett",
    publishedAt: "2026-08-12T09:00:00Z",
    category: { name: "Thought Leadership", slug: "thought-leadership" },
    author: maya,
    body: blocks(
      "People increasingly look to leaders—not abstract institutions—to explain decisions and demonstrate values. Visibility is most effective when it grows from expertise and a genuine willingness to be useful.",
      "Choose substance over ubiquity",
      "A leader does not need to appear everywhere. A small number of well-chosen themes, expressed with depth and consistency, will do more for reputation than a high volume of interchangeable commentary."
    ),
  },
];
