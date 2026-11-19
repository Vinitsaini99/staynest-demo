export const categories = [
  {
    slug: 'flat',
    label: 'Flats',
    single: 'Flat',
    blurb: '1, 2 and 3 BHK flats for families and working professionals.',
    hasBhk: true,
  },
  {
    slug: 'independent-house',
    label: 'Independent Houses',
    single: 'Independent house',
    blurb: 'Villas, kothis and floors with space, parking and privacy.',
    hasBhk: true,
  },
  {
    slug: 'commercial-office',
    label: 'Commercial Offices',
    single: 'Commercial office',
    blurb: 'Ready offices, co-working floors and shop-cum-office spaces.',
    hasBhk: false,
  },
  {
    slug: 'sharing-room',
    label: 'Sharing Rooms',
    single: 'Sharing room',
    blurb: 'Budget PG beds and co-living rooms for students and professionals.',
    hasBhk: false,
  },
]

export const categoryBySlug = Object.fromEntries(categories.map((c) => [c.slug, c]))

export const FURNISHING = [
  { value: 'furnished', label: 'Furnished' },
  { value: 'semi', label: 'Semi-furnished' },
  { value: 'unfurnished', label: 'Unfurnished' },
]

export const furnishingLabel = (v) => FURNISHING.find((f) => f.value === v)?.label || '—'
