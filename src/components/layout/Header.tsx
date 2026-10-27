import { useEffect, useState } from 'react'
import { useSiteConfig } from '../../config/useSiteConfig'
import { LinkButton } from '../ui/Button'
import { Container } from '../ui/Container'

const NAV_LINKS = [
  { label: 'Início', href: '#inicio' },
  { label: 'Aulas', href: '#aulas' },
  { label: 'Instrutores', href: '#instrutores' },
  { label: 'Planos', href: '#planos' },
]

export function Header() {
  const { company } = useSiteConfig()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 24)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const headerSurface =
    isScrolled || isMenuOpen ? 'bg-brown-deep/95 shadow-sm backdrop-blur' : 'bg-transparent'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors motion-reduce:transition-none ${headerSurface}`}
    >
      <Container className="flex h-20 items-center justify-between">
        <a href="#inicio" className="text-off-white font-serif text-xl font-medium">
          {company.name}
        </a>

        <nav
          aria-label="Navegação principal"
          className="bg-off-white/10 hidden items-center gap-1 rounded-full p-1 md:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-off-white/80 hover:bg-off-white hover:text-brown-deep rounded-full px-4 py-2 font-sans text-sm font-medium transition-colors motion-reduce:transition-none"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a href="#planos" className="text-off-white/80 hover:text-off-white font-sans text-sm font-medium">
            Entrar
          </a>
          <LinkButton variant="light" href="#planos">
            Cadastrar
          </LinkButton>
        </div>

        <button
          type="button"
          className="text-off-white flex h-10 w-10 items-center justify-center rounded-full md:hidden"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span aria-hidden="true" className="text-2xl">
            {isMenuOpen ? '✕' : '☰'}
          </span>
        </button>
      </Container>

      {isMenuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Navegação mobile"
          className="border-off-white/10 bg-brown-deep border-t md:hidden"
        >
          <Container className="flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-off-white hover:bg-off-white/10 rounded-full px-4 py-3 font-sans text-base"
              >
                {link.label}
              </a>
            ))}
            <LinkButton
              variant="light"
              className="mt-2 w-full"
              href="#planos"
              onClick={() => setIsMenuOpen(false)}
            >
              Cadastrar
            </LinkButton>
          </Container>
        </nav>
      )}
    </header>
  )
}
