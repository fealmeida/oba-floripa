import type { Metadata } from 'next'
import Link from 'next/link'
import { AdminLoginForm } from './AdminLoginForm'

export const metadata: Metadata = {
  title: 'Login – Admin OBA Floripa',
  description: 'Acesso ao painel administrativo.',
}

type Props = {
  searchParams: Promise<{ error?: string }>
}

export default async function AdminLoginPage({ searchParams }: Props) {
  const params = await searchParams
  const errorFromUrl = params.error

  return (
    <div className="min-h-screen bg-[#FFF5EC] flex flex-col items-center justify-center px-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <h1
            className="text-[#1A1A1A] text-2xl font-bold tracking-tight"
            style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800 }}
          >
            Admin – OBA Floripa
          </h1>
          <p className="mt-2 text-[#555] text-sm">Entre com seu e-mail e senha.</p>
        </div>

        <AdminLoginForm errorFromUrl={errorFromUrl} />

        <p className="text-center">
          <Link
            href="/"
            className="text-[#FF5500] hover:text-[#FF5500]/80 text-sm font-medium"
          >
            ← Voltar ao site
          </Link>
        </p>
      </div>
    </div>
  )
}
