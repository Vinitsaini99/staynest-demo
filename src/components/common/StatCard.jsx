export default function StatCard({ icon: Icon, label, value, sub, accent = false }) {
  return (
    <div className={`rounded-2xl border p-5 ${accent ? 'border-primary bg-primary text-white' : 'border-border bg-card'}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className={`text-[13px] ${accent ? 'text-white/65' : 'text-muted'}`}>{label}</p>
          <p className="mt-2 font-heading text-[1.7rem] font-bold leading-none tracking-tight">{value}</p>
          {sub && <p className={`mt-2 text-xs ${accent ? 'text-white/55' : 'text-muted'}`}>{sub}</p>}
        </div>
        {Icon && (
          <div className={`rounded-xl p-2.5 ${accent ? 'bg-white/10' : 'bg-bg text-secondary'}`}>
            <Icon size={18} strokeWidth={1.7} />
          </div>
        )}
      </div>
    </div>
  )
}
