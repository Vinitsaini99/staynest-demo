import { useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Eye, Pencil, PlusCircle, Trash2 } from 'lucide-react'
import Button from '../../components/ui/Button'
import { Empty, ErrorBox, Spinner } from '../../components/ui/States'
import { Stat, StatusBadge } from '../../components/ui/Bits'
import { useApp } from '../../context/AppContext'
import { useAsync } from '../../hooks/useAsync'
import { useSeo } from '../../hooks/useSeo'
import { deleteMyListing, enquiriesForMyListings, myListings } from '../../services/api'
import { formatDate, formatPrice } from '../../utils/format'
import { categoryBySlug } from '../../data/categories'
import { ProfileForm } from './UserDashboard'

export default function SellerDashboard() {
  useSeo({ title: 'Owner dashboard', path: '/seller', noindex: true })
  const { user } = useApp()
  const list = useAsync(myListings, [])
  const enq = useAsync(enquiriesForMyListings, [])
  const [tab, setTab] = useState('listings')

  const remove = async (p) => {
    if (!window.confirm(`Delete "${p.title}"? This cannot be undone.`)) return
    try {
      await deleteMyListing(p.id)
      toast.success('Listing deleted')
      list.reload()
    } catch (e) {
      toast.error(e.message)
    }
  }

  const items = list.data || []
  const count = (s) => items.filter((p) => p.status === s).length

  return (
    <div className="container-x py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold">Owner dashboard</h1>
          <p className="mt-1 text-muted">Welcome, {user.name.split(' ')[0]}. New and edited listings go live after admin approval.</p>
        </div>
        <Button to="/seller/new"><PlusCircle size={17} /> Add property</Button>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat label="Total listings" value={items.length} />
        <Stat label="Live" value={count('approved')} />
        <Stat label="Awaiting approval" value={count('pending')} tone="amber" />
        <Stat label="Enquiries" value={enq.data?.length ?? 0} />
      </div>

      <div className="mt-8 flex gap-2" role="tablist">
        {[['listings', 'My listings'], ['enquiries', 'Enquiries'], ['profile', 'Profile']].map(([id, label]) => (
          <button key={id} role="tab" aria-selected={tab === id} type="button" className="chip !px-4 !py-2.5" data-active={tab === id} onClick={() => setTab(id)}>{label}</button>
        ))}
      </div>

      <div className="mt-6">
        {tab === 'listings' &&
          (list.error ? (
            <ErrorBox error={list.error} onRetry={list.reload} />
          ) : list.loading ? (
            <Spinner />
          ) : !items.length ? (
            <Empty title="No properties yet" text="Add your first listing. It only takes a few minutes." action={<Button to="/seller/new"><PlusCircle size={17} /> Add property</Button>} />
          ) : (
            <div className="space-y-3">
              {items.map((p) => (
                <div key={p.id} className="card flex flex-wrap items-center justify-between gap-4 p-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="truncate font-bold">{p.title}</h3>
                      <StatusBadge status={p.status} />
                    </div>
                    <p className="mt-1 text-sm text-muted">{categoryBySlug[p.category]?.single} · {p.locality} · {formatPrice(p.rent)}/mo · {formatDate(p.listedAt)}</p>
                    {p.status === 'rejected' && p.rejectReason && <p className="mt-1 text-sm font-semibold text-red-600">Reason: {p.rejectReason}</p>}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" to={`/property/${p.slug}`}><Eye size={15} /> View</Button>
                    <Button variant="outline" size="sm" to={`/seller/edit/${p.id}`}><Pencil size={15} /> Edit</Button>
                    <Button variant="danger" size="sm" onClick={() => remove(p)} aria-label={`Delete ${p.title}`}><Trash2 size={15} /></Button>
                  </div>
                </div>
              ))}
            </div>
          ))}

        {tab === 'enquiries' &&
          (enq.loading ? (
            <Spinner />
          ) : !enq.data?.length ? (
            <Empty title="No enquiries yet" text="When tenants contact you about a listing, it appears here." />
          ) : (
            <ul className="space-y-3">
              {enq.data.map((q) => (
                <li key={q.id} className="card p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Link to={`/property/${q.propertySlug}`} className="font-bold hover:text-brand">{q.propertyTitle}</Link>
                    <span className="text-xs text-muted">{formatDate(q.createdAt)}</span>
                  </div>
                  <p className="mt-1 text-sm">{q.name} · <a className="font-bold text-brand" href={`tel:+91${q.phone}`}>{q.phone}</a> · {q.email}</p>
                  <p className="mt-1.5 text-sm text-muted">{q.message}</p>
                </li>
              ))}
            </ul>
          ))}

        {tab === 'profile' && <ProfileForm />}
      </div>
    </div>
  )
}
