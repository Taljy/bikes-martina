import { Link } from 'react-router-dom'
import { CheckCircle2, AlertCircle, Info } from 'lucide-react'
import motorenRaw from '@/data/motoren.json'

// ── Typen ─────────────────────────────────────────────────

interface Motor {
  id: string
  hersteller: string
  modell: string
  jahrgang_ab: number
  hersteller_url: string
  technik: {
    drehmoment_nm: number
    leistung_spitze_w: number
    systemgewicht_motor_kg: number
    nachlaufverhalten: string
    geraeusch_charakter: string
  }
  akku_optionen: { kapazitaet_wh: number; wechselbar: boolean }[]
  app: { name: string; funktionen: string[] }
  fahrmodi: string[]
  service_ch: { werkstattnetz_dichte: string; wartungsintervall_km: number | null }
  staerken: string[]
  schwaechen: string[]
  ideal_fuer: string
  bikes_mit_diesem_motor: string[]
}

interface DirektRow {
  kriterium: string
  bosch_cx_gen5: number | string
  shimano_ep801: number | string
  dji_avinox: number | string
}

interface Empfehlung {
  primaer: string
  begruendung: string
  sekundaer: string
  tertiaer: string
  warnung: string
}

const raw = motorenRaw as {
  motoren_vergleich_2026: {
    motoren: Motor[]
    direktvergleich: DirektRow[]
    empfehlung_fuer_martina: Empfehlung
  }
}

const { motoren, direktvergleich, empfehlung_fuer_martina } = raw.motoren_vergleich_2026

const FILTER_KEY: Record<string, string> = {
  'bosch-cx-gen5': 'bosch',
  'shimano-ep801': 'shimano',
  'dji-avinox-m1': 'dji',
}

const DV_KEYS: Array<keyof DirektRow> = ['bosch_cx_gen5', 'shimano_ep801', 'dji_avinox']

const HIGHLIGHT: Record<string, 'max' | 'min'> = {
  'Drehmoment (Nm)': 'max',
  'Spitzenleistung (W)': 'max',
  'Motorgewicht (kg)': 'min',
}

function highlightCells(row: DirektRow): Set<number> {
  const dir = HIGHLIGHT[row.kriterium]
  if (!dir) return new Set()
  const vals = DV_KEYS.map(k => Number(row[k]))
  if (vals.some(isNaN)) return new Set()
  const target = dir === 'max' ? Math.max(...vals) : Math.min(...vals)
  return new Set(vals.map((v, i) => v === target ? i : -1).filter(i => i >= 0))
}

function fixUmlauts(s: string): string {
  return s
    .replace(/fuehrer/g, 'führer').replace(/uehrer/g, 'ührer')
    .replace(/raenkt/g, 'ränkt').replace(/Eingeschraenkt/g, 'Eingeschränkt')
}

