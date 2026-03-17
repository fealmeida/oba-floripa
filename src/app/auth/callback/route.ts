import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

/**
 * Rota de callback para OAuth e magic link.
 * Troca o code da URL pela sessão e grava nos cookies; redireciona para /admin.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/admin'

  if (!code) {
    return NextResponse.redirect(new URL('/admin/login?error=missing_code', request.url))
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    return NextResponse.redirect(new URL(`/admin/login?error=${encodeURIComponent(error.message)}`, request.url))
  }

  return NextResponse.redirect(new URL(next, request.url))
}
