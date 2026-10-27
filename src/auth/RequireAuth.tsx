import type { PropsWithChildren } from 'react'
import { Navigate, useLocation } from 'react-router'
import { useAuth } from './useAuth'

export function RequireAuth({ children }: PropsWithChildren) {
  const { user, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) return null

  if (!user) {
    return <Navigate to="/entrar" state={{ from: location }} replace />
  }

  return children
}
