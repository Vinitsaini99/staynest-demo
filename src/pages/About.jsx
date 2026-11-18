import { Eye, Gem, Handshake, Scale } from 'lucide-react'
import { SITE } from '../config/site'
import { useSeo } from '../hooks/useSeo'
import { imgSrc } from '../utils/image'
import { PageHero } from '../components/ui/Bits'
import Reveal from '../components/ui/Reveal'
import { LinkButton } from '../components/ui/Button'

const values = [
  { icon: Eye, t: 'Clarity', d: 'Rents, deposits and details presented plainly, so comparing is effortless.' },
  { icon: Scale, t: 'Integrity', d: 'We label what is verified and what is not, and never overstate a listing.' },
  { icon: Handshake, t: 'Respect for your time', d: 'Direct, quick connections between tenants and owners.' },
  { icon: Gem, t: 'Quality', d: 'A thoughtful platform for every stay, from a shared bed to a family home.' },
]

export default function About() {
  useSeo({ title: 'About Us', description: `${SITE.name} is a Kota-focused platform for finding affordable PGs, hostels and rental homes in Rajasthan.`, path: '/about-us' })
  return (
    <>
      <PageHero eyebrow="About us" title="Affordable stays, built around Kota" intro={SITE.tagline} crumbs={[{ label: 'Home', to: '/' }, { label: 'About Us' }]} />
      <section className="container-x grid items-center gap-12 py-16 md:py-24 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow">Our story</p>
          <h2 className="mt-4 text-4xl leading-tight text-forest">Finding a place to stay should be simple</h2>
          <div className="prose-kkp mt-6">
            <p>Kota is a city of constant movement — thousands of students arriving every year, along with families and professionals making it home. Yet finding a good PG or rental has often meant scattered listings, unclear rents and wasted trips.</p>
            <p>{SITE.name} was created to change that. We bring PGs, hostels, rooms and rentals together in one well-organised place, organised by the localities people actually search, with the monthly rent and what is included shown upfront.</p>
            <p>Whether you are a student looking for a PG, a family searching for a flat or an owner with a room to rent, our aim is to make it simpler and more transparent.</p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="img-zoom aspect-[4/5] bg-stone"><img src={imgSrc('1600585154340-be6161a56a0c', 900, 1125)} alt="Contemporary home interior" loading="lazy" className="h-full w-full object-cover" /></div>
        </Reveal>
      </section>
      <section className="bg-stone">
        <div className="container-x py-16 md:py-24">
          <p className="eyebrow">What guides us</p>
          <h2 className="mt-4 text-4xl text-forest">Our principles</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, t, d }, i) => (
              <Reveal key={t} delay={i * 0.07}><div className="h-full border border-line bg-ivory p-7"><Icon size={26} strokeWidth={1.4} className="text-gold-deep" /><h3 className="mt-4 text-xl text-forest">{t}</h3><p className="mt-2 text-sm leading-relaxed text-muted">{d}</p></div></Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="container-x py-16 text-center md:py-20">
        <h2 className="mx-auto max-w-2xl text-3xl text-forest md:text-4xl">Looking for a stay, or have one to rent out?</h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <LinkButton to="/properties" size="lg">Browse Listings</LinkButton>
          <LinkButton to="/sell-your-property" variant="outline" size="lg">List Your Property</LinkButton>
        </div>
      </section>
    </>
  )
}
