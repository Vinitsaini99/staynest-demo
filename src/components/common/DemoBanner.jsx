import { useNavigate } from 'react-router-dom'
import { Building2, GraduationCap, Shield } from 'lucide-react'
import { useApp } from '../../context/AppContext'

const roles = [
  { id: 'admin', label: 'Admin', icon: Shield, path: '/admin/dashboard' },
  { id: 'owner', label: 'Owner', icon: Building2, path: '/owner/dashboard' },
  { id: 'student', label: 'Student', icon: GraduationCap, path: '/student/home' },
]

export default function DemoBanner() {
  const { role, switchRole } = useApp()
  const navigate = useNavigate()

  return (
    <div className="sticky top-0 z-[70] border-b border-primary/20 bg-primary text-white">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-2 px-4 py-2 sm:flex-row sm:items-center sm:justify-between md:px-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
          Interactive Product Demo
        </p>
        <div className="flex gap-1 overflow-x-auto">
          {roles.map(({ id, label, icon: Icon, path }) => (
            <button
              key={id}
              type="button"
              onClick={() => {
                switchRole(id)
                navigate(path)
              }}
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition ${
                role === id ? 'bg-accent text-primary' : 'text-white/75 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon size={13} />
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
