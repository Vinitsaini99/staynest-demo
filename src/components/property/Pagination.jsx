import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Pagination({ page, pages, onChange }) {
  if (pages <= 1) return null
  const nums = []
  for (let i = 1; i <= pages; i++) {
    if (i === 1 || i === pages || Math.abs(i - page) <= 1) nums.push(i)
    else if (nums[nums.length - 1] !== '…') nums.push('…')
  }
  const btn = 'grid h-10 min-w-10 place-items-center border px-2 text-sm font-semibold transition-colors'
  return (
    <nav className="mt-10 flex items-center justify-center gap-2" aria-label="Pagination">
      <button className={`${btn} border-line bg-white text-forest hover:border-forest disabled:opacity-40`} disabled={page === 1} onClick={() => onChange(page - 1)} aria-label="Previous page"><ChevronLeft size={16} /></button>
      {nums.map((n, i) =>
        n === '…' ? <span key={`e${i}`} className="px-1 text-muted">…</span> : (
          <button key={n} onClick={() => onChange(n)} aria-current={n === page ? 'page' : undefined} className={`${btn} ${n === page ? 'border-forest bg-forest text-ivory' : 'border-line bg-white text-forest hover:border-forest'}`}>{n}</button>
        ),
      )}
      <button className={`${btn} border-line bg-white text-forest hover:border-forest disabled:opacity-40`} disabled={page === pages} onClick={() => onChange(page + 1)} aria-label="Next page"><ChevronRight size={16} /></button>
    </nav>
  )
}
