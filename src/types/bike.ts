export type BewertungKategorien = {
  geometrie_rahmengroesse: number       // 1-10
  einsteigerfreundlichkeit: number
  bergauf_touren: number
  bikepark_reserve: number
  gewicht_handling: number
  preis_leistung: number
  service_haendlernetz_ch: number
  risiko_datenunsicherheit: number
}

export type BewertungDetail = {
  pro: string[]
  contra: string[]
  fazit?: string
}

export type Preise = {
  uvp_chf?: number
  uvp_eur?: number
  uvp_chf_geschaetzt?: boolean
  sale_chf?: number | null
  sale_haendler?: string | null
  sale_url?: string
  preis_hinweis?: string
}

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
  /** Altes Schema-Feld; neues Schema nutzt `jahr` */
  modelljahr?: number
  /** Neues Schema-Feld; altes Schema nutzt `modelljahr` */
  jahr?: number
  /** Altes Schema-Feld; neues Schema nutzt `konzept` */
  kategorie?: string
  /** Neues Schema-Feld; altes Schema nutzt `kategorie` */
  konzept?: string
  hersteller_url?: string
  produktseite_url?: string
  /** Altes Schema: Flat-Feld; neues Schema nutzt `preise.uvp_chf` */
  preis_chf?: number | null
  /** Altes Schema: Flat-Feld; neues Schema nutzt `preise.uvp_eur` */
  preis_eur?: number | null
  preis_quelle_url?: string
  /** Altes Schema: Nested-Objekt; neues Schema nutzt flache Felder `rahmen_material` etc. */
  rahmen?: {
    material: string
    groessen_verfuegbar: string[]
    groesse_L_reach_mm: number | null
    groesse_L_stack_mm: number | null
    lenkwinkel_grad: number | null
    sitzwinkel_effektiv_grad: number | null
    radstand_mm: number | null
    kettenstrebe_mm: number | null
  }
  /** Neues Schema: Flat-Feld; altes Schema nutzt `rahmen.material` */
  rahmen_material?: string
  /** Altes Schema: Nested-Objekt; neues Schema nutzt flache Felder `federweg_vorne/hinten` */
  federweg?: {
    vorne_mm: number
    hinten_mm: number
    gabel_modell: string
    gabel_url: string
    daempfer_modell: string
    daempfer_url: string
  }
  /** Neues Schema: Flat-Feld; altes Schema nutzt `federweg.vorne_mm` */
  federweg_vorne?: number
  /** Neues Schema: Flat-Feld; altes Schema nutzt `federweg.hinten_mm` */
  federweg_hinten?: number
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
  /** Altes Schema; neues Schema nutzt `score` */
  passend_fuer_martina_score?: number
  /** Neues Schema; altes Schema nutzt `passend_fuer_martina_score` */
  score?: number
  passend_fuer_martina_begruendung?: string
  warnungen?: string[]
  alternativ_zu: string[]
  referenzbike?: boolean
  badge?: string
  verfuegbarkeit?: Verfuegbarkeit
  preise?: Preise
  bewertung_kategorien?: BewertungKategorien
  bewertung_detail?: BewertungDetail
}
