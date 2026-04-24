import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const TILES = [
  {
    to: '/wissen/trail-vs-enduro',
    label: 'Trail vs. Enduro',
    beschreibung: 'Federweg, Geometrie, Einsatzprofil — welche Kategorie passt wozu?',
    tag: 'Kategorie',
  },
  {
    to: '/wissen/motoren',
    label: 'Bosch, Shimano oder DJI?',
    beschreibung: 'Drehmoment, Nachlauf, App — die drei relevanten Motorsysteme im Direktvergleich.',
    tag: 'Antrieb',
  },
  {
    to: '/wissen/neuheiten-2026',
    label: 'Neuheiten 2026',
    beschreibung: 'Die wichtigsten Launches der Saison, mit Statusangabe: bestätigt oder spekulativ.',
    tag: 'Aktuell',
  },
]

export default function Wissen() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">

      {/* ── Hero ── */}
      <div className="pt-2">
        <p className="text-xs font-semibold tracking-widest text-terracotta-500 uppercase mb-3">
          Wissen
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-stone-900 mb-4 leading-tight">
          Hintergrundwissen<br />für den Kauf
        </h1>
        <p className="text-lg text-stone-500 max-w-xl leading-relaxed">
          Drei Themen, die den Unterschied machen: Kategorien, Motoren und was 2026 neu kommt.
        </p>
      </div>

      {/* ── Tiles ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {TILES.map(({ to, label, beschreibung, tag }) => (
          <Link
            key={to}
            to={to}
            className="group flex flex-col bg-white border border-stone-200 rounded-xl overflow-hidden hover:border-terracotta-300 transition-colors"
          >
            <div className="px-5 pt-5 pb-4 flex-1">
              <span className="text-[10px] font-semibold tracking-widest text-terracotta-500 uppercase">
                {tag}
              </span>
              <h2 className="text-base font-bold text-stone-900 mt-2 mb-2 leading-snug">{label}</h2>
              <p className="text-sm text-stone-500 leading-relaxed">{beschreibung}</p>
            </div>
            <div className="px-5 py-3 border-t border-stone-100 flex items-center justify-between">
              <span className="text-xs text-terracotta-500 font-medium">Lesen</span>
              <ArrowRight
                size={14}
                className="text-zinc-400 group-hover:text-terracotta-500 group-hover:translate-x-0.5 transition-all"
              />
            </div>
          </Link>
        ))}
      </div>

      {/* ── CTA ── */}
      <div className="border-t border-stone-100 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-stone-600 font-medium">Bereit, Bikes zu vergleichen?</p>
        <Link
          to="/bikes"
          className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg bg-terracotta-500 text-white hover:bg-terracotta-600 transition-colors"
        >
          Alle Bikes ansehen
        </Link>
      </div>

    </div>
  )
}
