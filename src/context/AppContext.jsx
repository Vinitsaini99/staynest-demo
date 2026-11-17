import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import {
  bookings as seedBookings,
  currentOwnerId,
  currentStudentId,
  properties as seedProperties,
  reviews as seedReviews,
  roomInventory as seedRooms,
  tours as seedTours,
} from '../data/mockData'
import { loadState, saveState } from '../utils/storage'

const AppContext = createContext(null)

const defaultState = {
  role: 'student',
  properties: seedProperties,
  bookings: seedBookings,
  reviews: seedReviews,
  tours: seedTours,
  roomInventory: seedRooms,
  favourites: ['p2', 'p4'],
  compare: [],
  notifications: null,
}

export function AppProvider({ children }) {
  const [ready, setReady] = useState(false)
  const [role, setRole] = useState('student')
  const [properties, setProperties] = useState(seedProperties)
  const [bookings, setBookings] = useState(seedBookings)
  const [reviews, setReviews] = useState(seedReviews)
  const [tours, setTours] = useState(seedTours)
  const [roomInventory, setRoomInventory] = useState(seedRooms)
  const [favourites, setFavourites] = useState(['p2', 'p4'])
  const [compare, setCompare] = useState([])
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const saved = loadState()
    if (saved) {
      setRole(saved.role ?? 'student')
      setProperties(saved.properties ?? seedProperties)
      setBookings(saved.bookings ?? seedBookings)
      setReviews(saved.reviews ?? seedReviews)
      setTours(saved.tours ?? seedTours)
      setRoomInventory(saved.roomInventory ?? seedRooms)
      setFavourites(saved.favourites ?? ['p2', 'p4'])
      setCompare(saved.compare ?? [])
    }
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    saveState({ role, properties, bookings, reviews, tours, roomInventory, favourites, compare })
  }, [ready, role, properties, bookings, reviews, tours, roomInventory, favourites, compare])

  const switchRole = useCallback((next) => {
    setRole(next)
    toast.success(`Switched to ${next === 'admin' ? 'Admin' : next === 'owner' ? 'Property Owner' : 'Student'} portal`)
  }, [])

  const toggleFavourite = useCallback((id) => {
    setFavourites((prev) => {
      const exists = prev.includes(id)
      toast.success(exists ? 'Removed from wishlist' : 'Added to wishlist')
      return exists ? prev.filter((x) => x !== id) : [...prev, id]
    })
  }, [])

  const toggleCompare = useCallback((id) => {
    setCompare((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id)
      if (prev.length >= 3) {
        toast.error('Compare up to 3 properties')
        return prev
      }
      toast.success('Added to comparison')
      return [...prev, id]
    })
  }, [])

  const updatePropertyStatus = useCallback((id, status) => {
    setProperties((prev) => prev.map((p) => (p.id === id ? { ...p, status, verified: status === 'Approved' } : p)))
    toast.success(`Property ${status.toLowerCase()}`)
  }, [])

  const addProperty = useCallback((property) => {
    setProperties((prev) => [{ ...property, id: `p${Date.now()}`, status: 'Pending', verified: false, rating: 0, reviewsCount: 0, occupancy: 0 }, ...prev])
    toast.success('Property submitted for approval')
  }, [])

  const deleteProperty = useCallback((id) => {
    setProperties((prev) => prev.filter((p) => p.id !== id))
    toast.success('Property deleted')
  }, [])

  const addBooking = useCallback((booking) => {
    const full = { ...booking, id: `b${Date.now()}`, status: 'Confirmed', paid: true }
    setBookings((prev) => [full, ...prev])
    toast.success('Booking confirmed!')
    return full
  }, [])

  const updateBookingStatus = useCallback((id, status) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)))
    toast.success(`Booking ${status.toLowerCase()}`)
  }, [])

  const addReview = useCallback((review) => {
    setReviews((prev) => [{ ...review, id: `r${Date.now()}`, date: new Date().toISOString().slice(0, 10) }, ...prev])
    toast.success('Review submitted')
  }, [])

  const scheduleTour = useCallback((tour) => {
    setTours((prev) => [{ ...tour, id: `t${Date.now()}`, status: 'Scheduled' }, ...prev])
    toast.success('Tour scheduled successfully')
  }, [])

  const updateBedStatus = useCallback((propertyId, roomNo, bedId, status) => {
    setRoomInventory((prev) =>
      prev.map((block) => {
        if (block.propertyId !== propertyId) return block
        return {
          ...block,
          rooms: block.rooms.map((room) => {
            if (room.no !== roomNo) return room
            return {
              ...room,
              beds: room.beds.map((bed) => (bed.id === bedId ? { ...bed, status } : bed)),
            }
          }),
        }
      }),
    )
    toast.success(`Bed marked as ${status}`)
  }, [])

  const value = useMemo(
    () => ({
      ready,
      role,
      switchRole,
      properties,
      bookings,
      reviews,
      tours,
      roomInventory,
      favourites,
      compare,
      sidebarOpen,
      setSidebarOpen,
      toggleFavourite,
      toggleCompare,
      setCompare,
      updatePropertyStatus,
      addProperty,
      deleteProperty,
      addBooking,
      updateBookingStatus,
      addReview,
      scheduleTour,
      updateBedStatus,
      currentStudentId,
      currentOwnerId,
    }),
    [
      ready,
      role,
      switchRole,
      properties,
      bookings,
      reviews,
      tours,
      roomInventory,
      favourites,
      compare,
      sidebarOpen,
      toggleFavourite,
      toggleCompare,
      updatePropertyStatus,
      addProperty,
      deleteProperty,
      addBooking,
      updateBookingStatus,
      addReview,
      scheduleTour,
      updateBedStatus,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
