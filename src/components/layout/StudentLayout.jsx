import { useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Heart, Home, Search, LayoutDashboard, Menu, X } from 'lucide-react'
import toast from 'react-hot-toast'
import { useApp } from '../../context/AppContext'
import ProfileDropdown from '../common/ProfileDropdown'
import NotificationDropdown from '../common/NotificationDropdown'

const links = [
  { to: '/student/search', label: 'Explore Stays' },
  { to: '/student/home#students', label: 'For Students' },
  { to: '/owner/dashboard', label: 'List Your Property' },
  { to: '/student/home#help', label: 'Help' },
]

export default function StudentLayout() {
  const [open, setOpen] = useState(false)
  const { favourites } = useApp()
  const location = useLocation()
  const navigate = useNavigate()
  const hideBottom = location.pathname.includes('/booking')

  return (
    <div className="min-h-[calc(100vh-44px)] bg-bg">
      <div className="sticky top-[44px] z-50 px-3 pt-3 md:px-6">
        <header className="nav-float mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-2xl px-4 py-3 shadow-[0_8px_30px_rgba(23,59,53,0.06)] md:px-5">
          <Link to="/student/home" className="font-heading text-xl font-bold text-primary">
            Stay<span className="text-accent">Nest</span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {links.map((l) => (
              <NavLink key={l.label} to={l.to} className="text-sm font-medium text-muted transition hover:text-primary">
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link to="/student/favourites" className="relative rounded-xl border border-border p-2 text-text hover:bg-bg">
              <Heart size={16} />
              {favourites.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-primary">
                  {favourites.length}
                </span>
              )}
            </Link>
            <div className="hidden sm:block"><NotificationDropdown /></div>
            <button
              type="button"
              onClick={() => toast.success('Demo login — use the role switcher above')}
              className="hidden rounded-xl px-3 py-2 text-sm font-medium text-muted hover:text-primary sm:inline"
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => navigate('/student/search')}
              className="hidden rounded-xl bg-primary px-3.5 py-2 text-sm font-semibold text-white sm:inline"
            >
              Get Started
            </button>
            <div className="hidden md:block"><ProfileDropdown /></div>
            <button type="button" className="rounded-xl border border-border p-2 lg:hidden" onClick={() => setOpen((v) => !v)}>
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </header>

        {open && (
          <div className="nav-float mx-auto mt-2 max-w-7xl rounded-2xl px-4 py-3 lg:hidden">
            {links.map((l) => (
              <Link key={l.label} to={l.to} onClick={() => setOpen(false)} className="block py-2.5 text-sm font-medium">
                {l.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-2">
              <button type="button" onClick={() => { toast.success('Demo login'); setOpen(false) }} className="flex-1 rounded-xl border border-border py-2.5 text-sm font-semibold">
                Login
              </button>
              <button type="button" onClick={() => { navigate('/student/search'); setOpen(false) }} className="flex-1 rounded-xl bg-primary py-2.5 text-sm font-semibold text-white">
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>

      <Outlet />

      {!hideBottom && (
        <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card/95 backdrop-blur md:hidden">
          <div className="grid grid-cols-4">
            {[
              { to: '/student/home', icon: Home, label: 'Home' },
              { to: '/student/search', icon: Search, label: 'Explore' },
              { to: '/student/dashboard', icon: LayoutDashboard, label: 'Account' },
              { to: '/student/favourites', icon: Heart, label: 'Saved' },
            ].map((i) => (
              <NavLink
                key={i.to}
                to={i.to}
                className={({ isActive }) => `flex flex-col items-center gap-1 py-2.5 text-[10px] font-semibold ${isActive ? 'text-primary' : 'text-muted'}`}
              >
                <i.icon size={17} />
                {i.label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </div>
  )
}
