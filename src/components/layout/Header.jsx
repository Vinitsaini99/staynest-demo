import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Heart, LogOut, LayoutDashboard, Menu, Phone, User } from 'lucide-react'
import { NAV, SITE } from '../../config/site'
import { useApp } from '../../context/AppContext'
import Logo from './Logo'
import Modal from '../ui/Modal'
import { LinkButton, btnClass } from '../ui/Button'

const pathOf = (to) => to.split('?')[0]

function DesktopItem({ item }) {
  const [open, setOpen] = useState(false)
  const timer = useRef()
  const { pathname } = useLocation()
  const active = item.to === '/' ? pathname === '/' : pathname === pathOf(item.to) || item.children?.some((c) => pathname === pathOf(c.to))
  const show = () => { clearTimeout(timer.current); setOpen(true) }
  const hide = () => { timer.current = setTimeout(() => setOpen(false), 120) }

  const label = (
    <span className={`relative inline-flex items-center gap-1 py-2 text-[0.84rem] font-semibold tracking-wide transition-colors ${active ? 'text-forest' : 'text-charcoal/80 hover:text-forest'}`}>
      {item.label}
      {item.children && <ChevronDown size={13} className={`transition-transform ${open ? 'rotate-180' : ''}`} />}
      <span className={`absolute inset-x-0 -bottom-0.5 h-[2px] origin-left bg-gold transition-transform duration-300 ${active || open ? 'scale-x-100' : 'scale-x-0'}`} />
    </span>
  )

  if (!item.children) return <NavLink to={item.to} end={item.to === '/'}>{label}</NavLink>

  return (
    <div className="relative" onMouseEnter={show} onMouseLeave={hide} onFocus={show} onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && hide()}>
      <Link to={item.to} aria-haspopup="true" aria-expanded={open}>{label}</Link>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.18 }}
            className="absolute left-1/2 top-full z-50 w-60 -translate-x-1/2 pt-3"
          >
            <div className="border border-line bg-white py-2 shadow-[0_18px_40px_-18px_rgba(20,45,39,0.35)]">
              <Link to={item.to} onClick={() => setOpen(false)} className="block px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-gold-deep hover:bg-ivory">All {item.label}</Link>
              {item.children.map((c) => (
                <Link key={c.to} to={c.to} onClick={() => setOpen(false)} className="block px-5 py-2.5 text-sm text-charcoal hover:bg-ivory hover:text-forest">{c.label}</Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function UserMenu() {
  const { user, logout } = useApp()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const ref = useRef()
  useEffect(() => {
    const close = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false)
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])
  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen((o) => !o)} className="flex items-center gap-2 border border-line bg-white px-3 py-2 text-sm font-semibold text-forest hover:border-forest" aria-haspopup="true" aria-expanded={open}>
        <span className="grid h-6 w-6 place-items-center bg-forest text-[0.7rem] text-gold">{user.name[0].toUpperCase()}</span>
        <span className="hidden max-w-24 truncate xl:block">{user.name.split(' ')[0]}</span>
        <ChevronDown size={13} />
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-52 border border-line bg-white py-2 shadow-xl">
          <Link to="/dashboard" onClick={() => setOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-ivory"><LayoutDashboard size={15} /> My Dashboard</Link>
          <Link to="/dashboard?tab=saved" onClick={() => setOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-ivory"><Heart size={15} /> Saved Properties</Link>
          <button onClick={() => { logout(); setOpen(false); navigate('/') }} className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm hover:bg-ivory"><LogOut size={15} /> Log out</button>
        </div>
      )}
    </div>
  )
}

function MobileDrawer({ open, onClose }) {
  const { user, logout } = useApp()
  const [expanded, setExpanded] = useState(null)
  return (
    <Modal open={open} onClose={onClose} title="Menu" side>
      <nav className="-mx-2">
        {NAV.map((item) => (
          <div key={item.label} className="border-b border-line/70">
            {item.children ? (
              <>
                <button className="flex w-full items-center justify-between px-2 py-4 text-left text-base font-semibold text-forest" onClick={() => setExpanded(expanded === item.label ? null : item.label)} aria-expanded={expanded === item.label}>
                  {item.label}
                  <ChevronDown size={18} className={`transition-transform ${expanded === item.label ? 'rotate-180' : ''}`} />
                </button>
                {expanded === item.label && (
                  <div className="pb-3 pl-4">
                    <Link to={item.to} onClick={onClose} className="block py-2 text-sm font-semibold text-gold-deep">All {item.label}</Link>
                    {item.children.map((c) => <Link key={c.to} to={c.to} onClick={onClose} className="block py-2 text-sm text-charcoal">{c.label}</Link>)}
                  </div>
                )}
              </>
            ) : (
              <Link to={item.to} onClick={onClose} className="block px-2 py-4 text-base font-semibold text-forest">{item.label}</Link>
            )}
          </div>
        ))}
      </nav>
      <div className="mt-6 space-y-3">
        <LinkButton to="/sell-your-property" variant="gold" className="w-full" onClick={onClose}>Sell Your Property</LinkButton>
        {user ? (
          <>
            <LinkButton to="/dashboard" variant="outline" className="w-full" onClick={onClose}>My Dashboard</LinkButton>
            <button className={btnClass('ghost', 'md', 'w-full')} onClick={() => { logout(); onClose() }}>Log out</button>
          </>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <LinkButton to="/login" variant="outline" onClick={onClose}>Login</LinkButton>
            <LinkButton to="/register" variant="primary" onClick={onClose}>Register</LinkButton>
          </div>
        )}
        <a href={`tel:+${SITE.phoneRaw}`} className="flex items-center justify-center gap-2 pt-2 text-sm font-semibold text-forest"><Phone size={15} /> {SITE.phone}</a>
      </div>
    </Modal>
  )
}

export default function Header() {
  const { user } = useApp()
  const [drawer, setDrawer] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setDrawer(false), [pathname])
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  return (
    <header className="sticky top-0 z-40">
      <div className={`bg-ivory/90 backdrop-blur-md transition-colors ${scrolled ? 'border-b border-line' : 'border-b border-transparent'}`}>
        <div className="container-x flex h-[76px] items-center justify-between gap-4">
          <Logo />
          <nav className="hidden items-center gap-6 xl:gap-7 lg:flex" aria-label="Primary">
            {NAV.map((item) => <DesktopItem key={item.label} item={item} />)}
          </nav>
          <div className="flex items-center gap-2.5">
            {user ? (
              <div className="hidden lg:block"><UserMenu /></div>
            ) : (
              <Link to="/login" className="hidden items-center gap-1.5 px-2 py-2 text-[0.84rem] font-semibold text-forest hover:text-gold-deep lg:flex"><User size={15} /> Login / Register</Link>
            )}
            <div className="hidden md:block"><LinkButton to="/sell-your-property" variant="primary" size="sm">Sell Your Property</LinkButton></div>
            <button className="grid h-10 w-10 place-items-center text-forest lg:hidden" onClick={() => setDrawer(true)} aria-label="Open menu"><Menu size={20} /></button>
          </div>
        </div>
      </div>
      <MobileDrawer open={drawer} onClose={() => setDrawer(false)} />
    </header>
  )
}
