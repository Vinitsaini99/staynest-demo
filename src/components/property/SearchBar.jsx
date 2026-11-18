import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { categories, BUDGETS } from '../../data/categories'
import { locations } from '../../data/locations'
import { toParams, DEFAULT_FILTERS } from '../../utils/filters'
import { Button } from '../ui/Button'

const selectCls = "field appearance-none border-0 bg-transparent px-0 py-1 text-[0.92rem] font-medium text-forest focus:shadow-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23142D27%22 stroke-width=%222.2%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:12px] bg-[right_0_center] bg-no-repeat pr-5"

function Cell({ label, children, stacked }) {
  return (
    <label className={stacked ? 'block border border-line bg-white px-4 py-2.5' : 'block px-5 py-3.5'}>
      <span className="block text-[0.64rem] font-bold uppercase tracking-[0.18em] text-gold-deep">{label}</span>
      {children}
    </label>
  )
}

export default function SearchBar({ variant = 'hero', onDone }) {
  const navigate = useNavigate()
  const [intent, setIntent] = useState('buy')
  const [segment, setSegment] = useState('')
  const [locality, setLocality] = useState('')
  const [category, setCategory] = useState('')
  const [budget, setBudget] = useState('any')
  const stacked = variant === 'stacked'

  const typeOptions = categories.filter((c) => !segment || c.segment === segment)

  const submit = (e) => {
    e.preventDefault()
    onDone?.()
    if (intent === 'sell') return navigate('/sell-your-property')
    const params = toParams({ ...DEFAULT_FILTERS, segment, locality, category, budget })
    const qs = params.toString()
    navigate(`/buy-property${qs ? `?${qs}` : ''}`)
  }

  return (
    <form
      onSubmit={submit}
      aria-label="Search properties"
      className={stacked ? 'space-y-3' : 'grid grid-cols-2 bg-white shadow-[0_30px_60px_-30px_rgba(0,0,0,0.55)] lg:grid-cols-[1fr_1fr_1.15fr_1.1fr_1.1fr_auto] [&>label]:border-b [&>label]:border-line lg:[&>label]:border-b-0 lg:[&>label]:border-r'}
    >
      <Cell label="I want to" stacked={stacked}>
        <select className={selectCls} value={intent} onChange={(e) => setIntent(e.target.value)}>
          <option value="buy">Buy Property</option>
          <option value="sell">Sell Property</option>
        </select>
      </Cell>
      <Cell label="Category" stacked={stacked}>
        <select className={selectCls} value={segment} onChange={(e) => { setSegment(e.target.value); setCategory('') }} disabled={intent === 'sell'}>
          <option value="">All categories</option>
          <option value="residential">Residential</option>
          <option value="commercial">Commercial</option>
        </select>
      </Cell>
      <Cell label="Locality" stacked={stacked}>
        <select className={selectCls} value={locality} onChange={(e) => setLocality(e.target.value)} disabled={intent === 'sell'}>
          <option value="">All of Kota</option>
          {locations.map((l) => <option key={l.slug} value={l.slug}>{l.name}</option>)}
        </select>
      </Cell>
      <Cell label="Property Type" stacked={stacked}>
        <select className={selectCls} value={category} onChange={(e) => setCategory(e.target.value)} disabled={intent === 'sell'}>
          <option value="">Any type</option>
          {typeOptions.map((c) => <option key={c.slug} value={c.slug}>{c.label}</option>)}
        </select>
      </Cell>
      <Cell label="Budget" stacked={stacked}>
        <select className={selectCls} value={budget} onChange={(e) => setBudget(e.target.value)} disabled={intent === 'sell'}>
          {BUDGETS.map((b) => <option key={b.id} value={b.id}>{b.label}</option>)}
        </select>
      </Cell>
      <div className={stacked ? '' : 'col-span-2 p-2.5 lg:col-span-1'}>
        <Button type="submit" variant="primary" size="lg" className="h-full w-full lg:px-9">
          <Search size={17} /> {intent === 'sell' ? 'List Property' : 'Search'}
        </Button>
      </div>
    </form>
  )
}
