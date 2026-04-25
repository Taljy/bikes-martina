import sharp from 'sharp'
import { readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const svgPath = path.join(ROOT, 'public', 'icon-mtb.svg')
const svgBuffer = readFileSync(svgPath)

const sizes = [
  { size: 64, out: 'favicon.png' },
  { size: 32, out: 'favicon-32.png' },
]

for (const { size, out } of sizes) {
  const destPath = path.join(ROOT, 'public', out)
  await sharp(svgBuffer, { density: 300 })
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(destPath)
  console.log(`✓ ${out} (${size}×${size}px)`)
}

console.log('Fertig.')
