import { Link } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const VARIANTS = {
  primary: 'bg-brand text-white hover:bg-brand-deep shadow-sm',
  saffron: 'bg-saffron text-ink hover:bg-amber-400 shadow-sm',
  dark: 'bg-ink text-white hover:bg-ink-soft',
  outline: 'border-[1.5px] border-line bg-white text-ink hover:border-brand hover:text-brand',
  ghost: 'text-ink hover:bg-brand-tint',
  danger: 'bg-red-600 text-white hover:bg-red-700',
  whatsapp: 'bg-[#1fa855] text-white hover:bg-[#178a45]',
}
const SIZES = {
  sm: 'px-3 py-1.5 text-[0.82rem] rounded-lg',
  md: 'px-4.5 py-2.5 text-sm rounded-xl',
  lg: 'px-6 py-3.5 text-base rounded-xl',
}

export default function Button({ as, to, href, variant = 'primary', size = 'md', loading, className = '', children, ...rest }) {
  const cls = `inline-flex items-center justify-center gap-2 font-bold transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${VARIANTS[variant]} ${SIZES[size]} ${className}`
  if (to) return <Link to={to} className={cls} {...rest}>{children}</Link>
  if (href) return <a href={href} className={cls} {...rest}>{children}</a>
  const Tag = as || 'button'
  return (
    <Tag className={cls} disabled={loading || rest.disabled} {...(Tag === 'button' && !rest.type ? { type: 'button' } : {})} {...rest}>
      {loading && <Loader2 size={16} className="animate-spin" />}
      {children}
    </Tag>
  )
}
