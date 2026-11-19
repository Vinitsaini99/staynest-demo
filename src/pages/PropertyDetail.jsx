import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { BadgeCheck, BedDouble, Bath, CalendarDays, Check, Heart, Layers, MapPin, Maximize2, MessageCircle, Phone, Share2, Sofa, Users } from 'lucide-react'
import PropertyArt from '../components/PropertyArt'
import PropertyCard from '../components/PropertyCard'
import Button from '../components/ui/Button'
import { Input, Textarea } from '../components/ui/Field'
import { Badge, StatusBadge } from '../components/ui/Bits'
import { Empty, Spinner } from '../components/ui/States'
import { useApp } from '../context/AppContext'
import { useAsync } from '../hooks/useAsync'
import { useSeo } from '../hooks/useSeo'
import { createEnquiry, getProperty, similarProperties } from '../services/api'
import { categoryBySlug, furnishingLabel } from '../data/categories'
import { SITE, ownerWaLink } from '../config/site'
import { formatArea, formatDate, formatPrice, formatRupees, pricePerSqft } from '../utils/format'
import { cleanPhone, emailRule, minLen, phoneRule, required, validate } from '../utils/validation'

function Gallery({ p }) {
  const [i, setI] = useState(0)
  const imgs = p.images || []
  return (
    <div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-line bg-brand-tint">
        {imgs.length ? <img src={imgs[i]} alt={`${p.title} photo ${i + 1}`} className="h-full w-full object-cover" /> : <PropertyArt category={p.category} seed={p.id} />}
        {p.demo && <span className="absolute bottom-3 right-3 rounded-lg bg-ink/80 px-2.5 py-1 text-[0.7rem] font-bold text-white">Sample listing · illustration</span>}
      </div>
      {imgs.length > 1 && (
        <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto">
          {imgs.map((src, k) => (
            <button key={k} type="button" onClick={() => setI(k)} aria-label={`Show photo ${k + 1}`} className={`h-16 w-24 shrink-0 overflow-hidden rounded-xl border-2 ${k === i ? 'border-brand' : 'border-transparent opacity-70'}`}>
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function EnquiryForm({ p }) {
  const { user } = useApp()
  const [v, setV] = useState({ name: user?.name || '', phone: user?.phone || '', email: user?.email || '', message: `Hi, I am interested in "${p.title}". Is it still available?` })
  const [errors, setErrors] = useState({})
  const [busy, setBusy] = useState(false)
  const [sent, setSent] = useState(false)
  const set = (k) => (e) => setV((s) => ({ ...s, [k]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    const errs = validate(v, { name: [required('Name'), minLen('Name', 2)], phone: [phoneRule], email: [emailRule], message: [minLen('Message', 10)] })
    setErrors(errs)
    if (Object.keys(errs).length) return
    setBusy(true)
    try {
      await createEnquiry({ propertyId: p.id, ...v, phone: cleanPhone(v.phone) })
      setSent(true)
      toast.success('Enquiry sent to the owner')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setBusy(false)
    }
  }

  if (sent) {
    return (
      <div className="card p-6 text-center">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-emerald-100 text-emerald-700"><Check /></span>
        <h3 className="mt-3 text-lg font-bold">Enquiry sent</h3>
        <p className="mt-1 text-sm text-muted">The owner will get back to you shortly. You can also call or WhatsApp directly.</p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="card space-y-3 p-5" noValidate>
      <h3 className="text-lg font-bold">Send an enquiry</h3>
      <Input label="Your name" value={v.name} onChange={set('name')} error={errors.name} required />
      <div className="grid gap-3 sm:grid-cols-2">
        <Input label="Mobile" inputMode="tel" value={v.phone} onChange={set('phone')} error={errors.phone} required />
        <Input label="Email" type="email" value={v.email} onChange={set('email')} error={errors.email} required />
      </div>
      <Textarea label="Message" rows={3} value={v.message} onChange={set('message')} error={errors.message} required />
      <Button type="submit" loading={busy} className="w-full" size="lg">Send enquiry</Button>
    </form>
  )
}

export default function PropertyDetail() {
  const { slug } = useParams()
  const { saved, toggleSave } = useApp()
  const { data: p, loading } = useAsync(() => getProperty(slug), [slug])
  const { data: similar } = useAsync(() => (p ? similarProperties(p) : Promise.resolve([])), [p?.id])

  const cat = p ? categoryBySlug[p.category] : null
  useSeo(
    p
      ? {
          title: `${p.title} for Rent in ${p.locality}, Kota`,
          description: `${cat?.single} for rent in ${p.locality}, Kota at ${formatPrice(p.rent)}/month. ${p.description.slice(0, 110)}`,
          path: `/property/${p.slug}`,
          image: p.images?.[0]?.startsWith('http') ? p.images[0] : undefined,
          noindex: p.status !== 'approved',
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'Accommodation',
            name: p.title,
            description: p.description,
            address: { '@type': 'PostalAddress', addressLocality: p.locality, addressRegion: 'Rajasthan', addressCountry: 'IN' },
            offers: { '@type': 'Offer', price: p.rent, priceCurrency: 'INR' },
          },
        }
      : { title: 'Property', noindex: true },
  )

  if (loading) return <Spinner />
  if (!p) {
    return (
      <div className="container-x py-16">
        <Empty title="Listing not found" text="This property may have been rented out or removed." action={<Button to="/rentals">Browse rentals</Button>} />
      </div>
    )
  }

  const isSaved = saved.includes(p.id)
  const phone = cleanPhone(p.ownerPhone)
  const waText = `Hi ${p.ownerName?.split(' ')[0] || ''}, I saw "${p.title}" (${formatPrice(p.rent)}/month) on ${SITE.name}. Is it available?`

  const share = async () => {
    const url = window.location.href
    try {
      if (navigator.share) await navigator.share({ title: p.title, url })
      else {
        await navigator.clipboard.writeText(url)
        toast.success('Link copied')
      }
    } catch {
      /* cancelled */
    }
  }

  const facts = [
    p.bhk && { icon: BedDouble, label: 'Bedrooms', value: `${p.bhk} BHK` },
    p.area && { icon: Maximize2, label: 'Area', value: formatArea(p.area) },
    { icon: Bath, label: 'Bathrooms', value: p.bathrooms },
    p.floor && { icon: Layers, label: 'Floor', value: p.floor },
    { icon: Sofa, label: 'Furnishing', value: furnishingLabel(p.furnishing) },
    { icon: CalendarDays, label: 'Available', value: p.availableFrom },
    p.tenants && { icon: Users, label: 'Preferred', value: p.tenants },
  ].filter(Boolean)

  return (
    <div className="container-x py-8">
      <nav className="mb-4 text-xs font-semibold text-muted" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-brand">Home</Link> / <Link to="/rentals" className="hover:text-brand">Rentals</Link> / <Link to={`/rentals?category=${p.category}`} className="hover:text-brand">{cat?.label}</Link>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1fr_24rem]">
        <div className="min-w-0">
          <Gallery p={p} />

          <div className="mt-6 flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="mb-2 flex flex-wrap gap-2">
                <Badge tone="teal">{cat?.single}</Badge>
                {p.verified && <Badge tone="green"><BadgeCheck size={13} /> Verified</Badge>}
                {p.status !== 'approved' && <StatusBadge status={p.status} />}
              </div>
              <h1 className="text-2xl font-extrabold sm:text-3xl">{p.title}</h1>
              <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted"><MapPin size={16} className="text-saffron-deep" /> {p.address}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => toggleSave(p.id)} aria-pressed={isSaved}>
                <Heart size={16} className={isSaved ? 'fill-red-500 text-red-500' : ''} /> {isSaved ? 'Saved' : 'Save'}
              </Button>
              <Button variant="outline" size="sm" onClick={share}><Share2 size={16} /> Share</Button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {facts.map(({ icon: Icon, label, value }) => (
              <div key={label} className="rounded-2xl border border-line bg-white p-3.5">
                <Icon size={18} className="text-brand" />
                <p className="mt-1.5 text-[0.72rem] font-bold uppercase tracking-wide text-muted">{label}</p>
                <p className="text-sm font-bold">{value}</p>
              </div>
            ))}
          </div>

          <section className="mt-8">
            <h2 className="mb-2 text-xl font-bold">About this property</h2>
            <div className="prose-gk"><p>{p.description || 'The owner has not added a description yet.'}</p></div>
          </section>

          {p.amenities?.length > 0 && (
            <section className="mt-6">
              <h2 className="mb-3 text-xl font-bold">Amenities</h2>
              <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {p.amenities.map((a) => (
                  <li key={a} className="flex items-center gap-2 rounded-xl bg-white px-3 py-2.5 text-sm font-semibold ring-1 ring-line">
                    <Check size={16} className="text-emerald-600" /> {a}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            <p className="font-bold">Rent safely</p>
            <p className="mt-1">Visit the property in person and verify the owner before paying any deposit. Never transfer money for a home you have not seen.</p>
          </section>
        </div>

        <aside className="space-y-5 lg:sticky lg:top-28 lg:h-fit">
          <div className="card p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-muted">Monthly rent</p>
            <p className="font-display text-4xl font-extrabold text-brand-deep">{formatPrice(p.rent)}</p>
            {pricePerSqft(p.rent, p.area) && <p className="text-xs text-muted">{pricePerSqft(p.rent, p.area)}</p>}
            <dl className="mt-4 divide-y divide-line text-sm">
              <div className="flex justify-between py-2"><dt className="text-muted">Security deposit</dt><dd className="font-bold">{formatRupees(p.deposit)}</dd></div>
              <div className="flex justify-between py-2"><dt className="text-muted">Maintenance</dt><dd className="font-bold">{p.maintenance ? `${formatRupees(p.maintenance)}/mo` : 'Included'}</dd></div>
              <div className="flex justify-between py-2"><dt className="text-muted">Listed on</dt><dd className="font-bold">{formatDate(p.listedAt)}</dd></div>
            </dl>
            <div className="mt-4 rounded-xl bg-sand p-3 text-sm">
              <p className="text-xs text-muted">Listed by</p>
              <p className="font-bold">{p.ownerName}</p>
            </div>
            <div className="mt-4 grid gap-2.5">
              <Button href={`tel:+91${phone}`} size="lg" variant="dark"><Phone size={18} /> Call owner</Button>
              <Button href={ownerWaLink(phone, waText)} target="_blank" rel="noreferrer" size="lg" variant="whatsapp"><MessageCircle size={18} /> WhatsApp</Button>
            </div>
            {p.demo && <p className="mt-3 text-center text-[0.72rem] text-muted">Sample listing with a placeholder number.</p>}
          </div>
          <EnquiryForm p={p} />
        </aside>
      </div>

      {similar?.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-5 text-2xl font-extrabold">Similar properties</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{similar.map((s) => <PropertyCard key={s.id} p={s} />)}</div>
        </section>
      )}
    </div>
  )
}
