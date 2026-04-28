# SESSION LOG — bikes-martina

Chronologische Aufzeichnung aller Claude Code Sessions.
Neuste Session oben. Format: max 60 Zeilen pro Eintrag.

---

## 2026-04-28 · Bild-Integration und Hero-Refactor (Phase 8)

**Letzter Commit:** `0d3a552` refactor: hero layout full-bleed split, CTAs in text column

**Erledigt:**
- `2527180` Drei Bilder integriert aus public/images/:
  - Hero: hero-bike-mountain.jpg — rechts auf md+, oben auf Mobile
  - Profil-Modal: martina-portrait.jpg — full-bleed Banner im Dialog
  - Compare-Hero: bunker-bikevergleich.jpg — Hintergrund mit bg-ink/60 Overlay
- `0d3a552` Hero-Layout-Refactor: Full-Bleed-Split (-mt-10 -mx-6),
  CTAs in Text-Block integriert, separate CTA-Row entfernt
- `9a30fa4` Mobile Quick-Wins Phase 7: Sidebar Toggle, SpecRow Stack,
  Header Wordmark hidden sm:inline
- `117e506` Martinas Fahrprofil: Texte überarbeitet (Mundart raus,
  Saisonkorrektur, Swiss Typografie)

**Wichtige Erkenntnisse:**
- shadcn/base-ui DialogContent hat internes p-4 Grid-Layout —
  full-bleed Bilder brauchen p-0 + einzigen flex-col Wrapper-Child
  statt negative Margins (überschiessen das Grid)
- `-mt-10 -mx-6` hebt Layout-Padding auf ohne Layout.tsx anzufassen —
  Standard-Pattern für Full-Bleed-Sections in padded Containern
- Bilder mit "eingebrannten" Effekten (Sepia, Compass-Overlay)
  sparen CSS-Layer-Komplexität

**User-Präferenzen aus dieser Session:**
- Hero-Bild rechts, eckiger Kasten reicht — keine diagonale Kante nötig
- CTAs im Text-Block, nicht zentriert separat darunter
- Full-Bleed Modal-Banner, nicht eingerückt

**Offen / Nächste Session:**

🟢 Sichtbar / Wert für Martina:
  - Mobile-Hero: eigene Komposition, anderer Bild-Crop, Hamburger-Menü
  - Compare-Page Mobile-Audit (Card-Layout, Hintergrund-Check)
  - Bewertungs-Kategorien für Spinnendiagramm pflegen
  - Score-Kalibrierung über alle 28 Bikes

🔵 Mobile-Quick-Wins (Pendenz aus Phase 7):
  - Touch-Targets: FilterSidebar-Toggle 36×20px → min 44pt
  - FloatingCompareBar: bottom-Position vs iOS Safari Bottom-Bar
  - Footer Layout auf engen Screens

🔵 Code-Hygiene:
  - SKILL.md erweitern: "Stolperstein 'In einem Zug durchpushen' als
    Plan-First-Bypass-Trigger" dokumentieren
  - logo-bike-kompass.svg nach docs/brand-assets/ verschieben
  - git config --global user.name/user.email setzen
  - #70 reifen_url doppelt genutzt in BikeDetail
  - #71 Komponenten-URLs (OEM, Rose Miller etc.)
  - Schema-Dokumentation, Type-Schärfung, Bilder-Aufräum-Routine

---

## 2026-04-28 · Logo-Integration, Header-Wordmark, Skill-Setup

**Letzter Commit:** `3baed36` docs: add SKILL.md for Claude Code consistency

**Erledigt:**
- `3baed36` SKILL.md erstellt: Konventionen, Tokens, Anti-Patterns,
  Workflow-Spielregeln für künftige Claude Code Sessions
- `202fd2e` + `130bc79` Logo-Integration: bike-tire + compass-star SVG
  als neues MTBIcon — theme-aware (currentColor / var(--color-paper))
- `ec211fd` Wordmark-Personalisierung: "E-MTB-Check" → "Martinas Bike-Kompass"
- `202fd2e` Header-Farben: NavLink + Wordmark text-vermillion → text-asphalt,
  hover:text-vermillion-deep entfernt
- `c9c8ce0` + `9f86bc4` Hero-Copy konkretisiert: "Das richtige E-MTB",
  Section-Trenner "Erst verstehen. Dann entscheiden."
- `926c032` Hero-Reorganisation Phase 6: Primary-CTA, 3 Lern-Stationen,
  Martinas Profil als shadcn Dialog, KI-Note am Seitenende
- `fb73aa8` + `35f91b5` Bug-Fixes: KI-Hinweis, Tile-Icons, CTA-Layout,
  Vermillion-Accents, "Oder erst einlesen"-Trenner

**Wichtige Erkenntnisse aus dieser Session:**
- SVG mit Sub-Path ausserhalb viewBox (`M-186.99...`) überdeckt ganzen
  Header wenn inline verwendet — Sub-Path vor Integration entfernen
- `fill="white"` auf Paper-Hintergrund (#F2EEE7) ist sichtbar —
  immer `fill="var(--color-paper)"` verwenden
- Lange hängende Sessions: Stop + neue Session mit explizitem Auftrag
  ist legitime Recovery, kein Fehler

**User-Präferenzen die diese Session geklärt hat:**
- Logo + Wordmark neutral grau (text-asphalt), nicht vermillion —
  vermillion bleibt Akzent-Farbe, nicht Interface-Chrome
- Kein Color-Change-Hover auf Logo-Link — Cursor-Change reicht
- Copy soll konkret und ehrlich sein, nicht generisch-marketing

**Offen / Nächster Schritt:**
- Mobile/iPhone-Tauglichkeit (eigene Session, Hochformat-fokussiert)
- Bilder integrieren: Hero-Begleitbild + Profil-Modal
  (Mario erstellt KI-Bilder mit Nano Banana, Inspirationsbilder vorhanden)
- Logo eventuell weiter reduzieren falls bei kleinen Grössen zu detailreich

**Aktuelle Pendenzen-Liste:**

🟢 Sichtbar / Wert für Martina:
  - Mobile/iPhone-Tauglichkeit
  - Bilder integrieren (Hero, Profil-Dialog)
  - Bewertungs-Kategorien für Spinnendiagramm pflegen
  - Score-Kalibrierung über alle 28 Bikes
  - Logo-Reduktion bei kleinen Header-Grössen (falls nötig)

🔵 Code-Hygiene / Background:
  - logo-bike-kompass.svg ist untracked (src/assets/) — nach
    docs/brand-assets/ verschieben + committen (eigene Session)
  - git config --global user.name/user.email setzen
    (Committer-Warning bei jedem Commit dieser Session)

---
