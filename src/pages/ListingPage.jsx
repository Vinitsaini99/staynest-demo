import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowRight, MapPin } from 'lucide-react'
import { listingPages } from '../data/categories'
import { locations } from '../data/locations'
import { getCounts } from '../services/api'
import { useSeo } from '../hooks/useSeo'
import { PageHero, SectionHead } from '../components/ui/Bits'
import Reveal from '../components/ui/Reveal'
import ListingView from '../components/property/ListingView'
import NotFound from './NotFound'

export function ListingPage({ path }) {
  const preset = listingPages.find((p) => p.path === path)
  const crumbs = [{ label: 'Home', to: '/' }, { label: preset.crumb }]
  return <ListingView preset={preset} crumbs={crumbs} />
}

export function LocationPage() {
  const { slug } = useParams()
  const loc = locations.find((l) => l.slug === slug)
  const locked = useMemo(() => ({ locality: slug }), [slug])
  if (!loc) return <NotFound />
  const preset = {
    path: `/locations/${loc.slug}`,
    title: `Property for Sale in ${loc.name}, Kota`,
    h1: `Property in ${loc.name}, Kota`,
    eyebrow: 'Location guide',
    description: `${loc.blurb} Browse flats, houses, plots and commercial property for sale in ${loc.name}, Kota, Rajasthan.`,
    scope: {},
  }
  return (
    <ListingView
      key={loc.slug}
      preset={preset}
      locked={locked}
      path={preset.path}
      crumbs={[{ label: 'Home', to: '/' }, { label: 'Locations', to: '/locations' }, { label: loc.name }]}
      extra={
        <section className="border-b border-line bg-white">
          <div className="container-x grid gap-8 py-10 lg:grid-cols-2">
            <div>
              <p className="eyebrow">About {loc.name}</p>
              <p className="mt-3 max-w-xl leading-relaxed text-muted">{loc.blurb}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {locations.filter((l) => l.slug !== loc.slug).slice(0, 6).map((l) => (
                  <Link key={l.slug} to={`/locations/${l.slug}`} className="border border-line px-3 py-1.5 text-xs font-medium text-forest hover:border-forest">{l.name}</Link>
                ))}
              </div>
            </div>
            <div className="aspect-[16/7] overflow-hidden border border-line bg-stone">
              <iframe title={`Map of ${loc.name}, Kota`} src={`https://www.google.com/maps?q=${encodeURIComponent(loc.query)}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-full w-full border-0" />
            </div>
          </div>
        </section>
      }
    />
  )
}

export function LocationsIndex() {
  const { byLocality } = getCounts()
  useSeo({ title: 'Localities in Kota – Property by Area', description: 'Explore property for sale across Kota localities including Talwandi, Kunhari, Vigyan Nagar, Landmark City and more.', path: '/locations' })
  return (
    <>
      <PageHero eyebrow="Locations" title="Property in Kota, by locality" intro="Pick a neighbourhood to see its character and available properties." crumbs={[{ label: 'Home', to: '/' }, { label: 'Locations' }]} />
      <section className="container-x py-16">
        <SectionHead eyebrow="12 localities" title="Where would you like to live or invest?" />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {locations.map((l, i) => {
            const n = byLocality[l.slug]
            return (
              <Reveal key={l.slug} delay={(i % 3) * 0.06}>
                <Link to={`/locations/${l.slug}`} className="group flex h-full flex-col border border-line bg-white p-7 transition-shadow hover:shadow-[0_24px_50px_-28px_rgba(20,45,39,0.45)]">
                  <MapPin className="text-gold-deep" size={22} strokeWidth={1.5} />
                  <h3 className="mt-5 text-2xl text-forest">{l.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{l.blurb}</p>
                  <p className="mt-6 flex items-center justify-between text-sm font-semibold text-forest">
                    {n ? `${n} ${n === 1 ? 'property' : 'properties'}` : 'Explore area'}
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </p>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </section>
    </>
  )
}
