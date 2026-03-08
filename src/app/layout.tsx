import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'OBA Floripa',
  description: 'Adoção responsável de animais em Florianópolis. Conheça nossos animais disponíveis e faça parte dessa causa.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="antialiased overflow-x-hidden" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
