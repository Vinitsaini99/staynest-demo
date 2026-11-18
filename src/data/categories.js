export const unsplash = (id, w = 800, h) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}${h ? `&h=${h}` : ''}&q=75`

export const categories = [
  { slug: 'flats', label: 'Apartments & Flats', short: 'Flats', segment: 'residential', path: '/flats-apartments', image: '1545324418-cc1a3fa10c00', blurb: '1, 2, 3 & 4 BHK homes' },
  { slug: 'houses', label: 'Independent Houses', short: 'Houses', segment: 'residential', path: '/houses-villas?category=houses', image: '1564013799919-ab600027ffc6', blurb: 'Family homes with space' },
  { slug: 'villas', label: 'Luxury Villas', short: 'Villas', segment: 'residential', path: '/houses-villas?category=villas', image: '1613490493576-7fde63acd811', blurb: 'Premium private residences' },
  { slug: 'plots', label: 'Residential Plots', short: 'Plots', segment: 'residential', path: '/residential-plots', image: '1500382017468-9049fed747ef', blurb: 'Build your own home' },
  { slug: 'shops', label: 'Commercial Shops', short: 'Shops', segment: 'commercial', path: '/commercial-shops-offices?category=shops', image: '1441986300917-64674bd600d8', blurb: 'High-footfall retail' },
  { slug: 'offices', label: 'Office Spaces', short: 'Offices', segment: 'commercial', path: '/commercial-shops-offices?category=offices', image: '1497366216548-37526070297c', blurb: 'Workspaces for business' },
  { slug: 'commercial-land', label: 'Commercial Land', short: 'Commercial Land', segment: 'commercial', path: '/plots-and-land?category=commercial-land', image: '1500076656116-558758c991c1', blurb: 'Investment-ready land' },
]

export const getCategory = (slug) => categories.find((c) => c.slug === slug)

export const BHK_CATEGORIES = ['flats', 'houses', 'villas']

export const FURNISHING = ['Furnished', 'Semi-Furnished', 'Unfurnished']
export const STATUSES = ['Ready to Move', 'Under Construction']

export const BUDGETS = [
  { id: 'any', label: 'Any budget', min: null, max: null },
  { id: 'u25', label: 'Under ₹25 Lakh', min: null, max: 2500000 },
  { id: '25-50', label: '₹25 – 50 Lakh', min: 2500000, max: 5000000 },
  { id: '50-100', label: '₹50 Lakh – 1 Cr', min: 5000000, max: 10000000 },
  { id: '100-200', label: '₹1 – 2 Cr', min: 10000000, max: 20000000 },
  { id: 'o200', label: 'Above ₹2 Cr', min: 20000000, max: null },
]

export const PRICE_STEPS = [
  { value: 1000000, label: '₹10 Lakh' },
  { value: 2000000, label: '₹20 Lakh' },
  { value: 3000000, label: '₹30 Lakh' },
  { value: 5000000, label: '₹50 Lakh' },
  { value: 7500000, label: '₹75 Lakh' },
  { value: 10000000, label: '₹1 Cr' },
  { value: 20000000, label: '₹2 Cr' },
  { value: 50000000, label: '₹5 Cr' },
]

export const AREA_RANGES = [
  { id: '0-1000', label: 'Up to 1,000 sq. ft.', min: 0, max: 1000 },
  { id: '1000-1500', label: '1,000 – 1,500 sq. ft.', min: 1000, max: 1500 },
  { id: '1500-2500', label: '1,500 – 2,500 sq. ft.', min: 1500, max: 2500 },
  { id: '2500-5000', label: '2,500 – 5,000 sq. ft.', min: 2500, max: 5000 },
  { id: '5000+', label: '5,000+ sq. ft.', min: 5000, max: null },
]

export const AMENITY_LIST = [
  'Power Backup', 'Lift', 'Covered Parking', 'CCTV Surveillance', '24x7 Security', 'Water Supply',
  'Garden / Park', 'Gym', 'Clubhouse', 'Modular Kitchen', 'Vastu Compliant', 'Gated Community',
]

// Listing pages (also drive routing + SEO)
export const listingPages = [
  {
    path: '/buy-property', title: 'Property for Sale in Kota, Rajasthan', h1: 'Property for Sale in Kota',
    eyebrow: 'All listings', crumb: 'Buy Property',
    description: 'Browse verified flats, houses, villas, plots and commercial property for sale in Kota, Rajasthan. Filter by locality, budget, BHK and more.',
    scope: {},
  },
  {
    path: '/residential', title: 'Residential Properties for Sale in Kota', h1: 'Residential Properties in Kota',
    eyebrow: 'Residential', crumb: 'Residential',
    description: 'Flats, independent houses, villas and residential plots for sale in Kota, Rajasthan.',
    scope: { segment: 'residential' },
  },
  {
    path: '/commercial', title: 'Commercial Property for Sale in Kota', h1: 'Commercial Property in Kota',
    eyebrow: 'Commercial', crumb: 'Commercial',
    description: 'Shops, office spaces and commercial land for sale in Kota. Find investment-ready commercial property.',
    scope: { segment: 'commercial' },
  },
  {
    path: '/flats-apartments', title: 'Flats & Apartments for Sale in Kota', h1: 'Flats & Apartments for Sale in Kota',
    eyebrow: 'Residential', crumb: 'Flats & Apartments',
    description: 'Buy 1, 2, 3 and 4 BHK flats and apartments in Kota, Rajasthan across top localities.',
    scope: { categories: ['flats'] },
  },
  {
    path: '/houses-villas', title: 'Houses & Villas for Sale in Kota', h1: 'Houses & Villas for Sale in Kota',
    eyebrow: 'Residential', crumb: 'Houses & Villas',
    description: 'Independent houses and luxury villas for sale in Kota, Rajasthan.',
    scope: { categories: ['houses', 'villas'] },
  },
  {
    path: '/residential-plots', title: 'Residential Plots for Sale in Kota', h1: 'Residential Plots for Sale in Kota',
    eyebrow: 'Residential', crumb: 'Residential Plots',
    description: 'Residential plots in Kota, Rajasthan — build your dream home in a location of your choice.',
    scope: { categories: ['plots'] },
  },
  {
    path: '/commercial-shops-offices', title: 'Commercial Shops & Offices for Sale in Kota', h1: 'Shops & Offices for Sale in Kota',
    eyebrow: 'Commercial', crumb: 'Shops & Offices',
    description: 'Commercial shops and office spaces for sale in Kota, Rajasthan.',
    scope: { categories: ['shops', 'offices'] },
  },
  {
    path: '/plots-and-land', title: 'Plots & Land for Sale in Kota', h1: 'Plots & Land for Sale in Kota',
    eyebrow: 'Plots & Land', crumb: 'Plots & Land',
    description: 'Residential plots and commercial land for sale in Kota, Rajasthan.',
    scope: { categories: ['plots', 'commercial-land'] },
  },
]
