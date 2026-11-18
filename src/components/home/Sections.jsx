import { useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { ArrowRight, Compass, FileCheck2, Handshake, Headset, Home, MapPinned, MessageSquareQuote, Search, ShieldCheck, Wallet } from 'lucide-react'
import { getArticles, addReview, getReviews } from '../../services/api'
import { imgSrc } from '../../utils/image'
import { formatDate } from '../../utils/format'
import { minLen, required, validate } from '../../utils/validation'
import Reveal from '../ui/Reveal'
import { SectionHead, Stars } from '../ui/Bits'
import { Button, LinkButton } from '../ui/Button'
import { Input, Textarea } from '../ui/Field'
import Modal from '../ui/Modal'
import SellForm from '../property/SellForm'

const reasons = [
  { icon: ShieldCheck, title: 'Verified-listing badges', text: 'Listings that pass our document checks carry a Verified badge, so you know where to look first.' },
  { icon: MapPinned, title: 'Rooted in Kota', text: 'Organised around Kota’s real localities, with practical notes on each neighbourhood.' },
  { icon: Wallet, title: 'Transparent pricing', text: 'Prices, area and price-per-sq.-ft. are shown upfront — no hidden surprises while you compare.' },
  { icon: Handshake, title: 'Direct seller contact', text: 'Call, WhatsApp or send an enquiry straight to the owner or listing desk.' },
  { icon: FileCheck2, title: 'Clear property details', text: 'Specifications, amenities, status and location in a consistent, easy-to-scan format.' },
  { icon: Headset, title: 'Help when you need it', text: 'Our team is available during office hours to guide you from shortlist to site visit.' },
]

export function WhyChoose() {
  return (
    <section className="container-x py-20 md:py-28">
      <SectionHead eyebrow="Why Kota Ki Property" title="A calmer, clearer way to buy and sell property" />
      <div className="grid gap-x-12 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        {reasons.map(({ icon: Icon, title, text }, i) => (
          <Reveal key={title} delay={(i % 3) * 0.06}>
            <Icon size={24} strokeWidth={1.4} className="text-gold-deep" />
            <h3 className="mt-4 font-sans text-[1.05rem] font-semibold tracking-normal text-forest">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export function Showcase() {
  return (
    <section className="container-x pb-20 md:pb-28">
      <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <Reveal>
          <div className="img-zoom aspect-[4/3] bg-stone"><img src={imgSrc('1600596542815-ffad4c1539a9', 1200, 900)} alt="Modern villa exterior" loading="lazy" className="h-full w-full object-cover" /></div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="eyebrow">The premium collection</p>
          <h2 className="mt-4 text-3xl leading-tight text-forest md:text-[2.6rem]">Residences designed for how you live</h2>
          <p className="mt-5 leading-relaxed text-muted">
            Landscaped villas, light-filled apartments and plots in planned townships — homes chosen for space, layout and neighbourhood.
          </p>
          <LinkButton to="/houses-villas" variant="primary" size="lg" className="mt-8">Explore Villas &amp; Houses</LinkButton>
        </Reveal>
      </div>
    </section>
  )
}

export function SellSection() {
  return (
    <section id="sell" className="bg-stone/60">
      <div className="container-x grid gap-12 py-20 md:py-28 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <p className="eyebrow">Sell your property</p>
          <h2 className="mt-4 text-4xl leading-tight text-forest md:text-[2.8rem]">Have a Property in Kota? Let’s Find Its Buyer.</h2>
          <p className="mt-6 max-w-md leading-relaxed text-muted">Share a few details and photos. Our team reviews every submission before it goes live, and buyers contact you directly.</p>
          <ol className="mt-8 space-y-4">
            {['Fill in the property details', 'We review and verify the listing', 'Receive enquiries from genuine buyers'].map((t, i) => (
              <li key={t} className="flex items-center gap-4 text-sm font-medium text-forest">
                <span className="grid h-8 w-8 place-items-center border border-forest font-display text-sm">{i + 1}</span>{t}
              </li>
            ))}
          </ol>
        </Reveal>
        <Reveal delay={0.1}><SellForm /></Reveal>
      </div>
    </section>
  )
}

const steps = [
  { icon: Search, title: 'Discover Properties', text: 'Search by locality, budget and type, then compare options side by side.' },
  { icon: Handshake, title: 'Connect With Sellers', text: 'Enquire, call or message on WhatsApp to get answers and arrange a visit.' },
  { icon: Home, title: 'Visit & Buy Your Property', text: 'Inspect in person, verify the documents and close with confidence.' },
]

export function HowItWorks() {
  return (
    <section className="container-x py-20 md:py-28">
      <SectionHead eyebrow="How it works" title="From first search to the front door" />
      <div className="grid gap-12 md:grid-cols-3">
        {steps.map(({ title, text }, i) => (
          <Reveal key={title} delay={i * 0.08}>
            <p className="font-display text-5xl text-gold">{String(i + 1).padStart(2, '0')}</p>
            <h3 className="mt-4 text-2xl text-forest">{title}</h3>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">{text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function ReviewForm({ onDone }) {
  const [v, setV] = useState({ name: '', rating: 5, text: '' })
  const [err, setErr] = useState({})
  const [busy, setBusy] = useState(false)
  const submit = async (e) => {
    e.preventDefault()
    const errors = validate(v, { name: [required('Name'), minLen('Name', 2)], text: [required('Review'), minLen('Review', 15)] })
    setErr(errors)
    if (Object.keys(errors).length) return
    setBusy(true)
    await addReview({ ...v, name: v.name.trim(), text: v.text.trim() })
    setBusy(false)
    toast.success('Thank you for sharing your experience')
    onDone()
  }
  return (
    <form onSubmit={submit} noValidate className="space-y-4">
      <Input label="Your name" required value={v.name} onChange={(e) => setV({ ...v, name: e.target.value })} error={err.name} />
      <div>
        <p className="mb-1.5 text-[0.78rem] font-semibold uppercase tracking-wider text-forest">Rating</p>
        <div className="flex gap-1" role="radiogroup" aria-label="Rating">
          {[1, 2, 3, 4, 5].map((n) => (
            <button type="button" key={n} role="radio" aria-checked={v.rating === n} aria-label={`${n} stars`} onClick={() => setV({ ...v, rating: n })}><Stars value={n <= v.rating ? n : 0} size={26} /></button>
          ))}
        </div>
      </div>
      <Textarea label="Your experience" required value={v.text} onChange={(e) => setV({ ...v, text: e.target.value })} error={err.text} rows={4} />
      <Button type="submit" loading={busy} className="w-full">Submit review</Button>
    </form>
  )
}

export function Testimonials() {
  const [reviews, setReviews] = useState(getReviews)
  const [open, setOpen] = useState(false)
  return (
    <section className="bg-stone">
      <div className="container-x py-20 md:py-28">
        <SectionHead
          eyebrow="Client experiences" title="What our clients say"
          action={<Button variant="outline" size="sm" onClick={() => setOpen(true)}>Share your experience</Button>}
        />
        {reviews.length === 0 ? (
          <Reveal className="grid items-center gap-6 border border-dashed border-forest/30 bg-ivory p-10 text-center md:grid-cols-[auto_1fr] md:text-left">
            <MessageSquareQuote size={44} strokeWidth={1.2} className="mx-auto text-gold-deep" />
            <div>
              <h3 className="text-2xl text-forest">Real reviews will appear here</h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">We only display genuine feedback from people who have used our service. Worked with us? Be the first to share your experience.</p>
            </div>
          </Reveal>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {reviews.slice(0, 6).map((r) => (
              <Reveal key={r.id}>
                <figure className="h-full border border-line bg-ivory p-7">
                  <Stars value={r.rating} />
                  <blockquote className="mt-4 text-[0.95rem] leading-relaxed text-charcoal">“{r.text}”</blockquote>
                  <figcaption className="mt-5 text-sm"><strong className="text-forest">{r.name}</strong><span className="block text-xs text-muted">{formatDate(r.createdAt)}</span></figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        )}
      </div>
      <Modal open={open} onClose={() => setOpen(false)} title="Share your experience">
        <ReviewForm onDone={() => { setReviews(getReviews()); setOpen(false) }} />
      </Modal>
    </section>
  )
}

export function InsightsRow() {
  const items = getArticles().slice(0, 3)
  return (
    <section className="container-x py-20 md:py-28">
      <SectionHead
        eyebrow="Real estate insights" title="Guides for smarter property decisions"
        action={<Link to="/insights" className="link-underline inline-flex items-center gap-2 pb-0.5 text-sm font-semibold text-forest">All articles <ArrowRight size={15} /></Link>}
      />
      <div className="grid gap-8 md:grid-cols-3">
        {items.map((a, i) => (
          <Reveal key={a.slug} delay={i * 0.08}>
            <Link to={`/insights/${a.slug}`} className="group block">
              <div className="img-zoom aspect-[3/2] bg-stone"><img src={imgSrc(a.image, 700, 466)} alt="" loading="lazy" className="h-full w-full object-cover" /></div>
              <p className="eyebrow mt-5">{a.category} · {a.readMinutes} min read</p>
              <h3 className="mt-2 text-xl leading-snug text-forest group-hover:underline">{a.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-muted">{a.excerpt}</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-forest">
      <div className="container-x flex flex-col items-start justify-between gap-6 py-14 md:flex-row md:items-center">
        <div>
          <p className="eyebrow eyebrow-light flex items-center gap-2"><Compass size={14} /> Need guidance?</p>
          <h2 className="mt-3 max-w-xl text-3xl text-ivory md:text-4xl">Tell us what you’re looking for — we’ll help you find it.</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <LinkButton to="/contact-us" variant="gold" size="lg">Talk to Our Team</LinkButton>
          <LinkButton to="/buy-property" variant="outlineLight" size="lg">Browse Properties</LinkButton>
        </div>
      </div>
    </section>
  )
}
