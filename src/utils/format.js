// Monthly rent: 6500 -> "₹6,500"
export function formatPrice(value) {
  const n = Number(value)
  if (!Number.isFinite(n) || n <= 0) return 'Price on request'
  return `₹${n.toLocaleString('en-IN')}`
}

export const formatRent = (value) => `${formatPrice(value)}/month`

export function formatRupees(value) {
  return `₹${Number(value || 0).toLocaleString('en-IN')}`
}

export function formatArea(sqft) {
  const n = Number(sqft)
  return Number.isFinite(n) && n > 0 ? `${n.toLocaleString('en-IN')} sq. ft.` : '—'
}

export function pricePerSqft(price, area) {
  if (!price || !area) return null
  return `₹${Math.round(price / area).toLocaleString('en-IN')} / sq. ft.`
}

export function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime()
  const day = 86400000
  if (diff < 3600000) return 'Just now'
  if (diff < day) return `${Math.max(1, Math.floor(diff / 3600000))}h ago`
  const d = Math.floor(diff / day)
  if (d === 1) return 'Yesterday'
  if (d < 30) return `${d} days ago`
  const m = Math.floor(d / 30)
  return m === 1 ? '1 month ago' : `${m} months ago`
}

export function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function slugify(str = '') {
  return str.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

export function initials(name = '') {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0].toUpperCase()).join('') || 'U'
}

export function plural(n, one, many) {
  return `${n} ${n === 1 ? one : many || one + 's'}`
}
