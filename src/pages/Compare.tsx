import { useMemo, useEffect } from 'react'
import { useSearchParams, Link, useNavigate } from 'react-router-dom'
import { X, Plus, Bike, ExternalLink } from 'lucide-react'
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts'
import bikesData from '@/data/bikes.json'
import type { Bike as BikeType, BewertungKategorien } from '@/types/bike'
import { formatChf, formatEur, motorKurzname } from '@/lib/format'
import { useCompare } from '@/context/CompareContext'

const ALL_BIKES = bikesData as BikeType[]

// ── Radar-Score-Berechnung ────────────────────────────────

const BIKE_COLORS = ['#C5382C', '#5E8B82', '#7A8A5C']

function radarScores(b: BikeType) {
  const nm = b.motor.drehmoment_nm
  const bergauf =
    nm === null ? 5 : nm >= 100 ? 9 : nm >= 85 ? 8 : nm >= 75 ? 7 : 6

  // Altes Schema: federweg.hinten_mm — Neues Schema: federweg_hinten (flat)
  const fw = b.federweg?.hinten_mm ?? b.federweg_hinten ?? 150
  const bergab = fw >= 170 ? 9 : fw >= 160 ? 8 : fw >= 150 ? 7 : 6

  const komfort = Math.min(9, Math.round((fw / 20) * 10) / 10)

  // Altes Schema: passend_fuer_martina_score — Neues Schema: score
  const preisLeistung = b.passend_fuer_martina_score ?? b.score ?? 5

  const gkg = b.gewicht_kg
  const gewicht =
    gkg === null ? 5 : gkg <= 22 ? 9 : gkg <= 23 ? 8 : gkg <= 24 ? 7 : 6

  const wh = b.akku.kapazitaet_wh
  const akku =
    wh === null ? 5 : wh >= 800 ? 9 : wh >= 700 ? 8 : wh >= 600 ? 7 : 6

  return { bergauf, bergab, komfort, preisLeistung, gewicht, akku }
}

function buildRadarData(bikes: BikeType[]) {
  const achsen = [
    { key: 'bergauf',       label: 'Bergauf' },
    { key: 'bergab',        label: 'Bergab' },
    { key: 'komfort',       label: 'Komfort' },
    { key: 'preisLeistung', label: 'Preis-Leistung' },
    { key: 'gewicht',       label: 'Gewicht' },
    { key: 'akku',          label: 'Akku-Reichweite' },
  ] as const

  return achsen.map(({ key, label }) => {
    const row: Record<string, string | number> = { achse: label }
    bikes.forEach((b, i) => {
      row[`bike${i}`] = radarScores(b)[key]
    })
    return row
  })
}

// ── Bewertungs-Radar (kurierte Werte) ─────────────────────

const BEWERTUNG_ACHSEN: { key: keyof BewertungKategorien; label: string }[] = [
  { key: 'geometrie_rahmengroesse',  label: 'Rahmegrössi'         },
  { key: 'einsteigerfreundlichkeit', label: 'Einsteiger-tauglich' },
  { key: 'bergauf_touren',           label: 'Bergauf / Toure'     },
  { key: 'bikepark_reserve',         label: 'Bikepark-Reserve'    },
  { key: 'gewicht_handling',         label: 'Gwicht / Handling'   },
  { key: 'preis_leistung',           label: 'Priis-Leistig'       },
  { key: 'service_haendlernetz_ch',  label: 'Service CH'          },
  { key: 'risiko_datenunsicherheit', label: 'Date-Sicherheit'     },
]

function buildBewertungRadarData(bikes: BikeType[]) {
  return BEWERTUNG_ACHSEN.map(({ key, label }) => {
    const row: Record<string, string | number> = { achse: label }
    bikes.forEach((b, i) => {
      row[`bike${i}`] = b.bewertung_kategorien![key]
    })
    return row
  })
}

