// Sample listings used until the backend API is connected.
// Every record is flagged `demo: true` and clearly labelled in the UI.
// `price` is always the monthly rent in rupees. For PGs it is the lowest per-bed rent.

const DAY = 86400000
const ago = (d) => new Date(Date.now() - d * DAY).toISOString()

const CATEGORY_SEGMENT = {
  'pg-boys': 'pg', 'pg-girls': 'pg', hostel: 'pg', rooms: 'rent', flats: 'rent', houses: 'rent', commercial: 'rent',
}

const typeLabel = (o) => {
  switch (o.category) {
    case 'pg-boys': return 'Boys PG'
    case 'pg-girls': return 'Girls PG'
    case 'hostel': return 'Hostel'
    case 'rooms': return o.rk ? '1 RK' : 'Single Room'
    case 'flats': return `${o.bhk} BHK Flat`
    case 'houses': return `${o.bhk} BHK House`
    default: return o.commercialType || 'Commercial Space'
  }
}

const make = (o) => {
  const price = o.sharingPrices ? Math.min(...Object.values(o.sharingPrices)) : o.price
  return {
    listingType: 'rent',
    demo: true,
    verified: true,
    featured: false,
    bhk: 0,
    bathrooms: 0,
    furnishing: null,
    floor: null,
    facing: null,
    sharingPrices: null,
    food: false,
    deposit: null,
    ...o,
    price,
    segment: CATEGORY_SEGMENT[o.category],
    propertyType: typeLabel(o),
    gender: o.category === 'pg-boys' ? 'Boys' : o.category === 'pg-girls' ? 'Girls' : o.gender || null,
    sharing: o.sharingPrices ? Object.keys(o.sharingPrices) : null,
    seller: o.seller || { type: 'Owner', name: 'Verified Owner' },
  }
}

const PG_BASE = ['Wi-Fi', 'Power Backup', 'Water Purifier', 'CCTV Surveillance']

