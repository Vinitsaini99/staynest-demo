import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Building2, Home, MapPin, Search, Users, Wallet, LayoutGrid } from 'lucide-react'
import { categories } from '../data/categories'
import { localityNames } from '../data/localities'
import { BUDGET_STEPS, toParams, EMPTY_FILTERS } from '../utils/filters'
import { formatRupees } from '../utils/format'

const TAB_ICON = { flat: Building2, 'independent-house': Home, 'commercial-office': Building2, 'sharing-room': Users }
const TAB_LABEL = { flat: 'Flats', 'independent-house': 'Houses', 'commercial-office': 'Offices', 'sharing-room': 'PG / Sharing' }

// Hero search: pick a type tab, then area + budget + optional keyword.
export default function SearchBar() {
  const nav = useNavigate()
  const [f, setF] = useState({ ...EMPTY_FILTERS })
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    nav(`/rentals?${toParams(f).toString()}`)
  }

  const tabs = [{ slug: '', label: 'All', icon: LayoutGrid }, ...categories.map((c) => ({ slug: c.slug, label: TAB_LABEL[c.slug], icon: TAB_ICON[c.slug] }))]
  const wrap = 'flex items-center gap-2 rounded-xl border-[1.5px] border-line bg-cream px-3 transition-colors focus-within:border-brand'
  const control = 'h-12 w-full min-w-0 bg-transparent text-sm font-semibold text-ink outline-none'

  return (
    <form onSubmit={submit} className="rounded-3xl bg-white p-3 text-ink shadow-lift sm:p-4" role="search" aria-label="Search rentals">
      <div className="no-scrollbar mb-3 flex gap-2 overflow-x-auto" role="tablist" aria-label="Property type">
        {tabs.map(({ slug, label, icon: Icon }) => (
          <button
            key={slug || 'all'}
            type="button"
            role="tab"
            aria-selected={f.category === slug}
            onClick={() => setF((s) => ({ ...s, category: slug }))}
            className="chip shrink-0 !px-4 !py-2"
            data-active={f.category === slug}
          >
            <Icon size={15} /> {label}
          </button>
        ))}
      </div>

      <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1.2fr_auto]">
        <label className={wrap}>
          <MapPin size={18} className="shrink-0 text-saffron-deep" />
          <span className="sr-only">Area</span>
          <select value={f.locality} onChange={set('locality')} className={control}>
            <option value="">Which area? (All Jaipur)</option>
            {localityNames.map((n) => <option key={n}>{n}</option>)}
          </select>
        </label>

        <label className={wrap}>
          <Wallet size={18} className="shrink-0 text-saffron-deep" />
          <span className="sr-only">Maximum rent</span>
          <select value={f.max} onChange={set('max')} className={control}>
            <option value="">Any budget</option>
            {BUDGET_STEPS.map((b) => <option key={b} value={b}>Up to {formatRupees(b)}</option>)}
          </select>
        </label>

        <label className={wrap}>
          <Search size={18} className="shrink-0 text-saffron-deep" />
          <span className="sr-only">Keyword</span>
          <input value={f.q} onChange={set('q')} placeholder="Keyword: metro, parking, boys…" className={control} />
        </label>

        <button type="submit" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-saffron px-8 text-sm font-extrabold text-ink transition-colors hover:bg-amber-400 sm:col-span-2 lg:col-span-1">
          <Search size={18} /> Search
        </button>
      </div>
    </form>
  )
}
