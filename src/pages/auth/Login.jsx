import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import AuthShell from './AuthShell'
import Button from '../../components/ui/Button'
import { Input } from '../../components/ui/Field'
import { useApp } from '../../context/AppContext'
import { useSeo } from '../../hooks/useSeo'
import { login, resendCode } from '../../services/api'
import { emailRule, required, validate } from '../../utils/validation'

const home = (role) => (role === 'seller' ? '/seller' : '/user')

export default function Login({ admin = false }) {
  useSeo({ title: admin ? 'Admin login' : 'Login', path: admin ? '/admin-login' : '/login', noindex: true })
  const { signIn } = useApp()
  const nav = useNavigate()
  const loc = useLocation()
  const [v, setV] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [busy, setBusy] = useState(false)
  const set = (k) => (e) => setV((s) => ({ ...s, [k]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    const errs = validate(v, { email: [emailRule], password: [required('Password')] })
    setErrors(errs)
    if (Object.keys(errs).length) return
    setBusy(true)
    try {
      const u = await login(v.email, v.password, { adminOnly: admin })
      signIn(u)
      toast.success(`Welcome back, ${u.name.split(' ')[0]}`)
      nav(loc.state?.from || (admin ? '/admin' : home(u.role)), { replace: true })
    } catch (err) {
      if (err.code === 'UNVERIFIED') {
        const r = await resendCode(err.email).catch(() => null)
        toast('Please verify your email to continue')
        nav(`/verify-email?email=${encodeURIComponent(err.email)}`, { state: { demoCode: r?.demoCode } })
      } else toast.error(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <AuthShell
      dark={admin}
      title={admin ? 'Admin login' : 'Welcome back'}
      subtitle={admin ? 'Restricted area for site administrators.' : 'Log in to see your shortlist, enquiries and listings.'}
      footer={admin ? <Link to="/" className="font-bold text-brand">Back to website</Link> : <>New here? <Link to="/register" className="font-bold text-brand">Create an account</Link></>}
    >
      <form onSubmit={submit} className="space-y-4" noValidate>
        <Input label="Email" type="email" autoComplete="email" value={v.email} onChange={set('email')} error={errors.email} required />
        <Input label="Password" type="password" autoComplete="current-password" value={v.password} onChange={set('password')} error={errors.password} required />
        <Button type="submit" loading={busy} size="lg" className="w-full">Log in</Button>
      </form>
      {admin && (
        <p className="mt-4 rounded-xl bg-amber-50 p-3 text-xs text-amber-900">
          Demo build: use <b>admin@gharkhoj.demo</b> / <b>Admin@123</b>. Change these before launch.
        </p>
      )}
    </AuthShell>
  )
}
