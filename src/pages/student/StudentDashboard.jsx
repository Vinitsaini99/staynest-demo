import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import {
  LayoutDashboard, CalendarCheck, DoorOpen, Wallet, Bell, MapPin, Heart, Star, Gift, LifeBuoy, Menu,
} from 'lucide-react'
import Badge from '../../components/common/Badge'
import Modal from '../../components/common/Modal'
import { useApp } from '../../context/AppContext'
import { formatINR, getProperty, payments, referrals } from '../../data/mockData'
import toast from 'react-hot-toast'

const nav = [
  { to: '/student/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/student/dashboard#bookings', label: 'My Bookings', icon: CalendarCheck },
  { to: '/student/dashboard#room', label: 'My Room', icon: DoorOpen },
  { to: '/student/payments', label: 'Payments', icon: Wallet },
  { to: '/student/dashboard#reminders', label: 'Rent Reminders', icon: Bell },
  { to: '/student/dashboard#tours', label: 'Tour Appointments', icon: MapPin },
  { to: '/student/favourites', label: 'Saved Properties', icon: Heart },
  { to: '/student/dashboard#reviews', label: 'Reviews', icon: Star },
  { to: '/student/dashboard#referral', label: 'Referral Rewards', icon: Gift },
  { to: '/student/dashboard#support', label: 'Support', icon: LifeBuoy },
]

