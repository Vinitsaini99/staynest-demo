import { Navigate, useLocation } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { Spinner } from '../ui/States'

export default function Protected({ roles, children, admin = false }) {
  const { user, ready } = useApp()
  const loc = useLocation()
  if (!ready) return <Spinner />
  if (!user) return <Navigate to={admin ? '/admin-login' : '/login'} state={{ from: loc.pathname + loc.search }} replace />
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />
  return children
}
