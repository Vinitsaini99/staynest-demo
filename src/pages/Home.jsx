import { Link } from 'react-router-dom'
import { ArrowRight, BadgeCheck, Mail, MapPin, MapPinned, MessageCircle, PhoneCall, Search, Heart, Wallet } from 'lucide-react'
import SearchBar from '../components/SearchBar'
import HeroSlider from '../components/HeroSlider'
import PropertyRow from '../components/PropertyRow'
import { SectionHead } from '../components/ui/Bits'
import { CardSkeleton } from '../components/ui/States'
import Button from '../components/ui/Button'
import { useAsync } from '../hooks/useAsync'
import { useSeo } from '../hooks/useSeo'
import { getCategoryRow, getSummary } from '../services/api'
import { categories } from '../data/categories'
import { localities } from '../data/localities'
import { CATEGORY_COVER } from '../data/photos'
import { SITE, waLink } from '../config/site'

function CategoryRow({ cat }) {
  const { data, loading } = useAsync(() => getCategoryRow(cat.slug, 8), [cat.slug])
  return (
    <section className="container-x pt-16">
      <SectionHead title={cat.label} text={cat.blurb} to={`/rentals?category=${cat.slug}`} linkLabel="See all" />
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
  { icon: BadgeCheck, title: 'Verified listings', text: 'Our team reviews every listing before it goes live, and checked homes carry a verified badge.' },
  { icon: PhoneCall, title: 'Direct owner contact', text: 'Call or WhatsApp the owner straight from the listing. No broker commission, no middlemen.' },
  { icon: Wallet, title: 'Transparent pricing', text: 'Rent, deposit and maintenance are shown upfront on every listing, so there are no surprises.' },
  { icon: MapPinned, title: 'All areas covered', text: 'Rajiv Gandhi Nagar, Talwandi, Vigyan Nagar, Indra Vihar, Landmark City and more across Kota.' },
]

const STEPS = [
  { icon: Search, title: 'Search by area and budget', text: 'Choose a type, an area and your maximum rent. Narrow down by BHK and furnishing.' },
  { icon: Heart, title: 'Shortlist what you like', text: 'Save listings and compare photos, amenities and costs before you decide.' },
  { icon: MessageCircle, title: 'Contact the owner', text: 'Call, WhatsApp or send an enquiry, then fix a visit directly with the owner.' },
]

export default function Home() {
  useSeo({
    title: 'Flats, Houses, Offices & Sharing Rooms for Rent in Kota',
    description: 'Browse rental flats, independent houses, commercial offices and PG/sharing rooms in Kota with direct owner contact and clear pricing.',
    path: '/',
  })
  const { data: sum } = useAsync(getSummary, [])

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden text-white">
        <HeroSlider />
        <div className="container-x relative z-10 flex min-h-[calc(100svh-7rem)] flex-col items-center justify-center pb-16 pt-10 text-center sm:py-16">
          <p className="rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wide backdrop-blur">
            Verified rentals · Direct from owners · No brokerage
          </p>
          <h1 className="mt-5 max-w-3xl text-[2.1rem] font-bold leading-[1.12] sm:text-5xl lg:text-[3.3rem]">
            Find a place to live in <span className="text-saffron">Kota</span>, without the hassle
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/80 sm:text-lg">
            Flats, houses, PGs and offices near the coaching hubs and every popular area. Pick what you need and see matching homes in seconds.
          </p>

          <div className="mt-8 w-full max-w-5xl text-left">
            <SearchBar />
          </div>

          <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-center gap-2">
            <span className="text-xs font-semibold text-white/65">Popular areas:</span>
            {localities.slice(0, 6).map((l) => (
              <Link key={l.name} to={`/rentals?locality=${encodeURIComponent(l.name)}`} className="inline-flex items-center gap-1 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur transition-colors hover:border-saffron hover:text-saffron">
                <MapPin size={12} /> {l.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-b border-line bg-white">
        <div className="container-x grid grid-cols-2 gap-4 py-5 text-center sm:grid-cols-4">
          {[
            [sum?.total ?? '—', 'Live listings'],
            [localities.length, 'Areas covered'],
            [categories.length, 'Property types'],
            ['0%', 'Brokerage'],
          ].map(([v, l]) => (
            <div key={l}>
              <p className="font-display text-2xl font-bold text-brand-deep">{v}</p>
              <p className="text-xs font-medium uppercase tracking-wide text-muted">{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Category photo tiles */}
      <section className="container-x pt-14">
        <SectionHead title="What are you looking for?" text="Start with the kind of place you need." />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {categories.map((c) => (
            <Link key={c.slug} to={`/rentals?category=${c.slug}`} className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-ink sm:aspect-[4/3] lg:aspect-[3/4]">
              <img src={CATEGORY_COVER[c.slug]} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5">
                <h3 className="text-lg font-bold sm:text-xl">{c.label}</h3>
                <p className="mt-0.5 flex items-center gap-1 text-sm text-white/80">
                  {sum?.byCategory?.[c.slug] ?? 0} listings
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {categories.map((c) => <CategoryRow key={c.slug} cat={c} />)}

      {/* Areas */}
      <section className="container-x pt-20">
        <SectionHead title="Browse by area" text="Pick a neighbourhood to see what is available." />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {localities.map((l) => (
            <Link key={l.name} to={`/rentals?locality=${encodeURIComponent(l.name)}`} className="group rounded-xl border border-line bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-brand hover:shadow-card">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-semibold group-hover:text-brand">{l.name}</h3>
                <span className="rounded-full bg-brand-tint px-2 py-0.5 text-xs font-bold text-brand-deep">{sum?.byLocality?.[l.name] ?? 0}</span>
              </div>
              <p className="mt-1 line-clamp-2 text-[0.82rem] leading-snug text-muted">{l.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Why */}
      <section className="mt-20 bg-white py-16">
        <div className="container-x">
          <SectionHead center title="Why renters choose GharKhoj" text="Simple, transparent and close to the owner." />
          <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map(({ icon: Icon, title, text }) => (
              <div key={title}>
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-brand text-white"><Icon size={22} /></span>
                <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container-x pt-20">
        <SectionHead center title="How it works" text="From search to keys in three steps." />
        <ol className="grid gap-5 md:grid-cols-3">
          {STEPS.map(({ icon: Icon, title, text }, n) => (
            <li key={title} className="relative rounded-2xl border border-line bg-white p-6">
              <span className="font-display text-5xl font-bold text-brand/15">{n + 1}</span>
              <Icon className="mt-1 text-brand" size={26} />
              <h3 className="mt-3 text-lg font-semibold">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Owner CTA */}
      <section className="container-x pt-20">
        <div className="relative isolate overflow-hidden rounded-3xl text-white">
          <img src="/img/house-3.jpg" alt="" loading="lazy" className="absolute inset-0 -z-10 h-full w-full object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/95 via-ink/80 to-ink/40" />
          <div className="grid items-center gap-6 p-8 sm:p-12 md:grid-cols-[1fr_auto]">
            <div>
              <h2 className="text-3xl font-bold sm:text-4xl">Own a property in Kota?</h2>
              <p className="mt-2 max-w-xl text-white/80">List it for free, reach genuine tenants and manage every enquiry from your own dashboard.</p>
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
      <section className="container-x pt-14">
        <div className="grid items-center gap-6 rounded-2xl border border-line bg-white p-6 sm:p-8 md:grid-cols-[1fr_auto]">
          <div>
            <h2 className="text-2xl font-bold">Need help choosing?</h2>
            <p className="mt-1 text-sm text-muted">Talk to our team, {SITE.hours.toLowerCase()}.</p>
            <ul className="mt-4 space-y-2 text-sm font-medium">
              <li className="flex items-center gap-2"><Mail size={16} className="text-brand" /> <a href={`mailto:${SITE.email}`} className="hover:text-brand">{SITE.email}</a></li>
              <li className="flex items-center gap-2"><MapPinned size={16} className="text-brand" /> {SITE.address}</li>
            </ul>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href={waLink()} target="_blank" rel="noreferrer" variant="whatsapp" size="lg"><MessageCircle size={18} /> WhatsApp</Button>
            <Button href={`tel:${SITE.phoneTel}`} variant="dark" size="lg"><PhoneCall size={18} /> Call {SITE.phone}</Button>
          </div>
        </div>
      </section>
    </>
  )
}
