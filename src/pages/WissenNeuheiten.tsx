import { Link } from 'react-router-dom'
import { Info, ExternalLink } from 'lucide-react'
import neuheitenRaw from '@/data/neuheiten.json'

interface Neuheit {
  ankuendigungs_datum: string
  hersteller: string
  modell: string
  highlight: string
  neu_vs_vorgaenger: string
  produkt_url: string
  test_url: string
  verfuegbar_ab: string
  preis_start_chf: number | null
  quelle: string
  datenstatus: 'bestaetigt' | 'unbestaetigt'
}

const neuheiten = neuheitenRaw as Neuheit[]

const MONATE: Record<string, string> = {
  '01': 'Jan', '02': 'Feb', '03': 'Mär', '04': 'Apr',
  '05': 'Mai', '06': 'Jun', '07': 'Jul', '08': 'Aug',
  '09': 'Sep', '10': 'Okt', '11': 'Nov', '12': 'Dez',
}

function formatDatum(s: string): string {
  const [year, month] = s.split('-')
  return `${MONATE[month] ?? month} ${year}`
}

function formatMarker(s: string): { monat: string; jahr: string } {
  const [year, month] = s.split('-')
  return { monat: month ?? '', jahr: year ?? '' }
}

function hasUrl(s: string): boolean {
  return s.startsWith('http')
}

export default function WissenNeuheiten() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">

      {/* ── Sektion 1: Hero ── */}
      <div className="pt-2">
        <p className="text-xs font-semibold tracking-widest text-terracotta-500 uppercase mb-3">
          Wissen · Neuheiten 2026
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-stone-900 mb-4 leading-tight">
          Was ist neu in der<br />Saison 2026?
        </h1>
        <p className="text-lg text-stone-500 max-w-xl leading-relaxed">
          Die wichtigsten E-MTB-Launches der aktuellen Saison, chronologisch sortiert.
          Mit einem Hinweis, welche Angaben bereits bestätigt und welche noch spekulativ sind.
        </p>
      </div>

      {/* ── Sektion 2: Info-Box Datenstatus ── */}
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-5 flex gap-4">
        <Info size={18} className="text-blue-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-semibold tracking-widest text-blue-500 uppercase mb-1.5">Datenstatus</p>
          <p className="text-sm text-blue-900 leading-relaxed">
            Einträge mit Status «Unbestätigt» basieren auf Vorabberichten oder unvollständigen
            Herstellerangaben. Vor dem Kauf immer direkt beim Hersteller gegenprüfen.
          </p>
        </div>
      </div>

      {/* ── Sektion 3: Zeitachse ── */}
      <div className="relative">
        {/* Vertikale Verbindungslinie */}
        <div className="absolute left-[52px] top-3 bottom-3 w-px bg-stone-200" aria-hidden="true" />

        <div className="space-y-5">
          {neuheiten.map((n, i) => {
            const { monat, jahr } = formatMarker(n.ankuendigungs_datum)
            const unbestaetigt = n.datenstatus === 'unbestaetigt'
            return (
              <div key={i} className="relative flex gap-5 items-start">

                {/* Zeitmarker links */}
                <div className="relative shrink-0 w-[52px] flex flex-col items-center pt-4 gap-1">
                  <span className="text-[10px] font-semibold text-stone-500 leading-none">{monat}</span>
                  <span className="text-[10px] text-stone-400 leading-none">{jahr}</span>
                  <span className="mt-1 w-2.5 h-2.5 rounded-full bg-stone-300 ring-2 ring-white" />
                </div>

                {/* Card */}
                <div className="flex-1 bg-white border border-stone-200 rounded-xl overflow-hidden mb-1">
                  {/* Card Header */}
                  <div className="px-5 pt-4 pb-3 border-b border-stone-100">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-xs text-stone-400 mb-0.5">{n.hersteller}</p>
                        <h2 className="text-base font-bold text-stone-900 leading-snug">{n.modell}</h2>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {n.preis_start_chf && (
                          <span className="text-xs text-stone-500 whitespace-nowrap">
                            ab CHF {n.preis_start_chf.toLocaleString('de-CH')}
                          </span>
                        )}
                        {unbestaetigt && (
                          <span className="text-xs font-semibold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full whitespace-nowrap">
                            Unbestätigt
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="px-5 py-4 space-y-2.5">
                    <p className="text-sm font-semibold text-terracotta-600 leading-snug">{n.highlight}</p>
                    <p className="text-sm text-stone-600 leading-relaxed">{n.neu_vs_vorgaenger}</p>

                    <div className="flex flex-wrap gap-x-4 gap-y-1 pt-0.5">
                      <span className="text-xs text-stone-400">
                        <span className="text-stone-500">Verfügbar ab:</span>{' '}
                        {formatDatum(n.verfuegbar_ab)}
                      </span>
                    </div>

                    {/* Links */}
                    {(hasUrl(n.produkt_url) || hasUrl(n.test_url)) && (
                      <div className="flex gap-4 pt-0.5">
                        {hasUrl(n.produkt_url) && (
                          <a
                            href={n.produkt_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-terracotta-500 hover:underline"
                          >
                            Produkt-Seite
                            <ExternalLink size={10} />
                          </a>
                        )}
                        {hasUrl(n.test_url) && (
                          <a
                            href={n.test_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-terracotta-500 hover:underline"
                          >
                            Test lesen
                            <ExternalLink size={10} />
                          </a>
                        )}
                      </div>
                    )}

                    {/* Quelle */}
                    <p className="text-[11px] text-stone-400 pt-0.5">Quelle: {n.quelle}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Sektion 4: CTA ── */}
      <div className="border-t border-stone-100 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-stone-600 font-medium">Jetzt Bikes vergleichen?</p>
        <div className="flex gap-3">
          <Link
            to="/bikes"
            className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg bg-terracotta-500 text-white hover:bg-terracotta-600 transition-colors"
          >
            Alle Bikes
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg border border-stone-200 text-stone-600 hover:border-terracotta-400 hover:text-terracotta-600 transition-colors"
          >
            Zurück zur Startseite
          </Link>
        </div>
      </div>

    </div>
  )
}
