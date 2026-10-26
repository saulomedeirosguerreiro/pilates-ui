import { useEffect, useState } from 'react'
import { LinkButton } from '../ui/Button'
import { Container } from '../ui/Container'

const NAV_LINKS = [
  { label: 'Início', href: '#inicio' },
  { label: 'O Studio', href: '#studio' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Benefícios', href: '#beneficios' },
  { label: 'Pré-venda', href: '#pre-venda' },
]

export function Header() {
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
    isScrolled || isMenuOpen ? 'bg-off-white/95 shadow-sm backdrop-blur' : 'bg-transparent'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors motion-reduce:transition-none ${headerSurface}`}
    >
      <Container className="flex h-20 items-center justify-between">
        <a href="#inicio" className="text-brown-deep font-serif text-xl font-medium">
          Pilates Studio
        </a>

        <nav aria-label="Navegação principal" className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-brown-deep hover:text-brown-medium font-sans text-sm font-medium transition-colors motion-reduce:transition-none"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <LinkButton variant="primary" href="#pre-venda">
            Garantir minha vaga
          </LinkButton>
        </div>

        <button
          type="button"
          className="rounded-editorial text-brown-deep flex h-10 w-10 items-center justify-center md:hidden"
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
          className="border-brown-medium/20 bg-off-white border-t md:hidden"
        >
          <Container className="flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-editorial text-brown-deep hover:bg-beige-light px-2 py-3 font-sans text-base"
              >
                {link.label}
              </a>
            ))}
            <LinkButton
              variant="primary"
              className="mt-2 w-full"
              href="#pre-venda"
              onClick={() => setIsMenuOpen(false)}
            >
              Garantir minha vaga
            </LinkButton>
          </Container>
        </nav>
      )}
    </header>
  )
}
