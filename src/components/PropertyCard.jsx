import { Link } from 'react-router-dom'
import { BadgeCheck, BedDouble, Heart, MapPin, Maximize2, Sofa } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { formatArea, formatPrice, timeAgo } from '../utils/format'
import { categoryBySlug, furnishingLabel } from '../data/categories'
import { listingPhotos } from '../data/photos'

export default function PropertyCard({ p, className = '' }) {
  const { saved, toggleSave } = useApp()
  const isSaved = saved.includes(p.id)
  const cat = categoryBySlug[p.category]
  const photo = listingPhotos(p)[0]

  return (
    <article className={`group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lift ${className}`}>
      <Link to={`/property/${p.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-line/50" tabIndex={-1} aria-hidden="true">
        <img src={photo} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/45 to-transparent" />
        <span className="absolute left-3 top-3 rounded-md bg-white/95 px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-wide text-ink">{cat?.single}</span>
        {p.featured && <span className="absolute bottom-3 left-3 rounded-md bg-saffron px-2 py-0.5 text-[0.68rem] font-extrabold uppercase tracking-wide text-ink">Featured</span>}
      </Link>

      <button
        type="button"
        onClick={() => toggleSave(p.id)}
        aria-label={isSaved ? 'Remove from shortlist' : 'Save to shortlist'}
        aria-pressed={isSaved}
        className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/95 shadow-sm transition-transform hover:scale-110"
      >
        <Heart size={17} className={isSaved ? 'fill-red-500 text-red-500' : 'text-ink-soft'} />
      </button>

      <div className="flex flex-1 flex-col p-4">
        <p className="font-display text-[1.35rem] font-bold leading-none text-ink">
          {formatPrice(p.rent)}<span className="ml-1 text-[0.78rem] font-medium text-muted">/ month</span>
        </p>
        <h3 className="mt-2 line-clamp-1 text-[0.98rem] font-semibold leading-snug">
          <Link to={`/property/${p.slug}`} className="after:absolute after:inset-0 after:content-[''] hover:text-brand">{p.title}</Link>
        </h3>
        <p className="mt-1 flex items-center gap-1 text-[0.82rem] text-muted">
          <MapPin size={14} className="shrink-0" /> <span className="truncate">{p.locality}, Kota</span>
        </p>

        <div className="mt-3.5 flex flex-wrap gap-x-4 gap-y-1.5 border-t border-line pt-3 text-[0.8rem] font-medium text-ink-soft">
          {p.bhk && <span className="inline-flex items-center gap-1.5"><BedDouble size={15} className="text-muted" /> {p.bhk} BHK</span>}
          {p.area && <span className="inline-flex items-center gap-1.5"><Maximize2 size={14} className="text-muted" /> {formatArea(p.area)}</span>}
          <span className="inline-flex items-center gap-1.5"><Sofa size={15} className="text-muted" /> {furnishingLabel(p.furnishing)}</span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-3.5 text-xs text-muted">
          {p.verified ? (
            <span className="inline-flex items-center gap-1 font-semibold text-emerald-700"><BadgeCheck size={14} /> Verified owner</span>
          ) : (
            <span>Owner listing</span>
          )}
          <span>{timeAgo(p.listedAt)}</span>
        </div>
      </div>
    </article>
  )
}
