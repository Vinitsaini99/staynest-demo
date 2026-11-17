import { useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { CheckCircle2, CreditCard, Landmark, Smartphone } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { formatINR } from '../../data/mockData'
import toast from 'react-hot-toast'

const steps = [
  'Room Type', 'Select Bed', 'Student Info', 'Payment Plan', 'Review', 'Payment', 'Success',
]

const beds = [
  { roomNo: '101', bed: 'A', status: 'occupied' },
  { roomNo: '101', bed: 'B', status: 'available' },
  { roomNo: '102', bed: 'A', status: 'available' },
  { roomNo: '102', bed: 'B', status: 'reserved' },
  { roomNo: '201', bed: 'A', status: 'available' },
]

export default function BookingWizard() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const { properties, addBooking, currentStudentId } = useApp()
  const propertyId = params.get('propertyId') || 'p1'
  const property = properties.find((p) => p.id === propertyId) || properties[0]

  const [step, setStep] = useState(0)
  const [roomType, setRoomType] = useState(params.get('roomType') || property.rooms[0]?.type)
  const [bed, setBed] = useState(null)
  const [info, setInfo] = useState({ name: 'Arjun Patel', phone: '+91 90000 11111', email: 'arjun.p@gmail.com', college: 'MNIT Jaipur', gender: 'Male' })
  const [plan, setPlan] = useState(params.get('plan') || 'Monthly')
  const [moveIn, setMoveIn] = useState(params.get('moveIn') || '')
  const [method, setMethod] = useState('UPI')
  const [booking, setBooking] = useState(null)

  const room = useMemo(() => property.rooms.find((r) => r.type === roomType) || property.rooms[0], [property, roomType])
  const mult = plan === 'Yearly' ? 12 : plan === 'Half-yearly' ? 6 : plan === 'Quarterly' ? 3 : 1
  const discount = plan === 'Yearly' ? 0.1 : plan === 'Half-yearly' ? 0.06 : plan === 'Quarterly' ? 0.03 : 0
  const rent = Math.round(room.rent * mult * (1 - discount))
  const total = rent + room.deposit + 199

  const next = () => {
    if (step === 0 && !roomType) return toast.error('Select a room type')
    if (step === 1 && !bed) return toast.error('Select an available bed')
    if (step === 2 && (!info.name || !info.phone)) return toast.error('Complete student information')
    if (step === 4 && !moveIn) return toast.error('Add check-in date')
    setStep((s) => Math.min(s + 1, steps.length - 1))
  }

  const pay = () => {
    const created = addBooking({
      propertyId: property.id,
      studentId: currentStudentId,
      roomType,
      roomNo: bed.roomNo,
      bed: bed.bed,
      amount: total,
      checkIn: moveIn || new Date().toISOString().slice(0, 10),
      paymentPlan: plan,
    })
    setBooking(created)
    setStep(6)
  }

  if (step === 6 && booking) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <CheckCircle2 className="mx-auto text-emerald-600" size={56} />
        <h1 className="mt-4 text-3xl font-extrabold">Booking Confirmed!</h1>
        <p className="mt-2 text-muted">Demo payment successful — no real charge was made.</p>
        <div className="mt-6 space-y-2 rounded-3xl border border-border bg-card p-5 text-left text-sm">
          <Row label="Booking ID" value={booking.id.toUpperCase()} />
          <Row label="Property" value={property.name} />
          <Row label="Room" value={booking.roomNo} />
          <Row label="Bed" value={booking.bed} />
          <Row label="Amount paid" value={formatINR(booking.amount)} />
          <Row label="Check-in" value={booking.checkIn} />
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to="/student/dashboard" className="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white">Go to Dashboard</Link>
          <button type="button" onClick={() => navigate('/student/home')} className="rounded-xl border border-border px-4 py-2.5 text-sm font-semibold">Back Home</button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 pb-24">
      <h1 className="text-2xl font-extrabold">Book {property.name}</h1>
      <p className="text-sm text-muted">{property.locality}, Jaipur</p>

      <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
        {steps.slice(0, 6).map((s, i) => (
          <div key={s} className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${i === step ? 'bg-primary text-white' : i < step ? 'bg-accent/30 text-primary' : 'bg-bg text-muted'}`}>
            {i + 1}. {s}
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-3xl border border-border bg-card p-5 demo-shadow">
        {step === 0 && (
          <div className="grid gap-3 sm:grid-cols-2">
            {property.rooms.map((r) => (
              <button key={r.type} type="button" onClick={() => setRoomType(r.type)} className={`rounded-2xl border p-4 text-left ${roomType === r.type ? 'border-primary bg-primary/5' : 'border-border'}`}>
                <p className="font-bold">{r.type}</p>
                <p className="text-sm text-muted">{r.available} available</p>
                <p className="mt-2 font-semibold text-secondary">{formatINR(r.rent)}/mo</p>
              </button>
            ))}
          </div>
        )}

        {step === 1 && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {beds.map((b) => (
              <button
                key={`${b.roomNo}-${b.bed}`}
                type="button"
                disabled={b.status !== 'available'}
                onClick={() => setBed(b)}
                className={`rounded-2xl border p-4 text-sm font-semibold disabled:opacity-40 ${
                  bed?.roomNo === b.roomNo && bed?.bed === b.bed ? 'border-primary bg-primary text-white' : 'border-border'
                }`}
              >
                Room {b.roomNo} · Bed {b.bed}
                <div className="mt-1 text-[11px] capitalize opacity-80">{b.status}</div>
              </button>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-3 sm:grid-cols-2">
            {Object.entries(info).map(([k, v]) => (
              <label key={k} className="text-sm">
                <span className="mb-1 block capitalize font-medium">{k}</span>
                <input className="w-full rounded-xl border border-border bg-bg px-3 py-2" value={v} onChange={(e) => setInfo({ ...info, [k]: e.target.value })} />
              </label>
            ))}
          </div>
        )}

        {step === 3 && (
          <div className="grid gap-3 sm:grid-cols-2">
            {['Monthly', 'Quarterly', 'Half-yearly', 'Yearly'].map((p) => (
              <button key={p} type="button" onClick={() => setPlan(p)} className={`rounded-2xl border p-4 text-left font-semibold ${plan === p ? 'border-primary bg-primary text-white' : 'border-border'}`}>
                {p}
              </button>
            ))}
            <label className="text-sm sm:col-span-2">
              <span className="mb-1 block font-medium">Check-in date</span>
              <input type="date" className="w-full rounded-xl border border-border bg-bg px-3 py-2" value={moveIn} onChange={(e) => setMoveIn(e.target.value)} />
            </label>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-2 text-sm">
            <Row label="Property" value={property.name} />
            <Row label="Room type" value={roomType} />
            <Row label="Room / Bed" value={bed ? `${bed.roomNo} / ${bed.bed}` : '—'} />
            <Row label="Student" value={info.name} />
            <Row label="Plan" value={plan} />
            <Row label="Check-in" value={moveIn || '—'} />
            <Row label="Rent" value={formatINR(rent)} />
            <Row label="Deposit" value={formatINR(room.deposit)} />
            <Row label="Total" value={formatINR(total)} />
          </div>
        )}

        {step === 5 && (
          <div>
            <p className="mb-3 text-sm text-muted">Demo payment only — do not enter real card details.</p>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { id: 'UPI', icon: Smartphone },
                { id: 'Card', icon: CreditCard },
                { id: 'Net Banking', icon: Landmark },
              ].map((m) => (
                <button key={m.id} type="button" onClick={() => setMethod(m.id)} className={`rounded-2xl border p-4 text-sm font-semibold ${method === m.id ? 'border-primary bg-primary text-white' : 'border-border'}`}>
                  <m.icon className="mb-2" size={18} /> {m.id === 'Card' ? 'Credit/Debit Card' : m.id}
                </button>
              ))}
            </div>
            <div className="mt-4 rounded-xl bg-bg p-4 text-sm">
              {method === 'UPI' && <input placeholder="demo@upi" className="w-full rounded-xl border border-border bg-card px-3 py-2" />}
              {method === 'Card' && (
                <div className="space-y-2">
                  <input placeholder="XXXX XXXX XXXX 4242 (demo)" className="w-full rounded-xl border border-border bg-card px-3 py-2" />
                  <div className="grid grid-cols-2 gap-2">
                    <input placeholder="MM/YY" className="rounded-xl border border-border bg-card px-3 py-2" />
                    <input placeholder="CVV" className="rounded-xl border border-border bg-card px-3 py-2" />
                  </div>
                </div>
              )}
              {method === 'Net Banking' && (
                <select className="w-full rounded-xl border border-border bg-card px-3 py-2">
                  <option>HDFC Bank (demo)</option>
                  <option>ICICI Bank (demo)</option>
                  <option>SBI (demo)</option>
                </select>
              )}
            </div>
            <button type="button" onClick={pay} className="mt-4 w-full rounded-xl bg-accent py-3 text-sm font-bold text-primary">
              Pay {formatINR(total)} (Demo)
            </button>
          </div>
        )}
      </div>

      {step < 5 && (
        <div className="mt-4 flex justify-between">
          <button type="button" disabled={step === 0} onClick={() => setStep((s) => s - 1)} className="rounded-xl border border-border px-4 py-2 text-sm font-semibold disabled:opacity-40">
            Back
          </button>
          <button type="button" onClick={next} className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white">
            Continue
          </button>
        </div>
      )}
    </div>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between gap-3 rounded-xl bg-bg px-3 py-2">
      <span className="text-muted">{label}</span>
      <span className="font-semibold text-right">{value}</span>
    </div>
  )
}
