import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

export default function Modal({ open, onClose, title, children, wide }) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-4">
          <motion.button
            type="button"
            aria-label="Close overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-primary/35 backdrop-blur-[2px]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className={`relative z-10 max-h-[90vh] w-full overflow-y-auto rounded-t-2xl border border-border bg-card p-5 sm:rounded-2xl sm:p-6 ${wide ? 'sm:max-w-3xl' : 'sm:max-w-lg'}`}
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="font-heading text-lg font-bold text-text">{title}</h3>
              <button type="button" onClick={onClose} className="rounded-xl p-2 text-muted hover:bg-bg">
                <X size={16} />
              </button>
            </div>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
