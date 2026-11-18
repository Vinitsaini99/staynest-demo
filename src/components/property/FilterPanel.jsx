import { AREA_RANGES, BHK_CATEGORIES, BUDGETS, FURNISHING, PRICE_STEPS, STATUSES, categories } from '../../data/categories'
import { locations } from '../../data/locations'
import { Select } from '../ui/Field'

const Group = ({ title, children }) => (
  <fieldset className="min-w-0 border-b border-line py-5 first:pt-0 last:border-0">
    <legend className="mb-3 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-gold-deep">{title}</legend>
    {children}
  </fieldset>
)

const Chip = ({ active, onClick, children }) => (
  <button type="button" onClick={onClick} aria-pressed={active} className={`border px-3 py-1.5 text-[0.8rem] font-medium transition-colors ${active ? 'border-forest bg-forest text-ivory' : 'border-line bg-white text-charcoal hover:border-forest'}`}>{children}</button>
)

export default function FilterPanel({ filters: f, onChange, scope = {} }) {
  const availableCats = categories.filter((c) => (scope.segment ? c.segment === scope.segment : true) && (scope.categories ? scope.categories.includes(c.slug) : true))
  const selectedCats = f.category ? f.category.split(',') : []
  const showBhk = availableCats.some((c) => BHK_CATEGORIES.includes(c.slug))
  const showFurnishing = availableCats.some((c) => !['plots', 'commercial-land'].includes(c.slug))

  const toggleCat = (slug) => {
    const next = selectedCats.includes(slug) ? selectedCats.filter((x) => x !== slug) : [...selectedCats, slug]
    onChange({ category: next.join(',') })
  }
  const toggle = (key, value) => onChange({ [key]: f[key] === value ? '' : value })

  return (
    <div>
      <Group title="Locality">
        <Select aria-label="Locality" value={f.locality} onChange={(e) => onChange({ locality: e.target.value })} placeholder="All localities" options={locations.map((l) => ({ value: l.slug, label: l.name }))} />
      </Group>

      {availableCats.length > 1 && (
        <Group title="Property type">
          <div className="flex flex-wrap gap-2">
            {availableCats.map((c) => <Chip key={c.slug} active={selectedCats.includes(c.slug)} onClick={() => toggleCat(c.slug)}>{c.short}</Chip>)}
          </div>
        </Group>
      )}

      <Group title="Budget">
        <Select aria-label="Budget" value={f.budget} onChange={(e) => onChange({ budget: e.target.value, minPrice: '', maxPrice: '' })} options={BUDGETS.map((b) => ({ value: b.id, label: b.label }))} />
        <div className="mt-3 grid grid-cols-2 gap-3">
          <Select aria-label="Minimum price" value={f.minPrice} onChange={(e) => onChange({ minPrice: e.target.value })} placeholder="Min price" options={PRICE_STEPS.map((s) => ({ value: s.value, label: s.label }))} />
          <Select aria-label="Maximum price" value={f.maxPrice} onChange={(e) => onChange({ maxPrice: e.target.value })} placeholder="Max price" options={PRICE_STEPS.map((s) => ({ value: s.value, label: s.label }))} />
        </div>
      </Group>

      {showBhk && (
        <Group title="BHK">
          <div className="flex flex-wrap gap-2">
            {['1', '2', '3', '4'].map((n) => <Chip key={n} active={f.bhk === n} onClick={() => toggle('bhk', n)}>{n === '4' ? '4+ BHK' : `${n} BHK`}</Chip>)}
          </div>
        </Group>
      )}

      <Group title="Area">
        <Select aria-label="Area" value={f.area} onChange={(e) => onChange({ area: e.target.value })} placeholder="Any area" options={AREA_RANGES.map((a) => ({ value: a.id, label: a.label }))} />
      </Group>

      {showFurnishing && (
        <Group title="Furnishing">
          <div className="flex flex-wrap gap-2">
            {FURNISHING.map((x) => <Chip key={x} active={f.furnishing === x} onClick={() => toggle('furnishing', x)}>{x}</Chip>)}
          </div>
        </Group>
      )}

      <Group title="Status">
        <div className="flex flex-wrap gap-2">
          {STATUSES.map((x) => <Chip key={x} active={f.status === x} onClick={() => toggle('status', x)}>{x}</Chip>)}
        </div>
      </Group>

      <Group title="Trust">
        <label className="flex cursor-pointer items-center gap-3 text-sm">
          <input type="checkbox" className="h-4 w-4 accent-[#142D27]" checked={!!f.verified} onChange={(e) => onChange({ verified: e.target.checked ? '1' : '' })} />
          Verified listings only
        </label>
      </Group>
    </div>
  )
}
