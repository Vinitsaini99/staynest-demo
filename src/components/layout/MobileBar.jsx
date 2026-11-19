import { MessageCircle, Phone } from 'lucide-react'
import { SITE, waLink } from '../../config/site'

// Sticky call / WhatsApp bar on small screens.
export default function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-line bg-cream/95 p-2.5 backdrop-blur md:hidden">
      <a href={`tel:${SITE.phoneTel}`} className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink py-3 text-sm font-extrabold text-white">
        <Phone size={17} /> Call us
      </a>
      <a href={waLink()} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1fa855] py-3 text-sm font-extrabold text-white">
        <MessageCircle size={17} /> WhatsApp
      </a>
    </div>
  )
}
