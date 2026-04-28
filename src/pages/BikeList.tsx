import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import bikesData from '@/data/bikes.json'
import type { Bike } from '@/types/bike'
import type { Filters } from '@/types/filters'
import { DEFAULTS, parseFilters, filtersToParams } from '@/types/filters'
import BikeCard from '@/components/BikeCard'
import FilterSidebar from '@/components/FilterSidebar'

const ALL_BIKES = bikesData as Bike[]

const ALLE_JAHRE = [...new Set(ALL_BIKES.map(b => b.modelljahr ?? b.jahr ?? 0))].filter(n => n > 0).sort((a, b) => b - a)

const SORT_OPTIONS = [
  { value: 'score-desc',   label: 'Score (hoch → tief)' },
  { value: 'preis-asc',    label: 'Preis (günstig → teuer)' },
  { value: 'preis-desc',   label: 'Preis (teuer → günstig)' },
  { value: 'gewicht-asc',  label: 'Gewicht (leicht → schwer)' },
]

// Bikes ohne CHF-Preis: EUR × 1.05 als Schätzwert fürs Filtern.
// Bikes ohne jeglichen Preis werden nie durch den Preisfilter ausgeschlossen.
// Unterstützt altes Schema (preis_chf/eur) und neues Schema (preise.uvp_chf/eur).
function estimatedChf(bike: Bike): number | null {
  const chf = bike.preis_chf ?? bike.preise?.uvp_chf ?? null
  const eur = bike.preis_eur ?? bike.preise?.uvp_eur ?? null
  if (chf) return chf
  if (eur) return Math.round(eur * 1.05)
  return null
}

function motorKey(bike: Bike): string {
  const h = bike.motor.hersteller
  if (h === 'Bosch') return 'bosch'
  if (h === 'Shimano') return 'shimano'
  if (h === 'DJI') return 'dji'
  return 'andere'
}

function materialKey(bike: Bike): string {
  // Altes Schema: rahmen.material — Neues Schema: rahmen_material (flat)
  const mat = bike.rahmen?.material ?? bike.rahmen_material ?? ''
  return mat.startsWith('Carbon') ? 'carbon' : 'alu'
}

function laufradKey(bike: Bike): string {
  const lg = bike.laufradgroesse ?? ''
  return lg === 'MX (Mullet)' ? 'mx' : lg
}

function applyFilters(bikes: Bike[], f: Filters): Bike[] {
  return bikes.filter(bike => {
    const chf = estimatedChf(bike)

    // Preis — unbekannte Preise werden nie ausgeschlossen
    if (chf !== null && (chf < f.preisMin || chf > f.preisMax)) return false

    // Motor
    if (f.motoren.length && !f.motoren.includes(motorKey(bike))) return false

    // Kategorie — Substring-Match (z.B. "All-Mountain" trifft "All-Mountain/Enduro")
    // Unterstützt altes Schema (kategorie) und neues Schema (konzept)
    if (f.kategorien.length && !f.kategorien.some(k => (bike.kategorie ?? bike.konzept ?? '').includes(k))) return false

    // Federweg — altes Schema: federweg.hinten_mm — neues Schema: federweg_hinten (flat)
    const fw = bike.federweg?.hinten_mm ?? bike.federweg_hinten ?? 0
    if (fw > 0 && (fw < f.federwegMin || fw > f.federwegMax)) return false

    // Rahmenmaterial
    if (f.materialien.length && !f.materialien.includes(materialKey(bike))) return false

    // Gewicht
    if (bike.gewicht_kg !== null && bike.gewicht_kg > f.gewichtMax) return false

    // Laufradgrösse
    if (f.laufraeder.length && !f.laufraeder.includes(laufradKey(bike))) return false

    // Modelljahr — altes Schema: modelljahr — neues Schema: jahr
    const year = bike.modelljahr ?? bike.jahr ?? 0
    if (f.jahrgaenge.length && year > 0 && !f.jahrgaenge.includes(year)) return false

    // Budget-Toggle
    if (f.nurBudget) {
      if (chf === null || chf < 3500 || chf > 6500) return false
    }

    // Score — altes Schema: passend_fuer_martina_score — neues Schema: score
    const bikeScore = bike.passend_fuer_martina_score ?? bike.score ?? 0
    if (f.nurScoreMin7 && bikeScore < 7) return false

    return true
  })
}

