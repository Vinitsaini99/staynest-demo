import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Protected from './components/layout/Protected'
import Home from './pages/Home'
import Rentals from './pages/Rentals'
import PropertyDetail from './pages/PropertyDetail'
import Contact from './pages/Contact'
import { About, NotFound, Privacy, Terms } from './pages/Static'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import VerifyEmail from './pages/auth/VerifyEmail'
import UserDashboard from './pages/dashboard/UserDashboard'
import SellerDashboard from './pages/dashboard/SellerDashboard'
import ListingForm from './pages/dashboard/ListingForm'
import AdminPanel from './pages/dashboard/AdminPanel'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="rentals" element={<Rentals />} />
        <Route path="property/:slug" element={<PropertyDetail />} />
        <Route path="contact" element={<Contact />} />
        <Route path="about" element={<About />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="verify-email" element={<VerifyEmail />} />
        <Route path="admin-login" element={<Login admin />} />

        <Route path="user" element={<Protected roles={['tenant', 'seller']}><UserDashboard /></Protected>} />
        <Route path="seller" element={<Protected roles={['seller']}><SellerDashboard /></Protected>} />
        <Route path="seller/new" element={<Protected roles={['seller']}><ListingForm /></Protected>} />
        <Route path="seller/edit/:id" element={<Protected roles={['seller']}><ListingForm /></Protected>} />
        <Route path="admin" element={<Protected roles={['admin']} admin><AdminPanel /></Protected>} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
