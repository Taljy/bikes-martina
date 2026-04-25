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
    detail: '3. Saison ufem E-MTB, Technik ja — Bikepark-Profi no nöd',
  },
  {
    icon: User,
    label: 'Beinlänge / Schrittlänge',
    wert: '86 cm',
    detail: "Entscheided für d'Sattelhöchi und de Reach bi Gröössi L.",
  },
  {
    icon: MapPin,
    label: 'Einsatzgebiet',
    wert: 'Flachland & Alpe, Trails & Bikepark',
    detail: "Vo de Hausrunde bis zur Alpetoure — s'Bike muss beides chöne.",
  },
  {
    icon: Gauge,
    label: 'Federweg',
    wert: '140–180 mm',
    detail: 'All-Mountain bis Enduro. Abfahrt und Ufstig — beides zellt.',
  },
  {
    icon: Banknote,
    label: 'Budget',
    wert: "CHF 3'500 – 6'500",
    detail: 'Usnahme zur Orientierig',
  },
  {
    icon: Zap,
    label: 'Motor-Präferenz',
    wert: 'Bosch CX Gen5 · Shimano EP801 · DJI Avinox M1',
    detail: "Bosch und Shimano sind bewährt, Service-Netz i de Schwiiz stimmt. DJI isch spannend — mir behalted's im Auge.",
  },
]

const tiles = [
  {
    icon: Bike,
    titel: 'Alli Bikes',
    beschreibung: `${BIKE_COUNT} E-MTBs vergliche — filtere nach Budget, Motor und Federweg.`,
    route: '/bikes',
  },
  {
    icon: Mountain,
    titel: 'Trail oder Enduro?',
    beschreibung: 'Welchi Kategorie passt zu dir? Mit Vergliichstabelle und Entscheidfrage.',
    route: '/wissen/trail-vs-enduro',
  },
  {
    icon: Sparkles,
    titel: "Was git's Neus 2026?",
    beschreibung: "D'wichtigste Launches und Neuheite vo de aktuelle Saison uf ere Zitachse.",
    route: '/wissen/neuheiten-2026',
  },
  {
    icon: Zap,
    titel: "D'Motore im Verglich",
    beschreibung: 'Bosch, Shimano oder DJI? Alli Systeme direkt vergliche.',
    route: '/wissen/motoren',
  },
]

export default function Home() {
  const [profilOffen, setProfilOffen] = useState(true)

  return (
    <div className="space-y-10">

      {/* Hero */}
      <div className="pt-4">
        <p className="text-xs font-medium tracking-widest text-terracotta-500 uppercase mb-3">
          E-MTB Entscheid 2026
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-stone-900 mb-4 leading-tight">
          S'perfekte E-MTB<br />für Martina.
        </h1>
        <p className="text-lg text-stone-500 max-w-xl leading-relaxed">
          {BIKE_COUNT} aktuelli E-MTBs, sorgfältig usegsuecht — mit alle Details, Testresultate und Hersteller-Links.
        </p>
      </div>

      {/* KI-Warnhinweis */}
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
        <p className="text-sm text-amber-800">
          ⚠️ Achtung: Ich bi mit KI baut worde und han sicher no chli geischtige Beschränkige.
        </p>
      </div>

      {/* Profil-Card */}
      <div className="border border-stone-200 rounded-xl bg-white overflow-hidden">
        <button
          onClick={() => setProfilOffen(v => !v)}
          className="w-full flex items-center justify-between px-6 py-4 hover:bg-stone-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-terracotta-50 flex items-center justify-center">
              <User size={15} className="text-terracotta-600" />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-stone-800">Martinas Profil</p>
              <p className="text-xs text-stone-400">Kriterien & Begründungen</p>
            </div>
          </div>
          <ChevronDown
            size={16}
            className={`text-stone-400 transition-transform duration-200 ${profilOffen ? 'rotate-180' : ''}`}
          />
        </button>

        {profilOffen && (
          <div className="border-t border-stone-100 divide-y divide-stone-100">
            {profil.map(({ icon: Icon, label, wert, detail }) => (
              <div key={label} className="px-6 py-4 flex gap-4">
                <div className="mt-0.5 w-8 h-8 rounded-lg bg-terracotta-50 flex items-center justify-center shrink-0">
                  <Icon size={15} className="text-terracotta-600" />
                </div>
                <div>
                  <p className="text-xs font-medium text-stone-400 uppercase tracking-wide mb-0.5">{label}</p>
                  <p className="text-sm font-medium text-stone-800 mb-1">{wert}</p>
                  <p className="text-sm text-stone-500 leading-relaxed">{detail}</p>
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
            className="group flex flex-col bg-white border border-stone-200 rounded-xl p-6 hover:bg-terracotta-50 hover:border-terracotta-500 hover:shadow-sm transition-all duration-150"
          >
            <div className="w-9 h-9 rounded-lg bg-stone-100 group-hover:bg-terracotta-100 flex items-center justify-center mb-4 transition-colors duration-150">
              <Icon size={18} className="text-stone-500 group-hover:text-terracotta-600 transition-colors duration-150" strokeWidth={1.75} />
            </div>
            <p className="text-sm font-semibold text-stone-800 mb-1.5">{titel}</p>
            <p className="text-sm text-stone-500 leading-relaxed flex-1">{beschreibung}</p>
            <div className="mt-4 flex justify-end">
              <ArrowRight size={15} className="text-zinc-400 group-hover:text-terracotta-500 transition-colors duration-150" />
            </div>
          </Link>
        ))}
      </div>

    </div>
  )
}
