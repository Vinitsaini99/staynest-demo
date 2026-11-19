import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { categories } from '../data/categories'
import { localityNames } from '../data/localities'
import { BUDGET_STEPS, toParams, EMPTY_FILTERS } from '../utils/filters'
import { formatRupees } from '../utils/format'

// Hero search: type + locality + max budget + keyword.
export default function SearchBar() {
  const nav = useNavigate()
  const [f, setF] = useState({ ...EMPTY_FILTERS })
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    nav(`/rentals?${toParams(f).toString()}`)
  }

  const label = 'mb-1 block text-[0.7rem] font-extrabold uppercase tracking-wider text-muted'
  const input = 'w-full rounded-xl border-[1.5px] border-line bg-cream px-3 py-2.5 text-sm font-semibold outline-none focus:border-brand'

  return (
    <form onSubmit={submit} className="card grid gap-3 p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-[1fr_1fr_1fr_1.3fr_auto] lg:items-end" role="search">
      <div>
        <label className={label}>Looking for</label>
        <select value={f.category} onChange={set('category')} className={input}>
          <option value="">Any type</option>
          {categories.map((c) => <option key={c.slug} value={c.slug}>{c.label}</option>)}
        </select>
      </div>
      <div>
        <label className={label}>Locality</label>
        <select value={f.locality} onChange={set('locality')} className={input}>
          <option value="">All of Jaipur</option>
          {localityNames.map((n) => <option key={n}>{n}</option>)}
        </select>
      </div>
      <div>
        <label className={label}>Max rent</label>
        <select value={f.max} onChange={set('max')} className={input}>
          <option value="">No limit</option>
          {BUDGET_STEPS.map((b) => <option key={b} value={b}>Up to {formatRupees(b)}</option>)}
        </select>
      </div>
      <div>
        <label className={label}>Keyword</label>
        <input value={f.q} onChange={set('q')} placeholder="e.g. parking, metro, garden" className={input} />
      </div>
      <button type="submit" className="inline-flex h-[2.7rem] items-center justify-center gap-2 rounded-xl bg-saffron px-6 text-sm font-extrabold text-ink transition-colors hover:bg-amber-400 sm:col-span-2 lg:col-span-1">
        <Search size={18} /> Search
      </button>
    </form>
  )
}
