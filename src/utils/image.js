import { unsplash } from '../data/categories'

// Resolves a stored image reference: Unsplash photo id, full URL or uploaded data URL.
export function imgSrc(ref, w = 800, h) {
  if (!ref) return ''
  if (ref.startsWith('data:') || ref.startsWith('http') || ref.startsWith('/')) return ref
  return unsplash(ref, w, h)
}

export function imgSrcSet(ref, widths = [480, 800, 1200]) {
  if (!ref || ref.startsWith('data:') || ref.startsWith('http') || ref.startsWith('/')) return undefined
  return widths.map((w) => `${unsplash(ref, w)} ${w}w`).join(', ')
}

// Downscale an uploaded image to keep localStorage payloads small.
export function compressImage(file, maxSize = 1100, quality = 0.72) {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) return reject(new Error('Only image files are allowed'))
    if (file.size > 8 * 1024 * 1024) return reject(new Error('Image must be smaller than 8 MB'))
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Could not read the image'))
    reader.onload = () => {
      const img = new Image()
      img.onerror = () => reject(new Error('Invalid image file'))
      img.onload = () => {
        const scale = Math.min(1, maxSize / Math.max(img.width, img.height))
        const canvas = document.createElement('canvas')
        canvas.width = Math.round(img.width * scale)
        canvas.height = Math.round(img.height * scale)
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL('image/jpeg', quality))
      }
      img.src = reader.result
    }
    reader.readAsDataURL(file)
  })
}
