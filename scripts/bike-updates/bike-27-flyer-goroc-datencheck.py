#!/usr/bin/env python3
import json, sys

with open('src/data/bikes.json', 'r', encoding='utf-8') as f:
    bikes = json.load(f)

OLD_ID = 'flyer-goroc-x-670-2022'
NEW_ID = 'flyer-goroc-x-6-70-2026'

idx = next((i for i, b in enumerate(bikes) if b['id'] == OLD_ID), None)
if idx is None:
    print(f'ERROR: {OLD_ID} not found!'); sys.exit(1)

new_entry = {
  "id": "flyer-goroc-x-6-70-2026",
  "hersteller": "FLYER",
  "modell": "Goroc X 6.70 (G2)",
  "modell_hinweis": "REFERENZ-BIKE: Dies ist Martinas AKTUELLES Bike — KEIN Upgrade-Kandidat sondern Vergleichs-Referenz, gegen die alle anderen Bikes in der Liste positioniert werden. KATEGORIE-WICHTIG: Goroc X ist ein Cross/SUV-eMTB (Crossover), KEIN pures Trail-MTB! FLYER vermarktet es als 'Cross E-Bike mit hybrider Ausstattung — wie ein E-Mountainbike abgefedert, aber mit City-Komponenten'. ZWEI GENERATIONEN: G1 (2023, Panasonic GX Ultimate Pro + 750 Wh) und G2 (2025/2026, Bosch CX Gen5 + 800 Wh + Magura ABS). Diese Bewertung gilt für G2. Verfügbar als 25 km/h Pedelec (CHF 6'999) oder 45 km/h S-Pedelec HS-Variante (CHF 7'599 UVP, aktuell CHF 5'999 Sale).",
  "jahr": 2026,
  "modelljahr": 2026,
  "passend_fuer_martina_score": 5,
  "kategorie": "Cross/SUV-eMTB",
  "referenzbike": True,
  "badge": "Mis Bike",
  "preis_chf": 6999,
  "preis_chf_geschaetzt": False,
  "preis_eur": 6499,
  "preis_hinweis": "UVP CHF 6'999 verifiziert auf radsportstutz.ch (Schweizer FLYER-Händler) für G2 Goroc X 6.70 in Grösse M. Die HS-Variante (45 km/h S-Pedelec) kostet CHF 7'599 UVP / aktuell CHF 5'999 Sale (-21%). G1-Vorjahresmodell war CHF 4'399 Sale (-38% von CHF 7'099 UVP). Im Vergleich zum Trail-MTB-Kontext: CHF 6'999 ist CHF 2'000 TEURER als Cube ONE44 SLX 800 (Score 9, CHF 4'999 mit echtem Trail-MTB Federweg + besseren Komponenten). Aber: Direkter Preis-Vergleich nicht fair, da Goroc X andere Kategorie ist.",
  "rahmen": {
    "material": "Aluminium (FLYER engineered, hydroformed tubing, 4-link suspension)",
    "konzept": "Cross/SUV-eMTB (Crossover für Strasse + Gelände + Alltag) — NICHT pures Trail-MTB!"
  },
  "federweg": {
    "vorne_mm": 140,
    "hinten_mm": 125
  },
  "gewicht_kg": 26.0,
  "gewicht_hinweis": "~26 kg geschätzt (FLYER hat keine offizielle Gewichtsangabe für G2 publiziert). Schwerer als reine Trail-MTBs wegen Cross/SUV-Konzept (zusätzliches Gewicht durch StVZO-Beleuchtung, robustes Cockpit, Nobby Nic Reifen, 4-Link-Hinterbau). Vergleich: Cube ONE44 SLX 800 (Score 9) ~24 kg, Cube ONE77 HPC SLX 800 (Score 9) ~24,5 kg — Goroc X ist 1,5-2 kg schwerer.",
  "motor": {
    "hersteller": "Bosch",
    "modell": "Performance Line CX Smart System",
    "drehmoment_nm": 85,
    "leistung_spitze_w": 600,
    "hersteller_url": "https://www.bosch-ebike.com/ch/produkte/performance-line-cx",
    "hinweis": "G2 — UPDATE von Panasonic GX bei G1! 85 Nm Drehmoment Standard, BIS 100 Nm via Bosch Flow App, 600 W peak power. Einer der stärksten Motoren der Liste auf gleicher Höhe wie Cube/Orbea Score 9 Bikes."
  },
  "akku": {
    "kapazitaet_wh": 800,
    "wechselbar": True,
    "range_extender_optional": True,
    "hinweis": "800 Wh Bosch PowerTube ENTNEHMBAR. Bosch PowerMore 250 Wh Range Extender kompatibel = bis 1'050 Wh kombinierte Kapazität. Vorgänger G1 hatte 750 Wh FLYER FIB Akku mit 540 Wh FIT Range Extender (= bis 1'290 Wh) — G2 ist mit 800 Wh + 250 Wh = 1'050 Wh effektiv leicht weniger Range-Reserve, aber moderne Bosch-Tech."
  },
  "laufradgroesse": '29"',
  "ausstattung": {
    "schaltung": "Shimano XT LinkGlide SL-M8130-R, 11-fach (NICHT 12-fach!), Kassette CS-LG700 CUES 11-50t",
    "schaltung_url": "https://bike.shimano.com",
    "bremsen": "Magura Gustav Pro ABS 4-Kolben (G2 mit ABS!) — UNIQUE in der ganzen Liste, einziges Bike mit ABS!",
    "bremsen_url": "https://www.magura.com",
    "laufraeder": "29\" Standard (M-XL) / 27.5\" (S Grösse)",
    "laufraeder_url": None,
    "reifen_vorne": "Schwalbe Nobby Nic E-50 29x2.40\" — Allround SUV-Reifen",
    "reifen_hinten": "Schwalbe Nobby Nic E-50 29x2.40\" — Allround SUV-Reifen",
    "reifen_url": "https://www.schwalbe.com",
    "cockpit": "Bosch Kiox 500 Display + Ergotec Riser Bar 30 Comfort 780mm 16° + FLYER ONE HL-2 Frontlicht 100 Lux + Dropper Post 100/125/150mm"
  },
  "geometrie_features": [
    "FLYER engineered Aluminium-Rahmen mit hydroformed tubing",
    "4-Link Suspension Design (Trek-ähnlich, FLYER-eigene Bauart)",
    "Federweg Hinten: 125 mm (Trail-Light, NICHT Trail/Enduro)",
    "Federweg Vorne: 140 mm Fox AWL HD Gabel",
    "29\" Laufräder Standard, 27.5\" nur in Grösse S",
    "Cross/SUV-Geometrie für aufrechte Komfort-Sitzposition",
    "150 kg zulässiges Gesamtgewicht (Top-Stabilität)",
    "Intern verlegte Kabel + integrierter Speed Sensor",
    "Range Extender Schnittstelle ab Werk vorbereitet",
    "Boost 148 Hinterachse",
    "FLYER ONE Side Rail kompatibel für Seitentaschen + Monkey-Load Schnittstelle"
  ],
  "groessen_hinweis": "Erhältlich in S, M, L, XL — Grösse L empfohlen für 1.80m Körpergrösse (Martinas Grösse)",
  "produktseite_url": "https://www.flyer-bikes.com/ch-de/produkte/e-mountainbikes/goroc-x",
  "haendler_ch": "FLYER ist eine SCHWEIZER MARKE (gegründet 1995, Hauptsitz Huttwil, Bern). SEHR STARKES CH-Händlernetz mit dutzenden FLYER-Spezialgeschäften (Stromvelo, TS-Velos, Radsport Stutz, Velo Schwarz, dutzende mehr). Made in Switzerland Premium-Positionierung. CH-Distribution direkt über FLYER mit kurzen Service-Wegen. 5 Jahre Garantie (2 + 3 freiwillig) für FLYER E-Bikes. Service-Profil ist DAS BESTE der ganzen Liste für CH-Käufer.",
  "smart_features": ["Bosch Smart System", "Bosch eBike Flow App", "Bosch Kiox 500 Color Display", "Bosch System Controller", "Bosch Mini Remote", "Magura Gustav Pro ABS (Anti-Blockier-System!)", "Walk Assist", "Range Extender ready"],
  "garantie_besonderheit": "FLYER 5-Jahre-Garantie-Konzept: 2 Jahre Gewährleistung + 3 Jahre freiwillige Garantie. Stärker als die meisten Konkurrenten in der Liste.",
  "verfuegbarkeit_ch": {
    "haendler": [
      "Radsport Stutz AG (Fahrwangen AG) — G2 Goroc X 6.70 CHF 6'999",
      "Stromvelo (CH) — G1 CHF 4'399 Sale / HS-Variante CHF 5'999 Sale",
      "TS-Velos GmbH (CH) — G1 mit CHF 1'300 Rabatt",
      "FLYER offizielle Schweizer Produktseite — alle FLYER-Fachhändler"
    ],
    "status": "verfuegbar",
    "probefahrt_moeglich": True,
    "urls": [
      "https://www.radsportstutz.ch/flyer-g2-goroc-x-6-70-jasper-green-gloss-m",
      "https://www.stromvelo.ch/showstock/ebikes/Flyer/goroc_x/goroc_x_6_70_hs_2023",
      "https://www.ts-velos.ch/produkt/flyer-goroc-x-6-70/",
      "https://www.flyer-bikes.com/ch-de/produkte/e-mountainbikes/goroc-x"
    ]
  },
  "verfuegbarkeit": {
    "status": "verfuegbar",
    "hinweis": "Sehr gute CH-Verfügbarkeit über dutzende FLYER-Spezialgeschäfte CH-weit. UVP CHF 6'999 für G2 Variante. G1 Vorjahresmodell und HS-Variante mit deutlichen Rabatten verfügbar (-21% bis -38%). Probefahrten an vielen CH-Standorten möglich — DAS BESTE CH-Service-Netz der ganzen Liste für Schweizer Käufer.",
    "geprueft_am": "2026-04-26",
    "geprueft_quelle": "https://www.radsportstutz.ch/flyer-g2-goroc-x-6-70-jasper-green-gloss-m"
  },
  "bewertung_kategorien": {
    "geometrie_rahmengroesse": 5,
    "einsteigerfreundlichkeit": 9,
    "bergauf_touren": 7,
    "bikepark_reserve": 3,
    "gewicht_handling": 4,
    "preis_leistung": 4,
    "service_haendlernetz_ch": 10,
    "risiko_datenunsicherheit": 9
  },
  "bewertung_detail": {
    "pro": [
      "SCHWEIZER MARKE (FLYER seit 1995, Huttwil, Bern) — DAS BESTE CH-Service-Netz der ganzen Liste mit dutzenden FLYER-Spezialgeschäften",
      "Bosch Performance Line CX Smart System (G2-Update von Panasonic) — auf gleicher Höhe wie Cube/Orbea Score 9 Bikes",
      "800 Wh Bosch PowerTube ENTNEHMBAR mit Range Extender kompatibel (bis 1'050 Wh kombiniert)",
      "MAGURA GUSTAV PRO ABS Bremsen — UNIQUE in der ganzen Liste! Einziges Bike mit Anti-Blockier-System (ABS) — wichtige Sicherheits-Innovation",
      "5-Jahre-Garantie-Konzept (2 + 3 freiwillig) — stärker als die meisten Konkurrenten",
      "150 kg zulässiges Gesamtgewicht — sehr robust, ideal für Bikepacking + schwere Lasten",
      "FLYER ONE Beleuchtung integriert (100 Lux Frontlicht mit Tagfahrlicht + Rücklicht) — StVZO-konform, sofort einsatzbereit für Strasse",
      "FLYER ONE Side Rail kompatibel mit Monkey-Load Schnittstelle für Seitentaschen",
      "Bosch Kiox 500 Display (3.5\" Color) mit Smartphone-Anbindung",
      "Range Extender Schnittstelle ab Werk vorbereitet — einfacher Reichweiten-Upgrade",
      "Probefahrten an dutzenden CH-Standorten möglich (im Gegensatz zu DTC-Marken wie Canyon/Commencal/AMFLOW)",
      "VIELSEITIG: Strasse + Gelände + Alltag + Bikepacking + Pendlerverkehr — ein Bike für alle Use-Cases",
      "Made in Switzerland Premium-Positionierung",
      "Schwalbe Nobby Nic E-50 Reifen mit guten Allround-Eigenschaften",
      "G1 Vorjahresmodell aktuell -38% Sale (CHF 4'399) — sehr attraktive Preis-Option",
      "HS-Variante (45 km/h S-Pedelec) verfügbar für schnellen Pendlerverkehr"
    ],
    "contra": [
      "KATEGORIE-MISMATCH: Cross/SUV-eMTB statt pures Trail-MTB. FLYER Marketing: 'Cross E-Bike mit hybrider Ausstattung — wie ein E-Mountainbike abgefedert, aber mit City-Komponenten'. NICHT für aggressive Trails optimiert.",
      "FEDERWEG-SCHWÄCHE: 125 mm Hinterbau / 140 mm Vorne ist Trail-Light Niveau. Trail-MTB-Standard ist 150-160 mm, Enduro 170-180 mm. Goroc X hat MEHRERE 35 mm WENIGER als Trail-Norm.",
      "Bikepark-Reserve KRITISCH SCHWACH: 125 mm Hinterbau ist NICHT für aggressive Sprünge oder grobe Trails ausgelegt — Bottoming-Out-Risiko bei harten Schlägen",
      "GEOMETRIE: Aufrechte SUV-Sitzposition (Ergotec Comfort Lenker mit 16° Backsweep + 30° Rise) — nicht aggressives MTB-Handling für steile Trails",
      "KOMPONENTEN-MISMATCH: Schwalbe Nobby Nic E-50 sind ALLROUND-Reifen — nicht aggressive Trail-Reifen wie Maxxis Assegai 3C MaxxGrip oder Continental Argotal bei Score-9 Trail-MTBs",
      "SCHALTUNG: Shimano XT LinkGlide ist NUR 11-fach (NICHT 12-fach Standard wie alle Trail-MTBs der Liste) — weniger feine Übersetzungs-Stufen",
      "Beleuchtung integriert — sinnvoll für Strasse, aber zusätzliches Gewicht für Pure-Trail-Use",
      "~26 kg Gewicht — 1,5-2 kg SCHWERER als Trail-MTBs der gleichen Klasse wegen SUV-Komponenten",
      "Cross-Lenker (780 mm Ergotec Komfort) — nicht für aggressives Cornering optimiert",
      "Im DIREKTEN Trail-MTB-Vergleich: CHF 6'999 ist CHF 2'000 TEURER als Cube ONE44 SLX 800 (Score 9, CHF 4'999) mit echtem Trail-MTB-Federweg",
      "Score 5 reflektiert das KATEGORIE-MISMATCH — Goroc X ist innerhalb seiner eigenen Cross/SUV-Kategorie ein TOP-Bike, aber falsches Werkzeug für den Trail-MTB-Use-Case in dieser Liste",
      "Magura Gustav Pro ABS ist innovativ, aber ABS kann im aggressiven MTB-Gelände auch Nachteile haben (zu späte Reaktion beim harten Bremsen)"
    ],
    "fazit": "REFERENZ-BIKE: Dies ist Martinas aktuelles Bike, das durch ein besseres Trail-MTB ersetzt werden soll. Score 5 reflektiert NICHT dass Goroc X schlecht ist — innerhalb seiner Cross/SUV-eMTB-Kategorie ist es ein TOP-Bike mit innovativen Features (Magura ABS!), Schweizer Marke, Top-Service. Aber: KATEGORIE-MISMATCH zur Trail-MTB-Liste. Pro: Schweizer Marke FLYER seit 1995 mit DAS BESTE CH-Service-Netz der ganzen Liste, Bosch CX Gen5 Smart System mit 800 Wh PowerTube ENTNEHMBAR, MAGURA GUSTAV PRO ABS als UNIQUE Sicherheits-Innovation (einziges Bike mit ABS!), 5-Jahre-Garantie-Konzept, 150 kg Zuladung, FLYER ONE Beleuchtung StVZO-konform, Range Extender ready, Probefahrten CH-weit möglich, vielseitig für Strasse + Gelände + Alltag. Contra: KATEGORIE-MISMATCH (Cross/SUV-eMTB statt pures Trail-MTB), FEDERWEG-SCHWÄCHE 125/140 mm (35 mm WENIGER als Trail-Norm), Bikepark-Reserve KRITISCH SCHWACH wegen 125 mm Hinterbau, aufrechte SUV-Geometrie nicht aggressiv, Allround-Reifen Schwalbe Nobby Nic statt aggressive Trail-Reifen, Shimano XT LinkGlide NUR 11-fach (kein 12-fach), ~26 kg ist 1,5-2 kg schwerer als Trail-MTBs, integrierte Beleuchtung Zusatzgewicht. Score 5 = KATEGORIE-MISMATCH-Pattern (NEUER Score-5-Typ — anders als YT DECOY mit strukturellen Risiken). Goroc X als REFERENZ-BIKE zeigt perfekt was Martina aktuell hat, und alle Score-6+ Bikes sind echte Trail-MTB-Upgrades. Für Martina: FLYER Goroc X war eine SOLIDE Wahl als Allround-eMTB, aber für aggressive Trails (3. eMTB-Saison, mehr Bikepark + Trail-Reserven gewünscht) sind die Score-9 Bikes (Cube ONE44 SLX 800, Orbea Wild H10, Cube ONE77 HPC SLX 800, AMFLOW PL Carbon, Canyon Spectral:ON CF 8, Cube ONE44 AT 800) klar besser positioniert. Wer ein Allrounder für Strasse + Gelände + Alltag will: Goroc X ist die beste Wahl der Liste. Wer pure Trail-Performance will: Die Score-9 Trail-MTBs sind objektiv besser."
  },
  "bild_pfad": "/images/bikes/flyer-goroc-x-6-70-2026.jpg",
  "warnungen": [],
  "alternativ_zu": [],
  "test_urteile": [
    {
      "quelle": "FLYER offizielle Produkt-Beschreibung 2026",
      "kurzfazit": "Der Zehnkämpfer. Tschüss Alltag! Steigen Sie auf, verlassen Sie gewohntes Terrain und «bebiken» Sie Neuland. Egal ob auf Asphalt oder im Gelände, tags oder nachts, auf dem Weg zur Arbeit oder vollbepackt auf der Mehrtagestour — das Goroc X kennt keine Grenzen. Vollintegrierter Hauptakku, einfach seitlich entnehmbar."
    },
    {
      "quelle": "Elektrofahrrad24.de (G2 Beschreibung 2026)",
      "kurzfazit": "Sportliches Cross E-Bike mit hochwertigen Komponenten. Bosch Performance Line CX Smart System Motor + 800 Wh PowerTube. Hybride Ausstattung: wird wie ein E-Mountainbike abgefedert, weist aber City E-Bike Komponenten auf. Fox AWL HD Gabel + Fox Float Performance Dämpfer."
    },
    {
      "quelle": "Radsport Stutz (CH-FLYER-Händler) — G2 2025 Spec-Beschreibung",
      "kurzfazit": "FLYER engineered, hydroformed tubing, 4-link suspension. 125 mm Hinterbau / 140 mm Fox AWL HD vorne. Magura Gustav Pro ABS 4-piston Bremsen. Shimano XT LinkGlide 11-speed. CHF 6'999 in Grösse M."
    },
    {
      "quelle": "FLYER offizielle G1 Beschreibung 2023 (Kontext Generationen-Wechsel)",
      "kurzfazit": "Der Zehnkämpfer mit 95 Nm pure Kraft (Panasonic GX Ultimate Pro G1). 140 mm Federweg. Vollintegrierter FLYER FIB-750 Akku entnehmbar. 150 kg zulässiges Gesamtgewicht. G2-Update 2025/2026 mit Bosch CX Gen5 + 800 Wh + Magura ABS."
    },
    {
      "quelle": "Stromvelo + TS-Velos (CH-FLYER-Händler-Bewertung)",
      "kurzfazit": "Vorjahresmodell-Sales: G1 Goroc X 6.70 CHF 4'399 (-38% von CHF 7'099 UVP). G1 HS-Variante CHF 5'999 (-21% von CHF 7'599). G2 aktuell CHF 6'999 UVP. Sehr gute CH-Verfügbarkeit, Probefahrten an mehreren Standorten."
    }
  ]
}

