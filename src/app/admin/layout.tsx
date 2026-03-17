import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { logout } from '@/app/actions/auth'

export const metadata: Metadata = {
  title: 'Admin – OBA Floripa',
  description: 'Painel de gestão de animais para adoção.',
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  const isLoggedIn = Boolean(data?.claims?.sub)

  return (
    <div className="min-h-screen bg-[#FFF5EC]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
      {/* Barra superior com identidade do site */}
      <header className="sticky top-0 z-40 border-b border-[#E5E7EB] bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="h-1 bg-gradient-to-r from-[#FF5500] via-[#FFB800] to-[#FF6B9D]" />
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1
            className="text-[#1A1A1A] text-xl font-bold tracking-tight"
            style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800 }}
          >
            Admin – OBA Floripa
          </h1>
          <div className="flex items-center gap-4">
            {isLoggedIn && (
              <form action={logout}>
                <button
                  type="submit"
                  className="text-[#555] hover:text-[#1A1A1A] font-semibold text-sm uppercase tracking-widest transition-colors"
                >
                  Sair
                </button>
              </form>
            )}
            <Link
              href="/"
              className="text-[#FF5500] hover:text-[#FF5500]/80 font-semibold text-sm uppercase tracking-widest transition-colors"
            >
              ← Voltar ao site
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
    </div>
  )
}
