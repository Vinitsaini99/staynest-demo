import { Link } from 'react-router-dom'
import { ChevronRight, Star } from 'lucide-react'
import Reveal from './Reveal'

export function SectionHead({ eyebrow, title, intro, align = 'left', light = false, action }) {
  return (
    <Reveal className={`mb-10 flex flex-wrap items-end justify-between gap-4 ${align === 'center' ? 'justify-center text-center' : ''}`}>
      <div className={align === 'center' ? 'mx-auto max-w-2xl' : 'max-w-2xl'}>
        {eyebrow && <p className={`eyebrow ${light ? 'eyebrow-light' : ''}`}>{eyebrow}</p>}
        <h2 className={`mt-3 text-3xl leading-tight md:text-[2.6rem] ${light ? 'text-ivory' : 'text-forest'}`}>{title}</h2>
        {intro && <p className={`mt-4 text-[0.98rem] leading-relaxed ${light ? 'text-ivory/70' : 'text-muted'}`}>{intro}</p>}
      </div>
      {action}
    </Reveal>
  )
}

export function Breadcrumbs({ items, light = false }) {
  return (
    <nav aria-label="Breadcrumb" className={`flex flex-wrap items-center gap-1 text-xs ${light ? 'text-ivory/65' : 'text-muted'}`}>
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <ChevronRight size={12} />}
          {it.to ? <Link to={it.to} className="hover:text-gold-deep">{it.label}</Link> : <span className={light ? 'text-ivory' : 'text-forest'} aria-current="page">{it.label}</span>}
        </span>
      ))}
    </nav>
  )
}

export function PageHero({ eyebrow, title, intro, crumbs, children }) {
  return (
    <section className="border-b border-line">
      <div className="container-x py-12 md:py-16">
        {crumbs && <Breadcrumbs items={crumbs} />}
        {eyebrow && <p className="eyebrow mt-8">{eyebrow}</p>}
        <h1 className={`${eyebrow ? 'mt-3' : 'mt-8'} max-w-3xl text-4xl leading-[1.1] text-forest md:text-[3.2rem]`}>{title}</h1>
        {intro && <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">{intro}</p>}
        {children}
      </div>
    </section>
  )
}

export function Stars({ value = 5, size = 15 }) {
  return (
    <span className="inline-flex" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} size={size} className={n <= value ? 'fill-gold text-gold' : 'text-line'} />
      ))}
    </span>
  )
}

export function Badge({ children, tone = 'forest', className = '' }) {
  const tones = {
    forest: 'bg-forest text-ivory',
    gold: 'bg-gold text-forest',
    light: 'bg-ivory/95 text-forest',
    outline: 'border border-line text-muted bg-white',
  }
  return <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-[0.66rem] font-bold uppercase tracking-wider ${tones[tone]} ${className}`}>{children}</span>
}
