import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone, Clock } from 'lucide-react'
import { SITE } from '../../config/site'
import { categories } from '../../data/categories'
import { locations } from '../../data/locations'
import Logo from './Logo'
import SocialIcon from './SocialIcons'

const quick = [
  { label: 'All Listings', to: '/properties' },
  { label: 'List Your Property', to: '/sell-your-property' },
  { label: 'PG & Hostels', to: '/pg-hostels' },
  { label: 'Rent', to: '/rent' },
  { label: 'Locations', to: '/locations' },
  { label: 'Insights', to: '/insights' },
  { label: 'About Us', to: '/about-us' },
  { label: 'Contact Us', to: '/contact-us' },
]

const ColTitle = ({ children }) => <h3 className="mb-5 font-sans text-[0.72rem] font-bold uppercase tracking-[0.22em] text-gold">{children}</h3>
const linkCls = 'block py-1 text-sm text-ivory/70 transition-colors hover:text-gold'

export default function Footer() {
  return (
    <footer className="bg-forest pb-20 text-ivory lg:pb-0">
      <div className="container-x pt-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo light />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ivory/70">
              {SITE.tagline} Find affordable PGs, hostels, rooms and rental homes across Kota's best localities.
            </p>
            <div className="mt-6 flex gap-2">
              {Object.entries(SITE.social).map(([name, href]) => (
                <a key={name} href={href} target="_blank" rel="noopener noreferrer" aria-label={name} className="grid h-9 w-9 place-items-center border border-ivory/20 text-ivory/80 transition-colors hover:border-gold hover:bg-gold hover:text-forest">
                  <SocialIcon name={name} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:col-span-8">
            <div>
              <ColTitle>Quick Links</ColTitle>
              {quick.map((l) => <Link key={l.to} to={l.to} className={linkCls}>{l.label}</Link>)}
            </div>
            <div>
              <ColTitle>Categories</ColTitle>
              {categories.map((c) => <Link key={c.slug} to={c.path} className={linkCls}>{c.label}</Link>)}
            </div>
            <div>
              <ColTitle>Popular Locations</ColTitle>
              {locations.slice(0, 8).map((l) => <Link key={l.slug} to={`/locations/${l.slug}`} className={linkCls}>{l.name}</Link>)}
            </div>
            <div className="col-span-2 sm:col-span-1">
              <ColTitle>Contact</ColTitle>
              <ul className="space-y-3 text-sm text-ivory/70">
                <li className="flex gap-2.5"><MapPin size={15} className="mt-0.5 shrink-0 text-gold" />{SITE.address}</li>
                <li><a href={`tel:+${SITE.phoneRaw}`} className="flex gap-2.5 hover:text-gold"><Phone size={15} className="mt-0.5 shrink-0 text-gold" />{SITE.phone}</a></li>
                <li><a href={`mailto:${SITE.email}`} className="flex gap-2.5 break-all hover:text-gold"><Mail size={15} className="mt-0.5 shrink-0 text-gold" />{SITE.email}</a></li>
                <li className="flex gap-2.5"><Clock size={15} className="mt-0.5 shrink-0 text-gold" />{SITE.hours}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-ivory/15 py-6 text-xs text-ivory/55 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            <Link to="/privacy-policy" className="hover:text-gold">Privacy Policy</Link>
            <Link to="/terms-and-conditions" className="hover:text-gold">Terms &amp; Conditions</Link>
            <Link to="/about-us" className="hover:text-gold">About Us</Link>
            <Link to="/contact-us" className="hover:text-gold">Contact</Link>
          </div>
        </div>
        <p className="border-t border-ivory/10 pb-8 pt-5 text-[0.7rem] leading-relaxed text-ivory/40">
          Listings shown are sample demonstration data. Property details, prices and availability must be independently verified with the owner before paying any rent or deposit.
        </p>
      </div>
    </footer>
  )
}
