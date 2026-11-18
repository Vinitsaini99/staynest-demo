// Evergreen, general-information guides. Not legal or financial advice.
export const articles = [
  {
    slug: 'checklist-for-buying-a-flat-in-kota',
    title: 'A Practical Checklist for Buying a Flat in Kota',
    category: 'Buying Guide',
    readMinutes: 5,
    image: '1560448204-e02f11c3d0e2',
    excerpt: 'From title documents to society dues, the checks that protect first-time buyers before they pay a token amount.',
    body: [
      { h: 'Start with the paperwork', p: ['Ask the seller for the sale deed, the chain of previous ownership documents, the approved map and recent utility bills. A genuine seller will share these without hesitation.', 'Have a local property lawyer review the documents before you commit any money. A small professional fee can prevent a very expensive mistake.'] },
      { h: 'Check approvals and dues', p: ['Confirm that the project or colony is approved by the relevant development authority and that there are no pending dues on electricity, water or society maintenance.', 'For under-construction flats, check the stated possession timeline and how payments are linked to construction milestones.'] },
      { h: 'Visit at different times of day', p: ['Visit the property on a weekday morning and again in the evening. Notice water pressure, noise, parking pressure and the condition of common areas.'] },
      { h: 'Negotiate and document', p: ['Agree on the price, payment schedule and handover date in writing. Keep records of every payment made through a traceable banking channel.'] },
    ],
  },
  {
    slug: 'how-to-choose-the-right-locality-in-kota',
    title: 'How to Choose the Right Locality in Kota',
    category: 'Kota Real Estate',
    readMinutes: 4,
    image: '1519501025264-65ba15a82390',
    excerpt: 'Connectivity, daily conveniences and long-term plans — a simple way to compare localities before you shortlist.',
    body: [
      { h: 'Define your priorities first', p: ['Write down your daily routine: where you or your family study or work, how often you travel and which amenities you use every week. This turns a vague preference into a clear shortlist.'] },
      { h: 'Compare more than price', p: ['Two localities with similar prices can feel very different to live in. Compare road quality, public transport, schools, hospitals and markets within a short drive.'] },
      { h: 'Think about resale and rent', p: ['If you may rent the property out or sell it later, favour areas with consistent demand and good access. Speak to local brokers and neighbours to understand how easily similar homes sell or rent.'] },
    ],
  },
  {
    slug: 'property-investment-basics-in-kota',
    title: 'Property Investment Basics: What to Consider in Kota',
    category: 'Investment',
    readMinutes: 6,
    image: '1486406146926-c627a92ad1ab',
    excerpt: 'A grounded look at rental demand, holding costs and exit planning for residential and commercial property.',
    body: [
      { h: 'Know your goal', p: ['Property can be bought for rental income, long-term appreciation or both. Your goal shapes which type, size and location is sensible.'] },
      { h: 'Understand the full cost', p: ['Beyond the purchase price, factor in registration costs, maintenance, property tax, vacancy periods and repairs. A realistic budget protects your returns.'] },
      { h: 'Plan your exit', p: ['Before you buy, consider who your future buyer or tenant would be. Properties that are easy to understand, well documented and well located are generally easier to exit.'] },
    ],
  },
  {
    slug: 'how-to-list-and-sell-your-property-faster',
    title: 'How to List and Sell Your Property Faster',
    category: 'Selling Guide',
    readMinutes: 4,
    image: '1570129477492-45c003edd2be',
    excerpt: 'Clear photos, honest details and a realistic price — the three things that matter most to serious buyers.',
    body: [
      { h: 'Present it well', p: ['Clean and declutter before you photograph. Natural light, tidy rooms and a few wide shots of the exterior and neighbourhood make a listing far more compelling.'] },
      { h: 'Be accurate and complete', p: ['State the area, floor, facing and possession status clearly. Honest details attract serious buyers and reduce wasted site visits.'] },
      { h: 'Price with reference', p: ['Look at comparable properties in the same locality and be realistic about condition and amenities. A well-priced property usually attracts enquiries sooner.'] },
    ],
  },
]

export const getArticle = (slug) => articles.find((a) => a.slug === slug)
