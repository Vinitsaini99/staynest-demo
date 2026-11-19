import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { ImagePlus, X } from 'lucide-react'
import Button from '../../components/ui/Button'
import { Input, Select, Textarea } from '../../components/ui/Field'
import { Spinner } from '../../components/ui/States'
import { useApp } from '../../context/AppContext'
import { useSeo } from '../../hooks/useSeo'
import { createListing, getMyListing, updateListing } from '../../services/api'
import { categories, categoryBySlug, FURNISHING } from '../../data/categories'
import { localityNames } from '../../data/localities'
import { compressImage } from '../../utils/image'
import { cleanPhone, minLen, phoneRule, positiveNumber, required, validate } from '../../utils/validation'

const AMENITY_OPTIONS = ['Lift', 'Power backup', 'Covered parking', 'Car parking', '24x7 water', 'CCTV security', 'Gated colony', 'Balcony', 'Terrace', 'Garden', 'Modular kitchen', 'Air conditioning', 'Wi-Fi', 'Meals included', 'Laundry', 'Housekeeping', 'RO water', 'Reception area', 'Pantry']
const MAX_PHOTOS = 6

const EMPTY = {
  title: '', category: 'flat', locality: '', address: '', rent: '', deposit: '', maintenance: '', bhk: '', area: '', bathrooms: '1',
  floor: '', furnishing: 'semi', availableFrom: 'Immediately', tenants: '', amenities: [], description: '', images: [], ownerName: '', ownerPhone: '',
}

