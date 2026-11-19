import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Mail } from 'lucide-react'
import AuthShell from './AuthShell'
import Button from '../../components/ui/Button'
import { Input } from '../../components/ui/Field'
import { useApp } from '../../context/AppContext'
import { useSeo } from '../../hooks/useSeo'
import { resendCode, verifyEmail } from '../../services/api'

export default function VerifyEmail() {
  useSeo({ title: 'Verify email', path: '/verify-email', noindex: true })
  const [sp] = useSearchParams()
  const email = sp.get('email') || ''
  const loc = useLocation()
  const nav = useNavigate()
  const { signIn } = useApp()
  const [demoCode, setDemoCode] = useState(loc.state?.demoCode || '')
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  if (!email) return <Navigate to="/register" replace />

  const submit = async (e) => {
    e.preventDefault()
    if (!/^\d{6}$/.test(code.trim())) return setError('Enter the 6-digit code')
    setError('')
    setBusy(true)
    try {
      const u = await verifyEmail(email, code)
      signIn(u)
      toast.success('Email verified. Welcome aboard!')
      nav(u.role === 'seller' ? '/seller' : '/user', { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  const resend = async () => {
    try {
      const r = await resendCode(email)
      setDemoCode(r.demoCode)
      toast.success('A new code has been generated')
    } catch (err) {
      toast.error(err.message)
    }
  }

  return (
    <AuthShell title="Verify your email" subtitle={`We sent a 6-digit code to ${email}.`} footer={<Link to="/login" className="font-bold text-brand">Back to login</Link>}>
      <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-brand-tint text-brand"><Mail size={26} /></div>
      {demoCode && (
        <p className="mb-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
          Demo mode: no email is sent. Your code is <b className="font-mono text-base tracking-widest">{demoCode}</b>
        </p>
      )}
      <form onSubmit={submit} className="space-y-4" noValidate>
        <Input label="Verification code" inputMode="numeric" maxLength={6} autoComplete="one-time-code" value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))} error={error} className="tracking-[0.4em]" required />
        <Button type="submit" loading={busy} size="lg" className="w-full">Verify and continue</Button>
        <button type="button" onClick={resend} className="w-full text-center text-sm font-bold text-brand hover:text-brand-deep">Send a new code</button>
      </form>
    </AuthShell>
  )
}
