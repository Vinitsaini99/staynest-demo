// Generates public/sitemap.xml and public/robots.txt from the app's data files.
// Run automatically before `npm run build`. Set SITE_URL to your production domain.
import { writeFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { properties } from '../src/data/properties.js'
import { locations } from '../src/data/locations.js'
import { articles } from '../src/data/articles.js'
import { listingPages } from '../src/data/categories.js'

const SITE = (process.env.SITE_URL || process.env.VITE_SITE_URL || 'https://kotakiproperty.com').replace(/\/$/, '')
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const today = new Date().toISOString().slice(0, 10)

const urls = [
  { loc: '/', priority: '1.0', changefreq: 'daily' },
  ...listingPages.map((p) => ({ loc: p.path, priority: '0.9', changefreq: 'daily' })),
  { loc: '/locations', priority: '0.8', changefreq: 'weekly' },
  ...locations.map((l) => ({ loc: `/locations/${l.slug}`, priority: '0.8', changefreq: 'daily' })),
  ...properties.map((p) => ({ loc: `/property/${p.slug}`, priority: '0.7', changefreq: 'weekly', lastmod: p.listedAt.slice(0, 10) })),
  { loc: '/sell-your-property', priority: '0.8', changefreq: 'monthly' },
  { loc: '/insights', priority: '0.6', changefreq: 'weekly' },
  ...articles.map((a) => ({ loc: `/insights/${a.slug}`, priority: '0.5', changefreq: 'monthly' })),
  { loc: '/about-us', priority: '0.5', changefreq: 'monthly' },
  { loc: '/contact-us', priority: '0.5', changefreq: 'monthly' },
  { loc: '/privacy-policy', priority: '0.2', changefreq: 'yearly' },
  { loc: '/terms-and-conditions', priority: '0.2', changefreq: 'yearly' },
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${SITE}${u.loc}</loc><lastmod>${u.lastmod || today}</lastmod><changefreq>${u.changefreq}</changefreq><priority>${u.priority}</priority></url>`).join('\n')}
</urlset>
`

const robots = `User-agent: *
Allow: /
Disallow: /dashboard
Disallow: /login
Disallow: /register

Sitemap: ${SITE}/sitemap.xml
`

mkdirSync(resolve(root, 'public'), { recursive: true })
writeFileSync(resolve(root, 'public/sitemap.xml'), xml)
writeFileSync(resolve(root, 'public/robots.txt'), robots)
console.log(`Sitemap: ${urls.length} URLs -> public/sitemap.xml (${SITE})`)
