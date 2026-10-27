import { useEffect, useState, type PropsWithChildren } from 'react'
import { api, type User } from '../lib/api'
import { AuthContext, type LoginResult } from './auth-context'

const SESSION_KEY = 'pilates:session'

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(() => Boolean(localStorage.getItem(SESSION_KEY)))

  useEffect(() => {
    const storedId = localStorage.getItem(SESSION_KEY)
    if (!storedId) return

    api
      .getUser(Number(storedId))
      .then(setUser)
      .catch(() => localStorage.removeItem(SESSION_KEY))
      .finally(() => setIsLoading(false))
  }, [])

  async function login(email: string, password: string): Promise<LoginResult> {
    const found = await api.findUserByEmail(email)

    if (!found || found.password !== password) {
      return { ok: false, message: 'E-mail ou senha incorretos.' }
    }

    localStorage.setItem(SESSION_KEY, String(found.id))
    setUser(found)
    return { ok: true }
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY)
    setUser(null)
  }

  async function refreshUser() {
    if (!user) return
    setUser(await api.getUser(user.id))
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, refreshUser }}>{children}</AuthContext.Provider>
  )
}
