import { Inter } from 'next/font/google'
import './globals.css'
import { cmsClient } from '@/lib/sleekcms'

const inter = Inter({ subsets: ['latin'] })

export default async function RootLayout({children}: { children: React.ReactNode }) {
    const home = await cmsClient().getPage('/');
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen">
          <header className="border-b border-neutral-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
            <div className="max-w-3xl mx-auto px-6 py-4">
              <a href="/" className="text-lg font-medium text-neutral-900 hover:text-neutral-600 transition-colors">
                {home?.title || "Blog"}
              </a>
            </div>
          </header>
          <main className="max-w-3xl mx-auto px-6 py-12">{children}</main>
          <footer className="border-t border-neutral-200 mt-20">
            <div className="max-w-3xl mx-auto px-6 py-8 text-sm text-neutral-500 flex flex-row items-center justify-between gap-4">
              <span>
                Powered by{" "}
                <a href="https://app.sleekcms.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-neutral-700 transition-colors">
                  SleekCMS
                </a>{" "}
                & Next.js
              </span>
              <a
                href="https://github.com/sleekcms/sleekcms-next-blog"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-neutral-500 hover:text-black transition-colors underline"
                title="View source on GitHub">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 align-middle">
                  <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.579.688.481C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2Z" />
                </svg>
                <span>View source on GitHub</span>
              </a>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
