# bikes-martina — Skill für Claude Code

Dieses Dokument beschreibt Konventionen, Tokens und Spielregeln für
Claude Code Sessions im Projekt bikes-martina. Vor jeder Session lesen.

---

## Projekt-Identität

E-MTB-Vergleichs-Tool für Martina — kein generisches Produkt, sondern
ein persönliches Werkzeug von Mario (Studio Da Rugna, Baden AG). Die
App hilft einer einzelnen Userin (Martina) beim Kaufentscheid für ein
E-Mountainbike 2026. Keine Multi-Tenant-Logik, kein Auth, keine
generalisierten Features.

Public URL: bikes.studio-darugna.ch  
Repo: github.com/Taljy/bikes-martina  
Deploy: Vercel Auto-Deploy on push to main

---

## Tech-Stack

- Vite + React 18 + TypeScript
- Tailwind v4 — kein `tailwind.config.js`, alle Tokens in `@theme`
  innerhalb von `src/index.css`
- shadcn/ui — `--brand` statt `--accent` (wegen Konflikt mit DREK-System)
- Fonts: `@fontsource-variable/inter` (body), Bebas Neue via Google Fonts
  (display), IBM Plex Mono via Google Fonts (utility/mono)
- React Router v6 für Seitennavigation
- Recharts für Radar-Diagramme

---

## DREK-Designsystem (Hell-Modus)

Verhältnis: 70% Paper · 20% Ink · 10% Vermillion

**Farb-Tokens:**

| Token           | Hex       | Verwendung                        |
|-----------------|-----------|-----------------------------------|
| paper           | #F2EEE7   | Haupt-Hintergrund                 |
| paper-deep      | #E8E2D9   | Erhöhte Flächen, aktive Nav       |
| ink             | #1A1715   | Überschriften, primärer Text      |
| ink-soft        | #3D3835   | Körpertext                        |
| asphalt         | #595959   | Sekundärer Text, Icons neutral    |
| concrete        | #8A8580   | Placeholder, deaktiviert          |
| rule            | #C9C2BB   | Borders, Trennlinien              |
| vermillion      | #C5382C   | Akzent, aktive States, CTAs       |
| vermillion-deep | #A52A1F   | Hover auf Vermillion-Elementen    |

**Typografie:**

- `font-display` → Bebas Neue, ALL CAPS, letter-spacing 0.04em
- `font-mono` → IBM Plex Mono, Hilfstexte, Labels
- Body → Inter Variable

**Form:**

- Sharp corners sind Default — `rounded-none` überall
- `rounded-sm` (2px) ist Maximum, nur für Cards und Chips
- Keine Schatten (`shadow-*` verboten)
- Hairline borders: `border border-rule`

---

## Anti-Patterns — NICHT verwenden

- `terracotta-*` — entfernt, durch `vermillion-*` ersetzt
- `stone-*` — entfernt, durch `ink` / `asphalt` / `concrete` ersetzt
- `rounded-full`, `rounded-xl`, `rounded-lg` — zu weich für DREK
- `white` / `black` hardcoded — stattdessen `paper` / `ink`
- `text-vermillion` auf Logo/Icon — korrekt ist `text-asphalt`
- `fill="white"` in SVGs auf Paper-Hintergrund — stattdessen `fill="var(--color-paper)"`
- `hover:text-vermillion-deep` auf Logo-NavLink — kein Hover gewünscht
- shadcn-Tokens `--accent`, `--background` — NICHT umbenennen oder
  überschreiben, werden von shadcn intern gebraucht

---

## Tailwind v4 Spezifika

Tailwind v4 erzeugt Preflight-Resets die globale h1–h4-Styles
überschreiben, sofern diese nicht in `@layer base` definiert sind.
Alle globalen Heading-Defaults **müssen** in `@layer base {}` stehen.

Die Klasse `.font-display` hat eigene CSS-Regeln in `@layer utilities`
(text-transform: uppercase, letter-spacing, line-height) und ist
nicht identisch mit `font-family: Bebas Neue`. Immer die Klasse
verwenden, nie direkt `font-family` setzen.

