import { BadgeCheck, Building2, MessageCircle } from 'lucide-react'
import Logo from '../../components/layout/Logo'

export default function AuthShell({ title, subtitle, children, footer, dark = false }) {
  return (
    <div className="container-x grid min-h-[70vh] items-center gap-10 py-10 lg:grid-cols-2">
      <div className="hidden lg:block">
        <Logo />
        <h2 className="mt-6 text-4xl font-extrabold leading-tight">
          {dark ? 'Manage the portal' : <>Your Jaipur rental search, <span className="text-brand">organised</span></>}
        </h2>
        <ul className="mt-6 space-y-4 text-ink-soft">
          {[
            [BadgeCheck, 'Save homes to a shortlist and compare later'],
            [MessageCircle, 'Track every enquiry you send in one place'],
            [Building2, 'Owners can list and manage properties for free'],
          ].map(([Icon, t]) => (
            <li key={t} className="flex items-center gap-3 font-semibold">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-tint text-brand"><Icon size={20} /></span> {t}
            </li>
          ))}
        </ul>
      </div>

      <div className="card mx-auto w-full max-w-md p-6 sm:p-8">
        <h1 className="text-2xl font-extrabold">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
        <div className="mt-6">{children}</div>
        {footer && <div className="mt-5 border-t border-line pt-4 text-center text-sm text-muted">{footer}</div>}
      </div>
    </div>
  )
}
