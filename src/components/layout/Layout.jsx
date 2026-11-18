import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { SITE } from '../../config/site'
import Header from './Header'
import Footer from './Footer'
import MobileBar from './MobileBar'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export default function Layout() {
  const { pathname } = useLocation()
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[200] focus:bg-gold focus:px-4 focus:py-2 focus:text-forest">Skip to content</a>
      <ScrollToTop />
      <Header />
      <motion.main id="main" key={pathname} className="flex-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
        <Outlet />
      </motion.main>
      <Footer />
      <MobileBar />
      <a
        href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent('Hello Kota Ki Property, I would like help with a property in Kota.')}`}
        target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"
        className="fixed bottom-20 right-4 z-30 grid h-12 w-12 place-items-center bg-[#1f7a4d] text-white shadow-xl transition-transform hover:scale-105 lg:bottom-6 lg:right-6"
      >
        <MessageCircle size={22} />
      </a>
    </div>
  )
}