`@theme`-Tokens werden automatisch zu Tailwind-Klassen: `bg-paper`,
`text-vermillion`, `border-rule` etc. Keine zusätzliche Config nötig.

---

## Workflow-Spielregeln

**Plan-First:** Vor jedem Edit zuerst Plan oder Diff zeigen, auf
Marios OK warten. Kein auto-decide.

**Build-Fehler:** Bei rotem Build maximal 1 Fix-Versuch, dann revert.
Mario entscheidet über weiteres Vorgehen — nicht eigenständig debuggen.

**TypeScript-Fehler:** STOP. Mario entscheidet, ob der Typ korrigiert
oder die Änderung rückgängig gemacht wird.

**Definition of Done:** Eine Aufgabe gilt erst als fertig, wenn der
Commit gepusht ist. Lokale Änderungen zählen nicht.

**Timeboxing:** 60–90 Minuten pro Iteration, dann Stand committen
(auch wenn unfertig). Kein "noch kurz fertig machen".

**Token-Änderungen:** Bei mehr als 30 betroffenen Stellen: Aufteilen
in Sub-Iterationen (a/b/c), jede separat committen.

---

## Schreibstil

- Schweizer Hochdeutsch — Standard-Hochdeutsch mit Schweizer
  Schreibweise: `ss` statt `ß` (z.B. 'grösste', 'Strasse')
- Kein Dialekt/Mundart — App ist hochdeutsch (Mundart-Begriffe wie
  'Rahmegröössi' wurden bewusst durch 'Rahmengrösse' etc. ersetzt)
- Em-Dash (—) U+2014 statt Bindestrich bei Einschüben
- Mittelpunkt (·) U+00B7 für Trennerlisten
- Mario duzen
- Tonfall: direkt, sachlich — sarkastischer Humor in Massen erlaubt
- Claude bleibt Claude (nicht umbenennen)

---

## Commit-Konventionen

Format: `type: kurze Aussage was geändert wurde`

Types: `feat:` · `fix:` · `refactor:` · `chore:` · `docs:`

Body optional, aber bei nicht-trivialen Änderungen: Bullet-Punkte
mit Details, durch Leerzeile vom Subject getrennt.

Englisch oder Deutsch — beides ok, nicht mixen pro Commit.

---

## Bekannte Stolpersteine

- **"Committed aber nicht gepusht"** — lokaler Optimismus. Aufgabe
  erst done wenn `git push` erfolgreich.
- **"Daten-Vollständigkeit vor Type-Schärfung"** — JSON-Schema-
  Migrationen erst alle Daten anpassen, dann Types verschärfen.
  Nicht umgekehrt (gelernt in Migration #64).
- **"Build-Check vor jedem Push"** — auch bei reinen Daten- oder
  Docs-Änderungen. Vercel schlägt fehl wenn TypeScript meckert.
- **"Token-Konflikt: Rename statt Override"** — wenn externe Libs
  (shadcn) einen Token-Namen belegen, eigenen umbenennen.
  Beispiel: `--accent` → `--brand` im DREK-System.
- **"SVG-Fill auf Paper-Hintergrund"** — `fill="white"` sieht auf
  #F2EEE7 nicht aus wie "kein Hintergrund". `fill="var(--color-paper)"`
  verwenden.

---

## Naming-Konventionen

- Files/Assets: `kebab-case` (logo-bike-kompass.svg, hero.png)
- Components: `PascalCase` (BikeCard.tsx, MTBIcon.tsx)
- Pages: PascalCase, Suffix-frei (Home.tsx, BikeList.tsx)
- Hooks/Lib: `camelCase` (format.ts, utils.ts)

---

## Produktive Pfade

    src/
      assets/          SVG-Logos, Bilder
      components/      Custom React Components
      components/ui/   shadcn-generierte Komponenten (nicht manuell editieren)
      context/         React Context Provider
      data/            JSON-Datenquellen (bikes.json, motoren.json …)
      lib/             Utility-Funktionen (format.ts, utils.ts)
      pages/           Route-Komponenten (eine pro URL)
      types/           TypeScript-Interfaces
      index.css        Globale Styles, @theme-Tokens, @layer base/utilities