export const properties = [
  // ---------- Boys PG ----------
  make({
    id: 'kkp-2001', slug: 'boys-pg-with-meals-talwandi-kota', title: 'Boys PG with Meals near Coaching Hub, Talwandi',
    category: 'pg-boys', locality: 'talwandi', address: 'Talwandi, Kota, Rajasthan', sharingPrices: { Single: 9000, Double: 6500, Triple: 5000 },
    deposit: 6500, areaSqft: 140, bathrooms: 1, floor: '2nd of 4', furnishing: 'Furnished', status: 'Available Now', food: true, featured: true, listedAt: ago(2),
    description: 'A well-kept boys PG a short walk from major coaching institutes. Rooms come with a bed, mattress, study table, chair and cupboard for every student. Three home-style meals a day are included, along with Wi-Fi and daily housekeeping.',
    amenities: [...PG_BASE, 'Meals Included', 'Study Table', 'Laundry', 'Housekeeping', 'Warden / Caretaker', 'Geyser'],
    images: ['1555854877-bab0e564b8d5', '1522771739844-6a9f6d5f14af', '1519389950473-47ba0277781c', '1484154218962-a197022b5858'],
  }),
  make({
    id: 'kkp-2002', slug: 'budget-boys-pg-mahaveer-nagar-kota', title: 'Budget Boys PG in Mahaveer Nagar',
    category: 'pg-boys', locality: 'mahaveer-nagar', address: 'Mahaveer Nagar, Kota, Rajasthan', sharingPrices: { Double: 5500, Triple: 4200 },
    deposit: 4000, areaSqft: 150, bathrooms: 1, floor: '1st of 3', furnishing: 'Semi-Furnished', status: 'Available Now', food: true, listedAt: ago(5),
    description: 'A simple, clean and affordable PG for students on a budget. Double and triple sharing rooms with two meals a day, Wi-Fi and a quiet study environment.',
    amenities: [...PG_BASE, 'Meals Included', 'Study Table', 'Geyser'],
    images: ['1513694203232-719a280e022f', '1555854877-bab0e564b8d5', '1519389950473-47ba0277781c', '1484154218962-a197022b5858'],
  }),
  make({
    id: 'kkp-2003', slug: 'self-cooking-boys-pg-kunhari-kota', title: 'Boys PG with Kitchen Access in Kunhari',
    category: 'pg-boys', locality: 'kunhari', address: 'Kunhari, Kota, Rajasthan', sharingPrices: { Single: 7500, Double: 5800 },
    deposit: 5000, areaSqft: 130, bathrooms: 1, floor: '3rd of 4', furnishing: 'Furnished', status: 'Available Now', food: false, listedAt: ago(7),
    description: 'Rooms with a shared kitchen so you can cook your own meals and keep costs low. Furnished with bed, study table and storage, with reliable Wi-Fi and power backup.',
    amenities: [...PG_BASE, 'Study Table', 'Geyser', 'Laundry'],
    images: ['1522771739844-6a9f6d5f14af', '1513694203232-719a280e022f', '1484154218962-a197022b5858', '1555854877-bab0e564b8d5'],
  }),
  make({
    id: 'kkp-2004', slug: 'premium-boys-pg-vigyan-nagar-kota', title: 'Boys PG with AC Rooms in Vigyan Nagar',
    category: 'pg-boys', locality: 'vigyan-nagar', address: 'Vigyan Nagar, Kota, Rajasthan', sharingPrices: { Single: 8000, Double: 5800, Triple: 4500 },
    deposit: 5800, areaSqft: 160, bathrooms: 1, floor: '2nd of 4', furnishing: 'Furnished', status: 'Available Now', food: true, featured: true, listedAt: ago(3),
    description: 'A comfortable PG in a planned colony with AC and non-AC options, nutritious meals, a common study hall and 24-hour caretaker support.',
    amenities: [...PG_BASE, 'Meals Included', 'AC', 'Study Table', 'Laundry', 'Warden / Caretaker', 'Housekeeping'],
    images: ['1522771739844-6a9f6d5f14af', '1555854877-bab0e564b8d5', '1519389950473-47ba0277781c', '1513694203232-719a280e022f'],
  }),

  // ---------- Girls PG ----------
  make({
    id: 'kkp-2005', slug: 'safe-girls-pg-talwandi-kota', title: 'Safe Girls PG with Meals in Talwandi',
    category: 'pg-girls', locality: 'talwandi', address: 'Talwandi, Kota, Rajasthan', sharingPrices: { Single: 9500, Double: 7000 },
    deposit: 7000, areaSqft: 150, bathrooms: 1, floor: '2nd of 4', furnishing: 'Furnished', status: 'Available Now', food: true, featured: true, listedAt: ago(1),
    description: 'A secure girls-only PG with a resident warden, CCTV at all entry points and a fixed entry time. Includes three meals, Wi-Fi, study tables and a quiet common study room.',
    amenities: [...PG_BASE, 'Meals Included', 'Study Table', 'Warden / Caretaker', 'Laundry', 'Housekeeping', 'Geyser'],
    images: ['1595526114035-0d45ed16cfbf', '1571508601891-ca5e7a713859', '1505691938895-1758d7feb511', '1507089947368-19c1da9775ae'],
  }),
  make({
    id: 'kkp-2006', slug: 'girls-pg-indra-vihar-kota', title: 'Girls PG near Institutes in Indra Vihar',
    category: 'pg-girls', locality: 'indra-vihar', address: 'Indra Vihar, Kota, Rajasthan', sharingPrices: { Double: 6500, Triple: 5200 },
    deposit: 5000, areaSqft: 140, bathrooms: 1, floor: '1st of 3', furnishing: 'Furnished', status: 'Available Now', food: true, listedAt: ago(4),
    description: 'A friendly girls PG with double and triple sharing rooms, home-style meals and Wi-Fi, located close to coaching institutes and a market.',
    amenities: [...PG_BASE, 'Meals Included', 'Study Table', 'Warden / Caretaker', 'Geyser'],
    images: ['1571508601891-ca5e7a713859', '1595526114035-0d45ed16cfbf', '1507089947368-19c1da9775ae', '1505691938895-1758d7feb511'],
  }),
  make({
    id: 'kkp-2007', slug: 'single-room-girls-pg-rajeev-gandhi-nagar-kota', title: 'Girls PG with Attached Bath in Rajeev Gandhi Nagar',
    category: 'pg-girls', locality: 'rajeev-gandhi-nagar', address: 'Rajeev Gandhi Nagar, Kota, Rajasthan', sharingPrices: { Single: 8500, Double: 6200 },
    deposit: 6000, areaSqft: 145, bathrooms: 1, floor: '2nd of 4', furnishing: 'Furnished', status: 'Available Soon', food: true, listedAt: ago(6),
    description: 'Rooms with attached bathrooms, wardrobes and study desks in a calm lane. Meals, Wi-Fi and housekeeping are included in the rent.',
    amenities: [...PG_BASE, 'Meals Included', 'Attached Bathroom', 'Study Table', 'Housekeeping', 'Warden / Caretaker'],
    images: ['1505691938895-1758d7feb511', '1631049307264-da0ec9d70304', '1595526114035-0d45ed16cfbf', '1507089947368-19c1da9775ae'],
  }),
  make({
    id: 'kkp-2008', slug: 'affordable-girls-pg-dadabari-kota', title: 'Affordable Girls PG in Dadabari',
    category: 'pg-girls', locality: 'dadabari', address: 'Dadabari, Kota, Rajasthan', sharingPrices: { Double: 6000, Triple: 4800 },
    deposit: 4500, areaSqft: 150, bathrooms: 1, floor: '1st of 3', furnishing: 'Semi-Furnished', status: 'Available Now', food: true, verified: false, listedAt: ago(10),
    description: 'A budget-friendly girls PG with two meals a day and Wi-Fi, close to the main road and daily markets. Verification is in progress.',
    amenities: [...PG_BASE, 'Meals Included', 'Geyser'],
    images: ['1631049307264-da0ec9d70304', '1571508601891-ca5e7a713859', '1505691938895-1758d7feb511', '1507089947368-19c1da9775ae'],
  }),

  // ---------- Hostels ----------
  make({
    id: 'kkp-2009', slug: 'co-living-hostel-landmark-city-kota', title: 'Co-living Hostel in Landmark City',
    category: 'hostel', locality: 'landmark-city', address: 'Landmark City, Kota, Rajasthan', sharingPrices: { Double: 5000, Triple: 3800 }, gender: 'Boys & Girls (separate floors)',
    deposit: 3800, areaSqft: 180, bathrooms: 1, floor: 'Multiple floors', furnishing: 'Furnished', status: 'Available Now', food: true, listedAt: ago(3),
    description: 'A modern co-living hostel with separate floors, a common lounge, study zones and Wi-Fi. Meals are available in the in-house mess.',
    amenities: [...PG_BASE, 'Meals Included', 'Study Table', 'Lift', 'Laundry', 'Warden / Caretaker'],
    images: ['1536376072261-38c75010e6c9', '1555854877-bab0e564b8d5', '1513694203232-719a280e022f', '1519389950473-47ba0277781c'],
  }),
  make({
    id: 'kkp-2010', slug: 'student-hostel-kunhari-kota', title: 'Student Hostel with Mess in Kunhari',
    category: 'hostel', locality: 'kunhari', address: 'Kunhari, Kota, Rajasthan', sharingPrices: { Double: 4600, Triple: 3500 }, gender: 'Boys',
    deposit: 3500, areaSqft: 200, bathrooms: 1, floor: 'Multiple floors', furnishing: 'Furnished', status: 'Available Now', food: true, listedAt: ago(8),
    description: 'A large student hostel with a dining hall, common study room and 24x7 caretaker. Simple, clean and priced for students.',
    amenities: [...PG_BASE, 'Meals Included', 'Study Table', 'Warden / Caretaker', 'Laundry'],
    images: ['1555854877-bab0e564b8d5', '1536376072261-38c75010e6c9', '1519389950473-47ba0277781c', '1484154218962-a197022b5858'],
  }),
  make({
    id: 'kkp-2011', slug: 'budget-hostel-borkhera-kota', title: 'Budget Hostel Beds in Borkhera',
    category: 'hostel', locality: 'borkhera', address: 'Borkhera, Kota, Rajasthan', sharingPrices: { Triple: 3200, Double: 4200 }, gender: 'Boys',
    deposit: 3000, areaSqft: 170, bathrooms: 1, floor: '2nd of 3', furnishing: 'Semi-Furnished', status: 'Available Now', food: false, verified: false, listedAt: ago(12),
    description: 'One of the most affordable options in the area, with triple sharing rooms, Wi-Fi and a shared kitchen.',
    amenities: ['Wi-Fi', 'Power Backup', 'Water Purifier', 'Geyser'],
    images: ['1513694203232-719a280e022f', '1555854877-bab0e564b8d5', '1536376072261-38c75010e6c9', '1519389950473-47ba0277781c'],
  }),

  // ---------- Rooms ----------
  make({
    id: 'kkp-2012', slug: 'single-room-for-rent-rangbari-kota', title: 'Furnished Single Room in Rangbari',
    category: 'rooms', locality: 'rangbari', address: 'Rangbari, Kota, Rajasthan', price: 3500, deposit: 3500,
    areaSqft: 110, bathrooms: 1, floor: '1st of 2', furnishing: 'Semi-Furnished', status: 'Available Now', listedAt: ago(2),
    description: 'A neat single room with a common bathroom and kitchen, suited to students and working individuals. Safe family-run building.',
    amenities: ['Wi-Fi', 'Power Backup', 'Water Purifier', 'Geyser'],
    images: ['1522771739844-6a9f6d5f14af', '1512918728675-ed5a9ecdebfd', '1513694203232-719a280e022f', '1484154218962-a197022b5858'],
  }),
  make({
    id: 'kkp-2013', slug: '1-rk-for-rent-talwandi-kota', title: 'Furnished 1 RK near Coaching Centres, Talwandi',
    category: 'rooms', rk: true, locality: 'talwandi', address: 'Talwandi, Kota, Rajasthan', price: 5000, deposit: 10000,
    areaSqft: 280, bathrooms: 1, floor: '2nd of 4', furnishing: 'Furnished', status: 'Available Now', featured: true, listedAt: ago(1),
    description: 'A self-contained 1 RK with a small kitchen, attached bathroom, bed and wardrobe. Independent and ideal for a student or a working professional.',
    amenities: ['Wi-Fi', 'Power Backup', 'Attached Bathroom', 'Geyser', 'Water Purifier'],
    images: ['1512918728675-ed5a9ecdebfd', '1616594039964-ae9021a400a0', '1484154218962-a197022b5858', '1522771739844-6a9f6d5f14af'],
  }),
  make({
    id: 'kkp-2014', slug: 'room-with-attached-bath-gumanpura-kota', title: 'Room with Attached Bathroom in Gumanpura',
    category: 'rooms', locality: 'gumanpura', address: 'Gumanpura, Kota, Rajasthan', price: 4500, deposit: 4500,
    areaSqft: 130, bathrooms: 1, floor: 'Ground', furnishing: 'Semi-Furnished', status: 'Available Now', listedAt: ago(6),
    description: 'A comfortable room with its own bathroom in a quiet lane, close to the market and bus routes.',
    amenities: ['Power Backup', 'Attached Bathroom', 'Water Purifier'],
    images: ['1616594039964-ae9021a400a0', '1540518614846-7eded433c457', '1512918728675-ed5a9ecdebfd', '1513694203232-719a280e022f'],
  }),
  make({
    id: 'kkp-2015', slug: '1-rk-for-rent-vigyan-nagar-kota', title: 'Independent 1 RK in Vigyan Nagar',
    category: 'rooms', rk: true, locality: 'vigyan-nagar', address: 'Vigyan Nagar, Kota, Rajasthan', price: 5500, deposit: 11000,
    areaSqft: 300, bathrooms: 1, floor: '1st of 3', furnishing: 'Unfurnished', status: 'Available Soon', listedAt: ago(9),
    description: 'A spacious 1 RK with kitchen platform and attached bathroom in a planned colony. Bring your own furniture and make it yours.',
    amenities: ['Power Backup', 'Attached Bathroom', 'Water Purifier', 'Covered Parking'],
    images: ['1540518614846-7eded433c457', '1512918728675-ed5a9ecdebfd', '1616594039964-ae9021a400a0', '1484154218962-a197022b5858'],
  }),

  // ---------- Flats ----------
  make({
    id: 'kkp-2016', slug: '1-bhk-flat-for-rent-dadabari-kota', title: '1 BHK Flat for Rent in Dadabari',
    category: 'flats', locality: 'dadabari', address: 'Dadabari, Kota, Rajasthan', price: 6500, deposit: 13000,
    areaSqft: 520, bhk: 1, bathrooms: 1, floor: '2nd of 4', facing: 'East', furnishing: 'Semi-Furnished', status: 'Available Now', listedAt: ago(4),
    description: 'A bright 1 BHK with a separate bedroom, living area and kitchen, close to markets and main roads. Suitable for a couple or a working professional.',
    amenities: ['Power Backup', 'Water Purifier', 'Covered Parking', 'CCTV Surveillance'],
    images: ['1522708323590-d24dbb6b0267', '1560448204-e02f11c3d0e2', '1484154218962-a197022b5858', '1545324418-cc1a3fa10c00'],
  }),
  make({
    id: 'kkp-2017', slug: '2-bhk-flat-for-rent-gumanpura-kota', title: '2 BHK Flat for Rent in Gumanpura',
    category: 'flats', locality: 'gumanpura', address: 'Gumanpura, Kota, Rajasthan', price: 10500, deposit: 21000,
    areaSqft: 950, bhk: 2, bathrooms: 2, floor: '3rd of 5', facing: 'North', furnishing: 'Semi-Furnished', status: 'Available Now', featured: true, listedAt: ago(2),
    description: 'A spacious 2 BHK with two bathrooms and a balcony, ideal for families or sharing among friends. Lift and covered parking available.',
    amenities: ['Power Backup', 'Lift', 'Covered Parking', 'CCTV Surveillance', 'Water Purifier'],
    images: ['1560185127-6ed189bf02f4', '1522708323590-d24dbb6b0267', '1502672260266-1c1ef2d93688', '1545324418-cc1a3fa10c00'],
  }),
  make({
    id: 'kkp-2018', slug: '2-bhk-flat-for-rent-landmark-city-kota', title: '2 BHK Flat in Landmark City Township',
    category: 'flats', locality: 'landmark-city', address: 'Landmark City, Kota, Rajasthan', price: 12500, deposit: 25000,
    areaSqft: 1050, bhk: 2, bathrooms: 2, floor: '4th of 7', facing: 'East', furnishing: 'Furnished', status: 'Available Now', listedAt: ago(5),
    description: 'A fully furnished 2 BHK in a gated township, with modular kitchen, wardrobes and a well-kept common area.',
    amenities: ['Power Backup', 'Lift', 'Covered Parking', 'CCTV Surveillance', 'Water Purifier'],
    images: ['1493809842364-78817add7ffb', '1586023492125-27b2c045efd7', '1560185127-6ed189bf02f4', '1502672260266-1c1ef2d93688'],
  }),
  make({
    id: 'kkp-2019', slug: '3-bhk-flat-for-rent-indra-vihar-kota', title: '3 BHK Flat for Families in Indra Vihar',
    category: 'flats', locality: 'indra-vihar', address: 'Indra Vihar, Kota, Rajasthan', price: 16000, deposit: 32000,
    areaSqft: 1450, bhk: 3, bathrooms: 3, floor: '2nd of 4', facing: 'North-East', furnishing: 'Semi-Furnished', status: 'Available Now', listedAt: ago(8),
    description: 'A roomy 3 BHK for families or small groups, with three bathrooms, a large living-dining area and parking.',
    amenities: ['Power Backup', 'Covered Parking', 'CCTV Surveillance', 'Water Purifier', 'Lift'],
    images: ['1586023492125-27b2c045efd7', '1560185127-6ed189bf02f4', '1522708323590-d24dbb6b0267', '1484154218962-a197022b5858'],
  }),
  make({
    id: 'kkp-2020', slug: '1-bhk-flat-for-rent-kunhari-kota', title: 'New 1 BHK Flat in Kunhari',
    category: 'flats', locality: 'kunhari', address: 'Kunhari, Kota, Rajasthan', price: 5800, deposit: 11600,
    areaSqft: 500, bhk: 1, bathrooms: 1, floor: '1st of 4', facing: 'West', furnishing: 'Unfurnished', status: 'Available Soon', listedAt: ago(1),
    description: 'A newly built 1 BHK at a pocket-friendly rent in a developing part of Kunhari. Available from next month.',
    amenities: ['Power Backup', 'Water Purifier', 'Covered Parking'],
    images: ['1560448204-e02f11c3d0e2', '1545324418-cc1a3fa10c00', '1522708323590-d24dbb6b0267', '1484154218962-a197022b5858'],
  }),

  // ---------- Houses ----------
  make({
    id: 'kkp-2021', slug: '2-bhk-house-for-rent-rangbari-kota', title: '2 BHK Independent House in Rangbari',
    category: 'houses', locality: 'rangbari', address: 'Rangbari, Kota, Rajasthan', price: 9500, deposit: 19000,
    areaSqft: 900, bhk: 2, bathrooms: 2, floor: 'Ground', facing: 'North', furnishing: 'Unfurnished', status: 'Available Now', listedAt: ago(7),
    description: 'A ground-floor independent house with a courtyard, two bedrooms and room for two-wheeler parking. Great for small families.',
    amenities: ['Power Backup', 'Covered Parking', 'Water Purifier'],
    images: ['1568605114967-8130f3a36994', '1572120360610-d971b9d7767c', '1598928506311-c55ded91a20c', '1484154218962-a197022b5858'],
  }),
  make({
    id: 'kkp-2022', slug: '3-bhk-house-for-rent-borkhera-kota', title: '3 BHK House for Rent in Borkhera',
    category: 'houses', locality: 'borkhera', address: 'Borkhera, Kota, Rajasthan', price: 13500, deposit: 27000,
    areaSqft: 1400, bhk: 3, bathrooms: 3, floor: 'Ground + 1', facing: 'East', furnishing: 'Semi-Furnished', status: 'Available Now', listedAt: ago(11),
    description: 'A comfortable two-storey house with three bedrooms, a terrace and parking. A good fit for families or a group of working professionals.',
    amenities: ['Power Backup', 'Covered Parking', 'Water Purifier', 'CCTV Surveillance'],
    images: ['1570129477492-45c003edd2be', '1558036117-15d82a90b9b1', '1598928506311-c55ded91a20c', '1586023492125-27b2c045efd7'],
  }),
  make({
    id: 'kkp-2023', slug: '4-bhk-house-for-rent-dadabari-kota', title: '4 BHK House for Groups in Dadabari',
    category: 'houses', locality: 'dadabari', address: 'Dadabari, Kota, Rajasthan', price: 19000, deposit: 38000,
    areaSqft: 2000, bhk: 4, bathrooms: 4, floor: 'Ground + 1', facing: 'South', furnishing: 'Semi-Furnished', status: 'Available Now', listedAt: ago(14),
    description: 'A large four-bedroom house, popular with groups of students or families who want space and privacy.',
    amenities: ['Power Backup', 'Covered Parking', 'Water Purifier', 'CCTV Surveillance'],
    images: ['1572120360610-d971b9d7767c', '1568605114967-8130f3a36994', '1586023492125-27b2c045efd7', '1598928506311-c55ded91a20c'],
  }),

  // ---------- Commercial ----------
  make({
    id: 'kkp-2024', slug: 'shop-for-rent-gumanpura-kota', title: 'Main-Road Shop for Rent in Gumanpura',
    category: 'commercial', commercialType: 'Shop', locality: 'gumanpura', address: 'Gumanpura, Kota, Rajasthan', price: 12000, deposit: 36000,
    areaSqft: 200, bathrooms: 1, floor: 'Ground', facing: 'East', status: 'Available Now', listedAt: ago(3),
    description: 'A ground-floor shop with good frontage and steady footfall. Suited to stationery, mobile, food or general retail.',
    amenities: ['Power Backup', 'CCTV Surveillance'],
    images: ['1441986300917-64674bd600d8', '1555396273-367ea4eb4db5', '1497366811353-6870744d04b2', '1524758631624-e2822e304c36'],
  }),
  make({
    id: 'kkp-2025', slug: 'small-shop-for-rent-rangbari-kota', title: 'Compact Shop for Rent in Rangbari',
    category: 'commercial', commercialType: 'Shop', locality: 'rangbari', address: 'Rangbari, Kota, Rajasthan', price: 8500, deposit: 25500,
    areaSqft: 150, bathrooms: 1, floor: 'Ground', facing: 'North', status: 'Available Now', listedAt: ago(9),
    description: 'A compact shop in an established local market. A low-cost way to start a small business.',
    amenities: ['Power Backup'],
    images: ['1555396273-367ea4eb4db5', '1441986300917-64674bd600d8', '1497366811353-6870744d04b2', '1524758631624-e2822e304c36'],
  }),
  make({
    id: 'kkp-2026', slug: 'office-space-for-rent-gumanpura-kota', title: 'Office Space for Rent in Gumanpura',
    category: 'commercial', commercialType: 'Office', locality: 'gumanpura', address: 'Gumanpura, Kota, Rajasthan', price: 18000, deposit: 54000,
    areaSqft: 600, bathrooms: 1, floor: '2nd of 5', facing: 'East', furnishing: 'Semi-Furnished', status: 'Available Now', listedAt: ago(5),
    description: 'A professional office with an open workspace, a cabin and a pantry. Lift access and parking are available.',
    amenities: ['Power Backup', 'Lift', 'Covered Parking', 'CCTV Surveillance', 'Wi-Fi'],
    images: ['1497366216548-37526070297c', '1497366811353-6870744d04b2', '1524758631624-e2822e304c36', '1486406146926-c627a92ad1ab'],
  }),
  make({
    id: 'kkp-2027', slug: 'office-for-rent-rajeev-gandhi-nagar-kota', title: 'Small Office for Rent in Rajeev Gandhi Nagar',
    category: 'commercial', commercialType: 'Office', locality: 'rajeev-gandhi-nagar', address: 'Rajeev Gandhi Nagar, Kota, Rajasthan', price: 11000, deposit: 33000,
    areaSqft: 400, bathrooms: 1, floor: '1st of 4', facing: 'South', furnishing: 'Unfurnished', status: 'Available Now', listedAt: ago(13),
    description: 'A 400 sq. ft. office suited to startups, tutors and small teams, close to a busy residential catchment.',
    amenities: ['Power Backup', 'Lift', 'CCTV Surveillance'],
    images: ['1524758631624-e2822e304c36', '1497366216548-37526070297c', '1497366811353-6870744d04b2', '1486406146926-c627a92ad1ab'],
  }),
]
