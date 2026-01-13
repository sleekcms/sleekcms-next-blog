# SleekCMS Next.js Blog

A server-side rendered blog built with Next.js and SleekCMS, optimized for Vercel deployment.

## Features

- **Incremental Static Regeneration (ISR)** - Pages are statically generated and automatically revalidated every 60 seconds
- **Dynamic routing** - `/blog/[slug]` pages for each blog post
- **SEO optimized** - Automatic metadata generation for each post
- **Responsive design** - Clean, minimal styling out of the box

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure SleekCMS

Edit `app/lib/sleekcms.ts` and update SleekCMS site token. Since these are read-only tokens for fetching content, and your content structure is determined by it, it's best to hard-code them instead of using via an environment variable.

Get your site token from the SleekCMS publish page.

### 3. CMS Content Structure

Your SleekCMS should have a page collection with path `/blog` and following fields:

| Field | Type | Description |
|-------|------|-------------|
| `title` | Text | Blog post title |
| `image` | Image | Featured image URL |
| `content` | HTML | Blog post content |

Also create a home page with path '/'. Add following fileds:
| Field | Type | Description |
|-------|------|-------------|
| `title` | Text | Blog title |
| `sub_title` | Text | Sub title |

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

1. Push your code to a Git repository
2. Import the project in [Vercel](https://vercel.com)
3. Deploy!

The blog will automatically revalidate content every 60 seconds without needing to redeploy.

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx             # Home page (blog list)
│   ├── globals.css          # Global styles
│   └── blog/
│       └── [slug]/
│           └── page.tsx     # Individual blog post
├── lib/
│   └── sleekcms.ts          # SleekCMS client helper
├── next.config.js           # Next.js configuration
└── package.json
```

## Customization

### Change revalidation interval

Edit `revalidate` in [app/page.tsx](app/page.tsx) and [app/blog/[slug]/page.tsx](app/blog/%5Bslug%5D/page.tsx):

```tsx
// Revalidate every hour instead of every minute
export const revalidate = 3600
```

### Styling

Edit [app/globals.css](app/globals.css) to customize the design.
