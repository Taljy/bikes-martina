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
  // Unterstützt altes Schema (preis_chf/eur) und neues Schema (preise.uvp_chf/eur)
  const preis_chf = bike.preis_chf ?? bike.preise?.uvp_chf ?? null
  const preis_eur = bike.preis_eur ?? bike.preise?.uvp_eur ?? null
  const preis = preis_chf
    ? formatChf(preis_chf)
    : preis_eur
    ? formatEur(preis_eur)
    : null

  const preisNeben = preis_chf && preis_eur
    ? `EUR ${preis_eur.toLocaleString('de-CH')}`
    : null

  // Federweg: altes Schema federweg.hinten_mm, neues Schema federweg_hinten (flat)
  const federwegHinten = bike.federweg?.hinten_mm ?? bike.federweg_hinten ?? null

  const chips = [
    motorKurzname(bike.motor.hersteller, bike.motor.modell),
    federwegHinten !== null ? `${federwegHinten} mm` : null,
    bike.gewicht_kg ? `${bike.gewicht_kg} kg` : null,
  ].filter(Boolean) as string[]

  return (
    <Link
      to={`/bikes/${bike.id}`}
      state={{ fromSearch: location.search }}
      className="group flex flex-col bg-paper border border-rule rounded-none overflow-hidden hover:border-vermillion hover:scale-[1.01] transition-all duration-150"
    >
      {/* Bild */}
      <div className="relative aspect-[4/3] bg-paper-deep flex items-center justify-center overflow-hidden p-3">
        {bike.bild_pfad ? (
          <img
            src={bike.bild_pfad}
            alt={`${bike.hersteller} ${bike.modell}`}
            className="w-full h-full object-contain"
            loading="lazy"
            onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
          />
        ) : (
          <Bike size={40} className="text-rule" strokeWidth={1.25} />
        )}

        {/* «Mis Bike»-Badge oben links über Vergleich-Toggle — nur für Referenzbike */}
        {bike.referenzbike && bike.badge && (
          <span className="absolute top-3 left-3 bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-none z-10">
            {bike.badge}
          </span>
        )}

        {/* Score-Badge oben rechts — altes Schema: passend_fuer_martina_score, neues: score */}
        <span className="absolute top-3 right-3 bg-vermillion text-paper text-xs font-mono tracking-[0.06em] px-2 py-0.5 rounded-none">
          {bike.passend_fuer_martina_score ?? bike.score ?? '–'}/10
        </span>

        {/* Vergleich-Toggle oben links — bei Referenzbike ausgeblendet */}
        {!bike.referenzbike && <button
          onClick={e => { e.preventDefault(); e.stopPropagation(); toggle(bike.id) }}
          title={inCompare ? 'Aus Vergleich entfernen' : 'Zum Vergleich hinzufügen'}
          className={`absolute top-3 left-3 w-6 h-6 rounded-sm flex items-center justify-center transition-colors ${
            inCompare
              ? 'bg-vermillion text-paper'
              : 'bg-paper/80 text-asphalt hover:bg-paper hover:text-vermillion'
          }`}
        >
          {inCompare ? <Check size={12} strokeWidth={2.5} /> : <Plus size={12} strokeWidth={2.5} />}
        </button>}
      </div>

      {/* Inhalt */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div>
          <p className="font-mono text-xs text-concrete tracking-[0.06em] uppercase mb-0.5">{bike.kategorie ?? bike.konzept}</p>
          <p className="font-display text-lg text-ink leading-snug">
            {bike.hersteller} {bike.modell}
          </p>
          <p className="font-mono text-xs text-concrete mt-0.5">{bike.modelljahr ?? bike.jahr}</p>
        </div>

        <div>
          {preis ? (
            <span className="font-mono text-lg font-medium text-ink">{preis}</span>
          ) : (
            <span className="font-mono text-xs text-concrete">Preis auf Anfrage</span>
          )}
          {preisNeben && (
            <span className="ml-2 font-mono text-xs text-concrete">{preisNeben}</span>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5 mt-auto">
          {chips.map(chip => (
            <span
              key={chip}
              className="font-mono text-xs bg-paper-deep text-asphalt px-2 py-0.5 rounded-none"
            >
              {chip}
            </span>
          ))}
        </div>

        {/* Verfügbarkeits-Badge */}
        {bike.verfuegbarkeit?.status === 'ausverkauft' && (
          <span className="self-start text-[10px] font-medium bg-red-100 text-red-700 px-2 py-0.5 rounded-none">
            Usverchauft
          </span>
        )}
        {bike.verfuegbarkeit?.status === 'teilverfuegbar' && (
          <span className="self-start text-[10px] font-medium bg-orange-100 text-orange-700 px-2 py-0.5 rounded-none">
            Teilwiis verfüegbar
          </span>
        )}
        {bike.verfuegbarkeit?.status === 'verfuegbar' && (
          <span className="self-start text-[10px] font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-none">
            Verfüegbar
          </span>
        )}
        {bike.verfuegbarkeit?.status === 'unbekannt' && (
          <span className="self-start text-[10px] font-medium bg-paper-deep text-concrete px-2 py-0.5 rounded-none">
            Verfüegbarkeit prüfe
          </span>
        )}
      </div>
    </Link>
  )
}
