import { useState } from 'react'
import toast from 'react-hot-toast'
import { CheckCircle2, Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { SITE } from '../config/site'
import { useApp } from '../context/AppContext'
import { useSeo } from '../hooks/useSeo'
import { sendContactMessage } from '../services/api'
import { cleanPhone, emailRule, minLen, phoneRule, required, validate } from '../utils/validation'
import { PageHero } from '../components/ui/Bits'
import { Input, Select, Textarea } from '../components/ui/Field'
import { Button, LinkButton } from '../components/ui/Button'
import { whatsappLink } from '../components/property/EnquiryForm'

export default function Contact() {
  const { user } = useApp()
  const [v, setV] = useState({ name: user?.name || '', phone: user?.phone || '', email: user?.email || '', topic: '', message: '' })
  const [errors, setErrors] = useState({})
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(false)
  useSeo({ title: 'Contact Us', description: `Get in touch with ${SITE.name} for finding or listing a PG, room or rental in Kota, Rajasthan.`, path: '/contact-us' })

  const set = (k) => (e) => { setV((x) => ({ ...x, [k]: e.target.value })); if (errors[k]) setErrors((x) => ({ ...x, [k]: '' })) }

  const submit = async (e) => {
    e.preventDefault()
    const errs = validate(v, {
      name: [required('Name'), minLen('Name', 2)], phone: [required('Mobile number'), phoneRule],
      email: [required('Email'), emailRule], topic: [required('Topic')], message: [required('Message'), minLen('Message', 10)],
    })
    setErrors(errs)
    if (Object.keys(errs).length) return
    setBusy(true)
    try {
      await sendContactMessage({ ...v, phone: cleanPhone(v.phone) })
      setDone(true)
      toast.success('Message sent')
    } catch {
      toast.error('Could not send your message. Please try again.')
    } finally { setBusy(false) }
  }

  const info = [
    { icon: Phone, label: 'Call us', value: SITE.phone, href: `tel:+${SITE.phoneRaw}` },
    { icon: MessageCircle, label: 'WhatsApp', value: 'Chat with our team', href: whatsappLink() },
    { icon: Mail, label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
    { icon: MapPin, label: 'Office', value: SITE.address },
    { icon: Clock, label: 'Hours', value: SITE.hours },
  ]

  return (
    <>
      <PageHero eyebrow="Contact us" title="Let’s talk" intro="Questions about a listing, listing your PG or rental, or finding the right locality? We’re here to help." crumbs={[{ label: 'Home', to: '/' }, { label: 'Contact Us' }]} />
      <section className="container-x grid gap-12 py-14 lg:grid-cols-[1.2fr_0.8fr] md:py-20">
        {done ? (
          <div className="border border-line bg-white p-10 text-center">
            <CheckCircle2 className="mx-auto text-[#1f7a4d]" size={48} strokeWidth={1.3} />
            <h2 className="mt-5 text-3xl text-forest">Thank you, we’ve got your message</h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-muted">A member of our team will get back to you shortly on {v.phone}.</p>
            <Button className="mt-7" variant="outline" onClick={() => { setDone(false); setV((x) => ({ ...x, topic: '', message: '' })) }}>Send another message</Button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="space-y-5 border border-line bg-white p-6 md:p-9">
            <h2 className="text-2xl text-forest">Send us a message</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <Input label="Name" required value={v.name} onChange={set('name')} error={errors.name} autoComplete="name" />
              <Input label="Mobile number" required type="tel" value={v.phone} onChange={set('phone')} error={errors.phone} autoComplete="tel" />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Input label="Email" required type="email" value={v.email} onChange={set('email')} error={errors.email} autoComplete="email" />
              <Select label="I’m interested in" required value={v.topic} onChange={set('topic')} error={errors.topic} placeholder="Select a topic" options={['Finding a PG', 'Finding a room or flat for rent', 'Listing my PG or rental', 'Commercial space for rent', 'Something else']} />
            </div>
            <Textarea label="Message" required rows={5} value={v.message} onChange={set('message')} error={errors.message} />
            <Button type="submit" size="lg" loading={busy}>Send Message</Button>
          </form>
        )}

        <aside className="space-y-6">
          <div className="border border-line bg-white p-7">
            <ul className="space-y-5">
              {info.map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex gap-4">
                  <Icon size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold-deep" />
                  <div><p className="text-[0.68rem] font-bold uppercase tracking-wider text-muted">{label}</p>{href ? <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="text-sm font-semibold text-forest hover:text-gold-deep">{value}</a> : <p className="text-sm font-semibold text-forest">{value}</p>}</div>
                </li>
              ))}
            </ul>
            <LinkButton href={whatsappLink()} target="_blank" rel="noopener noreferrer" variant="whatsapp" className="mt-7 w-full"><MessageCircle size={16} /> Chat on WhatsApp</LinkButton>
          </div>
          <div className="aspect-[4/3] overflow-hidden border border-line bg-stone">
            <iframe title="Kota, Rajasthan map" src="https://www.google.com/maps?q=Kota%2C%20Rajasthan&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-full w-full border-0" />
          </div>
        </aside>
      </section>
    </>
  )
}