export default function ListingForm() {
  const { id } = useParams()
  const editing = !!id
  useSeo({ title: editing ? 'Edit property' : 'Add property', noindex: true })
  const { user } = useApp()
  const nav = useNavigate()
  const [v, setV] = useState({ ...EMPTY, ownerName: user.name, ownerPhone: user.phone })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(editing)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (!editing) return
    getMyListing(id)
      .then((p) => {
        if (!p) {
          toast.error('Listing not found')
          nav('/seller', { replace: true })
          return
        }
        setV({ ...EMPTY, ...p, rent: p.rent || '', deposit: p.deposit || '', maintenance: p.maintenance || '', bhk: p.bhk || '', area: p.area || '', bathrooms: p.bathrooms || '1' })
      })
      .finally(() => setLoading(false))
  }, [editing, id, nav])

  const set = (k) => (e) => setV((s) => ({ ...s, [k]: e.target.value }))
  const cat = categoryBySlug[v.category]
  const toggleAmenity = (a) => setV((s) => ({ ...s, amenities: s.amenities.includes(a) ? s.amenities.filter((x) => x !== a) : [...s.amenities, a] }))

  const addPhotos = async (e) => {
    const files = [...e.target.files].slice(0, MAX_PHOTOS - v.images.length)
    e.target.value = ''
    try {
      const done = await Promise.all(files.map((f) => compressImage(f)))
      setV((s) => ({ ...s, images: [...s.images, ...done] }))
    } catch (err) {
      toast.error(err.message)
    }
  }

  const submit = async (e) => {
    e.preventDefault()
    const errs = validate(v, {
      title: [required('Title'), minLen('Title', 8)],
      locality: [required('Locality')],
      address: [required('Address')],
      rent: [positiveNumber('rent')],
      description: [minLen('Description', 30)],
      ownerPhone: [phoneRule],
    })
    if (cat?.hasBhk && !v.bhk) errs.bhk = 'Select the number of bedrooms'
    setErrors(errs)
    if (Object.keys(errs).length) {
      toast.error('Please fix the highlighted fields')
      return
    }
    setBusy(true)
    try {
      const payload = { ...v, ownerPhone: cleanPhone(v.ownerPhone), bhk: cat?.hasBhk ? v.bhk : '' }
      if (editing) await updateListing(id, payload)
      else await createListing(payload)
      toast.success('Saved. Your listing is awaiting admin approval.')
      nav('/seller')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setBusy(false)
    }
  }

  if (loading) return <Spinner />

  return (
    <div className="container-x max-w-4xl py-10">
      <h1 className="text-3xl font-extrabold">{editing ? 'Edit property' : 'Add a property'}</h1>
      <p className="mt-1 text-muted">Accurate details and clear photos get more enquiries. Listings are reviewed before going live.</p>

      <form onSubmit={submit} className="mt-8 space-y-6" noValidate>
        <section className="card space-y-4 p-6">
          <h2 className="text-lg font-bold">Basics</h2>
          <Input label="Listing title" value={v.title} onChange={set('title')} error={errors.title} placeholder="e.g. Sunlit 2 BHK near metro" required />
          <div className="grid gap-4 sm:grid-cols-2">
            <Select label="Property type" value={v.category} onChange={set('category')} options={categories.map((c) => ({ value: c.slug, label: c.single }))} />
            <Select label="Locality" value={v.locality} onChange={set('locality')} options={localityNames} placeholder="Select locality" error={errors.locality} required />
          </div>
          <Input label="Address / landmark" value={v.address} onChange={set('address')} error={errors.address} placeholder="Street, colony, nearby landmark" required />
        </section>

        <section className="card space-y-4 p-6">
          <h2 className="text-lg font-bold">Pricing</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <Input label="Monthly rent (₹)" type="number" min="0" value={v.rent} onChange={set('rent')} error={errors.rent} required />
            <Input label="Security deposit (₹)" type="number" min="0" value={v.deposit} onChange={set('deposit')} />
            <Input label="Maintenance (₹/month)" type="number" min="0" value={v.maintenance} onChange={set('maintenance')} />
          </div>
        </section>

        <section className="card space-y-4 p-6">
          <h2 className="text-lg font-bold">Details</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {cat?.hasBhk && <Select label="Bedrooms (BHK)" value={v.bhk} onChange={set('bhk')} options={['1', '2', '3', '4', '5']} placeholder="Select" error={errors.bhk} required />}
            <Input label="Area (sq. ft.)" type="number" min="0" value={v.area} onChange={set('area')} />
            <Input label="Bathrooms" type="number" min="1" value={v.bathrooms} onChange={set('bathrooms')} />
            <Input label="Floor" value={v.floor} onChange={set('floor')} placeholder="e.g. 2nd of 4" />
            <Select label="Furnishing" value={v.furnishing} onChange={set('furnishing')} options={FURNISHING} />
            <Input label="Available from" value={v.availableFrom} onChange={set('availableFrom')} />
          </div>
          <Input label="Preferred tenants" value={v.tenants} onChange={set('tenants')} placeholder="e.g. Family or bachelors" />
          <Textarea label="Description" rows={5} value={v.description} onChange={set('description')} error={errors.description} hint="Mention nearby places, rules and what is included." required />

          <div>
            <p className="mb-2 text-[0.8rem] font-bold text-ink-soft">Amenities</p>
            <div className="flex flex-wrap gap-2">
              {AMENITY_OPTIONS.map((a) => (
                <button key={a} type="button" className="chip" data-active={v.amenities.includes(a)} onClick={() => toggleAmenity(a)}>{a}</button>
              ))}
            </div>
          </div>
        </section>

        <section className="card space-y-4 p-6">
          <h2 className="text-lg font-bold">Photos <span className="text-sm font-normal text-muted">(up to {MAX_PHOTOS})</span></h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {v.images.map((src, i) => (
              <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-xl border border-line">
                <img src={src} alt={`Upload ${i + 1}`} className="h-full w-full object-cover" />
                <button type="button" aria-label="Remove photo" onClick={() => setV((s) => ({ ...s, images: s.images.filter((_, k) => k !== i) }))} className="absolute right-1.5 top-1.5 grid h-7 w-7 place-items-center rounded-full bg-ink/80 text-white"><X size={14} /></button>
              </div>
            ))}
            {v.images.length < MAX_PHOTOS && (
              <label className="grid aspect-[4/3] cursor-pointer place-items-center rounded-xl border-2 border-dashed border-line bg-cream text-center text-xs font-bold text-muted transition-colors hover:border-brand hover:text-brand">
                <span><ImagePlus className="mx-auto mb-1" size={24} /> Add photos</span>
                <input type="file" accept="image/*" multiple className="sr-only" onChange={addPhotos} />
              </label>
            )}
          </div>
        </section>

        <section className="card space-y-4 p-6">
          <h2 className="text-lg font-bold">Contact shown to tenants</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Contact name" value={v.ownerName} onChange={set('ownerName')} />
            <Input label="Contact mobile" inputMode="tel" value={v.ownerPhone} onChange={set('ownerPhone')} error={errors.ownerPhone} required />
          </div>
        </section>

        <div className="flex flex-wrap gap-3">
          <Button type="submit" size="lg" loading={busy}>{editing ? 'Save and resubmit' : 'Submit for approval'}</Button>
          <Button variant="outline" size="lg" onClick={() => nav('/seller')}>Cancel</Button>
        </div>
      </form>
    </div>
  )
}
