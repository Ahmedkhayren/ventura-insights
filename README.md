# Ventura Insights

Ventura Insights is a production-oriented editorial website for a fictional independent communications consultancy. It was designed from a supplied visual mock-up and built as an original portfolio implementation—not as a recreation of a real client or company.

The frontend is usable without credentials through a local preview dataset. Once Sanity is configured, published CMS documents become the source of truth for the homepage, Insights index, article routes, metadata, and sitemap.

## Features

- Responsive editorial homepage, Insights index, long-form article pages, About, Services, Contact, and custom 404
- Embedded Sanity Studio at `/studio` with Articles, Authors, Categories, and singleton Site Settings
- Server-rendered GROQ content with tagged one-hour revalidation and an authenticated webhook endpoint
- URL-based article filtering, share actions, Portable Text, optimized Sanity images, and local preview assets
- Next.js Metadata API, canonical URLs, Open Graph/Twitter cards, dynamic sitemap, robots rules, and JSON-LD
- Accessible navigation, focus states, skip link, semantic landmarks, labeled forms, and reduced-motion handling
- Original AI-generated demo photography stored locally; no real-client logos, testimonials, or claims

## Stack and architecture

- Next.js App Router, React, TypeScript, and self-hosted Source Serif 4/Inter via `next/font/local`
- Tailwind CSS 4 plus a small semantic design-system layer in `app/globals.css`
- Sanity Studio, `next-sanity`, GROQ, and Portable Text
- Server Components for primary page content; client components only for the menu, sharing, Studio, and form state

The data boundary lives in `lib/sanity`. `getArticles()` and `getArticleBySlug()` query the public published perspective when Sanity is configured. Local demo content is a development fallback, keeping the UI reviewable before a project ID is supplied. In a configured deployment, Studio publications appear automatically after cache revalidation.

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. Quality commands:

```bash
npm run lint
npm run typecheck
npm run build
```

## Sanity setup

1. Create a project at [sanity.io/manage](https://sanity.io/manage) and create or select a `production` dataset.
2. In the project API settings, add `http://localhost:3000` as a CORS origin with credentials enabled. Add the Vercel production URL later.
3. Copy `.env.example` to `.env.local` and set:

```dotenv
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-01-01
```

For a private dataset, add `SANITY_API_READ_TOKEN` as a server-only variable. Public datasets do not need it.

4. Restart the dev server and open `/studio`. Sign in with a Sanity account that has project access.
5. Create Categories and an Author first, then create an Article. Fill its title, generated slug, excerpt, cover image and alt text, date, category, author, body, and optional SEO/social fields. Publish it.
6. The article appears at `/insights/article-slug`, in the Insights index, in the homepage’s latest three when applicable, and in `/sitemap.xml`.

### Seed the five demonstration articles

Create a Sanity Editor token in the project API settings and temporarily place it in `.env.local` as `SANITY_API_WRITE_TOKEN`. Then run:

```bash
npm run seed
```

Remove the write token from local and deployed environments after seeding. The script uploads the original local demo images and creates categories, Maya Bennett, five articles, and Site Settings. It uses stable document IDs, so rerunning updates rather than duplicates the documents.

## Revalidation

Without a webhook, queries revalidate at most hourly. For near-immediate publishing:

1. Create a long random `SANITY_REVALIDATE_SECRET` in local/Vercel environment variables.
2. In Sanity project settings, add a webhook to `https://YOUR_DOMAIN/api/revalidate`.
3. Trigger it for create, update, and delete on `_type == "article"`.
4. Add header `x-sanity-secret: YOUR_SECRET` and include the slug projection in the payload, for example `{ "slug": slug.current }`.

The route revalidates the homepage, index, article tag/path, and therefore refreshes metadata and subsequent sitemap requests.

## Contact delivery

The form validates in the browser and again on the server. It intentionally reports that delivery is unconfigured until `CONTACT_WEBHOOK_URL` points to an email provider, automation endpoint, or serverless mail handler accepting JSON. No credentials are exposed to the browser.

## Vercel deployment and domain

1. Push the repository to GitHub and import it in Vercel.
2. Add the production environment variables listed in `.env.example`; never commit `.env.local`.
3. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin and add that origin to Sanity CORS.
4. Deploy. Vercel detects Next.js and runs `npm run build`.
5. Add a custom domain under **Project → Settings → Domains**, apply the DNS records Vercel provides, update `NEXT_PUBLIC_SITE_URL`, Sanity CORS, and the webhook URL, then redeploy.

## Git/GitHub

```bash
git init
git add .
git commit -m "Build Ventura Insights editorial CMS"
git branch -M main
git remote add origin git@github.com:YOUR_ACCOUNT/ventura-insights.git
git push -u origin main
```

Review `git status` before committing. `.env*` files are ignored except `.env.example`.

## Project map

```text
app/                 Routes, metadata, API endpoints, sitemap, robots
components/          Layout, home, insights, contact, and SEO components
lib/sanity/          Client, environment, image builder, queries, fetch layer
lib/seo/             Reusable structured-data builders
sanity/schemaTypes/  Article, Author, Category, Site Settings schemas
scripts/seed.ts      Idempotent demo-content seeder
public/images/       Original local editorial assets
types/               Shared content types
```

## Demo-image provenance

The five files in `public/images` were generated specifically for this fictional portfolio project with OpenAI’s built-in image generation tool. Prompts requested premium natural-light editorial photography, forest-green and warm-neutral palettes, no text, no logos, and no real people or clients. They are project-local assets and are not hotlinked.
