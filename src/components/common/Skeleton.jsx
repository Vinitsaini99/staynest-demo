export default function Skeleton({ className = '' }) {
  return <div className={`animate-pulse rounded-xl bg-border/70 ${className}`} />
}

export function PageSkeleton() {
  return (
    <div className="space-y-4 p-4 md:p-6">
      <Skeleton className="h-8 w-48" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-28" />
        ))}
      </div>
      <Skeleton className="h-72 w-full" />
    </div>
  )
}
