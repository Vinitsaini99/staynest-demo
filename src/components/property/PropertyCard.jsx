import { memo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Bath, BedDouble, Heart, Maximize, MapPin, ShieldCheck, Sparkles } from 'lucide-react'
import { locations } from '../../data/locations'
import { formatArea, formatPrice, pricePerSqft, timeAgo } from '../../utils/format'
import { imgSrc, imgSrcSet } from '../../utils/image'
import { useApp } from '../../context/AppContext'
import { Badge } from '../ui/Bits'
import { Button, LinkButton } from '../ui/Button'
import { ContactModal } from './EnquiryForm'

export const localityName = (slug) => locations.find((l) => l.slug === slug)?.name || slug

function Spec({ icon: Icon, children }) {
  return <span className="inline-flex items-center gap-1.5 text-[0.82rem] text-charcoal/80"><Icon size={15} className="text-gold-deep" strokeWidth={1.7} />{children}</span>
}

function PropertyCard({ property: p, view = 'grid' }) {
  const { isSaved, toggleWishlist } = useApp()
  const [contact, setContact] = useState(false)
  const saved = isSaved(p.id)
  const list = view === 'list'
  const href = `/property/${p.slug}`

  return (
    <motion.article
      layout="position"
      className={`group border border-line bg-white transition-shadow duration-300 hover:shadow-[0_24px_50px_-28px_rgba(20,45,39,0.45)] ${list ? 'sm:flex' : 'flex flex-col'}`}
    >
      <div className={`relative ${list ? 'sm:w-72 sm:shrink-0 lg:w-80' : ''}`}>
        <Link to={href} className="img-zoom block bg-stone" tabIndex={-1} aria-hidden="true">
          <img
            src={imgSrc(p.images[0], 800, 600)} srcSet={imgSrcSet(p.images[0], [480, 800])} sizes="(min-width:1280px) 400px, (min-width:640px) 50vw, 100vw"
            alt={p.title} loading="lazy" decoding="async" width="800" height="600"
            className={`w-full object-cover ${list ? 'aspect-[4/3] sm:h-full sm:aspect-auto' : 'aspect-[4/3]'}`}
          />
        </Link>
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {p.featured && <Badge tone="gold"><Sparkles size={11} /> Featured</Badge>}
          {p.verified && <Badge tone="forest"><ShieldCheck size={11} /> Verified</Badge>}
        </div>
        <button
          onClick={() => toggleWishlist(p.id)} aria-pressed={saved} aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center bg-white/95 text-forest shadow transition-transform hover:scale-105"
        >
          <Heart size={17} className={saved ? 'fill-[#b4412f] text-[#b4412f]' : ''} />
        </button>
        <span className="absolute bottom-3 left-3 bg-forest/85 px-2 py-1 text-[0.62rem] font-semibold uppercase tracking-wider text-ivory">{p.propertyType}</span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <p className="font-display text-[1.65rem] leading-none text-forest">{formatPrice(p.price)}</p>
          <span className="shrink-0 pt-1 text-[0.7rem] text-muted">{timeAgo(p.listedAt)}</span>
        </div>
        {pricePerSqft(p.price, p.areaSqft) && <p className="mt-1 text-xs text-muted">{pricePerSqft(p.price, p.areaSqft)}</p>}
        <h3 className="mt-3 font-sans text-[1.02rem] font-semibold leading-snug tracking-normal text-charcoal">
          <Link to={href} className="hover:text-forest">{p.title}</Link>
        </h3>
        <p className="mt-1.5 flex items-center gap-1.5 text-[0.82rem] text-muted"><MapPin size={14} className="shrink-0" />{localityName(p.locality)}, Kota</p>

        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-y border-line/80 py-3.5">
          {p.bhk > 0 && <Spec icon={BedDouble}>{p.bhk} BHK</Spec>}
          {p.bathrooms > 0 && <Spec icon={Bath}>{p.bathrooms} Bath</Spec>}
          <Spec icon={Maximize}>{formatArea(p.areaSqft)}</Spec>
        </div>

        {list && <p className="mt-3 line-clamp-2 text-sm text-muted">{p.description}</p>}

        <div className="mt-auto flex items-center justify-between gap-2 pt-5">
          <span className="truncate text-xs text-muted">{p.seller.name}</span>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => setContact(true)}>Contact Seller</Button>
            <LinkButton to={href} size="sm" variant="primary">View Details</LinkButton>
          </div>
        </div>
      </div>
      <ContactModal open={contact} onClose={() => setContact(false)} property={p} />
    </motion.article>
  )
}

export default memo(PropertyCard)
