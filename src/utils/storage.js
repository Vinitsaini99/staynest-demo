export const store = {
  get(key, fallback = null) {
    try {
      const raw = localStorage.getItem(key)
      return raw ? JSON.parse(raw) : fallback
    } catch {
      return fallback
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch {
      return false // quota exceeded or storage disabled
    }
  },
  remove(key) {
    try {
      localStorage.removeItem(key)
    } catch {
      /* ignore */
    }
  },
}
