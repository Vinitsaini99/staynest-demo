import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

export default function Modal({ open, onClose, title, children, wide = false, side = false }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex" role="dialog" aria-modal="true" aria-label={title}>
          <motion.div className="absolute inset-0 bg-forest/60 backdrop-blur-[2px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.div
            className={
              side
                ? 'relative ml-auto flex h-full w-full max-w-md flex-col bg-ivory shadow-2xl'
                : `relative m-auto flex max-h-[92vh] w-[calc(100%-2rem)] flex-col bg-ivory shadow-2xl ${wide ? 'max-w-3xl' : 'max-w-lg'}`
            }
            initial={side ? { x: '100%' } : { opacity: 0, y: 20 }}
            animate={side ? { x: 0 } : { opacity: 1, y: 0 }}
            exit={side ? { x: '100%' } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-4">
              <h2 className="text-xl text-forest">{title}</h2>
              <button onClick={onClose} aria-label="Close" className="p-1.5 text-forest hover:bg-stone"><X size={20} /></button>
            </div>
            <div className="overflow-y-auto p-6">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
