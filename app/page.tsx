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
        <div className="flex flex-col gap-4">
          {posts.map((post: any) => {
            return (
              <Link
                key={post._path}
                href={post._path}
                className="group flex flex-row bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-neutral-200"
              >
                <div className="hidden sm:block w-48 md:w-64 flex-shrink-0 relative overflow-hidden bg-neutral-100">
                  {post.image?.url ? (
                    <img
                      src={post.image.url}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-400">
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex flex-col flex-1 p-4 sm:p-5 justify-center">
                  <h2 className="text-lg font-semibold text-neutral-900 group-hover:text-neutral-600 transition-colors">
                    {post.title}
                  </h2>
                  <div className="mt-2">
                    <span className="text-sm font-medium text-blue-600 group-hover:text-blue-700 transition-colors">
                      Read more →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-neutral-500">No blog posts yet. Add some content in your SleekCMS dashboard.</p>
        </div>
      )}
    </div>
  );
}
