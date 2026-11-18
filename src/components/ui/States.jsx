import { AlertTriangle, SearchX } from 'lucide-react'
import { Button, LinkButton } from './Button'

export const Skeleton = ({ className = '' }) => <div className={`animate-pulse bg-stone ${className}`} />

export function CardSkeleton({ list = false }) {
  return (
    <div className={list ? 'flex gap-6' : ''}>
      <Skeleton className={list ? 'h-48 w-64 shrink-0' : 'aspect-[4/3] w-full'} />
      <div className={`flex-1 space-y-3 ${list ? '' : 'pt-4'}`}>
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-9 w-1/3" />
      </div>
    </div>
  )
}

export function GridSkeleton({ count = 6, list = false }) {
  return (
    <div className={list ? 'space-y-5' : 'grid gap-6 sm:grid-cols-2 xl:grid-cols-3'}>
      {Array.from({ length: count }).map((_, i) => <CardSkeleton key={i} list={list} />)}
    </div>
  )
}

export function EmptyState({ title = 'Nothing to show yet', message, actionLabel, onAction, actionTo, icon: Icon = SearchX }) {
  return (
    <div className="border border-dashed border-line bg-white px-6 py-14 text-center">
      <Icon className="mx-auto text-gold-deep" size={34} strokeWidth={1.4} />
      <h3 className="mt-4 text-xl text-forest">{title}</h3>
      {message && <p className="mx-auto mt-2 max-w-md text-sm text-muted">{message}</p>}
      {actionLabel && (
        <div className="mt-6">
          {actionTo ? <LinkButton to={actionTo} variant="primary">{actionLabel}</LinkButton> : <Button onClick={onAction}>{actionLabel}</Button>}
        </div>
      )}
    </div>
  )
}

export function ErrorState({ title = 'Something went wrong', message = 'We could not load this right now. Please try again.', onRetry }) {
  return (
    <div className="border border-[#e6c8c1] bg-[#fbf3f1] px-6 py-12 text-center">
      <AlertTriangle className="mx-auto text-[#b4412f]" size={32} strokeWidth={1.5} />
      <h3 className="mt-4 text-xl text-forest">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted">{message}</p>
      {onRetry && <div className="mt-6"><Button onClick={onRetry} variant="outline">Try again</Button></div>}
    </div>
  )
}
