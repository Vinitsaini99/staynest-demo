import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import DemoBanner from './components/common/DemoBanner'
import Chatbot from './components/common/Chatbot'
import StudentLayout from './components/layout/StudentLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminProperties from './pages/admin/AdminProperties'
import {
  AdminAnalytics, AdminBookings, AdminInquiries, AdminOwners, AdminPayments,
  AdminReferrals, AdminReviews, AdminRooms, AdminSettings, AdminStudents, AdminTours,
} from './pages/admin/AdminListPages'
import OwnerDashboard from './pages/owner/OwnerDashboard'
import OwnerRooms from './pages/owner/OwnerRooms'
import {
  OwnerBeds, OwnerBookings, OwnerExpenses, OwnerMaintenance, OwnerPayments,
  OwnerProfile, OwnerProperties, OwnerReports, OwnerReviews, OwnerStudents,
} from './pages/owner/OwnerPages'
import StudentHome from './pages/student/StudentHome'
import StudentSearch from './pages/student/StudentSearch'
import PropertyDetail from './pages/student/PropertyDetail'
import BookingWizard from './pages/student/BookingWizard'
import StudentDashboard from './pages/student/StudentDashboard'
import StudentPayments from './pages/student/StudentPayments'
import StudentFavourites from './pages/student/StudentFavourites'
import { PageSkeleton } from './components/common/Skeleton'
import { useApp } from './context/AppContext'

function Page({ children }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}>
      {children}
    </motion.div>
  )
}

export default function App() {
  const location = useLocation()
  const { ready } = useApp()

  if (!ready) return <PageSkeleton />

  return (
    <>
      <DemoBanner />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Navigate to="/student/home" replace />} />

          <Route path="/admin/dashboard" element={<Page><AdminDashboard /></Page>} />
          <Route path="/admin/properties" element={<Page><AdminProperties /></Page>} />
          <Route path="/admin/owners" element={<Page><AdminOwners /></Page>} />
          <Route path="/admin/students" element={<Page><AdminStudents /></Page>} />
          <Route path="/admin/bookings" element={<Page><AdminBookings /></Page>} />
          <Route path="/admin/rooms" element={<Page><AdminRooms /></Page>} />
          <Route path="/admin/payments" element={<Page><AdminPayments /></Page>} />
          <Route path="/admin/inquiries" element={<Page><AdminInquiries /></Page>} />
          <Route path="/admin/tours" element={<Page><AdminTours /></Page>} />
          <Route path="/admin/reviews" element={<Page><AdminReviews /></Page>} />
          <Route path="/admin/referrals" element={<Page><AdminReferrals /></Page>} />
          <Route path="/admin/analytics" element={<Page><AdminAnalytics /></Page>} />
          <Route path="/admin/settings" element={<Page><AdminSettings /></Page>} />

          <Route path="/owner/dashboard" element={<Page><OwnerDashboard /></Page>} />
          <Route path="/owner/properties" element={<Page><OwnerProperties /></Page>} />
          <Route path="/owner/rooms" element={<Page><OwnerRooms /></Page>} />
          <Route path="/owner/beds" element={<Page><OwnerBeds /></Page>} />
          <Route path="/owner/bookings" element={<Page><OwnerBookings /></Page>} />
          <Route path="/owner/students" element={<Page><OwnerStudents /></Page>} />
          <Route path="/owner/payments" element={<Page><OwnerPayments /></Page>} />
          <Route path="/owner/expenses" element={<Page><OwnerExpenses /></Page>} />
          <Route path="/owner/reviews" element={<Page><OwnerReviews /></Page>} />
          <Route path="/owner/maintenance" element={<Page><OwnerMaintenance /></Page>} />
          <Route path="/owner/reports" element={<Page><OwnerReports /></Page>} />
          <Route path="/owner/profile" element={<Page><OwnerProfile /></Page>} />

          <Route path="/student" element={<StudentLayout />}>
            <Route path="home" element={<Page><StudentHome /></Page>} />
            <Route path="search" element={<Page><StudentSearch /></Page>} />
            <Route path="property/:id" element={<Page><PropertyDetail /></Page>} />
            <Route path="booking" element={<Page><BookingWizard /></Page>} />
            <Route path="dashboard" element={<Page><StudentDashboard /></Page>} />
            <Route path="payments" element={<Page><StudentPayments /></Page>} />
            <Route path="favourites" element={<Page><StudentFavourites /></Page>} />
          </Route>

          <Route path="*" element={<Navigate to="/student/home" replace />} />
        </Routes>
      </AnimatePresence>
      <Chatbot />
      <Toaster position="top-right" toastOptions={{ style: { fontFamily: 'Inter, sans-serif', borderRadius: '12px', border: '1px solid #EAE8E0' } }} />
    </>
  )
}
