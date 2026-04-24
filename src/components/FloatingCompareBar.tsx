import { useNavigate } from 'react-router-dom'
import { ArrowRight, Scale } from 'lucide-react'
import { useCompare } from '@/context/CompareContext'

export default function FloatingCompareBar() {
  const { ids, overflowMsg } = useCompare()
  const navigate = useNavigate()

  const visible = ids.length >= 1
  const ready = ids.length >= 2

  return (
    <>
      {/* Overflow-Toast */}
      <div
        className={`fixed bottom-24 right-6 z-50 transition-all duration-300 ${
          overflowMsg ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
        }`}
      >
        <div className="bg-stone-800 text-white text-xs px-4 py-2.5 rounded-lg shadow-lg max-w-xs">
          {overflowMsg}
        </div>
      </div>

      {/* Floating Bar */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'
        }`}
      >
        {ready ? (
          <button
            onClick={() => navigate(`/vergleich?ids=${ids.join(',')}`)}
            className="flex items-center gap-2.5 bg-terracotta-500 hover:bg-terracotta-600 text-white text-sm font-semibold px-5 py-3 rounded-full shadow-lg transition-colors"
          >
            <Scale size={15} />
            {ids.length} Bikes vergleichen
            <ArrowRight size={14} />
          </button>
        ) : (
          <div className="flex items-center gap-2.5 bg-stone-400 text-white text-sm px-5 py-3 rounded-full shadow-md cursor-default">
            <Scale size={15} />
            1 Bike markiert — wähle mindestens 1 weiteres
          </div>
        )}
      </div>
    </>
  )
}
