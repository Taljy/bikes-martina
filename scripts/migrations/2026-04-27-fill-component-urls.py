#!/usr/bin/env python3
"""
2026-04-27 — Fill in component manufacturer URLs (brand-level) for bikes that had NOT_SPECIFIED or None.
Pendenz #B — Phase 3: Recherche + Eintrag.

Rules:
- Only brand-level URLs (no deep product links unless already present)
- If brand not known / too ambiguous: set null, don't invent
- Runs from repo root: python3 scripts/migrations/2026-04-27-fill-component-urls.py
"""

import json
import sys
from pathlib import Path

DATA_PATH = Path('src/data/bikes.json')

# ── Brand URL mapping ─────────────────────────────────────────────────────────
BOSCH   = 'https://www.bosch-ebike.com'
AVINOX  = 'https://www.avinox-ebike.com'
SHIMANO = 'https://bike.shimano.com'
SRAM    = 'https://www.sram.com'
ROCKSHOX = 'https://www.sram.com/rockshox'
FOX     = 'https://www.ridefox.com'
MAXXIS  = 'https://www.maxxis.com'
SCHWALBE = 'https://www.schwalbe.com'
CONTINENTAL = 'https://www.continental-tires.com'
MAGURA  = 'https://www.magura.com'
TRP     = 'https://www.trpbrakes.com'
DTSWISS = 'https://www.dtswiss.com'
NEWMEN  = 'https://www.newmen-components.com'
AMFLOW  = 'https://www.amflowbikes.com'
SYNCROS = 'https://www.syncros.com'

# ── Per-bike URL patches ──────────────────────────────────────────────────────
# Format: { bike_id: { 'motor.hersteller_url': ..., 'ausstattung.schaltung_url': ..., ... } }
# Only keys that need updating. None = set to null.

