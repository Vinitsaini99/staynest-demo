import { Link } from 'react-router-dom'
import { categories } from '../../data/categories'
import { getCounts } from '../../services/api'
import { imgSrc } from '../../utils/image'
import Reveal from '../ui/Reveal'
import { SectionHead } from '../ui/Bits'

export default function Categories() {
  const { byCategory } = getCounts()
  return (
    <section className="container-x py-20 md:py-28">
      <SectionHead eyebrow="Browse by category" title="Every kind of property" />
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 lg:grid-cols-7">
        {categories.map((c, i) => {
          const count = byCategory[c.slug]
          return (
            <Reveal key={c.slug} delay={(i % 4) * 0.05} className={i === categories.length - 1 ? 'max-md:col-span-2' : ''}>
              <Link to={c.path} className="group block">
                <div className="img-zoom aspect-[3/4] bg-stone"><img src={imgSrc(c.image, 400, 533)} alt="" loading="lazy" className="h-full w-full object-cover" /></div>
                <h3 className="mt-3 font-sans text-[0.95rem] font-medium tracking-normal text-forest group-hover:text-gold-deep">{c.label}</h3>
                <p className="text-xs text-muted">{count ? `${count} listed` : c.blurb}</p>
              </Link>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
