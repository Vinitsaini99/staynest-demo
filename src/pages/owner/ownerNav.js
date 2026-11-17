import {
  LayoutDashboard, Building2, BedDouble, CalendarCheck, GraduationCap,
  Wallet, Star, Wrench, BarChart3, UserRound, Receipt, DoorOpen,
} from 'lucide-react'

export const ownerNav = [
  { to: '/owner/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/owner/properties', label: 'My Properties', icon: Building2 },
  { to: '/owner/rooms', label: 'Room Management', icon: DoorOpen },
  { to: '/owner/beds', label: 'Bed Availability', icon: BedDouble },
  { to: '/owner/bookings', label: 'Booking Requests', icon: CalendarCheck },
  { to: '/owner/students', label: 'My Students', icon: GraduationCap },
  { to: '/owner/payments', label: 'Rent Collection', icon: Wallet },
  { to: '/owner/expenses', label: 'Expenses', icon: Receipt },
  { to: '/owner/reviews', label: 'Reviews', icon: Star },
  { to: '/owner/maintenance', label: 'Maintenance Requests', icon: Wrench },
  { to: '/owner/reports', label: 'Reports', icon: BarChart3 },
  { to: '/owner/profile', label: 'Profile Settings', icon: UserRound },
]
