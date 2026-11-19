import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Building2, Search } from 'lucide-react'
import AuthShell from './AuthShell'
import Button from '../../components/ui/Button'
import { Input } from '../../components/ui/Field'
import { useSeo } from '../../hooks/useSeo'
import { register } from '../../services/api'
import { cleanPhone, emailRule, minLen, phoneRule, required, validate } from '../../utils/validation'

export default function Register() {
  useSeo({ title: 'Create account', path: '/register', noindex: true })
  const nav = useNavigate()
  const [sp] = useSearchParams()
  const [v, setV] = useState({ role: sp.get('role') === 'seller' ? 'seller' : 'tenant', name: '', email: '', phone: '', password: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const [busy, setBusy] = useState(false)
  const set = (k) => (e) => setV((s) => ({ ...s, [k]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    const errs = validate(v, {
      name: [required('Name'), minLen('Name', 2)],
      email: [emailRule],
      phone: [phoneRule],
      password: [minLen('Password', 8)],
      confirm: [(x, all) => (x === all.password ? '' : 'Passwords do not match')],
    })
    setErrors(errs)
    if (Object.keys(errs).length) return
    setBusy(true)
    try {
      const r = await register({ ...v, phone: cleanPhone(v.phone) })
      toast.success('Account created. Verify your email to continue.')
      nav(`/verify-email?email=${encodeURIComponent(r.email)}`, { state: { demoCode: r.demoCode } })
    } catch (err) {
      toast.error(err.message)
    } finally {
      setBusy(false)
    }
  }

  const roleBtn = (value, Icon, label, sub) => (
    <button type="button" onClick={() => setV((s) => ({ ...s, role: value }))} aria-pressed={v.role === value} className={`rounded-xl border-2 p-3 text-left transition-colors ${v.role === value ? 'border-brand bg-brand-tint' : 'border-line bg-white hover:border-brand/50'}`}>
      <Icon size={20} className="text-brand" />
      <p className="mt-1 text-sm font-extrabold">{label}</p>
      <p className="text-xs text-muted">{sub}</p>
    </button>
  )

  return (
    <AuthShell title="Create your account" subtitle="Free for tenants and property owners." footer={<>Already registered? <Link to="/login" className="font-bold text-brand">Log in</Link></>}>
      <form onSubmit={submit} className="space-y-4" noValidate>
        <div className="grid grid-cols-2 gap-3">
          {roleBtn('tenant', Search, 'I am looking', 'Find and save rentals')}
          {roleBtn('seller', Building2, 'I own property', 'List and manage')}
        </div>
        <Input label="Full name" autoComplete="name" value={v.name} onChange={set('name')} error={errors.name} required />
        <Input label="Email" type="email" autoComplete="email" value={v.email} onChange={set('email')} error={errors.email} required />
        <Input label="Mobile number" inputMode="tel" autoComplete="tel" value={v.phone} onChange={set('phone')} error={errors.phone} hint="10-digit Indian mobile number" required />
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Password" type="password" autoComplete="new-password" value={v.password} onChange={set('password')} error={errors.password} required />
          <Input label="Confirm" type="password" autoComplete="new-password" value={v.confirm} onChange={set('confirm')} error={errors.confirm} required />
        </div>
        <Button type="submit" loading={busy} size="lg" className="w-full">Create account</Button>
        <p className="text-center text-xs text-muted">By signing up you agree to our <Link to="/terms" className="font-bold text-brand">Terms</Link> and <Link to="/privacy" className="font-bold text-brand">Privacy Policy</Link>.</p>
      </form>
    </AuthShell>
  )
}
