import { ChevronLeft, ChevronRight } from 'lucide-react'

function range(page, pages) {
  const set = new Set([1, pages, page, page - 1, page + 1])
  const nums = [...set].filter((n) => n >= 1 && n <= pages).sort((a, b) => a - b)
  const out = []
  nums.forEach((n, i) => {
    if (i && n - nums[i - 1] > 1) out.push('…')
    out.push(n)
  })
  return out
}

export default function Pagination({ page, pages, onChange }) {
  if (pages <= 1) return null
  const btn = 'grid h-10 min-w-10 place-items-center rounded-xl border-[1.5px] border-line bg-white px-2 text-sm font-bold transition-colors hover:border-brand hover:text-brand disabled:opacity-40 disabled:hover:border-line disabled:hover:text-inherit'
  return (
    <nav aria-label="Pagination" className="mt-8 flex flex-wrap items-center justify-center gap-2">
      <button type="button" className={btn} disabled={page <= 1} onClick={() => onChange(page - 1)} aria-label="Previous page"><ChevronLeft size={18} /></button>
      {range(page, pages).map((n, i) =>
        n === '…' ? (
          <span key={`d${i}`} className="px-1 text-muted">…</span>
        ) : (
          <button key={n} type="button" onClick={() => onChange(n)} aria-current={n === page ? 'page' : undefined} className={`${btn} ${n === page ? '!border-ink !bg-ink !text-white' : ''}`}>
            {n}
          </button>
        ),
      )}
      <button type="button" className={btn} disabled={page >= pages} onClick={() => onChange(page + 1)} aria-label="Next page"><ChevronRight size={18} /></button>
    </nav>
  )
}
