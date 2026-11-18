// Backend-ready service layer.
// There is no backend API in this project yet, so every function below is backed by static sample data
// plus localStorage with a small simulated latency. To go live, replace the bodies with fetch() calls —
// the signatures and return shapes are what the UI depends on.
import { properties } from '../data/properties'
import { locations } from '../data/locations'
import { articles, getArticle } from '../data/articles'
import { applyFilters } from '../utils/filters'
import { store } from '../utils/storage'

const delay = (ms = 350) => new Promise((r) => setTimeout(r, ms + Math.random() * 150))
const uid = (p) => `${p}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`

const KEYS = {
  users: 'kkp_users', session: 'kkp_session', enquiries: 'kkp_enquiries', submissions: 'kkp_submissions',
  messages: 'kkp_messages', reviews: 'kkp_reviews', recent: 'kkp_recent',
}

async function sha256(text) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('')
}

// ---------- Properties ----------
export async function getProperties({ filters, scope } = {}) {
  await delay()
  return filters ? applyFilters(properties, filters, scope) : [...properties]
}

export async function getProperty(slug) {
  await delay(250)
  const p = properties.find((x) => x.slug === slug)
  if (!p) throw new Error('NOT_FOUND')
  return p
}

export async function getSimilar(property, limit = 3) {
  await delay(250)
  return properties
    .filter((p) => p.id !== property.id)
    .map((p) => ({
      p,
      score: (p.category === property.category ? 3 : 0) + (p.segment === property.segment ? 1 : 0) + (p.locality === property.locality ? 2 : 0)
        - Math.abs(p.price - property.price) / Math.max(property.price, 1),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.p)
}

export async function getPropertiesByIds(ids) {
  await delay(200)
  return ids.map((id) => properties.find((p) => p.id === id)).filter(Boolean)
}

// Counts are always derived from real records — never hard-coded.
export function getCounts() {
  const byLocality = {}
  const byCategory = {}
  for (const p of properties) {
    byLocality[p.locality] = (byLocality[p.locality] || 0) + 1
    byCategory[p.category] = (byCategory[p.category] || 0) + 1
  }
  return { byLocality, byCategory, total: properties.length }
}

export const getLocations = () => locations
export const getArticles = () => articles
export { getArticle }

// ---------- Recently viewed ----------
export const getRecent = () => store.get(KEYS.recent, [])
export function pushRecent(id) {
  const next = [id, ...getRecent().filter((x) => x !== id)].slice(0, 8)
  store.set(KEYS.recent, next)
}

// ---------- Enquiries & messages ----------
export async function sendEnquiry(data) {
  await delay(600)
  const item = { id: uid('enq'), createdAt: new Date().toISOString(), ...data }
  store.set(KEYS.enquiries, [item, ...store.get(KEYS.enquiries, [])])
  return item
}

export const getEnquiries = (userId) => store.get(KEYS.enquiries, []).filter((e) => e.userId === userId)

export async function sendContactMessage(data) {
  await delay(600)
  const item = { id: uid('msg'), createdAt: new Date().toISOString(), ...data }
  store.set(KEYS.messages, [item, ...store.get(KEYS.messages, [])])
  return item
}

// ---------- Seller submissions ----------
// Submitted properties are stored as "pending review" and are NOT published to the public listings.
export async function submitProperty(data, userId = null) {
  await delay(900)
  const item = { id: uid('sub'), userId, status: 'Pending Review', createdAt: new Date().toISOString(), ...data }
  const ok = store.set(KEYS.submissions, [item, ...store.get(KEYS.submissions, [])])
  if (!ok) throw new Error('Could not save — your browser storage is full. Try fewer or smaller images.')
  return item
}

export const getSubmissions = (userId) => store.get(KEYS.submissions, []).filter((s) => s.userId === userId)

export function deleteSubmission(id) {
  store.set(KEYS.submissions, store.get(KEYS.submissions, []).filter((s) => s.id !== id))
}

// ---------- Reviews (only real, user-submitted) ----------
export const getReviews = () => store.get(KEYS.reviews, [])
export async function addReview({ name, rating, text }) {
  await delay(500)
  const item = { id: uid('rev'), name, rating, text, createdAt: new Date().toISOString() }
  store.set(KEYS.reviews, [item, ...getReviews()])
  return item
}

// ---------- Auth (mock — passwords hashed client-side, for demo only) ----------
const publicUser = ({ passHash, ...u }) => u

export function getSessionUser() {
  const id = store.get(KEYS.session)
  if (!id) return null
  const u = store.get(KEYS.users, []).find((x) => x.id === id)
  return u ? publicUser(u) : null
}

export async function registerUser({ name, email, phone, password }) {
  await delay(700)
  const users = store.get(KEYS.users, [])
  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) throw new Error('An account with this email already exists.')
  const user = { id: uid('usr'), name, email, phone, passHash: await sha256(password), createdAt: new Date().toISOString() }
  store.set(KEYS.users, [...users, user])
  store.set(KEYS.session, user.id)
  return publicUser(user)
}

export async function loginUser({ email, password }) {
  await delay(600)
  const user = store.get(KEYS.users, []).find((u) => u.email.toLowerCase() === email.toLowerCase())
  if (!user || user.passHash !== (await sha256(password))) throw new Error('Incorrect email or password.')
  store.set(KEYS.session, user.id)
  return publicUser(user)
}

export function logoutUser() {
  store.remove(KEYS.session)
}

export async function updateProfile(id, patch) {
  await delay(400)
  const users = store.get(KEYS.users, [])
  const next = users.map((u) => (u.id === id ? { ...u, ...patch } : u))
  store.set(KEYS.users, next)
  return publicUser(next.find((u) => u.id === id))
}
