// Sample listings so the site is browsable out of the box. All are flagged `demo: true`.
// Real listings come from owners (status "pending" -> admin approves -> published).
import { slugify } from '../utils/format.js'

const OWNERS = [
  'Rakesh Sharma', 'Anita Gupta', 'Mahesh Agarwal', 'Sunita Meena', 'Vikram Singh Shekhawat',
  'Pooja Jain', 'Deepak Saini', 'Kavita Rathore', 'Imran Khan', 'Neha Bansal',
]

const AMENITIES = {
  flat: ['Lift', 'Power backup', 'Covered parking', '24x7 water', 'CCTV security', 'Modular kitchen', 'Balcony'],
  'independent-house': ['Car parking', 'Garden', 'Terrace', '24x7 water', 'Power backup', 'Gated colony', 'Servant room'],
  'commercial-office': ['Power backup', 'Lift', 'Reception area', 'Pantry', 'Parking', 'Air conditioning', 'CCTV security'],
  'sharing-room': ['Wi-Fi', 'Meals included', 'Laundry', 'RO water', 'Housekeeping', 'CCTV security', 'Power backup'],
}

let n = 0
function mk(category, title, locality, rent, o = {}) {
  n += 1
  const id = `gk-${String(n).padStart(3, '0')}`
  const pool = AMENITIES[category]
  const take = o.amenities || pool.filter((_, i) => (i + n) % 3 !== 0).slice(0, 6)
  return {
    id,
    slug: `${slugify(title)}-${slugify(locality)}`,
    title,
    category,
    locality,
    address: o.address || `${o.street || 'Main road'}, ${locality}, Jaipur`,
    rent,
    deposit: o.deposit ?? rent * (category === 'sharing-room' ? 1 : 2),
    maintenance: o.maintenance ?? (category === 'sharing-room' ? 0 : Math.round(rent * 0.04 / 100) * 100),
    bhk: o.bhk ?? null,
    area: o.area ?? null,
    bathrooms: o.bathrooms ?? (category === 'commercial-office' ? 1 : o.bhk || 1),
    floor: o.floor || '',
    furnishing: o.furnishing || 'semi',
    availableFrom: o.availableFrom || 'Immediately',
    tenants: o.tenants || (category === 'sharing-room' ? 'Students and working professionals' : 'Family or bachelors'),
    amenities: take,
    description: o.description || '',
    ownerName: OWNERS[n % OWNERS.length],
    ownerPhone: `98${String(29000000 + n * 137913).slice(0, 8)}`,
    verified: o.verified ?? n % 4 !== 0,
    featured: !!o.featured,
    listedAt: new Date(Date.UTC(2026, 9, 2 + ((n * 3) % 40))).toISOString(),
    status: 'approved',
    images: [],
    demo: true,
  }
}

