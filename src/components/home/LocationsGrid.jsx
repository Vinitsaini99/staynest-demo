import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { locations } from '../../data/locations'
import { getCounts } from '../../services/api'
import Reveal from '../ui/Reveal'
import { SectionHead } from '../ui/Bits'

export default function LocationsGrid() {
  const { byLocality } = getCounts()
  return (
    <section className="bg-stone/60">
      <div className="container-x py-20 md:py-28">
        <SectionHead
          eyebrow="Popular locations" title="Explore Kota by locality"
          action={<Link to="/locations" className="link-underline inline-flex items-center gap-2 pb-0.5 text-sm font-semibold text-forest">All locations <ArrowRight size={15} /></Link>}
        />
        <div className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
          {locations.map((l, i) => {
            const n = byLocality[l.slug]
            return (
              <Reveal key={l.slug} delay={(i % 3) * 0.04}>
                <Link to={`/locations/${l.slug}`} className="group flex items-baseline justify-between border-b border-line py-5">
                  <span className="font-display text-xl text-forest transition-colors group-hover:text-gold-deep">{l.name}</span>
                  <span className="text-xs text-muted">{n ? `${n} ${n === 1 ? 'property' : 'properties'}` : 'Explore'}</span>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