PATCHES = {
    # ── 8 fully NOT_SPECIFIED bikes ──────────────────────────────────────────

    'cube-stereo-hybrid-one44-hpc-slx-800-2026': {
        'motor.hersteller_url':           BOSCH,
        'ausstattung.schaltung_url':       SHIMANO,
        'ausstattung.bremsen_url':         SHIMANO,
        'ausstattung.laufraeder_url':      NEWMEN,      # Newmen Performance 30
        'ausstattung.reifen_url':          CONTINENTAL, # Continental Kryptotal
        'federweg.gabel_url':              FOX,
        'federweg.daempfer_url':           FOX,
    },

    'amflow-pl-carbon-2026': {
        'motor.hersteller_url':           AVINOX,      # DJI Avinox M1
        'ausstattung.schaltung_url':       SRAM,
        'ausstattung.bremsen_url':         MAGURA,
        'ausstattung.laufraeder_url':      AMFLOW,      # AMFLOW HMA-30
        'ausstattung.reifen_url':          MAXXIS,
        'federweg.gabel_url':              FOX,
        'federweg.daempfer_url':           FOX,
    },

    'canyon-spectral-on-cf-8-2026': {
        'motor.hersteller_url':           SHIMANO,     # Shimano EP801
        'ausstattung.schaltung_url':       SHIMANO,
        'ausstattung.bremsen_url':         SHIMANO,
        'ausstattung.laufraeder_url':      DTSWISS,    # DT Swiss HX 1700
        'ausstattung.reifen_url':          MAXXIS,
        'federweg.gabel_url':              FOX,
        'federweg.daempfer_url':           FOX,
    },

    'canyon-neuron-on-al-9-2026': {
        'motor.hersteller_url':           BOSCH,
        'ausstattung.schaltung_url':       SRAM,
        'ausstattung.bremsen_url':         SRAM,
        'ausstattung.laufraeder_url':      DTSWISS,    # DT Swiss H1900 LS
        'ausstattung.reifen_url':          SCHWALBE,
        'federweg.gabel_url':              ROCKSHOX,
        'federweg.daempfer_url':           ROCKSHOX,
    },

    'focus-jam2-69-2026': {
        'motor.hersteller_url':           BOSCH,
        'ausstattung.schaltung_url':       SHIMANO,
        'ausstattung.bremsen_url':         TRP,        # TRP DH-R EVO
        'ausstattung.laufraeder_url':      DTSWISS,    # DT Swiss H1900
        'ausstattung.reifen_url':          MAXXIS,
        'federweg.gabel_url':              FOX,
        'federweg.daempfer_url':           FOX,
    },

    'cube-stereo-hybrid-one44-hpc-at-800-2026': {
        'motor.hersteller_url':           BOSCH,
        'ausstattung.schaltung_url':       SHIMANO,
        'ausstattung.bremsen_url':         SHIMANO,
        'ausstattung.laufraeder_url':      NEWMEN,     # Newmen Beskar 30
        'ausstattung.reifen_url':          SCHWALBE,
        'federweg.gabel_url':              FOX,
        'federweg.daempfer_url':           FOX,
    },

    'rose-root-miller-plus-3-2026': {
        'motor.hersteller_url':           BOSCH,
        'ausstattung.schaltung_url':       SHIMANO,
        'ausstattung.bremsen_url':         SHIMANO,
        'ausstattung.laufraeder_url':      None,       # "MX (Mullet)" — kein Markenname
        'ausstattung.reifen_url':          None,       # NOT_SPECIFIED im Original
        'federweg.gabel_url':              ROCKSHOX,
        'federweg.daempfer_url':           ROCKSHOX,
    },

    'scott-patron-st-920-2026': {
        'motor.hersteller_url':           SHIMANO,    # Shimano EP801
        'ausstattung.schaltung_url':       SRAM,
        'ausstattung.bremsen_url':         SRAM,
        'ausstattung.laufraeder_url':      SYNCROS,   # Syncros Revelstoke 2.0
        'ausstattung.reifen_url':          MAXXIS,
        'federweg.gabel_url':              FOX,
        'federweg.daempfer_url':           FOX,
    },

    # ── Bikes with null/missing laufraeder_url where brand is known ──────────

    'unno-mith-pro-2026': {
        'ausstattung.laufraeder_url': DTSWISS,        # DT Swiss HXC 1700 Carbon
    },

    'radon-render-9-0-800-2026': {
        'ausstattung.laufraeder_url': NEWMEN,          # Newmen Performance 30
    },

    'orbea-wild-h10-2026': {
        'ausstattung.laufraeder_url': DTSWISS,         # DT Swiss H-1900 Spline
    },

    # ── Commencal Essential: gabel/daempfer (NOT_SPECIFIED) ─────────────────
    'commencal-meta-power-sx-essential-2026': {
        'federweg.gabel_url':    FOX,                  # Fox 38 Performance
        'federweg.daempfer_url': FOX,                  # Fox Float X Performance
    },

    # ── Canyon ONfly: schaltung/bremsen (null) ───────────────────────────────
    'canyon-spectral-onfly-cf-8-2026': {
        'ausstattung.schaltung_url': SHIMANO,          # Shimano Deore
        'ausstattung.bremsen_url':   SRAM,             # SRAM Code R
    },

    # ── Santa Cruz Heckler: schaltung/bremsen (null) ────────────────────────
    'santa-cruz-heckler-9-mx-2026': {
        'ausstattung.schaltung_url': SRAM,
        'ausstattung.bremsen_url':   SRAM,
    },

    # ── Trek Fuel+ EX: bremsen/reifen (null) ────────────────────────────────
    'trek-fuel-plus-ex-2026': {
        'ausstattung.bremsen_url': SHIMANO,
        'ausstattung.reifen_url':  MAXXIS,
    },
}


def apply_patch(bike: dict, patch: dict) -> int:
    """Apply a patch dict to a bike. Returns count of fields changed."""
    changed = 0
    for dotkey, new_val in patch.items():
        section, field = dotkey.split('.', 1)
        container = bike.get(section)
        if container is None:
            print(f"  SKIP {dotkey}: section '{section}' missing in bike {bike['id']}", file=sys.stderr)
            continue
        old_val = container.get(field, '__MISSING__')
        if old_val == new_val:
            continue
        container[field] = new_val
        changed += 1
        print(f"  {dotkey}: {old_val!r} → {new_val!r}")
    return changed


def main():
    data = DATA_PATH.read_text(encoding='utf-8')
    bikes = json.loads(data)
    index = {b['id']: b for b in bikes}

    total_changed = 0
    for bike_id, patch in PATCHES.items():
        if bike_id not in index:
            print(f"WARNING: bike '{bike_id}' not found in data", file=sys.stderr)
            continue
        print(f"\n{bike_id}:")
        n = apply_patch(index[bike_id], patch)
        total_changed += n
        if n == 0:
            print("  (no changes)")

    print(f"\n✓ Total fields updated: {total_changed}")

    out = json.dumps(bikes, ensure_ascii=False, indent=2)
    DATA_PATH.write_text(out + '\n', encoding='utf-8')
    print(f"✓ Written: {DATA_PATH}")


if __name__ == '__main__':
    main()
