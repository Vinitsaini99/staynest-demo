import { useState } from 'react'
import toast from 'react-hot-toast'
import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import Button from '../components/ui/Button'
import { Input, Textarea } from '../components/ui/Field'
import { useSeo } from '../hooks/useSeo'
import { sendContactMessage } from '../services/api'
import { SITE, waLink } from '../config/site'
import { cleanPhone, emailRule, minLen, phoneRule, validate } from '../utils/validation'

export default function Contact() {
  useSeo({ title: 'Contact us', description: `Talk to the ${SITE.name} team about renting or listing a property in Kota.`, path: '/contact' })
  const [v, setV] = useState({ name: '', email: '', phone: '', message: '' })
  const [errors, setErrors] = useState({})
  const [busy, setBusy] = useState(false)
  const set = (k) => (e) => setV((s) => ({ ...s, [k]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    const errs = validate(v, { name: [minLen('Name', 2)], email: [emailRule], phone: [phoneRule], message: [minLen('Message', 10)] })
    setErrors(errs)
    if (Object.keys(errs).length) return
    setBusy(true)
    try {
      await sendContactMessage({ ...v, phone: cleanPhone(v.phone) })
      toast.success('Message sent. We will reply soon.')
      setV({ name: '', email: '', phone: '', message: '' })
    } catch (err) {
      toast.error(err.message)
    } finally {
      setBusy(false)
    }
  }

  const info = [
    [Phone, 'Call', SITE.phone, `tel:${SITE.phoneTel}`],
    [Mail, 'Email', SITE.email, `mailto:${SITE.email}`],
    [MapPin, 'Based in', SITE.address],
    [Clock, 'Hours', SITE.hours],
  ]

  return (
    <div className="container-x py-12">
      <h1 className="text-4xl font-extrabold">Get in touch</h1>
      <p className="mt-2 max-w-xl text-muted">Questions about a listing, or want to list your property? Send a message and we will reply within a day.</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-3">
          {info.map(([Icon, label, value, href]) => (
            <div key={label} className="card flex items-center gap-4 p-4">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-tint text-brand"><Icon size={20} /></span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-muted">{label}</p>
                {href ? <a href={href} className="font-bold hover:text-brand">{value}</a> : <p className="font-bold">{value}</p>}
              </div>
            </div>
          ))}
          <Button href={waLink()} target="_blank" rel="noreferrer" variant="whatsapp" size="lg" className="w-full"><MessageCircle size={18} /> Chat on WhatsApp</Button>
        </div>

        <form onSubmit={submit} className="card space-y-4 p-6" noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Name" value={v.name} onChange={set('name')} error={errors.name} required />
            <Input label="Mobile" inputMode="tel" value={v.phone} onChange={set('phone')} error={errors.phone} required />
          </div>
          <Input label="Email" type="email" value={v.email} onChange={set('email')} error={errors.email} required />
          <Textarea label="Message" rows={5} value={v.message} onChange={set('message')} error={errors.message} required />
          <Button type="submit" size="lg" loading={busy}>Send message</Button>
        </form>
      </div>
    </div>
  )
}
