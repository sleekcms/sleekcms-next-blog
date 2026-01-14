import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getSleekClient } from '@/lib/sleekcms'

export const fetchCache = 'force-no-store'
export const dynamic = 'force-dynamic'

export const dynamicParams = true

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const client = getSleekClient()
    const slugs = await client.getSlugs('/blog')

    return slugs.map((slug: string) => ({
      slug,
    }))
  } catch (error) {
    console.warn('Could not fetch slugs from CMS:', error)
    return []
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const client = getSleekClient()
  const post = await client.getPage(`/blog/${slug}`)

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
