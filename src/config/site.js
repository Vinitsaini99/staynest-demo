// Site-wide settings. Replace the placeholder contact details before going live.
export const SITE = {
  name: 'GharKhoj Kota',
  short: 'GharKhoj',
  url: (import.meta.env.VITE_SITE_URL || 'https://gharkhoj-kota.vercel.app').replace(/\/$/, ''),
  tagline: 'Verified rentals in Kota: flats, independent houses, offices and sharing rooms with direct owner contact.',
  city: 'Kota',
  state: 'Rajasthan',
  phone: '+91 90000 00000',
  phoneTel: '+919000000000',
  whatsapp: '919000000000',
  email: 'hello@gharkhoj.example',
  address: 'Kota, Rajasthan, India',
  hours: '9:00 AM to 8:00 PM, all days',
}

export const waLink = (text = 'Hi, I found your listing on GharKhoj Kota.') =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`

export const ownerWaLink = (phone, text) => {
  const digits = String(phone || '').replace(/\D/g, '')
  const num = digits.length === 10 ? `91${digits}` : digits
  return `https://wa.me/${num}?text=${encodeURIComponent(text)}`
}

// Demo-only admin account (the app has no real backend yet). Change before launch.
export const DEMO_ADMIN = { name: 'Site Admin', email: 'admin@gharkhoj.demo', password: 'Admin@123' }