bikes[idx] = new_entry

with open('src/data/bikes.json', 'w', encoding='utf-8') as f:
    json.dump(bikes, f, ensure_ascii=False, indent=2)

# Verification
entry = bikes[idx]
expected_keys = sorted(['bergauf_touren','bikepark_reserve','einsteigerfreundlichkeit',
                        'geometrie_rahmengroesse','gewicht_handling','preis_leistung',
                        'risiko_datenunsicherheit','service_haendlernetz_ch'])
actual_keys = sorted(entry['bewertung_kategorien'].keys())
bad_keys = [k for k in actual_keys if k not in expected_keys]

assert isinstance(entry['motor'], dict) and 'drehmoment_nm' in entry['motor'], 'motor schema error'
assert isinstance(entry['akku'], dict) and 'kapazitaet_wh' in entry['akku'], 'akku schema error'
haendler_types = [type(h).__name__ for h in entry['verfuegbarkeit_ch']['haendler']]
assert all(t == 'str' for t in haendler_types), f'haendler must be strings: {haendler_types}'

print(f'Done — replaced index {idx}')
print(f'ID: {entry["id"]}')
print(f'Score: {entry["passend_fuer_martina_score"]}')
print(f'referenzbike: {entry.get("referenzbike")}')
print(f'bewertung_kategorien keys: {actual_keys}')
print(f'Pro: {len(entry["bewertung_detail"]["pro"])} | Contra: {len(entry["bewertung_detail"]["contra"])}')
print(f'Service CH: {entry["bewertung_kategorien"]["service_haendlernetz_ch"]} | Bikepark: {entry["bewertung_kategorien"]["bikepark_reserve"]}')
print(f'motor: {entry["motor"]["hersteller"]} {entry["motor"]["modell"]} — {entry["motor"]["drehmoment_nm"]} Nm')
print(f'akku: {entry["akku"]["kapazitaet_wh"]} Wh, wechselbar={entry["akku"]["wechselbar"]}')
print(f'haendler types: {haendler_types}')
if bad_keys:
    print(f'BAD KEYS: {bad_keys}')
else:
    print('Spot-check: OK — keine schlechten Keys')
