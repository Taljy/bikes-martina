import { User, MapPin, Gauge, Banknote, Zap, Mountain, Sparkles, ArrowRight } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import bikesData from '@/data/bikes.json'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog'

const BIKE_COUNT = bikesData.length

const profil = [
  {
    icon: User,
    label: 'Fahrerin',
    wert: '1.80 m / 80 kg Fahrgewicht',
    detail: '2. Saison auf dem E-MTB. Technisch solide, Bikepark-Erfahrung im Aufbau.',
  },
  {
    icon: User,
    label: 'Schrittlänge',
    wert: '86 cm — Rahmengrösse M–L',
    detail: 'Grösse L ist der Startpunkt — die Geometrie entscheidet.',
  },
  {
    icon: MapPin,
    label: 'Einsatzgebiet',
    wert: 'Flachland · Alpen · Trails · Bikepark',
    detail: 'Ein Bike für alles: ruhig bergauf, sicher bergab, nicht zu träge auf der Hausrunde.',
  },
  {
    icon: Gauge,
    label: 'Federweg',
    wert: '140–180 mm',
    detail: 'Sweet Spot: 150–170 mm. Genug Reserve für ruppige Abfahrten.',
  },
  {
    icon: Banknote,
    label: 'Budget',
    wert: 'CHF 3’500–6’500',
    detail: 'Realistische Suche im starken Mittel- bis Obersegment.',
  },
  {
    icon: Zap,
    label: 'Motor-Präferenz',
    wert: 'Bosch CX Gen5 · Shimano EP801 · DJI Avinox M1',
    detail: 'Bosch und Shimano sind bewährte Optionen. DJI ist stark und spannend — aber Service?',
  },
]

const tiles = [
  {
    icon: Mountain,
    nummer: '01',
    titel: 'Trail, All-Mountain oder Enduro?',
    beschreibung: 'Welche Kategorie passt zu dir? Mit Vergleichstabelle und Entscheidungsfrage.',
    route: '/wissen/trail-vs-enduro',
  },
  {
    icon: Zap,
    nummer: '02',
    titel: 'Welcher Motor passt?',
    beschreibung: 'Bosch, Shimano oder DJI? Alle Systeme direkt vergleichen.',
    route: '/wissen/motoren',
  },
  {
    icon: Sparkles,
    nummer: '03',
    titel: 'Was ist neu 2026?',
    beschreibung: 'Die wichtigsten Launches und Neuheiten der aktuellen Saison auf einer Zeitachse.',
    route: '/wissen/neuheiten-2026',
  },
]

export default function Home() {
  return (
    <div className="space-y-10">

      {/* A) Hero */}
      <div className="pt-4 text-center mx-auto max-w-3xl">
        <p className="font-mono text-xs tracking-[0.18em] text-vermillion uppercase mb-3">
          E-MTB-CHECK 2026 · FÜR MARTINA
        </p>
        <h1 className="text-5xl text-ink mb-4">
          Das richtige E-MTB
        </h1>
        <p className="text-lg text-asphalt max-w-xl leading-relaxed mx-auto">
          {BIKE_COUNT} Bikes — Stärken & Schwächen — No Bullshit
        </p>
      </div>

      {/* B) Primary CTA Row */}
      <div className="flex flex-col items-center gap-3">
        <NavLink
          to="/bikes"
          className="inline-flex items-center gap-2 px-6 py-3 bg-vermillion text-paper font-display text-lg tracking-[0.04em] hover:bg-vermillion-deep transition-colors"
        >
          → Zu den {BIKE_COUNT} Bikes
        </NavLink>

        <Dialog>
          <DialogTrigger className="text-vermillion font-mono text-sm tracking-[0.06em] uppercase hover:underline text-left sm:text-center">
            Wer ist Martina?
          </DialogTrigger>
          <DialogContent className="bg-paper border border-rule rounded-none max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-display text-2xl text-ink tracking-[0.04em]">
                Martinas Fahrprofil
              </DialogTitle>
              <DialogDescription className="font-mono text-xs text-concrete tracking-[0.06em] uppercase">
                Worauf das Bike wirklich ausgelegt sein muss
              </DialogDescription>
            </DialogHeader>
            <div className="mt-6 divide-y divide-rule">
              {profil.map(({ icon: Icon, label, wert, detail }) => (
                <div key={label} className="py-4 flex gap-4">
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
          </DialogContent>
        </Dialog>
      </div>

      {/* C) Section-Trenner */}
      <div className="pt-6">
        <p className="mt-12 mb-8 font-mono text-base tracking-[0.18em] text-vermillion uppercase text-center mx-auto">
          Erst verstehen. Dann entscheiden.
        </p>

        {/* D) 3 nummerierte Lern-Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tiles.map(({ icon: Icon, nummer, titel, beschreibung, route }) => (
            <Link
              key={route}
              to={route}
              className="group flex flex-col bg-paper border border-rule rounded-none p-6 hover:bg-paper-deep hover:shadow-sm transition-all duration-150"
            >
              <p className="font-mono text-xs tracking-[0.18em] text-vermillion mb-3">{nummer}</p>
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

      {/* E) Sekundärer CTA */}
      <div className="flex justify-center">
        <NavLink
          to="/bikes"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-vermillion text-paper font-display tracking-[0.04em] hover:bg-vermillion-deep transition-colors"
        >
          → Zu den Bikes
        </NavLink>
      </div>

      {/* F) KI-Hinweis */}
      <p className="mt-6 text-center font-mono text-xs text-vermillion max-w-2xl mx-auto">
        ⚠ Dies ist ein Recherche-Tool und kein Verkaufsprospekt. Daten können je nach Herstellerstand abweichen — finale Prüfung vor dem Kauf nötig.
      </p>

    </div>
  )
}
