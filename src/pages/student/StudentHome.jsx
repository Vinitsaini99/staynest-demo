import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Search, MapPin, Star, ShieldCheck, BadgeCheck, Clock3, ArrowRight, BedDouble, Home, Users, Sparkles,
} from 'lucide-react'
import PropertyCard from '../../components/property/PropertyCard'
import SiteFooter from '../../components/common/SiteFooter'
import { LOCATIONS, testimonials } from './studentHelpers'
import { useApp } from '../../context/AppContext'

const roomTypes = [
  { title: 'Single Sharing', desc: 'Private room for focused living', icon: BedDouble },
  { title: 'Double Sharing', desc: 'Balanced comfort and value', icon: Users },
  { title: 'Triple Sharing', desc: 'Social stays for students', icon: Home },
  { title: 'Dormitory', desc: 'Budget-friendly shared beds', icon: Sparkles },
]

const why = [
  { icon: ShieldCheck, title: 'Verified Properties', text: 'Every stay is reviewed for safety, amenities and authenticity.' },
  { icon: BadgeCheck, title: 'Transparent Pricing', text: 'Rent, deposits and plans shown upfront — no surprise fees.' },
  { icon: Clock3, title: 'Faster Move-ins', text: 'Schedule visits, reserve beds and confirm bookings in minutes.' },
]

const steps = [
  { n: '01', title: 'Discover', text: 'Browse verified PGs and hostels by locality, budget and room type.' },
  { n: '02', title: 'Visit or Reserve', text: 'Schedule a tour or lock your preferred bed with a flexible plan.' },
  { n: '03', title: 'Move In', text: 'Complete a demo payment and receive instant booking confirmation.' },
]

