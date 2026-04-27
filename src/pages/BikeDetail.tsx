import { useParams, Link, useLocation } from 'react-router-dom'
import { ArrowLeft, ExternalLink, AlertTriangle, CheckCircle2, AlertCircle, Plus, Check, XCircle } from 'lucide-react'
import { Bike } from 'lucide-react'
import bikesData from '@/data/bikes.json'
import type { Bike as BikeType } from '@/types/bike'
import { formatChf, formatEur } from '@/lib/format'
import SpecCard from '@/components/SpecCard'
import { useCompare } from '@/context/CompareContext'
import BewertungRadar from '@/components/BewertungRadar'

const ALL_BIKES = bikesData as BikeType[]

// ── Helpers ──────────────────────────────────────────────

function v(x: string | number | null | undefined): string {
  if (x === null || x === undefined || x === 'NOT_SPECIFIED') return '–'
  return String(x)
}

function bool(x: boolean): string {
  return x ? 'Ja' : 'Nein'
}

function motorWissenId(hersteller: string): string | null {
  if (hersteller === 'Bosch') return 'bosch-cx-gen5'
  if (hersteller === 'Shimano') return 'shimano-ep801'
  if (hersteller === 'DJI') return 'dji-avinox-m1'
  return null
}

// ── Sub-Komponenten ───────────────────────────────────────

function ScoreGauge({ score }: { score: number | undefined }) {
  if (score === undefined) return null
  return (
    <div className="flex items-center gap-4">
      <div className="flex-1 h-2.5 bg-stone-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-terracotta-500 rounded-full"
          style={{ width: `${(score / 10) * 100}%` }}
        />
      </div>
      <span className="text-2xl font-bold text-terracotta-600 tabular-nums w-12 text-right">
        {score}<span className="text-sm font-normal text-stone-400">/10</span>
      </span>
    </div>
  )
}

function ExtLink({ href, children }: { href: string; children: React.ReactNode }) {
  if (!href || href === 'NOT_SPECIFIED') return <>{children}</>
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-terracotta-600 hover:underline"
    >
      {children} <ExternalLink size={11} className="shrink-0" />
    </a>
  )
}

function SpecRow({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex gap-4 py-2.5 border-b border-stone-100 last:border-0">
      <span className="w-44 shrink-0 text-sm text-stone-400">{label}</span>
      <span className="text-sm text-stone-800 flex-1">{children}</span>
    </div>
  )
}

function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-semibold tracking-widest text-stone-400 uppercase mb-1 mt-6 first:mt-0">
      {children}
    </p>
  )
}

// ── Hauptkomponente ───────────────────────────────────────

