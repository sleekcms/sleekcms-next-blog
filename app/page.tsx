import Link from 'next/link'
import { getSleekClient, BlogPost } from '@/lib/sleekcms'

// Disable Next.js fetch caching to always get fresh content from CMS
export const fetchCache = 'force-no-store'
export const dynamic = 'force-dynamic'

export default async function HomePage() {
  let posts: BlogPost[] | null = null
  let home: any = null;

  try {
    const client = getSleekClient()
    posts = (await client.getPages('/blog/')) as BlogPost[] | null
    home = await client.getPage('/');
  } catch (error) {
    console.error('Error fetching blog posts:', error)
  }

  return (
    <div>
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900 mb-3">
            {home?.title || 'Welcome to My Blog'}
        </h1>
        { home?.sub_title && <p className="text-lg text-neutral-500">
          {home.sub_title}
        </p>}
      </div>

      {posts && posts.length > 0 ? (
        <div className="space-y-1">
          {posts.map((post) => {
            const slug = post._slug;
            return (
              <Link 
                key={post._path} 
                href={`/blog/${slug}`}
                className="group block py-4 -mx-4 px-4 rounded-lg hover:bg-neutral-100 transition-colors"
              >
                <h2 className="text-lg font-medium text-neutral-900 group-hover:text-neutral-600 transition-colors">
                  {post.title}
                </h2>
              </Link>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-neutral-500">
            No blog posts yet. Add some content in your SleekCMS dashboard.
          </p>
        </div>
      )}
    </div>
  )
}
