import { createContext } from 'react'
import type { User } from '../lib/api'

export type LoginResult = { ok: true } | { ok: false; message: string }

export type AuthContextValue = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<LoginResult>
  logout: () => void
  refreshUser: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)
