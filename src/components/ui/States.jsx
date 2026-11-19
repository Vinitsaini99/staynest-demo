import { AlertTriangle, Inbox, Loader2 } from 'lucide-react'

export function Spinner({ label = 'Loading…' }) {
  return (
    <div className="flex items-center justify-center gap-2 py-16 text-muted" role="status">
      <Loader2 className="animate-spin" size={20} /> {label}
    </div>
  )
}

export function Empty({ title = 'Nothing here yet', text, action, icon: Icon = Inbox }) {
  return (
    <div className="card flex flex-col items-center px-6 py-12 text-center">
      <span className="mb-3 grid h-14 w-14 place-items-center rounded-2xl bg-brand-tint text-brand">
        <Icon size={26} />
      </span>
      <h3 className="text-lg font-bold">{title}</h3>
      {text && <p className="mt-1 max-w-md text-sm text-muted">{text}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}

export function ErrorBox({ error, onRetry }) {
  return (
    <div className="card flex flex-col items-center px-6 py-10 text-center">
      <AlertTriangle className="mb-2 text-red-600" size={28} />
      <p className="font-bold">Something went wrong</p>
      <p className="mt-1 text-sm text-muted">{error?.message || 'Please try again.'}</p>
      {onRetry && (
        <button type="button" onClick={onRetry} className="mt-4 rounded-lg bg-ink px-4 py-2 text-sm font-bold text-white">
          Try again
        </button>
      )}
    </div>
  )
}

export function CardSkeleton({ count = 4 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card animate-pulse overflow-hidden">
          <div className="aspect-[4/3] bg-line/70" />
          <div className="space-y-3 p-4">
            <div className="h-4 w-3/4 rounded bg-line/70" />
            <div className="h-3 w-1/2 rounded bg-line/70" />
            <div className="h-5 w-1/3 rounded bg-line/70" />
          </div>
        </div>
      ))}
    </>
  )
}
