import { Heart, MapPin, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatINR } from '../../data/mockData'
import { useApp } from '../../context/AppContext'

export default function PropertyCard({ property, compareMode }) {
  const { favourites, toggleFavourite, compare, toggleCompare } = useApp()
  const liked = favourites.includes(property.id)
  const inCompare = compare.includes(property.id)
  const availableBeds = property.rooms.reduce((sum, r) => sum + (r.available || 0), 0)

  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-card transition hover:border-primary/20">
      <div className="img-zoom relative">
        <img src={property.images[0]} alt={property.name} className="h-56 w-full object-cover" />
        <button
          type="button"
          onClick={() => toggleFavourite(property.id)}
          className={`absolute right-3 top-3 rounded-full bg-white/95 p-2 ${liked ? 'text-primary' : 'text-muted'}`}
          aria-label="Wishlist"
        >
          <Heart size={15} fill={liked ? 'currentColor' : 'none'} />
        </button>
        {property.verified && (
          <span className="absolute left-3 top-3 rounded-md bg-white/95 px-2 py-1 text-[11px] font-semibold text-primary">
            Verified
          </span>
        )}
      </div>

      <div className="p-4 md:p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-heading text-[1.05rem] font-bold leading-snug text-text">{property.name}</h3>
            <p className="mt-1 flex items-center gap-1 text-sm text-muted">
              <MapPin size={13} /> {property.locality}, {property.city}
            </p>
          </div>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-text">
            <Star size={13} className="fill-accent text-accent" /> {property.rating}
          </span>
        </div>

        <p className="mt-4 font-heading text-xl font-bold text-primary">
          {formatINR(property.priceFrom)}
          <span className="ml-1 text-sm font-medium text-muted">/mo</span>
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {property.amenities.slice(0, 3).map((a) => (
            <span key={a} className="rounded-md bg-bg px-2 py-1 text-[11px] font-medium text-muted">{a}</span>
          ))}
        </div>

        <p className="mt-3 text-xs text-muted">{availableBeds} beds available · {property.rooms.map((r) => r.type.split(' ')[0]).join(', ')}</p>

        <div className="mt-4 flex gap-2 border-t border-border pt-4">
          <Link to={`/student/property/${property.id}`} className="flex-1 rounded-xl bg-primary py-2.5 text-center text-sm font-semibold text-white transition hover:bg-secondary">
            View Stay
          </Link>
          {compareMode !== false && (
            <button
              type="button"
              onClick={() => toggleCompare(property.id)}
              className={`rounded-xl border px-3 text-xs font-semibold ${inCompare ? 'border-accent bg-accent/15 text-primary' : 'border-border text-muted'}`}
            >
              {inCompare ? 'Added' : 'Compare'}
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
