import { useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { BadgeCheck, Check, Eye, Star, Trash2, X } from 'lucide-react'
import Button from '../../components/ui/Button'
import { Empty, ErrorBox, Spinner } from '../../components/ui/States'
import { Badge, Stat, StatusBadge } from '../../components/ui/Bits'
import { useAsync } from '../../hooks/useAsync'
import { useSeo } from '../../hooks/useSeo'
import * as api from '../../services/api'
import { categoryBySlug } from '../../data/categories'
import { formatDate, formatPrice } from '../../utils/format'

const TABS = [
  ['overview', 'Overview'],
  ['pending', 'Approvals'],
  ['listings', 'All listings'],
  ['users', 'Users'],
  ['enquiries', 'Enquiries'],
  ['messages', 'Messages'],
]

function ListingRow({ p, onChange }) {
  const run = async (fn, ok) => {
    try {
      await fn()
      toast.success(ok)
      onChange()
    } catch (e) {
      toast.error(e.message)
    }
  }
  const reject = () => {
    const reason = window.prompt('Reason for rejection (shown to the owner):', 'Please add clearer details and photos.')
    if (reason === null) return
    run(() => api.adminSetStatus(p.id, 'rejected', { rejectReason: reason.trim() }), 'Listing rejected')
  }
  const del = () => window.confirm(`Delete "${p.title}" permanently?`) && run(() => api.adminDeleteListing(p.id), 'Listing deleted')

  return (
    <div className="card flex flex-wrap items-center justify-between gap-4 p-4">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="truncate font-bold">{p.title}</h3>
          <StatusBadge status={p.status} />
          {p.demo && <Badge>Sample</Badge>}
          {p.verified && <Badge tone="green"><BadgeCheck size={12} /> Verified</Badge>}
          {p.featured && <Badge tone="amber"><Star size={12} /> Featured</Badge>}
        </div>
        <p className="mt-1 text-sm text-muted">{categoryBySlug[p.category]?.single} · {p.locality} · {formatPrice(p.rent)}/mo · {p.ownerName} · {formatDate(p.listedAt)}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant="outline" to={`/property/${p.slug}`}><Eye size={15} /> View</Button>
        {p.status !== 'approved' && <Button size="sm" onClick={() => run(() => api.adminSetStatus(p.id, 'approved', { rejectReason: '' }), 'Listing approved')}><Check size={15} /> Approve</Button>}
        {p.status !== 'rejected' && <Button size="sm" variant="outline" onClick={reject}><X size={15} /> Reject</Button>}
        <Button size="sm" variant="outline" onClick={() => run(() => api.adminSetStatus(p.id, p.status, { verified: !p.verified }), p.verified ? 'Verification removed' : 'Marked verified')}><BadgeCheck size={15} /></Button>
        <Button size="sm" variant="outline" onClick={() => run(() => api.adminSetStatus(p.id, p.status, { featured: !p.featured }), p.featured ? 'Unfeatured' : 'Featured')}><Star size={15} /></Button>
        <Button size="sm" variant="danger" onClick={del} aria-label="Delete"><Trash2 size={15} /></Button>
      </div>
    </div>
  )
}

function Simple({ rows, empty, render }) {
  if (!rows?.length) return <Empty title={empty} />
  return <ul className="space-y-3">{rows.map((r) => <li key={r.id} className="card p-4">{render(r)}</li>)}</ul>
}

export default function AdminPanel() {
  useSeo({ title: 'Admin panel', path: '/admin', noindex: true })
  const [tab, setTab] = useState('overview')
  const overview = useAsync(api.adminOverview, [])
  const listings = useAsync(api.adminListings, [])
  const users = useAsync(api.adminUsers, [])
  const enq = useAsync(api.adminEnquiries, [])
  const msgs = useAsync(api.adminMessages, [])

  const refresh = () => {
    overview.reload()
    listings.reload()
  }
  const all = listings.data || []
  const pending = all.filter((p) => p.status === 'pending')
  const o = overview.data

  return (
    <div className="container-x py-10">
      <h1 className="text-3xl font-extrabold">Admin panel</h1>
      <p className="mt-1 text-muted">Review listings, manage users and read enquiries.</p>

      <div className="mt-6 flex gap-2 overflow-x-auto pb-1" role="tablist">
        {TABS.map(([id, label]) => (
          <button key={id} role="tab" aria-selected={tab === id} type="button" className="chip shrink-0 !px-4 !py-2.5" data-active={tab === id} onClick={() => setTab(id)}>
            {label}{id === 'pending' && pending.length > 0 && <span className="rounded-full bg-saffron px-1.5 text-[0.7rem] font-extrabold text-ink">{pending.length}</span>}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {tab === 'overview' &&
          (overview.loading ? (
            <Spinner />
          ) : overview.error ? (
            <ErrorBox error={overview.error} onRetry={overview.reload} />
          ) : (
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              <Stat label="Total listings" value={o.listings} />
              <Stat label="Live" value={o.approved} />
              <Stat label="Pending" value={o.pending} tone="amber" />
              <Stat label="Rejected" value={o.rejected} />
              <Stat label="Users" value={o.users} />
              <Stat label="Owners" value={o.sellers} />
              <Stat label="Enquiries" value={o.enquiries} />
              <Stat label="Messages" value={o.messages} />
            </div>
          ))}

        {tab === 'pending' &&
          (listings.loading ? <Spinner /> : pending.length ? <div className="space-y-3">{pending.map((p) => <ListingRow key={p.id} p={p} onChange={refresh} />)}</div> : <Empty title="All caught up" text="No listings are waiting for approval." />)}

        {tab === 'listings' &&
          (listings.loading ? <Spinner /> : <div className="space-y-3">{all.map((p) => <ListingRow key={p.id} p={p} onChange={refresh} />)}</div>)}

        {tab === 'users' &&
          (users.loading ? <Spinner /> : (
            <Simple rows={users.data} empty="No registered users yet" render={(u) => (
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div><p className="font-bold">{u.name}</p><p className="text-sm text-muted">{u.email} · {u.phone}</p></div>
                <div className="flex items-center gap-2"><Badge tone={u.role === 'seller' ? 'teal' : 'gray'}>{u.role === 'seller' ? 'Owner' : 'Tenant'}</Badge><span className="text-xs text-muted">{formatDate(u.createdAt)}</span></div>
              </div>
            )} />
          ))}

        {tab === 'enquiries' &&
          (enq.loading ? <Spinner /> : (
            <Simple rows={enq.data} empty="No enquiries yet" render={(q) => (
              <>
                <div className="flex flex-wrap justify-between gap-2"><Link to={`/property/${q.propertySlug}`} className="font-bold hover:text-brand">{q.propertyTitle}</Link><span className="text-xs text-muted">{formatDate(q.createdAt)}</span></div>
                <p className="mt-1 text-sm">{q.name} · {q.phone} · {q.email}</p>
                <p className="mt-1 text-sm text-muted">{q.message}</p>
              </>
            )} />
          ))}

        {tab === 'messages' &&
          (msgs.loading ? <Spinner /> : (
            <Simple rows={msgs.data} empty="No messages yet" render={(m) => (
              <>
                <div className="flex flex-wrap justify-between gap-2"><p className="font-bold">{m.name}</p><span className="text-xs text-muted">{formatDate(m.createdAt)}</span></div>
                <p className="text-sm text-muted">{m.email} · {m.phone}</p>
                <p className="mt-1 text-sm">{m.message}</p>
              </>
            )} />
          ))}
      </div>
    </div>
  )
}
