import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { imgSrc } from '../../utils/image'
import SearchBar from '../property/SearchBar'

export default function Hero() {
  return (
    <section className="relative">
      <div className="container-x pb-10 pt-12 md:pb-14 md:pt-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="max-w-3xl">
          <p className="eyebrow">Kota, Rajasthan</p>
          <h1 className="mt-5 text-[2.7rem] leading-[1.05] text-forest sm:text-6xl lg:text-[4.6rem]">
            Find Your Dream <em className="font-normal italic text-gold-deep">Property</em> in Kota
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            Flats, houses, villas, plots and commercial spaces across Kota’s best localities.
          </p>
          <Link to="/sell-your-property" className="link-underline group mt-7 inline-flex items-center gap-2 pb-0.5 text-sm font-semibold text-forest">
            Want to sell? List your property <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>

      <div className="container-x relative">
        <div className="relative z-10 mx-auto hidden max-w-6xl md:block">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }} className="-mb-9">
            <SearchBar />
          </motion.div>
        </div>
        <div className="mb-8 md:hidden"><SearchBar variant="stacked" /></div>
        <div className="aspect-[16/10] overflow-hidden bg-stone sm:aspect-[21/8]">
          <img src={imgSrc('1613490493576-7fde63acd811', 1800, 700)} alt="Modern villa with a pool" className="h-full w-full object-cover" fetchPriority="high" />
        </div>
      </div>
    </section>
  )
}
