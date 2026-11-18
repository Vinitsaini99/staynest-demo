import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Bath, BedDouble, Check, Compass, Heart, Layers, Maximize, MessageCircle, Phone, Share2, ShieldCheck, Sofa, Sparkles, Info, Users, UtensilsCrossed, Wallet } from 'lucide-react'
import { SITE } from '../config/site'
import { getCategory } from '../data/categories'
import { locations } from '../data/locations'
import { useAsync } from '../hooks/useAsync'
import { useSeo } from '../hooks/useSeo'
import { useApp } from '../context/AppContext'
import { getProperty, getSimilar, pushRecent } from '../services/api'
import { formatArea, formatDate, formatPrice } from '../utils/format'
import { imgSrc } from '../utils/image'
import { Badge, Breadcrumbs, SectionHead } from '../components/ui/Bits'
import { Button, LinkButton } from '../components/ui/Button'
import { ErrorState, Skeleton } from '../components/ui/States'
import Gallery from '../components/property/Gallery'
import EnquiryForm, { whatsappLink } from '../components/property/EnquiryForm'
import PropertyCard from '../components/property/PropertyCard'
import NotFound from './NotFound'

function Spec({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 bg-white p-4">
      <Icon size={20} strokeWidth={1.5} className="shrink-0 text-gold-deep" />
      <div><p className="text-[0.66rem] font-bold uppercase tracking-wider text-muted">{label}</p><p className="text-sm font-semibold text-forest">{value}</p></div>
    </div>
  )
}

function DetailSkeleton() {
  return (
    <div className="container-x py-10">
      <Skeleton className="h-4 w-64" />
      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_380px]">
        <div><Skeleton className="aspect-[16/10] w-full" /><Skeleton className="mt-6 h-9 w-2/3" /><Skeleton className="mt-3 h-5 w-1/3" /><Skeleton className="mt-8 h-40 w-full" /></div>
        <Skeleton className="h-96 w-full" />
      </div>
    </div>
  )
}

