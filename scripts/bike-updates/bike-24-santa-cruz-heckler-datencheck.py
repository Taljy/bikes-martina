#!/usr/bin/env python3
import json, sys

with open('src/data/bikes.json', 'r', encoding='utf-8') as f:
    bikes = json.load(f)

OLD_ID = 'santa-cruz-heckler-mx-2026'
NEW_ID = 'santa-cruz-heckler-9-mx-2026'

idx = next((i for i, b in enumerate(bikes) if b['id'] == OLD_ID), None)
if idx is None:
    print(f'ERROR: {OLD_ID} not found!'); sys.exit(1)

new_entry = {
  "id": "santa-cruz-heckler-9-mx-2026",
  "hersteller": "Santa Cruz",
  "modell": "Heckler 9 MX (R-Kit Carbon C)",
  "modell_hinweis": "Heckler 9 ist die aktuelle Voll-Power Voll-Karbon eMTB-Plattform von Santa Cruz (NICHT Heckler SL mit Fazua-Antrieb!). Diese Bewertung gilt für die R-Kit Carbon C Variante als Einstiegs-Spec mit ~CHF 9'990. Höhere Spec-Stufen verfügbar: S-Kit (CHF ~10'500), GX-AXS (CHF ~9'990-10'500), X0 AXS RSV mit Carbon CC + RESERVE Laufräder (CHF ~11'599). Vorgängermodell Heckler 8 hatte 504 Wh Akku — Heckler 9 hat 720 Wh. Mullet-Setup (29\"/27.5\") ab Werk, 29\"-Variante separat verfügbar.",
  "jahr": 2026,
  "modelljahr": 2026,
  "passend_fuer_martina_score": 6,
  "kategorie": "All-Mountain / Trail",
  "preis_chf": 9990,
  "preis_chf_geschaetzt": True,
  "preis_eur": 7999,
  "preis_hinweis": "UVP CHF 9'990 GESCHÄTZT für R-Kit Carbon C basierend auf dreamparts.ch und CH-Distributor santacruzbikes.ch (Trailworks AG). Top-Spec X0 AXS RSV Carbon CC kostet CHF ~11'599. KRITISCH: CHF 9'990 ist DOPPELT so teuer wie Cube ONE44 SLX 800 (Score 9, CHF 4'999, Carbon, Bosch Gen5, 800 Wh, XT) und Orbea Wild H10 (Score 9, CHF 4'990, 170/170mm, Bosch Gen5, XT) — beide objektiv besser positioniert in Preis-Leistung. CHF 9'990 ist auch CHF 2'000 TEURER als Trek Rail+ 9.7 Gen 5 (Score 7, ~CHF 7'990) und Specialized Turbo Levo 4 Comp Alloy (Score 7, CHF 6'999) bei vergleichbarem Trail-Niveau.",
  "rahmen": {
    "material": "Carbon C (Standard) oder Carbon CC (Top-Spec, ~300g leichter, gleiche Festigkeit)",
    "konzept": "All-Mountain Trail (Bronson-Plattform mit Motor)"
  },
  "federweg": {
    "vorne_mm": 160,
    "hinten_mm": 150
  },
  "gewicht_kg": 22.6,
  "gewicht_hinweis": "22,6 kg (Carbon CC, Grösse L laut eMTB-News-Test). Carbon C-Variante leicht schwerer (~300g mehr). Vergleichbar mit anderen Carbon-Voll-Power eMTBs in dieser Klasse — leichter als die meisten Aluminium-Konkurrenten (Specialized 25,7 kg, Commencal 25,5 kg).",
  "motor": {
    "hersteller": "Shimano",
    "modell": "EP801",
    "nm": 85,
    "watt": 600,
    "hinweis": "Shimano EP801 (NEU 2024 — Update vom EP8) — 85 Nm Drehmoment, 600 W Peak Power (+100 W vs. EP8), Magnesium-Gehäuse, leiser, feiner abgestimmt, Free-Shift und Auto-Shift Support, neue Shimano Remote EN600L. KEIN Bosch Performance Line CX Gen5 — basiert auf Shimano-Tech die im 2026er Markt nicht mehr Top-Niveau ist."
  },
  "akku_wh": 720,
  "akku_entnehmbar": True,
  "akku_hinweis": "720 Wh Darfon Akku (Shimano-approved Drittanbieter) entnehmbar mit 4mm Imbus-Quick-Release. Vorgänger Heckler 8 hatte nur 504 Wh — das ist ein wichtiger Upgrade. ABER: 720 Wh ist 80 Wh KLEINER als 800 Wh Standard bei Score-9 Konkurrenz (Cube, Orbea, Canyon, Focus). Plus laut eMTB-News-Test: 'kommt aber in Bezug auf die Reichweite keineswegs an einen Bosch Performance CX mit 750er-Akku heran' — Shimano EP801 zieht mehr Strom als der EP8 ohnehin schon tat.",
  "laufradgroesse": "MX (Mullet)",
  "ausstattung": {
    "gabel": "RockShox Lyrik Select (R-Kit) bis RockShox Lyrik Ultimate (X0 AXS RSV) je nach Spec, 160 mm Federweg, 44-46mm Offset",
    "daempfer": "RockShox Super Deluxe Select bis Super Deluxe Ultimate je nach Spec",
    "schaltung": "SRAM NX (R-Kit) / GX (S-Kit) / GX AXS oder X0 Eagle Transmission AXS (X0 AXS RSV) — Spec variiert stark zwischen Varianten",
    "bremsen": "SRAM Code R bis Code RSC mit 200mm HS2 Rotors je nach Spec",
    "laufraeder": "WTB i30 Felgen mit SRAM MTH Hubs (R-Kit) oder Santa Cruz Reserve 30/DH Carbon Laufräder mit Industry Nine 1/1 Hubs (X0 AXS RSV)",
    "reifen": "Maxxis Assegai 2.5\" 3C MaxxGrip vorne / Maxxis Minion DHR II 2.4\" 3C MaxxTerra hinten — Top-Trail-Reifen",
    "sattelstuetze": "OneUp V2 Dropper Post (Vario), Hub variiert je nach Grösse",
    "vorbau": "Burgtec Enduro Mk3 Stem 35mm",
    "lenker": "Santa Cruz Mountain (Aluminium) bis Santa Cruz E35 Carbon (X0 AXS RSV)",
    "display": "Shimano EM800 Color Display (Schwarz-Weiss-Bildschirm in tieferen Specs, Color Display in Top-Specs)",
    "remote": "Shimano EN600L Remote für Mode-Wechsel, vorkonfigurierte Profile, LED Battery Indicator",
    "extra": "Internal Cable Routing, Universal Derailleur Hanger, gummierter Unterrohr-Schutz, Schutzschild für Dämpfer, Platz für Trinkflasche im Hauptdreieck"
  },
  "geometrie_features": [
    "VPP™ (Virtual Pivot Point) Hinterbau — Santa Cruz Premium-Bauart mit kleineren Anti-Squat-Werten für eMTB-spezifische Abstimmung",
    "Vollcarbon-Hauptrahmen + Carbon-Hinterbau (C oder CC Carbon)",
    "Mullet-Setup ab Werk (29\" vorne / 27.5\" hinten) — alternativ 29\" Voll-Setup verfügbar",
    "Flip-Chip am unteren Link für Geometrie-Anpassung (Hi/Low Setting)",
    "Hi/Low Setting ändert Lenkwinkel um 0.3° und BB-Höhe um 4mm",
    "150 mm Hinterbau-Federweg (Bronson-equivalent) + 160 mm Gabel — Trail-Niveau",
    "64.5° Lenkwinkel (low setting) — modern für aggressive Trails",
    "475 mm Reach (Grösse L, low setting), 1'253 mm Wheelbase",
    "446 mm kurze Kettenstrebe für Agilität trotz Mullet-Setup",
    "Boost 148 Hinterachse + Universal Derailleur Hanger",
    "Internal Cable Routing für sauberen Look",
    "Platz für 2.6\" Reifen, kompatibel mit Coil-Dämpfern",
    "S-Sizing pro Grösse: Chainstay-Länge und Sitzwinkel werden mit Rahmen-Grösse skaliert"
  ],
  "groessen_hinweis": "Erhältlich in S (mit 27.5\"/27.5\" Setup, NICHT Mullet!), M, L, XL, XXL — Grösse L empfohlen für 1.80m Körpergrösse. Achtung: NUR Mullet-Variante hat 29\"/27.5\" — Grösse S ist Voll-27.5\".",
  "produktseite_url": "https://www.santacruzbicycles.com/de-CH/bikes/heckler",
  "haendler_ch": "Santa Cruz CH-Vertrieb über TRAILWORKS AG (Schmerikon, SG) — offizieller Distributor mit Webshop santacruzbikes.ch und Konfigurator + Lagerbestand-Anzeige. Telefon-Support: 055 640 67 37. Zusätzliche CH-Händler: dreamparts.ch und andere autorisierte Velo-Spezialgeschäfte. Service-Profil sehr stark über Trailworks AG. Santa Cruz seit 1993 (Santa Cruz, Kalifornien) — Boutique-Marke mit Premium-Carbon-Heritage und World-Cup-DH-Erfolgen.",
  "smart_features": ["Shimano EP801 mit Free-Shift Auto-Shift", "Shimano EN600L Remote", "Shimano EM800 Display", "CAN-Bus Integration", "Garmin-Geräte kompatibel"],
  "garantie_besonderheit": "LIFETIME WARRANTY auf: (1) Hauptrahmen, (2) Hinterbau-Lager (free bearings for life — UNIQUE!), (3) Optionale RESERVE Carbon-Laufräder. Plus Santa Cruz Rider Support-Versprechen. Das ist die STÄRKSTE Garantie der ganzen Liste — kein anderes Bike bietet lebenslange Bearings.",
  "verfuegbarkeit_ch": {
    "haendler": [
      {
        "name": "Trailworks AG (offizieller Santa Cruz CH-Distributor) — Schmerikon SG",
        "url": "https://www.santacruzbikes.ch/de/bike_configurator_detail/348",
        "hinweis": "Konfigurator + Lagerbestand-Anzeige + Telefon-Support 055 640 67 37"
      },
      {
        "name": "dreamparts.ch (autorisierter CH-Händler)",
        "url": "https://dreamparts.ch/shop/velo/e-mtb/santa-cruz-heckler-r-carbon-cc-mx/",
        "hinweis": "Heckler R Carbon C ab CHF 9'999, Heckler GX AXS CHF 9'990, Heckler X0 AXS RSV CHF 11'599"
      }
    ],
    "status": "verfuegbar",
    "probefahrt_moeglich": True,
    "urls": ["https://www.santacruzbikes.ch/de/bike_configurator_detail/348"]
  },
  "verfuegbarkeit": {
    "status": "verfuegbar",
    "hinweis": "Verfügbar via offiziellen Santa Cruz CH-Distributor (Trailworks AG, Schmerikon) mit Konfigurator und Lagerbestand-Anzeige. Plus autorisierte CH-Händler. Lifetime Warranty + Free Bearings for Life ist UNIQUE.",
    "geprueft_am": "2026-04-26",
    "geprueft_quelle": "https://www.santacruzbicycles.com/de-CH/bikes/heckler"
  },
  "bewertung_kategorien": {
    "geometrie_rahmengroesse": 8,
    "einsteigerfreundlichkeit": 5,
    "bergauf_touren": 7,
    "bikepark_reserve": 8,
    "gewicht_handling": 8,
    "preis_leistung": 3,
    "service_haendlernetz_ch": 7,
    "risiko_datenunsicherheit": 8
  },
  "bewertung_detail": {
    "pro": [
      "VOLLCARBON-Rahmen (C oder CC Carbon) — Premium-Material mit Santa Cruz Heritage seit 1993",
      "VPP™ Hinterbau (Santa Cruz Premium-Bauart) auf Top-Niveau, eMTB-spezifisch abgestimmt mit kleineren Anti-Squat-Werten",
      "LIFETIME WARRANTY: Hauptrahmen + Hinterbau-Lager + RESERVE Laufräder — UNIQUE in der ganzen Liste! Kein anderes Bike bietet Free Bearings for Life",
      "Mullet-Setup ab Werk (29\"/27.5\") für Stabilität + Agilität",
      "150/160 mm Trail-Niveau Federweg — ideal für lange Tage und technische Trails",
      "Flip-Chip am unteren Link für Geometrie-Verstellung (Hi/Low Setting)",
      "22,6 kg (Carbon CC, L) — leichter als die meisten Aluminium-Konkurrenten (Specialized 25,7 kg, Commencal 25,5 kg)",
      "720 Wh Darfon Akku ENTNEHMBAR mit 4mm Imbus-Quick-Release — kein Cannondale/Transition-Permanent-Problem",
      "Maxxis Assegai + Minion DHR II Reifen — Top-Trail-Reifen mit aggressivem Profil",
      "Shimano EP801 ist Update vom EP8 mit 600 W Peak Power (+100 W) und feinerer Abstimmung",
      "KAUFTIPP von eMTB-News.de für Top-Spec-Variante (Carbon CC X0 AXS RSV MX) wegen Performance + Ausstattung",
      "Trailworks AG (Schmerikon) als offizieller CH-Distributor mit Webshop, Konfigurator und Telefon-Support",
      "Santa Cruz Reserve Carbon Laufräder optional (Top-Spec) mit lebenslanger Garantie",
      "Internal Cable Routing + Universal Derailleur Hanger + Coil-Dämpfer-kompatibel",
      "S-Sizing pro Grösse: Chainstay + Sitzwinkel werden mit Rahmengrösse skaliert für ausgewogenes Handling",
      "446 mm kurze Kettenstrebe für Agilität trotz Mullet-Setup",
      "Santa Cruz seit 1993 (Boutique-Marke mit World-Cup-DH-Erfolgen) — sehr starke Marken-Stabilität"
    ],
    "contra": [
      "MOTOR-GENERATION-SCHWÄCHE: Shimano EP801 hat 85 Nm + 600 W Peak — DEUTLICH schwächer als Bosch Performance Line CX Gen5 (100 Nm via App), Specialized 3.1 Motor (101 Nm + 666 W), DJI Avinox (105 Nm + 850 W). Im 2026er Premium-eMTB-Markt ist Shimano nicht mehr Top-Niveau",
      "Laut eMTB-News-Test: 'kommt aber in Bezug auf die Reichweite keineswegs an einen Bosch Performance CX mit 750er-Akku heran' — Shimano EP801 zieht mehr Strom als der EP8",
      "PREIS-LEISTUNG SEHR SCHWACH: CHF 9'990 (R-Kit) ist DOPPELT so teuer wie Cube ONE44 SLX 800 (Score 9, CHF 4'999) und Orbea Wild H10 (Score 9, CHF 4'990) — beide bieten Bosch Gen5 + 800 Wh + XT-Komponenten zu HÄLFTE des Preises",
      "Shimano EP801 ist im Geräusch hörbar (laut MTB-News Forum: 'Shimano kann je nach Rahmen stark hörbar sein, klappert beim Rollen lassen' — Bosch hat das Problem komplett abgestellt)",
      "720 Wh Akku ist 80 Wh KLEINER als 800 Wh Standard bei Score-9 Konkurrenz",
      "R-Kit Variante hat SRAM NX Schaltung (Einstiegs-Niveau) trotz Premium-Preis CHF 9'990",
      "Top-Spec X0 AXS RSV mit Carbon CC kostet CHF 11'599 — fast 2.5x mehr als Cube ONE44 SLX 800 für minimal bessere Specs",
      "Spec-Stufen sind komplex und unterscheiden sich stark (R-Kit vs. S-Kit vs. GX vs. X0 AXS RSV) — Käufer müssen genau prüfen was inkludiert ist",
      "Trailworks AG ist EINZIGER CH-Distributor (Schmerikon SG) — Service-Netz weniger dicht als Cube/Trek/Specialized/Giant",
      "Probefahrten nur via Trailworks AG oder vereinzelte autorisierte Händler möglich — dichter als DTC-Marken (Commencal, AMFLOW), aber dünner als Cube/Trek/Specialized",
      "Carbon-Heritage und Lifetime Bearings rechtfertigen Premium-Marken-Aufpreis NICHT vollständig im 2026er Markt mit so vielen starken Konkurrenten"
    ],
    "fazit": "Vollcarbon-Premium-Bike mit weltweit unique Lifetime-Bearings-Garantie, aber strukturell ähnliche Schwächen-Kombination wie Giant Trance X E+ 2 (Score 6). Pro: Vollcarbon-Rahmen mit Santa Cruz Heritage seit 1993, VPP Hinterbau (Top-Niveau), LIFETIME WARRANTY auf Hauptrahmen + Hinterbau-Lager + RESERVE Laufräder (UNIQUE in der Liste!), Mullet-Setup ab Werk, 22,6 kg leichter als Aluminium-Konkurrenz, 720 Wh entnehmbar, Maxxis Top-Reifen, Flip-Chip Geometrie, KAUFTIPP eMTB-News für Top-Spec, Trailworks AG als offizieller CH-Distributor, S-Sizing für ausgewogenes Handling. Contra: MOTOR-GENERATION-SCHWÄCHE (Shimano EP801 mit 85 Nm + 600 W ist DEUTLICH schwächer als Bosch Gen5 100 Nm / Specialized 3.1 101 Nm / DJI Avinox 105 Nm im 2026er Markt), PREIS-LEISTUNG SEHR SCHWACH (CHF 9'990 R-Kit ist DOPPELT so teuer wie Cube ONE44 SLX 800 Score 9 mit objektiv besseren Specs), 720 Wh statt 800 Wh, Shimano-Motor hörbar laut MTB-News Forum, R-Kit hat NX Schaltung trotz Premium-Preis, Trailworks AG einziger CH-Distributor mit weniger dichtem Service-Netz als Cube/Trek. Score 6 reflektiert: KOMBINATION aus Motor-Generation-Schwäche (Shimano EP801) + Preis-Leistung (CHF 9'990+ doppelt vs. Cube/Orbea Score 9) + 720 Wh sind drei strukturelle Schwächen — nicht nur EINE klare Schwäche wie Score-7 Bikes (Trek Rail+ 9.7 hat nur Preis-Schwäche, Specialized hat Innovation-Bonus). Konsistent mit Giant Trance X E+ 2 Pattern (Score 6 wegen Yamaha + Premium + 750 Wh): wenn Vollcarbon die Hardware-Premium-Schwäche zieht, hilft das gegen Score 5 aber nicht gegen Score 6. Wer Vollcarbon + Lifetime Bearings + Santa Cruz Heritage + VPP Hinterbau über alles stellt: defensible Wahl trotz Premium-Preis. Wer maximale Preis-Leistung will: Cube ONE44 SLX 800 (Score 9, CHF 4'999) bietet 100% des Bikes für 50% des Preises mit besserer Motor-Tech."
  },
  "bild_pfad": "/images/bikes/santa-cruz-heckler-9-mx-2026.jpg",
  "referenzbike": False,
  "warnungen": [],
  "alternativ_zu": [],
  "test_urteile": [
    {
      "quelle": "eMTB-News.de — Santa Cruz Heckler CC X0 AXS RSV MX Test (KAUFTIPP)",
      "kurzfazit": "Mit dem Heckler CC hat Santa Cruz ein potentes E-All-Mountain im Programm, was auch als Enduro durchgehen kann. Mit 160/150 mm Federweg, Carbonrahmen, Shimano EP801 und Akku mit 720 Wh dürfte es so ziemlich überall eine gute Figur machen. Aber: kommt in Bezug auf die Reichweite keineswegs an einen Bosch Performance CX mit 750er-Akku heran. KAUFTIPP wegen Performance + durchdachter Ausstattung, aber Akku-Reichweite ist Schwäche."
    },
    {
      "quelle": "Pinkbike Review (Heckler MX X01 AXS)",
      "kurzfazit": "Composed at speed, confident in the steeps, and remains maneuverable and fun to ride on mellower trails. Shimano's trustworthy EP8 motor delivers the power, and a sizeable 720 Wh battery gives it a very impressive range. The dialed high-end build is also very expensive."
    },
    {
      "quelle": "Outdoor Gear Lab (Heckler MX Test)",
      "kurzfazit": "The Heckler MX is a balanced and well-rounded bike that performs well in most situations and really comes alive at speed. With 64.5 head angle, 475mm reach, 1253mm wheelbase, this bike feels confidence-inspiring and stable at speed or when pointed down steep terrain."
    },
    {
      "quelle": "Mount7.com (Santa Cruz Heckler Beschreibung)",
      "kurzfazit": "Verbindet das vollblütige Trailbike-Erlebnis mit Shimano EP801 und 720 Wh Akku. Santa Cruz renommiertes Virtual Pivot Point System sorgt für unvergleichbare Pedaliereffizienz. Sobald die Hinterbau-Lager verschlissen sind, bietet SC dem Erstbesitzer gratis neue."
    },
    {
      "quelle": "MTB-News Forum (April 2025) — Motor-Generation-Diskussion",
      "kurzfazit": "Shimano kann je nach Rahmen stark hörbar sein, klappert beim Rollen lassen — Bosch hat das komplett abgestellt. Es wird ja nicht grundlos sein, warum sehr viele Hersteller von den Shimano Motoren weg gegangen sind. Die neuen Voll-Power Santas sind nur noch mit anderen Motoren zu haben (Vala mit DJI/Bosch)."
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
print(f'Preis-Leistung: {entry["bewertung_kategorien"]["preis_leistung"]}')
if bad_keys:
    print(f'BAD KEYS: {bad_keys}')
else:
    print('Spot-check: OK — keine schlechten Keys')