export default function BikeDetail() {
  const { id } = useParams<{ id: string }>()
  const location = useLocation()
  const { toggle, isIn } = useCompare()

  const bike = ALL_BIKES.find(b => b.id === id)
  const backSearch = location.state?.fromSearch ?? ''
  const backHref = `/bikes${backSearch}`
  const inCompare = bike ? isIn(bike.id) : false

  if (!bike) {
    return (
      <div className="py-20 text-center">
        <p className="text-stone-400">Bike nicht gefunden.</p>
        <Link to="/bikes" className="mt-3 inline-block text-sm text-terracotta-600 hover:underline">
          ← Zurück zur Liste
        </Link>
      </div>
    )
  }

  const preis = bike.preis_chf
    ? formatChf(bike.preis_chf)
    : bike.preis_eur
    ? formatEur(bike.preis_eur)
    : null

  const preisNeben = bike.preis_chf && bike.preis_eur
    ? `EUR ${bike.preis_eur.toLocaleString('de-CH')}`
    : null

  const hatProduktseite = bike.produktseite_url && bike.produktseite_url !== 'NOT_SPECIFIED'
  const hatHersteller   = bike.hersteller_url && bike.hersteller_url !== 'NOT_SPECIFIED'
  const motorId         = motorWissenId(bike.motor.hersteller)

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      {/* Breadcrumb + Compare-Toggle */}
      <div className="flex items-center justify-between gap-4">
        <Link
          to={backHref}
          className="inline-flex items-center gap-1.5 text-sm text-stone-400 hover:text-terracotta-600 transition-colors"
        >
          <ArrowLeft size={14} />
          Zurück zur Liste
        </Link>

        <button
          onClick={() => toggle(bike.id)}
          className={`inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border transition-colors ${
            inCompare
              ? 'border-terracotta-500 bg-terracotta-50 text-terracotta-700'
              : 'border-stone-200 text-stone-500 hover:border-terracotta-400 hover:text-terracotta-600'
          }`}
        >
          {inCompare ? <Check size={13} strokeWidth={2.5} /> : <Plus size={13} />}
          {inCompare ? 'Im Vergleich' : 'In Vergleich'}
        </button>
      </div>

      {/* ── Sektion 1: Hero ── */}
      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
        <div className="flex flex-col sm:flex-row">
          <div className="relative sm:w-72 shrink-0 aspect-[4/3] sm:aspect-auto bg-white flex items-center justify-center overflow-hidden p-4">
            {bike.bild_pfad ? (
              <img
                src={bike.bild_pfad}
                alt={`${bike.hersteller} ${bike.modell}`}
                className="w-full h-full object-contain"
                loading="eager"
                onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
              />
            ) : (
              <Bike size={52} className="text-terracotta-200" strokeWidth={1.25} />
            )}
            <span className="absolute top-3 right-3 bg-terracotta-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
              {bike.passend_fuer_martina_score}/10
            </span>
          </div>
          <div className="flex flex-col gap-4 p-6 justify-center">
            <div>
              <p className="text-xs text-stone-400 mb-1">{bike.kategorie} · {bike.modelljahr}</p>
              <h1 className="text-2xl font-bold text-stone-900 leading-snug">{bike.hersteller}</h1>
              <h2 className="text-xl font-semibold text-stone-700 leading-snug">{bike.modell}</h2>
            </div>
            <div>
              {preis ? (
                <span className="text-2xl font-bold text-stone-900">{preis}</span>
              ) : (
                <span className="text-stone-400 italic text-sm">Preis auf Anfrage</span>
              )}
              {preisNeben && (
                <span className="ml-2 text-base text-stone-400">{preisNeben}</span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {hatHersteller && (
                <a
                  href={bike.hersteller_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm px-3.5 py-1.5 rounded-lg bg-terracotta-500 text-white hover:bg-terracotta-600 transition-colors"
                >
                  Zum Hersteller <ExternalLink size={13} />
                </a>
              )}
              {hatProduktseite && (
                <a
                  href={bike.produktseite_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm px-3.5 py-1.5 rounded-lg border border-stone-200 text-stone-600 hover:border-terracotta-400 hover:text-terracotta-600 transition-colors"
                >
                  Produktseite <ExternalLink size={13} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Sektion 2: Passt zu Martina? ── */}
      <SpecCard title={bike.bewertung_detail ? "Passt zu Martina? — Detail-Bewertig" : "Passt zu Martina?"}>
        <div className="space-y-5">
          <ScoreGauge score={bike.passend_fuer_martina_score ?? bike.score} />
          <p className="text-sm text-stone-600 leading-relaxed">
            {bike.passend_fuer_martina_begruendung}
          </p>
          {(bike.warnungen?.length ?? 0) > 0 && (
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 flex gap-3">
              <AlertTriangle size={16} className="text-amber-500 shrink-0 mt-0.5" />
              <div className="space-y-1">
                {bike.warnungen?.map((w, i) => (
                  <p key={i} className="text-sm text-amber-800 leading-relaxed">{w}</p>
                ))}
              </div>
            </div>
          )}

          {/* Spinnendiagramm */}
          {bike.bewertung_kategorien && (
            <>
              <hr className="border-stone-100" />
              <div>
                <p className="text-xs font-semibold tracking-widest text-stone-400 uppercase mb-1">
                  Fähigkeits-Profil (0–10)
                </p>
                <BewertungRadar bewertung={bike.bewertung_kategorien} size="md" />
              </div>
            </>
          )}

          {/* Pro-Liste */}
          {bike.bewertung_detail?.pro && bike.bewertung_detail.pro.length > 0 && (
            <>
              <hr className="border-stone-100" />
              <div>
                <p className="text-xs font-semibold tracking-widest text-stone-400 uppercase mb-3">
                  Was spricht dafür
                </p>
                <ul className="space-y-2">
                  {bike.bewertung_detail.pro.map((punkt, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 size={15} className="text-green-500 shrink-0 mt-0.5" />
                      <span className="text-sm text-stone-700 leading-snug">{punkt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {/* Contra-Liste */}
          {bike.bewertung_detail?.contra && bike.bewertung_detail.contra.length > 0 && (
            <>
              <hr className="border-stone-100" />
              <div>
                <p className="text-xs font-semibold tracking-widest text-stone-400 uppercase mb-3">
                  Was spricht degege
                </p>
                <ul className="space-y-2">
                  {bike.bewertung_detail.contra.map((punkt, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <XCircle size={15} className="text-red-400 shrink-0 mt-0.5" />
                      <span className="text-sm text-stone-700 leading-snug">{punkt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {/* Fazit */}
          {bike.bewertung_detail?.fazit && (
            <>
              <hr className="border-stone-100" />
              <div className="pl-4 border-l-2 border-terracotta-400">
                <p className="text-xs font-semibold tracking-widest text-stone-400 uppercase mb-2">
                  Mein Senf dazu
                </p>
                <p className="text-sm text-stone-600 leading-relaxed italic">
                  {bike.bewertung_detail.fazit}
                </p>
              </div>
            </>
          )}
        </div>
      </SpecCard>

      {/* ── Sektion 2b: Verfügbarkeit ── */}
      {bike.verfuegbarkeit && (() => {
        const vf = bike.verfuegbarkeit!
        const statusMap: Record<string, { label: string; bg: string; border: string; dot: string; text: string }> = {
          ausverkauft:    { label: 'Usverchauft',          bg: 'bg-red-50',    border: 'border-red-200',    dot: 'bg-red-500',    text: 'text-red-800' },
          teilverfuegbar: { label: 'Teilwiis verfüegbar',  bg: 'bg-orange-50', border: 'border-orange-200', dot: 'bg-orange-500', text: 'text-orange-800' },
          verfuegbar:     { label: 'Verfüegbar',           bg: 'bg-green-50',  border: 'border-green-200',  dot: 'bg-green-500',  text: 'text-green-800' },
          unbekannt:      { label: 'Verfüegbarkeit prüfe', bg: 'bg-stone-50',  border: 'border-stone-200',  dot: 'bg-stone-400',  text: 'text-stone-600' },
        }
        const statusConfig = statusMap[vf.status] ?? statusMap['unbekannt']

        const datumFormatiert = vf.geprueft_am
          ? new Date(vf.geprueft_am).toLocaleDateString('de-CH', { day: 'numeric', month: 'long', year: 'numeric' })
          : null
        const domain = vf.geprueft_quelle
          ? (() => { try { return new URL(vf.geprueft_quelle).hostname.replace('www.', '') } catch { return vf.geprueft_quelle } })()
          : null

        return (
          <SpecCard title="Verfüegbarkeit">
            <div className="space-y-3">
              <div className={`flex items-center gap-2.5 rounded-lg border px-4 py-3 ${statusConfig.bg} ${statusConfig.border}`}>
                <span className={`w-2 h-2 rounded-full shrink-0 ${statusConfig.dot}`} />
                <span className={`text-sm font-semibold ${statusConfig.text}`}>{statusConfig.label}</span>
              </div>
              {vf.hinweis && (
                <p className="text-sm text-stone-600 leading-relaxed">{vf.hinweis}</p>
              )}
              {(datumFormatiert || domain) && (
                <p className="text-xs text-stone-400">
                  Gprüeft am {datumFormatiert}
                  {domain && (
                    <> uf {vf.geprueft_quelle ? (
                      <a href={vf.geprueft_quelle} target="_blank" rel="noopener noreferrer" className="underline hover:text-terracotta-500 transition-colors">{domain}</a>
                    ) : domain}</>
                  )}
                </p>
              )}
            </div>
          </SpecCard>
        )
      })()}

      {/* ── Sektion 3: Spezifikationen ── */}
      <SpecCard title="Spezifikationen">

        <GroupLabel>Rahmen</GroupLabel>
        <SpecRow label="Material">{v(bike.rahmen?.material ?? bike.rahmen_material)}</SpecRow>
        <SpecRow label="Reach (Grösse L)">{bike.rahmen?.groesse_L_reach_mm != null ? `${bike.rahmen.groesse_L_reach_mm} mm` : '–'}</SpecRow>
        <SpecRow label="Stack (Grösse L)">{bike.rahmen?.groesse_L_stack_mm != null ? `${bike.rahmen.groesse_L_stack_mm} mm` : '–'}</SpecRow>
        <SpecRow label="Lenkwinkel">{bike.rahmen?.lenkwinkel_grad != null ? `${bike.rahmen.lenkwinkel_grad}°` : '–'}</SpecRow>
        <SpecRow label="Sitzwinkel (effektiv)">{bike.rahmen?.sitzwinkel_effektiv_grad != null ? `${bike.rahmen.sitzwinkel_effektiv_grad}°` : '–'}</SpecRow>
        <SpecRow label="Radstand">{bike.rahmen?.radstand_mm != null ? `${bike.rahmen.radstand_mm} mm` : '–'}</SpecRow>
        <SpecRow label="Kettenstrebe">{bike.rahmen?.kettenstrebe_mm != null ? `${bike.rahmen.kettenstrebe_mm} mm` : '–'}</SpecRow>

        <GroupLabel>Fahrwerk</GroupLabel>
        <SpecRow label="Federweg vorne">{bike.federweg?.vorne_mm ?? bike.federweg_vorne ?? '–'}{(bike.federweg?.vorne_mm ?? bike.federweg_vorne) != null ? ' mm' : ''}</SpecRow>
        <SpecRow label="Federweg hinten">{bike.federweg?.hinten_mm ?? bike.federweg_hinten ?? '–'}{(bike.federweg?.hinten_mm ?? bike.federweg_hinten) != null ? ' mm' : ''}</SpecRow>
        <SpecRow label="Gabel">
          <ExtLink href={bike.federweg?.gabel_url ?? ''}>{v(bike.federweg?.gabel_modell)}</ExtLink>
        </SpecRow>
        <SpecRow label="Dämpfer">
          <ExtLink href={bike.federweg?.daempfer_url ?? ''}>{v(bike.federweg?.daempfer_modell)}</ExtLink>
        </SpecRow>

        <GroupLabel>Antrieb</GroupLabel>
        <SpecRow label="Motor">
          <ExtLink href={bike.motor?.hersteller_url}>
            {bike.motor?.hersteller} {bike.motor?.modell}
          </ExtLink>
        </SpecRow>
        <SpecRow label="Drehmoment">{bike.motor?.drehmoment_nm ?? '–'} Nm</SpecRow>
        <SpecRow label="Spitzenleistung">{bike.motor?.leistung_spitze_w ?? '–'} W</SpecRow>
        <SpecRow label="Akku-Kapazität">{bike.akku?.kapazitaet_wh ?? '–'} Wh</SpecRow>
        <SpecRow label="Akku wechselbar">{bool(bike.akku?.wechselbar)}</SpecRow>
        <SpecRow label="Range Extender">{bool(bike.akku?.range_extender_optional)}</SpecRow>
        {motorId && (
          <div className="pt-2">
            <Link
              to={`/wissen/motoren#${motorId}`}
              className="inline-flex items-center gap-1 text-sm text-terracotta-600 hover:underline"
            >
              Mehr über diesen Motor →
            </Link>
          </div>
        )}

        <GroupLabel>Ausstattung</GroupLabel>
        <SpecRow label="Schaltung">
          <ExtLink href={bike.ausstattung.schaltung_url ?? ''}>{v(bike.ausstattung.schaltung)}</ExtLink>
        </SpecRow>
        <SpecRow label="Bremsen">
          <ExtLink href={bike.ausstattung.bremsen_url ?? ''}>{v(bike.ausstattung.bremsen)}</ExtLink>
        </SpecRow>
        <SpecRow label="Laufräder">
          <ExtLink href={bike.ausstattung.laufraeder_url ?? ''}>{v(bike.ausstattung.laufraeder)}</ExtLink>
        </SpecRow>
        {/* TODO #70: beide Reifen-Zeilen nutzen reifen_url — separate reifen_vorne_url / reifen_hinten_url wären sinnvoll */}
        <SpecRow label="Reifen vorne">
          <ExtLink href={bike.ausstattung.reifen_url ?? ''}>{v(bike.ausstattung.reifen_vorne)}</ExtLink>
        </SpecRow>
        <SpecRow label="Reifen hinten">
          <ExtLink href={bike.ausstattung.reifen_url ?? ''}>{v(bike.ausstattung.reifen_hinten)}</ExtLink>
        </SpecRow>
        <SpecRow label="Cockpit">{v(bike.ausstattung.cockpit)}</SpecRow>

        <GroupLabel>Gewicht & Räder</GroupLabel>
        <SpecRow label="Gewicht">
          {bike.gewicht_kg !== null ? `${bike.gewicht_kg} kg` : '–'}
        </SpecRow>
        <SpecRow label="Laufradgrösse">{v(bike.laufradgroesse)}</SpecRow>

      </SpecCard>

      {/* ── Sektion 4: Tests & Reviews ── */}
      {(bike.test_ergebnisse?.length ?? 0) > 0 && (
        <SpecCard title="Tests & Reviews">
          <div className="space-y-5">
            {bike.test_ergebnisse!.map((test, i) => {
              const hatTestUrl = test.test_url && test.test_url !== 'NOT_SPECIFIED'
              return (
                <div key={i} className="border border-stone-100 rounded-lg p-4 space-y-3">

                  {/* Kopfzeile */}
                  <div className="flex items-baseline justify-between gap-2 flex-wrap">
                    <span className="font-semibold text-stone-800 text-sm">{test.publikation}</span>
                    {test.datum && (
                      <span className="text-xs text-stone-400">{test.datum}</span>
                    )}
                  </div>

                  {/* Bewertungs-Badge */}
                  <span className="inline-block text-xs font-medium px-2.5 py-1 rounded-full bg-terracotta-50 text-terracotta-700">
                    {test.bewertung_kurz}
                  </span>

                  {/* Stärken / Schwächen */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {(test.stärken?.length ?? 0) > 0 && (
                      <div className="space-y-1.5">
                        <p className="text-[10px] font-semibold tracking-widest text-stone-400 uppercase mb-2">Stärken</p>
                        {test.stärken.map((s, j) => (
                          <div key={j} className="flex items-start gap-2">
                            <CheckCircle2 size={13} className="text-emerald-500 shrink-0 mt-0.5" />
                            <span className="text-sm text-stone-600 leading-snug">{s}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {(test.schwaechen?.length ?? 0) > 0 && (
                      <div className="space-y-1.5">
                        <p className="text-[10px] font-semibold tracking-widest text-stone-400 uppercase mb-2">Schwächen</p>
                        {test.schwaechen.map((s, j) => (
                          <div key={j} className="flex items-start gap-2">
                            <AlertCircle size={13} className="text-orange-400 shrink-0 mt-0.5" />
                            <span className="text-sm text-stone-600 leading-snug">{s}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Test-Link */}
                  {hatTestUrl && (
                    <div className="flex justify-end pt-1">
                      <a
                        href={test.test_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-terracotta-600 hover:underline"
                      >
                        Test lesen <ExternalLink size={12} />
                      </a>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </SpecCard>
      )}

      {/* ── Sektion 5: Kauf-Optionen ── */}
      <SpecCard title="Kauf-Optionen">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          {/* Schweiz */}
          <div>
            <GroupLabel>Schweiz</GroupLabel>
            {bike.verfuegbarkeit_ch.haendler.length === 0 ||
            (bike.verfuegbarkeit_ch.haendler.length === 1 && bike.verfuegbarkeit_ch.haendler[0] === 'NOT_SPECIFIED') ? (
              <p className="text-sm text-stone-400 italic">
                Keine CH-Händler hinterlegt — frag beim lokalen Fachhandel nach.
              </p>
            ) : (
              <ul className="space-y-2">
                {bike.verfuegbarkeit_ch.haendler.map((haendler, i) => {
                  const haendlerName = typeof haendler === 'string' ? haendler : (haendler as { name?: string }).name ?? '–'
                  const url = (typeof haendler === 'object' && (haendler as { url?: string }).url)
                    ? (haendler as { url: string }).url
                    : bike.verfuegbarkeit_ch.urls[i] ?? null
                  const hatProbefahrt = !!bike.verfuegbarkeit_ch.probefahrt_moeglich
                  return (
                    <li key={i} className="flex items-center gap-2 flex-wrap">
                      {url ? (
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-terracotta-600 hover:underline"
                        >
                          {haendlerName} <ExternalLink size={11} />
                        </a>
                      ) : (
                        <span className="text-sm text-stone-700">{haendlerName}</span>
                      )}
                      {hatProbefahrt && (
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Probefahrt möglich
                        </span>
                      )}
                    </li>
                  )
                })}
              </ul>
            )}
          </div>

          {/* Direktversand */}
          <div>
            <GroupLabel>Direktversand</GroupLabel>
            {!bike.verfuegbarkeit_de_direkt?.shop || bike.verfuegbarkeit_de_direkt.shop === 'NOT_SPECIFIED' ? (
              <p className="text-sm text-stone-400 italic">Kein Direktversand bekannt.</p>
            ) : (
              <div className="space-y-1.5">
                <p className="text-sm font-semibold text-stone-800">
                  {bike.verfuegbarkeit_de_direkt.shop}
                </p>
                {bike.verfuegbarkeit_de_direkt.lieferzeit_tage && (
                  <p className="text-xs text-stone-400">
                    Lieferzeit ca. {bike.verfuegbarkeit_de_direkt.lieferzeit_tage} Tage
                  </p>
                )}
                {bike.verfuegbarkeit_de_direkt.url &&
                  bike.verfuegbarkeit_de_direkt.url !== 'NOT_SPECIFIED' && (
                  <a
                    href={bike.verfuegbarkeit_de_direkt.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 mt-1 rounded-lg border border-terracotta-400 text-terracotta-600 hover:bg-terracotta-50 transition-colors"
                  >
                    Zum Shop <ExternalLink size={12} />
                  </a>
                )}
              </div>
            )}
          </div>

        </div>
      </SpecCard>

      {/* ── Sektion 6: Ähnliche Bikes ── */}
      {(bike.alternativ_zu?.length ?? 0) > 0 && (
        <SpecCard title="Ähnliche Bikes">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {bike.alternativ_zu.map(altName => {
              const match = ALL_BIKES.find(b =>
                altName.toLowerCase().includes(b.hersteller.toLowerCase()) &&
                altName.toLowerCase().includes(b.modell.toLowerCase().split(' ')[0])
              ) ?? ALL_BIKES.find(b =>
                (b.hersteller + ' ' + b.modell).toLowerCase().includes(altName.toLowerCase().split(' ').slice(0, 2).join(' '))
              )

              if (match) {
                const altPreis = match.preis_chf
                  ? formatChf(match.preis_chf)
                  : match.preis_eur
                  ? formatEur(match.preis_eur)
                  : null

                return (
                  <Link
                    key={altName}
                    to={`/bikes/${match.id}`}
                    state={{ fromSearch: location.search }}
                    className="group flex flex-col bg-white border border-stone-200 rounded-xl overflow-hidden hover:border-terracotta-400 transition-colors"
                  >
                    <div className="relative aspect-[4/3] bg-white flex items-center justify-center overflow-hidden p-2">
                      {match.bild_pfad ? (
                        <img
                          src={match.bild_pfad}
                          alt={`${match.hersteller} ${match.modell}`}
                          className="w-full h-full object-contain"
                          loading="lazy"
                          onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                        />
                      ) : (
                        <Bike size={24} className="text-terracotta-200" strokeWidth={1.25} />
                      )}
                      <span className="absolute top-2 right-2 bg-terracotta-500 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
                        {match.passend_fuer_martina_score}/10
                      </span>
                    </div>
                    <div className="p-3">
                      <p className="text-xs font-semibold text-stone-800 leading-snug group-hover:text-terracotta-700 transition-colors">
                        {match.hersteller} {match.modell}
                      </p>
                      {altPreis && (
                        <p className="text-xs text-stone-400 mt-0.5">{altPreis}</p>
                      )}
                    </div>
                  </Link>
                )
              }

              // Kein Match → Google-Suche
              const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(altName + ' E-MTB')}`
              return (
                <a
                  key={altName}
                  href={googleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col justify-between bg-stone-50 border border-stone-200 rounded-xl p-3 hover:border-stone-300 transition-colors"
                >
                  <p className="text-xs font-semibold text-stone-700 leading-snug">{altName}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <p className="text-[10px] text-stone-400">Nicht in unserer Auswahl</p>
                    <ExternalLink size={10} className="text-stone-400 shrink-0" />
                  </div>
                </a>
              )
            })}
          </div>
        </SpecCard>
      )}

    </div>
  )
}
