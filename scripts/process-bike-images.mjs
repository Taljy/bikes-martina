import sharp from 'sharp'
import { readdir, stat } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const SRC = path.join(ROOT, 'bilder')
const DEST = path.join(ROOT, 'public', 'images', 'bikes')

const mapping = {
  "cube-stereo-hybrid-one44-hpc-slx-800.jpg": "cube-stereo-hybrid-one44-hpc-slx-800-2026",
  "Amflow-PL-Carbon-2025-.jpg":               "amflow-pl-carbon-2026-budget-king",
  "canyon-spectral-on-cf8.jpg":               "canyon-spectral-on-cf-8-2026",
  "canyon-neuron-on-AL9.jpg":                 "canyon-neuron-on-al-9-2026",
  "focus-JAM-2-69.jpeg":                      "focus-jam2-69-2026",
  "cube-stereo-hybrid-one44-hpc-at-800.jpg":  "cube-stereo-hybrid-one44-hpc-at-800-2026",
  "Amflow-PL-Carbon-Pro.jpg":                 "amflow-pl-carbon-pro-2026",
  "Santa-Cruz-vala-X0-AXS-RSV.jpg":          "santa-cruz-vala-x0-axs-rsv-2026",
  "Unno-Mith-pro.jpg":                        "unno-mith-pro-2026-editors-choice",
  "Radon-Render-90.jpg":                      "radon-render-90-2026",
  "HAIBIKE-MY25-HYBE-CF-9.jpg":              "haibike-hybe-cf-9-2026",
  "Rose-Root-Miller3.jpg":                    "rose-root-miller-3-2026",
  "Orbea-Wild-H10.jpg":                       "orbea-wild-h10-2026",
  "YT-Decoy-SN.jpg":                         "yt-decoy-sn-mx-core-3-2026",
  "merida.jpg":                               "merida-eone-sixty-775-2026",
  "scott.jpg":                                "scott-patron-st-920-2026",
  "Trek-Rail-97.jpg":                         "trek-rail-plus-9-7-2026",
  "cannondale-monterra-SL.jpg":              "cannondale-moterra-sl-2026",
  "Transition-Regulator-CXXT.jpg":           "transition-regulator-cx-xt-2026",
  "cube-stereo-hybrid-one77-hpc-slx-800.jpg": "cube-stereo-hybrid-one77-hpc-slx-800-2026",
  "Giant-Trance-X-E2.jpg":                   "giant-trance-x-e-plus-2-2026",
  "canyon-spectral-onfly-cf8.jpg":           "canyon-spectral-onfly-cf-8-2026",
  "specialized-turbolevo-compalloy.jpg":     "specialized-turbo-levo-comp-alloy-2026",
}

// Verify all source files exist
const existingFiles = new Set(await readdir(SRC))
const missing = Object.keys(mapping).filter(f => !existingFiles.has(f))
if (missing.length > 0) {
  console.error('FEHLER — fehlende Quelldateien:')
  missing.forEach(f => console.error('  ✗', f))
  process.exit(1)
}

console.log(`Verarbeite ${Object.keys(mapping).length} Bilder...\n`)

let ok = 0, err = 0, totalKb = 0

for (const [src, bikeId] of Object.entries(mapping)) {
  const srcPath = path.join(SRC, src)
  const destPath = path.join(DEST, `${bikeId}.jpg`)
  try {
    await sharp(srcPath)
      .resize({ width: 1200, withoutEnlargement: true })
      .jpeg({ quality: 85, mozjpeg: true })
      .toFile(destPath)

    const { size } = await stat(destPath)
    const kb = Math.round(size / 1024)
    totalKb += kb
    console.log(`  ✓ ${src}`)
    console.log(`    → ${bikeId}.jpg  (${kb} KB)`)
    ok++
  } catch (e) {
    console.error(`  ✗ ${src}: ${e.message}`)
    err++
  }
}

console.log(`\n${'─'.repeat(60)}`)
console.log(`Erfolgreich: ${ok}   Fehler: ${err}   Gesamt: ${Math.round(totalKb / 1024 * 10) / 10} MB`)
