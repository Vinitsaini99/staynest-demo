import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import * as api from '../services/api'
import { store } from '../utils/storage'

const Ctx = createContext(null)
export const useApp = () => useContext(Ctx)

const wishKey = (uid) => `kkp_wishlist_${uid || 'guest'}`

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => api.getSessionUser())
  const [wishlist, setWishlist] = useState(() => store.get(wishKey(api.getSessionUser()?.id), []))

  useEffect(() => {
    store.set(wishKey(user?.id), wishlist)
  }, [wishlist, user])

  const toggleWishlist = useCallback((id) => {
    const has = wishlist.includes(id)
    setWishlist(has ? wishlist.filter((x) => x !== id) : [id, ...wishlist])
    toast.success(has ? 'Removed from saved properties' : 'Saved to your wishlist')
  }, [wishlist])

  const afterAuth = useCallback((u) => {
    // merge guest wishlist into the user's list
    const guest = store.get(wishKey(null), [])
    const mine = store.get(wishKey(u.id), [])
    const merged = [...new Set([...guest, ...mine])]
    store.remove(wishKey(null))
    store.set(wishKey(u.id), merged)
    setWishlist(merged)
    setUser(u)
  }, [])

  const login = useCallback(async (data) => {
    const u = await api.loginUser(data)
    afterAuth(u)
    return u
  }, [afterAuth])

  const register = useCallback(async (data) => {
    const u = await api.registerUser(data)
    afterAuth(u)
    return u
  }, [afterAuth])

  const logout = useCallback(() => {
    api.logoutUser()
    setUser(null)
    setWishlist(store.get(wishKey(null), []))
    toast.success('You have been logged out')
  }, [])

  const updateUser = useCallback(async (patch) => {
    const u = await api.updateProfile(user.id, patch)
    setUser(u)
    return u
  }, [user])

  const value = useMemo(
    () => ({ user, login, register, logout, updateUser, wishlist, toggleWishlist, isSaved: (id) => wishlist.includes(id) }),
    [user, login, register, logout, updateUser, wishlist, toggleWishlist],
  )
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