export const seedProperties = [
  // ---- Flats
  mk('flat', 'Sunlit 2 BHK near Gaurav Tower', 'Malviya Nagar', 23500, { bhk: 2, area: 1050, floor: '3rd of 5', furnishing: 'semi', featured: true, street: 'Gandhi Path', description: 'Bright east-facing flat in a well-kept society, a short walk from the market and the metro station. Wooden wardrobes, modular kitchen and a large balcony.' }),
  mk('flat', '3 BHK Society Flat with Parking', 'Vaishali Nagar', 31000, { bhk: 3, area: 1450, floor: '2nd of 4', furnishing: 'semi', featured: true, street: 'Amrapali Circle', description: 'Spacious three-bedroom family flat with two covered parking slots, round-the-clock security and a small play area for kids.' }),
  mk('flat', 'Modern 1 BHK for Professionals', 'Mansarovar', 14500, { bhk: 1, area: 620, floor: '4th of 6', furnishing: 'furnished', street: 'Sector 5', description: 'Compact fully furnished 1 BHK with AC, fridge and washing machine. Ideal for a single professional or a couple.' }),
  mk('flat', 'Park-Facing 2 BHK Apartment', 'Jagatpura', 21000, { bhk: 2, area: 980, floor: '1st of 4', furnishing: 'semi', street: 'Near Mahal Road', description: 'Quiet apartment overlooking a green park. Lift, power backup and a covered parking space are included.' }),
  mk('flat', 'Fully Furnished 2 BHK, Prime Location', 'C-Scheme', 38000, { bhk: 2, area: 1200, floor: '5th of 7', furnishing: 'furnished', verified: true, street: 'Ashok Marg', description: 'Premium furnished apartment in the heart of C-Scheme with designer interiors, split ACs in all rooms and a dedicated parking slot.' }),
  mk('flat', 'Budget 1 BHK Near Metro', 'Sodala', 11500, { bhk: 1, area: 540, floor: '2nd of 3', furnishing: 'unfurnished', street: 'Shiv Marg', description: 'Simple, airy 1 BHK within walking distance of the metro. Good for bachelors, small families and students.' }),
  mk('flat', 'Spacious 3 BHK on Tonk Road', 'Tonk Road', 27500, { bhk: 3, area: 1380, floor: '3rd of 5', furnishing: 'semi', street: 'Durgapura', description: 'Large three-bedroom flat with two balconies, close to colleges and hospitals. Immediate possession.' }),
  mk('flat', 'Top-Floor 2 BHK with Private Terrace', 'Bani Park', 19500, { bhk: 2, area: 900, floor: 'Top of 3', furnishing: 'semi', verified: false, street: 'Near Nehru Bazaar', description: 'Top-floor home with a private terrace for evenings and festivals. Peaceful lane with easy auto and bus access.' }),

  // ---- Independent houses
  mk('independent-house', 'Independent 3 BHK Villa with Garden', 'Vaishali Nagar', 48000, { bhk: 3, area: 2200, floor: 'Ground + 1', furnishing: 'semi', featured: true, street: 'Shanti Path', description: 'Standalone villa with a front lawn, two-car porch and a terrace. Quiet street yet five minutes from the main market.' }),
  mk('independent-house', 'Ground-Floor Portion, 2 BHK', 'Mansarovar', 18000, { bhk: 2, area: 1000, floor: 'Ground', furnishing: 'unfurnished', street: 'Sector 8', description: 'Independent ground-floor portion with its own entrance and parking. Water storage and power backup available.' }),
  mk('independent-house', 'Duplex 4 BHK House', 'Jagatpura', 55000, { bhk: 4, area: 2800, floor: 'Duplex', furnishing: 'furnished', street: 'Gated township', description: 'Large duplex in a gated community with a clubhouse. Four bedrooms, a study and a spacious drawing room.' }),
  mk('independent-house', 'Corner Kothi in Gated Colony', 'C-Scheme', 85000, { bhk: 5, area: 3600, floor: 'Ground + 2', furnishing: 'furnished', verified: true, street: 'Sardar Patel Marg', description: 'Premium corner kothi with a landscaped garden, servant quarters and parking for four vehicles.' }),
  mk('independent-house', 'Two-Floor Family Home', 'Pratap Nagar', 26000, { bhk: 3, area: 1700, floor: 'Ground + 1', furnishing: 'semi', street: 'Sector 14', description: 'Well-maintained family home with a separate kitchen on each floor and a roof terrace.' }),
  mk('independent-house', 'Compact 2 BHK House with Parking', 'Jhotwara', 15500, { bhk: 2, area: 850, floor: 'Ground', furnishing: 'unfurnished', verified: false, street: 'Near Jhotwara Road', description: 'Affordable independent house with bike and car parking. Suitable for a small family.' }),

  // ---- Commercial offices
  mk('commercial-office', 'Ready Office, 600 sq ft', 'C-Scheme', 42000, { area: 600, floor: '2nd of 5', furnishing: 'furnished', verified: true, featured: true, street: 'Bhagwan Das Road', tenants: 'Companies and consultants', description: 'Plug-and-play office with workstations, a cabin, conference corner and pantry. Reception and power backup included.' }),
  mk('commercial-office', 'Co-working Floor, 24 Seats', 'Malviya Nagar', 70000, { area: 1800, floor: '1st of 4', furnishing: 'furnished', street: 'Jawahar Circle', tenants: 'Startups and agencies', description: 'Full floor set up for a team of 24 with two meeting rooms, high-speed internet cabling and a break-out zone.' }),
  mk('commercial-office', 'Shop-cum-Office on Main Road', 'Tonk Road', 30000, { area: 750, floor: 'Ground', furnishing: 'unfurnished', street: 'Near Gopalpura Bypass', tenants: 'Retail and service businesses', description: 'High-visibility frontage on a busy road with a mezzanine for storage or a small office.' }),
  mk('commercial-office', 'Startup Cabin Space', 'Vaishali Nagar', 18000, { area: 380, floor: '3rd of 4', furnishing: 'semi', street: 'Gopalbari', tenants: 'Freelancers and small teams', description: 'Two-cabin office suitable for a small team. Shared washroom and pantry on the floor.' }),
  mk('commercial-office', 'Corporate Floor, 1500 sq ft', 'Jagatpura', 95000, { area: 1500, floor: '6th of 8', furnishing: 'semi', street: 'Business park', tenants: 'IT and corporate offices', description: 'Bright corporate floor with glass partitions, central AC and dedicated parking in a business park.' }),
  mk('commercial-office', 'Small Clinic Space', 'Mansarovar', 22000, { area: 450, floor: 'Ground', furnishing: 'semi', street: 'Sector 3', tenants: 'Doctors and clinics', description: 'Ground-floor unit suited to a clinic with a waiting area, consultation room and washroom.' }),

  // ---- Sharing rooms
  mk('sharing-room', 'Boys Sharing Room, Meals Included', 'Mansarovar', 6500, { furnishing: 'furnished', tenants: 'Boys only', street: 'Near Metro Station', description: 'Double-sharing room with two meals, Wi-Fi and daily housekeeping. Walkable to the metro and local market.' }),
  mk('sharing-room', 'Girls PG, Double Sharing', 'Vaishali Nagar', 7800, { furnishing: 'furnished', tenants: 'Girls only', street: 'Near Central Spine', description: 'Secure PG with a lady warden, CCTV, home-style meals and a study area.' }),
  mk('sharing-room', 'Triple Sharing near Coaching Hub', 'Raja Park', 5200, { furnishing: 'furnished', tenants: 'Students', street: 'Raja Park Main Market', description: 'Budget triple-sharing beds with study tables and Wi-Fi, a short walk from coaching institutes.' }),
  mk('sharing-room', 'Co-living Bed in AC Room', 'Malviya Nagar', 9500, { furnishing: 'furnished', tenants: 'Working professionals', street: 'Sector 2', description: 'Air-conditioned co-living space with power backup, laundry and a common lounge.' }),
  mk('sharing-room', 'Student Room near University', 'Jhotwara', 5800, { furnishing: 'furnished', tenants: 'Students', verified: false, street: 'Near Rajasthan University Road', description: 'Clean double-sharing room with mess facility and a quiet study environment.' }),
  mk('sharing-room', 'Shared Flat for Professionals', 'Jagatpura', 8200, { furnishing: 'furnished', tenants: 'Working professionals', street: 'Near Jagatpura Railway Station', description: 'Room in a shared 3 BHK flat with a common kitchen, washing machine and fast internet.' }),
  mk('sharing-room', 'Budget Sharing Bed', 'Sodala', 4500, { furnishing: 'semi', tenants: 'Boys only', verified: false, street: 'Shiv Colony', description: 'Simple and affordable bed in a shared room with basic amenities and RO water.' }),
  mk('sharing-room', 'Premium Twin Sharing', 'C-Scheme', 12000, { furnishing: 'furnished', tenants: 'Working professionals', verified: true, street: 'Prithviraj Road', description: 'Twin-sharing room with attached bath, AC, daily cleaning and breakfast included.' }),
]
