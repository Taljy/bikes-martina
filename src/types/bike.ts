export type Verfuegbarkeit = {
  status: 'verfuegbar' | 'teilverfuegbar' | 'ausverkauft' | 'unbekannt'
  hinweis?: string
  geprueft_am?: string        // ISO-Datum, z.B. "2026-04-25"
  geprueft_quelle?: string    // URL
}

export interface Bike {
  id: string
  bild_pfad?: string
  hersteller: string
  modell: string
  modelljahr: number
  kategorie: string
  hersteller_url: string
  produktseite_url: string
  preis_chf: number | null
  preis_eur: number | null
  preis_quelle_url: string
  rahmen: {
    material: string
    groessen_verfuegbar: string[]
    groesse_L_reach_mm: number | null
    groesse_L_stack_mm: number | null
    lenkwinkel_grad: number | null
    sitzwinkel_effektiv_grad: number | null
    radstand_mm: number | null
    kettenstrebe_mm: number | null
  }
  federweg: {
    vorne_mm: number
    hinten_mm: number
    gabel_modell: string
    gabel_url: string
    daempfer_modell: string
    daempfer_url: string
  }
  motor: {
    hersteller: string
    modell: string
    drehmoment_nm: number
    leistung_spitze_w: number
    hersteller_url: string
  }
  akku: {
    kapazitaet_wh: number
    wechselbar: boolean
    range_extender_optional: boolean
  }
  ausstattung: {
    schaltung: string
    schaltung_url: string
    bremsen: string
    bremsen_url: string
    laufraeder: string
    laufraeder_url: string
    reifen_vorne: string
    reifen_hinten: string
    reifen_url: string
    cockpit: string
  }
  gewicht_kg: number | null
  laufradgroesse: string
  verfuegbarkeit_ch: {
    haendler: string[]
    probefahrt_moeglich: string
    urls: string[]
  }
  verfuegbarkeit_de_direkt: {
    shop: string
    lieferzeit_tage: number | null
    url: string
  }
  test_ergebnisse: Array<{
    publikation: string
    bewertung_kurz: string
    stärken: string[]
    schwaechen: string[]
    test_url: string
    datum: string
  }>
  passend_fuer_martina_score: number
  passend_fuer_martina_begruendung: string
  warnungen: string[]
  alternativ_zu: string[]
  referenzbike?: boolean
  badge?: string
  verfuegbarkeit?: Verfuegbarkeit
}
