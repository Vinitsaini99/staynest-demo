import { Link } from 'react-router-dom'

export default function Logo({ light = false }) {
  return (
    <Link to="/" className="inline-flex items-center gap-2.5" aria-label="GharKhoj Jaipur home">
      <svg width="38" height="38" viewBox="0 0 64 64" aria-hidden="true">
        <rect width="64" height="64" rx="16" fill="#0e7c86" />
        <path d="M14 32 32 15l18 17v18a2 2 0 0 1-2 2H16a2 2 0 0 1-2-2z" fill="#fffdf8" />
        <circle cx="32" cy="37" r="7" fill="none" stroke="#f59e0b" strokeWidth="4" />
        <path d="m37 42 6 6" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
      </svg>
      <span className="leading-none">
        <span className={`block font-display text-xl font-extrabold ${light ? 'text-white' : 'text-ink'}`}>
          Ghar<span className="text-saffron">Khoj</span>
        </span>
        <span className={`block text-[0.62rem] font-bold uppercase tracking-[0.2em] ${light ? 'text-white/60' : 'text-muted'}`}>Jaipur rentals</span>
      </span>
    </Link>
  )
}
