import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import { getCounts } from '../../services/api'
import { locations } from '../../data/locations'
import { categories } from '../../data/categories'
import { imgSrc } from '../../utils/image'
import SearchBar from '../property/SearchBar'

export default function Hero() {
  const { total } = getCounts()
  const stats = [
    [total, 'Sample listings'],
    [locations.length, 'Kota localities'],
    [categories.length, 'Property categories'],
  ]
  return (
    <section className="relative isolate overflow-hidden bg-forest text-ivory">
      <img src={imgSrc('1613490493576-7fde63acd811', 1800, 1000)} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" fetchPriority="high" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-forest via-forest/85 to-forest/40" />
      <div className="blueprint absolute inset-0 -z-10" />

      <div className="container-x pb-24 pt-16 md:pb-32 md:pt-24">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="max-w-3xl">
          <p className="eyebrow eyebrow-light flex items-center gap-2"><span className="h-px w-8 bg-gold" /> Kota, Rajasthan</p>
          <h1 className="mt-5 text-[2.6rem] leading-[1.04] sm:text-6xl lg:text-[4.4rem]">
            Find Your Dream <em className="font-normal italic text-gold">Property</em> in Kota
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ivory/75 md:text-lg">
            Flats, houses, villas, plots and commercial spaces across Kota's most sought-after localities — presented clearly, with direct access to sellers.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link to="/sell-your-property" className="group inline-flex items-center gap-2 border-b border-gold pb-1 text-sm font-semibold text-gold">
              Want to sell? List your property <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <span className="flex items-center gap-2 text-sm text-ivory/70"><ShieldCheck size={16} className="text-gold" /> Verified-listing badges</span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }} className="mt-12 hidden max-w-6xl md:block">
          <SearchBar />
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-10 md:hidden">
          <SearchBar variant="stacked" />
        </motion.div>

        <dl className="mt-12 flex flex-wrap gap-x-12 gap-y-5 border-t border-ivory/15 pt-7">
          {stats.map(([n, l]) => (
            <div key={l}>
              <dt className="sr-only">{l}</dt>
              <dd className="flex items-baseline gap-3"><span className="font-display text-4xl text-gold">{n}</span><span className="text-xs uppercase tracking-[0.18em] text-ivory/65">{l}</span></dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
