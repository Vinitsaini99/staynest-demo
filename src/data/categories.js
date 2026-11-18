export const unsplash = (id, w = 800, h) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}${h ? `&h=${h}` : ''}&q=75`

// segment "pg"   -> paying guest & hostels (priced per bed / month)
// segment "rent" -> rooms, flats, houses & commercial spaces (priced per month)
export const categories = [
  { slug: 'pg-boys', label: 'Boys PG', short: 'Boys PG', segment: 'pg', path: '/boys-pg', image: '1555854877-bab0e564b8d5', blurb: 'Single, double & triple sharing' },
  { slug: 'pg-girls', label: 'Girls PG', short: 'Girls PG', segment: 'pg', path: '/girls-pg', image: '1595526114035-0d45ed16cfbf', blurb: 'Safe, comfortable stays' },
  { slug: 'hostel', label: 'Hostels & Co-living', short: 'Hostels', segment: 'pg', path: '/hostels', image: '1536376072261-38c75010e6c9', blurb: 'Budget beds near coaching' },
  { slug: 'rooms', label: 'Rooms for Rent', short: 'Rooms', segment: 'rent', path: '/rooms-for-rent', image: '1512918728675-ed5a9ecdebfd', blurb: 'Single rooms & 1 RK' },
  { slug: 'flats', label: 'Flats for Rent', short: 'Flats', segment: 'rent', path: '/flats-for-rent', image: '1545324418-cc1a3fa10c00', blurb: '1, 2 & 3 BHK flats' },
  { slug: 'houses', label: 'Houses for Rent', short: 'Houses', segment: 'rent', path: '/houses-for-rent', image: '1570129477492-45c003edd2be', blurb: 'Independent family homes' },
  { slug: 'commercial', label: 'Shops & Offices', short: 'Commercial', segment: 'rent', path: '/shops-offices-for-rent', image: '1497366811353-6870744d04b2', blurb: 'Affordable business space' },
]

export const SEGMENTS = [
  { id: 'pg', label: 'PG & Hostels' },
  { id: 'rent', label: 'Rooms, Flats & Houses' },
]

export const getCategory = (slug) => categories.find((c) => c.slug === slug)

export const BHK_CATEGORIES = ['flats', 'houses']
export const PG_CATEGORIES = ['pg-boys', 'pg-girls', 'hostel']

export const FURNISHING = ['Furnished', 'Semi-Furnished', 'Unfurnished']
export const STATUSES = ['Available Now', 'Available Soon']
export const SHARING = ['Single', 'Double', 'Triple']

// Monthly rent, in rupees
export const BUDGETS = [
  { id: 'any', label: 'Any budget', min: null, max: null },
  { id: 'u4', label: 'Under ₹4,000', min: null, max: 4000 },
  { id: '4-7', label: '₹4,000 – 7,000', min: 4000, max: 7000 },
  { id: '7-12', label: '₹7,000 – 12,000', min: 7000, max: 12000 },
  { id: '12-20', label: '₹12,000 – 20,000', min: 12000, max: 20000 },
  { id: 'o20', label: 'Above ₹20,000', min: 20000, max: null },
]

export const PRICE_STEPS = [
  { value: 3000, label: '₹3,000' },
  { value: 5000, label: '₹5,000' },
  { value: 7000, label: '₹7,000' },
  { value: 10000, label: '₹10,000' },
  { value: 15000, label: '₹15,000' },
  { value: 20000, label: '₹20,000' },
  { value: 30000, label: '₹30,000' },
]

export const AREA_RANGES = [
  { id: '0-150', label: 'Up to 150 sq. ft.', min: 0, max: 150 },
  { id: '150-500', label: '150 – 500 sq. ft.', min: 150, max: 500 },
  { id: '500-1000', label: '500 – 1,000 sq. ft.', min: 500, max: 1000 },
  { id: '1000-1500', label: '1,000 – 1,500 sq. ft.', min: 1000, max: 1500 },
  { id: '1500+', label: '1,500+ sq. ft.', min: 1500, max: null },
]

export const AMENITY_LIST = [
  'Wi-Fi', 'Meals Included', 'Power Backup', 'Attached Bathroom', 'Geyser', 'AC', 'Laundry', 'Housekeeping',
  'Study Table', 'CCTV Surveillance', 'Lift', 'Covered Parking', 'Water Purifier', 'Warden / Caretaker',
]

// Listing pages (also drive routing + SEO)
export const listingPages = [
  {
    path: '/properties', title: 'PG & Rental Properties in Kota, Rajasthan', h1: 'PG & Rentals in Kota',
    eyebrow: 'All listings', crumb: 'All Listings',
    description: 'Find affordable PGs, hostels, rooms, flats and houses for rent in Kota, Rajasthan. Filter by locality, monthly budget, sharing and more.',
    scope: {},
  },
  {
    path: '/pg-hostels', title: 'PG & Hostels in Kota – Affordable Stays', h1: 'PG & Hostels in Kota',
    eyebrow: 'PG & Hostels', crumb: 'PG & Hostels',
    description: 'Boys PG, girls PG and hostels in Kota with single, double and triple sharing at pocket-friendly monthly rents.',
    scope: { segment: 'pg' },
  },
  {
    path: '/boys-pg', title: 'Boys PG in Kota – Affordable Rooms', h1: 'Boys PG in Kota',
    eyebrow: 'PG & Hostels', crumb: 'Boys PG',
    description: 'Find boys PG accommodation in Kota with food, Wi-Fi and study-friendly rooms at affordable monthly rents.',
    scope: { categories: ['pg-boys'] },
  },
  {
    path: '/girls-pg', title: 'Girls PG in Kota – Safe & Affordable', h1: 'Girls PG in Kota',
    eyebrow: 'PG & Hostels', crumb: 'Girls PG',
    description: 'Safe and comfortable girls PG options in Kota with meals, Wi-Fi and security at affordable monthly rents.',
    scope: { categories: ['pg-girls'] },
  },
  {
    path: '/hostels', title: 'Hostels & Co-living in Kota', h1: 'Hostels & Co-living in Kota',
    eyebrow: 'PG & Hostels', crumb: 'Hostels',
    description: 'Budget hostels and co-living spaces in Kota, close to coaching institutes and markets.',
    scope: { categories: ['hostel'] },
  },
  {
    path: '/rent', title: 'Rooms, Flats & Houses for Rent in Kota', h1: 'Rooms, Flats & Houses for Rent',
    eyebrow: 'Rent', crumb: 'Rent',
    description: 'Rooms, flats, houses and shops for rent in Kota, Rajasthan at affordable monthly rents.',
    scope: { segment: 'rent' },
  },
  {
    path: '/rooms-for-rent', title: 'Rooms for Rent in Kota', h1: 'Rooms for Rent in Kota',
    eyebrow: 'Rent', crumb: 'Rooms',
    description: 'Single rooms and 1 RK for rent in Kota at budget-friendly monthly rents.',
    scope: { categories: ['rooms'] },
  },
  {
    path: '/flats-for-rent', title: 'Flats for Rent in Kota', h1: 'Flats for Rent in Kota',
    eyebrow: 'Rent', crumb: 'Flats',
    description: '1 BHK, 2 BHK and 3 BHK flats for rent in Kota, Rajasthan across popular localities.',
    scope: { categories: ['flats'] },
  },
  {
    path: '/houses-for-rent', title: 'Houses for Rent in Kota', h1: 'Houses for Rent in Kota',
    eyebrow: 'Rent', crumb: 'Houses',
    description: 'Independent houses for rent in Kota, Rajasthan, suited to families and groups.',
    scope: { categories: ['houses'] },
  },
  {
    path: '/shops-offices-for-rent', title: 'Shops & Offices for Rent in Kota', h1: 'Shops & Offices for Rent in Kota',
    eyebrow: 'Commercial', crumb: 'Shops & Offices',
    description: 'Affordable shops and office spaces for rent in Kota, Rajasthan.',
    scope: { categories: ['commercial'] },
  },
]
