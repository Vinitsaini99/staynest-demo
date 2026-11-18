import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { CheckCircle2, ImagePlus, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { categories } from '../../data/categories'
import { locations } from '../../data/locations'
import { useApp } from '../../context/AppContext'
import { submitProperty } from '../../services/api'
import { compressImage } from '../../utils/image'
import { cleanPhone, minLen, phoneRule, positiveNumber, required, validate } from '../../utils/validation'
import { Field, Input, Select, Textarea } from '../ui/Field'
import { Button } from '../ui/Button'

const MAX_IMAGES = 6
const empty = { ownerName: '', phone: '', title: '', category: '', locality: '', price: '', areaSqft: '', description: '' }

export default function SellForm({ onDone }) {
  const { user } = useApp()
  const [values, setValues] = useState({ ...empty, ownerName: user?.name || '', phone: user?.phone || '' })
  const [images, setImages] = useState([])
  const [errors, setErrors] = useState({})
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(false)
  const fileRef = useRef()

  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }))
    if (errors[k]) setErrors((x) => ({ ...x, [k]: '' }))
  }

  const addFiles = async (e) => {
    const files = Array.from(e.target.files || [])
    e.target.value = ''
    const room = MAX_IMAGES - images.length
    if (files.length > room) toast.error(`You can upload up to ${MAX_IMAGES} images`)
    const results = await Promise.allSettled(files.slice(0, room).map((f) => compressImage(f)))
    const ok = results.filter((r) => r.status === 'fulfilled').map((r) => r.value)
    results.filter((r) => r.status === 'rejected').forEach((r) => toast.error(r.reason.message))
    setImages((x) => [...x, ...ok])
  }

  const submit = async (e) => {
    e.preventDefault()
    const errs = validate(values, {
      ownerName: [required('Owner name'), minLen('Owner name', 2)],
      phone: [required('Mobile number'), phoneRule],
      title: [required('Property title'), minLen('Title', 8)],
      category: [required('Property type')],
      locality: [required('Location')],
      price: [required('Monthly rent'), positiveNumber('rent')],
      areaSqft: [(v) => (v && !(Number(v) > 0) ? 'Enter a valid area' : '')],
      description: [required('Description'), minLen('Description', 20)],
    })
    setErrors(errs)
    if (Object.keys(errs).length) {
      toast.error('Please correct the highlighted fields')
      return
    }
    setBusy(true)
    try {
      await submitProperty({ ...values, phone: cleanPhone(values.phone), price: Number(values.price), areaSqft: Number(values.areaSqft) || null, images }, user?.id || null)
      setDone(true)
      toast.success('Property submitted for review')
      onDone?.()
    } catch (err) {
      toast.error(err.message || 'Could not submit your property')
    } finally {
      setBusy(false)
    }
  }

  if (done) {
    return (
      <div className="border border-line bg-white p-10 text-center">
        <CheckCircle2 className="mx-auto text-[#1f7a4d]" size={50} strokeWidth={1.3} />
        <h3 className="mt-5 text-3xl text-forest">Your property is submitted</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
          Thank you, {values.ownerName.split(' ')[0]}. Our team will review the details and contact you on {values.phone} before the listing goes live.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          {user && <Link to="/dashboard?tab=listings" className="btn-press inline-flex bg-forest px-5 py-3 text-sm font-semibold text-ivory">View my submissions</Link>}
          <button onClick={() => { setDone(false); setValues({ ...empty, ownerName: user?.name || '', phone: user?.phone || '' }); setImages([]) }} className="btn-press border border-forest px-5 py-3 text-sm font-semibold text-forest">List another property</button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-5 border border-line bg-white p-6 md:p-9">
      <div className="grid gap-5 sm:grid-cols-2">
        <Input label="Owner name" required value={values.ownerName} onChange={set('ownerName')} error={errors.ownerName} autoComplete="name" />
        <Input label="Mobile number" required type="tel" inputMode="numeric" value={values.phone} onChange={set('phone')} error={errors.phone} autoComplete="tel" placeholder="10-digit number" />
      </div>
      <Input label="Property title" required value={values.title} onChange={set('title')} error={errors.title} placeholder="e.g. Boys PG with meals in Talwandi" maxLength={90} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Select label="Property type" required value={values.category} onChange={set('category')} error={errors.category} placeholder="Select type" options={categories.map((c) => ({ value: c.slug, label: c.label }))} />
        <Select label="Location" required value={values.locality} onChange={set('locality')} error={errors.locality} placeholder="Select locality" options={locations.map((l) => ({ value: l.slug, label: l.name }))} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Input label="Monthly rent (₹)" required hint="For a PG, enter the lowest per-bed rent" type="number" min="0" inputMode="numeric" value={values.price} onChange={set('price')} error={errors.price} placeholder="e.g. 6500" />
        <Input label="Room / property size (sq. ft.)" type="number" min="0" inputMode="numeric" value={values.areaSqft} onChange={set('areaSqft')} error={errors.areaSqft} placeholder="e.g. 120" />
      </div>
      <Textarea label="Description" required value={values.description} onChange={set('description')} error={errors.description} rows={5} placeholder="Describe the rooms, sharing options, meals, rules, nearby landmarks and anything a tenant should know." />

      <Field label="Property images" hint={`Up to ${MAX_IMAGES} images. JPG or PNG, up to 8 MB each.`}>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
          {images.map((src, i) => (
            <div key={i} className="group relative aspect-square overflow-hidden border border-line">
              <img src={src} alt={`Upload ${i + 1}`} className="h-full w-full object-cover" />
              <button type="button" onClick={() => setImages((x) => x.filter((_, j) => j !== i))} aria-label={`Remove image ${i + 1}`} className="absolute inset-0 grid place-items-center bg-forest/70 text-white opacity-0 transition group-hover:opacity-100 focus:opacity-100"><Trash2 size={18} /></button>
            </div>
          ))}
          {images.length < MAX_IMAGES && (
            <button type="button" onClick={() => fileRef.current.click()} className="grid aspect-square place-items-center border border-dashed border-forest/40 text-forest transition hover:bg-stone">
              <span className="flex flex-col items-center gap-1 text-[0.7rem] font-semibold"><ImagePlus size={22} strokeWidth={1.5} />Add</span>
            </button>
          )}
        </div>
        <input ref={fileRef} type="file" accept="image/*" multiple hidden onChange={addFiles} />
      </Field>

      <Button type="submit" size="lg" loading={busy} className="w-full sm:w-auto">List Your Property</Button>
      <p className="text-xs text-muted">Submissions are reviewed by our team before being published. Never share OTPs, bank details or payment requests through this form.</p>
    </form>
  )
}
