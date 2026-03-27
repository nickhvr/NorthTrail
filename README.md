# TrailNorth Outdoor Blog Starter (Next.js + Vercel)

This project is built for your requested structure:

- clean slugs
- one file per page/post
- central `/blog` page that automatically lists all blog articles
- pillar pages like `/hiking` that automatically filter matching posts
- privacy policy, cookies, impressum
- cookie banner prepared for GTM + GA4 consent-based loading

## Project structure

```text
app/
  page.js
  blog/page.js
  blog/[...slug]/page.js
  hiking/page.js
  privacy-policy/page.js
  cookies/page.js
  impressum/page.js
components/
content/
  blog/
    hiking/
      day-hike-packing-list.mdx
      best-hiking-boots-beginners.mdx
lib/
public/
```

## How blog posts work

Each post is its own `.mdx` file inside `content/blog/...`.

The frontmatter controls:

- title
- slug
- pillar
- date
- excerpt
- featuredImage
- tags
- readTime

The archive page (`/blog`) automatically reads all files.
The pillar page (`/hiking`) automatically filters only `pillar: "hiking"` posts.

## Local start

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`

## Deploy to Vercel

1. Create a GitHub repository
2. Upload this project
3. Go to Vercel
4. Import the GitHub repository
5. Vercel will detect Next.js automatically
6. Click deploy

## Important before going live

Replace these placeholders first:

- `lib/site.js` → legal data, domain, email, phone, GTM ID, GA4 ID
- legal page text in `app/privacy-policy/page.js`, `app/cookies/page.js`, `app/impressum/page.js`
- placeholder image files in `public/images/`

## Add a new blog post

Create a new file, for example:

```text
content/blog/hiking/new-post-name.mdx
```

Use frontmatter like this:

```md
---
title: "Your post title"
slug: "your-post-title"
pillar: "hiking"
date: "2026-03-26"
author: "TrailNorth Editorial"
excerpt: "Short preview text for cards and archive pages."
featuredImage: "/images/your-image.svg"
readTime: "8 min read"
tags:
  - Hiking
  - Gear
---

Your article content here.
```

The new post will then appear automatically:

- on `/blog`
- on `/hiking` if `pillar: "hiking"`

## Notes on the cookie banner

The banner stores consent in localStorage and is prepared to load GTM/GA4 only after consent.
Before production use, you should verify the implementation and legal wording for your exact setup.
