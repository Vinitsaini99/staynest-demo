import { Link } from 'react-router-dom'

const links = [
  { label: 'About Us', to: '/student/home' },
  { label: 'Contact', to: '/student/home' },
  { label: 'Privacy Policy', to: '/student/home' },
  { label: 'Terms & Conditions', to: '/student/home' },
  { label: 'Support', to: '/student/dashboard' },
]

export default function SiteFooter() {
  return (
    <footer className="border-t border-border bg-primary text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:px-6">
        <div>
          <p className="font-heading text-2xl font-bold tracking-tight">
            Stay<span className="text-accent">Nest</span>
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/60">
            Premium urban living for students — verified PGs and hostels with transparent booking and modern management.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Explore</p>
          <div className="mt-4 space-y-2.5 text-sm text-white/65">
            <Link to="/student/search" className="block hover:text-white">Explore Stays</Link>
            <Link to="/student/search?category=Girls%20PG" className="block hover:text-white">For Students</Link>
            <Link to="/owner/dashboard" className="block hover:text-white">List Your Property</Link>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Company</p>
          <div className="mt-4 space-y-2.5 text-sm text-white/65">
            {links.slice(0, 3).map((l) => (
              <Link key={l.label} to={l.to} className="block hover:text-white">{l.label}</Link>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Help</p>
          <div className="mt-4 space-y-2.5 text-sm text-white/65">
            {links.slice(3).map((l) => (
              <Link key={l.label} to={l.to} className="block hover:text-white">{l.label}</Link>
            ))}
            <p>hello@staynest.co</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-xs text-white/45 md:flex-row md:items-center md:justify-between md:px-6">
          <p>© 2026 StayNest. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            {links.map((l) => (
              <Link key={l.label} to={l.to} className="hover:text-white/80">{l.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
