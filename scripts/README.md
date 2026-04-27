# scripts/

Hilfsskripte für Datenpflege und einmalige Migrationen auf `src/data/bikes.json`.

## Struktur

### `bike-updates/`
Wiederkehrende Datencheck-Skripte — eines pro Bike, aus den manuellen
Datencheck-Sessions. Jedes Skript schreibt einen vollständigen Bike-Eintrag
in `bikes.json` (find by ID, replace in-place) und verifiziert das Schema
mit Assertions am Ende.

Namenskonvention: `bike-{nr}-{hersteller}-{modell}-datencheck.py`

### `migrations/`
Einmalige Datentransformationen, chronologisch geordnet. Werden einmal
ausgeführt, dann nie wieder. Als Audit-Trail behalten.

Namenskonvention: `{YYYY-MM-DD}-{beschreibung}.py`

## Ausführen

```bash
# Immer aus dem Repo-Root ausführen (Pfade sind relativ zu src/data/bikes.json)
cd /pfad/zum/repo
python3 scripts/bike-updates/bike-23-specialized-levo-4-datencheck.py
```
