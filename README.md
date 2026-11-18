# Kota Ki Property

A clean, minimal website for affordable PGs, hostels and rentals in Kota, Rajasthan (monthly rent, from ₹3,000) — built with React 19, Vite, Tailwind CSS v4, React Router and Framer Motion.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # generates sitemap.xml + robots.txt, then builds to /dist
```

Set `VITE_SITE_URL` (and `SITE_URL` for the sitemap script) to your production domain.

## What's included

- Homepage: hero search, 7 categories (boys/girls PG, hostels, rooms, flats, houses, commercial), featured / recent listings, 12 Kota localities, list-your-property form, how it works, reviews, guides
- Listing pages (all / PG & hostels / boys PG / girls PG / rooms / flats / houses / commercial) with URL-synced filters, sorting, grid/list view and pagination
- Location pages, property detail pages (gallery + lightbox, specs, amenities, map, enquiry, WhatsApp, similar properties)
- Owner listing flow with validation and image upload, contact page, login/register, user dashboard (saved, submissions, enquiries, profile)
- Insights articles, privacy and terms templates
- SEO: dynamic titles/meta/Open Graph/JSON-LD, clean URLs, sitemap.xml, robots.txt

## Data & backend

No backend API exists in this project, so `src/services/api.js` is a backend-ready service layer backed by sample data (`src/data/properties.js`, all flagged `demo: true`) and `localStorage`. Replace the function bodies with `fetch()` calls to go live — the UI only depends on their signatures.

- Owner submissions are saved as *Pending Review* and are **not** published automatically.
- Reviews shown on the homepage are only those submitted by visitors; none are pre-written.
- Location/category counts are derived from real data and hidden when zero.

## Before launch — replace placeholders

`src/config/site.js`: phone, WhatsApp number, email, address, hours and social links are placeholders. Replace the sample listings and have the legal pages reviewed by a professional.
