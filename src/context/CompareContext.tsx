import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const MAX = 3
const LS_KEY = 'compare_ids'

interface CompareCtx {
  ids: string[]
  toggle: (id: string) => void
  syncIds: (incoming: string[]) => void
  clear: () => void
  isIn: (id: string) => boolean
  overflowMsg: string | null
}

const CompareContext = createContext<CompareCtx>(null!)

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(LS_KEY) ?? '[]')
    } catch {
      return []
    }
  })
  const [overflowMsg, setOverflowMsg] = useState<string | null>(null)

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(ids))
  }, [ids])

  useEffect(() => {
    if (!overflowMsg) return
    const t = setTimeout(() => setOverflowMsg(null), 3500)
    return () => clearTimeout(t)
  }, [overflowMsg])

  const toggle = useCallback((id: string) => {
    setIds(prev => {
      if (prev.includes(id)) return prev.filter(i => i !== id)
      if (prev.length >= MAX) {
        setOverflowMsg('Maximal 3 Bikes vergleichbar — entferne erst eines.')
        return prev
      }
      return [...prev, id]
    })
  }, [])

  // Bulk-Sync aus URL-Params (Compare-Seite beim Laden)
  const syncIds = useCallback((incoming: string[]) => {
    setIds(prev => {
      const merged = [...new Set([...prev, ...incoming])].slice(0, MAX)
      return merged
    })
  }, [])

  const clear = useCallback(() => setIds([]), [])
  const isIn = useCallback((id: string) => ids.includes(id), [ids])

  return (
    <CompareContext.Provider value={{ ids, toggle, syncIds, clear, isIn, overflowMsg }}>
      {children}
    </CompareContext.Provider>
  )
}

export const useCompare = () => useContext(CompareContext)
