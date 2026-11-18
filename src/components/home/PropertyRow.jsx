import { useAsync } from '../../hooks/useAsync'
import { getProperties } from '../../services/api'
import { LinkButton } from '../ui/Button'
import { SectionHead } from '../ui/Bits'
import { EmptyState, ErrorState, GridSkeleton } from '../ui/States'
import PropertyCard from '../property/PropertyCard'

// mode: 'featured' | 'recent'
export default function PropertyRow({ mode, eyebrow, title, intro, bg = '' }) {
  const { data, loading, error, reload } = useAsync(async () => {
    const all = await getProperties({ filters: { q: '', segment: '', category: '', locality: '', bhk: '', budget: 'any', minPrice: '', maxPrice: '', area: '', furnishing: '', status: '', sharing: '', food: '', gender: '', verified: '', sort: 'latest' } })
    return mode === 'featured' ? all.filter((p) => p.featured).slice(0, 6) : all.filter((p) => !p.featured).slice(0, 6)
  }, [mode])

  return (
    <section className={bg}>
      <div className="container-x py-20 md:py-28">
        <SectionHead
          eyebrow={eyebrow} title={title} intro={intro}
          action={<LinkButton to="/properties" variant="outline" size="sm">View all listings</LinkButton>}
        />
        {error ? <ErrorState onRetry={reload} /> : loading ? <GridSkeleton count={3} /> : data.length === 0 ? (
          <EmptyState title="No properties yet" message="New listings will appear here soon." />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((p) => <PropertyCard key={p.id} property={p} />)}
          </div>
        )}
      </div>
    </section>
  )
}
