import { useState } from 'react'
import { Link, Navigate, useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Heart, Inbox, LayoutGrid, LogOut, Trash2, User } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { useAsync } from '../hooks/useAsync'
import { useSeo } from '../hooks/useSeo'
import { deleteSubmission, getEnquiries, getPropertiesByIds, getRecent, getSubmissions } from '../services/api'
import { categories } from '../data/categories'
import { formatDate, formatPrice, initials } from '../utils/format'
import { cleanPhone, minLen, phoneRule, required, validate } from '../utils/validation'
import { localityName } from '../components/property/PropertyCard'
import PropertyCard from '../components/property/PropertyCard'
import { Button, LinkButton } from '../components/ui/Button'
import { Input } from '../components/ui/Field'
import { EmptyState, GridSkeleton } from '../components/ui/States'
import { Badge } from '../components/ui/Bits'
import { PageHero } from '../components/ui/Bits'

const TABS = [
  { id: 'saved', label: 'Saved Properties', icon: Heart },
  { id: 'listings', label: 'My Submissions', icon: LayoutGrid },
  { id: 'enquiries', label: 'My Enquiries', icon: Inbox },
  { id: 'profile', label: 'Profile', icon: User },
]

function Saved() {
  const { wishlist } = useApp()
  const { data, loading } = useAsync(() => getPropertiesByIds(wishlist), [wishlist.join(',')])
  const recent = useAsync(() => getPropertiesByIds(getRecent()), [])
  if (loading && !data) return <GridSkeleton count={3} />
  return (
    <div className="space-y-12">
      {data?.length ? (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">{data.map((p) => <PropertyCard key={p.id} property={p} />)}</div>
      ) : (
        <EmptyState icon={Heart} title="No saved properties yet" message="Tap the heart on any property to save it here for later." actionLabel="Browse properties" actionTo="/buy-property" />
      )}
      {recent.data?.length > 0 && (
        <div>
          <h2 className="mb-5 text-2xl text-forest">Recently viewed</h2>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">{recent.data.slice(0, 3).map((p) => <PropertyCard key={p.id} property={p} />)}</div>
        </div>
      )}
    </div>
  )
}

function Listings({ user }) {
  const [items, setItems] = useState(() => getSubmissions(user.id))
  if (!items.length) return <EmptyState icon={LayoutGrid} title="You haven’t submitted any property" message="List a property and track its review status here." actionLabel="Sell your property" actionTo="/sell-your-property" />
  return (
    <div className="space-y-4">
      {items.map((s) => (
        <article key={s.id} className="flex flex-col gap-4 border border-line bg-white p-5 sm:flex-row sm:items-center">
          <div className="h-24 w-full shrink-0 bg-stone sm:w-36">{s.images?.[0] && <img src={s.images[0]} alt="" className="h-full w-full object-cover" />}</div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2"><h3 className="font-sans text-base font-semibold tracking-normal text-forest">{s.title}</h3><Badge tone="gold">{s.status}</Badge></div>
            <p className="mt-1 text-sm text-muted">{categories.find((c) => c.slug === s.category)?.label} · {localityName(s.locality)} · {formatPrice(s.price)} · {s.areaSqft} sq. ft.</p>
            <p className="mt-1 text-xs text-muted">Submitted {formatDate(s.createdAt)}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => { deleteSubmission(s.id); setItems((x) => x.filter((i) => i.id !== s.id)); toast.success('Submission removed') }}><Trash2 size={15} /> Remove</Button>
        </article>
      ))}
    </div>
  )
}

function Enquiries({ user }) {
  const items = getEnquiries(user.id)
  if (!items.length) return <EmptyState icon={Inbox} title="No enquiries yet" message="Enquiries you send to sellers will be listed here." actionLabel="Browse properties" actionTo="/buy-property" />
  return (
    <div className="divide-y divide-line border border-line bg-white">
      {items.map((e) => (
        <div key={e.id} className="p-5">
          <div className="flex flex-wrap items-center justify-between gap-2"><p className="font-semibold text-forest">{e.propertyTitle || 'General enquiry'}</p><span className="text-xs text-muted">{formatDate(e.createdAt)}</span></div>
          <p className="mt-2 text-sm text-muted">{e.message}</p>
        </div>
      ))}
    </div>
  )
}

