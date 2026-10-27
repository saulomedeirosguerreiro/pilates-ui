import { Bell } from 'lucide-react'
import { NavLink } from 'react-router'
import { useAuth } from '../../auth/useAuth'
import { Avatar } from '../client/ui'
import { getInitials } from '../../lib/format'
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

        <div className="flex flex-none items-center gap-3">
          <button
            type="button"
            aria-label="Notificações"
            className="border-off-white/20 text-off-white hover:border-off-white/50 relative flex h-10 w-10 items-center justify-center rounded-full border transition-colors motion-reduce:transition-none"
          >
            <Bell aria-hidden="true" className="h-[18px] w-[18px]" />
            <span className="bg-brown-medium border-brown-deep absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full border-2" />
          </button>
          <button type="button" onClick={logout} title="Sair da conta" aria-label="Sair da conta">
            <Avatar initials={user ? getInitials(user.name) : '—'} />
          </button>
        </div>
      </Container>
    </header>
  )
}
