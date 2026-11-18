// Central brand + contact configuration.
// NOTE: phone / WhatsApp / email / social URLs are placeholders — replace with real business details before launch.
export const SITE = {
  name: 'Kota Ki Property',
  tagline: 'Your Trusted Destination for Properties in Kota.',
  url: (import.meta.env && import.meta.env.VITE_SITE_URL) || 'https://kotakiproperty.com',
  city: 'Kota',
  state: 'Rajasthan',
  phone: '+91 99999 99999',
  phoneRaw: '919999999999',
  whatsapp: '919999999999',
  email: 'hello@kotakiproperty.com',
  address: 'Kota, Rajasthan, India',
  hours: 'Mon – Sat, 10:00 AM – 7:00 PM',
  social: {
    facebook: 'https://www.facebook.com/',
    instagram: 'https://www.instagram.com/',
    youtube: 'https://www.youtube.com/',
    linkedin: 'https://www.linkedin.com/',
  },
}

export const NAV = [
  { label: 'Home', to: '/' },
  {
    label: 'PG & Hostels',
    to: '/pg-hostels',
    children: [
      { label: 'Boys PG', to: '/boys-pg' },
      { label: 'Girls PG', to: '/girls-pg' },
      { label: 'Hostels & Co-living', to: '/hostels' },
    ],
  },
  {
    label: 'Rent',
    to: '/rent',
    children: [
      { label: 'Rooms', to: '/rooms-for-rent' },
      { label: 'Flats', to: '/flats-for-rent' },
      { label: 'Houses', to: '/houses-for-rent' },
      { label: 'Shops & Offices', to: '/shops-offices-for-rent' },
    ],
  },
  { label: 'All Listings', to: '/properties' },
  { label: 'Locations', to: '/locations' },
  { label: 'About Us', to: '/about-us' },
  { label: 'Contact Us', to: '/contact-us' },
]