export default function StudentHome() {
  const navigate = useNavigate()
  const { properties } = useApp()
  const featured = properties.filter((p) => p.status === 'Approved').slice(0, 6)
  const [locality, setLocality] = useState('')
  const [budget, setBudget] = useState('')

  const search = (e) => {
    e?.preventDefault()
    const params = new URLSearchParams()
    if (locality) params.set('locality', locality)
    if (budget) params.set('budget', budget)
    navigate(`/student/search?${params.toString()}`)
  }

  return (
    <div className="pb-20 md:pb-0">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 pb-10 pt-8 md:px-6 md:pb-16 md:pt-12">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary"
            >
              Your next home starts here
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="mt-4 font-heading text-4xl font-extrabold leading-[1.08] text-text md:text-5xl lg:text-[3.4rem]"
            >
              Find a Place That Feels Like Home.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-5 max-w-lg text-base leading-relaxed text-muted md:text-lg"
            >
              Discover verified PGs and student hostels across Jaipur — curated for comfort, safety and everyday living.
            </motion.p>

            <motion.form
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              onSubmit={search}
              className="mt-8 rounded-2xl border border-border bg-card p-3"
            >
              <div className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
                <label className="rounded-xl bg-bg px-3 py-2.5">
                  <span className="text-[11px] font-medium uppercase tracking-wide text-muted">Location</span>
                  <select className="mt-0.5 w-full bg-transparent text-sm font-medium outline-none" value={locality} onChange={(e) => setLocality(e.target.value)}>
                    <option value="">All localities</option>
                    {LOCATIONS.map((l) => <option key={l}>{l}</option>)}
                  </select>
                </label>
                <label className="rounded-xl bg-bg px-3 py-2.5">
                  <span className="text-[11px] font-medium uppercase tracking-wide text-muted">Budget</span>
                  <select className="mt-0.5 w-full bg-transparent text-sm font-medium outline-none" value={budget} onChange={(e) => setBudget(e.target.value)}>
                    <option value="">Any budget</option>
                    <option value="5000">Under ₹5,000</option>
                    <option value="8000">Under ₹8,000</option>
                    <option value="10000">Under ₹10,000</option>
                    <option value="15000">Under ₹15,000</option>
                  </select>
                </label>
                <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-secondary sm:self-stretch">
                  <Search size={15} /> Search
                </button>
              </div>
            </motion.form>

            <div className="mt-5 flex flex-wrap gap-3">
              <button type="button" onClick={() => navigate('/student/search')} className="rounded-xl bg-accent px-5 py-2.5 text-sm font-bold text-primary">
                Explore Stays
              </button>
              <Link to="/student/home#how" className="inline-flex items-center gap-1 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-semibold text-text">
                How it works <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.12 }}
            className="relative"
          >
            <div className="img-zoom overflow-hidden rounded-[1.75rem] border border-border">
              <img
                src="https://images.unsplash.com/photo-1631881357279-ae3d0f3d6b3e?auto=format&fit=crop&w=1200&q=80"
                alt="Premium hostel interior"
                className="h-[420px] w-full object-cover md:h-[520px]"
              />
            </div>
            <div className="absolute left-4 top-4 rounded-xl border border-border bg-card px-3 py-2 text-sm shadow-sm">
              <p className="flex items-center gap-1 font-semibold"><MapPin size={13} className="text-secondary" /> Mansarovar, Jaipur</p>
            </div>
            <div className="absolute bottom-4 right-4 rounded-xl border border-border bg-card p-3 shadow-sm">
              <p className="flex items-center gap-1 text-sm font-semibold"><Star size={13} className="fill-accent text-accent" /> 4.8 rating</p>
              <p className="mt-1 text-xs text-muted">12 beds available this week</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Discovery */}
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-heading text-3xl font-bold text-text">Discover Your Perfect Stay.</h2>
            <p className="mt-2 text-sm text-muted">Handpicked verified homes near campuses and coaching hubs.</p>
          </div>
          <Link to="/student/search" className="hidden text-sm font-semibold text-secondary sm:inline-flex sm:items-center sm:gap-1">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => <PropertyCard key={p.id} property={p} />)}
        </div>
      </section>

      {/* Locations */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">
          <h2 className="font-heading text-3xl font-bold">Explore by Location.</h2>
          <p className="mt-2 text-sm text-muted">Popular student neighbourhoods across Jaipur.</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {LOCATIONS.map((loc) => (
              <Link
                key={loc}
                to={`/student/search?locality=${encodeURIComponent(loc)}`}
                className="group flex items-center justify-between rounded-2xl border border-border bg-bg px-5 py-5 transition hover:border-primary/30 hover:bg-white"
              >
                <div>
                  <p className="font-heading text-lg font-bold">{loc}</p>
                  <p className="text-sm text-muted">Jaipur · Verified stays</p>
                </div>
                <span className="rounded-full border border-border bg-card p-2 text-muted transition group-hover:border-primary group-hover:text-primary">
                  <ArrowRight size={16} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Room types */}
      <section id="students" className="mx-auto max-w-7xl px-4 py-14 md:px-6">
        <h2 className="font-heading text-3xl font-bold">Find Your Room Type.</h2>
        <p className="mt-2 text-sm text-muted">Choose the sharing style that matches your lifestyle.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {roomTypes.map((r) => (
            <button
              key={r.title}
              type="button"
              onClick={() => navigate(`/student/search?roomType=${encodeURIComponent(r.title)}`)}
              className="rounded-2xl border border-border bg-card p-5 text-left transition hover:border-primary/25"
            >
              <r.icon className="text-secondary" size={22} strokeWidth={1.6} />
              <p className="mt-4 font-heading text-lg font-bold">{r.title}</p>
              <p className="mt-1 text-sm text-muted">{r.desc}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Why */}
      <section className="bg-primary text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">
          <h2 className="font-heading text-3xl font-bold">Why Choose Our Platform.</h2>
          <p className="mt-2 max-w-xl text-sm text-white/60">Built for modern student living — premium discovery with operational clarity.</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {why.map((w) => (
              <div key={w.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <w.icon className="text-accent" size={24} strokeWidth={1.6} />
                <h3 className="mt-4 font-heading text-xl font-bold">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How */}
      <section id="how" className="mx-auto max-w-7xl px-4 py-14 md:px-6">
        <h2 className="font-heading text-3xl font-bold">How It Works.</h2>
        <p className="mt-2 text-sm text-muted">Three clear steps from discovery to move-in.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="rounded-2xl border border-border bg-card p-6">
              <p className="font-heading text-sm font-bold text-accent">{s.n}</p>
              <h3 className="mt-3 font-heading text-xl font-bold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured strip */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="font-heading text-3xl font-bold">Featured Properties.</h2>
              <p className="mt-2 text-sm text-muted">Top-rated stays with strong availability this month.</p>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.slice(0, 3).map((p) => <PropertyCard key={`feat-${p.id}`} property={p} compareMode={false} />)}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6">
        <h2 className="font-heading text-3xl font-bold">Student Testimonials.</h2>
        <p className="mt-2 text-sm text-muted">Stories from residents who found their stay with StayNest.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-3 flex gap-1 text-accent">
                {[1, 2, 3, 4, 5].map((n) => <Star key={n} size={13} className="fill-accent" />)}
              </div>
              <p className="text-sm leading-relaxed text-text">“{t.text}”</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">{t.avatar}</div>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted">{t.college}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="help" className="mx-auto max-w-7xl px-4 pb-16 md:px-6">
        <div className="overflow-hidden rounded-3xl border border-border bg-primary px-6 py-10 text-white md:px-12 md:py-14">
          <div className="grid items-center gap-6 md:grid-cols-[1.4fr_auto]">
            <div>
              <h2 className="font-heading text-3xl font-bold md:text-4xl">List Your Property.</h2>
              <p className="mt-3 max-w-xl text-sm text-white/65 md:text-base">
                Reach thousands of verified students, manage occupancy and collect rent — all from the owner console.
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate('/owner/dashboard')}
              className="rounded-xl bg-accent px-6 py-3 text-sm font-bold text-primary"
            >
              Open Owner Portal
            </button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
