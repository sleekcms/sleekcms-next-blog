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
          <main className="max-w-3xl mx-auto px-6 py-12">
            {children}
          </main>
          <footer className="border-t border-neutral-200 mt-20">
            <div className="max-w-3xl mx-auto px-6 py-8 text-center text-sm text-neutral-500">
              Powered by <a href="https://sleekcms.com" target="_blank" rel="noopener noreferrer">SleekCMS</a> & Next.js
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