function BewertungVergleichRadar({ bikes }: { bikes: BikeType[] }) {
  const data = useMemo(() => buildBewertungRadarData(bikes), [bikes])

  return (
    <div className="bg-paper border border-rule rounded-none overflow-hidden">
      <div className="px-6 py-3 border-b border-rule bg-paper-deep">
        <p className="font-mono text-xs tracking-[0.18em] text-concrete uppercase">
          Bewertung im Überblick
        </p>
      </div>
      <div className="px-6 py-6">
        <ResponsiveContainer width="100%" height={320}>
          <RadarChart data={data} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
            <PolarGrid stroke="#e7e5e4" />
            <PolarAngleAxis
              dataKey="achse"
              tick={{ fontSize: 12, fill: '#78716c' }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 10]}
              tickCount={6}
              tick={{ fontSize: 10, fill: '#a8a29e' }}
              tickFormatter={v => v === 0 ? '' : String(v)}
            />
            {bikes.map((_, i) => (
              <Radar
                key={i}
                name={`bike${i}`}
                dataKey={`bike${i}`}
                stroke={BIKE_COLORS[i]}
                fill={BIKE_COLORS[i]}
                fillOpacity={0.15}
                strokeWidth={2}
              />
            ))}
          </RadarChart>
        </ResponsiveContainer>

        <div className="flex flex-wrap justify-center gap-5 mt-2">
          {bikes.map((bike, i) => (
            <div key={bike.id} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: BIKE_COLORS[i] }}
              />
              <span className="text-xs text-ink-soft">
                {bike.hersteller} {bike.modell}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Radar-Chart-Komponente ────────────────────────────────

function BikeRadarChart({ bikes }: { bikes: BikeType[] }) {
  const data = useMemo(() => buildRadarData(bikes), [bikes])

  return (
    <div className="bg-paper border border-rule rounded-none overflow-hidden">
      <div className="px-6 py-3 border-b border-rule bg-paper-deep">
        <p className="font-mono text-xs tracking-[0.18em] text-concrete uppercase">
          Fähigkeiten im Überblick
        </p>
      </div>
      <div className="px-6 py-6">
        <ResponsiveContainer width="100%" height={320}>
          <RadarChart data={data} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
            <PolarGrid stroke="#e7e5e4" />
            <PolarAngleAxis
              dataKey="achse"
              tick={{ fontSize: 12, fill: '#78716c' }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 10]}
              tickCount={6}
              tick={{ fontSize: 10, fill: '#a8a29e' }}
              tickFormatter={v => v === 0 ? '' : String(v)}
            />
            {bikes.map((_, i) => (
              <Radar
                key={i}
                name={`bike${i}`}
                dataKey={`bike${i}`}
                stroke={BIKE_COLORS[i]}
                fill={BIKE_COLORS[i]}
                fillOpacity={0.15}
                strokeWidth={2}
              />
            ))}
          </RadarChart>
        </ResponsiveContainer>

        {/* Legende */}
        <div className="flex flex-wrap justify-center gap-5 mt-2">
          {bikes.map((bike, i) => (
            <div key={bike.id} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: BIKE_COLORS[i] }}
              />
              <span className="text-xs text-ink-soft">
                {bike.hersteller} {bike.modell}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const MAX_BIKES = 3

function v(x: string | number | null | undefined): string {
  if (x === null || x === undefined || x === 'NOT_SPECIFIED') return '–'
  return String(x)
}
function bool(x: boolean): string { return x ? 'Ja' : 'Nein' }
function mm(x: number | null): string { return x !== null ? `${x} mm` : '–' }
function deg(x: number | null): string { return x !== null ? `${x}°` : '–' }
function kg(x: number | null): string { return x !== null ? `${x} kg` : '–' }

// ── Spec-Zeilen-Definition ────────────────────────────────
interface SpecRow {
  gruppe: string
  label: string
  get: (b: BikeType) => string | React.ReactNode
  // Für Highlighting: Rohzahl extrahieren + Richtung
  num?: (b: BikeType) => number | null
  highlight?: 'max' | 'min'
}

const SPEC_ROWS: SpecRow[] = [
  // Preis & Score — unterstützt altes + neues Schema
  {
    gruppe: 'Preis & Bewertung', label: 'Preis CHF',
    get: b => {
      const chf = b.preis_chf ?? b.preise?.uvp_chf ?? null
      const eur = b.preis_eur ?? b.preise?.uvp_eur ?? null
      return chf ? formatChf(chf) : eur ? formatEur(eur) : '–'
    },
    num: b => {
      const chf = b.preis_chf ?? b.preise?.uvp_chf ?? null
      const eur = b.preis_eur ?? b.preise?.uvp_eur ?? null
      return chf ?? (eur ? Math.round(eur * 1.05) : null)
    },
    highlight: 'min',
  },
  {
    gruppe: 'Preis & Bewertung', label: 'Score Martina',
    get: b => `${b.passend_fuer_martina_score ?? b.score ?? '–'} / 10`,
    num: b => b.passend_fuer_martina_score ?? b.score ?? null,
    highlight: 'max',
  },
  { gruppe: 'Preis & Bewertung', label: 'Kategorie', get: b => v(b.kategorie ?? b.konzept) },

  // Motor & Akku
  { gruppe: 'Antrieb', label: 'Motor', get: b => motorKurzname(b.motor.hersteller, b.motor.modell) },
  {
    gruppe: 'Antrieb', label: 'Drehmoment',
    get: b => `${b.motor.drehmoment_nm} Nm`,
    num: b => b.motor.drehmoment_nm,
    highlight: 'max',
  },
  {
    gruppe: 'Antrieb', label: 'Spitzenleistung',
    get: b => `${b.motor.leistung_spitze_w} W`,
    num: b => b.motor.leistung_spitze_w,
    highlight: 'max',
  },
  {
    gruppe: 'Antrieb', label: 'Akku',
    get: b => `${b.akku.kapazitaet_wh} Wh`,
    num: b => b.akku.kapazitaet_wh,
    highlight: 'max',
  },
  { gruppe: 'Antrieb', label: 'Akku wechselbar', get: b => bool(b.akku.wechselbar) },
  { gruppe: 'Antrieb', label: 'Range Extender', get: b => bool(b.akku.range_extender_optional) },

  // Fahrwerk — altes Schema: federweg.{vorne_mm,hinten_mm,gabel_modell,daempfer_modell}
  //             neues Schema: federweg_vorne, federweg_hinten (flat)
  { gruppe: 'Fahrwerk', label: 'Federweg vorne', get: b => mm(b.federweg?.vorne_mm ?? b.federweg_vorne ?? null) },
  { gruppe: 'Fahrwerk', label: 'Federweg hinten', get: b => mm(b.federweg?.hinten_mm ?? b.federweg_hinten ?? null) },
  { gruppe: 'Fahrwerk', label: 'Gabel', get: b => v(b.federweg?.gabel_modell) },
  { gruppe: 'Fahrwerk', label: 'Dämpfer', get: b => v(b.federweg?.daempfer_modell) },

  // Rahmen & Geometrie — altes Schema: rahmen.{material,...} — neues Schema: rahmen_material (flat)
  { gruppe: 'Rahmen & Geometrie', label: 'Material', get: b => v(b.rahmen?.material ?? b.rahmen_material) },
  { gruppe: 'Rahmen & Geometrie', label: 'Lenkwinkel', get: b => deg(b.rahmen?.lenkwinkel_grad ?? null) },
  { gruppe: 'Rahmen & Geometrie', label: 'Sitzwinkel (eff.)', get: b => deg(b.rahmen?.sitzwinkel_effektiv_grad ?? null) },
  { gruppe: 'Rahmen & Geometrie', label: 'Reach L', get: b => mm(b.rahmen?.groesse_L_reach_mm ?? null) },
  { gruppe: 'Rahmen & Geometrie', label: 'Stack L', get: b => mm(b.rahmen?.groesse_L_stack_mm ?? null) },
  { gruppe: 'Rahmen & Geometrie', label: 'Kettenstrebe', get: b => mm(b.rahmen?.kettenstrebe_mm ?? null) },

  // Gewicht & Räder
  {
    gruppe: 'Gewicht & Räder', label: 'Gewicht',
    get: b => kg(b.gewicht_kg),
    num: b => b.gewicht_kg,
    highlight: 'min',
  },
  { gruppe: 'Gewicht & Räder', label: 'Laufradgrösse', get: b => v(b.laufradgroesse) },

  // Ausstattung — Texte, kein Highlight
  { gruppe: 'Ausstattung', label: 'Schaltung', get: b => v(b.ausstattung.schaltung) },
  { gruppe: 'Ausstattung', label: 'Bremsen', get: b => v(b.ausstattung.bremsen) },
]

// ── Hilfsfunktionen ───────────────────────────────────────

function gruppen(rows: SpecRow[]): string[] {
  return [...new Set(rows.map(r => r.gruppe))]
}

// Gibt für jede Bike-Spalte zurück ob sie highlighten soll
function highlightedIndices(row: SpecRow, bikes: BikeType[]): Set<number> {
  if (!row.highlight || !row.num) return new Set()
  const nums = bikes.map(b => row.num!(b))
  const valid = nums.filter((n): n is number => n !== null)
  if (valid.length < 2) return new Set() // kein Vergleich bei nur einem Bike
  const target = row.highlight === 'max' ? Math.max(...valid) : Math.min(...valid)
  return new Set(nums.map((n, i) => (n === target ? i : -1)).filter(i => i >= 0))
}

// ── Bike-Header-Card ──────────────────────────────────────

function BikeHeaderCard({ bike, onRemove }: { bike: BikeType; onRemove: () => void }) {
  const _chf = bike.preis_chf ?? bike.preise?.uvp_chf ?? null
  const _eur = bike.preis_eur ?? bike.preise?.uvp_eur ?? null
  const preis = _chf ? formatChf(_chf) : _eur ? formatEur(_eur) : null
  const bikeScore = bike.passend_fuer_martina_score ?? bike.score ?? 0

  return (
    <div className="bg-paper border border-rule rounded-none overflow-hidden flex flex-col">
      <div className="relative aspect-[4/3] bg-paper-deep flex items-center justify-center overflow-hidden p-3">
        {bike.bild_pfad ? (
          <img
            src={bike.bild_pfad}
            alt={`${bike.hersteller} ${bike.modell}`}
            className="w-full h-full object-contain"
            loading="lazy"
            onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
          />
        ) : (
          <Bike size={32} className="text-rule" strokeWidth={1.25} />
        )}
        <span className="absolute top-2 right-2 bg-vermillion text-paper text-[10px] font-mono px-2 py-0.5 rounded-none">
          {bikeScore}/10
        </span>
        <button
          onClick={onRemove}
          className="absolute top-2 left-2 w-6 h-6 rounded-sm bg-paper/80 hover:bg-paper flex items-center justify-center text-concrete hover:text-ink transition-colors"
          title="Entfernen"
        >
          <X size={12} />
        </button>
      </div>
      <div className="p-3 flex flex-col gap-1 flex-1">
        <p className="font-mono text-[10px] text-concrete tracking-[0.06em] uppercase">{bike.kategorie ?? bike.konzept}</p>
        <p className="font-display text-sm text-ink leading-snug">
          {bike.hersteller} {bike.modell}
        </p>
        <p className="font-mono text-[10px] text-concrete">{bike.modelljahr ?? bike.jahr}</p>
        {preis && <p className="font-mono text-sm text-ink">{preis}</p>}
        <Link
          to={`/bikes/${bike.id}`}
          className="inline-flex items-center gap-1 text-[10px] text-vermillion hover:underline mt-auto pt-1"
        >
          Detailseite <ExternalLink size={9} />
        </Link>
      </div>
    </div>
  )
}

// ── Leere Slot-Card ───────────────────────────────────────

function EmptySlotCard({ onAdd, usedIds }: {
  onAdd: (id: string) => void
  usedIds: string[]
}) {
  const available = ALL_BIKES.filter(b => !usedIds.includes(b.id))
  return (
    <div className="bg-paper-deep border border-dashed border-rule rounded-none flex flex-col items-center justify-center p-4 gap-3 min-h-[200px]">
      <Plus size={20} className="text-concrete" />
      <p className="text-xs text-concrete text-center">Bike hinzufügen</p>
      <select
        defaultValue=""
        onChange={e => { if (e.target.value) onAdd(e.target.value) }}
        className="w-full font-mono text-xs border border-rule rounded-none px-2 py-1.5 bg-paper text-ink focus:outline-none focus:border-vermillion cursor-pointer"
      >
        <option value="" disabled>— auswählen —</option>
        {available.map(b => (
          <option key={b.id} value={b.id}>
            {b.hersteller} {b.modell}
          </option>
        ))}
      </select>
    </div>
  )
}

// ── Hauptkomponente ───────────────────────────────────────

export default function Compare() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { syncIds, clear } = useCompare()
  const navigate = useNavigate()

  const ids = useMemo(
    () => searchParams.get('ids')?.split(',').filter(Boolean) ?? [],
    [searchParams]
  )

  // URL-Params → Context synchronisieren (beim Laden der Seite)
  useEffect(() => {
    if (ids.length > 0) syncIds(ids)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const bikes = useMemo(
    () => ids.map(id => ALL_BIKES.find(b => b.id === id)).filter(Boolean) as BikeType[],
    [ids]
  )

  function addBike(id: string) {
    if (ids.length >= MAX_BIKES || ids.includes(id)) return
    setSearchParams({ ids: [...ids, id].join(',') }, { replace: true })
  }

  function removeBike(id: string) {
    const next = ids.filter(i => i !== id)
    setSearchParams(next.length ? { ids: next.join(',') } : {}, { replace: true })
  }

  function clearAll() {
    clear()
    navigate('/vergleich', { replace: true })
  }

  const leerSlots = Math.max(0, Math.min(MAX_BIKES - bikes.length, bikes.length === 0 ? 2 : MAX_BIKES - bikes.length))
  const allGruppen = gruppen(SPEC_ROWS)

  return (
    <div className="space-y-8">

      {/* Kopfzeile */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-ink">Vergleich</h1>
          <p className="text-concrete text-sm mt-1">Bis zu 3 Bikes nebeneinander — URL ist teilbar.</p>
        </div>
        {bikes.length > 0 && (
          <button
            onClick={clearAll}
            className="font-mono text-xs text-concrete hover:text-ink transition-colors border border-rule px-3 py-1.5 rounded-none"
          >
            Vergleich leeren
          </button>
        )}
      </div>

      {/* Bike-Selector-Grid */}
      <div className={`grid gap-4 ${
        MAX_BIKES === 3 ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-2'
      }`}>
        {bikes.map(bike => (
          <BikeHeaderCard key={bike.id} bike={bike} onRemove={() => removeBike(bike.id)} />
        ))}
        {bikes.length < MAX_BIKES && Array.from({ length: leerSlots }).map((_, i) => (
          <EmptySlotCard
            key={`empty-${i}`}
            usedIds={ids}
            onAdd={addBike}
          />
        ))}
      </div>

      {/* Leerzustand */}
      {bikes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-concrete text-sm">Wähle oben mindestens zwei Bikes aus, um sie zu vergleichen.</p>
        </div>
      )}

      {/* Radar-Chart */}
      {bikes.length >= 1 && <BikeRadarChart bikes={bikes} />}

      {/* Bewertungs-Radar — nur wenn ALLE verglichenen Bikes kurierte Werte haben */}
      {bikes.length >= 1 && bikes.every(b => b.bewertung_kategorien) && (
        <BewertungVergleichRadar bikes={bikes} />
      )}

      {/* Vergleichs-Tabelle */}
      {bikes.length >= 1 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-separate border-spacing-0">
            <colgroup>
              <col className="w-40" />
              {bikes.map(b => <col key={b.id} />)}
            </colgroup>

            {allGruppen.map(gruppe => {
              const rows = SPEC_ROWS.filter(r => r.gruppe === gruppe)
              return (
                <tbody key={gruppe}>
                  {/* Gruppen-Kopf */}
                  <tr>
                    <td
                      colSpan={1 + bikes.length}
                      className="pt-8 pb-1.5 font-mono text-[10px] tracking-[0.18em] text-concrete uppercase border-b border-rule"
                    >
                      {gruppe}
                    </td>
                  </tr>

                  {rows.map(row => {
                    const highlighted = highlightedIndices(row, bikes)
                    return (
                      <tr key={row.label}>
                        <td className="py-2.5 pr-4 font-mono text-xs text-concrete border-b border-rule whitespace-nowrap">
                          {row.label}
                        </td>
                        {bikes.map((bike, bi) => (
                          <td
                            key={bike.id}
                            className={`py-2.5 px-3 border-b border-rule text-sm transition-colors ${
                              highlighted.has(bi)
                                ? 'bg-vermillion/5 text-vermillion font-medium'
                                : 'text-ink'
                            }`}
                          >
                            {row.get(bike)}
                          </td>
                        ))}
                        {Array.from({ length: MAX_BIKES - bikes.length }).map((_, i) => (
                          <td key={`empty-${i}`} className="py-2.5 px-3 border-b border-rule text-rule">—</td>
                        ))}
                      </tr>
                    )
                  })}
                </tbody>
              )
            })}
          </table>
        </div>
      )}

      {/* ── B2: Empfehlungs-Card ── */}
      {bikes.length >= 2 && (() => {
        const topScore = Math.max(...bikes.map(b => b.passend_fuer_martina_score ?? b.score ?? 0))
        const topBikes = bikes.filter(b => (b.passend_fuer_martina_score ?? b.score ?? 0) === topScore)
        const isEindeutig = topBikes.length === 1
        const winner = topBikes[0]

        return (
          <div className="bg-paper border border-rule rounded-none overflow-hidden">
            <div className="px-6 py-3 border-b border-rule bg-paper-deep">
              <p className="font-mono text-xs tracking-[0.18em] text-concrete uppercase">
                Empfehlung für Martina
              </p>
            </div>

            <div className="px-6 py-5 space-y-4">
              {isEindeutig ? (
                <>
                  <div className="flex items-start gap-4 flex-wrap">
                    <div className="flex-1 min-w-0 space-y-2">
                      <p className="font-mono text-xs text-concrete tracking-[0.18em] uppercase">Top-Treffer</p>
                      <h3 className="text-xl text-ink leading-snug">
                        {winner.hersteller} {winner.modell}
                      </h3>
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="bg-vermillion text-paper font-mono text-sm px-3 py-1 rounded-none">
                          {winner.passend_fuer_martina_score ?? winner.score ?? '–'}/10
                        </span>
                        <span className="font-mono text-sm text-asphalt">
                          {(() => {
                            const c = winner.preis_chf ?? winner.preise?.uvp_chf ?? null
                            const e = winner.preis_eur ?? winner.preise?.uvp_eur ?? null
                            return c ? formatChf(c) : e ? formatEur(e) : '–'
                          })()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-ink-soft leading-relaxed">
                    {winner.passend_fuer_martina_begruendung}
                  </p>
                  <Link
                    to={`/bikes/${winner.id}`}
                    className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-none bg-vermillion text-paper hover:bg-vermillion-deep transition-colors"
                  >
                    Zur Detail-Seite →
                  </Link>
                </>
              ) : (
                <>
                  <div className="space-y-1">
                    <p className="font-mono text-xs text-concrete tracking-[0.18em] uppercase">Kopf-an-Kopf</p>
                    <h3 className="text-lg text-ink">Mehrere Top-Treffer</h3>
                  </div>

                  <div className="space-y-3">
                    {topBikes.map((bike) => (
                      <div key={bike.id} className="flex items-center gap-3 flex-wrap">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: BIKE_COLORS[bikes.indexOf(bike)] }}
                        />
                        <span className="text-sm font-medium text-ink">
                          {bike.hersteller} {bike.modell}
                        </span>
                        <span className="bg-vermillion/10 text-vermillion font-mono text-xs px-2 py-0.5 rounded-none">
                          {bike.passend_fuer_martina_score ?? bike.score ?? '–'}/10
                        </span>
                        <Link
                          to={`/bikes/${bike.id}`}
                          className="text-sm text-vermillion hover:underline ml-auto"
                        >
                          Detail →
                        </Link>
                      </div>
                    ))}
                  </div>

                  <p className="text-sm text-concrete leading-relaxed border-t border-rule pt-4">
                    Bei gleichem Score entscheiden Nuancen. Vergleiche die Werte oben und wähle nach deinem Einsatzprofil.{' '}
                    <span className="text-ink">Bergauf-Fokus?</span> Dann wähle das Bike mit mehr Drehmoment.{' '}
                    <span className="text-ink">Bikepark-Reserven?</span> Dann mehr Federweg.
                  </p>
                </>
              )}
            </div>
          </div>
        )
      })()}

    </div>
  )
}
