import { useId } from 'react'

export function Field({ label, error, hint, required, children, className = '' }) {
  return (
    <div className={className}>
      {label && (
        <label className="mb-1.5 block text-[0.8rem] font-bold text-ink-soft">
          {label}
          {required && <span className="text-red-600"> *</span>}
        </label>
      )}
      {children}
      {hint && !error && <p className="mt-1 text-xs text-muted">{hint}</p>}
      {error && <p className="mt-1 text-xs font-semibold text-red-600" role="alert">{error}</p>}
    </div>
  )
}

export function Input({ label, error, hint, required, className = '', ...props }) {
  const id = useId()
  return (
    <Field label={label} error={error} hint={hint} required={required} className={className}>
      <input id={id} className="field" aria-invalid={!!error} {...props} />
    </Field>
  )
}

export function Textarea({ label, error, hint, required, className = '', rows = 4, ...props }) {
  const id = useId()
  return (
    <Field label={label} error={error} hint={hint} required={required} className={className}>
      <textarea id={id} rows={rows} className="field resize-y" aria-invalid={!!error} {...props} />
    </Field>
  )
}

export function Select({ label, error, hint, required, className = '', options = [], placeholder, ...props }) {
  const id = useId()
  return (
    <Field label={label} error={error} hint={hint} required={required} className={className}>
      <select id={id} className="field" aria-invalid={!!error} {...props}>
        {placeholder !== undefined && <option value="">{placeholder}</option>}
        {options.map((o) => (
          <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>
        ))}
      </select>
    </Field>
  )
}
