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
    address: o.address || `${o.street || 'Main road'}, ${locality}, Kota`,
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
  mk('flat', 'Sunlit 2 BHK near Coaching Hub', 'Talwandi', 14500, { bhk: 2, area: 1000, floor: '3rd of 5', furnishing: 'semi', featured: true, street: 'Near Talwandi Circle', description: 'Bright east-facing flat in a well-kept society, a short walk from the market and coaching institutes. Wooden wardrobes, modular kitchen and a large balcony.' }),
  mk('flat', '3 BHK Society Flat with Parking', 'Vigyan Nagar', 19500, { bhk: 3, area: 1400, floor: '2nd of 4', furnishing: 'semi', featured: true, street: 'Vigyan Nagar Main Road', description: 'Spacious three-bedroom family flat with two covered parking slots, round-the-clock security and a small play area for kids.' }),
  mk('flat', 'Modern 1 BHK for Professionals', 'Mahaveer Nagar', 8500, { bhk: 1, area: 600, floor: '4th of 6', furnishing: 'furnished', street: 'Mahaveer Nagar Extension', description: 'Compact fully furnished 1 BHK with AC, fridge and washing machine. Ideal for a single professional or a couple.' }),
  mk('flat', 'Park-Facing 2 BHK Apartment', 'Dadabari', 12500, { bhk: 2, area: 950, floor: '1st of 4', furnishing: 'semi', street: 'Near Dadabari Garden', description: 'Quiet apartment overlooking a green park. Lift, power backup and a covered parking space are included.' }),
  mk('flat', 'Fully Furnished 2 BHK, Prime Location', 'Gumanpura', 18000, { bhk: 2, area: 1150, floor: '5th of 7', furnishing: 'furnished', verified: true, street: 'Near Gumanpura Market', description: 'Premium furnished apartment with designer interiors, split ACs in all rooms and a dedicated parking slot.' }),
  mk('flat', 'Budget 1 BHK near Railway Station', 'Borkhera', 6500, { bhk: 1, area: 520, floor: '2nd of 3', furnishing: 'unfurnished', street: 'Borkhera Main Road', description: 'Simple, airy 1 BHK within easy reach of the railway station and bus stand. Good for bachelors, small families and students.' }),
  mk('flat', 'Spacious 3 BHK on Kunhadi Road', 'Kunhadi', 16500, { bhk: 3, area: 1350, floor: '3rd of 5', furnishing: 'semi', street: 'Kunhadi Road', description: 'Large three-bedroom flat with two balconies in a newly built apartment block. Immediate possession.' }),
  mk('flat', 'Top-Floor 2 BHK with Private Terrace', 'Jawahar Nagar', 11500, { bhk: 2, area: 880, floor: 'Top of 3', furnishing: 'semi', verified: false, street: 'Near Jawahar Nagar Market', description: 'Top-floor home with a private terrace for evenings and festivals. Peaceful lane with easy auto and bus access.' }),

  // ---- Independent houses
  mk('independent-house', 'Independent 3 BHK House with Lawn', 'Vigyan Nagar', 26000, { bhk: 3, area: 2000, floor: 'Ground + 1', furnishing: 'semi', featured: true, street: 'Vigyan Nagar Sector 2', description: 'Standalone house with a front lawn, two-car porch and a terrace. Quiet street yet five minutes from the main market.' }),
  mk('independent-house', 'Ground-Floor Portion, 2 BHK', 'Rajiv Gandhi Nagar', 10500, { bhk: 2, area: 950, floor: 'Ground', furnishing: 'unfurnished', street: 'Rajiv Gandhi Nagar Lane 4', description: 'Independent ground-floor portion with its own entrance and parking. Water storage and power backup available.' }),
  mk('independent-house', 'Duplex 4 BHK House', 'Indra Vihar', 32000, { bhk: 4, area: 2600, floor: 'Duplex', furnishing: 'furnished', street: 'Indra Vihar Colony', description: 'Large duplex in a gated colony. Four bedrooms, a study and a spacious drawing room.' }),
  mk('independent-house', 'Corner Kothi in Quiet Colony', 'Gumanpura', 45000, { bhk: 5, area: 3400, floor: 'Ground + 2', furnishing: 'furnished', verified: true, street: 'Gumanpura Main Road', description: 'Premium corner kothi with a landscaped garden, servant quarters and parking for four vehicles.' }),
  mk('independent-house', 'Two-Floor Family Home', 'Dadabari', 17500, { bhk: 3, area: 1650, floor: 'Ground + 1', furnishing: 'semi', street: 'Dadabari Extension', description: 'Well-maintained family home with a separate kitchen on each floor and a roof terrace.' }),
  mk('independent-house', 'Compact 2 BHK House with Parking', 'Borkhera', 9500, { bhk: 2, area: 820, floor: 'Ground', furnishing: 'unfurnished', verified: false, street: 'Near Borkhera Chauraha', description: 'Affordable independent house with bike and car parking. Suitable for a small family.' }),

  // ---- Commercial offices
  mk('commercial-office', 'Ready Office, 600 sq ft', 'Jawahar Nagar', 22000, { area: 600, floor: '2nd of 5', furnishing: 'furnished', verified: true, featured: true, street: 'Jawahar Nagar Main Road', tenants: 'Companies and consultants', description: 'Plug-and-play office with workstations, a cabin, conference corner and pantry. Reception and power backup included.' }),
  mk('commercial-office', 'Coaching Centre Floor, 6 Classrooms', 'Talwandi', 48000, { area: 2400, floor: '1st of 3', furnishing: 'semi', street: 'Talwandi Coaching Road', tenants: 'Coaching and training institutes', description: 'Full floor with six classrooms, a staff room, reception and separate washrooms. Ready for a coaching or training institute.' }),
  mk('commercial-office', 'Shop-cum-Office on Main Road', 'Mahaveer Nagar', 18000, { area: 700, floor: 'Ground', furnishing: 'unfurnished', street: 'Mahaveer Nagar Main Road', tenants: 'Retail and service businesses', description: 'High-visibility frontage on a busy road with a mezzanine for storage or a small office.' }),
  mk('commercial-office', 'Startup Cabin Space', 'Gumanpura', 12000, { area: 380, floor: '3rd of 4', furnishing: 'semi', street: 'Near Gumanpura Chauraha', tenants: 'Freelancers and small teams', description: 'Two-cabin office suitable for a small team. Shared washroom and pantry on the floor.' }),
  mk('commercial-office', 'Corporate Floor, 1500 sq ft', 'Kunhadi', 38000, { area: 1500, floor: '4th of 6', furnishing: 'semi', street: 'Kunhadi Business Complex', tenants: 'Corporate and IT offices', description: 'Bright corporate floor with glass partitions, central AC and dedicated parking in a business complex.' }),
  mk('commercial-office', 'Small Clinic Space', 'Rajiv Gandhi Nagar', 15000, { area: 420, floor: 'Ground', furnishing: 'semi', street: 'Rajiv Gandhi Nagar Market', tenants: 'Doctors and clinics', description: 'Ground-floor unit suited to a clinic with a waiting area, consultation room and washroom.' }),

  // ---- Sharing rooms
  mk('sharing-room', 'Boys Sharing Room, Meals Included', 'Rajiv Gandhi Nagar', 4800, { furnishing: 'furnished', tenants: 'Boys only', street: 'Near Coaching Lane', description: 'Double-sharing room with two meals, Wi-Fi and daily housekeeping. Walkable to major coaching institutes.' }),
  mk('sharing-room', 'Girls PG, Double Sharing', 'Talwandi', 6200, { furnishing: 'furnished', tenants: 'Girls only', street: 'Talwandi Main Road', description: 'Secure PG with a lady warden, CCTV, home-style meals and a study area.' }),
  mk('sharing-room', 'Triple Sharing near Coaching Hub', 'Indra Vihar', 3800, { furnishing: 'furnished', tenants: 'Students', street: 'Indra Vihar Market', description: 'Budget triple-sharing beds with study tables and Wi-Fi, a short walk from coaching institutes.' }),
  mk('sharing-room', 'Co-living Bed in AC Room', 'Vigyan Nagar', 7500, { furnishing: 'furnished', tenants: 'Students and professionals', street: 'Vigyan Nagar Sector 1', description: 'Air-conditioned co-living space with power backup, laundry and a common lounge.' }),
  mk('sharing-room', 'Student Hostel Bed with Mess', 'Landmark City', 5500, { furnishing: 'furnished', tenants: 'Students', verified: false, street: 'Landmark City, Kunhadi Road', description: 'Clean double-sharing hostel room with mess facility and a quiet study environment.' }),
  mk('sharing-room', 'Shared Flat for Aspirants', 'Mahaveer Nagar', 4200, { furnishing: 'furnished', tenants: 'Students', street: 'Mahaveer Nagar Extension', description: 'Room in a shared 3 BHK flat with a common kitchen, washing machine and fast internet.' }),
  mk('sharing-room', 'Budget Sharing Bed', 'Kunhadi', 3200, { furnishing: 'semi', tenants: 'Boys only', verified: false, street: 'Kunhadi Colony', description: 'Simple and affordable bed in a shared room with basic amenities and RO water.' }),
  mk('sharing-room', 'Premium Twin Sharing', 'Landmark City', 8500, { furnishing: 'furnished', tenants: 'Students and professionals', verified: true, street: 'Landmark City Phase 1', description: 'Twin-sharing room with attached bath, AC, daily cleaning and meals included.' }),
]