function Profile({ user }) {
  const { updateUser } = useApp()
  const [v, setV] = useState({ name: user.name, phone: user.phone || '' })
  const [errors, setErrors] = useState({})
  const [busy, setBusy] = useState(false)
  const save = async (e) => {
    e.preventDefault()
    const errs = validate(v, { name: [required('Name'), minLen('Name', 2)], phone: [required('Mobile number'), phoneRule] })
    setErrors(errs)
    if (Object.keys(errs).length) return
    setBusy(true)
    await updateUser({ name: v.name.trim(), phone: cleanPhone(v.phone) })
    setBusy(false)
    toast.success('Profile updated')
  }
  return (
    <form onSubmit={save} noValidate className="max-w-lg space-y-5 border border-line bg-white p-7">
      <Input label="Full name" value={v.name} onChange={(e) => setV({ ...v, name: e.target.value })} error={errors.name} />
      <Input label="Email" value={user.email} disabled hint="Email cannot be changed" />
      <Input label="Mobile number" value={v.phone} onChange={(e) => setV({ ...v, phone: e.target.value })} error={errors.phone} />
      <Button type="submit" loading={busy}>Save changes</Button>
    </form>
  )
}

export default function Dashboard() {
  const { user, logout, wishlist } = useApp()
  const [sp, setSp] = useSearchParams()
  const tab = TABS.some((t) => t.id === sp.get('tab')) ? sp.get('tab') : 'saved'
  useSeo({ title: 'My Dashboard', description: 'Manage your saved properties, submissions and enquiries.', path: '/dashboard', noindex: true })
  if (!user) return <Navigate to={`/login?next=${encodeURIComponent('/dashboard' + (sp.get('tab') ? `?tab=${sp.get('tab')}` : ''))}`} replace />

  return (
    <>
      <PageHero eyebrow="My account" title={`Hello, ${user.name.split(' ')[0]}`} intro="Your saved properties, submissions and enquiries — all in one place." crumbs={[{ label: 'Home', to: '/' }, { label: 'Dashboard' }]} />
      <section className="container-x grid gap-10 py-12 lg:grid-cols-[260px_1fr]">
        <aside>
          <div className="mb-5 flex items-center gap-3 border border-line bg-white p-4">
            <span className="grid h-11 w-11 place-items-center bg-forest font-display text-gold">{initials(user.name)}</span>
            <div className="min-w-0"><p className="truncate font-semibold text-forest">{user.name}</p><p className="truncate text-xs text-muted">{user.email}</p></div>
          </div>
          <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:gap-1" aria-label="Dashboard">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => setSp({ tab: id })} aria-current={tab === id ? 'page' : undefined} className={`flex shrink-0 items-center gap-3 px-4 py-3 text-left text-sm font-semibold transition-colors ${tab === id ? 'bg-forest text-ivory' : 'bg-white text-forest hover:bg-stone'}`}>
                <Icon size={17} /> {label}{id === 'saved' && wishlist.length > 0 && <span className="ml-auto bg-gold px-1.5 text-xs text-forest">{wishlist.length}</span>}
              </button>
            ))}
            <button onClick={logout} className="flex shrink-0 items-center gap-3 px-4 py-3 text-left text-sm font-semibold text-forest hover:bg-stone"><LogOut size={17} /> Log out</button>
          </nav>
          <div className="mt-5 hidden lg:block"><LinkButton to="/sell-your-property" variant="gold" className="w-full">Sell Your Property</LinkButton></div>
        </aside>
        <div>
          <h2 className="mb-6 text-3xl text-forest">{TABS.find((t) => t.id === tab).label}</h2>
          {tab === 'saved' && <Saved />}
          {tab === 'listings' && <Listings user={user} />}
          {tab === 'enquiries' && <Enquiries user={user} />}
          {tab === 'profile' && <Profile user={user} />}
          <p className="mt-10 text-xs text-muted">Demo mode — your data is stored in this browser only. <Link to="/privacy-policy" className="underline">Privacy</Link></p>
        </div>
      </section>
    </>
  )
}
