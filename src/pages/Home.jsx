import { Link } from 'react-router-dom'
import { ArrowRight, BadgeCheck, Building2, Home as HomeIcon, MapPinned, MessageCircle, PhoneCall, Search, ShieldCheck, Users, Wallet } from 'lucide-react'
import SearchBar from '../components/SearchBar'
import PropertyRow from '../components/PropertyRow'
import PropertyArt from '../components/PropertyArt'
import { SectionHead } from '../components/ui/Bits'
import { CardSkeleton } from '../components/ui/States'
import Button from '../components/ui/Button'
import { useAsync } from '../hooks/useAsync'
import { useSeo } from '../hooks/useSeo'
import { getCategoryRow, getSummary } from '../services/api'
import { categories } from '../data/categories'
import { localities } from '../data/localities'
import { SITE, waLink } from '../config/site'

const TILE_ICON = { flat: Building2, 'independent-house': HomeIcon, 'commercial-office': Building2, 'sharing-room': Users }

function CategoryRow({ cat }) {
  const { data, loading } = useAsync(() => getCategoryRow(cat.slug, 8), [cat.slug])
  return (
    <section className="container-x pt-14">
      <SectionHead title={cat.label} text={cat.blurb} to={`/rentals?category=${cat.slug}`} linkLabel={`All ${cat.label.toLowerCase()}`} />
      {loading ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"><CardSkeleton count={4} /></div>
      ) : data?.length ? (
        <PropertyRow items={data} />
      ) : (
        <p className="text-sm text-muted">No listings in this category yet.</p>
      )}
    </section>
  )
}

const WHY = [
  { icon: BadgeCheck, title: 'Verified-first listings', text: 'Listings are reviewed by our team before they go live, and checked homes carry a Verified badge.' },
  { icon: PhoneCall, title: 'Talk to owners directly', text: 'Call or WhatsApp the owner from the listing page. No middle layers and no hidden steps.' },
  { icon: Wallet, title: 'Clear numbers up front', text: 'Rent, deposit and maintenance are shown on every listing so you can compare honestly.' },
  { icon: ShieldCheck, title: 'Safer renting', text: 'Simple tips and a report option help you avoid advance-payment traps and fake ads.' },
]

const STEPS = [
  { n: '1', icon: Search, title: 'Search and filter', text: 'Pick a type, locality and budget. Narrow down by BHK and furnishing.' },
  { n: '2', icon: HomeIcon, title: 'Shortlist and compare', text: 'Save homes you like and review photos, amenities and costs side by side.' },
  { n: '3', icon: MessageCircle, title: 'Enquire or call', text: 'Send an enquiry or reach the owner on call and WhatsApp, then book a visit.' },
]

