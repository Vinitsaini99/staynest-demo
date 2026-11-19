import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export function SectionHead({ eyebrow, title, text, to, linkLabel = 'View all', center }) {
  return (
    <div className={`mb-6 flex flex-wrap items-end justify-between gap-3 ${center ? 'justify-center text-center' : ''}`}>
      <div className={center ? 'mx-auto max-w-2xl' : ''}>
        {eyebrow && <p className="mb-1 text-xs font-extrabold uppercase tracking-[0.14em] text-saffron-deep">{eyebrow}</p>}
        <h2 className="text-2xl font-extrabold sm:text-3xl">{title}</h2>
        {text && <p className="mt-1.5 text-sm text-muted sm:text-base">{text}</p>}
      </div>
      {to && (
        <Link to={to} className="inline-flex items-center gap-1 text-sm font-bold text-brand hover:text-brand-deep">
          {linkLabel} <ArrowRight size={16} />
        </Link>
      )}
    </div>
  )
}

const TONES = {
  green: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  amber: 'bg-amber-50 text-amber-800 border-amber-200',
  red: 'bg-red-50 text-red-700 border-red-200',
  teal: 'bg-brand-tint text-brand-deep border-brand/20',
  gray: 'bg-sand text-ink-soft border-line',
}

export function Badge({ tone = 'gray', children, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[0.72rem] font-bold ${TONES[tone]} ${className}`}>
      {children}
    </span>
  )
}

export const STATUS_TONE = { approved: 'green', pending: 'amber', rejected: 'red' }
export const STATUS_LABEL = { approved: 'Live', pending: 'Awaiting approval', rejected: 'Rejected' }

export function StatusBadge({ status }) {
  return <Badge tone={STATUS_TONE[status] || 'gray'}>{STATUS_LABEL[status] || status}</Badge>
}

export function Stat({ label, value, tone = 'teal' }) {
  return (
    <div className="card p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-muted">{label}</p>
      <p className={`mt-1 font-display text-3xl font-extrabold ${tone === 'amber' ? 'text-saffron-deep' : 'text-brand-deep'}`}>{value}</p>
    </div>
  )
}
