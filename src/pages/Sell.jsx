import { Camera, ClipboardCheck, ShieldCheck, Users } from 'lucide-react'
import { useSeo } from '../hooks/useSeo'
import { PageHero } from '../components/ui/Bits'
import Reveal from '../components/ui/Reveal'
import SellForm from '../components/property/SellForm'

const perks = [
  { icon: ClipboardCheck, t: 'Simple submission', d: 'One short form — no lengthy paperwork up front.' },
  { icon: ShieldCheck, t: 'Reviewed before publishing', d: 'Every listing is checked for completeness and accuracy.' },
  { icon: Camera, t: 'Show it at its best', d: 'Upload up to six photos to help your listing stand out.' },
  { icon: Users, t: 'Direct enquiries', d: 'Interested tenants contact you through our desk.' },
]

const faqs = [
  ['Is it free to submit a listing?', 'Submitting your property details for review does not require any payment through this form. Never pay anyone claiming to be from us outside official channels.'],
  ['How long does review take?', 'Our team aims to review submissions promptly during office hours and will call you on the number you provide.'],
  ['What happens after I submit?', 'We verify the details, may request documents, and then publish the listing. Tenant enquiries are routed to you.'],
  ['Can I edit my listing later?', 'Contact our team with the changes and we will update the listing for you.'],
]

export default function Sell() {
  useSeo({
    title: 'List Your PG or Rental in Kota',
    description: 'List your PG, hostel, room, flat, house or shop for rent in Kota, Rajasthan. Submit details and photos and reach genuine tenants.',
    path: '/sell-your-property',
  })
  return (
    <>
      <PageHero eyebrow="For owners" title="Have a PG or rental in Kota? Let’s find your tenants." intro="Tell us about your property and upload a few photos. We’ll review it and connect you with genuine tenants." crumbs={[{ label: 'Home', to: '/' }, { label: 'List Your Property' }]} />
      <section className="container-x grid gap-12 py-14 lg:grid-cols-[1fr_340px] md:py-20">
        <Reveal><SellForm /></Reveal>
        <aside className="space-y-6">
          <div className="border border-line bg-white p-7">
            <h2 className="text-xl text-forest">Why list with us</h2>
            <ul className="mt-5 space-y-5">
              {perks.map(({ icon: Icon, t, d }) => (
                <li key={t} className="flex gap-4"><Icon size={22} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold-deep" /><div><p className="text-sm font-semibold text-forest">{t}</p><p className="mt-1 text-sm text-muted">{d}</p></div></li>
              ))}
            </ul>
          </div>
        </aside>
      </section>
      <section className="border-t border-line bg-white">
        <div className="container-x py-16">
          <h2 className="text-3xl text-forest">Frequently asked questions</h2>
          <div className="mt-8 divide-y divide-line border-y border-line">
            {faqs.map(([q, a]) => (
              <details key={q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between text-base font-semibold text-forest">{q}<span className="text-xl text-gold-deep transition-transform group-open:rotate-45">+</span></summary>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