export default function Home() {
  useSeo({
    title: 'Flats, Houses, Offices & Sharing Rooms for Rent in Jaipur',
    description: 'Browse rental flats, independent houses, commercial offices and sharing rooms in Jaipur with direct owner contact and clear pricing.',
    path: '/',
  })
  const { data: sum } = useAsync(getSummary, [])

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 left-1/4 h-80 w-80 rounded-full bg-saffron/20 blur-3xl" />
        <div className="container-x relative grid items-center gap-10 py-14 lg:grid-cols-[1.15fr_0.85fr] lg:py-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-bold backdrop-blur">
              <MapPinned size={14} className="text-saffron" /> Made for Jaipur renters
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] sm:text-5xl lg:text-[3.4rem]">
              Find your next <span className="text-saffron">rental home</span> in the Pink City
            </h1>
            <p className="mt-4 max-w-xl text-base text-white/75 sm:text-lg">
              Flats, independent houses, offices and sharing rooms across Malviya Nagar, Vaishali Nagar, Mansarovar and more, listed by owners and reviewed by us.
            </p>
            <div className="mt-7 flex flex-wrap gap-6 text-sm">
              {[
                [sum?.total ?? '—', 'live listings'],
                [localities.length, 'localities'],
                [categories.length, 'property types'],
              ].map(([v, l]) => (
                <div key={l}>
                  <p className="font-display text-3xl font-extrabold text-saffron">{v}</p>
                  <p className="text-white/60">{l}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="floaty mx-auto aspect-[4/3] w-full max-w-md overflow-hidden rounded-[2rem] border-4 border-white/15 shadow-lift">
              <PropertyArt category="independent-house" seed="hero" />
            </div>
            <div className="absolute -bottom-5 -left-4 rounded-2xl bg-white p-3.5 text-ink shadow-lift">
              <p className="text-xs font-bold text-muted">Starting from</p>
              <p className="font-display text-2xl font-extrabold text-brand-deep">₹4,500<span className="text-xs font-semibold text-muted">/mo</span></p>
            </div>
          </div>
        </div>
        <div className="h-10 lg:h-12" />
      </section>

      <div className="container-x relative z-10 -mt-14 lg:-mt-16">
        <SearchBar />
      </div>

      {/* Category tiles */}
      <section className="container-x pt-14">
        <SectionHead eyebrow="Browse by type" title="What are you looking for?" />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {categories.map((c) => {
            const Icon = TILE_ICON[c.slug]
            return (
              <Link key={c.slug} to={`/rentals?category=${c.slug}`} className="card group p-5 transition-all hover:-translate-y-1 hover:border-brand hover:shadow-lift">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-tint text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                  <Icon size={24} />
                </span>
                <h3 className="mt-4 text-lg font-bold">{c.label}</h3>
                <p className="mt-1 hidden text-sm text-muted sm:block">{c.blurb}</p>
                <p className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-brand">
                  {sum?.byCategory?.[c.slug] ?? 0} listings <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </p>
              </Link>
            )
          })}
        </div>
      </section>

      {categories.map((c) => <CategoryRow key={c.slug} cat={c} />)}

      {/* Why */}
      <section className="container-x pt-20">
        <SectionHead center eyebrow="Why GharKhoj" title="Renting should not be a headache" text="We keep the process simple, transparent and close to the owner." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map(({ icon: Icon, title, text }) => (
            <div key={title} className="card p-6">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-saffron/15 text-saffron-deep"><Icon size={24} /></span>
              <h3 className="mt-4 text-lg font-bold">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mt-20 bg-brand-tint py-16">
        <div className="container-x">
          <SectionHead center eyebrow="How it works" title="From search to keys in three steps" />
          <div className="grid gap-6 md:grid-cols-3">
            {STEPS.map(({ n, icon: Icon, title, text }) => (
              <div key={n} className="relative rounded-2xl bg-white p-6 shadow-card">
                <span className="absolute -top-4 left-6 grid h-9 w-9 place-items-center rounded-full bg-ink font-display font-extrabold text-saffron">{n}</span>
                <Icon className="mt-3 text-brand" size={28} />
                <h3 className="mt-3 text-lg font-bold">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Localities */}
      <section className="container-x pt-20">
        <SectionHead eyebrow="Explore" title="Popular localities in Jaipur" />
        <div className="flex flex-wrap gap-3">
          {localities.map((l) => (
            <Link key={l.name} to={`/rentals?locality=${encodeURIComponent(l.name)}`} className="chip !px-4 !py-2.5 text-sm" title={l.blurb}>
              {l.name}
              <span className="rounded-full bg-sand px-2 py-0.5 text-[0.7rem] text-muted">{sum?.byLocality?.[l.name] ?? 0}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Owner CTA */}
      <section className="container-x pt-20">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand to-brand-deep p-8 text-white sm:p-12">
          <div className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-saffron/30 blur-2xl" />
          <div className="relative grid items-center gap-6 md:grid-cols-[1fr_auto]">
            <div>
              <h2 className="text-3xl font-extrabold sm:text-4xl">Have a property to rent out?</h2>
              <p className="mt-2 max-w-xl text-white/80">List it free, reach serious tenants in Jaipur and manage enquiries from your own dashboard.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button to="/register?role=seller" variant="saffron" size="lg">List your property</Button>
              <Button href={waLink('Hi, I want to list my property on GharKhoj Jaipur.')} target="_blank" rel="noreferrer" variant="whatsapp" size="lg">
                <MessageCircle size={18} /> WhatsApp us
              </Button>
            </div>
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-muted">Need help choosing? Call {SITE.phone} ({SITE.hours}).</p>
      </section>
    </>
  )
}
