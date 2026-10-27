import { Bell, LogOut, User as UserIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router'
import { useAuth } from '../../auth/useAuth'
import { getInitials } from '../../lib/format'
import { Avatar } from '../client/ui'
import { Container } from '../ui/Container'

const NAV_ITEMS: { to: string; label: string; end?: boolean }[] = [
  { to: '/area-do-cliente', label: 'Início', end: true },
  { to: '/area-do-cliente/agendamento', label: 'Agendamento' },
  { to: '/area-do-cliente/videos', label: 'Vídeos' },
  { to: '/area-do-cliente/plano', label: 'Meu Plano' },
  { to: '/area-do-cliente/conta', label: 'Minha Conta' },
]

export function ClientHeader() {
  const { user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isMenuOpen) return

    function handlePointerDown(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [isMenuOpen])

  return (
    <header className="bg-brown-deep sticky top-0 z-40">
      <Container className="flex h-20 items-center justify-between gap-4">
        <a href="/" className="text-off-white font-serif text-xl font-medium">
          Pilates Studio
        </a>

        <nav
          aria-label="Navegação da área do cliente"
          className="bg-off-white/10 flex min-w-0 items-center gap-1 overflow-x-auto rounded-full p-1"
        >
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 font-sans text-sm font-medium whitespace-nowrap transition-colors motion-reduce:transition-none ${
                  isActive ? 'bg-off-white text-brown-deep' : 'text-off-white/70 hover:text-off-white'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="relative flex flex-none items-center gap-3" ref={menuRef}>
          <button
            type="button"
            aria-label="Notificações"
            className="border-off-white/20 text-off-white hover:border-off-white/50 relative flex h-10 w-10 items-center justify-center rounded-full border transition-colors motion-reduce:transition-none"
          >
            <Bell aria-hidden="true" className="h-[18px] w-[18px]" />
            <span className="bg-brown-medium border-brown-deep absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full border-2" />
          </button>

          <button
            type="button"
            onClick={() => setIsMenuOpen((value) => !value)}
            aria-haspopup="menu"
            aria-expanded={isMenuOpen}
            aria-label="Menu da conta"
          >
            <Avatar initials={user ? getInitials(user.name) : '—'} />
          </button>

          {isMenuOpen && (
            <div
              role="menu"
              className="border-brown-deep/10 bg-off-white absolute top-full right-0 z-50 mt-2 w-56 rounded-2xl border p-2 shadow-lg"
            >
              {user && (
                <div className="border-brown-deep/10 mb-1 border-b px-3 py-2">
                  <p className="text-brown-deep truncate font-serif text-sm">{user.name}</p>
                  <p className="text-brown-warm/60 truncate font-sans text-xs">{user.email}</p>
                </div>
              )}

              <NavLink
                to="/area-do-cliente/conta"
                onClick={() => setIsMenuOpen(false)}
                className="text-brown-deep hover:bg-beige-light flex items-center gap-2 rounded-xl px-3 py-2 font-sans text-sm transition-colors motion-reduce:transition-none"
              >
                <UserIcon aria-hidden="true" className="h-4 w-4" />
                Minha conta
              </NavLink>

              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setIsMenuOpen(false)
                  logout()
                }}
                className="text-brown-deep hover:bg-beige-light flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left font-sans text-sm transition-colors motion-reduce:transition-none"
              >
                <LogOut aria-hidden="true" className="h-4 w-4" />
                Sair
              </button>
            </div>
          )}
        </div>
      </Container>
    </header>
  )
}
