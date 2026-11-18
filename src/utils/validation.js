const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE = /^[6-9]\d{9}$/

export const isEmail = (v) => EMAIL.test(String(v || '').trim())
export const cleanPhone = (v) => String(v || '').replace(/[\s\-()]/g, '').replace(/^(\+91|91|0)(?=\d{10}$)/, '')
export const isPhone = (v) => PHONE.test(cleanPhone(v))

// rules: { field: [ (value, all) => errorMessage | '' , ... ] }
export function validate(values, rules) {
  const errors = {}
  for (const field of Object.keys(rules)) {
    for (const rule of rules[field]) {
      const msg = rule(values[field], values)
      if (msg) {
        errors[field] = msg
        break
      }
    }
  }
  return errors
}

export const required = (label) => (v) => (String(v ?? '').trim() ? '' : `${label} is required`)
export const minLen = (label, n) => (v) => (String(v ?? '').trim().length >= n ? '' : `${label} must be at least ${n} characters`)
export const phoneRule = (v) => (isPhone(v) ? '' : 'Enter a valid 10-digit mobile number')
export const emailRule = (v) => (isEmail(v) ? '' : 'Enter a valid email address')
export const positiveNumber = (label) => (v) => (Number(v) > 0 ? '' : `Enter a valid ${label}`)
