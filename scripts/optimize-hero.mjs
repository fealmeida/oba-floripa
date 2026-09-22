/**
 * Gera a versão otimizada da imagem de hero a partir do original em
 * `public/images/hero/`. Não troca a foto: só reduz dimensão e recomprime,
 * para que o otimizador do Next não precise processar um arquivo de 24 MP.
 *
 * Uso:
 *   node scripts/optimize-hero.mjs                              # regenera as imagens em uso
 *   node scripts/optimize-hero.mjs hero-12.jpg
 *   node scripts/optimize-hero.mjs hero-12.jpg --max-width=1400
 *
 * Saída: public/images/hero/optimized/<nome>.jpg
 */
import { mkdir, stat } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const SRC_DIR = 'public/images/hero'
const OUT_DIR = path.join(SRC_DIR, 'optimized')

const QUALITY = 72

/** Imagens efetivamente usadas no site, com a largura máxima que cada slot pede.
 *  O hero é full-bleed (2560px cobre retina); as outras duas ocupam ~metade da
 *  coluna, então 1600px já é generoso. */
const IN_USE = [
  { file: 'hero-26.jpg', maxWidth: 2560 }, // Hero — fundo full-bleed
  { file: 'hero-16.jpg', maxWidth: 1600 }, // About — foto lateral 4/5
  { file: 'hero-22.jpg', maxWidth: 1600 }, // Donations — faixa h-48
]

const args = process.argv.slice(2)
const widthFlag = args.find((a) => a.startsWith('--max-width='))
const overrideWidth = widthFlag ? Number(widthFlag.split('=')[1]) : undefined
const named = args.filter((a) => !a.startsWith('--'))

const targets =
  named.length > 0
    ? named.map((file) => ({ file, maxWidth: overrideWidth ?? 2560 }))
    : IN_USE.map((t) => ({ ...t, maxWidth: overrideWidth ?? t.maxWidth }))

const kb = (bytes) => `${(bytes / 1024).toFixed(0)} KB`

await mkdir(OUT_DIR, { recursive: true })

for (const { file, maxWidth } of targets) {
  const src = path.join(SRC_DIR, file)
  const out = path.join(OUT_DIR, `${path.parse(file).name}.jpg`)

  const before = (await stat(src)).size
  const { width, height } = await sharp(src).metadata()

  await sharp(src)
    .resize({ width: Math.min(maxWidth, width), withoutEnlargement: true })
    .jpeg({ quality: QUALITY, mozjpeg: true, progressive: true })
    .toFile(out)

  const after = (await stat(out)).size
  const meta = await sharp(out).metadata()

  console.log(
    `${file}: ${width}x${height} ${kb(before)} -> ${meta.width}x${meta.height} ${kb(after)} ` +
      `(-${(100 - (after / before) * 100).toFixed(1)}%)  =>  ${out}`,
  )
}
