import { useState } from 'react'
import { ChevronDown, User, MapPin, Gauge, Banknote, Zap, Bike, Mountain, Sparkles, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import bikesData from '@/data/bikes.json'

const BIKE_COUNT = bikesData.length

const profil = [
  {
    icon: User,
    label: 'Fahrerin',
    wert: '1.80 m / 80 kg — Rahmegröössi L',
    detail: '3. Saison auf dem E-MTB, Technik ja — Bikepark-Profi noch nicht',
  },
  {
    icon: User,
    label: 'Beinlänge / Schrittlänge',
    wert: '86 cm',
    detail: 'Entscheidend für die Sattelhöhe und den Reach bei Grösse L.',
  },
  {
    icon: MapPin,
    label: 'Einsatzgebiet',
    wert: 'Flachland & Alpe, Trails & Bikepark',
    detail: 'Von der Hausrunde bis zur Alpentour — das Bike muss beides können.',
  },
  {
    icon: Gauge,
    label: 'Federweg',
    wert: '140–180 mm',
    detail: 'All-Mountain bis Enduro. Abfahrt und Aufstieg — beides zählt.',
  },
  {
    icon: Banknote,
    label: 'Budget',
    wert: "CHF 3'500 – 6'500",
    detail: 'Ausnahmen zur Orientierung',
  },
  {
    icon: Zap,
    label: 'Motor-Präferenz',
    wert: 'Bosch CX Gen5 · Shimano EP801 · DJI Avinox M1',
    detail: 'Bosch und Shimano sind bewährt, das Service-Netz in der Schweiz stimmt. DJI ist spannend — wir behalten es im Auge.',
  },
]

const tiles = [
  {
    icon: Bike,
    titel: 'Bikes',
    beschreibung: `${BIKE_COUNT} E-MTBs vergleichen — filtern nach Budget, Motor und Federweg.`,
    route: '/bikes',
  },
  {
    icon: Mountain,
    titel: 'Trail oder Enduro?',
    beschreibung: 'Welche Kategorie passt zu dir? Mit Vergleichstabelle und Entscheidungsfrage.',
    route: '/wissen/trail-vs-enduro',
  },
  {
    icon: Sparkles,
    titel: 'Neuheiten 2026',
    beschreibung: 'Die wichtigsten Launches und Neuheiten der aktuellen Saison auf einer Zeitachse.',
    route: '/wissen/neuheiten-2026',
  },
  {
    icon: Zap,
    titel: 'Motoren',
    beschreibung: 'Bosch, Shimano oder DJI? Alle Systeme direkt vergleichen.',
    route: '/wissen/motoren',
  },
]

export default function Home() {
  const [profilOffen, setProfilOffen] = useState(true)

  return (
    <div className="space-y-10">

      {/* Hero */}
      <div className="pt-4">
        <p className="font-mono text-xs tracking-[0.18em] text-vermillion uppercase mb-3">
          E-MTB-CHECK 2026
        </p>
        <h1 className="text-5xl text-ink mb-4">
          Finde dein perfektes Bike
        </h1>
        <p className="text-lg text-asphalt max-w-xl leading-relaxed">
          {BIKE_COUNT} Bikes — Stärken & Schwächen — No Bullshit
        </p>
      </div>

      {/* KI-Warnhinweis */}
      <div className="rounded-none border border-amber-300 bg-amber-50 p-3">
        <p className="text-sm text-amber-800">
          ⚠️ Achtung: Ich bin mit KI gebaut und habe sicher noch ein paar geistige Einschränkungen.
        </p>
      </div>

      {/* Profil-Card */}
      <div className="border border-rule rounded-none bg-paper overflow-hidden">
        <button
          onClick={() => setProfilOffen(v => !v)}
          className="w-full flex items-center justify-between px-6 py-4 hover:bg-paper-deep transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm bg-paper-deep flex items-center justify-center">
              <User size={15} className="text-vermillion" />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-ink">Martinas Profil</p>
              <p className="text-xs text-concrete">Kriterien & Begründungen</p>
            </div>
          </div>
          <ChevronDown
            size={16}
            className={`text-concrete transition-transform duration-200 ${profilOffen ? 'rotate-180' : ''}`}
          />
        </button>

        {profilOffen && (
          <div className="border-t border-rule divide-y divide-rule">
            {profil.map(({ icon: Icon, label, wert, detail }) => (
              <div key={label} className="px-6 py-4 flex gap-4">
                <div className="mt-0.5 w-8 h-8 rounded-sm bg-paper-deep flex items-center justify-center shrink-0">
                  <Icon size={15} className="text-vermillion" />
                </div>
                <div>
                  <p className="font-mono text-xs text-concrete tracking-[0.18em] uppercase mb-0.5">{label}</p>
                  <p className="text-sm font-medium text-ink mb-1">{wert}</p>
                  <p className="text-sm text-asphalt leading-relaxed">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Einstiegs-Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tiles.map(({ icon: Icon, titel, beschreibung, route }) => (
          <Link
            key={route}
            to={route}
            className="group flex flex-col bg-paper border border-rule rounded-none p-6 hover:bg-paper-deep hover:shadow-sm transition-all duration-150"
          >
            <div className="w-9 h-9 rounded-none bg-paper-deep group-hover:bg-rule flex items-center justify-center mb-4 transition-colors duration-150">
              <Icon size={18} className="text-concrete group-hover:text-vermillion transition-colors duration-150" strokeWidth={1.75} />
            </div>
            <p className="font-display text-base text-ink mb-1.5">{titel}</p>
            <p className="text-sm text-asphalt leading-relaxed flex-1">{beschreibung}</p>
            <div className="mt-4 flex justify-end">
              <ArrowRight size={15} className="text-concrete group-hover:text-vermillion transition-colors duration-150" />
            </div>
          </Link>
        ))}
      </div>

    </div>
  )
}
