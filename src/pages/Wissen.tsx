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
        <p className="font-mono text-xs tracking-[0.18em] text-vermillion uppercase mb-3">
          Wissen
        </p>
        <h1 className="text-4xl text-ink mb-4 leading-tight">
          Hintergrundwissen<br />für den Kauf
        </h1>
        <p className="text-lg text-asphalt max-w-xl leading-relaxed">
          Drei Themen, die den Unterschied machen: Kategorien, Motoren und was 2026 neu kommt.
        </p>
      </div>

      {/* ── Tiles ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {TILES.map(({ to, label, beschreibung, tag }) => (
          <Link
            key={to}
            to={to}
            className="group flex flex-col bg-paper border border-rule rounded-none overflow-hidden hover:border-vermillion transition-colors"
          >
            <div className="px-5 pt-5 pb-4 flex-1">
              <span className="font-mono text-[10px] tracking-[0.18em] text-vermillion uppercase">
                {tag}
              </span>
              <h2 className="text-base text-ink mt-2 mb-2 leading-snug">{label}</h2>
              <p className="text-sm text-asphalt leading-relaxed">{beschreibung}</p>
            </div>
            <div className="px-5 py-3 border-t border-rule flex items-center justify-between">
              <span className="text-xs text-vermillion">Lesen</span>
              <ArrowRight
                size={14}
                className="text-concrete group-hover:text-vermillion group-hover:translate-x-0.5 transition-all"
              />
            </div>
          </Link>
        ))}
      </div>

      {/* ── CTA ── */}
      <div className="border-t border-rule pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-ink-soft font-medium">Bereit, Bikes zu vergleichen?</p>
        <Link
          to="/bikes"
          className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-none bg-vermillion text-paper hover:bg-vermillion-deep transition-colors"
        >
          Alle Bikes ansehen
        </Link>
      </div>

    </div>
  )
}
