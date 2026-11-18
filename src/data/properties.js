// Sample listings used until the backend API is connected.
// Every record is flagged `demo: true` and clearly labelled in the UI.
// Swap `services/api.js` to a real endpoint and this file is no longer needed.

const DAY = 86400000
const ago = (d) => new Date(Date.now() - d * DAY).toISOString()

const CATEGORY_SEGMENT = {
  flats: 'residential', houses: 'residential', villas: 'residential', plots: 'residential',
  shops: 'commercial', offices: 'commercial', 'commercial-land': 'commercial',
}

const TYPE_LABEL = {
  flats: (b) => `${b} BHK Apartment`, houses: (b) => `${b} BHK Independent House`, villas: (b) => `${b} BHK Villa`,
  plots: () => 'Residential Plot', shops: () => 'Commercial Shop', offices: () => 'Office Space', 'commercial-land': () => 'Commercial Land',
}

const make = (o) => ({
  listingType: 'sale',
  demo: true,
  verified: true,
  featured: false,
  bhk: 0,
  bathrooms: 0,
  furnishing: null,
  floor: null,
  facing: null,
  ...o,
  segment: CATEGORY_SEGMENT[o.category],
  propertyType: TYPE_LABEL[o.category](o.bhk),
  seller: o.seller || { type: 'Owner', name: 'Verified Owner' },
})

const BASE = ['Power Backup', 'Water Supply']

