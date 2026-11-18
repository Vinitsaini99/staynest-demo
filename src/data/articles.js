// Evergreen, general-information guides. Not legal or financial advice.
export const articles = [
  {
    slug: 'how-to-choose-a-pg-in-kota',
    title: 'How to Choose the Right PG in Kota',
    category: 'PG Guide',
    readMinutes: 5,
    image: '1555854877-bab0e564b8d5',
    excerpt: 'Distance, food, safety and the real monthly cost — what to check before you pay for a PG.',
    body: [
      { h: 'Start with distance and routine', p: ['Shortlist PGs within a comfortable walk or short ride of your coaching institute or workplace. A short commute saves both money and study time.', 'Visit at different times of day to see how the place feels when it is busy and when it is quiet.'] },
      { h: 'Understand what the rent includes', p: ['Ask whether meals, Wi-Fi, electricity, laundry and housekeeping are included. Two PGs with the same rent can cost very different amounts once extras are added.', 'Compare single, double and triple sharing rates, and choose the sharing level that suits your budget and study habits.'] },
      { h: 'Check safety and rules', p: ['Look for CCTV, a caretaker or warden, and clear entry timings. For girls PGs, ask about visitor rules and night-time security.', 'Read the house rules before you pay so there are no surprises later.'] },
      { h: 'Be clear on deposit and notice', p: ['Ask for the security deposit amount, the notice period and the refund timeline in writing. Keep a receipt for every payment you make.'] },
    ],
  },
  {
    slug: 'checklist-before-renting-a-flat-in-kota',
    title: 'A Simple Checklist Before Renting a Flat in Kota',
    category: 'Renting Guide',
    readMinutes: 5,
    image: '1560448204-e02f11c3d0e2',
    excerpt: 'Inspect the flat, understand the costs and put everything in writing before you move in.',
    body: [
      { h: 'Inspect the basics', p: ['Check water supply, electricity, plumbing, windows, locks and ventilation. Take photos of any damage so it is on record before you move in.'] },
      { h: 'Know the full monthly cost', p: ['Along with rent, ask about maintenance charges, electricity and water billing, and parking. Divide the total by the number of people sharing to see your real cost.'] },
      { h: 'Get a written rent agreement', p: ['A written agreement should state the rent, security deposit, notice period, rent increase terms and who pays for repairs. Both sides should sign and keep a copy.', 'If you are unsure about any clause, ask someone you trust to read it with you before signing.'] },
      { h: 'Verify the owner', p: ['Ask to see an ID and proof of ownership or authority to rent the property. Pay the deposit through a traceable method and keep the receipt.'] },
    ],
  },
  {
    slug: 'understanding-rent-deposit-and-agreements',
    title: 'Rent, Deposit and Agreements: The Basics',
    category: 'Renting Guide',
    readMinutes: 4,
    image: '1486406146926-c627a92ad1ab',
    excerpt: 'What a security deposit is, how refunds usually work and what to keep in writing.',
    body: [
      { h: 'What a security deposit covers', p: ['A deposit is held by the owner as security against unpaid rent or damage. It is normally returned when you leave, after any valid deductions.'] },
      { h: 'Get the refund terms in writing', p: ['Agree in advance on how long the refund takes and what can be deducted. Photograph the room on move-in and move-out to avoid disputes.'] },
      { h: 'Keep records', p: ['Keep copies of the agreement, ID proofs, payment receipts and any messages about repairs or changes. Good records protect both tenant and owner.'] },
    ],
  },
  {
    slug: 'how-to-list-your-pg-or-rental-and-get-tenants',
    title: 'How to List Your PG or Rental and Get Tenants Faster',
    category: 'For Owners',
    readMinutes: 4,
    image: '1522771739844-6a9f6d5f14af',
    excerpt: 'Clear photos, honest details and a fair monthly rent are what tenants respond to most.',
    body: [
      { h: 'Show the place honestly', p: ['Clean and tidy the room before taking photos. Use natural light and include the bed, study area, bathroom, kitchen and building entrance.'] },
      { h: 'Be clear about what is included', p: ['State the rent per sharing option, deposit, meals, Wi-Fi, electricity and any rules. Clear details reduce wasted enquiries and build trust.'] },
      { h: 'Price fairly for the area', p: ['Look at similar PGs and rentals in the same locality and set a rent that matches your facilities. A fair price usually brings enquiries sooner.'] },
      { h: 'Respond quickly', p: ['Tenants often shortlist several places the same day. A quick, polite reply and an easy visit schedule make a real difference.'] },
    ],
  },
]

export const getArticle = (slug) => articles.find((a) => a.slug === slug)
