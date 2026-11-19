import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Heart, LayoutDashboard, LogOut, Menu, Phone, PlusCircle, ShieldCheck, User, X } from 'lucide-react'
import Logo from './Logo'
import { useApp } from '../../context/AppContext'
import { SITE } from '../../config/site'
import { categories } from '../../data/categories'
import { initials } from '../../utils/format'

const dashFor = (role) => (role === 'seller' ? '/seller' : role === 'admin' ? '/admin' : '/user')

export default function Header() {
  const { user, signOut, saved } = useApp()
  const [open, setOpen] = useState(false)
  const [menu, setMenu] = useState(false)
  const loc = useLocation()
  const nav = useNavigate()

  useEffect(() => {
    setOpen(false)
    setMenu(false)
  }, [loc.pathname, loc.search])

  const link = ({ isActive }) =>
    `whitespace-nowrap rounded-lg px-3 py-2 text-sm font-bold transition-colors ${isActive ? 'bg-brand-tint text-brand-deep' : 'text-ink-soft hover:text-brand'}`

  const out = async () => {
    await signOut()
    nav('/')
  }

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-cream/90 backdrop-blur-lg">
      <div className="hidden bg-ink text-xs text-white/80 md:block">
        <div className="container-x flex items-center justify-between py-1.5">
          <span>Direct-from-owner rentals across Jaipur</span>
          <a href={`tel:${SITE.phoneTel}`} className="inline-flex items-center gap-1.5 font-bold text-saffron"><Phone size={12} /> {SITE.phone}</a>
        </div>
      </div>

      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Main">
          <NavLink to="/" end className={link}>Home</NavLink>
          <NavLink to="/rentals" end className={link}>All rentals</NavLink>
          {categories.map((c) => (
            <NavLink key={c.slug} to={`/rentals?category=${c.slug}`} className={() => `whitespace-nowrap rounded-lg px-2.5 py-2 text-sm font-bold ${loc.search.includes(c.slug) ? 'bg-brand-tint text-brand-deep' : 'text-ink-soft hover:text-brand'}`}>
              {c.label}
            </NavLink>
          ))}
          <NavLink to="/contact" className={link}>Contact</NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/user?tab=saved" aria-label="Shortlist" className="relative hidden h-10 w-10 place-items-center rounded-xl text-ink-soft hover:bg-brand-tint sm:grid">
            <Heart size={20} />
            {saved.length > 0 && <span className="absolute -right-0.5 -top-0.5 grid h-4.5 min-w-4.5 place-items-center rounded-full bg-saffron px-1 text-[0.65rem] font-extrabold text-ink">{saved.length}</span>}
          </Link>

          {user?.role !== 'tenant' && (
            <Link to={user?.role === 'seller' ? '/seller/new' : '/register?role=seller'} className="hidden items-center gap-1.5 whitespace-nowrap rounded-xl bg-saffron px-3.5 py-2 text-sm font-extrabold text-ink hover:bg-amber-400 md:inline-flex">
              <PlusCircle size={16} /> List property
            </Link>
          )}

          {user ? (
            <div className="relative">
              <button type="button" onClick={() => setMenu((m) => !m)} aria-haspopup="menu" aria-expanded={menu} className="flex items-center gap-2 rounded-xl border-[1.5px] border-line bg-white py-1 pl-1 pr-3 hover:border-brand">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand text-xs font-extrabold text-white">{initials(user.name)}</span>
                <span className="hidden max-w-24 truncate text-sm font-bold sm:block">{user.name.split(' ')[0]}</span>
              </button>
              {menu && (
                <div role="menu" className="absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl border border-line bg-white p-1.5 shadow-lift">
                  <p className="truncate px-3 py-2 text-xs text-muted">{user.email}</p>
                  <Link role="menuitem" to={dashFor(user.role)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold hover:bg-brand-tint">
                    {user.role === 'admin' ? <ShieldCheck size={16} /> : <LayoutDashboard size={16} />} Dashboard
                  </Link>
                  <button role="menuitem" type="button" onClick={out} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold text-red-600 hover:bg-red-50">
                    <LogOut size={16} /> Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="inline-flex items-center gap-1.5 rounded-xl bg-ink px-4 py-2 text-sm font-bold text-white hover:bg-ink-soft">
              <User size={16} /> Login
            </Link>
          )}

          <button type="button" className="grid h-10 w-10 place-items-center rounded-xl hover:bg-brand-tint xl:hidden" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu" aria-expanded={open}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-line bg-cream px-4 py-3 xl:hidden" aria-label="Mobile">
          <div className="container-x grid gap-1 !px-0">
            <NavLink to="/" end className={link}>Home</NavLink>
            <NavLink to="/rentals" end className={link}>All rentals</NavLink>
            {categories.map((c) => (
              <Link key={c.slug} to={`/rentals?category=${c.slug}`} className="rounded-lg px-3 py-2 text-sm font-bold text-ink-soft">{c.label}</Link>
            ))}
            <NavLink to="/contact" className={link}>Contact</NavLink>
            <NavLink to="/user?tab=saved" className={link}>Shortlist ({saved.length})</NavLink>
            {user?.role !== 'tenant' && <Link to={user?.role === 'seller' ? '/seller/new' : '/register?role=seller'} className="mt-1 rounded-xl bg-saffron px-3 py-2.5 text-center text-sm font-extrabold">List your property</Link>}
          </div>
        </nav>
      )}
    </header>
  )
}
