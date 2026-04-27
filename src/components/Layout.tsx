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
      <header className="bg-white border-b border-stone-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2.5 text-terracotta-600 hover:text-terracotta-700">
            <MTBIcon className="h-8 w-8" />
            <span className="font-semibold tracking-tight text-stone-800">E-MTB-Check</span>
          </NavLink>

          <nav className="flex items-center gap-1">
            {TOP_LINKS.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `px-3.5 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-terracotta-50 text-terracotta-700'
                      : 'text-stone-500 hover:text-stone-800 hover:bg-stone-100'
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
                className={`inline-flex items-center gap-1 px-3.5 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  wissenActive
                    ? 'bg-terracotta-50 text-terracotta-700'
                    : 'text-stone-500 hover:text-stone-800 hover:bg-stone-100'
                }`}
              >
                Wissen
                <ChevronDown size={13} className="opacity-60 group-hover:rotate-180 transition-transform duration-150" />
              </NavLink>

              {/* Invisible bridge to prevent gap between button and panel */}
              <div className="absolute top-full left-0 w-full h-1.5" />

              <div className="absolute top-[calc(100%+6px)] left-0 w-44 bg-white border border-stone-200 rounded-xl shadow-md overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150">
                {WISSEN_ITEMS.map(({ to, label, end }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={end}
                    className={({ isActive }) =>
                      `block px-4 py-2.5 text-sm transition-colors ${
                        isActive
                          ? 'bg-terracotta-50 text-terracotta-700 font-medium'
                          : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
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

      <footer className="border-t border-stone-200 bg-white mt-auto">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between text-sm text-stone-400">
          <span>E-MTB-Check — Studio Da Rugna, Baden AG</span>
          <div className="flex items-center gap-4">
            <span>2026</span>
            <NavLink to="/impressum" className="hover:text-terracotta-500 transition-colors">
              Impressum
            </NavLink>
          </div>
        </div>
      </footer>
    </div>
  )
}
