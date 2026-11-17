import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  Heart, MapPin, Star, Wifi, Wind, Utensils, Shirt, Car, Cctv, Zap, Dumbbell, Sparkles, BadgeCheck,
} from 'lucide-react'
import Modal from '../../components/common/Modal'
import SiteFooter from '../../components/common/SiteFooter'
import { useApp } from '../../context/AppContext'
import { formatINR, getOwner, getStudent } from '../../data/mockData'
import toast from 'react-hot-toast'

const amenityIcons = {
  'Wi-Fi': Wifi, AC: Wind, Meals: Utensils, Laundry: Shirt, Parking: Car, CCTV: Cctv,
  'Power Backup': Zap, Gym: Dumbbell, Housekeeping: Sparkles,
}

const plans = [
  { id: 'Monthly', mult: 1, label: 'Monthly' },
  { id: 'Quarterly', mult: 3, label: 'Quarterly', discount: 0.03 },
  { id: 'Half-yearly', mult: 6, label: 'Half-yearly', discount: 0.06 },
  { id: 'Yearly', mult: 12, label: 'Yearly', discount: 0.1 },
]

export default function PropertyDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { properties, favourites, toggleFavourite, reviews, scheduleTour, currentStudentId } = useApp()
  const property = properties.find((p) => p.id === id)
  const [img, setImg] = useState(0)
  const [roomType, setRoomType] = useState(property?.rooms?.[0]?.type || '')
  const [plan, setPlan] = useState('Monthly')
  const [moveIn, setMoveIn] = useState('')
  const [tourOpen, setTourOpen] = useState(false)
  const [tourDate, setTourDate] = useState('')
  const [tourTime, setTourTime] = useState('11:00 AM')

  const room = useMemo(() => property?.rooms.find((r) => r.type === roomType) || property?.rooms[0], [property, roomType])
  const planObj = plans.find((p) => p.id === plan)
  const rentTotal = room ? Math.round(room.rent * planObj.mult * (1 - (planObj.discount || 0))) : 0
  const deposit = room?.deposit || 0
  const propertyReviews = reviews.filter((r) => r.propertyId === id)
  const owner = property ? getOwner(property.ownerId) : null

  if (!property) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h2 className="font-heading text-2xl font-bold">Property not found</h2>
        <Link to="/student/search" className="mt-4 inline-block text-secondary">Back to explore</Link>
      </div>
    )
  }

  const liked = favourites.includes(property.id)

  return (
    <div className="pb-24 md:pb-0">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-10">
        <div className="grid gap-2 md:grid-cols-4 md:grid-rows-2 md:gap-3">
          <div className="img-zoom overflow-hidden rounded-2xl md:col-span-2 md:row-span-2">
            <img src={property.images[img]} alt="" className="h-72 w-full object-cover md:h-full" />
          </div>
          {property.images.slice(0, 4).map((src, i) => (
            <button key={src + i} type="button" onClick={() => setImg(i)} className={`img-zoom overflow-hidden rounded-xl ${img === i ? 'ring-2 ring-primary' : ''}`}>
              <img src={src} alt="" className="h-28 w-full object-cover md:h-40" />
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="mb-3 flex flex-wrap gap-2">
                  {property.verified && <span className="rounded-md bg-primary/8 px-2.5 py-1 text-[11px] font-semibold text-primary">Verified stay</span>}
                  <span className="rounded-md bg-bg px-2.5 py-1 text-[11px] font-semibold text-muted">{property.category}</span>
                </div>
                <h1 className="font-heading text-3xl font-bold md:text-4xl">{property.name}</h1>
                <p className="mt-2 flex items-center gap-1 text-muted"><MapPin size={15} /> {property.address}</p>
                <p className="mt-3 inline-flex items-center gap-1 text-sm font-semibold">
                  <Star size={14} className="fill-accent text-accent" /> {property.rating} · {property.reviewsCount} reviews
                </p>
              </div>
              <button type="button" onClick={() => toggleFavourite(property.id)} className={`rounded-xl border px-3 py-2 text-sm font-semibold ${liked ? 'border-accent bg-accent/15' : 'border-border'}`}>
                <Heart size={14} className="mr-1 inline" fill={liked ? 'currentColor' : 'none'} /> Save
              </button>
            </div>

            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted md:text-base">{property.description}</p>

            <h3 className="mt-10 font-heading text-xl font-bold">Amenities</h3>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {property.amenities.map((a) => {
                const Icon = amenityIcons[a] || BadgeCheck
                return (
                  <div key={a} className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5 text-sm">
                    <Icon size={15} className="text-secondary" /> {a}
                  </div>
                )
              })}
            </div>

            <h3 className="mt-10 font-heading text-xl font-bold">Room options</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {property.rooms.map((r) => (
                <button
                  key={r.type}
                  type="button"
                  onClick={() => setRoomType(r.type)}
                  className={`rounded-2xl border p-4 text-left transition ${roomType === r.type ? 'border-primary bg-primary/5' : 'border-border bg-card'}`}
                >
                  <p className="font-heading font-bold">{r.type}</p>
                  <p className="mt-1 text-sm text-muted">{r.available} beds available</p>
                  <p className="mt-2 font-semibold text-secondary">{formatINR(r.rent)}/mo</p>
                </button>
              ))}
            </div>

            <h3 className="mt-10 font-heading text-xl font-bold">House rules</h3>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {Object.entries(property.rules).map(([k, v]) => (
                <div key={k} className="rounded-xl border border-border px-3 py-2.5 text-sm">
                  <span className="capitalize text-muted">{k}: </span>
                  <span className="font-medium">{v}</span>
                </div>
              ))}
            </div>

            <h3 className="mt-10 font-heading text-xl font-bold">Location</h3>
            <div className="mt-4 flex h-44 items-center justify-center rounded-2xl border border-dashed border-border bg-bg text-sm text-muted">
              Map preview · {property.locality}, Jaipur
            </div>

            <h3 className="mt-10 font-heading text-xl font-bold">Owner</h3>
            <div className="mt-4 flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                {owner?.name?.split(' ').map((n) => n[0]).join('')}
              </div>
              <div>
                <p className="font-semibold">{owner?.name}</p>
                <p className="text-sm text-muted">{owner?.phone}</p>
              </div>
            </div>

            <h3 className="mt-10 font-heading text-xl font-bold">Reviews</h3>
            <div className="mt-4 space-y-3">
              {propertyReviews.length === 0 && <p className="text-sm text-muted">No reviews yet.</p>}
              {propertyReviews.map((r) => (
                <div key={r.id} className="rounded-2xl border border-border p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{getStudent(r.studentId)?.name}</p>
                    <span className="text-sm font-bold text-accent">{r.rating}★</span>
                  </div>
                  <p className="mt-2 text-sm text-muted">{r.comment}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-border bg-card p-5">
              <p className="font-heading text-2xl font-bold text-primary">
                {formatINR(room?.rent || property.priceFrom)}
                <span className="ml-1 text-sm font-medium text-muted">/ month</span>
              </p>
              <p className="text-xs text-muted">Security deposit {formatINR(deposit)}</p>

              <label className="mt-5 block text-sm">
                <span className="mb-1.5 block font-medium">Room type</span>
                <select className="w-full rounded-xl border border-border bg-bg px-3 py-2.5" value={roomType} onChange={(e) => setRoomType(e.target.value)}>
                  {property.rooms.map((r) => <option key={r.type}>{r.type}</option>)}
                </select>
              </label>
              <label className="mt-3 block text-sm">
                <span className="mb-1.5 block font-medium">Move-in date</span>
                <input type="date" className="w-full rounded-xl border border-border bg-bg px-3 py-2.5" value={moveIn} onChange={(e) => setMoveIn(e.target.value)} />
              </label>

              <p className="mb-2 mt-4 text-sm font-medium">Payment plan</p>
              <div className="grid grid-cols-2 gap-2">
                {plans.map((p) => (
                  <button key={p.id} type="button" onClick={() => setPlan(p.id)} className={`rounded-xl border px-2 py-2 text-xs font-semibold ${plan === p.id ? 'border-primary bg-primary text-white' : 'border-border'}`}>
                    {p.label}
                  </button>
                ))}
              </div>

              <div className="mt-4 space-y-2 rounded-xl bg-bg p-3 text-sm">
                <Row label={`${plan} rent`} value={formatINR(rentTotal)} />
                <Row label="Security deposit" value={formatINR(deposit)} />
                <Row label="Service fee" value={formatINR(199)} />
                <div className="border-t border-border pt-2 font-bold">
                  <Row label="Total due now" value={formatINR(rentTotal + deposit + 199)} />
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (!moveIn) { toast.error('Select a move-in date'); return }
                  navigate(`/student/booking?propertyId=${property.id}&roomType=${encodeURIComponent(roomType)}&plan=${plan}&moveIn=${moveIn}`)
                }}
                className="mt-4 w-full rounded-xl bg-accent py-3 text-sm font-bold text-primary"
              >
                Book Now
              </button>
              <button type="button" onClick={() => setTourOpen(true)} className="mt-2 w-full rounded-xl border border-border py-3 text-sm font-semibold">
                Schedule a Visit
              </button>
            </div>
          </aside>
        </div>
      </div>

      <SiteFooter />

      <Modal open={tourOpen} onClose={() => setTourOpen(false)} title="Schedule a visit">
        <div className="space-y-3">
          <label className="block text-sm">
            <span className="mb-1 block font-medium">Date</span>
            <input type="date" className="w-full rounded-xl border border-border bg-bg px-3 py-2" value={tourDate} onChange={(e) => setTourDate(e.target.value)} />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block font-medium">Time</span>
            <select className="w-full rounded-xl border border-border bg-bg px-3 py-2" value={tourTime} onChange={(e) => setTourTime(e.target.value)}>
              {['10:00 AM', '11:00 AM', '12:30 PM', '3:00 PM', '5:00 PM'].map((t) => <option key={t}>{t}</option>)}
            </select>
          </label>
          <button
            type="button"
            onClick={() => {
              if (!tourDate) { toast.error('Pick a date'); return }
              scheduleTour({ studentId: currentStudentId, propertyId: property.id, date: tourDate, time: tourTime })
              setTourOpen(false)
            }}
            className="w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-white"
          >
            Confirm tour
          </button>
        </div>
      </Modal>
    </div>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-muted">{label}</span>
      <span>{value}</span>
    </div>
  )
}
