import { SITE } from '../config/site'
import { useSeo } from '../hooks/useSeo'
import Hero from '../components/home/Hero'
import Categories from '../components/home/Categories'
import PropertyRow from '../components/home/PropertyRow'
import LocationsGrid from '../components/home/LocationsGrid'
import { WhyChoose, Showcase, SellSection, HowItWorks, Testimonials, InsightsRow, CtaBand } from '../components/home/Sections'

export default function Home() {
  useSeo({
    title: 'Property for Sale in Kota, Rajasthan | Kota Ki Property',
    description: 'Buy and sell flats, houses, villas, plots and commercial property in Kota, Rajasthan. Browse verified listings across Talwandi, Kunhari, Vigyan Nagar, Landmark City and more.',
    path: '/',
    jsonLd: {
      '@context': 'https://schema.org', '@type': 'WebSite', name: SITE.name, url: SITE.url,
      potentialAction: { '@type': 'SearchAction', target: `${SITE.url}/buy-property?q={search_term_string}`, 'query-input': 'required name=search_term_string' },
    },
  })
  return (
    <>
      <Hero />
      <Categories />
      <PropertyRow mode="featured" eyebrow="Featured properties" title="Handpicked residences & spaces" intro="A curated selection of standout listings across Kota." bg="bg-white border-y border-line" />
      <LocationsGrid />
      <PropertyRow mode="recent" eyebrow="Recently listed" title="Fresh on the market" intro="The latest properties added to Kota Ki Property." />
      <WhyChoose />
      <Showcase />
      <SellSection />
      <HowItWorks />
      <Testimonials />
      <InsightsRow />
      <CtaBand />
    </>
  )
}
