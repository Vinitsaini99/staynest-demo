// Generates public/sitemap.xml and public/robots.txt from the app's data files.
// Run automatically before `npm run build`. Set SITE_URL to your production domain.
import { writeFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { seedProperties } from '../src/data/properties.js'
import { localities } from '../src/data/localities.js'
import { categories } from '../src/data/categories.js'

const SITE = (process.env.SITE_URL || process.env.VITE_SITE_URL || 'https://gharkhoj-jaipur.vercel.app').replace(/\/$/, '')
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const today = new Date().toISOString().slice(0, 10)

const urls = [
  { loc: '/', priority: '1.0', changefreq: 'daily' },
  { loc: '/rentals', priority: '0.9', changefreq: 'daily' },
  ...categories.map((c) => ({ loc: `/rentals?category=${c.slug}`, priority: '0.9', changefreq: 'daily' })),
  ...localities.map((l) => ({ loc: `/rentals?locality=${encodeURIComponent(l.name)}`, priority: '0.7', changefreq: 'daily' })),
  ...seedProperties.map((p) => ({ loc: `/property/${p.slug}`, priority: '0.6', changefreq: 'weekly', lastmod: p.listedAt.slice(0, 10) })),
  { loc: '/about', priority: '0.5', changefreq: 'monthly' },
  { loc: '/contact', priority: '0.5', changefreq: 'monthly' },
  { loc: '/privacy', priority: '0.2', changefreq: 'yearly' },
  { loc: '/terms', priority: '0.2', changefreq: 'yearly' },
]

const esc = (s) => s.replace(/&/g, '&amp;')

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${esc(SITE + u.loc)}</loc><lastmod>${u.lastmod || today}</lastmod><changefreq>${u.changefreq}</changefreq><priority>${u.priority}</priority></url>`).join('\n')}
</urlset>
`

const robots = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /admin-login
Disallow: /seller
Disallow: /user
Disallow: /login
Disallow: /register
Disallow: /verify-email

Sitemap: ${SITE}/sitemap.xml
`

mkdirSync(resolve(root, 'public'), { recursive: true })
writeFileSync(resolve(root, 'public/sitemap.xml'), xml)
writeFileSync(resolve(root, 'public/robots.txt'), robots)
console.log(`Sitemap: ${urls.length} URLs -> public/sitemap.xml (${SITE})`)
