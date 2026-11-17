import {
  LayoutDashboard, Building2, Users, GraduationCap, CalendarCheck, BedDouble,
  Wallet, MessageSquare, MapPin, Star, Gift, BarChart3, Settings,
} from 'lucide-react'

export const adminNav = [
  { to: '/admin/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/admin/properties', label: 'Properties', icon: Building2 },
  { to: '/admin/owners', label: 'Owners', icon: Users },
  { to: '/admin/students', label: 'Students', icon: GraduationCap },
  { to: '/admin/bookings', label: 'Bookings', icon: CalendarCheck },
  { to: '/admin/rooms', label: 'Inventory', icon: BedDouble },
  { to: '/admin/payments', label: 'Payments', icon: Wallet },
  { to: '/admin/inquiries', label: 'Inquiries', icon: MessageSquare },
  { to: '/admin/tours', label: 'Tours', icon: MapPin },
  { to: '/admin/reviews', label: 'Reviews', icon: Star },
  { to: '/admin/referrals', label: 'Rewards', icon: Gift },
  { to: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
]
