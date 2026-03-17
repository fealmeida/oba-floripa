'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/admin', label: 'Animais' },
  { href: '/admin/solicitacoes', label: 'Solicitações' },
] as const

export function AdminNav({ className = '' }: { className?: string }) {
  const pathname = usePathname()

  return (
    <nav
      className={`flex gap-1 w-full md:w-auto ${className}`.trim()}
      aria-label="Áreas do admin"
    >
      {links.map(({ href, label }) => {
        const isActive =
          href === '/admin'
            ? pathname === '/admin' || pathname.startsWith('/admin/animais')
            : pathname.startsWith(href)
        return (
          <Link
            key={href}
            href={href}
            className={`flex-1 md:flex-initial text-center px-3 py-2.5 sm:py-1.5 rounded-full text-sm font-semibold transition-colors min-w-0 ${
              isActive
                ? 'bg-[#FF5500]/10 text-[#FF5500]'
                : 'text-[#555] hover:text-[#1A1A1A] hover:bg-[#E5E7EB]/50'
            }`}
          >
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
