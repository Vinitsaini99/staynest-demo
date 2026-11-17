import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import toast from 'react-hot-toast'
import DashboardShell from '../../components/layout/DashboardShell'
import Badge from '../../components/common/Badge'
import StatCard from '../../components/common/StatCard'
import PropertyForm from '../../components/property/PropertyForm'
import { ownerNav } from './ownerNav'
import { useApp } from '../../context/AppContext'
import {
  bookings, formatINR, getProperty, getStudent, payments, reviews, students, ownerRevenueChart,
} from '../../data/mockData'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import OwnerRooms from './OwnerRooms'

export function OwnerProperties() {
  const { properties, currentOwnerId, addProperty } = useApp()
  const [showForm, setShowForm] = useState(false)
  const mine = properties.filter((p) => p.ownerId === currentOwnerId)

  return (
    <DashboardShell title="My Properties" items={ownerNav}>
      {showForm ? (
        <PropertyForm
          onCancel={() => setShowForm(false)}
          onSubmit={(data) => {
            addProperty({ ...data, ownerId: currentOwnerId })
            setShowForm(false)
          }}
        />
      ) : (
        <>
          <div className="mb-4 flex justify-end">
            <button type="button" onClick={() => setShowForm(true)} className="inline-flex items-center gap-1 rounded-xl bg-accent px-4 py-2 text-sm font-bold text-primary">
              <Plus size={16} /> Add Property
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {mine.map((p) => (
              <div key={p.id} className="overflow-hidden rounded-2xl border border-border bg-card demo-shadow">
                <img src={p.images[0]} alt="" className="h-40 w-full object-cover" />
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold">{p.name}</h3>
                    <Badge status={p.status} />
                  </div>
                  <p className="mt-1 text-sm text-muted">{p.locality} · {p.occupancy}% occupied</p>
                  <p className="mt-2 font-semibold text-secondary">From {formatINR(p.priceFrom)}</p>
                  <Link to={`/student/property/${p.id}`} className="mt-3 inline-block rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-white">
                    Preview
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </DashboardShell>
  )
}

export function OwnerBeds() {
  return <OwnerRooms />
}

export function OwnerBookings() {
  const { bookings: live, updateBookingStatus, currentOwnerId, properties } = useApp()
  const ids = new Set(properties.filter((p) => p.ownerId === currentOwnerId).map((p) => p.id))
  const rows = live.filter((b) => ids.has(b.propertyId) || true).slice(0, 15)

  return (
    <DashboardShell title="Booking Requests" items={ownerNav}>
      <div className="space-y-3">
        {rows.map((b) => (
          <div key={b.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4">
            <div>
              <p className="font-semibold">{getStudent(b.studentId)?.name}</p>
              <p className="text-sm text-muted">{getProperty(b.propertyId)?.name} · {b.roomType} · {b.checkIn}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge status={b.status} />
              {b.status === 'Pending' && (
                <>
                  <button type="button" onClick={() => updateBookingStatus(b.id, 'Confirmed')} className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white">Accept</button>
                  <button type="button" onClick={() => updateBookingStatus(b.id, 'Cancelled')} className="rounded-lg border border-rose-200 px-3 py-1.5 text-xs font-semibold text-rose-600">Decline</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </DashboardShell>
  )
}

export function OwnerStudents() {
  const list = students.slice(0, 12)
  return (
    <DashboardShell title="My Students" items={ownerNav}>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {list.map((s) => (
          <div key={s.id} className="rounded-2xl border border-border bg-card p-4 demo-shadow">
            <p className="font-bold">{s.name}</p>
            <p className="text-sm text-muted">{s.college}</p>
            <p className="mt-2 text-xs text-muted">{s.phone}</p>
            <div className="mt-2"><Badge status={s.status} /></div>
          </div>
        ))}
      </div>
    </DashboardShell>
  )
}

export function OwnerPayments() {
  return (
    <DashboardShell title="Rent Collection" items={ownerNav}>
      <div className="mb-4 grid gap-4 sm:grid-cols-3">
        <StatCard label="Collected" value={formatINR(875000)} accent />
        <StatCard label="Pending" value={formatINR(65000)} />
        <StatCard label="This Month Bookings" value={String(bookings.length)} />
      </div>
      <div className="space-y-3">
        {payments.map((p) => (
          <div key={p.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4">
            <div>
              <p className="font-semibold">{getStudent(p.studentId)?.name}</p>
              <p className="text-sm text-muted">{getProperty(p.propertyId)?.name} · {p.type}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-bold">{formatINR(p.amount)}</span>
              <Badge status={p.status} />
              {p.status !== 'Paid' && (
                <button type="button" onClick={() => toast.success('Payment reminder sent (demo)')} className="rounded-lg border px-3 py-1.5 text-xs font-semibold">Remind</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </DashboardShell>
  )
}

export function OwnerReviews() {
  const { reviews: live, currentOwnerId, properties } = useApp()
  const ids = new Set(properties.filter((p) => p.ownerId === currentOwnerId).map((p) => p.id))
  const rows = live.filter((r) => ids.has(r.propertyId) || true)

  return (
    <DashboardShell title="Reviews" items={ownerNav}>
      <div className="space-y-3">
        {rows.map((r) => (
          <div key={r.id} className="rounded-2xl border border-border bg-card p-4">
            <div className="flex items-center justify-between gap-2">
              <p className="font-semibold">{getProperty(r.propertyId)?.name}</p>
              <span className="text-sm font-bold text-accent">{r.rating}★</span>
            </div>
            <p className="mt-1 text-sm text-muted">{getStudent(r.studentId)?.name} · {r.date}</p>
            <p className="mt-2 text-sm">{r.comment}</p>
          </div>
        ))}
      </div>
    </DashboardShell>
  )
}

export function OwnerExpenses() {
  const items = [
    { id: 1, title: 'Housekeeping staff', amount: 28000, date: '2025-11-01' },
    { id: 2, title: 'Electricity bill', amount: 18500, date: '2025-11-05' },
    { id: 3, title: 'Wi-Fi & internet', amount: 4500, date: '2025-11-03' },
    { id: 4, title: 'Maintenance & repairs', amount: 9200, date: '2025-11-08' },
  ]
  return (
    <DashboardShell title="Expenses" items={ownerNav}>
      <div className="mb-4">
        <button type="button" onClick={() => toast.success('Expense added (demo)')} className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white">Add Expense</button>
      </div>
      <div className="space-y-3">
        {items.map((i) => (
          <div key={i.id} className="flex items-center justify-between rounded-2xl border border-border bg-card p-4">
            <div>
              <p className="font-semibold">{i.title}</p>
              <p className="text-xs text-muted">{i.date}</p>
            </div>
            <p className="font-bold text-rose-600">-{formatINR(i.amount)}</p>
          </div>
        ))}
      </div>
    </DashboardShell>
  )
}

export function OwnerMaintenance() {
  const items = [
    { id: 1, room: '101', issue: 'AC not cooling', status: 'Open' },
    { id: 2, room: '204', issue: 'Leaky tap', status: 'Pending' },
    { id: 3, room: '112', issue: 'Wi-Fi router reset', status: 'Completed' },
  ]
  return (
    <DashboardShell title="Maintenance Requests" items={ownerNav}>
      <div className="space-y-3">
        {items.map((i) => (
          <div key={i.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4">
            <div>
              <p className="font-semibold">Room {i.room}</p>
              <p className="text-sm text-muted">{i.issue}</p>
            </div>
            <div className="flex gap-2">
              <Badge status={i.status} />
              <button type="button" onClick={() => toast.success('Marked in progress (demo)')} className="rounded-lg border px-3 py-1.5 text-xs font-semibold">Update</button>
            </div>
          </div>
        ))}
      </div>
    </DashboardShell>
  )
}

export function OwnerReports() {
  return (
    <DashboardShell title="Reports" items={ownerNav}>
      <div className="rounded-2xl border border-border bg-card p-5 demo-shadow">
        <h3 className="mb-4 font-bold">Revenue Report</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={ownerRevenueChart}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E7EBE7" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(v) => `${v / 1000}k`} />
              <Tooltip formatter={(v) => formatINR(v)} />
              <Area type="monotone" dataKey="revenue" stroke="#173B35" fill="#245C5044" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <button type="button" onClick={() => toast.success('Owner report downloaded (demo)')} className="mt-4 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white">
          Download PDF
        </button>
      </div>
    </DashboardShell>
  )
}

export function OwnerProfile() {
  return (
    <DashboardShell title="Profile Settings" items={ownerNav}>
      <div className="max-w-xl space-y-4 rounded-2xl border border-border bg-card p-6">
        <label className="block text-sm">
          <span className="mb-1 block font-medium">Full Name</span>
          <input defaultValue="Rajesh Sharma" className="w-full rounded-xl border border-border bg-bg px-3 py-2" />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium">Email</span>
          <input defaultValue="rajesh@staynest.in" className="w-full rounded-xl border border-border bg-bg px-3 py-2" />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium">Phone</span>
          <input defaultValue="+91 98290 11223" className="w-full rounded-xl border border-border bg-bg px-3 py-2" />
        </label>
        <button type="button" onClick={() => toast.success('Profile updated (demo)')} className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white">
          Save Profile
        </button>
      </div>
    </DashboardShell>
  )
}
