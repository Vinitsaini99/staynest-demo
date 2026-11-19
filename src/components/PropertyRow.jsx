import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import PropertyCard from './PropertyCard'

// Horizontal scroller used on the home page for each category.
export default function PropertyRow({ items }) {
  const ref = useRef(null)
  const scroll = (dir) => ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.85, behavior: 'smooth' })

  return (
    <div className="group/row relative">
      <div ref={ref} className="no-scrollbar -mx-1 flex snap-x snap-mandatory gap-5 overflow-x-auto px-1 pb-3">
        {items.map((p) => (
          <div key={p.id} className="w-[78%] shrink-0 snap-start sm:w-[44%] lg:w-[31.5%] xl:w-[23.8%]">
            <PropertyCard p={p} className="h-full" />
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => scroll(-1)}
        aria-label="Scroll left"
        className="absolute -left-3 top-1/3 hidden h-10 w-10 place-items-center rounded-full border border-line bg-white shadow-card hover:text-brand lg:group-hover/row:grid"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        type="button"
        onClick={() => scroll(1)}
        aria-label="Scroll right"
        className="absolute -right-3 top-1/3 hidden h-10 w-10 place-items-center rounded-full border border-line bg-white shadow-card hover:text-brand lg:group-hover/row:grid"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  )
}
