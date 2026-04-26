#!/usr/bin/env python3
"""Datencheck Bike #28: Commencal Meta Power SX Essential V4 (Score 6).
Replaces commencal-meta-power-sx-2026 with commencal-meta-power-sx-essential-2026.
"""
import json, sys

NEW_ENTRY = {
  "id": "commencal-meta-power-sx-essential-2026",
  "hersteller": "Commencal",
  "modell": "Meta Power SX Essential V4 (Bosch)",
  "modell_hinweis": "AUSLAUFMODELL-VARIANTE: Meta Power SX V4 mit Bosch CX + 625 Wh wird durch neue V5/V6-Plattform mit DJI Avinox + 800 Wh + 160 mm + VCS Linkage ersetzt (Spring 2026 Launch). Aktuell auf Lager-Räumung mit -10% bis -23% Sale auf alle V4 Spec-Stufen. ESSENTIAL ist die günstigste der 4 V4-Spec-Stufen (Essential / Ride / Race / Signature) — Pinkbike-Empfehlung als 'best value' wegen Fox 38 Performance + Float X Performance + Shimano SLX + DT Swiss H1900. NICHT zu verwechseln mit: (1) Meta Power SX 800 RockShox 2026 (Score 7, 180/180 mm Enduro, CHF 8'200) und (2) Meta Power SX 400 Essential 2026 (NEU 2026, andere Plattform mit BES3 Motor + 800 Wh).",
  "jahr": 2026,
  "score": 6,
  "preise": {
    "uvp_chf": 7200,
    "uvp_chf_geschaetzt": True,
    "sale_chf": None,
    "sale_haendler": None,
    "sale_url": "https://www.commencal.com/en/bikes/e-bikes/enduro/meta%20power%20sx/",
    "uvp_eur": 6666,
    "preis_hinweis": "UVP EUR 6'666 verifiziert auf commencal.com (europäische Site). CHF-Preis CHF 7'200 GESCHÄTZT (EUR + ~5% CH-Aufschlag + 7,7% MwSt + Versand aus Andorra/Réunion-Lager). KEINE direkten CHF-Preise verfügbar — Commencal ist DTC ohne CH-Lager. AKTUELL Auslaufmodell-Sale: Signature V4 von $8'000 → $7'200 (-10%), Restposten Signature V4 in M sogar von $8'000 → $6'190 (-23%). Essential V4 hat noch keinen sichtbaren Sale-Preis aber wird vermutlich auch reduziert. KRITISCH: CHF 7'200 ist CHF 2'201 TEURER als Cube ONE44 SLX 800 (Score 9, CHF 4'999) und CHF 1'000 GÜNSTIGER als SX 800 RockShox (Score 7, CHF 8'200)."
  },
  "rahmen_material": "Aluminium 6066, triple butted T4/T6 Rohre, gegossener Sitzstreben- + Kettenstrebenschutz, Motor Protector",
  "konzept": "All-Mountain / Trail-Enduro mit Bosch Voll-Power",
  "federweg_vorne": 170,
  "federweg_hinten": 165,
  "gewicht_kg": 24.5,
  "gewicht_hinweis": "~24,5 kg geschätzt für Essential-Spec (Commencal hat keine offizielle Gewichtsangabe für Grösse L). Aluminium-Rahmen + Bosch CX + 625 Wh = mid-tier Gewicht, vergleichbar mit Cannondale Moterra (~25 kg). Schwerer als Carbon-Konkurrenten (Cube ONE44 SLX 800 ~24 kg, AMFLOW PL Carbon 19,2 kg).",
  "motor": {
    "hersteller": "Bosch",
    "modell": "Performance Line CX (Smart System)",
    "drehmoment_nm": 85,
    "leistung_spitze_w": 600,
    "hersteller_url": "https://www.bosch-ebike.com/ch/produkte/performance-line-cx",
    "hinweis": "Bosch CX Smart System mit 85 Nm Drehmoment Standard, 600 W Peak Power. 4 Modi: Eco, Tour+, eMTB (mit Extended Boost für technische Climbs), Turbo. Hill Hold function für Walk Assist. Identischer Motor wie bei Score-9 Cube/Orbea Bikes — kein Motor-Nachteil! Anpassbar via Bosch eBike Flow App."
  },
  "akku": {
    "kapazitaet_wh": 625,
    "wechselbar": True,
    "range_extender_optional": True,
    "range_extender_wh": 250,
    "hinweis": "Bosch PowerTube 625 Wh ENTNEHMBAR (Schlüssel-Lock), unter Plastik-Cover am Unterrohr. Bosch PowerMore 250 Wh Range Extender kompatibel = bis 875 Wh kombiniert. KRITISCHE SCHWÄCHE: 625 Wh ist 175 Wh KLEINER als 800 Wh Standard bei Score-9 Konkurrenz (Cube/Orbea/Canyon CF 8). Reichweite laut Hersteller: ~40 km / 1'300 hm in eMTB-Modus."
  },
  "ausstattung": {
    "schaltung": "Shimano SLX 12-fach (RD-M7100, 11-51t Cassette CS-M7100)",
    "schaltung_url": "https://bike.shimano.com/de-CH/product/component/slx-m7100.html",
    "bremsen": "Shimano SLX BR-M7120 4-Kolben, 220 mm Rotors",
    "bremsen_url": "https://bike.shimano.com/de-CH/product/component/slx-m7100.html",
    "laufraeder": "DT Swiss H1900 Spline, e-Bike-spezifisch, 30 mm Innenbreite, hand-built in Schweiz",
    "laufraeder_url": "https://www.dtswiss.com/de/produkte/laufrader/h-1900-spline",
    "reifen_vorne": "Maxxis Assegai 29x2.5\" 3C MaxxGrip EXO+",
    "reifen_hinten": "Maxxis Minion DHR II 27.5x2.4\" 3C MaxxTerra EXO+",
    "reifen_url": "https://www.maxxis.com/catalog/tires/mountain/",
    "cockpit": "RIDE ALPHA Power On Lenker (780 mm width, 27 mm rise) + RIDE ALPHA Stem 40 mm + Bosch Mini Remote + Bosch System Controller im Oberrohr"
  },
  "geometrie_features": [
    "Aluminium 6066 Triple Butted Rahmen mit Motor- + Kettenstreben-Protector",
    "Contact System 4-bar Linkage Hinterbau",
    "165 mm Heck / 170 mm Front Federweg (NICHT 170/165!)",
    "Mullet-Setup: 29\" vorne / 27.5\" hinten",
    "Lenkwinkel: 63.6° / 64° (verstellbar via Flip-Chip im Rocker)",
    "Sitzwinkel: 77.6° / 78° (steil für Climbing)",
    "Chainstays: 450 mm",
    "Internal Cable Routing",
    "SRAM UDH (Universal Derailleur Hanger)",
    "Bosch System Controller im Oberrohr integriert (minimalist Cockpit)",
    "Range Extender Schnittstelle vorbereitet",
    "Includes Fidlock Twist Bike Base bottle holder"
  ],
  "groessen_hinweis": "Erhältlich in S, M, L, XL — Grösse L empfohlen für 1.80m Körpergrösse (Martinas Grösse). Mullet-Setup über alle Grössen.",
  "produktseite_url": "https://www.commencal.com/en/bikes/e-bikes/enduro/meta%20power%20sx/",
  "haendler_ch": "Commencal ist ein Andorra-basierter Direct-to-Consumer-Hersteller (gegründet 2000, Hauptsitz Andorra-la-Vella). KEIN klassisches CH-Händlernetz — alle Bikes werden via commencal.com bestellt. Lieferung erfolgt aus Andorra-Lager nach Schweiz mit Versandkosten + möglichem Zoll. 10% Rabatt bei Pickup im Commencal Village (Andorra) — interessante Option für Käufer die einen Andorra-Trip machen können. Service: bei Reklamationen muss Bike nach Andorra geschickt werden oder ein lokaler Bosch-Händler kann Motor-/Akku-Issues beheben (Bosch-Service-Netz EU-weit). 5 Jahre Garantie auf Hauptrahmen, 2 Jahre auf Hinterbau-Komponenten.",
  "smart_features": ["Bosch Smart System", "Bosch eBike Flow App", "Bosch System Controller", "Bosch Mini Remote (Bluetooth)", "Optional Bosch Kiox Display", "Optional Smartphone Grip", "eBike Flow + Komoot/Strava/Apple Health Integration", "Connect-Funktionen (Diebstahlschutz)"],
  "garantie_besonderheit": "5 JAHRE Garantie auf Hauptrahmen (Lifetime bei manchen Märkten — bitte vor Kauf bestätigen). 2 Jahre auf Hinterbau (Contact System Linkage), Commencal/RIDE ALPHA Komponenten. 6 Monate auf Lack/Decals. Motor- + Akku-Garantie via Bosch (typisch 2 Jahre).",
  "verfuegbarkeit_ch": {
    "haendler": [
      "Commencal Direct (Webshop) — Bestellung aus Andorra-Lager",
      "Commencal Village (Andorra) — Pickup mit 10% Rabatt (für Käufer mit Andorra-Trip)"
    ],
    "urls": [
      "https://www.commencal.com/en/bikes/e-bikes/enduro/meta%20power%20sx/",
      "https://www.commencal.com/en/bikes/e-bikes/enduro/meta%20power%20sx/"
    ],
    "status": "verfuegbar"
  },
  "verfuegbarkeit": {
    "status": "verfuegbar",
    "hinweis": "AUSLAUFMODELL-SALE aktiv: V4-Plattform wird durch V5/V6 mit DJI Avinox ersetzt (Spring 2026). Alle V4 Spec-Stufen aktuell -10% bis -23% reduziert. Essential V4 ist die günstigste Variante. Bestellung via commencal.com mit Lieferung aus Andorra in die Schweiz. KEINE Probefahrten in CH möglich (DTC ohne lokale Händler). 10% Rabatt bei Pickup im Commencal Village (Andorra). KRITISCH: Service-Verfügbarkeit der V4-Plattform langfristig unsicher — Bosch-Komponenten via EU-Service-Netz lösbar, aber Frame-Reparaturen + Hinterbau-Lager könnten nach V5/V6-Launch erschwert werden.",
    "geprueft_am": "2026-04-26",
    "geprueft_quelle": "https://www.commencal.com/en/bikes/e-bikes/enduro/meta%20power%20sx/"
  },
  "bewertung_kategorien": {
    "geometrie_rahmengroesse": 8,
    "einsteigerfreundlichkeit": 6,
    "bergauf_touren": 7,
    "bikepark_reserve": 7,
    "gewicht_handling": 6,
    "preis_leistung": 5,
    "service_haendlernetz_ch": 4,
    "risiko_datenunsicherheit": 5
  },
  "bewertung_detail": {
    "pro": [
      "Bosch Performance Line CX Smart System (85 Nm) — IDENTISCHER Motor wie Score-9 Cube/Orbea Bikes, kein Motor-Nachteil",
      "Akku ENTNEHMBAR (Bosch PowerTube 625 Wh) — kritischer Vorteil vs. Cannondale Moterra (601 Wh permanent, Score 6)",
      "Bosch PowerMore 250 Wh Range Extender kompatibel = bis 875 Wh kombiniert",
      "165/170 mm Federweg — All-Mountain-Niveau für Trail bis leichte Enduro-Touren",
      "Mullet-Setup (29\"/27.5\") für Stabilität + Agilität",
      "Modern progressive Geometrie: 63.6°/64° Lenkwinkel, 77.6°/78° Sitzwinkel",
      "🌟 5 JAHRE Garantie auf Hauptrahmen — sehr stark (vergleichbar mit Cube/Trek)",
      "Pinkbike-Empfehlung als 'best value' der V4 Spec-Stufen",
      "Solide Komponenten-Spec: Fox 38 Performance + Float X Performance + Shimano SLX 12-fach + DT Swiss H1900",
      "AUSLAUFMODELL-SALE: aktuell -10% bis -23% auf V4 — Käuferchance für Schnäppchen",
      "Bosch Smart System mit eBike Flow App + Komoot/Strava/Apple Health Integration",
      "Modulares System: Optional Kiox Display + Smartphone Grip nachrüstbar",
      "Internal Cable Routing + SRAM UDH (modern + Service-freundlich)",
      "Geometrie-Verstellung via Flip-Chip im Rocker (anpassbar an Riding-Style)",
      "Innerhalb Score-6-Klasse STÄRKER positioniert als Cannondale Moterra wegen entnehmbarem Akku + Lifetime Frame Warranty",
      "Bosch-Service-Netz EU-weit (Motor + Akku Reparaturen via lokale Bosch-Händler möglich)"
    ],
    "contra": [
      "🔴 AUSLAUFMODELL-RISIKO: V4-Plattform wird durch V5/V6 mit DJI Avinox + 800 Wh + VCS Linkage ersetzt (Spring 2026 Launch) — Service-Verfügbarkeit langfristig unsicher (Frame-Reparaturen + Hinterbau-Lager könnten erschwert werden)",
      "AKKU-SCHWÄCHE: 625 Wh ist 175 Wh KLEINER als 800 Wh Standard bei Score-9 Konkurrenz (Cube ONE44 SLX 800, Orbea Wild H10, Canyon Spectral:ON CF 8) — bedeutet weniger Reichweite pro Ladung",
      "PREIS-LEISTUNG SCHWACH: CHF 7'200 ist CHF 2'201 TEURER als Cube ONE44 SLX 800 (Score 9, CHF 4'999, Voll-Power-Carbon-Top-Spec) und CHF 3'710 TEURER als AMFLOW PL Carbon Sale (Score 9, CHF 3'490)",
      "FLOAT-X-DÄMPFER-SCHWÄCHE: Pinkbike-Kritik 'needs X2 for aggressive riding — you'll blow through that shock with any aggressive riding' — bekannte Schwäche der V4 Essential/Ride/Race-Specs",
      "DTC-SERVICE-SCHWÄCHE: Commencal Andorra ohne CH-Händlernetz — keine Probefahrten in CH, Reklamationen bedeuten Andorra-Versand. Bosch-Komponenten via EU-Service lösbar, aber Frame-Issues sind komplex",
      "Aluminium-Rahmen statt Carbon (Score-9 Konkurrenten haben Carbon zum gleichen oder günstigeren Preis)",
      "~24,5 kg Gewicht — schwerer als Carbon-Konkurrenten (Cube ONE44 SLX 800 ~24 kg, AMFLOW PL Carbon 19,2 kg)",
      "10% Rabatt nur bei Pickup in Andorra — nicht praktikabel für CH-Käufer ohne Andorra-Trip",
      "Versandkosten + möglicher Zoll bei CH-Lieferung aus Andorra-Lager",
      "V4-Plattform verwendet Contact System 4-bar Linkage — V5/V6 wechselt zu VCS (Virtual Contact System) als Premium-Bauart, V4-Käufer bekommt nicht die neueste Suspension-Tech",
      "Auslaufmodell-Sale macht das Angebot attraktiv ABER: Lager-Bestand limitiert, Grössenwahl könnte eingeschränkt sein",
      "KEINE Aussagen zu CHF-Preis von Commencal direkt — alle Preise EUR mit Schätzungs-Aufschlag für CH"
    ],
    "fazit": "REFERENZ-AUSLAUFMODELL: Solides Trail/All-Mountain-Bike auf Auslaufmodell-Basis (V4-Plattform wird durch V5/V6 mit DJI Avinox ersetzt). Score 6 reflektiert: VIER strukturelle Schwächen (Auslaufmodell-Risiko + 625 Wh Akku-Schwäche + Premium-Preis vs. Konkurrenz + Float-X-Dämpfer + DTC-Service) sind genau das Pattern wie andere Score-6 Bikes (Cannondale, Transition, Giant, Santa Cruz, Canyon ONfly, Trek Fuel+, Rose). Pro: Bosch CX Smart System (identisch zu Score-9 Bikes), entnehmbarer 625 Wh Akku, Range Extender bis 875 Wh, 165/170 mm All-Mountain-Federweg, Mullet-Setup, modern progressive Geometrie mit Flip-Chip-Verstellung, 5 JAHRE Frame-Garantie, Pinkbike 'best value' Empfehlung, solide Komponenten (Fox 38 Performance + Float X Performance + Shimano SLX + DT Swiss H1900), AUSLAUFMODELL-SALE -10% bis -23% aktiv, Bosch-Service-Netz EU-weit. INNERHALB Score-6-Klasse STÄRKER positioniert als Cannondale Moterra wegen entnehmbarem Akku + Lifetime Frame Warranty. Contra: AUSLAUFMODELL-RISIKO (V4 → V5/V6 Wechsel, Service langfristig unsicher), AKKU-SCHWÄCHE (625 Wh vs. 800 Wh Standard), PREIS-LEISTUNG (CHF 2'200+ TEURER als Cube ONE44 SLX 800 Score 9), FLOAT-X-DÄMPFER (Pinkbike-Kritik für aggressives Riding), DTC-SERVICE (Andorra-Versand für Reklamationen, keine CH-Probefahrten). Score 6 ist konsistent mit Pattern: 'Mehrere Schwächen kombiniert = Score 6'. Wer Auslaufmodell-Schnäppchen + Bosch CX + entnehmbaren Akku + Lifetime Frame Warranty will und mit DTC-Service leben kann: defensible Wahl. Wer maximale Performance/Preis will: Cube ONE44 SLX 800 (Score 9, CHF 4'999) bietet Voll-Power + 800 Wh + Carbon + XT für CHF 2'200 weniger. Wer aktuelle Plattform-Tech will: Auf Commencal V5/V6 mit DJI Avinox + 800 Wh warten (Spring 2026 Launch). Für Martina (3. eMTB-Saison, Trail-fokussiert, Budget CHF 3'500-6'500): nur als Auslaufmodell-Schnäppchen sinnvoll, sonst sind Score-9 Bikes klar besser positioniert."
  },
  "bild_pfad": "/images/bikes/commencal-meta-power-sx-essential-2026.jpg",
  "test_urteile": [
    {
      "quelle": "Pinkbike (Review: Commencal's Meta Power SX Signature Packs a Punch for the Price)",
      "kurzfazit": "The Meta Power SX is the longest travel option in Commencal's eMTB lineup, with 165mm of rear travel and a 170mm fork. Bosch Performance CX motor with 625 Wh battery. Out of the four Meta Power SX models, it's the Essential model that gets my vote as the best value. Bosch motor and 625 Wh battery as all the other bikes in the lineup, with a no-nonsense parts spec including Shimano SLX drivetrain and brakes, Fox 38 Performance fork and Float X performance shock, and a DT Swiss H1900 wheelset."
    },
    {
      "quelle": "Pinkbike (Float X Dämpfer-Kritik aus Review)",
      "kurzfazit": "The Commencal needs to scrap the float X and put in an X2. You could add all the volume spaces you want and you'll blow through that shock with any aggressive riding."
    },
    {
      "quelle": "Vital MTB (2023 Commencal Meta Power SX Bosch Essential E-Bike)",
      "kurzfazit": "Bosch Performance Line CX, 85 Nm max torque, 250 W. 625 Wh removable battery. Mixed wheels: 29\" front, 27.5\" rear. Fox Float 38 Performance E-Bike fork with GRIP damper, 170mm travel. Fox Float X Performance shock. DT Swiss 370 hubs. 5 years main frame warranty, 2 years chainstays + contact system."
    },
    {
      "quelle": "Commencal offizielle Beschreibung",
      "kurzfazit": "From your local spot to your mountain sessions, the META POWER SX V4 is built to engage. With 165mm of rear travel, 170mm at the front and a 'mullet' setup (29''/27.5''), it's perfect for riding downhill. Thanks to its BOSCH Performance CX motor and removable 625Wh battery, it's designed to chain runs together. Geometry adjustable via flip chip in shock extension."
    },
    {
      "quelle": "Pinkbike (V5/V6 mit DJI Avinox Plattform-Wechsel-Ankündigung)",
      "kurzfazit": "META POWER SX DJI PODIUM 10'950€ Available: SPRING 2026. Such a clean full power E-bike. The geo and the kinematics looks like the SX 400. New VCS Linkage, 160mm travel, DJI Avinox 105 Nm / 850 W in normal operation, 600 W on S, 800 W on M/L/XL battery."
    }
  ],
  "warnungen": [],
  "alternativ_zu": []
}

