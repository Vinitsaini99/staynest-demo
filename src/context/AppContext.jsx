import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import * as api from '../services/api'

const Ctx = createContext(null)

export function AppProvider({ children }) {
  const [user, setUser] = useState(null)
  const [ready, setReady] = useState(false)
  const [saved, setSaved] = useState([])

  const refreshSaved = useCallback(() => api.getSavedIds().then(setSaved), [])

  useEffect(() => {
    let alive = true
    api
      .getCurrentUser()
      .then((u) => alive && setUser(u))
      .finally(async () => {
        await refreshSaved()
        if (alive) setReady(true)
      })
    return () => {
      alive = false
    }
  }, [refreshSaved])

  const signIn = useCallback(
    (u) => {
      setUser(u)
      refreshSaved()
    },
    [refreshSaved],
  )

  const signOut = useCallback(async () => {
    await api.logout()
    setUser(null)
    refreshSaved()
  }, [refreshSaved])

  const toggleSave = useCallback(async (id) => {
    const next = await api.toggleSaved(id)
    setSaved(next)
    toast.success(next.includes(id) ? 'Saved to your shortlist' : 'Removed from shortlist')
  }, [])

  const value = useMemo(
    () => ({ user, ready, saved, signIn, signOut, toggleSave, setUser }),
    [user, ready, saved, signIn, signOut, toggleSave],
  )
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export const useApp = () => useContext(Ctx)
