interface Props {
  title: string
  children: React.ReactNode
}

export default function SpecCard({ title, children }: Props) {
  return (
    <div className="bg-paper border border-rule rounded-none overflow-hidden">
      <div className="px-6 py-3 border-b border-rule bg-paper-deep">
        <p className="font-mono text-xs tracking-[0.18em] text-concrete uppercase">{title}</p>
      </div>
      <div className="px-6 py-5">{children}</div>
    </div>
  )
}
