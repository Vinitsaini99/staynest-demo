import { Link } from 'react-router-dom'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import Logo from './Logo'
import { SITE } from '../../config/site'
import { categories } from '../../data/categories'
import { localities } from '../../data/localities'

const h = 'mb-3 text-sm font-extrabold uppercase tracking-wider text-saffron'
const a = 'block py-1 text-sm text-white/70 transition-colors hover:text-white'

export default function Footer() {
  return (
    <footer className="mt-20 bg-ink pb-24 text-white md:pb-0">
      <div className="container-x grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr]">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">{SITE.tagline}</p>
        </div>

        <div>
          <h3 className={h}>Browse</h3>
          {categories.map((c) => <Link key={c.slug} to={`/rentals?category=${c.slug}`} className={a}>{c.label}</Link>)}
          <Link to="/rentals" className={a}>All rentals</Link>
        </div>

        <div>
          <h3 className={h}>Popular areas</h3>
          {localities.slice(0, 6).map((l) => <Link key={l.name} to={`/rentals?locality=${encodeURIComponent(l.name)}`} className={a}>{l.name}</Link>)}
        </div>

        <div>
          <h3 className={h}>Get in touch</h3>
          <ul className="space-y-2.5 text-sm text-white/70">
            <li className="flex gap-2"><Phone size={16} className="mt-0.5 shrink-0 text-saffron" /> <a href={`tel:${SITE.phoneTel}`} className="hover:text-white">{SITE.phone}</a></li>
            <li className="flex gap-2"><Mail size={16} className="mt-0.5 shrink-0 text-saffron" /> <a href={`mailto:${SITE.email}`} className="hover:text-white">{SITE.email}</a></li>
            <li className="flex gap-2"><MapPin size={16} className="mt-0.5 shrink-0 text-saffron" /> {SITE.address}</li>
            <li className="flex gap-2"><Clock size={16} className="mt-0.5 shrink-0 text-saffron" /> {SITE.hours}</li>
          </ul>
          <div className="mt-4 flex gap-4 text-sm text-white/70">
            <Link to="/about" className="hover:text-white">About</Link>
            <Link to="/privacy" className="hover:text-white">Privacy</Link>
            <Link to="/terms" className="hover:text-white">Terms</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/50">
        © {new Date().getFullYear()} {SITE.name}. Listings are provided by owners; always visit a property before paying a deposit.
      </div>
    </footer>
  )
}
