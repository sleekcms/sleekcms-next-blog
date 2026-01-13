import { createAsyncClient } from '@sleekcms/client'

export function getSleekClient() {
  return createAsyncClient({
    siteToken: "pub-2kzel-5d6ab732e37c4a2ea36ae91ccc509577", // OK to publicly expose
    resolveEnv: true,
    env: "latest",
    cacheMinutes: 1,
  })
}

// Type definitions for blog content
export interface BlogPost {
  _path: string
  _slug?: string
  title: string
  image?: {
    url: string
  }
  content?: string
  [key: string]: unknown
}
