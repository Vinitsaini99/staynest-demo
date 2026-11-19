import { Link } from 'react-router-dom'
import { BadgeCheck, BedDouble, Heart, MapPin, Maximize2, Sofa, Star } from 'lucide-react'
import PropertyArt from './PropertyArt'
import { useApp } from '../context/AppContext'
import { formatArea, formatPrice, timeAgo } from '../utils/format'
import { categoryBySlug, furnishingLabel } from '../data/categories'

export default function PropertyCard({ p, className = '' }) {
  const { saved, toggleSave } = useApp()
  const isSaved = saved.includes(p.id)
  const cat = categoryBySlug[p.category]

  return (
    <article className={`card group relative flex flex-col overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lift ${className}`}>
      <Link to={`/property/${p.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-brand-tint">
        {p.images?.[0] ? (
          <img src={p.images[0]} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <PropertyArt category={p.category} seed={p.id} className="transition-transform duration-500 group-hover:scale-105" />
        )}
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-ink/85 px-2.5 py-1 text-[0.7rem] font-bold text-white backdrop-blur">{cat?.single}</span>
          {p.featured && (
            <span className="inline-flex items-center gap-1 rounded-full bg-saffron px-2.5 py-1 text-[0.7rem] font-extrabold text-ink">
              <Star size={11} fill="currentColor" /> Featured
            </span>
          )}
        </div>
        <span className="absolute bottom-3 left-3 rounded-lg bg-white/95 px-2.5 py-1 font-display text-[0.95rem] font-extrabold text-brand-deep shadow">
          {formatPrice(p.rent)}<span className="text-[0.7rem] font-semibold text-muted">/mo</span>
        </span>
      </Link>

      <button
        type="button"
        onClick={() => toggleSave(p.id)}
        aria-label={isSaved ? 'Remove from shortlist' : 'Save to shortlist'}
        aria-pressed={isSaved}
        className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/95 shadow transition-transform hover:scale-110"
      >
        <Heart size={18} className={isSaved ? 'fill-red-500 text-red-500' : 'text-ink-soft'} />
      </button>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-1 text-[1.02rem] font-bold leading-snug">
          <Link to={`/property/${p.slug}`} className="hover:text-brand">{p.title}</Link>
        </h3>
        <p className="mt-1 flex items-center gap-1 text-[0.82rem] text-muted">
          <MapPin size={14} className="shrink-0 text-saffron-deep" /> <span className="truncate">{p.locality}, Jaipur</span>
        </p>

        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-[0.8rem] font-semibold text-ink-soft">
          {p.bhk && <span className="inline-flex items-center gap-1"><BedDouble size={15} className="text-brand" /> {p.bhk} BHK</span>}
          {p.area && <span className="inline-flex items-center gap-1"><Maximize2 size={14} className="text-brand" /> {formatArea(p.area)}</span>}
          <span className="inline-flex items-center gap-1"><Sofa size={15} className="text-brand" /> {furnishingLabel(p.furnishing)}</span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-4 text-xs text-muted">
          {p.verified ? (
            <span className="inline-flex items-center gap-1 font-bold text-emerald-700"><BadgeCheck size={15} /> Verified</span>
          ) : (
            <span>Owner listing</span>
          )}
          <span>{timeAgo(p.listedAt)}</span>
        </div>
      </div>
    </article>
  )
}
