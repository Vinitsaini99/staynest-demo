import { Building2, Users, GraduationCap, CalendarCheck, IndianRupee, CheckCircle } from 'lucide-react'
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts'
import { Link } from 'react-router-dom'
import DashboardShell from '../../components/layout/DashboardShell'
import Badge from '../../components/common/Badge'
import { adminNav } from './adminNav'
import {
  bookingChart, bookings, formatINR, getOwner, getProperty, getStudent, inquiries, revenueChart,
} from '../../data/mockData'
import { useApp } from '../../context/AppContext'

export default function AdminDashboard() {
  const { updatePropertyStatus, properties } = useApp()
  const pending = properties.filter((p) => p.status === 'Pending')
  const recentBookings = bookings.slice(0, 6)
  const activities = [
    ...inquiries.slice(0, 3).map((i) => ({ id: i.id, title: `Inquiry from ${i.student}`, meta: i.property, time: i.date })),
    ...pending.slice(0, 2).map((p) => ({ id: p.id, title: `Approval needed`, meta: p.name, time: 'Pending' })),
  ]

  return (
    <DashboardShell title="Overview" items={adminNav}>
      {/* KPI strip — editorial, not generic card grid overload */}
      <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 xl:grid-cols-5">
        {[
          { label: 'Total Properties', value: '248', icon: Building2 },
          { label: 'Active Owners', value: '86', icon: Users },
          { label: 'Registered Students', value: '3,420', icon: GraduationCap },
          { label: 'Total Bookings', value: '1,284', icon: CalendarCheck },
          { label: 'Monthly Revenue', value: formatINR(1845000), icon: IndianRupee, accent: true },
        ].map((k) => (
          <div key={k.label} className={`bg-card p-5 ${k.accent ? 'bg-primary text-white' : ''}`}>
            <div className="flex items-center justify-between">
              <p className={`text-[12px] font-medium ${k.accent ? 'text-white/60' : 'text-muted'}`}>{k.label}</p>
              <k.icon size={16} className={k.accent ? 'text-accent' : 'text-secondary'} />
            </div>
            <p className="mt-3 font-heading text-2xl font-bold tracking-tight">{k.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <div className="rounded-2xl border border-border bg-card p-5 md:p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="font-heading text-lg font-bold">Revenue overview</h3>
              <p className="text-sm text-muted">Platform collections · last 6 months</p>
            </div>
            <Link to="/admin/analytics" className="text-xs font-semibold text-secondary">Open analytics</Link>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueChart}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EAE8E0" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#858B85' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#858B85' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 100000}L`} />
                <Tooltip formatter={(v) => formatINR(v)} />
                <Area type="monotone" dataKey="revenue" stroke="#173B35" fill="#173B3512" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 md:p-6">
          <h3 className="font-heading text-lg font-bold">Booking trends</h3>
          <p className="text-sm text-muted">Confirmed booking volume</p>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bookingChart}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EAE8E0" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#858B85' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#858B85' }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="bookings" fill="#C7A46A" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5 md:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-heading text-lg font-bold">Pending approvals</h3>
            <Link to="/admin/properties" className="text-xs font-semibold text-secondary">Manage</Link>
          </div>
          <div className="divide-y divide-border">
            {pending.length === 0 && <p className="py-6 text-sm text-muted">No properties awaiting review.</p>}
            {pending.map((p) => (
              <div key={p.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
                <div className="flex items-center gap-3">
                  <img src={p.images[0]} alt="" className="h-12 w-14 rounded-lg object-cover" />
                  <div>
                    <p className="text-sm font-semibold">{p.name}</p>
                    <p className="text-xs text-muted">{p.locality} · {getOwner(p.ownerId)?.name}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => updatePropertyStatus(p.id, 'Approved')} className="inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-white">
                    <CheckCircle size={12} /> Approve
                  </button>
                  <button type="button" onClick={() => updatePropertyStatus(p.id, 'Rejected')} className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold">
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 md:p-6">
          <h3 className="font-heading text-lg font-bold">Recent activities</h3>
          <div className="mt-4 space-y-3">
            {activities.map((a) => (
              <div key={a.id} className="flex items-start justify-between gap-3 rounded-xl bg-bg px-3 py-3">
                <div>
                  <p className="text-sm font-semibold">{a.title}</p>
                  <p className="text-xs text-muted">{a.meta}</p>
                </div>
                <span className="text-[11px] text-muted">{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-card p-5 md:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-heading text-lg font-bold">Recent bookings</h3>
          <Link to="/admin/bookings" className="text-xs font-semibold text-secondary">View all</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-[11px] uppercase tracking-wide text-muted">
                <th className="pb-3 font-semibold">Booking</th>
                <th className="pb-3 font-semibold">Student</th>
                <th className="pb-3 font-semibold">Property</th>
                <th className="pb-3 font-semibold">Amount</th>
                <th className="pb-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((b) => (
                <tr key={b.id} className="border-b border-border/70">
                  <td className="py-3.5 font-medium">{b.id.toUpperCase()}</td>
                  <td className="py-3.5">{getStudent(b.studentId)?.name}</td>
                  <td className="py-3.5">{getProperty(b.propertyId)?.name}</td>
                  <td className="py-3.5">{formatINR(b.amount)}</td>
                  <td className="py-3.5"><Badge status={b.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardShell>
  )
}
