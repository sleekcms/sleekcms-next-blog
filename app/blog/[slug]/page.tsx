import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getSleekClient, BlogPost } from '@/lib/sleekcms'

// Disable Next.js fetch caching to always get fresh content from CMS
export const fetchCache = 'force-no-store'
export const dynamic = 'force-dynamic'

// Allow new slugs to be generated on-demand
export const dynamicParams = true

type Props = {
  params: Promise<{ slug: string }>
}

// Pre-render known posts at build time
export async function generateStaticParams() {
  try {
    const client = getSleekClient()
    const slugs = await client.getSlugs('/blog')

    return slugs.map((slug: string) => ({
      slug,
    }))
  } catch (error) {
    // If CMS is unavailable during build, return empty array
    // New posts will be generated on-demand thanks to dynamicParams = true
    console.warn('Could not fetch slugs from CMS:', error)
    return []
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const client = getSleekClient()
  const post = (await client.getPage(`/blog/${slug}`)) as BlogPost | null

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.title,
    openGraph: {
      title: post.title,
      images: post.image ? [post.image] : [],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const client = getSleekClient()
  const post = (await client.getPage(`/blog/${slug}`)) as BlogPost | null

  if (!post) {
    notFound()
  }

  return (
    <article>
      <Link 
        href="/" 
        className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-900 transition-colors mb-8"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to all posts
      </Link>

      <header className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900 mb-4">
          {post.title}
        </h1>
      </header>

      {post.image && (
        <Image
          src={post.image.url}
          alt={post.title}
          width={800}
          height={400}
          className="w-full h-auto rounded-xl mb-10 shadow-sm"
          priority
        />
      )}

      {post.content && (
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      )}
    </article>
  )
}
