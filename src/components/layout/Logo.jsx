import { Link } from 'react-router-dom'
import { SITE } from '../../config/site'

export function LogoMark({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <rect width="48" height="48" fill="#142D27" />
      <rect x="3" y="3" width="42" height="42" fill="none" stroke="#D5A65B" strokeOpacity="0.45" />
      <path d="M17 12v24M17 25l13-13M20.5 23l11.5 13" stroke="#D5A65B" strokeWidth="3" strokeLinecap="square" fill="none" />
    </svg>
  )
}

export default function Logo({ light = false }) {
  return (
    <Link to="/" className="flex items-center gap-3" aria-label={`${SITE.name} home`}>
      <LogoMark />
      <span className="whitespace-nowrap leading-none">
        <span className={`block font-display text-[1.15rem] font-medium tracking-tight sm:text-[1.35rem] ${light ? 'text-ivory' : 'text-forest'}`}>Kota Ki Property</span>
        <span className={`mt-1 block text-[0.56rem] font-semibold uppercase tracking-[0.28em] sm:text-[0.6rem] ${light ? 'text-gold' : 'text-gold-deep'}`}>Kota · Rajasthan</span>
      </span>
    </Link>
  )
}
