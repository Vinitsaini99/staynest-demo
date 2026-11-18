import { SITE } from '../config/site'
import { useSeo } from '../hooks/useSeo'
import Hero from '../components/home/Hero'
import Categories from '../components/home/Categories'
import PropertyRow from '../components/home/PropertyRow'
import LocationsGrid from '../components/home/LocationsGrid'
import { WhyChoose, Showcase, SellSection, HowItWorks, Testimonials, InsightsRow, CtaBand } from '../components/home/Sections'

export default function Home() {
  useSeo({
    title: 'PG & Rooms for Rent in Kota, Rajasthan | Kota Ki Property',
    description: 'Find affordable PGs, hostels, rooms, flats and houses for rent in Kota, Rajasthan. Browse listings across Talwandi, Kunhari, Vigyan Nagar, Landmark City and more.',
    path: '/',
    jsonLd: {
      '@context': 'https://schema.org', '@type': 'WebSite', name: SITE.name, url: SITE.url,
      potentialAction: { '@type': 'SearchAction', target: `${SITE.url}/properties?q={search_term_string}`, 'query-input': 'required name=search_term_string' },
    },
  })
  return (
    <>
      <Hero />
      <Categories />
      <PropertyRow mode="featured" eyebrow="Featured listings" title="Handpicked PGs & rentals" intro="Standout stays across Kota, priced for real budgets." bg="bg-white border-y border-line" />
      <LocationsGrid />
      <PropertyRow mode="recent" eyebrow="Recently listed" title="Recently listed" intro="The latest PGs and rentals added to Kota Ki Property." />
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
