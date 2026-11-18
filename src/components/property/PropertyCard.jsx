import { memo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, ShieldCheck } from 'lucide-react'
import { locations } from '../../data/locations'
import { formatArea, formatPrice, timeAgo } from '../../utils/format'
import { imgSrc, imgSrcSet } from '../../utils/image'
import { useApp } from '../../context/AppContext'
import { ContactModal } from './EnquiryForm'

export const localityName = (slug) => locations.find((l) => l.slug === slug)?.name || slug

function PropertyCard({ property: p, view = 'grid' }) {
  const { isSaved, toggleWishlist } = useApp()
  const [contact, setContact] = useState(false)
  const saved = isSaved(p.id)
  const list = view === 'list'
  const href = `/property/${p.slug}`
  const specs = p.sharing
    ? [p.propertyType, `${p.sharing.join(' / ')} sharing`, p.food ? 'Meals included' : 'No meals']
    : [p.propertyType, formatArea(p.areaSqft), p.furnishing].filter(Boolean)

  return (
    <motion.article layout="position" className={`group ${list ? 'sm:flex sm:gap-6' : ''}`}>
      <div className={`relative ${list ? 'sm:w-72 sm:shrink-0 lg:w-80' : ''}`}>
        <Link to={href} className="img-zoom block bg-stone" tabIndex={-1} aria-hidden="true">
          <img
            src={imgSrc(p.images[0], 800, 600)} srcSet={imgSrcSet(p.images[0], [480, 800])} sizes="(min-width:1280px) 400px, (min-width:640px) 50vw, 100vw"
            alt={p.title} loading="lazy" decoding="async" width="800" height="600"
            className={`w-full object-cover ${list ? 'aspect-[4/3] sm:h-full sm:aspect-auto' : 'aspect-[4/3]'}`}
          />
        </Link>
        {(p.featured || p.verified) && (
          <div className="absolute left-3 top-3 flex gap-1.5">
            {p.featured && <span className="bg-ivory px-2.5 py-1 text-[0.64rem] font-bold uppercase tracking-wider text-forest">Featured</span>}
            {p.verified && <span className="inline-flex items-center gap-1 bg-forest px-2.5 py-1 text-[0.64rem] font-bold uppercase tracking-wider text-ivory"><ShieldCheck size={11} /> Verified</span>}
          </div>
        )}
        <button
          onClick={() => toggleWishlist(p.id)} aria-pressed={saved} aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-ivory text-forest transition-transform hover:scale-105"
        >
          <Heart size={16} className={saved ? 'fill-[#b4412f] text-[#b4412f]' : ''} />
        </button>
      </div>

      <div className={`flex flex-1 flex-col ${list ? 'py-1' : 'pt-4'}`}>
        <div className="flex items-baseline justify-between gap-3">
          <p className="font-display text-2xl text-forest">{formatPrice(p.price)}<span className="font-sans text-xs font-normal text-muted"> /month{p.sharing ? ' · per bed' : ''}</span></p>
          <span className="text-xs text-muted">{timeAgo(p.listedAt)}</span>
        </div>
        <h3 className="mt-1.5 font-sans text-[0.98rem] font-medium leading-snug tracking-normal text-charcoal">
          <Link to={href} className="hover:text-gold-deep">{p.title}</Link>
        </h3>
        <p className="mt-1 text-sm text-muted">{localityName(p.locality)}, Kota · {specs.join(' · ')}</p>
        {list && <p className="mt-3 line-clamp-2 text-sm text-muted">{p.description}</p>}
        <div className="mt-4 flex items-center gap-5 text-sm font-semibold">
          <Link to={href} className="link-underline pb-0.5 text-forest">View Details</Link>
          <button onClick={() => setContact(true)} className="link-underline pb-0.5 text-muted hover:text-forest">Contact Owner</button>
        </div>
      </div>
      <ContactModal open={contact} onClose={() => setContact(false)} property={p} />
    </motion.article>
  )
}

export default memo(PropertyCard)
