import { useState } from 'react'
import toast from 'react-hot-toast'
import { CheckCircle2, MessageCircle } from 'lucide-react'
import { SITE } from '../../config/site'
import { useApp } from '../../context/AppContext'
import { sendEnquiry } from '../../services/api'
import { cleanPhone, emailRule, minLen, phoneRule, required, validate } from '../../utils/validation'
import { Input, Textarea } from '../ui/Field'
import { Button } from '../ui/Button'
import Modal from '../ui/Modal'

export const whatsappLink = (property) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
    property
      ? `Hello, I am interested in "${property.title}" (Ref: ${property.id}) listed on ${SITE.name}. Please share more details.`
      : `Hello ${SITE.name}, I would like help with a property in Kota.`,
  )}`

export default function EnquiryForm({ property, onSent, compact = false }) {
  const { user } = useApp()
  const [values, setValues] = useState({
    name: user?.name || '', phone: user?.phone || '', email: user?.email || '',
    message: property ? `Hi, I am interested in "${property.title}". Please contact me with more details.` : '',
  })
  const [errors, setErrors] = useState({})
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(false)

  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }))
    if (errors[k]) setErrors((x) => ({ ...x, [k]: '' }))
  }

  const submit = async (e) => {
    e.preventDefault()
    const errs = validate(values, {
      name: [required('Name'), minLen('Name', 2)],
      phone: [required('Mobile number'), phoneRule],
      email: [(v) => (v ? emailRule(v) : '')],
      message: [required('Message'), minLen('Message', 10)],
    })
    setErrors(errs)
    if (Object.keys(errs).length) return
    setBusy(true)
    try {
      await sendEnquiry({ ...values, phone: cleanPhone(values.phone), propertyId: property?.id || null, propertyTitle: property?.title || null, userId: user?.id || null })
      setDone(true)
      toast.success('Enquiry sent successfully')
      onSent?.()
    } catch {
      toast.error('Could not send your enquiry. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  if (done) {
    return (
      <div className="py-6 text-center">
        <CheckCircle2 className="mx-auto text-[#1f7a4d]" size={44} strokeWidth={1.4} />
        <h3 className="mt-4 text-2xl text-forest">Enquiry received</h3>
        <p className="mx-auto mt-2 max-w-sm text-sm text-muted">Thank you, {values.name.split(' ')[0]}. Our team will get back to you on {values.phone}.</p>
        <a href={whatsappLink(property)} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#1f7a4d] hover:underline"><MessageCircle size={16} /> Continue on WhatsApp</a>
      </div>
    )
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-4">
      <Input label="Your name" required value={values.name} onChange={set('name')} error={errors.name} autoComplete="name" />
      <div className={compact ? 'space-y-4' : 'grid gap-4 sm:grid-cols-2'}>
        <Input label="Mobile number" required type="tel" inputMode="numeric" value={values.phone} onChange={set('phone')} error={errors.phone} autoComplete="tel" placeholder="10-digit number" />
        <Input label="Email" type="email" value={values.email} onChange={set('email')} error={errors.email} autoComplete="email" placeholder="Optional" />
      </div>
      <Textarea label="Message" required value={values.message} onChange={set('message')} error={errors.message} rows={4} />
      <Button type="submit" loading={busy} className="w-full" size="lg">Send Enquiry</Button>
      <p className="text-center text-[0.7rem] text-muted">By submitting you agree to be contacted about this property.</p>
    </form>
  )
}

export function ContactModal({ open, onClose, property }) {
  return (
    <Modal open={open} onClose={onClose} title={property ? 'Contact Seller' : 'Enquire Now'}>
      {property && (
        <div className="mb-5 border-l-2 border-gold bg-white px-4 py-3 text-sm">
          <p className="font-semibold text-forest">{property.title}</p>
          <p className="text-muted">{property.seller.name} · {property.seller.type}</p>
        </div>
      )}
      <EnquiryForm property={property} />
    </Modal>
  )
}
