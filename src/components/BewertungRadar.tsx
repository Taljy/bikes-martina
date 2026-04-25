import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import type { BewertungKategorien } from '@/types/bike'

const ACHSEN: { key: keyof BewertungKategorien; label: string }[] = [
  { key: 'geometrie_rahmengroesse',  label: 'Rahmegrössi'        },
  { key: 'einsteigerfreundlichkeit', label: 'Einsteiger-tauglich' },
  { key: 'bergauf_touren',           label: 'Bergauf / Toure'     },
  { key: 'bikepark_reserve',         label: 'Bikepark-Reserve'   },
  { key: 'gewicht_handling',         label: 'Gwicht / Handling'  },
  { key: 'preis_leistung',           label: 'Priis-Leistig'      },
  { key: 'service_haendlernetz_ch',  label: 'Service CH'         },
  { key: 'risiko_datenunsicherheit', label: 'Date-Sicherheit'    },
]

const HEIGHTS: Record<'sm' | 'md' | 'lg', number> = {
  sm: 240,
  md: 320,
  lg: 400,
}

const TERRACOTTA = '#B26A4A'

interface Props {
  bewertung: BewertungKategorien
  size?: 'sm' | 'md' | 'lg'
}

// Tooltip-Inhalt
function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: { achse: string }; value: number }> }) {
  if (!active || !payload?.length) return null
  const { achse } = payload[0].payload
  const score = payload[0].value
  return (
    <div className="bg-white border border-stone-200 rounded-lg px-3 py-1.5 shadow-sm text-xs text-stone-700">
      <span className="font-semibold">{achse}</span>: {score} / 10
    </div>
  )
}

export default function BewertungRadar({ bewertung, size = 'md' }: Props) {
  const data = ACHSEN.map(({ key, label }) => ({
    achse: label,
    score: bewertung[key],
  }))

  return (
    <ResponsiveContainer width="100%" height={HEIGHTS[size]}>
      <RadarChart data={data} margin={{ top: 12, right: 36, bottom: 12, left: 36 }}>
        <PolarGrid stroke="#e7e5e4" />
        <PolarAngleAxis
          dataKey="achse"
          tick={{ fontSize: 11, fill: '#78716c' }}
        />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 10]}
          tickCount={6}
          tick={{ fontSize: 9, fill: '#a8a29e' }}
          tickFormatter={v => (v === 0 ? '' : String(v))}
        />
        <Radar
          name="Bewertig"
          dataKey="score"
          stroke={TERRACOTTA}
          fill={TERRACOTTA}
          fillOpacity={0.32}
          strokeWidth={2}
        />
        <Tooltip content={<CustomTooltip />} />
      </RadarChart>
    </ResponsiveContainer>
  )
}
