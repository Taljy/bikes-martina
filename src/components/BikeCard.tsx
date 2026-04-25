import { Link, useLocation } from 'react-router-dom'
import { Bike, Plus, Check } from 'lucide-react'
import type { Bike as BikeType } from '@/types/bike'
import { formatChf, formatEur, motorKurzname } from '@/lib/format'
import { useCompare } from '@/context/CompareContext'

interface Props {
  bike: BikeType
}

export default function BikeCard({ bike }: Props) {
  const location = useLocation()
  const { toggle, isIn } = useCompare()
  const inCompare = isIn(bike.id)
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
      state={{ fromSearch: location.search }}
      className="group flex flex-col bg-white border border-stone-200 rounded-xl overflow-hidden hover:border-terracotta-500 hover:scale-[1.01] transition-all duration-150"
    >
      {/* Bild */}
      <div className="relative aspect-[4/3] bg-white flex items-center justify-center overflow-hidden p-3">
        {bike.bild_pfad ? (
          <img
            src={bike.bild_pfad}
            alt={`${bike.hersteller} ${bike.modell}`}
            className="w-full h-full object-contain"
            loading="lazy"
            onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
          />
        ) : (
          <Bike size={40} className="text-terracotta-200" strokeWidth={1.25} />
        )}

        {/* «Mis Bike»-Badge oben links über Vergleich-Toggle — nur für Referenzbike */}
        {bike.referenzbike && bike.badge && (
          <span className="absolute top-3 left-3 bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full z-10">
            {bike.badge}
          </span>
        )}

        {/* Score-Badge oben rechts */}
        <span className="absolute top-3 right-3 bg-terracotta-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
          {bike.passend_fuer_martina_score}/10
        </span>

        {/* Vergleich-Toggle oben links — bei Referenzbike ausgeblendet */}
        {!bike.referenzbike && <button
          onClick={e => { e.preventDefault(); e.stopPropagation(); toggle(bike.id) }}
          title={inCompare ? 'Aus Vergleich entfernen' : 'Zum Vergleich hinzufügen'}
          className={`absolute top-3 left-3 w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
            inCompare
              ? 'bg-terracotta-500 text-white'
              : 'bg-white/80 text-stone-500 hover:bg-white hover:text-terracotta-600'
          }`}
        >
          {inCompare ? <Check size={12} strokeWidth={2.5} /> : <Plus size={12} strokeWidth={2.5} />}
        </button>}
      </div>

      {/* Inhalt */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div>
          <p className="text-xs text-stone-400 mb-0.5">{bike.kategorie}</p>
          <p className="font-semibold text-stone-900 leading-snug">
            {bike.hersteller} {bike.modell}
          </p>
          <p className="text-xs text-stone-400 mt-0.5">{bike.modelljahr}</p>
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