function Detail({ p }) {
  const { isSaved, toggleWishlist } = useApp()
  const loc = locations.find((l) => l.slug === p.locality)
  const cat = getCategory(p.category)
  const similar = useAsync(() => getSimilar(p), [p.id])
  const url = `${SITE.url}/property/${p.slug}`

  useEffect(() => pushRecent(p.id), [p.id])

  useSeo({
    title: `${p.title} – ${formatPrice(p.price)}/month`,
    description: `${p.propertyType} for rent in ${loc?.name}, Kota from ${formatPrice(p.price)}/month. ${p.description.slice(0, 110)}…`,
    path: `/property/${p.slug}`,
    image: imgSrc(p.images[0], 1200),
    type: 'article',
    jsonLd: [
      {
        '@context': 'https://schema.org', '@type': 'RealEstateListing', name: p.title, description: p.description, url,
        image: p.images.map((i) => imgSrc(i, 1200)), datePosted: p.listedAt,
        offers: { '@type': 'Offer', price: p.price, priceCurrency: 'INR', availability: 'https://schema.org/InStock', priceSpecification: { '@type': 'UnitPriceSpecification', price: p.price, priceCurrency: 'INR', unitText: 'MONTH' } },
        address: { '@type': 'PostalAddress', addressLocality: loc?.name, addressRegion: 'Rajasthan', addressCountry: 'IN' },
        floorSize: { '@type': 'QuantitativeValue', value: p.areaSqft, unitCode: 'FTK' },
      },
      {
        '@context': 'https://schema.org', '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
          { '@type': 'ListItem', position: 2, name: cat?.label, item: `${SITE.url}${cat?.path.split('?')[0]}` },
          { '@type': 'ListItem', position: 3, name: p.title, item: url },
        ],
      },
    ],
  })

  const share = async () => {
    try {
      if (navigator.share) await navigator.share({ title: p.title, url })
      else { await navigator.clipboard.writeText(url); toast.success('Link copied to clipboard') }
    } catch { /* user cancelled */ }
  }

  const specs = [
    p.bhk > 0 && { icon: BedDouble, label: 'Bedrooms', value: `${p.bhk} BHK` },
    p.gender && { icon: Users, label: 'Suitable for', value: p.gender },
    p.sharing && { icon: UtensilsCrossed, label: 'Meals', value: p.food ? 'Included' : 'Not included' },
    p.bathrooms > 0 && { icon: Bath, label: 'Bathrooms', value: p.bathrooms },
    p.deposit && { icon: Wallet, label: 'Security deposit', value: formatPrice(p.deposit) },
    { icon: Maximize, label: p.sharing ? 'Room size' : 'Area', value: formatArea(p.areaSqft) },
    p.floor && { icon: Layers, label: 'Floor', value: p.floor },
    p.facing && { icon: Compass, label: 'Facing', value: p.facing },
    p.furnishing && { icon: Sofa, label: 'Furnishing', value: p.furnishing },
  ].filter(Boolean)

  const rows = [
    ['Property type', p.propertyType], ['Status', p.status], ['Locality', `${loc?.name}, Kota`], ['Listed on', formatDate(p.listedAt)],
    ['Listed by', `${p.seller.name} (${p.seller.type})`], ['Reference ID', p.id],
  ]

  return (
    <>
      <div className="border-b border-line bg-white">
        <div className="container-x py-4"><Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: cat?.label, to: cat?.path }, { label: loc?.name, to: `/locations/${p.locality}` }, { label: p.title }]} /></div>
      </div>

      <div className="container-x py-8 md:py-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          <div className="min-w-0">
            <Gallery images={p.images} title={p.title} />

            <div className="mt-8 flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="mb-3 flex flex-wrap gap-2">
                  {p.featured && <Badge tone="gold"><Sparkles size={11} /> Featured</Badge>}
                  {p.verified ? <Badge tone="forest"><ShieldCheck size={11} /> Verified</Badge> : <Badge tone="outline">Verification pending</Badge>}
                  <Badge tone="outline">{p.status}</Badge>
                </div>
                <h1 className="text-3xl leading-tight text-forest md:text-4xl">{p.title}</h1>
                <p className="mt-2 text-muted">{p.address}</p>
              </div>
              <div className="text-right">
                <p className="font-display text-4xl text-forest">{formatPrice(p.price)}<span className="font-sans text-base font-normal text-muted"> /month</span></p>
                <p className="mt-1 text-xs text-muted">{p.sharing ? 'per month, per bed (from)' : 'per month'}{p.deposit ? ' · Deposit '+formatPrice(p.deposit) : ''}</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant={isSaved(p.id) ? 'primary' : 'outline'} size="sm" onClick={() => toggleWishlist(p.id)}><Heart size={15} className={isSaved(p.id) ? 'fill-current' : ''} /> {isSaved(p.id) ? 'Saved' : 'Save'}</Button>
              <Button variant="outline" size="sm" onClick={share}><Share2 size={15} /> Share</Button>
            </div>

            <div className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">{specs.map((s) => <Spec key={s.label} {...s} />)}</div>

            {p.sharingPrices && (
              <section className="mt-12">
                <h2 className="text-2xl text-forest">Rent per bed</h2>
                <dl className="mt-5 divide-y divide-line border border-line bg-white">
                  {Object.entries(p.sharingPrices).sort((a, b) => b[1] - a[1]).map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between px-5 py-3.5 text-sm"><dt className="font-medium text-forest">{k} sharing</dt><dd className="font-display text-xl text-forest">{formatPrice(v)}<span className="font-sans text-xs text-muted"> /month</span></dd></div>
                  ))}
                </dl>
              </section>
            )}

            <section className="mt-12">
              <h2 className="text-2xl text-forest">About this property</h2>
              <p className="mt-4 leading-[1.85] text-[#3b423d]">{p.description}</p>
            </section>

            {p.amenities.length > 0 && (
              <section className="mt-12">
                <h2 className="text-2xl text-forest">Amenities</h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {p.amenities.map((a) => <li key={a} className="flex items-center gap-2.5 text-sm"><Check size={16} className="text-gold-deep" />{a}</li>)}
                </ul>
              </section>
            )}

            <section className="mt-12">
              <h2 className="text-2xl text-forest">Property details</h2>
              <dl className="mt-5 divide-y divide-line border border-line bg-white">
                {rows.map(([k, v]) => <div key={k} className="grid grid-cols-2 gap-4 px-5 py-3 text-sm"><dt className="text-muted">{k}</dt><dd className="font-medium text-forest">{v}</dd></div>)}
              </dl>
            </section>

            <section className="mt-12">
              <h2 className="text-2xl text-forest">Location</h2>
              <p className="mt-2 text-sm text-muted">Showing the general area of {loc?.name}, Kota. Exact address is shared by the owner on enquiry.</p>
              <div className="mt-5 aspect-[16/8] overflow-hidden border border-line bg-stone">
                <iframe title={`Map of ${loc?.name}, Kota`} src={`https://www.google.com/maps?q=${encodeURIComponent(loc?.query || 'Kota, Rajasthan')}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-full w-full border-0" />
              </div>
            </section>

            {p.demo && (
              <p className="mt-10 flex gap-3 border border-line bg-white p-4 text-xs leading-relaxed text-muted"><Info size={16} className="mt-0.5 shrink-0 text-gold-deep" />This is a sample listing used to demonstrate the platform. Details, photos and pricing are illustrative and not an offer to rent.</p>
            )}
          </div>

          <aside>
            <div className="sticky top-32 space-y-5">
              <div className="border border-line bg-white p-6">
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-gold-deep">Listed by</p>
                <div className="mt-3 flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center bg-forest font-display text-lg text-gold">{p.seller.name[0]}</span>
                  <div><p className="font-semibold text-forest">{p.seller.name}</p><p className="text-xs text-muted">{p.seller.type}</p></div>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <LinkButton href={`tel:+${SITE.phoneRaw}`} variant="primary" size="md"><Phone size={15} /> Call Now</LinkButton>
                  <LinkButton href={whatsappLink(p)} target="_blank" rel="noopener noreferrer" variant="whatsapp" size="md"><MessageCircle size={15} /> WhatsApp</LinkButton>
                </div>
                <p className="mt-3 text-center text-[0.7rem] text-muted">Calls and messages are handled by the {SITE.name} desk.</p>
              </div>
              <div className="border border-line bg-white p-6">
                <h2 className="mb-5 text-xl text-forest">Send an enquiry</h2>
                <EnquiryForm property={p} compact />
              </div>
            </div>
          </aside>
        </div>
      </div>

      {similar.data?.length > 0 && (
        <section className="border-t border-line bg-white">
          <div className="container-x py-16">
            <SectionHead eyebrow="You may also like" title="Similar properties" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{similar.data.map((s) => <PropertyCard key={s.id} property={s} />)}</div>
          </div>
        </section>
      )}
    </>
  )
}

export default function PropertyDetail() {
  const { slug } = useParams()
  const { data, loading, error, reload } = useAsync(() => getProperty(slug), [slug])

  if ((loading && !data) || (data && data.slug !== slug)) return <DetailSkeleton />
  if (error?.message === 'NOT_FOUND') return <NotFound />
  if (error) return <div className="container-x py-16"><ErrorState onRetry={reload} /></div>
  if (!data) return null
  return <Detail key={data.id} p={data} />
}
