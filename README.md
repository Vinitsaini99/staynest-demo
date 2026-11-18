# Kota Ki Property

A premium real-estate website for buying and selling property in Kota, Rajasthan — built with React 19, Vite, Tailwind CSS v4, React Router and Framer Motion.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # generates sitemap.xml + robots.txt, then builds to /dist
```

Set `VITE_SITE_URL` (and `SITE_URL` for the sitemap script) to your production domain.

## What's included

- Homepage: hero search, 7 categories, featured / recent listings, 12 Kota localities, why-choose, premium showcase, sell form, how it works, reviews, insights
- Listing pages (all / residential / commercial / flats / houses & villas / plots / shops & offices / plots & land) with URL-synced filters, sorting, grid/list view and pagination
- Location pages, property detail pages (gallery + lightbox, specs, amenities, map, enquiry, WhatsApp, similar properties)
- Sell flow with validation and image upload, contact page, login/register, user dashboard (saved, submissions, enquiries, profile)
- Insights articles, privacy and terms templates
- SEO: dynamic titles/meta/Open Graph/JSON-LD, clean URLs, sitemap.xml, robots.txt

## Data & backend

No backend API exists in this project, so `src/services/api.js` is a backend-ready service layer backed by sample data (`src/data/properties.js`, all flagged `demo: true`) and `localStorage`. Replace the function bodies with `fetch()` calls to go live — the UI only depends on their signatures.

- Seller submissions are saved as *Pending Review* and are **not** published automatically.
- Reviews shown on the homepage are only those submitted by visitors; none are pre-written.
- Location/category counts are derived from real data and hidden when zero.

## Before launch — replace placeholders

`src/config/site.js`: phone, WhatsApp number, email, address, hours and social links are placeholders. Replace the sample listings and have the legal pages reviewed by a professional.
