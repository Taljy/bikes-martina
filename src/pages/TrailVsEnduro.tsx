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
  Trail:         'border-rule bg-paper',
  'All-Mountain': 'border-vermillion/30 bg-vermillion/5',
  Enduro:        'border-rule-strong bg-paper-deep',
}

function FieldRow({ label, wert }: { label: string; wert: string }) {
  return (
    <div className="py-2 border-b border-rule last:border-0">
      <p className="font-mono text-[10px] tracking-[0.18em] text-concrete uppercase mb-0.5">{label}</p>
      <p className="text-sm text-ink-soft leading-snug">{wert}</p>
    </div>
  )
}

export default function TrailVsEnduro() {
  const { kategorien, vergleichs_matrix, entscheidungs_fragen, einsteiger_hinweise } = data

  return (
    <div className="max-w-4xl mx-auto space-y-12">

      {/* ── Sektion 1: Hero ── */}
      <div className="pt-2">
        <p className="font-mono text-xs tracking-[0.18em] text-vermillion uppercase mb-3">
          Wissen · Trail vs. Enduro
        </p>
        <h1 className="text-4xl text-ink mb-4 leading-tight">
          Welche Kategorie passt<br />zu welchem Einsatz?
        </h1>
        <p className="text-lg text-asphalt max-w-xl leading-relaxed">
          Federweg ist nicht alles. Geometrie, Gewicht und Einsatzprofil entscheiden,
          welches Bike für dich funktioniert.
        </p>
      </div>

      {/* ── Sektion 2: Kategorien-Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {kategorien.map(kat => (
          <div
            key={kat.name}
            className={`flex flex-col border rounded-none overflow-hidden ${KAT_FARBEN[kat.name] ?? 'border-rule bg-paper'}`}
          >
            {/* Header */}
            <div className="px-5 pt-5 pb-3 border-b border-rule">
              <h2 className="text-xl text-ink mb-1">{kat.name}</h2>
              <p className="font-mono text-2xl text-vermillion">{kat.federweg_range_mm}</p>
              <p className="font-mono text-xs text-concrete mt-0.5">{kat.typisches_gewicht_kg}</p>
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
            <div className="px-5 pb-4 pt-2 border-t border-rule">
              <p className="font-mono text-[10px] tracking-[0.18em] text-concrete uppercase mb-2">Beispiele</p>
              <div className="flex flex-wrap gap-1.5">
                {kat.typische_beispielbikes.map(b => (
                  <span key={b} className="font-mono text-xs bg-paper border border-rule text-asphalt px-2 py-0.5 rounded-none">
                    {b}
                  </span>
                ))}
              </div>
              <p className="font-mono text-[10px] text-concrete mt-3 leading-snug">{kat.motor_typisch}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Sektion 3: Geometrie-Vergleichs-Tabelle ── */}
      <div className="bg-paper border border-rule rounded-none overflow-hidden">
        <div className="px-6 py-3 border-b border-rule bg-paper-deep">
          <p className="font-mono text-xs tracking-[0.18em] text-concrete uppercase">
            Geometrie im Vergleich
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-rule">
                <th className="text-left px-6 py-3 font-mono text-xs text-concrete font-normal w-36">Kriterium</th>
                {['Trail', 'All-Mountain', 'Enduro'].map(k => (
                  <th key={k} className="text-left px-4 py-3 font-medium text-ink">{k}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {vergleichs_matrix.map((row, i) => (
                <tr key={row.kriterium} className={i % 2 === 0 ? 'bg-paper' : 'bg-paper-deep/50'}>
                  <td className="px-6 py-3 font-mono text-xs text-concrete whitespace-nowrap">{row.kriterium}</td>
                  <td className="px-4 py-3 text-ink-soft">{row['Trail']}</td>
                  <td className="px-4 py-3 text-ink-soft">{row['All-Mountain']}</td>
                  <td className="px-4 py-3 text-ink-soft">{row['Enduro']}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Sektion 4: Einsteiger-Hinweise ── */}
      <div className="space-y-4">
        {/* Warnung: Enduro für Einsteiger */}
        <div className="rounded-none border border-blue-200 bg-blue-50 p-5 flex gap-4">
          <Info size={18} className="text-blue-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-mono text-xs tracking-[0.18em] text-blue-500 uppercase mb-1.5">Achtung</p>
            <p className="text-sm text-blue-900 leading-relaxed">{einsteiger_hinweise.reines_enduro_180mm}</p>
          </div>
        </div>

        {/* Empfehlung: All-Mountain als Kompromiss */}
        <div className="rounded-none border border-emerald-200 bg-emerald-50 p-5 flex gap-4">
          <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-mono text-xs tracking-[0.18em] text-emerald-600 uppercase mb-1.5">Empfehlung</p>
            <p className="text-sm text-emerald-900 leading-relaxed">{einsteiger_hinweise.allmountain_160mm_als_kompromiss}</p>
          </div>
        </div>
      </div>

      {/* ── Sektion 5: Entscheidungs-Fragen ── */}
      <div className="bg-paper border border-rule rounded-none overflow-hidden">
        <div className="px-6 py-3 border-b border-rule bg-paper-deep">
          <p className="font-mono text-xs tracking-[0.18em] text-concrete uppercase">
            Fragen, die du dir stellen solltest
          </p>
        </div>
        <ul className="divide-y divide-rule">
          {entscheidungs_fragen.map((frage, i) => (
            <li key={i} className="flex items-start gap-3.5 px-6 py-4">
              <HelpCircle size={15} className="text-vermillion shrink-0 mt-0.5" />
              <p className="text-sm text-ink-soft leading-relaxed">{frage}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Sektion 6: CTA ── */}
      <div className="border-t border-rule pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-ink-soft font-medium">Bereit, Bikes zu vergleichen?</p>
        <div className="flex gap-3">
          <Link
            to="/bikes"
            className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-none bg-vermillion text-paper hover:bg-vermillion-deep transition-colors"
          >
            Alle Bikes ansehen
          </Link>
          <Link
            to="/wissen/motoren"
            className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-none border border-rule text-asphalt hover:border-vermillion hover:text-vermillion transition-colors"
          >
            Motoren verstehen
          </Link>
        </div>
      </div>

    </div>
  )
}
