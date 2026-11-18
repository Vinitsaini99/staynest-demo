import { useEffect } from 'react'
import { SITE } from '../config/site'

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * Dynamic per-page SEO: title, description, canonical, Open Graph / Twitter and JSON-LD.
 * `jsonLd` may be an object or an array of objects.
 */
export function useSeo({ title, description, path = '', image, type = 'website', noindex = false, jsonLd } = {}) {
  const ld = jsonLd ? JSON.stringify(jsonLd) : ''
  useEffect(() => {
    const fullTitle = title ? (title.includes(SITE.name) ? title : `${title} | ${SITE.name}`) : `${SITE.name} – Property in Kota`
    const url = `${SITE.url}${path}`
    const desc = description || SITE.tagline
    const img = image || 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&h=630&q=80'
    document.title = fullTitle
    setMeta('name', 'description', desc)
    setMeta('name', 'robots', noindex ? 'noindex,nofollow' : 'index,follow')
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', desc)
    setMeta('property', 'og:type', type)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:image', img)
    setMeta('property', 'og:site_name', SITE.name)
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', desc)
    setMeta('name', 'twitter:image', img)
    setCanonical(url)

    let script = document.getElementById('page-jsonld')
    if (ld) {
      if (!script) {
        script = document.createElement('script')
        script.id = 'page-jsonld'
        script.type = 'application/ld+json'
        document.head.appendChild(script)
      }
      script.textContent = ld
    } else if (script) {
      script.remove()
    }
    return () => document.getElementById('page-jsonld')?.remove()
  }, [title, description, path, image, type, noindex, ld])
}
