// Mock backend on top of localStorage. Every function is async and returns plain data,
// so swapping in a real REST API later only means rewriting this file.
import { store } from '../utils/storage'
import { seedProperties } from '../data/properties'
import { applyFilters, paginate } from '../utils/filters'
import { slugify } from '../utils/format'
import { DEMO_ADMIN } from '../config/site'

const K = {
  users: 'gk_users',
  session: 'gk_session',
  listings: 'gk_listings',
  seeded: 'gk_seeded_v2',
  enquiries: 'gk_enquiries',
  messages: 'gk_messages',
  saved: 'gk_saved',
}

const wait = (ms = 120) => new Promise((r) => setTimeout(r, ms))
const uid = (p) => `${p}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`
const fail = (msg) => {
  throw new Error(msg)
}

async function sha(text) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`gk::${text}`))
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

const publicUser = (u) => (u ? { id: u.id, name: u.name, email: u.email, phone: u.phone, role: u.role, createdAt: u.createdAt } : null)

// ---------- storage helpers
function listings() {
  if (!store.get(K.seeded)) {
    store.set(K.listings, seedProperties)
    store.set(K.seeded, true)
  }
  return store.get(K.listings, [])
}
const saveListings = (l) => store.set(K.listings, l) || fail('Storage is full. Try removing some photos.')

async function users() {
  let list = store.get(K.users, [])
  if (!list.some((u) => u.role === 'admin')) {
    list = [
      ...list,
      {
        id: 'u-admin', name: DEMO_ADMIN.name, email: DEMO_ADMIN.email, phone: '', role: 'admin',
        verified: true, hash: await sha(DEMO_ADMIN.password), createdAt: new Date().toISOString(),
      },
    ]
    store.set(K.users, list)
  }
  return list
}
const saveUsers = (l) => store.set(K.users, l)

async function sessionUser() {
  const id = store.get(K.session)
  if (!id) return null
  return (await users()).find((u) => u.id === id) || null
}

async function requireRole(...roles) {
  const u = await sessionUser()
  if (!u) fail('Please log in to continue')
  if (!roles.includes(u.role)) fail('You do not have access to this action')
  return u
}

const newest = (a, b) => new Date(b.listedAt) - new Date(a.listedAt)

// ---------- public listings
export async function searchProperties(filters) {
  await wait()
  const rows = applyFilters(listings().filter((p) => p.status === 'approved'), filters)
  return paginate(rows, filters.page)
}

export async function getProperty(slug) {
  await wait(80)
  const p = listings().find((x) => x.slug === slug)
  if (!p) return null
  if (p.status !== 'approved') {
    const u = await sessionUser()
    if (!u || (u.role !== 'admin' && u.id !== p.ownerId)) return null
  }
  return p
}

export async function getCategoryRow(category, limit = 8) {
  await wait(60)
  return listings()
    .filter((p) => p.status === 'approved' && p.category === category)
    .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || newest(a, b))
    .slice(0, limit)
}

