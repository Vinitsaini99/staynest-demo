import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Heart, MessageSquare, UserCircle } from 'lucide-react'
import PropertyCard from '../../components/PropertyCard'
import Button from '../../components/ui/Button'
import { Input } from '../../components/ui/Field'
import { Empty, Spinner } from '../../components/ui/States'
import { useApp } from '../../context/AppContext'
import { useAsync } from '../../hooks/useAsync'
import { useSeo } from '../../hooks/useSeo'
import { getPropertiesByIds, myEnquiries, updateProfile } from '../../services/api'
import { formatDate } from '../../utils/format'
import { cleanPhone, minLen, phoneRule, validate } from '../../utils/validation'

const TABS = [
  { id: 'saved', label: 'Shortlist', icon: Heart },
  { id: 'enquiries', label: 'My enquiries', icon: MessageSquare },
  { id: 'profile', label: 'Profile', icon: UserCircle },
]

function Saved() {
  const { saved } = useApp()
  const { data, loading } = useAsync(() => getPropertiesByIds(saved), [saved.join(',')])
  if (loading) return <Spinner />
  if (!data?.length) return <Empty icon={Heart} title="Your shortlist is empty" text="Tap the heart on any listing to save it here." action={<Button to="/rentals">Browse rentals</Button>} />
  return <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{data.map((p) => <PropertyCard key={p.id} p={p} />)}</div>
}

function Enquiries() {
  const { data, loading } = useAsync(myEnquiries, [])
  if (loading) return <Spinner />
  if (!data?.length) return <Empty icon={MessageSquare} title="No enquiries yet" text="Enquiries you send to owners will be listed here." action={<Button to="/rentals">Find a property</Button>} />
  return (
    <ul className="space-y-3">
      {data.map((q) => (
        <li key={q.id} className="card p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Link to={`/property/${q.propertySlug}`} className="font-bold hover:text-brand">{q.propertyTitle}</Link>
            <span className="text-xs text-muted">{formatDate(q.createdAt)}</span>
          </div>
          <p className="mt-1.5 text-sm text-muted">{q.message}</p>
        </li>
      ))}
    </ul>
  )
}

export function ProfileForm() {
  const { user, setUser } = useApp()
  const [v, setV] = useState({ name: user.name, phone: user.phone })
  const [errors, setErrors] = useState({})
  const [busy, setBusy] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    const errs = validate(v, { name: [minLen('Name', 2)], phone: [phoneRule] })
    setErrors(errs)
    if (Object.keys(errs).length) return
    setBusy(true)
    try {
      setUser(await updateProfile({ ...v, phone: cleanPhone(v.phone) }))
      toast.success('Profile updated')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={submit} className="card max-w-lg space-y-4 p-6" noValidate>
      <Input label="Full name" value={v.name} onChange={(e) => setV({ ...v, name: e.target.value })} error={errors.name} />
      <Input label="Email" value={user.email} disabled hint="Email cannot be changed" />
      <Input label="Mobile" inputMode="tel" value={v.phone} onChange={(e) => setV({ ...v, phone: e.target.value })} error={errors.phone} />
      <Button type="submit" loading={busy}>Save changes</Button>
    </form>
  )
}

export default function UserDashboard() {
  useSeo({ title: 'My account', path: '/user', noindex: true })
  const { user } = useApp()
  const [sp, setSp] = useSearchParams()
  const tab = TABS.some((t) => t.id === sp.get('tab')) ? sp.get('tab') : 'saved'

  return (
    <div className="container-x py-10">
      <h1 className="text-3xl font-extrabold">Hello, {user.name.split(' ')[0]}</h1>
      <p className="mt-1 text-muted">Manage your shortlist and enquiries.</p>
      <div className="mt-6 flex gap-2 overflow-x-auto" role="tablist">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button key={id} role="tab" aria-selected={tab === id} type="button" onClick={() => setSp({ tab: id })} className="chip !px-4 !py-2.5" data-active={tab === id}>
            <Icon size={16} /> {label}
          </button>
        ))}
      </div>
      <div className="mt-6">
        {tab === 'saved' && <Saved />}
        {tab === 'enquiries' && <Enquiries />}
        {tab === 'profile' && <ProfileForm />}
      </div>
    </div>
  )
}
