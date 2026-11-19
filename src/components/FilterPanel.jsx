import { BadgeCheck, RotateCcw } from 'lucide-react'
import { categories, FURNISHING, categoryBySlug } from '../data/categories'
import { localityNames } from '../data/localities'
import { BUDGET_STEPS, EMPTY_FILTERS } from '../utils/filters'
import { formatRupees } from '../utils/format'

const lbl = 'mb-2 block text-[0.72rem] font-extrabold uppercase tracking-wider text-muted'

export default function FilterPanel({ filters, onChange, onReset }) {
  const set = (patch) => onChange({ ...filters, ...patch, page: 1 })
  const showBhk = !filters.category || categoryBySlug[filters.category]?.hasBhk

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-extrabold">Filters</h2>
        <button type="button" onClick={onReset} className="inline-flex items-center gap-1 text-xs font-bold text-brand hover:text-brand-deep">
          <RotateCcw size={13} /> Reset
        </button>
      </div>

      <div>
        <span className={lbl}>Property type</span>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="chip" data-active={!filters.category} onClick={() => set({ category: '', bhk: '' })}>All</button>
          {categories.map((c) => (
            <button key={c.slug} type="button" className="chip" data-active={filters.category === c.slug} onClick={() => set({ category: c.slug, bhk: c.hasBhk ? filters.bhk : '' })}>
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className={lbl} htmlFor="f-locality">Locality</label>
        <select id="f-locality" className="field" value={filters.locality} onChange={(e) => set({ locality: e.target.value })}>
          <option value="">All of Kota</option>
          {localityNames.map((n) => <option key={n}>{n}</option>)}
        </select>
      </div>

      <div>
        <span className={lbl}>Monthly rent</span>
        <div className="grid grid-cols-2 gap-2">
          <select className="field" aria-label="Minimum rent" value={filters.min} onChange={(e) => set({ min: e.target.value })}>
            <option value="">Min</option>
            {BUDGET_STEPS.map((b) => <option key={b} value={b}>{formatRupees(b)}</option>)}
          </select>
          <select className="field" aria-label="Maximum rent" value={filters.max} onChange={(e) => set({ max: e.target.value })}>
            <option value="">Max</option>
            {BUDGET_STEPS.map((b) => <option key={b} value={b}>{formatRupees(b)}</option>)}
          </select>
        </div>
      </div>

      {showBhk && (
        <div>
          <span className={lbl}>Bedrooms</span>
          <div className="flex flex-wrap gap-2">
            {['1', '2', '3', '4+'].map((b) => (
              <button key={b} type="button" className="chip" data-active={filters.bhk === b} onClick={() => set({ bhk: filters.bhk === b ? '' : b })}>
                {b} BHK
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <span className={lbl}>Furnishing</span>
        <div className="flex flex-wrap gap-2">
          {FURNISHING.map((f) => (
            <button key={f.value} type="button" className="chip" data-active={filters.furnishing === f.value} onClick={() => set({ furnishing: filters.furnishing === f.value ? '' : f.value })}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <label className="flex cursor-pointer items-center gap-3 rounded-xl border-[1.5px] border-line bg-cream p-3">
        <input type="checkbox" className="h-4 w-4 accent-[#0e7c86]" checked={filters.verified} onChange={(e) => set({ verified: e.target.checked })} />
        <span className="inline-flex items-center gap-1.5 text-sm font-bold"><BadgeCheck size={16} className="text-emerald-600" /> Verified listings only</span>
      </label>
    </div>
  )
}

export { EMPTY_FILTERS }
