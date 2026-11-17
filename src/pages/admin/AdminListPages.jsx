import { useMemo, useState } from 'react'
import DashboardShell from '../../components/layout/DashboardShell'
import Badge from '../../components/common/Badge'
import StatCard from '../../components/common/StatCard'
import { adminNav } from './adminNav'
import {
  formatINR, getProperty, getStudent, inquiries,
  payments, referrals, revenueChart, bookingChart, occupancyChart, students, owners,
} from '../../data/mockData'
import { useApp } from '../../context/AppContext'
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts'
import toast from 'react-hot-toast'

function ListShell({ title, children }) {
  return (
    <DashboardShell title={title} items={adminNav}>
      {children}
    </DashboardShell>
  )
}

function SearchableTable({ columns, rows, searchKeys }) {
  const [q, setQ] = useState('')
  const [page, setPage] = useState(1)
  const perPage = 8
  const filtered = useMemo(() => {
    const term = q.toLowerCase()
    return rows.filter((r) => searchKeys.some((k) => String(r[k] || '').toLowerCase().includes(term)))
  }, [rows, q, searchKeys])
  const pageRows = filtered.slice((page - 1) * perPage, page * perPage)
  const pages = Math.max(1, Math.ceil(filtered.length / perPage))

  return (
    <div className="rounded-2xl border border-border bg-card demo-shadow">
      <div className="border-b border-border p-4">
        <input
          value={q}
          onChange={(e) => { setQ(e.target.value); setPage(1) }}
          placeholder="Search..."
          className="w-full max-w-sm rounded-xl border border-border bg-bg px-3 py-2 text-sm outline-none focus:border-secondary"
        />
      </div>
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-bg text-xs uppercase text-muted">
            <tr>{columns.map((c) => <th key={c.key} className="px-4 py-3">{c.label}</th>)}</tr>
          </thead>
          <tbody>
            {pageRows.map((row) => (
              <tr key={row.id} className="border-t border-border">
                {columns.map((c) => (
                  <td key={c.key} className="px-4 py-3">{c.render ? c.render(row) : row[c.key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="space-y-3 p-3 md:hidden">
        {pageRows.map((row) => (
          <div key={row.id} className="rounded-xl border border-border p-3 text-sm">
            {columns.slice(0, 4).map((c) => (
              <div key={c.key} className="mb-1 flex justify-between gap-2">
                <span className="text-muted">{c.label}</span>
                <span className="text-right font-medium">{c.render ? c.render(row) : row[c.key]}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-border px-4 py-3">
        <span className="text-xs text-muted">{filtered.length} records</span>
        <div className="flex gap-2">
          <button type="button" disabled={page === 1} onClick={() => setPage((p) => p - 1)} className="rounded-lg border px-3 py-1 text-sm disabled:opacity-40">Prev</button>
          <span className="text-sm">{page}/{pages}</span>
          <button type="button" disabled={page === pages} onClick={() => setPage((p) => p + 1)} className="rounded-lg border px-3 py-1 text-sm disabled:opacity-40">Next</button>
        </div>
      </div>
    </div>
  )
}

export function AdminOwners() {
  return (
    <ListShell title="Owner Management">
      <SearchableTable
        searchKeys={['name', 'email', 'city', 'status']}
        rows={owners}
        columns={[
          { key: 'name', label: 'Owner' },
          { key: 'email', label: 'Email' },
          { key: 'phone', label: 'Phone' },
          { key: 'properties', label: 'Properties' },
          { key: 'status', label: 'Status', render: (r) => <Badge status={r.status} /> },
          { key: 'joined', label: 'Joined' },
        ]}
      />
    </ListShell>
  )
}

export function AdminStudents() {
  return (
    <ListShell title="Student Management">
      <SearchableTable
        searchKeys={['name', 'email', 'college', 'status']}
        rows={students}
        columns={[
          { key: 'name', label: 'Student' },
          { key: 'college', label: 'College' },
          { key: 'phone', label: 'Phone' },
          { key: 'gender', label: 'Gender' },
          { key: 'status', label: 'Status', render: (r) => <Badge status={r.status} /> },
          { key: 'joined', label: 'Joined' },
        ]}
      />
    </ListShell>
  )
}

export function AdminBookings() {
  const { bookings: live, updateBookingStatus } = useApp()
  const rows = live.map((b) => ({
    ...b,
    student: getStudent(b.studentId)?.name,
    property: getProperty(b.propertyId)?.name,
  }))
  return (
    <ListShell title="Bookings">
      <SearchableTable
        searchKeys={['id', 'student', 'property', 'status']}
        rows={rows}
        columns={[
          { key: 'id', label: 'Booking ID', render: (r) => r.id.toUpperCase() },
          { key: 'student', label: 'Student' },
          { key: 'property', label: 'Property' },
          { key: 'roomType', label: 'Room' },
          { key: 'amount', label: 'Amount', render: (r) => formatINR(r.amount) },
          { key: 'status', label: 'Status', render: (r) => <Badge status={r.status} /> },
          {
            key: 'actions',
            label: 'Actions',
            render: (r) =>
              r.status === 'Pending' ? (
                <div className="flex gap-1">
                  <button type="button" onClick={() => updateBookingStatus(r.id, 'Confirmed')} className="rounded-lg bg-emerald-600 px-2 py-1 text-[11px] text-white">Confirm</button>
                  <button type="button" onClick={() => updateBookingStatus(r.id, 'Cancelled')} className="rounded-lg bg-rose-600 px-2 py-1 text-[11px] text-white">Cancel</button>
                </div>
              ) : (
                <span className="text-xs text-muted">—</span>
              ),
          },
        ]}
      />
    </ListShell>
  )
}

export function AdminPayments() {
  const rows = payments.map((p) => ({
    ...p,
    student: getStudent(p.studentId)?.name,
    property: getProperty(p.propertyId)?.name,
  }))
  return (
    <ListShell title="Payments & Revenue">
      <div className="mb-4 grid gap-4 sm:grid-cols-3">
        <StatCard label="Collected (demo)" value={formatINR(1845000)} />
        <StatCard label="Pending" value={formatINR(15000)} />
        <StatCard label="Overdue" value={formatINR(8000)} />
      </div>
      <SearchableTable
        searchKeys={['id', 'student', 'property', 'status', 'method']}
        rows={rows}
        columns={[
          { key: 'id', label: 'Payment' },
          { key: 'student', label: 'Student' },
          { key: 'property', label: 'Property' },
          { key: 'amount', label: 'Amount', render: (r) => formatINR(r.amount) },
          { key: 'method', label: 'Method' },
          { key: 'type', label: 'Type' },
          { key: 'status', label: 'Status', render: (r) => <Badge status={r.status} /> },
          { key: 'date', label: 'Date' },
        ]}
      />
    </ListShell>
  )
}

export function AdminAnalytics() {
  return (
    <ListShell title="Reports & Analytics">
      <div className="grid gap-4 xl:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5 demo-shadow">
          <h3 className="mb-4 font-bold">Revenue Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueChart}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E7EBE7" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(v) => `${v / 100000}L`} />
                <Tooltip formatter={(v) => formatINR(v)} />
                <Area type="monotone" dataKey="revenue" stroke="#173B35" fill="#245C5044" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5 demo-shadow">
          <h3 className="mb-4 font-bold">Bookings Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bookingChart}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E7EBE7" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="bookings" fill="#D6A85F" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="mt-4 rounded-2xl border border-border bg-card p-5 demo-shadow">
        <h3 className="mb-3 font-bold">Occupancy Snapshot</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {occupancyChart.map((o) => (
            <div key={o.name} className="rounded-xl bg-bg p-4">
              <p className="text-sm text-muted">{o.name}</p>
              <p className="text-2xl font-bold">{o.value}%</p>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-border">
                <div className="h-full rounded-full bg-secondary" style={{ width: `${o.value}%` }} />
              </div>
            </div>
          ))}
        </div>
        <button type="button" onClick={() => toast.success('Analytics report exported (demo)')} className="mt-4 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white">
          Export Report
        </button>
      </div>
    </ListShell>
  )
}

export function AdminReferrals() {
  return (
    <ListShell title="Referral & Rewards">
      <SearchableTable
        searchKeys={['student', 'code', 'reward']}
        rows={referrals}
        columns={[
          { key: 'student', label: 'Student' },
          { key: 'code', label: 'Code' },
          { key: 'referred', label: 'Referrals' },
          { key: 'points', label: 'Points' },
          { key: 'reward', label: 'Reward' },
        ]}
      />
    </ListShell>
  )
}

export function AdminInquiries() {
  return (
    <ListShell title="Inquiries">
      <SearchableTable
        searchKeys={['student', 'property', 'message', 'status']}
        rows={inquiries}
        columns={[
          { key: 'student', label: 'Student' },
          { key: 'property', label: 'Property' },
          { key: 'message', label: 'Message' },
          { key: 'date', label: 'Date' },
          { key: 'status', label: 'Status', render: (r) => <Badge status={r.status} /> },
          {
            key: 'a',
            label: 'Action',
            render: () => (
              <button type="button" onClick={() => toast.success('Reply sent (demo)')} className="rounded-lg border px-2 py-1 text-xs font-semibold">Reply</button>
            ),
          },
        ]}
      />
    </ListShell>
  )
}

export function AdminTours() {
  const { tours: live } = useApp()
  const rows = live.map((t) => ({
    ...t,
    student: getStudent(t.studentId)?.name,
    property: getProperty(t.propertyId)?.name,
  }))
  return (
    <ListShell title="Tour Appointments">
      <SearchableTable
        searchKeys={['student', 'property', 'status']}
        rows={rows}
        columns={[
          { key: 'student', label: 'Student' },
          { key: 'property', label: 'Property' },
          { key: 'date', label: 'Date' },
          { key: 'time', label: 'Time' },
          { key: 'status', label: 'Status', render: (r) => <Badge status={r.status} /> },
        ]}
      />
    </ListShell>
  )
}

export function AdminReviews() {
  const { reviews: live } = useApp()
  const rows = live.map((r) => ({
    ...r,
    student: getStudent(r.studentId)?.name,
    property: getProperty(r.propertyId)?.name,
  }))
  return (
    <ListShell title="Reviews & Ratings">
      <SearchableTable
        searchKeys={['student', 'property', 'comment']}
        rows={rows}
        columns={[
          { key: 'property', label: 'Property' },
          { key: 'student', label: 'Student' },
          { key: 'rating', label: 'Rating', render: (r) => `${r.rating}★` },
          { key: 'comment', label: 'Comment' },
          { key: 'date', label: 'Date' },
        ]}
      />
    </ListShell>
  )
}

export function AdminRooms() {
  const { roomInventory } = useApp()
  return (
    <ListShell title="Room Inventory">
      <div className="space-y-4">
        {roomInventory.map((block) => {
          const prop = getProperty(block.propertyId)
          return (
            <div key={block.propertyId} className="rounded-2xl border border-border bg-card p-5 demo-shadow">
              <h3 className="mb-3 font-bold">{prop?.name}</h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {block.rooms.map((room) => (
                  <div key={room.no} className="rounded-xl border border-border p-3">
                    <p className="mb-2 font-semibold">Room {room.no}</p>
                    <div className="flex flex-wrap gap-2">
                      {room.beds.map((bed) => (
                        <span
                          key={bed.id}
                          className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${
                            bed.status === 'available'
                              ? 'bg-emerald-100 text-emerald-700'
                              : bed.status === 'reserved'
                                ? 'bg-amber-100 text-amber-700'
                                : 'bg-rose-100 text-rose-700'
                          }`}
                        >
                          Bed {bed.id}: {bed.status}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </ListShell>
  )
}

export function AdminSettings() {
  return (
    <ListShell title="Settings">
      <div className="max-w-xl space-y-4 rounded-2xl border border-border bg-card p-6 demo-shadow">
        <label className="block text-sm">
          <span className="mb-1 block font-medium">Platform Name</span>
          <input defaultValue="StayNest" className="w-full rounded-xl border border-border bg-bg px-3 py-2" />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium">Support Email</span>
          <input defaultValue="hello@staynest.co" className="w-full rounded-xl border border-border bg-bg px-3 py-2" />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium">Default City</span>
          <input defaultValue="Jaipur" className="w-full rounded-xl border border-border bg-bg px-3 py-2" />
        </label>
        <button type="button" onClick={() => toast.success('Settings saved (demo)')} className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white">
          Save Changes
        </button>
      </div>
    </ListShell>
  )
}
