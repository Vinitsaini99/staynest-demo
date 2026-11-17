import { Building2, BedDouble, IndianRupee, AlertCircle } from 'lucide-react'
import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Link } from 'react-router-dom'
import DashboardShell from '../../components/layout/DashboardShell'
import Badge from '../../components/common/Badge'
import { ownerNav } from './ownerNav'
import {
  bookings, formatINR, getProperty, getStudent, ownerOccupancyChart, ownerRevenueChart, payments, reviews,
} from '../../data/mockData'
import { useApp } from '../../context/AppContext'

export default function OwnerDashboard() {
  const { currentOwnerId, properties } = useApp()
  const mine = properties.filter((p) => p.ownerId === currentOwnerId)
  const myIds = new Set(mine.map((p) => p.id))
  const myBookings = bookings.filter((b) => myIds.has(b.propertyId))
  const pending = myBookings.filter((b) => b.status === 'Pending')
  const checkIns = myBookings.filter((b) => b.status === 'Confirmed').slice(0, 4)
  const pendingRent = payments.filter((p) => myIds.has(p.propertyId) && p.status !== 'Paid')
  const myReviews = reviews.filter((r) => myIds.has(r.propertyId)).slice(0, 3)

  return (
    <DashboardShell title="Property Overview" items={ownerNav}>
      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Portfolio snapshot</p>
          <div className="mt-5 grid gap-6 sm:grid-cols-2">
            <Metric label="Properties" value="8" icon={Building2} />
            <Metric label="Total beds" value="240" icon={BedDouble} />
            <Metric label="Occupied" value="196" sub="82% occupancy" />
            <Metric label="Available" value="44" sub="Ready to book" />
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-primary p-6 text-white">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">Collections</p>
          <p className="mt-4 font-heading text-3xl font-bold">{formatINR(875000)}</p>
          <p className="mt-1 text-sm text-white/55">Monthly collection</p>
          <div className="mt-6 flex items-center gap-2 rounded-xl bg-white/8 px-3 py-3 text-sm">
            <AlertCircle size={15} className="text-accent" />
            Pending payments {formatINR(65000)}
          </div>
          <Link to="/owner/payments" className="mt-4 inline-block text-sm font-semibold text-accent">Open rent collection →</Link>
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Panel title="Bed occupancy" sub="Occupancy rate trend">
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ownerOccupancyChart}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EAE8E0" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#858B85' }} axisLine={false} tickLine={false} />
                <YAxis domain={[60, 100]} tick={{ fontSize: 12, fill: '#858B85' }} axisLine={false} tickLine={false} />
                <Tooltip formatter={(v) => `${v}%`} />
                <Line type="monotone" dataKey="rate" stroke="#244E43" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <Link to="/owner/rooms" className="mt-3 inline-block text-xs font-semibold text-secondary">Open bed visualizer →</Link>
        </Panel>
        <Panel title="Revenue analytics" sub="Owner collections">
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ownerRevenueChart}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EAE8E0" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#858B85' }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={(v) => `${v / 1000}k`} tick={{ fontSize: 12, fill: '#858B85' }} axisLine={false} tickLine={false} />
                <Tooltip formatter={(v) => formatINR(v)} />
                <Area type="monotone" dataKey="revenue" stroke="#173B35" fill="#C7A46A33" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Panel title="Booking requests">
          {pending.length === 0 && <p className="text-sm text-muted">No pending requests</p>}
          {pending.map((b) => (
            <Row key={b.id} title={getStudent(b.studentId)?.name} sub={`${getProperty(b.propertyId)?.name} · ${b.roomType}`} right={<Badge status={b.status} />} />
          ))}
          <Link to="/owner/bookings" className="mt-2 inline-block text-xs font-semibold text-secondary">Review all →</Link>
        </Panel>
        <Panel title="Upcoming check-ins">
          {checkIns.map((b) => (
            <Row key={b.id} title={getStudent(b.studentId)?.name} sub={`Room ${b.roomNo} · Bed ${b.bed}`} right={<span className="text-xs text-muted">{b.checkIn}</span>} />
          ))}
        </Panel>
        <Panel title="Reviews">
          {myReviews.map((r) => (
            <Row key={r.id} title={`${r.rating}★ · ${getStudent(r.studentId)?.name}`} sub={r.comment} />
          ))}
          <div className="mt-3 flex gap-3 text-xs font-semibold">
            <Link to="/owner/students" className="text-secondary">Student records →</Link>
            <Link to="/owner/maintenance" className="text-secondary">Maintenance →</Link>
          </div>
        </Panel>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-card p-5">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-heading text-lg font-bold">Rent collection</h3>
          <IndianRupee size={16} className="text-secondary" />
        </div>
        <div className="space-y-2">
          {pendingRent.map((p) => (
            <Row key={p.id} title={getStudent(p.studentId)?.name} sub={getProperty(p.propertyId)?.name} right={<span className="text-sm font-semibold">{formatINR(p.amount)}</span>} />
          ))}
        </div>
      </div>
    </DashboardShell>
  )
}

function Metric({ label, value, sub, icon: Icon }) {
  return (
    <div>
      <div className="flex items-center gap-2 text-muted">
        {Icon && <Icon size={14} />}
        <p className="text-xs font-medium uppercase tracking-wide">{label}</p>
      </div>
      <p className="mt-2 font-heading text-3xl font-bold">{value}</p>
      {sub && <p className="mt-1 text-xs text-muted">{sub}</p>}
    </div>
  )
}

function Panel({ title, sub, children }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h3 className="font-heading text-lg font-bold">{title}</h3>
      {sub && <p className="text-sm text-muted">{sub}</p>}
      <div className="mt-4 space-y-3">{children}</div>
    </div>
  )
}

function Row({ title, sub, right }) {
  return (
    <div className="flex items-start justify-between gap-2 border-b border-border/70 pb-3 last:border-0 last:pb-0">
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold">{title}</p>
        <p className="truncate text-xs text-muted">{sub}</p>
      </div>
      {right}
    </div>
  )
}
