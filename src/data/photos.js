// Photos (Unsplash, free to use) stored in /public/img. They are stock images used as visual
// placeholders; owner-uploaded photos always take priority over them.
export const HERO_SLIDES = [
  { src: '/img/hero-1.jpg', label: 'Independent houses', to: '/rentals?category=independent-house' },
  { src: '/img/hero-2.jpg', label: 'Flats and apartments', to: '/rentals?category=flat' },
  { src: '/img/hero-3.jpg', label: 'Furnished homes', to: '/rentals?furnishing=furnished' },
  { src: '/img/hero-4.jpg', label: 'Offices and shops', to: '/rentals?category=commercial-office' },
  { src: '/img/hero-5.jpg', label: 'Family villas', to: '/rentals?category=independent-house' },
]

const SETS = {
  flat: ['flat-1', 'flat-2', 'flat-3', 'flat-4', 'flat-5'],
  'independent-house': ['house-1', 'house-2', 'house-3', 'house-4', 'house-5'],
  'commercial-office': ['office-1', 'office-2', 'office-3'],
  'sharing-room': ['room-1', 'room-2', 'room-3'],
}

export const CATEGORY_COVER = {
  flat: '/img/flat-1.jpg',
  'independent-house': '/img/house-1.jpg',
  'commercial-office': '/img/office-1.jpg',
  'sharing-room': '/img/room-1.jpg',
}

const hash = (s = '') => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7)

// Owner photos if present, otherwise a stable set of stock photos for the category.
export function listingPhotos(p) {
  if (p.images?.length) return p.images
  const set = SETS[p.category] || SETS.flat
  const start = hash(p.id) % set.length
  return [0, 1, 2].map((i) => `/img/${set[(start + i) % set.length]}.jpg`)
}

export const hasOwnPhotos = (p) => !!p.images?.length