export async function similarProperties(p, limit = 4) {
  await wait(60)
  return listings()
    .filter((x) => x.status === 'approved' && x.id !== p.id && x.category === p.category)
    .map((x) => ({ x, score: (x.locality === p.locality ? 2 : 0) + (Math.abs(x.rent - p.rent) < p.rent * 0.35 ? 1 : 0) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.x)
}

export async function getSummary() {
  await wait(40)
  const approved = listings().filter((p) => p.status === 'approved')
  const byCategory = {}
  const byLocality = {}
  for (const p of approved) {
    byCategory[p.category] = (byCategory[p.category] || 0) + 1
    byLocality[p.locality] = (byLocality[p.locality] || 0) + 1
  }
  return { total: approved.length, byCategory, byLocality }
}

export async function getPropertiesByIds(ids) {
  await wait(60)
  const map = new Map(listings().map((p) => [p.id, p]))
  return ids.map((id) => map.get(id)).filter((p) => p && p.status === 'approved')
}

// ---------- auth
export async function register({ name, email, phone, password, role }) {
  await wait()
  const mail = email.trim().toLowerCase()
  const list = await users()
  if (list.some((u) => u.email === mail)) fail('An account with this email already exists')
  if (!['tenant', 'seller'].includes(role)) fail('Choose a valid account type')
  const code = String(Math.floor(100000 + Math.random() * 900000))
  list.push({
    id: uid('u'), name: name.trim(), email: mail, phone: phone.trim(), role, verified: false,
    hash: await sha(password), code, createdAt: new Date().toISOString(),
  })
  saveUsers(list)
  // With a real backend this code would be emailed. Here we hand it back so the demo can show it.
  return { email: mail, demoCode: code }
}

export async function resendCode(email) {
  await wait()
  const list = await users()
  const u = list.find((x) => x.email === email.trim().toLowerCase())
  if (!u) fail('Account not found')
  if (u.verified) fail('This email is already verified')
  u.code = String(Math.floor(100000 + Math.random() * 900000))
  saveUsers(list)
  return { demoCode: u.code }
}

export async function verifyEmail(email, code) {
  await wait()
  const list = await users()
  const u = list.find((x) => x.email === email.trim().toLowerCase())
  if (!u) fail('Account not found')
  if (u.verified) return publicUser(u)
  if (String(code).trim() !== u.code) fail('That code is not correct')
  u.verified = true
  delete u.code
  saveUsers(list)
  store.set(K.session, u.id)
  return publicUser(u)
}

export async function login(email, password, { adminOnly = false } = {}) {
  await wait()
  const u = (await users()).find((x) => x.email === email.trim().toLowerCase())
  if (!u || u.hash !== (await sha(password))) fail('Incorrect email or password')
  if (adminOnly && u.role !== 'admin') fail('This account is not an administrator')
  if (!adminOnly && u.role === 'admin') fail('Admins sign in from the admin login page')
  if (!u.verified) {
    const err = new Error('Please verify your email first')
    err.code = 'UNVERIFIED'
    err.email = u.email
    throw err
  }
  store.set(K.session, u.id)
  return publicUser(u)
}

export async function logout() {
  store.remove(K.session)
}

export async function getCurrentUser() {
  return publicUser(await sessionUser())
}

export async function updateProfile({ name, phone }) {
  const u = await requireRole('tenant', 'seller', 'admin')
  const list = await users()
  const me = list.find((x) => x.id === u.id)
  me.name = name.trim()
  me.phone = phone.trim()
  saveUsers(list)
  return publicUser(me)
}

// ---------- saved properties (guests are stored under "guest" and merged on login)
const savedKey = (u) => (u ? u.id : 'guest')
export async function getSavedIds() {
  const u = await sessionUser()
  const all = store.get(K.saved, {})
  if (u && all.guest?.length) {
    all[u.id] = [...new Set([...(all[u.id] || []), ...all.guest])]
    delete all.guest
    store.set(K.saved, all)
  }
  return all[savedKey(u)] || []
}

export async function toggleSaved(id) {
  const u = await sessionUser()
  const all = store.get(K.saved, {})
  const key = savedKey(u)
  const cur = all[key] || []
  all[key] = cur.includes(id) ? cur.filter((x) => x !== id) : [id, ...cur]
  store.set(K.saved, all)
  return all[key]
}

// ---------- enquiries & messages
export async function createEnquiry({ propertyId, name, phone, email, message }) {
  await wait()
  const p = listings().find((x) => x.id === propertyId)
  if (!p) fail('This listing is no longer available')
  const u = await sessionUser()
  const list = store.get(K.enquiries, [])
  list.unshift({
    id: uid('q'), propertyId, propertyTitle: p.title, propertySlug: p.slug, ownerId: p.ownerId || null,
    userId: u?.id || null, name: name.trim(), phone: phone.trim(), email: email.trim().toLowerCase(),
    message: message.trim(), createdAt: new Date().toISOString(),
  })
  store.set(K.enquiries, list)
}

export async function myEnquiries() {
  const u = await requireRole('tenant', 'seller')
  await wait(60)
  return store.get(K.enquiries, []).filter((q) => q.userId === u.id || q.email === u.email)
}

export async function enquiriesForMyListings() {
  const u = await requireRole('seller')
  await wait(60)
  return store.get(K.enquiries, []).filter((q) => q.ownerId === u.id)
}

export async function sendContactMessage({ name, email, phone, message }) {
  await wait()
  const list = store.get(K.messages, [])
  list.unshift({ id: uid('m'), name: name.trim(), email: email.trim(), phone: phone.trim(), message: message.trim(), createdAt: new Date().toISOString() })
  store.set(K.messages, list)
}

// ---------- seller
export async function myListings() {
  const u = await requireRole('seller')
  await wait(60)
  return listings().filter((p) => p.ownerId === u.id).sort(newest)
}

function normaliseListing(input, owner, existing) {
  const title = input.title.trim()
  const base = existing?.slug && existing.title === title ? existing.slug : `${slugify(title)}-${slugify(input.locality)}`
  const taken = new Set(listings().filter((p) => p.id !== existing?.id).map((p) => p.slug))
  let slug = base
  for (let i = 2; taken.has(slug); i += 1) slug = `${base}-${i}`
  return {
    ...(existing || {}),
    id: existing?.id || uid('gk'),
    slug,
    title,
    category: input.category,
    locality: input.locality,
    address: input.address.trim(),
    rent: Number(input.rent),
    deposit: Number(input.deposit) || 0,
    maintenance: Number(input.maintenance) || 0,
    bhk: input.bhk ? Number(input.bhk) : null,
    area: input.area ? Number(input.area) : null,
    bathrooms: input.bathrooms ? Number(input.bathrooms) : 1,
    floor: (input.floor || '').trim(),
    furnishing: input.furnishing,
    availableFrom: (input.availableFrom || 'Immediately').trim(),
    tenants: (input.tenants || '').trim(),
    amenities: input.amenities || [],
    description: input.description.trim(),
    images: input.images || [],
    ownerId: owner.id,
    ownerName: input.ownerName?.trim() || owner.name,
    ownerPhone: input.ownerPhone?.trim() || owner.phone,
    verified: existing?.verified || false,
    featured: existing?.featured || false,
    demo: false,
    status: 'pending', // every new or edited listing goes back for admin approval
    listedAt: existing?.listedAt || new Date().toISOString(),
  }
}

export async function createListing(input) {
  const u = await requireRole('seller')
  await wait()
  const l = listings()
  const item = normaliseListing(input, u)
  l.unshift(item)
  saveListings(l)
  return item
}

export async function updateListing(id, input) {
  const u = await requireRole('seller')
  await wait()
  const l = listings()
  const i = l.findIndex((p) => p.id === id && p.ownerId === u.id)
  if (i < 0) fail('Listing not found')
  l[i] = normaliseListing(input, u, l[i])
  saveListings(l)
  return l[i]
}

export async function deleteMyListing(id) {
  const u = await requireRole('seller')
  const l = listings()
  const next = l.filter((p) => !(p.id === id && p.ownerId === u.id))
  if (next.length === l.length) fail('Listing not found')
  saveListings(next)
}

export async function getMyListing(id) {
  const u = await requireRole('seller')
  return listings().find((p) => p.id === id && p.ownerId === u.id) || null
}

// ---------- admin
export async function adminOverview() {
  await requireRole('admin')
  await wait(60)
  const l = listings()
  const us = await users()
  return {
    listings: l.length,
    pending: l.filter((p) => p.status === 'pending').length,
    approved: l.filter((p) => p.status === 'approved').length,
    rejected: l.filter((p) => p.status === 'rejected').length,
    users: us.filter((u) => u.role !== 'admin').length,
    sellers: us.filter((u) => u.role === 'seller').length,
    enquiries: store.get(K.enquiries, []).length,
    messages: store.get(K.messages, []).length,
  }
}

export async function adminListings() {
  await requireRole('admin')
  await wait(60)
  return [...listings()].sort(newest)
}

export async function adminSetStatus(id, status, extra = {}) {
  await requireRole('admin')
  const l = listings()
  const p = l.find((x) => x.id === id)
  if (!p) fail('Listing not found')
  p.status = status
  Object.assign(p, extra)
  saveListings(l)
}

export async function adminDeleteListing(id) {
  await requireRole('admin')
  saveListings(listings().filter((p) => p.id !== id))
}

export async function adminUsers() {
  await requireRole('admin')
  return (await users()).filter((u) => u.role !== 'admin').map(publicUser)
}

export async function adminEnquiries() {
  await requireRole('admin')
  return store.get(K.enquiries, [])
}

export async function adminMessages() {
  await requireRole('admin')
  return store.get(K.messages, [])
}
