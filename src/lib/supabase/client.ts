import { createBrowserClient } from '@supabase/ssr'

/**
 * Cliente Supabase para uso em Client Components e Server Actions.
 * Usa @supabase/ssr para fluxo de cookies/sessão (auth) no Next.js.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  )
}
