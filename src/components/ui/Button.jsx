import { Link } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const base = 'btn-press inline-flex items-center justify-center gap-2 font-semibold tracking-wide whitespace-nowrap rounded-[2px] disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold'
const variants = {
  primary: 'bg-forest text-ivory hover:bg-forest-soft',
  gold: 'bg-gold text-forest hover:bg-[#e0b574]',
  outline: 'border border-forest text-forest hover:bg-forest hover:text-ivory',
  outlineLight: 'border border-ivory/50 text-ivory hover:bg-ivory hover:text-forest',
  ghost: 'text-forest hover:bg-stone',
  whatsapp: 'bg-[#1f7a4d] text-white hover:bg-[#186a41]',
}
const sizes = { sm: 'text-xs px-3.5 py-2', md: 'text-sm px-5 py-3', lg: 'text-sm px-7 py-4' }

export const btnClass = (variant = 'primary', size = 'md', extra = '') => `${base} ${variants[variant]} ${sizes[size]} ${extra}`

export function Button({ variant, size, loading, className = '', children, disabled, ...rest }) {
  return (
    <button className={btnClass(variant, size, className)} disabled={disabled || loading} {...rest}>
      {loading && <Loader2 size={16} className="animate-spin" />}
      {children}
    </button>
  )
}

export function LinkButton({ to, href, variant, size, className = '', children, ...rest }) {
  const cls = btnClass(variant, size, className)
  if (href) return <a href={href} className={cls} {...rest}>{children}</a>
  return <Link to={to} className={cls} {...rest}>{children}</Link>
}
