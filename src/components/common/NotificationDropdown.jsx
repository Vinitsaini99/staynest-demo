import { useState } from 'react'
import { Bell } from 'lucide-react'
import { notifications as seed } from '../../data/mockData'

export default function NotificationDropdown() {
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState(seed)
  const unread = items.filter((n) => n.unread).length

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="relative rounded-xl border border-border bg-card p-2 text-text hover:bg-bg"
      >
        <Bell size={18} />
        {unread > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-primary">
            {unread}
          </span>
        )}
      </button>
      {open && (
        <>
          <button type="button" className="fixed inset-0 z-40" aria-label="Close" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-50 mt-2 w-80 overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <p className="font-semibold">Notifications</p>
              <button
                type="button"
                className="text-xs font-semibold text-secondary"
                onClick={() => setItems((prev) => prev.map((n) => ({ ...n, unread: false })))}
              >
                Mark all read
              </button>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {items.map((n) => (
                <div key={n.id} className={`border-b border-border px-4 py-3 ${n.unread ? 'bg-accent/5' : ''}`}>
                  <p className="text-sm font-semibold">{n.title}</p>
                  <p className="text-xs text-muted">{n.body}</p>
                  <p className="mt-1 text-[11px] text-muted">{n.time}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
