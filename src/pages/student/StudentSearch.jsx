import { useMemo, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { GitCompare, X } from 'lucide-react'
import PropertyCard from '../../components/property/PropertyCard'
import EmptyState from '../../components/common/EmptyState'
import SiteFooter from '../../components/common/SiteFooter'
import { useApp } from '../../context/AppContext'
import { formatINR, LOCATIONS } from '../../data/mockData'
import { Search } from 'lucide-react'

export default function StudentSearch() {
  const [params, setParams] = useSearchParams()
  const { properties, compare, setCompare } = useApp()
  const [q, setQ] = useState(params.get('q') || '')

  const filters = {
    locality: params.get('locality') || '',
    category: params.get('category') || '',
    type: params.get('type') || '',
    budget: params.get('budget') || '',
    roomType: params.get('roomType') || '',
    sort: params.get('sort') || 'featured',
  }

  const setFilter = (key, value) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next)
  }

  const filtered = useMemo(() => {
    let list = properties.filter((p) => p.status === 'Approved')
    if (q) list = list.filter((p) => `${p.name} ${p.locality} ${p.category}`.toLowerCase().includes(q.toLowerCase()))
    if (filters.locality) list = list.filter((p) => p.locality === filters.locality)
    if (filters.category) list = list.filter((p) => p.category === filters.category)
    if (filters.type) list = list.filter((p) => p.type === filters.type)
    if (filters.budget) list = list.filter((p) => p.priceFrom <= Number(filters.budget))
    if (filters.roomType) list = list.filter((p) => p.rooms.some((r) => r.type === filters.roomType))
    if (filters.sort === 'price-asc') list = [...list].sort((a, b) => a.priceFrom - b.priceFrom)
    if (filters.sort === 'price-desc') list = [...list].sort((a, b) => b.priceFrom - a.priceFrom)
    if (filters.sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating)
    return list
  }, [properties, q, filters.locality, filters.category, filters.type, filters.budget, filters.roomType, filters.sort])

  const compareProps = properties.filter((p) => compare.includes(p.id))

  return (
    <div className="pb-24 md:pb-0">
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:pb-14">
      <h1 className="font-heading text-3xl font-bold md:text-4xl">Explore Stays</h1>
      <p className="mt-2 text-sm text-muted">{filtered.length} verified homes in Jaipur</p>

      <div className="mt-5 flex flex-wrap gap-2">
        <div className="relative min-w-[200px] flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name or locality"
            className="w-full rounded-xl border border-border bg-card py-2.5 pl-9 pr-3 text-sm outline-none focus:border-secondary"
          />
        </div>
        <select className="rounded-xl border border-border bg-card px-3 py-2 text-sm" value={filters.locality} onChange={(e) => setFilter('locality', e.target.value)}>
          <option value="">All localities</option>
          {LOCATIONS.map((l) => <option key={l}>{l}</option>)}
        </select>
        <select className="rounded-xl border border-border bg-card px-3 py-2 text-sm" value={filters.budget} onChange={(e) => setFilter('budget', e.target.value)}>
          <option value="">Any budget</option>
          <option value="5000">Under ₹5,000</option>
          <option value="8000">Under ₹8,000</option>
          <option value="10000">Under ₹10,000</option>
          <option value="15000">Under ₹15,000</option>
        </select>
        <select className="rounded-xl border border-border bg-card px-3 py-2 text-sm" value={filters.roomType} onChange={(e) => setFilter('roomType', e.target.value)}>
          <option value="">Any room</option>
          {['Single Sharing', 'Double Sharing', 'Triple Sharing', 'Dormitory'].map((r) => <option key={r}>{r}</option>)}
        </select>
        <select className="rounded-xl border border-border bg-card px-3 py-2 text-sm" value={filters.sort} onChange={(e) => setFilter('sort', e.target.value)}>
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-8">
          <EmptyState icon={Search} title="No properties found" description="Try adjusting filters or browse all localities." />
        </div>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => <PropertyCard key={p.id} property={p} />)}
        </div>
      )}

      {compare.length > 0 && (
        <div className="fixed bottom-20 left-1/2 z-40 w-[min(100%-1.5rem,720px)] -translate-x-1/2 rounded-2xl border border-border bg-card p-4 shadow-2xl md:bottom-6">
          <div className="mb-3 flex items-center justify-between">
            <p className="inline-flex items-center gap-2 text-sm font-bold"><GitCompare size={16} /> Compare ({compare.length}/3)</p>
            <button type="button" onClick={() => setCompare([])} className="text-xs font-semibold text-muted"><X size={14} className="inline" /> Clear</button>
          </div>
          <div className="grid gap-2 sm:grid-cols-3">
            {compareProps.map((p) => (
              <div key={p.id} className="rounded-xl bg-bg p-3 text-sm">
                <p className="font-semibold">{p.name}</p>
                <p className="text-xs text-muted">{p.locality}</p>
                <p className="mt-1 font-bold text-secondary">{formatINR(p.priceFrom)}</p>
                <p className="text-xs">{p.rating}★ · {p.amenities.length} amenities</p>
                <Link to={`/student/property/${p.id}`} className="mt-2 inline-block text-xs font-semibold text-primary">Open</Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
    <SiteFooter />
    </div>
  )
}
