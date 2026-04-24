import { Outlet, NavLink } from 'react-router-dom'
import { Bike } from 'lucide-react'
import FloatingCompareBar from '@/components/FloatingCompareBar'

const navItems = [
  { to: '/', label: 'Start', end: true },
  { to: '/bikes', label: 'Alle Bikes' },
  { to: '/vergleich', label: 'Vergleich' },
  { to: '/wissen', label: 'Wissen' },
  { to: '/neuheiten', label: 'Neuheiten' },
]

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-stone-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2.5 text-terracotta-600 hover:text-terracotta-700">
            <Bike size={22} strokeWidth={1.75} />
            <span className="font-semibold tracking-tight text-stone-800">Bikes für Martina</span>
          </NavLink>
          <nav className="flex items-center gap-1">
            {navItems.map(({ to, label, end }) => (
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
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-10">
        <Outlet />
      </main>

      <FloatingCompareBar />

      <footer className="border-t border-stone-200 bg-white mt-auto">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between text-sm text-stone-400">
          <span>Bikes für Martina — Studio Da Rugna, Baden AG</span>
          <span>2026</span>
        </div>
      </footer>
    </div>
  )
}
