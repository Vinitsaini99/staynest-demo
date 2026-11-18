import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Heart, Home, PlusSquare, Search, User } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import Modal from '../ui/Modal'
import SearchBar from '../property/SearchBar'

export default function MobileBar() {
  const { user, wishlist } = useApp()
  const [searchOpen, setSearchOpen] = useState(false)
  const item = ({ isActive }) => `relative flex flex-1 flex-col items-center gap-1 py-2.5 text-[0.65rem] font-semibold ${isActive ? 'text-forest' : 'text-muted'}`
  return (
    <>
      <nav className="fixed inset-x-0 bottom-0 z-40 flex border-t border-line bg-ivory/97 shadow-[0_-8px_24px_-16px_rgba(20,45,39,0.4)] backdrop-blur lg:hidden" aria-label="Mobile">
        <NavLink to="/" end className={item}><Home size={19} />Home</NavLink>
        <button className="flex flex-1 flex-col items-center gap-1 py-2.5 text-[0.65rem] font-semibold text-muted" onClick={() => setSearchOpen(true)}><Search size={19} />Search</button>
        <NavLink to="/sell-your-property" className={item}>
          <span className="-mt-5 grid h-11 w-11 place-items-center bg-gold text-forest shadow-lg"><PlusSquare size={20} /></span>
          Sell
        </NavLink>
        <NavLink to="/dashboard?tab=saved" className={item}>
          <Heart size={19} />
          {wishlist.length > 0 && <span className="absolute right-[28%] top-1.5 grid h-4 min-w-4 place-items-center bg-gold px-1 text-[0.6rem] text-forest">{wishlist.length}</span>}
          Saved
        </NavLink>
        <NavLink to={user ? '/dashboard' : '/login'} className={item}><User size={19} />{user ? 'Account' : 'Login'}</NavLink>
      </nav>
      <Modal open={searchOpen} onClose={() => setSearchOpen(false)} title="Search Properties" side>
        <SearchBar variant="stacked" onDone={() => setSearchOpen(false)} />
      </Modal>
    </>
  )
}
