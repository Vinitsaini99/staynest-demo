import { useState } from 'react'
import { ChevronDown, LogOut, Settings, User } from 'lucide-react'
import toast from 'react-hot-toast'
import { useApp } from '../../context/AppContext'

const profiles = {
  admin: { name: 'Admin User', role: 'Platform Admin', email: 'admin@staynest.co' },
  owner: { name: 'Rajesh Sharma', role: 'Property Owner', email: 'rajesh@staynest.co' },
  student: { name: 'Arjun Patel', role: 'Student', email: 'arjun.p@gmail.com' },
}

export default function ProfileDropdown() {
  const { role } = useApp()
  const [open, setOpen] = useState(false)
  const profile = profiles[role] || profiles.student

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-xl border border-border bg-card px-2 py-1.5 hover:bg-bg"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
          {profile.name.split(' ').map((n) => n[0]).join('')}
        </div>
        <div className="hidden text-left sm:block">
          <p className="text-xs font-semibold leading-tight">{profile.name}</p>
          <p className="text-[10px] text-muted">{profile.role}</p>
        </div>
        <ChevronDown size={14} className="text-muted" />
      </button>
      {open && (
        <>
          <button type="button" className="fixed inset-0 z-40" aria-label="Close" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
            <div className="border-b border-border px-4 py-3">
              <p className="text-sm font-semibold">{profile.name}</p>
              <p className="text-xs text-muted">{profile.email}</p>
            </div>
            <button type="button" onClick={() => toast.success('Profile opened (demo)')} className="flex w-full items-center gap-2 px-4 py-2.5 text-sm hover:bg-bg">
              <User size={16} /> View Profile
            </button>
            <button type="button" onClick={() => toast.success('Settings opened (demo)')} className="flex w-full items-center gap-2 px-4 py-2.5 text-sm hover:bg-bg">
              <Settings size={16} /> Settings
            </button>
            <button type="button" onClick={() => toast('Demo logout — use role switcher above')} className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50">
              <LogOut size={16} /> Sign Out
            </button>
          </div>
        </>
      )}
    </div>
  )
}
