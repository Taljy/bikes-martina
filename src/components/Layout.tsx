import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import FloatingCompareBar from '@/components/FloatingCompareBar'
import MTBIcon from '@/components/MTBIcon'

const WISSEN_ITEMS = [
  { to: '/wissen', label: 'Übersicht', end: true },
  { to: '/wissen/trail-vs-enduro', label: 'Trail vs. Enduro' },
  { to: '/wissen/motoren', label: 'Motoren' },
  { to: '/wissen/neuheiten-2026', label: 'Neuheiten 2026' },
]

const TOP_LINKS = [
  { to: '/', label: 'Start', end: true },
  { to: '/bikes', label: 'Bikes' },
  { to: '/vergleich', label: 'Vergleich' },
]

export default function Layout() {
  const location = useLocation()
  const wissenActive = location.pathname.startsWith('/wissen')

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-paper border-b border-rule sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2.5 text-asphalt">
            <MTBIcon className="h-8 w-8" />
            <span className="hidden sm:inline font-display text-xl tracking-[0.04em] text-asphalt">Martinas Bike-Kompass</span>
          </NavLink>

          <nav className="flex items-center gap-1">
            {TOP_LINKS.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `px-2.5 py-1.5 rounded-sm text-sm font-medium transition-colors sm:px-3.5 ${
                    isActive
                      ? 'bg-paper-deep text-vermillion'
                      : 'text-asphalt hover:text-ink hover:bg-paper-deep'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}

            {/* Wissen Dropdown */}
            <div className="relative group">
              <NavLink
                to="/wissen"
                className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-sm text-sm font-medium transition-colors sm:px-3.5 ${
                  wissenActive
                    ? 'bg-paper-deep text-vermillion'
                    : 'text-asphalt hover:text-ink hover:bg-paper-deep'
                }`}
              >
                Wissen
                <ChevronDown size={13} className="opacity-60 group-hover:rotate-180 transition-transform duration-150" />
              </NavLink>

              {/* Invisible bridge to prevent gap between button and panel */}
              <div className="absolute top-full left-0 w-full h-1.5" />

              <div className="absolute top-[calc(100%+6px)] left-0 w-44 bg-paper border border-rule rounded-none shadow-sm overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150">
                {WISSEN_ITEMS.map(({ to, label, end }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={end}
                    className={({ isActive }) =>
                      `block px-4 py-2.5 text-sm transition-colors ${
                        isActive
                          ? 'bg-paper-deep text-vermillion font-medium'
                          : 'text-ink-soft hover:bg-paper-deep hover:text-ink'
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-10">
        <Outlet />
      </main>

      <FloatingCompareBar />

      <footer className="border-t border-rule bg-paper mt-auto">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between text-sm text-concrete">
          <span>E-MTB-Check — Studio Da Rugna, Baden AG</span>
          <div className="flex items-center gap-4">
            <span>2026</span>
            <NavLink to="/impressum" className="hover:text-vermillion transition-colors">
              Impressum
            </NavLink>
          </div>
        </div>
      </footer>
    </div>
  )
}
