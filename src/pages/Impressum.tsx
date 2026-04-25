import { Link } from 'react-router-dom'

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold tracking-widest text-terracotta-500 uppercase">{label}</p>
      <div className="text-sm text-stone-600 leading-relaxed space-y-1">{children}</div>
    </div>
  )
}

export default function Impressum() {
  return (
    <div className="max-w-2xl mx-auto space-y-12 pt-2">

      {/* Breadcrumb */}
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm text-stone-400 hover:text-terracotta-600 transition-colors"
      >
        ← Zurück zur Startseite
      </Link>

      {/* Impressum */}
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-stone-900 mb-1">Impressum</h1>
          <p className="text-sm text-stone-400">Angaben gemäss Art. 3 UWG</p>
        </div>

        <Section label="Betreiber">
          <p>Studio Da Rugna</p>
          <p>Mario Da Rugna</p>
          <p>Stockmattstrasse 66</p>
          <p>5400 Baden</p>
          <p>Schweiz</p>
        </Section>

        <Section label="Kontakt">
          <p>Über Social Media (Links folgen)</p>
        </Section>

        <Section label="Hinweis">
          <p>Dieses Tool ist ein privates, nicht-kommerzielles Projekt.</p>
        </Section>
      </div>

      {/* Divider */}
      <div className="border-t border-stone-100" />

      {/* Datenschutz */}
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-stone-900 mb-1">Datenschutzerklärung</h2>
        </div>

        <Section label="Hosting">
          <p>
            Diese Website wird über Vercel Inc., San Francisco, USA gehostet.
            Beim Abruf der Seite werden serverseitig technische Verbindungsdaten
            (IP-Adresse, Zeitstempel, Browser-Typ) temporär gespeichert.
            Rechtsgrundlage: berechtigtes Interesse (Art. 31 DSG).
          </p>
        </Section>

        <Section label="Cookies / Tracking">
          <p>
            Es werden keine Cookies gesetzt. Es findet kein Tracking statt.
            Es werden keine Analyse- oder Werbe-Tools verwendet.
          </p>
        </Section>

        <Section label="Daten Dritter">
          <p>
            Das Tool enthält Produktinformationen und Bilder zu E-Mountainbikes.
            Diese dienen ausschliesslich privaten Informationszwecken.
          </p>
        </Section>

        <Section label="Datenschutzanfragen">
          <p>Über Social Media (Links folgen)</p>
        </Section>

        <p className="text-xs text-stone-400">Stand: April 2026</p>
      </div>

    </div>
  )
}
