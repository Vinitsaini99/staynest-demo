export const locations = [
  { slug: 'talwandi', name: 'Talwandi', blurb: 'A busy, well-connected neighbourhood known for its education ecosystem and everyday convenience.', query: 'Talwandi, Kota, Rajasthan' },
  { slug: 'mahaveer-nagar', name: 'Mahaveer Nagar', blurb: 'Established residential colony with markets, schools and quick access to the city centre.', query: 'Mahaveer Nagar, Kota, Rajasthan' },
  { slug: 'kunhari', name: 'Kunhari', blurb: 'Fast-growing pocket with newer apartments, hostels and developing infrastructure.', query: 'Kunhari, Kota, Rajasthan' },
  { slug: 'vigyan-nagar', name: 'Vigyan Nagar', blurb: 'Planned colony popular with families and students for its organised layout.', query: 'Vigyan Nagar, Kota, Rajasthan' },
  { slug: 'dadabari', name: 'Dadabari', blurb: 'Central residential and commercial hub with strong day-to-day connectivity.', query: 'Dadabari, Kota, Rajasthan' },
  { slug: 'indra-vihar', name: 'Indra Vihar', blurb: 'Residential area close to major institutes, with a steady demand for homes and rentals.', query: 'Indra Vihar, Kota, Rajasthan' },
  { slug: 'rajeev-gandhi-nagar', name: 'Rajeev Gandhi Nagar', blurb: 'Active neighbourhood with a mix of apartments, houses and nearby commercial spaces.', query: 'Rajeev Gandhi Nagar, Kota, Rajasthan' },
  { slug: 'rangbari', name: 'Rangbari', blurb: 'Well-settled locality with older homes, local markets and good road access.', query: 'Rangbari, Kota, Rajasthan' },
  { slug: 'borkhera', name: 'Borkhera', blurb: 'Residential and commercial locality offering a wide range of budgets.', query: 'Borkhera, Kota, Rajasthan' },
  { slug: 'landmark-city', name: 'Landmark City', blurb: 'Township-style living with planned layouts and modern residences.', query: 'Landmark City, Kota, Rajasthan' },
  { slug: 'jawahar-nagar', name: 'Jawahar Nagar', blurb: 'Popular residential belt with easy access to schools, hospitals and transport.', query: 'Jawahar Nagar, Kota, Rajasthan' },
  { slug: 'gumanpura', name: 'Gumanpura', blurb: 'A long-established area with a strong mix of retail, offices and residences.', query: 'Gumanpura, Kota, Rajasthan' },
]

export const getLocation = (slug) => locations.find((l) => l.slug === slug)
