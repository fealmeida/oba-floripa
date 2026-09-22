import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '12mb', // upload fotos até 10 MB
    },
  },
  images: {
    // AVIF antes de WebP: ~20-30% menor na foto do hero, com fallback automático.
    formats: ['image/avif', 'image/webp'],
    // Next 16 exige declarar as qualities usadas em <Image quality={...} />.
    qualities: [60, 70, 75],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: '*.supabase.co', pathname: '/**' },
    ],
  },
}

export default nextConfig
