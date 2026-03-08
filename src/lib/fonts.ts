import { Space_Grotesk, Syne } from 'next/font/google'

/**
 * Space Grotesk: body, labels, UI (300–700).
 * Usar via className font-sans ou CSS var(--font-sans).
 */
export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

/**
 * Syne: headings, títulos, CTAs (700–800).
 * Usar via className font-heading ou CSS var(--font-heading).
 */
export const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
})
