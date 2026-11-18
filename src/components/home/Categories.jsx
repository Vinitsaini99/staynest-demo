import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { categories } from '../../data/categories'
import { getCounts } from '../../services/api'
import { imgSrc } from '../../utils/image'
import Reveal from '../ui/Reveal'
import { SectionHead } from '../ui/Bits'

export default function Categories() {
  const { byCategory } = getCounts()
  return (
    <section className="container-x py-20 md:py-28">
      <SectionHead eyebrow="Browse by category" title="Every kind of property, thoughtfully organised" intro="Start with the type of property you need — from city apartments to commercial land." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((c, i) => {
          const count = byCategory[c.slug]
          const big = i === 0 || i === 3
          return (
            <Reveal key={c.slug} delay={(i % 4) * 0.06} className={i === categories.length - 1 && categories.length % 4 === 3 ? 'sm:col-span-2 lg:col-span-4' : big ? 'lg:col-span-2' : ''}>
              <Link to={c.path} className="group relative block aspect-[4/3] overflow-hidden bg-forest sm:aspect-[16/10] lg:aspect-auto lg:h-72">
                <div className="img-zoom absolute inset-0"><img src={imgSrc(c.image, big ? 900 : 600, 560)} alt="" loading="lazy" className="h-full w-full object-cover" /></div>
                <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-ivory">
                  <div>
                    <p className="text-[0.66rem] font-bold uppercase tracking-[0.2em] text-gold">{c.segment}{count ? ` · ${count} listed` : ''}</p>
                    <h3 className="mt-1 text-2xl">{c.label}</h3>
                    <p className="mt-1 text-sm text-ivory/70">{c.blurb}</p>
                  </div>
                  <span className="grid h-10 w-10 shrink-0 place-items-center border border-ivory/40 transition-colors group-hover:border-gold group-hover:bg-gold group-hover:text-forest"><ArrowUpRight size={18} /></span>
                </div>
              </Link>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
