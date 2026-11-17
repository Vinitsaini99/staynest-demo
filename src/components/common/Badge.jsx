const styles = {
  Approved: 'bg-emerald-50 text-emerald-800 border-emerald-100',
  Pending: 'bg-amber-50 text-amber-800 border-amber-100',
  Rejected: 'bg-rose-50 text-rose-700 border-rose-100',
  Confirmed: 'bg-emerald-50 text-emerald-800 border-emerald-100',
  Cancelled: 'bg-stone-100 text-stone-600 border-stone-200',
  Active: 'bg-emerald-50 text-emerald-800 border-emerald-100',
  Inactive: 'bg-stone-100 text-stone-600 border-stone-200',
  Suspended: 'bg-rose-50 text-rose-700 border-rose-100',
  Paid: 'bg-emerald-50 text-emerald-800 border-emerald-100',
  Overdue: 'bg-rose-50 text-rose-700 border-rose-100',
  Open: 'bg-[#EEF4F1] text-secondary border-[#D7E5DF]',
  Closed: 'bg-stone-100 text-stone-600 border-stone-200',
  Scheduled: 'bg-[#EEF4F1] text-secondary border-[#D7E5DF]',
  Completed: 'bg-emerald-50 text-emerald-800 border-emerald-100',
  Verified: 'bg-accent/15 text-primary border-accent/30',
}

export default function Badge({ children, status }) {
  const key = status || children
  return (
    <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-semibold ${styles[key] || 'bg-stone-50 text-stone-600 border-stone-200'}`}>
      {children || status}
    </span>
  )
}
