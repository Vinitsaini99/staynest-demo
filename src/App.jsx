import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import { Skeleton } from './components/ui/States'

const lazyNamed = (loader, name) => lazy(() => loader().then((m) => ({ default: m[name] })))

const ListingPage = lazyNamed(() => import('./pages/ListingPage'), 'ListingPage')
const LocationPage = lazyNamed(() => import('./pages/ListingPage'), 'LocationPage')
const LocationsIndex = lazyNamed(() => import('./pages/ListingPage'), 'LocationsIndex')
const PropertyDetail = lazy(() => import('./pages/PropertyDetail'))
const Sell = lazy(() => import('./pages/Sell'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Auth = lazy(() => import('./pages/Auth'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const InsightsIndex = lazyNamed(() => import('./pages/Insights'), 'InsightsIndex')
const Article = lazyNamed(() => import('./pages/Insights'), 'Article')
const Privacy = lazyNamed(() => import('./pages/Legal'), 'Privacy')
const Terms = lazyNamed(() => import('./pages/Legal'), 'Terms')
const NotFound = lazy(() => import('./pages/NotFound'))

const listingPaths = ['/buy-property', '/residential', '/commercial', '/flats-apartments', '/houses-villas', '/residential-plots', '/commercial-shops-offices', '/plots-and-land']

const Fallback = () => (
  <div className="container-x py-16"><Skeleton className="h-10 w-1/3" /><Skeleton className="mt-6 h-64 w-full" /></div>
)

export default function App() {
  return (
    <Suspense fallback={<Fallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          {listingPaths.map((p) => <Route key={p} path={p} element={<ListingPage path={p} />} />)}
          <Route path="/locations" element={<LocationsIndex />} />
          <Route path="/locations/:slug" element={<LocationPage />} />
          <Route path="/property/:slug" element={<PropertyDetail />} />
          <Route path="/sell-your-property" element={<Sell />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/login" element={<Auth mode="login" />} />
          <Route path="/register" element={<Auth mode="register" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/insights" element={<InsightsIndex />} />
          <Route path="/insights/:slug" element={<Article />} />
          <Route path="/privacy-policy" element={<Privacy />} />
          <Route path="/terms-and-conditions" element={<Terms />} />
          <Route path="/properties" element={<Navigate to="/buy-property" replace />} />
          <Route path="/sell" element={<Navigate to="/sell-your-property" replace />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
