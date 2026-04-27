#!/usr/bin/env python3
import json, sys

with open('src/data/bikes.json', 'r', encoding='utf-8') as f:
    bikes = json.load(f)

OLD_ID = 'trek-fuel-exe-plus-2026'
NEW_ID = 'trek-fuel-plus-ex-2026'

idx = next((i for i, b in enumerate(bikes) if b['id'] == OLD_ID), None)
if idx is None:
    print(f'ERROR: {OLD_ID} not found!'); sys.exit(1)

new_entry = {
  "id": "trek-fuel-plus-ex-2026",
  "hersteller": "Trek",
  "modell": "Fuel+ EX",
  "modell_hinweis": "PLATTFORM-WECHSEL: Trek Fuel+ ist die KOMPLETT NEUE 2. Generation des Trek Fuel EXe für 2026 — neuer Name (Fuel+ statt Fuel EXe) zur Vereinheitlichung mit Slash+/Rail+ Namensschema. Drei Konfigurationen aus EINER Plattform: Fuel+ EX (145/150 mm Trail, 29er — diese Bewertung), Fuel+ MX (150/160 mm All-Mountain, Mullet), Fuel+ LX (160/170 mm Enduro-Light, 29er). Wechsel via Project One Custom Build oder aftermarket Linkage Kits. ACHTUNG: Auf trekbikes.com/ch ist aktuell (April 2026) nur Fuel EXe Gen 1 gelistet — Fuel+ Gen 2 noch nicht offiziell im CH-Vertrieb. Spec-Stufen: EX 8 (Aluminium, SRAM Eagle 70, ~CHF 6'499), EX 9.7 (Carbon mid-tier, ~CHF 7'999), EX 9.8 (Carbon, Fox Factory + Shimano XT Di2, ~CHF 11'499).",
  "jahr": 2026,
  "modelljahr": 2026,
  "passend_fuer_martina_score": 6,
  "kategorie": "Light-eMTB / Trail",
  "preis_chf": 7999,
  "preis_chf_geschaetzt": True,
  "preis_eur": 7499,
  "preis_hinweis": "UVP CHF 7'999 GESCHÄTZT für Trek Fuel+ EX 9.7 Carbon mid-tier (basierend auf Trek CH-Site Fuel EXe Gen 1 Preise: CHF 6'699 Aluminium bis CHF 11'499 Top-Carbon). Preis-Range gesamt ~CHF 6'499-11'499 je nach Spec-Stufe. KRITISCHER VERGLEICH: ~CHF 7'999 (Carbon mid-tier) ist CHF 3'000 TEURER als Cube ONE44 SLX 800 (Score 9 Voll-Power, CHF 4'999 mit Bosch Gen5 + 800 Wh + Carbon + XT) und CHF 4'509 TEURER als AMFLOW PL Carbon Sale (Score 9 Light-eMTB Klassenprimus, CHF 3'490 mit DJI Avinox 105 Nm + 800 Wh + 19,2 kg). Selbst das günstigste Aluminium EX 8 für ~CHF 6'499 ist CHF 1'500 teurer als das Cube ONE44 SLX 800 mit Voll-Power.",
  "rahmen": {
    "material": "OCLV Mountain Carbon (EX 9.7 / EX 9.8) oder Aluminium (EX 8) — Treks Top-Karbontechnologie",
    "konzept": "Light-eMTB Trail (Adjustable EX/MX/LX Plattform)"
  },
  "federweg": {
    "vorne_mm": 150,
    "hinten_mm": 145
  },
  "gewicht_kg": 19.5,
  "gewicht_hinweis": "~19,5 kg geschätzt für Carbon EX 9.7 (Trek hat keine offizielle 2026 Gewichtsangabe für Fuel+ publiziert). Vorgänger Fuel EXe Gen 1 wog 18,2 kg (Top-Spec Carbon). Aluminium EX 8 vermutlich ~21 kg. Light-eMTB-Klasse — vergleichbar mit Canyon Spectral:ONfly CF 8 (18,9 kg), AMFLOW PL Carbon (19,2 kg).",
  "motor": {
    "hersteller": "TQ",
    "modell": "HPR60",
    "drehmoment_nm": 60,
    "leistung_spitze_w": 350,
    "hersteller_url": "https://www.tq-ebike.com/de/products/light-drive-system/tq-hpr60",
    "hinweis": "NEU 2026 — Update von HPR50! 60 Nm Drehmoment (+10 Nm vs. HPR50), 350 W Peak Power (+50 W), 1,92 kg Motor-Gewicht. 28% effizienter und 125% mehr Reichweite als HPR50 laut Trek-Messungen. Zusätzliche Kühlrippen für konstante Hochleistung (adressiert HPR50-Overheating-Problem). Aber: weiterhin DEUTLICH schwächer als Voll-Power-Motoren (Bosch Gen5 100 Nm, Specialized 3.1 101 Nm, DJI Avinox 105 Nm)."
  },
  "akku": {
    "kapazitaet_wh": 580,
    "wechselbar": True,
    "range_extender_optional": False,
    "hinweis": "580 Wh TQ Akku (NEU 2026 — Update von 360 Wh!) — entnehmbar nach Lösen von 2 Schrauben + Plastik-Cover-Entfernung. Selbe Akku-Tech wie Trek Slash+. WICHTIGER VORTEIL: 360 Wh Vorgänger-Akku rückwärtskompatibel als Light-Setup oder Ersatzakku-Option. Trek-Reichweiten-Angabe: 81,1 km mit 580 Wh = 7,16 Wh/km Effizienz. ABER: 580 Wh ist immer noch nur 73% der Akku-Kapazität von Voll-Power-Konkurrenten (800 Wh) und 73% von AMFLOW PL Carbon (800 Wh) im gleichen Light-eMTB-Segment."
  },
  "laufradgroesse": '29"',
  "ausstattung": {
    "schaltung": "EX 8: SRAM Eagle 70 mechanisch / EX 9.7: Shimano XT mechanisch oder SRAM GX AXS / EX 9.8: Shimano XT Di2 (Top-Spec)",
    "schaltung_url": None,
    "bremsen": "Shimano XT 4-Kolben (EX 9.7/9.8) oder Shimano Deore (EX 8)",
    "bremsen_url": None,
    "laufraeder": "Bontrager Line Comp 30 (EX 8) bis Bontrager Line Pro 30 Carbon (EX 9.8)",
    "laufraeder_url": None,
    "reifen_vorne": "Maxxis Minion DHF EXO+ 3C MaxxTerra 2.5\"",
    "reifen_hinten": "Maxxis Minion DHR II EXO+ 3C MaxxTerra 2.5\"",
    "reifen_url": "https://www.maxxis.com",
    "cockpit": "Bontrager Line Elite Dropper 200 mm Hub (L) + Bontrager Line Vorbau + TQ Color Display"
  },
  "geometrie_features": [
    "OCLV Mountain Carbon Rahmen (EX 9.7/9.8) oder Aluminium (EX 8)",
    "ABP Suspension Design (Active Braking Pivot — Trek-Premium Bauart)",
    "ADJUSTABLE TRAVEL + WHEELSIZE via Swappable Rocker Links + Lower Shock Mount + Shock Stroke + Fork Air Spring",
    "EX-Konfiguration: 145 mm Heck / 150 mm Front mit 29er Laufrädern",
    "Wechselbar zu MX (150/160 mm Mullet) oder LX (160/170 mm 29er Enduro-Light)",
    "ADJUSTABLE Headset Cups für Lenkwinkel-Verstellung",
    "Progression Flip-Chip am unteren Shock-Mount für Suspension-Tuning",
    "12x148 mm Boost Hinterachse + UDH (Universal Derailleur Hanger)",
    "Internal Cable Routing für sauberen Look",
    "Knock Block 2.0 (Trek-spezifischer Headset-Schutz für Carbon-Rahmen)",
    "Bontrager Line Elite Dropper 200 mm Hub (Grösse L) — sehr lange Vario-Sattelstütze"
  ],
  "groessen_hinweis": "Erhältlich in S, M, L, XL — Grösse L empfohlen für 1.80m Körpergrösse",
  "produktseite_url": "https://www.trekbikes.com/ch/de_CH/bikes/mountainbikes/e-mountainbikes/fuel-exe/c/B346/",
  "haendler_ch": "Trek hat sehr starkes CH-Händlernetz mit 100+ autorisierten Velo-Spezialgeschäften. Trek Schweiz-Distribution mit dichtem Service-Netz und schneller Garantie-Abwicklung via lokalen Trek-Händler. Service-Profil sehr stark — vergleichbar mit Cube/Specialized/Giant. Probefahrten an vielen CH-Standorten möglich. Trek seit 1976 (Wisconsin, USA) — etablierte Marke mit weltweit grossem Vertrieb. Project One Custom Build verfügbar (30-60 Tage Lieferung) für individuelle Spec-Wünsche. ABER: Aktuell nur Fuel EXe Gen 1 auf trekbikes.com/ch gelistet — Fuel+ Gen 2 noch nicht offiziell im CH-Vertrieb (Stand April 2026).",
  "smart_features": ["TQ HPR60 mit Trek Central App", "TQ Color Display", "Bluetooth Konnektivität", "Customizable Assistance Profiles", "Karten + Navigationsfunktionen via Central App", "ANT+/Bluetooth"],
  "garantie_besonderheit": "Trek LIFETIME Frame Warranty (Trek-Standard, sehr stark). 2 Jahre auf Komponenten. Motor-Garantie via TQ-Hersteller (typisch 2 Jahre). KRITISCH: HPR50 Vorgänger hatte dokumentierte Overheating-Probleme mit häufigen Motor-Garantie-Wechseln (Pinkbike Werkstatt-Bericht: 3 Motoren in einem Monat warrantet, einige bei nur 141 Meilen!). HPR60 hat zusätzliche Kühlrippen — soll das adressieren, aber Langzeit-Reliability noch unbekannt.",
  "verfuegbarkeit_ch": {
    "haendler": [
      "Trek Schweiz (offizielle CH-Site — aktuell nur Fuel EXe Gen 1 gelistet)",
      "MyBikePlan.ch (CH-Trek-Händler — Fuel EXe 8 GX AXS CHF 6'699 als Alternative)"
    ],
    "status": "unbekannt",
    "probefahrt_moeglich": True,
    "urls": [
      "https://www.trekbikes.com/ch/de_CH/bikes/mountainbikes/e-mountainbikes/fuel-exe/c/B346/",
      "https://www.mybikeplan.ch/alle-modelle-e-bike-schweiz?categories=e-trekking&sortOrder=&brand=trek"
    ]
  },
  "verfuegbarkeit": {
    "status": "unbekannt",
    "hinweis": "KRITISCH: Trek Fuel+ Gen 2 (mit HPR60 + 580 Wh) ist aktuell NICHT auf trekbikes.com/ch gelistet — nur Fuel EXe Gen 1 (HPR50 + 360 Wh) verfügbar. Mario sollte VOR KAUF mit lokalem Trek-Händler abklären, ob und wann Fuel+ Gen 2 in CH ankommt. International ist die Plattform seit August 2025 verfügbar (USA, AU, EU). Möglicherweise Project One Custom Build als CH-Bestellweg möglich.",
    "geprueft_am": "2026-04-26",
    "geprueft_quelle": "https://www.trekbikes.com/ch/de_CH/bikes/mountainbikes/e-mountainbikes/fuel-exe/c/B346/"
  },
  "bewertung_kategorien": {
    "geometrie_rahmengroesse": 9,
    "einsteigerfreundlichkeit": 6,
    "bergauf_touren": 5,
    "bikepark_reserve": 7,
    "gewicht_handling": 8,
    "preis_leistung": 4,
    "service_haendlernetz_ch": 8,
    "risiko_datenunsicherheit": 6
  },
  "bewertung_detail": {
    "pro": [
      "OCLV Mountain Carbon Rahmen (EX 9.7/9.8) — Treks Top-Karbontechnologie",
      "ABP Suspension Design (Active Braking Pivot) — Trek-Premium Bauart, eMTB-spezifisch abgestimmt",
      "ADJUSTABLE TRAVEL + WHEELSIZE (UNIQUE!): Eine Plattform deckt EX (Trail) / MX (All-Mountain Mullet) / LX (Enduro-Light) ab via Swappable Rocker Links — kein anderes Bike der Liste bietet diese Versatilität",
      "TQ HPR60 Motor (NEU 2026) ist Update von HPR50: 60 Nm Drehmoment (+10 Nm), 350 W Peak (+50 W), 28% effizienter, 125% mehr Reichweite",
      "Zusätzliche Kühlrippen am HPR60 adressieren das HPR50-Overheating-Problem",
      "580 Wh Akku (NEU 2026 — UPDATE von 360 Wh!) — gleicher wie Trek Slash+, 73% der Voll-Power-Konkurrenz",
      "Akku ENTNEHMBAR mit 2 Schrauben — kritischer Vorteil vs. Canyon Spectral:ONfly CF 8 (Score 6 mit 360 Wh permanent)",
      "360 Wh Vorgänger-Akku rückwärtskompatibel — Light-Setup oder Ersatzakku-Option",
      "TQ Color Display (NEU 2026!) — UPDATE von 2-Farb LED, voll-customizable via Trek Central App",
      "Adjustable Headset Cups + Progression Flip-Chip — sehr versatile Geometrie",
      "Bontrager Line Elite Dropper Post 200 mm Hub (Grösse L) — sehr lang für Abfahrts-Kontrolle",
      "Sehr starkes CH-Händlernetz mit 100+ Trek-Händlern und schneller Garantie-Abwicklung",
      "Trek LIFETIME Frame Warranty (Trek-Standard)",
      "Project One Custom Build verfügbar (30-60 Tage Lieferung) für individuelle Spec + Farbe",
      "Aftermarket Linkage Kits für EX->MX->LX Conversion verfügbar",
      "Knock Block 2.0 Headset-Schutz für Carbon-Rahmen",
      "Trek seit 1976 (Wisconsin, USA) — etablierte Premium-Marke mit weltweit grossem Vertrieb",
      "Innerhalb der Score-6-Klasse das OBJEKTIV BESTE Bike (mehr Power + grösserer Akku + entnehmbar + Adjustability vs. Canyon Spectral:ONfly CF 8)"
    ],
    "contra": [
      "LIGHT-eMTB-KLASSEN-SCHWÄCHE: TQ HPR60 (60 Nm + 350 W) ist DEUTLICH schwächer als Voll-Power-Motoren UND als AMFLOW DJI Avinox (105 Nm + 850 W) im gleichen Light-eMTB-Segment",
      "PREIS-LEISTUNG SEHR SCHWACH: ~CHF 7'999 (Carbon EX 9.7) ist CHF 3'000 TEURER als Cube ONE44 SLX 800 (Score 9, CHF 4'999, VOLL-POWER mit Bosch Gen5 + 800 Wh + XT) und CHF 4'509 TEURER als AMFLOW PL Carbon Sale (Score 9 Light-eMTB-Klassenprimus, CHF 3'490)",
      "Selbst das günstigste Aluminium EX 8 für ~CHF 6'499 ist CHF 1'500 TEURER als das Cube ONE44 SLX 800 mit Voll-Power",
      "CH-VERFÜGBARKEIT UNSICHER: Trek Fuel+ Gen 2 ist NICHT auf trekbikes.com/ch gelistet (Stand April 2026) — nur Fuel EXe Gen 1 (HPR50 + 360 Wh) verfügbar. Mario müsste mit lokalem Trek-Händler oder Project One Custom Build bestellen",
      "TQ-Motor OVERHEATING-RISIKO: HPR50 Vorgänger hatte dokumentiertes Overheating-Problem (Pinkbike Werkstatt-Bericht: '3 Motor-Garantien in einem Monat, einer bei nur 141 Meilen'). HPR60 hat zusätzliche Kühlrippen, aber Langzeit-Reliability noch unbekannt",
      "Reichweite trotz 580 Wh: 81,1 km Hersteller-Angabe — schwächer als Voll-Power-Konkurrenz mit 800 Wh und stärkeren Motoren",
      "EX 8 Aluminium-Variante mit SRAM Eagle 70 ist mid-tier Komponenten-Spec trotz CHF 6'499",
      "Top-Spec EX 9.8 mit Fox Factory + XT Di2 für CHF 11'499 ist unverhältnismässig teuer für ein Light-eMTB",
      "Naming-Verwirrung: 'Fuel+' ist neu, viele User suchen noch nach 'Fuel EXe' — schwer in Suchergebnissen zu finden",
      "Linkage-Kit-Wechsel zwischen EX/MX/LX kostet zusätzlich (Aftermarket-Kosten nicht im UVP enthalten)",
      "Project One Custom Build hat 30-60 Tage Lieferzeit — keine Lager-Verfügbarkeit für individuelle Specs"
    ],
    "fazit": "Innovativstes Light-eMTB der Liste mit Adjustable Travel + Wheelsize, ABER mit strukturellen Schwächen die Score 6 bestätigen. Pro: OCLV Mountain Carbon Rahmen (Top-Spec), ABP Suspension Design Trek-Premium, ADJUSTABLE TRAVEL + WHEELSIZE als UNIQUE-Feature (EX/MX/LX aus einer Plattform), TQ HPR60 als UPDATE mit 60 Nm + 350 W + 28% Effizienz, 580 Wh ENTNEHMBARER Akku (kritischer Vorteil vs. Canyon Spectral:ONfly CF 8 Score 6 mit 360 Wh permanent), TQ Color Display, Adjustable Headset + Progression Flip-Chip, sehr starkes CH-Händlernetz mit 100+ Trek-Händlern, Trek Lifetime Frame Warranty, Project One Custom Build, Trek seit 1976. INNERHALB der Score-6-Klasse ist Trek Fuel+ EX das OBJEKTIV BESTE Bike. Contra: LIGHT-eMTB-KLASSEN-SCHWÄCHE (TQ HPR60 mit 60 Nm + 350 W ist DEUTLICH schwächer als Voll-Power-Motoren und als AMFLOW DJI Avinox 105 Nm Klassenprimus), PREIS-LEISTUNG SEHR SCHWACH (CHF 3'000-4'500 TEURER als Cube ONE44 SLX 800 Voll-Power Score 9 oder AMFLOW PL Carbon Sale Score 9), CH-VERFÜGBARKEIT UNSICHER (Fuel+ Gen 2 nicht auf trekbikes.com/ch gelistet, nur Fuel EXe Gen 1), TQ-Motor Overheating-Risiko (HPR50-Probleme dokumentiert, HPR60 hat Kühlrippen aber Reliability unbekannt), 580 Wh ist 73% der Voll-Power-Akku-Kapazität, EX 9.8 Top-Spec für CHF 11'499 unverhältnismässig teuer. Score 6 reflektiert: VIER strukturelle Schwächen (Light-eMTB-Klasse + Premium-Preis + CH-Verfügbarkeit + TQ-Reliability) sind genau das Pattern wie andere Score-6 Bikes. Aber: Trek Fuel+ EX ist OBJEKTIV STÄRKER innerhalb der Score-6-Klasse als Canyon Spectral:ONfly CF 8 (mehr Power + grösserer Akku + entnehmbar + Adjustability + besseres CH-Service-Netz). Wer Innovation + Adjustability + Trek-Service über alles stellt: defensible Wahl trotz Premium-Preis und CH-Verfügbarkeits-Frage. Wer maximale Light-eMTB-Performance will: AMFLOW PL Carbon (Score 9, CHF 3'490 Sale) bietet 800 Wh + 105 Nm DJI Avinox + 19,2 kg für CHF 4'509 weniger. Wer Voll-Power für gleichen Preis will: Cube ONE44 SLX 800 (Score 9, CHF 4'999) bietet Bosch Gen5 + 800 Wh + Carbon + XT für CHF 3'000 weniger."
  },
  "bild_pfad": "/images/bikes/trek-fuel-plus-ex-2026.jpg",
  "referenzbike": False,
  "warnungen": [],
  "alternativ_zu": [],
  "test_urteile": [
    {
      "quelle": "Pinkbike (First Look: Trek's TQ-Powered 2026 Fuel+ eMTB)",
      "kurzfazit": "The electrified version of the brand-new Fuel platform, which encompasses three sub-model options depending on build kit and link choice. Trek Fuel+ MX with mullet wheels and 150/160mm travel, Fuel+ EX with 29er and 145/150mm, Fuel+ LX with 29er and 160/170mm enduro-light setup. ABP Suspension Design with adjustable rocker links."
    },
    {
      "quelle": "Pinkbike (Werkstatt-Erfahrung HPR50 Overheating)",
      "kurzfazit": "Every single customer with an HPR50 powered bike experiences overheating issues. If it's hot out, you're in the highest assistance level and the climb is steep sometimes it happens as soon as five minutes into a climb. In the last month I have literally had to warranty three different TQ motors, one had 468 miles and one 141. HPR60 should address this with cooling fins but long-term reliability unknown."
    },
    {
      "quelle": "Flow Mountain Bike (First Look 2026 Trek Fuel+ EX MX LX)",
      "kurzfazit": "Bigger battery, more powerful motor and ability to adapt travel, geometry and wheelsize. Maintains similar overall frame shape to first generation Fuel EXe, updated with TQ HPR60 motor offering 60Nm torque and 350W peak power. Quieter and more efficient than predecessor. 580Wh battery same as Slash+ enduro e-MTB. Battery can still be easily removed from the frame after undoing two bolts."
    },
    {
      "quelle": "Pedelec-elektro-fahrrad.de (Trek 2026 Fuel+ E-MTB Test)",
      "kurzfazit": "Mit 60 Newtonmetern maximaler Unterstützung und 350 Watt Spitzenleistung positioniert sich das System im Mittelfeld der aktuellen E-MTB-Motoren. Setzt 20 Umdrehungen früher mit der maximalen Leistung ein als der HPR50, was zu einem natürlicheren Fahrgefühl beitragen soll. 580 Wattstunden-Akku, identisch mit Slash+. Reichweite 81,1 km mit grossem Akku = 7,16 Wattstunden pro Kilometer."
    },
    {
      "quelle": "EMTB Forums (Gen 2 Trek Fuel+ Owner-Erfahrung)",
      "kurzfazit": "I've had a Fuel EXe and still have a Slash+. The increase in power with the HPR60 over the HPR50 is a nice gain but I feel the biggest feature/benefit with the new system is the improved efficiency. Recent on-trail comparison: friend (4kg lighter) used almost 40% more battery for same ride with Fuel EXe + two 360Wh batteries vs. my Fuel+ with one 580Wh battery."
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

# Schema checks
assert isinstance(entry['motor'], dict), 'motor must be dict'
assert isinstance(entry['akku'], dict), 'akku must be dict'
assert 'drehmoment_nm' in entry['motor'], 'motor must have drehmoment_nm'
assert 'kapazitaet_wh' in entry['akku'], 'akku must have kapazitaet_wh'
haendler_types = [type(h).__name__ for h in entry['verfuegbarkeit_ch']['haendler']]
assert all(t == 'str' for t in haendler_types), f'haendler must be strings, got: {haendler_types}'

print(f'Done — replaced index {idx}')
print(f'ID: {entry["id"]}')
print(f'Score: {entry["passend_fuer_martina_score"]}')
print(f'bewertung_kategorien keys: {keys}')
print(f'Pro: {len(entry["bewertung_detail"]["pro"])} | Contra: {len(entry["bewertung_detail"]["contra"])}')
print(f'motor: {entry["motor"]["hersteller"]} {entry["motor"]["modell"]} — {entry["motor"]["drehmoment_nm"]} Nm / {entry["motor"]["leistung_spitze_w"]} W')
print(f'akku: {entry["akku"]["kapazitaet_wh"]} Wh, wechselbar={entry["akku"]["wechselbar"]}')
print(f'haendler types: {haendler_types}')
if bad_keys:
    print(f'BAD KEYS: {bad_keys}')
else:
    print('Spot-check: OK — keine schlechten Keys')
