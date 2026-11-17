export const AMENITIES = [
  'Wi-Fi', 'AC', 'Meals', 'Laundry', 'Parking', 'CCTV', 'Power Backup', 'Gym', 'Housekeeping',
]

export const LOCATIONS = [
  'Mansarovar', 'Vaishali Nagar', 'Malviya Nagar', 'Jagatpura', 'Raja Park', 'Gopalpura',
]

const img = (id, w = 800, h = 600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`

export const owners = [
  { id: 'o1', name: 'Rajesh Sharma', email: 'rajesh@staynest.in', phone: '+91 98290 11223', properties: 3, status: 'Active', joined: '2024-03-12', city: 'Jaipur' },
  { id: 'o2', name: 'Priya Mehta', email: 'priya@staynest.in', phone: '+91 98111 33445', properties: 2, status: 'Active', joined: '2024-05-20', city: 'Jaipur' },
  { id: 'o3', name: 'Amit Verma', email: 'amit@staynest.in', phone: '+91 98765 44332', properties: 4, status: 'Active', joined: '2023-11-08', city: 'Jaipur' },
  { id: 'o4', name: 'Sunita Agarwal', email: 'sunita@staynest.in', phone: '+91 97654 22110', properties: 1, status: 'Active', joined: '2024-08-01', city: 'Jaipur' },
  { id: 'o5', name: 'Vikram Singh', email: 'vikram@staynest.in', phone: '+91 99887 66554', properties: 2, status: 'Pending', joined: '2025-01-15', city: 'Jaipur' },
  { id: 'o6', name: 'Neha Gupta', email: 'neha@staynest.in', phone: '+91 91234 55667', properties: 3, status: 'Active', joined: '2024-01-22', city: 'Jaipur' },
  { id: 'o7', name: 'Karan Malhotra', email: 'karan@staynest.in', phone: '+91 93456 77889', properties: 1, status: 'Active', joined: '2024-09-10', city: 'Jaipur' },
  { id: 'o8', name: 'Anjali Joshi', email: 'anjali@staynest.in', phone: '+91 94567 88990', properties: 2, status: 'Suspended', joined: '2023-07-30', city: 'Jaipur' },
]

export const students = [
  { id: 's1', name: 'Arjun Patel', email: 'arjun.p@gmail.com', phone: '+91 90000 11111', college: 'MNIT Jaipur', gender: 'Male', status: 'Active', joined: '2025-06-01' },
  { id: 's2', name: 'Isha Reddy', email: 'isha.r@gmail.com', phone: '+91 90000 22222', college: 'University of Rajasthan', gender: 'Female', status: 'Active', joined: '2025-07-12' },
  { id: 's3', name: 'Rohit Kumar', email: 'rohit.k@gmail.com', phone: '+91 90000 33333', college: 'JECRC', gender: 'Male', status: 'Active', joined: '2025-05-20' },
  { id: 's4', name: 'Sneha Iyer', email: 'sneha.i@gmail.com', phone: '+91 90000 44444', college: 'Poornima University', gender: 'Female', status: 'Active', joined: '2025-08-03' },
  { id: 's5', name: 'Devansh Jain', email: 'devansh.j@gmail.com', phone: '+91 90000 55555', college: 'MNIT Jaipur', gender: 'Male', status: 'Active', joined: '2025-04-18' },
  { id: 's6', name: 'Meera Shah', email: 'meera.s@gmail.com', phone: '+91 90000 66666', college: 'IIS University', gender: 'Female', status: 'Active', joined: '2025-09-01' },
  { id: 's7', name: 'Kabir Khan', email: 'kabir.k@gmail.com', phone: '+91 90000 77777', college: 'Manipal Jaipur', gender: 'Male', status: 'Inactive', joined: '2024-12-10' },
  { id: 's8', name: 'Ananya Das', email: 'ananya.d@gmail.com', phone: '+91 90000 88888', college: 'JECRC', gender: 'Female', status: 'Active', joined: '2025-06-22' },
  { id: 's9', name: 'Yash Agarwal', email: 'yash.a@gmail.com', phone: '+91 90000 99999', college: 'SKIT', gender: 'Male', status: 'Active', joined: '2025-07-05' },
  { id: 's10', name: 'Pooja Nair', email: 'pooja.n@gmail.com', phone: '+91 90001 10101', college: 'University of Rajasthan', gender: 'Female', status: 'Active', joined: '2025-08-14' },
  { id: 's11', name: 'Harsh Vardhan', email: 'harsh.v@gmail.com', phone: '+91 90001 20202', college: 'MNIT Jaipur', gender: 'Male', status: 'Active', joined: '2025-03-28' },
  { id: 's12', name: 'Riya Kapoor', email: 'riya.k@gmail.com', phone: '+91 90001 30303', college: 'Poornima University', gender: 'Female', status: 'Active', joined: '2025-09-10' },
  { id: 's13', name: 'Aditya Rao', email: 'aditya.r@gmail.com', phone: '+91 90001 40404', college: 'Manipal Jaipur', gender: 'Male', status: 'Active', joined: '2025-05-02' },
  { id: 's14', name: 'Tanvi Bhatia', email: 'tanvi.b@gmail.com', phone: '+91 90001 50505', college: 'IIS University', gender: 'Female', status: 'Active', joined: '2025-06-18' },
  { id: 's15', name: 'Nikhil Saxena', email: 'nikhil.s@gmail.com', phone: '+91 90001 60606', college: 'SKIT', gender: 'Male', status: 'Active', joined: '2025-07-28' },
  { id: 's16', name: 'Shruti Mishra', email: 'shruti.m@gmail.com', phone: '+91 90001 70707', college: 'JECRC', gender: 'Female', status: 'Active', joined: '2025-08-08' },
  { id: 's17', name: 'Mohit Chauhan', email: 'mohit.c@gmail.com', phone: '+91 90001 80808', college: 'MNIT Jaipur', gender: 'Male', status: 'Active', joined: '2025-04-05' },
  { id: 's18', name: 'Kavya Menon', email: 'kavya.m@gmail.com', phone: '+91 90001 90909', college: 'University of Rajasthan', gender: 'Female', status: 'Active', joined: '2025-09-20' },
  { id: 's19', name: 'Siddharth Roy', email: 'sid.r@gmail.com', phone: '+91 90002 01010', college: 'Manipal Jaipur', gender: 'Male', status: 'Active', joined: '2025-05-15' },
  { id: 's20', name: 'Naina Verma', email: 'naina.v@gmail.com', phone: '+91 90002 11111', college: 'Poornima University', gender: 'Female', status: 'Active', joined: '2025-10-01' },
]

const roomConfigs = {
  single: { type: 'Single Sharing', quantity: 8, available: 2, rent: 12000, deposit: 12000 },
  double: { type: 'Double Sharing', quantity: 20, available: 5, rent: 8500, deposit: 8500 },
  triple: { type: 'Triple Sharing', quantity: 15, available: 4, rent: 6500, deposit: 6500 },
  dorm: { type: 'Dormitory', quantity: 10, available: 3, rent: 4500, deposit: 4500 },
}

export const properties = [
  {
    id: 'p1',
    name: 'Green Nest Boys PG',
    type: 'PG',
    category: 'Boys PG',
    locality: 'Mansarovar',
    city: 'Jaipur',
    address: '42 Sector 5, Near Metro Station, Mansarovar',
    ownerId: 'o1',
    priceFrom: 6500,
    rating: 4.7,
    reviewsCount: 48,
    occupancy: 88,
    status: 'Approved',
    verified: true,
    gender: 'Boys',
    description: 'Premium boys PG with spacious rooms, home-cooked meals and 24×7 security near Mansarovar Metro.',
    amenities: ['Wi-Fi', 'AC', 'Meals', 'Laundry', 'CCTV', 'Power Backup', 'Housekeeping'],
    images: [img('1522700172939-e31fe73f2fb2'), img('1505693416388-ac53ad4b9b00'), img('1522771739844-6a9f6d5f14af'), img('1560448204-e02f11c3d0e2')],
    rooms: [
      { ...roomConfigs.single, rent: 12500, deposit: 12500, available: 1 },
      { ...roomConfigs.double, rent: 9000, deposit: 9000, available: 4 },
      { ...roomConfigs.triple, rent: 7000, deposit: 7000, available: 3 },
    ],
    rules: { entry: '10:00 PM', visitor: 'Allowed till 8 PM', food: 'Veg meals included', cancellation: '7 days notice' },
    lat: 26.8598, lng: 75.7636,
  },
  {
    id: 'p2',
    name: 'Vaishali Heights Co-living',
    type: 'PG',
    category: 'Co-living',
    locality: 'Vaishali Nagar',
    city: 'Jaipur',
    address: '118 Amrapali Circle, Vaishali Nagar',
    ownerId: 'o2',
    priceFrom: 9500,
    rating: 4.8,
    reviewsCount: 62,
    occupancy: 92,
    status: 'Approved',
    verified: true,
    gender: 'Co-living',
    description: 'Modern co-living spaces with private bathrooms, coworking lounge and rooftop café vibes.',
    amenities: ['Wi-Fi', 'AC', 'Meals', 'Laundry', 'Parking', 'CCTV', 'Gym', 'Power Backup'],
    images: [img('1493809842364-78817add7ffb'), img('1502672260266-1c1ef2d93688'), img('1484154218962-a197022b5858'), img('1554995207-c18c20307c22')],
    rooms: [
      { ...roomConfigs.single, rent: 14500, available: 2 },
      { ...roomConfigs.double, rent: 10500, available: 3 },
    ],
    rules: { entry: '11:00 PM', visitor: 'With prior approval', food: 'Flexible meal plans', cancellation: '15 days notice' },
    lat: 26.9118, lng: 75.7397,
  },
  {
    id: 'p3',
    name: 'Malviya Student Hostel',
    type: 'Hostel',
    category: 'Student Hostels',
    locality: 'Malviya Nagar',
    city: 'Jaipur',
    address: '9 JLN Marg Extension, Malviya Nagar',
    ownerId: 'o3',
    priceFrom: 4500,
    rating: 4.4,
    reviewsCount: 91,
    occupancy: 95,
    status: 'Approved',
    verified: true,
    gender: 'Boys',
    description: 'Affordable student hostel with study halls, high-speed Wi-Fi and walking distance to coaching hubs.',
    amenities: ['Wi-Fi', 'Meals', 'Laundry', 'CCTV', 'Power Backup', 'Housekeeping'],
    images: [img('1555854877-91b2b00410f6'), img('1631049307264-da0ec9d70304'), img('1560185893-a55cbc8c57bb'), img('1595526114035-0d45ed16cfbf')],
    rooms: [
      { ...roomConfigs.triple, rent: 5500, available: 2 },
      { ...roomConfigs.dorm, rent: 4500, available: 5 },
    ],
    rules: { entry: '9:30 PM', visitor: 'Not allowed', food: 'Veg & non-veg mess', cancellation: '3 days notice' },
    lat: 26.8540, lng: 75.8245,
  },
  {
    id: 'p4',
    name: 'Jagatpura Pearl Girls PG',
    type: 'PG',
    category: 'Girls PG',
    locality: 'Jagatpura',
    city: 'Jaipur',
    address: 'B-22 Near Jagatpura Flyover',
    ownerId: 'o4',
    priceFrom: 7500,
    rating: 4.9,
    reviewsCount: 37,
    occupancy: 86,
    status: 'Approved',
    verified: true,
    gender: 'Girls',
    description: 'Safe and elegant girls PG with CCTV, biometric entry and nutritious home meals.',
    amenities: ['Wi-Fi', 'AC', 'Meals', 'Laundry', 'CCTV', 'Power Backup', 'Housekeeping', 'Parking'],
    images: [img('1631881357279-ae3d0f3d6b3e'), img('1615874959471-d3c595a97f32'), img('1586023492125-27b2c045efd7'), img('1618221195710-dd6b41faaea6')],
    rooms: [
      { ...roomConfigs.single, rent: 13000, available: 1 },
      { ...roomConfigs.double, rent: 8500, available: 4 },
      { ...roomConfigs.triple, rent: 7500, available: 2 },
    ],
    rules: { entry: '9:00 PM', visitor: 'Female visitors till 7 PM', food: 'Pure veg', cancellation: '10 days notice' },
    lat: 26.8358, lng: 75.8485,
  },
  {
    id: 'p5',
    name: 'Raja Park Elite Stay',
    type: 'PG',
    category: 'Premium PG',
    locality: 'Raja Park',
    city: 'Jaipur',
    address: '15 Gurunanak Pura, Raja Park',
    ownerId: 'o6',
    priceFrom: 11000,
    rating: 4.6,
    reviewsCount: 29,
    occupancy: 78,
    status: 'Approved',
    verified: true,
    gender: 'Boys',
    description: 'Premium furnished PG near Raja Park market with AC rooms and attached washrooms.',
    amenities: ['Wi-Fi', 'AC', 'Meals', 'Laundry', 'Parking', 'CCTV', 'Gym', 'Power Backup'],
    images: [img('1600596542815-ffad4c1539a9'), img('1600210492486-724fe5c67fb0'), img('1600607687939-ce8a6c25118c'), img('1600585154340-be6161a56a0c')],
    rooms: [
      { ...roomConfigs.single, rent: 16000, available: 3 },
      { ...roomConfigs.double, rent: 11000, available: 6 },
    ],
    rules: { entry: '11:30 PM', visitor: 'Allowed with ID', food: 'Multi-cuisine', cancellation: '15 days notice' },
    lat: 26.9012, lng: 75.8267,
  },
  {
    id: 'p6',
    name: 'Gopalpura Budget Nest',
    type: 'PG',
    category: 'Budget Stays',
    locality: 'Gopalpura',
    city: 'Jaipur',
    address: '78 Gopalpura Bypass Road',
    ownerId: 'o7',
    priceFrom: 4000,
    rating: 4.2,
    reviewsCount: 54,
    occupancy: 90,
    status: 'Approved',
    verified: true,
    gender: 'Boys',
    description: 'Budget-friendly stay for students with clean rooms, reliable Wi-Fi and daily meals.',
    amenities: ['Wi-Fi', 'Meals', 'Laundry', 'CCTV', 'Power Backup'],
    images: [img('1522771739844-6a9f6d5f14af'), img('1493663284031-b7e3aeaee6c3'), img('1560185007-5f0bb1866cab'), img('1556912173-3bb4060517a1')],
    rooms: [
      { ...roomConfigs.triple, rent: 5000, available: 3 },
      { ...roomConfigs.dorm, rent: 4000, available: 4 },
    ],
    rules: { entry: '10:00 PM', visitor: 'Not allowed', food: 'Veg mess', cancellation: '5 days notice' },
    lat: 26.8765, lng: 75.7841,
  },
  {
    id: 'p7',
    name: 'Mansarovar Harmony PG',
    type: 'PG',
    category: 'Girls PG',
    locality: 'Mansarovar',
    city: 'Jaipur',
    address: 'Sector 3, Near Shipra Path',
    ownerId: 'o2',
    priceFrom: 8000,
    rating: 4.5,
    reviewsCount: 41,
    occupancy: 84,
    status: 'Approved',
    verified: true,
    gender: 'Girls',
    description: 'Peaceful girls PG with balcony rooms, study desks and weekly housekeeping.',
    amenities: ['Wi-Fi', 'AC', 'Meals', 'Laundry', 'CCTV', 'Housekeeping', 'Power Backup'],
    images: [img('1616594039964-ae9011c336a9'), img('1616486338812-3dadae4b4ace'), img('1615529328331-f8917597711f'), img('1560185127-6ed189bf02cf')],
    rooms: [
      { ...roomConfigs.double, rent: 9000, available: 5 },
      { ...roomConfigs.triple, rent: 8000, available: 2 },
    ],
    rules: { entry: '9:30 PM', visitor: 'Parents only', food: 'Home-style veg', cancellation: '7 days notice' },
    lat: 26.8620, lng: 75.7701,
  },
  {
    id: 'p8',
    name: 'Vaishali Scholar Hostel',
    type: 'Hostel',
    category: 'Student Hostels',
    locality: 'Vaishali Nagar',
    city: 'Jaipur',
    address: 'Near Nursery Circle, Vaishali Nagar',
    ownerId: 'o3',
    priceFrom: 5000,
    rating: 4.3,
    reviewsCount: 76,
    occupancy: 93,
    status: 'Approved',
    verified: true,
    gender: 'Boys',
    description: 'Focused academic hostel with library corner, high-speed internet and weekly tests prep environment.',
    amenities: ['Wi-Fi', 'Meals', 'Laundry', 'CCTV', 'Power Backup', 'Housekeeping'],
    images: [img('1555854877-91b2b00410f6'), img('1595526114035-0d45ed16cfbf'), img('1505693416388-ac53ad4b9b00'), img('1522700172939-e31fe73f2fb2')],
    rooms: [
      { ...roomConfigs.triple, rent: 5800, available: 1 },
      { ...roomConfigs.dorm, rent: 5000, available: 6 },
    ],
    rules: { entry: '9:00 PM', visitor: 'Not allowed', food: 'Mess facility', cancellation: '3 days notice' },
    lat: 26.9150, lng: 75.7420,
  },
  {
    id: 'p9',
    name: 'Malviya Grove Premium',
    type: 'PG',
    category: 'Premium PG',
    locality: 'Malviya Nagar',
    city: 'Jaipur',
    address: 'C-11 Near World Trade Park',
    ownerId: 'o1',
    priceFrom: 12000,
    rating: 4.8,
    reviewsCount: 22,
    occupancy: 72,
    status: 'Pending',
    verified: false,
    gender: 'Co-living',
    description: 'Brand-new premium PG near WTP with smart locks, gym and chef-prepared meals.',
    amenities: ['Wi-Fi', 'AC', 'Meals', 'Laundry', 'Parking', 'CCTV', 'Gym', 'Power Backup', 'Housekeeping'],
    images: [img('1600210492486-724fe5c67fb0'), img('1600596542815-ffad4c1539a9'), img('1600585154340-be6161a56a0c'), img('1554995207-c18c20307c22')],
    rooms: [
      { ...roomConfigs.single, rent: 18000, available: 4 },
      { ...roomConfigs.double, rent: 12000, available: 8 },
    ],
    rules: { entry: '12:00 AM', visitor: 'Allowed with guest log', food: 'Premium meal plans', cancellation: '20 days notice' },
    lat: 26.8505, lng: 75.8050,
  },
  {
    id: 'p10',
    name: 'Jagatpura Aspire Living',
    type: 'PG',
    category: 'Co-living',
    locality: 'Jagatpura',
    city: 'Jaipur',
    address: 'Plot 55 Near Mahima Trinity Mall',
    ownerId: 'o5',
    priceFrom: 8500,
    rating: 4.1,
    reviewsCount: 12,
    occupancy: 65,
    status: 'Pending',
    verified: false,
    gender: 'Co-living',
    description: 'Aspiring professionals and students co-living hub with modular kitchens and lounge.',
    amenities: ['Wi-Fi', 'AC', 'Laundry', 'Parking', 'CCTV', 'Power Backup'],
    images: [img('1493809842364-78817add7ffb'), img('1484154218962-a197022b5858'), img('1502672260266-1c1ef2d93688'), img('1560448204-e02f11c3d0e2')],
    rooms: [
      { ...roomConfigs.single, rent: 14000, available: 5 },
      { ...roomConfigs.double, rent: 8500, available: 7 },
    ],
    rules: { entry: '11:00 PM', visitor: 'Allowed', food: 'Self-cook / optional meals', cancellation: '10 days notice' },
    lat: 26.8400, lng: 75.8520,
  },
  {
    id: 'p11',
    name: 'Raja Park Comfort Hostel',
    type: 'Hostel',
    category: 'Budget Stays',
    locality: 'Raja Park',
    city: 'Jaipur',
    address: 'Near Adarsh Nagar Metro',
    ownerId: 'o8',
    priceFrom: 4200,
    rating: 3.9,
    reviewsCount: 33,
    occupancy: 88,
    status: 'Rejected',
    verified: false,
    gender: 'Boys',
    description: 'Basic hostel accommodation close to public transport and local eateries.',
    amenities: ['Wi-Fi', 'Meals', 'CCTV', 'Power Backup'],
    images: [img('1493663284031-b7e3aeaee6c3'), img('1560185007-5f0bb1866cab'), img('1522771739844-6a9f6d5f14af'), img('1556912173-3bb4060517a1')],
    rooms: [
      { ...roomConfigs.dorm, rent: 4200, available: 8 },
      { ...roomConfigs.triple, rent: 5200, available: 3 },
    ],
    rules: { entry: '10:00 PM', visitor: 'Not allowed', food: 'Mess only', cancellation: '2 days notice' },
    lat: 26.8980, lng: 75.8200,
  },
  {
    id: 'p12',
    name: 'Gopalpura Serene Girls PG',
    type: 'PG',
    category: 'Girls PG',
    locality: 'Gopalpura',
    city: 'Jaipur',
    address: 'Near Triveni Nagar Crossing',
    ownerId: 'o6',
    priceFrom: 7000,
    rating: 4.6,
    reviewsCount: 45,
    occupancy: 81,
    status: 'Approved',
    verified: true,
    gender: 'Girls',
    description: 'Serene girls PG with courtyard seating, AC options and reliable caretaker support.',
    amenities: ['Wi-Fi', 'AC', 'Meals', 'Laundry', 'CCTV', 'Housekeeping', 'Power Backup'],
    images: [img('1615874959471-d3c595a97f32'), img('1631881357279-ae3d0f3d6b3e'), img('1586023492125-27b2c045efd7'), img('1616594039964-ae9011c336a9')],
    rooms: [
      { ...roomConfigs.single, rent: 12000, available: 2 },
      { ...roomConfigs.double, rent: 8000, available: 4 },
      { ...roomConfigs.triple, rent: 7000, available: 3 },
    ],
    rules: { entry: '9:00 PM', visitor: 'Female visitors till 6 PM', food: 'Pure veg', cancellation: '7 days notice' },
    lat: 26.8800, lng: 75.7900,
  },
]

export const bookings = [
  { id: 'b1', propertyId: 'p1', studentId: 's1', roomType: 'Double Sharing', roomNo: '101', bed: 'B', amount: 9000, status: 'Confirmed', checkIn: '2025-08-01', paymentPlan: 'Monthly', paid: true },
  { id: 'b2', propertyId: 'p2', studentId: 's2', roomType: 'Single Sharing', roomNo: '204', bed: 'A', amount: 14500, status: 'Confirmed', checkIn: '2025-09-01', paymentPlan: 'Quarterly', paid: true },
  { id: 'b3', propertyId: 'p4', studentId: 's4', roomType: 'Double Sharing', roomNo: '112', bed: 'A', amount: 8500, status: 'Confirmed', checkIn: '2025-08-15', paymentPlan: 'Monthly', paid: true },
  { id: 'b4', propertyId: 'p3', studentId: 's3', roomType: 'Dormitory', roomNo: 'D2', bed: 'C', amount: 4500, status: 'Pending', checkIn: '2025-11-20', paymentPlan: 'Monthly', paid: false },
  { id: 'b5', propertyId: 'p5', studentId: 's5', roomType: 'Single Sharing', roomNo: '301', bed: 'A', amount: 16000, status: 'Confirmed', checkIn: '2025-07-01', paymentPlan: 'Half-yearly', paid: true },
  { id: 'b6', propertyId: 'p6', studentId: 's9', roomType: 'Triple Sharing', roomNo: '108', bed: 'B', amount: 5000, status: 'Confirmed', checkIn: '2025-08-10', paymentPlan: 'Monthly', paid: true },
  { id: 'b7', propertyId: 'p7', studentId: 's6', roomType: 'Double Sharing', roomNo: '205', bed: 'A', amount: 9000, status: 'Confirmed', checkIn: '2025-09-05', paymentPlan: 'Monthly', paid: true },
  { id: 'b8', propertyId: 'p1', studentId: 's11', roomType: 'Triple Sharing', roomNo: '103', bed: 'C', amount: 7000, status: 'Confirmed', checkIn: '2025-06-15', paymentPlan: 'Quarterly', paid: true },
  { id: 'b9', propertyId: 'p8', studentId: 's13', roomType: 'Dormitory', roomNo: 'D1', bed: 'A', amount: 5000, status: 'Cancelled', checkIn: '2025-10-01', paymentPlan: 'Monthly', paid: false },
  { id: 'b10', propertyId: 'p12', studentId: 's8', roomType: 'Double Sharing', roomNo: '110', bed: 'B', amount: 8000, status: 'Confirmed', checkIn: '2025-08-20', paymentPlan: 'Monthly', paid: true },
  { id: 'b11', propertyId: 'p2', studentId: 's10', roomType: 'Double Sharing', roomNo: '210', bed: 'B', amount: 10500, status: 'Pending', checkIn: '2025-11-25', paymentPlan: 'Monthly', paid: false },
  { id: 'b12', propertyId: 'p5', studentId: 's15', roomType: 'Double Sharing', roomNo: '302', bed: 'A', amount: 11000, status: 'Confirmed', checkIn: '2025-07-20', paymentPlan: 'Monthly', paid: true },
  { id: 'b13', propertyId: 'p4', studentId: 's12', roomType: 'Single Sharing', roomNo: '101', bed: 'A', amount: 13000, status: 'Confirmed', checkIn: '2025-09-12', paymentPlan: 'Yearly', paid: true },
  { id: 'b14', propertyId: 'p3', studentId: 's17', roomType: 'Triple Sharing', roomNo: '215', bed: 'A', amount: 5500, status: 'Confirmed', checkIn: '2025-05-01', paymentPlan: 'Monthly', paid: true },
  { id: 'b15', propertyId: 'p7', studentId: 's14', roomType: 'Triple Sharing', roomNo: '208', bed: 'B', amount: 8000, status: 'Pending', checkIn: '2025-12-01', paymentPlan: 'Monthly', paid: false },
]

export const reviews = [
  { id: 'r1', propertyId: 'p1', studentId: 's1', rating: 5, comment: 'Clean rooms, great food and helpful caretaker. Feels like home!', date: '2025-09-10' },
  { id: 'r2', propertyId: 'p2', studentId: 's2', rating: 5, comment: 'Loved the co-living vibe and coworking lounge. Worth every rupee.', date: '2025-10-02' },
  { id: 'r3', propertyId: 'p4', studentId: 's4', rating: 5, comment: 'Very safe for girls. Biometric entry and quick support response.', date: '2025-09-22' },
  { id: 'r4', propertyId: 'p3', studentId: 's3', rating: 4, comment: 'Good for coaching students. Wi-Fi is strong, mess food is average.', date: '2025-08-18' },
  { id: 'r5', propertyId: 'p5', studentId: 's5', rating: 4, comment: 'Premium interiors and AC rooms. Slightly pricey but excellent.', date: '2025-09-01' },
  { id: 'r6', propertyId: 'p6', studentId: 's9', rating: 4, comment: 'Best budget option near Gopalpura. Rooms are compact but clean.', date: '2025-10-11' },
  { id: 'r7', propertyId: 'p7', studentId: 's6', rating: 5, comment: 'Peaceful locality and tasty home meals. Highly recommend!', date: '2025-10-05' },
  { id: 'r8', propertyId: 'p12', studentId: 's8', rating: 5, comment: 'Caretaker is amazing. Courtyard seating is a bonus.', date: '2025-09-28' },
  { id: 'r9', propertyId: 'p8', studentId: 's13', rating: 4, comment: 'Quiet study environment. Strict timings which actually help.', date: '2025-07-15' },
  { id: 'r10', propertyId: 'p2', studentId: 's10', rating: 5, comment: 'Rooftop café evenings are the best. Super professional management.', date: '2025-10-20' },
]

export const payments = [
  { id: 'pay1', bookingId: 'b1', studentId: 's1', propertyId: 'p1', amount: 9000, method: 'UPI', status: 'Paid', date: '2025-10-01', type: 'Rent' },
  { id: 'pay2', bookingId: 'b2', studentId: 's2', propertyId: 'p2', amount: 43500, method: 'Card', status: 'Paid', date: '2025-09-01', type: 'Quarterly Rent' },
  { id: 'pay3', bookingId: 'b3', studentId: 's4', propertyId: 'p4', amount: 8500, method: 'UPI', status: 'Paid', date: '2025-10-01', type: 'Rent' },
  { id: 'pay4', bookingId: 'b5', studentId: 's5', propertyId: 'p5', amount: 96000, method: 'Net Banking', status: 'Paid', date: '2025-07-01', type: 'Half-yearly Rent' },
  { id: 'pay5', bookingId: 'b4', studentId: 's3', propertyId: 'p3', amount: 4500, method: 'UPI', status: 'Pending', date: '2025-11-01', type: 'Rent' },
  { id: 'pay6', bookingId: 'b6', studentId: 's9', propertyId: 'p6', amount: 5000, method: 'UPI', status: 'Paid', date: '2025-10-01', type: 'Rent' },
  { id: 'pay7', bookingId: 'b7', studentId: 's6', propertyId: 'p7', amount: 9000, method: 'Card', status: 'Paid', date: '2025-10-05', type: 'Rent' },
  { id: 'pay8', bookingId: 'b10', studentId: 's8', propertyId: 'p12', amount: 8000, method: 'UPI', status: 'Overdue', date: '2025-10-01', type: 'Rent' },
  { id: 'pay9', bookingId: 'b11', studentId: 's10', propertyId: 'p2', amount: 10500, method: 'UPI', status: 'Pending', date: '2025-11-01', type: 'Deposit' },
  { id: 'pay10', bookingId: 'b12', studentId: 's15', propertyId: 'p5', amount: 11000, method: 'Net Banking', status: 'Paid', date: '2025-10-01', type: 'Rent' },
]

export const inquiries = [
  { id: 'i1', student: 'Arjun Patel', property: 'Green Nest Boys PG', message: 'Is double sharing available from December?', date: '2025-11-10', status: 'Open' },
  { id: 'i2', student: 'Isha Reddy', property: 'Vaishali Heights Co-living', message: 'Can I schedule a visit this weekend?', date: '2025-11-12', status: 'Open' },
  { id: 'i3', student: 'Rohit Kumar', property: 'Malviya Student Hostel', message: 'Do you provide weekly non-veg meals?', date: '2025-11-08', status: 'Closed' },
  { id: 'i4', student: 'Sneha Iyer', property: 'Jagatpura Pearl Girls PG', message: 'Is laundry included in the rent?', date: '2025-11-14', status: 'Open' },
  { id: 'i5', student: 'Meera Shah', property: 'Mansarovar Harmony PG', message: 'Looking for AC double sharing near Shipra Path.', date: '2025-11-13', status: 'Open' },
]

export const tours = [
  { id: 't1', studentId: 's2', propertyId: 'p2', date: '2025-11-18', time: '11:00 AM', status: 'Scheduled' },
  { id: 't2', studentId: 's4', propertyId: 'p4', date: '2025-11-19', time: '4:00 PM', status: 'Scheduled' },
  { id: 't3', studentId: 's12', propertyId: 'p7', date: '2025-11-17', time: '12:30 PM', status: 'Completed' },
  { id: 't4', studentId: 's18', propertyId: 'p12', date: '2025-11-20', time: '10:00 AM', status: 'Scheduled' },
  { id: 't5', studentId: 's20', propertyId: 'p9', date: '2025-11-21', time: '3:00 PM', status: 'Pending' },
]

export const roomInventory = [
  {
    propertyId: 'p1',
    rooms: [
      { no: '101', beds: [{ id: 'A', status: 'occupied', student: 'Arjun Patel' }, { id: 'B', status: 'available' }, { id: 'C', status: 'occupied', student: 'Harsh Vardhan' }] },
      { no: '102', beds: [{ id: 'A', status: 'available' }, { id: 'B', status: 'reserved', student: 'Pending' }, { id: 'C', status: 'occupied', student: 'Yash Agarwal' }] },
      { no: '103', beds: [{ id: 'A', status: 'occupied', student: 'Mohit Chauhan' }, { id: 'B', status: 'occupied', student: 'Nikhil Saxena' }, { id: 'C', status: 'available' }] },
      { no: '201', beds: [{ id: 'A', status: 'available' }, { id: 'B', status: 'available' }] },
      { no: '202', beds: [{ id: 'A', status: 'occupied', student: 'Siddharth Roy' }, { id: 'B', status: 'reserved' }] },
    ],
  },
  {
    propertyId: 'p2',
    rooms: [
      { no: '204', beds: [{ id: 'A', status: 'occupied', student: 'Isha Reddy' }] },
      { no: '205', beds: [{ id: 'A', status: 'available' }] },
      { no: '210', beds: [{ id: 'A', status: 'occupied', student: 'Guest' }, { id: 'B', status: 'reserved', student: 'Pooja Nair' }] },
      { no: '211', beds: [{ id: 'A', status: 'available' }, { id: 'B', status: 'available' }] },
    ],
  },
]

export const referrals = [
  { id: 'rf1', student: 'Arjun Patel', code: 'ARJUN500', referred: 3, points: 1500, reward: '₹500 wallet credit' },
  { id: 'rf2', student: 'Isha Reddy', code: 'ISHA750', referred: 5, points: 2500, reward: '1 month free Wi-Fi upgrade' },
  { id: 'rf3', student: 'Sneha Iyer', code: 'SNEHA300', referred: 1, points: 500, reward: '₹300 cashback' },
  { id: 'rf4', student: 'Devansh Jain', code: 'DEV900', referred: 4, points: 2000, reward: 'Free laundry month' },
]

export const revenueChart = [
  { month: 'Jun', revenue: 1240000 },
  { month: 'Jul', revenue: 1380000 },
  { month: 'Aug', revenue: 1520000 },
  { month: 'Sep', revenue: 1680000 },
  { month: 'Oct', revenue: 1750000 },
  { month: 'Nov', revenue: 1845000 },
]

export const bookingChart = [
  { month: 'Jun', bookings: 86 },
  { month: 'Jul', bookings: 102 },
  { month: 'Aug', bookings: 118 },
  { month: 'Sep', bookings: 134 },
  { month: 'Oct', bookings: 141 },
  { month: 'Nov', bookings: 156 },
]

export const occupancyChart = [
  { name: 'Mansarovar', value: 88 },
  { name: 'Vaishali', value: 92 },
  { name: 'Malviya', value: 95 },
  { name: 'Jagatpura', value: 80 },
  { name: 'Raja Park', value: 78 },
  { name: 'Gopalpura', value: 86 },
]

export const ownerRevenueChart = [
  { month: 'Jun', revenue: 620000 },
  { month: 'Jul', revenue: 690000 },
  { month: 'Aug', revenue: 740000 },
  { month: 'Sep', revenue: 810000 },
  { month: 'Oct', revenue: 845000 },
  { month: 'Nov', revenue: 875000 },
]

export const ownerOccupancyChart = [
  { month: 'Jun', rate: 72 },
  { month: 'Jul', rate: 76 },
  { month: 'Aug', rate: 80 },
  { month: 'Sep', rate: 83 },
  { month: 'Oct', rate: 85 },
  { month: 'Nov', rate: 82 },
]

export const testimonials = [
  { name: 'Arjun Patel', college: 'MNIT Jaipur', text: 'StayNest made finding a verified PG near campus effortless. Booking took minutes.', avatar: 'AP' },
  { name: 'Isha Reddy', college: 'University of Rajasthan', text: 'Loved the transparent pricing and visit scheduling. The co-living space is fantastic.', avatar: 'IR' },
  { name: 'Sneha Iyer', college: 'Poornima University', text: 'As a girl student, safety filters and verified badges gave me complete peace of mind.', avatar: 'SI' },
]

export const chatbotAnswers = {
  'How can I book a PG?': 'Browse properties, open a listing, pick a room & bed, then complete the demo booking wizard. You will receive a confirmation with Booking ID instantly.',
  'What documents are required?': 'Typically: student ID / college ID, Aadhaar or passport, one passport photo, and a local guardian contact. Owners may request additional KYC.',
  'How can I schedule a visit?': 'On any property page, tap “Schedule a Visit”, choose a date & time slot, and confirm. You will see it under Tour Appointments in your dashboard.',
  'How can I pay my rent?': 'Use UPI, Card, or Net Banking from Payments. This demo simulates payment — no real charges are made.',
  'How can I contact support?': 'Reach StayNest Support at hello@staynest.co or +91 1800-123-7668. You can also open a ticket from Student → Support.',
}

export const notifications = [
  { id: 'n1', title: 'New booking request', body: 'Pooja Nair requested Vaishali Heights', time: '12 min ago', unread: true },
  { id: 'n2', title: 'Property pending approval', body: 'Malviya Grove Premium awaits review', time: '1 hr ago', unread: true },
  { id: 'n3', title: 'Rent reminder', body: 'Rohit Kumar rent due in 3 days', time: '3 hr ago', unread: false },
  { id: 'n4', title: 'New review', body: 'Isha Reddy rated Vaishali Heights 5★', time: 'Yesterday', unread: false },
]

export const currentStudentId = 's1'
export const currentOwnerId = 'o1'

export function formatINR(n) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n)
}

export function getOwner(id) {
  return owners.find((o) => o.id === id)
}

export function getStudent(id) {
  return students.find((s) => s.id === id)
}

export function getProperty(id) {
  return properties.find((p) => p.id === id)
}
