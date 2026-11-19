export const PAGE_SIZE = 12

export const SORTS = [
  { value: 'new', label: 'Newest first' },
  { value: 'low', label: 'Rent: low to high' },
  { value: 'high', label: 'Rent: high to low' },
  { value: 'area', label: 'Largest area' },
]

export const BUDGET_STEPS = [3000, 5000, 8000, 12000, 18000, 25000, 35000, 50000, 75000, 100000]

export const EMPTY_FILTERS = {
  q: '', category: '', locality: '', min: '', max: '', bhk: '', furnishing: '', verified: false, sort: 'new', page: 1,
}

export function parseFilters(sp) {
  const g = (k) => sp.get(k) || ''
  return {
    q: g('q'),
    category: g('category'),
    locality: g('locality'),
    min: g('min'),
    max: g('max'),
    bhk: g('bhk'),
    furnishing: g('furnishing'),
    verified: g('verified') === '1',
    sort: g('sort') || 'new',
    page: Math.max(1, parseInt(g('page') || '1', 10) || 1),
  }
}

export function toParams(f) {
  const sp = new URLSearchParams()
  for (const k of ['q', 'category', 'locality', 'min', 'max', 'bhk', 'furnishing']) if (f[k]) sp.set(k, f[k])
  if (f.verified) sp.set('verified', '1')
  if (f.sort && f.sort !== 'new') sp.set('sort', f.sort)
  if (f.page > 1) sp.set('page', String(f.page))
  return sp
}

export const activeFilterCount = (f) =>
  ['category', 'locality', 'min', 'max', 'bhk', 'furnishing'].filter((k) => f[k]).length + (f.verified ? 1 : 0)

export function applyFilters(list, f) {
  const q = f.q.trim().toLowerCase()
  const min = Number(f.min) || 0
  const max = Number(f.max) || Infinity
  let out = list.filter((p) => {
    if (f.category && p.category !== f.category) return false
    if (f.locality && p.locality !== f.locality) return false
    if (p.rent < min || p.rent > max) return false
    if (f.furnishing && p.furnishing !== f.furnishing) return false
    if (f.verified && !p.verified) return false
    if (f.bhk) {
      if (!p.bhk) return false
      if (f.bhk === '4+' ? p.bhk < 4 : p.bhk !== Number(f.bhk)) return false
    }
    if (q) {
      const hay = `${p.title} ${p.locality} ${p.address} ${p.category} ${p.description}`.toLowerCase()
      if (!q.split(/\s+/).every((w) => hay.includes(w))) return false
    }
    return true
  })
  const by = {
    new: (a, b) => new Date(b.listedAt) - new Date(a.listedAt),
    low: (a, b) => a.rent - b.rent,
    high: (a, b) => b.rent - a.rent,
    area: (a, b) => (b.area || 0) - (a.area || 0),
  }[f.sort] || ((a, b) => new Date(b.listedAt) - new Date(a.listedAt))
  out = [...out].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || by(a, b))
  return out
}

export function paginate(list, page, size = PAGE_SIZE) {
  const pages = Math.max(1, Math.ceil(list.length / size))
  const p = Math.min(Math.max(1, page), pages)
  return { items: list.slice((p - 1) * size, p * size), total: list.length, page: p, pages }
}
