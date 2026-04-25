import { Slider } from '@/components/ui/slider'
import type { Filters } from '@/types/filters'
import { DEFAULTS } from '@/types/filters'

interface Props {
  filters: Filters
  onChange: (f: Filters) => void
  filtered: number
  total: number
  alleJahre: number[]
}

const MOTOR_OPTIONS = [
  { key: 'bosch',   label: 'Bosch CX Gen5' },
  { key: 'shimano', label: 'Shimano EP801' },
  { key: 'dji',     label: 'DJI Avinox M1' },
  { key: 'andere',  label: 'Andere (Fazua, TQ, …)' },
]

const KATEGORIE_OPTIONS = [
  { key: 'Trail',       label: 'Trail' },
  { key: 'All-Mountain', label: 'All-Mountain' },
  { key: 'Enduro',      label: 'Enduro' },
]

const MATERIAL_OPTIONS = [
  { key: 'carbon', label: 'Carbon' },
  { key: 'alu',    label: 'Alu' },
]

const LAUFRAD_OPTIONS = [
  { key: '29',   label: '29"' },
  { key: 'mx',   label: 'MX (Mullet)' },
  { key: '27.5', label: '27.5"' },
]

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-semibold tracking-widest text-stone-400 uppercase mb-2.5">
      {children}
    </p>
  )
}

