import { useState } from 'react'
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Eye, EyeOff } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { useSeo } from '../hooks/useSeo'
import { cleanPhone, emailRule, minLen, phoneRule, required, validate } from '../utils/validation'
import { Input } from '../components/ui/Field'
import { Button } from '../components/ui/Button'
import { LogoMark } from '../components/layout/Logo'
import { imgSrc } from '../utils/image'

export default function Auth({ mode }) {
  const isRegister = mode === 'register'
  const { user, login, register } = useApp()
  const navigate = useNavigate()
  const [sp] = useSearchParams()
  const next = sp.get('next') || '/dashboard'
  const [v, setV] = useState({ name: '', email: '', phone: '', password: '' })
  const [errors, setErrors] = useState({})
  const [show, setShow] = useState(false)
  const [busy, setBusy] = useState(false)
  const [formError, setFormError] = useState('')

  useSeo({ title: isRegister ? 'Create your account' : 'Login', description: 'Access your Kota Ki Property account to save properties and manage listings.', path: isRegister ? '/register' : '/login', noindex: true })

  if (user && !busy) return <Navigate to={next} replace />

  const set = (k) => (e) => { setV((x) => ({ ...x, [k]: e.target.value })); setFormError(''); if (errors[k]) setErrors((x) => ({ ...x, [k]: '' })) }

  const submit = async (e) => {
    e.preventDefault()
    const rules = isRegister
      ? { name: [required('Name'), minLen('Name', 2)], email: [required('Email'), emailRule], phone: [required('Mobile number'), phoneRule], password: [required('Password'), minLen('Password', 8)] }
      : { email: [required('Email'), emailRule], password: [required('Password')] }
    const errs = validate(v, rules)
    setErrors(errs)
    if (Object.keys(errs).length) return
    setBusy(true)
    try {
      if (isRegister) await register({ name: v.name.trim(), email: v.email.trim(), phone: cleanPhone(v.phone), password: v.password })
      else await login({ email: v.email.trim(), password: v.password })
      toast.success(isRegister ? 'Account created. Welcome!' : 'Welcome back!')
      navigate(next, { replace: true })
    } catch (err) {
      setFormError(err.message)
      setBusy(false)
    }
  }

  return (
    <section className="grid min-h-[78vh] lg:grid-cols-2">
      <div className="relative hidden bg-forest lg:block">
        <img src={imgSrc('1600596542815-ffad4c1539a9', 1100, 1300)} alt="" className="absolute inset-0 h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0" />
        <div className="relative flex h-full flex-col justify-end p-14 text-ivory">
          <LogoMark size={48} />
          <h2 className="mt-6 max-w-sm text-4xl leading-tight">Your shortlist, saved and organised.</h2>
          <p className="mt-4 max-w-sm text-ivory/70">Save properties, track your enquiries and manage the properties you list.</p>
        </div>
      </div>
      <div className="flex items-center justify-center px-5 py-14">
        <form onSubmit={submit} noValidate className="w-full max-w-md space-y-5">
          <div>
            <p className="eyebrow">{isRegister ? 'Join us' : 'Welcome back'}</p>
            <h1 className="mt-2 text-4xl text-forest">{isRegister ? 'Create your account' : 'Log in to your account'}</h1>
          </div>
          {formError && <p role="alert" className="border border-[#e6c8c1] bg-[#fbf3f1] px-4 py-3 text-sm text-[#8a2f21]">{formError}</p>}
          {isRegister && <Input label="Full name" required value={v.name} onChange={set('name')} error={errors.name} autoComplete="name" />}
          <Input label="Email" required type="email" value={v.email} onChange={set('email')} error={errors.email} autoComplete="email" />
          {isRegister && <Input label="Mobile number" required type="tel" value={v.phone} onChange={set('phone')} error={errors.phone} autoComplete="tel" />}
          <div className="relative">
            <Input label="Password" required type={show ? 'text' : 'password'} value={v.password} onChange={set('password')} error={errors.password} autoComplete={isRegister ? 'new-password' : 'current-password'} hint={isRegister ? 'At least 8 characters' : undefined} className="pr-11" />
            <button type="button" onClick={() => setShow((s) => !s)} aria-label={show ? 'Hide password' : 'Show password'} className="absolute right-3 top-[2.05rem] text-muted hover:text-forest">{show ? <EyeOff size={18} /> : <Eye size={18} />}</button>
          </div>
          <Button type="submit" size="lg" loading={busy} className="w-full">{isRegister ? 'Create Account' : 'Login'}</Button>
          <p className="text-center text-sm text-muted">
            {isRegister ? 'Already have an account?' : 'New to Kota Ki Property?'}{' '}
            <Link to={isRegister ? '/login' : '/register'} className="font-semibold text-forest underline underline-offset-4">{isRegister ? 'Login' : 'Register'}</Link>
          </p>
          <p className="text-center text-[0.7rem] text-muted">Demo mode: accounts are stored only in this browser.</p>
        </form>
      </div>
    </section>
  )
}