export default function WissenMotoren() {
  const emp = empfehlung_fuer_martina

  return (
    <div className="max-w-4xl mx-auto space-y-12">

      {/* ── Sektion 1: Hero ── */}
      <div className="pt-2">
        <p className="text-xs font-semibold tracking-widest text-terracotta-500 uppercase mb-3">
          Wissen · Motoren
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-stone-900 mb-4 leading-tight">
          Bosch, Shimano oder DJI?
        </h1>
        <p className="text-lg text-stone-500 max-w-xl leading-relaxed">
          Der Motor entscheidet mit über Fahrgefühl, Reichweite und Servicequalität.
          Die drei relevanten Systeme für Martina im Direktvergleich.
        </p>
      </div>

      {/* ── Sektion 2: Motor-Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {motoren.map(motor => {
          const filterKey = FILTER_KEY[motor.id]
          const count = motor.bikes_mit_diesem_motor.length
          return (
            <div
              key={motor.id}
              id={motor.id}
              className="flex flex-col bg-white border border-stone-200 rounded-xl overflow-hidden scroll-mt-24"
            >
              <div className="px-5 pt-5 pb-4 border-b border-stone-100">
                <p className="text-xs text-stone-400 mb-0.5">{motor.hersteller} · ab {motor.jahrgang_ab}</p>
                <h2 className="text-lg font-bold text-stone-900 leading-snug">{motor.modell}</h2>
                <p className="text-3xl font-bold text-terracotta-600 mt-2">
                  {motor.technik.drehmoment_nm}
                  <span className="text-base font-normal text-stone-400 ml-1">Nm</span>
                </p>
                <div className="flex gap-3 mt-1 text-xs text-stone-400">
                  <span>{motor.technik.leistung_spitze_w} W</span>
                  <span>·</span>
                  <span>{motor.technik.systemgewicht_motor_kg} kg</span>
                </div>
              </div>

              <div className="px-5 py-4 flex-1 space-y-3">
                <div className="space-y-1.5">
                  {motor.staerken.slice(0, 3).map((s, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 size={12} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-xs text-stone-600 leading-snug">{s}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-1.5">
                  {motor.schwaechen.slice(0, 2).map((s, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <AlertCircle size={12} className="text-orange-400 shrink-0 mt-0.5" />
                      <span className="text-xs text-stone-600 leading-snug">{s}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-stone-500 italic pt-1 leading-relaxed">{motor.ideal_fuer}</p>
              </div>

              <div className="px-5 py-3 border-t border-stone-100">
                {filterKey ? (
                  <Link
                    to={`/bikes?motor=${filterKey}`}
                    className="text-xs text-terracotta-500 hover:underline"
                  >
                    {count} Bike{count !== 1 ? 's' : ''} mit diesem Motor →
                  </Link>
                ) : (
                  <span className="text-xs text-stone-400">{count} Bikes mit diesem Motor</span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Sektion 3: Technik-Tabelle ── */}
      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
        <div className="px-6 py-3 border-b border-stone-100 bg-stone-50">
          <p className="text-xs font-semibold tracking-widest text-stone-400 uppercase">Technik im Vergleich</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-100">
                <th className="text-left px-6 py-3 text-stone-400 font-normal w-40">Kriterium</th>
                {motoren.map(m => (
                  <th key={m.id} className="text-left px-4 py-3 font-semibold text-stone-700">
                    {m.hersteller}
                    <span className="block text-[10px] font-normal text-stone-400">{m.modell}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {direktvergleich.map(row => {
                const hl = highlightCells(row)
                return (
                  <tr key={row.kriterium} className="border-b border-stone-50 last:border-0">
                    <td className="px-6 py-3 text-stone-400 whitespace-nowrap">{row.kriterium}</td>
                    {DV_KEYS.map((key, i) => (
                      <td
                        key={key}
                        className={`px-4 py-3 font-medium ${hl.has(i) ? 'bg-emerald-50 text-stone-800' : 'text-stone-700'}`}
                      >
                        {fixUmlauts(String(row[key]))}
                      </td>
                    ))}
                  </tr>
                )
              })}
              {[
                { label: 'Nachlaufverhalten', vals: motoren.map(m => m.technik.nachlaufverhalten) },
                { label: 'Geräusch', vals: motoren.map(m => m.technik.geraeusch_charakter) },
              ].map(({ label, vals }) => (
                <tr key={label} className="border-b border-stone-50 last:border-0">
                  <td className="px-6 py-3 text-stone-400 whitespace-nowrap">{label}</td>
                  {vals.map((val, i) => (
                    <td key={i} className="px-4 py-3 text-stone-700">{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Sektion 4: Akku-Optionen ── */}
      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
        <div className="px-6 py-3 border-b border-stone-100 bg-stone-50">
          <p className="text-xs font-semibold tracking-widest text-stone-400 uppercase">Akku-Optionen</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-stone-100">
          {motoren.map(motor => (
            <div key={motor.id} className="px-6 py-4">
              <p className="text-xs font-semibold text-stone-500 mb-2">{motor.hersteller}</p>
              <ul className="space-y-1.5">
                {motor.akku_optionen.map((akku, i) => (
                  <li key={i} className="text-sm text-stone-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-terracotta-300 shrink-0" />
                    {akku.kapazitaet_wh} Wh
                    <span className="text-xs text-stone-400">
                      ({akku.wechselbar ? 'wechselbar' : 'fest verbaut'})
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Sektion 5: Apps ── */}
      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
        <div className="px-6 py-3 border-b border-stone-100 bg-stone-50">
          <p className="text-xs font-semibold tracking-widest text-stone-400 uppercase">App und Vernetzung</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-stone-100">
          {motoren.map(motor => (
            <div key={motor.id} className="px-6 py-4 space-y-3">
              <p className="text-xs font-semibold text-stone-500">{motor.hersteller}</p>
              <p className="text-sm font-semibold text-stone-800">{motor.app.name}</p>
              <div className="flex flex-wrap gap-1.5">
                {motor.app.funktionen.map(f => (
                  <span key={f} className="text-[11px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full">{f}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Sektion 6: Empfehlung ── */}
      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
        <div className="px-6 py-3 border-b border-stone-100 bg-stone-50">
          <p className="text-xs font-semibold tracking-widest text-stone-400 uppercase">Empfehlung für Martina</p>
        </div>
        <div className="px-6 py-5 space-y-5">
          <div>
            <p className="text-xs text-stone-400 uppercase tracking-widest font-medium mb-1">Primäre Wahl</p>
            <h3 className="text-xl font-bold text-stone-900">{emp.primaer}</h3>
          </div>
          <p className="text-sm text-stone-600 leading-relaxed">{emp.begruendung}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border border-stone-100 rounded-lg p-4">
              <p className="text-[10px] font-semibold tracking-widest text-stone-400 uppercase mb-1">Sekundär</p>
              <p className="text-sm font-semibold text-stone-800">{emp.sekundaer}</p>
            </div>
            <div className="border border-stone-100 rounded-lg p-4">
              <p className="text-[10px] font-semibold tracking-widest text-stone-400 uppercase mb-1">Tertiär</p>
              <p className="text-sm font-semibold text-stone-800">{emp.tertiaer}</p>
            </div>
          </div>
          <div className="flex gap-3 rounded-lg border border-stone-200 bg-stone-50 p-4">
            <Info size={15} className="text-stone-400 shrink-0 mt-0.5" />
            <p className="text-xs text-stone-500 leading-relaxed">{emp.warnung}</p>
          </div>
        </div>
      </div>

      {/* ── Sektion 7: CTA ── */}
      <div className="border-t border-stone-100 pt-8">
        <p className="text-stone-600 font-medium mb-4">Bereit, Bikes mit diesem Motor zu sehen?</p>
        <div className="flex flex-wrap gap-3">
          <Link to="/bikes?motor=bosch" className="text-sm px-4 py-2 rounded-lg bg-terracotta-500 text-white hover:bg-terracotta-600 transition-colors">
            Alle Bosch-Bikes
          </Link>
          <Link to="/bikes?motor=shimano" className="text-sm px-4 py-2 rounded-lg border border-stone-200 text-stone-600 hover:border-terracotta-400 hover:text-terracotta-600 transition-colors">
            Alle Shimano-Bikes
          </Link>
          <Link to="/bikes?motor=dji" className="text-sm px-4 py-2 rounded-lg border border-stone-200 text-stone-600 hover:border-terracotta-400 hover:text-terracotta-600 transition-colors">
            Alle DJI-Bikes
          </Link>
        </div>
      </div>

    </div>
  )
}
