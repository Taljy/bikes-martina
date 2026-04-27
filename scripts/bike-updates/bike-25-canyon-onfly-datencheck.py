#!/usr/bin/env python3
import json, sys

with open('src/data/bikes.json', 'r', encoding='utf-8') as f:
    bikes = json.load(f)

TARGET_ID = 'canyon-spectral-onfly-cf-8-2026'
idx = next((i for i, b in enumerate(bikes) if b['id'] == TARGET_ID), None)
if idx is None:
    print(f'ERROR: {TARGET_ID} not found!'); sys.exit(1)

new_entry = {
  "id": "canyon-spectral-onfly-cf-8-2026",
  "hersteller": "Canyon",
  "modell": "Spectral:ONfly CF 8",
  "modell_hinweis": "KATEGORIE-WICHTIG: Spectral:ONfly ist Canyons LIGHT-eMTB-Plattform der Spectral-Familie (NICHT Voll-Power!) — TQ HPR50 Motor mit 50 Nm + 360 Wh Akku statt Shimano EP801 mit 800 Wh beim Spectral:ON. CF 8 ist die Einstiegs-Spec der ONfly-Familie. Höhere Spec-Stufen verfügbar: CF 9 (CHF 5'699 UVP / aktuell CHF 4'069 Sale -29% mit Fox Performance + XT), CF CLLCTV (mid-tier Carbon mit GX AXS), CF LTD (Top-Spec Carbon mit Fox Factory + XX Transmission, 18,1 kg). NICHT mit Spectral:ON CF 8 (Score 9, Voll-Power) verwechseln!",
  "jahr": 2026,
  "modelljahr": 2026,
  "passend_fuer_martina_score": 6,
  "kategorie": "Light-eMTB / All-Mountain",
  "preis_chf": 5499,
  "preis_chf_geschaetzt": True,
  "preis_eur": 5599,
  "preis_hinweis": "UVP CHF 5'499 GESCHÄTZT basierend auf EUR 5'599 (Standard-CH-Aufschlag von Canyon DTC). KEIN aktueller Sale für CF 8 gefunden. CF 9 ist aktuell CHF 4'069 Sale (-29% von CHF 5'699 UVP) — möglicher Indikator dass CF 8 ähnlich preissensitiv sein könnte. KRITISCHER VERGLEICH: CHF 5'499 ist CHF 500 TEURER als Cube ONE44 SLX 800 (Score 9, CHF 4'999, VOLL-POWER mit 800 Wh + Bosch Gen5 100 Nm + Carbon + XT) und CHF 2'000 TEURER als AMFLOW PL Carbon Sale (CHF 3'490, Score 9 Light-eMTB-Klassenprimus mit 800 Wh + DJI Avinox 105 Nm + 19,2 kg).",
  "rahmen": {
    "material": "Vollcarbon Spectral:ONfly CF (2,65 kg in Grösse M, Category 4E Enduro-zertifiziert)",
    "konzept": "Light-eMTB / All-Mountain Trail mit Light-Assist"
  },
  "federweg": {
    "vorne_mm": 160,
    "hinten_mm": 150
  },
  "gewicht_kg": 18.9,
  "gewicht_hinweis": "18,9 kg in Grösse M (Hersteller-Spec). Top-Spec CF LTD Variante kommt auf 18,1 kg. Light-eMTB-Klasse — vergleichbar mit Trek Slash+ (20,4 kg), Mondraker NEAT RR SL (17,9 kg), Trek Fuel EXe (17,5 kg). DEUTLICH leichter als die meisten Voll-Power-Konkurrenten (Cube ONE44 SLX ~24 kg, Cannondale Moterra ~25 kg). AMFLOW PL Carbon (19,2 kg) ist im gleichen Gewichts-Segment, aber mit DOPPELT so grossem Akku.",
  "motor": {
    "hersteller": "TQ",
    "modell": "HPR50",
    "nm": 50,
    "watt": 300,
    "hinweis": "TQ HPR50 (Light-eMTB-Motor) — 50 Nm Drehmoment, 250 W Nennleistung, 300 W Peak Power, NUR 1'850 g Motor-Gewicht (FEDERLEICHT, passt in eine Hand). KEIN Voll-Power-Motor wie Bosch CX Gen5 (100 Nm) / Specialized 3.1 (101 Nm) / DJI Avinox (105 Nm). TQ ist BESTER Light-eMTB-Motor (super leise, am natürlichsten), aber eine Klasse unter den Voll-Power-Motoren."
  },
  "akku_wh": 360,
  "akku_entnehmbar": False,
  "akku_hinweis": "360 Wh TQ HPR V01 PERMANENT integriert im Carbon-Unterrohr (NICHT entnehmbar zum Laden!). Nur 1'830 g Akku-Gewicht. Reichweite: ~1'000 Höhenmeter pro Ladung (Hersteller-Angabe). Optional TQ 160 Wh Range Extender = bis 520 Wh kombiniert (+44% Reichweite). KRITISCHE SCHWÄCHE: 360 Wh ist NUR 45% der Akku-Kapazität von Voll-Power-Konkurrenten (800 Wh) und nur 45% von AMFLOW PL Carbon (800 Wh) im gleichen Light-eMTB-Segment. Plus permanent integriert wie Cannondale/Transition (beide Score 6) — kein bequemes Laden über Nacht.",
  "laufradgroesse": "MX (Mullet)",
  "ausstattung": {
    "gabel": "RockShox Lyrik Select+, 160 mm Federweg (Mid-tier — über Select, unter Ultimate)",
    "daempfer": "RockShox Deluxe Select+, 210x55 mm Trunnion Mount",
    "schaltung": "Shimano Deore 12-fach (EINSTIEGS-NIVEAU! Über NX, unter SLX/XT) — der grösste Spec-Knick der CF 8 Variante",
    "bremsen": "SRAM Code R 4-Kolben Hydraulic Disc, 200+ mm Rotors",
    "laufraeder": "Sun-Ringle Trail Expert Wheelset (EINSTIEGS-NIVEAU!) — 29\" vorne / 27.5\" hinten Mullet-Setup",
    "reifen": "Maxxis Reifen mit EXO+ Casing — solides Trail-Niveau (laut Pinkbike: 'EXO+ rear tire perhaps falls short' für aggressive Einsätze)",
    "sattelstuetze": "Canyon G5 Dropper, 34,9 mm Diameter, 200 mm Hub bei M und L (230 mm bei XL), bis zu 25 mm Hub-Adjustability (sehr lange Variante)",
    "vorbau": "Canyon-eigener Trail-Stem 35 mm",
    "lenker": "Canyon-eigener Lenker mit angepasster Geometrie",
    "display": "TQ HPR LED-System (am Oberrohr integriert, minimal-distractive Light-eMTB-Style)",
    "extra": "K.I.S. (Keep It Stable) Steering Stabilizer im Oberrohr versteckt — Federmechanismus für mehr Lenk-Kontrolle, lebenslange Garantie auf K.I.S., komplett wartungsfrei. UNIQUE Canyon-Feature in der ganzen Liste!"
  },
  "geometrie_features": [
    "Vollcarbon Spectral:ONfly CF Rahmen (2,65 kg in Grösse M)",
    "Category 4E (Enduro-zertifiziert) — robust trotz Light-Konzept",
    "Triple Phase 4-bar Hinterbau (gleicher wie Spectral:ON Voll-Power)",
    "Mullet-Setup ab Werk (29\" vorne / 27.5\" hinten) — KEIN 29\"-Voll-Setup",
    "64° Lenkwinkel (slack, modern für aggressive Trails)",
    "76,5° Sitzwinkel (steil für effizientes Pedalieren)",
    "440 mm kurze Kettenstreben",
    "1'280 mm Wheelbase (L-Grösse) für Stabilität trotz Agilität",
    "K.I.S. (Keep It Stable) Steering Stabilizer — UNIQUE Canyon-Feature mit lebenslanger Garantie",
    "Doppelt-gedichtete Lager mit speziellem Bike-Wash-resistentem Fett",
    "Replaceable Thread Inserts für Frame-Bearings (kein Schaden bei Strip)",
    "Extra-kurzes Sitzrohr für lange Dropper Posts (200-230 mm Hub)",
    "Verstärkter Unterfahrschutz für Motor + Kettenblatt",
    "Integrierte Kettenführung gegen Kettenabwurf",
    "Massive 15 mm Achsen am Rocker und Hauptdrehpunkt für Steifigkeit",
    "Internal Cable Routing (KEIN through-headset routing — Service-freundlich!)"
  ],
  "groessen_hinweis": "Erhältlich in S, M, L, XL — Grössen für 1.66 m bis 2.00 m Körpergrösse. Grösse L empfohlen für 1.80 m Körpergrösse.",
  "produktseite_url": "https://www.canyon.com/de-ch/e-bikes/e-mountainbikes/spectral-on/spectral-on-fly/",
  "haendler_ch": "Canyon ist eine deutsche Direct-to-Consumer-Marke (Hauptsitz Koblenz, gegründet 1985 von Roman Arnold). KEIN klassisches CH-Händlernetz wie Cube/Specialized/Trek. Verkauf via offiziellen Webshop canyon.com mit CH-Lager und Versand in die Schweiz. Bei Reklamationen oder Garantiefällen läuft alles via Canyon Service-Center (online + Telefon). Probefahrten nur über Canyon Showrooms (Koblenz) oder via Versand mit 30 Tagen Rückgaberecht möglich.",
  "smart_features": ["TQ HPR50 System mit App", "TQ HPR LED Display", "K.I.S. Steering Stabilizer 2.0", "Wireless Remote (linker Lenkergriff)", "TQ App für Tuning + Diagnostics"],
  "garantie_besonderheit": "K.I.S.-System hat LEBENSLANGE Garantie (Canyon-Standard für K.I.S.). Rahmen-Garantie 6 Jahre (Canyon-Standard). Motor- und Akku-Garantie via TQ-Hersteller (typisch 2 Jahre).",
  "verfuegbarkeit_ch": {
    "haendler": [
      {
        "name": "Canyon CH (offizieller Direktvertrieb)",
        "url": "https://www.canyon.com/de-ch/e-bikes/e-mountainbikes/spectral-on/spectral-on-fly/spectral-onfly-cf-8/",
        "hinweis": "UVP ~CHF 5'499, CH-Lager, Schweizer Versand, 30 Tage Rückgaberecht"
      },
      {
        "name": "Canyon CH — Spectral:ONfly CF 9 Sale",
        "url": "https://www.canyon.com/de-ch/mountainbike/trail-bikes/spectral/",
        "hinweis": "Höhere Spec-Variante CF 9 aktuell CHF 4'069 Sale (-29% von CHF 5'699 UVP) als alternative Option"
      }
    ],
    "status": "verfuegbar",
    "probefahrt_moeglich": False,
    "urls": ["https://www.canyon.com/de-ch/e-bikes/e-mountainbikes/spectral-on/spectral-on-fly/"]
  },
  "verfuegbarkeit": {
    "status": "verfuegbar",
    "hinweis": "Verfügbar via Canyon DTC mit CH-Lager und Schweizer Versand. UVP ~CHF 5'499 ohne aktuellen Sale für CF 8 (höhere Spec CF 9 ist aktuell -29% reduziert auf CHF 4'069 — als Alternative zu beachten). 30 Tage Rückgaberecht. Probefahrten nur in Canyon Showrooms (Koblenz/DE) oder via Versand mit Rückgabe.",
    "geprueft_am": "2026-04-26",
    "geprueft_quelle": "https://www.canyon.com/de-ch/e-bikes/e-mountainbikes/spectral-on/spectral-on-fly/"
  },
  "bewertung_kategorien": {
    "geometrie_rahmengroesse": 8,
    "einsteigerfreundlichkeit": 6,
    "bergauf_touren": 4,
    "bikepark_reserve": 7,
    "gewicht_handling": 9,
    "preis_leistung": 4,
    "service_haendlernetz_ch": 6,
    "risiko_datenunsicherheit": 8
  },
  "bewertung_detail": {
    "pro": [
      "Vollcarbon Spectral:ONfly CF Rahmen (2,65 kg in M) — Premium-Material trotz Light-Konzept",
      "Category 4E Enduro-zertifiziert — robust trotz Light-Konzept (kann mit Voll-Power-Bikes mithalten)",
      "TQ HPR50 ist BESTER Light-eMTB-Motor: super leise, kompakt (1'850 g, passt in eine Hand), natürlichstes Fahrgefühl",
      "18,9 kg Gesamtgewicht (Top-Spec CF LTD: 18,1 kg) — DEUTLICH leichter als Voll-Power-Konkurrenz (Cube/Cannondale ~24-25 kg)",
      "K.I.S. (Keep It Stable) Steering Stabilizer — UNIQUE in der ganzen Liste! Federmechanismus im Oberrohr für mehr Lenk-Kontrolle, lebenslange Garantie",
      "Triple Phase 4-bar Hinterbau (gleicher wie Spectral:ON Voll-Power Score 9)",
      "Mullet-Setup ab Werk (29\"/27.5\") für Stabilität + Agilität",
      "Modern progressive Geometrie: 64° Lenkwinkel + 76,5° Sitzwinkel + 440 mm Chainstays",
      "Extra-lange Dropper Posts (200 mm bei M/L, 230 mm bei XL) für mehr Abfahrts-Kontrolle",
      "TQ Range Extender 160 Wh kompatibel = bis 520 Wh kombiniert (+44%)",
      "Doppelt-gedichtete Lager mit Bike-Wash-resistentem Fett",
      "Replaceable Thread Inserts für Frame-Bearings (Service-freundlich)",
      "Verstärkter Unterfahrschutz + integrierte Kettenführung",
      "KEIN through-headset routing (Service-freundlich, im Gegensatz zu vielen modernen Bikes)",
      "Canyon DTC mit CH-Lager + 30 Tagen Rückgaberecht",
      "Magazintest-Anerkennung: 'Lebendiges Fahrgefühl, sanfter und leiser Motor, top Verarbeitung' (MOUNTAINBIKE Magazine)",
      "Höhere Spec-Variante CF 9 aktuell CHF 4'069 Sale (-29%) verfügbar als Alternative mit XT-Schaltung + Fox Performance"
    ],
    "contra": [
      "MOTOR-KLASSEN-SCHWÄCHE: TQ HPR50 (50 Nm + 300 W) ist DEUTLICH schwächer als AMFLOW DJI Avinox (105 Nm + 850 W) im gleichen Light-eMTB-Segment — AMFLOW PL Carbon ist Klassenprimus mit 800 Wh statt 360 Wh!",
      "AKKU PERMANENT: 360 Wh fix integriert (NICHT entnehmbar zum Laden) — gleiche Schwäche wie Cannondale Moterra SL 2 (601 Wh permanent, Score 6) und Transition Regulator CX XT (600 Wh permanent, Score 6)",
      "AKKU SEHR KLEIN: 360 Wh ist nur 45% der Akku-Kapazität von Voll-Power-Konkurrenten (800 Wh) und 45% von AMFLOW (800 Wh) im gleichen Light-eMTB-Segment. Reichweite nur ~1'000 Hm pro Ladung",
      "KOMPONENTEN-SPEC-KNICK: Shimano Deore Schaltung (EINSTIEGS-NIVEAU!) trotz CHF 5'499 UVP — andere Score-7/8 Bikes haben SLX/XT Standard. CF 9 für CHF 5'699 UVP (aktuell CHF 4'069 Sale!) hat XT-Schaltung als Alternative",
      "Sun-Ringle Trail Expert Wheelset (Einstiegs-Niveau) — Score-9 Konkurrenz hat DT Swiss / Newmen / RaceFace Standard",
      "PREIS-LEISTUNG SCHWACH: CHF 5'499 ist CHF 500 TEURER als Cube ONE44 SLX 800 (Score 9, CHF 4'999, VOLL-POWER mit Bosch Gen5 100 Nm + 800 Wh + XT)",
      "PREIS-LEISTUNG vs. Light-eMTB-Klassenprimus: CHF 5'499 ist CHF 2'009 TEURER als AMFLOW PL Carbon Sale (CHF 3'490, Score 9 Light-eMTB Top mit 800 Wh + 105 Nm + 19,2 kg)",
      "MBR Test-Kritik: 'The Spectral:ONFly's dynamic ride quality left me smitten, but the small battery ran out of energy before I did' — Akku-Reichweite ist HARTE Praxis-Schwäche",
      "TQ HPR50 ist weniger kraftvoll als Bosch SX oder Voll-Power-Motoren — keine echte Konkurrenz für Voll-Power-Trails",
      "Canyon DTC ohne klassisches CH-Händlernetz — Service-Profil schwächer als Cube/Specialized/Trek/Giant (aber besser als Commencal-Andorra)",
      "Probefahrten nur über Canyon Showrooms (Koblenz/DE) oder via Versand mit 30 Tagen Rückgabe — NICHT vor Ort in CH",
      "Pinkbike: 'EXO+ rear tire perhaps falls short' für aggressive Einsätze (im Vergleich zur Category 4E Frame-Robustheit)",
      "Range Extender (160 Wh) als zusätzliche Kosten — Standard-Setup nur 360 Wh"
    ],
    "fazit": "Premium-Light-eMTB mit unique K.I.S.-Feature und 18,9 kg Gewicht, aber strukturelle Schwächen verhindern Score 7. Pro: Vollcarbon-Rahmen Category 4E, TQ HPR50 als BESTER Light-eMTB-Motor (kompakt, leise, natürlich), 18,9 kg Light-eMTB-Klasse, K.I.S. Steering Stabilizer als UNIQUE Canyon-Feature mit lebenslanger Garantie, Triple Phase 4-bar Hinterbau (gleicher wie Spectral:ON Voll-Power Score 9), Mullet-Setup, modern progressive Geometrie (64°/76,5°), extra-lange Dropper Posts, doppelt-gedichtete Lager mit Replaceable Thread Inserts, Range Extender bis 520 Wh, Canyon DTC mit CH-Lager + 30 Tagen Rückgaberecht. Contra: MOTOR-KLASSEN-SCHWÄCHE (TQ HPR50 mit 50 Nm + 300 W ist DEUTLICH schwächer als AMFLOW DJI Avinox 105 Nm + 850 W im gleichen Light-eMTB-Segment), AKKU PERMANENT 360 Wh (45% der Kapazität von Voll-Power-Konkurrenten + nicht entnehmbar wie Cannondale/Transition Score 6), KOMPONENTEN-SPEC-KNICK (Shimano Deore + Sun-Ringle Trail Expert sind EINSTIEGS-NIVEAU bei CHF 5'499 UVP), PREIS-LEISTUNG (CHF 500 TEURER als Cube ONE44 SLX 800 Score 9 Voll-Power, CHF 2'009 TEURER als AMFLOW PL Carbon Sale Score 9 Light-eMTB-Klassenprimus), MBR-Test-Kritik zu Akku-Reichweite, Canyon DTC ohne klassisches CH-Händlernetz. Score 6 reflektiert: VIER strukturelle Schwächen kombiniert (Motor-Klasse + Akku permanent + Komponenten + Preis-Leistung) — konsistent mit Pattern: Mehrere Schwächen kombiniert = Score 6, eine Schwäche = Score 7. Wer Light-eMTB-Konzept + Vollcarbon + KIS will und mit 360 Wh Reichweite leben kann: defensible Wahl. Wer maximale Light-eMTB-Performance will: AMFLOW PL Carbon (Score 9, CHF 3'490 Sale) bietet 800 Wh + 105 Nm DJI Avinox + 19,2 kg für CHF 2'009 weniger. Wer Voll-Power für gleichen Preis will: Cube ONE44 SLX 800 (Score 9, CHF 4'999) bietet Bosch Gen5 + 800 Wh + Carbon + XT für CHF 500 weniger. Höhere Spec CF 9 mit XT + Fox Performance ist aktuell CHF 4'069 Sale (-29%) — bessere Komponenten zum gleichen Preis-Punkt wie CF 8 UVP."
  },
  "bild_pfad": "/images/bikes/canyon-spectral-onfly-cf-8-2026.jpg",
  "referenzbike": False,
  "warnungen": [],
  "alternativ_zu": [],
  "test_urteile": [
    {
      "quelle": "Pinkbike (First Ride: Canyon Spectral:ONfly Lightweight eMTB)",
      "kurzfazit": "Powered by the lighter, more compact, quieter and slightly less powerful TQ-HPR50 motor with 360 Wh battery. To keep up with a Bosch CX or Shimano EP8-equipped eMTB would be to demonstrate great athletic prowess. The relatively reduced power and capacity comes with a much more palatable weight that many riders will appreciate. EXO+ rear tire perhaps falls short for category 4E ratings."
    },
    {
      "quelle": "MOUNTAINBIKE Magazine (Spectral:ONfly Test)",
      "kurzfazit": "Lebendiges Fahrgefühl, sanfter und leiser Motor, top Verarbeitung — das alles zum fairen Preis. Mit dem Spectral:ONfly ist Canyon ein grosser Wurf gelungen. Canyon hat das Bike auf aggressive Trailrides ausgelegt: Reach üppig mit 470 mm in M, 64° flacher Lenkwinkel."
    },
    {
      "quelle": "MBR (Spectral:ONfly LTD Review)",
      "kurzfazit": "The Spectral:ONFly's dynamic ride quality left me smitten, but the small battery ran out of energy before I did. Lightweight e-bike with composite frame, full Fox Factory suspension on top spec, 160/150mm travel, MX wheels, K.I.S. steering stabiliser tuneable and removable."
    },
    {
      "quelle": "Blister Review (Spectral:ONfly First Look)",
      "kurzfazit": "TQ HPR50 packs 50 Nm of torque, 250 W continuous power, 300 W peak power. Quiet and smooth-running motor (familiar from Trek Slash+ and Fuel EXe). Between the small motor format and 360 Wh battery, the Spectral:ONfly barely looks like an eMTB at all. Smaller battery does mean range isn't likely all that great — would spring for the 160 Wh range extender."
    },
    {
      "quelle": "EMTB Forums (Spectral:ONfly CF LTD Review)",
      "kurzfazit": "An 18 kg bike usually has lighter tyres with less rebound damping in the sidewalls. The Spectral:OF in size L weighs 19.41 kg with pedals + bottle cage (~18.8 kg without). It's a very good weight for a bike specc'ed with Fox 36 forks and Minion EXO+ tyres. Coming from a full-power bike, the Spectral:OF feels significantly weaker. Geometry for aggressive descending."
    }
  ]
}

