import { Link } from 'react-router-dom'
import { HelpCircle, Info, CheckCircle2 } from 'lucide-react'
import kategorienRaw from '@/data/kategorien.json'

interface Kategorie {
  name: string
  federweg_range_mm: string
  typisches_gewicht_kg: string
  geometrie_charakter: string
  einsatz_gelaende: string
  fahrgefuehl: string
  bergauf_eignung: string
  bergab_eignung: string
  ideal_fuer_fahrer: string
  typische_beispielbikes: string[]
  motor_typisch: string
}

interface MatrixRow {
  kriterium: string
  Trail: string
  'All-Mountain': string
  Enduro: string
}

const data = kategorienRaw as {
  kategorien: Kategorie[]
  vergleichs_matrix: MatrixRow[]
  entscheidungs_fragen: string[]
  einsteiger_hinweise: { reines_enduro_180mm: string; allmountain_160mm_als_kompromiss: string }
}

const KAT_FARBEN: Record<string, string> = {
  Trail:         'border-stone-300 bg-white',
  'All-Mountain': 'border-terracotta-300 bg-terracotta-50',
  Enduro:        'border-stone-400 bg-stone-50',
}

function FieldRow({ label, wert }: { label: string; wert: string }) {
  return (
    <div className="py-2 border-b border-stone-100 last:border-0">
      <p className="text-[10px] font-semibold tracking-widest text-stone-400 uppercase mb-0.5">{label}</p>
      <p className="text-sm text-stone-700 leading-snug">{wert}</p>
    </div>
  )
}

export default function TrailVsEnduro() {
  const { kategorien, vergleichs_matrix, entscheidungs_fragen, einsteiger_hinweise } = data

  return (
    <div className="max-w-4xl mx-auto space-y-12">

      {/* ── Sektion 1: Hero ── */}
      <div className="pt-2">
        <p className="text-xs font-semibold tracking-widest text-terracotta-500 uppercase mb-3">
          Wissen · Trail vs. Enduro
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-stone-900 mb-4 leading-tight">
          Welche Kategorie passt<br />zu welchem Einsatz?
        </h1>
        <p className="text-lg text-stone-500 max-w-xl leading-relaxed">
          Federweg ist nicht alles. Geometrie, Gewicht und Einsatzprofil entscheiden,
          welches Bike für dich funktioniert.
        </p>
      </div>

      {/* ── Sektion 2: Kategorien-Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {kategorien.map(kat => (
          <div
            key={kat.name}
            className={`flex flex-col border rounded-xl overflow-hidden ${KAT_FARBEN[kat.name] ?? 'border-stone-200 bg-white'}`}
          >
            {/* Header */}
            <div className="px-5 pt-5 pb-3 border-b border-stone-100">
              <h2 className="text-xl font-bold text-stone-900 mb-1">{kat.name}</h2>
              <p className="text-2xl font-semibold text-terracotta-600">{kat.federweg_range_mm}</p>
              <p className="text-xs text-stone-400 mt-0.5">{kat.typisches_gewicht_kg}</p>
            </div>

            {/* Felder */}
            <div className="px-5 py-3 flex-1 space-y-0">
              <FieldRow label="Einsatz" wert={kat.einsatz_gelaende} />
              <FieldRow label="Fahrgefühl" wert={kat.fahrgefuehl} />
              <FieldRow label="Bergauf" wert={kat.bergauf_eignung} />
              <FieldRow label="Bergab" wert={kat.bergab_eignung} />
              <FieldRow label="Ideal für" wert={kat.ideal_fuer_fahrer} />
            </div>

            {/* Beispiel-Bikes */}
            <div className="px-5 pb-4 pt-2 border-t border-stone-100">
              <p className="text-[10px] font-semibold tracking-widest text-stone-400 uppercase mb-2">Beispiele</p>
              <div className="flex flex-wrap gap-1.5">
                {kat.typische_beispielbikes.map(b => (
                  <span key={b} className="text-xs bg-white border border-stone-200 text-stone-600 px-2 py-0.5 rounded-full">
                    {b}
                  </span>
                ))}
              </div>
              <p className="text-[10px] text-stone-400 mt-3 leading-snug">{kat.motor_typisch}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Sektion 3: Geometrie-Vergleichs-Tabelle ── */}
      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
        <div className="px-6 py-3 border-b border-stone-100 bg-stone-50">
          <p className="text-xs font-semibold tracking-widest text-stone-400 uppercase">
            Geometrie im Vergleich
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-100">
                <th className="text-left px-6 py-3 text-stone-400 font-normal w-36">Kriterium</th>
                {['Trail', 'All-Mountain', 'Enduro'].map(k => (
                  <th key={k} className="text-left px-4 py-3 font-semibold text-stone-700">{k}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {vergleichs_matrix.map((row, i) => (
                <tr key={row.kriterium} className={i % 2 === 0 ? 'bg-white' : 'bg-stone-50/50'}>
                  <td className="px-6 py-3 text-stone-400 whitespace-nowrap">{row.kriterium}</td>
                  <td className="px-4 py-3 text-stone-700">{row['Trail']}</td>
                  <td className="px-4 py-3 text-stone-700">{row['All-Mountain']}</td>
                  <td className="px-4 py-3 text-stone-700">{row['Enduro']}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Sektion 4: Einsteiger-Hinweise ── */}
      <div className="space-y-4">
        {/* Warnung: Enduro für Einsteiger */}
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-5 flex gap-4">
          <Info size={18} className="text-blue-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold tracking-widest text-blue-500 uppercase mb-1.5">Achtung</p>
            <p className="text-sm text-blue-900 leading-relaxed">{einsteiger_hinweise.reines_enduro_180mm}</p>
          </div>
        </div>

        {/* Empfehlung: All-Mountain als Kompromiss */}
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 flex gap-4">
          <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold tracking-widest text-emerald-600 uppercase mb-1.5">Empfehlung</p>
            <p className="text-sm text-emerald-900 leading-relaxed">{einsteiger_hinweise.allmountain_160mm_als_kompromiss}</p>
          </div>
        </div>
      </div>

      {/* ── Sektion 5: Entscheidungs-Fragen ── */}
      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
        <div className="px-6 py-3 border-b border-stone-100 bg-stone-50">
          <p className="text-xs font-semibold tracking-widest text-stone-400 uppercase">
            Fragen, die du dir stellen solltest
          </p>
        </div>
        <ul className="divide-y divide-stone-100">
          {entscheidungs_fragen.map((frage, i) => (
            <li key={i} className="flex items-start gap-3.5 px-6 py-4">
              <HelpCircle size={15} className="text-terracotta-400 shrink-0 mt-0.5" />
              <p className="text-sm text-stone-700 leading-relaxed">{frage}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Sektion 6: CTA ── */}
      <div className="border-t border-stone-100 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-stone-600 font-medium">Bereit, Bikes zu vergleichen?</p>
        <div className="flex gap-3">
          <Link
            to="/bikes"
            className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg bg-terracotta-500 text-white hover:bg-terracotta-600 transition-colors"
          >
            Alle Bikes ansehen
          </Link>
          <Link
            to="/wissen/motoren"
            className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg border border-stone-200 text-stone-600 hover:border-terracotta-400 hover:text-terracotta-600 transition-colors"
          >
            Motoren verstehen
          </Link>
        </div>
      </div>

    </div>
  )
}
