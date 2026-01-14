# SleekCMS Next.js Blog Template

A simple, production-ready blog built with **Next.js** and **SleekCMS**.  
It uses static generation with automatic revalidation and is optimized for deployment on Vercel.

This template is ideal if you want to manage blog content in SleekCMS while keeping full control over your frontend.

👉 **New to SleekCMS?**  
Create a free account at **https://app.sleekcms.com** to get your site token and start managing content.

---

## What You Get

- **Static generation with ISR**  
  Pages are statically generated and automatically revalidated every 60 seconds.

- **Dynamic blog routes**  
  Blog posts are rendered from `/blog/[slug]`.

- **Minimal, responsive UI**  
  Clean defaults that are easy to customize.

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

---

### 2. Create a SleekCMS site

1. Sign up at **https://app.sleekcms.com**
2. Create a new **Content Site**
3. Publish your content and copy the **Site Token** from the Publish page

---

### 3. Configure SleekCMS in the project

Open:

```
app/lib/sleekcms.ts
```

Replace the site token with your own:

```ts
siteToken: 'YOUR_SITE_TOKEN'
```

> ℹ️ This project uses **read-only tokens** for fetching content.  
> Since the content structure depends on the token, it’s recommended to hard-code it instead of using environment variables.

---

## Content Structure in SleekCMS

### Blog pages

Create a **Page Collection** with:

- **Path:** `/blog`

| Field    | Type  | Description            |
|---------|-------|------------------------|
| title   | Text  | Blog post title        |
| image   | Image | Featured image         |
| content | HTML  | Blog post body content |

Each page under `/blog` becomes a blog post.

---

### Home page

Create a **Page** with:

- **Path:** `/`

| Field     | Type | Description    |
|-----------|------|----------------|
| title     | Text | Blog title    |
| sub_title | Text | Blog subtitle |

---

## Run Locally

```bash
npm run dev
```

Open your browser at  
http://localhost:3000

---

## Deploy to Vercel

1. Push this repository to GitHub
2. Import the project into **Vercel**
3. Deploy

Content updates in SleekCMS will automatically appear on your site within 60 seconds—no redeploy needed.

---

## Project Structure

```
├── app/
│   ├── layout.tsx        # Root layout and metadata
│   ├── page.tsx          # Home page (blog list)
│   ├── globals.css       # Global styles
│   └── blog/
│       └── [slug]/
│           └── page.tsx  # Individual blog post
├── lib/
│   └── sleekcms.ts       # SleekCMS client setup
├── next.config.js
└── package.json
```

---

## Customization

### Change the revalidation interval

By default, pages revalidate every **60 seconds**.

Edit:
- `app/page.tsx`
- `app/blog/[slug]/page.tsx`

Example: revalidate every hour

```ts
export const revalidate = 3600
```

---

## Learn More

- SleekCMS Dashboard: https://sleekcms.com  
- Next.js App Router: https://nextjs.org/docs/app