with open('src/data/bikes.json', 'r', encoding='utf-8') as f:
    bikes = json.load(f)

# Find and replace the old entry
idx = next((i for i, b in enumerate(bikes) if b['id'] == 'commencal-meta-power-sx-2026'), None)
if idx is None:
    print('ERROR: commencal-meta-power-sx-2026 not found!', file=sys.stderr)
    sys.exit(1)

print(f'Replacing index {idx}: {bikes[idx]["id"]} → {NEW_ENTRY["id"]}')
bikes[idx] = NEW_ENTRY

with open('src/data/bikes.json', 'w', encoding='utf-8') as f:
    json.dump(bikes, f, ensure_ascii=False, indent=2)

print(f'Written. Total bikes: {len(bikes)}')

# ── Schema verification ─────────────────────────────────────────────────────
print('\n=== SCHEMA VERIFICATION ===')
with open('src/data/bikes.json', 'r', encoding='utf-8') as f:
    bikes = json.load(f)

entry = next(b for b in bikes if b['id'] == 'commencal-meta-power-sx-essential-2026')

# motor
assert isinstance(entry['motor'], dict), 'motor must be dict'
assert 'drehmoment_nm' in entry['motor'], 'motor missing drehmoment_nm'
assert 'leistung_spitze_w' in entry['motor'], 'motor missing leistung_spitze_w'
print(f'  motor OK: {entry["motor"]["hersteller"]} {entry["motor"]["modell"]}, {entry["motor"]["drehmoment_nm"]} Nm, {entry["motor"]["leistung_spitze_w"]} W')

