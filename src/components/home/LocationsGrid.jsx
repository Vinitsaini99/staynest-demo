import { Link } from 'react-router-dom'
import { ArrowRight, MapPin } from 'lucide-react'
import { locations } from '../../data/locations'
import { getCounts } from '../../services/api'
import Reveal from '../ui/Reveal'
import { SectionHead } from '../ui/Bits'

export default function LocationsGrid() {
  const { byLocality } = getCounts()
  return (
    <section className="bg-stone">
      <div className="container-x py-20 md:py-28">
        <SectionHead
          eyebrow="Popular locations" title="Explore Kota, locality by locality"
          intro="Each area has its own character, pricing and pace. Browse listings by the neighbourhood that fits your life."
          action={<Link to="/locations" className="link-underline inline-flex items-center gap-2 pb-0.5 text-sm font-semibold text-forest">All locations <ArrowRight size={15} /></Link>}
        />
        <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {locations.map((l, i) => {
            const n = byLocality[l.slug]
            return (
              <Reveal key={l.slug} delay={(i % 4) * 0.05} className="bg-ivory">
                <Link to={`/locations/${l.slug}`} className="group flex h-full min-h-36 flex-col justify-between p-6 transition-colors hover:bg-forest hover:text-ivory">
                  <div className="flex items-start justify-between">
                    <MapPin size={20} className="text-gold-deep group-hover:text-gold" strokeWidth={1.6} />
                    <span className="font-display text-sm text-muted group-hover:text-ivory/50">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-xl">{l.name}</h3>
                    <p className="mt-1 text-xs text-muted group-hover:text-gold">{n ? `${n} ${n === 1 ? 'property' : 'properties'}` : 'Explore area'}</p>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
