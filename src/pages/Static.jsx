import { Link } from 'react-router-dom'
import { useSeo } from '../hooks/useSeo'
import { SITE } from '../config/site'
import Button from '../components/ui/Button'

function Page({ title, path, description, children }) {
  useSeo({ title, path, description })
  return (
    <div className="container-x max-w-3xl py-12">
      <h1 className="text-4xl font-extrabold">{title}</h1>
      <div className="prose-gk mt-6">{children}</div>
    </div>
  )
}

export function About() {
  return (
    <Page title="About GharKhoj Jaipur" path="/about" description="GharKhoj Jaipur helps renters and owners connect directly for flats, houses, offices and sharing rooms in Jaipur.">
      <p>{SITE.name} is a rental portal built for Jaipur. We help tenants find flats, independent houses, commercial offices and sharing rooms, and help owners reach serious renters without paying a broker.</p>
      <h2>How we work</h2>
      <ul>
        <li>Owners list properties for free from their own dashboard.</li>
        <li>Every new listing is reviewed by our team before it appears on the site.</li>
        <li>Tenants contact owners directly by call, WhatsApp or the enquiry form.</li>
      </ul>
      <h2>Our promise</h2>
      <p>Clear rent, deposit and maintenance details on every listing, plain-language safety tips, and a team you can actually reach.</p>
      <div className="mt-6 flex gap-3"><Button to="/rentals">Browse rentals</Button><Button to="/contact" variant="outline">Contact us</Button></div>
    </Page>
  )
}

export function Privacy() {
  return (
    <Page title="Privacy Policy" path="/privacy" description="How GharKhoj Jaipur handles your personal information.">
      <p>This policy explains what information {SITE.name} collects and how it is used. It is a template; have it reviewed before launch.</p>
      <h2>Information we collect</h2>
      <ul>
        <li>Account details you provide: name, email, mobile number.</li>
        <li>Listing details and photos submitted by owners.</li>
        <li>Enquiries and messages you send through the site.</li>
      </ul>
      <h2>How we use it</h2>
      <p>To operate your account, show listings, pass your enquiries to owners and respond to your messages. We do not sell personal information.</p>
      <h2>Your choices</h2>
      <p>You can update your profile at any time, and contact us at {SITE.email} to request deletion of your data.</p>
    </Page>
  )
}

export function Terms() {
  return (
    <Page title="Terms of Use" path="/terms" description="The terms for using GharKhoj Jaipur.">
      <p>By using {SITE.name} you agree to these terms. This is a template; have it reviewed before launch.</p>
      <h2>Listings</h2>
      <p>Owners are responsible for the accuracy of their listings. We may approve, reject or remove listings at our discretion.</p>
      <h2>Renting safely</h2>
      <p>We are a listing platform, not a party to any rental agreement. Visit the property, verify the owner and never pay a deposit for a home you have not seen.</p>
      <h2>Acceptable use</h2>
      <p>Do not post false, misleading or unlawful content, or misuse contact details found on the site.</p>
      <p className="text-sm">Questions? <Link to="/contact" className="font-bold text-brand">Contact us</Link>.</p>
    </Page>
  )
}

export function NotFound() {
  useSeo({ title: 'Page not found', noindex: true })
  return (
    <div className="container-x py-24 text-center">
      <p className="font-display text-7xl font-extrabold text-brand">404</p>
      <h1 className="mt-2 text-2xl font-extrabold">We could not find that page</h1>
      <p className="mt-2 text-muted">The link may be old, or the property has been rented out.</p>
      <div className="mt-6 flex justify-center gap-3"><Button to="/">Go home</Button><Button to="/rentals" variant="outline">Browse rentals</Button></div>
    </div>
  )
}
