interface Props {
  title: string
  children: React.ReactNode
}

export default function SpecCard({ title, children }: Props) {
  return (
    <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
      <div className="px-6 py-3 border-b border-stone-100 bg-stone-50">
        <p className="text-xs font-semibold tracking-widest text-stone-400 uppercase">{title}</p>
      </div>
      <div className="px-6 py-5">{children}</div>
    </div>
  )
}
