import Link from "next/link";
import { cmsClient } from "@/lib/sleekcms";

// Disable Next.js fetch caching to always get fresh content from CMS
export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const client = cmsClient();
  const posts = await client.getPages("/blog/");

  return (
    <div>
      {posts && posts.length > 0 ? (
        <ul className="flex flex-col divide-y divide-neutral-200">
          {posts.map((post: any) => (
            <li key={post._path}>
              <Link
                href={post._path}
                className="group flex items-center gap-4 py-4 px-1 hover:bg-neutral-50 transition-colors"
              >
                <span className="flex items-center justify-center w-10 h-10 rounded bg-neutral-100 overflow-hidden border border-neutral-200">
                  {post.image?.url ? (
                    <img
                      src={post.image.url}
                      alt={post.title}
                      className="w-8 h-8 object-cover rounded"
                    />
                  ) : (
                    <svg className="w-6 h-6 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  )}
                </span>
                <span className="flex-1 min-w-0">
                  <h2 className="text-base font-medium text-neutral-900 truncate group-hover:text-blue-700 transition-colors">{post.title}</h2>
                </span>
                <span className="text-xs text-blue-600 group-hover:text-blue-700 transition-colors ml-2">Read more →</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center py-16">
          <p className="text-neutral-500">No blog posts yet. Add some content in your SleekCMS dashboard.</p>
        </div>
      )}
    </div>
  );
}
