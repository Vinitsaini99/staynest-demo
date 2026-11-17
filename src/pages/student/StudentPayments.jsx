import { Link } from 'react-router-dom'
import Badge from '../../components/common/Badge'
import { formatINR, getProperty, payments } from '../../data/mockData'
import { useApp } from '../../context/AppContext'
import toast from 'react-hot-toast'

export default function StudentPayments() {
  const { currentStudentId } = useApp()
  const rows = payments.filter((p) => p.studentId === currentStudentId || true)

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 pb-24">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold">Payments</h1>
          <p className="text-sm text-muted">Rent history and upcoming dues</p>
        </div>
        <Link to="/student/dashboard" className="text-sm font-semibold text-secondary">Dashboard</Link>
      </div>
      <div className="space-y-3">
        {rows.map((p) => (
          <div key={p.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4">
            <div>
              <p className="font-semibold">{getProperty(p.propertyId)?.name}</p>
              <p className="text-sm text-muted">{p.type} · {p.method} · {p.date}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-bold">{formatINR(p.amount)}</span>
              <Badge status={p.status} />
              {p.status !== 'Paid' && (
                <button type="button" onClick={() => toast.success('Demo payment completed')} className="rounded-lg bg-accent px-3 py-1.5 text-xs font-bold text-primary">
                  Pay Now
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
