import { useMemo, useState } from 'react'
import { Grid3X3, List, Plus, Trash2, Eye, Pencil } from 'lucide-react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import DashboardShell from '../../components/layout/DashboardShell'
import Badge from '../../components/common/Badge'
import PropertyForm from '../../components/property/PropertyForm'
import { adminNav } from './adminNav'
import { useApp } from '../../context/AppContext'
import { formatINR, getOwner } from '../../data/mockData'

export default function AdminProperties() {
  const { properties, updatePropertyStatus, deleteProperty, addProperty } = useApp()
  const [view, setView] = useState('table')
  const [q, setQ] = useState('')
  const [status, setStatus] = useState('All')
  const [page, setPage] = useState(1)
  const [showForm, setShowForm] = useState(false)
  const perPage = 6

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      const matchQ = `${p.name} ${p.locality} ${getOwner(p.ownerId)?.name || ''}`.toLowerCase().includes(q.toLowerCase())
      const matchS = status === 'All' || p.status === status
      return matchQ && matchS
    })
  }, [properties, q, status])

  const pageItems = filtered.slice((page - 1) * perPage, page * perPage)
  const pages = Math.max(1, Math.ceil(filtered.length / perPage))

  return (
    <DashboardShell title="Property Management" items={adminNav} searchPlaceholder="Search properties...">
      {showForm ? (
        <PropertyForm
          onCancel={() => setShowForm(false)}
          onSubmit={(data) => {
            addProperty(data)
            setShowForm(false)
          }}
        />
      ) : (
        <>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              <input
                value={q}
                onChange={(e) => { setQ(e.target.value); setPage(1) }}
                placeholder="Search name, locality, owner"
                className="rounded-xl border border-border bg-card px-3 py-2 text-sm outline-none focus:border-secondary"
              />
              <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1) }} className="rounded-xl border border-border bg-card px-3 py-2 text-sm">
                {['All', 'Approved', 'Pending', 'Rejected'].map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => setView('table')} className={`rounded-xl border p-2 ${view === 'table' ? 'border-primary bg-primary text-white' : 'border-border bg-card'}`}>
                <List size={16} />
              </button>
              <button type="button" onClick={() => setView('grid')} className={`rounded-xl border p-2 ${view === 'grid' ? 'border-primary bg-primary text-white' : 'border-border bg-card'}`}>
                <Grid3X3 size={16} />
              </button>
              <button type="button" onClick={() => setShowForm(true)} className="inline-flex items-center gap-1 rounded-xl bg-accent px-4 py-2 text-sm font-bold text-primary">
                <Plus size={16} /> Add Property
              </button>
            </div>
          </div>

          {view === 'table' ? (
            <div className="overflow-hidden rounded-2xl border border-border bg-card demo-shadow">
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full min-w-[900px] text-left text-sm">
                  <thead className="bg-bg text-xs uppercase text-muted">
                    <tr>
                      <th className="px-4 py-3">Property</th>
                      <th className="px-4 py-3">Owner</th>
                      <th className="px-4 py-3">Type</th>
                      <th className="px-4 py-3">Rooms</th>
                      <th className="px-4 py-3">From</th>
                      <th className="px-4 py-3">Occupancy</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pageItems.map((p) => (
                      <tr key={p.id} className="border-t border-border">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <img src={p.images[0]} alt="" className="h-12 w-16 rounded-lg object-cover" />
                            <div>
                              <p className="font-semibold">{p.name}</p>
                              <p className="text-xs text-muted">{p.locality}, {p.city}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">{getOwner(p.ownerId)?.name}</td>
                        <td className="px-4 py-3">{p.category}</td>
                        <td className="px-4 py-3">{p.rooms.map((r) => r.type.split(' ')[0]).join(', ')}</td>
                        <td className="px-4 py-3">{formatINR(p.priceFrom)}</td>
                        <td className="px-4 py-3">{p.occupancy}%</td>
                        <td className="px-4 py-3"><Badge status={p.status} /></td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1">
                            <Link to={`/student/property/${p.id}`} className="rounded-lg border border-border p-1.5 hover:bg-bg"><Eye size={14} /></Link>
                            <button type="button" onClick={() => toast.success('Edit form opened (demo)')} className="rounded-lg border border-border p-1.5 hover:bg-bg"><Pencil size={14} /></button>
                            {p.status === 'Pending' && (
                              <>
                                <button type="button" onClick={() => updatePropertyStatus(p.id, 'Approved')} className="rounded-lg bg-emerald-600 px-2 py-1 text-[11px] font-semibold text-white">OK</button>
                                <button type="button" onClick={() => updatePropertyStatus(p.id, 'Rejected')} className="rounded-lg bg-rose-600 px-2 py-1 text-[11px] font-semibold text-white">X</button>
                              </>
                            )}
                            <button type="button" onClick={() => deleteProperty(p.id)} className="rounded-lg border border-rose-200 p-1.5 text-rose-600 hover:bg-rose-50"><Trash2 size={14} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="space-y-3 p-3 md:hidden">
                {pageItems.map((p) => (
                  <div key={p.id} className="rounded-xl border border-border p-3">
                    <div className="flex gap-3">
                      <img src={p.images[0]} alt="" className="h-16 w-20 rounded-lg object-cover" />
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold">{p.name}</p>
                        <p className="text-xs text-muted">{p.locality}</p>
                        <div className="mt-1"><Badge status={p.status} /></div>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {p.status === 'Pending' && (
                        <>
                          <button type="button" onClick={() => updatePropertyStatus(p.id, 'Approved')} className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white">Approve</button>
                          <button type="button" onClick={() => updatePropertyStatus(p.id, 'Rejected')} className="rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white">Reject</button>
                        </>
                      )}
                      <Link to={`/student/property/${p.id}`} className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold">Preview</Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {pageItems.map((p) => (
                <div key={p.id} className="overflow-hidden rounded-2xl border border-border bg-card demo-shadow card-hover">
                  <img src={p.images[0]} alt="" className="h-40 w-full object-cover" />
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold">{p.name}</h3>
                      <Badge status={p.status} />
                    </div>
                    <p className="mt-1 text-sm text-muted">{p.locality} · {getOwner(p.ownerId)?.name}</p>
                    <p className="mt-2 text-sm font-semibold text-secondary">From {formatINR(p.priceFrom)}/mo</p>
                    <div className="mt-3 flex gap-2">
                      <Link to={`/student/property/${p.id}`} className="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-white">Preview</Link>
                      <button type="button" onClick={() => deleteProperty(p.id)} className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-muted">{filtered.length} properties</p>
            <div className="flex gap-2">
              <button type="button" disabled={page === 1} onClick={() => setPage((p) => p - 1)} className="rounded-lg border border-border px-3 py-1.5 text-sm disabled:opacity-40">Prev</button>
              <span className="px-2 py-1.5 text-sm">{page} / {pages}</span>
              <button type="button" disabled={page === pages} onClick={() => setPage((p) => p + 1)} className="rounded-lg border border-border px-3 py-1.5 text-sm disabled:opacity-40">Next</button>
            </div>
          </div>
        </>
      )}
    </DashboardShell>
  )
}
