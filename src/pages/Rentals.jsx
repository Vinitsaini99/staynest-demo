import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Filter, SearchX, X } from 'lucide-react'
import FilterPanel from '../components/FilterPanel'
import PropertyCard from '../components/PropertyCard'
import Pagination from '../components/Pagination'
import { CardSkeleton, Empty, ErrorBox } from '../components/ui/States'
import Button from '../components/ui/Button'
import { useAsync } from '../hooks/useAsync'
import { useSeo } from '../hooks/useSeo'
import { searchProperties } from '../services/api'
import { EMPTY_FILTERS, SORTS, activeFilterCount, parseFilters, toParams } from '../utils/filters'
import { categoryBySlug } from '../data/categories'

export default function Rentals() {
  const [sp, setSp] = useSearchParams()
  const filters = useMemo(() => parseFilters(sp), [sp])
  const [drawer, setDrawer] = useState(false)
  const [q, setQ] = useState(filters.q)

  useEffect(() => setQ(filters.q), [filters.q])

  const cat = categoryBySlug[filters.category]
  const heading = `${cat ? cat.label : 'Rentals'} ${filters.locality ? `in ${filters.locality}, ` : 'in '}Jaipur`.replace(', Jaipur', ', Jaipur')
  useSeo({
    title: heading,
    description: `Browse ${cat ? cat.label.toLowerCase() : 'flats, houses, offices and sharing rooms'} for rent${filters.locality ? ` in ${filters.locality}` : ' in Jaipur'}. Filter by budget, BHK and furnishing.`,
    path: '/rentals',
    noindex: sp.toString().length > 0 && !!(filters.q || filters.page > 1),
  })

  const key = sp.toString()
  const { data, loading, error, reload } = useAsync(() => searchProperties(filters), [key])

  const update = (next) => {
    setSp(toParams(next), { replace: false })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const reset = () => update({ ...EMPTY_FILTERS, sort: filters.sort, q: filters.q })
  const count = activeFilterCount(filters)

  return (
    <div className="container-x py-8">
      <nav className="mb-2 text-xs font-semibold text-muted" aria-label="Breadcrumb">Home / Rentals{cat ? ` / ${cat.label}` : ''}</nav>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold">{heading}</h1>
          <p className="mt-1 text-sm text-muted" aria-live="polite">{loading ? 'Searching…' : `${data?.total ?? 0} properties found`}</p>
        </div>
        <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              update({ ...filters, q, page: 1 })
            }}
            className="flex-1 sm:w-64 sm:flex-none"
          >
            <input className="field !py-2.5" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search keyword…" aria-label="Search keyword" />
          </form>
          <select className="field !w-auto !py-2.5" aria-label="Sort" value={filters.sort} onChange={(e) => update({ ...filters, sort: e.target.value, page: 1 })}>
            {SORTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
          <Button variant="outline" className="lg:hidden" onClick={() => setDrawer(true)}>
            <Filter size={16} /> Filters{count > 0 && ` (${count})`}
          </Button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[19rem_1fr]">
        <aside className="card sticky top-28 hidden h-fit p-5 lg:block">
          <FilterPanel filters={filters} onChange={update} onReset={reset} />
        </aside>

        <div>
          {error ? (
            <ErrorBox error={error} onRetry={reload} />
          ) : loading ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"><CardSkeleton count={6} /></div>
          ) : data.items.length === 0 ? (
            <Empty icon={SearchX} title="No properties match these filters" text="Try widening your budget, removing a filter or picking another locality." action={<Button onClick={reset}>Clear filters</Button>} />
          ) : (
            <>
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {data.items.map((p) => <PropertyCard key={p.id} p={p} />)}
              </div>
              <Pagination page={data.page} pages={data.pages} onChange={(page) => update({ ...filters, page })} />
            </>
          )}
        </div>
      </div>

      {drawer && (
        <div className="fixed inset-0 z-[90] lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
          <div className="absolute inset-0 bg-ink/60" onClick={() => setDrawer(false)} />
          <div className="absolute inset-y-0 right-0 w-[88%] max-w-sm overflow-y-auto bg-white p-5 shadow-lift">
            <button type="button" onClick={() => setDrawer(false)} aria-label="Close filters" className="absolute right-3 top-3 rounded-lg p-2 hover:bg-sand"><X size={20} /></button>
            <FilterPanel filters={filters} onChange={update} onReset={reset} />
            <Button className="mt-6 w-full" size="lg" onClick={() => setDrawer(false)}>Show {data?.total ?? ''} results</Button>
          </div>
        </div>
      )}
    </div>
  )
}
