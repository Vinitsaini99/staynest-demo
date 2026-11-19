import { Link } from 'react-router-dom'
import { ArrowRight, BadgeCheck, Building2, Home as HomeIcon, Mail, MapPinned, MessageCircle, PhoneCall, Search, Users, Wallet } from 'lucide-react'
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
      <SectionHead eyebrow="For rent" title={cat.label} text={cat.blurb} to={`/rentals?category=${cat.slug}`} linkLabel={`All ${cat.label.toLowerCase()}`} />
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
  { icon: BadgeCheck, title: 'Verified listings', text: 'Our team reviews every listing before it goes live, and checked homes carry an Approved badge.' },
  { icon: PhoneCall, title: 'Direct owner contact', text: 'Call or WhatsApp the owner from the listing page. No broker commission and no middlemen.' },
  { icon: Wallet, title: 'Transparent pricing', text: 'Rent, deposit and maintenance are shown on every listing, so there are no surprises later.' },
  { icon: MapPinned, title: 'All localities covered', text: 'Rajiv Gandhi Nagar, Talwandi, Vigyan Nagar, Indra Vihar, Landmark City and more across Kota.' },
]

const STEPS = [
  { n: '1', icon: Search, title: 'Search and filter', text: 'Pick a type, locality and budget. Narrow down by BHK and furnishing.' },
  { n: '2', icon: HomeIcon, title: 'Shortlist and compare', text: 'Save homes you like and review photos, amenities and costs side by side.' },
  { n: '3', icon: MessageCircle, title: 'Enquire or call', text: 'Send an enquiry or reach the owner on call and WhatsApp, then book a visit.' },
]

export default function Home() {
  useSeo({
    title: 'Flats, Houses, Offices & Sharing Rooms for Rent in Kota',
    description: 'Browse rental flats, independent houses, commercial offices and sharing rooms in Kota with direct owner contact and clear pricing.',
    path: '/',
  })
  const { data: sum } = useAsync(getSummary, [])

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 left-1/4 h-80 w-80 rounded-full bg-saffron/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-10 bottom-6 hidden w-64 -rotate-6 overflow-hidden rounded-3xl opacity-25 lg:block xl:w-72">
          <PropertyArt category="flat" seed="hero-a" />
        </div>
        <div className="pointer-events-none absolute -right-8 top-10 hidden w-64 rotate-6 overflow-hidden rounded-3xl opacity-25 lg:block xl:w-72">
          <PropertyArt category="independent-house" seed="hero-b" />
        </div>

        <div className="container-x relative flex min-h-[calc(100svh-7rem)] flex-col items-center justify-center py-10 text-center sm:py-14">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-bold backdrop-blur">
            <MapPinned size={14} className="text-saffron" /> Made for Kota renters
          </span>
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-[1.08] sm:text-5xl lg:text-[3.4rem]">
            Find your next <span className="text-saffron">rental home</span> in Kota
          </h1>
          <p className="mt-3 max-w-2xl text-base text-white/75 sm:text-lg">
            Pick the type, choose your area and budget, and see matching homes, PGs and offices in seconds.
          </p>

          <div className="mt-7 w-full max-w-5xl text-left">
            <SearchBar />
          </div>

          <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-white/55">Popular areas:</span>
            {localities.slice(0, 7).map((l) => (
              <Link key={l.name} to={`/rentals?locality=${encodeURIComponent(l.name)}`} className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold text-white/90 backdrop-blur transition-colors hover:border-saffron hover:text-saffron">
                {l.name}
              </Link>
            ))}
          </div>

          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-semibold text-white/85">
            {['No brokers', 'No hidden charges', 'Direct owner contact'].map((t) => (
              <li key={t} className="inline-flex items-center gap-1.5"><BadgeCheck size={16} className="text-saffron" /> {t}</li>
            ))}
            <li className="inline-flex items-center gap-1.5 text-saffron">{sum?.total ?? '—'} live listings</li>
          </ul>
        </div>
      </section>

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
        <SectionHead eyebrow="Explore" title="Popular localities in Kota" />
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
              <p className="mt-2 max-w-xl text-white/80">List it free, reach serious tenants in Kota and manage enquiries from your own dashboard.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button to="/register?role=seller" variant="saffron" size="lg">List your property</Button>
              <Button href={waLink('Hi, I want to list my property on GharKhoj Kota.')} target="_blank" rel="noreferrer" variant="whatsapp" size="lg">
                <MessageCircle size={18} /> WhatsApp us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Get in touch */}
      <section className="container-x pt-16">
        <div className="card grid items-center gap-6 p-6 sm:p-8 md:grid-cols-[1fr_auto]">
          <div>
            <h2 className="text-2xl font-extrabold">Get in touch</h2>
            <p className="mt-1 text-sm text-muted">Need help choosing a home? Our team is available {SITE.hours.toLowerCase()}.</p>
            <ul className="mt-4 space-y-2 text-sm font-semibold">
              <li className="flex items-center gap-2"><Mail size={16} className="text-brand" /> <a href={`mailto:${SITE.email}`} className="hover:text-brand">{SITE.email}</a></li>
              <li className="flex items-center gap-2"><MapPinned size={16} className="text-brand" /> {SITE.address}</li>
            </ul>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href={waLink()} target="_blank" rel="noreferrer" variant="whatsapp" size="lg"><MessageCircle size={18} /> WhatsApp</Button>
            <Button href={`tel:${SITE.phoneTel}`} variant="dark" size="lg"><PhoneCall size={18} /> Call now ({SITE.phone})</Button>
          </div>
        </div>
      </section>
    </>
  )
}