function CheckboxGroup({
  options,
  selected,
  onToggle,
}: {
  options: { key: string; label: string }[]
  selected: string[]
  onToggle: (key: string) => void
}) {
  return (
    <div className="space-y-2">
      {options.map(({ key, label }) => (
        <label key={key} className="flex items-center gap-2.5 cursor-pointer group">
          <input
            type="checkbox"
            checked={selected.includes(key)}
            onChange={() => onToggle(key)}
            className="w-3.5 h-3.5 rounded border-stone-300 accent-terracotta-500 cursor-pointer"
          />
          <span className="text-sm text-stone-600 group-hover:text-stone-900 transition-colors">
            {label}
          </span>
        </label>
      ))}
    </div>
  )
}

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  label: string
}) {
  return (
    <label className="flex items-center justify-between cursor-pointer">
      <span className="text-sm text-stone-600">{label}</span>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative w-9 h-5 rounded-full transition-colors duration-150 ${
          checked ? 'bg-terracotta-500' : 'bg-stone-200'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-150 ${
            checked ? 'translate-x-4' : ''
          }`}
        />
      </button>
    </label>
  )
}

function Divider() {
  return <hr className="border-stone-100" />
}

export default function FilterSidebar({ filters, onChange, filtered, total, alleJahre }: Props) {
  const set = (partial: Partial<Filters>) => onChange({ ...filters, ...partial })

  function toggleMulti(field: 'motoren' | 'kategorien' | 'materialien' | 'laufraeder', key: string) {
    const current = filters[field]
    set({
      [field]: current.includes(key) ? current.filter(k => k !== key) : [...current, key],
    })
  }

  const isDefault =
    filters.preisMin === DEFAULTS.preisMin &&
    filters.preisMax === DEFAULTS.preisMax &&
    filters.motoren.length === 0 &&
    filters.kategorien.length === 0 &&
    filters.federwegMin === DEFAULTS.federwegMin &&
    filters.federwegMax === DEFAULTS.federwegMax &&
    filters.materialien.length === 0 &&
    filters.gewichtMax === DEFAULTS.gewichtMax &&
    filters.laufraeder.length === 0 &&
    filters.jahrgaenge.length === 0 &&
    !filters.nurBudget &&
    !filters.nurScoreMin7

  return (
    <div className="flex flex-col gap-5">

      {/* Zähler */}
      <div className="flex items-baseline justify-between">
        <p className="text-sm font-semibold text-stone-800">
          {filtered} <span className="font-normal text-stone-400">von {total} Bikes</span>
        </p>
      </div>

      <Divider />

      {/* Preis */}
      <div>
        <SectionLabel>Preis (CHF)</SectionLabel>
        <div className="flex justify-between text-xs text-stone-500 mb-3">
          <span>{filters.preisMin.toLocaleString('de-CH')}</span>
          <span>{filters.preisMax.toLocaleString('de-CH')}</span>
        </div>
        <Slider
          min={3000}
          max={13000}
          step={100}
          value={[filters.preisMin, filters.preisMax]}
          onValueChange={(vals) => { const v = vals as number[]; set({ preisMin: v[0], preisMax: v[1] }) }}
          className="[&_[role=slider]]:border-terracotta-500 [&_[role=slider]]:bg-white [&>.bg-primary]:bg-terracotta-500"
        />
        <p className="text-[10px] text-stone-300 mt-2">
          Bikes ohne CHF-Preis: EUR × 1.05 geschätzt
        </p>
      </div>

      <Divider />

      {/* Motor */}
      <div>
        <SectionLabel>Motor</SectionLabel>
        <CheckboxGroup
          options={MOTOR_OPTIONS}
          selected={filters.motoren}
          onToggle={key => toggleMulti('motoren', key)}
        />
      </div>

      <Divider />

      {/* Kategorie */}
      <div>
        <SectionLabel>Kategorie</SectionLabel>
        <CheckboxGroup
          options={KATEGORIE_OPTIONS}
          selected={filters.kategorien}
          onToggle={key => toggleMulti('kategorien', key)}
        />
      </div>

      <Divider />

      {/* Federweg */}
      <div>
        <SectionLabel>Federweg hinten (mm)</SectionLabel>
        <div className="flex justify-between text-xs text-stone-500 mb-3">
          <span>{filters.federwegMin} mm</span>
          <span>{filters.federwegMax} mm</span>
        </div>
        <Slider
          min={120}
          max={180}
          step={10}
          value={[filters.federwegMin, filters.federwegMax]}
          onValueChange={(vals) => { const v = vals as number[]; set({ federwegMin: v[0], federwegMax: v[1] }) }}
          className="[&_[role=slider]]:border-terracotta-500 [&_[role=slider]]:bg-white"
        />
      </div>

      <Divider />

      {/* Rahmenmaterial */}
      <div>
        <SectionLabel>Rahmenmaterial</SectionLabel>
        <CheckboxGroup
          options={MATERIAL_OPTIONS}
          selected={filters.materialien}
          onToggle={key => toggleMulti('materialien', key)}
        />
      </div>

      <Divider />

      {/* Gewicht */}
      <div>
        <SectionLabel>Gewicht max (kg)</SectionLabel>
        <div className="flex justify-between text-xs text-stone-500 mb-3">
          <span>bis {filters.gewichtMax} kg</span>
        </div>
        <Slider
          min={18}
          max={28}
          step={0.5}
          value={[filters.gewichtMax]}
          onValueChange={(vals) => { const v = vals as number[]; set({ gewichtMax: v[0] }) }}
          className="[&_[role=slider]]:border-terracotta-500 [&_[role=slider]]:bg-white"
        />
      </div>

      <Divider />

      {/* Laufradgrösse */}
      <div>
        <SectionLabel>Laufradgrösse</SectionLabel>
        <CheckboxGroup
          options={LAUFRAD_OPTIONS}
          selected={filters.laufraeder}
          onToggle={key => toggleMulti('laufraeder', key)}
        />
      </div>

      <Divider />

      {/* Modelljahr */}
      {alleJahre.length > 1 && (
        <div>
          <SectionLabel>Modelljahr</SectionLabel>
          <div className="space-y-2">
            {alleJahre.map(jahr => (
              <label key={jahr} className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.jahrgaenge.includes(jahr)}
                  onChange={() => {
                    const next = filters.jahrgaenge.includes(jahr)
                      ? filters.jahrgaenge.filter(j => j !== jahr)
                      : [...filters.jahrgaenge, jahr]
                    set({ jahrgaenge: next })
                  }}
                  className="w-3.5 h-3.5 rounded border-stone-300 accent-terracotta-500 cursor-pointer"
                />
                <span className="text-sm text-stone-600 group-hover:text-stone-900 transition-colors">
                  {jahr}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {alleJahre.length > 1 && <Divider />}

      {/* Toggles */}
      <div className="space-y-3">
        <Toggle
          checked={filters.nurBudget}
          onChange={v => set({ nurBudget: v })}
          label="Nur im Budget CHF 3'500–6'500"
        />
        <Toggle
          checked={filters.nurScoreMin7}
          onChange={v => set({ nurScoreMin7: v })}
          label="Score ≥ 7"
        />
      </div>

      <Divider />

      {/* Reset */}
      <button
        onClick={() => onChange(DEFAULTS)}
        disabled={isDefault}
        className="w-full py-2 rounded-lg border border-stone-200 text-sm text-stone-500 hover:border-terracotta-400 hover:text-terracotta-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Filter zurücksetzen
      </button>

    </div>
  )
}
