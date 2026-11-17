import { NavLink } from 'react-router-dom'
import { X } from 'lucide-react'
import { useApp } from '../../context/AppContext'

export default function Sidebar({ items, title, subtitle }) {
  const { sidebarOpen, setSidebarOpen } = useApp()

  const content = (
    <div className="flex h-full w-[250px] flex-col bg-primary text-white">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-6">
        <div>
          <p className="font-heading text-lg font-bold tracking-tight">
            Stay<span className="text-accent">Nest</span>
          </p>
          <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.12em] text-white/40">{subtitle || title}</p>
        </div>
        <button type="button" className="rounded-lg p-1.5 hover:bg-white/10 lg:hidden" onClick={() => setSidebarOpen(false)}>
          <X size={16} />
        </button>
      </div>
      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition ${
                isActive ? 'sidebar-active' : 'text-white/65 hover:bg-white/6 hover:text-white'
              }`
            }
          >
            <Icon size={17} strokeWidth={1.7} />
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  )

  return (
    <>
      <aside className="hidden shrink-0 lg:block">{content}</aside>
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button type="button" className="absolute inset-0 bg-black/40" aria-label="Close sidebar" onClick={() => setSidebarOpen(false)} />
          <div className="absolute inset-y-0 left-0 shadow-2xl">{content}</div>
        </div>
      )}
    </>
  )
}
