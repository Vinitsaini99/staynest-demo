import { useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Grid3x3, List, SlidersHorizontal, X } from 'lucide-react'
import { SITE } from '../../config/site'
import { BUDGETS, AREA_RANGES, getCategory } from '../../data/categories'
import { useAsync } from '../../hooks/useAsync'
import { useSeo } from '../../hooks/useSeo'
import { getProperties } from '../../services/api'
import { PAGE_SIZE, SORTS, activeFilterCount, parseFilters, toParams, FILTER_KEYS } from '../../utils/filters'
import { plural } from '../../utils/format'
import { imgSrc } from '../../utils/image'
import { PageHero } from '../ui/Bits'
import { Button } from '../ui/Button'
import { EmptyState, ErrorState, GridSkeleton } from '../ui/States'
import Modal from '../ui/Modal'
import FilterPanel from './FilterPanel'
import Pagination from './Pagination'
import PropertyCard, { localityName } from './PropertyCard'

function chipLabel(key, f) {
  switch (key) {
    case 'q': return `“${f.q}”`
    case 'category': return f.category.split(',').map((c) => getCategory(c)?.short || c).join(', ')
    case 'locality': return localityName(f.locality)
    case 'bhk': return f.bhk === '4' ? '4+ BHK' : `${f.bhk} BHK`
    case 'budget': return BUDGETS.find((b) => b.id === f.budget)?.label
    case 'minPrice': return `Min ₹${Number(f.minPrice) / 100000} L`
    case 'maxPrice': return `Max ₹${Number(f.maxPrice) / 100000} L`
    case 'area': return AREA_RANGES.find((a) => a.id === f.area)?.label
    case 'verified': return 'Verified'
    default: return f[key]
  }
}

