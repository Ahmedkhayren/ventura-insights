# Ventura Insights

A production-style editorial and communications website built with Next.js, TypeScript, Sanity CMS, and Vercel-ready architecture.

Ventura Insights is a fictional communications consultancy created as a portfolio project to demonstrate CMS-driven publishing, dynamic content, SEO, secure API routes, responsive design, and production-ready Next.js development.

## Overview

Ventura Insights combines a polished editorial frontend with a real Sanity CMS.

Content editors can create and publish articles through Sanity Studio, while the Next.js frontend dynamically renders published content, article pages, author information, categories, images, and metadata.

## Features

- Dynamic Sanity CMS integration
- Editorial article publishing
- Article categories and authors
- Dynamic article routes
- Portable Text rendering
- Responsive desktop, tablet, and mobile layouts
- Optimized Sanity images
- Article sharing
- SEO metadata
- Canonical URLs
- Sitemap and robots configuration
- Organization, Person, and Article structured data
- Secure content revalidation endpoint
- Contact API validation
- Server-only environment variable handling
- Static generation and revalidation
- Production-ready Next.js build

## Tech Stack

- Next.js 16
- React
- TypeScript
- Tailwind CSS
- Sanity CMS
- GROQ
- Portable Text
- Vercel
- Git & GitHub

## CMS Architecture

Sanity manages:

- Articles
- Authors
- Categories
- Site settings
- Article cover images
- Editorial body content

The frontend queries published Sanity content and renders it through Next.js.

## Example Articles

The CMS currently includes editorial demo content such as:

- Building Reputation Before You Need It
- The Media Landscape in 2026: What Leaders Should Know
- Why Executive Visibility Matters More Than Ever

All editorial content and brands used in this project are fictional and created for demonstration purposes.

## Application Routes

```text
/
 /about
 /services
 /contact
 /insights
 /insights/[slug]
 /studio
```

## Local Development

Clone the repository:

```bash
git clone https://github.com/Ahmedkhayren/ventura-insights.git
cd ventura-insights
```

Install dependencies:

```bash
npm install
```

Create the local environment file:

```bash
cp .env.example .env.local
```

Configure your Sanity project values in `.env.local`.

Never commit `.env.local` or private API tokens.

Start the application:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Sanity Studio can also be run separately:

```bash
npx sanity dev
```

## Production Checks

The project has been tested with:

```bash
npm run lint
npm run typecheck
npm run build
```

The current dependency audit reports no known vulnerabilities.

## Security

The project includes several production-readiness protections:

- Server-only handling for private environment variables
- Protected revalidation endpoint
- Input validation on the contact endpoint
- Body-size and timeout limits
- Sanitized Portable Text URLs
- Safe external-link handling
- No raw HTML rendering from CMS content
- Published-content filtering
- Restricted Sanity image configuration

## Performance

Performance improvements include:

- Optimized Next.js images
- Responsive image sizing
- Reduced GROQ projections
- Static generation for article routes
- Revalidation-based content updates
- Local font loading
- Minimal client-side JavaScript where possible

## SEO

Ventura Insights includes:

- Next.js Metadata API
- Canonical URLs
- Open Graph metadata
- Twitter metadata
- Sitemap
- Robots configuration
- Organization structured data
- Person structured data
- Article structured data

## Deployment

The application is prepared for deployment on Vercel.

Production setup requires:

- Sanity project environment variables
- Production Sanity CORS origin
- Revalidation secret
- Sanity webhook configuration
- Contact webhook configuration if form delivery is required

## Project Purpose

Ventura Insights was created to demonstrate:

- Next.js full-stack development
- Headless CMS architecture
- Sanity CMS integration
- Dynamic editorial publishing
- Secure API development
- SEO implementation
- Responsive frontend development
- Production optimization
- Git and GitHub workflow
- Vercel deployment architecture

## Author

**Ahmed Yasin**

Full-Stack Web Developer focused on Next.js, React, TypeScript, Supabase, Sanity CMS, SaaS applications, and modern responsive websites.

**Upwork:**  
https://www.upwork.com/freelancers/~01200b5066e1768082

## License

This project is intended for portfolio and demonstration purposes.