# akku
assert isinstance(entry['akku'], dict), 'akku must be dict'
assert 'kapazitaet_wh' in entry['akku'], 'akku missing kapazitaet_wh'
assert 'wechselbar' in entry['akku'], 'akku missing wechselbar'
print(f'  akku OK: {entry["akku"]["kapazitaet_wh"]} Wh, wechselbar={entry["akku"]["wechselbar"]}, range_ext={entry["akku"].get("range_extender_optional")}')

# haendler string array
haendler = entry['verfuegbarkeit_ch']['haendler']
assert isinstance(haendler, list), 'haendler must be list'
assert all(isinstance(h, str) for h in haendler), f'haendler must all be strings, got: {[type(h).__name__ for h in haendler]}'
print(f'  haendler OK: {len(haendler)} string entries')

# bewertung_kategorien
bk = entry['bewertung_kategorien']
assert isinstance(bk, dict), 'bewertung_kategorien must be dict'
expected_keys = {'geometrie_rahmengroesse','einsteigerfreundlichkeit','bergauf_touren','bikepark_reserve','gewicht_handling','preis_leistung','service_haendlernetz_ch','risiko_datenunsicherheit'}
missing = expected_keys - set(bk.keys())
assert not missing, f'bewertung_kategorien missing keys: {missing}'
print(f'  bewertung_kategorien OK: {dict(bk)}')

# test_urteile (not test_ergebnisse)
assert 'test_urteile' in entry, 'missing test_urteile'
assert 'test_ergebnisse' not in entry, 'old test_ergebnisse key still present'
print(f'  test_urteile OK: {len(entry["test_urteile"])} entries')

# verfuegbarkeit (not null)
assert isinstance(entry.get('verfuegbarkeit'), dict), 'verfuegbarkeit must be dict'
print(f'  verfuegbarkeit OK: status={entry["verfuegbarkeit"]["status"]}')

# score
assert entry['score'] == 6, f'score should be 6, got {entry["score"]}'
print(f'  score OK: {entry["score"]}')

print('\n✅ ALL ASSERTIONS PASSED — commencal-meta-power-sx-essential-2026 schema is correct')
print(f'Total bikes: {len(bikes)}')