export default function StudentDashboard() {
  const { bookings, tours, currentStudentId, addReview, properties, favourites } = useApp()
  const myBookings = bookings.filter((b) => b.studentId === currentStudentId)
  const active = myBookings.find((b) => b.status === 'Confirmed') || myBookings[0]
  const property = active ? getProperty(active.propertyId) : null
  const myTours = tours.filter((t) => t.studentId === currentStudentId)
  const myPays = payments.filter((p) => p.studentId === currentStudentId)
  const referral = referrals[0]
  const [sidebar, setSidebar] = useState(false)
  const [reviewOpen, setReviewOpen] = useState(false)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')

  const side = (
    <div className="flex h-full flex-col bg-primary text-white">
      <div className="border-b border-white/10 px-5 py-6">
        <p className="font-heading text-lg font-bold">Stay<span className="text-accent">Nest</span></p>
        <p className="mt-1 text-xs text-white/45">Student account</p>
      </div>
      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
        {nav.map((item) => (
          <NavLink key={item.label} to={item.to} onClick={() => setSidebar(false)} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-white/70 hover:bg-white/8 hover:text-white">
            <item.icon size={17} /> {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  )

  return (
    <div className="flex min-h-[calc(100vh-44px)] pb-20 md:pb-0">
      <aside className="hidden w-[250px] shrink-0 md:block">{side}</aside>
      {sidebar && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button type="button" className="absolute inset-0 bg-black/40" aria-label="Close" onClick={() => setSidebar(false)} />
          <div className="absolute inset-y-0 left-0 w-72">{side}</div>
        </div>
      )}

      <div className="min-w-0 flex-1 px-4 py-6 md:px-8 md:py-8">
        <div className="mb-8 flex items-center gap-3">
          <button type="button" className="rounded-xl border border-border p-2 md:hidden" onClick={() => setSidebar(true)}>
            <Menu size={16} />
          </button>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-secondary">Welcome back</p>
            <h1 className="font-heading text-3xl font-bold text-text">Good to see you, Arjun</h1>
            <p className="mt-1 text-sm text-muted">Your stay, payments and rewards in one calm view.</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
          <section id="bookings" className="rounded-2xl border border-border bg-card overflow-hidden">
            {active && property ? (
              <>
                <img src={property.images[0]} alt="" className="h-48 w-full object-cover" />
                <div className="p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted">Active booking</p>
                      <h2 className="mt-1 font-heading text-2xl font-bold">{property.name}</h2>
                      <p className="text-sm text-muted">{property.locality}, Jaipur</p>
                    </div>
                    <Badge status={active.status} />
                  </div>
                  <div id="room" className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <Info label="Room" value={active.roomNo} />
                    <Info label="Bed" value={active.bed} />
                    <Info label="Type" value={active.roomType} />
                    <Info label="Check-in" value={active.checkIn} />
                  </div>
                </div>
              </>
            ) : (
              <div className="p-8">
                <p className="font-heading text-xl font-bold">No active booking</p>
                <Link to="/student/search" className="mt-3 inline-block text-sm font-semibold text-secondary">Explore stays →</Link>
              </div>
            )}
          </section>

          <section id="reminders" className="rounded-2xl border border-border bg-primary p-6 text-white">
            <p className="text-xs font-semibold uppercase tracking-wide text-accent">Upcoming rent</p>
            <p className="mt-4 font-heading text-4xl font-bold">{formatINR(9000)}</p>
            <p className="mt-2 text-sm text-white/60">Due 01 Dec 2026</p>
            <Link to="/student/payments" className="mt-8 inline-flex rounded-xl bg-accent px-4 py-2.5 text-sm font-bold text-primary">
              Review payments
            </Link>
            <div className="mt-8 space-y-2 border-t border-white/10 pt-5">
              {myPays.slice(0, 3).map((p) => (
                <div key={p.id} className="flex items-center justify-between text-sm">
                  <span className="text-white/70">{p.type}</span>
                  <span className="font-semibold">{formatINR(p.amount)}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <section id="tours" className="rounded-2xl border border-border bg-card p-5">
            <h3 className="font-heading text-lg font-bold">Tour appointments</h3>
            <div className="mt-4 space-y-3">
              {myTours.length === 0 && <p className="text-sm text-muted">No tours scheduled</p>}
              {myTours.map((t) => (
                <div key={t.id} className="border-b border-border pb-3 last:border-0">
                  <p className="text-sm font-semibold">{getProperty(t.propertyId)?.name}</p>
                  <p className="text-xs text-muted">{t.date} · {t.time}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card p-5">
            <h3 className="font-heading text-lg font-bold">Saved properties</h3>
            <p className="mt-2 font-heading text-3xl font-bold">{favourites.length}</p>
            <p className="text-sm text-muted">Homes on your wishlist</p>
            <Link to="/student/favourites" className="mt-4 inline-block text-sm font-semibold text-secondary">Open wishlist →</Link>
          </section>

          <section id="referral" className="rounded-2xl border border-border bg-card p-5">
            <h3 className="font-heading text-lg font-bold">Referral rewards</h3>
            <p className="mt-2 text-sm text-muted">Code <span className="font-semibold text-text">{referral.code}</span></p>
            <p className="mt-3 font-heading text-3xl font-bold">{referral.points}</p>
            <p className="text-sm text-muted">Reward points</p>
            <button type="button" onClick={() => { navigator.clipboard?.writeText(referral.code); toast.success('Referral code copied') }} className="mt-4 rounded-xl border border-border px-3 py-2 text-xs font-semibold">
              Copy code
            </button>
          </section>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <section id="reviews" className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-heading text-lg font-bold">Share a review</h3>
            <p className="mt-1 text-sm text-muted">Help other students choose with confidence.</p>
            <button type="button" onClick={() => setReviewOpen(true)} className="mt-4 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white">
              Write review
            </button>
          </section>
          <section id="support" className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-heading text-lg font-bold">Support</h3>
            <p className="mt-1 text-sm text-muted">hello@staynest.co · +91 1800-123-7668</p>
            <button type="button" onClick={() => toast.success('Support ticket created')} className="mt-4 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold">
              Open ticket
            </button>
          </section>
        </div>
      </div>

      <Modal open={reviewOpen} onClose={() => setReviewOpen(false)} title="Submit review">
        <div className="space-y-3">
          <label className="block text-sm">
            <span className="mb-1 block font-medium">Property</span>
            <select id="review-prop" className="w-full rounded-xl border border-border bg-bg px-3 py-2" defaultValue={property?.id || properties[0]?.id}>
              {properties.filter((p) => p.status === 'Approved').slice(0, 8).map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </label>
          <label className="block text-sm">
            <span className="mb-1 block font-medium">Rating</span>
            <select className="w-full rounded-xl border border-border bg-bg px-3 py-2" value={rating} onChange={(e) => setRating(Number(e.target.value))}>
              {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} stars</option>)}
            </select>
          </label>
          <label className="block text-sm">
            <span className="mb-1 block font-medium">Comment</span>
            <textarea className="w-full rounded-xl border border-border bg-bg px-3 py-2" rows={3} value={comment} onChange={(e) => setComment(e.target.value)} />
          </label>
          <button
            type="button"
            onClick={() => {
              const propId = document.getElementById('review-prop').value
              if (!comment.trim()) { toast.error('Please write a comment'); return }
              addReview({ propertyId: propId, studentId: currentStudentId, rating, comment })
              setReviewOpen(false)
              setComment('')
            }}
            className="w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-white"
          >
            Publish review
          </button>
        </div>
      </Modal>
    </div>
  )
}

function Info({ label, value }) {
  return (
    <div className="rounded-xl bg-bg px-3 py-3">
      <p className="text-[11px] text-muted">{label}</p>
      <p className="mt-1 text-sm font-semibold">{value}</p>
    </div>
  )
}
