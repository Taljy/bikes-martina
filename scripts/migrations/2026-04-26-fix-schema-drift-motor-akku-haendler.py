#!/usr/bin/env python3
"""Fix schema drift: motor + akku sub-objects for Heckler, ONfly, Trek."""
import json, sys

with open('src/data/bikes.json', 'r', encoding='utf-8') as f:
    bikes = json.load(f)

fixed = []

for bike in bikes:
    bid = bike['id']

    # ── A) Santa Cruz Heckler 9 MX ─────────────────────────────────────────
    if bid == 'santa-cruz-heckler-9-mx-2026':
        bike['motor'] = {
            "hersteller": "Shimano",
            "modell": "EP801",
            "drehmoment_nm": 85,
            "leistung_spitze_w": 600,
            "hersteller_url": "https://bike.shimano.com/de-CH/product/component/ep801.html",
            "hinweis": "NEU 2024 — Update vom EP8. 85 Nm Drehmoment, 600 W Peak (+100 W vs. EP8), Magnesium-Gehäuse, leiser, feiner abgestimmt, Free-Shift und Auto-Shift Support, neue Shimano Remote EN600L. KEIN Bosch Performance Line CX Gen5 — basiert auf Shimano-Tech die im 2026er Markt nicht mehr Top-Niveau ist."
        }
        # Remove flat fields, add nested akku
        bike.pop('akku_wh', None)
        bike.pop('akku_entnehmbar', None)
        bike.pop('akku_hinweis', None)
        bike['akku'] = {
            "kapazitaet_wh": 720,
            "wechselbar": True,
            "range_extender_optional": False,
            "hinweis": "720 Wh Darfon Akku (Shimano-approved Drittanbieter) entnehmbar mit 4mm Imbus-Quick-Release. Vorgänger Heckler 8 hatte nur 504 Wh — wichtiger Upgrade. ABER: 720 Wh ist 80 Wh KLEINER als 800 Wh Standard bei Score-9 Konkurrenz. Plus laut eMTB-News-Test: 'kommt aber in Bezug auf die Reichweite keineswegs an einen Bosch Performance CX mit 750er-Akku heran'."
        }
        fixed.append(bid)

    # ── B) Canyon Spectral:ONfly CF 8 ──────────────────────────────────────
    elif bid == 'canyon-spectral-onfly-cf-8-2026':
        bike['motor'] = {
            "hersteller": "TQ",
            "modell": "HPR50",
            "drehmoment_nm": 50,
            "leistung_spitze_w": 300,
            "hersteller_url": "https://www.tq-ebike.com/de/products/light-drive-system/tq-hpr50",
            "hinweis": "Light-eMTB-Motor. 50 Nm Drehmoment, 250 W Nennleistung, 300 W Peak Power, NUR 1'850 g Motor-Gewicht (FEDERLEICHT, passt in eine Hand). KEIN Voll-Power-Motor wie Bosch CX Gen5 (100 Nm) / Specialized 3.1 (101 Nm) / DJI Avinox (105 Nm). TQ ist BESTER Light-eMTB-Motor (super leise, am natürlichsten), aber eine Klasse unter den Voll-Power-Motoren."
        }
        bike.pop('akku_wh', None)
        bike.pop('akku_entnehmbar', None)
        bike.pop('akku_hinweis', None)
        bike['akku'] = {
            "kapazitaet_wh": 360,
            "wechselbar": False,
            "range_extender_optional": True,
            "range_extender_wh": 160,
            "hinweis": "360 Wh TQ HPR V01 PERMANENT integriert im Carbon-Unterrohr (NICHT entnehmbar zum Laden!). Nur 1'830 g Akku-Gewicht. Reichweite: ~1'000 Höhenmeter pro Ladung. Optional TQ 160 Wh Range Extender = bis 520 Wh kombiniert (+44%). KRITISCHE SCHWÄCHE: 360 Wh ist NUR 45% der Akku-Kapazität von Voll-Power-Konkurrenten und 45% von AMFLOW PL Carbon im gleichen Light-eMTB-Segment. Plus permanent integriert wie Cannondale/Transition (beide Score 6)."
        }
        fixed.append(bid)

    # ── C) Trek Rail+ 9.7 Gen 5 — nur Motor-Keys umbenennen ────────────────
    elif bid == 'trek-rail-plus-9-7-gen-5-2026':
        m = bike.get('motor', {})
        bike['motor'] = {
            "hersteller": m.get('hersteller', 'Bosch'),
            "modell": m.get('modell', 'Performance Line CX Gen5'),
            "drehmoment_nm": m.get('nm', m.get('drehmoment_nm', 85)),
            "leistung_spitze_w": m.get('watt', m.get('leistung_spitze_w', 600)),
            "hersteller_url": "https://www.bosch-ebike.com/ch/produkte/performance-line-cx",
            "hinweis": "85 Nm Standard, 100 Nm via Bosch Flow App ab Juli 2025, 600 W peak power. Smart System mit Kiox 400C kompatibel."
        }
        fixed.append(bid)

with open('src/data/bikes.json', 'w', encoding='utf-8') as f:
    json.dump(bikes, f, ensure_ascii=False, indent=2)

print(f'Fixed: {fixed}')

# ── Audit ───────────────────────────────────────────────────────────────────
print('\n=== POST-FIX AUDIT ===')
with open('src/data/bikes.json', 'r', encoding='utf-8') as f:
    bikes = json.load(f)

akku_bad  = [b['id'] for b in bikes if not isinstance(b.get('akku'), dict)]
motor_bad = [b['id'] for b in bikes if not isinstance(b.get('motor'), dict)]
print(f'akku not dict  ({len(akku_bad)}): {akku_bad}')
print(f'motor not dict ({len(motor_bad)}): {motor_bad}')

# Spot-check the three fixed bikes
for tid in ['santa-cruz-heckler-9-mx-2026', 'canyon-spectral-onfly-cf-8-2026', 'trek-rail-plus-9-7-gen-5-2026']:
    entry = next(b for b in bikes if b['id'] == tid)
    m = entry['motor']
    a = entry['akku']
    print(f'\n{tid}:')
    print(f'  motor: hersteller={m["hersteller"]}, drehmoment_nm={m.get("drehmoment_nm")}, leistung_spitze_w={m.get("leistung_spitze_w")}, hersteller_url={bool(m.get("hersteller_url"))}')
    print(f'  akku: kapazitaet_wh={a.get("kapazitaet_wh")}, wechselbar={a.get("wechselbar")}, range_extender={a.get("range_extender_optional")}')
