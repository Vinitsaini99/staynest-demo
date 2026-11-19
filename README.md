# GharKhoj Jaipur

A rental portal for Jaipur: flats, independent houses, commercial offices and sharing rooms. Built with React 19, Vite, Tailwind CSS v4 and React Router.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # generates sitemap.xml + robots.txt, then builds to /dist
```

Set `VITE_SITE_URL` (and `SITE_URL` for the sitemap script) to your production domain.

## Features

- Home: hero search (type, locality, budget, keyword), category tiles, a scrolling row per category, why-us, how it works, locality chips, owner CTA
- `/rentals`: URL-synced filters (type, locality, min/max rent, BHK, furnishing, verified), sorting, pagination, mobile filter drawer
- `/property/:slug`: gallery, key facts, amenities, rent/deposit/maintenance, call + WhatsApp, enquiry form, save and share, similar listings
- Accounts: tenant and owner sign-up with email verification code, login, shortlist, enquiries, profile
- Owner dashboard: add/edit/delete listings with photo upload; every new or edited listing waits for admin approval
- Admin panel (`/admin-login`): approve/reject listings, mark verified/featured, view users, enquiries and contact messages
- Contact, About, Privacy and Terms pages, SEO meta/JSON-LD, sitemap and robots

## Backend

There is no real backend yet. `src/services/api.js` is a backend-ready service layer on top of `localStorage`; replace its function bodies with `fetch()` calls to go live. The UI depends only on the function signatures.

- Demo admin: `admin@gharkhoj.demo` / `Admin@123` (defined in `src/config/site.js`; change before launch).
- Email verification is simulated: the 6-digit code is shown on screen instead of emailed.
- Data is per browser. Passwords are hashed client-side only, which is not real security.
- Sample listings (`src/data/properties.js`) are flagged `demo: true` and use placeholder phone numbers.

## Before launch

Replace the placeholder phone, WhatsApp, email and address in `src/config/site.js`, remove the sample listings, add a real backend, and have the legal pages reviewed.
