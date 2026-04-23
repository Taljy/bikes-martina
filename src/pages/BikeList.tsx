import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import bikesData from '@/data/bikes.json'
import type { Bike } from '@/types/bike'
import type { Filters } from '@/types/filters'
import { DEFAULTS, parseFilters, filtersToParams } from '@/types/filters'
import BikeCard from '@/components/BikeCard'
import FilterSidebar from '@/components/FilterSidebar'

const ALL_BIKES = bikesData as Bike[]

const SORT_OPTIONS = [
  { value: 'score-desc',   label: 'Score (hoch → tief)' },
  { value: 'preis-asc',    label: 'Preis (günstig → teuer)' },
  { value: 'preis-desc',   label: 'Preis (teuer → günstig)' },
  { value: 'gewicht-asc',  label: 'Gewicht (leicht → schwer)' },
]

// Bikes ohne CHF-Preis: EUR × 1.05 als Schätzwert fürs Filtern.
// Bikes ohne jeglichen Preis werden nie durch den Preisfilter ausgeschlossen.
function estimatedChf(bike: Bike): number | null {
  if (bike.preis_chf) return bike.preis_chf
  if (bike.preis_eur) return Math.round(bike.preis_eur * 1.05)
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
  return bike.rahmen.material.startsWith('Carbon') ? 'carbon' : 'alu'
}

function laufradKey(bike: Bike): string {
  return bike.laufradgroesse === 'MX (Mullet)' ? 'mx' : bike.laufradgroesse
}

function applyFilters(bikes: Bike[], f: Filters): Bike[] {
  return bikes.filter(bike => {
    const chf = estimatedChf(bike)

    // Preis — unbekannte Preise werden nie ausgeschlossen
    if (chf !== null && (chf < f.preisMin || chf > f.preisMax)) return false

    // Motor
    if (f.motoren.length && !f.motoren.includes(motorKey(bike))) return false

    // Kategorie — Substring-Match (z.B. "All-Mountain" trifft "All-Mountain/Enduro")
    if (f.kategorien.length && !f.kategorien.some(k => bike.kategorie.includes(k))) return false

    // Federweg
    const fw = bike.federweg.hinten_mm
    if (fw < f.federwegMin || fw > f.federwegMax) return false

    // Rahmenmaterial
    if (f.materialien.length && !f.materialien.includes(materialKey(bike))) return false

    // Gewicht
    if (bike.gewicht_kg !== null && bike.gewicht_kg > f.gewichtMax) return false

    // Laufradgrösse
    if (f.laufraeder.length && !f.laufraeder.includes(laufradKey(bike))) return false

    // Budget-Toggle
    if (f.nurBudget) {
      if (chf === null || chf < 3500 || chf > 6500) return false
    }

    // Score
    if (f.nurScoreMin7 && bike.passend_fuer_martina_score < 7) return false

    return true
  })
}

function applySorting(bikes: Bike[], sort: string): Bike[] {
  const sorted = [...bikes]
  switch (sort) {
    case 'score-desc':
      return sorted.sort((a, b) => b.passend_fuer_martina_score - a.passend_fuer_martina_score)
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

  const filters = useMemo(() => parseFilters(searchParams), [searchParams])

  const setFilters = (next: Filters) => {
    setSearchParams(filtersToParams(next), { replace: true })
  }

  const filtered = useMemo(() => applyFilters(ALL_BIKES, filters), [filters])
  const sorted = useMemo(() => applySorting(filtered, filters.sort), [filtered, filters.sort])

  return (
    <div className="flex gap-8 items-start">

      {/* Filter-Sidebar */}
      <aside className="w-[280px] shrink-0 sticky top-20 max-h-[calc(100vh-5rem)] overflow-y-auto pb-10 pr-1">
        <FilterSidebar
          filters={filters}
          onChange={setFilters}
          filtered={filtered.length}
          total={ALL_BIKES.length}
        />
      </aside>

      {/* Hauptbereich */}
      <div className="flex-1 min-w-0">

        {/* Kopfzeile mit Sortierung */}
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-xl font-semibold text-stone-900 tracking-tight">Alle Bikes</h1>
          <select
            value={filters.sort}
            onChange={e => setFilters({ ...filters, sort: e.target.value })}
            className="text-sm border border-stone-200 rounded-lg px-3 py-1.5 bg-white text-stone-700 focus:outline-none focus:border-terracotta-400 cursor-pointer"
          >
            {SORT_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
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
            <p className="text-stone-400 text-sm">Keine Bikes entsprechen den Filtern.</p>
            <button
              onClick={() => setFilters(DEFAULTS)}
              className="mt-3 text-sm text-terracotta-600 hover:underline"
            >
              Filter zurücksetzen
            </button>
          </div>
        )}

      </div>
    </div>
  )
}
