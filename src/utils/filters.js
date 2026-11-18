import { BUDGETS, AREA_RANGES } from '../data/categories'
import { locations } from '../data/locations'

export const PAGE_SIZE = 9

export const SORTS = [
  { id: 'latest', label: 'Newest first' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
]

export const DEFAULT_FILTERS = {
  q: '', segment: '', category: '', locality: '', bhk: '', budget: 'any', minPrice: '', maxPrice: '',
  area: '', furnishing: '', status: '', verified: '', sort: 'latest', view: 'grid', page: 1,
}

export function parseFilters(sp) {
  const f = { ...DEFAULT_FILTERS }
  for (const key of Object.keys(DEFAULT_FILTERS)) {
    const v = sp.get(key)
    if (v !== null && v !== '') f[key] = key === 'page' ? Math.max(1, parseInt(v, 10) || 1) : v
  }
  return f
}

// Serialise to URL params, dropping defaults.
export function toParams(f) {
  const p = new URLSearchParams()
  for (const key of Object.keys(DEFAULT_FILTERS)) {
    const v = f[key]
    if (v === '' || v == null || v === DEFAULT_FILTERS[key]) continue
    p.set(key, String(v))
  }
  return p
}

export const FILTER_KEYS = ['q', 'category', 'locality', 'bhk', 'budget', 'minPrice', 'maxPrice', 'area', 'furnishing', 'status', 'verified']

export function activeFilterCount(f) {
  return FILTER_KEYS.filter((k) => f[k] !== '' && f[k] !== DEFAULT_FILTERS[k]).length
}

function priceBounds(f) {
  let min = f.minPrice !== '' ? Number(f.minPrice) : null
  let max = f.maxPrice !== '' ? Number(f.maxPrice) : null
  const b = BUDGETS.find((x) => x.id === f.budget)
  if (b && b.id !== 'any') {
    min = min ?? b.min
    max = max ?? b.max
  }
  return { min, max }
}

export function applyFilters(list, f, scope = {}) {
  const { min, max } = priceBounds(f)
  const area = AREA_RANGES.find((a) => a.id === f.area)
  const cats = f.category ? f.category.split(',') : null
  const q = f.q.trim().toLowerCase()
  const localityName = (slug) => locations.find((l) => l.slug === slug)?.name.toLowerCase() || ''

  const out = list.filter((p) => {
    if (scope.segment && p.segment !== scope.segment) return false
    if (scope.categories && !scope.categories.includes(p.category)) return false
    if (f.segment && p.segment !== f.segment) return false
    if (cats && !cats.includes(p.category)) return false
    if (f.locality && p.locality !== f.locality) return false
    if (f.bhk) {
      const n = Number(f.bhk)
      if (n >= 4 ? p.bhk < 4 : p.bhk !== n) return false
    }
    if (min != null && p.price < min) return false
    if (max != null && p.price > max) return false
    if (area) {
      if (p.areaSqft < area.min) return false
      if (area.max != null && p.areaSqft > area.max) return false
    }
    if (f.furnishing && p.furnishing !== f.furnishing) return false
    if (f.status && p.status !== f.status) return false
    if (f.verified && !p.verified) return false
    if (q) {
      const hay = `${p.title} ${p.address} ${p.propertyType} ${localityName(p.locality)} ${p.description}`.toLowerCase()
      if (!q.split(/\s+/).every((w) => hay.includes(w))) return false
    }
    return true
  })

  const sorters = {
    latest: (a, b) => new Date(b.listedAt) - new Date(a.listedAt),
    'price-asc': (a, b) => a.price - b.price,
    'price-desc': (a, b) => b.price - a.price,
  }
  return out.sort(sorters[f.sort] || sorters.latest)
}
