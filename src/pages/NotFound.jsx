import { useSeo } from '../hooks/useSeo'
import { LinkButton } from '../components/ui/Button'

export default function NotFound() {
  useSeo({ title: 'Page not found', description: 'The page you are looking for could not be found.', noindex: true })
  return (
    <section className="container-x grid min-h-[60vh] place-items-center py-20 text-center">
      <div>
        <p className="font-display text-8xl text-gold">404</p>
        <h1 className="mt-4 text-3xl text-forest">This page has moved out</h1>
        <p className="mx-auto mt-3 max-w-md text-muted">The page you’re looking for doesn’t exist or may have been removed. Let’s get you back to Kota’s best properties.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <LinkButton to="/" variant="primary">Back to Home</LinkButton>
          <LinkButton to="/buy-property" variant="outline">Browse Properties</LinkButton>
        </div>
      </div>
    </section>
  )
}