function applySorting(bikes: Bike[], sort: string): Bike[] {
  const sorted = [...bikes]
  switch (sort) {
    case 'score-desc':
      return sorted.sort((a, b) =>
        (b.passend_fuer_martina_score ?? b.score ?? 0) - (a.passend_fuer_martina_score ?? a.score ?? 0)
      )
    case 'preis-asc':
      return sorted.sort((a, b) => (estimatedChf(a) ?? 99999) - (estimatedChf(b) ?? 99999))
    case 'preis-desc':
      return sorted.sort((a, b) => (estimatedChf(b) ?? 0) - (estimatedChf(a) ?? 0))
    case 'gewicht-asc':
      return sorted.sort((a, b) => (a.gewicht_kg ?? 99) - (b.gewicht_kg ?? 99))
    default:
      return sorted
  }
}

export default function BikeList() {
  const [searchParams, setSearchParams] = useSearchParams()

  const [searchQuery, setSearchQuery] = useState('')
  const [filterOpen, setFilterOpen] = useState(false)

  const filters = useMemo(() => parseFilters(searchParams), [searchParams])

  const setFilters = (next: Filters) => {
    setSearchParams(filtersToParams(next), { replace: true })
  }

  const filtered = useMemo(() => applyFilters(ALL_BIKES, filters), [filters])

  const searched = useMemo(() => {
    if (!searchQuery.trim()) return filtered
    const q = searchQuery.toLowerCase()
    return filtered.filter(bike =>
      bike.hersteller?.toLowerCase().includes(q) ||
      bike.modell?.toLowerCase().includes(q) ||
      `${bike.motor.hersteller} ${bike.motor.modell}`.toLowerCase().includes(q) ||
      (bike.rahmen?.material ?? bike.rahmen_material)?.toLowerCase().includes(q) ||
      (bike.kategorie ?? bike.konzept)?.toLowerCase().includes(q)
    )
  }, [filtered, searchQuery])

  const sorted = useMemo(() => applySorting(searched, filters.sort), [searched, filters.sort])

  return (
    <div className="flex flex-col md:flex-row md:gap-8 md:items-start">

      {/* Mobile Filter-Toggle */}
      <div className="flex items-center justify-between mb-3 md:hidden">
        <p className="font-mono text-xs text-concrete">
          {filtered.length} von {ALL_BIKES.length} Bikes
        </p>
        <button
          onClick={() => setFilterOpen(v => !v)}
          className="font-mono text-xs text-vermillion tracking-[0.06em] uppercase border border-rule px-4 py-2.5"
        >
          {filterOpen ? 'Schliessen' : 'Filter'}
        </button>
      </div>

      {/* Filter-Sidebar */}
      <aside className={`w-full md:w-[280px] md:shrink-0 md:sticky md:top-20 md:max-h-[calc(100vh-5rem)] overflow-y-auto pb-10 pr-1 ${filterOpen ? 'block' : 'hidden'} md:block`}>
        <FilterSidebar
          filters={filters}
          onChange={setFilters}
          filtered={filtered.length}
          total={ALL_BIKES.length}
          alleJahre={ALLE_JAHRE}
        />
      </aside>

      {/* Hauptbereich */}
      <div className="flex-1 min-w-0">

        {/* Kopfzeile mit Suche + Sortierung */}
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-2xl text-ink">Alle Bikes</h1>
          <select
            value={filters.sort}
            onChange={e => setFilters({ ...filters, sort: e.target.value })}
            className="font-mono text-xs border border-rule rounded-none px-3 py-1.5 bg-paper text-ink-soft focus:outline-none focus:border-vermillion cursor-pointer"
          >
            {SORT_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        {/* Suchfeld */}
        <div className="mb-5">
          <input
            type="search"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Such nach Marke, Modell, Motor..."
            className="w-full font-mono text-xs border border-rule rounded-none px-3 py-1.5 bg-paper text-ink placeholder:text-concrete focus:outline-none focus:border-vermillion"
          />
        </div>

        {/* Grid */}
        {sorted.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sorted.map(bike => (
              <BikeCard key={bike.id} bike={bike} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            {searchQuery.trim() ? (
              <>
                <p className="text-concrete text-sm">
                  Kei Bike gfunde für «{searchQuery}».<br />
                  Mol mit anderem Suechwort probiere oder Filter zruggsetze.
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-3 text-sm text-vermillion hover:underline"
                >
                  Suche lösche
                </button>
              </>
            ) : (
              <>
                <p className="text-concrete text-sm">Keine Bikes entsprechen den Filtern.</p>
                <button
                  onClick={() => setFilters(DEFAULTS)}
                  className="mt-3 text-sm text-vermillion hover:underline"
                >
                  Filter zurücksetzen
                </button>
              </>
            )}
          </div>
        )}

      </div>
    </div>
  )
}