export default function ListingView({ preset, locked = {}, path, crumbs, extra }) {
  const [sp, setSp] = useSearchParams()
  const [drawer, setDrawer] = useState(false)
  const topRef = useRef(null)
  const scope = preset.scope || {}
  const filters = useMemo(() => ({ ...parseFilters(sp), ...locked }), [sp, locked])
  const key = JSON.stringify(filters)

  const { data, loading, error, reload } = useAsync(() => getProperties({ filters, scope }), [key, preset.path])

  const update = (patch, { keepPage = false } = {}) => {
    const next = { ...filters, ...patch }
    if (!keepPage && !('page' in patch)) next.page = 1
    for (const k of Object.keys(locked)) delete next[k]
    setSp(toParams(next), { replace: true })
  }
  const clearAll = () => {
    const next = { ...filters }
    FILTER_KEYS.forEach((k) => { next[k] = k === 'budget' ? 'any' : '' })
    for (const k of Object.keys(locked)) delete next[k]
    setSp(toParams({ ...next, page: 1 }), { replace: true })
  }

  const all = data || []
  const pages = Math.max(1, Math.ceil(all.length / PAGE_SIZE))
  const page = Math.min(filters.page, pages)
  const visible = all.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const count = activeFilterCount({ ...filters, ...Object.fromEntries(Object.keys(locked).map((k) => [k, ''])) })
  const activeKeys = FILTER_KEYS.filter((k) => !(k in locked) && filters[k] !== '' && !(k === 'budget' && filters.budget === 'any'))

  useSeo({
    title: preset.title,
    description: preset.description,
    path: path || preset.path,
    noindex: sp.toString().length > 0 && !('locality' in locked),
    jsonLd: all.length
      ? [
          {
            '@context': 'https://schema.org', '@type': 'ItemList', name: preset.title,
            itemListElement: all.slice(0, 20).map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE.url}/property/${p.slug}`, name: p.title, image: imgSrc(p.images[0], 800) })),
          },
        ]
      : undefined,
  })

  const changePage = (n) => {
    update({ page: n }, { keepPage: true })
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const view = filters.view === 'list' ? 'list' : 'grid'

  return (
    <>
      <PageHero eyebrow={preset.eyebrow} title={preset.h1} intro={preset.description} crumbs={crumbs} />
      {extra}
      <section className="container-x py-10 md:py-14" ref={topRef}>
        <div className="grid gap-10 lg:grid-cols-[290px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-32 max-h-[calc(100vh-9rem)] overflow-y-auto pr-4">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="font-sans text-base font-semibold tracking-normal text-forest">Filters</h2>
                {count > 0 && <button onClick={clearAll} className="text-xs font-semibold text-gold-deep hover:underline">Clear all</button>}
              </div>
              <FilterPanel filters={filters} onChange={update} scope={{ ...scope, ...(locked.segment ? { segment: locked.segment } : {}) }} />
            </div>
          </aside>

          <div>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-muted" aria-live="polite">
                {loading && !data ? 'Loading properties…' : <><strong className="font-semibold text-forest">{plural(all.length, 'property', 'properties')}</strong> found</>}
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="lg:hidden" onClick={() => setDrawer(true)}>
                  <SlidersHorizontal size={15} /> Filters{count > 0 && <span className="ml-1 bg-gold px-1.5 text-forest">{count}</span>}
                </Button>
                <label className="sr-only" htmlFor="sort">Sort by</label>
                <select id="sort" className="field w-auto py-2 pr-8 text-[0.82rem]" value={filters.sort} onChange={(e) => update({ sort: e.target.value })}>
                  {SORTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
                </select>
                <div className="hidden border border-line bg-white sm:flex" role="group" aria-label="Layout">
                  {[['grid', Grid3x3, 'Grid view'], ['list', List, 'List view']].map(([v, Icon, label]) => (
                    <button key={v} onClick={() => update({ view: v }, { keepPage: true })} aria-label={label} aria-pressed={view === v} className={`grid h-9 w-10 place-items-center ${view === v ? 'bg-forest text-ivory' : 'text-forest hover:bg-stone'}`}><Icon size={16} /></button>
                  ))}
                </div>
              </div>
            </div>

            {activeKeys.length > 0 && (
              <div className="mb-5 flex flex-wrap items-center gap-2">
                {activeKeys.map((k) => (
                  <button key={k} onClick={() => update({ [k]: k === 'budget' ? 'any' : '' })} className="inline-flex items-center gap-1.5 border border-forest/20 bg-white px-2.5 py-1 text-xs font-medium text-forest hover:border-forest">
                    {chipLabel(k, filters)} <X size={12} />
                  </button>
                ))}
                <button onClick={clearAll} className="px-2 text-xs font-semibold text-gold-deep hover:underline">Clear filters</button>
              </div>
            )}

            <div className={`transition-opacity ${loading && data ? 'opacity-50' : ''}`}>
              {error ? (
                <ErrorState onRetry={reload} />
              ) : loading && !data ? (
                <GridSkeleton count={6} list={view === 'list'} />
              ) : all.length === 0 ? (
                <EmptyState
                  title="No properties match these filters"
                  message="Try widening your budget, choosing another locality or clearing a few filters. You can also tell us what you are looking for."
                  actionLabel={count > 0 ? 'Clear all filters' : 'Contact us'}
                  onAction={count > 0 ? clearAll : undefined}
                  actionTo={count > 0 ? undefined : '/contact-us'}
                />
              ) : (
                <div className={view === 'list' ? 'space-y-5' : 'grid gap-6 sm:grid-cols-2 xl:grid-cols-3'}>
                  {visible.map((p) => <PropertyCard key={p.id} property={p} view={view} />)}
                </div>
              )}
            </div>
            <Pagination page={page} pages={pages} onChange={changePage} />
          </div>
        </div>
      </section>

      <Modal open={drawer} onClose={() => setDrawer(false)} title="Filters" side>
        <FilterPanel filters={filters} onChange={update} scope={scope} />
        <div className="sticky bottom-0 -mx-6 -mb-6 mt-4 grid grid-cols-2 gap-3 border-t border-line bg-ivory p-4">
          <Button variant="outline" onClick={clearAll}>Clear all</Button>
          <Button onClick={() => setDrawer(false)}>Show {all.length}</Button>
        </div>
      </Modal>
    </>
  )
}