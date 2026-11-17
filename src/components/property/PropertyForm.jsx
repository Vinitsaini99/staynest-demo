import { useState } from 'react'
import { AMENITIES } from '../../data/mockData'
import toast from 'react-hot-toast'

const steps = ['Basic Information', 'Amenities', 'Room Configuration', 'Media Upload', 'Rules & Policies']

const empty = {
  name: '',
  type: 'PG',
  category: 'Boys PG',
  description: '',
  address: '',
  city: 'Jaipur',
  locality: 'Mansarovar',
  amenities: [],
  rooms: [
    { type: 'Single Sharing', quantity: 4, available: 4, rent: 12000, deposit: 12000 },
    { type: 'Double Sharing', quantity: 10, available: 10, rent: 8500, deposit: 8500 },
  ],
  images: [],
  rules: { entry: '10:00 PM', visitor: 'Allowed till 8 PM', food: 'Veg meals', cancellation: '7 days notice' },
  priceFrom: 8500,
  gender: 'Boys',
  ownerId: 'o1',
}

export default function PropertyForm({ onSubmit, onCancel }) {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState(empty)

  const next = () => {
    if (step === 0 && !form.name.trim()) {
      toast.error('Property name is required')
      return
    }
    setStep((s) => Math.min(s + 1, steps.length - 1))
  }

  const toggleAmenity = (a) => {
    setForm((f) => ({
      ...f,
      amenities: f.amenities.includes(a) ? f.amenities.filter((x) => x !== a) : [...f.amenities, a],
    }))
  }

  const submit = () => {
    onSubmit({
      ...form,
      images: form.images.length
        ? form.images
        : ['https://images.unsplash.com/photo-1522700172939-e31fe73f2fb2?auto=format&fit=crop&w=800&h=600&q=80'],
      priceFrom: Math.min(...form.rooms.map((r) => r.rent)),
    })
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-5 demo-shadow">
      <div className="mb-6 flex flex-wrap gap-2">
        {steps.map((s, i) => (
          <button
            key={s}
            type="button"
            onClick={() => setStep(i)}
            className={`rounded-full px-3 py-1 text-xs font-semibold ${i === step ? 'bg-primary text-white' : i < step ? 'bg-accent/30 text-primary' : 'bg-bg text-muted'}`}
          >
            {i + 1}. {s}
          </button>
        ))}
      </div>

      {step === 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Property Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
          <label className="text-sm">
            <span className="mb-1 block font-medium">Property Type</span>
            <select className="w-full rounded-xl border border-border bg-bg px-3 py-2" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
              <option>PG</option>
              <option>Hostel</option>
            </select>
          </label>
          <label className="text-sm sm:col-span-2">
            <span className="mb-1 block font-medium">Description</span>
            <textarea className="w-full rounded-xl border border-border bg-bg px-3 py-2" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </label>
          <Field label="Address" value={form.address} onChange={(v) => setForm({ ...form, address: v })} />
          <Field label="City" value={form.city} onChange={(v) => setForm({ ...form, city: v })} />
          <Field label="Locality" value={form.locality} onChange={(v) => setForm({ ...form, locality: v })} />
          <div className="rounded-xl border border-dashed border-border bg-bg p-4 text-sm text-muted sm:col-span-2">
            Google Maps location placeholder — pin drop UI (demo)
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {AMENITIES.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => toggleAmenity(a)}
              className={`rounded-xl border px-3 py-3 text-sm font-medium ${form.amenities.includes(a) ? 'border-primary bg-primary text-white' : 'border-border bg-bg'}`}
            >
              {a}
            </button>
          ))}
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          {form.rooms.map((room, idx) => (
            <div key={room.type} className="grid gap-3 rounded-xl border border-border p-4 sm:grid-cols-5">
              <div className="sm:col-span-5 font-semibold">{room.type}</div>
              {['quantity', 'available', 'rent', 'deposit'].map((key) => (
                <label key={key} className="text-sm">
                  <span className="mb-1 block capitalize text-muted">{key}</span>
                  <input
                    type="number"
                    className="w-full rounded-xl border border-border bg-bg px-3 py-2"
                    value={room[key]}
                    onChange={(e) => {
                      const rooms = [...form.rooms]
                      rooms[idx] = { ...rooms[idx], [key]: Number(e.target.value) }
                      setForm({ ...form, rooms })
                    }}
                  />
                </label>
              ))}
            </div>
          ))}
        </div>
      )}

      {step === 3 && (
        <div className="space-y-3">
          <p className="text-sm text-muted">Paste image URLs or use demo placeholders.</p>
          <Field
            label="Property Image URL"
            value={form.images[0] || ''}
            onChange={(v) => setForm({ ...form, images: v ? [v, ...(form.images.slice(1) || [])] : [] })}
          />
          <div className="grid gap-3 sm:grid-cols-3">
            {['Gallery', 'Room Photos', 'Common Area'].map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => toast.success(`${label} upload simulated`)}
                className="rounded-2xl border border-dashed border-border bg-bg px-4 py-10 text-sm font-medium text-muted hover:border-secondary"
              >
                + {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {Object.keys(form.rules).map((key) => (
            <Field
              key={key}
              label={key.replace(/([A-Z])/g, ' $1')}
              value={form.rules[key]}
              onChange={(v) => setForm({ ...form, rules: { ...form.rules, [key]: v } })}
            />
          ))}
        </div>
      )}

      <div className="mt-6 flex flex-wrap justify-between gap-3">
        <button type="button" onClick={onCancel} className="rounded-xl border border-border px-4 py-2 text-sm font-semibold">
          Cancel
        </button>
        <div className="flex gap-2">
          {step > 0 && (
            <button type="button" onClick={() => setStep((s) => s - 1)} className="rounded-xl border border-border px-4 py-2 text-sm font-semibold">
              Back
            </button>
          )}
          {step < steps.length - 1 ? (
            <button type="button" onClick={next} className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white">
              Continue
            </button>
          ) : (
            <button type="button" onClick={submit} className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-primary">
              Submit Property
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function Field({ label, value, onChange }) {
  return (
    <label className="text-sm">
      <span className="mb-1 block font-medium capitalize">{label}</span>
      <input className="w-full rounded-xl border border-border bg-bg px-3 py-2 outline-none focus:border-secondary" value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  )
}
