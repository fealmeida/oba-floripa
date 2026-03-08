import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function AdminNotFound() {
  return (
    <div className="max-w-md mx-auto text-center py-16">
      <h1
        className="text-[#1A1A1A] text-2xl font-bold mb-2"
        style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800 }}
      >
        Página não encontrada
      </h1>
      <p className="text-[#555] mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
        O conteúdo que você procura não existe ou foi removido.
      </p>
      <Link href="/admin">
        <Button
          className="rounded-full bg-[#FF5500] hover:bg-[#FF5500]/90 text-white border-0"
          style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}
        >
          Voltar ao painel
        </Button>
      </Link>
    </div>
  )
}