export const properties = [
  make({
    id: 'kkp-1001', slug: 'spacious-3-bhk-apartment-talwandi-kota', title: 'Spacious 3 BHK Apartment in Talwandi',
    category: 'flats', locality: 'talwandi', address: 'Talwandi, Kota, Rajasthan', price: 5800000, areaSqft: 1650, bhk: 3, bathrooms: 3,
    floor: '4th of 7', facing: 'East', furnishing: 'Semi-Furnished', status: 'Ready to Move', featured: true, listedAt: ago(2),
    description: 'A bright, well-ventilated 3 BHK apartment on the 4th floor with three bathrooms, a large living-dining area and a balcony. Ideal for families who want an established neighbourhood with schools, markets and healthcare close by.',
    amenities: [...BASE, 'Lift', 'Covered Parking', 'CCTV Surveillance', 'Modular Kitchen', 'Vastu Compliant'],
    images: ['1545324418-cc1a3fa10c00', '1502672260266-1c1ef2d93688', '1493809842364-78817add7ffb', '1484154218962-a197022b5858'],
  }),
  make({
    id: 'kkp-1002', slug: 'ready-2-bhk-flat-mahaveer-nagar-kota', title: 'Ready-to-Move 2 BHK Flat in Mahaveer Nagar',
    category: 'flats', locality: 'mahaveer-nagar', address: 'Mahaveer Nagar, Kota, Rajasthan', price: 3450000, areaSqft: 1050, bhk: 2, bathrooms: 2,
    floor: '2nd of 4', facing: 'North', furnishing: 'Unfurnished', status: 'Ready to Move', listedAt: ago(5),
    description: 'Compact and practical 2 BHK with a functional layout, two bathrooms and good natural light. Suitable for first-time buyers and for investors looking at a steady rental market.',
    amenities: [...BASE, 'Covered Parking', 'CCTV Surveillance'],
    images: ['1560448204-e02f11c3d0e2', '1522708323590-d24dbb6b0267', '1484154218962-a197022b5858', '1502672260266-1c1ef2d93688'],
  }),
  make({
    id: 'kkp-1003', slug: 'new-2-bhk-flat-kunhari-kota', title: 'New Launch 2 BHK Flat in Kunhari',
    category: 'flats', locality: 'kunhari', address: 'Kunhari, Kota, Rajasthan', price: 2990000, areaSqft: 1120, bhk: 2, bathrooms: 2,
    floor: '3rd of 5', facing: 'West', furnishing: 'Unfurnished', status: 'Under Construction', listedAt: ago(1),
    description: 'A new 2 BHK in a developing part of Kunhari with a modern floor plan and a flexible payment approach. Possession timelines should be confirmed directly with the seller.',
    amenities: [...BASE, 'Lift', 'Covered Parking', '24x7 Security', 'Garden / Park'],
    images: ['1502672260266-1c1ef2d93688', '1493809842364-78817add7ffb', '1558036117-15d82a90b9b1', '1560448204-e02f11c3d0e2'],
  }),
  make({
    id: 'kkp-1004', slug: 'contemporary-4-bhk-duplex-vigyan-nagar-kota', title: 'Contemporary 4 BHK Duplex in Vigyan Nagar',
    category: 'houses', locality: 'vigyan-nagar', address: 'Vigyan Nagar, Kota, Rajasthan', price: 13500000, areaSqft: 2400, bhk: 4, bathrooms: 4,
    floor: 'Ground + 1', facing: 'East', furnishing: 'Furnished', status: 'Ready to Move', featured: true, listedAt: ago(3),
    description: 'A fully furnished duplex with four bedrooms, a double-height entrance, a private terrace and covered parking for two cars. Finished with quality interiors and generous storage throughout.',
    amenities: [...BASE, 'Covered Parking', 'CCTV Surveillance', 'Modular Kitchen', 'Vastu Compliant', 'Garden / Park'],
    images: ['1564013799919-ab600027ffc6', '1600585154340-be6161a56a0c', '1600607687939-ce8a6c25118c', '1600573472550-8090b5e0745e'],
  }),
  make({
    id: 'kkp-1005', slug: 'luxury-5-bhk-villa-landmark-city-kota', title: 'Luxury 5 BHK Villa in Landmark City',
    category: 'villas', locality: 'landmark-city', address: 'Landmark City, Kota, Rajasthan', price: 32000000, areaSqft: 4200, bhk: 5, bathrooms: 6,
    floor: 'Ground + 2', facing: 'North-East', furnishing: 'Furnished', status: 'Ready to Move', featured: true, listedAt: ago(4),
    description: 'A statement villa in a planned township setting: five en-suite bedrooms, a private lawn, a home-theatre room and a terrace lounge. Designed for buyers who want space, privacy and architectural quality.',
    amenities: [...BASE, 'Covered Parking', 'CCTV Surveillance', '24x7 Security', 'Garden / Park', 'Gated Community', 'Modular Kitchen', 'Vastu Compliant'],
    images: ['1613490493576-7fde63acd811', '1512917774080-9991f1c4c750', '1600596542815-ffad4c1539a9', '1600210492486-724fe5c67fb0'],
  }),
  make({
    id: 'kkp-1006', slug: 'independent-3-bhk-house-dadabari-kota', title: 'Independent 3 BHK House in Dadabari',
    category: 'houses', locality: 'dadabari', address: 'Dadabari, Kota, Rajasthan', price: 9200000, areaSqft: 1900, bhk: 3, bathrooms: 3,
    floor: 'Ground + 1', facing: 'South', furnishing: 'Semi-Furnished', status: 'Ready to Move', listedAt: ago(8),
    description: 'A well-kept independent house on a corner plot with a front garden, car porch and an upper-floor family lounge. Walking distance to daily markets and main roads.',
    amenities: [...BASE, 'Covered Parking', 'Garden / Park', 'Vastu Compliant'],
    images: ['1570129477492-45c003edd2be', '1568605114967-8130f3a36994', '1600566753190-17f0baa2a6c3', '1600607687939-ce8a6c25118c'],
  }),
  make({
    id: 'kkp-1007', slug: 'modern-4-bhk-villa-indra-vihar-kota', title: 'Modern 4 BHK Villa in Indra Vihar',
    category: 'villas', locality: 'indra-vihar', address: 'Indra Vihar, Kota, Rajasthan', price: 21500000, areaSqft: 3100, bhk: 4, bathrooms: 5,
    floor: 'Ground + 1', facing: 'East', furnishing: 'Semi-Furnished', status: 'Ready to Move', listedAt: ago(10),
    description: 'A modern four-bedroom villa with clean lines, a landscaped front yard and a large open-plan living area. A strong option for families who prefer a quiet residential street.',
    amenities: [...BASE, 'Covered Parking', 'CCTV Surveillance', 'Garden / Park', 'Modular Kitchen', 'Vastu Compliant'],
    images: ['1580587771525-78b9dba3b914', '1600596542815-ffad4c1539a9', '1600585154340-be6161a56a0c', '1600573472550-8090b5e0745e'],
  }),
  make({
    id: 'kkp-1008', slug: 'residential-plot-kunhari-kota', title: 'East-Facing Residential Plot in Kunhari',
    category: 'plots', locality: 'kunhari', address: 'Kunhari, Kota, Rajasthan', price: 3600000, areaSqft: 1800, facing: 'East', status: 'Ready to Move', listedAt: ago(6),
    description: 'A regular-shaped, east-facing residential plot in a developing area of Kunhari, suitable for building an independent home. Buyers should verify title and approvals before purchase.',
    amenities: ['Water Supply', 'Gated Community'],
    images: ['1500382017468-9049fed747ef', '1500076656116-558758c991c1', '1473773508845-188df298d2d1', '1625246333195-78d9c38ad449'],
  }),
  make({
    id: 'kkp-1009', slug: 'plot-in-township-landmark-city-kota', title: 'Corner Plot in Landmark City Township',
    category: 'plots', locality: 'landmark-city', address: 'Landmark City, Kota, Rajasthan', price: 5400000, areaSqft: 2400, facing: 'North', status: 'Ready to Move', featured: true, listedAt: ago(7),
    description: 'A corner residential plot inside a planned township with internal roads and a defined layout. A good fit for buyers planning a custom villa.',
    amenities: ['Water Supply', 'Gated Community', '24x7 Security', 'Garden / Park'],
    images: ['1625246333195-78d9c38ad449', '1500382017468-9049fed747ef', '1500076656116-558758c991c1', '1473773508845-188df298d2d1'],
  }),
  make({
    id: 'kkp-1010', slug: 'budget-residential-plot-borkhera-kota', title: 'Budget Residential Plot in Borkhera',
    category: 'plots', locality: 'borkhera', address: 'Borkhera, Kota, Rajasthan', price: 2150000, areaSqft: 1200, facing: 'West', status: 'Ready to Move', verified: false, listedAt: ago(12),
    description: 'An affordable 1,200 sq. ft. plot suited to a compact home or long-term land investment. Documents are awaiting verification.',
    amenities: ['Water Supply'],
    images: ['1500076656116-558758c991c1', '1473773508845-188df298d2d1', '1500382017468-9049fed747ef', '1625246333195-78d9c38ad449'],
  }),
  make({
    id: 'kkp-1011', slug: 'main-road-shop-gumanpura-kota', title: 'Main-Road Retail Shop in Gumanpura',
    category: 'shops', locality: 'gumanpura', address: 'Gumanpura, Kota, Rajasthan', price: 7800000, areaSqft: 420, bathrooms: 1, floor: 'Ground', facing: 'East', status: 'Ready to Move', featured: true, listedAt: ago(3),
    description: 'A ground-floor retail shop with a wide frontage and strong passing footfall. Suitable for a showroom, pharmacy, food outlet or professional services.',
    amenities: ['Power Backup', 'CCTV Surveillance', 'Covered Parking'],
    images: ['1441986300917-64674bd600d8', '1555396273-367ea4eb4db5', '1604014237800-1c9102c219da', '1486406146926-c627a92ad1ab'],
  }),
  make({
    id: 'kkp-1012', slug: 'commercial-shop-rangbari-kota', title: 'Compact Commercial Shop in Rangbari',
    category: 'shops', locality: 'rangbari', address: 'Rangbari, Kota, Rajasthan', price: 4200000, areaSqft: 300, bathrooms: 1, floor: 'Ground', facing: 'North', status: 'Ready to Move', listedAt: ago(9),
    description: 'A well-located shop in an established local market, offering an accessible entry point into commercial property ownership.',
    amenities: ['Power Backup', 'CCTV Surveillance'],
    images: ['1604014237800-1c9102c219da', '1441986300917-64674bd600d8', '1555396273-367ea4eb4db5', '1486406146926-c627a92ad1ab'],
  }),
  make({
    id: 'kkp-1013', slug: 'premium-office-space-gumanpura-kota', title: 'Premium Office Space in Gumanpura',
    category: 'offices', locality: 'gumanpura', address: 'Gumanpura, Kota, Rajasthan', price: 11000000, areaSqft: 1250, bathrooms: 2, floor: '2nd of 5', facing: 'East', furnishing: 'Semi-Furnished', status: 'Ready to Move', listedAt: ago(5),
    description: 'A professional office floor with an open workspace, a cabin, a conference room and a pantry. Lift access and dedicated parking make it suitable for firms, clinics and consultancies.',
    amenities: ['Power Backup', 'Lift', 'Covered Parking', 'CCTV Surveillance', '24x7 Security'],
    images: ['1497366216548-37526070297c', '1497366811353-6870744d04b2', '1524758631624-e2822e304c36', '1486406146926-c627a92ad1ab'],
  }),
  make({
    id: 'kkp-1014', slug: 'office-space-rajeev-gandhi-nagar-kota', title: 'Ready Office Space in Rajeev Gandhi Nagar',
    category: 'offices', locality: 'rajeev-gandhi-nagar', address: 'Rajeev Gandhi Nagar, Kota, Rajasthan', price: 6400000, areaSqft: 800, bathrooms: 1, floor: '1st of 4', facing: 'South', furnishing: 'Unfurnished', status: 'Ready to Move', listedAt: ago(11),
    description: 'An 800 sq. ft. office suited to coaching support services, startups and small teams, close to a busy residential catchment.',
    amenities: ['Power Backup', 'Lift', 'CCTV Surveillance'],
    images: ['1524758631624-e2822e304c36', '1497366216548-37526070297c', '1497366811353-6870744d04b2', '1486406146926-c627a92ad1ab'],
  }),
  make({
    id: 'kkp-1015', slug: 'commercial-land-borkhera-kota', title: 'Large Commercial Land Parcel in Borkhera',
    category: 'commercial-land', locality: 'borkhera', address: 'Borkhera, Kota, Rajasthan', price: 26000000, areaSqft: 6500, facing: 'North', status: 'Ready to Move', listedAt: ago(14),
    description: 'A sizeable commercial land parcel for showrooms, warehousing or a mixed-use development. Land-use and approvals should be independently verified.',
    amenities: ['Water Supply'],
    images: ['1473773508845-188df298d2d1', '1500076656116-558758c991c1', '1500382017468-9049fed747ef', '1625246333195-78d9c38ad449'],
  }),
  make({
    id: 'kkp-1016', slug: 'affordable-1-bhk-flat-rajeev-gandhi-nagar-kota', title: 'Affordable 1 BHK Flat in Rajeev Gandhi Nagar',
    category: 'flats', locality: 'rajeev-gandhi-nagar', address: 'Rajeev Gandhi Nagar, Kota, Rajasthan', price: 1980000, areaSqft: 620, bhk: 1, bathrooms: 1,
    floor: '1st of 4', facing: 'East', furnishing: 'Semi-Furnished', status: 'Ready to Move', listedAt: ago(1),
    description: 'A neat 1 BHK ideal for individuals, couples or investors. Semi-furnished with a modular kitchen and fitted wardrobes.',
    amenities: [...BASE, 'CCTV Surveillance', 'Modular Kitchen'],
    images: ['1522708323590-d24dbb6b0267', '1560448204-e02f11c3d0e2', '1484154218962-a197022b5858', '1502672260266-1c1ef2d93688'],
  }),
  make({
    id: 'kkp-1017', slug: 'furnished-3-bhk-flat-gumanpura-kota', title: 'Furnished 3 BHK Flat in Gumanpura',
    category: 'flats', locality: 'gumanpura', address: 'Gumanpura, Kota, Rajasthan', price: 6200000, areaSqft: 1580, bhk: 3, bathrooms: 3,
    floor: '5th of 8', facing: 'North-East', furnishing: 'Furnished', status: 'Ready to Move', listedAt: ago(2),
    description: 'A fully furnished high-floor 3 BHK with open views, a spacious balcony and premium fittings. Move in with just your belongings.',
    amenities: [...BASE, 'Lift', 'Covered Parking', 'CCTV Surveillance', '24x7 Security', 'Gym', 'Modular Kitchen'],
    images: ['1493809842364-78817add7ffb', '1545324418-cc1a3fa10c00', '1502672260266-1c1ef2d93688', '1558036117-15d82a90b9b1'],
  }),
  make({
    id: 'kkp-1018', slug: 'value-2-bhk-flat-dadabari-kota', title: 'Value 2 BHK Flat in Dadabari',
    category: 'flats', locality: 'dadabari', address: 'Dadabari, Kota, Rajasthan', price: 3100000, areaSqft: 980, bhk: 2, bathrooms: 2,
    floor: 'Ground of 4', facing: 'West', furnishing: 'Unfurnished', status: 'Ready to Move', verified: false, listedAt: ago(15),
    description: 'A ground-floor 2 BHK with a private sit-out, practical layout and easy access to main roads and markets.',
    amenities: [...BASE, 'Covered Parking'],
    images: ['1560448204-e02f11c3d0e2', '1522708323590-d24dbb6b0267', '1558036117-15d82a90b9b1', '1484154218962-a197022b5858'],
  }),
  make({
    id: 'kkp-1019', slug: 'classic-3-bhk-house-rangbari-kota', title: 'Classic 3 BHK House in Rangbari',
    category: 'houses', locality: 'rangbari', address: 'Rangbari, Kota, Rajasthan', price: 6800000, areaSqft: 1500, bhk: 3, bathrooms: 3,
    floor: 'Ground + 1', facing: 'North', furnishing: 'Unfurnished', status: 'Ready to Move', listedAt: ago(13),
    description: 'A well-built independent house in a settled neighbourhood, with a spacious courtyard, three bedrooms and room for future expansion.',
    amenities: [...BASE, 'Covered Parking', 'Vastu Compliant'],
    images: ['1568605114967-8130f3a36994', '1570129477492-45c003edd2be', '1572120360610-d971b9d7767c', '1564013799919-ab600027ffc6'],
  }),
  make({
    id: 'kkp-1020', slug: 'commercial-land-kunhari-kota', title: 'Commercial Land Parcel in Kunhari',
    category: 'commercial-land', locality: 'kunhari', address: 'Kunhari, Kota, Rajasthan', price: 16500000, areaSqft: 4800, facing: 'East', status: 'Ready to Move', verified: false, listedAt: ago(18),
    description: 'A flexible commercial land parcel in a growing corridor of Kunhari, suited to retail, institutional or mixed-use plans.',
    amenities: ['Water Supply'],
    images: ['1625246333195-78d9c38ad449', '1473773508845-188df298d2d1', '1500076656116-558758c991c1', '1500382017468-9049fed747ef'],
  }),
]
