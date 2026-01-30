import { createBrowserClient } from '@supabase/ssr'

function getSupabaseBrowserEnv(): { url: string; anonKey: string } {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anonKey) {
    throw new Error('Missing Supabase environment variables')
  }

  return { url, anonKey }
}

export function createSupabaseBrowserClient() {
  const { url, anonKey } = getSupabaseBrowserEnv()
  return createBrowserClient(url, anonKey)
}
