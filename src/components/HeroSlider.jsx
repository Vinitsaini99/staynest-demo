import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { HERO_SLIDES } from '../data/photos'

const INTERVAL = 5500

// Full-bleed background slideshow for the hero. Crossfades between property photos.
export default function HeroSlider() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    HERO_SLIDES.forEach((s) => {
      const img = new Image()
      img.src = s.src
    })
  }, [])

  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (paused || reduce) return undefined
    const t = setInterval(() => setI((x) => (x + 1) % HERO_SLIDES.length), INTERVAL)
    return () => clearInterval(t)
  }, [paused])

  return (
    <>
      <div className="absolute inset-0 overflow-hidden bg-ink" aria-hidden="true">
        {HERO_SLIDES.map((s, k) => (
          <div
            key={s.src}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[1400ms] ease-in-out ${k === i ? 'opacity-100' : 'opacity-0'}`}
            style={{ backgroundImage: `url(${s.src})`, transform: k === i ? 'scale(1.07)' : 'scale(1)', transition: 'opacity 1.4s ease-in-out, transform 7s ease-out' }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/55 to-ink/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-ink/30" />
      </div>

      <div
        className="absolute inset-x-0 bottom-4 z-10 hidden items-center justify-between sm:flex"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="container-x flex w-full items-center justify-between">
          <div className="flex items-center gap-2" role="tablist" aria-label="Hero photos">
            {HERO_SLIDES.map((s, k) => (
              <button
                key={s.src}
                type="button"
                role="tab"
                aria-selected={k === i}
                aria-label={`Show ${s.label}`}
                onClick={() => setI(k)}
                className={`h-1.5 rounded-full transition-all ${k === i ? 'w-8 bg-saffron' : 'w-3 bg-white/50 hover:bg-white/80'}`}
              />
            ))}
          </div>
          <Link to={HERO_SLIDES[i].to} className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-bold text-white backdrop-blur transition-colors hover:bg-white/25">
            {HERO_SLIDES[i].label} <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </>
  )
}
