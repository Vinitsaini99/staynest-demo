import { useId } from 'react'

export function Field({ label, error, hint, required, children, className = '', htmlFor }) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={htmlFor} className="mb-1.5 block text-[0.78rem] font-semibold uppercase tracking-wider text-forest">
          {label}
          {required && <span className="ml-0.5 text-[#b4412f]">*</span>}
        </label>
      )}
      {children}
      {hint && !error && <p className="mt-1 text-xs text-muted">{hint}</p>}
      {error && <p role="alert" className="mt-1 text-xs font-medium text-[#b4412f]">{error}</p>}
    </div>
  )
}

export function Input({ label, error, hint, required, className = '', wrapperClass = '', ...rest }) {
  const id = useId()
  return (
    <Field label={label} error={error} hint={hint} required={required} className={wrapperClass} htmlFor={id}>
      <input id={id} className={`field ${className}`} aria-invalid={!!error} {...rest} />
    </Field>
  )
}

const CARET = "bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2214%22 height=%2214%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23142D27%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:14px] bg-[right_0.85rem_center] bg-no-repeat"

export function Select({ label, error, hint, required, options, placeholder, className = '', wrapperClass = '', ...rest }) {
  const id = useId()
  return (
    <Field label={label} error={error} hint={hint} required={required} className={wrapperClass} htmlFor={id}>
      <select id={id} className={`field appearance-none pr-9 ${CARET} ${className}`} aria-invalid={!!error} {...rest}>
        {placeholder !== undefined && <option value="">{placeholder}</option>}
        {options.map((o) => {
          const v = typeof o === 'object' ? o.value : o
          const l = typeof o === 'object' ? o.label : o
          return <option key={v} value={v}>{l}</option>
        })}
      </select>
    </Field>
  )
}

export function Textarea({ label, error, hint, required, className = '', wrapperClass = '', ...rest }) {
  const id = useId()
  return (
    <Field label={label} error={error} hint={hint} required={required} className={wrapperClass} htmlFor={id}>
      <textarea id={id} className={`field min-h-28 resize-y ${className}`} aria-invalid={!!error} {...rest} />
    </Field>
  )
}
