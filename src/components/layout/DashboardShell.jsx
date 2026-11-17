import { Menu, Search } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import NotificationDropdown from '../common/NotificationDropdown'
import ProfileDropdown from '../common/ProfileDropdown'
import Sidebar from './Sidebar'

export default function DashboardShell({ title, items, children, searchPlaceholder = 'Search...' }) {
  const { setSidebarOpen } = useApp()

  return (
    <div className="flex min-h-[calc(100vh-44px)] bg-bg">
      <Sidebar items={items} title={title} subtitle={title} />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-[44px] z-30 flex items-center justify-between gap-3 border-b border-border bg-[#FBFaf6]/90 px-4 py-3.5 backdrop-blur md:px-8">
          <div className="flex items-center gap-3">
            <button type="button" className="rounded-xl border border-border bg-card p-2 lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu size={16} />
            </button>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Console</p>
              <h1 className="font-heading text-xl font-bold text-text md:text-2xl">{title}</h1>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="relative hidden md:block">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                className="w-64 rounded-xl border border-border bg-card py-2 pl-9 pr-3 text-sm outline-none focus:border-secondary lg:w-72"
                placeholder={searchPlaceholder}
              />
            </div>
            <NotificationDropdown />
            <ProfileDropdown />
          </div>
        </header>
        <main className="flex-1 px-4 py-6 md:px-8 md:py-8">{children}</main>
      </div>
    </div>
  )
}