bikes[idx] = new_entry

with open('src/data/bikes.json', 'w', encoding='utf-8') as f:
    json.dump(bikes, f, ensure_ascii=False, indent=2)

# Verification
entry = bikes[idx]
keys = sorted(entry['bewertung_kategorien'].keys())
expected = sorted(['bergauf_touren','bikepark_reserve','einsteigerfreundlichkeit',
                   'geometrie_rahmengroesse','gewicht_handling','preis_leistung',
                   'risiko_datenunsicherheit','service_haendlernetz_ch'])
bad_keys = [k for k in entry['bewertung_kategorien'] if k not in expected]

print(f'Done — replaced index {idx}')
print(f'ID: {entry["id"]}')
print(f'Score: {entry["passend_fuer_martina_score"]}')
print(f'bewertung_kategorien keys: {keys}')
print(f'Pro: {len(entry["bewertung_detail"]["pro"])} | Contra: {len(entry["bewertung_detail"]["contra"])}')
print(f'Bergauf-Touren: {entry["bewertung_kategorien"]["bergauf_touren"]} | Gewicht-Handling: {entry["bewertung_kategorien"]["gewicht_handling"]} | Preis-Leistung: {entry["bewertung_kategorien"]["preis_leistung"]}')
if bad_keys:
    print(f'BAD KEYS: {bad_keys}')
else:
    print('Spot-check: OK — keine schlechten Keys')
