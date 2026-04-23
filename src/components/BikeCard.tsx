import { Link } from 'react-router-dom'
import { Bike } from 'lucide-react'
import type { Bike as BikeType } from '@/types/bike'
import { formatChf, formatEur, motorKurzname } from '@/lib/format'

interface Props {
  bike: BikeType
}

export default function BikeCard({ bike }: Props) {
  const preis = bike.preis_chf
    ? formatChf(bike.preis_chf)
    : bike.preis_eur
    ? formatEur(bike.preis_eur)
    : null

  const preisNeben = bike.preis_chf && bike.preis_eur
    ? `EUR ${bike.preis_eur.toLocaleString('de-CH')}`
    : null

  const chips = [
    motorKurzname(bike.motor.hersteller, bike.motor.modell),
    `${bike.federweg.hinten_mm} mm`,
    bike.gewicht_kg ? `${bike.gewicht_kg} kg` : null,
  ].filter(Boolean) as string[]

  return (
    <Link
      to={`/bikes/${bike.id}`}
      className="group flex flex-col bg-white border border-stone-200 rounded-xl overflow-hidden hover:border-terracotta-500 hover:scale-[1.01] transition-all duration-150"
    >
      {/* Bild-Platzhalter */}
      <div className="relative aspect-[4/3] bg-terracotta-50 flex items-center justify-center">
        <Bike size={40} className="text-terracotta-200" strokeWidth={1.25} />
        <span className="absolute top-3 right-3 bg-terracotta-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
          {bike.passend_fuer_martina_score}/10
        </span>
      </div>

      {/* Inhalt */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div>
          <p className="text-xs text-stone-400 mb-0.5">{bike.kategorie}</p>
          <p className="font-semibold text-stone-900 leading-snug">
            {bike.hersteller} {bike.modell}
          </p>
        </div>

        <div>
          {preis ? (
            <span className="text-lg font-semibold text-stone-900">{preis}</span>
          ) : (
            <span className="text-sm text-stone-400 italic">Preis auf Anfrage</span>
          )}
          {preisNeben && (
            <span className="ml-2 text-sm text-stone-400">{preisNeben}</span>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5 mt-auto">
          {chips.map(chip => (
            <span
              key={chip}
              className="text-xs bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
