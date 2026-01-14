import { createAsyncClient } from '@sleekcms/client'

export function getSleekClient() {
  return createAsyncClient({
    siteToken: "pub-2kzel-5d6ab732e37c4a2ea36ae91ccc509577", // OK to publicly expose
    resolveEnv: true,
    env: "latest",
    cacheMinutes: 1,
  })
}
