import { Heart } from 'lucide-react'
import PropertyCard from '../../components/property/PropertyCard'
import EmptyState from '../../components/common/EmptyState'
import { useApp } from '../../context/AppContext'
import { Link } from 'react-router-dom'

export default function StudentFavourites() {
  const { properties, favourites } = useApp()
  const list = properties.filter((p) => favourites.includes(p.id))

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 pb-24">
      <h1 className="text-2xl font-extrabold">Wishlist</h1>
      <p className="text-sm text-muted">{list.length} saved properties</p>
      {list.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            icon={Heart}
            title="No favourites yet"
            description="Tap the heart on any property card to save it here."
            action={<Link to="/student/search" className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white">Explore stays</Link>}
          />
        </div>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => <PropertyCard key={p.id} property={p} />)}
        </div>
      )}
    </div>
  )
}
